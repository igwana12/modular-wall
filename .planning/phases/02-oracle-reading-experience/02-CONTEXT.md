# Phase 2: Oracle Reading Experience - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning
**Source:** Inline discussion

<domain>
## Phase Boundary

Build the complete end-to-end web experience for Oracle Card readings. User scans QR code on physical card → sees dramatic card reveal with deity art → enters their question/intent → receives a streaming AI oracle reading with deity voice narration and PANTHEON artwork. Includes payment tiers, daily card mechanics, and digital guidebook.

This is the user-facing product — the experience that makes people buy the cards.

</domain>

<decisions>
## Implementation Decisions

### Reading Flow (LOCKED)
- QR scan lands on deity-specific URL: `/read/{deity_id}`
- **Card reveal first** — dramatic visual moment showing the deity's PANTHEON art before anything else
- Then intent input — user types their question/situation
- Then reading streams — voice + text + visuals delivered via SSE (wired in Phase 1)
- Future (v2): AR version with 3D animated character hovering above physical card via camera. **Deferred — not in Phase 2 scope.**

### Card Pull Mechanic (LOCKED)
- **Both modes available**: Random pull as primary (homepage), user can also browse/pick specific god
- Random pull = true oracle experience ("the gods choose you")
- Browse mode = 21 god gallery with selection

### Free Tier / Paywall Strategy (RESEARCH NEEDED)
- Not yet decided — needs competitive research on what works for oracle/tarot/spiritual apps
- Consider: readings per month, daily limits, feature gating, premium deity access
- Must model out conversion math

### Auth Timing (RESEARCH NEEDED)
- Not yet decided — research what similar apps (Co-Star, The Pattern, Golden Thread Tarot, Labyrinthos) do
- Key tension: zero friction vs. tracking free tier limits
- Magic link email preferred when auth is needed (from tech stack)

### Card Commerce Vision (DEFERRED — Phase 3+)
- Mystery packs concept — digital-first, buy physical later
- Physical cards delivered customized to buyer
- This is Phase 3 territory but informs Phase 2 UX (don't block the path)

### Tech Stack (LOCKED — from CLAUDE.md)
- Next.js 15 App Router + React 19 + TypeScript + Tailwind 4 + shadcn/ui
- Serwist for PWA / "Add to Home Screen" after QR scan
- next-themes for dark mode (oracle readings = immersive dark by default)
- Stripe for payments, Auth.js v5 for authentication
- Deploy on Vercel (free tier initially)

### Backend (LOCKED — from Phase 1)
- orb-backend at :8300 already has SSE endpoint, 21 deity configs, Content DB, RAG, TTS
- Frontend consumes `/api/oracle/read/{deity_id}?intent=...` SSE endpoint
- Next.js API routes as BFF proxy layer

### McKee Storytelling (LOCKED)
- Reading prompts must apply McKee narrative arc principles
- This is in the system prompt engineering, not the UI
- Already referenced in CLAUDE.md as mandatory for all narrative content

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase 1 Outputs (Backend)
- `services/orb-backend/server.py` — SSE endpoint at /api/oracle/read/{deity_id}
- `services/orb-backend/streaming.py` — Stream reading generator with sentence detection
- `services/orb-backend/pipeline.py` — Claude streaming + LLM Router fallback
- `services/orb-backend/rag.py` — ChromaDB RAG retrieval
- `services/orb-backend/tts.py` — ElevenLabs WebSocket TTS
- `services/orb-backend/deity_config.py` — Load deity configs
- `services/orb-backend/gods/*.json` — 21 deity JSON configs
- `services/orb-backend/content_db.py` — PANTHEON image catalog

### Project Docs
- `.planning/ROADMAP.md` — Phase 2 success criteria and requirements
- `.planning/REQUIREMENTS.md` — READ-01 through READ-10
- `CLAUDE.md` — Technology stack decisions, McKee protocol

</canonical_refs>

<specifics>
## Specific Ideas

- Card reveal should feel like a "moment" — animation, sound, dramatic
- Dark mode by default for immersive oracle experience
- PWA prompt after first reading ("Add to Home Screen" for repeat visits)
- QR codes must resolve to permanent URLs (no link rot — CARD-02 dependency)
- Digital guidebook: mythology, keywords, upright/reversed meanings per god

</specifics>

<deferred>
## Deferred Ideas

- AR card experience with 3D animated deity hovering above physical card (v2)
- Mystery pack / digital-first commerce model (Phase 3)
- Customized physical card delivery (Phase 3)
- Multi-card spread readings — Celtic cross, 3-card (v2, READ-V2-02)
- Shareable reading cards / social images (v2, READ-V2-03)
- Reading journal with pattern analytics (v2, READ-V2-04)

</deferred>

---

*Phase: 02-oracle-reading-experience*
*Context gathered: 2026-03-28 via inline discussion*
