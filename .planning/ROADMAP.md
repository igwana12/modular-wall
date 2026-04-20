# mosAIc — Roadmap

## Milestone 1: Virtual Product (Current)

### Phase 1: Foundation & Research [DONE]
**Goal**: Establish project structure, research components, document architecture
- 22 module types defined with hardware options
- Master CSV source of truth (47 columns)
- Competitive research (30+ companies)
- 5-expert council review
- Architecture documentation (networking, distributed processing)

### Phase 2: Visual Product Development [IN PROGRESS]
**Goal**: Create high-fidelity virtual product — Blender models, renders, website, brochure, brand
- Blender models for all 22 modules (basic complete, refinement needed)
- AI-generated product images (15 mosAIc-branded)
- Website prototype (Next.js, live at localhost:3333)
- Brand Bible (mosAIc identity system)
- 12-page brochure PDF
- Concepts: Mirror, Ring, Auto Journal, Guide, Hub Tiers, Marketplace, Singles

### Phase 3: High-Fidelity Refinement [NEXT]
**Goal**: Iterate all virtual assets to portfolio/investor grade
- Refined Blender models with internal components and PBR materials
- Photorealistic renders via Blender→Nano Banana pipeline
- Website polish and brand consistency
- Updated brochure with refined imagery

### Phase 4: Firmware & Software Scaffold [PLANNED]
**Goal**: Write actual code — firmware, Wall Controller Agent, web dashboard
- ESP32 standalone firmware
- FastAPI Wall Controller Agent
- Module discovery protocol
- The Guide first-boot experience

## Sacred Circuits / The Orb — Infrastructure Phases

### Phase 19: Token Audit & Stack Hardening [DONE]
**Goal**: Instrument JARVIS/Smithers token usage, add context trimming + prompt caching, SOUL.md behavioral spine, morning briefing vault write + launchd
- JARVIS usage logger writing to usage.db
- Weekly token audit CLI
- Context trimmer + prompt caching on system prompts
- SOUL.md behavioral index (3 personas wired)
- Morning briefing vault write + launchd plist at 07:00

### Phase 20: Pantheon Oracle Expansion [DONE]
**Goal**: Fully activate the Sacred Circuits oracle — fix broken RAG wiring, deploy Orphic tradition as second corpus, complete 20-god SOUL persona library
- Fix oracle RAG path (myth-vectors / myth_notes)
- Orphic dataset deployed: orphic.db + orphic_wisdom ChromaDB collection (376 chunks)
- Dual-collection retrieval (Hellenic + Orphic) in rag_retriever.py
- Orphic tabs added to Google Sheets copy
- 20-god SOUL persona library complete (17 new files)
- SOUL.md registry updated with all 20

**Plans:** 3 plans

Plans:
- [ ] 20-01-PLAN.md — Fix rag_retriever.py path/collection/threshold (Wave 1)
- [ ] 20-02-PLAN.md — Deploy orphic.db + ingest orphic_wisdom + dual-collection routing + Google Sheets copy (Wave 1)
- [ ] 20-03-PLAN.md — Write 17 SOUL persona files + update SOUL.md registry (Wave 2)

### Phase 21: Orphic Dedicated Endpoint [NEXT]
**Goal**: Expose a standalone `/oracle/orphic` endpoint that queries only the Orphic corpus, returns structured McKee-beat readings, and gates on Orphic theme detection — decoupled from the main Hellenic pipeline

- `/oracle/orphic` POST endpoint in `oracle/` or `server.py`
- Orphic-only retrieval path (no Hellenic fallback, no mixed dedup)
- McKee 4-beat response schema: inciting_incident, crisis, climax, resolution
- Orphic theme gate: request must contain at least one ORPHIC_THEME_KEYWORD or explicit `force=true`
- SOUL persona injection: caller passes `deity` key, endpoint loads matching SOUL file
- Error handling: returns 422 if theme gate fails without `force=true`
- Integration test: POST with Dionysus theme → 4-beat JSON response

**Plans:** 1/1 plans complete

Plans:
- [x] 21-01-PLAN.md — Build POST /api/oracle/orphic end-to-end: test stubs (Wave 0) + oracle/orphic_reading.py helper module + server.py route wiring + integration/security tests (Wave 1)

## Milestone 2: Physical Prototype [FUTURE]

### Phase 5: First Physical Module
### Phase 6: Multi-Module Networking
### Phase 7: Wall Assembly
### Phase 8: Community & Launch Prep
