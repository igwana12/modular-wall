---
phase: 07-spirit-sphere-integration
plan: 01
subsystem: firmware
tags: [esp32-s3, freertos, dual-core, apa102, i2s, websocket, pov, arduino]

# Dependency graph
requires:
  - phase: 04-oracle-engine-audio-firmware
    provides: "Audio I2S, WebSocket client, WiFi manager, WiFi provisioning, OTA update modules"
  - phase: 05-oracle-engine-backend-intelligence
    provides: "Captive portal provisioning, OTA update system"
  - phase: 06-pov-globe-prototype-track-b
    provides: "LED driver, Hall sensor, frame buffer, motor control, image data modules"
provides:
  - "Unified spirit-sphere firmware directory with dual-core FreeRTOS architecture"
  - "Inter-core state machine with typed event queue (SphereEventType)"
  - "Mute button GPIO with IRAM_ATTR ISR and LED indicator"
  - "Status display module (Serial output, TFT_eSPI ready)"
  - "Merged config.h with no GPIO conflicts for BOX-3 target"
affects: [07-02-animation-pipeline, 07-03-integration-test, 07-04-polish]

# Tech tracking
tech-stack:
  added: []
  patterns: [freertos-dual-core-pinned-tasks, inter-core-queue-messaging, isr-debounce-pattern]

key-files:
  created:
    - firmware/spirit-sphere/spirit-sphere.ino
    - firmware/spirit-sphere/config.h
    - firmware/spirit-sphere/state_machine.h
    - firmware/spirit-sphere/state_machine.cpp
    - firmware/spirit-sphere/audio_task.h
    - firmware/spirit-sphere/audio_task.cpp
    - firmware/spirit-sphere/led_task.h
    - firmware/spirit-sphere/led_task.cpp
    - firmware/spirit-sphere/mute_button.h
    - firmware/spirit-sphere/mute_button.cpp
    - firmware/spirit-sphere/status_display.h
    - firmware/spirit-sphere/status_display.cpp
  modified: []

key-decisions:
  - "SPI_SPEED reduced to 6MHz (from 12MHz) for slip ring signal integrity per research pitfall 4"
  - "Removed FASTLED_ESP32_I2S defines -- APA102 uses hardware SPI, I2S reserved for audio"
  - "Audio task priority 2 (above WiFi default 1), LED task priority 3 (highest for POV timing)"
  - "motor_ramp called repeatedly in LED task loop for non-blocking ramp behavior (motor_update not a separate function)"

patterns-established:
  - "FreeRTOS dual-core: Core 0 for network/audio, Core 1 for timing-critical LED/motor"
  - "Inter-core communication via typed event queue (xQueueSend/xQueueReceive)"
  - "IRAM_ATTR ISR with millis() debounce for GPIO buttons"
  - "No bare delay() in FreeRTOS tasks -- vTaskDelay() and delayMicroseconds() only"

requirements-completed: [SPHERE-01, SPHERE-02, SPHERE-06, SPHERE-08, SPHERE-09]

# Metrics
duration: 6min
completed: 2026-03-31
---

# Phase 07 Plan 01: Unified Firmware Scaffold Summary

**Dual-core FreeRTOS firmware merging Oracle Engine audio pipeline (Core 0) and POV Globe LED display (Core 1) with inter-core state queue, mute button ISR, and 31-file unified sketch**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-31T08:37:35Z
- **Completed:** 2026-03-31T08:43:18Z
- **Tasks:** 2
- **Files created:** 31

## Accomplishments
- Merged Oracle Engine and POV Globe into single firmware/spirit-sphere/ directory with no GPIO conflicts
- Dual-core FreeRTOS architecture: audioTask pinned to Core 0, ledTask pinned to Core 1
- Inter-core state machine with typed SphereEventType enum and 10-deep FreeRTOS queue
- Mute button with IRAM_ATTR ISR, 50ms debounce, and LED indicator on GPIO 39/40
- All 10 Phase 4-6 modules carried forward unchanged (audio_i2s, ws_client, wifi_manager, wifi_provision, ota_update, led_driver, hall_sensor, frame_buffer, motor_control, image_data)
- Removed vestigial FASTLED_ESP32_I2S defines that would conflict with audio I2S peripheral
- SPI clock reduced to 6MHz for slip ring signal integrity

