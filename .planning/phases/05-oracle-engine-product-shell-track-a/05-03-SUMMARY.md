---
phase: 05-oracle-engine-product-shell-track-a
plan: 03
subsystem: firmware
tags: [esp32, wifi-provisioning, captive-portal, nvs, multi-board, form-factor]

# Dependency graph
requires:
  - phase: 05-01
    provides: "Oracle protocol API and LLM cascading client"
  - phase: 05-02
    provides: "OTA update module and firmware directory structure"
provides:
  - "WiFi captive portal provisioning module (no hardcoded credentials)"
  - "Multi-board config.h with compile-time pin mapping for BOX-3 and DevKitC-1"
  - "NVS-backed credential persistence across reboots"
  - "Form factor assessment: firmware ready for desk crystal + stuffed animal prototypes"
affects: [phase-04-hardware-verification, phase-06-pov-globe]

# Tech tracking
tech-stack:
  added: [WebServer.h, DNSServer.h, Preferences.h]
  patterns: [captive-portal-provisioning, compile-time-board-selection, nvs-credential-storage]

key-files:
  created:
    - firmware/oracle-engine/wifi_provision.h
    - firmware/oracle-engine/wifi_provision.cpp
  modified:
    - firmware/oracle-engine/config.h
    - firmware/oracle-engine/README.md

key-decisions:
  - "Captive portal over BLE provisioning -- simpler, works with any phone browser, no app needed"
  - "AP SSID includes last 4 MAC chars for unique device identification"
  - "Server URL configurable during provisioning -- not hardcoded to localhost"
  - "Form factor assessment approved: desk crystal + stuffed animal as first prototypes per roadmap"
  - "Physical enclosure CAD/3D printing deferred until Phase 04 hardware verification completes"

patterns-established:
  - "WiFi provisioning flow: init -> try stored credentials -> fall back to captive portal"
  - "Board-type compile flag: -DBOARD_TYPE=BOARD_BOX3 selects pin mapping at build time"
  - "NVS namespace 'oracle-eng' for all persistent firmware settings"

requirements-completed: [ENGINE-06, ENGINE-04]

# Metrics
duration: 4min
completed: 2026-03-30
---

# Phase 05 Plan 03: WiFi Provisioning + Multi-Board Config Summary

**Captive portal WiFi provisioning with NVS persistence and dual-board pin config enabling form-factor-agnostic firmware deployment**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-30T18:44:00Z
- **Completed:** 2026-03-30T18:48:30Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- WiFi captive portal module that serves HTML setup form at 192.168.4.1 with network scanning, credential entry, and server URL configuration
- NVS-backed credential persistence so WiFi settings survive reboots without re-provisioning
- Multi-board config.h with compile-time BOARD_TYPE flag selecting pin mappings for ESP32-S3-BOX-3 and bare DevKitC-1
- Form factor readiness confirmed: same electronics module fits multiple enclosures via pin config swap only
- Physical prototyping (desk crystal + stuffed animal) deferred to after Phase 04 hardware verification

## Task Commits

Each task was committed atomically:

1. **Task 1: WiFi provisioning firmware module + multi-board config** - `37bb3d9` (feat)
2. **Task 2: Form factor assessment checkpoint** - approved by user (no code changes)

## Files Created/Modified
- `firmware/oracle-engine/wifi_provision.h` - Public API: init, connect, portal, clear, hasCredentials, getServerUrl
- `firmware/oracle-engine/wifi_provision.cpp` - Full captive portal implementation with DNS redirect, HTML form, WiFi scan endpoint, NVS storage
- `firmware/oracle-engine/config.h` - Board type definitions, conditional pin mappings, AP settings, NVS namespace, server defaults
- `firmware/oracle-engine/README.md` - Updated with provisioning usage, multi-board compilation flags, module dependency list

## Decisions Made
- Captive portal chosen over BLE provisioning for simplicity -- works with any phone browser, no companion app required
- AP SSID includes last 4 chars of device MAC address for unique identification when multiple devices are nearby
- Server URL is a provisioning-time setting (not hardcoded) so devices can point at different backend instances
- Form factor assessment: desk crystal and stuffed animal confirmed as first two prototypes per roadmap, but physical enclosure work blocked on Phase 04 hardware verification

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all module functions are fully implemented. Hardware verification (actual ESP32 flashing and captive portal testing) is deferred to when physical hardware is available, but this is by design per Phase 04 deferral.

## Next Phase Readiness
- Oracle Engine firmware is feature-complete for v0.0.1: protocol API (05-01) + OTA updates (05-02) + WiFi provisioning (05-03)
- All three firmware modules share config.h for consistent pin mappings and settings
- Physical form factor prototyping (3D printing, CAD) awaits Phase 04 hardware verification with actual ESP32-S3-BOX-3
- Phase 05 complete -- ready for Phase 06 (POV Globe) continuation

## Self-Check: PASSED

All files verified present. Commit 37bb3d9 confirmed in git history.

---
*Phase: 05-oracle-engine-product-shell-track-a*
*Completed: 2026-03-30*
