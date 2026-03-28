# Architecture Patterns

**Domain:** AI Oracle Cards + Volumetric LED Spirit Sphere (shared infrastructure)
**Researched:** 2026-03-28

## System Overview

Two products share a common backend but have radically different frontends. The Oracle Cards product is a web application triggered by QR scan. The Spirit Sphere is an ESP32-S3 hardware device communicating over WebSocket. Both converge on the same AI pipeline: query understanding, RAG retrieval, LLM generation, voice synthesis, and visual presentation.

```
                    +------------------+
                    |  SHARED BACKEND  |
                    |  (orb-backend)   |
                    |     :8300        |
                    +--------+---------+
                             |
              +--------------+--------------+
              |                             |
     +--------v--------+          +--------v--------+
     |  Oracle Cards    |          |  Spirit Sphere  |
     |  Web App (PWA)   |          |  ESP32-S3       |
     |  Mobile browser  |          |  Hardware device|
     +-----------------+          +-----------------+
```

## Recommended Architecture

### Layer 1: Existing Infrastructure (no changes)

These services already run and should be consumed, not rebuilt.

| Service | Port | Role in The Orb |
|---------|------|-----------------|
| Smithers | :8200 | Orchestration, tool-calling, multi-step AI workflows |
| LLM Router | :8100 | Model selection, fallback chains (OpenRouter -> Anthropic -> Ollama) |
| OpenClaw Gateway | :18789 | Provider abstraction, model registry |
| Ollama | :11434 | Local model inference for cost-sensitive tasks |

### Layer 2: New Shared Backend (orb-backend :8300)

A single new service that both products talk to. This is the only new backend component.

| Responsibility | Implementation |
|----------------|----------------|
| Oracle reading orchestration | Multi-step pipeline: intent -> RAG -> myth correlation -> LLM generation -> voice -> visual |
| Spirit Sphere voice loop | WebSocket endpoint for real-time audio streaming |
| Content DB access | Query 6,252 SC images + 2,891 Midjourney by deity/theme/mood |
| Pinecone RAG | Vector search over Obsidian vault for personal knowledge |
| ElevenLabs voice | Deity-specific voice profiles, TTS generation, audio streaming |
| Session management | User sessions, reading history, usage tracking |
| QR code routing | Map card ID -> deity -> reading configuration |

**Technology:** Node.js (TypeScript) or Python FastAPI. Recommendation: **Python FastAPI** because the existing Smithers and morning briefing pipeline are Python, ElevenLabs SDK is Python-first, and the AI/ML ecosystem is Python-native. Use WebSocket support built into FastAPI (via Starlette).

### Layer 3a: Oracle Cards Web App (Frontend)

Mobile-first Progressive Web App. User scans QR code on physical card, lands in browser.

| Component | Technology | Why |
|-----------|-----------|-----|
| Framework | SvelteKit | Sacred Circuits pipeline already at localhost:5173 is Svelte. Reuse knowledge and possibly components. |
| Hosting | Static + Cloudflare tunnel | Already have tunnel infrastructure. SSR not needed for card readings. |
| Audio playback | Web Audio API | Stream deity voice narration with ambient soundscape overlay |
| Visual presentation | Canvas/WebGL | Display PANTHEON art panels, animated transitions |
| QR routing | URL params | `https://orb.sacredcircuits.ai/read/{deity}/{card_id}` |

### Layer 3b: Spirit Sphere Firmware (ESP32-S3)

The hardware device runs C++ Arduino firmware with these subsystems:

| Subsystem | Components | Protocol |
|-----------|-----------|----------|
| Audio Input | INMP441 MEMS mic, I2S bus | 16kHz 16-bit mono PCM |
| Audio Output | MAX98357A amp + 3W speaker, I2S bus | 16kHz 16-bit mono PCM |
| Network | WiFi STA mode, WebSocket client | WSS to orb-backend:8300 |
| POV Display | 6-8 LED arms (APA102/SK9822 DotStar), FastLED DMA | SPI at 12MHz+ |
| Motor Control | N20 micro gear motor, PWM via MOSFET | GPIO PWM 3-5 RPM |
| Position Sensing | Hall effect sensor + magnets | GPIO interrupt |
| Power | 3x 18650 Li-ion, USB-C charge pass-through | Slip ring (6-wire: 3 power, 3 ground) |

## Component Boundaries

### Boundary 1: QR Scan -> Web App -> Backend

