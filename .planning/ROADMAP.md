# The Orb — Roadmap (Oracle Cards + Spirit Sphere)

## Overview

Three products, one backend, nine phases. Oracle Cards (Phases 1-3) ship first — digital experience + physical deck. Revenue and audience from cards de-risk hardware. The hardware splits into two independent product tracks: **Track A: Oracle Engine** (Phases 4-5) — a form-factor-agnostic voice AI device (ESP32 + mic + speaker + local LLM + RAG) that ships inside any enclosure (stuffed animal, lamp, crystal, toy). **Track B: POV Globe** (Phase 6) — the LED hologram sphere display. **Spirit Sphere** (Phase 7) = Oracle Engine + POV Globe combined in one premium product. Phase 8 is the Kickstarter campaign for both products. Tracks A and B run in parallel.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Pipeline Audit + Oracle Backend** - Verify SC pipeline gaps and stand up orb-backend :8300 with deity config, Content DB, and reading pipeline ✓ 2026-03-29
- [x] **Phase 2: Oracle Reading Experience** ✓ 2026-03-29 - Build the end-to-end AI oracle reading flow with deity voice, PANTHEON visuals, and payment tiers
- [x] **Phase 3: Physical Cards + Market Launch** ✓ 2026-03-29 - Design and print 21-card deck, build landing page, capture email list, validate revenue
- [ ] **Phase 4: Oracle Engine — Hardware Fundamentals** [Track A] - ESP32-S3-BOX-3 voice round-trip, WebSocket to orb-backend, prove the voice AI works on hardware
- [ ] **Phase 5: Oracle Engine — Product Shell** [Track A] - Local LLM option, swappable personality protocols, form-factor-agnostic enclosure (stuffed animal, lamp, crystal)
- [ ] **Phase 6: POV Globe Prototype** [Track B] - LED POV display from flat 2D through spherical, position sync, ambient light visibility
- [x] **Phase 7: Spirit Sphere Integration** ✓ 2026-03-31 - Combine Oracle Engine + POV Globe in one premium enclosure with battery and demo capability
- [x] **Phase 8: Kickstarter Campaign** ✓ 2026-03-31 - Campaign for Oracle Engine ($79) + Spirit Sphere ($179), video, community, manufacturing validation

## Phase Details

### Phase 1: Pipeline Audit + Oracle Backend
**Goal**: The shared backend exists and the full AI reading pipeline works end-to-end from a single API call
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05
**Success Criteria** (what must be TRUE):
  1. SC pipeline audit document exists listing every gap with severity rating
  2. orb-backend FastAPI service responds at :8300 with deity configuration for all 21 gods
  3. A single API call triggers the full chain: Smithers -> LLM Router -> Pinecone RAG -> ElevenLabs TTS and returns a streaming response
  4. Content DB returns god-specific images when queried by deity name
  5. SSE endpoint streams reading content in real-time (no buffered bulk response)
**Plans:** 2 plans

Plans:
- [x] 01-01-PLAN.md -- SC pipeline audit + orb-backend scaffold with deity config and Content DB (INFRA-01, INFRA-02, INFRA-04)
- [x] 01-02-PLAN.md -- Reading pipeline wiring: RAG + LLM streaming + TTS + SSE endpoint (INFRA-03, INFRA-05)

### Phase 2: Oracle Reading Experience
**Goal**: Users receive personalized, voice-narrated oracle readings that feel magical -- not generic chatbot output
**Depends on**: Phase 1
**Requirements**: READ-01, READ-02, READ-03, READ-04, READ-05, READ-06, READ-07, READ-08, READ-09, READ-10
**Success Criteria** (what must be TRUE):
  1. User scans a QR code on mobile and reaches a reading screen in under 3 seconds
  2. User hears a deity-voiced narration of their personalized reading with PANTHEON artwork displayed
  3. User can pull a daily card and receive a unique reading each time (not canned responses)
  4. Free tier user hits a monthly limit; paid user ($9.99/mo via Stripe) gets unlimited readings
  5. Digital guidebook page exists for each god with mythology, keywords, and meanings
**Plans:** 4/5 plans executed
**UI hint**: yes

Plans:
- [x] 02-01-PLAN.md -- Next.js 15 scaffold with design system, SSE types, BFF proxy, and streaming hooks (READ-01)
- [x] 02-02-PLAN.md -- Card reveal animation, intent input, SSE reading stream with deity voice + PANTHEON art (READ-01, READ-02, READ-03, READ-04, READ-05)
- [x] 02-03-PLAN.md -- Homepage with daily card pull, deity gallery, reading tracker, and McKee storytelling in deity prompts (READ-06, READ-07, READ-08)
- [x] 02-04-PLAN.md -- Payments and auth: paywall gate, Stripe Checkout subscription, Auth.js magic link, webhook handler (READ-08, READ-09)
- [x] 02-05-PLAN.md -- Digital guidebook pages for all 21 gods and PWA with Serwist (READ-10)

