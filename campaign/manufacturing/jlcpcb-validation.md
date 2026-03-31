# JLCPCB Manufacturing Validation Plan

PCB design, prototyping, and production validation path for Oracle Engine and Spirit Sphere.

**Status:** PCB design NOT yet started. This document specifies requirements for when EasyEDA design begins.

## PCB Specifications (Target)

| Spec | Oracle Engine | Spirit Sphere |
|------|---------------|---------------|
| Layers | 2-layer | 2-layer (same board) |
| Dimensions | TBD (target <100x100mm for JLCPCB pricing tier) | Same board + breakout for LED driver |
| Thickness | 1.6mm (standard) | 1.6mm |
| Copper weight | 1oz (standard) | 1oz |
| Surface finish | HASL (lead-free) | HASL (lead-free) |
| Solder mask | Green (cheapest) or black (aesthetic) | Same |
| Silkscreen | White | White |
| Min trace/space | 6/6 mil (standard JLCPCB capability) | 6/6 mil |

### Key Components on PCB

**Mounted by JLCPCB SMT assembly:**
- ESP32-S3-WROOM-1 (N16R8) -- castellated pads, reflow solderable
- INMP441 MEMS microphone -- bottom-port, requires acoustic hole in PCB
- MAX98357A I2S amplifier -- QFN package
- USB-C connector (16-pin, SMD)
- Passive components (decoupling caps, LDO regulator, pull-up/pull-down resistors)

**Through-hole / hand-soldered (not JLCPCB assembled):**
- Speaker connector (JST 2-pin)
- Battery connector (JST 3-pin for 3S BMS, Spirit Sphere only)
- Motor connector (JST 2-pin, Spirit Sphere only)
- Hall sensor header (3-pin, Spirit Sphere only)
- SPI header for slip ring (4-pin, Spirit Sphere only)
- Programming/debug header (optional, for development)

### Design Notes for EasyEDA

1. Use LCSC Basic Parts Library wherever possible (no extended parts fee)
2. INMP441 requires a 1mm acoustic port hole beneath the mic -- add to PCB drill layer
3. ESP32-S3 antenna keep-out zone: no copper pour or traces within 15mm of antenna
4. USB-C connector footprint: verify against JLCPCB's recommended library part
5. Spirit Sphere connectors on board edge for easy cable routing to base

## 3-Phase Prototype Order Plan

### Phase 1: Bare PCB Validation ($2-10 + shipping)

**Purpose:** Verify PCB layout, footprints, and mechanical fit before paying for assembly.

| Item | Detail |
|------|--------|
| Order | 5 bare PCBs from JLCPCB |
| Cost | $2 (5 pcs, 2-layer, <100x100mm) + ~$8 shipping |
| Turnaround | 24 hours fabrication + 5-7 days shipping (standard) |
| Validation | Check component footprints by hand-placing parts. Verify mounting holes align with enclosure. Confirm antenna keep-out zone. |
| Timeline | **April-May 2026** (immediately after EasyEDA design complete) |

**Go/no-go criteria:**
- [ ] All SMD pads match component footprints
- [ ] INMP441 acoustic port aligns with microphone placement
- [ ] USB-C connector sits flush with enclosure opening
- [ ] Mounting holes match 3D-printed base standoffs
- [ ] No DRC errors in EasyEDA

### Phase 2: SMT Assembled Prototypes ($35-80 + shipping)

**Purpose:** Validate complete assembly, test firmware, measure yield.

| Item | Detail |
|------|--------|
| Order | 10 SMT-assembled PCBs from JLCPCB |
| Cost | ~$35-50 assembly + ~$15-20 component cost + ~$10 shipping |
| Turnaround | 3-5 days assembly + 5-7 days shipping |
| Validation | Flash firmware, test audio I/O, measure power consumption, WiFi range test, stress test (24-hour continuous operation). |
| Yield tracking | Document any assembly defects, cold solder joints, non-functional boards. |
| Use | 2-3 for internal testing, 2-3 for Spirit Sphere integration, 5 for YouTuber seeding |
| Timeline | **June 2026** |

**Go/no-go criteria:**
- [ ] 8/10 boards pass all functional tests (80% minimum yield)
- [ ] Audio quality acceptable (mic sensitivity, speaker clarity)
- [ ] WiFi connects reliably at 5m range
- [ ] Power consumption within spec (USB-C: <500mA idle, <800mA active)
- [ ] 24-hour stress test: no crashes, no memory leaks
- [ ] Firmware OTA update works

### Phase 3: Production Run Quote Request (500+ units)

