---
status: partial
phase: 04-oracle-engine-hardware-fundamentals-track-a
source: [04-VERIFICATION.md]
started: 2026-03-30
updated: 2026-03-30
---

## Current Test

[awaiting human testing]

## Tests

### 1. WiFi Connection
expected: ESP32-S3-BOX-3 connects to WiFi on boot, Serial Monitor shows IP address and RSSI
result: [pending]

### 2. I2S Audio Loopback
expected: Speak into BOX-3 mic, hear voice echoed through speaker in real-time. RMS levels > 0 when speaking.
result: [pending]
note: ES8311/ES7210 codec initialization may need refinement if audio fails

### 3. WebSocket Connection to Backend
expected: orb-backend running at :8300, firmware connects successfully, Serial shows "WebSocket connected", state transitions to READY
result: [pending]

### 4. End-to-End Voice Round-Trip
expected: Hold BOOT button and speak → release → hear deity voice response through speaker. Serial shows transcript, latency report with total < 5000ms.
result: [pending]

## Summary

total: 4
passed: 0
issues: 0
pending: 4
skipped: 0
blocked: 0

## Gaps
