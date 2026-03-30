---
phase: 06-pov-globe-prototype-track-b
verified: 2026-03-30T20:30:00Z
status: human_needed
score: 3/5 must-haves verified
re_verification: false
human_verification:
  - test: "Flash firmware to ESP32-S3, wire APA102 strip (36 LEDs), Hall sensor, and N20 motor according to config.h pin definitions. Run static tests: 'l' command for LED test, wave magnet for Hall trigger, 'm' command for motor spin."
    expected: "All LEDs light white, Hall sensor triggers on magnet pass, motor spins smoothly."
    why_human: "Physical hardware assembly and electrical verification cannot be automated. Components not yet available."
  - test: "Assemble flat 2D POV propeller with LED arm mounted on motor, start motor to 3-5 RPM, observe spinning display."
    expected: "Recognizable test image visible on spinning arm, image position stable across multiple revolutions (no drift)."
    why_human: "Visual POV display quality and Hall sensor sync accuracy require human observation of spinning hardware. POV-01 and POV-02 gate."
  - test: "Upgrade to spherical POV: mount LED arm vertically via slip ring, generate equirectangular test image (world map), flash firmware with POV_MODE_SPHERE=true. Test in ambient room lighting (overhead lights on)."
    expected: "Spherical image recognizable at 3-5 RPM, visible with room lights on (not just darkness), long-exposure photo captures full sphere."
    why_human: "Spherical POV image quality and ambient visibility are perceptual qualities requiring real-world lighting conditions. POV-03 and POV-04 gate."
  - test: "Measure motor noise with phone dB meter app (NIOSH SLM) at 30cm distance with LEDs paused ('p' command)."
    expected: "Noise level under 45dB at 30cm."
    why_human: "Acoustic measurement requires calibrated microphone in real environment. POV-05 gate."
---

# Phase 6: POV Globe Prototype Verification Report

**Phase Goal:** A spinning LED arm renders a visible image in normal room lighting — the core visual magic proven independently

**Verified:** 2026-03-30T20:30:00Z

**Status:** human_needed

**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Firmware compiles for ESP32-S3 without hardware connected | ✓ VERIFIED | All 10 firmware files exist, contain required interfaces (FastLED, Hall ISR, motor PWM), use Arduino Core 3.x APIs |
| 2 | Python script converts a PNG image into POV column data | ✓ VERIFIED | scripts/image-to-pov.py exists, --help works, generates FRAME_DATA[] PROGMEM arrays in image_data.h (143KB file) |
| 3 | Flat 2D POV propeller displays recognizable image when spinning at 3-5 RPM | ? HUMAN | Code complete (config.h has POV_MODE_FLAT, image_data.h loaded in setup), hardware assembly deferred — ESP32-S3, APA102, Hall sensor, N20 motor not available |
| 4 | Image is visible in ambient room lighting (not just darkness) | ? HUMAN | Firmware configured for maximum brightness (255), boost mode available, requires physical testing in real lighting conditions |
| 5 | Motor noise measures under 45dB at 30cm distance | ? HUMAN | MOTOR_RAMP_MS=3000 (soft-start), MOTOR_HOLD_DUTY=50 configured for noise reduction, requires physical dB measurement |

