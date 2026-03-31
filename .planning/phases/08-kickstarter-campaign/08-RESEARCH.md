# Phase 8: Kickstarter Campaign - Research

**Researched:** 2026-03-31
**Domain:** Hardware crowdfunding, manufacturing validation, fulfillment logistics
**Confidence:** MEDIUM

## Summary

This phase covers launching a Kickstarter campaign for two hardware products: Oracle Engine ($79 early bird) and Spirit Sphere ($179 early bird). The firmware and software are code-complete (Phases 4-7), but hardware procurement is the current blocker for physical prototypes needed for the campaign video.

Kickstarter hardware campaigns in 2025-2026 demand working prototypes (no photorealistic renders allowed), transparent timelines, and pre-built communities. The "Maker Edition" positioning is strategically sound -- it sets expectations correctly (not consumer appliance) and resonates with the ESP32/open-source community. The $2-5K budget is tight but workable: JLCPCB small-batch PCB assembly runs ~$25/5 units for bare ESP32 boards, video can be DIY with a strong script for under $2K, and community building via Discord/email costs only time.

**Primary recommendation:** Spend 60% of effort on pre-launch community building (Discord, email list with $1 deposits, build-in-public content) and 40% on manufacturing validation (JLCPCB prototype order, BOM costing, shipping quotes). The campaign video is critical but should be the last item produced -- only after working hardware exists for demos.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| KS-01 | Campaign video: 30s demo + 2-3min full (production budget $2-5K) | Video production section: DIY approach with strong script, DaVinci Resolve editing, $1-2K budget feasible |
| KS-02 | "Maker Edition" positioning (not consumer appliance) | Community strategy section: open-source hardware positioning, build-in-public approach |
| KS-03 | $179 early bird tier (first 500 units) | Tier structure section: pricing based on minimum production quantity, early bird at 20-25% discount |
| KS-04 | Accurate shipping costs via BackerKit with real dimensional quotes | Shipping section: USPS First Class for US (<1lb), BackerKit post-campaign shipping collection |
| KS-05 | PCB design validated with small-batch JLCPCB order | Manufacturing section: JLCPCB pricing, EasyEDA workflow, 5-unit minimum |
| KS-06 | Discord community active before campaign launch | Community section: 6-12 week pre-launch, build-in-public strategy |
| KS-07 | Open-source firmware skeleton published on GitHub (pre-campaign) | Open-source strategy section: publish before launch, community trust signal |
| KS-08 | 5-10 prototype units seeded to tech YouTubers | Manufacturing section: 10-unit JLCPCB batch for seeding, influencer outreach |
</phase_requirements>

## Kickstarter Platform Requirements

### Fees
| Fee Type | Rate | Notes |
|----------|------|-------|
| Platform fee | 5% of total raised | Only charged on successful campaigns |
| Payment processing | 3-5% per pledge | Varies by payment method |
| Micropledge discount | 5% + $0.08 | Pledges under $10 |
| Dropped pledges | ~3-5% attrition | Budget for failed payment processing |
| **Total effective cost** | **~10-12%** | Platform + processing + drops |

**Confidence: HIGH** -- sourced from Kickstarter's official fees page.

### Hardware Category Rules
| Rule | Detail | Impact |
|------|--------|--------|
| Working prototype required | Must show functional hardware, not concepts | Video MUST show real devices working |
| No photorealistic renders | Technical drawings, CAD, sketches allowed; no renders that look like finished products | Use actual photos and video of prototypes |
| Show current state honestly | Disclose what works and what is in development | Be transparent about software vs hardware maturity |
| Software+hardware integration | Must demonstrate integrated functionality or disclose gaps | Show voice AI working on the ESP32 |
| AI transparency | Projects using AI must disclose how it is used | Disclose LLM-powered oracle readings, deity voice synthesis |

**Confidence: HIGH** -- sourced from Kickstarter hardware project guidelines.

### Campaign Structure
- **All-or-nothing funding** -- set goal conservatively (minimum viable production run)
- **Late Pledges** available after campaign ends (continued sales)
- **Category:** Technology > Hardware
- **Optimal launch:** Tuesday in September-October 2026 (pre-holiday, mid-week)
- **Campaign duration:** 30 days (standard; shorter campaigns create urgency)

