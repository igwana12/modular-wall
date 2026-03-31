---
phase: 07-spirit-sphere-integration
plan: 03
subsystem: testing, firmware
tags: [esp32, watchdog, freertos, integration-testing, stability]

requires:
  - phase: 07-spirit-sphere-integration (Plan 01)
    provides: Unified dual-core firmware with audio + LED tasks
provides:
  - Integration test plan with 8 test procedures (boot through 10-min demo)
  - Bench test log template for recording physical test results
  - Watchdog timer (30s) protecting both FreeRTOS tasks
  - Heap monitoring with warning/critical thresholds
  - WiFi auto-reconnect and motor safety shutoff
affects: [spirit-sphere-hardware-testing, kickstarter-demo]

tech-stack:
  added: [esp_task_wdt.h]
  patterns: [watchdog-per-task, heap-threshold-monitoring, motor-safety-shutoff]

key-files:
  created:
    - tests/07-integration-test-plan.md
    - tests/07-bench-test-log.md
  modified:
    - firmware/spirit-sphere/spirit-sphere.ino
    - firmware/spirit-sphere/audio_task.cpp
    - firmware/spirit-sphere/led_task.cpp
    - firmware/spirit-sphere/config.h

key-decisions:
  - "Watchdog feeds in both normal render path AND idle-wait path to prevent false resets"
  - "Motor safety shutoff after 5s with no Hall pulses prevents runaway motor"
  - "WiFi reconnect check every 5s in audio task keeps connection alive during long demos"

patterns-established:
  - "esp_task_wdt_add/reset pattern: subscribe at task start, reset at end of each loop iteration"
  - "Heap dual-threshold: warning at 40KB (operational concern), critical at 30KB (possible leak)"

requirements-completed: [SPHERE-07]

duration: 4min
completed: 2026-03-31
---

# Phase 07 Plan 03: Integration Test Plan & Firmware Stability Summary

**8-scenario integration test plan, bench test log template, and firmware hardened with watchdog timer + heap monitoring + WiFi reconnect + motor safety shutoff for reliable 10-minute demos**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-31T08:48:08Z
- **Completed:** 2026-03-31T08:52:08Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Integration test plan covering 8 scenarios from firmware flash through 10-minute continuous demo (SPHERE-07 capstone)
- Bench test log template with structured tables for audio latency, stability metrics, and PASS/FAIL tracking
- ESP32 Task Watchdog Timer with 30s timeout protecting both audio and LED FreeRTOS tasks
- Enhanced heartbeat with min-free-heap tracking, heap warning/critical thresholds, WiFi status
- WiFi auto-reconnect in audio task and motor safety shutoff in LED task

## Task Commits

Each task was committed atomically:

1. **Task 1: Create integration test plan and bench test log template** - `1854ce6` (feat)
2. **Task 2: Add watchdog timer and stability monitoring to firmware** - `a8ff177` (feat)

## Files Created/Modified
- `tests/07-integration-test-plan.md` - 8 test procedures with prerequisites, steps, pass criteria, failure modes
- `tests/07-bench-test-log.md` - Structured template for recording bench test results
- `firmware/spirit-sphere/spirit-sphere.ino` - Watchdog init, enhanced heartbeat with heap thresholds
- `firmware/spirit-sphere/audio_task.cpp` - Watchdog subscribe/feed, WiFi auto-reconnect
- `firmware/spirit-sphere/led_task.cpp` - Watchdog subscribe/feed, motor safety shutoff on Hall timeout
- `firmware/spirit-sphere/config.h` - WDT_TIMEOUT_MS, heap thresholds, reconnect/motor timeout defines

## Decisions Made
- Watchdog feeds placed in both active rendering path AND idle-wait path in LED task to prevent false resets when motor is stopped
- Motor safety shutoff uses dedicated tracking (lastHallActivity) separate from existing HALL_TIMEOUT_US logic
- WiFi reconnect interval reuses existing WIFI_RECONNECT_INTERVAL_MS (5s) from config
- Added WiFi.h include to spirit-sphere.ino for WiFi.isConnected() in enhanced heartbeat

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added WiFi.h include to spirit-sphere.ino**
- **Found during:** Task 2 (adding WiFi.isConnected() to heartbeat)
- **Issue:** Enhanced heartbeat uses WiFi.isConnected() but WiFi.h was not included in main sketch
- **Fix:** Added `#include <WiFi.h>` to spirit-sphere.ino includes
- **Files modified:** firmware/spirit-sphere/spirit-sphere.ino
- **Verification:** Compile-time include resolved
- **Committed in:** a8ff177 (Task 2 commit)

**2. [Rule 2 - Missing Critical] Added watchdog feed in LED task idle path**
- **Found during:** Task 2 (watchdog integration in led_task.cpp)
- **Issue:** Plan only specified watchdog feed at end of main loop, but LED task has an early `continue` when no Hall signal -- would starve watchdog
- **Fix:** Added esp_task_wdt_reset() before the `continue` in the Hall timeout branch
- **Files modified:** firmware/spirit-sphere/led_task.cpp
- **Verification:** Both active and idle paths feed watchdog
- **Committed in:** a8ff177 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 missing critical)
**Impact on plan:** Both fixes necessary for correctness. Without WiFi.h, sketch would fail to compile. Without idle-path watchdog feed, device would reboot whenever motor stops.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Firmware is hardened and ready for physical bench testing when ESP32-S3-BOX-3 hardware arrives
- Test procedures documented for systematic validation
- SPHERE-07 (10-minute demo reliability) has a defined test protocol and log template
- All Phase 07 plans complete -- Spirit Sphere integration phase done

## Self-Check: PASSED

All files exist, all commits verified.

---
*Phase: 07-spirit-sphere-integration*
*Completed: 2026-03-31*
