---
phase: 02-oracle-reading-experience
plan: 04
subsystem: payments
tags: [auth.js, stripe, next-auth, resend, magic-link, paywall, subscription, webhooks]

requires:
  - phase: 02-oracle-reading-experience/01
    provides: Next.js oracle app scaffold with shadcn/ui design system
  - phase: 02-oracle-reading-experience/03
    provides: reading-tracker.ts with canRead(), recordReading(), getReadingsRemaining()

provides:
  - Auth.js v5 with Resend magic link authentication
  - Stripe Checkout subscription flow for $9.99/month Premium
  - Stripe webhook handler with raw body signature verification
  - Stripe Billing Portal for self-service subscription management
  - PaywallGate component checking canRead() with Dialog overlay
  - Pricing page comparing Free vs Premium tiers
  - Account page with tier display and subscription management
  - JSON file user store at data/users.json

affects: [02-05 guidebook-pwa, 03-physical-cards, reading-experience-polish]

tech-stack:
  added: [next-auth@5.0.0-beta.30]
  patterns: [JWT session with tier claim, Stripe webhook raw body verification, controlled Dialog for paywall UX, SessionProvider wrapper for useSession in client components]

key-files:
  created:
    - apps/oracle/src/lib/auth.ts
    - apps/oracle/src/lib/stripe.ts
    - apps/oracle/src/lib/db.ts
    - apps/oracle/src/app/api/auth/[...nextauth]/route.ts
    - apps/oracle/src/app/api/checkout/route.ts
    - apps/oracle/src/app/api/webhooks/stripe/route.ts
    - apps/oracle/src/app/api/billing-portal/route.ts
    - apps/oracle/src/app/auth/verify/page.tsx
    - apps/oracle/src/components/paywall-gate.tsx
    - apps/oracle/src/components/session-provider.tsx
    - apps/oracle/src/app/pricing/page.tsx
    - apps/oracle/src/app/account/page.tsx
    - apps/oracle/src/app/account/account-actions.tsx
  modified:
    - apps/oracle/src/app/layout.tsx
    - apps/oracle/package.json
    - apps/oracle/.gitignore

key-decisions:
  - "JSON file user store (data/users.json) for v1 -- avoids database dependency, focuses plan on payment flow"
  - "Auth.js v5 beta (5.0.0-beta.30) with JWT session strategy -- no database sessions needed"
  - "Stripe SDK uses default API version (2026-03-25.dahlia) from stripe@21"
  - "SessionProvider added to root layout to enable useSession in PaywallGate and PricingPage"
  - "Account page split into server component (auth check) + client component (actions) for Next.js 16 compatibility"

patterns-established:
  - "Paywall UX pattern: canRead() check -> Dialog with paywall copy -> auth step if needed -> Stripe Checkout redirect"
  - "Stripe webhook verification: always use req.text() for raw body, never req.json()"
  - "Auth magic link flow: signIn('resend', {email, redirect:false}) -> show confirmation -> user clicks email link"
  - "SessionProvider wrapper: client component wrapping children, added to root layout for auth context"

requirements-completed: [READ-08, READ-09]

duration: 6min
completed: 2026-03-28
---

# Phase 2 Plan 4: Paywall, Auth, and Stripe Payments Summary

**Auth.js v5 magic link auth with Resend, Stripe subscription checkout at $9.99/month, webhook-driven tier management, and paywall gate with UI-SPEC copy**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-28T16:08:35Z
- **Completed:** 2026-03-28T16:14:50Z
- **Tasks:** 2
- **Files modified:** 17

## Accomplishments
- Auth.js v5 with Resend magic link provider, JWT sessions exposing user tier to client
- Stripe Checkout creating subscription sessions, webhook handler verifying signatures with raw body
- PaywallGate component checking canRead() and showing Dialog with exact UI-SPEC copywriting
- Pricing page with Free vs Premium comparison, Account page with Billing Portal management
- Lightweight JSON file user store supporting CRUD by email and Stripe customer ID

## Task Commits

Each task was committed atomically:

1. **Task 1: Set up Auth.js v5, Stripe SDK, and webhook handler** - `e9c6e7d` (feat)
2. **Task 2: Build paywall gate, pricing page, and account page** - `eae3c87` (feat)