### Phase 3: Physical Cards + Market Launch
**Goal**: Oracle Cards are a purchasable product generating revenue and building an audience for the Spirit Sphere
**Depends on**: Phase 2
**Requirements**: CARD-01, CARD-02, CARD-03, CARD-04, LAUNCH-01, LAUNCH-02, LAUNCH-03, LAUNCH-04
**Success Criteria** (what must be TRUE):
  1. 21-card deck with consistent PANTHEON art and branding is orderable via print-on-demand
  2. Every card's QR code resolves to its god's permanent reading URL (no link rot)
  3. Landing page at oracleball.ai captures email signups with $1 reservation deposits
  4. First 100 paid readings completed (revenue validation)
**Plans:** 4 plans
**UI hint**: yes

Plans:
- [x] 03-01-PLAN.md -- QR code generation for 21 deities + $1 deposit API route + webhook extension (CARD-02, LAUNCH-03)
- [x] 03-02-PLAN.md -- Landing page with deposit CTA, route restructuring, confirmation page, Vercel Analytics (LAUNCH-01, LAUNCH-04)
- [x] 03-03-PLAN.md -- Domain purchase (oracleball.ai) + Kit email marketing integration (LAUNCH-01, LAUNCH-02)
- [x] 03-04-PLAN.md -- Figma card design for all 21 cards + proof deck order from MakePlayingCards (CARD-01, CARD-03, CARD-04)

### Phase 4: Oracle Engine — Hardware Fundamentals [Track A]
**Goal**: Voice AI round-trip proven on real hardware — speak to an ESP32-S3 and hear a deity respond
**Depends on**: Phase 1 (orb-backend WebSocket endpoint)
**Requirements**: HW-01, HW-02, HW-03, HW-04, HW-05
**Success Criteria** (what must be TRUE):
  1. ESP32-S3-BOX-3 connects to WiFi and maintains a WebSocket connection to orb-backend
  2. Speak into built-in mic and hear AI deity response through built-in speaker
  3. Full voice round-trip latency measured and documented (target under 5 seconds)
  4. Same firmware runs on ESP32-S3-BOX-3 and bare ESP32-S3-DevKitC-1 + INMP441 + MAX98357A (pin config swap only)
**Plans:** 3 plans

Plans:
- [x] 04-01-PLAN.md -- Backend WebSocket /ws/sphere: STT->LLM->TTS pipeline + Python test client (HW-03, HW-04)
- [x] 04-02-PLAN.md -- Firmware scaffold: WiFi + I2S audio capture/playback + loopback test (HW-01, HW-02)
- [x] 04-03-PLAN.md -- End-to-end voice round-trip: WebSocket client + push-to-talk + latency measurement (HW-03, HW-04, HW-05)

### Phase 5: Oracle Engine — Product Shell [Track A]
**Goal**: The Oracle Engine is a standalone product — a voice AI device with local LLM fallback, swappable personality protocols, and a form factor ready for market testing
**Depends on**: Phase 4
**Requirements**: ENGINE-01, ENGINE-02, ENGINE-03, ENGINE-04, ENGINE-05, ENGINE-06
**Success Criteria** (what must be TRUE):
  1. Device runs with local LLM (quantized model on home server via Ollama) when cloud is unavailable
  2. Personality protocols are swappable config files — switch deity voice/knowledge without reflashing
  3. RAG knowledge system queries mythology corpus from onboard or networked storage
  4. Device fits inside at least 2 different form factors (e.g., desk crystal + stuffed animal) with same electronics
  5. OTA firmware updates work over WiFi
  6. Setup takes under 10 minutes via BLE/captive portal WiFi provisioning
**Plans:** 3 plans

Plans:
- [x] 05-01-PLAN.md -- Ollama LLM fallback, swappable protocol API, RAG query endpoint (ENGINE-01, ENGINE-02, ENGINE-03)
- [x] 05-02-PLAN.md -- OTA firmware update server + ESP32 OTA client module (ENGINE-05)
- [x] 05-03-PLAN.md -- WiFi provisioning captive portal, multi-board config, form factor checkpoint (ENGINE-06, ENGINE-04)

