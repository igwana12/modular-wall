# Oracle Engine -- Bill of Materials (Production BOM)

Campaign-ready BOM for the Oracle Engine (ESP32-S3 voice AI device, Maker Edition).
Based on hardware/bom.md bench rig BOM, adapted for production quantities.

**Target Pricing:** $99 retail / $79 early bird

## Component Table

| # | Part | Qty | Unit Cost (qty 100) | Unit Cost (qty 500) | Source | LCSC Part # |
|---|------|-----|---------------------|---------------------|--------|-------------|
| 1 | ESP32-S3-WROOM-1 (N16R8) | 1 | $4.20 | $3.50 | LCSC | C2913202 |
| 2 | INMP441 MEMS microphone | 1 | $1.50 | $1.20 | LCSC | C2837873 |
| 3 | MAX98357A I2S amplifier | 1 | $1.80 | $1.40 | LCSC | C2682619 |
| 4 | 3W 4-ohm speaker (40mm) | 1 | $1.20 | $0.90 | AliExpress | -- |
| 5 | Custom PCB (2-layer, assembled) | 1 | $4.50 | $3.00 | JLCPCB | -- |
| 6 | USB-C connector (16-pin) | 1 | $0.30 | $0.20 | LCSC | C2765186 |
| 7 | Passive components (caps, resistors, regulators) | lot | $1.50 | $1.00 | LCSC | various |
| 8 | 3D-printed enclosure | 1 | $4.00 | $3.00 | Local/Shapeways | -- |
| 9 | Momentary push button (mic mute) | 1 | $0.30 | $0.20 | LCSC | -- |
| 10 | Status LED (red, 3mm) | 1 | $0.10 | $0.05 | LCSC | -- |
| | **Subtotal (electronics + enclosure)** | | **$19.40** | **$14.45** | | |

### Packaging and Accessories

| # | Part | Qty | Unit Cost (qty 100) | Unit Cost (qty 500) | Source |
|---|------|-----|---------------------|---------------------|--------|
| 11 | USB-C cable (1m, braided) | 1 | $0.80 | $0.60 | AliExpress |
| 12 | Quick-start card (printed) | 1 | $0.35 | $0.25 | Local print shop |
| 13 | Box + foam insert | 1 | $1.50 | $1.00 | AliExpress |
| 14 | Warranty/safety card | 1 | $0.15 | $0.10 | Local print shop |
| | **Subtotal (packaging)** | | **$2.80** | **$1.95** | |

## BOM Summary

| Quantity Break | Electronics + Enclosure | Packaging | **Total BOM** |
|----------------|------------------------|-----------|---------------|
| qty 100 | $19.40 | $2.80 | **$22.20** |
| qty 500 | $14.45 | $1.95 | **$16.40** |

## Margin Analysis

Target retail: $99. Early bird: $79.

### At qty 500, $79 Early Bird

| Line Item | Amount | % of Revenue |
|-----------|--------|-------------|
| Revenue per unit | $79.00 | 100% |
| BOM cost | ($16.40) | 20.8% |
| KS fees (10-12%) | ($8.69) | 11.0% |
| Yield loss (15% of BOM -- order 115 units per 100) | ($2.46) | 3.1% |
| Shipping buffer (15% of estimated $6 US avg) | ($0.90) | 1.1% |
| Contingency (10% of revenue) | ($7.90) | 10.0% |
| **Net margin per unit** | **$42.65** | **54.0%** |

### At qty 100, $79 Early Bird

| Line Item | Amount | % of Revenue |
|-----------|--------|-------------|
| Revenue per unit | $79.00 | 100% |
| BOM cost | ($22.20) | 28.1% |
| KS fees (11%) | ($8.69) | 11.0% |
| Yield loss (15% of BOM) | ($3.33) | 4.2% |
| Shipping buffer | ($0.90) | 1.1% |
| Contingency (10%) | ($7.90) | 10.0% |
| **Net margin per unit** | **$35.98** | **45.5%** |

### Multiplier Check

| Metric | qty 100 | qty 500 |
|--------|---------|---------|
| BOM cost | $22.20 | $16.40 |
| Retail ($99) / BOM | 4.5x | 6.0x |
| Early bird ($79) / BOM | 3.6x | 4.8x |

**Verdict:** At $79 early bird, even at qty 100 the multiplier is 3.6x BOM -- above the 3-4x minimum threshold. At qty 500, the 4.8x multiplier provides comfortable margin for unexpected costs. **$79 early bird pricing is sustainable.**

## Notes

- ESP32-S3-WROOM-1 N16R8 replaces the ESP32-S3-BOX-3 dev kit used in bench rig BOM. The BOX-3 includes LCD/case not needed for production; the bare module is significantly cheaper.
- INMP441 and MAX98357A are discrete components replacing the BOX-3's built-in audio hardware.
- Enclosure cost assumes batch 3D printing (SLA or MJF) at scale. Individual FDM printing would be $3-5; batch SLA drops to $3 at qty 500.
- LCSC part numbers are approximate -- final numbers confirmed during EasyEDA PCB design when JLCPCB assembly is configured.
- Passive component lot includes: 3.3V LDO regulator, decoupling capacitors, pull-up/pull-down resistors, flyback diode.

## Risk Factors

| Risk | Impact | Mitigation |
|------|--------|------------|
| ESP32-S3 supply shortage | +$1-3/unit from alternative suppliers | Maintain 2 approved sources (LCSC + Mouser) |
| Tariff increase on China-sourced components | +5-10% BOM cost | 10% contingency already budgeted |
| 3D print enclosure quality issues at scale | Yield loss above 15% | Validate with 20-unit test batch before production run |
| JLCPCB assembly yield | Rework cost for failed boards | Include JLCPCB's post-assembly ICT testing ($0.03/board) |