## Campaign Video Production

### Budget Allocation ($2-5K total pre-Kickstarter)
| Item | Budget | Approach |
|------|--------|----------|
| Video production | $1,000-2,000 | DIY with hired editor OR skilled freelancer |
| PCB prototyping | $500-800 | JLCPCB 10-unit batch with assembly |
| Components/parts | $300-500 | ESP32-S3 modules, speakers, mics, LEDs, motors |
| Shipping/misc | $200-400 | Prototype shipping, test prints |
| Discord/marketing | $0-300 | Primarily time-based, small ad budget optional |

### Video Structure (Based on Successful Hardware Campaigns)
**30-second demo clip:**
- Hook in first 3 seconds (Spirit Sphere glowing, deity voice speaking)
- Product in action (voice conversation with Zeus through the sphere)
- URL/CTA

**2-3 minute full video:**
1. **Hook** (0-10s): Dramatic reveal of Spirit Sphere doing something magical
2. **Problem** (10-30s): "What if mythology could speak to you personally?"
3. **Solution demo** (30-90s): Show both products working -- voice AI conversation, POV display
4. **How it works** (90-120s): Brief tech overview (ESP32, open-source, 21 deities)
5. **Maker story** (120-150s): Personal credibility, Sacred Circuits background
6. **Tiers and CTA** (150-180s): Clear pricing, early bird incentive

### Production Tips (Under $5K)
- Use iPhone in horizontal orientation with a $30 tripod
- Invest in a lavalier mic ($50-100) -- audio quality matters more than video quality
- Use DaVinci Resolve (free) for editing
- Shoot in a clean, well-lit space (softbox lights ~$50)
- Multiple camera angles on talking head segments
- Pull GIFs and stills from video footage for campaign page
- 3D animation (Blender) is cheaper than reshooting -- use for exploded views

**Confidence: MEDIUM** -- synthesized from multiple crowdfunding video production guides.

## Reward Tiers

### Recommended Structure
| Tier | Price | Early Bird | Contents | Limit |
|------|-------|------------|----------|-------|
| Digital Oracle | $15 | -- | 1 year unlimited digital oracle readings (web app) | Unlimited |
| Oracle Card Deck | $35 | $29 | Physical 21-card deck + digital access | 1000 |
| Oracle Engine | $99 | $79 | ESP32 voice AI device (Maker Edition) + cards + digital | 500 |
| Spirit Sphere | $229 | $179 | Full POV sphere + Oracle Engine + cards + digital | 500 |
| Collector Bundle | $279 | $219 | Spirit Sphere + signed card deck + all digital stretch goals | 200 |

### Pricing Rationale
- Base price on minimum production quantity BOM cost
- Early bird = 20-25% discount, limited to first 500 units per tier
- Target 3-4x BOM cost for retail price to cover fees, shipping overruns, yield loss
- Digital tiers serve as low-friction entry points and social proof

### Stretch Goals Strategy
- Keep stretch goals as firmware/software additions (no new hardware features)
- Examples: additional deity personalities, new animation modes, multi-language support
- Stretch goals that add manufacturing cost are the #1 cause of hardware campaign failure
- Each stretch goal ships to ALL backers automatically

**Confidence: MEDIUM** -- based on ESP32 Kickstarter campaign analysis and pricing guides.

## Manufacturing Validation

### JLCPCB PCB Prototyping
| Order Type | Quantity | Estimated Cost | Turnaround |
|------------|----------|---------------|------------|
| Bare PCB (2-layer, <100x100mm) | 5 pcs | $2 + shipping | 24 hours + shipping |
| SMT Assembly (ESP32 board) | 5 pcs | ~$23 total | 3-5 days + shipping |
| SMT Assembly (ESP32 board) | 10 pcs | ~$35-50 total | 3-5 days + shipping |
| SMT Assembly (ESP32 board) | 50 pcs | ~$121 total | 5-7 days + shipping |

