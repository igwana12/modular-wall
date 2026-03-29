#!/usr/bin/env python3
"""WebSocket test client for Spirit Sphere /ws/sphere endpoint.

Simulates an ESP32 connecting to the orb-backend, sending audio,
and receiving the full STT -> LLM -> TTS pipeline response.

Usage:
    python3 test_sphere_ws.py                      # Send 3s of silence
    python3 test_sphere_ws.py recording.wav         # Send a WAV file
    python3 test_sphere_ws.py --deity zeus          # Use a different deity
    python3 test_sphere_ws.py --intent "what is my purpose"  # Custom intent
"""
from __future__ import annotations

import argparse
import asyncio
import base64
import json
import struct
import sys
import time
import wave
from pathlib import Path

try:
    import websockets
except ImportError:
    print("ERROR: websockets not installed. Run: pip install websockets")
    sys.exit(1)


DEFAULT_URL = "ws://localhost:8300/ws/sphere"
DEFAULT_DEITY = "apollo"
DEFAULT_INTENT = "guidance on my creative path"
CHUNK_SIZE = 4096  # bytes per audio message
SAMPLE_RATE = 16000
BITS_PER_SAMPLE = 16
CHANNELS = 1


def generate_silence(duration_s: float = 3.0) -> bytes:
    """Generate silent PCM audio (zeroed bytes).

    Args:
        duration_s: Duration in seconds

    Returns:
        Raw PCM 16-bit mono bytes
    """
    num_samples = int(SAMPLE_RATE * duration_s)
    return b"\x00\x00" * num_samples  # 16-bit silence = zero


def read_wav_as_pcm(wav_path: str) -> bytes:
    """Read a WAV file and extract raw PCM data.

    Resamples to 16kHz mono 16-bit if needed (basic nearest-neighbor).

    Args:
        wav_path: Path to WAV file

    Returns:
        Raw PCM 16-bit 16kHz mono bytes
    """
    with wave.open(wav_path, "rb") as wf:
        n_channels = wf.getnchannels()
        sample_width = wf.getsampwidth()
        framerate = wf.getframerate()
        n_frames = wf.getnframes()
        raw = wf.readframes(n_frames)

    print(f"WAV: {framerate}Hz, {n_channels}ch, {sample_width * 8}-bit, {n_frames} frames")

    # Convert to 16-bit mono if needed
    samples = []
    for i in range(n_frames):
        offset = i * n_channels * sample_width
        # Read first channel only (mono extraction)
        if sample_width == 2:
            sample = struct.unpack_from("<h", raw, offset)[0]
        elif sample_width == 1:
            sample = (raw[offset] - 128) * 256  # 8-bit unsigned to 16-bit signed
        elif sample_width == 4:
            sample = struct.unpack_from("<i", raw, offset)[0] >> 16  # 32-bit to 16-bit
        else:
            sample = 0
        samples.append(sample)

    # Resample to 16kHz if needed (nearest-neighbor)
    if framerate != SAMPLE_RATE:
        ratio = framerate / SAMPLE_RATE
        new_len = int(len(samples) / ratio)
        resampled = []
        for i in range(new_len):
            src_idx = min(int(i * ratio), len(samples) - 1)
            resampled.append(samples[src_idx])
        samples = resampled
        print(f"Resampled: {framerate}Hz -> {SAMPLE_RATE}Hz ({len(samples)} samples)")

    return struct.pack(f"<{len(samples)}h", *samples)


