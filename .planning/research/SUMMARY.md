# Project Research Summary

**Project:** The Orb (Oracle Cards + Spirit Sphere)
**Domain:** AI-powered physical+digital oracle experience (cards) + volumetric LED hardware with voice AI (sphere)
**Researched:** 2026-03-28
**Confidence:** HIGH

## Executive Summary

The Orb is a two-product line where Oracle Cards validate the market and Spirit Sphere is the flagship hardware play. The critical insight from research is that roughly 80% of the infrastructure already exists in the Sacred Circuits pipeline -- LLM routing, RAG via Pinecone, ElevenLabs deity voices, PANTHEON art, Content DB. The Oracle Cards product is primarily an integration and packaging exercise on top of existing infrastructure, not a greenfield build. The new backend work is a single FastAPI service (orb-backend at :8300) that both products share. This is the correct architecture: one backend with two protocol adapters (REST+SSE for web, WebSocket for hardware).

The Spirit Sphere is where all the risk lives. The builder is new to hardware, and POV volumetric displays demand simultaneous mastery of rotational mechanics, LED timing, position synchronization, and structural balance. Research strongly indicates that the POV display must be approached incrementally: flat 2D POV first, then single-arm sphere, then full multi-arm assembly. The voice AI latency pipeline (STT -> LLM -> TTS) must stream end-to-end from day one -- no sequential buffering. The "crystal ball glowing while channeling" pattern masks latency as ritual, turning a technical constraint into a product feature.

The top project-killing risks are: (1) POV display physics gap causing months of mechanical debugging and builder discouragement, (2) voice latency destroying the demo experience, (3) prototype-to-production gap consuming the budget, (4) self-printed cards looking amateur and poisoning the brand, and (5) shipping cost miscalculation eating Kickstarter margins. Mitigations exist for all of these, but they require deliberate phase gates -- not "figure it out as we go." The Oracle Cards product should use print-on-demand (The Game Crafter or MakePlayingCards) from the first public sale, not home printing. The Kickstarter should sell a "Maker Edition" kit, not a consumer appliance, to reset production expectations.

## Key Findings

### Recommended Stack

The stack splits cleanly between the two products with a shared backend layer. Oracle Cards is a standard modern web stack (Next.js 15 / React 19 / TypeScript / Tailwind / shadcn/ui) deployed on Vercel, with Serwist for PWA support. The Spirit Sphere firmware runs on ESP32-S3-WROOM-1 (N16R8) with Arduino IDE 2.x and ESP32 Core 3.x. Both products talk to the same orb-backend (Python FastAPI) which orchestrates the existing AI pipeline.

**Core technologies -- Oracle Cards:**
- **Next.js 15 (App Router):** Web framework -- SSR for landing pages, App Router for reading experience, Vercel for zero-config CDN
- **Serwist:** PWA service worker -- successor to next-pwa, enables "Add to Home Screen" after QR scan
- **FastAPI (orb-backend :8300):** New shared backend -- reading orchestration, deity config, Content DB access, ElevenLabs voice, session management
- **Stripe + Auth.js v5:** Payments and auth -- tiered access (free sample, paid full readings), magic link login

**Core technologies -- Spirit Sphere:**
- **ESP32-S3-WROOM-1 (N16R8):** MCU -- 16MB Flash, 8MB PSRAM, dual-core 240MHz, native USB/WiFi/BLE, hardware crypto
- **APA102/SK9822 LEDs (NOT WS2812B):** POV display -- 20kHz PWM refresh, two-wire SPI immune to WiFi interrupt glitches. This is non-negotiable.
- **FastLED 3.7+ with I2S DMA:** LED control -- hardware SPI, 4 DMA buffers for WiFi resilience
- **INMP441 + MAX98357A:** Audio I/O -- I2S MEMS mic + I2S amp, digital path, no ADC needed
- **PCM 16-bit 16kHz (start here, Opus later):** Audio codec -- zero CPU cost, optimize to Opus only if bandwidth matters

