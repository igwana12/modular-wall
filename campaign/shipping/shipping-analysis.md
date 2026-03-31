# Shipping Analysis -- Oracle Engine & Spirit Sphere

Dimensional shipping estimates for Kickstarter fulfillment across US and international regions.

**Important:** These are estimates based on USPS rate calculators for projected package sizes. Real quotes require packaged prototypes weighed on a postal scale. All estimates padded by 15% for rate increases between campaign and fulfillment.

## Package Specifications

### Oracle Engine

| Spec | Value |
|------|-------|
| Product dimensions | ~5" x 3.5" x 2.5" |
| Package dimensions | 6" x 4" x 3" (72 cu in) |
| Product weight | 6-8 oz |
| Packaged weight (with cable, cards, foam) | 10-14 oz |
| DIM weight applies? | No (under 1,728 cu in threshold) |
| Packaging type | Kraft mailer box with foam insert |
| Fragile handling? | No -- solid-state device, no moving parts |

### Spirit Sphere

| Spec | Value |
|------|-------|
| Product dimensions | ~8" x 8" x 8" (assembled) |
| Package dimensions | 10" x 10" x 10" (1,000 cu in) |
| Product weight | 1.5-2 lbs |
| Packaged weight (with foam, accessories, booklet) | 2.5-3.5 lbs |
| DIM weight applies? | No (under 1,728 cu in threshold) |
| Packaging type | Custom corrugated box with die-cut foam inserts |
| Fragile handling? | Yes -- POV arm packed separately, motor is delicate |

## Shipping Cost Estimates

All prices include 15% padding for rate increases.

### Oracle Engine

| Region | Service | Base Estimate | With 15% Pad | Notes |
|--------|---------|---------------|--------------|-------|
| US (domestic) | USPS First Class Package | $4.50-6.00 | **$5.18-6.90** | Under 16 oz qualifies for First Class |
| Canada | USPS First Class Intl | $9.00-12.00 | **$10.35-13.80** | Customs form required |
| Europe | USPS First Class Intl | $13.00-17.50 | **$14.95-20.13** | 2-3 week delivery |
| Asia/Pacific | USPS First Class Intl | $15.50-22.00 | **$17.83-25.30** | Longest transit time |
| **Weighted average (US 62% / Intl 38%)** | | | **~$9.50** | Based on typical KS backer distribution |

### Spirit Sphere

| Region | Service | Base Estimate | With 15% Pad | Notes |
|--------|---------|---------------|--------------|-------|
| US (domestic) | USPS Priority Mail | $10.50-15.50 | **$12.08-17.83** | Priority required for weight |
| Canada | USPS Priority Mail Intl | $17.50-26.00 | **$20.13-29.90** | Customs + insurance recommended |
| Europe | USPS Priority Mail Intl | $26.00-39.00 | **$29.90-44.85** | Significant cost; consider flat-rate box |
| Asia/Pacific | USPS Priority Mail Intl | $30.50-43.50 | **$35.08-50.03** | Insurance strongly recommended |
| **Weighted average (US 62% / Intl 38%)** | | | **~$22.00** | Based on typical KS backer distribution |

## BackerKit Shipping Strategy

### Why Post-Campaign Shipping Collection

1. **Avoids 5% KS fee on shipping** -- Kickstarter charges platform fees on the pledge total. If shipping is baked into the pledge price, you pay 5% of shipping revenue to KS. BackerKit collects shipping after the campaign, outside KS fees.
2. **Accurate weight-based pricing** -- Pledge add-ons change the package weight. BackerKit calculates shipping based on total order weight, not just the base pledge.
3. **Address verification** -- BackerKit validates shipping addresses and catches errors before labels are printed.
4. **International rate accuracy** -- Can charge exact rates per country rather than broad "international" flat rates.

### BackerKit Configuration

| Setting | Value |
|---------|-------|
| Shipping profile type | Whole-order, weight-based |
| Domestic (US) zones | Single zone (USPS national) |
| International zones | Canada, Europe, Asia/Pacific, Rest of World |
| Weight thresholds | Under 1 lb (Oracle Engine), 1-4 lbs (Spirit Sphere), 4+ lbs (bundles) |
| Add-on weight impact | Oracle Card Deck: +8 oz, extra USB cable: +2 oz |
| Shipping collection timing | 2-4 weeks after campaign ends |

### Shipping Rate Table for BackerKit

| Weight Tier | US | Canada | Europe | Asia/Pacific | Rest of World |
|-------------|-----|--------|--------|-------------|---------------|
| Under 1 lb | $7 | $14 | $20 | $25 | $25 |
| 1-2 lbs | $12 | $22 | $35 | $40 | $40 |
| 2-4 lbs | $18 | $30 | $45 | $50 | $50 |
| 4+ lbs | $25 | $40 | $55 | $65 | $65 |

