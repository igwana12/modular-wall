# Production Timeline -- Oracle Engine & Spirit Sphere

Manufacturing and fulfillment timeline targeting October/November 2026 Kickstarter launch with June 2027 delivery.

**Critical constraint:** Chinese New Year (CNY) 2027 falls in late January/early February. All JLCPCB production orders must be placed by mid-January 2027, or delayed until mid-March 2027.

## Timeline Overview

```
2026 Apr May Jun Jul Aug Sep Oct Nov Dec | 2027 Jan Feb Mar Apr May Jun
 |----PCB Design----|                     |
                     |--Proto--|           |
                               |--Test----|
                                    |--Community Building--|
                                          |--Video--|
                                               |LAUNCH|--Campaign--|
                                                                   |--Surveys+Order--|
                                                                        |==CNY GAP==|
                                                                                |--Production--|
                                                                                         |--Ship--|
```

## Detailed Monthly Plan

### April 2026: Hardware Procurement + PCB Design Start

| Week | Activity | Deliverable | Owner |
|------|----------|-------------|-------|
| 1-2 | Order critical components (ESP32-S3-WROOM-1, INMP441, MAX98357A) | Components in hand | Builder |
| 2-3 | Begin PCB schematic in EasyEDA | Schematic complete | Builder |
| 3-4 | PCB layout (component placement, routing) | Layout draft | Builder |

**Key risks:** Component lead times from AliExpress (1-2 weeks). Order from Amazon/Mouser for faster delivery if needed at slight premium.

**Budget allocation:** $300-500 for components (from $2-5K pre-KS budget)

### May 2026: PCB Design Finalization + Bare Board Order

| Week | Activity | Deliverable | Owner |
|------|----------|-------------|-------|
| 1-2 | DRC validation in EasyEDA, peer review of schematic | Error-free design | Builder |
| 2-3 | Order 5 bare PCBs from JLCPCB (Phase 1 validation) | Bare boards received | Builder |
| 3-4 | Hand-place components on bare boards, verify footprints | Footprint validation report | Builder |

**Go/no-go gate:** All component footprints match. If misaligned, redesign and re-order (adds 2 weeks).

**Budget allocation:** $10-15 for bare PCBs

### June 2026: Assembled Prototype Order

| Week | Activity | Deliverable | Owner |
|------|----------|-------------|-------|
| 1 | Submit 10-unit SMT assembly order to JLCPCB (Phase 2) | Order placed | Builder |
| 2-3 | Receive assembled boards, begin testing | 10 assembled PCBs | Builder |
| 3-4 | Flash firmware, run audio I/O tests | Functional validation | Builder |

**Key risks:** LCSC component stock -- verify all parts available before ordering. Out-of-stock parts delay assembly by weeks.

**Budget allocation:** $60-80 for assembled prototypes

### July 2026: Prototype Testing + Validation

| Week | Activity | Deliverable | Owner |
|------|----------|-------------|-------|
| 1-2 | Full functional testing (WiFi, voice AI pipeline, POV display) | Test results document | Builder |
| 2-3 | 24-hour stress testing, yield documentation | Reliability report | Builder |
| 3-4 | Spirit Sphere integration testing (motor, LEDs, slip ring) | Integration validation | Builder |
| 4 | Submit Phase 3 RFQ to JLCPCB (500/1000/2000 units) | Production quotes | Builder |

**Go/no-go gate:** Minimum 8/10 boards pass all tests. If yield is below 80%, investigate root cause before proceeding.

**Budget allocation:** $0 (testing uses existing prototypes)

### August 2026: Production Firmware + Community Launch

| Week | Activity | Deliverable | Owner |
|------|----------|-------------|-------|
| 1-2 | Finalize production firmware (OTA, factory reset, provisioning) | Flash-ready binary | Builder |
| 2-3 | Open-source firmware skeleton published on GitHub | Public repo with README | Builder |
| 3-4 | Discord server launched, first build-in-public posts | Discord live, 50+ members target | Builder |

**Parallel track:** Begin assembling 5-10 complete units (Oracle Engine + Spirit Sphere) for seeding to reviewers.

