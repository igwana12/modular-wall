# Roadmap: The Orb (Oracle Cards + Spirit Sphere)

## Overview

Two products, one backend, seven phases. Oracle Cards (Phases 1-3) ship first by leveraging the 80%-built Sacred Circuits pipeline -- audit the gaps, build the reading experience, print and launch. Revenue and audience from cards de-risk the Spirit Sphere (Phases 4-7), which progresses from ESP32 learning through POV display prototyping, hardware integration, and Kickstarter campaign. Phases 4 and 5 run in parallel since audio I/O and POV display are independent workstreams.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Pipeline Audit + Oracle Backend** - Verify SC pipeline gaps and stand up orb-backend :8300 with deity config, Content DB, and reading pipeline
- [ ] **Phase 2: Oracle Reading Experience** - Build the end-to-end AI oracle reading flow with deity voice, PANTHEON visuals, and payment tiers
- [ ] **Phase 3: Physical Cards + Market Launch** - Design and print 21-card deck, build landing page, capture email list, validate revenue
- [ ] **Phase 4: ESP32 Hardware Fundamentals** - Learn ESP32-S3 basics and achieve full voice round-trip on real hardware
- [ ] **Phase 5: POV Display Prototype** - Build working POV display from flat 2D through single-arm spherical with position sync
- [ ] **Phase 6: Spirit Sphere Integration** - Combine voice AI + POV display on one ESP32-S3 with enclosure, battery, and demo capability
- [ ] **Phase 7: Kickstarter Campaign** - Produce campaign video, validate PCB manufacturing path, launch campaign

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
**Plans:** 5 plans
**UI hint**: yes

Plans:
- [x] 02-01-PLAN.md -- Next.js 15 scaffold with design system, SSE types, BFF proxy, and streaming hooks (READ-01)
- [ ] 02-02-PLAN.md -- Card reveal animation, intent input, SSE reading stream with deity voice + PANTHEON art (READ-01, READ-02, READ-03, READ-04, READ-05)
- [x] 02-03-PLAN.md -- Homepage with daily card pull, deity gallery, reading tracker, and McKee storytelling in deity prompts (READ-06, READ-07, READ-08)
- [ ] 02-04-PLAN.md -- Payments and auth: paywall gate, Stripe Checkout subscription, Auth.js magic link, webhook handler (READ-08, READ-09)
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
**Plans**: TBD
**UI hint**: yes

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

### Phase 4: ESP32 Hardware Fundamentals
**Goal**: Builder can speak to an ESP32-S3 and hear an AI response back -- voice round-trip proven on real hardware
**Depends on**: Phase 1 (orb-backend WebSocket endpoint)
**Requirements**: HW-01, HW-02, HW-03, HW-04, HW-05
**Success Criteria** (what must be TRUE):
  1. ESP32-S3 dev board connects to WiFi and maintains a WebSocket connection to orb-backend
  2. Builder speaks into INMP441 mic and hears AI response through MAX98357A speaker
  3. Full voice round-trip latency is measured and documented (target under 5 seconds)
  4. Audio capture and playback use I2S (digital path, no analog ADC)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: POV Display Prototype
**Goal**: A spinning LED arm renders a visible image in normal room lighting -- the core visual magic of the Spirit Sphere proven
**Depends on**: Nothing (runs parallel to Phase 4)
**Requirements**: POV-01, POV-02, POV-03, POV-04, POV-05
**Success Criteria** (what must be TRUE):
  1. Flat 2D POV propeller works with APA102/SK9822 LEDs (learning gate passed)
  2. Hall effect sensor accurately synchronizes LED patterns to rotational position
  3. Single-arm spherical POV renders an image using FastLED DMA at 3-5 RPM
  4. Image is visible in ambient room lighting (not just darkness)
  5. Motor noise measures under 45dB at 30cm distance
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

### Phase 6: Spirit Sphere Integration
**Goal**: Voice AI and POV display run simultaneously in a portable, battery-powered enclosure that demos reliably
**Depends on**: Phase 4, Phase 5
**Requirements**: SPHERE-01, SPHERE-02, SPHERE-03, SPHERE-04, SPHERE-05, SPHERE-06, SPHERE-07, SPHERE-08, SPHERE-09
**Success Criteria** (what must be TRUE):
  1. Voice conversation and POV animation run simultaneously on one ESP32-S3 without conflicts
  2. 3D-printed enclosure houses all components with clean cable routing
  3. Battery-powered operation (3x 18650) with USB-C charging pass-through
  4. At least one deity avatar animation displays on the POV sphere during a reading
  5. Prototype demos reliably for 10 continuous minutes without crash or audio dropout
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD

### Phase 7: Kickstarter Campaign
**Goal**: Campaign launches with a compelling video, validated manufacturing path, and active community ready to back
**Depends on**: Phase 6
**Requirements**: KS-01, KS-02, KS-03, KS-04, KS-05, KS-06, KS-07, KS-08
**Success Criteria** (what must be TRUE):
  1. Campaign video (30s demo + 2-3min full) shows a real working prototype, not renders
  2. PCB design validated with small-batch JLCPCB order (manufacturing path proven)
  3. Shipping costs verified with real dimensional quotes via BackerKit
  4. Discord community has active members before campaign goes live
  5. Open-source firmware skeleton published on GitHub before campaign launch
**Plans**: TBD

Plans:
- [ ] 07-01: TBD
- [ ] 07-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order. Phases 4 and 5 can run in parallel (independent workstreams).

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Pipeline Audit + Oracle Backend | 2/2 | Complete | 2026-03-28 |
| 2. Oracle Reading Experience | 0/5 | Not started | - |
| 3. Physical Cards + Market Launch | 0/2 | Not started | - |
| 4. ESP32 Hardware Fundamentals | 0/1 | Not started | - |
| 5. POV Display Prototype | 0/1 | Not started | - |
| 6. Spirit Sphere Integration | 0/2 | Not started | - |
| 7. Kickstarter Campaign | 0/2 | Not started | - |