```
Physical Card (QR code)
    |
    v [HTTPS GET]
Oracle Web App (SvelteKit PWA)
    |
    v [REST API / SSE]
orb-backend :8300
    |
    +---> Smithers :8200 (orchestrate multi-step reading)
    |       +---> LLM Router :8100 (model selection)
    |       +---> Pinecone (Obsidian vault RAG)
    |
    +---> Content DB (deity images, PANTHEON panels)
    +---> ElevenLabs API (deity voice TTS)
    |
    v [JSON + audio stream]
Oracle Web App
    |
    v [Web Audio API + Canvas]
User's phone screen + speaker
```

**Data format:** REST for reading initiation and status. Server-Sent Events (SSE) for streaming the reading as it generates (text chunks + audio chunks + image references). SSE over WebSocket because the Oracle Cards flow is request-response (user asks, AI delivers), not bidirectional.

### Boundary 2: Spirit Sphere -> Backend -> Cloud AI

```
User speaks
    |
    v [I2S DMA]
INMP441 mic -> ESP32-S3 PSRAM buffer
    |
    v [WebSocket binary frames]
orb-backend :8300
    |
    +---> AssemblyAI STT (or ElevenLabs Scribe)
    |       v [text transcript]
    +---> Smithers :8200 (orchestrate response)
    |       +---> LLM Router :8100
    |       +---> Pinecone RAG (personal knowledge)
    |       v [response text]
    +---> ElevenLabs TTS (deity voice)
    |       v [audio chunks]
    |
    v [WebSocket binary frames]
ESP32-S3
    +---> MAX98357A speaker [I2S DMA]
    +---> POV LED display [SPI DMA, animation sync]
```

**Data format:** WebSocket with binary frames for audio (both directions). JSON control frames for metadata (which deity, animation cue, volume level). The ESP32 should stream audio in 512-byte chunks to keep latency under 200ms.

### Boundary 3: POV Display Subsystem (ESP32-internal)

```
Hall effect sensor (rotation sync)
    |
    v [GPIO interrupt -> revolution timer]
Frame buffer (PSRAM, 128 x N angular slices)
    |
    v [DMA transfer per angular slice]
FastLED / SPI -> LED arms (APA102 DotStar)
    |
    v [persistence of vision]
User sees volumetric sphere
```

**Critical timing:** At 3-5 RPM (200-333ms per revolution), each angular slice must render in < 1ms. With 128 slices per revolution at 5 RPM, that is 333ms / 128 = 2.6ms per slice. Comfortable for ESP32-S3 at 240MHz with DMA. At 3 RPM, even more headroom at 4.7ms per slice.

**Frame buffer strategy:** Double-buffering in PSRAM. One buffer displayed, one written by network/animation task. Swap on frame boundary. ESP32-S3 has 8MB PSRAM, frame buffer for 128 LEDs x 128 slices x 3 bytes RGB = ~49KB per frame. Trivial.

## Data Flow Summary

### Oracle Card Reading Flow

1. User scans QR on physical card
2. Browser opens `orb.sacredcircuits.ai/read/aphrodite/017`
3. Web app presents intention selector (love, wisdom, courage, etc.)
4. User selects intention, web app POSTs to orb-backend
5. orb-backend calls Smithers with structured prompt: deity + intention + user context
6. Smithers orchestrates: Pinecone RAG for mythological context -> LLM generates reading -> ElevenLabs generates voice
7. orb-backend streams back via SSE: text chunks, audio URL, image references from Content DB
8. Web app renders: PANTHEON art as backdrop, text overlaid, audio plays deity voice
9. Total target latency: < 8 seconds to first content, < 30 seconds for full reading

### Spirit Sphere Voice Flow

1. User presses button or speaks wake word
2. ESP32 records audio to PSRAM via I2S DMA
3. On button release (or silence detection), ESP32 sends audio over WebSocket
4. orb-backend receives audio, sends to AssemblyAI STT
5. Transcript sent to Smithers for LLM processing with RAG context
6. Response text sent to ElevenLabs TTS
7. Audio chunks streamed back over WebSocket
8. ESP32 plays audio via I2S while triggering POV animation
9. Total target latency: < 3 seconds to first audio chunk (goal), < 5 seconds acceptable

## Patterns to Follow

### Pattern 1: Streaming Pipeline with Backpressure

**What:** Never buffer the entire AI response before delivering. Stream each stage's output to the next.

**When:** Always, for both products.

**Why:** An oracle reading generates ~500 words of text, ~30 seconds of audio, and references 3-5 images. Waiting for all of that before showing anything creates unacceptable perceived latency.

