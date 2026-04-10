"""Core reading pipeline orchestration.

Two-tier LLM stack (local-first, no cloud billing):
1. Streaming mode (primary): yields token-by-token from local Ollama
2. Full mode (secondary): complete text via LLM Router (local tier only)
"""
from __future__ import annotations

import json
import logging
import os
from typing import AsyncGenerator

import httpx

logger = logging.getLogger("orb-backend.pipeline")

LLM_ROUTER_URL = os.getenv("LLM_ROUTER_URL", "http://localhost:8100")
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gemma3:12b")

# Reading generation parameters
READING_MAX_TOKENS = 1024


def _build_prompts(deity_config: dict, intent: str, rag_context: str) -> tuple[str, str]:
    """Build system and user prompts for an oracle reading.

    Returns (system_prompt, user_message).
    """
    system_prompt = deity_config.get("system_prompt", "You are an oracle deity. Give a mythological reading.")

    # Inject RAG context into system prompt
    full_system = f"{system_prompt}\n\n## Relevant Mythology Context\n{rag_context}"

    deity_name = deity_config.get("name", "the Oracle")
    user_message = (
        f"The querent seeks guidance on: {intent}\n\n"
        f"Deliver an oracle reading as {deity_name}. "
        f"Speak in character. Apply the McKee narrative arc in your reading. "
        f"Be specific, personal, and transformative. 150-300 words."
    )

    return full_system, user_message


async def _ollama_stream(system: str, user_msg: str) -> AsyncGenerator[str, None]:
    """Stream tokens from local Ollama instance.

    Calls Ollama's /api/generate with streaming=True, parses NDJSON lines.

    Args:
        system: System prompt
        user_msg: User message

    Yields:
        Text tokens from Ollama response stream
    """
    prompt = f"System: {system}\n\nUser: {user_msg}\n\nAssistant:"

    async with httpx.AsyncClient(timeout=120.0) as client:
        async with client.stream(
            "POST",
            f"{OLLAMA_URL}/api/generate",
            json={
                "model": OLLAMA_MODEL,
                "prompt": prompt,
                "stream": True,
            },
        ) as response:
            response.raise_for_status()
            async for line in response.aiter_lines():
                if not line.strip():
                    continue
                try:
                    data = json.loads(line)
                    token = data.get("response", "")
                    if token:
                        yield token
                    if data.get("done", False):
                        break
                except json.JSONDecodeError:
                    continue


async def check_ollama() -> bool:
    """Check if Ollama is reachable and has models available.

    Returns True if Ollama responds to GET /api/tags within 3 seconds.
    """
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            r = await client.get(f"{OLLAMA_URL}/api/tags")
            return r.status_code == 200
    except Exception:
        return False


async def execute_reading_stream(
    deity_config: dict, intent: str, rag_context: str
) -> AsyncGenerator[str, None]:
    """Stream oracle reading tokens from local Ollama (no cloud billing).

    Args:
        deity_config: Full deity JSON config dict
        intent: User's question/intention for the reading
        rag_context: Retrieved mythology context from RAG

    Yields:
        Text tokens (strings) as they stream
    """
    full_system, user_message = _build_prompts(deity_config, intent, rag_context)

    try:
        async for token in _ollama_stream(full_system, user_message):
            yield token
    except Exception as e:
        logger.error(f"Ollama stream failed: {e}")
        yield "The oracle is silent at this time. Local model is unreachable."


async def execute_reading_full(
    deity_config: dict, intent: str, rag_context: str
) -> str:
    """Get complete oracle reading with three-tier fallback.

    1. LLM Router (existing cloud path)
    2. Ollama (local)
    3. Error message

    Returns the full reading text.
    """
    full_system, user_message = _build_prompts(deity_config, intent, rag_context)

    # Tier 1: LLM Router
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{LLM_ROUTER_URL}/ask",
                json={
                    "message": user_message,
                    "system": full_system,
                    "tier": "local",
                    "max_tokens": READING_MAX_TOKENS,
                },
            )
            response.raise_for_status()
            data = response.json()
            return data.get("response", "The oracle is silent. Please try again.")
    except Exception as e:
        logger.warning(f"LLM Router failed, trying Ollama: {e}")

    # Tier 2: Ollama
    try:
        chunks = []
        async for token in _ollama_stream(full_system, user_message):
            chunks.append(token)
        if chunks:
            return "".join(chunks)
    except Exception as e:
        logger.error(f"Ollama fallback also failed: {e}")

    # Tier 3: Error
    return "The oracle cannot speak at this time. All language models are unreachable."