### September 2026: Influencer Seeding + Community Growth

| Week | Activity | Deliverable | Owner |
|------|----------|-------------|-------|
| 1-2 | Mail prototype units to 5-10 tech YouTubers/bloggers | Units shipped with review guide | Builder |
| 2-3 | Email list building intensive (target 500-1000 signups) | Email list via Kit | Builder |
| 3-4 | Behind-the-scenes content (assembly, testing, failures) | 4-8 content pieces | Builder |

**Key YouTubers to target:** Andreas Spiess, Random Nerd Tutorials, Unexpected Maker, DroneBot Workshop, Jeff Geerling (if hardware-relevant). Research and outreach should start 8 weeks before launch.

### October 2026: Campaign Video + Pre-Launch

| Week | Activity | Deliverable | Owner |
|------|----------|-------------|-------|
| 1-2 | Campaign video production (shoot, edit) | 30s demo + 2-3min full video | Builder |
| 2-3 | Campaign page copywriting (features, timeline, risks, FAQ) | Campaign page draft | Builder |
| 3-4 | Kickstarter pre-launch page live, countdown begins | Pre-launch page active | Builder |

**Budget allocation:** $1,000-2,000 for video production

### Late October / Early November 2026: CAMPAIGN LAUNCH

| Activity | Detail |
|----------|--------|
| Launch day | **Tuesday** (highest success rate for hardware campaigns) |
| Launch time | 8-10 AM Eastern (covers US morning + EU afternoon) |
| Duration | 30 days |
| Funding goal | Conservative -- minimum viable production run (e.g., $25,000 = ~140 Oracle Engines + 70 Spirit Spheres) |
| Day 1 target | 30-50% of goal (critical for algorithm visibility) |

### November-December 2026: Campaign Runs + Late Pledges

| Week | Activity | Owner |
|------|----------|-------|
| Weeks 1-2 | Daily backer updates, stretch goal announcements, social media push | Builder |
| Weeks 3-4 | Campaign end, transition to late pledges via BackerKit | Builder |
| Post-campaign | Late pledges open for 30-60 days | BackerKit |

### January 2027: BackerKit Surveys + Component Ordering

**CNY WARNING: This is the critical ordering window.**

| Week | Activity | Deliverable | Owner |
|------|----------|-------------|-------|
| 1 | BackerKit backer surveys sent (address, size, add-ons) | Survey data | Builder |
| 1-2 | **PLACE ALL JLCPCB PRODUCTION ORDERS BY JANUARY 15** | Production order confirmed | Builder |
| 2-3 | Order all non-JLCPCB components (LEDs, motors, batteries, enclosures) | Component POs placed | Builder |
| 3-4 | Finalize BackerKit shipping profiles with real weights | Shipping rates locked | Builder |

**Why January 15 deadline:** Chinese factories begin shutting down in late January for CNY. Orders placed after January 15 may not enter production until mid-March, adding 6-8 weeks to the timeline.

### February 2027: CNY Gap -- No Manufacturing

**No JLCPCB production during this period.** Use this time for:

| Activity | Detail |
|----------|--------|
| Packaging design finalization | Custom box artwork, foam insert specs, instruction booklet printing |
| Fulfillment logistics setup | Configure BackerKit labels, set up packing station, order shipping materials |
| 3D print enclosures | If self-printing, start batch printing enclosures (not dependent on China) |
| Software updates | Any firmware or web app updates based on late backer feedback |

### March-April 2027: Production Run

| Week | Activity | Deliverable | Owner |
|------|----------|-------------|-------|
| Mar 1-2 | JLCPCB production run starts (500+ boards) | Production confirmation | JLCPCB |
| Mar 2-3 | Production QA at JLCPCB (ICT testing) | Test results | JLCPCB |
| Mar 3-4 | Boards ship from JLCPCB | Tracking number | JLCPCB |
| Apr 1-2 | Boards arrive in US | Inventory received | Builder |
| Apr 2-4 | Through-hole component soldering + final assembly | Assembled units | Builder |

**Yield budget:** Order 115% of needed quantity. At 500 pledges, order 575 boards.

