---
phase: 08-kickstarter-campaign
plan: 04
subsystem: video-production-prep
tags: [video, scripts, storyboard, gear, influencer-outreach]
dependency_graph:
  requires: [08-01-manufacturing-bom, 08-03-campaign-copy]
  provides: [video-scripts, storyboard, shot-list, gear-plan, influencer-strategy]
  affects: [campaign-video-production, prototype-seeding]
tech_stack:
  added: [DaVinci-Resolve, lavalier-mic, softbox-lights]
  patterns: [McKee-storytelling, hook-problem-solution, DIY-video-production]
key_files:
  created:
    - campaign/video/script-30s.md
    - campaign/video/script-full.md
    - campaign/video/storyboard.md
    - campaign/video/shot-list.md
    - campaign/video/gear-and-setup.md
    - campaign/community/influencer-outreach.md
  modified: []
decisions:
  - context: "30s demo script structure"
    decision: "Hook with Zeus voice (0-3s), Spirit Sphere reveal (3-10s), products + pricing (20-27s), CTA (27-30s)"
    rationale: "Mysterious opening grabs attention, clear pricing creates urgency, mythology voice establishes tone"
  - context: "Full video structure"
    decision: "6-section flow: Hook → Problem → Solution Demo → How It Works → Maker Story → Tiers/CTA (2:30-3:00)"
    rationale: "Follows proven hardware Kickstarter pattern: emotional hook, establish need, demonstrate solution, build trust with transparency"
  - context: "Storyboard categorization"
    decision: "Tag all 28 shots as READY NOW (10 shots), NEEDS_HARDWARE (17 shots), or POST_PRODUCTION (2 shots)"
    rationale: "Clear dependency tracking — 63% of video blocked until July 2026 hardware prototypes ready, but 37% can be filmed immediately"
  - context: "Gear budget recommendation"
    decision: "$300-500 starting budget (iPhone + tripod + lavalier + softbox), DaVinci Resolve (free) for editing"
    rationale: "iPhone 4K video is sufficient, audio quality matters more than camera quality, free professional editing software eliminates subscription costs"
  - context: "Influencer outreach strategy"
    decision: "Tier 1 priority: Andreas Spiess, Random Nerd Tutorials, Unexpected Maker, Volos Projects (ESP32 specialists)"
    rationale: "ESP32-focused channels reach target maker audience directly — 1-2 reviews from Tier 1 = campaign success, broader tech channels are secondary"
  - context: "Prototype seeding budget"
    decision: "10 units: 5 Oracle Engines ($110) + 5 Spirit Spheres ($400) = $510 hardware + $265-385 shipping"
    rationale: "Mix based on channel focus — ESP32 channels get simpler Oracle Engine, visual/maker channels get impressive Spirit Sphere"
  - context: "Outreach timeline"
    decision: "8-week pre-launch: outreach Week -6, units ship Week -5, embargo lifts Week -1"
    rationale: "Gives reviewers 4-6 weeks to test and record, aligns video publish with campaign launch for maximum impact"
metrics:
  duration_minutes: 10
  tasks_completed: 2
  files_created: 6
  commits: 2
  deviations: 0
completed_date: 2026-03-31
---

# Phase 08 Plan 04: Video Production Preparation Summary

**One-liner:** Complete video production prep with McKee-driven scripts (30s + 2:30min), 28-shot storyboard categorized by hardware dependency, DIY gear plan under $500, and ESP32 YouTuber outreach strategy targeting Andreas Spiess + Random Nerd Tutorials.

---

## What Was Built

### Video Scripts (2 files)
**campaign/video/script-30s.md** — 30-second demo video script:
- 0-3s: Hook with Spirit Sphere glowing, Zeus voice ("The path you seek was never hidden...")
- 3-10s: Reveal full sphere with POV display ("This is The Orb")
- 10-20s: Demo cuts (person speaking, Oracle Engine glowing, deity responding)
- 20-27s: Product shots with pricing (Oracle Engine $79, Spirit Sphere $179)
- 27-30s: CTA ("The gods are waiting" + oracleball.ai URL)

