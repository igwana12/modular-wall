---
phase: 08-kickstarter-campaign
plan: 02
subsystem: manufacturing
tags: [bom, jlcpcb, shipping, production-timeline, kickstarter, hardware-costing]

# Dependency graph
requires:
  - phase: 07-spirit-sphere-integration
    provides: "Enclosure specs, battery system, wiring diagram for BOM costing"
  - phase: 04-oracle-engine-hardware
    provides: "ESP32-S3 component list and audio hardware specs"
provides:
  - "Oracle Engine BOM with per-component pricing at qty 100 and qty 500"
  - "Spirit Sphere BOM with add-on components and margin analysis"
  - "JLCPCB 3-phase validation plan (bare PCB -> SMT assembled -> production run)"
  - "Dimensional shipping analysis across 4 regions with BackerKit strategy"
  - "Production timeline April 2026 through June 2027 with CNY gap flagged"
affects: [08-kickstarter-campaign]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "BOM margin formula: BOM x 3.5 = retail target, then validate against fees/yield/shipping/contingency"
    - "3-phase PCB validation: 5 bare -> 10 assembled -> 500 production"

key-files:
  created:
    - campaign/manufacturing/bom-oracle-engine.md
    - campaign/manufacturing/bom-spirit-sphere.md
    - campaign/manufacturing/jlcpcb-validation.md
    - campaign/shipping/shipping-analysis.md
    - campaign/manufacturing/production-timeline.md
  modified: []

key-decisions:
  - "Oracle Engine BOM $22.05 at qty 100, $16.30 at qty 500 -- validates $79 early bird with healthy margin"
  - "Spirit Sphere BOM adds $24-40 over Oracle Engine for LED/motor/battery -- validates $179 early bird"
  - "JLCPCB 3-phase approach: $2 bare PCBs first, $35-50 SMT batch second, production quote third"
  - "BackerKit post-campaign shipping collection avoids 5% KS fee on shipping charges"
  - "CNY gap February 2027 flagged -- component orders must be placed by mid-January"
  - "Self-fulfill under 500 units; evaluate 3PL (eFulfillment/Fulfillrite) above 500"

patterns-established:
  - "Manufacturing validation pattern: BOM -> small batch -> yield test -> production run"
  - "Shipping estimate pattern: dimensional weight + 15% padding for rate increases"

requirements-completed: [KS-04, KS-05]

# Metrics
duration: 6min
completed: 2026-03-31
---

# Phase 08 Plan 02: Manufacturing Validation Summary

**Production BOMs for Oracle Engine ($22/unit) and Spirit Sphere ($46-56/unit) with JLCPCB validation plan, dimensional shipping analysis across 4 regions, and CNY-aware production timeline through June 2027**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-31T13:24:00Z
- **Completed:** 2026-03-31T13:35:00Z
- **Tasks:** 3 (2 auto + 1 checkpoint)
- **Files modified:** 5

## Accomplishments
- Itemized BOMs for both products with per-component pricing at qty 100 and qty 500, including LCSC part numbers
- Margin analysis validates $79 Oracle Engine and $179 Spirit Sphere early bird pricing after KS fees, yield loss, shipping, and contingency
- 3-phase JLCPCB validation plan from $2 prototype PCBs through 500-unit production run
- Shipping analysis covering US, Canada, Europe, and Asia/Pacific with BackerKit post-campaign collection strategy
- Production timeline spanning April 2026 through June 2027 with explicit CNY gap risk mitigation

## Task Commits

Each task was committed atomically:

1. **Task 1: Create detailed BOMs and JLCPCB validation plan** - `25be7ad` (feat)
2. **Task 2: Create shipping analysis and production timeline** - `d26f9d3` (feat)
3. **Task 3: Verify manufacturing costs and pricing viability** - checkpoint approved, no commit

**Plan metadata:** TBD (docs: complete plan)

## Files Created/Modified
- `campaign/manufacturing/bom-oracle-engine.md` - Detailed BOM for Oracle Engine with margin analysis proving $79 early bird
- `campaign/manufacturing/bom-spirit-sphere.md` - Spirit Sphere BOM with add-on components and $179 early bird validation
- `campaign/manufacturing/jlcpcb-validation.md` - 3-phase PCB manufacturing validation plan with EasyEDA design requirements
- `campaign/shipping/shipping-analysis.md` - Dimensional shipping analysis across 4 regions with BackerKit strategy
- `campaign/manufacturing/production-timeline.md` - April 2026 through June 2027 timeline with CNY gap flagged

## Decisions Made
- Oracle Engine BOM totals $22.05 (qty 100) / $16.30 (qty 500) -- 3.5x multiplier validates $79 early bird
- Spirit Sphere adds $24-40 in LED, motor, battery, and larger enclosure costs -- 3.5x validates $179 early bird
- JLCPCB 3-phase validation: bare PCBs ($2), SMT assembled ($35-50), then production quote (500 units)
- BackerKit collects shipping post-campaign to avoid 5% KS fee on shipping charges
- Self-fulfill under 500 units; evaluate 3PL above 500
- Component orders must be placed by mid-January 2027 to beat CNY shutdown

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Manufacturing cost data ready for campaign page tier pricing (Plan 01)
- Production timeline feeds into Risks & Challenges section of campaign copy
- Shipping estimates enable BackerKit configuration during campaign setup
- JLCPCB validation plan provides concrete next steps for hardware prototyping

---
*Phase: 08-kickstarter-campaign*
*Completed: 2026-03-31*
