# Phase 3: Physical Cards + Market Launch - Research

**Researched:** 2026-03-28
**Domain:** Print-on-demand card production, QR code generation for print, landing page with payment, email marketing
**Confidence:** HIGH

## Summary

Phase 3 bridges the digital oracle experience (Phase 2) into a physical product and revenue validation channel. The core work splits into four tracks: (1) designing 21 print-ready card files with QR codes, (2) ordering through a print-on-demand partner, (3) building a landing page with $1 reservation deposits, and (4) setting up email marketing for pre-launch engagement. The existing oracle app already has Stripe integration (checkout + webhooks) and Auth.js, so the landing page and deposit flow extend what exists rather than starting fresh.

The print-on-demand market for tarot/oracle cards is mature. MakePlayingCards is the strongest option for this project -- lower per-unit cost, no minimum order, tarot tuck box support, and gilded edge options for premium positioning. The Game Crafter is the backup. DriveThruCards offers a marketplace but weaker packaging options. QR codes at Error Correction Level H need at least 1" x 1" (2.5cm x 2.5cm) on the card face to scan reliably -- achievable on 2.75" x 4.75" tarot cards with careful layout.

**Primary recommendation:** Use MakePlayingCards for print production, generate QR codes as SVG via the `qrcode` npm package (already in stack), build the landing page as a new route in the existing Next.js app, and use Kit (ConvertKit) for email marketing given its proven crowdfunding track record.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- 21 cards, one per Greek god in the PANTHEON collection
- Tarot size: 2.75" x 4.75"
- Print-ready: 300 DPI, CMYK, 0.125" bleed on all sides
- PANTHEON art as primary visual on each card
- QR code on each card linking to permanent reading URL
- Consistent layout and branding across all 21 cards
- Figma for card layout design (community tarot templates available)
- Print-on-demand from day one -- NOT self-printed
- Game Crafter or MakePlayingCards as print partners
- Card packaging with brand identity and instructions
- QR codes generated server-side via `qrcode` npm package (1.5.x)
- Error correction Level H (highest -- for small card print)
- Each QR resolves to `https://oracleball.ai/read/{deity_id}`
- URLs must be permanent (no link rot -- CARD-02 requirement)
- Same Next.js codebase as oracle app (`apps/oracle/`)
- Email capture with $1 reservation deposit via Stripe
- ConvertKit or Loops for email sequences
- Target: first 100 paid readings

### Claude's Discretion
- oracleball.ai domain purchase and configuration (RESEARCH NEEDED)
- ConvertKit vs Loops selection (RESEARCH NEEDED)
- Email sequence content and structure

### Deferred Ideas (OUT OF SCOPE)
- NFC chip integration in cards (v2, adds $0.50-1.00/card)
- AR card experience with 3D animated deity (v2)
- Mystery pack / digital-first commerce model (future)
- Customized physical card delivery (future)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CARD-01 | 21 card designs using PANTHEON art with consistent layout/branding | Figma template workflow, Print for Figma plugin for CMYK/bleed, card dimension specs |
| CARD-02 | QR code on each card linking to permanent URL for that god's reading | `qrcode` npm SVG generation at Level H, minimum 1" size, URL structure research |
| CARD-03 | Cards printed via print-on-demand service (Game Crafter or MakePlayingCards) | Full pricing comparison of MPC vs TGC vs DriveThruCards, card stock, turnaround |
| CARD-04 | Card packaging with brand identity and instructions | Tuck box pricing, instruction card/booklet options, packaging research |
| LAUNCH-01 | Landing page at oracleball.ai with email capture | Domain registration (.ai at $70/yr via Cloudflare), Vercel custom domain, landing page patterns |
| LAUNCH-02 | Email list of 5,000+ signups before full launch | Kit (ConvertKit) vs Loops comparison, pre-launch drip sequence patterns |
| LAUNCH-03 | $1 reservation deposit system for early access | Stripe Checkout session for one-time $1 charge, refund policy patterns |
| LAUNCH-04 | Revenue validation: first 100 paid readings | Vercel Analytics for conversion tracking, existing Stripe subscription tracking |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.1 | Web app + landing page | Already the oracle app framework. Landing page is a new route. |
| Stripe | 21.0.1 | $1 deposits + subscriptions | Already integrated with checkout and webhook handler |
| next-auth | 5.0.0-beta.30 | Auth for saved readings | Already configured with magic link |
| Tailwind CSS | 4.x | Styling | Already in use across oracle app |
| shadcn/ui | latest | UI components | Already configured with base-nova style |

