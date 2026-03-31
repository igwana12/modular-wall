# Spirit Sphere Bench Test Log

Template for recording integration test results.
Copy this file for each test run session.

---

## Test Run Info

| Field | Value |
|-------|-------|
| Date | ___ |
| Tester | ___ |
| Firmware version | ___ |
| Hardware | ESP32-S3-BOX-3, APA102 x36, N20 motor, slip ring, Hall sensor |
| orb-backend version | ___ |
| WiFi network | ___ |
| WiFi signal strength (RSSI) | ___ dBm |
| Room temperature | ___ C |

---

## Test 1: Boot Test

| Metric | Value |
|--------|-------|
| Boot time to "Tasks created" | ___ seconds |
| Free heap at boot | ___ bytes |
| Min free heap at boot | ___ bytes |
| Core 0 task running (Audio) | yes / no |
| Core 1 task running (LED) | yes / no |
| Watchdog initialized | yes / no |
| Compile warnings | ___ |
| **Result** | **PASS / FAIL** |

Notes: ___

---

## Test 2: WiFi Provisioning

| Metric | Value |
|--------|-------|
| AP visible | yes / no |
| Captive portal loaded | yes / no |
| Connection time | ___ seconds |
| IP assigned | ___ |
| WebSocket connected | yes / no |
| Persisted across reboot | yes / no |
| **Result** | **PASS / FAIL** |

Notes: ___

---

## Test 3: Audio Round-Trips

| # | Time | STT (ms) | LLM+TTS (ms) | Total (ms) | Audio Quality | Deity | Notes |
|---|------|----------|---------------|------------|---------------|-------|-------|
| 1 | 0:00 | | | | | | |
| 2 | 1:00 | | | | | | |
| 3 | 2:00 | | | | | | |
| 4 | 3:00 | | | | | | |
| 5 | 4:00 | | | | | | |
| 6 | 5:00 | | | | | | |
| 7 | 6:00 | | | | | | |
| 8 | 7:00 | | | | | | |
| 9 | 8:00 | | | | | | |
| 10 | 9:00 | | | | | | |

Audio quality scale: Excellent / Good / Acceptable / Poor / Failed

| Metric | Value |
|--------|-------|
| Average STT latency | ___ ms |
| Average LLM+TTS latency | ___ ms |
| Average total latency | ___ ms |
| Audio dropouts | ___ |
| **Result** | **PASS / FAIL** |

Notes: ___

---

## Test 4: POV LED Display

| Metric | Value |
|--------|-------|
| Motor RPM measured | ___ |
| Hall period (us) | ___ |
| Image stability | stable / drifting / flickering |
| SPI speed | 6 MHz |
| Slip ring signal quality | good / marginal / poor |
| Color accuracy | good / washed out / wrong |
| Frame data source | test pattern / deity image |
| **Result** | **PASS / FAIL** |

Slow-motion video captured: yes / no
Video file: ___

Notes: ___

---

## Test 5: Dual-Core Stress Test

| Round-Trip | Audio OK | LED OK | Heap (bytes) | Notes |
|------------|----------|--------|--------------|-------|
| 1 | yes/no | yes/no | | |
| 2 | yes/no | yes/no | | |
| 3 | yes/no | yes/no | | |
| 4 | yes/no | yes/no | | |
| 5 | yes/no | yes/no | | |

| Metric | Value |
|--------|-------|
| Audio glitches during LED render | ___ |
| LED artifacts during WebSocket | ___ |
| Heap start | ___ bytes |
| Heap end | ___ bytes |
| Heap delta | ___ bytes |
| **Result** | **PASS / FAIL** |

Notes: ___

---

## Test 6: Mute Button

| Metric | Value |
|--------|-------|
| Button toggle works | yes / no |
| LED indicator follows state | yes / no |
| Audio blocked while muted | yes / no |
| Serial command toggle works | yes / no |
| **Result** | **PASS / FAIL** |

Notes: ___

---

## Test 7: 10-Minute Demo Stability (SPHERE-07)

### Stability Metrics (every 2 minutes)

| Time | Free Heap | Min Free Heap | WiFi RSSI | State | Watchdog OK | Notes |
|------|-----------|---------------|-----------|-------|-------------|-------|
| 0:00 | | | | | | |
| 2:00 | | | | | | |
| 4:00 | | | | | | |
| 6:00 | | | | | | |
| 8:00 | | | | | | |
| 10:00 | | | | | | |

### Summary

| Metric | Value |
|--------|-------|
| Total crashes | ___ |
| Total reboots | ___ |
| Total watchdog resets | ___ |
| Audio dropouts | ___ |
| LED artifacts | ___ |
| WebSocket disconnects | ___ |
| WiFi reconnections | ___ |
| Heap at start | ___ bytes |
| Heap at end | ___ bytes |
| Min heap observed | ___ bytes |
| Heap trend | stable / declining / erratic |
| Voice round-trips successful | ___ / 10 |
| POV display stable throughout | yes / no |
| **RESULT** | **PASS / FAIL** |

---

## Test 8: OTA Update

| Metric | Value |
|--------|-------|
| Update detected | yes / no |
| Download successful | yes / no |
| Reboot successful | yes / no |
| New version shown | ___ |
| Post-update boot test | PASS / FAIL |
| **Result** | **PASS / FAIL** |

Notes: ___

---

## Overall Test Session Result

| Test | Result |
|------|--------|
| Test 1: Boot | PASS / FAIL / SKIP |
| Test 2: WiFi | PASS / FAIL / SKIP |
| Test 3: Audio | PASS / FAIL / SKIP |
| Test 4: POV LED | PASS / FAIL / SKIP |
| Test 5: Dual-Core | PASS / FAIL / SKIP |
| Test 6: Mute | PASS / FAIL / SKIP |
| Test 7: 10-Min Demo | PASS / FAIL / SKIP |
| Test 8: OTA | PASS / FAIL / SKIP |

**SPHERE-07 Status:** MET / NOT MET

---

## Issues Found

| # | Severity | Test | Description | Workaround |
|---|----------|------|-------------|------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

Severity: Critical / Major / Minor / Cosmetic

---

## Actions Required

| # | Priority | Description | Owner | Status |
|---|----------|-------------|-------|--------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

Priority: P0 (blocker) / P1 (must fix) / P2 (should fix) / P3 (nice to have)
