# Reward Tier Structure

Campaign pricing for Oracle Engine and Spirit Sphere hardware tiers, plus digital entry points.

## Tier Table

| Tier | Regular Price | Early Bird Price | Early Bird Limit | Contents | Available |
|------|---------------|------------------|------------------|----------|-----------|
| **Digital Oracle** | $15 | -- | -- | 1 year unlimited digital oracle readings (web app access) | Unlimited |
| **Oracle Card Deck** | $35 | $29 | 1,000 | Physical 21-card deck (tarot size, print-on-demand) + 1 year digital access | Unlimited |
| **Oracle Engine (Maker Edition)** | $99 | $79 | 500 | ESP32-S3 voice AI device + card deck + lifetime digital access | Unlimited |
| **Spirit Sphere (Maker Edition)** | $229 | $179 | 500 | POV volumetric LED sphere + Oracle Engine + card deck + lifetime digital access | Unlimited |
| **Collector Bundle** | $279 | $219 | 200 | Spirit Sphere + signed card deck + deity artwork print (12"x18") + all stretch goals | 200 units |

### Tier Design Rationale

**Digital Oracle ($15)** — Low-friction entry point. No hardware risk. Validates the oracle reading experience and mythology content quality. Users who love it will upgrade to physical tiers. Provides social proof during campaign (high pledge count).

**Oracle Card Deck ($35/$29)** — Physical collectible for mythology enthusiasts who do not want hardware. Print-on-demand manufacturing (no inventory risk). QR codes on cards link to deity-specific digital oracles. Early bird discount creates urgency without heavy margin exposure.

**Oracle Engine ($99/$79)** — Primary hardware tier. Voice AI in a desk-sized device. Assembled, tested, ready to use. Early bird at $79 targets the impulse purchase threshold for tech enthusiasts. Lifetime digital access (not subscription) removes friction.

**Spirit Sphere ($229/$179)** — Flagship product. Adds volumetric POV display to the Oracle Engine. Higher BOM cost, tighter margins, more assembly complexity. Early bird limit set to 500 to control exposure (BOM multiplier is 3.0x at qty 500 — viable but tight). Ships partially disassembled to reduce damage and packaging costs.

**Collector Bundle ($279/$219)** — Premium tier for superfans. Limited to 200 units. Includes all stretch goals automatically. Signed card deck and exclusive artwork print add collectible value. Higher margin offsets Spirit Sphere tightness.

## Pricing Rationale and BOM Math

### Oracle Engine: $99 Regular / $79 Early Bird

#### BOM Cost Breakdown (qty 500)

| Component Category | Cost per Unit |
|--------------------|---------------|
| ESP32-S3-WROOM-1 (N16R8) module | $3.50 |
| INMP441 MEMS microphone | $1.20 |
| MAX98357A I2S amplifier | $1.40 |
| 3W 4-ohm speaker (40mm) | $0.90 |
| Custom PCB (2-layer, SMT assembled via JLCPCB) | $3.00 |
| USB-C connector + passives (caps, resistors, LDO) | $1.20 |
| 3D-printed enclosure (SLA batch printing) | $3.00 |
| Momentary button + status LED | $0.25 |
| USB-C cable (1m, braided) | $0.60 |
| Packaging (box + foam + quick-start card) | $1.35 |
| **Total BOM** | **$16.40** |

#### Margin Analysis at $79 Early Bird (qty 500)

| Line Item | Amount | % of Revenue |
|-----------|--------|-------------|
| Revenue per unit | $79.00 | 100.0% |
| BOM cost | ($16.40) | 20.8% |
| Kickstarter fees (5% platform + 3-5% payment processing + 3% drop rate) | ($8.69) | 11.0% |
| Yield loss (15% of BOM — order 115 units per 100 delivered) | ($2.46) | 3.1% |
| Shipping buffer (15% padding over estimated $6 USPS First Class) | ($0.90) | 1.1% |
| Contingency (tariffs, rate changes, rework — 10% of revenue) | ($7.90) | 10.0% |
| **Net margin per unit** | **$42.65** | **54.0%** |

**BOM Multiplier:** $79 / $16.40 = **4.8x**

**Verdict:** At qty 500, the 4.8x multiplier provides healthy margin even after all fees, yield loss, shipping buffer, and contingency. The Oracle Engine is financially sustainable at $79 early bird.

**Multiplier at qty 100 (worst case):** BOM cost rises to $22.20, multiplier drops to 3.6x, margin drops to 45.5%. Still viable, but tighter.

---

