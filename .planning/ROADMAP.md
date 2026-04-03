# The Orb — Roadmap (Oracle Cards + Spirit Sphere)

## Milestones

- [x] **v1.0 The Orb** - Phases 1-8 (shipped 2026-03-31)
- [ ] **v1.1 Claude Code Infrastructure Upgrades** - Phases 9-12 (in progress)

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

<details>
<summary>v1.0 The Orb (Phases 1-8) - SHIPPED 2026-03-31</summary>

- [x] **Phase 1: Pipeline Audit + Oracle Backend** - Verify SC pipeline gaps and stand up orb-backend :8300 with deity config, Content DB, and reading pipeline
- [x] **Phase 2: Oracle Reading Experience** - Build the end-to-end AI oracle reading flow with deity voice, PANTHEON visuals, and payment tiers
- [x] **Phase 3: Physical Cards + Market Launch** - Design and print 21-card deck, build landing page, capture email list, validate revenue
- [x] **Phase 4: Oracle Engine — Hardware Fundamentals** [Track A] - ESP32-S3-BOX-3 voice round-trip, WebSocket to orb-backend, prove the voice AI works on hardware
- [x] **Phase 5: Oracle Engine — Product Shell** [Track A] - Local LLM option, swappable personality protocols, form-factor-agnostic enclosure
- [x] **Phase 6: POV Globe Prototype** [Track B] - LED POV display from flat 2D through spherical, position sync, ambient light visibility
- [x] **Phase 7: Spirit Sphere Integration** - Combine Oracle Engine + POV Globe in one premium enclosure with battery and demo capability
- [x] **Phase 07.1: JARVIS V2 Visual Unification** (INSERTED) - SVG deity animations, nebula particles, voice-to-blob, GPU shaders, oracle visual flow
- [x] **Phase 07.2: JARVIS V2 Data Integration Layer** (INSERTED) - Widgets, RSS, Grok/X, Paperclip, pluggable data adapters
- [x] **Phase 07.3: Media Orchestration Engine** (INSERTED) - Pre-planned storyboards, parallel media fetch, synchronized playback
- [x] **Phase 07.4: Media Choreography & Delight Layer** (INSERTED) - CSS transitions, spatial layout, auto-animate, Plotly 3D, frame-in-frame
- [x] **Phase 8: Kickstarter Campaign** - Campaign for Oracle Engine ($79) + Spirit Sphere ($179), video, community, manufacturing validation
- [x] **Phase 9: System Consolidation & Security Hardening** - Credentials, skill dedup, bloat removal, git init services, verification

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
**Plans:** 2/2 plans complete

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
**Plans:** 5/5 plans complete
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
**Plans:** 4/4 plans complete
**UI hint**: yes

Plans:
- [x] 03-01-PLAN.md -- QR code generation for 21 deities + $1 deposit API route + webhook extension (CARD-02, LAUNCH-03)
- [x] 03-02-PLAN.md -- Landing page with deposit CTA, route restructuring, confirmation page, Vercel Analytics (LAUNCH-01, LAUNCH-04)
- [x] 03-03-PLAN.md -- Domain purchase (oracleball.ai) + Kit email marketing integration (LAUNCH-01, LAUNCH-02)
- [x] 03-04-PLAN.md -- Figma card design for all 21 cards + proof deck order from MakePlayingCards (CARD-01, CARD-03, CARD-04)

### Phase 4: Oracle Engine — Hardware Fundamentals [Track A]
**Goal**: Voice AI round-trip proven on real hardware -- speak to an ESP32-S3 and hear a deity respond
**Depends on**: Phase 1 (orb-backend WebSocket endpoint)
**Requirements**: HW-01, HW-02, HW-03, HW-04, HW-05
**Success Criteria** (what must be TRUE):
  1. ESP32-S3-BOX-3 connects to WiFi and maintains a WebSocket connection to orb-backend
  2. Speak into built-in mic and hear AI deity response through built-in speaker
  3. Full voice round-trip latency measured and documented (target under 5 seconds)
  4. Same firmware runs on ESP32-S3-BOX-3 and bare ESP32-S3-DevKitC-1 + INMP441 + MAX98357A (pin config swap only)
