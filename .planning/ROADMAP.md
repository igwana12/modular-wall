# The Orb — Roadmap (Oracle Cards + Spirit Sphere)

## Milestones

- [x] **v1.0 The Orb** - Phases 1-8 (shipped 2026-03-31)
- [x] **v1.1 Claude Code Infrastructure Upgrades** - Phases 10-13 (shipped 2026-04-03)
- [ ] **v1.2 Smithers-First Architecture + JARVIS Agentic Tools** - Phases 14-18 (in progress)
- [ ] **v1.3 Stack Upgrade — AI Creator Wiki Implementation** - Phases 19-23 (planned)

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

<details>
<summary>v1.1 Claude Code Infrastructure Upgrades (Phases 10-13) - SHIPPED 2026-04-03</summary>

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
**Plans**: 1/1 plans complete

Plans:
- [x] 11-02-PLAN.md -- Context profiles in Smithers routing_policy.json and task-based routing verification

### Phase 12: Session Mobility
**Goal**: Claude Code sessions move seamlessly between devices -- start on desktop, continue on phone, no context loss
**Depends on**: Nothing (independent)
**Requirements**: MOBIL-01, MOBIL-02, MOBIL-03
**Success Criteria** (what must be TRUE):
  1. User starts a Claude Code session on Mac, runs teleport, and resumes the same conversation on iPhone/iPad
  2. Remote control interface is accessible from a mobile browser and can issue commands to the desktop session
  3. Teleported session includes conversation history and file context from the originating device
**Plans**: 1/1 plans complete

Plans:
- [x] 12-01-PLAN.md -- Teleport and remote control configuration, testing, and documentation

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

</details>

### v1.2 Smithers-First Architecture + JARVIS Agentic Tools (In Progress)

**Milestone Goal:** Make Smithers the single conversation entry point with clear voice-role identity, and give JARVIS the ability to modify its own interface via voice commands.

- [x] **Phase 14: Routing Foundation + Voice Identity** - Regex intent classifier, voice-role binding, parallel pre-warm, and conversation history re-keying (completed 2026-04-04)
- [ ] **Phase 15: JARVIS Agentic Tools** - Build-intent detection, sandboxed file I/O, allowlisted shell commands, ADB frontend reload, and bounded agentic loop
- [ ] **Phase 16: System Health Restoration** - Fix port conflicts, restore Mission Control / JARVIS web / Health Dashboard, canonicalize port registry
- [ ] **Phase 17: R1 Face Integration & Contextual Assets** - Zeus/Athena face expressions, 62 scanned icon deployment, keyword-triggered contextual morphing, visual QA, R1 performance benchmark
- [ ] **Phase 18: R1 Pipeline Control & Approval Portal** - Voice-triggered Sacred Circuits pipeline execution, real-time status monitoring on R1, approve/reject/redo outputs via voice, Smithers automation route for SC workflows

### v1.3 Stack Upgrade — AI Creator Wiki Implementation (Planned)

**Milestone Goal:** Transform the stack from AI-assisted to AI-native across Smithers, JARVIS, Obsidian, and Sacred Circuits — implementing the 10 highest-impact techniques observed across 19 AI creator workflows.

- [ ] **Phase 19: Token Audit + Stack Hardening** - Surface top token killers, implement context trimming, validate supergemma4 free-tier routing, write SOUL.md, activate morning briefing cron
- [ ] **Phase 20: God Personas + Oracle Skill + Adviser Routing** - Create 21 god persona files, build Oracle Reading Skill, wire adviser/executor pattern (Opus for readings, fast path untouched)
- [ ] **Phase 21: Obsidian Write-Back Schema + Oracle Memory** - Define enforced output schema for all agent writes, implement post-reading vault entries
- [ ] **Phase 22: Oracle Pipeline AI-Native Redesign** - Remove human bottleneck from reading generation, deliver complete reading in <30s via parallel agents
- [ ] **Phase 23: Parallel Agents + Content Research + Video Pipeline** - Smithers parallel dispatch on Mac Mini, Firecrawl weekly content brief, ElevenLabs/Nano Banana video pipeline

## Phase Details

