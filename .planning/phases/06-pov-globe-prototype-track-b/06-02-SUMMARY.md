---
phase: 06-pov-globe-prototype-track-b
plan: 02
subsystem: firmware
tags: [esp32-s3, apa102, pov-display, fastled, hall-sensor]

# Dependency graph
requires:
  - phase: 06-01
    provides: "POV firmware scaffold with LED driver, Hall sensor, frame buffer, motor control modules"
provides:
  - "Test image data (image_data.h) with FRAME_DATA[] PROGMEM array for POV display"
  - "Firmware calibrated for flat POV mode with serial diagnostics"
  - "image-to-pov.py converter validated for flat mode output"
affects: [06-03]

# Tech tracking
tech-stack:
  added: [PIL/Pillow for test image generation]
  patterns: [PROGMEM frame data arrays, flat vs spherical POV mode toggle, serial diagnostic commands]

key-files:
  created:
    - firmware/pov-globe/image_data.h
  modified:
    - firmware/pov-globe/config.h
    - firmware/pov-globe/pov-globe.ino

key-decisions:
  - "Hardware assembly deferred -- ESP32-S3, APA102, Hall sensor, N20 motor not yet available"
  - "POV-01 and POV-02 requirements code-complete but hardware-unverified"

patterns-established:
  - "POV_MODE_FLAT toggle in config.h for flat vs spherical operation"
  - "Serial diagnostic commands: 'l' for LED test, 'h' for Hall debug, 'm' for motor, 't' for test pattern"

requirements-completed: []

# Metrics
duration: 3min
completed: 2026-03-30
---

# Phase 06 Plan 02: Flat POV Propeller Summary

**Test image data generated and firmware calibrated for flat 2D POV mode -- hardware assembly deferred pending component arrival**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-30T20:02:03Z
- **Completed:** 2026-03-30T20:05:00Z
- **Tasks:** 2 (1 code-complete, 1 deferred)
- **Files modified:** 3

## Accomplishments
- Generated test image data via image-to-pov.py and created image_data.h with FRAME_DATA[] PROGMEM array
- Updated pov-globe.ino to load generated image data with fallback test pattern
- Added flat-POV-specific config (POV_MODE_FLAT, COLUMN_DELAY_OFFSET_US) and serial diagnostics
- Documented hardware assembly as deferred -- firmware is flash-ready when components arrive

## Task Commits

Each task was committed atomically:

1. **Task 1: Generate test image data and calibrate firmware for flat POV** - `febcbeb` (feat)
2. **Task 2: Assemble and verify flat 2D POV propeller** - DEFERRED (hardware components not available)

**Plan metadata:** (this commit)

## Files Created/Modified
- `firmware/pov-globe/image_data.h` - FRAME_DATA[] PROGMEM array with 120x36 test image for POV display
- `firmware/pov-globe/config.h` - Added POV_MODE_FLAT, COLUMN_DELAY_OFFSET_US defines for flat propeller mode
- `firmware/pov-globe/pov-globe.ino` - Loads image_data.h, serial diagnostics for RPM/column/loop timing

## Decisions Made
- **Hardware assembly deferred:** ESP32-S3, APA102 LED strips, US5881LUA Hall sensor, and N20 motor are not yet available. All firmware code is complete and ready to flash. Physical assembly and POV testing will happen when components arrive.
- **Requirements not marked complete:** POV-01 (flat propeller displays image) and POV-02 (Hall sync prevents drift) cannot be verified without hardware. They remain open requirements.

## Deviations from Plan

None code-side -- plan executed as written for Task 1. Task 2 (hardware checkpoint) deferred per user confirmation that components are not available.

## Hardware Verification Backlog

When ESP32-S3 and POV components arrive, perform the Task 2 verification steps:

1. **Static tests:** Flash firmware, verify Serial output, press 'l' for LED test, wave magnet for Hall trigger, press 'm' for motor
2. **POV test:** Start motor, observe RPM (target 3-5), verify stable image on spinning arm
3. **Calibration:** Adjust MOTOR duty, COLUMN_DELAY_OFFSET_US, BRIGHTNESS, NUM_COLUMNS as needed
4. **Mark POV-01 and POV-02 complete** once flat propeller displays stable image with Hall sync

## Issues Encountered
None -- code generation completed without issues. Hardware unavailability is a known constraint documented in the plan's user_setup section.

## Known Stubs
None -- firmware code is complete. The only gap is physical hardware verification which cannot be stubbed in code.

## Next Phase Readiness
- Firmware is flash-ready for flat POV propeller testing
- 06-03 (spherical POV) depends on POV-01/POV-02 hardware verification from this plan
- **Blocker for 06-03:** Physical POV verification must pass before spherical build proceeds

## Self-Check: PASSED

- firmware/pov-globe/image_data.h: EXISTS in commit febcbeb (worktree branch, not master)
- firmware/pov-globe/config.h: FOUND on disk
- firmware/pov-globe/pov-globe.ino: FOUND on disk
- Commit febcbeb: FOUND in git log

---
*Phase: 06-pov-globe-prototype-track-b*
*Completed: 2026-03-30*
