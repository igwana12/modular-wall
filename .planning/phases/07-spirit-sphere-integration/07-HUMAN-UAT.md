---
status: pending
phase: 07-spirit-sphere-integration
source: [07-VERIFICATION.md]
started: 2026-03-31T09:15:00Z
updated: 2026-03-31T09:15:00Z
---

## Current Test

[awaiting hardware procurement]

## Tests

### 1. Firmware Compilation and Core Affinity Verification
**Requires:** ESP32-S3-BOX-3, Arduino IDE 2.x, ESP32 Core 3.x

**Steps:**
1. Open firmware/spirit-sphere/spirit-sphere.ino in Arduino IDE
2. Select board: ESP32-S3-BOX-3
3. Compile (Verify) — expect 0 errors, 0 I2S peripheral conflict warnings
4. Flash to device via USB-C
5. Open Serial Monitor at 115200 baud
6. Verify boot message appears: "Spirit Sphere v1.0.0 booting..."
7. Verify task creation: "Tasks created. Core 0: Audio, Core 1: LEDs"
8. Add debug prints in audio_task and led_task: `Serial.printf("[TASK] Running on core %d\n", xPortGetCoreID());`
9. Verify audio task reports Core 0, LED task reports Core 1
10. Run for 1 minute, verify no crashes/reboots

**Expected:** Clean compilation, boot success, correct core pinning

**Result:** [pending hardware]

### 2. 10-Minute Demo Stability Test
**Requires:** Complete hardware assembly per hardware/bom.md and hardware/wiring-diagram.md

**Prerequisites:** Test 1 passed, all hardware components connected

**Steps:**
1. Follow tests/07-integration-test-plan.md tests 1-6 (boot, WiFi, audio, POV, dual-core stress, mute)
2. Start timer
3. Run POV display continuously (motor spinning, LEDs rendering Zeus animation)
4. Perform voice round-trip every 60 seconds (10 conversations total)
5. Monitor Serial output for: crashes, reboots, heap warnings, WebSocket disconnects
6. Record results in tests/07-bench-test-log.md:
   - Each voice round-trip latency
   - Free heap every 2 minutes
   - WiFi RSSI
   - Any anomalies
7. At 10 minutes: verify POV still running, heap above 40KB, no accumulated errors

**Expected:** 0 crashes, 0 reboots, 0 audio dropouts, heap never below 40KB, all 10 voice round-trips succeed

**Result:** [pending hardware]

## Summary

total: 2
passed: 0
issues: 0
pending: 2
skipped: 0
blocked: 2

## Gaps

### Gap 1: Firmware Runtime Unverified
status: blocked
reason: ESP32-S3-BOX-3 and toolchain not available
affected_requirements: [SPHERE-01, SPHERE-02]
resolution: Procure ESP32-S3-BOX-3, run Test 1

### Gap 2: 10-Minute Demo Not Executed
status: blocked
reason: Full hardware assembly not available (ESP32, LEDs, slip ring, motor, Hall sensor, battery — all TO ORDER in BOM)
affected_requirements: [SPHERE-07]
resolution: Complete hardware procurement per BOM, assemble bench rig per wiring diagram, run Test 2
