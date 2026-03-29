---
phase: 04-oracle-engine-hardware-fundamentals-track-a
plan: 01
subsystem: api
tags: [websocket, assemblyai, stt, tts, elevenlabs, pcm, fastapi, esp32]

# Dependency graph
requires:
  - phase: 02-oracle-web-experience
    provides: "orb-backend server.py, pipeline.py, tts.py, rag.py, deity_config.py"
provides:
  - "/ws/sphere WebSocket endpoint with full voice AI pipeline"
  - "AssemblyAI STT module (REST API transcription)"
  - "PCM 16kHz TTS output for ESP32 hardware"
  - "Python test client for round-trip verification"
affects: [04-02-firmware, 04-03-integration]

# Tech tracking
tech-stack:
  added: [assemblyai-rest-api, pcm-16000-format]
  patterns: [websocket-json-protocol, pipeline-orchestration, sentence-boundary-tts]

key-files:
  created:
    - services/orb-backend/sphere_ws.py
    - services/orb-backend/stt.py
    - services/orb-backend/test_sphere_ws.py
  modified:
    - services/orb-backend/server.py
    - services/orb-backend/tts.py

key-decisions:
  - "AssemblyAI REST API (not WebSocket streaming) for v1 -- simpler, hardware sends complete utterance"
  - "PCM 16-bit 16kHz mono as bidirectional audio format -- native ESP32 I2S format"
  - "httpx for AssemblyAI calls (already a dependency) -- no new dep needed"
  - "JSON-typed WebSocket protocol with config/audio/end_audio client messages"

patterns-established:
  - "WebSocket JSON protocol: typed messages with 'type' field for Sphere hardware"
  - "Sentence-boundary TTS: accumulate LLM tokens, trigger TTS per sentence"
  - "PCM WAV header wrapping: raw PCM to WAV for API upload"

requirements-completed: [HW-03, HW-04]

# Metrics
duration: 3min
completed: 2026-03-29
---

# Phase 04 Plan 01: Sphere WebSocket Backend Summary

**Full voice AI pipeline over WebSocket: PCM audio in -> AssemblyAI STT -> Claude oracle reading -> ElevenLabs TTS -> PCM audio out, with Python test client measuring per-stage latency**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-29T02:43:42Z
- **Completed:** 2026-03-29T02:46:49Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Implemented /ws/sphere WebSocket endpoint replacing Phase 3 placeholder with full pipeline orchestration
- Built AssemblyAI STT module using REST API (upload -> transcribe -> poll pattern) with PCM-to-WAV conversion
- Added tts_stream_pcm() for 16kHz PCM output format (native ESP32 I2S format, no decoding needed on hardware)
- Created comprehensive test client with WAV file input, timing measurement, and audio save for playback verification

## Task Commits

Each task was committed atomically:

1. **Task 1: Build AssemblyAI STT module and WebSocket sphere handler** - `b97621b` (feat)
2. **Task 2: Build Python WebSocket test client for round-trip verification** - `815a0f8` (feat)

## Files Created/Modified
- `services/orb-backend/stt.py` - AssemblyAI REST STT with PCM-to-WAV conversion and polling
- `services/orb-backend/sphere_ws.py` - WebSocket handler orchestrating STT->LLM->TTS pipeline
- `services/orb-backend/test_sphere_ws.py` - CLI test client simulating ESP32 with timing reports
- `services/orb-backend/server.py` - Replaced placeholder /ws/sphere with real handler import
- `services/orb-backend/tts.py` - Added tts_stream_pcm() for 16kHz PCM output format

## Decisions Made
- Used AssemblyAI REST API (not WebSocket streaming) for v1 simplicity -- hardware sends complete utterances, no need for real-time partial transcripts yet
- PCM 16-bit 16kHz mono as the bidirectional audio format -- matches ESP32 I2S native format, no codec needed on hardware
- Used httpx (already a dependency) for AssemblyAI HTTP calls instead of adding assemblyai SDK
- JSON-typed WebSocket protocol (config, audio, end_audio, status, transcript, text, audio, done, error) for clear state machine

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - AssemblyAI and ElevenLabs API keys already configured on Smithers via load-keys.sh pattern.

## Next Phase Readiness
- /ws/sphere endpoint ready for ESP32 firmware (Plan 04-02) to connect against
- Test client available for verifying backend independently of hardware
- PCM format matches ESP32 I2S expectations (16-bit, 16kHz, mono)

## Self-Check: PASSED

All 5 files verified present. Both commit hashes confirmed in git log.

---
*Phase: 04-oracle-engine-hardware-fundamentals-track-a*
*Completed: 2026-03-29*
