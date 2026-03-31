---
phase: 08-kickstarter-campaign
plan: 01
subsystem: campaign-copy
tags: [kickstarter, campaign-page, reward-tiers, faq, risks, stretch-goals, maker-edition]

# Dependency graph
requires:
  - phase: 08-kickstarter-campaign
    plan: 02
    provides: "Oracle Engine BOM $16.40 @ qty 500, Spirit Sphere BOM $60.25 @ qty 500, pricing validation"
provides:
  - "Complete Kickstarter campaign page copy with hook, problem, solution, maker story, tiers, and CTA"
  - "5 reward tiers with early bird pricing: Digital ($15), Cards ($35/$29), Engine ($99/$79), Sphere ($229/$179), Collector ($279/$219)"
  - "20-question FAQ covering Maker Edition, AI pipeline, open-source, shipping, warranty, and privacy"
  - "8-category risks section: first hardware project, yield loss, supply chain, fragility, timeline, tariffs, API costs"
  - "Software-only stretch goals: 5 deities ($25K), multi-language ($50K), personality creator ($75K), animations ($100K), mobile app ($150K)"
affects: [08-kickstarter-campaign]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Campaign page structure: hook (3-sec grab) -> problem (locked wisdom) -> solution (conversational mythology) -> how it works (tech stack) -> maker story (transparency) -> tiers (urgency) -> AI disclosure -> timeline -> open-source commitment"
    - "Tier pricing psychology: Digital ($15 entry) -> Cards ($35 physical) -> Engine ($79 impulse threshold) -> Sphere ($179 premium desk gadget) -> Collector ($219 superfan exclusive)"
    - "Risk disclosure pattern: risk -> why it could happen -> mitigation -> worst-case scenario (honest, not defensive)"

key-files:
  created:
    - campaign/copy/campaign-page.md
    - campaign/copy/tier-structure.md
    - campaign/copy/faq.md
    - campaign/copy/risks-and-challenges.md
    - campaign/copy/stretch-goals.md
  modified: []

key-decisions:
  - "Maker Edition positioning throughout: assembled but hackable, not sealed appliance"
  - "Early bird limits: 1000 cards, 500 engines, 500 spheres, 200 collectors (controls margin exposure at low volume)"
  - "All stretch goals software-only: no hardware additions to avoid scope creep and BOM explosion"
  - "BackerKit post-campaign shipping: avoids 5% KS fee on shipping, allows accurate weight-based quotes"
  - "AI transparency disclosure: Claude LLM for readings, ElevenLabs for voices, FLUX for art (Kickstarter requirement)"
  - "Timeline set conservatively: 6-7 months campaign-to-fulfillment, accounts for CNY shutdown"
  - "Open-source split: firmware/hardware open (MIT/CERN-OHL-S/CC BY-SA), content proprietary (voices, art, prompts)"

patterns-established:
  - "Campaign copy structure: audience scrolling Kickstarter, 3-sec hook required, problem-solution-demo-story-CTA flow"
  - "Tier design pattern: low-friction digital entry -> physical collectible -> primary hardware -> flagship hardware -> premium exclusive"
  - "Stretch goal delivery: post-fulfillment OTA updates, 2-9 month delivery window, ships to ALL backers automatically"

requirements-completed: [KS-02, KS-03]

# Metrics
duration: 9min
completed: 2026-03-31
---

# Phase 08 Plan 01: Campaign Page Copy Summary

**Complete Kickstarter campaign copy across 5 files: page content, 5 reward tiers with early bird pricing, 20-question FAQ, 8-category risks section, and software-only stretch goals**

## Performance

- **Duration:** 9 min
- **Started:** 2026-03-31T13:50:00Z
- **Completed:** 2026-03-31T13:59:00Z
- **Tasks:** 2 (both auto)
- **Files created:** 5