## Files Created/Modified
- `apps/oracle/src/lib/auth.ts` - Auth.js v5 config with Resend magic link, JWT callbacks, tier in session
- `apps/oracle/src/lib/stripe.ts` - Stripe server-side client initialization
- `apps/oracle/src/lib/db.ts` - JSON file user store with CRUD operations
- `apps/oracle/src/app/api/auth/[...nextauth]/route.ts` - NextAuth route handler
- `apps/oracle/src/app/api/checkout/route.ts` - Stripe Checkout session creation (subscription mode)
- `apps/oracle/src/app/api/webhooks/stripe/route.ts` - Webhook handler for 4 event types with signature verification
- `apps/oracle/src/app/api/billing-portal/route.ts` - Stripe Billing Portal session creation
- `apps/oracle/src/app/auth/verify/page.tsx` - Magic link sent confirmation page
- `apps/oracle/src/components/paywall-gate.tsx` - Free tier gate with Dialog, auth flow, checkout redirect
- `apps/oracle/src/components/session-provider.tsx` - Client-side SessionProvider wrapper
- `apps/oracle/src/app/pricing/page.tsx` - Free vs Premium tier comparison with upgrade flow
- `apps/oracle/src/app/account/page.tsx` - Server component with auth check, tier display
- `apps/oracle/src/app/account/account-actions.tsx` - Client actions for manage/upgrade buttons
- `apps/oracle/src/app/layout.tsx` - Added SessionProvider wrapper
- `apps/oracle/package.json` - Added next-auth@beta dependency
- `apps/oracle/.gitignore` - Added data/ directory

## Decisions Made
- JSON file user store for v1 avoids database dependency -- keeps plan focused on payment flow, migrates easily to real DB later
- Auth.js v5 beta with JWT strategy means no database sessions table needed
- Account page split into server + client components because server component handles auth redirect while client component handles button click handlers
- Stripe SDK initialized without explicit apiVersion -- uses default from stripe@21 (2026-03-25.dahlia)
- SessionProvider added to root layout enables useSession() across all client components

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added SessionProvider to root layout**
- **Found during:** Task 2 (paywall gate needs useSession)
- **Issue:** next-auth v5 useSession() requires SessionProvider context, not mentioned in plan
- **Fix:** Created session-provider.tsx wrapper, added to layout.tsx
- **Files modified:** apps/oracle/src/components/session-provider.tsx, apps/oracle/src/app/layout.tsx
- **Verification:** npm run build exits 0, useSession accessible in paywall-gate and pricing
- **Committed in:** eae3c87

**2. [Rule 2 - Missing Critical] Added auth verify page for magic link confirmation**
- **Found during:** Task 1 (auth config references verifyRequest page)
- **Issue:** Auth.js redirects to /auth/verify after magic link submit, page didn't exist
- **Fix:** Created apps/oracle/src/app/auth/verify/page.tsx with confirmation copy
- **Files modified:** apps/oracle/src/app/auth/verify/page.tsx
- **Verification:** Build passes, route renders
- **Committed in:** e9c6e7d

**3. [Rule 2 - Missing Critical] Split account page into server + client components**
- **Found during:** Task 2 (account page implementation)
- **Issue:** Plan described account page as server component with button onClick handlers -- Next.js requires client component for event handlers
- **Fix:** Created account-actions.tsx as client component for buttons, account page.tsx remains server component for auth
- **Files modified:** apps/oracle/src/app/account/page.tsx, apps/oracle/src/app/account/account-actions.tsx
- **Verification:** Build passes, server auth check + client actions both work
- **Committed in:** eae3c87

---

**Total deviations:** 3 auto-fixed (all missing critical functionality)
**Impact on plan:** All three are standard Next.js patterns required for the code to function. No scope creep.

## Issues Encountered
None -- all work completed as planned with the auto-fixes above.

## Known Stubs
None -- all files are complete implementations. The only external dependency is real API keys (Stripe, Resend, AUTH_SECRET) which are documented as placeholder env vars.

## User Setup Required

The following environment variables in `apps/oracle/.env.local` need real values before the payment flow works:

| Variable | Source |
|----------|--------|
| AUTH_SECRET | Generate with `npx auth secret` |
| AUTH_RESEND_KEY | Resend Dashboard -> API Keys |
| EMAIL_FROM | Verified domain in Resend |
| STRIPE_SECRET_KEY | Stripe Dashboard -> Developers -> API keys (test mode) |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe Dashboard -> Developers -> API keys |
| STRIPE_WEBHOOK_SECRET | Stripe Dashboard -> Webhooks or `stripe listen --forward-to` |
| STRIPE_PRICE_ID | Create "Oracle Premium" product at $9.99/month in Stripe Dashboard |

Stripe Dashboard also requires:
- Product creation: "Oracle Premium" with $9.99/month recurring price
- Customer Portal activation: Settings -> Billing -> Customer portal

## Next Phase Readiness
- Paywall gate ready to wrap reading flow components
- Auth and payments infrastructure complete for subscription model
- Account management enables self-service cancellation
- Ready for Plan 02-05 (guidebook and PWA)

## Self-Check: PASSED

All 13 created files verified present. Both task commits (e9c6e7d, eae3c87) verified in git log.

---
*Phase: 02-oracle-reading-experience*
*Completed: 2026-03-28*