### Phase 14: Routing Foundation + Voice Identity
**Goal**: Every voice query is classified and dispatched to the correct handler and voice before reaching the LLM -- with zero perceptible latency cost
**Depends on**: Nothing (first phase of v1.2)
**Requirements**: ROUT-01, ROUT-02, ROUT-03, ROUT-04
**Success Criteria** (what must be TRUE):
  1. Saying "What's on my calendar?" routes to Smithers and responds in the JARVIS voice; saying "Tell me about Zeus" routes to the deity handler and responds in the Zeus voice; saying "What time is it?" falls through to the JARVIS general path
  2. Voice identity is locked before any async work begins -- no mid-response voice switches or duplicate TTS sends
  3. Switching from a Zeus conversation to a Smithers task and back preserves full conversation history (context is not lost when voice changes)
  4. End-to-end voice latency on R1 hardware stays under 300ms overhead compared to the pre-classifier baseline (measured, not estimated)
**Plans:** 2/2 plans complete

Plans:
- [x] 14-01-PLAN.md -- Re-key conversation_history to session-based + port 8400 auto-increment fix (ROUT-04)
- [x] 14-02-PLAN.md -- Regex intent classifier, voice-role binding, unified process_query dispatch (ROUT-01, ROUT-02, ROUT-03)

### Phase 15: JARVIS Agentic Tools
**Goal**: Users can speak a UI change request and JARVIS reads, edits, reloads, and confirms -- voice to working code on the R1 device
**Depends on**: Phase 14 (classifier provides `route == "build"` flag)
**Requirements**: AGEN-01, AGEN-02, AGEN-03, AGEN-04, AGEN-05
**Success Criteria** (what must be TRUE):
  1. Saying "make the orb pulse faster" triggers JARVIS to read the relevant file, write the change, reload the R1 browser via ADB, and voice-confirm the result -- all without manual intervention
  2. Attempting to read or write a file outside r1-frontend/ returns an error to the LLM and JARVIS voices "I can only edit the R1 frontend" (path traversal blocked at Python level)
  3. Attempting to run a shell command not on the allowlist (e.g., `rm -rf`) is refused -- JARVIS voices the rejection rather than executing
  4. If the agentic loop hits 5 iterations without completing, JARVIS speaks a failure summary and exits cleanly (no silent hang, no runaway credit burn)
  5. User hears a voice acknowledgement ("Working on it") before the first tool executes -- silence during a 10-40 second loop is not acceptable
**Plans:** 2 plans

Plans:
- [ ] 15-01-PLAN.md -- Agentic build loop: _BUILD_PATTERN, run_build_loop(), 4 sandboxed tools, ADB reload (AGEN-01, AGEN-02, AGEN-03, AGEN-04, AGEN-05)
- [ ] 15-02-PLAN.md -- Security boundary unit tests + R1 hardware verification checkpoint (AGEN-02, AGEN-03, AGEN-05)

### Phase 16: System Health Restoration
**Goal**: All core services run cleanly with no port conflicts, and their status is visible from a single dashboard
**Depends on**: Nothing (independent of Phases 14-15)
**Requirements**: HLTH-01, HLTH-02, HLTH-03, HLTH-04
**Success Criteria** (what must be TRUE):
  1. orb-backend starts on the first attempt with `ORB_BACKEND_PORT=8300` canonical and zero stale references to port 8000 in any startup config
  2. Mission Control at :4000, JARVIS web at :5556, and Health Dashboard at :6001 all respond to HTTP health checks after a clean system restart
  3. Health Dashboard at :6001 shows accurate up/down status for all registered services including the three restored in this phase
**Plans**: TBD

### Phase 17: R1 Face Integration & Contextual Assets
**Goal**: The R1 shows expressive deity faces driven by conversation mood, morphs contextual 3D wireframes triggered by keywords in speech, and runs all visual systems at stable framerate
**Depends on**: Phase 14 (voice routing provides deity identity and mood_tag)
**Requirements**: FACE-01, FACE-02, ASSET-01, ASSET-02, POLISH-01, PERF-01
**Success Criteria** (what must be TRUE):
  1. When Zeus speaks and Claude returns mood_tag "angry", the Zeus head displays BrowFurrow + EyesSquint shape keys with smooth 300ms lerp transition -- not just jaw displacement
  2. Athena has her own head GLB that activates when Athena voice is speaking, with the same expression system as Zeus
  3. Saying "tell me about the rocket ship" during conversation triggers the rocket-ship-retro wireframe to morph in via the point-cloud transformation engine
  4. All 62 scanned icons + 12 sacred animals + existing catalog entries are in wireframe-catalog.json with keyword triggers, and the morph engine selects contextually during speech
  5. All 12 sacred animal wireframes render correctly centered in Wire, DOF Lines, and DOF Constellation modes -- verified by visual QA
  6. R1 hardware maintains 30+ FPS with face + morph + particles + rings + constellation all active simultaneously
