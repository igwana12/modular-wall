# Spirit Sphere -- Bill of Materials (Production BOM)

Campaign-ready BOM for the Spirit Sphere (POV volumetric LED sphere + voice AI, Maker Edition).
The Spirit Sphere includes all Oracle Engine components plus the POV display subsystem.

**Target Pricing:** $229 retail / $179 early bird

## Oracle Engine Base (included)

See [bom-oracle-engine.md](bom-oracle-engine.md) for full breakdown.

| Category | Unit Cost (qty 100) | Unit Cost (qty 500) |
|----------|---------------------|---------------------|
| Oracle Engine BOM (complete) | $22.20 | $16.40 |

## Additional Spirit Sphere Components

| # | Part | Qty | Unit Cost (qty 100) | Unit Cost (qty 500) | Source | LCSC Part # |
|---|------|-----|---------------------|---------------------|--------|-------------|
| 1 | APA102 LED strip (144 LEDs/m, 5V, IP30) | 0.25m (36 LEDs) | $10.00 | $8.00 | AliExpress | -- |
| 2 | N20 micro gear motor (3-5V, 3-5 RPM, metal gearbox) | 1 | $4.00 | $3.00 | AliExpress | -- |
| 3 | US5881LUA Hall effect sensor (SOT-23) | 1 | $0.80 | $0.50 | LCSC | C720694 |
| 4 | Neodymium disc magnet (3mm x 1mm) | 2 | $0.50 | $0.30 | AliExpress | -- |
| 5 | 6-wire slip ring (12.5mm bore, 2A/wire) | 1 | $4.50 | $3.50 | AliExpress/Adafruit | -- |
| 6 | 18650 Li-ion cells (3.7V, 2500mAh+, matched) | 3 | $5.00 ea ($15.00) | $4.00 ea ($12.00) | AliExpress/Amazon | -- |
| 7 | 3S BMS board (USB-C charge, balance + protection) | 1 | $4.00 | $3.00 | AliExpress | -- |
| 8 | 18650 battery holder (3-cell series) | 1 | $1.50 | $1.00 | AliExpress | -- |
| 9 | LM2596 buck converter (adj, 7-35V in, 5V out) | 1 | $2.50 | $2.00 | AliExpress | -- |
| 10 | 3D-printed sphere enclosure (larger, multi-part) | 1 | $12.00 | $8.00 | Local/Shapeways | -- |
| 11 | Rubber damper feet (M3 bolt-mount) | 4 | $1.00 | $0.70 | AliExpress | -- |
| 12 | SPI signal termination resistors (100 ohm) | 2 | $0.10 | $0.05 | LCSC | -- |
| 13 | Flyback diode (1N4007) | 1 | $0.10 | $0.05 | LCSC | -- |
| | **Subtotal (sphere additions)** | | **$56.00** | **$42.10** | | |

### Spirit Sphere Packaging (larger box required)