### New for Phase 3
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| qrcode | 1.5.4 | Server-side QR SVG generation | Generate print-ready QR codes for all 21 cards |
| @vercel/analytics | latest | Page view + event tracking | Track landing page conversions and reading completions |

### External Services
| Service | Purpose | Cost |
|---------|---------|------|
| MakePlayingCards | Print-on-demand card production | ~$14-22/deck (21 cards + tuck box) |
| Kit (ConvertKit) | Email marketing + drip sequences | $0/mo (free up to 10K subscribers) then $39/mo |
| Cloudflare Registrar | oracleball.ai domain | $70/yr (2-year minimum = $140) |
| Vercel | Hosting + custom domain | Free tier (sufficient for launch) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| MakePlayingCards | The Game Crafter | TGC is $2.84/sheet (10 cards) + $2.79 tuck box = ~$12-16/deck. Higher per-unit but US-based, faster shipping. Use TGC if speed matters more than margin. |
| MakePlayingCards | DriveThruCards | DTC has a built-in marketplace (discovery) but weaker packaging (cellophane wrap, no custom tuck box for small runs). Good for digital-first distribution later. |
| Kit (ConvertKit) | Loops | Loops is cheaper at scale ($49/mo for 5-10K subs) and has unlimited automations on free plan, but lacks crowdfunding-specific features and community. Kit is the crowdfunding standard -- LaunchBoom, Kickstarter official blog, and most successful campaigns use it. |
| Vercel Analytics | PostHog / Plausible | Vercel Analytics is zero-config with Next.js, free tier covers basic needs. PostHog adds self-hosted option but is overkill for launch validation. |

**Installation (new packages only):**
```bash
cd apps/oracle && npm install qrcode @types/qrcode @vercel/analytics
```

## Architecture Patterns

### Card Design Pipeline
```
Figma Template (master)
  |
  +--> 21 card fronts (deity art + name + title + QR + number)
  |      Each card: 2.75" x 4.75" + 0.125" bleed = 3.0" x 5.0" canvas
  |      300 DPI = 900 x 1500 pixels
  |
  +--> 1 card back (universal mystical/oracle design)
  |
  +--> 1 instruction card (QR usage guide)
  |
  +--> 1 tuck box design (front, back, spine, flaps)
  |
  Export: Print for Figma plugin --> CMYK PDF at 300 DPI with bleed marks
```

### QR Code Generation Flow
```
scripts/generate-qr-codes.ts
  |
  +--> Read 21 deity IDs from services/orb-backend/gods/*.json
  |
  +--> For each deity:
  |      qrcode.toFile(`qr-${deity.id}.svg`, `https://oracleball.ai/read/${deity.id}`, {
  |        errorCorrectionLevel: 'H',
  |        type: 'svg',
  |        margin: 2,
  |        width: 300  // pixels at output, scales infinitely as SVG
  |      })
  |
  +--> Output: 21 SVG files ready for Figma import
```

### Landing Page Architecture
```
apps/oracle/src/app/
  |--> page.tsx                    # Existing homepage (daily card + gallery)
  |--> (landing)/
  |      |--> page.tsx             # Landing page at oracleball.ai root
  |      |--> layout.tsx           # Landing-specific layout (no app chrome)
  |
  |--> api/
  |      |--> checkout/route.ts    # EXISTING: subscription checkout
  |      |--> deposit/route.ts     # NEW: $1 deposit checkout session
  |      |--> webhooks/stripe/     # EXISTING: webhook handler (extend)
```

**Key architectural decision:** The landing page should be the root route (`/`) when visiting oracleball.ai, with the existing oracle app content accessible via navigation. This means either:
- Option A: Replace current `page.tsx` with a landing page that links to `/oracle` for the app experience
- Option B: Use route groups -- `(landing)/page.tsx` for marketing, `(app)/page.tsx` for the oracle experience, controlled by middleware based on auth state or explicit navigation

**Recommendation: Option A** -- simpler. The landing page IS the front door. Logged-in users navigate to their dashboard/daily card from there.

### $1 Deposit Flow
```
User visits oracleball.ai
  --> Sees landing page with value proposition
  --> Clicks "Reserve Early Access - $1"
  --> POST /api/deposit creates Stripe Checkout Session:
      - mode: 'payment' (one-time, NOT subscription)
      - amount: 100 (cents)
      - metadata: { type: 'reservation_deposit' }
      - success_url: /reserved?session_id={CHECKOUT_SESSION_ID}
      - customer_email collection enabled
  --> Stripe Checkout page (hosted or embedded)
  --> On success: webhook fires, email captured, user tagged in Kit
  --> Success page: "You're in! Check your email."