### Workflow
1. Design PCB in EasyEDA (free, integrates with JLCPCB)
2. Export Gerber files
3. Upload to JLCPCB, select components from LCSC parts library
4. JLCPCB engineer review (will email if issues found)
5. Manufacturing + shipping (total ~2 weeks to US)

### BOM Cost Estimation (Oracle Engine)
| Component | Unit Cost (qty 100) | Source |
|-----------|-------------------|--------|
| ESP32-S3-WROOM-1 (N16R8) | $3-5 | LCSC/Mouser |
| INMP441 MEMS mic | $1-2 | LCSC |
| MAX98357A I2S amp | $1-2 | LCSC |
| 3W 4-ohm speaker | $1-2 | AliExpress/LCSC |
| Custom PCB (assembled) | $3-5 | JLCPCB |
| USB-C connector + passives | $1-2 | LCSC |
| Enclosure (3D printed) | $3-5 | Local/Shapeways |
| **Total BOM** | **$13-23** | |

### BOM Cost Estimation (Spirit Sphere -- additional to Oracle Engine)
| Component | Unit Cost (qty 100) | Source |
|-----------|-------------------|--------|
| APA102/SK9822 LED strip (144/m) | $8-12 | AliExpress |
| N20 micro gear motor | $3-5 | AliExpress |
| US5881LUA Hall sensor | $0.50-1 | LCSC |
| 4-wire slip ring | $3-5 | AliExpress |
| 3x 18650 batteries + BMS | $8-12 | AliExpress |
| 3D printed enclosure (larger) | $8-15 | Local/Shapeways |
| **Additional BOM** | **$31-50** | |
| **Total Spirit Sphere BOM** | **$44-73** | |

### Production Validation Steps
1. Order 5-unit JLCPCB batch of Oracle Engine PCB (validate assembly)
2. Hand-assemble 2-3 complete Oracle Engine units (validate BOM)
3. Order 5-unit Spirit Sphere PCB batch
4. Assemble 2-3 Spirit Sphere units (validate integration)
5. Run 10-minute reliability test on each unit
6. Document yield issues for cost padding

**Confidence: MEDIUM** -- JLCPCB costs verified via official site and project reports; BOM estimates are approximations pending actual sourcing.

## Shipping and Fulfillment

### Product Dimensions and Weight (Estimated)
| Product | Box Size (est.) | Weight (est.) | DIM Weight Applies? |
|---------|----------------|---------------|-------------------|
| Oracle Engine | 6" x 4" x 3" (72 cu in) | 8-12 oz | No (under 1728 cu in) |
| Spirit Sphere | 10" x 10" x 10" (1000 cu in) | 2-3 lbs | No (under 1728 cu in) |

### Shipping Cost Estimates (US Domestic)
| Product | Service | Estimated Cost |
|---------|---------|---------------|
| Oracle Engine | USPS First Class Package | $5-7 |
| Spirit Sphere | USPS Priority Mail | $12-18 |

### International Shipping (38% of backers are international)
| Product | Region | Estimated Cost |
|---------|--------|---------------|
| Oracle Engine | Canada | $10-14 |
| Oracle Engine | Europe | $15-20 |
| Oracle Engine | Asia/Pacific | $18-25 |
| Spirit Sphere | Canada | $20-30 |
| Spirit Sphere | Europe | $30-45 |
| Spirit Sphere | Asia/Pacific | $35-50 |

### Fulfillment Strategy
- **Use BackerKit for post-campaign shipping collection** -- avoids Kickstarter's 5% fee on shipping costs
- **Charge shipping after campaign** -- allows accurate weight-based pricing with add-ons factored in
- **BackerKit Whole Order Shipping Profile** -- weight-based, covers pledges + add-ons together
- **Pad shipping estimates by 10-15%** -- covers rate increases between campaign and fulfillment
- **Consider US-based 3PL** (eFulfillment Service or Fulfillrite) if volume exceeds 500 units
- **Self-fulfill** if under 500 units -- cheaper, more control

### Tariff Considerations (2025-2026)
- BackerKit offers a Tariff Manager tool (beta) for mitigating tariff costs
- Components sourced from China may face tariffs -- factor into BOM
- Budget 5-10% BOM cost increase for tariff uncertainty