**Plans:** 3/3 plans complete

Plans:
- [x] 04-01-PLAN.md -- Backend WebSocket /ws/sphere: STT->LLM->TTS pipeline + Python test client (HW-03, HW-04)
- [x] 04-02-PLAN.md -- Firmware scaffold: WiFi + I2S audio capture/playback + loopback test (HW-01, HW-02)
- [x] 04-03-PLAN.md -- End-to-end voice round-trip: WebSocket client + push-to-talk + latency measurement (HW-03, HW-04, HW-05)

### Phase 5: Oracle Engine — Product Shell [Track A]
**Goal**: The Oracle Engine is a standalone product -- a voice AI device with local LLM fallback, swappable personality protocols, and a form factor ready for market testing
**Depends on**: Phase 4
**Requirements**: ENGINE-01, ENGINE-02, ENGINE-03, ENGINE-04, ENGINE-05, ENGINE-06
**Success Criteria** (what must be TRUE):
  1. Device runs with local LLM (quantized model on home server via Ollama) when cloud is unavailable
  2. Personality protocols are swappable config files -- switch deity voice/knowledge without reflashing
  3. RAG knowledge system queries mythology corpus from onboard or networked storage
  4. Device fits inside at least 2 different form factors (e.g., desk crystal + stuffed animal) with same electronics
  5. OTA firmware updates work over WiFi
  6. Setup takes under 10 minutes via BLE/captive portal WiFi provisioning
**Plans:** 3/3 plans complete

Plans:
- [x] 05-01-PLAN.md -- Ollama LLM fallback, swappable protocol API, RAG query endpoint (ENGINE-01, ENGINE-02, ENGINE-03)
- [x] 05-02-PLAN.md -- OTA firmware update server + ESP32 OTA client module (ENGINE-05)
- [x] 05-03-PLAN.md -- WiFi provisioning captive portal, multi-board config, form factor checkpoint (ENGINE-06, ENGINE-04)

### Phase 6: POV Globe Prototype [Track B]
**Goal**: A spinning LED arm renders a visible image in normal room lighting -- the core visual magic proven independently
**Depends on**: Nothing (runs parallel to Track A)
**Requirements**: POV-01, POV-02, POV-03, POV-04, POV-05
**Success Criteria** (what must be TRUE):
  1. Flat 2D POV propeller works with APA102/SK9822 LEDs (learning gate passed)
  2. Hall effect sensor accurately synchronizes LED patterns to rotational position
  3. Single-arm spherical POV renders an image using FastLED DMA at 3-5 RPM
  4. Image is visible in ambient room lighting (not just darkness)
  5. Motor noise measures under 45dB at 30cm distance
**Plans:** 3/3 plans complete

Plans:
- [x] 06-01-PLAN.md -- Firmware scaffold: FastLED DMA, Hall ISR, motor PWM, frame buffer + image-to-POV converter (POV-01, POV-02, POV-03)
- [x] 06-02-PLAN.md -- Flat 2D POV propeller assembly, Hall sensor sync, hardware checkpoint (POV-01, POV-02)
- [x] 06-03-PLAN.md -- Spherical POV upgrade, ambient visibility tuning, motor noise measurement (POV-03, POV-04, POV-05)

