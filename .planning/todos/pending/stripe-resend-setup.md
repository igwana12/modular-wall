---
title: Set up Stripe and Resend API keys for Oracle Cards
priority: high
phase: 02
created: 2026-03-28
type: manual
---

## Stripe (Payment Flow)
1. Go to Stripe Dashboard (test mode)
2. Create product "Oracle Premium" at $9.99/mo recurring
3. Enable Customer Portal
4. Copy keys to `apps/oracle/.env.local`:
   - `STRIPE_SECRET_KEY` — Developers > API keys > Secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Developers > API keys > Publishable key
   - `STRIPE_WEBHOOK_SECRET` — Developers > Webhooks > Add endpoint > Signing secret
   - `STRIPE_PRICE_ID` — Products > Oracle Premium > Price ID

## Resend (Magic Link Auth)
1. Create account at resend.com
2. Verify domain
3. Copy API key to `apps/oracle/.env.local`:
   - `AUTH_RESEND_KEY`

Without these, the paywall gate and auth flow in Phase 2 code won't function.