**Confidence: MEDIUM** -- shipping estimates based on USPS 2026 rates for estimated dimensions; actual quotes needed with real prototypes.

## Community Building Strategy

### Pre-Launch Timeline (6-12 weeks before campaign)
| Week | Activity | Goal |
|------|----------|------|
| 12-10 | GitHub open-source repo live, build-in-public blog posts begin | Establish credibility |
| 10-8 | Discord server launched, Reddit/Hacker News posts about the tech | Seed community |
| 8-6 | Email list building via oracleball.ai with $1 deposits | Capture high-intent leads |
| 6-4 | Behind-the-scenes video content (assembly, testing, failures) | Build trust and engagement |
| 4-2 | Seed prototypes to 5-10 tech YouTubers/bloggers | Generate pre-launch buzz |
| 2-0 | Countdown content, early bird announcements, Kickstarter pre-launch page | Drive day-1 funding surge |

### Channel Strategy
| Channel | Cost | Purpose | Priority |
|---------|------|---------|----------|
| Discord | Free | Community hub, feedback loops, backer engagement | HIGH |
| Email list (oracleball.ai) | Free (Kit) | $1 deposit captures, launch notifications, 30x conversion vs email-only | HIGH |
| GitHub | Free | Open-source firmware, trust signal, developer community | HIGH |
| Reddit (r/esp32, r/DIYelectronics, r/crowdfunding) | Free | Organic reach, technical credibility | MEDIUM |
| YouTube/TikTok | Free (time) | Build-in-public content, prototype demos | MEDIUM |
| Hacker News | Free | Show HN post for open-source hardware | MEDIUM |
| Meta ads | $100-300 | Pre-launch page traffic, landing page testing | LOW |

### Build-in-Public Content Ideas
1. "Building a Voice AI Oracle from Scratch" -- series documenting hardware assembly
2. POV display first-light moment (dramatic, shareable)
3. Deity voice demos (let community vote on favorites)
4. Assembly timelapse videos
5. Failure documentation (builds trust -- "here's what went wrong and how we fixed it")
6. Design decision polls in Discord (enclosure shape, LED color schemes)

### $1 Deposit Strategy (Already Implemented)
- $1 reservation deposit on oracleball.ai (Phase 3 implemented)
- 30x higher conversion than email-only signup
- Deposits are refundable but signal genuine purchase intent
- Use deposit count to calibrate Kickstarter funding goal

**Confidence: HIGH** -- community building strategies are well-documented across multiple sources and align with successful hardware campaigns.

## Open-Source Strategy for Hardware Crowdfunding

### What to Open-Source (Pre-Campaign)
| Item | License | Rationale |
|------|---------|-----------|
| Firmware skeleton (ESP32) | MIT or Apache 2.0 | Trust signal, community contributions, differentiation |
| PCB schematics (EasyEDA) | CERN-OHL-S-2.0 | Hardware open-source standard, attracts makers |
| 3D enclosure STL files | CC BY-SA 4.0 | Community remixes, organic marketing |
| Assembly documentation | CC BY-SA 4.0 | Reduces support burden, builds community |

### What to Keep Proprietary
| Item | Rationale |
|------|-----------|
| Deity voice profiles (ElevenLabs) | Competitive advantage, licensing cost |
| Oracle reading prompts/protocols | Core IP, McKee-guided quality |
| PANTHEON artwork | Art assets are revenue-generating |
| RAG knowledge corpus | Curated content is differentiator |
| Animation system | Visual experience is premium feature |

### Why Open-Source Works for Crowdfunding
- Signals confidence ("we're not hiding anything")
- Creates community of contributors before campaign
- Maker community shares and amplifies open-source hardware
- Reduces "vaporware" perception -- backers can verify code exists
- GitHub stars serve as social proof on campaign page

**Confidence: HIGH** -- open-source hardware crowdfunding is a well-established pattern (Prusa, Pine64, Framework).

## Common Pitfalls

### Pitfall 1: Scope Creep from Backer Feedback
**What goes wrong:** Backers suggest features during campaign, creator adds them, manufacturing cost and timeline explode.
**Why it happens:** Desire to please backers, feature-voting creates pressure.
**How to avoid:** Pre-define stretch goals as software/firmware ONLY. Never add hardware features post-funding. Acknowledge feedback but defer to v2.
**Warning signs:** "Just one more sensor" or "can you add NFC?" requests in comments.