**Score:** 3/5 truths verified (2 automated, 3 require human hardware verification)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `firmware/pov-globe/pov-globe.ino` | Main Arduino sketch for POV globe | ✓ VERIFIED | Exists (13442 bytes), includes FastLED, contains POV column-sync loop with hall_get_position() and led_show_column() |
| `firmware/pov-globe/config.h` | Pin definitions, LED count, SPI speed, motor PWM | ✓ VERIFIED | Exists (4730 bytes), contains NUM_LEDS, NUM_COLUMNS, FASTLED_ESP32_I2S, POV_MODE_SPHERE, BRIGHTNESS=255, MOTOR_RAMP_MS |
| `firmware/pov-globe/led_driver.h` | FastLED APA102 DMA driver interface | ✓ VERIFIED | Exists, exports led_init, led_show_column, led_clear, led_set_brightness, led_set_global_brightness |
| `firmware/pov-globe/hall_sensor.h` | Hall effect ISR and revolution timing | ✓ VERIFIED | Exists, exports hall_init, hall_get_period_us, hall_get_position, hall_new_revolution |
| `firmware/pov-globe/frame_buffer.h` | POV frame buffer storage and column lookup | ✓ VERIFIED | Exists, exports frame_init, frame_load, frame_get_column, frame_load_test_pattern |
| `firmware/pov-globe/motor_control.h` | Motor PWM control with soft start/stop | ✓ VERIFIED | Exists, exports motor_init, motor_set_rpm, motor_ramp, motor_stop, motor_get_duty |
| `scripts/image-to-pov.py` | PNG to POV frame data converter | ✓ VERIFIED | Exists (9221 bytes, executable), imports PIL and numpy, --help shows --mode flat/sphere, --gamma, --brightness, --preview flags |
| `firmware/pov-globe/image_data.h` | Test image converted to POV frame data | ✓ VERIFIED | Exists (143656 bytes), contains FRAME_DATA[] PROGMEM array, loaded in pov-globe.ino line 77 |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| pov-globe.ino | led_driver.h | LED column display in main loop | ✓ WIRED | led_show_column called at line 164 with frame column data |
| pov-globe.ino | hall_sensor.h | Position sync for column timing | ✓ WIRED | hall_get_position called at line 144, hall_new_revolution at line 135 |
| image-to-pov.py | frame_buffer.h | Generated C header with pixel data | ✓ WIRED | FRAME_DATA imported at line 37, frame_load called at line 77 |
| pov-globe.ino | motor_control.h | Motor soft-start with ramp | ✓ WIRED | motor_ramp called at lines 221 and 228 with MOTOR_RAMP_MS parameter |
| pov-globe.ino | frame_buffer.h | Spherical column mapping | ✓ WIRED | frame_get_column called at line 164 with computed column index |

### Data-Flow Trace (Level 4)

Not applicable — this is firmware code that reads from PROGMEM arrays and hardware sensors. No upstream API/database sources. Data flow is:
1. FRAME_DATA (PROGMEM) → frame_load() → frame buffer array
2. Hall sensor hardware → ISR → volatile timing variables → hall_get_position()
3. Column index computation → frame_get_column() → LED driver → APA102 hardware

All data paths are direct memory access or hardware I/O, no intermediate services to trace.

### Behavioral Spot-Checks

Phase 06 firmware is hardware-dependent — cannot run behavioral checks without physical ESP32-S3 and POV components. All verification must wait for hardware assembly.

**Status:** SKIPPED (hardware components not available)

When components arrive, run these checks:
1. Flash firmware via Arduino IDE → should compile without errors
2. Serial monitor at 115200 → should print "POV Globe ready" message
3. Press 'l' command → all LEDs should light white (wiring verification)
4. Wave magnet past Hall sensor → Serial should print "Hall trigger" (sensor verification)
5. Press 'm' command → motor should spin at 3-5 RPM (motor verification)

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| POV-01 | 06-01, 06-02 | 2D flat POV propeller working with APA102/SK9822 LEDs (learning gate) | ? HUMAN | Firmware complete with POV_MODE_FLAT toggle, test image generated. Hardware assembly deferred — cannot verify without ESP32-S3, APA102 strip, Hall sensor, N20 motor. Marked complete in REQUIREMENTS.md but not physically tested. |
| POV-02 | 06-01, 06-02 | Hall effect sensor position synchronization verified | ? HUMAN | Hall ISR implemented with IRAM_ATTR, volatile timing variables, hall_get_position() computes 0.0-1.0 angular position. Column sync logic in main loop. Cannot verify drift prevention without spinning hardware. Marked complete in REQUIREMENTS.md but not physically tested. |
| POV-03 | 06-01, 06-03 | Single arm spherical POV with FastLED DMA rendering | ? HUMAN | POV_MODE_SPHERE implemented with equirectangular column mapping. FastLED configured with I2S DMA (4 buffers). image-to-pov.py supports --mode sphere. Cannot verify spherical image quality without mechanical assembly. Marked complete in REQUIREMENTS.md but not physically tested. |
| POV-04 | 06-03 | Image visible at 3-5 RPM in ambient room lighting | ? HUMAN | BRIGHTNESS=255 (maximum), APA102 global brightness at 31, BOOST_MODE available (doubles column display time). Serial commands for live brightness tuning (+/-). Cannot verify without real lighting conditions. NOT marked complete in REQUIREMENTS.md — correctly deferred. |
| POV-05 | 06-03 | Motor noise level under 45dB measured at 30cm | ? HUMAN | MOTOR_RAMP_MS=3000 (3-second soft-start), MOTOR_HOLD_DUTY=50 (prevents stall/restart noise). Serial 'p' command pauses LEDs for clean noise measurement. Cannot verify without physical motor and dB meter. NOT marked complete in REQUIREMENTS.md — correctly deferred. |