### May-June 2027: Assembly, QA, and Fulfillment

| Week | Activity | Deliverable | Owner |
|------|----------|-------------|-------|
| May 1-2 | Final assembly (mount PCBs in enclosures, attach speakers) | Assembled units | Builder |
| May 2-3 | QA testing (flash firmware, functional test each unit) | QA-passed inventory | Builder |
| May 3-4 | Packaging (box, foam, accessories, quick-start card) | Packaged units | Builder |
| Jun 1-2 | US shipments | US backers fulfilled | Builder |
| Jun 2-3 | International shipments | International backers fulfilled | Builder |
| Jun 3-4 | Stragglers, replacements, customer support | All backers fulfilled | Builder |

## Critical Path

The critical path (longest chain of dependencies) runs through:

```
PCB Design (Apr-May) -> Prototype Order (Jun) -> Validation (Jul) -> Video (Oct) -> Launch (Nov)
                                                                                         |
                                                                                   Component Order (Jan 15 DEADLINE)
                                                                                         |
                                                                                   Production (Mar-Apr) -> Assembly (May) -> Ship (Jun)
```

**Total timeline:** 14 months from PCB design start to backer fulfillment.

**Biggest risk:** PCB design taking longer than expected (first-time hardware builder). If PCB design slips past May, prototype order slips to July, validation to August, and the campaign video cannot show hardware. This could push the launch to December 2026 or January 2027.

**Mitigation:** Start PCB design in EasyEDA immediately. Use reference designs from similar ESP32-S3 audio boards. Join the EasyEDA Discord for peer review.

## Budget Timeline

| Month | Spending | Cumulative | Source |
|-------|----------|------------|--------|
| April 2026 | $300-500 (components) | $300-500 | Self-funded |
| May 2026 | $10-15 (bare PCBs) | $310-515 | Self-funded |
| June 2026 | $60-80 (assembled protos) | $370-595 | Self-funded |
| July 2026 | $0 (testing) | $370-595 | Self-funded |
| August 2026 | $100-200 (assembly supplies) | $470-795 | Self-funded |
| September 2026 | $100-300 (shipping protos to reviewers) | $570-1,095 | Self-funded |
| October 2026 | $1,000-2,000 (video) | $1,570-3,095 | Self-funded |
| **Pre-campaign total** | | **$1,570-3,095** | **Within $2-5K budget** |
| January 2027 | $5,000-15,000 (production order) | -- | Kickstarter funds |
| March-June 2027 | $2,000-5,000 (assembly, shipping) | -- | Kickstarter funds |

## CNY Risk Detailed Analysis

Chinese New Year 2027 is projected for late January / early February.

| Scenario | Impact | Probability |
|----------|--------|-------------|
| Orders placed by Jan 15 | On schedule, production starts immediately post-CNY | Target scenario |
| Orders placed Jan 16-31 | 2-4 week delay, queued behind backlog | HIGH risk if surveys slow |
| Orders placed Feb 1-28 | 6-8 week delay, factory closed then backlogged | Campaign failure territory |

**Mitigation plan:**
1. Send BackerKit surveys within 48 hours of campaign end
2. Set 2-week survey deadline (with reminders)
3. Place production order based on pledge count, not survey completion -- can adjust quantities later
4. Have component POs ready to submit the moment campaign succeeds

## Stretch Goal Manufacturing Impact

| Stretch Goal Type | Manufacturing Impact | Recommendation |
|-------------------|---------------------|----------------|
| New deity voices | Zero -- firmware/cloud only | Safe stretch goal |
| New animation modes | Zero -- firmware only | Safe stretch goal |
| Multi-language support | Zero -- cloud only | Safe stretch goal |
| Additional LED arm | Significant -- new mechanical parts, assembly time | DO NOT offer as stretch goal |
| Bluetooth speaker mode | Minor -- firmware change only | Safe stretch goal |
| Custom enclosure colors | Moderate -- multiple 3D print runs | Risky, defer to add-on |

**Rule:** No stretch goals that increase BOM cost or assembly complexity. Software/firmware only.