| # | Part | Qty | Unit Cost (qty 100) | Unit Cost (qty 500) | Source |
|---|------|-----|---------------------|---------------------|--------|
| 14 | Custom box (10"x10"x10") + foam inserts | 1 | $3.50 | $2.50 | AliExpress |
| 15 | Assembly instruction booklet | 1 | $0.50 | $0.35 | Local print shop |
| 16 | USB-C cable (1m, braided) | 1 | $0.80 | $0.60 | AliExpress |
| 17 | Quick-start card | 1 | $0.35 | $0.25 | Local print shop |
| | **Subtotal (packaging)** | | **$5.15** | **$3.70** | |

## BOM Summary

| Quantity Break | Oracle Engine Base | Sphere Additions | Sphere Packaging | **Total Spirit Sphere BOM** |
|----------------|-------------------|-----------------|-----------------|---------------------------|
| qty 100 | $19.40 | $56.00 | $5.15 | **$80.55** |
| qty 500 | $14.45 | $42.10 | $3.70 | **$60.25** |

Note: Oracle Engine base uses its own packaging numbers ($2.80/$1.95) when sold standalone. Spirit Sphere packaging ($5.15/$3.70) replaces the Oracle Engine packaging since it ships as one unit.

Corrected totals (electronics + sphere packaging, not double-counting OE packaging):

| Quantity Break | Electronics (OE base + Sphere additions) | Sphere Packaging | **Total BOM** |
|----------------|------------------------------------------|-----------------|---------------|
| qty 100 | $19.40 + $56.00 = $75.40 | $5.15 | **$80.55** |
| qty 500 | $14.45 + $42.10 = $56.55 | $3.70 | **$60.25** |

## Margin Analysis

Target retail: $229. Early bird: $179.

### At qty 500, $179 Early Bird

| Line Item | Amount | % of Revenue |
|-----------|--------|-------------|
| Revenue per unit | $179.00 | 100% |
| BOM cost | ($60.25) | 33.7% |
| KS fees (11%) | ($19.69) | 11.0% |
| Yield loss (15% of BOM) | ($9.04) | 5.0% |
| Shipping buffer (15% of estimated $15 US avg) | ($2.25) | 1.3% |
| Contingency (10% of revenue) | ($17.90) | 10.0% |
| **Net margin per unit** | **$69.87** | **39.0%** |

### At qty 100, $179 Early Bird

| Line Item | Amount | % of Revenue |
|-----------|--------|-------------|
| Revenue per unit | $179.00 | 100% |
| BOM cost | ($80.55) | 45.0% |
| KS fees (11%) | ($19.69) | 11.0% |
| Yield loss (15% of BOM) | ($12.08) | 6.8% |
| Shipping buffer | ($2.25) | 1.3% |
| Contingency (10%) | ($17.90) | 10.0% |
| **Net margin per unit** | **$46.53** | **26.0%** |

### Multiplier Check

| Metric | qty 100 | qty 500 |
|--------|---------|---------|
| BOM cost | $80.55 | $60.25 |
| Retail ($229) / BOM | 2.8x | 3.8x |
| Early bird ($179) / BOM | 2.2x | 3.0x |

**Verdict:** At qty 100, the 2.2x multiplier is below the 3x safety threshold. This means the Spirit Sphere is margin-tight at small volumes. At qty 500, the 3.0x multiplier is at the lower edge of acceptable. **$179 early bird is viable but requires reaching 500-unit scale to be comfortable.** Consider:
- Setting the early bird limit to 200 units (not 500) to control exposure at low volume
- Ensuring the funding goal requires minimum 200 Spirit Sphere pledges
- The $229 retail tier at 3.8x (qty 500) provides a healthy buffer

## Shipping Configuration

The Spirit Sphere ships **partially disassembled** to reduce shipping damage risk and package size:

### Ships Assembled
- ESP32-S3 PCB (Oracle Engine core) -- fully assembled and tested
- Battery pack (3S 18650 in holder with BMS) -- pre-wired
- Base enclosure with motor, buck converter, and slip ring pre-installed
- Speaker mounted in base

### User Assembles (with instruction booklet)
- Attach LED arm to slip ring rotor (4 screws + SPI cable)
- Connect battery pack to base (keyed connector, cannot be reversed)
- Place sphere shell halves over LED arm (snap-fit)
- First-run WiFi setup via captive portal

### Why Partial Assembly
1. Reduces package dimensions (no fragile sphere shell protruding)
2. LED arm is the most fragile part -- packing separately prevents damage
3. "Maker Edition" positioning means backers expect some assembly
4. Assembly time: estimated 10-15 minutes with instruction booklet

## Risk Factors

| Risk | Impact | Mitigation |
|------|--------|------------|
| APA102 LED strip pricing volatility | +$2-5/unit | SK9822 as drop-in alternative at lower cost |
| 18650 cell matching at volume | Yield loss if cells drift | Order pre-matched sets; specify matching in PO |
| Slip ring signal degradation | SPI errors at 12MHz | Derate to 6MHz (validated in Phase 7 firmware) |
| Sphere enclosure print quality | Visible layer lines at consumer price | SLA or MJF batch printing at qty 500+ |
| Motor noise at scale | Units louder than prototype | Specify rubber-damped motors; QA noise test per unit |
| Tariff on assembled PCBs from China | +10% on JLCPCB cost | 10% contingency budgeted; investigate JLCPCB global sites |

## Notes

- The bench rig BOM (hardware/bom.md) uses ESP32-S3-BOX-3 ($40 dev kit). Production BOM uses bare ESP32-S3-WROOM-1 module ($3.50-4.20) plus discrete audio components. This is the primary cost reduction from bench to production.
- Single straight arm design (Phase 7 decision) keeps mechanical complexity low for v1.
- 5V-only USB-C charging for v1 BMS (Phase 7 decision) -- PD 12V deferred to v1.1.
- Full 6-8 arm sphere is a stretch goal (firmware-only change -- POV column rendering already supports configurable arm count). The base product ships with a single arm for the Maker Edition.
