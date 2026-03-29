---
phase: 05-oracle-engine-product-shell-track-a
plan: 02
subsystem: infra
tags: [ota, esp32, fastapi, firmware, httpupdate, arduinojson]

# Dependency graph
requires:
  - phase: 04-oracle-engine-hardware-fundamentals-track-a
    provides: orb-backend server.py with FastAPI endpoints
provides:
  - OTA firmware serving backend module (ota.py)
  - OTA check/download/manifest API endpoints
  - ESP32 OTA update firmware module (ota_update.h/cpp)
  - Placeholder firmware manifest
affects: [04-oracle-engine-hardware-fundamentals-track-a, 06-pov-globe-prototype-track-b]

# Tech tracking
tech-stack:
  added: [HTTPUpdate (ESP32 Core 3.x), ArduinoJson]
  patterns: [semantic version comparison, firmware manifest JSON, FileResponse binary serving]

key-files:
  created:
    - services/orb-backend/ota.py
    - services/orb-backend/firmware_bin/manifest.json
    - firmware/oracle-engine/ota_update.h
    - firmware/oracle-engine/ota_update.cpp
    - firmware/oracle-engine/README.md
  modified:
    - services/orb-backend/server.py
    - services/orb-backend/models.py

key-decisions:
  - "Semantic version comparison via split-on-dots integer compare -- no external library needed"
  - "Binary existence check before reporting update_available -- prevents bricked devices"
  - "SHA256 verification deferred to v2 -- noted in code comments"

patterns-established:
  - "OTA manifest pattern: JSON manifest in firmware_bin/ directory with version, filename, size, sha256"
  - "Firmware module pattern: .h/.cpp pairs in firmware/oracle-engine/ with static state and Serial logging"

requirements-completed: [ENGINE-05]

# Metrics
duration: 3min
completed: 2026-03-29
---

# Phase 05 Plan 02: OTA Firmware Update System Summary

**Backend OTA serving with version manifests plus ESP32 httpUpdate client for wireless firmware updates**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-29T03:18:29Z
- **Completed:** 2026-03-29T03:21:02Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Backend ota.py module with manifest loading, semantic version comparison, and firmware path resolution
- Three OTA endpoints (/api/ota/check, /api/ota/download, /api/ota/manifest) mounted on FastAPI app
- ESP32 Arduino firmware module with HTTPUpdate integration, rate-limited checking, and error reporting
- OTA status integrated into health endpoint for monitoring

## Task Commits

Each task was committed atomically:

1. **Task 1: OTA firmware server module and endpoints** - `7ac2c08` (feat)
2. **Task 2: ESP32 OTA update firmware module** - `2a726f9` (feat)

## Files Created/Modified
- `services/orb-backend/ota.py` - OTA module: manifest loading, version comparison, update checking
- `services/orb-backend/firmware_bin/manifest.json` - Placeholder firmware manifest (v0.0.1)
- `services/orb-backend/server.py` - Added OTA endpoints and health status
- `services/orb-backend/models.py` - Added OtaCheckResponse model
- `firmware/oracle-engine/ota_update.h` - Arduino OTA header with otaInit/otaCheckForUpdate/otaGetVersion/otaGetLastError
- `firmware/oracle-engine/ota_update.cpp` - HTTPUpdate integration with ArduinoJson parsing and rate limiting
- `firmware/oracle-engine/README.md` - Usage docs with board compatibility notes

## Decisions Made
- Semantic version comparison uses simple split-on-dots integer comparison -- no semver library needed for this use case
- Binary existence check gates update_available to prevent devices from attempting downloads that would fail
- SHA256 verification of downloaded binary deferred to v2 (documented in code comments)
- Rate limiting built into firmware module (OTA_CHECK_INTERVAL_MS = 1 hour) to prevent server hammering

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- OTA backend is ready to serve firmware binaries once real .bin files are placed in firmware_bin/
- ESP32 firmware module is ready to be #included in Phase 4 Plan 02 firmware scaffold
- To deploy a firmware update: build .bin in Arduino IDE, place in firmware_bin/, update manifest.json

## Self-Check: PASSED

All 7 files verified present. Both commit hashes (7ac2c08, 2a726f9) found in git log.

---
*Phase: 05-oracle-engine-product-shell-track-a*
*Completed: 2026-03-29*
