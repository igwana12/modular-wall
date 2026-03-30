---
phase: 06-pov-globe-prototype-track-b
plan: 03
subsystem: firmware
tags: [esp32, pov, fastled, apa102, spherical-rendering, brightness, motor-control]

# Dependency graph
requires:
  - phase: 06-02
    provides: "Flat POV calibration values and proven electronics (Hall sensor, motor, LED strip)"
provides:
  - "Spherical POV firmware with equirectangular column mapping"
  - "Maximum brightness mode for ambient room visibility"
  - "Motor soft-start and noise reduction parameters"
  - "Serial live-tuning commands for hardware calibration"
affects: [07-spirit-sphere-integration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Spherical column mapping via equirectangular projection (longitude=column, latitude=LED)"
    - "APA102 dual brightness control (5-bit global + 8-bit per-LED PWM) for max ambient output"
    - "Boost mode trades resolution for perceived brightness (120 -> 60 columns, 2x display time)"

key-files:
  created: []
  modified:
    - firmware/pov-globe/config.h
    - firmware/pov-globe/pov-globe.ino
    - firmware/pov-globe/led_driver.cpp
    - firmware/pov-globe/led_driver.h
    - firmware/pov-globe/frame_buffer.cpp

key-decisions:
  - "Hardware verification deferred -- POV components (ESP32-S3, APA102, Hall sensor, N20 motor, slip ring) not yet available"
  - "Firmware is code-complete and flash-ready for all three requirements (POV-03, POV-04, POV-05)"
  - "Boost mode as fallback if ambient visibility insufficient at max brightness"

patterns-established:
  - "Serial tuning protocol: +/- brightness, f/s motor speed, c config dump, p pause LEDs"

requirements-completed: []

# Metrics
duration: 3min
completed: 2026-03-30
---

# Phase 06 Plan 03: Spherical POV Globe Summary

**Spherical POV firmware with equirectangular mapping, max brightness for ambient visibility, and motor noise reduction -- hardware verification deferred pending component arrival**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-30T20:09:51Z
- **Completed:** 2026-03-30T20:12:00Z
- **Tasks:** 1 of 2 (Task 2 deferred -- hardware not available)
- **Files modified:** 5

## Accomplishments
- Spherical POV mode with equirectangular column mapping (longitude=column, latitude=LED position)
- Maximum brightness configuration (255) with APA102 global brightness at 31 for ambient room visibility
- Boost mode option that doubles column display time (trades 120->60 resolution for 2x perceived brightness)
- Motor soft-start with 3-second PWM ramp and configurable hold duty for noise reduction
- Serial live-tuning commands for brightness, motor speed, config dump, and LED pause (for noise measurement)

## Task Commits

Each task was committed atomically:

1. **Task 1: Update firmware for spherical POV mode with brightness optimization** - `e9f68a1` (feat)
2. **Task 2: Verify spherical POV globe with ambient visibility and noise measurement** - DEFERRED (hardware not available)

## Files Created/Modified
- `firmware/pov-globe/config.h` - Added POV_MODE_SPHERE, BOOST_MODE, MOTOR_RAMP_MS, MOTOR_HOLD_DUTY, BRIGHTNESS=255
- `firmware/pov-globe/pov-globe.ino` - Spherical column mapping logic, serial tuning commands (+/-/f/s/c/p)
- `firmware/pov-globe/led_driver.cpp` - Max brightness output, global brightness control, boost mode support
- `firmware/pov-globe/led_driver.h` - Added led_set_global_brightness() and boost mode declarations
- `firmware/pov-globe/frame_buffer.cpp` - Equirectangular sphere mapping for column retrieval

## Decisions Made
- Hardware verification (POV-03, POV-04, POV-05) deferred -- ESP32-S3, APA102 strip, Hall sensor, N20 motor, and slip ring not yet available for physical testing
- Firmware is code-complete and flash-ready; will be tested when components arrive
- Boost mode included as fallback strategy if ambient visibility proves insufficient at maximum brightness

## Deviations from Plan

None -- plan executed as written for Task 1. Task 2 (hardware verification checkpoint) deferred per user decision due to hardware unavailability.

## Hardware Verification Status

**POV-03 (Spherical Rendering):** DEFERRED -- firmware implements equirectangular column mapping; needs physical assembly to verify image quality
**POV-04 (Ambient Visibility):** DEFERRED -- brightness set to maximum (255) with boost mode available; needs real-world lighting test
**POV-05 (Motor Noise):** DEFERRED -- soft-start ramp and hold duty configured; needs dB measurement at 30cm

Requirements POV-03, POV-04, POV-05 are NOT marked complete -- they require physical hardware verification.

## Issues Encountered
None -- firmware changes compiled against existing scaffold without issues.

## User Setup Required
**Hardware assembly required when components arrive.** See plan 06-03-PLAN.md user_setup section for:
- LED arm vertical mount on motor shaft
- 4-wire slip ring connection (VCC, GND, SPI_DATA, SPI_CLK)
- Optional transparent sphere/dome enclosure
- Rubber damping pads for noise reduction

## Next Phase Readiness
- Phase 06 is code-complete across all 3 plans (scaffold, calibration, spherical POV)
- Hardware verification blocked on component arrival (ESP32-S3, APA102, Hall sensor, N20 motor, slip ring)
- When components arrive, flash firmware and run verification checklist from Task 2
- Phase 07 (Spirit Sphere integration) can proceed with software work but physical integration depends on hardware verification

## Self-Check: PASSED

All files verified present. Commit e9f68a1 confirmed in git history.

---
*Phase: 06-pov-globe-prototype-track-b*
*Completed: 2026-03-30*
