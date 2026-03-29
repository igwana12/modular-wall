---
phase: 06-pov-globe-prototype-track-b
plan: 01
subsystem: firmware
tags: [esp32-s3, apa102, fastled, pov, hall-effect, motor-pwm, arduino, pillow, numpy]

requires:
  - phase: none
    provides: "First firmware plan, no prior dependencies"
provides:
  - "POV globe firmware scaffold (10 files) with FastLED DMA, Hall ISR, frame buffer, motor PWM"
  - "Python image-to-POV converter (equirectangular + flat modes, gamma correction)"
  - "Test pattern generator for hardware-free validation"
affects: [06-02, 06-03, pov-display-testing, sphere-assembly]

tech-stack:
  added: [FastLED, APA102-SPI-DMA, ESP32-S3-I2S, Pillow, numpy]
  patterns: [ISR-volatile-position-sync, zero-copy-column-access, non-blocking-motor-ramp, equirectangular-to-pov-projection]

key-files:
  created:
    - firmware/pov-globe/pov-globe.ino
    - firmware/pov-globe/config.h
    - firmware/pov-globe/led_driver.h
    - firmware/pov-globe/led_driver.cpp
    - firmware/pov-globe/hall_sensor.h
    - firmware/pov-globe/hall_sensor.cpp
    - firmware/pov-globe/frame_buffer.h
    - firmware/pov-globe/frame_buffer.cpp
    - firmware/pov-globe/motor_control.h
    - firmware/pov-globe/motor_control.cpp
    - scripts/image-to-pov.py
  modified:
    - .gitignore

key-decisions:
  - "BGR color order for APA102/SK9822 strips (FastLED standard)"
  - "memcpy hot-path for column display (108 bytes per call, faster than element-wise)"
  - "Linear RPM-to-duty mapping with CALIBRATE comment for real motor testing"
  - "Equirectangular projection as default sphere mode (matches world map inputs)"

patterns-established:
  - "Arduino multi-file project structure with config.h central definitions"
  - "IRAM_ATTR ISR with volatile variables for timing-critical sensor data"
  - "Zero-copy frame_get_column returning const CRGB* pointer"
  - "Non-blocking motor ramp using millis() state machine"
  - "Python CLI tool generating PROGMEM C headers from images"

requirements-completed: [POV-01, POV-02, POV-03]

duration: 4min
completed: 2026-03-29
---

# Phase 06 Plan 01: POV Globe Firmware Scaffold Summary

**ESP32-S3 POV globe firmware with FastLED APA102 DMA, Hall sensor ISR position sync, N20 motor PWM ramp, frame buffer with test pattern, and Python image-to-POV equirectangular converter**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-29T03:16:47Z
- **Completed:** 2026-03-29T03:20:29Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Complete POV globe firmware scaffold with 10 files: main sketch, config, LED driver, Hall sensor, frame buffer, motor control (all header + implementation pairs)
- FastLED APA102 configured with ESP32-S3 I2S DMA (4 buffers) for WiFi-resilient SPI output
- Hall sensor ISR with volatile revolution timing and 0.0-1.0 angular position for POV column sync
- Python CLI tool converts any image to PROGMEM C header with equirectangular sphere and flat projection modes, gamma correction, brightness control, and preview output

## Task Commits

Each task was committed atomically:

1. **Task 1: POV globe firmware scaffold** - `e9fa440` (feat)
2. **Task 2: Image-to-POV conversion tool** - `ef92798` (feat)

## Files Created/Modified
- `firmware/pov-globe/config.h` - Pin definitions, LED count, SPI speed, DMA config, motor PWM params
- `firmware/pov-globe/led_driver.h/.cpp` - FastLED APA102 wrapper with hot-path column display
- `firmware/pov-globe/hall_sensor.h/.cpp` - IRAM_ATTR ISR, revolution timing, angular position
- `firmware/pov-globe/frame_buffer.h/.cpp` - 120x36 CRGB array, zero-copy column access, test pattern
- `firmware/pov-globe/motor_control.h/.cpp` - ledcAttach (Core 3.x), non-blocking soft ramp
- `firmware/pov-globe/pov-globe.ino` - Main sketch with POV column-sync loop and serial debug
- `scripts/image-to-pov.py` - PNG to C header converter (sphere + flat modes, gamma, preview)
- `.gitignore` - Added firmware/ to whitelist

## Decisions Made
- BGR color order for APA102/SK9822 (FastLED standard for these strips)
- memcpy for column display hot path (108 bytes, faster than element-wise)
- Linear RPM-to-duty mapping as starting point (clearly marked for calibration with real motor)
- Equirectangular projection as default sphere mode (matches common map/texture inputs)
- .gitignore whitelist updated to track firmware/ directory

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added firmware/ to .gitignore whitelist**
- **Found during:** Task 1 (commit stage)
- **Issue:** Project uses gitignore whitelist pattern (`*` then `!` for allowed paths). firmware/ was not whitelisted, so git refused to add files.
- **Fix:** Added `!firmware/` and `!firmware/**` to .gitignore
- **Files modified:** .gitignore
- **Verification:** git add succeeded after fix
- **Committed in:** e9fa440 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Trivial gitignore fix, no scope creep.

## Issues Encountered
None beyond the gitignore whitelist fix documented above.

## User Setup Required
None - no external service configuration required. Arduino IDE with ESP32-S3 board support needed for compilation (not required until hardware arrives).

## Next Phase Readiness
- Firmware scaffold ready for 06-02 (hardware assembly and first-light testing)
- Image conversion tool ready to generate real content frames
- Test pattern built into firmware for immediate visual validation when hardware is assembled
- All code uses Arduino ESP32 Core 3.x APIs (ledcAttach, not deprecated ledcSetup)

## Self-Check: PASSED

All 11 created files verified. Both commit hashes (e9fa440, ef92798) confirmed in git log.

---
*Phase: 06-pov-globe-prototype-track-b*
*Completed: 2026-03-29*
