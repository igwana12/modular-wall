# Phase 2: Oracle Reading Experience - Handoff

**Date:** 2026-03-28
**Session:** Plan-phase + Execute-phase (partial)
**Status:** Wave 2 in progress, Wave 3 not started

---

## What Was Done This Session

### Phase 1 Closure
- Marked Phase 1 complete (all 5 INFRA requirements satisfied)
- Updated REQUIREMENTS.md and ROADMAP.md traceability

### Phase 2 Planning (Complete)
- Gathered user design decisions inline (reading flow, card mechanics, payment strategy)
- Wrote CONTEXT.md with locked decisions + open questions
- Spawned researcher: competitive analysis (Co-Star, Labyrinthos, Nebula), SSE patterns, Stripe, motion animations
- Generated UI-SPEC.md: design system (zinc-950/gold, Inter+Crimson Pro, 21 deity color palettes, component registry)
- Created 5 plans across 3 waves, verified by plan-checker, fixed 1 blocker (Tailwind 3→4) + 4 warnings

### Phase 2 Execution (Partial)

| Plan | Wave | Status | What it Built |
|------|------|--------|---------------|
| 02-01 | 1 | COMPLETE | Next.js 16 scaffold, Tailwind 4, shadcn/ui, SSE types, BFF proxy, hooks |
| 02-02 | 2 | CHECKPOINT | Card reveal animation, intent input, reading stream, deity voice+art. **Awaiting human visual verification** |
| 02-03 | 2 | COMPLETE | Homepage, daily card pull, deity gallery, reading tracker, McKee verification |
| 02-04 | 3 | NOT STARTED | Stripe payments, Auth.js magic link, paywall gate |
| 02-05 | 2 | COMPLETE | Guidebook (21 gods), Serwist PWA, offline fallback |

**Requirements completed so far:** READ-01, READ-06, READ-07, READ-08, READ-10
**Requirements remaining:** READ-02, READ-03, READ-04, READ-05, READ-09

---

## What Needs to Happen Next

### Immediate: Complete Plan 02-02 Checkpoint
The dev server should be running at http://localhost:3000. orb-backend must be at localhost:8300.

**Verification steps:**
1. Open http://localhost:3000/read/zeus (mobile viewport 375px)
2. Card back flips to reveal Zeus PANTHEON art
3. Intent input slides up — type a question, tap "Begin Reading"
4. Text streams token-by-token with deity voice audio
5. Try http://localhost:3000/read/aphrodite (different color palette)
6. Try http://localhost:3000/read/nonexistent (should 404)

If it works: type "approved" when resuming the executor agent.
If issues: describe what's wrong — the executor will fix and re-verify.

**Resume command:**
```bash
# Start orb-backend if not running:
cd ~/services/orb-backend && source .venv/bin/activate && uvicorn server:app --port 8300 &

# Start oracle frontend:
cd ~/apps/oracle && npm run dev

# Then in Claude Code:
/gsd:execute-phase 2
```
This will detect 02-01, 02-03, 02-05 as complete (SUMMARY.md exists) and resume from 02-02's checkpoint.

### Then: Execute Plan 02-04 (Wave 3)
Stripe payments + Auth.js magic link + paywall gate. **Requires user setup:**
- Create Stripe product "Oracle Premium" at $9.99/mo (test mode)
- Get Stripe API keys (secret + publishable + webhook secret)
- Optionally: Resend account for magic link emails

### Then: Phase 2 Verification
After all 5 plans complete, the GSD verifier runs automatically to confirm all 10 READ-* requirements are satisfied.

---

## Key Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| Next.js 16 (not 15) | create-next-app installed latest; functionally equivalent |
| Tailwind 4 inline CSS | No tailwind.config.ts — v4 uses CSS-based configuration |
| Edge Runtime for BFF | SSE proxy must stream, Edge Runtime supports it |
| localStorage for free tier | Anonymous tracking until auth (Plan 02-04) |
| Both card pull modes | Random (homepage) + browse/pick (gallery) |
| 3 free readings/month | Research recommended feature gating, voice for paid only |
| Auth delayed until paywall | Zero friction QR→reading flow, auth only when paying |

---

## File Locations

| Artifact | Path |
|----------|------|
| Phase plans | `~/.planning/phases/02-oracle-reading-experience/02-*-PLAN.md` |
| Phase research | `~/.planning/phases/02-oracle-reading-experience/02-RESEARCH.md` |
| UI design spec | `~/.planning/phases/02-oracle-reading-experience/02-UI-SPEC.md` |
| Context (decisions) | `~/.planning/phases/02-oracle-reading-experience/02-CONTEXT.md` |
| Oracle web app | `~/apps/oracle/` |
| orb-backend | `~/services/orb-backend/` |
| Project roadmap | `~/.planning/ROADMAP.md` |
| Project state | `~/.planning/STATE.md` |

---

## Git Log (This Session)
```
824a60c feat(02-01): scaffold Next.js oracle app with design system
3656227 feat(02-01): add SSE types, BFF proxy, and streaming hooks
7aad60c docs(02-01): complete oracle app scaffold plan
2d8c4a1 feat(02-02): build card reveal, intent input, deity background, audio player
2078f78 feat(02-02): build reading stream and wire reading page
8307236 fix(02-02): fix Next.js 16 Turbopack build config and Serwist type errors
67706a2 feat(02-03): build homepage with daily card pull, deity gallery, and reading tracker
80cb4ce docs(02-03): complete homepage and daily card plan
b1d8a3f docs(02-05): complete guidebook and PWA plan
```

---
*Handoff created: 2026-03-28*
