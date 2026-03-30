---
phase: 04-oracle-engine-hardware-fundamentals-track-a
plan: 03
subsystem: firmware
tags: [esp32-s3, arduino, websocket, voice-ai, push-to-talk, latency, state-machine]

# Dependency graph
requires:
  - phase: 04-oracle-engine-hardware-fundamentals-track-a/01
    provides: "orb-backend WebSocket /ws/sphere endpoint and protocol"
  - phase: 04-oracle-engine-hardware-fundamentals-track-a/02
    provides: "Arduino firmware with WiFi, I2S audio capture/playback"
provides:
  - "WebSocket client connecting ESP32 firmware to orb-backend /ws/sphere"
  - "6-state push-to-talk voice AI state machine"
  - "Base64 PCM audio encode/decode over JSON WebSocket protocol"
  - "Latency instrumentation (STT, LLM+TTS, total round-trip)"
  - "Serial debug commands for deity/intent switching"
affects: [05-01-intelligence-layer, 05-02-ota-update, 07-spirit-sphere-integration]

# Tech tracking
tech-stack:
  added: [ArduinoWebSockets, ArduinoJson-v7, mbedtls-base64]
  patterns: [state-machine-voice-ai, ring-buffer-audio-playback, latency-instrumentation, serial-debug-commands]

key-files:
  created:
    - firmware/oracle-engine/ws_client.h
    - firmware/oracle-engine/ws_client.cpp
  modified:
    - firmware/oracle-engine/oracle-engine.ino
    - firmware/oracle-engine/config.h

key-decisions:
  - "ArduinoWebSockets by Gil Maimon for WebSocket client -- lightweight, ESP32-compatible"
  - "Base64 PCM over JSON (not binary WebSocket frames) -- matches orb-backend protocol from 04-01"
  - "8KB ring buffer for TTS playback -- prevents gaps between audio chunks"
  - "Hardware verification deferred -- ESP32-S3-BOX-3 physical testing not available"

patterns-established:
  - "Voice AI state machine: IDLE -> CONNECTING -> READY -> LISTENING -> PROCESSING -> SPEAKING"
  - "Latency instrumentation at PTT release, transcript, first audio, done"
  - "Serial command interface for runtime configuration (deity, intent, status)"

requirements-completed: [HW-03, HW-04, HW-05]

# Metrics
duration: 5min
completed: 2026-03-30
---

# Phase 4 Plan 3: Voice AI WebSocket Round-Trip Summary

**WebSocket client with 6-state push-to-talk state machine, base64 audio streaming, and latency instrumentation -- hardware verification deferred**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-30T16:20:56Z
- **Completed:** 2026-03-30T16:25:00Z
- **Tasks:** 1 of 2 (Task 2 hardware verification deferred)
- **Files modified:** 4

## Accomplishments
- WebSocket client (ws_client.h/cpp) connects to orb-backend /ws/sphere with reconnect logic
- 6-state voice AI state machine: IDLE -> CONNECTING -> READY -> LISTENING -> PROCESSING -> SPEAKING
- Push-to-talk on GPIO 0 with 50ms debounce captures and streams audio via WebSocket
- Base64 encode/decode PCM audio for JSON WebSocket protocol (mbedtls)
- 8KB ring buffer for gap-free TTS audio playback
- Latency instrumentation: STT, LLM+TTS, and total round-trip timing printed to Serial
- Serial debug commands: deity:<name>, intent:<text>, status

## Task Commits

Each task was committed atomically:

1. **Task 1: WebSocket client and push-to-talk state machine** - `bb48745` (feat)
2. **Task 2: End-to-end voice round-trip test on hardware** - DEFERRED (checkpoint:human-verify -- hardware not available)

**Plan metadata:** (pending)

## Files Created/Modified
- `firmware/oracle-engine/ws_client.h` - WebSocket client header: ws_connect, ws_send_audio, ws_send_config, ws_send_end_audio, callback registration
- `firmware/oracle-engine/ws_client.cpp` - WebSocket client implementation using ArduinoWebSockets + ArduinoJson, base64 audio codec
- `firmware/oracle-engine/oracle-engine.ino` - Main sketch extended with 6-state voice AI state machine, PTT handling, latency instrumentation, serial commands
- `firmware/oracle-engine/config.h` - Added WS_MODE flag, WebSocket host/port/path config, library dependency notes

## Decisions Made
- ArduinoWebSockets by Gil Maimon selected for WebSocket client -- lightweight, well-maintained, ESP32-compatible
- Base64 PCM encoding over JSON frames matches the orb-backend protocol established in Plan 04-01
- 8KB ring buffer sized for TTS playback without gaps at 16kHz mono PCM
- Hardware verification (Task 2) deferred -- ESP32-S3-BOX-3 physical testing not currently available; firmware code is complete and compiles

## Deviations from Plan

None -- plan executed exactly as written. Task 2 (hardware verification checkpoint) deferred per user instruction.

## Hardware Verification Status

**Status: DEFERRED**

Task 2 was a `checkpoint:human-verify` gate requiring physical ESP32-S3-BOX-3 hardware with orb-backend running. The firmware code is complete and ready for testing. When hardware and backend are both available, follow the test procedure in 04-03-PLAN.md Task 2:

1. Flash firmware via Arduino IDE to ESP32-S3-BOX-3
2. Open Serial Monitor at 115200 baud
3. Verify WiFi + WebSocket connection
4. Hold BOOT button, speak, release -- hear deity voice response
5. Check latency report in Serial (target: total < 5000ms)
6. Test deity switching via serial command

**What is ready:**
- WebSocket client connects to ws://HOST:8300/ws/sphere
- PTT button captures and streams audio
- State machine handles full voice round-trip flow
- Latency measured at each stage and printed to Serial

**What needs verification:**
- Actual WebSocket connection over WiFi to orb-backend
- Audio capture RMS during speech
- STT transcript accuracy
- TTS audio clarity through speaker
- Real-world latency numbers

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all WebSocket client functions and state machine logic are fully implemented. No placeholder data or TODO markers.

## Next Phase Readiness
- Firmware is feature-complete for Phase 4 capstone (voice AI round-trip)
- Hardware verification pending -- must be performed before Phase 5 assumes working hardware baseline
- Phase 5 (Oracle Engine Product Shell) can begin intelligence layer work while hardware verification is scheduled separately

## Self-Check: PASSED

All files verified present, commit bb48745 confirmed in git log.

---
*Phase: 04-oracle-engine-hardware-fundamentals-track-a*
*Completed: 2026-03-30*
