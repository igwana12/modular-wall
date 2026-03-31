# Phase 3: Physical Cards + Market Launch - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning
**Source:** Derived from ROADMAP decisions, CLAUDE.md, and Phase 2 outputs

<domain>
## Phase Boundary

Design, produce, and launch the 21-card Oracle Cards deck as a purchasable physical product. Build a landing page at oracleball.ai with email capture and $1 reservation deposits. Generate QR codes that permanently link each card to its deity's reading URL. Validate revenue with first 100 paid readings.

This phase bridges digital (Phase 2 web app) to physical (printed cards) and market validation (revenue).

</domain>

<decisions>
## Implementation Decisions

### Card Design (LOCKED — from CLAUDE.md)
- 21 cards, one per Greek god in the PANTHEON collection
- Tarot size: 2.75" x 4.75"
- Print-ready: 300 DPI, CMYK, 0.125" bleed on all sides
- PANTHEON art as primary visual on each card
- QR code on each card linking to permanent reading URL
- Consistent layout and branding across all 21 cards
- Figma for card layout design (community tarot templates available)

### Print Production (LOCKED — from CLAUDE.md)
- Print-on-demand from day one — NOT self-printed
- Game Crafter or MakePlayingCards as print partners
- Card packaging with brand identity and instructions

### QR Code Strategy (LOCKED)
- QR codes generated server-side via `qrcode` npm package (1.5.x)
- Error correction Level H (highest — for small card print)
- Each QR resolves to `https://oracleball.ai/read/{deity_id}`
- URLs must be permanent (no link rot — CARD-02 requirement)

### Landing Page (LOCKED — from CLAUDE.md)
- Same Next.js codebase as oracle app (`apps/oracle/`)
- Route: `/` or dedicated landing route
- Email capture with $1 reservation deposit via Stripe
- $1 deposits = 30x higher conversion than email-only (from research)
- ConvertKit or Loops for email sequences

### Revenue Validation
- Target: first 100 paid readings
- Paid = $9.99/mo subscribers or pay-per-reading if implemented
- This is the market signal that validates Spirit Sphere investment

### Domain (RESEARCH NEEDED)
- oracleball.ai — needs to be purchased/configured
- DNS, Vercel custom domain setup

### Email Marketing (RESEARCH NEEDED)
- ConvertKit vs Loops for drip campaigns
- Pre-launch email sequence content
- Crowdfunding-standard practices

</decisions>

<canonical_refs>
## Canonical References

### Phase 2 Outputs (Web App)
- `apps/oracle/` — Complete Next.js oracle web app
- `apps/oracle/src/app/read/[deity_id]/page.tsx` — Reading page (QR target URL)
- `services/orb-backend/gods/*.json` — 21 deity configs with names, titles, color palettes

### Project Docs
- `.planning/ROADMAP.md` — Phase 3 success criteria
- `.planning/REQUIREMENTS.md` — CARD-01 through CARD-04, LAUNCH-01 through LAUNCH-04
- `CLAUDE.md` — Print design specs, QR generation tech, launch strategy

</canonical_refs>

<specifics>
## Specific Ideas

- Card back design should be universal (same for all 21 cards) — mystical/oracle themed
- Card front: deity PANTHEON art + name + title + QR code
- Tuck box packaging with Sacred Circuits branding
- Include a small instruction card/booklet explaining how to use the QR codes
- Consider numbering the cards (I-XXI like Major Arcana)

</specifics>

<deferred>
## Deferred Ideas

- NFC chip integration in cards (v2, adds $0.50-1.00/card)
- AR card experience with 3D animated deity (v2)
- Mystery pack / digital-first commerce model (future)
- Customized physical card delivery (future)

</deferred>

---

*Phase: 03-physical-cards-market-launch*
*Context gathered: 2026-03-28 via inline derivation*