## Accomplishments
- Full campaign page copy following research-validated 9-section structure: hook, problem, solution, how it works, maker story, tiers, AI transparency, timeline, open-source commitment
- 5 reward tiers: Digital Oracle ($15), Oracle Card Deck ($35/$29 early bird), Oracle Engine ($99/$79 early bird), Spirit Sphere ($229/$179 early bird), Collector Bundle ($279/$219 early bird)
- Tier structure includes BOM margin analysis showing $79 Oracle Engine (4.8x multiplier @ qty 500) and $179 Spirit Sphere (3.0x @ qty 500)
- 20-question FAQ covering Maker Edition definition, AI pipeline, open-source split, 21 deities, offline mode, international shipping, custom backends, warranty, privacy
- Honest risks section addresses 8 categories: first hardware project, yield loss, shipping costs, component supply chain, POV fragility, timeline slippage, tariffs, API costs
- Software-only stretch goals with zero BOM impact: 5 additional deity voices ($25K), multi-language support ($50K), custom personality protocol creator ($75K), ambient animation modes ($100K), mobile companion app ($150K)

## Task Commits

Each task was committed atomically:

1. **Task 1: Campaign page and tier structure** - `409035e` (feat)
2. **Task 2: FAQ, risks, and stretch goals** - `61a8e3f` (feat)

**Plan metadata:** `61a8e3f` (docs: complete plan)

## Files Created/Modified
- `campaign/copy/campaign-page.md` - Full Kickstarter campaign page with hook, problem, solution, maker story, tiers, AI transparency, timeline, open-source commitment
- `campaign/copy/tier-structure.md` - 5 reward tiers with pricing rationale, BOM math (4.8x Oracle Engine, 3.0x Spirit Sphere), early bird strategy, funding goal calculation
- `campaign/copy/faq.md` - 20 questions covering Maker Edition, AI stack, open-source, deities, offline mode, shipping, custom backends, warranty, privacy
- `campaign/copy/risks-and-challenges.md` - 8 risk categories with mitigation and worst-case scenarios: first hardware project, yield loss, shipping, supply chain, fragility, timeline, tariffs, API costs
- `campaign/copy/stretch-goals.md` - Software-only stretch goals ($25K to $150K) with zero BOM impact, delivery timelines, and stretch goal principles

## Decisions Made
- Maker Edition positioning is consistent across all files: assembled but hackable, not sealed consumer appliance
- Early bird limits set to control margin exposure: 1000 cards, 500 engines, 500 spheres, 200 collectors
- All stretch goals are software-only to avoid scope creep (firmware updates, web features, mobile app — zero hardware additions)
- BackerKit post-campaign shipping collection avoids 5% Kickstarter fee on shipping charges
- AI transparency disclosure meets Kickstarter requirement: Claude LLM, ElevenLabs TTS, FLUX art generation
- Timeline set conservatively at 6-7 months (campaign to fulfillment) with CNY shutdown explicitly planned
- Open-source split: firmware/hardware open (MIT/CERN-OHL-S/CC BY-SA), content proprietary (voices, art, reading protocols)
- Risks section is honest about first-time hardware creator status, not defensive

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - campaign copy is ready for Kickstarter page creation.

## Next Phase Readiness
- Campaign page copy is foundation for all downstream assets (video script, Discord messaging, email sequences)
- Tier structure with BOM math ready for Kickstarter project configuration
- FAQ anticipates backer questions and reduces comment volume during campaign
- Risks section meets Kickstarter transparency requirement
- Stretch goals provide funding incentives without manufacturing risk

## Self-Check: PASSED

**File Existence:**
- FOUND: campaign/copy/campaign-page.md
- FOUND: campaign/copy/tier-structure.md
- FOUND: campaign/copy/faq.md
- FOUND: campaign/copy/risks-and-challenges.md
- FOUND: campaign/copy/stretch-goals.md

**Commit Existence:**
- FOUND: 409035e (Task 1 - campaign page and tier structure)
- FOUND: 61a8e3f (Task 2 - FAQ, risks, and stretch goals)

All files created and commits verified.

---
*Phase: 08-kickstarter-campaign*
*Completed: 2026-03-31*
