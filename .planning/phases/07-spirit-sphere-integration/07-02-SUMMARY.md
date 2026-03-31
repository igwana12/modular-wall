---
phase: 07-spirit-sphere-integration
plan: 02
subsystem: hardware
tags: [pov, led, esp32, bom, wiring, pillow, progmem, apa102]

requires:
  - phase: 06-pov-globe-prototype-track-b
    provides: image-to-pov.py converter script and POV frame buffer API
provides:
  - Zeus deity POV animation as PROGMEM frame data (firmware/spirit-sphere/image_data.h)
  - Hardware bill of materials with sourcing and pricing (hardware/bom.md)
  - Pin-to-pin wiring diagram for bench rig assembly (hardware/wiring-diagram.md)
  - Zeus source image generator script (scripts/generate-zeus-pov.py)
affects: [07-spirit-sphere-integration, hardware-assembly, firmware-integration]

tech-stack:
  added: [Pillow (image generation)]
  patterns: [equirectangular-to-POV pipeline, PROGMEM frame data format]

key-files:
  created:
    - firmware/spirit-sphere/image_data.h
    - hardware/bom.md
    - hardware/wiring-diagram.md
    - scripts/generate-zeus-pov.py
    - scripts/zeus-pov-source.png
  modified: []

key-decisions:
  - "sizeof(FRAME_DATA) instead of #define for FRAME_DATA_LEN -- type-safe, compile-time resolved"
  - "SPI_SPEED 6MHz recommended for slip ring reliability (derated from 12MHz in pov-globe config)"
  - "ESP32-S3-BOX-3 built-in mic/speaker eliminates separate audio hardware for bench rig"

patterns-established:
  - "Zeus image generator pattern: Pillow script -> PNG -> image-to-pov.py -> PROGMEM header"
  - "BOM procurement tracking: all items listed with TO ORDER / ON HAND status"

requirements-completed: [SPHERE-05]

duration: 4min
completed: 2026-03-31
---

# Phase 7 Plan 2: Zeus POV Animation + Hardware Documentation Summary

**Zeus lightning bolt POV frame data (12960 bytes PROGMEM) plus complete BOM ($127) and pin-to-pin wiring diagram for Spirit Sphere bench rig**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-31T08:37:46Z
- **Completed:** 2026-03-31T08:41:50Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Generated Zeus lightning bolt image (480x240, gold bolt on navy background with glow effects)
- Converted to PROGMEM header via image-to-pov.py (120 columns x 36 LEDs x 3 bytes = 12960 bytes)
- Created comprehensive BOM with 20 components, pricing, sourcing, and procurement status tracking
- Created pin-to-pin wiring diagram covering SPI->slip ring->APA102, motor, Hall sensor, mute button, and battery system

## Task Commits

Each task was committed atomically:

1. **Task 1: Generate Zeus deity POV animation frame data** - `70bbdde` (feat)
2. **Task 2: Create hardware BOM and wiring diagram** - `fc2cc1f` (docs)

## Files Created/Modified
- `firmware/spirit-sphere/image_data.h` - Zeus lightning bolt PROGMEM frame data (12960 bytes)
- `scripts/generate-zeus-pov.py` - Pillow script generating Zeus lightning bolt source image
- `scripts/zeus-pov-source.png` - 480x240 equirectangular source image for POV converter
- `hardware/bom.md` - Bill of materials with 20 components, pricing, sourcing, lead times
- `hardware/wiring-diagram.md` - Complete pin-to-pin connection guide with ASCII diagrams

## Decisions Made
- Used `const size_t FRAME_DATA_LEN = sizeof(FRAME_DATA)` instead of `#define FRAME_DATA_LEN 12960` -- this is what image-to-pov.py generates and is type-safe C++ practice
- Recommended SPI_SPEED deration to 6MHz for slip ring reliability (existing pov-globe config uses 12MHz for direct connection)
- Documented ESP32-S3-BOX-3's built-in mic/speaker as eliminating separate INMP441 and MAX98357A for bench rig phase

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- `hardware/` directory was gitignored -- used `git add -f` to force-add the files

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Zeus frame data ready for integration with firmware led_task.cpp via `frame_load(FRAME_DATA, FRAME_DATA_LEN)`
- Hardware procurement can begin immediately using BOM -- ESP32-S3-BOX-3 and APA102 strip are critical path items
- Wiring diagram provides assembly guide once components arrive
- Additional deity animations can be generated using the same pipeline (generate script -> image-to-pov.py -> PROGMEM header)

---
*Phase: 07-spirit-sphere-integration*
*Completed: 2026-03-31*