**Purpose:** Get formal production pricing for Kickstarter fulfillment.

| Item | Detail |
|------|--------|
| Action | Submit RFQ to JLCPCB for 500-unit and 1000-unit runs |
| Include | Gerber files, BOM, pick-and-place file, assembly drawing |
| Request | Per-unit pricing, lead time, ICT testing option, packaging options |
| Compare | Also get quotes from PCBWay and AllPCB for leverage |
| Timeline | **July 2026** (after Phase 2 validation complete) |

**Information needed for RFQ:**
- Finalized Gerber files (no more revisions)
- BOM with LCSC part numbers for every SMD component
- Pick-and-place CPL file (component placement list)
- Quantity: 500, 1000, 2000 (get all three quotes)
- Assembly type: SMT only (through-hole done in-house or by 3PL)
- Testing: ICT (in-circuit test) per board
- Packaging: individual anti-static bags, bulk packed in cartons

## JLCPCB Constraints and Considerations

### Assembly Fees
| Fee Type | Cost | Notes |
|----------|------|-------|
| Setup fee (per unique part) | $0.00 for Basic Parts | LCSC Basic Library = no extra fee |
| Setup fee (Extended Parts) | $3.00 per unique part | Avoid Extended Parts where possible |
| Per-component fee | $0.0017/joint | Negligible at volume |
| Minimum order | 2 pcs | Phase 1 minimum is 5 (for safety) |
| Stencil | Included | For SMT assembly orders |

### LCSC Parts Availability

Components must be verified in-stock at LCSC before ordering:

| Component | LCSC Status | Alternative |
|-----------|-------------|-------------|
| ESP32-S3-WROOM-1 (N16R8) | Usually in stock | ESP32-S3-WROOM-1 (N8R8) -- less flash |
| INMP441 | Check availability | SPH0645LM4H (I2S mic alternative) |
| MAX98357A | Check availability | PAM8302 (class-D amp alternative) |
| USB-C 16-pin connector | Many options in LCSC | Use JLCPCB recommended footprint |

**Important:** Run LCSC stock check before placing Phase 2 order. Out-of-stock components delay assembly by weeks.

### Turnaround Times (US delivery)

| Service | Fabrication | Shipping (standard) | Shipping (DHL) | Total |
|---------|-------------|--------------------|-----------------| ------|
| Bare PCB | 24 hours | 5-7 days | 3-5 days | 6-8 days |
| SMT Assembly | 3-5 days | 5-7 days | 3-5 days | 8-12 days |
| Production (500+) | 7-10 days | 5-7 days | 3-5 days | 12-17 days |

### Budget Summary

| Phase | Estimated Cost | Timeline |
|-------|---------------|----------|
| Phase 1: 5 bare PCBs | $10-15 | April-May 2026 |
| Phase 2: 10 assembled PCBs | $60-80 | June 2026 |
| Phase 3: Production quote | $0 (quote only) | July 2026 |
| **Total prototype budget** | **$70-95** | |

This fits well within the $500-800 PCB prototyping allocation from the overall $2-5K pre-Kickstarter budget.

## Required Validation Steps (Post-Assembly)

1. **Visual inspection** -- Check for solder bridges, cold joints, missing components
2. **Continuity test** -- Verify power rails (3.3V, 5V) are not shorted
3. **Flash firmware** -- Upload via USB-C (verify USB works before any other test)
4. **Audio test** -- Play test tone through speaker, record audio via mic, verify I2S buses
5. **WiFi test** -- Connect to home network, verify WebSocket connection to orb-backend
6. **Voice AI test** -- Full pipeline: mic -> STT -> LLM -> TTS -> speaker
7. **Stress test** -- 24-hour continuous loop of voice interactions
8. **Power measurement** -- USB power meter readings at idle and active states
9. **Temperature test** -- Thermal camera or thermometer readings after 1 hour active use
10. **Document yield** -- Record pass/fail for each board, categorize failure modes

## Timeline Summary

| Month | Activity | Deliverable |
|-------|----------|-------------|
| April 2026 | PCB design in EasyEDA | Gerber files, BOM, CPL |
| May 2026 | Phase 1: bare PCB order | Validated layout |
| June 2026 | Phase 2: assembled prototype order | 10 working units |
| July 2026 | Prototype testing + Phase 3 RFQ | Yield data + production quote |
| August 2026 | Production firmware finalized | Flash-ready binary |
| October 2026 | Production order placed (if campaign funded) | 500+ units in queue |
| March 2027 | Production run ships from JLCPCB | Assembled boards received |