**Implementation:**
```
LLM (streaming tokens) -> TTS (sentence-by-sentence) -> Client (chunk-by-chunk)
```

The LLM streams tokens. When a complete sentence is detected, that sentence is sent to TTS. TTS audio chunks are immediately forwarded to the client. The client begins playing audio while more is still generating. For the web app, SSE delivers this naturally. For the ESP32, WebSocket binary frames.

### Pattern 2: Deity Configuration as Data

**What:** Each of the 21 Greek gods is a configuration record, not code.

**When:** Any deity-specific behavior.

```python
# deity_config.json
{
  "aphrodite": {
    "voice_id": "eleven_labs_voice_id_here",
    "system_prompt": "You are Aphrodite, goddess of love...",
    "art_collection": "pantheon/aphrodite",
    "color_palette": ["#FFD1DC", "#FF69B4", "#C71585"],
    "pov_animation": "swirl_roses",
    "reading_style": "compassionate, sensual, direct"
  }
}
```

**Why:** Adding a new deity should be a config file change, not a code change. The 21 gods ship with cards; more can be added as expansion packs.

### Pattern 3: Firmware State Machine

**What:** ESP32 firmware operates as an explicit state machine, not spaghetti conditionals.

**States:**
```
IDLE -> LISTENING -> UPLOADING -> WAITING -> PLAYING -> IDLE
                                         \-> ANIMATING (parallel to PLAYING)
```

**Why:** Hardware firmware must be deterministic. Every state has clear entry/exit conditions, timeout behavior, and error recovery. The KALO project demonstrates this with RGB LED color states (GREEN=ready, RED=recording, CYAN=processing, BLUE=generating, PINK=speaking).

### Pattern 4: Shared Backend, Separate Protocols

**What:** orb-backend exposes two distinct protocol endpoints but shares all business logic.

```
/api/oracle/*     -> REST + SSE (web app)
/ws/sphere        -> WebSocket (ESP32)
```

**Why:** The web app and hardware device have fundamentally different communication needs. The web app is request-response with streaming. The hardware device is persistent bidirectional. But both call the same reading pipeline, same RAG, same TTS. One codebase, two protocols.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Separate Backends per Product

**What:** Building oracle-backend and sphere-backend as separate services.

**Why bad:** 80% of the logic is identical (RAG retrieval, LLM orchestration, TTS generation, Content DB queries). Separate services means duplicated code, divergent behavior, double the maintenance.

**Instead:** One orb-backend with protocol adapters for web and hardware.

### Anti-Pattern 2: ESP32 Doing AI Processing

**What:** Running any AI model on the ESP32 itself.

**Why bad:** ESP32-S3 has 512KB SRAM + 8MB PSRAM. Even tiny models produce garbage. The device is a sensor/actuator, not a compute node.

**Instead:** ESP32 handles only: audio I/O, POV display, WiFi, WebSocket framing. All intelligence lives in the cloud backend.

### Anti-Pattern 3: Polling for Audio

**What:** ESP32 polling the backend for audio data availability.

**Why bad:** Adds 50-200ms latency per poll cycle. Destroys conversational feel.

**Instead:** WebSocket push. Backend pushes audio frames as they arrive from TTS. ESP32 plays immediately from a small ring buffer.

### Anti-Pattern 4: Monolithic Reading Generation

**What:** Generating the entire oracle reading (text + audio + images) before returning anything.

**Why bad:** 15-30 second wait with no feedback. Users will think it is broken.

**Instead:** Stream progressively. Show a PANTHEON image immediately (< 1s). Start text streaming (< 3s). Start audio playback (< 5s). Full reading completes in background.

## Scalability Considerations

| Concern | 1 User (Dev) | 100 Users | 10K Users |
|---------|-------------|-----------|-----------|
| LLM calls | Smithers direct | Smithers with queue | Rate limit per user, queue with priority |
| TTS generation | ElevenLabs direct | ElevenLabs with caching | Cache common readings, pre-generate deity intros |
| Content DB | File system | File system + CDN | CDN with edge caching |
| WebSocket (Sphere) | Single connection | 100 persistent WS | Load balancer with sticky sessions |
| Pinecone | Free tier | Free tier (1M vectors) | Starter tier ($70/mo) |
| Audio storage | Local disk | S3-compatible | S3 + CDN |