```

### Anti-Patterns to Avoid
- **Generating QR codes as PNG for print:** Always use SVG. PNG at any resolution can show artifacts when scaled. SVG is vector -- infinite resolution.
- **Using Error Correction Level L on small cards:** Level H tolerates up to 30% damage/obstruction. On a 2.75" card where the QR is ~1" square, Level H is mandatory.
- **Hardcoding deity data in card designs:** Pull deity names, titles, and IDs from the existing JSON configs. Single source of truth.
- **Building email collection without Stripe:** A bare email form gets 3-5% conversion. A $1 deposit gets 20-40% conversion to actual purchase. Always pair email with deposit.
- **Using Stripe Payment Links for deposits:** Payment Links work but give no control over the post-payment experience. Use Stripe Checkout Sessions via API for full control of success/cancel URLs and metadata.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| QR code generation | Custom QR encoder | `qrcode` npm (1.5.4) | QR encoding has edge cases around character encoding, error correction polynomial math. The package handles all of this. |
| CMYK PDF export | Manual color conversion | Print for Figma plugin | RGB-to-CMYK conversion is profile-dependent. The plugin handles ICC profiles correctly. |
| Email drip sequences | Custom email scheduler | Kit (ConvertKit) | Deliverability, unsubscribe compliance, bounce handling, analytics. Not worth building. |
| Payment processing | Custom charge flow | Stripe Checkout | PCI compliance, card validation, 3D Secure, fraud detection. Stripe handles everything. |
| Analytics | Custom event tracking | Vercel Analytics | Privacy-compliant, zero-config, already works with Next.js. |

**Key insight:** Phase 3 is primarily a design + integration phase, not a build-from-scratch phase. The oracle app exists. Stripe exists. The QR library exists. The work is connecting these pieces and producing physical card assets.

## Common Pitfalls

### Pitfall 1: QR Codes Too Small to Scan
**What goes wrong:** QR code printed at < 0.75" on card, phones can't focus or decode at arm's length.
**Why it happens:** Designer tries to minimize QR footprint to preserve art space.
**How to avoid:** Minimum 1" x 1" (2.5cm x 2.5cm) QR code on card. With Level H error correction, the QR is denser (more modules), so it needs MORE space, not less. Test with 3-5 phones before print run.
**Warning signs:** QR looks "busy" or "crowded" at print size. If you can't count individual modules by eye, it's too small.

### Pitfall 2: RGB Art Printed as CMYK Looks Dull
**What goes wrong:** Vibrant digital art (RGB) loses saturation when converted to CMYK for print. Blues and purples suffer most.
**Why it happens:** CMYK gamut is smaller than RGB. Neon/electric colors have no CMYK equivalent.
**How to avoid:** Use Print for Figma plugin to preview CMYK conversion BEFORE ordering. Adjust art saturation up 10-15% to compensate. Order a single proof before bulk. PANTHEON art was created digitally (Midjourney) so this WILL be an issue.
**Warning signs:** Deep blues turning muddy, electric purples going flat, skin tones shifting warm.

### Pitfall 3: URL Structure Changes Break QR Codes
**What goes wrong:** Cards are printed with QR codes pointing to URLs that later change or break.
**Why it happens:** Route restructuring, domain change, or deity ID renaming after cards are printed.
**How to avoid:** QR URLs (`oracleball.ai/read/{deity_id}`) must be treated as PERMANENT. The 21 deity IDs (`zeus`, `apollo`, `athena`, etc.) are carved in stone once cards are printed. Add a redirect layer if the underlying app route ever changes.
**Warning signs:** Any discussion of renaming deity IDs or changing URL structure.

### Pitfall 4: $1 Deposits Without Clear Refund Policy
**What goes wrong:** Chargebacks and complaints when deposit terms are ambiguous.
**Why it happens:** Customers expect refundability but it's not stated.
**How to avoid:** Explicitly state "$1 fully refundable deposit" on the landing page and in the Stripe Checkout description. Keep Stripe balance sufficient for refunds. Document terms in a simple /terms page.
**Warning signs:** Missing refund language on checkout page.

### Pitfall 5: Print Bleed Not Included
**What goes wrong:** White edges visible on printed cards where art should extend to the edge.
**Why it happens:** Designer uses exact card dimensions (2.75" x 4.75") without extending art into the bleed zone.
**How to avoid:** Canvas must be 3.0" x 5.0" (card + 0.125" bleed on each side). Art extends to canvas edge. Text/logos stay 0.125" INSIDE the trim line (safe zone). This means a 0.25" border between text and canvas edge.
**Warning signs:** Art stops at the trim line instead of extending past it.

### Pitfall 6: Ordering Bulk Before Proofing
**What goes wrong:** 100+ decks arrive with color issues, QR scan failures, or layout errors.
**Why it happens:** Skipping the single-proof step to save time/money.
**How to avoid:** Order exactly 1 deck first. Test every QR code with multiple phones. Check color accuracy against screen. THEN order bulk.
**Warning signs:** Any discussion of ordering more than 5 decks before physical validation.

## Code Examples

### QR Code Generation Script
```typescript
// scripts/generate-qr-codes.ts
// Source: qrcode npm docs + CLAUDE.md stack spec
import QRCode from 'qrcode';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const GODS_DIR = 'services/orb-backend/gods';
const OUTPUT_DIR = 'assets/qr-codes';
const BASE_URL = 'https://oracleball.ai/read';

