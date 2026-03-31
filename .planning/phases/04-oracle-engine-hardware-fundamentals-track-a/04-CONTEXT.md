# Phase 4: Oracle Engine — Hardware Fundamentals - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning
**Source:** Derived from ROADMAP, CLAUDE.md, and session decisions

<domain>
## Phase Boundary

Prove voice AI round-trip on real ESP32-S3 hardware. Speak into a mic, audio goes to orb-backend via WebSocket, gets processed (STT → LLM → TTS), and deity voice response plays through speaker. This is the first hardware phase — learning milestones matter as much as build milestones.

Primary hardware: ESP32-S3-BOX-3 (zero soldering, built-in mic + speaker + WiFi).
Secondary validation: same firmware on bare ESP32-S3-DevKitC-1 + INMP441 + MAX98357A.

</domain>

<decisions>
## Implementation Decisions

### Hardware Target (LOCKED)
- ESP32-S3-BOX-3 as primary dev platform (built-in mic, speaker, WiFi, touchscreen)
- Arduino IDE 2.x with Arduino ESP32 Core 3.x (per CLAUDE.md)
- I2S for all audio (digital path, no analog ADC)

### Backend (LOCKED — from Phase 1)
- orb-backend at :8300 already has WebSocket placeholder at /ws/sphere
- WebSocket protocol: audio up (PCM or Opus), TTS audio down, bidirectional
- AssemblyAI for STT, Claude for LLM, ElevenLabs for TTS (all existing)

### Audio Format (LOCKED — from CLAUDE.md)
- Start with raw PCM 16-bit 16kHz (simplest, zero CPU cost)
- Optimize to Opus later if bandwidth is an issue
- ESP32-S3 has hardware crypto for WSS

### Firmware Architecture
- WiFi connection + WebSocket client (ArduinoWebSockets library)
- I2S audio capture from built-in PDM mic (BOX-3) or INMP441 (bare board)
- I2S audio playback through built-in speaker (BOX-3) or MAX98357A (bare board)
- Pin configuration as compile-time defines (swap between BOX-3 and bare board)

### Backend WebSocket Endpoint (NEEDS BUILDING)
- The /ws/sphere endpoint exists as a placeholder from Phase 1
- Needs real implementation: receive audio → STT → LLM → TTS → send audio back
- Pattern: single WebSocket connection, backend fans out to services

</decisions>

<canonical_refs>
## Canonical References

### Phase 1 Backend
- `services/orb-backend/server.py` — WebSocket placeholder at /ws/sphere
- `services/orb-backend/pipeline.py` — Claude streaming generation
- `services/orb-backend/tts.py` — ElevenLabs WebSocket TTS
- `services/orb-backend/rag.py` — ChromaDB RAG

### Tech Stack Decisions
- `CLAUDE.md` — ESP32-S3, Arduino IDE, I2S, PCM/Opus, ArduinoWebSockets

</canonical_refs>

<specifics>
## Specific Ideas

- Push-to-talk initially (button on BOX-3 touchscreen), wake word later (v2)
- LED indicator for listening/processing/speaking states
- Measure and log latency at each stage (capture → upload → STT → LLM → TTS → playback)
- WiFi credentials via serial monitor for dev, BLE/captive portal for production (Phase 5)

</specifics>

<deferred>
## Deferred Ideas

- Wake word detection (Phase 5 / v2)
- OTA firmware updates (Phase 5)
- WiFi provisioning via BLE/captive portal (Phase 5)
- Local LLM fallback (Phase 5)
- Swappable personality protocols (Phase 5)

</deferred>

---

*Phase: 04-oracle-engine-hardware-fundamentals-track-a*
*Context gathered: 2026-03-29*