### Phase 7: Spirit Sphere Integration
**Goal**: Oracle Engine + POV Globe combined in one premium enclosure that demos reliably -- the flagship product
**Depends on**: Phase 5 (Oracle Engine), Phase 6 (POV Globe)
**Requirements**: SPHERE-01, SPHERE-02, SPHERE-03, SPHERE-04, SPHERE-05, SPHERE-06, SPHERE-07, SPHERE-08, SPHERE-09
**Success Criteria** (what must be TRUE):
  1. Voice conversation and POV animation run simultaneously on one ESP32-S3 without conflicts
  2. 3D-printed enclosure houses all components with clean cable routing
  3. Battery-powered operation (3x 18650) with USB-C charging pass-through
  4. At least one deity avatar animation displays on the POV sphere during a reading
  5. Prototype demos reliably for 10 continuous minutes without crash or audio dropout
**Plans:** 4/4 plans complete

Plans:
- [x] 07-01-PLAN.md -- Unified firmware scaffold: FreeRTOS dual-core, state machine, mute button, carried-forward modules (SPHERE-01, SPHERE-02, SPHERE-06, SPHERE-08, SPHERE-09)
- [x] 07-02-PLAN.md -- Zeus deity POV animation + hardware BOM + wiring diagram (SPHERE-05)
- [x] 07-03-PLAN.md -- Integration test plan, bench test log, watchdog timer + stability monitoring (SPHERE-07)
- [x] 07-04-PLAN.md -- 3D-printed enclosure design + 3S battery system documentation (SPHERE-03, SPHERE-04)

### Phase 07.1: JARVIS V2 Visual Unification (INSERTED)
**Goal:** Complete the JARVIS V2 frontend visual layer and wire it seamlessly to the Oracle Engine backend
**Requirements**: VIZ-01, VIZ-02, VIZ-03, VIZ-04, VIZ-05, VIZ-06, VIZ-07, VIZ-08, VIZ-09
**Depends on:** Phase 7
**Plans:** 4/4 plans complete

Plans:
- [x] 07.1-01-PLAN.md -- GPU shaders + filmic tone re-enable + multi-band voice-to-blob deformation (VIZ-03, VIZ-04, VIZ-05)
- [x] 07.1-02-PLAN.md -- SVG deity animator + nebula particle cloud (VIZ-01, VIZ-02)
- [x] 07.1-03-PLAN.md -- Oracle reading visual sequence director + backend health fix (VIZ-06, VIZ-09)
- [x] 07.1-04-PLAN.md -- Ditherpunk WebGL halftone shader + S9 Logos terminal accent (VIZ-07, VIZ-08)

### Phase 07.2: JARVIS V2 Data Integration Layer (INSERTED)
**Goal:** Expand JARVIS data sources and contextual presentation
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06
**Depends on:** Phase 07.1
**Plans:** 3/3 plans complete

Plans:
- [x] 07.2-01-PLAN.md -- Pluggable adapter registry + RSS parser + enhanced Grok/X Twitter integration (DATA-02, DATA-03, DATA-06)
- [x] 07.2-02-PLAN.md -- Paperclip diagnosis/fix + task parser + briefing integration (DATA-05)
- [x] 07.2-03-PLAN.md -- Widget panel + data card renderer + Perplexity structured cards (DATA-01, DATA-04)

### Phase 07.3: Media Orchestration Engine (INSERTED)
**Goal:** Replace reactive media detection with pre-planned storyboard architecture
**Requirements**: ORCH-01, ORCH-02, ORCH-03, ORCH-04, ORCH-05
**Depends on:** Phase 07.1, Phase 07.2
**Plans:** 3/3 plans complete

Plans:
- [x] 07.3-01-PLAN.md -- Script pre-planner + parallel media fetcher + TTS duration measurement (ORCH-01, ORCH-02, ORCH-04)
- [x] 07.3-02-PLAN.md -- Frontend storyboard scheduler + offset_s sync + tts_duration wiring (ORCH-03, ORCH-04)
- [x] 07.3-03-PLAN.md -- Story stage manager integration + beat-based banner advance + show_presentation activation (ORCH-05)

### Phase 07.4: Media Choreography & Delight Layer (INSERTED)
**Goal:** Transform the working multimedia engine into a cinematic, delightful experience
**Requirements**: CHOREO-01, CHOREO-02, CHOREO-03, CHOREO-04, CHOREO-05, CHOREO-06, CHOREO-07, CHOREO-08
**Depends on:** Phase 07.3
**Plans:** 3/3 plans complete