**Critical version requirements:**
- ESP32 Arduino Core must be 3.x (not 2.x) for S3 support
- FastLED must be 3.7+ for ESP32-S3 I2S DMA driver
- Next.js must be 15.x for React 19 Server Components

### Expected Features

**Must have (table stakes) -- Oracle Cards:**
- High-quality card artwork (exists: PANTHEON 525 panels)
- Mobile-first web reading experience (QR scan to reading in <3s)
- Personalized AI reading per card (the core value prop vs static decks)
- Daily card / single pull reading (80% of user engagement)
- Free tier with limited readings (freemium dominates oracle market)
- Digital guidebook per god (mythology, keywords, upright/reversed meanings)

**Must have (table stakes) -- Spirit Sphere:**
- Reliable voice interaction (push-to-talk for v1, not wake word)
- Visible volumetric POV display (must work in ambient lighting, not just darkness)
- USB-C charging with pass-through
- Sub-45dB noise level (desk/nightstand placement)
- Setup in under 10 minutes (WiFi provisioning via BLE or captive portal)
- OTA firmware updates (build from day one)
- Privacy controls (physical mic mute button + LED indicator)

**Should have (differentiators):**
- Deity voice narration via ElevenLabs (THE killer feature -- no competing deck has this)
- Greek mythology correlation engine (myth-matched readings using SC Content DB)
- God-specific question routing ("Ask Athena about strategy, Aphrodite about love")
- Volumetric 3D animated deity avatars (genuinely new -- no consumer product does this)
- Personal knowledge RAG from Obsidian vault (transforms gadget into personal oracle)
- Battery-powered portability (room-to-room, show friends)

**Defer to v2+:**
- NFC chip integration (QR works fine for v1, NFC adds $0.50-1.00/card)
- Multi-card spread readings (single pull covers 80% of engagement)
- Shareable reading cards / social images (growth feature for month 2)
- Reading journal / mirror analytics (nice to have, not launch-critical)
- 21 deity animations (launch Sphere with 3-5, expand via OTA)
- Full companion web app (basic setup page only for Kickstarter)
- Personal RAG / Obsidian (stretch goal or post-Kickstarter)
- Open-source hardware release (post-fulfillment, not pre-ship)

### Architecture Approach

Two products share a single new backend (orb-backend :8300) that sits atop the existing Sacred Circuits infrastructure (Smithers :8200, LLM Router :8100, OpenClaw :18789). The web app uses REST + SSE for streaming readings. The ESP32 uses a persistent WebSocket for bidirectional audio. Both call the same reading pipeline, same RAG, same TTS. Deity configuration is data, not code -- adding a god is a config file change. The ESP32 firmware is an explicit state machine (IDLE -> LISTENING -> UPLOADING -> WAITING -> PLAYING -> IDLE). The POV display uses double-buffered PSRAM frames (49KB per frame, trivial for 8MB PSRAM) with DMA transfer synced to Hall effect sensor interrupts.

**Major components:**
1. **orb-backend (:8300)** -- Single new FastAPI service. Oracle reading orchestration, WebSocket audio relay for Sphere, deity config, Content DB access, ElevenLabs TTS proxy, session management
2. **Oracle Cards Web App** -- Next.js 15 PWA on Vercel. QR routing, reading UI, Stripe payments, SSE streaming from backend
3. **Spirit Sphere Firmware** -- ESP32-S3 Arduino C++. Audio I/O (I2S), POV display (FastLED DMA), WiFi/WebSocket, state machine
4. **Existing SC Pipeline** -- Smithers, LLM Router, Pinecone, Content DB. Consumed as-is, extended with mythology corpus

### Critical Pitfalls

1. **Voice AI latency wall** -- Sequential STT->LLM->TTS creates 2-4s dead air that kills the magic. Prevention: stream end-to-end from day one, use "channeling" animations to mask processing, target <1s to first audio byte.

2. **POV display physics gap** -- First-time builder hits rotational mechanics, LED timing, position sync, and structural balance simultaneously. Prevention: start with flat 2D POV, master single-arm before multi-arm, use APA102 (not WS2812B), budget 4-6 print iterations.

