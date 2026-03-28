---
phase: 02-oracle-reading-experience
plan: 02
subsystem: ui
tags: [react, motion, sse, web-audio, next.js, streaming, animation]

# Dependency graph
requires:
  - phase: 02-oracle-reading-experience/01
    provides: SSE types, useOracleSSE hook, useAudioQueue hook, BFF proxy route, design system
provides:
  - Card reveal component with 3D flip animation and spring physics
  - Intent input component with UI-SPEC copywriting
  - Reading stream component consuming SSE text + audio + art events
  - Deity background component with CSS custom property theming
  - Audio player component with mute toggle and pulse animation
  - /read/[deity_id] page composing the full reading flow
  - BFF proxy routes for deity config and content endpoints
affects: [02-oracle-reading-experience/04, 03-physical-cards]

# Tech tracking
tech-stack:
  added: [motion/react (animations), lucide-react (icons)]
  patterns: [SSE-driven progressive rendering, Web Audio API via user gesture, CSS custom property theming, lazy-loaded motion components for SSR]

key-files:
  created:
    - apps/oracle/src/components/card-reveal.tsx
    - apps/oracle/src/components/intent-input.tsx
    - apps/oracle/src/components/deity-background.tsx
    - apps/oracle/src/components/audio-player.tsx
    - apps/oracle/src/components/reading-stream.tsx
    - apps/oracle/src/app/read/[deity_id]/page.tsx
    - apps/oracle/src/app/read/[deity_id]/reading-page-client.tsx
    - apps/oracle/src/app/api/deities/[deity_id]/route.ts
    - apps/oracle/src/app/api/content/[deity_id]/random/route.ts
  modified:
    - apps/oracle/next.config.ts
    - apps/oracle/src/sw.ts

key-decisions:
  - "CardReveal lazy-loaded with next/dynamic SSR:false -- SSR renders card back placeholder for fast FCP"
  - "Reading page uses 3-phase state machine (reveal -> intent -> reading) managed by client wrapper"
  - "Audio context initialized on Begin Reading tap (user gesture requirement for Web Audio API)"

patterns-established:
  - "SSE progressive rendering: useOracleSSE hook feeds text/audio/deity events to reading-stream component"
  - "Deity theming via CSS custom properties: --deity-primary, --deity-secondary, --deity-tertiary"
  - "BFF proxy pattern: Next.js API routes proxy to orb-backend with caching strategy per endpoint"

requirements-completed: [READ-01, READ-02, READ-03, READ-04, READ-05]

# Metrics
duration: 12min
completed: 2026-03-28
---

# Phase 02 Plan 02: Reading Flow Components Summary

**Card reveal with spring flip animation, intent input, and SSE-powered reading stream with deity voice narration and PANTHEON art display**

## Performance

- **Duration:** 12 min
- **Started:** 2026-03-28T15:45:00Z
- **Completed:** 2026-03-28T16:02:00Z
- **Tasks:** 3 (2 auto + 1 human-verify checkpoint)
- **Files modified:** 11

## Accomplishments
- Built 3D card flip animation with spring physics (stiffness 60, damping 20) and prefers-reduced-motion support
- Wired complete SSE reading stream consuming text, audio, deity, done, error, and tts_error events
- Created /read/[deity_id] page with 3-phase state machine: reveal -> intent -> streaming reading
- BFF proxy routes for deity config (cached 1hr) and random content (force-dynamic)

## Task Commits

Each task was committed atomically:

1. **Task 1: Build card reveal, intent input, deity background, and audio player components** - `2d8c4a1` (feat)
2. **Task 2: Build reading stream component and wire /read/[deity_id] page** - `2078f78` (feat)
3. **Build fix: Next.js 16 Turbopack config and Serwist type errors** - `8307236` (fix)
4. **Task 3: Verify reading flow end-to-end** - checkpoint approved, no code changes

## Files Created/Modified
- `apps/oracle/src/components/card-reveal.tsx` - 3D card flip with spring physics and reduced-motion support
- `apps/oracle/src/components/intent-input.tsx` - Intent textarea with UI-SPEC copywriting and validation
- `apps/oracle/src/components/deity-background.tsx` - CSS custom property theming from deity color palette
- `apps/oracle/src/components/audio-player.tsx` - Mute toggle with pulse animation during playback
- `apps/oracle/src/components/reading-stream.tsx` - SSE consumer rendering progressive text + audio + art
- `apps/oracle/src/app/read/[deity_id]/page.tsx` - Server component fetching deity config and random image
- `apps/oracle/src/app/read/[deity_id]/reading-page-client.tsx` - Client wrapper managing reveal/intent/reading phases
- `apps/oracle/src/app/api/deities/[deity_id]/route.ts` - BFF proxy to orb-backend deity config (1hr cache)
- `apps/oracle/src/app/api/content/[deity_id]/random/route.ts` - BFF proxy to orb-backend random content (no cache)
- `apps/oracle/next.config.ts` - Fixed Turbopack build config for Next.js 16
- `apps/oracle/src/sw.ts` - Fixed Serwist type errors

## Decisions Made
- CardReveal lazy-loaded with next/dynamic SSR:false so SSR renders the card back placeholder for fast First Contentful Paint
- Reading page uses a 3-phase client state machine (reveal -> intent -> reading -> complete) managed by ReadingPageClient wrapper
- AudioContext initialized on "Begin Reading" tap to satisfy browser autoplay policy (user gesture required)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed Next.js 16 Turbopack build config and Serwist type errors**
- **Found during:** Task 2 (build verification)
- **Issue:** Next.js 16 Turbopack config format changed; Serwist service worker had type errors preventing build
- **Fix:** Updated next.config.ts webpack/turbopack plugin config, fixed sw.ts types, added missing PWA assets
- **Files modified:** apps/oracle/next.config.ts, apps/oracle/src/sw.ts, apps/oracle/public/icon-192.png, apps/oracle/public/icon-512.png, apps/oracle/src/app/manifest.ts, apps/oracle/src/app/offline/page.tsx
- **Verification:** `npm run build` exits 0
- **Committed in:** `8307236`

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Build fix necessary for compilation. No scope creep.

## Issues Encountered
None beyond the build config deviation documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Reading flow is complete and verified -- users can navigate to /read/{deity_id}, see card reveal, enter intent, and receive streaming AI reading
- Ready for Plan 02-04 (payments and auth) to gate reading access behind paywall
- orb-backend must be running at :8300 for live readings

## Self-Check: PASSED

- All 9 created files verified present
- All 3 commits verified in git history (2d8c4a1, 2078f78, 8307236)
- No stubs or placeholders found

---
*Phase: 02-oracle-reading-experience*
*Completed: 2026-03-28*
