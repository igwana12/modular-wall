# Email Drip Sequences — Kit (ConvertKit) Integration

## Overview

All email sequences managed through Kit, building on the Phase 3 integration (deposit webhooks, tag-based routing). Sequences trigger based on subscriber tags and timed delays.

---

## Tag Strategy

| Tag | Applied When | Purpose |
|-----|-------------|---------|
| `deposit_holder` | Stripe $1 deposit webhook | Paid early supporters |
| `email_only` | Landing page signup without deposit | Interest but no commitment |
| `backer_oracle_engine` | BackerKit tier import | Oracle Engine Kickstarter backers |
| `backer_spirit_sphere` | BackerKit tier import | Spirit Sphere Kickstarter backers |
| `backer_maker_edition` | BackerKit tier import | Maker Edition backers |
| `discord_member` | Discord OAuth or manual tag | Active community members |
| `github_contributor` | Manual tag | Open-source contributors |

---

## Pre-Launch Sequence (12 weeks before campaign)

### Email 1: Week 12 -- "We're building something mythological"

- **Subject:** We're building a voice AI oracle that channels Greek gods
- **Preview text:** Speak to Zeus. Hear Athena's wisdom. An ESP32-powered crystal ball.
- **Body outline:**
  - What the Orb is: a desktop voice AI oracle with 21 Greek deity personas
  - Why we're building it: mythology meets technology, Sacred Circuits vision
  - What's coming: Kickstarter campaign in 12 weeks
  - Open-source commitment: firmware will be fully open on GitHub
- **CTA:** "Join our Discord" (link to The Orb server)
- **Audience:** All subscribers (`deposit_holder` + `email_only`)
- **Trigger:** Manual send at Week 12

### Email 2: Week 8 -- "Open-source and open-hearted"

- **Subject:** Our firmware is now open-source on GitHub
- **Preview text:** MIT-licensed ESP32-S3 firmware. Fork it, mod it, build with us.
- **Body outline:**
  - GitHub repo is live: orb-firmware
  - What's open: all firmware (MIT), hardware designs (CERN-OHL-S-2.0), enclosure STLs (CC BY-SA 4.0)
  - What's proprietary: deity voices, oracle prompts, PANTHEON art
  - How to contribute: link to CONTRIBUTING.md
  - Community building: meet other builders in Discord #firmware-dev
- **CTA:** "Star the repo on GitHub" (link to orb-firmware)
- **Audience:** All subscribers
- **Trigger:** Week 8 timed delay from sequence start

### Email 3: Week 4 -- "Hear Zeus speak"

- **Subject:** Zeus has something to say to you (press play)
- **Preview text:** 21 AI voices. One oracle. Early bird pricing revealed inside.
- **Body outline:**
  - Embedded audio/video: 30-second deity voice demo (Zeus reading)
  - All 21 deities available at launch, each with unique ElevenLabs voice
  - Early bird pricing reveal: $149 Oracle Engine / $179 Spirit Sphere / $249 Maker Edition
  - Limited early bird slots (first 200 backers per tier)
  - Kickstarter pre-launch page is live -- follow to get notified
- **CTA:** "Follow on Kickstarter" (pre-launch page link)
- **Audience:** All subscribers
- **Trigger:** Week 4 timed delay

### Email 4: Week 2 -- "48 hours to go"

- **Subject:** The Orb launches in 48 hours
- **Preview text:** Early bird slots are limited. Here's exactly what to do on launch day.
- **Body outline:**
  - Countdown: campaign goes live [DATE] at [TIME] EST
  - Step-by-step: how to back on Kickstarter (link, select tier, confirm)
  - Early bird urgency: limited quantities, first-come first-served
  - Deposit holders: your $1 will be credited toward any pledge
  - Share with friends: referral tracking link (if using Kickbooster)
- **CTA:** "Set a reminder" (Kickstarter pre-launch page)
- **Audience:** All subscribers
- **Trigger:** Week 2 timed delay

### Email 5: Launch Day -- "We're LIVE"

