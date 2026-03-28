"""Core reading pipeline orchestration.

Two modes:
1. Streaming mode (primary): yields token-by-token from Claude for progressive SSE delivery
2. Full mode (fallback): returns complete text via LLM Router if streaming fails
"""
from __future__ import annotations

import logging
import os
from typing import AsyncGenerator

import anthropic
import httpx

logger = logging.getLogger("orb-backend.pipeline")

LLM_ROUTER_URL = os.getenv("LLM_ROUTER_URL", "http://localhost:8100")

# Reading generation parameters
READING_MODEL = "claude-sonnet-4-20250514"
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


async def execute_reading_stream(
    deity_config: dict, intent: str, rag_context: str
) -> AsyncGenerator[str, None]:
    """Stream oracle reading tokens from Claude.

    Yields string tokens as they arrive from the Anthropic streaming API.
    Uses deity system_prompt with RAG context injected.

    Args:
        deity_config: Full deity JSON config dict
        intent: User's question/intention for the reading
        rag_context: Retrieved mythology context from RAG

    Yields:
        Text tokens (strings) as they stream from Claude
    """
    full_system, user_message = _build_prompts(deity_config, intent, rag_context)

    client = anthropic.AsyncAnthropic()  # Uses ANTHROPIC_API_KEY env var

    try:
        async with client.messages.stream(
            model=READING_MODEL,
            max_tokens=READING_MAX_TOKENS,
            system=full_system,
            messages=[{"role": "user", "content": user_message}],
        ) as stream:
            async for text in stream.text_stream:
                yield text
    except anthropic.APIError as e:
        logger.error(f"Anthropic API error during streaming: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error during streaming: {e}")
        raise


async def execute_reading_full(
    deity_config: dict, intent: str, rag_context: str
) -> str:
    """Fallback: get complete oracle reading via LLM Router (non-streaming).

    Calls LLM Router at localhost:8100/route with tier 'pro'.
    Returns the full reading text.
    """
    full_system, user_message = _build_prompts(deity_config, intent, rag_context)

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{LLM_ROUTER_URL}/route",
                json={
                    "message": user_message,
                    "system": full_system,
                    "tier": "pro",
                    "max_tokens": READING_MAX_TOKENS,
                },
            )
            response.raise_for_status()
            data = response.json()
            return data.get("response", "The oracle is silent. Please try again.")
    except Exception as e:
        logger.error(f"LLM Router fallback failed: {e}")
        return f"The oracle cannot speak at this time. Error: {e}"