### Pitfall 2: Underestimating Manufacturing Yield
**What goes wrong:** 10-20% of assembled units fail QA, eating into margins.
**Why it happens:** First-time creators assume 100% yield from PCB assembly.
**How to avoid:** Budget for 15% yield loss in cost calculations. Order 115 units for every 100 needed.
**Warning signs:** First batch has any failures at all (multiply that rate by volume).

### Pitfall 3: Shipping Cost Underestimation
**What goes wrong:** Shipping costs 2-3x what was estimated, especially international.
**Why it happens:** Didn't account for packaging weight, international rate increases, or customs duties.
**How to avoid:** Use BackerKit post-campaign shipping collection. Get real quotes with actual packaged product weight. Pad by 15%.
**Warning signs:** Estimating shipping before having a packaged prototype.

### Pitfall 4: Chinese New Year Manufacturing Gap
**What goes wrong:** 3-4 week manufacturing halt if fulfillment timeline overlaps CNY (late Jan/Feb).
**Why it happens:** All Chinese factories shut down simultaneously.
**How to avoid:** Plan production runs to complete before December or start after March. For holiday 2026 campaign, production must start by October.
**Warning signs:** Any manufacturing timeline that spans January-February.

### Pitfall 5: The 48-Hour Funding Stall
**What goes wrong:** Campaign doesn't hit 30% of goal in first 48 hours, algorithm deprioritizes it, death spiral.
**Why it happens:** Insufficient pre-launch audience.
**How to avoid:** Have enough email list + deposit holders to fund 50-100% of goal on day 1. Set conservative funding goal (minimum viable production run, not stretch target).
**Warning signs:** Email list under 1,000, zero $1 deposits.

### Pitfall 6: Photorealistic Render Rejection
**What goes wrong:** Kickstarter rejects or flags campaign for using renders that look like finished products.
**Why it happens:** Hardware creators use CAD renders in marketing materials.
**How to avoid:** Use only real photos/video of actual prototypes. CAD drawings and technical sketches are fine; photorealistic renders are not.
**Warning signs:** Any image that could be mistaken for a photograph of a finished product.

### Pitfall 7: Running Out of Money Before Fulfillment
**What goes wrong:** After Kickstarter fees (10-12%), shipping costs, and yield loss, there is not enough money to produce all units.
**Why it happens:** Pricing based on BOM cost without accounting for fees, shipping, yield, returns, and contingency.
**How to avoid:** Price at 3-4x BOM cost minimum. Budget: 10-12% fees, 15% yield loss, 15% shipping overrun, 10% contingency.
**Warning signs:** Margin under 2.5x BOM cost after all deductions.

## Pre-Launch Checklist

### Must-Have Before Campaign Goes Live
- [ ] Working prototype of BOTH products (Oracle Engine + Spirit Sphere)
- [ ] 30-second demo video showing real hardware
- [ ] 2-3 minute campaign video with hook, demo, story, CTA
- [ ] JLCPCB small-batch order completed (manufacturing path proven)
- [ ] BOM cost validated with real component pricing
- [ ] Shipping quotes obtained with actual packaged products
- [ ] Discord community seeded with 50+ active members
- [ ] Email list with 500+ subscribers (target 1,000+)
- [ ] Open-source firmware repo on GitHub with README, LICENSE, and docs
- [ ] BackerKit account configured for post-campaign pledge management
- [ ] Kickstarter pre-launch page live for at least 2 weeks
- [ ] 5-10 prototype units mailed to tech YouTubers/bloggers
- [ ] Campaign page copy reviewed (features, timeline, risks section)
- [ ] Stretch goals defined (software/firmware only, no hardware additions)
- [ ] Funding goal set conservatively (minimum viable production run)

