# Spirit Sphere Integration Test Plan

Phase 07 -- Spirit Sphere Integration Testing
Covers all subsystems from boot through 10-minute demo stability (SPHERE-07).

---

## Test 1: Firmware Flash and Boot

**Prerequisites:**
- ESP32-S3-BOX-3 (or ESP32-S3-DevKitC-1)
- USB-C cable
- Arduino IDE 2.x with ESP32 Core 3.x installed
- Required libraries: WebSockets by Markus Sattler, ArduinoJson 7.x, FastLED 3.7+

**Steps:**
1. Open `firmware/spirit-sphere/spirit-sphere.ino` in Arduino IDE
2. Select board: "ESP32S3 Dev Module" (for BOX-3, ensure `BOARD_TYPE BOARD_BOX3` in config.h)
3. Compile (Verify) -- confirm 0 errors, 0 warnings about I2S conflicts
4. Flash to device via USB-C
5. Open Serial Monitor at 115200 baud
6. Expected output within 3 seconds:
   ```
   Spirit Sphere v1.0.0 booting...
   Target: ESP32-S3-BOX-3
   Architecture: Dual-core FreeRTOS
     Core 0: Audio/WiFi/WebSocket/OTA
     Core 1: LED/Hall/Motor/POV
   [BOOT] State machine initialized
   [BOOT] Mute button initialized
   [BOOT] Status display initialized
   [BOOT] Audio task created on Core 0
   [BOOT] LED task created on Core 1
   Tasks created. Core 0: Audio, Core 1: LEDs
   Watchdog timer initialized (30s timeout)
   ```

**Pass criteria:**
- Boot message appears within 3 seconds
- No crash/reboot loop
- Both tasks report created
- Watchdog timer initialized

**Failure modes:**
- Reboot loop: check stack sizes in config.h (AUDIO_TASK_STACK, LED_TASK_STACK)
- Missing libraries: install via Arduino Library Manager
- I2S conflict: ensure no FASTLED_ESP32_I2S defines (APA102 uses SPI, not I2S)

---

## Test 2: WiFi Provisioning

**Prerequisites:**
- Test 1 passed
- Smartphone with browser
- WiFi network available

**Steps:**
1. On first boot (no stored credentials), device creates AP "SpiritSphere-XXXX"
2. Connect phone to this AP
3. Captive portal should auto-open (or navigate to 192.168.4.1)
4. Enter WiFi SSID, password, and server URL (e.g., `http://SMITHERS_IP:8300`)
5. Device connects to WiFi -- Serial Monitor shows:
   ```
   [AUDIO] WiFi connected: 192.168.X.X
   ```
6. Reboot device -- verify it reconnects automatically without captive portal

**Pass criteria:**
- WiFi connected, IP assigned
- Credentials persisted across reboot (stored in NVS)
- Server URL stored and used for WebSocket connection

**Failure modes:**
- No AP visible: check AP_SSID_PREFIX in config.h
- Portal not loading: verify DNSServer + WebServer running
- Credentials not persisting: check NVS_NAMESPACE "spirit-sph"

---

## Test 3: Audio Round-Trip (Voice AI)

**Prerequisites:**
- Test 2 passed
- orb-backend running at :8300 on server
- AssemblyAI, Claude LLM, and ElevenLabs API keys configured in orb-backend

**Steps:**
1. Serial Monitor should show:
   ```
   [AUDIO] State: CONNECTING -> READY
   ```
   (WebSocket connected to /ws/sphere)
2. Press and hold BOOT button (GPIO 0) -- state changes to LISTENING:
   ```
   [PTT] Button pressed -- recording
   [AUDIO] RMS: X.XX (1024 samples)
   ```
3. Speak a question into BOX-3 microphone (e.g., "Apollo, what guidance do you have for me?")
4. Release BOOT button -- state changes to PROCESSING:
   ```
   [PTT] Button released -- processing
   ```
5. Wait for response -- state changes to SPEAKING
6. Hear deity voice response through BOX-3 speaker
7. Check latency report in Serial Monitor:
   ```
   === LATENCY REPORT ===
   STT:     Xms
   LLM+TTS: Xms
   Total:   Xms
   ======================
   ```

**Pass criteria:**
- Hear deity voice response
- Total latency under 5000ms
- State transitions: READY -> LISTENING -> PROCESSING -> SPEAKING -> READY