Plans:
- [x] 07.4-01-PLAN.md -- Schema enrichment + CSS transition library (CHOREO-01, CHOREO-02, CHOREO-03)
- [x] 07.4-02-PLAN.md -- Spatial layout + auto-animate morphing (CHOREO-04, CHOREO-05)
- [x] 07.4-03-PLAN.md -- Plotly 3D + frame-in-frame + delight polish (CHOREO-06, CHOREO-07, CHOREO-08)

### Phase 8: Kickstarter Campaign
**Goal**: Campaign launches with two tiers -- Oracle Engine (accessible) and Spirit Sphere (premium)
**Depends on**: Phase 5, Phase 7
**Requirements**: KS-01, KS-02, KS-03, KS-04, KS-05, KS-06, KS-07, KS-08
**Plans:** 4/4 plans complete

Plans:
- [x] 08-01-PLAN.md -- Campaign page copy, reward tiers, FAQ, risks, and stretch goals (KS-02, KS-03)
- [x] 08-02-PLAN.md -- Manufacturing BOMs, JLCPCB validation, shipping analysis, production timeline (KS-04, KS-05)
- [x] 08-03-PLAN.md -- Discord setup, email sequences, build-in-public calendar, open-source repo prep (KS-06, KS-07)
- [x] 08-04-PLAN.md -- Video scripts, storyboards, shot lists, gear plan, influencer outreach (KS-01, KS-08)

### Phase 9: System Consolidation & Security Hardening
**Goal**: All credentials centralized and encrypted, skills deduplicated, bloat removed, critical services version-controlled
**Depends on**: Nothing (infrastructure phase)
**Requirements**: SEC-01, SEC-02, SEC-03, SEC-04, SEC-05, SEC-06
**Plans:** 5/5 plans complete

Plans:
- [x] 08-01-PLAN.md -- Credential audit, sync-keys.sh hardening, canonical load-keys.sh (SEC-01)
- [x] 08-02-PLAN.md -- Skill deduplication, irrelevant skill archival, tradermonty evaluation (SEC-02, SEC-03)
- [x] 08-03-PLAN.md -- Git init Extreme Pro services, stale worktree cleanup (SEC-04, SEC-05)
- [x] 08-04-PLAN.md -- Custom skill creation and Smithers manifest routing integration (SEC-02)
- [x] 08-05-PLAN.md -- Post-consolidation verification of all services, skills, and credentials (SEC-06)

</details>

### v1.1 Claude Code Infrastructure Upgrades (In Progress)

**Milestone Goal:** Upgrade the existing Smithers-controlled system with tactical improvements that enhance session mobility, automation, visual QA, and security.

- [x] **Phase 10: Automation Activation** - Verify scheduled tasks and configure loop polling on existing infrastructure (completed 2026-04-02)
- [x] **Phase 11: Security & Routing Hardening** - Extend prompt guard rules and add context profiles to Smithers routing (completed 2026-04-02)
- [x] **Phase 12: Session Mobility** - Enable teleport and remote control for cross-device Claude Code sessions (completed 2026-04-03)
- [x] **Phase 13: Visual QA Hook** - Create Playwright-based screenshot capture and regression detection hook (completed 2026-04-03)

## Phase Details

### Phase 10: Automation Activation
**Goal**: All background automation runs unattended -- scheduled tasks fire on cadence and polling loops surface issues without manual checking
**Depends on**: Nothing (first phase of v1.1)
**Requirements**: SCHED-01, SCHED-02, SCHED-03, LOOP-01, LOOP-02, LOOP-03
**Success Criteria** (what must be TRUE):
  1. Running `crontab -l` shows all 5 tasks active with their defined cadences (local cron, not cloud /schedule per D-01)
  2. Morning briefing fires at 7am via Smithers with service status, Trello cards, and calendar items
  3. API health check fires every 6 hours and sends a notification to #the-orb when any service is unreachable
  4. Orb-backend health poll detects a stopped service within 5 minutes and reports the failure to #the-orb
  5. Trello poll surfaces new Command Center cards within 15 minutes of creation