### Timeline for Holiday 2026 Launch
| Month | Milestone |
|-------|-----------|
| April-May 2026 | Hardware procurement, PCB design in EasyEDA |
| June 2026 | JLCPCB prototype order, first assembly |
| July 2026 | Prototype testing, reliability validation |
| August 2026 | Open-source repo published, Discord launched, build-in-public begins |
| September 2026 | Prototype units to YouTubers, email list building intensive |
| October 2026 | Campaign video produced, Kickstarter pre-launch page live |
| Late October / Early November 2026 | **Campaign launch** (Tuesday, early in month) |
| November-December 2026 | Campaign runs (30 days), late pledges |
| January-February 2027 | BackerKit surveys, final component ordering |
| March-April 2027 | Manufacturing run at JLCPCB |
| May-June 2027 | Fulfillment and shipping |

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Pledge management | Custom backer database | BackerKit | Handles surveys, add-ons, shipping collection, address verification |
| PCB design | Breadboard prototypes for production | EasyEDA + JLCPCB | Integrated design-to-manufacture pipeline |
| Shipping logistics | Manual label printing | BackerKit + Pirate Ship / Shippo | Batch label generation, rate shopping |
| Email marketing | Custom email system | Kit (ConvertKit) | Already integrated from Phase 3, drip sequences |
| Community management | Slack/custom chat | Discord | Free, real-time, standard for hardware Kickstarter |
| Campaign analytics | Manual tracking | Kickstarter dashboard + BackerKit analytics | Built-in conversion tracking |

## Architecture Patterns

### Campaign Asset Structure
```
campaign/
  video/
    30s-demo.mp4
    full-campaign.mp4
    raw-footage/
  photos/
    product-shots/
    behind-the-scenes/
    assembly-process/
  copy/
    campaign-page.md
    faq.md
    risks-and-challenges.md
    backer-updates/
  design/
    reward-tier-graphics/
    stretch-goal-graphics/
  manufacturing/
    bom-oracle-engine.csv
    bom-spirit-sphere.csv
    jlcpcb-gerbers/
    assembly-instructions/
  shipping/
    dimensional-quotes/
    packaging-specs/
```

