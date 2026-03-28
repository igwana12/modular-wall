---
phase: 02-oracle-reading-experience
plan: 05
subsystem: ui
tags: [pwa, serwist, service-worker, guidebook, next.js, offline, manifest]

requires:
  - phase: 02-oracle-reading-experience
    provides: Next.js oracle app scaffold with shadcn/ui, deity types, BFF proxy

provides:
  - Guidebook index at /guidebook with responsive 21-god grid
  - Individual deity guidebook pages with mythology, keywords, reading style, CTA
  - PWA web app manifest with dark theme and standalone display
  - Serwist service worker with tiered caching strategy
  - Offline fallback page with oracle-themed message
  - Placeholder PWA icons (192x192, 512x512)

affects: [02-paywall, kickstarter-landing]

tech-stack:
  added: [serwist]
  patterns: [Serwist withSerwist wrapper for Next.js 16, tiered runtime caching (CacheFirst/StaleWhileRevalidate/NetworkOnly), mythology extraction from system_prompt, PWA turbopack compatibility]

key-files:
  created:
    - apps/oracle/src/app/guidebook/page.tsx
    - apps/oracle/src/app/guidebook/[deity_id]/page.tsx
    - apps/oracle/src/app/manifest.ts
    - apps/oracle/src/sw.ts
    - apps/oracle/src/app/offline/page.tsx
    - apps/oracle/public/icon-192.png
    - apps/oracle/public/icon-512.png
  modified:
    - apps/oracle/next.config.ts

key-decisions:
  - "Serwist service worker uses any type for self declaration due to ServiceWorkerGlobalScope not available in main tsconfig lib"
  - "Turbopack empty config added for Next.js 16 compatibility with Serwist webpack plugin"
  - "Static metadata export used for guidebook index (no dynamic params) instead of generateMetadata"
  - "Mythology extraction splits system_prompt on 'When giving a reading' marker"

patterns-established:
  - "PWA manifest via Next.js route handler at src/app/manifest.ts"
  - "Tiered caching: PANTHEON art CacheFirst 7d, deity configs StaleWhileRevalidate, readings NetworkOnly"
  - "Offline fallback via Serwist fallbacks.entries with document destination matcher"

requirements-completed: [READ-10]

duration: 7min
completed: 2026-03-28
---

# Phase 2 Plan 5: Guidebook and PWA Summary

**21-god digital guidebook with mythology/keywords/reading-style pages, plus Serwist PWA with tiered caching and offline fallback**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-28T08:22:50Z
- **Completed:** 2026-03-28T08:30:15Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Guidebook index at /guidebook showing all 21 gods in responsive 3/4/5-column grid with deity art, names in deity primary color, and titles
- Individual deity pages at /guidebook/[deity_id] with hero PANTHEON art, mythology extracted from system_prompt, keywords as Badge components, reading style, and gold CTA linking to /read/{deity_id}
- PWA manifest with dark theme (#09090b), standalone display, portrait orientation
- Serwist service worker with PANTHEON art cache-first (7-day expiry), deity configs stale-while-revalidate, reading responses network-only
- Offline fallback: "The oracle requires a connection to Olympus"
- SEO metadata per deity page (name, title, keywords in meta tags)

## Task Commits

Work for this plan was completed across prior execution sessions and verified in this session:

1. **Task 1: Build guidebook index and individual deity pages** - `67706a2` (feat, bundled with 02-03 execution)
2. **Task 2: Configure Serwist PWA** - `8307236` (fix, bundled with 02-02 post-build fixes)

## Files Created/Modified
- `apps/oracle/src/app/guidebook/page.tsx` - Guidebook index with responsive deity grid and static SEO metadata
- `apps/oracle/src/app/guidebook/[deity_id]/page.tsx` - Individual deity page with mythology, keywords, reading style, CTA
- `apps/oracle/src/app/manifest.ts` - PWA web app manifest (dark, standalone, portrait)
- `apps/oracle/src/sw.ts` - Serwist service worker with tiered caching and offline fallback
- `apps/oracle/src/app/offline/page.tsx` - Oracle-themed offline disconnection page
- `apps/oracle/next.config.ts` - Updated with withSerwist wrapper and turbopack config
- `apps/oracle/public/icon-192.png` - Placeholder PWA icon (gold circle on dark)
- `apps/oracle/public/icon-512.png` - Placeholder PWA icon (gold circle on dark)

## Decisions Made
- Used `any` type for service worker `self` declaration since `ServiceWorkerGlobalScope` requires `webworker` lib which conflicts with DOM types in shared tsconfig
- Added empty `turbopack: {}` to next.config.ts for Next.js 16 compatibility (Serwist uses webpack plugin, Turbopack is default in 16)
- Used static `metadata` export for guidebook index instead of `generateMetadata` (no dynamic params needed)
- Mythology text extracted by splitting system_prompt on "When giving a reading" marker, falling back to first 500 chars
- Used plain Link elements with Tailwind classes instead of Button asChild (base-ui Button doesn't support asChild prop)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed asChild usage in reading-stream.tsx**
- **Found during:** Task 1 (build verification)
- **Issue:** Pre-existing `Button asChild` usage in reading-stream.tsx fails with base-ui Button primitive (no asChild prop)
- **Fix:** Replaced Button asChild with plain Link elements styled with Tailwind classes
- **Files modified:** apps/oracle/src/components/reading-stream.tsx
- **Committed in:** 67706a2

**2. [Rule 3 - Blocking] Turbopack compatibility for Serwist**
- **Found during:** Task 2 (build verification)
- **Issue:** Next.js 16 defaults to Turbopack, Serwist uses webpack plugin causing build error
- **Fix:** Added `turbopack: {}` to next.config.ts to acknowledge webpack-only config
- **Committed in:** 8307236

---

**Total deviations:** 2 auto-fixed (both blocking issues)
**Impact on plan:** Both fixes required for successful builds. No scope creep.

## Issues Encountered
- Guidebook pages and PWA files were already created and committed in prior plan executions (02-02 and 02-03). This plan session verified all artifacts exist and meet acceptance criteria rather than creating them fresh.

## Known Stubs
- PWA icons (icon-192.png, icon-512.png) are placeholder gold circles -- need proper branding artwork before launch
- PWA install prompt timing (after first completed reading) is documented in plan but not yet wired to localStorage `oracle_pwa_eligible` flag -- will be addressed when reading flow is fully integrated

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All guidebook pages functional and accessible at /guidebook and /guidebook/{deity_id}
- PWA ready for Add-to-Home-Screen after proper icon branding
- Service worker caching strategies in place for offline support
- Phase 2 oracle reading experience feature set complete

## Self-Check: PASSED

All 8 key files verified present. Both task commits (67706a2, 8307236) verified in git log.

---
*Phase: 02-oracle-reading-experience*
*Completed: 2026-03-28*