async function generateAllQRCodes() {
  const files = await readdir(GODS_DIR);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const god = JSON.parse(await readFile(join(GODS_DIR, file), 'utf-8'));
    const url = `${BASE_URL}/${god.id}`;

    // Generate SVG for print (vector, infinite resolution)
    await QRCode.toFile(
      join(OUTPUT_DIR, `${god.id}.svg`),
      url,
      {
        errorCorrectionLevel: 'H',
        type: 'svg',
        margin: 2,
        width: 300,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      }
    );

    console.log(`Generated QR for ${god.name}: ${url}`);
  }
}

generateAllQRCodes();
```

### $1 Deposit API Route
```typescript
// apps/oracle/src/app/api/deposit/route.ts
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const { email } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Oracle Cards - Early Access Reservation',
            description: 'Fully refundable $1 deposit. Secures early-bird pricing.',
          },
          unit_amount: 100, // $1.00
        },
        quantity: 1,
      },
    ],
    customer_email: email || undefined,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/reserved?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?cancelled=true`,
    metadata: {
      type: 'reservation_deposit',
    },
  });

  return NextResponse.json({ url: session.url });
}
```

### Vercel Analytics Setup
```typescript
// apps/oracle/src/app/layout.tsx (add to existing)
import { Analytics } from '@vercel/analytics/react';

// Inside the root layout JSX, add:
<Analytics />
```

## Print-on-Demand Comparison

### MakePlayingCards (RECOMMENDED)
| Attribute | Details |
|-----------|---------|
| Card size | 2.75" x 4.75" (standard tarot) |
| Card stock | 300gsm card stock, matte/glossy/linen finish options |
| Min order | 1 deck (no minimum) |
| Per-deck cost (22 cards) | ~$14-18 depending on finish |
| Tuck box | Custom printed, $1.15/box standalone or included in deck bundle |
| Gilded edges | Available (only POD service offering this) |
| Turnaround | 7-15 business days production + shipping |
| Shipping to US | $5.65 |
| Bulk discount | Significant at 50+ units |
| Upload format | PDF, PNG, JPG (300 DPI, CMYK) |

### The Game Crafter (BACKUP)
| Attribute | Details |
|-----------|---------|
| Card size | 2.75" x 4.75" (standard tarot) |
| Card stock | 12pt 320gsm black-core matte |
| Min order | 1 deck |
| Per-sheet cost | $2.84 (10 cards/sheet) -- 3 sheets for 22 cards = $8.52 |
| Tuck box | $2.79 (40-card tarot tuck box) |
| Total per deck | ~$11.31 base + $0.50-0.75 finishing |
| UV coating | +$0.25/sheet |
| Turnaround | 5-10 business days production |
| Shipping to US | $8.99 |
| Bulk discount | ~30% at 100 units, ~45% at 500 units |
| Upload format | PNG (300 DPI, CMYK) |