## Task Commits

Each task was committed atomically:

1. **Task 1: Create unified config.h, state machine, and mute button modules** - `f1c3eca` (feat)
2. **Task 2: Create FreeRTOS task wrappers and main sketch, copy carried-forward modules** - `cd60396` (feat)

## Files Created/Modified
- `firmware/spirit-sphere/config.h` - Merged pin definitions from both firmware tracks, FreeRTOS task config
- `firmware/spirit-sphere/state_machine.h/cpp` - Inter-core event queue with SphereEventType enum
- `firmware/spirit-sphere/mute_button.h/cpp` - GPIO mute toggle with IRAM_ATTR ISR and LED indicator
- `firmware/spirit-sphere/status_display.h/cpp` - Serial-based status output (TFT_eSPI ready for BOX-3)
- `firmware/spirit-sphere/audio_task.h/cpp` - Core 0 FreeRTOS wrapper: WiFi, WebSocket, audio, OTA
- `firmware/spirit-sphere/led_task.h/cpp` - Core 1 FreeRTOS wrapper: POV rendering, Hall sync, motor
- `firmware/spirit-sphere/spirit-sphere.ino` - Main sketch with dual xTaskCreatePinnedToCore calls
- `firmware/spirit-sphere/audio_i2s.h/cpp` - Carried from oracle-engine (unchanged)
- `firmware/spirit-sphere/ws_client.h/cpp` - Carried from oracle-engine (unchanged)
- `firmware/spirit-sphere/wifi_manager.h/cpp` - Carried from oracle-engine (unchanged)
- `firmware/spirit-sphere/wifi_provision.h/cpp` - Carried from oracle-engine (unchanged)
- `firmware/spirit-sphere/ota_update.h/cpp` - Carried from oracle-engine (unchanged)
- `firmware/spirit-sphere/led_driver.h/cpp` - Carried from pov-globe (unchanged)
- `firmware/spirit-sphere/hall_sensor.h/cpp` - Carried from pov-globe (unchanged)
- `firmware/spirit-sphere/frame_buffer.h/cpp` - Carried from pov-globe (unchanged)
- `firmware/spirit-sphere/motor_control.h/cpp` - Carried from pov-globe (unchanged)
- `firmware/spirit-sphere/image_data.h` - Carried from pov-globe (unchanged)

## Decisions Made
- SPI_SPEED reduced to 6MHz (from 12MHz) for slip ring signal integrity per research findings
- Removed FASTLED_ESP32_I2S defines to prevent I2S peripheral conflict with audio_i2s module
- Audio task priority 2, LED task priority 3 -- POV timing is most critical, audio above WiFi default
- motor_ramp() called repeatedly in LED task loop as the non-blocking update mechanism
- Status display uses Serial.println universally -- TFT_eSPI for BOX-3 touchscreen deferred

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all modules are fully wired. Deity animation frames use test pattern as fallback when FRAME_DATA is not defined (intentional; Plan 07-02 will generate animation frames).

## Next Phase Readiness
- Unified firmware scaffold complete, ready for Plan 07-02 (animation pipeline)
- All carried-forward modules resolve config.h from sketch directory automatically
- State machine queue is ready for deity-specific animation events
- Frame buffer accepts new image data via frame_load() for dynamic deity animations

## Self-Check: PASSED

All 31 firmware files verified present. Both task commits (f1c3eca, cd60396) verified in git log. SUMMARY.md exists at expected path.

---
*Phase: 07-spirit-sphere-integration*
*Completed: 2026-03-31*