3. **Prototype-to-production abyss** -- Working breadboard prototype does not equal shippable product. Prevention: sell "Maker Edition" kit (not consumer appliance), use off-the-shelf ESP32-S3 modules, design PCB early with KiCad, keep first run to 100-300 units, use JLCPCB assembly.

4. **Self-printed cards look amateur** -- Home printing cannot match commercial card quality. Prevention: use print-on-demand (The Game Crafter, MakePlayingCards) from first public sale, price v1 cards at cost ($5-10) to validate the digital experience.

5. **Shipping cost annihilation** -- Spherical packaging = poor packing efficiency = dimensional weight pricing surprise. Prevention: get real shipping quotes before setting KS tiers, use BackerKit for post-campaign shipping collection, consider US-only for first campaign, add 30% contingency.

## Implications for Roadmap

### Phase 1: Sacred Circuits Pipeline Audit + Oracle Backend

**Rationale:** Everything depends on understanding what exists and what is missing. The PROJECT.md says the SC pipeline is "80% built" but that needs verification. The orb-backend is the foundation both products share.
**Delivers:** Working orb-backend (:8300) with deity config, Content DB access, and reading pipeline connected to Smithers/LLM Router/Pinecone.
**Addresses:** Core infrastructure for ALL subsequent phases
**Avoids:** Pitfall 14 (scope creep) -- timebox audit to 1 week, simplify if gaps are larger than expected

### Phase 2: Oracle Cards Reading Experience

**Rationale:** The reading experience is the product. Cards are just access keys. If the AI reading is generic and boring, nothing else matters. This phase is where McKee storytelling principles and deity personality engineering happen.
**Delivers:** Working end-to-end flow: QR scan -> intention selection -> AI reading with deity voice narration + PANTHEON visuals. Streaming SSE delivery. Free tier + paid tier via Stripe.
**Addresses:** Table stakes (personalized readings, deity voice, mobile-first PWA, daily card pull, free tier) plus key differentiators (voice narration, mythology correlation, visual presentation)
**Avoids:** Pitfall 7 (generic readings) -- A/B test with 20-30 people before launch, iterate until screenshots are shared unprompted; Pitfall 12 (QR link rot) -- lock URL architecture before cards go to print

### Phase 3: Oracle Cards Physical Product + Launch

**Rationale:** Physical cards cannot ship until the digital experience works and URLs are locked. Print-on-demand requires finalized card designs with QR codes pointing to permanent routes.
**Delivers:** 21-card deck via print-on-demand, landing page with email capture + $1 reservation deposits, launch to initial audience
**Addresses:** Card artwork/layout, QR generation, packaging, revenue model activation
**Avoids:** Pitfall 5 (amateur printing) -- use professional print-on-demand, not home printer; Pitfall 11 (ElevenLabs cost spiral) -- cache common audio, implement cost tracking from day one

### Phase 4: ESP32 Hardware Fundamentals (Learning Phase)

**Rationale:** The builder is new to hardware. This phase is explicitly a learning milestone, not a product milestone. Trying to build the Sphere without foundational ESP32 skills leads to months of frustration and potential project abandonment.
**Delivers:** Working ESP32-S3 dev board with: LED blink, I2S audio capture + playback, WiFi connection, WebSocket communication to orb-backend, basic voice round-trip (speak -> STT -> LLM -> TTS -> hear response)
**Addresses:** Hardware learning curve, voice pipeline validation on actual hardware (not laptop)
**Avoids:** Pitfall 1 (latency wall) -- validate voice round-trip latency early on real WiFi; Phase-specific warning (tutorial hell) -- hard 2-week timebox for Hello World

### Phase 5: POV Display Prototype

**Rationale:** The POV display is the highest-risk technical component. It must be validated independently before integration with audio and networking. Research strongly recommends 2D flat POV first, then single-arm sphere.
**Delivers:** Working POV display: single arm with APA102 LEDs, Hall effect position sync, FastLED DMA rendering, visible image at 3-5 RPM in ambient lighting
**Addresses:** Core Spirit Sphere differentiator (volumetric 3D display)
**Avoids:** Pitfall 2 (POV physics gap) -- incremental approach (2D -> single arm -> multi-arm), budget 4-6 3D print iterations; Pitfall 6 (slip ring noise) -- validate power delivery early, consider batteries-on-rotating-assembly approach

