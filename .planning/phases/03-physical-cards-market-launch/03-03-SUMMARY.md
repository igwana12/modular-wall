---
phase: 03-physical-cards-market-launch
plan: 03
subsystem: email, payments
tags: [kit, convertkit, email-marketing, stripe-webhook, subscriber-tagging]

# Dependency graph
requires:
  - phase: 03-physical-cards-market-launch
    provides: Stripe deposit API and webhook handler (Plan 01), landing page with deposit CTA (Plan 02)
provides:
  - Kit (ConvertKit) API client with graceful degradation
  - /api/subscribe endpoint for email-only signups
  - Webhook extension tagging depositors as VIP in Kit
  - deposit-cta.tsx wired to /api/subscribe for non-deposit signups
affects: [email-sequences, kickstarter-campaign, 03-04]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Kit API integration with graceful degradation when credentials not set", "Fire-and-forget email tagging (non-critical path)"]

key-files:
  created:
    - apps/oracle/src/lib/kit.ts
    - apps/oracle/src/app/api/subscribe/route.ts
  modified:
    - apps/oracle/src/app/api/webhooks/stripe/route.ts
    - apps/oracle/src/components/deposit-cta.tsx
    - apps/oracle/.env.local

key-decisions:
  - "Kit calls are fire-and-forget: errors logged but never thrown, deposit/signup flow unaffected"
  - "Task 1 (domain purchase) deferred -- user will purchase oracleball.ai separately"

patterns-established:
  - "Kit integration pattern: check KIT_API_SECRET before any call, warn and return if missing"
  - "Secondary CTA pattern: button posts to /api/subscribe, shows success state inline"

requirements-completed: [LAUNCH-01, LAUNCH-02]

# Metrics
duration: 3min
completed: 2026-03-29
---

# Phase 03 Plan 03: Domain + Email Marketing Summary

**Kit (ConvertKit) API client with VIP deposit tagging, email-only subscribe endpoint, and landing page CTA wiring -- all gracefully degrading without Kit credentials**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-29T01:40:27Z
- **Completed:** 2026-03-29T01:43:01Z
- **Tasks:** 1 completed, 1 deferred
- **Files modified:** 4

## Accomplishments
- Kit API client (`lib/kit.ts`) with `addSubscriber` and `addToForm` functions, both silently skipping when Kit credentials are not configured
- Extended Stripe webhook to tag $1 depositors as "vip-deposit" in Kit, triggering VIP email sequence
- Created `/api/subscribe` endpoint for email-only signups with email validation and dual Kit calls (form + tag)
- Updated deposit-cta.tsx secondary button from anchor link to functional subscribe button with loading/success states
- Kit environment variables documented in `.env.local`

## Task Commits

Each task was committed atomically:

1. **Task 1: Purchase oracleball.ai domain and configure DNS** - DEFERRED (user will purchase separately)
2. **Task 2: Kit email integration and deposit-to-tag wiring** - `3ee5cec` (feat)

## Files Created/Modified
- `apps/oracle/src/lib/kit.ts` - Kit API client with addSubscriber and addToForm, graceful degradation
- `apps/oracle/src/app/api/subscribe/route.ts` - POST endpoint for email-only signups
- `apps/oracle/src/app/api/webhooks/stripe/route.ts` - Added Kit VIP tagging in deposit branch
- `apps/oracle/src/components/deposit-cta.tsx` - Secondary CTA wired to /api/subscribe with inline success state
- `apps/oracle/.env.local` - Added KIT_API_SECRET, KIT_FORM_ID, KIT_TAG_VIP_DEPOSIT, KIT_TAG_EMAIL_ONLY

## Decisions Made
- Kit calls are fire-and-forget: errors logged but never thrown -- email tagging is non-critical and must never break the deposit or signup flow
- Task 1 (domain purchase) deferred per user request -- code works without domain, oracleball.ai can be purchased and configured at any time
- Email validation added to /api/subscribe endpoint (Rule 2: missing input validation)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added email validation to /api/subscribe**
- **Found during:** Task 2 (subscribe endpoint)
- **Issue:** Plan did not specify input validation on the email-only signup endpoint
- **Fix:** Added basic email format validation with regex before calling Kit APIs
- **Files modified:** apps/oracle/src/app/api/subscribe/route.ts
- **Verification:** Build passes, invalid emails rejected with 400
- **Committed in:** 3ee5cec (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Essential for preventing junk data in Kit subscriber list. No scope creep.

## Deferred Tasks

### Task 1: Domain Purchase (oracleball.ai)
- **Status:** Deferred per user request
- **What's needed:** Purchase oracleball.ai at Cloudflare Registrar ($140 for 2 years), configure DNS A record to 76.76.21.21, CNAME www to cname.vercel-dns.com, add domain in Vercel project settings
- **Impact:** Landing page accessible via Vercel default URL until domain is configured. All code works without the custom domain.

## Issues Encountered
None

## User Setup Required
- Create Kit (ConvertKit) account at kit.com (free tier supports up to 10K subscribers)
- Create a form and two tags ("vip-deposit", "email-only") in Kit dashboard
- Set environment variables in Vercel: KIT_API_SECRET, KIT_FORM_ID, KIT_TAG_VIP_DEPOSIT, KIT_TAG_EMAIL_ONLY
- Purchase and configure oracleball.ai domain (deferred Task 1)

## Known Stubs
None -- all endpoints are fully wired. Kit calls gracefully degrade to no-ops when credentials are not set, which is intentional behavior, not a stub.

## Next Phase Readiness
- Email marketing infrastructure code complete, activates when Kit credentials are provided
- Deposit flow end-to-end: user deposits $1 -> webhook fires -> Kit tags as VIP -> email sequence triggers
- Email-only flow: user subscribes -> /api/subscribe -> Kit form + tag
- Ready for Plan 04 (card design / print production)

---
*Phase: 03-physical-cards-market-launch*
*Completed: 2026-03-29*