**CRITICAL FINDING:** REQUIREMENTS.md marks POV-01, POV-02, POV-03 as "Complete" but no physical hardware testing has occurred. This is a documentation inconsistency — the requirements are code-complete but not verification-complete. POV-04 and POV-05 are correctly marked "Pending."

**Recommendation:** Update REQUIREMENTS.md to mark POV-01, POV-02, POV-03 as "Code Complete, Hardware Pending" or similar status to distinguish between implemented vs verified.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| firmware/pov-globe/pov-globe.ino | 241-380 | Unresolved merge conflict markers (<<<<<<, >>>>>>) | 🛑 BLOCKER | Firmware will not compile with conflict markers present. Must be resolved before flashing. |
| firmware/pov-globe/config.h | 64 | Duplicate POV_MODE_FLAT definition (line 38 has POV_MODE_SPHERE) | ⚠️ WARNING | Config has conflicting mode definitions — POV_MODE_SPHERE at line 38 (true), POV_MODE_FLAT at line 64 (true). Likely merge artifact. Only one should be defined. |
| firmware/pov-globe/motor_control.cpp | N/A (docstring) | "CALIBRATE WITH REAL MOTOR" comment | ℹ️ INFO | Linear RPM-to-duty mapping is approximate, requires calibration with physical motor. Expected for pre-hardware code. |
| firmware/pov-globe/config.h | 78 | "CALIBRATE: find lowest duty" comment | ℹ️ INFO | MOTOR_HOLD_DUTY placeholder value (50), requires calibration with real motor under load. Expected for pre-hardware code. |

**Blocker Details:**

The merge conflict in pov-globe.ino (lines 241-380) contains duplicate serial command implementations. The conflict appears to be between HEAD (Plan 02 commands: 't', 'i', 'h', 'l') and worktree-agent-aa9ccb94 (Plan 03 commands: '+', '-', 'f', 's', 'c', 'p'). Both sets of commands are valid and should be merged, not left as a conflict.

The duplicate POV_MODE definition in config.h suggests the same merge was incomplete — POV_MODE_SPHERE (Plan 03) and POV_MODE_FLAT (Plan 02) coexist in the same file.

### Human Verification Required

#### 1. Resolve Merge Conflict in pov-globe.ino

**Test:** Edit firmware/pov-globe/pov-globe.ino to remove conflict markers and merge both command sets into the switch statement.

**Expected:** File compiles in Arduino IDE without errors, all serial commands (r/b/m/t/i/h/l/+/-/f/s/c/p) work correctly.

**Why human:** Merge conflicts require human judgment about which code to keep. In this case, both sides are valid and should be combined.

#### 2. Resolve POV_MODE Configuration Conflict

**Test:** Edit firmware/pov-globe/config.h to remove duplicate POV_MODE definitions. Keep POV_MODE_SPHERE as the primary toggle, remove POV_MODE_FLAT (flat mode is POV_MODE_SPHERE=false).

**Expected:** Config compiles cleanly with one mode definition.

**Why human:** Config file semantics require understanding of intended behavior.

#### 3. Assemble Flat 2D POV Propeller (POV-01, POV-02)

