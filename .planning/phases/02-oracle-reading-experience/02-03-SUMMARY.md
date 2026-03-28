---
phase: 02-oracle-reading-experience
plan: 03
subsystem: ui
tags: [next.js, react, localStorage, reading-tracker, homepage, deity-gallery, daily-card, motion, responsive-grid]

requires:
  - phase: 02-oracle-reading-experience
    provides: Next.js oracle app scaffold with shadcn/ui, typed deity interfaces, BFF SSE proxy

provides:
  - Homepage with daily card pull mechanic and 21-god gallery
  - Anonymous reading tracker enforcing 3/month free tier via localStorage
  - BFF routes for deity list (cached) and random deity (dynamic)
  - ReadingCounter component for free tier visibility
  - Verified McKee storytelling guidance in all 21 deity system prompts

affects: [02-04 paywall, 02-05 PWA, reading-experience-polish]

tech-stack:
  added: []
  patterns: [localStorage date tracking for daily card, anonymous monthly usage counter, server-fetched gallery with client interactivity, spring hover animation on gallery tiles]

key-files:
  created:
    - apps/oracle/src/lib/reading-tracker.ts
    - apps/oracle/src/components/daily-card.tsx
    - apps/oracle/src/components/deity-gallery.tsx
    - apps/oracle/src/components/reading-counter.tsx
    - apps/oracle/src/app/api/deities/route.ts
    - apps/oracle/src/app/api/deities/random/route.ts
  modified:
    - apps/oracle/src/app/page.tsx
    - apps/oracle/src/components/reading-stream.tsx

key-decisions:
  - "Daily card stored in localStorage with date string -- resets automatically each day without server involvement"
  - "Gallery tiles show initial letter + name instead of images during early dev (images require content DB running)"
  - "Reading tracker is purely client-side -- no server enforcement until auth plan (02-04/05)"
  - "All 21 deity McKee guidance already complete from Phase 1 -- no modifications needed"

patterns-established:
  - "localStorage date tracking: store { date: 'YYYY-MM-DD', ... } and compare with today for daily mechanics"
  - "Anonymous usage tracking: monthly record in localStorage with auto-reset on month change"
  - "SSR-safe localStorage: all access guarded with typeof window === 'undefined' check"
  - "BFF proxy pattern: thin route handlers proxying to ORB_BACKEND_URL with graceful fallbacks"

requirements-completed: [READ-06, READ-07, READ-08]

duration: 4min
completed: 2026-03-28
---

# Phase 2 Plan 3: Homepage and Daily Card Summary

**Homepage with daily card pull mechanic, 21-god responsive gallery with spring animations, anonymous 3/month reading tracker, and verified McKee storytelling in all deity prompts**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-28T08:22:39Z
- **Completed:** 2026-03-28T08:27:01Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Daily card pull mechanic with localStorage date tracking, loading state ("The gods are choosing..."), and post-pull deity display with "Read again?" link
- 21-god gallery in responsive 3/4/5 column grid with motion spring hover animation (scale 1.03)
- Anonymous reading counter showing "N of 3 free readings remaining" with monthly auto-reset
- BFF proxy routes: /api/deities (cached 1hr) and /api/deities/random (force-dynamic)
- Server-rendered homepage fetching deity list at build time with 1-hour revalidation
- Verified all 21 deity configs contain McKee storytelling guidance (inciting incident, value progression, crisis/climax patterns)

## Task Commits

Each task was committed atomically:

1. **Task 1: Build homepage components and reading tracker** - `67706a2` (feat)
2. **Task 2: Verify and enhance McKee storytelling in all 21 deity system prompts** - No commit needed (all 21 deities already had complete McKee guidance from Phase 1)

## Files Created/Modified
- `apps/oracle/src/lib/reading-tracker.ts` - Anonymous free tier tracking with SSR guards (canRead, recordReading, getReadingsRemaining)
- `apps/oracle/src/components/daily-card.tsx` - Daily card pull with localStorage date tracking, loading/pulled/not-pulled states
- `apps/oracle/src/components/deity-gallery.tsx` - 21-god responsive grid with motion spring hover animation
- `apps/oracle/src/components/reading-counter.tsx` - Free tier usage display, client-only rendering
- `apps/oracle/src/app/api/deities/route.ts` - BFF proxy for deity list (force-cache, 1hr revalidation)
- `apps/oracle/src/app/api/deities/random/route.ts` - BFF proxy for random deity selection (force-dynamic)
- `apps/oracle/src/app/page.tsx` - Homepage with top bar, daily card, reading counter, deity gallery, footer
- `apps/oracle/src/components/reading-stream.tsx` - Fixed pre-existing implicit-any type errors on SSE callback parameters

## Decisions Made
- Daily card uses localStorage with date string comparison rather than server-side tracking -- keeps the experience anonymous until auth is added
- Gallery tiles render deity initial letter as placeholder instead of fetching images -- content DB images require the backend running; thumbnails will be wired when available
- Reading tracker is client-only enforcement (easily bypassed) -- server-side enforcement comes with auth/paywall in later plans
- Task 2 required no changes -- Phase 1 deity config creation already embedded comprehensive McKee guidance in all 21 gods

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed implicit-any type errors in reading-stream.tsx**
- **Found during:** Task 1 (build verification)
- **Issue:** Pre-existing type errors in reading-stream.tsx -- onText, onAudio, onError callbacks had untyped `data` parameters, failing TypeScript strict mode
- **Fix:** Added explicit type annotations (TextEvent, AudioEvent, ErrorEvent) from sse-events.ts
- **Files modified:** apps/oracle/src/components/reading-stream.tsx
- **Verification:** npm run build succeeds
- **Committed in:** 67706a2

---

**Total deviations:** 1 auto-fixed (blocking -- build failure from pre-existing code)
**Impact on plan:** Minimal. Type fix was 3 lines changed in a file from a prior plan. No scope creep.

## Issues Encountered
None beyond the pre-existing type error fixed above.

## Known Stubs
- Gallery tiles show deity initial letter instead of PANTHEON artwork (content DB images require running backend; placeholder is intentional for early development, will be replaced when /api/content endpoint is used)

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Homepage complete with daily card + gallery + reading counter
- Reading tracker ready for paywall integration (canRead check before starting readings)
- BFF proxy pattern established for deity data fetching
- All deity McKee guidance verified for reading quality

## Self-Check: PASSED

All 7 key files verified present. Task 1 commit (67706a2) verified in git log. Task 2 required no commit (all 21 deities already had McKee guidance).

---
*Phase: 02-oracle-reading-experience*
*Completed: 2026-03-28*