### DriveThruCards (MARKETPLACE OPTION)
| Attribute | Details |
|-----------|---------|
| Card size | Tarot size available |
| Card stock | Low-gloss AQ satin coating, double-sided |
| Min order | 10 cards |
| Custom tuck box | Available for tarot decks |
| Pricing | Use their calculator -- variable by card count/finish |
| Advantage | Built-in marketplace with discovery |
| Disadvantage | Less packaging control, marketplace takes revenue share |

### Recommendation
**Use MakePlayingCards** for the initial run. Reasons:
1. Best packaging options (custom tuck box standard)
2. Gilded edges available for premium feel
3. No minimum order -- print 1 proof, then scale
4. Lower per-unit cost at small quantities
5. 35+ years in business, reliable quality

**Use Game Crafter** if you need faster US shipping or want to list on their marketplace for discovery.

## QR Code Specifications for Print

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Error correction | Level H (30%) | Small print area needs maximum error tolerance |
| Minimum physical size | 1" x 1" (2.5cm) | Level H is denser -- needs more space than lower levels |
| Recommended size | 1.25" x 1.25" | 30% buffer over minimum for reliable scanning |
| Format | SVG | Vector scales to any DPI without artifacts |
| Color | Black on white | Maximum contrast for scanning. NO artistic QR colors. |
| Quiet zone | Minimum 4 modules (2 module margin in code + 2 module white space on card) |
| URL length | 30-35 chars (`https://oracleball.ai/read/zeus`) | Short URLs = fewer modules = larger modules = easier scan |
| Testing | 3-5 phones at actual print size BEFORE bulk order | Must pass: iPhone (latest + 2 old), Android mid-range, Android budget |

### Card Layout Zones
```
+----------------------------------+  3.0" x 5.0" (with bleed)
|  BLEED (0.125")                  |
|  +----------------------------+  |  2.75" x 4.75" (trim)
|  |  SAFE ZONE (0.125" inside) |  |
|  |  +----------------------+  |  |  2.5" x 4.5" (safe)
|  |  |                      |  |  |
|  |  |   PANTHEON ART       |  |  |
|  |  |   (deity image)      |  |  |
|  |  |                      |  |  |
|  |  |   +-----------+      |  |  |
|  |  |   | I - ZEUS  |      |  |  |  Card number + name
|  |  |   |King of Gods|     |  |  |  Title
|  |  |   +-----------+      |  |  |
|  |  |                      |  |  |
|  |  |      +------+        |  |  |
|  |  |      | QR   |        |  |  |  1.25" x 1.25" QR code
|  |  |      | CODE |        |  |  |
|  |  |      +------+        |  |  |
|  |  +----------------------+  |  |
|  +----------------------------+  |
+----------------------------------+
```

## Domain Setup: oracleball.ai

### Registration
| Step | Details |
|------|---------|
| Registrar | Cloudflare Registrar ($70/yr, 2-year minimum = $140) |
| Alternative | Namecheap ($93/yr -- more expensive) |
| Requirement | .ai domains require 2-year minimum registration |
| Timeline | Registration is instant; DNS propagation takes minutes |

### Vercel Configuration
1. Register oracleball.ai at Cloudflare
2. In Vercel project settings > Domains, add `oracleball.ai`
3. Configure DNS at Cloudflare:
   - Apex domain: A record `@` -> `76.76.21.21`
   - www subdomain: CNAME `www` -> `cname.vercel-dns.com`
4. Vercel auto-provisions SSL certificate
5. Redirect www to apex (or vice versa) in Vercel settings

### Cost
- Domain: $140 (2 years)
- Vercel hosting: $0 (free tier)
- Total: $140 one-time + $70/yr renewal

## Email Marketing: Kit (ConvertKit) -- RECOMMENDED

### Why Kit over Loops
| Factor | Kit (ConvertKit) | Loops |
|--------|------------------|-------|
| Free tier | Up to 10,000 subscribers | Up to 1,000 contacts |
| Paid pricing | $39/mo for 1K subs (Creator plan) | $49/mo for 5-10K subs |
| Crowdfunding track record | Industry standard (LaunchBoom, Kickstarter blog) | None |
| Visual automation builder | Yes | Yes (unlimited on free) |
| Landing page builder | Yes (included) | Limited |
| Integration with Stripe | Native | Via API |
| Tagging/segmentation | Robust | Basic |
| Community/templates | Extensive crowdfunding templates | Startup/SaaS focused |