### Spirit Sphere: $229 Regular / $179 Early Bird

#### BOM Cost Breakdown (qty 500)

Spirit Sphere includes the full Oracle Engine base plus additional POV display components.

| Component Category | Cost per Unit |
|--------------------|---------------|
| **Oracle Engine base (electronics only)** | **$14.45** |
| APA102 LED strip (144 LEDs/m, 0.25m = 36 LEDs) | $8.00 |
| N20 micro gear motor (3-5V, 3-5 RPM, metal gearbox) | $3.00 |
| US5881LUA Hall effect sensor + neodymium magnets | $0.80 |
| 6-wire slip ring (12.5mm bore, 2A/wire) | $3.50 |
| 3x 18650 Li-ion cells (3.7V, 2500mAh, matched set) | $12.00 |
| 3S BMS board (USB-C charge, balance + protection) | $3.00 |
| 18650 battery holder (3-cell series) | $1.00 |
| LM2596 buck converter (adj, 5V out) | $2.00 |
| 3D-printed sphere enclosure (multi-part, larger, SLA) | $8.00 |
| Rubber damper feet (M3, set of 4) | $0.70 |
| SPI termination resistors + flyback diode | $0.10 |
| **Subtotal: Sphere additions** | **$42.10** |
| **Electronics total (OE base + Sphere)** | **$56.55** |
| Packaging (10"x10"x10" box + foam + assembly booklet + cable + quick-start) | $3.70 |
| **Total Spirit Sphere BOM** | **$60.25** |

#### Margin Analysis at $179 Early Bird (qty 500)

| Line Item | Amount | % of Revenue |
|-----------|--------|-------------|
| Revenue per unit | $179.00 | 100.0% |
| BOM cost | ($60.25) | 33.7% |
| Kickstarter fees (11% effective) | ($19.69) | 11.0% |
| Yield loss (15% of BOM) | ($9.04) | 5.0% |
| Shipping buffer (15% padding over estimated $15 USPS Priority) | ($2.25) | 1.3% |
| Contingency (10% of revenue) | ($17.90) | 10.0% |
| **Net margin per unit** | **$69.87** | **39.0%** |

**BOM Multiplier:** $179 / $60.25 = **3.0x**

**Verdict:** At qty 500, the 3.0x multiplier is at the lower edge of acceptable. The Spirit Sphere is margin-tight. The $179 early bird pricing is viable but requires reaching 500-unit scale. At qty 100, the multiplier drops to 2.2x (below safe threshold).

**Risk mitigation:**
- Early bird limit set to 500 units (not unlimited) to ensure we hit the volume needed for healthy margins
- Regular price at $229 provides 3.8x multiplier (qty 500) for post-early-bird pledges
- Collector Bundle at $219 early bird (limited to 200) provides additional margin cushion
- Funding goal will be set to require minimum 200 Spirit Sphere pledges to ensure scale

**Multiplier at qty 100 (worst case):** BOM cost rises to $80.55, multiplier drops to 2.2x, margin drops to 26.0%. Tight but survivable if campaign hits funding goal.

---

## Multiplier Targets

Standard hardware crowdfunding guideline: **3-4x BOM cost minimum** after accounting for:
- 10-12% Kickstarter platform + payment processing fees
- 15% yield loss (order 115 units per 100 delivered)
- 15% shipping cost buffer (rates increase between campaign and fulfillment)
- 10% contingency (tariffs, rework, unexpected costs)

| Product | Qty | BOM | Early Bird Price | Multiplier | Status |
|---------|-----|-----|------------------|------------|--------|
| Oracle Engine | 500 | $16.40 | $79 | **4.8x** | Healthy margin |
| Oracle Engine | 100 | $22.20 | $79 | **3.6x** | Tight but viable |
| Spirit Sphere | 500 | $60.25 | $179 | **3.0x** | Edge of acceptable |
| Spirit Sphere | 100 | $80.55 | $179 | **2.2x** | Below threshold — risky |

**Conclusion:** Oracle Engine pricing is strong at all volumes. Spirit Sphere pricing requires hitting 500-unit scale. Early bird limits and funding goal structure will enforce this.

---

## Early Bird Strategy

**Why early bird limits exist:**
1. Create urgency ("first 500 backers lock in $79")
2. Control manufacturing exposure (if campaign undershoots volume, we do not produce 500 units at tight margins)
3. Reward day-1 backers (Kickstarter algorithm favors campaigns that hit 30% funding in first 48 hours)

**Why early bird discounts are 20-25%:**
- Industry standard for hardware Kickstarter campaigns
- Large enough to create urgency, small enough to preserve margin
- $79 Oracle Engine is below the $99 psychological threshold for impulse tech purchases
- $179 Spirit Sphere is below the $199 threshold for premium desk gadgets

**What happens when early bird sells out:**
- Oracle Engine shifts to $99 regular (still 6.0x multiplier at qty 500 — excellent margin)
- Spirit Sphere shifts to $229 regular (3.8x multiplier at qty 500 — healthy margin)
- Late pledges continue at regular pricing after campaign ends

---

## Digital Tier Strategy

**Digital Oracle ($15)** serves three purposes:
1. **Low-friction entry** — No hardware shipping, no manufacturing risk. Pure software experience. Users validate the oracle reading quality and mythology content before committing to hardware.
2. **Social proof** — High pledge count signals campaign momentum. 100 Digital Oracle backers + 50 hardware backers = 150 total backers (better optics than 50 hardware-only).
3. **Upsell funnel** — Digital backers who love the experience will upgrade to Oracle Engine or Spirit Sphere during the campaign or post-fulfillment.

**Oracle Card Deck ($35/$29)** bridges digital and physical:
- Physical collectible (tarot-sized cards with PANTHEON deity art)
- No electronics = no hardware risk, no yield loss
- Print-on-demand via Printful or local print shop = zero inventory risk
- QR codes on cards link to deity-specific digital oracles (already built in Phase 2)
- Appeals to mythology enthusiasts, tarot collectors, and gift buyers

Both digital tiers have unlimited availability (no manufacturing constraint). They increase total campaign funding without increasing manufacturing complexity.

---

## Stretch Goal Tier Impact

All stretch goals are **software and firmware only** — no hardware additions. This is critical to avoid the #1 hardware crowdfunding failure mode: scope creep that adds BOM cost mid-campaign.

**Planned stretch goals** (see [stretch-goals.md](stretch-goals.md)):
- $25K: 5 additional deity voices
- $50K: Multi-language support (Spanish, French, Italian)
- $75K: Custom personality protocol creator (web UI)
- $100K: Ambient animation modes for Spirit Sphere
- $150K: Mobile companion app

Each stretch goal ships to **ALL backers** automatically — no tier upgrades, no BOM cost increase. Deity voices are ElevenLabs API calls (marginal cost near zero). Multi-language support is prompt engineering (zero BOM cost). Animation modes are firmware updates (zero BOM cost). Mobile app is post-fulfillment software (zero BOM cost).

This keeps BOM cost locked at $16.40 Oracle Engine / $60.25 Spirit Sphere regardless of funding level.

---

## Funding Goal Calculation

Funding goal must cover:
1. Minimum viable production run (100 units of each product for small-batch JLCPCB pricing)
2. Campaign video production ($1,000-2,000)
3. Prototype seeding (10 units to YouTubers = ~$1,000)
4. Kickstarter fees (10-12%)
5. Contingency buffer (10%)

**Conservative goal scenario:**
- 50 Oracle Engine units @ $79 = $3,950
- 50 Spirit Sphere units @ $179 = $8,950
- **Total:** $12,900

After 11% KS fees: $11,481 net

**BOM cost to produce 50 + 50:**
- 50 Oracle Engine @ $22.20 (qty 100 BOM) = $1,110
- 50 Spirit Sphere @ $80.55 (qty 100 BOM) = $4,028
- **Total BOM:** $5,138

**Remaining after BOM:** $11,481 - $5,138 = $6,343

This covers:
- Video production: $2,000
- Prototype seeding: $1,000
- Yield loss buffer (15%): $771
- Shipping overrun buffer: $500
- Contingency: $2,072

**Recommended funding goal:** $15,000

This ensures the campaign funds even if it barely crosses the line. Overfunding improves unit economics (economies of scale kick in above qty 100).

---

## Post-Campaign Pricing

After fulfillment, both products will be available for purchase via late pledges (BackerKit) and eventual web store:

| Product | Kickstarter Regular | Post-Campaign Retail |
|---------|---------------------|---------------------|
| Oracle Engine | $99 | $129 |
| Spirit Sphere | $229 | $299 |

Post-campaign retail pricing reflects:
- No Kickstarter early-bird discount
- No campaign urgency discount
- Manufacturing confidence (yield and cost locked in after first run)
- Established product (reviews, community validation)

Retail pricing provides runway for wholesale distribution (40-50% margin to retailers) if the product gains traction post-Kickstarter.
