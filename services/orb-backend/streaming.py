"""SSE stream generation with sentence detection and interleaved text+audio.

Per D-09: progressive delivery, target <1s to first text event.
Per D-10: NO batch-then-stream -- events flow as they are produced.
Heartbeat comments keep SSE connection alive during processing gaps.
"""
from __future__ import annotations

import asyncio
import json
import logging
import re
from typing import AsyncGenerator

logger = logging.getLogger("orb-backend.streaming")

# Sentence boundary detection: period, exclamation, question mark
# optionally followed by closing quotes/brackets, then whitespace or end
SENTENCE_END = re.compile(r'[.!?]["\')\]]?\s+|[.!?]["\')\]]?$')

# Heartbeat interval in seconds (per Pitfall 5 from research)
HEARTBEAT_INTERVAL = 15


async def stream_reading(deity_config: dict, intent: str) -> AsyncGenerator[dict, None]:
    """Generator yielding SSE events for an oracle reading.

    Interleaves text tokens and audio chunks progressively.
    Per D-09: progressive delivery, target <1s to first text.
    Per D-10: NO batch-then-stream.

    Event types emitted:
    - deity: deity metadata (first event)
    - text: LLM text token
    - audio: base64-encoded TTS audio chunk
    - tts_error: non-fatal TTS error
    - error: fatal pipeline error
    - done: reading complete

    Args:
        deity_config: Full deity JSON config dict
        intent: User's question/intention

    Yields:
        Dicts with 'event' and 'data' keys for SSE formatting
    """
    from rag import get_reading_context
    from pipeline import execute_reading_stream, execute_reading_full
    from tts import tts_stream, tts_available
    from content_db import get_random_deity_image

    deity_id = deity_config.get("id", "unknown")
    deity_name = deity_config.get("name", "Unknown")

    # 1. Immediately yield deity metadata (target: <100ms)
    image = get_random_deity_image(deity_id)
    yield {
        "event": "deity",
        "data": json.dumps({
            "name": deity_name,
            "title": deity_config.get("title", ""),
            "image": image.model_dump() if image else None,
            "color_palette": deity_config.get("color_palette", []),
        }),
    }

    # 2. Get RAG context (fast, <500ms typical)
    try:
        rag_context = await get_reading_context(deity_id, intent)
    except Exception as e:
        logger.error(f"RAG retrieval failed for {deity_id}: {e}")
        rag_context = ""

    # 3. Stream LLM tokens with sentence detection
    sentence_buffer = ""
    full_text = ""
    use_tts = tts_available() and bool(deity_config.get("voice_id"))
    voice_id = deity_config.get("voice_id", "")

    try:
        async for token in execute_reading_stream(deity_config, intent, rag_context):
            full_text += token
            sentence_buffer += token

            # Yield text token immediately (progressive -- per D-10)
            yield {"event": "text", "data": json.dumps({"chunk": token})}

            # Check for sentence boundary
            if SENTENCE_END.search(sentence_buffer):
                sentence = sentence_buffer.strip()
                sentence_buffer = ""

                # Stream TTS for completed sentence (non-blocking to text)
                if use_tts and sentence:
                    async for evt in _tts_for_sentence(voice_id, sentence):
                        yield evt

    except Exception as e:
        logger.error(f"Streaming pipeline failed for {deity_id}: {e}")

        # Fallback: try non-streaming LLM Router
        if not full_text:
            logger.info(f"Attempting LLM Router fallback for {deity_id}")
            try:
                fallback_text = await execute_reading_full(deity_config, intent, rag_context)
                if fallback_text:
                    # Emit the full text in one chunk
                    yield {"event": "text", "data": json.dumps({"chunk": fallback_text})}
                    full_text = fallback_text
            except Exception as fallback_err:
                logger.error(f"Fallback also failed: {fallback_err}")
                yield {
                    "event": "error",
                    "data": json.dumps({"error": f"Reading generation failed: {e}"}),
                }

    # 4. Flush remaining sentence buffer for TTS
    if sentence_buffer.strip() and use_tts:
        async for evt in _tts_for_sentence(voice_id, sentence_buffer.strip()):
            yield evt

    # 5. Signal completion
    yield {
        "event": "done",
        "data": json.dumps({
            "total_chars": len(full_text),
            "deity": deity_name,
        }),
    }


async def _tts_for_sentence(voice_id: str, sentence: str) -> AsyncGenerator[dict, None]:
    """Stream TTS audio for a single sentence. Yields audio or error events."""
    from tts import tts_stream

    try:
        async for audio_chunk in tts_stream(voice_id, sentence):
            yield {"event": "audio", "data": json.dumps({"chunk": audio_chunk})}
    except Exception as e:
        # TTS failure is non-fatal -- text reading continues
        logger.warning(f"TTS error for sentence: {e}")
        yield {"event": "tts_error", "data": json.dumps({"error": str(e)})}