- **Subject:** The Orb is LIVE on Kickstarter -- back now for early bird pricing
- **Preview text:** Campaign is live. Early bird slots going fast.
- **Body outline:**
  - Direct campaign link (top of email, large button)
  - Tier breakdown: Oracle Engine / Spirit Sphere / Maker Edition
  - Social proof: "[X] backers in the first hour" (update manually if sending in waves)
  - Stretch goals preview: what unlocks at $25K, $50K, $100K
  - Thank you: "You've been with us since [tag-specific: deposit/email signup]"
- **CTA:** "Back The Orb Now" (direct Kickstarter campaign link)
- **Audience:** All subscribers (segmented send: `deposit_holder` first, then `email_only` 2 hours later)
- **Trigger:** Manual send on launch day

---

## Post-Campaign Sequence (for backers via BackerKit import)

### Email 6: Month 1 -- "Your pledge is locked in"

- **Subject:** Welcome aboard, backer -- here's what happens next
- **Preview text:** Timeline, community access, and your first update.
- **Body outline:**
  - Pledge confirmation and tier recap
  - Manufacturing timeline: PCB fabrication (Month 2-3), assembly (Month 4), shipping (Month 5-6)
  - Discord invite (if not already joined): exclusive #kickstarter channels
  - BackerKit survey coming in 2 weeks: shipping address, add-ons
  - Monthly update schedule: first Wednesday of each month
- **CTA:** "Join the Discord" (server invite link)
- **Audience:** `backer_oracle_engine` + `backer_spirit_sphere` + `backer_maker_edition`
- **Trigger:** Immediate on BackerKit import

### Email 7: Month 3 -- "Manufacturing update"

- **Subject:** Your Orb is taking shape -- photos inside
- **Preview text:** JLCPCB boards arrived. Assembly progress photos.
- **Body outline:**
  - PCB photos from JLCPCB (real manufacturing progress)
  - Component sourcing status: ESP32-S3, speakers, microphones
  - 3D printing enclosure iterations (photos of prototypes)
  - Firmware milestone: what's been added since campaign
  - Community contributions: highlight any merged PRs from #firmware-dev
- **CTA:** "See more in #build-log" (Discord channel link)
- **Audience:** All backers
- **Trigger:** Month 3 timed delay

### Email 8: Month 5 -- "Shipping soon"

- **Subject:** Your Orb ships in [X] weeks -- verify your address
- **Preview text:** BackerKit survey reminder. Last chance to update shipping details.
- **Body outline:**
  - Shipping timeline: units ship [DATE], expected delivery [DATE RANGE]
  - BackerKit survey: verify shipping address (direct link to their survey)
  - Address change deadline: [DATE] -- no changes after this date
  - Unboxing guide: what to expect in the box, first-setup instructions link
  - Quick start: download companion app (if applicable), connect to WiFi
- **CTA:** "Verify Your Address" (BackerKit survey link)
- **Audience:** All backers
- **Trigger:** Month 5 timed delay

---

## Kit Technical Setup

### Automation Rules
1. **Deposit webhook** -> Apply `deposit_holder` tag -> Enter pre-launch sequence
2. **Landing page signup** -> Apply `email_only` tag -> Enter pre-launch sequence
3. **BackerKit import** -> Apply tier-specific tag -> Enter post-campaign sequence
4. **Discord OAuth** -> Apply `discord_member` tag (informational only)

### Sequence Timing
- Pre-launch: 12-week countdown, emails at weeks 12, 8, 4, 2, and launch day
- Post-campaign: Triggered by BackerKit import, then month 1, 3, 5 delays

### A/B Testing Plan
- Subject lines: test 2 variants for Email 1 and Email 5 (highest-stakes sends)
- Send time: test morning (9 AM EST) vs evening (7 PM EST) for Email 5

### Metrics Targets
| Metric | Pre-Launch Target | Post-Campaign Target |
|--------|-------------------|----------------------|
| Open rate | 40%+ | 50%+ |
| Click-through rate | 8%+ | 12%+ |
| Unsubscribe rate | <1% | <0.5% |

---

*Created: 2026-03-31*
*Requirement: KS-06 (Community & Pre-Launch Strategy)*
*Integration: Phase 3 Kit/ConvertKit webhook infrastructure*
