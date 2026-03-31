# Phase 7: Spirit Sphere Integration - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning
**Source:** Discuss-phase analysis (gray areas identified, decisions deferred to planner)

<domain>
## Phase Boundary

Merge Oracle Engine (voice AI firmware) + POV Globe (LED display firmware) into one working prototype. Deliverables: unified firmware running on ESP32-S3-BOX-3, 3D-printed enclosure, battery-powered, at least 1 deity avatar animation on the POV sphere, reliable 10-minute demo.

This is the flagship hardware milestone before Kickstarter.

</domain>

<decisions>
## Implementation Decisions

### Hardware Platform (LOCKED — from Phase 4)
- ESP32-S3-BOX-3 as primary dev platform (built-in mic, speaker, WiFi, 320×240 touchscreen)
- Arduino IDE 2.x with Arduino ESP32 Core 3.x
- I2S for all audio (digital path, no analog ADC)

### Dual-Core Split (LOCKED — SPHERE-02)
- Core 0: audio pipeline (I2S capture, WebSocket, TTS playback)
- Core 1: LED POV display (FastLED DMA, Hall ISR, frame buffer)
- No resource contention between tracks

### Audio Pipeline (LOCKED — from Phase 4)
- PCM 16-bit 16kHz mono as audio format (no Opus for v1)
- orb-backend /ws/sphere WebSocket endpoint (implemented in Phase 4)
- AssemblyAI STT → Claude LLM → ElevenLabs TTS (existing pipeline)

### POV Display (LOCKED — from Phase 6)
- APA102/SK9822 LEDs, FastLED DMA on Core 1
- N20 motor (3-5 RPM), Hall effect sensor for position sync
- Python equirectangular converter exists for image → POV frames
- BGR color order

### WiFi + OTA (LOCKED — from Phase 5)
- Captive portal for WiFi provisioning (setup <10 min)
- OTA firmware updates served from orb-backend

### Claude's Discretion
The following gray areas were identified but not resolved in discussion — planner should make reasonable choices and document them:

- **Firmware merge structure**: New unified `spirit-sphere.ino` that includes both subsystems via shared headers, or Arduino libraries. Recommend: new unified sketch that #includes modules from both firmware tracks.
- **Hardware build order**: Electronics-first (rig on bench, no enclosure) to prove dual-core integration before committing to enclosure CAD. Recommend: get electronics working first, then design enclosure around the proven rig.
- **BOX-3 display use**: Status display (deity name, listening/thinking/speaking state) is the minimal useful thing. Recommend: implement simple status overlay, not full UI.
- **Demo scenario**: Single deity continuous conversation (e.g., Zeus) while POV sphere animates. Simplest scenario that proves the concept. Multi-deity switching is Phase 8+.
- **Deity POV animation**: Use existing Python equirectangular converter with a deity symbol image (Zeus lightning bolt, SC logo). One animation is sufficient for SPHERE-05.

</decisions>

<specifics>
## Specific References

- `firmware/oracle-engine/oracle-engine.ino` — Phase 4 firmware (WiFi, I2S, WebSocket voice round-trip)
- `firmware/oracle-engine/config.h` — Pin definitions, BOX-3 + DevKit targets
- `firmware/oracle-engine/audio_i2s.h/.cpp` — I2S audio interface
- `firmware/oracle-engine/wifi_manager.h/.cpp` — WiFi + reconnect
- `firmware/pov-globe/pov-globe.ino` — Phase 6 firmware (FastLED, Hall, motor, frame buffer)
- `firmware/pov-globe/config.h` — LED count, SPI speed, motor PWM
- `firmware/pov-globe/led_driver.h/.cpp` — FastLED APA102 DMA wrapper
- `firmware/pov-globe/hall_sensor.h/.cpp` — ISR position sync
- `firmware/pov-globe/frame_buffer.h/.cpp` — 120×36 CRGB array
- `firmware/pov-globe/motor_control.h/.cpp` — N20 PWM ramp

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Firmware Source of Truth
- `firmware/oracle-engine/oracle-engine.ino` — Voice AI firmware (Phase 4)
- `firmware/pov-globe/pov-globe.ino` — POV display firmware (Phase 6)

### Backend
- `services/orb-backend/sphere_ws.py` — WebSocket voice pipeline
- `services/orb-backend/gods/*.json` — 21 deity personality configs

### Hardware Specs (in CLAUDE.md)
- ESP32-S3 + APA102 + N20 + Hall sensor + INMP441 + MAX98357A specs
- 3x 18650 Li-ion (3S), USB-C PD trigger board

### Phase Context (for locked decisions)
- `.planning/phases/04-oracle-engine-hardware-fundamentals-track-a/04-CONTEXT.md`
- `.planning/phases/05-oracle-engine-product-shell-track-a/05-CONTEXT.md`
- `.planning/phases/06-pov-globe-prototype-track-b/06-CONTEXT.md`

</canonical_refs>

<deferred>
## Deferred Ideas

- Multi-deity switching (speak deity name → sphere shifts color + voice) — Phase 8+
- Full companion web app beyond setup page — SPHERE-V2-02
- Personal RAG from Obsidian vault — SPHERE-V2-03
- Wireless charging dock — SPHERE-V2-04
- 21 deity animations (launch with 1, expand post-Kickstarter) — SPHERE-V2-01
- Touchscreen full UI — Phase 8+

</deferred>

---
*Phase: 07-spirit-sphere-integration*
*Context gathered: 2026-03-31 via discuss-phase (analysis-only, no user Q&A)*
