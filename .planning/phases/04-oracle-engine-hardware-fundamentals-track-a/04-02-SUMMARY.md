---
phase: 04-oracle-engine-hardware-fundamentals-track-a
plan: 02
subsystem: firmware
tags: [esp32-s3, arduino, i2s, wifi, audio, loopback, box3]

# Dependency graph
requires:
  - phase: 04-oracle-engine-hardware-fundamentals-track-a/01
    provides: "Hardware research and ESP32-S3-BOX-3 platform decision"
provides:
  - "Arduino firmware project structure for Oracle Engine"
  - "WiFi connectivity with auto-reconnect"
  - "I2S audio capture (mic) and playback (speaker) with loopback test"
  - "Dual-target build config (BOX-3 and bare DevKit)"
affects: [04-03-websocket-streaming, 05-01-intelligence-layer, 05-02-ota-update]

# Tech tracking
tech-stack:
  added: [arduino-esp32-core-3.x, i2s-driver, es8311-codec, es7210-codec]
  patterns: [dual-target-ifdef, i2s-dual-port, wifi-auto-reconnect, heartbeat-monitoring]

key-files:
  created:
    - firmware/oracle-engine/oracle-engine.ino
    - firmware/oracle-engine/config.h
    - firmware/oracle-engine/wifi_manager.h
    - firmware/oracle-engine/wifi_manager.cpp
    - firmware/oracle-engine/audio_i2s.h
    - firmware/oracle-engine/audio_i2s.cpp
  modified: []

key-decisions:
  - "Dual I2S ports: port 0 for mic RX, port 1 for speaker TX"
  - "BOX-3 codec init stubbed with TODO -- may need esp-box BSP library for ES8311/ES7210"
  - "LOOPBACK_TEST define for mic-to-speaker echo test mode"
  - "Hardware verification deferred -- ESP32-S3-BOX-3 not available for physical testing"

patterns-established:
  - "TARGET_BOX3/TARGET_DEVKIT ifdef pattern for dual-target firmware"
  - "Heartbeat loop with uptime and free heap monitoring"
  - "WiFi auto-reconnect with 5-second health check interval"

requirements-completed: [HW-01, HW-02]

# Metrics
duration: 5min
completed: 2026-03-30
---

# Phase 04 Plan 02: ESP32-S3 Firmware Scaffold Summary

**Arduino firmware with WiFi auto-reconnect, I2S dual-port audio, and mic-to-speaker loopback test for ESP32-S3-BOX-3**

## Performance

- **Duration:** 5 min (firmware writing only; hardware verification deferred)
- **Started:** 2026-03-30T15:11:03Z
- **Completed:** 2026-03-30T15:15:00Z
- **Tasks:** 2 of 3 completed (Task 3 deferred -- hardware not available)
- **Files created:** 6

## Accomplishments
- Complete Arduino firmware project with WiFi connectivity, auto-reconnect, and heartbeat monitoring
- I2S audio capture (mic) and playback (speaker) on separate ports with real-time loopback test
- Dual-target build config supporting both ESP32-S3-BOX-3 (built-in codecs) and bare ESP32-S3-DevKitC-1 (external INMP441 + MAX98357A)
- BOX-3 codec init section present with I2C addresses for ES8311/ES7210 (stubbed for BSP library validation)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create firmware project with WiFi connection and LED blink** - `801e870` (feat)
2. **Task 2: Add I2S audio capture and playback with loopback test** - `3bc889f` (feat)
3. **Task 3: Verify hardware works -- WiFi + audio loopback on ESP32-S3-BOX-3** - DEFERRED (hardware not available)

## Files Created/Modified
- `firmware/oracle-engine/oracle-engine.ino` - Main sketch: boot banner, WiFi connect, I2S init, heartbeat loop, loopback test
- `firmware/oracle-engine/config.h` - Pin definitions for BOX-3 and DevKit targets, audio config, WiFi credentials placeholder
- `firmware/oracle-engine/wifi_manager.h` - WiFi connection interface with timeout and reconnect
- `firmware/oracle-engine/wifi_manager.cpp` - WiFi implementation using WiFi.begin with RSSI reporting
- `firmware/oracle-engine/audio_i2s.h` - I2S audio interface: init, capture, playback, deinit, RMS calculation
- `firmware/oracle-engine/audio_i2s.cpp` - I2S dual-port driver with BOX-3 codec I2C init stubs

## Decisions Made
- **Dual I2S ports**: Port 0 for mic RX, port 1 for speaker TX -- allows simultaneous capture and playback
- **BOX-3 codec init stubbed**: ES8311 (DAC) and ES7210 (ADC) I2C initialization included but marked TODO -- may need Espressif's esp-box BSP library for full codec configuration
- **LOOPBACK_TEST define**: Enabled by default in config.h for immediate hardware validation; comment out to disable
- **Hardware verification deferred**: ESP32-S3-BOX-3 not available for physical testing; firmware code complete and ready to flash when hardware arrives

## Deviations from Plan

None -- plan executed exactly as written for Tasks 1 and 2. Task 3 (hardware verification checkpoint) deferred per user direction since ESP32-S3-BOX-3 is not currently available.

## Known Stubs

1. **BOX-3 codec init** - `firmware/oracle-engine/audio_i2s.cpp` - ES8311/ES7210 I2C initialization is stubbed with TODO comment. Raw I2S may work without codec init, but full audio quality requires proper codec configuration. Will be validated when hardware is available.
2. **WiFi credentials** - `firmware/oracle-engine/config.h` lines 19-20 - Placeholder "YOUR_WIFI_SSID"/"YOUR_WIFI_PASS" must be set before flashing.

## Issues Encountered
None -- firmware code generated successfully.

## Hardware Verification Status

**Status: DEFERRED**

Task 3 required physical ESP32-S3-BOX-3 hardware for verification:
- WiFi connection confirmation via Serial Monitor
- Audio loopback test (speak into mic, hear through speaker)
- RMS level readings to confirm I2S capture works

The firmware is complete and ready to flash. When hardware is available:
1. Connect ESP32-S3-BOX-3 via USB-C
2. Set WIFI_SSID and WIFI_PASS in config.h
3. Upload via Arduino IDE 2.x (ESP32S3 Dev Module board)
4. Open Serial Monitor at 115200 baud
5. Verify boot banner, WiFi connection, and audio RMS readings
6. Speak into mic to test loopback

## User Setup Required
None -- no external service configuration required. WiFi credentials must be set in config.h before flashing.

## Next Phase Readiness
- Firmware scaffold ready for WebSocket streaming integration (Plan 04-03)
- Audio capture/playback functions (`audio_capture`, `audio_playback`) provide the API that WebSocket streaming will use
- Hardware verification must be completed before shipping to production
- BOX-3 codec init may need refinement based on physical testing results

## Self-Check: PASSED

- All 7 files found (6 firmware + 1 SUMMARY)
- Both task commits verified (801e870, 3bc889f)
- Task 3 deferred (hardware verification pending)

---
*Phase: 04-oracle-engine-hardware-fundamentals-track-a*
*Completed: 2026-03-30*