### Open-Source Repo Structure
```
orb-firmware/
  README.md           # Project overview, getting started
  LICENSE             # MIT or Apache 2.0
  CONTRIBUTING.md     # How to contribute
  firmware/
    oracle-engine/    # ESP32 voice AI firmware
    pov-globe/        # LED POV display firmware
    spirit-sphere/    # Combined firmware
  hardware/
    pcb/              # EasyEDA project files, Gerbers
    enclosure/        # STL files for 3D printing
    bom/              # Bill of materials
  docs/
    assembly-guide/   # Step-by-step with photos
    wiring-diagram/   # Pin connections
    troubleshooting/  # Common issues
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Kickstarter-only pledge management | BackerKit/PledgeBox post-campaign | 2020+ | Better shipping cost collection, add-on revenue |
| Ship during campaign pricing | Post-campaign shipping via pledge manager | 2022+ | Accurate weight-based pricing, avoids 5% KS fee on shipping |
| All-in-one Kickstarter fulfillment | BackerKit + 3PL integration | 2023+ | Scalable, international warehouse options |
| Free shipping included in price | Transparent shipping charged separately | 2024+ | Better margin control, international fairness |
| Long campaign videos (5-7 min) | Short and focused (1.5-3 min) | 2023+ | Higher completion rates, better conversion |
| Launch anytime | Strategic Tuesday/Sep-Oct launches | Always true but data-confirmed 2024 | 15-20% higher success rate |

## Open Questions

1. **Exact BOM cost at 500-unit quantity**
   - What we know: BOM estimates based on component pricing research
   - What's unclear: Volume discounts from LCSC at 500+ quantity, exact JLCPCB assembly costs at scale
   - Recommendation: Get formal quotes from JLCPCB for 500-unit run before setting final pricing

2. **Spirit Sphere shipping fragility**
   - What we know: POV display has moving parts (motor, slip ring, LED arm)
   - What's unclear: Whether standard shipping packaging protects the assembly adequately
   - Recommendation: Ship disassembled with assembly instructions, or invest in custom foam inserts

3. **Tariff exposure for China-sourced components**
   - What we know: US-China tariffs are volatile in 2025-2026
   - What's unclear: Exact tariff rates for assembled PCBs vs. raw components
   - Recommendation: Budget 10% tariff contingency, investigate JLCPCB's global production options

4. **YouTube influencer responsiveness**
   - What we know: 5-10 prototype units need to go to tech YouTubers
   - What's unclear: Which YouTubers cover ESP32/maker hardware and accept review units
   - Recommendation: Research specific channels (Andreas Spiess, Random Nerd Tutorials, etc.) and reach out 8 weeks before launch

## Sources

### Primary (HIGH confidence)
- [Kickstarter Fees (Official)](https://www.kickstarter.com/help/fees) - Platform and processing fee structure
- [Kickstarter Hardware Project Rules](https://help.kickstarter.com/hc/en-us/articles/115005134554) - Prototype requirements, rendering rules
- [Kickstarter Rules](https://www.kickstarter.com/rules) - General campaign rules and prohibited items
- [JLCPCB Official Site](https://jlcpcb.com/) - PCB fabrication and assembly pricing
- [JLCPCB Assembly Pricing](https://jlcpcb.com/help/article/pcb-assembly-price) - Feeder fees, manual assembly costs

### Secondary (MEDIUM confidence)
- [LaunchBoom: How to Launch a Successful Kickstarter Campaign](https://www.launchboom.com/crowdfunding-guides/how-to-launch-a-successful-kickstarter-campaign/) - 17-step launch guide
- [Kickstarter Best Time to Launch](https://updates.kickstarter.com/best-time-to-launch/) - Tuesday/Sep-Oct data
- [Makera $15M Case Study](https://updates.kickstarter.com/case-study-15-lessons-from-makeras-15m-kickstarter-success/) - Hardware campaign lessons
- [BackerKit Shipping Strategies](https://www.backerkit.com/blog/guides/the-practical-guide-to-planning-a-crowdfunding-campaign/kickstarter-shipping-strategies/) - Post-campaign shipping collection
- [BackerKit Pricing](https://www.backerkit.com/pricing) - Pledge management fees
- [Top 15 Crowdfunding Fulfillment Services 2026](https://www.efulfillmentservice.com/2025/12/the-top-15-kickstarter-crowdfunding-fulfillment-services-in-2026/) - 3PL options
- [LaunchBoom: Kickstarter Video Production](https://www.launchboom.com/crowdfunding-guides/kickstarter-video-production/) - Video structure and budgeting
- [Kickstarter Reward Pricing Psychology](https://updates.kickstarter.com/the-psychology-of-pricing-your-rewards-7-strategies-every-creator-should-know/) - Tier pricing strategies
- [Stonemaier Games: Pricing Core Reward](https://stonemaiergames.com/kickstarter-lesson-201-a-step-by-step-guide-to-pricing-your-core-reward/) - BOM-based pricing methodology

### Tertiary (LOW confidence)
- [SLIMDESIGN: Top Kickstarter Failures](https://slimdesign.com/kickstarter-failures/) - Manufacturing failure case studies
- [DTU Science Park: $26M Lost](https://dtusciencepark.com/article/26-million-lost-why-crowdfunded-hardware-projects-fail/) - Hardware project failure analysis
- [Floship: 10 Mistakes That Cause Delays](https://www.floship.com/blog/10-mistakes-kickstarter-projects-delayed/) - Delay causes
- ESP32 Kickstarter campaign pages (Kode Dot, WVR, ESP32 Agent Dev Kit) - Comparable campaign analysis
- USPS rate estimates based on general weight/size calculators (actual quotes needed with real products)

## Metadata

**Confidence breakdown:**
- Platform requirements: HIGH - sourced from official Kickstarter pages
- Manufacturing validation: MEDIUM - JLCPCB pricing verified, BOM estimates are approximations
- Shipping costs: MEDIUM - based on USPS rate calculators, needs real dimensional quotes
- Community strategy: HIGH - consistent across multiple authoritative sources
- Video production: MEDIUM - budget estimates from multiple production guides
- Pitfalls: HIGH - well-documented across numerous hardware campaign post-mortems

**Research date:** 2026-03-31
**Valid until:** 2026-06-30 (stable domain, shipping rates may change)