### Phase 6: POV Globe Prototype [Track B]
**Goal**: A spinning LED arm renders a visible image in normal room lighting — the core visual magic proven independently
**Depends on**: Nothing (runs parallel to Track A)
**Requirements**: POV-01, POV-02, POV-03, POV-04, POV-05
**Success Criteria** (what must be TRUE):
  1. Flat 2D POV propeller works with APA102/SK9822 LEDs (learning gate passed)
  2. Hall effect sensor accurately synchronizes LED patterns to rotational position
  3. Single-arm spherical POV renders an image using FastLED DMA at 3-5 RPM
  4. Image is visible in ambient room lighting (not just darkness)
  5. Motor noise measures under 45dB at 30cm distance
**Plans:** 3 plans

Plans:
- [x] 06-01-PLAN.md -- Firmware scaffold: FastLED DMA, Hall ISR, motor PWM, frame buffer + image-to-POV converter (POV-01, POV-02, POV-03)
- [x] 06-02-PLAN.md -- Flat 2D POV propeller assembly, Hall sensor sync, hardware checkpoint (POV-01, POV-02)
- [x] 06-03-PLAN.md -- Spherical POV upgrade, ambient visibility tuning, motor noise measurement (POV-03, POV-04, POV-05)

### Phase 7: Spirit Sphere Integration
**Goal**: Oracle Engine + POV Globe combined in one premium enclosure that demos reliably — the flagship product
**Depends on**: Phase 5 (Oracle Engine), Phase 6 (POV Globe)
**Requirements**: SPHERE-01, SPHERE-02, SPHERE-03, SPHERE-04, SPHERE-05, SPHERE-06, SPHERE-07, SPHERE-08, SPHERE-09
**Success Criteria** (what must be TRUE):
  1. Voice conversation and POV animation run simultaneously on one ESP32-S3 without conflicts
  2. 3D-printed enclosure houses all components with clean cable routing
  3. Battery-powered operation (3x 18650) with USB-C charging pass-through
  4. At least one deity avatar animation displays on the POV sphere during a reading
  5. Prototype demos reliably for 10 continuous minutes without crash or audio dropout
**Plans:** 1/4 plans executed

Plans:
- [x] 07-01-PLAN.md -- Unified firmware scaffold: FreeRTOS dual-core, state machine, mute button, carried-forward modules (SPHERE-01, SPHERE-02, SPHERE-06, SPHERE-08, SPHERE-09)
- [x] 07-02-PLAN.md -- Zeus deity POV animation + hardware BOM + wiring diagram (SPHERE-05)
- [ ] 07-03-PLAN.md -- Integration test plan, bench test log, watchdog timer + stability monitoring (SPHERE-07)
- [x] 07-04-PLAN.md -- 3D-printed enclosure design + 3S battery system documentation (SPHERE-03, SPHERE-04)

### Phase 07.1: JARVIS V2 Visual Unification (INSERTED)

**Goal:** Complete the JARVIS V2 frontend visual layer and wire it seamlessly to the Oracle Engine backend — SVG deity animations, nebula particle system, voice-to-blob mapping, GPU shaders, filmic tone, oracle reading visual flow, ditherpunk shader, and S9 logos aesthetic.
**Requirements**: VIZ-01, VIZ-02, VIZ-03, VIZ-04, VIZ-05, VIZ-06, VIZ-07, VIZ-08, VIZ-09
**Depends on:** Phase 7 (Oracle Engine backend complete)
**Success Criteria** (what must be TRUE):
  1. Speaking triggers deity SVG animation floating above chat messages with smooth lerp transitions
  2. Nebula particle cloud visible around blob, shifts color/intensity during oracle readings
  3. TTS audio frequency bands (bass/mid/high) drive distinct blob deformation parameters beyond simple scale
  4. GPU particle shaders and filmic tone active without rendering crashes
  5. Oracle reading produces full visual sequence: hexagram → archetypes → deity gradient → agent cards
  6. Media presenter images processed through real-time ditherpunk shader
  7. All frontend visual states map to backend pipeline states via WebSocket events
**Plans:** 4 plans

Plans:
- [ ] 07.1-01-PLAN.md -- GPU shaders + filmic tone re-enable + multi-band voice-to-blob deformation (VIZ-03, VIZ-04, VIZ-05)
- [ ] 07.1-02-PLAN.md -- SVG deity animator + nebula particle cloud (VIZ-01, VIZ-02)
- [ ] 07.1-03-PLAN.md -- Oracle reading visual sequence director + backend health fix (VIZ-06, VIZ-09)
- [ ] 07.1-04-PLAN.md -- Ditherpunk WebGL halftone shader + S9 Logos terminal accent (VIZ-07, VIZ-08)

