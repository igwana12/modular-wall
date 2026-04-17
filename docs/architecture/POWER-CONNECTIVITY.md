# Power & Connectivity — Design Decision

**Date**: 2026-04-06
**Status**: Researched, recommended architecture defined

---

## The Decision

**Wall mount: Galvanized steel sheet screwed to wall studs — modules snap on magnetically**
**Module-to-module: Magnetic pogo pin edge connectors (Nanoleaf-style)**
**Power backbone: Bus bar behind steel sheet with pogo pin contact points**
**Fallback for non-adjacent modules: Short colored USB-C cables**

---

## Wall Mounting System

### Steel Sheet Magnetic Wall (Recommended)

A thin **16-gauge galvanized steel sheet** gets screwed to the wall studs. That's the "wall." Every module has neodymium magnets on its back and snaps anywhere on the steel surface. Slide modules around freely, rearrange anytime, remove instantly.

**Products**:
- [Gator Magnetics Steel Wall Panel](https://gatormagnetics.com/products/steel-wall-panels) — purpose-built magnetic wall panels, 16-gauge steel
- [M-D Building Products Galvanized Steel Sheet](https://www.amazon.com/M-D-Building-57321-Decorative-Galvanized/dp/B00E7XT1F6) — 12x24" sheets, ~$15 each
- [KalaMitica Magnetic Wall System](https://kalamitica.com/en/content/72-blogcon-how-to-create-a-magnetic-wall-ideas-and-solutions) — decorative magnetic wall panels

**Sizes**: Start with 2x4ft (610x1220mm) — covers a good starter wall. Expand by adding adjacent sheets.

**Power integration**: The bus bar runs behind the steel sheet. Pogo pin contact pads mounted on the steel sheet at grid points provide power to any module placed on them. The steel sheet itself can serve as a ground plane.

**Aesthetics**: Steel sheet can be:
- Left raw (industrial look)
- Painted matte black or any color
- Covered with a decorative skin/vinyl
- Powder-coated

**Why this is best**:
- Zero damage to modules (no clips, hooks, or adhesive)
- Infinite rearrangement (just slide)
- Clean look (no visible mounting hardware)
- The steel sheet IS the product's "canvas"
- Easy to install (4-6 screws into studs)
- Modules hold firmly (10mm neodymium magnets on 16-gauge steel = very secure)
- Accessible for all skill levels

### Alternative: French Cleat Rail
MakerBeamXL rails screwed horizontally to wall. Modules slide onto rails via T-slot clips. More secure than magnetic but locked to rail positions. Good for heavy modules (subwoofer, depth camera).

### Alternative: SKADIS-Style Pegboard
Pegboard with hook-in clips. Proven, cheap, but visible grid holes are less clean.

---

## Architecture

```
[Wall Outlet AC]
    → [UL-Listed Mean Well RSP-150-5 (5V/30A)]
        → [Copper bus bar backbone] (hidden behind wall mounting plate)
            → [Tap points with PTC fuses]
                → [Module edge connectors: 4-pin magnetic pogo]
                    Pin 1: +5V
                    Pin 2: GND  
                    Pin 3: Data (CAN_H or SDA)
                    Pin 4: Data (CAN_L or SCL)
```

## Why Magnetic Pogo Pins (Not USB-C)

| Factor | USB-C Between Modules | Magnetic Pogo Edge |
|--------|----------------------|-------------------|
| Cables needed | Yes (per connection) | No (edge-to-edge) |
| Connector size | 8.4 x 2.6mm + cable | 2mm flush profile |
| Cost per connection | $8-15 (PD controller + 2 ports + cable) | $3-5 (pogo pair + magnets) |
| Complexity | 800-page PD spec, firmware needed | Passive copper traces |
| UX | Plug cable, manage routing | Snap modules together |
| Reliability | Cable failure = chain break | Direct contact, 100K+ cycles |
| Aesthetics | Cable mess on wall | Clean, invisible |
| Current capacity | 0.5A without PD, 3A with CC resistors | 2A per pin, parallel for more |

## Where USB-C Still Makes Sense

1. **Power entry** — wall PSU to first module or hub
2. **Programming** — flashing firmware to individual ESP32 modules
3. **Non-adjacent modules** — modules spread apart on the wall, connected by short colored cables
4. **Handheld controller** — charges via USB-C

## Off-the-Shelf Magnetic Pogo Connectors

| Product | Pins | Current/Pin | Price | Source |
|---------|------|-------------|-------|--------|
| Adafruit DIY Magnetic Connector 4-pin | 4 | 2A | $2.50/pair | [Adafruit](https://www.adafruit.com/product/5358) |
| HytePro M402 4-pin | 4 | 2A | ~$2/pair | [Amazon](https://www.amazon.com/HytePro-Magnetic-Connector-Connection-Electronic/dp/B07R7GGVDP) |
| EDAC POGO+ | Custom | Up to 10A | Quote | [DigiKey](https://www.digikey.com/en/product-highlight/e/edac/pogo-magnetic-spring-loaded-connectors) |

## Safety Per Module

Each module includes:
- **PTC resettable fuse** (2A, ~$0.10) — auto-resets after overcurrent
- **Reverse polarity protection** (Schottky diode or P-MOSFET, ~$0.20)
- **TVS diode** on data lines (~$0.10) — ESD protection

**Total safety cost per module: ~$0.40**

## How Nanoleaf Does It (Proven at Scale)

- Rigid PCB linkers (small passive PCBs) bridge between panels
- 4-pin edge connectors: 2 power + 1 data + 1 additional
- Press-fit / friction connection
- Each panel's microcontroller individually addressed on data pin
- Supports ~30 panels per controller
- Millions of units deployed worldwide

## Short Colored USB-C Cables (For Non-Adjacent Connections)

- **5cm**: Available (flat FPC ribbon style, ~$5-8)
- **10cm**: Available (Zeus-X Futurizta, ~$6)
- **15cm / 6"**: Widely available, braided, multiple colors (~$5-10/2-pack)
- **Color-coded multi-packs**: 1ft 5-packs in 5 colors (~$10-12 on Amazon)
- **In the configurator**: When user designs their wall, the system calculates which cable lengths are needed and includes them in the order

## Sources

- [Nanoleaf Aurora Teardown (EEVblog)](https://www.eevblog.com/forum/projects/nanoleaf-aurora-teardown/)
- [Adafruit 4-Pin Magnetic Connector](https://www.adafruit.com/product/5358)
- [Pogo Pin Connector Guide 2025](https://cfeconn.com/faq-items/pogopinconnectorguide2025/)
- [USB-C Power Delivery Complexity (Hackaday)](https://hackaday.com/2023/01/09/all-about-usb-c-power-delivery/)
- [Eurorack Power Distribution](https://aisynthesis.com/product/eurorack-power-distribution-kit/)
- [Mill-Max High Current Pogo Pins](https://www.mill-max.com/products/new/3-additional-high-current-spring-pogo-pins)