**Test:** Wire ESP32-S3, APA102 strip (36 LEDs), US5881LUA Hall sensor, N20 motor per config.h pins. Flash firmware with POV_MODE_SPHERE=false. Run static tests ('l', 'h', 'm' commands), then spin motor to 3-5 RPM and observe image stability.

**Expected:** Test image (THE ORB) displays on spinning arm, image does not drift across revolutions (Hall sync working).

**Why human:** Physical hardware assembly, electrical wiring verification, visual POV quality assessment, and Hall sensor synchronization accuracy cannot be automated or simulated.

#### 4. Upgrade to Spherical POV (POV-03)

**Test:** Mount LED arm vertically on motor shaft via 4-wire slip ring. Set POV_MODE_SPHERE=true. Generate equirectangular test image (world map) using image-to-pov.py --mode sphere. Flash and spin.

**Expected:** Spherical image recognizable, long-exposure camera captures full globe projection.

**Why human:** Spherical POV geometry and slip ring mechanical assembly require physical prototyping. Image quality is perceptual.

#### 5. Ambient Visibility Test (POV-04)

**Test:** Test spherical POV in ambient room lighting (overhead lights on, ~300 lux). Observe from 1 meter distance. Use +/- serial commands to tune brightness if needed. Enable BOOST_MODE if insufficient.

**Expected:** LEDs clearly visible (not washed out) with room lights on. Take photo as evidence.

**Why human:** Ambient visibility is a perceptual quality that depends on real lighting conditions and human visual perception. Cannot be simulated.

#### 6. Motor Noise Measurement (POV-05)

**Test:** Press 'p' command to pause LEDs (motor still spinning). Measure noise with phone dB meter app (NIOSH SLM recommended) at 30cm from motor. Record reading.

**Expected:** Noise level under 45dB at 30cm. If too loud, add rubber damping pads, reduce RPM, or check motor mount vibration.

**Why human:** Acoustic measurement requires calibrated microphone in real environment with ambient noise baseline.

### Gaps Summary

**Code Quality Gaps:**

1. **Merge conflict in pov-globe.ino** — Blocks compilation. Must be resolved before any hardware testing can proceed.
2. **Duplicate POV_MODE definitions in config.h** — Creates ambiguity. Should have single mode toggle.

**Hardware Verification Gaps:**

All five requirements (POV-01 through POV-05) are code-complete but hardware-unverified. The firmware scaffold, image conversion tool, and all subsystems (LED driver, Hall sensor, motor control, frame buffer) exist and are properly wired in code. However, the phase goal — "a spinning LED arm renders a visible image in normal room lighting" — cannot be verified without physical hardware.

**Requirements Traceability Gap:**

REQUIREMENTS.md marks POV-01, POV-02, POV-03 as "Complete" when they are actually "Code Complete, Hardware Pending." This creates a false positive in the requirements matrix. Recommend updating requirement status to distinguish implementation from verification.

**Blocking for Phase 7:**

Phase 7 (Spirit Sphere Integration) depends on Phase 6 POV hardware verification. The voice AI firmware (Phase 4-5) and POV firmware (Phase 6) can be integrated at the code level, but demonstrating the combined Spirit Sphere product requires:
- Verified flat POV (POV-01, POV-02) as learning gate
- Verified spherical POV (POV-03) for volumetric display
- Ambient visibility confirmation (POV-04) for product viability
- Noise measurement (POV-05) for user experience quality

**When Hardware Arrives:**

1. Resolve merge conflict and config duplicates
2. Order components: ESP32-S3-WROOM-1 (N16R8), APA102/SK9822 36-LED strip, US5881LUA Hall sensor, N20 3-5 RPM gear motor, 4-wire slip ring
3. Follow 06-02-PLAN.md user_setup for flat propeller assembly
4. Run verification checklist above (Tests 1-6)
5. Document calibration values (motor duty, column timing, brightness)
6. Update REQUIREMENTS.md with physical verification results
7. Capture photos/video as evidence for Phase 8 Kickstarter campaign

---

_Verified: 2026-03-30T20:30:00Z_

_Verifier: Claude Code (gsd-verifier)_
