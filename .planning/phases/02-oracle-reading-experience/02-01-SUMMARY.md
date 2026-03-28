---
phase: 02-oracle-reading-experience
plan: 01
subsystem: ui
tags: [next.js, tailwind, shadcn-ui, sse, web-audio, react-hooks, typescript]

requires:
  - phase: 01-pipeline-audit-oracle-backend
    provides: orb-backend SSE streaming at :8300

provides:
  - Next.js oracle app scaffold with shadcn/ui design system
  - Typed SSE event interfaces matching orb-backend wire format
  - BFF proxy for SSE streaming on Edge Runtime
  - useOracleSSE hook with named event listeners
  - useAudioQueue hook with lazy AudioContext

affects: [02-02 reading-ui, 02-03 deity-gallery, 02-04 daily-card, 02-05 paywall]

tech-stack:
  added: [next.js 16, react 19, tailwind-css 4, shadcn-ui, motion 12, stripe 21, next-themes, serwist, lucide-react]
  patterns: [BFF SSE proxy, named EventSource listeners, lazy AudioContext from user gesture, CSS custom properties for per-deity theming]

key-files:
  created:
    - apps/oracle/src/app/layout.tsx
    - apps/oracle/src/app/page.tsx
    - apps/oracle/src/app/globals.css
    - apps/oracle/src/lib/fonts.ts
    - apps/oracle/src/types/sse-events.ts
    - apps/oracle/src/types/deity.ts
    - apps/oracle/src/app/api/oracle/read/[deity_id]/route.ts
    - apps/oracle/src/hooks/use-sse.ts
    - apps/oracle/src/hooks/use-audio-queue.ts
  modified:
    - .gitignore

key-decisions:
  - "Next.js 16 installed (latest via create-next-app) -- plan specified 15 but 16 is current"
  - "Tailwind CSS v4 already ships with create-next-app -- no manual upgrade needed"
  - "shadcn base-nova style used (current default) rather than new-york (deprecated naming)"
  - "next-auth@beta deferred -- not needed until paywall plan"

patterns-established:
  - "BFF proxy pattern: thin Edge Runtime route handler that pipes SSE body from orb-backend"
  - "Named SSE events: always use addEventListener, never onmessage, for orb-backend events"
  - "Lazy AudioContext: initAudio() must be called from user gesture, never on mount"
  - "Deity CSS custom properties: --deity-primary/secondary/tertiary set dynamically per reading"
  - "Font strategy: Inter for UI (--font-inter), Crimson Pro for deity/heading (--font-crimson-pro)"

requirements-completed: [READ-01]

duration: 8min
completed: 2026-03-28
---

# Phase 2 Plan 1: Oracle App Scaffold Summary

**Next.js 16 oracle app with shadcn/ui dark theme, typed SSE interfaces matching orb-backend, BFF proxy on Edge Runtime, and Web Audio queue hook**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-28T08:10:41Z
- **Completed:** 2026-03-28T08:18:50Z
- **Tasks:** 2
- **Files modified:** 36

## Accomplishments
- Full Next.js app scaffold with Inter + Crimson Pro fonts, dark mode default, gold accent, deity CSS variables
- 12 shadcn/ui components installed (button, card, input, textarea, badge, dialog, skeleton, separator, scroll-area, tooltip, sheet, avatar)
- SSE types that match orb-backend streaming.py wire format exactly (deity, text, audio, done, error, tts_error)
- BFF proxy route at /api/oracle/read/[deity_id] on Edge Runtime piping SSE from orb-backend
- useOracleSSE hook using named addEventListener (not onmessage) for all 6 event types
- useAudioQueue hook creating AudioContext lazily from user gesture with sequential playback

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 15 project with design system** - `824a60c` (feat)
2. **Task 2: Create SSE types, BFF proxy, and streaming hooks** - `3656227` (feat)

## Files Created/Modified
- `apps/oracle/package.json` - Project manifest with all Phase 2 dependencies
- `apps/oracle/src/app/layout.tsx` - Root layout with ThemeProvider, fonts, metadata
- `apps/oracle/src/app/page.tsx` - Placeholder homepage
- `apps/oracle/src/app/globals.css` - shadcn theme with gold accent, deity CSS vars
- `apps/oracle/src/lib/fonts.ts` - Inter + Crimson Pro font configuration
- `apps/oracle/src/types/sse-events.ts` - Typed SSE event interfaces
- `apps/oracle/src/types/deity.ts` - Deity config and summary types
- `apps/oracle/src/app/api/oracle/read/[deity_id]/route.ts` - BFF SSE proxy (Edge Runtime)
- `apps/oracle/src/hooks/use-sse.ts` - useOracleSSE hook with named event listeners
- `apps/oracle/src/hooks/use-audio-queue.ts` - Web Audio queue with lazy AudioContext
- `apps/oracle/components.json` - shadcn/ui configuration
- `.gitignore` - Added apps/oracle/ to tracked whitelist

## Decisions Made
- Next.js 16 (latest) used instead of specified 15 -- create-next-app installs latest; 16 is the current stable version
- Tailwind CSS v4 shipped by default with create-next-app -- no manual upgrade step needed
- shadcn/ui initialized with base-nova style (current default naming) -- functionally equivalent to planned new-york
- next-auth@beta not installed in Task 1 -- not required until paywall/auth plan, avoids unused beta dependency

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Removed nested .git from create-next-app**
- **Found during:** Task 1 (commit phase)
- **Issue:** create-next-app initializes its own git repo, blocking the parent repo from tracking files
- **Fix:** Removed apps/oracle/.git directory
- **Files modified:** None (git metadata only)
- **Verification:** git add succeeded after removal
- **Committed in:** 824a60c

**2. [Rule 3 - Blocking] Added apps/oracle/ to root .gitignore whitelist**
- **Found during:** Task 1 (commit phase)
- **Issue:** Root .gitignore uses deny-all (`*`) pattern, new apps/ directory was invisible to git
- **Fix:** Added `!apps/`, `!apps/oracle/`, `!apps/oracle/**` whitelist entries
- **Files modified:** .gitignore
- **Verification:** git status shows apps/ as trackable
- **Committed in:** 824a60c

---

**Total deviations:** 2 auto-fixed (both blocking issues)
**Impact on plan:** Both were infrastructure fixes required for git tracking. No scope creep.

## Issues Encountered
- create-next-app interactive prompt required --yes flag for non-interactive execution

## Known Stubs
None -- no stubs in this plan. All files are either structural scaffolding or complete implementations.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- App scaffold ready for reading UI (Plan 02-02)
- SSE types and hooks ready for reading stream component
- BFF proxy ready to forward from orb-backend once it's running
- All 12 shadcn components available for UI development

## Self-Check: PASSED

All 11 key files verified present. Both task commits (824a60c, 3656227) verified in git log.

---
*Phase: 02-oracle-reading-experience*
*Completed: 2026-03-28*
