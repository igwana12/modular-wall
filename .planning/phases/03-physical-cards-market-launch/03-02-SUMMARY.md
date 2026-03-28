---
phase: 03-physical-cards-market-launch
plan: 02
subsystem: ui
tags: [nextjs, landing-page, vercel-analytics, stripe, deposit, conversion-tracking]

# Dependency graph
requires:
  - phase: 03-physical-cards-market-launch
    provides: Stripe deposit API route (/api/deposit) and webhook handling
provides:
  - Landing page at root URL with hero, features, and $1 deposit CTA
  - Reservation confirmation page at /reserved
  - Vercel Analytics integration for page views and reading completion tracking
  - Oracle app relocated to /oracle route
affects: [03-physical-cards-market-launch, email-sequences, kickstarter-campaign]

# Tech tracking
tech-stack:
  added: ["@vercel/analytics"]
  patterns: ["Route restructuring: landing at /, app at /oracle", "Analytics event tracking on reading completion"]

key-files:
  created:
    - apps/oracle/src/app/oracle/page.tsx
    - apps/oracle/src/app/reserved/page.tsx
    - apps/oracle/src/app/reserved/share-button.tsx
    - apps/oracle/src/components/landing-hero.tsx
    - apps/oracle/src/components/landing-features.tsx
    - apps/oracle/src/components/deposit-cta.tsx
  modified:
    - apps/oracle/src/app/page.tsx
    - apps/oracle/src/app/layout.tsx
    - apps/oracle/src/app/read/[deity_id]/reading-page-client.tsx
    - apps/oracle/src/components/reading-stream.tsx

key-decisions:
  - "Root URL is now the public landing page; oracle app moved to /oracle"
  - "reading_completed analytics event tracks deity and tier for LAUNCH-04 revenue validation"

patterns-established:
  - "Landing page pattern: server component composing client hero + CTA sections"
  - "Analytics event pattern: track() from @vercel/analytics in client component callbacks"

requirements-completed: [LAUNCH-01, LAUNCH-04]

# Metrics
duration: 4min
completed: 2026-03-28
---

# Phase 03 Plan 02: Landing Page Summary

**Landing page with $1 deposit CTA at root URL, reservation confirmation page, and Vercel Analytics tracking reading completions by deity and tier**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-28T17:15:03Z
- **Completed:** 2026-03-28T17:18:43Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- Landing page at root / with hero animation, 3 feature cards, and deposit CTA connecting to /api/deposit
- Existing oracle homepage preserved at /oracle with all back-links updated
- Post-deposit confirmation page at /reserved reading session_id from URL params
- Vercel Analytics integrated in root layout; reading_completed event fires with deity and tier metadata

## Task Commits

Each task was committed atomically:

1. **Task 1: Landing page with deposit CTA and route restructuring** - `2ac492c` (feat)
2. **Task 2: Reservation confirmation page and Vercel Analytics** - `7647fa6` (feat)

## Files Created/Modified
- `apps/oracle/src/app/page.tsx` - New landing page with hero, features, CTA, footer
- `apps/oracle/src/app/oracle/page.tsx` - Relocated original homepage (daily card, deity gallery)
- `apps/oracle/src/app/reserved/page.tsx` - Post-deposit confirmation with session_id display
- `apps/oracle/src/app/reserved/share-button.tsx` - Client component for clipboard share
- `apps/oracle/src/components/landing-hero.tsx` - Full-viewport hero with motion fade-in
- `apps/oracle/src/components/landing-features.tsx` - 3-column feature cards (Physical, AI, Sacred Circuits)
- `apps/oracle/src/components/deposit-cta.tsx` - Email input + $1 deposit button with loading/error states
- `apps/oracle/src/app/layout.tsx` - Added Vercel Analytics component
- `apps/oracle/src/app/read/[deity_id]/reading-page-client.tsx` - Added reading_completed tracking event
- `apps/oracle/src/components/reading-stream.tsx` - Updated "Pull Another Card" link to /oracle

## Decisions Made
- Root URL is now the public landing page; oracle app moved to /oracle -- landing page is the front door for conversions
- reading_completed analytics event tracks deity and tier metadata -- directly supports LAUNCH-04 first 100 paid readings metric

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Updated back-links in reading flow to /oracle**
- **Found during:** Task 1 (Route restructuring)
- **Issue:** Reading stream and reading page client had hardcoded href="/" links pointing to old homepage location
- **Fix:** Updated both reading-stream.tsx and reading-page-client.tsx links to href="/oracle"
- **Files modified:** apps/oracle/src/components/reading-stream.tsx, apps/oracle/src/app/read/[deity_id]/reading-page-client.tsx
- **Verification:** Build passes, links point to correct oracle app route
- **Committed in:** 2ac492c (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Essential fix for route restructuring. Without it, "Pull Another Card" would land on the landing page instead of the oracle app.

## Issues Encountered
None

## User Setup Required
None - Vercel Analytics works automatically when deployed to Vercel. No API key or dashboard configuration needed.

## Next Phase Readiness
- Landing page live at root URL, ready for traffic
- Deposit flow connects to existing /api/deposit from Plan 01
- Analytics tracking in place for conversion measurement
- Ready for Plan 03 (email sequences via Kit) -- confirmation page already includes "Check your email" messaging

## Self-Check: PASSED

All 7 created files verified on disk. Both task commits (2ac492c, 7647fa6) found in git log.

---
*Phase: 03-physical-cards-market-launch*
*Completed: 2026-03-28*