Note: Rates are rounded up and include buffer. Better to over-collect and refund difference than under-collect.

## International Considerations

### Customs Declarations

| Product | HS Code (estimated) | Declared Value | Country of Origin |
|---------|--------------------|--------------|--------------------|
| Oracle Engine | 8471.49 (other digital processing machines) | $79-99 | China (PCB) / US (assembly) |
| Spirit Sphere | 8471.49 or 9405.40 (luminaires) | $179-229 | China (PCB) / US (assembly) |

**Notes:**
- HS code classification should be verified with a customs broker before shipping
- Declared value = purchase price (not BOM cost)
- Country of origin depends on where final assembly happens -- if assembled in US from Chinese PCBs, list US

### Tariff Exposure

| Risk | Estimate | Mitigation |
|------|----------|------------|
| US import tariffs on Chinese components | 5-25% of component value | Already factored into BOM cost (components imported before assembly) |
| Backer import duties (non-US) | Varies by country, 0-20% | Disclose in campaign FAQ: "International backers may be responsible for local import duties" |
| VAT (EU backers) | 19-27% of declared value | Disclose prominently; consider IOSS registration if >150 EUR threshold |
| Canadian GST/HST | 5-15% | Standard for all imported goods; disclose in FAQ |

**Recommendation:** Add a prominent FAQ entry on the Kickstarter page: "International backers are responsible for any customs duties, taxes, or import fees charged by their country. These vary by location and are not included in the shipping charge."

### Packaging Requirements

**Oracle Engine (standard mailer):**
- Kraft mailer box (6" x 4" x 3")
- Molded pulp insert (holds device + cable)
- Quick-start card in envelope
- Total packaging cost: $1.50-2.50/unit

**Spirit Sphere (custom protective):**
- Custom corrugated box (10" x 10" x 10", double-wall)
- Die-cut EVA foam insert with cutouts for:
  - Base unit (assembled, heaviest piece at bottom)
  - LED arm (packed separately in anti-static wrap)
  - Sphere shell halves (nested together)
  - Accessories compartment (cable, booklet, cards)
- "FRAGILE" and "THIS SIDE UP" markings
- Total packaging cost: $3.50-5.00/unit

## Fulfillment Decision Matrix

| Volume | Strategy | Pros | Cons |
|--------|----------|------|------|
| Under 200 units | Self-fulfill | Full control, lowest cost, personal QA | Time-intensive, limited to US-based shipping |
| 200-500 units | Self-fulfill with helpers | Still manageable, hire 1-2 temp workers for packing days | Needs dedicated workspace, 2-3 day packing marathon |
| 500-1000 units | Evaluate 3PL | Scalable, professional, international warehousing possible | Per-unit fees ($2-5/unit), less control over QA |
| 1000+ units | 3PL required | Cannot self-fulfill at this volume | Higher per-unit cost, must negotiate rates |

### 3PL Options (if volume exceeds 500)

| Provider | Per-Unit Fee (est.) | Strengths | Weaknesses |
|----------|--------------------|-----------| -----------|
| eFulfillment Service | $2.50-4.00/unit | Crowdfunding experience, BackerKit integration | US-only warehouse |
| Fulfillrite | $3.00-5.00/unit | International shipping, transparent pricing | Higher base cost |
| ShipBob | $5.00-7.00/unit | Multiple US warehouses, good software | Expensive for small volumes |

**Recommendation:** Plan for self-fulfillment (under 500 units for first campaign). If campaign significantly overperforms, activate 3PL conversation during BackerKit survey period (January 2027).

## Cost Impact on Pricing

### Oracle Engine ($79 early bird)

| Scenario | Shipping Cost (weighted avg) | % of Revenue |
|----------|------------------------------|-------------|
| US-only backers | $7.00 | 8.9% |
| Weighted avg (62% US / 38% Intl) | $9.50 | 12.0% |
| Worst case (all international) | $20.00 | 25.3% |

### Spirit Sphere ($179 early bird)

| Scenario | Shipping Cost (weighted avg) | % of Revenue |
|----------|------------------------------|-------------|
| US-only backers | $15.00 | 8.4% |
| Weighted avg (62% US / 38% Intl) | $22.00 | 12.3% |
| Worst case (all international) | $45.00 | 25.1% |

**Note:** Shipping is collected separately via BackerKit, not included in the pledge price. These percentages show the relative cost burden on backers, not margin impact. However, high shipping costs reduce conversion -- monitor international pledge rates during campaign.