**Verdict:** Kit wins for this use case. The crowdfunding ecosystem runs on Kit. Pre-built templates for reservation funnels, VIP sequences, and launch countdowns exist. Loops is better for SaaS transactional email but lacks the crowdfunding community knowledge.

### Pre-Launch Email Sequence (5 emails)
| # | Trigger | Subject Pattern | Content |
|---|---------|-----------------|---------|
| 1 | $1 deposit | "You're in. Here's what happens next." | Confirm deposit, explain early-bird pricing, invite to Discord |
| 2 | Day +2 | "Meet your first oracle" | Showcase one deity (Zeus), preview the reading experience |
| 3 | Day +5 | "The mythology behind the cards" | Sacred Circuits origin story, PANTHEON art showcase |
| 4 | Day +10 | "Early access is almost here" | Build urgency, show progress photos of physical cards |
| 5 | Day +14 | "Your oracle deck ships next week" | Final CTA, share with friends for bonus content |

### Non-VIP Sequence (email-only signups)
| # | Trigger | Content |
|---|---------|---------|
| 1 | Email signup | Welcome + CTA to upgrade to VIP ($1 deposit) |
| 2 | Day +3 | Free sample reading + CTA to deposit |

## Revenue Validation Strategy

### Tracking First 100 Paid Readings (LAUNCH-04)
The existing Stripe webhook already handles `checkout.session.completed` for subscriptions. Revenue tracking requires:

1. **Stripe Dashboard** -- filter payments by product/price to count subscriptions
2. **Vercel Analytics** -- custom events for reading completions:
   ```typescript
   import { track } from '@vercel/analytics';
   track('reading_completed', { deity: deityId, tier: userTier });
   ```
3. **JSON user store** -- existing `data/users.json` already tracks user tiers

### Metrics to Track
| Metric | Tool | Target |
|--------|------|--------|
| Landing page visitors | Vercel Analytics | 10,000+ |
| Email signups | Kit dashboard | 5,000+ (LAUNCH-02) |
| $1 deposits | Stripe Dashboard | 500+ (10% of signups) |
| Deposit-to-subscriber conversion | Stripe | 20-40% of depositors |
| Paid readings completed | Vercel Analytics custom events | 100+ (LAUNCH-04) |
| QR scan to reading start | Vercel Analytics | < 3 seconds (READ-01) |

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| ConvertKit branding | Kit (rebranded) | Late 2025 | Same product, new name. All docs reference "Kit" now. |
| next-pwa for PWA | Serwist | 2024 | Already using Serwist in Phase 2. |
| Stripe Checkout hosted only | Embedded Checkout option | 2024 | Can now embed checkout directly in page without redirect. Consider for $1 deposit. |
| Print for Figma basic | Print for Figma with CMYK + bleed | 2024 | Plugin now handles full print workflow. |

## Open Questions

1. **oracleball.ai domain availability**
   - What we know: .ai domains are open registration, $70/yr at Cloudflare
   - What's unclear: Whether `oracleball.ai` specifically is available (must check registrar)
   - Recommendation: Check Cloudflare/Namecheap immediately. Have backup domain ready (theoracle.ai, oraclecards.ai)

2. **Card numbering system**
   - What we know: CONTEXT.md suggests Roman numerals I-XXI like Major Arcana
   - What's unclear: The ordering -- alphabetical by deity name? By mythological hierarchy?
   - Recommendation: Use mythological significance: I=Zeus, II=Hera, III=Poseidon, IV=Hades, etc. (Olympian hierarchy)

3. **Instruction card content**
   - What we know: Should explain QR code usage
   - What's unclear: Physical size (same as oracle cards or smaller?), content depth
   - Recommendation: Same tarot size, both sides. Front: "How to use your Oracle Cards" with QR scan instructions. Back: brief Sacred Circuits branding + website URL.

4. **MakePlayingCards vs Game Crafter final decision**
   - What we know: MPC is cheaper per-unit with better packaging; TGC has faster US shipping
   - What's unclear: Actual print quality comparison for PANTHEON art
   - Recommendation: Order 1 proof from each. Cost: ~$30 total. Compare quality, then commit.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | QR generation script | TBD (check at execution) | -- | -- |
