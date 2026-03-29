"""WebSocket handler for Spirit Sphere hardware.

Protocol: JSON messages over a single WebSocket connection.
Pipeline: PCM audio in -> AssemblyAI STT -> Claude reading -> ElevenLabs TTS -> PCM audio out.

Client messages:
  {"type": "config", "deity_id": "apollo", "intent": "guidance on creativity"}
  {"type": "audio", "data": "<base64 PCM 16-bit 16kHz mono>"}
  {"type": "end_audio"}

Server messages:
  {"type": "status", "state": "ready|listening|processing|speaking"}
  {"type": "transcript", "text": "..."}
  {"type": "text", "chunk": "..."}  (LLM tokens)
  {"type": "audio", "data": "<base64 PCM>", "sample_rate": 16000}
  {"type": "done"}
  {"type": "error", "message": "..."}
"""
from __future__ import annotations

import base64
import json
import logging
import re

from fastapi import WebSocket, WebSocketDisconnect

from deity_config import load_deity
from pipeline import execute_reading_stream
from rag import get_reading_context
from stt import transcribe_audio, stt_available
from tts import tts_stream_pcm, tts_available

logger = logging.getLogger("orb-backend.sphere_ws")

# Sentence boundary: period, exclamation, question mark (optionally followed by quote/bracket)
SENTENCE_END = re.compile(r'[.!?]["\')\]]?\s+|[.!?]["\')\]]?$')

DEFAULT_DEITY_ID = "apollo"


async def sphere_websocket(websocket: WebSocket) -> None:
    """Handle a Spirit Sphere WebSocket connection.

    Accepts connection, waits for config, accumulates audio,
    then runs the full STT -> LLM -> TTS pipeline.
    """
    await websocket.accept()
    logger.info("Sphere WebSocket connected")

    # Send ready status
    await _send(websocket, {"type": "status", "state": "ready"})

    # Session state
    deity_id = DEFAULT_DEITY_ID
    intent = ""
    audio_buffer = bytearray()
    configured = False

    try:
        while True:
            raw = await websocket.receive_text()
            try:
                msg = json.loads(raw)
            except json.JSONDecodeError:
                await _send(websocket, {"type": "error", "message": "Invalid JSON"})
                continue

            msg_type = msg.get("type", "")

            if msg_type == "config":
                deity_id = msg.get("deity_id", DEFAULT_DEITY_ID).lower()
                intent = msg.get("intent", "")
                configured = True
                audio_buffer = bytearray()
                logger.info(f"Sphere configured: deity={deity_id}, intent='{intent[:60]}'")
                await _send(websocket, {"type": "status", "state": "listening"})

            elif msg_type == "audio":
                data = msg.get("data", "")
                if data:
                    try:
                        audio_buffer.extend(base64.b64decode(data))
                    except Exception as e:
                        await _send(websocket, {"type": "error", "message": f"Invalid base64 audio: {e}"})

            elif msg_type == "end_audio":
                if not configured:
                    await _send(websocket, {"type": "error", "message": "Send config before audio"})
                    continue

                logger.info(f"Audio received: {len(audio_buffer)} bytes, running pipeline")
                await _send(websocket, {"type": "status", "state": "processing"})

                # Run the full pipeline
                await _run_pipeline(websocket, deity_id, intent, bytes(audio_buffer))

                # Reset for next utterance
                audio_buffer = bytearray()
                await _send(websocket, {"type": "status", "state": "listening"})

            else:
                await _send(websocket, {"type": "error", "message": f"Unknown message type: {msg_type}"})

    except WebSocketDisconnect:
        logger.info("Sphere WebSocket disconnected")
    except Exception as e:
        logger.error(f"Sphere WebSocket error: {e}")
        try:
            await _send(websocket, {"type": "error", "message": str(e)})
        except Exception:
            pass


async def _run_pipeline(
    websocket: WebSocket,
    deity_id: str,
    intent: str,
    audio_bytes: bytes,
) -> None:
    """Execute STT -> LLM -> TTS pipeline and stream results back.

    Args:
        websocket: Active WebSocket connection
        deity_id: Deity identifier (e.g., "apollo")
        intent: User's question/intention (from config message)
        audio_bytes: Raw PCM 16-bit 16kHz mono audio
    """
    # Load deity config
    deity_config = load_deity(deity_id)
    if not deity_config:
        await _send(websocket, {"type": "error", "message": f"Unknown deity: {deity_id}"})
        return

    # Step 1: STT -- transcribe audio to text
    transcript = ""
    if audio_bytes and stt_available():
        transcript = await transcribe_audio(audio_bytes, sample_rate=16000)
        if transcript:
            await _send(websocket, {"type": "transcript", "text": transcript})
            logger.info(f"STT transcript: '{transcript[:80]}'")
        else:
            logger.warning("STT returned empty transcript")

    # Use transcript as intent if we have audio, otherwise use config intent
    query = transcript if transcript else intent
    if not query:
        await _send(websocket, {"type": "error", "message": "No audio transcript or intent provided"})
        return

    # Step 2: RAG context retrieval
    try:
        rag_context = await get_reading_context(deity_id, query)
    except Exception as e:
        logger.error(f"RAG retrieval failed: {e}")
        rag_context = ""

    # Step 3: LLM reading generation with interleaved TTS
    voice_id = deity_config.get("voice_id", "")
    use_tts = tts_available() and bool(voice_id)
    sentence_buffer = ""
    full_text = ""

    await _send(websocket, {"type": "status", "state": "speaking"})

    try:
        async for token in execute_reading_stream(deity_config, query, rag_context):
            full_text += token
            sentence_buffer += token

            # Send text token immediately
            await _send(websocket, {"type": "text", "chunk": token})

            # Check for sentence boundary -> trigger TTS
            if SENTENCE_END.search(sentence_buffer):
                sentence = sentence_buffer.strip()
                sentence_buffer = ""

                if use_tts and sentence:
                    await _stream_tts_sentence(websocket, voice_id, sentence)

    except Exception as e:
        logger.error(f"LLM streaming failed: {e}")
        await _send(websocket, {"type": "error", "message": f"Reading generation failed: {e}"})

    # Flush remaining sentence buffer for TTS
    if sentence_buffer.strip() and use_tts:
        await _stream_tts_sentence(websocket, voice_id, sentence_buffer.strip())

    # Done
    await _send(websocket, {"type": "done"})
    logger.info(f"Pipeline complete: {len(full_text)} chars generated for {deity_id}")


async def _stream_tts_sentence(websocket: WebSocket, voice_id: str, sentence: str) -> None:
    """Stream TTS PCM audio for a single sentence back to the client."""
    try:
        async for audio_chunk in tts_stream_pcm(voice_id, sentence):
            await _send(websocket, {
                "type": "audio",
                "data": audio_chunk,
                "sample_rate": 16000,
            })
    except Exception as e:
        logger.warning(f"TTS error for sentence: {e}")
        # TTS failure is non-fatal -- text reading continues


async def _send(websocket: WebSocket, data: dict) -> None:
    """Send a JSON message over the WebSocket. Logs errors but does not raise."""
    try:
        await websocket.send_text(json.dumps(data))
    except Exception as e:
        logger.error(f"Failed to send WebSocket message: {e}")