**Plans:** 2/2 plans complete

Plans:
- [x] 10-01-PLAN.md -- Scheduled task cadence alignment, health check fix, cron activation (SCHED-01, SCHED-02, SCHED-03)
- [x] 10-02-PLAN.md -- Polling loops for orb-backend, Trello, and log scanner (LOOP-01, LOOP-02, LOOP-03)

### Phase 11: Security & Routing Hardening
**Goal**: Claude Code sessions are constrained to safe operations and automatically receive relevant context for their task type
**Depends on**: Nothing (independent of Phase 10)
**Requirements**: APPR-01, APPR-02, APPR-03, CTXP-01, CTXP-02, CTXP-03
**Success Criteria** (what must be TRUE):
  1. Attempting to post a Slack message to any channel other than #pantheon or #the-orb triggers a prompt guard rejection
  2. Running `git push origin main` triggers an explicit confirmation prompt before proceeding
  3. Attempting to write to a .env or credentials file triggers a prompt guard rejection
  4. A JARVIS task session automatically includes services/jarvis/ directories and excludes firmware/
  5. An Orb firmware task session automatically includes firmware/ and excludes services/jarvis/
**Plans**: TBD

Plans:
- [ ] 11-01: Extend gsd-prompt-guard.js with Slack, main branch, and secret file rules
- [x] 11-02: Add context profiles to Smithers routing_policy.json and verify task-based routing

### Phase 12: Session Mobility
**Goal**: Claude Code sessions move seamlessly between devices -- start on desktop, continue on phone, no context loss
**Depends on**: Nothing (independent)
**Requirements**: MOBIL-01, MOBIL-02, MOBIL-03
**Success Criteria** (what must be TRUE):
  1. User starts a Claude Code session on Mac, runs teleport, and resumes the same conversation on iPhone/iPad
  2. Remote control interface is accessible from a mobile browser and can issue commands to the desktop session
  3. Teleported session includes conversation history and file context from the originating device
**Plans**: TBD

Plans:
- [x] 12-01: Teleport and remote control configuration, testing, and documentation

### Phase 13: Visual QA Hook
**Goal**: Frontend file changes are automatically screenshot-tested -- visual regressions caught before they reach commits
**Depends on**: Nothing (independent, but highest complexity -- scheduled last)
**Requirements**: VISQA-01, VISQA-02, VISQA-03
**Success Criteria** (what must be TRUE):
  1. Saving a .tsx, .css, or .html file in the JARVIS frontend triggers an automatic Playwright screenshot
  2. Screenshot comparison against baseline detects layout shifts, color changes, or missing elements above a configurable threshold
  3. Committing with a visual delta above threshold is blocked with a clear diff image showing what changed
**Plans:** 2/2 plans complete

Plans:
- [x] 13-01-PLAN.md -- PostToolUse hook for JARVIS frontend file detection + Playwright screenshot capture (VISQA-01)
- [x] 13-02-PLAN.md -- Pixelmatch baseline comparison + commit-blocking PreToolUse guard (VISQA-02, VISQA-03)

## Progress

**Execution Order:**
Phases execute in numeric order. Phases 10 and 11 are independent and could run in parallel.

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 10. Automation Activation | v1.1 | 2/2 | Complete   | 2026-04-02 |
| 11. Security & Routing Hardening | v1.1 | 1/1 | Complete   | 2026-04-02 |
| 12. Session Mobility | v1.1 | 1/1 | Complete    | 2026-04-03 |
| 13. Visual QA Hook | v1.1 | 2/2 | Complete   | 2026-04-03 |
