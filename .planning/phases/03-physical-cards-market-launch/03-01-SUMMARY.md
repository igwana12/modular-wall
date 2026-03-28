---
phase: 03-physical-cards-market-launch
plan: 01
subsystem: payments, print-pipeline
tags: [qrcode, stripe, svg, checkout, deposit]

# Dependency graph
requires:
  - phase: 02-oracle-reading-experience
    provides: Stripe client library and webhook handler
provides:
  - 21 print-ready SVG QR codes for all Oracle Card deities
  - $1 reservation deposit Stripe Checkout API
  - Webhook handler extension for deposit vs subscription routing
affects: [03-02 (landing page needs deposit API), 03-03 (card design needs QR SVGs)]

# Tech tracking
tech-stack:
  added: [qrcode, tsx (root)]
  patterns: [SVG-only QR generation at Error Correction Level H, metadata-based webhook routing]

key-files:
  created:
    - scripts/generate-qr-codes.ts
    - assets/qr-codes/*.svg (21 files)
    - apps/oracle/src/app/api/deposit/route.ts
    - package.json (root)
  modified:
    - apps/oracle/src/app/api/webhooks/stripe/route.ts
    - apps/oracle/package.json
    - .gitignore

key-decisions:
  - "Root package.json created for monorepo-level scripts (generate:qr)"
  - "Updated .gitignore to track scripts/, assets/, and root package.json"

patterns-established:
  - "QR codes always SVG with Error Correction Level H for print"
  - "Webhook metadata routing: check session.metadata.type before subscription logic"

requirements-completed: [CARD-02, LAUNCH-03]

# Metrics
duration: 2min
completed: 2026-03-28
---

# Phase 03 Plan 01: QR Codes + Deposit API Summary

**21 SVG QR codes generated for all Oracle Card deities plus $1 Stripe Checkout deposit flow with webhook routing**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-28T17:09:58Z
- **Completed:** 2026-03-28T17:12:30Z
- **Tasks:** 2
- **Files modified:** 26

## Accomplishments
- Generated 21 print-ready SVG QR codes encoding permanent deity reading URLs at Error Correction Level H
- Built POST /api/deposit endpoint creating $1 Stripe Checkout sessions with refundable deposit language
- Extended webhook handler to route deposit events separately from subscription events

## Task Commits

Each task was committed atomically:

1. **Task 1: QR code generation script for all 21 deities** - `cb73fa9` (feat)
2. **Task 2: $1 deposit API route and webhook extension** - `e684eb1` (feat)

## Files Created/Modified
- `scripts/generate-qr-codes.ts` - Reads deity configs, generates SVG QR codes
- `assets/qr-codes/*.svg` - 21 SVG QR codes, one per deity
- `apps/oracle/src/app/api/deposit/route.ts` - $1 deposit Stripe Checkout session creation
- `apps/oracle/src/app/api/webhooks/stripe/route.ts` - Added reservation_deposit metadata guard
- `package.json` (root) - Monorepo-level scripts and qrcode dependency
- `apps/oracle/package.json` - Added qrcode and @types/qrcode dependencies
- `.gitignore` - Added scripts/, assets/, package.json to allowlist

## Decisions Made
- Created root package.json for monorepo-level tooling scripts -- qrcode runs outside apps/oracle context
- Updated .gitignore allowlist for scripts/ and assets/ directories (monorepo uses deny-by-default pattern)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] .gitignore deny-all pattern blocked new directories**
- **Found during:** Task 1 (QR code generation)
- **Issue:** Root .gitignore uses `*` deny-all with explicit allowlist; scripts/ and assets/ were not tracked
- **Fix:** Added allowlist entries for scripts/, assets/, and root package.json
- **Files modified:** .gitignore
- **Verification:** git add succeeded after update
- **Committed in:** cb73fa9 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary for git tracking. No scope creep.

## Issues Encountered
None beyond the .gitignore blocking issue documented above.

## User Setup Required
None - no external service configuration required. Stripe keys are already configured from Phase 02.

## Known Stubs
None - all endpoints are fully wired to Stripe API. QR codes encode production URLs.

## Next Phase Readiness
- 21 SVG QR codes ready for card design integration (03-02)
- Deposit API ready for landing page integration (03-02)
- Webhook handler ready for production deposit processing

---
*Phase: 03-physical-cards-market-launch*
*Completed: 2026-03-28*