### Phase 6: Spirit Sphere Integration + Enclosure

**Rationale:** Voice pipeline (Phase 4) and POV display (Phase 5) ran in parallel. This phase combines them on one ESP32-S3 and adds mechanical design, battery power, and the complete user experience.
**Delivers:** Integrated prototype: voice AI + POV display + 3D printed enclosure + battery power + at least 1 deity avatar animation. Reliable 5-minute demo capability.
**Addresses:** Table stakes (voice interaction, display, USB-C, noise level, power button, mic mute) plus differentiators (deity avatar, battery portability)
**Avoids:** Pitfall 8 (WiFi dependency in demos) -- build demo mode with pre-recorded responses; Phase-specific warning (I2S + LED DMA conflict) -- use Core 0 for audio, Core 1 for LEDs

### Phase 7: Kickstarter Campaign Prep + Launch

**Rationale:** Campaign cannot launch until the Sphere demos reliably for 10+ minutes and shipping costs are validated. PCB design (even if prototype uses breadboard) must be started before campaign to prove manufacturing path.
**Delivers:** Kickstarter campaign live with: campaign video, "Maker Edition" positioning, $179 early bird tier, accurate shipping charges via BackerKit, PCB design validated with small-batch JLCPCB order
**Addresses:** Kickstarter-exclusive content, limited edition scarcity, community building (Discord)
**Avoids:** Pitfall 3 (prototype-to-production) -- "Maker Edition" resets expectations, PCB validated pre-launch; Pitfall 4 (shipping costs) -- real quotes with actual dimensions before setting tiers; Pitfall 9 (open source too early) -- promise open source, deliver post-fulfillment; Pitfall 10 (timing mismatch) -- plan for October 2026 aggressive / February 2027 realistic windows

### Phase Ordering Rationale

- Phases 1-3 (Oracle Cards) before Phases 4-7 (Spirit Sphere): Oracle Cards leverage 80% existing infra and can ship in 2-3 months. Revenue and audience from cards fund and de-risk the Sphere. The orb-backend built for cards is reused by the Sphere.
- Phase 4 and 5 can run in parallel: Audio I/O learning and POV display prototyping are independent workstreams on the same ESP32-S3 platform. This compresses the timeline.
- Phase 6 (integration) must follow 4+5: Cannot combine subsystems until each works independently. This is where hardware complexity spikes.
- Phase 7 (Kickstarter) is gated on Phase 6: Campaign video requires reliable demo. Do not force a launch date if the demo is not solid.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Reading Experience):** Prompt engineering for deity personalities and McKee narrative arc requires heavy iteration. No off-the-shelf pattern exists for "Greek god oracle AI with streaming voice."
- **Phase 5 (POV Display):** Complex physics, mechanical engineering, and LED timing. Builder should study Mercator project and Flicker spherical display in detail. Consider `/gsd:research-phase` before planning.
- **Phase 6 (Integration):** Dual-core task pinning (audio on Core 0, LEDs on Core 1), DMA channel allocation, and power management under load. Sparse documentation for this specific combination.
- **Phase 7 (Kickstarter):** Campaign strategy, video production, fulfillment logistics. Domain-specific knowledge needed.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Pipeline Audit + Backend):** FastAPI service creation is well-documented. Existing SC infra provides the pattern.
- **Phase 3 (Physical Cards + Launch):** Print-on-demand workflow is standard. Stripe integration is well-documented.
- **Phase 4 (ESP32 Fundamentals):** Massive tutorial ecosystem. KALO project is a near-exact reference for voice AI on ESP32.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies are mainstream with strong documentation. ESP32-S3 + FastLED + APA102 is a proven combination per Mercator project. Web stack is standard Next.js. |
| Features | HIGH | Competitive analysis covers Labyrinthos, Golden Thread, AI tarot apps, Echo Show, Rabbit R1, Humane Pin. Feature priorities are well-grounded in market evidence. |
| Architecture | HIGH | Shared backend pattern is sound. Reference architectures exist for both the web reading flow (standard SSE streaming) and ESP32 voice pipeline (KALO, MCP voice assistant). POV display timing math checks out. |
| Pitfalls | HIGH | Multiple verified sources including real Kickstarter failure analyses, Mercator project post-mortem, Rabbit R1/Humane Pin teardowns. Hardware pitfalls are especially well-documented. |

