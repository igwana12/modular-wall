# Phase 0 Component Orders

**Budget**: $175  
**Status**: Planned (Local Experiment - Virtual Development)  
**Date**: 2026-04-08  
**Approved by**: Niko (CEO)

---

## Order Summary

| Item | Qty | Unit Price | Total | Supplier | Link | Status |
|------|-----|------------|-------|----------|------|--------|
| MakerBeamXL 15x15mm Starter Kit | 1 | $100.00 | $100.00 | MakerBeam | [Link](https://www.makerbeam.com/makerbeamxl/) | Planned |
| CYD ESP32-2432S028R | 2 | $13.00 | $26.00 | AliExpress | [Cheap Yellow Display](https://github.com/witnessmenow/ESP32-Cheap-Yellow-Display) | Planned |
| SK6812 RGBW LED Strip 5m 60LEDs/m | 1 | $20.00 | $20.00 | BTF-Lighting | [AliExpress](https://www.aliexpress.com) | Planned |
| Neodymium Magnets 10x3mm | 50pcs | $8.00 | $8.00 | Amazon/AliExpress | Generic | Planned |
| Magnetic Pogo Pin Connectors 4-pin | 4 pairs | $2.50 | $10.00 | Adafruit/AliExpress | [Adafruit #5571](https://www.adafruit.com/product/5571) | Planned |
| Gray Smoke Acrylic Sheet #2064 | 1 | $10.00 | $10.00 | TAP Plastics | [Local supplier](https://www.tapplastics.com/) | Planned |

**Total**: **$174.00** (under $175 budget by $1)

---

## Component Details

### 1. MakerBeamXL Frame System ($100)
**Purpose**: Primary structural frame for wall mounting surface  
**Specs**:
- 15x15mm aluminum T-slot extrusion
- Includes corner brackets, mounting plates
- Starter kit: 40 beams (~200mm lengths) + fasteners

**Rationale**: Industry-standard modular framing. Easy to work with, strong, looks professional. Alternative: 8020 Inc (more expensive) or DIY wood frame (unprofessional).

### 2. CYD ESP32-2432S028R Display Modules ($26)
**Purpose**: First two screen modules for Phase 1 prototype  
**Specs**:
- 2.8" 320x240 ILI9341 TFT LCD
- ESP32-S3 with WiFi/Bluetooth  
- Touch screen, RGB LED, SD card slot
- USB-C programming

**Rationale**: Popular, well-documented, cheap ($13 each). Perfect for rapid prototyping. GitHub community support. Known as "Cheap Yellow Display" in maker community.

### 3. SK6812 RGBW LED Strip ($20)
**Purpose**: Glow module backlight testing, ambient light modules  
**Specs**:
- 5 meters, 60 LEDs/meter (300 total)
- RGBW (white channel for neutral glow)
- 5V, individually addressable
- IP30 (non-waterproof)

**Rationale**: Individually addressable for dynamic scenes. RGBW allows both color and warm white glow. Enough LEDs for multiple glow modules. Compatible with FastLED library.

### 4. Neodymium Magnets 10x3mm ($8)
**Purpose**: Magnetic attachment system for modules to steel wall surface  
**Specs**:
- 10mm diameter, 3mm thick
- N52 grade (strongest available)
- ~4kg pull force each

**Rationale**: Strong hold, thin profile, reusable. 50pcs allows ~6 magnets per module (4 corners + 2 mid-points) for 8-module prototypes.

### 5. Magnetic Pogo Pin Connectors ($10)
**Purpose**: Power + data edge connectors between modules  
**Specs**:
- 4-pin configuration (5V, GND, CAN_H, CAN_L)
- Spring-loaded pogo pins
- Magnetic alignment

**Rationale**: Self-aligning, reliable contact, enables snap-together functionality. 4 pairs = 8 connectors = enough for edge testing.

### 6. Gray Smoke Acrylic Sheet ($10)
**Purpose**: Translucent front panels for glow modules  
**Specs**:
- Plexiglas #2064 Gray Smoke
- ~50% light transmission
- 1/8" thickness (or 3mm)

**Rationale**: Diffuses LED glow, professional aesthetic, easy to laser cut or hand-cut. Alternative: white acrylic (but less visually interesting).

---

## Shipping & Delivery Estimates

- **MakerBeam**: 5-7 business days (US stock)
- **CYD Displays**: 15-25 days (ships from China)
- **LED Strip**: 10-20 days (ships from China)
- **Magnets**: 2-5 days (Amazon Prime) or 10-20 days (AliExpress)
- **Pogo Connectors**: 3-7 days (Adafruit US stock) or 15-25 days (AliExpress alternative)
- **Acrylic**: 1-3 days (local pickup at TAP Plastics) or 5-7 days (ship from US warehouse)

**Critical Path Items**: CYD displays (longest lead time). Order these first.

---

## Alternative Suppliers & Cost Optimization

### MakerBeamXL Alternatives:
- **80/20 Inc**: Higher quality but 2-3x price ($200-300). Not justified for prototype.
- **Misumi**: Japanese precision extrusion. Good but expensive and slower shipping.
- **DIY wood frame**: Cheap (~$30) but looks unprofessional, harder to modify.

**Decision**: Stick with MakerBeamXL. Good balance of cost/quality/availability.

### ESP32 Display Alternatives:
- **Adafruit 2.8" TFT + Separate ESP32**: ~$40-50 total. More expensive, more wiring.
- **LilyGO T-Display-S3**: $20-25. Smaller screen (1.9"), no touch. Not suitable.
- **M5Stack Core**: $35-50. Great but more expensive, less customizable enclosure.

**Decision**: CYD is perfect for this use case. Well-documented, cheap, large screen.

### LED Strip Alternatives:
- **WS2812B (RGB only)**: $15. No dedicated white channel. Less versatile.
- **SK9822 (APA102)**: $25. Higher refresh rate but overkill for ambient glow.
- **Analog RGB strips**: $10. Not addressable, less flexible for dynamic scenes.

**Decision**: SK6812 RGBW is ideal. White channel crucial for neutral glow aesthetic.

---

## Bulk Discount Opportunities

- **Magnets**: Buy 100pcs for $12 (vs $8 for 50pcs). Extra $4 but 2x quantity. **Consider upgrading.**
- **CYD Displays**: Buy 5pcs for $55 ($11 each vs $13). Save $10, have spares. **Recommended for Phase 1.**
- **LED Strip**: Buy 10m for $35 (vs $20 for 5m). Not needed for Phase 0.

**Budget Impact**:
- Current plan: $174
- With 5x CYD displays: $174 - $26 + $55 = $203 (**over budget by $28**)
- With 100 magnets: $174 + $4 = $178 (**over budget by $3**)

**Recommendation**: Stick with original plan to stay under $175 budget. Phase 1 can buy additional displays if needed.

---

## Next Steps

1. ✅ Validate component list (CEO approval)
2. ✅ Create tracking document (this file)
3. ⏳ Get Daedalus (CTO) technical approval on component specs
4. ⏳ Place orders (CYD first due to long lead time)
5. ⏳ Track shipping in this document
6. ⏳ Update when components arrive

---

## Notes

- **This is a local experiment** — components are for virtual product development and prototyping only
- Orders are "planned" to validate pricing and sourcing rather than for immediate physical build
- Actual ordering will occur when transitioning from virtual development to physical prototyping
- Total spend tracked against Sacred Circuits project budget

---

*Document created: 2026-04-08*  
*Last updated: 2026-04-08*  
*Owner: Niko (CEO)*