### Phase 8: Kickstarter Campaign
**Goal**: Campaign launches with two tiers — Oracle Engine (accessible) and Spirit Sphere (premium) — compelling video, validated manufacturing, active community
**Depends on**: Phase 5 (Oracle Engine ready), Phase 7 (Spirit Sphere ready)
**Requirements**: KS-01, KS-02, KS-03, KS-04, KS-05, KS-06, KS-07, KS-08
**Success Criteria** (what must be TRUE):
  1. Campaign video (30s demo + 2-3min full) shows BOTH real working prototypes, not renders
  2. Two tiers: Oracle Engine ~$79 early bird, Spirit Sphere ~$179 early bird
  3. PCB design validated with small-batch JLCPCB order (manufacturing path proven)
  4. Shipping costs verified with real dimensional quotes via BackerKit
  5. Discord community has active members before campaign goes live
  6. Open-source firmware skeleton published on GitHub before campaign launch
**Plans:** 4 plans

Plans:
- [x] 08-01-PLAN.md -- Campaign page copy, reward tiers, FAQ, risks, and stretch goals (KS-02, KS-03)
- [x] 08-02-PLAN.md -- Manufacturing BOMs, JLCPCB validation, shipping analysis, production timeline (KS-04, KS-05)
- [x] 08-03-PLAN.md -- Discord setup, email sequences, build-in-public calendar, open-source repo prep (KS-06, KS-07)
- [x] 08-04-PLAN.md -- Video scripts, storyboards, shot lists, gear plan, influencer outreach (KS-01, KS-08)

## Progress

**Execution Order:**
Phases 1-3 sequential (Oracle Cards). Then two parallel tracks: Track A (Phases 4-5: Oracle Engine) and Track B (Phase 6: POV Globe). Phase 7 merges both tracks. Phase 8 is Kickstarter. Phase 9 is infrastructure (can run anytime).

| Phase | Track | Plans Complete | Status | Completed |
|-------|-------|----------------|--------|-----------|
| 1. Pipeline Audit + Oracle Backend | — | 2/2 | Complete | 2026-03-28 |
| 2. Oracle Reading Experience | — | 5/5 | Complete | 2026-03-28 |
| 3. Physical Cards + Market Launch | — | 4/4 | Complete | 2026-03-29 |
| 4. Oracle Engine — Hardware | A | 3/3 | Complete | 2026-03-30 |
| 5. Oracle Engine — Product Shell | A | 3/3 | Complete | 2026-03-30 |
| 6. POV Globe Prototype | B | 3/3 | Complete | 2026-03-30 |
| 7. Spirit Sphere Integration | A+B | 4/4 | Complete | 2026-03-31 |
| 8. Kickstarter Campaign | — | 4/4 | Complete (3 hardware gaps) | 2026-03-31 |
| 9. System Consolidation & Security | — | 5/5 | Complete | 2026-03-29 |

### Phase 9: System Consolidation & Security Hardening
**Goal**: All credentials centralized and encrypted, skills deduplicated into single source of truth, bloat removed, critical services version-controlled, system verified working
**Depends on**: Nothing (infrastructure phase, can run anytime)
**Requirements**: SEC-01 (credential consolidation), SEC-02 (skill deduplication), SEC-03 (bloat removal), SEC-04 (git init critical services), SEC-05 (worktree cleanup), SEC-06 (post-consolidation verification)
**Success Criteria** (what must be TRUE):
  1. All API keys consolidated into encrypted vault; no plain-text .env files on external drives
  2. Skills exist in one canonical location with symlinks; no duplicate skill sources
  3. Irrelevant skills (bioinformatics, quantum, pharma) removed; dormant projects archived
  4. Smithers, LLM Router, and Sacred Circuits pipeline have git repos with initial commits
  5. Stale agent worktrees cleaned from services/smithers/
  6. All services still running, all cron jobs intact, all MCP servers responding after changes
**Plans:** 5 plans

Plans:
- [x] 08-01-PLAN.md -- Credential audit, sync-keys.sh hardening, canonical load-keys.sh (SEC-01)
- [x] 08-02-PLAN.md -- Skill deduplication, irrelevant skill archival, tradermonty evaluation (SEC-02, SEC-03)
- [x] 08-03-PLAN.md -- Git init Extreme Pro services, stale worktree cleanup (SEC-04, SEC-05)
- [x] 08-04-PLAN.md -- Custom skill creation and Smithers manifest routing integration (SEC-02)
- [x] 08-05-PLAN.md -- Post-consolidation verification of all services, skills, and credentials (SEC-06)
