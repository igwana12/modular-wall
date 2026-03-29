"""AssemblyAI speech-to-text via REST API.

V1 approach: ESP32 sends complete utterance, backend transcribes via REST.
Streaming STT (WebSocket) deferred to v2 when latency optimization needed.
"""
from __future__ import annotations

import asyncio
import io
import logging
import os
import struct
import time
from typing import Optional

import httpx

logger = logging.getLogger("orb-backend.stt")

ASSEMBLYAI_API_KEY = os.getenv("ASSEMBLYAI_API_KEY", "")
ASSEMBLYAI_BASE_URL = "https://api.assemblyai.com/v2"

# Transcription polling config
POLL_INTERVAL_S = 0.5
POLL_TIMEOUT_S = 30.0


def _pcm_to_wav(pcm_bytes: bytes, sample_rate: int = 16000, channels: int = 1, bits_per_sample: int = 16) -> bytes:
    """Wrap raw PCM bytes with a WAV header.

    Args:
        pcm_bytes: Raw PCM 16-bit audio data
        sample_rate: Sample rate in Hz (default 16000)
        channels: Number of audio channels (default 1 = mono)
        bits_per_sample: Bits per sample (default 16)

    Returns:
        Complete WAV file bytes
    """
    data_size = len(pcm_bytes)
    byte_rate = sample_rate * channels * bits_per_sample // 8
    block_align = channels * bits_per_sample // 8

    buf = io.BytesIO()
    # RIFF header
    buf.write(b"RIFF")
    buf.write(struct.pack("<I", 36 + data_size))  # File size - 8
    buf.write(b"WAVE")
    # fmt sub-chunk
    buf.write(b"fmt ")
    buf.write(struct.pack("<I", 16))  # Sub-chunk size
    buf.write(struct.pack("<H", 1))   # PCM format
    buf.write(struct.pack("<H", channels))
    buf.write(struct.pack("<I", sample_rate))
    buf.write(struct.pack("<I", byte_rate))
    buf.write(struct.pack("<H", block_align))
    buf.write(struct.pack("<H", bits_per_sample))
    # data sub-chunk
    buf.write(b"data")
    buf.write(struct.pack("<I", data_size))
    buf.write(pcm_bytes)
    return buf.getvalue()


async def transcribe_audio(audio_bytes: bytes, sample_rate: int = 16000) -> str:
    """Transcribe raw PCM audio via AssemblyAI REST API.

    Steps:
    1. Convert raw PCM to WAV (add header)
    2. Upload WAV to AssemblyAI
    3. Create transcription job
    4. Poll until complete (500ms interval, 30s timeout)

    Args:
        audio_bytes: Raw PCM 16-bit mono audio bytes
        sample_rate: Sample rate in Hz (default 16000)

    Returns:
        Transcribed text string, or empty string on failure.
    """
    if not ASSEMBLYAI_API_KEY:
        logger.error("ASSEMBLYAI_API_KEY not set -- cannot transcribe")
        return ""

    if not audio_bytes:
        logger.warning("Empty audio bytes received for transcription")
        return ""

    headers = {"authorization": ASSEMBLYAI_API_KEY}
    wav_bytes = _pcm_to_wav(audio_bytes, sample_rate=sample_rate)

    async with httpx.AsyncClient(timeout=60.0) as client:
        # Step 1: Upload audio
        try:
            upload_resp = await client.post(
                f"{ASSEMBLYAI_BASE_URL}/upload",
                headers={**headers, "content-type": "application/octet-stream"},
                content=wav_bytes,
            )
            upload_resp.raise_for_status()
            upload_url = upload_resp.json()["upload_url"]
            logger.info(f"Audio uploaded to AssemblyAI ({len(wav_bytes)} bytes)")
        except Exception as e:
            logger.error(f"AssemblyAI upload failed: {e}")
            return ""

        # Step 2: Create transcription
        try:
            transcript_resp = await client.post(
                f"{ASSEMBLYAI_BASE_URL}/transcript",
                headers=headers,
                json={"audio_url": upload_url, "language_code": "en"},
            )
            transcript_resp.raise_for_status()
            transcript_id = transcript_resp.json()["id"]
            logger.info(f"Transcription job created: {transcript_id}")
        except Exception as e:
            logger.error(f"AssemblyAI transcription creation failed: {e}")
            return ""

        # Step 3: Poll for completion
        start = time.monotonic()
        while (time.monotonic() - start) < POLL_TIMEOUT_S:
            try:
                poll_resp = await client.get(
                    f"{ASSEMBLYAI_BASE_URL}/transcript/{transcript_id}",
                    headers=headers,
                )
                poll_resp.raise_for_status()
                data = poll_resp.json()
                status = data.get("status")

                if status == "completed":
                    text = data.get("text", "")
                    elapsed = time.monotonic() - start
                    logger.info(f"Transcription complete in {elapsed:.1f}s: '{text[:80]}...'")
                    return text

                if status == "error":
                    error_msg = data.get("error", "Unknown error")
                    logger.error(f"Transcription failed: {error_msg}")
                    return ""

                # Still processing
                await asyncio.sleep(POLL_INTERVAL_S)

            except Exception as e:
                logger.error(f"Polling error: {e}")
                await asyncio.sleep(POLL_INTERVAL_S)

        logger.error(f"Transcription timed out after {POLL_TIMEOUT_S}s")
        return ""


def stt_available() -> bool:
    """Check if AssemblyAI STT is configured."""
    if not ASSEMBLYAI_API_KEY:
        logger.warning("ASSEMBLYAI_API_KEY not set")
        return False
    return True