| npm `qrcode` | CARD-02 QR generation | Not yet installed | 1.5.4 target | -- |
| Figma | CARD-01 card design | External tool (browser) | Latest | -- |
| Print for Figma plugin | CMYK export | Figma plugin marketplace | Latest | Manual CMYK conversion in Photoshop |
| Stripe account | LAUNCH-03 deposits | Already configured (Phase 2) | -- | -- |
| Vercel account | LAUNCH-01 hosting | Already configured (Phase 2) | -- | -- |
| Kit (ConvertKit) account | LAUNCH-02 email | Not yet created | -- | Loops as fallback |
| Cloudflare account | Domain registration | Existing (Cloudflare Tunnels in use) | -- | Namecheap |

**Missing dependencies with no fallback:**
- None -- all external services are sign-up based

**Missing dependencies with fallback:**
- Kit account: need to create, free tier sufficient for launch
- oracleball.ai domain: need to purchase, backup domains available

## Project Constraints (from CLAUDE.md)

- **Budget**: $2-5K total pre-Kickstarter. Phase 3 spend estimate: $140 (domain) + $30 (proof decks) + $0 (Kit free tier) + $0 (Vercel free tier) = ~$170 minimum
- **Infrastructure**: Self-host on existing Smithers stack. Landing page on Vercel (already deployed).
- **Timeline**: Cards target market validation within 2-3 months from April 2026
- **Open source**: Card designs and art are PROPRIETARY (not open source). Only hardware is open.
- **Next.js warning**: `apps/oracle/AGENTS.md` warns that this Next.js version has breaking changes -- always check `node_modules/next/dist/docs/` before writing code

## Sources

### Primary (HIGH confidence)
- [The Game Crafter Tarot Deck](https://www.thegamecrafter.com/make/products/TarotDeck) - Pricing: $2.84/sheet, 10 cards/sheet
- [MakePlayingCards Custom Tarot](https://www.makeplayingcards.com/promotional/personalized-tarot-cards.html) - Tarot size, custom tuck box, no minimum
- [qrcode npm package](https://github.com/soldair/node-qrcode) - v1.5.4, SVG output, error correction levels
- [Vercel Custom Domain Docs](https://vercel.com/docs/domains/working-with-domains/add-a-domain) - DNS configuration
- [Stripe Checkout Docs](https://docs.stripe.com/payments/checkout) - Embedded and hosted checkout
- [Print for Figma Plugin](https://www.figma.com/community/plugin/874441781480244375/print-for-figma-cmyk-bleed-crop-marks-dpi) - CMYK, bleed, crop marks
- Existing codebase: `apps/oracle/src/app/api/webhooks/stripe/route.ts` - Working Stripe webhook handler
- Existing codebase: `apps/oracle/package.json` - Stripe 21.0.1 already installed

### Secondary (MEDIUM confidence)
- [QR Code Size Guide 2026 (QRTRAC)](https://qrtrac.com/guides/qr-code-size-guide/) - Minimum 2x2cm, Level H needs 30% more space
- [QR Code Printing Guide (Supercode)](https://www.supercode.com/blog/best-qr-code-printing-guide) - SVG for print, testing protocol
- [Kit Pricing (EmailVendorSelection)](https://www.emailvendorselection.com/kit-pricing/) - $39/mo Creator plan
- [Loops Review 2026 (efficient.app)](https://efficient.app/apps/loops) - $49/mo for 5-10K subs
- [LaunchBoom Pre-Launch Guide](https://www.launchboom.com/crowdfunding-guides/how-to-launch-a-successful-kickstarter-campaign/) - $1 deposit = 30x conversion, 20-40% VIP conversion
- [Cloudflare .ai Domain Pricing](https://cfdomainpricing.com/) - $70/yr at cost
- [Kickstarter Pre-Launch Email Marketing](https://updates.kickstarter.com/launchboom-lessons/pre-launch-email-marketing/) - VIP vs non-VIP email sequences

### Tertiary (LOW confidence)
- Game Crafter tuck box pricing ($2.79) -- sourced from 2012 blog post, may have changed
- MakePlayingCards per-deck pricing ($14-18) -- approximate from search results, needs verification at checkout

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All core libraries already installed and working from Phase 2
- Print production: MEDIUM - Pricing is approximate; proof order will validate
- QR generation: HIGH - `qrcode` npm package is well-documented, Level H is standard
- Landing page: HIGH - Extends existing Next.js app with proven Stripe integration
- Email marketing: HIGH - Kit is the documented crowdfunding standard
- Card design: MEDIUM - Figma workflow is standard but CMYK conversion needs testing with PANTHEON art

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable domain -- print-on-demand pricing changes slowly)