**Plans:** 3 plans

Plans:
- [ ] 17-01-PLAN.md -- Deploy 62 scanned icon GLBs + merge wireframe catalog + extend keyword trigger map (ASSET-01, ASSET-02)
- [ ] 17-02-PLAN.md -- Face expression engine + mood_tag bridge wiring + Athena head infrastructure (FACE-01, FACE-02)
- [ ] 17-03-PLAN.md -- FPS benchmark harness + visual QA automation + R1 hardware verification (POLISH-01, PERF-01)

### Phase 18: R1 Pipeline Control & Approval Portal
**Goal**: The R1 becomes a voice-driven command center for Sacred Circuits content pipelines -- trigger generation, monitor progress, review outputs, and approve/reject/redo from the palm of your hand
**Depends on**: Phase 15 (agentic tools provide shell execution + file I/O), Phase 14 (routing classifies pipeline intents)
**Requirements**: PIPE-01, PIPE-02, PIPE-03, PIPE-04
**Success Criteria** (what must be TRUE):
  1. Saying "Start a Sacred Circuits pipeline for Apollo" triggers the SC automation scripts on Smithers and JARVIS voices "Apollo pipeline started -- generating 3 assets"
  2. Saying "show me the status" displays pipeline progress on R1 (queued/generating/complete/failed) with voice summary
  3. When assets complete, R1 shows preview images behind the orb and JARVIS describes each -- user says "approve the first two, redo the third with more gold" and pipeline continues
  4. Pipeline outputs are saved to Obsidian and posted to the configured Slack channel with approval status
**Plans**: TBD

---

### Phase 19: Token Audit + Stack Hardening
**Goal**: Token costs are measured and trimmed, supergemma4 is the free-tier default, and the agent stack has a behavioral spine — SOUL.md and morning briefing active
**Depends on**: Nothing (first phase of v1.3, independent infrastructure work)
**Requirements**: COST-01, COST-02, COST-04, BEHAV-01, BEHAV-04
**Success Criteria** (what must be TRUE):
  1. A report identifies the top 3 token killers across JARVIS/Smithers from the last 7 days, with per-request averages and total cost attribution
  2. Context trimming is applied to the top killers — measurable reduction in tokens per request verified by before/after log comparison
  3. supergemma4-26b-mlx routes CODING, REASONING, GENERAL, and DATA tasks via port 8080 — confirmed by Smithers routing log
  4. `~/.claude/SOUL.md` exists with behavioral specs for JARVIS voice persona, Smithers orchestration principles, and Sacred Circuits reading tone
  5. At 7AM Smithers cron fires, compiles overnight outputs, and writes a formatted briefing to `niko-obsidian-vault/AGENT_OUTPUT_SHELF/morning-briefing/` — verified by file timestamp
**Plans**: TBD

### Phase 20: God Personas + Oracle Skill + Adviser Routing
**Goal**: Every god has a voice and a SKILL.md makes the full Oracle reading chain callable — with Opus doing the heavy lifting and the fast path completely untouched
**Depends on**: Phase 19 (SOUL.md defines the behavioral frame that god personas extend)
**Requirements**: BEHAV-02, BEHAV-03, COST-03
**Success Criteria** (what must be TRUE):
  1. 21 persona files exist at `niko-obsidian-vault/sacred-circuits/souls/[god-name].md` — each specifies rhetorical style, mythological frame, and at least 3 forbidden responses
  2. `~/.claude/skills/oracle-reading/SKILL.md` exists and is callable by JARVIS — executing it runs the full Sacred Circuits reading chain and returns a structured result with god, querent theme, and narrative
  3. Opus routes for Oracle readings and complex multi-step tasks — confirmed by router log showing model selection per request type
  4. Haiku fast path response time is unchanged — before/after latency comparison shows zero regression (target: <2.5s)
**Plans**: TBD