**Overall confidence:** HIGH

### Gaps to Address

- **SC Pipeline "80% complete" claim is unverified.** Phase 1 audit may reveal the gap is larger. Mitigation: timebox audit to 1 week, simplify reading experience if gaps exceed 30%.
- **POV display visibility in ambient lighting is unproven.** All reference projects show POV displays in controlled/dark environments. Must test APA102 brightness at 3-5 RPM in normal room lighting during Phase 5.
- **Voice round-trip latency on actual ESP32 over WiFi is theoretical.** Reference projects report ~465ms best-case but measurements were on laptops, not microcontrollers. Phase 4 must validate this on real hardware.
- **ElevenLabs cost at scale is uncertain.** 21 deity voices x streaming TTS could hit cost limits fast. Need to measure cost-per-reading early and implement caching strategy in Phase 2.
- **Slip ring vs batteries-on-rotating-assembly trade-off needs physical testing.** Research supports both approaches. Phase 5 should prototype both before committing.
- **Kickstarter audience overlap (tech + spiritual) is assumed, not validated.** Oracle Cards sales data (Phase 3) will provide signal before Kickstarter launch.

## Sources

### Primary (HIGH confidence)
- [Mercator ESP32 Spherical POV Display](https://mdwdotla.medium.com/mercator-an-esp32-based-spherical-persistence-of-vision-display-a4beff4f826e) -- reference architecture for POV sphere, mechanical lessons, timing
- [KALO ESP32 Voice Chat](https://github.com/kaloprojects/KALO-ESP32-Voice-Chat-AI-Friends) -- reference for ESP32 voice assistant with INMP441 + MAX98357A
- [AssemblyAI: Lowest Latency Voice Agent (465ms)](https://www.assemblyai.com/blog/how-to-build-lowest-latency-voice-agent-vapi) -- voice pipeline latency benchmarks
- [ElevenLabs WebSocket Streaming](https://elevenlabs.io/docs/developers/websockets) -- real-time TTS documentation
- [Serwist PWA for Next.js](https://serwist.pages.dev/docs/next/getting-started) -- official PWA docs
- [DTU Science Park: $26M Lost in Crowdfunded Hardware](https://dtusciencepark.com/article/26-million-lost-why-crowdfunded-hardware-projects-fail/) -- Kickstarter failure analysis

### Secondary (MEDIUM confidence)
- [Flicker Spherical Volumetric Display](https://danfoisy.github.io/flicker/) -- advanced POV reference (FPGA-driven, higher complexity than target)
- [APA102 vs WS2812B for POV](https://www.suntechleds.com/ws2812b-vs-apa102.html) -- refresh rate comparison
- [Labyrinthos Academy](https://labyrinthos.co/) -- leading oracle app feature reference
- [BackerKit Shipping Strategies](https://www.backerkit.com/blog/guides/the-practical-guide-to-planning-a-crowdfunding-campaign/kickstarter-shipping-strategies/) -- fulfillment best practices
- [pioarduino](https://randomnerdtutorials.com/vs-code-pioarduino-ide-esp32/) -- PlatformIO fork status for ESP32 Core 3.x

### Tertiary (LOW confidence)
- ESP32-S3 Opus codec performance estimates (single source: esp-opus component page, untested on target hardware)
- USB-C PD trigger board for 3S Li-ion charging (limited documentation, needs prototyping validation)
- POV display visibility in ambient lighting (no quantitative data found, all demos shown in dark environments)

---
*Research completed: 2026-03-28*
*Ready for roadmap: yes*