async def run_test(
    url: str,
    deity_id: str,
    intent: str,
    audio_bytes: bytes,
    output_path: str = "test_output.pcm",
) -> None:
    """Connect to /ws/sphere and run the full test.

    Args:
        url: WebSocket URL
        deity_id: Deity to use for the reading
        intent: Question/intention
        audio_bytes: Raw PCM audio to send
        output_path: Path to save received audio
    """
    timings: dict[str, float] = {}
    received_audio = bytearray()
    llm_text = ""
    transcript = ""

    print(f"\n--- Spirit Sphere WebSocket Test ---")
    print(f"URL:    {url}")
    print(f"Deity:  {deity_id}")
    print(f"Intent: {intent}")
    print(f"Audio:  {len(audio_bytes)} bytes ({len(audio_bytes) / (SAMPLE_RATE * 2):.1f}s)")
    print()

    t_start = time.monotonic()

    try:
        async with websockets.connect(url) as ws:
            print(f"[{_elapsed(t_start)}] Connected")

            # Receive ready status
            msg = json.loads(await ws.recv())
            print(f"[{_elapsed(t_start)}] <- {msg}")

            # Send config
            config_msg = {"type": "config", "deity_id": deity_id, "intent": intent}
            await ws.send(json.dumps(config_msg))
            print(f"[{_elapsed(t_start)}] -> config (deity={deity_id})")

            # Receive listening status
            msg = json.loads(await ws.recv())
            print(f"[{_elapsed(t_start)}] <- {msg}")

            # Send audio in chunks
            sent = 0
            while sent < len(audio_bytes):
                chunk = audio_bytes[sent : sent + CHUNK_SIZE]
                audio_msg = {"type": "audio", "data": base64.b64encode(chunk).decode()}
                await ws.send(json.dumps(audio_msg))
                sent += len(chunk)

            print(f"[{_elapsed(t_start)}] -> audio ({sent} bytes in {sent // CHUNK_SIZE + 1} chunks)")

            # Send end_audio
            await ws.send(json.dumps({"type": "end_audio"}))
            t_end_audio = time.monotonic()
            timings["end_audio"] = t_end_audio
            print(f"[{_elapsed(t_start)}] -> end_audio")

            # Receive pipeline responses
            first_transcript = None
            first_llm_token = None
            first_audio_chunk = None

            while True:
                try:
                    raw = await asyncio.wait_for(ws.recv(), timeout=60.0)
                except asyncio.TimeoutError:
                    print(f"[{_elapsed(t_start)}] TIMEOUT waiting for response")
                    break

                msg = json.loads(raw)
                msg_type = msg.get("type", "")
                now = time.monotonic()

                if msg_type == "status":
                    print(f"[{_elapsed(t_start)}] <- status: {msg.get('state')}")

                elif msg_type == "transcript":
                    if first_transcript is None:
                        first_transcript = now
                        timings["first_transcript"] = now
                    transcript = msg.get("text", "")
                    print(f"[{_elapsed(t_start)}] <- transcript: \"{transcript}\"")

                elif msg_type == "text":
                    if first_llm_token is None:
                        first_llm_token = now
                        timings["first_llm_token"] = now
                    chunk = msg.get("chunk", "")
                    llm_text += chunk
                    # Print sentences, not individual tokens
                    if any(c in chunk for c in ".!?\n"):
                        print(f"[{_elapsed(t_start)}] <- text: ...{llm_text[-80:]}")

                elif msg_type == "audio":
                    if first_audio_chunk is None:
                        first_audio_chunk = now
                        timings["first_audio"] = now
                    audio_data = base64.b64decode(msg.get("data", ""))
                    received_audio.extend(audio_data)
                    # Don't print raw data, just size
                    print(f"[{_elapsed(t_start)}] <- audio chunk: {len(audio_data)} bytes (total: {len(received_audio)})")

                elif msg_type == "error":
                    print(f"[{_elapsed(t_start)}] <- ERROR: {msg.get('message')}")

                elif msg_type == "done":
                    timings["done"] = now
                    print(f"[{_elapsed(t_start)}] <- done")
                    break

    except ConnectionRefusedError:
        print(f"\nERROR: Could not connect to {url}")
        print("Is orb-backend running? Start with: cd services/orb-backend && uvicorn server:app --port 8300")
        return
    except Exception as e:
        print(f"\nERROR: {e}")
        return

    # Save received audio
    if received_audio:
        out = Path(output_path)
        out.write_bytes(bytes(received_audio))
        print(f"\nAudio saved to: {out} ({len(received_audio)} bytes)")
        print(f"Play (macOS): sox -t raw -r {SAMPLE_RATE} -b {BITS_PER_SAMPLE} -c {CHANNELS} -e signed-integer {out} test_output.wav && afplay test_output.wav")
        print(f"Play (Linux): aplay -f S16_LE -r {SAMPLE_RATE} -c {CHANNELS} {out}")
    else:
        print("\nNo audio received (TTS may not be configured)")

    # Print timing report
    print(f"\n--- Timing Report ---")
    t_base = timings.get("end_audio", t_start)

    if "first_transcript" in timings:
        dt = timings["first_transcript"] - t_base
        print(f"end_audio -> transcript:    {dt:.2f}s")

    if "first_llm_token" in timings:
        ref = timings.get("first_transcript", t_base)
        dt = timings["first_llm_token"] - ref
        print(f"transcript -> first token:  {dt:.2f}s")

    if "first_audio" in timings:
        ref = timings.get("first_llm_token", t_base)
        dt = timings["first_audio"] - ref
        print(f"first token -> first audio: {dt:.2f}s")

    if "done" in timings:
        dt = timings["done"] - t_base
        print(f"Total pipeline time:        {dt:.2f}s")

    total = time.monotonic() - t_start
    print(f"Total session time:         {total:.2f}s")

    # Summary
    print(f"\n--- Summary ---")
    print(f"Transcript: \"{transcript}\"")
    print(f"Reading: {len(llm_text)} chars")
    print(f"Audio received: {len(received_audio)} bytes ({len(received_audio) / (SAMPLE_RATE * 2):.1f}s)")


def _elapsed(start: float) -> str:
    """Format elapsed time since start."""
    return f"{time.monotonic() - start:6.2f}s"


def main():
    parser = argparse.ArgumentParser(description="Test client for Spirit Sphere WebSocket")
    parser.add_argument("wav_file", nargs="?", help="WAV file to send (default: 3s silence)")
    parser.add_argument("--url", default=DEFAULT_URL, help=f"WebSocket URL (default: {DEFAULT_URL})")
    parser.add_argument("--deity", default=DEFAULT_DEITY, help=f"Deity ID (default: {DEFAULT_DEITY})")
    parser.add_argument("--intent", default=DEFAULT_INTENT, help=f"Reading intent (default: {DEFAULT_INTENT})")
    parser.add_argument("--output", default="test_output.pcm", help="Output PCM file path")
    args = parser.parse_args()

    # Load or generate audio
    if args.wav_file:
        if not Path(args.wav_file).exists():
            print(f"ERROR: File not found: {args.wav_file}")
            sys.exit(1)
        audio_bytes = read_wav_as_pcm(args.wav_file)
    else:
        print("No WAV file provided -- generating 3s of silence")
        audio_bytes = generate_silence(3.0)

    asyncio.run(run_test(
        url=args.url,
        deity_id=args.deity,
        intent=args.intent,
        audio_bytes=audio_bytes,
        output_path=args.output,
    ))


if __name__ == "__main__":
    main()