### Phase 21: Obsidian Write-Back Schema + Oracle Memory
**Goal**: Every Oracle reading writes a structured vault entry — schema enforced, unstructured dumps blocked
**Depends on**: Phase 20 (Oracle Skill provides the structured output to write back)
**Requirements**: MEM-01, MEM-02
**Success Criteria** (what must be TRUE):
  1. After an Oracle reading completes, a structured entry appears in `niko-obsidian-vault/sacred-circuits/readings/` containing god name, querent theme, key insight, and date — written by JARVIS without manual intervention
  2. The output schema is defined and enforced for all agent write-back operations — attempting to write an unstructured vault entry is rejected with a logged error
  3. Schema validation can be run as a standalone check against any existing vault entry in the readings/ directory
**Plans**: TBD

### Phase 22: Oracle Pipeline AI-Native Redesign
**Goal**: A complete Oracle reading assembles in under 30 seconds — AI handles the full draft, human blesses only
**Depends on**: Phase 20 (Oracle Skill), Phase 21 (write-back schema — readings must persist correctly after redesign)
**Requirements**: PIPE-05, PIPE-06
**Success Criteria** (what must be TRUE):
  1. QR scan → querent data → god selection → parallel agents → assembled reading completes in under 30 seconds, measured end-to-end on production infrastructure
  2. Human is not in the generation loop — AI produces a complete reading draft without requiring manual input or approval before delivery
  3. Human review-and-bless step exists as an optional post-generation action — not a gate on delivery
  4. Fallback path exists: if parallel agents fail, reading degrades gracefully to single-agent sequential (no silent hang)
**Plans**: TBD

### Phase 23: Parallel Agents + Content Research + Video Pipeline
**Goal**: Smithers runs two agents in parallel, weekly content intelligence flows into Obsidian, and Sacred Circuits shorts are generated end-to-end
**Depends on**: Phase 22 (parallel agent pattern proved in Oracle pipeline), Phase 21 (write-back schema governs content brief storage)
**Requirements**: PIPE-07, PIPE-08, MEM-03
**Success Criteria** (what must be TRUE):
  1. Smithers dispatches research agent + writing agent concurrently on Mac Mini — both run simultaneously, confirmed by overlapping timestamps in task logs
  2. Weekly Firecrawl pipeline scrapes mythology/AI content from YouTube, X, and Reddit — outputs `content-brief.md` to `niko-obsidian-vault/sacred-circuits/content-briefs/` by end of each week
  3. Sacred Circuits video pipeline produces a review-ready clip from script → ElevenLabs god voice → Nano Banana visual → assembled short — no manual audio or video stitching required
  4. Parallel agent execution does not exceed Mac Mini resource limits — CPU and memory stay within acceptable bounds during concurrent dispatch
**Plans**: TBD

## Progress

**Execution Order:**
v1.2: Phase 16 is independent and can run parallel to 14-15. Phase 17 can run parallel to 15-16. Phase 18 depends on Phase 15.
v1.3: Phases 19-21 are sequential (each depends on prior). Phase 22 depends on 20+21. Phase 23 depends on 22+21.

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 10. Automation Activation | v1.1 | 2/2 | Complete | 2026-04-02 |
| 11. Security & Routing Hardening | v1.1 | 1/1 | Complete | 2026-04-02 |
| 12. Session Mobility | v1.1 | 1/1 | Complete | 2026-04-03 |
| 13. Visual QA Hook | v1.1 | 2/2 | Complete | 2026-04-03 |
| 14. Routing Foundation + Voice Identity | v1.2 | 2/2 | Complete | 2026-04-04 |
| 15. JARVIS Agentic Tools | v1.2 | 0/2 | Planned | - |
| 16. System Health Restoration | v1.2 | 0/0 | Not started | - |
| 17. R1 Face Integration & Contextual Assets | v1.2 | 0/3 | Planned | - |
| 18. R1 Pipeline Control & Approval Portal | v1.2 | 0/0 | Not started | - |
| 19. Token Audit + Stack Hardening | v1.3 | 0/0 | Not started | - |
| 20. God Personas + Oracle Skill + Adviser Routing | v1.3 | 0/0 | Not started | - |
| 21. Obsidian Write-Back Schema + Oracle Memory | v1.3 | 0/0 | Not started | - |
| 22. Oracle Pipeline AI-Native Redesign | v1.3 | 0/0 | Not started | - |
| 23. Parallel Agents + Content Research + Video Pipeline | v1.3 | 0/0 | Not started | - |