**Failure modes:**
- No WebSocket connection: check orb-backend is running, verify server URL in provisioning
- No audio capture: check I2S pin config, verify RMS values are non-zero
- No transcript: check AssemblyAI API key in orb-backend
- No response: check Claude LLM route via LLM Router (:8100)
- No voice output: check ElevenLabs API key, verify speaker I2S config

---

## Test 4: POV LED Display

**Prerequisites:**
- APA102/SK9822 strip (36 LEDs) connected via slip ring
- Hall effect sensor (US5881LUA) mounted with magnet on rotating assembly
- N20 motor connected to MOTOR_PIN (GPIO 5)
- Power supply adequate for LEDs (5V, sufficient current for 36 LEDs)

**Steps:**
1. Motor should start ramping to TARGET_RPM on boot:
   ```
   [LED] Motor ramping to 4.0 RPM over 3000 ms
   ```
2. Serial Monitor shows Hall sensor period values once motor is spinning
3. Verify LED strip shows test pattern (if no FRAME_DATA in image_data.h) or deity animation
4. Observe POV effect: image should be stable, not drifting
5. Check for LED flicker (indicates slip ring signal quality issues)
6. If flicker: reduce SPI_SPEED in config.h (currently 6MHz, try 4MHz or 2MHz)

**Pass criteria:**
- Stable image displayed, no random color flashes
- Motor reaches target RPM (verify via Hall period)
- Hall period consistent (low jitter)

**Measurement:**
- Use phone slow-motion video (240fps) to verify column alignment
- Record Hall period from Serial Monitor -- should be ~15,000,000us at 4 RPM (15 seconds/revolution)
- Motor safety: if no Hall pulses for 5 seconds, motor auto-stops (safety shutoff)

**Failure modes:**
- No LED output: check DATA_PIN (GPIO 11) and CLOCK_PIN (GPIO 12) wiring
- Random colors: SPI signal integrity -- shorten wires or reduce SPI_SPEED
- Image drifting: Hall sensor alignment -- magnet must trigger once per revolution
- Motor not spinning: check MOTOR_PIN wiring, verify PWM output with oscilloscope

---

## Test 5: Dual-Core Stress Test

**Prerequisites:**
- Tests 3 and 4 both passing independently

**Steps:**
1. Start POV display (motor spinning, LEDs rendering deity animation)
2. Simultaneously perform voice round-trip:
   - Press BOOT button (PTT)
   - Speak question
   - Release button
   - Listen for deity response
3. Observe: audio should NOT glitch when LEDs refresh
4. Observe: POV image should NOT tear or flicker during WebSocket traffic
5. Run serial command `status` -- verify both tasks report alive:
   ```
   === SPIRIT SPHERE STATUS ===
   Firmware:  v1.0.0
   State:     READY
   Muted:     NO
   Free Heap: XXXXX bytes
   Uptime:    XXX s
   ============================
   ```
6. Check free heap: should be above 40KB (40,000 bytes)
7. Repeat voice round-trip 5 times in succession
8. After 5 round-trips, check heap again -- should not have declined significantly

**Pass criteria:**
- No audio glitches during LED rendering
- No LED artifacts during WebSocket traffic
- Heap stable above 40KB across all 5 round-trips
- Both tasks alive (no watchdog resets)

**Failure modes:**
- Audio pops/clicks: WiFi preempting audio task -- verify AUDIO_TASK_PRIORITY=2 is above WiFi default
- LED tear: SPI timing collision -- check DMA buffer settings
- Heap declining: memory leak in JSON allocation or ring buffer -- check with `[HEARTBEAT]` logs
- Watchdog reset: one task hung for >30s -- check Serial for watchdog panic message

---

## Test 6: Mute Button

**Prerequisites:**
- Mute button wired to MUTE_BUTTON_PIN (GPIO 39)
- Mute LED wired to MUTE_LED_PIN (GPIO 40)

**Steps:**
1. Press mute button -- LED should light up, Serial Monitor shows:
   ```
   [STATUS] MUTED
   ```
2. Try PTT while muted -- audio should NOT be captured or streamed (RMS values should not appear)
3. Press mute button again -- LED turns off, Serial Monitor shows:
   ```
   [STATUS] UNMUTED
   ```