**Key insight for this project:** At Kickstarter scale (1,370 break-even units), the system needs to handle ~100-500 concurrent Spirit Spheres and maybe 1,000 concurrent oracle readings. This is well within single-server capacity with proper async handling. Do not over-engineer for scale that may never arrive.

## Suggested Build Order (Dependencies)

The build order reflects hard dependencies between components.

### Phase 1: Oracle Cards (leverages 80% existing infra)

```
1. Audit existing SC pipeline (what works, what is missing)
   |
2. orb-backend core (FastAPI skeleton, deity config, Content DB access)
   |
   +---> 3a. Oracle reading pipeline (Smithers integration, RAG, LLM prompt)
   +---> 3b. ElevenLabs voice integration (deity profiles, streaming TTS)
   |
4. Oracle web app (SvelteKit, QR routing, reading UI)
   |
5. Streaming integration (SSE from backend to web app)
   |
6. Card design + QR generation (physical product)
   |
7. Landing page + payment (Stripe, tiered access)
```

**Critical path:** Steps 2 and 3 are the core. If the reading pipeline works and sounds good, the rest is UI and logistics.

### Phase 2: Spirit Sphere (hardware, new territory)

```
1. ESP32-S3 dev board + breadboard prototyping
   +---> Audio I/O (mic + speaker, I2S, prove round-trip works)
   +---> WiFi + WebSocket (connect to orb-backend, send/receive)
   |
2. orb-backend WebSocket endpoint (reuse reading pipeline, add audio streaming)
   |
3. Voice loop end-to-end (speak -> STT -> LLM -> TTS -> hear response)
   |
4. POV display prototype (LED strip + motor, prove persistence of vision)
   +---> Hall sensor timing
   +---> Frame buffer + DMA
   |
5. Integration (voice + display on same ESP32-S3)
   |
6. Mechanical design (3D printed enclosure, slip ring, bearing mount)
   |
7. Battery + power management
   |
8. Kickstarter campaign prep
```

**Critical path:** Step 1 (audio I/O) and Step 4 (POV display) can run in parallel. Step 3 (voice loop) is the moment of truth -- if the round-trip latency is acceptable, the product works. Step 5 (integration) is where hardware complexity spikes.

### Dependency Graph Between Products

```
Oracle Cards Phase:
  [SC Audit] -> [orb-backend] -> [Reading Pipeline] -> [Web App] -> [Cards + QR]
                     |
Spirit Sphere Phase: |
  [ESP32 Basics] ----+---> [WebSocket Endpoint] -> [Voice Loop] -> [POV Display]
                                                                        |
                                                              [Integration + Enclosure]
```

The arrow from orb-backend into Spirit Sphere is the key dependency. Building Oracle Cards first means the backend exists when Spirit Sphere development begins. The Spirit Sphere only needs a new WebSocket protocol adapter, not a new backend.

## Sources

- [Mercator: ESP32 POV Globe](https://mdwdotla.medium.com/mercator-an-esp32-based-spherical-persistence-of-vision-display-a4beff4f826e) -- Reference design for ESP32 + DotStar + slip ring + Hall sensor architecture
- [Flicker: Spherical Volumetric Display](https://danfoisy.github.io/flicker/) -- Advanced reference: 256 LEDs, FPGA-driven, 15Hz frame rate, slip ring power delivery
- [KALO ESP32 Voice Chat](https://github.com/kaloprojects/KALO-ESP32-Voice-Chat-AI-Friends) -- Reference for ESP32 voice assistant: INMP441 + MAX98357A + ElevenLabs STT/TTS pipeline
- [ESP32 AI Voice Assistant with MCP](https://hackaday.io/project/204691-esp32-ai-voice-assistant-with-mcp-integration) -- WebSocket audio streaming architecture, state machine firmware pattern
- [Arduino POV Display](https://projecthub.arduino.cc/jobitjoseph/open-source-high-resolution-pov-display-using-esp32-799677) -- ESP32 POV with 74HC595 shift registers, 128px resolution
- [ESP32 I2S DMA Settings](https://www.atomic14.com/2021/04/20/esp32-i2s-dma-buf-len-buf-count) -- DMA buffer configuration for low-latency audio
- [Pinecone RAG Pipeline Design](https://www.pinecone.io/learn/series/vector-databases-in-production-for-busy-engineers/rag-pipeline-design/) -- Production RAG architecture patterns
- [PCBWay ESP32 POV Display](https://www.pcbway.com/project/shareproject/High_Resolution_POV_Display_using_ESP32_2d12b725.html) -- ESP32 POV reference with 128px, 20FPS