**campaign/video/script-full.md** — 2:30-3:00 full campaign video:
1. **Hook (0-10s):** Spirit Sphere glowing, Zeus asks "What weighs on your mind?"
2. **Problem (10-30s):** Mythology locked in books/museums, inaccessible
3. **Solution Demo (30-90s):** Oracle Engine voice demo (Zeus responds to work decision), Spirit Sphere volumetric display (Athena on logic vs intuition), 21 deities showcased
4. **How It Works (90-120s):** ESP32-S3 tech stack, WebSocket audio pipeline, POV display mechanics, open-source commitment
5. **Maker Story (120-150s):** Creator talking head — Maker Edition positioning, Sacred Circuits background, transparency about first hardware project
6. **Tiers and CTA (150-180s):** Oracle Engine $79 early bird, Spirit Sphere $179 early bird, both include card deck + lifetime digital access

**McKee principles applied:**
- Value reversal: Ancient mythology distant → technology makes it conversational → open-source empowers you to hack it
- Escalation: Voice AI oracle → volumetric display → fully hackable Maker Edition
- Controlling idea: Mythology deserves a living voice, not a museum case — delivered through climax (open-source empowerment)

---

### Storyboard (1 file)
**campaign/video/storyboard.md** — Shot-by-shot visual breakdown:
- **30s demo:** 9 shots with timing, camera angles, audio notes, hardware dependency tags
- **Full video:** 28 shots across 6 sections with duration, visual descriptions, text overlays, lighting requirements

**Shot categorization:**
- **READY NOW (10 shots):** Talking head, B-roll (books, museum, desk), screen recordings (GitHub, web app), voiceover
- **NEEDS_HARDWARE (17 shots):** All Spirit Sphere glow/POV shots, Oracle Engine voice demos, PCB close-ups, product shots
- **POST_PRODUCTION (2 shots):** Animated flow chart, fade to black transitions

**Key insight:** 63% of video (17/28 shots) is blocked until July 2026 hardware prototypes ready. 37% can be filmed immediately.

---

### Shot List (1 file)
**campaign/video/shot-list.md** — Production-ready categorized list:
- Extracted all shots from storyboard, organized by readiness
- **READY NOW:** Talking head setups (2-3 hours filming), B-roll (1-2 hours), screen recordings (1 hour), voiceover (2-3 hours)
- **BLOCKED:** Spirit Sphere demos (8 shots), Oracle Engine demos (4 shots), hardware close-ups (2 shots), product shots (3 shots) — requires July 2026 prototypes
- **POST_PRODUCTION:** Color grading, audio mixing, text overlays, animated diagrams (14-23 hours total)

**Production timeline estimate:**
- Phase 1 (READY NOW): 2-3 days filming + 1 day rough edit
- Phase 2 (BLOCKED): 3-5 days filming once hardware ready
- Phase 3 (POST_PRODUCTION): 3-5 days final assembly
- **Total realistic timeline:** 12-16 days from first shot to final export

**Filming requirements:**
- Low ambient light critical for Spirit Sphere glow visibility (<10 lux)
- POV display camera capture may require frame rate testing (24fps vs 30fps vs 60fps)
- Audio quality matters more than video quality — lavalier mic essential

---

### Gear and Setup Guide (1 file)
**campaign/video/gear-and-setup.md** — DIY production on $200-1085 budget:

**Essential setup ($200-280):**
- Camera: iPhone horizontal (already owned) — 4K video sufficient
- Tripod: $30 basic model (AmazonBasics 60")
- Audio: $50-100 lavalier mic (RODE smartLav+) — audio quality > video quality
- Lighting: $50-80 two softbox lights (Neewer 700W kit)
- Software: DaVinci Resolve (FREE) — professional color grading, audio editing, motion graphics
- Music: Royalty-free (YouTube Audio Library, Pixabay)

**Nice-to-have upgrades ($400-600):**
- Used mirrorless camera: $200-300 (Sony a6000, Canon M50) — better low-light for Spirit Sphere shots
- Fluid head tripod: $80-120 (Manfrotto Compact Action)
- Wireless lavalier: $100-150 (RODE Wireless GO II)
- Black backdrop: $20-40 (maximize LED glow contrast)
- Macro lens or extension tubes: $50-100 (PCB close-ups)

**What NOT to buy (common mistakes):**
- Gimbal stabilizer ($100-300) — all shots are static on tripod
- Drone ($300-1000) — no aerial shots in script
- Green screen ($100-200) — no VFX compositing
- Multiple cameras ($300-600) — single-person crew shoots one angle at a time
- Savings by avoiding unnecessary gear: $1,400-3,600

**Key setup notes:**
- **Talking head:** Two softbox lights at 45° angles, clean desk background, eye-level camera, lavalier mic clipped 6-8" below chin
- **Spirit Sphere glow:** Room lights OFF, curtains closed, LED glow as primary light, ISO 1600-3200, f/2.8 aperture
- **Voiceover:** Quiet room (bedroom/closet with blankets), record 5s silence at start for noise reduction, multiple takes

**Software workflow:**
- DaVinci Resolve for editing, color grading (enhance LED glow), audio mixing, text overlays, final export
- Audacity or GarageBand for voiceover recording and noise reduction
- Export formats: 4K master, 1080p Kickstarter upload, social media crops (vertical 9:16 for TikTok)

---

### Influencer Outreach Plan (1 file)
**campaign/community/influencer-outreach.md** — ESP32 and maker YouTuber seeding strategy:

**Target channels (15+ identified):**
- **Tier 1 (ESP32 specialists, CRITICAL):** Andreas Spiess (500K subs), Random Nerd Tutorials (200K), Unexpected Maker (50K), Volos Projects (100K)
- **Tier 2 (general maker channels, MEDIUM):** Great Scott (1.2M), DroneBot Workshop (600K), bitluni (150K, POV display expert), Zack Freedman (200K), Jeff Geerling (400K)
- **Tier 3 (AI channels, LOW priority):** Two Minute Papers (1.3M), AI Explained (300K), Matt Wolfe (500K)
- **Tier 4 (organic reach):** r/esp32, r/arduino, Hackster.io, Hackaday tips

**Outreach strategy:**
- Personalized cold emails (reference specific videos, no generic mass email)
- Offer: Free review unit (Oracle Engine or Spirit Sphere), no strings attached, honest review welcome
- Timeline: Outreach Week -6, ship Week -5, embargo lifts Week -1 (1 week before campaign launch)
- Email template provided with "what NOT to say" examples (avoid desperation, hype, demands)

**Prototype seeding budget:**
- 10 units: 5 Oracle Engines ($110) + 5 Spirit Spheres ($400) = $510 hardware
- Shipping: $265-385 (mix domestic USPS Priority + international)
- Packaging + quick-start guides: $95
- **Total: $870-990**

**Expected outcomes (realistic):**
- 5-7 YouTube reviews published
- 30-60K total views across all reviews
- 20-30% of campaign traffic from YouTube (1,500-2,500 clicks)
- 10% conversion rate (150-250 backers from YouTube)
- YouTube drives 40-60% of campaign funding

**Reddit and community strategy:**
- r/esp32: Post as "Show and Tell" with technical focus, NOT sales pitch — include GitHub link prominently
- Hackster.io: Submit full build guide with BOM, schematics, assembly instructions 4 weeks before launch
- Hackaday: Email tips@hackaday.com with demo video + GitHub link (10-20% chance of feature = 10K-50K readers)

**Tracking:** Spreadsheet template provided with columns for channel name, email sent date, response, unit shipped, tracking number, review published, video URL, views, estimated conversions

---

## Deviations from Plan

None — plan executed exactly as written.

---

## Key Decisions

1. **McKee storytelling principles applied to video scripts** — value reversal (distant mythology → conversational → hackable), escalation (voice → volumetric → open-source), controlling idea (mythology deserves living voice, not museum case). Creates emotional arc beyond feature list.

2. **Storyboard categorization by hardware dependency** — tagging shots as READY NOW vs NEEDS_HARDWARE makes production timeline transparent. 37% of video can be filmed immediately (talking head, B-roll, voiceover), 63% blocked until July 2026 prototypes.

3. **iPhone is sufficient, audio quality matters more** — 4K iPhone video quality acceptable, but lavalier mic ($50-100) is non-negotiable. Viewers tolerate grainy video but abandon poor audio. DaVinci Resolve (free) provides professional color grading to enhance LED glow.

4. **Tier 1 influencer focus: ESP32 specialists** — Andreas Spiess and Random Nerd Tutorials are "The ESP32 Guy" channels. 1-2 reviews from Tier 1 = campaign success. Broader tech channels (Great Scott, Jeff Geerling) are secondary. ESP32 makers are the target audience.

5. **10-unit prototype seeding: 5 Oracle Engines + 5 Spirit Spheres** — mix based on channel focus. ESP32 channels get simpler Oracle Engine (faster to test, technical focus). Visual/maker channels get Spirit Sphere (more impressive on camera). Budget: $870-990 total.

6. **8-week outreach timeline** — outreach at Week -6 gives reviewers 4-6 weeks to test and record. Embargo lifts Week -1 so videos publish during campaign launch for maximum impact and day-1 funding surge.

7. **Reddit is free amplification, not sales pitch** — post to r/esp32 as "Show and Tell" with technical focus, GitHub link prominent. Hackster and Hackaday submissions are low-effort, high-reward (SEO value, long-tail traffic).

---

## Verification Results

**Automated checks:** PASS
- All 6 files created (script-30s, script-full, storyboard, shot-list, gear-and-setup, influencer-outreach)
- 30s script has 5 timing sections totaling 30 seconds
- Full script has 6 sections (hook, problem, solution demo, how it works, maker story, tiers/CTA) totaling 2:30-3:00
- Storyboard has 28 numbered shots with READY/NEEDS_HARDWARE/POST_PRODUCTION tags
- Shot list categorizes shots by production readiness
- Gear plan includes DaVinci Resolve, lavalier mic, softbox lights, and budget breakdown
- Influencer outreach has 15+ channels with contact strategy and 8-week timeline

**Content verification:**
- McKee principles evident in scripts (value reversal, escalation, controlling idea)
- Campaign page messaging consistency (Maker Edition, $79/$179 early bird pricing, open-source hardware)
- Hardware procurement dependency clearly documented (July 2026 prototypes needed for 63% of shots)
- DIY production budget realistic ($200-1085 range, with $300-500 recommended starting point)
- Influencer tier prioritization clear (Tier 1 ESP32 specialists critical, Tier 2 general maker channels secondary)

---

## Production Readiness

**Video production can begin immediately for 37% of shots:**
- Talking head segments (creator intro, maker story, transparency)
- B-roll (mythology books, desk contemplation, screen recordings)
- Voiceover recording (all sections, ~400 words total)
- Text overlay plates and animated flow chart (post-production)

**Estimated time for READY NOW shots:** 4-6 hours filming + 1 day rough editing

**Remaining 63% blocked until July 2026:**
- All Spirit Sphere glow and POV display shots (8 shots)
- All Oracle Engine voice demo shots (4 shots)
- PCB close-up and hardware detail shots (2 shots)
- Product shots for pricing/CTA section (3 shots)

**Estimated time for BLOCKED shots:** 8-12 hours filming once hardware ready

**Post-production (final assembly):** 3-5 days for color grading, audio mixing, text overlays, final export

**Total realistic production timeline:** 12-16 days from first shot to final export (assumes 3-5 day gap between Phase 1 and Phase 2 filming)

---

## Influencer Outreach Readiness

**Can begin outreach immediately after:**
- GitHub repo published with firmware skeleton (August 2026 per timeline)
- 10 prototype units assembled and tested (July 2026)
- Quick-start guide and assembly instructions finalized (can draft now, finalize after hardware validation)

**Outreach timeline for late October / early November campaign launch:**
- Week -8 (early September): Research channels, draft personalized emails
- Week -6 (mid-September): Send cold outreach to Tier 1 and Tier 2 channels
- Week -5 (late September): Ship units to confirmed channels
- Week -4 to -2 (October): Reviewers test and record
- Week -1 (late October): Embargo lifts, videos publish
- Launch day (late October / early November): 3-5 YouTube reviews live, driving day-1 funding surge

---

## Self-Check: PASSED

**Files created:**
```bash
$ ls -1 campaign/video/*.md campaign/community/*.md
campaign/video/script-30s.md ✓
campaign/video/script-full.md ✓
campaign/video/storyboard.md ✓
campaign/video/shot-list.md ✓
campaign/video/gear-and-setup.md ✓
campaign/community/influencer-outreach.md ✓
```

**Commits created:**
```bash
$ git log --oneline | head -2
9cb8283 feat(08-kickstarter-campaign): create shot list, gear plan, and influencer outreach ✓
eaf43a6 feat(08-kickstarter-campaign): write video scripts and storyboard ✓
```

**Content verification:**
- 30s script structure: ✓ (hook, reveal, demo, products, CTA)
- Full script structure: ✓ (hook, problem, solution, how it works, maker story, tiers/CTA)
- Storyboard categorization: ✓ (READY NOW, NEEDS_HARDWARE, POST_PRODUCTION tags present)
- Shot list organization: ✓ (categorized by production readiness with time estimates)
- Gear budget: ✓ ($200-1085 range, DaVinci Resolve, lavalier mic, softbox lights)
- Influencer channels: ✓ (15+ channels across 4 tiers, contact methods, outreach timeline)

All plan requirements met. Video production prep is complete and ready for execution once hardware prototypes available (July 2026).

---

## Impact

**Immediate (Wave 3 complete):**
- Video production creative decisions complete — no bottleneck when hardware prototypes ready
- 37% of video shots can be filmed now (talking head, B-roll, voiceover)
- Influencer outreach strategy ready to execute 8 weeks before launch
- DIY gear plan keeps video production budget under $1,000

**Near-term (Phases 4-7 hardware procurement):**
- Hardware procurement timeline (June-July 2026) gates 63% of video shots
- PCB prototyping and assembly must succeed before video production can complete
- Working Spirit Sphere POV display is highest-risk filming requirement (low-light, frame rate testing)

**Campaign launch (Late October / early November 2026):**
- Campaign video is highest-impact asset (70%+ of backers watch before pledging)
- YouTube reviews from ESP32 specialists (Andreas Spiess, Random Nerd Tutorials) drive 40-60% of funding
- Maker Edition positioning and open-source transparency build trust (first-time hardware maker)

**Long-tail (Post-campaign):**
- YouTube reviews continue driving traffic months after campaign ends
- Hackster.io project page and Hackaday features provide SEO value
- DaVinci Resolve workflow and gear setup reusable for future product videos

---

## Known Issues

None. Plan executed without deviations or blockers.

---

## Next Steps

1. **Start filming READY NOW shots immediately** — talking head segments, B-roll, voiceover (don't wait for hardware)
2. **Purchase essential gear** — tripod ($30), lavalier mic ($50-100), softbox lights ($50-80), total $130-210
3. **Download DaVinci Resolve and start learning** — 2-3 hours to learn basics before shooting
4. **Wait for hardware prototypes (July 2026)** — film Spirit Sphere and Oracle Engine demos once devices functional
5. **Research influencer channels** — watch recent videos from Andreas Spiess, Random Nerd Tutorials, bitluni to understand content style
6. **Draft personalized outreach emails** — reference specific videos, prepare for Week -6 cold outreach (mid-September 2026)
7. **Publish GitHub repo with firmware skeleton (August 2026)** — trust signal for influencer outreach and campaign credibility
8. **Assemble 10 prototype units (July 2026)** — 5 Oracle Engines + 5 Spirit Spheres ready to ship Week -5 (late September)