4. Try PTT again -- normal voice round-trip should work
5. Alternative: type `mute` in Serial Monitor to toggle via serial command

**Pass criteria:**
- Mute toggles correctly (button and serial command)
- Mute LED indicator follows mute state
- No audio leaks while muted (verify no audio data sent via WebSocket)

**Failure modes:**
- Button not responding: check GPIO 39 wiring, verify pull-up/pull-down configuration
- LED not lighting: check GPIO 40 wiring, verify MUTE_LED_PIN in config.h
- Audio still captured while muted: check mute_is_muted() guard in audio_task.cpp LISTENING state

---

## Test 7: 10-Minute Demo Stability (SPHERE-07 Capstone)

**Prerequisites:**
- All tests 1-6 passing
- Stable WiFi connection
- orb-backend running continuously
- Timer available

**Steps:**
1. Start a timer
2. Run POV display continuously (motor spinning, LEDs rendering)
3. Perform voice round-trip every 60 seconds (10 conversations total)
4. Monitor Serial Monitor for:
   - Crashes or reboots (watchdog will print panic message before reset)
   - Heap warnings: `[WARNING] Free heap below 40KB!`
   - Heap critical: `[CRITICAL] Min free heap below 30KB -- possible memory leak`
   - WebSocket disconnects
   - WiFi reconnection attempts: `[AUDIO] WiFi disconnected, attempting reconnect...`
5. Record in `tests/07-bench-test-log.md`:
   - Start time
   - Each voice round-trip result (latency, audio quality)
   - Any anomalies from Serial Monitor
   - Stability metrics every 2 minutes (heap, WiFi RSSI, state)
6. At 10 minutes: verify POV still running, heap above 40KB, no accumulated errors

**Pass criteria:**
- 0 crashes
- 0 reboots (watchdog never triggered)
- 0 audio dropouts
- Heap never below 40KB
- All 10 voice round-trips succeed with deity voice response
- POV display stable throughout

**Record results in:** `tests/07-bench-test-log.md`

**Failure analysis:**
- If crash occurs: note time, last Serial output, heap value before crash
- If audio dropout: note which round-trip number, heap at time, WiFi RSSI
- If heap leak: compare heap values at 0:00, 5:00, 10:00 -- declining trend indicates leak
- If WebSocket disconnect: check WiFi RSSI -- below -75dBm may cause intermittent drops

---

## Test 8: OTA Update

**Prerequisites:**
- Test 2 passed (WiFi connected, server URL configured)
- New firmware binary compiled and available on orb-backend

**Steps:**
1. Compile updated firmware binary (.bin) with incremented FIRMWARE_VERSION in config.h
2. Place binary in `services/orb-backend/firmware_bin/` on server
3. Update `manifest.json` with new version number and binary filename
4. Device checks for OTA updates periodically (via otaCheckForUpdate in audio task)
5. Serial Monitor shows:
   ```
   OTA update available: vX.X.X
   ```
6. Update downloads and installs -- device reboots automatically
7. After reboot, Serial Monitor shows new version string:
   ```
   Spirit Sphere vX.X.X booting...
   ```

**Pass criteria:**
- OTA update detected and downloaded
- Device reboots with new firmware version
- All subsystems functional after OTA update (re-run Test 1 boot check)

**Failure modes:**
- Update not detected: check OTA_SERVER_DEFAULT URL, verify manifest.json accessible
- Download fails: insufficient flash space (check partition scheme)
- Brick after update: use USB to re-flash previous known-good binary

---

## Test Execution Order

Run tests in this order. Each test depends on the previous passing:

1. **Test 1** (Firmware Flash and Boot) -- foundational
2. **Test 2** (WiFi Provisioning) -- networking
3. **Test 3** (Audio Round-Trip) -- voice AI pipeline
4. **Test 4** (POV LED Display) -- visual display
5. **Test 5** (Dual-Core Stress) -- both cores together
6. **Test 6** (Mute Button) -- hardware control
7. **Test 7** (10-Minute Demo) -- SPHERE-07 capstone
8. **Test 8** (OTA Update) -- maintenance capability

Tests 3 and 4 can run in parallel if hardware is available for both.
Test 7 is the gating test for SPHERE-07 requirement completion.
