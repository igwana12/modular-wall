"""ElevenLabs WebSocket streaming TTS for deity voice readings.

Uses Flash v2.5 model for 75ms latency (per D-11).
Yields base64-encoded MP3 audio chunks as they arrive.
"""
from __future__ import annotations

import json
import logging
import os
from typing import AsyncGenerator

import websockets

logger = logging.getLogger("orb-backend.tts")

ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY", "")

# Model and format configuration
TTS_MODEL = "eleven_flash_v2_5"
OUTPUT_FORMAT = "mp3_44100_128"

# Default voice settings (can be overridden per deity in future)
DEFAULT_VOICE_SETTINGS = {
    "stability": 0.5,
    "similarity_boost": 0.8,
}


async def tts_stream(voice_id: str, text: str) -> AsyncGenerator[str, None]:
    """Stream TTS audio for a sentence via ElevenLabs WebSocket.

    Yields base64-encoded MP3 audio chunks as they arrive from ElevenLabs.
    Uses Flash v2.5 model for 75ms latency (per D-11).

    Args:
        voice_id: ElevenLabs voice ID for the deity
        text: Sentence text to synthesize

    Yields:
        Base64-encoded MP3 audio chunk strings
    """
    if not ELEVENLABS_API_KEY:
        logger.error("ELEVENLABS_API_KEY not set -- skipping TTS")
        return

    if not text or not text.strip():
        return

    uri = (
        f"wss://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream-input"
        f"?model_id={TTS_MODEL}&output_format={OUTPUT_FORMAT}"
    )

    try:
        async with websockets.connect(uri) as ws:
            # Initialize connection with API key and voice settings
            await ws.send(json.dumps({
                "text": " ",
                "xi_api_key": ELEVENLABS_API_KEY,
                "voice_settings": DEFAULT_VOICE_SETTINGS,
            }))

            # Send the text to synthesize
            await ws.send(json.dumps({"text": text}))

            # Signal end of input
            await ws.send(json.dumps({"text": ""}))

            # Receive audio chunks
            async for message in ws:
                data = json.loads(message)
                if data.get("audio"):
                    yield data["audio"]  # Already base64 from ElevenLabs
                if data.get("isFinal"):
                    break

    except websockets.exceptions.ConnectionClosed as e:
        logger.warning(f"ElevenLabs WebSocket closed: {e}")
    except Exception as e:
        logger.error(f"TTS streaming error for voice {voice_id}: {e}")


async def tts_stream_pcm(voice_id: str, text: str) -> AsyncGenerator[str, None]:
    """Stream TTS audio as raw PCM 16-bit 16kHz mono via ElevenLabs WebSocket.

    Same as tts_stream but uses pcm_16000 output format for ESP32 hardware.
    Yields base64-encoded raw PCM chunks (16-bit signed LE, 16kHz, mono).

    Args:
        voice_id: ElevenLabs voice ID for the deity
        text: Sentence text to synthesize

    Yields:
        Base64-encoded raw PCM audio chunk strings
    """
    if not ELEVENLABS_API_KEY:
        logger.error("ELEVENLABS_API_KEY not set -- skipping TTS")
        return

    if not text or not text.strip():
        return

    uri = (
        f"wss://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream-input"
        f"?model_id={TTS_MODEL}&output_format=pcm_16000"
    )

    try:
        async with websockets.connect(uri) as ws:
            # Initialize connection with API key and voice settings
            await ws.send(json.dumps({
                "text": " ",
                "xi_api_key": ELEVENLABS_API_KEY,
                "voice_settings": DEFAULT_VOICE_SETTINGS,
            }))

            # Send the text to synthesize
            await ws.send(json.dumps({"text": text}))

            # Signal end of input
            await ws.send(json.dumps({"text": ""}))

            # Receive audio chunks
            async for message in ws:
                data = json.loads(message)
                if data.get("audio"):
                    yield data["audio"]  # Already base64 from ElevenLabs
                if data.get("isFinal"):
                    break

    except websockets.exceptions.ConnectionClosed as e:
        logger.warning(f"ElevenLabs WebSocket closed (PCM): {e}")
    except Exception as e:
        logger.error(f"TTS PCM streaming error for voice {voice_id}: {e}")


def tts_available() -> bool:
    """Check if TTS is configured and likely to work."""
    if not ELEVENLABS_API_KEY:
        logger.warning("ELEVENLABS_API_KEY not set")
        return False
    return True
