# Component Dimensions — Real Data

**Purpose**: Exact physical dimensions for all primary components, used for Blender models, enclosure design, and accurate renders.
**Rule**: ALL renders and models MUST use these dimensions. No imagined proportions.

---

## Primary Module Components (PCB/Board Dimensions)

| Component | Width (mm) | Height (mm) | Depth (mm) | Shape | Notes |
|-----------|-----------|-------------|------------|-------|-------|
| CYD ESP32-2432S028R | 70 | 110 | 11 | Rectangle | Full board with ESP32 + 2.8" LCD |
| Waveshare ESP32-S3 Round AMOLED 1.43" | Ø85 | Ø85 | 10 | Circle | Circular dev board |
| Waveshare 5" HDMI Round Display | Ø114 | Ø114 | 22 | Circle | For Mirror module |
| 64x32 HUB75 P2.5 LED Panel | 160 | 80 | 10 | Rectangle | Pixel module core |
| 16x16 WS2812B Flexible Matrix | 65 | 65 | 3 | Square | Glow module core |
| ESP32 Trinity (HUB75 driver) | 52 | 70 | 10 | Rectangle | Mounts behind HUB75 |
| LD2410C mmWave Radar | 18 | 18 | 4 | Square | Tiny — mounts inside any housing |
| MaTouch 2.1" Rotary | Ø56 | Ø56 | 12 | Circle | Handheld controller display |
| OV5640 Camera Module | 32 | 32 | 5 | Square | Camera for Mirror module |
| XIAO ESP32S3 | 20 | 17.5 | 3.5 | Rectangle | Tiny per-module compute |
| Orange Pi 5 Plus | 85 | 56 | 12 | Rectangle | Hub/Brain module compute |

## Audio Components

| Component | Width (mm) | Height (mm) | Depth (mm) | Shape | Notes |
|-----------|-----------|-------------|------------|-------|-------|
| Dayton DAEX13CT-4 exciter | Ø32 | Ø32 | 13 | Circle | Mounts to panel back |
| INMP441 MEMS Mic breakout | 20 | 20 | 3.5 | Square | Tiny mic board |
| MAX98357A I2S Amp breakout | 25 | 25 | 8 | Square | Amp board |

## Connectors & Mounting

| Component | Width (mm) | Height (mm) | Depth (mm) | Shape | Notes |
|-----------|-----------|-------------|------------|-------|-------|
| Adafruit 4-pin Magnetic Pogo | 8 | 8 | 5 | Square | Per edge, 4 per module side |
| Neodymium Magnet | Ø10 | Ø10 | 3 | Circle | 4 per module (corners) |
| MakerBeamXL extrusion | 15 | 15 | variable | Square profile | Cut to length |
| SK6812 LED (single) | 10 | 10 | 4 | Square | 60/m = ~16.7mm spacing |

---

## Housing Dimensions (PCB + Clearance)

**Formula**: Housing = PCB + 3mm wall per side + 3mm pogo pin extension + 3mm magnet recess

| Module | Internal (PCB) | Housing Width (mm) | Housing Height (mm) | Housing Depth (mm) | Notes |
|--------|---------------|-------------------|---------------------|--------------------|----|
| **Screen-S** | CYD 70x110x11 | 76 | 116 | 20 | Portrait orientation, screen recessed 1mm |
| **Glow** | WS2812B 65x65x3 + XIAO 20x17.5 | 71 | 71 | 20 | Square, diffuser panel adds 3mm |
| **Pixel** | HUB75 160x80x10 + Trinity 52x70 | 166 | 86 | 23 | Wide rectangle, largest module |
| **Voice** | DAEX13CT Ø32 + MAX98357 25x25 + INMP441 20x20 | 71 | 71 | 23 | Square, exciter mounts to back panel |
| **Sense** | LD2410C 18x18x4 + XIAO 20x17.5 | 44 | 44 | 16 | Smallest module — tiny! |
| **Brick** | None | 71 | 71 | 20 | Matches Glow size, no electronics |
| **Hub** | Orange Pi 85x56x12 | 91 | 62 | 22 | USB-C access on edge |
| **Round** | Waveshare Ø85 AMOLED | Ø91 | Ø91 | 19 | Circular housing |
| **Mirror** | Waveshare Ø114 + OV5640 32x32 | Ø120 | Ø120 | 28 | Largest circular module |
| **Controller** | MaTouch Ø56 + LiPo | Ø62 | Ø62 | 18 | Handheld, not wall-mounted |

---

## Relative Scale (for renders)

Using the Glow module (71x71mm) as 1.0x reference:

| Module | Relative Width | Relative Height | Visual Scale |
|--------|---------------|-----------------|-------------|
| Sense | 0.62x | 0.62x | Tiny — barely bigger than a matchbox |
| Controller | Ø0.87x | Ø0.87x | Palm-sized puck |
| Hub | 1.28x | 0.87x | Slightly wider than Glow |
| Glow | 1.0x | 1.0x | Reference: 71mm square |
| Brick | 1.0x | 1.0x | Same as Glow |
| Voice | 1.0x | 1.0x | Same as Glow |
| Screen-S | 1.07x | 1.63x | Tall portrait rectangle |
| Round | Ø1.28x | Ø1.28x | Slightly larger than Glow |
| Mirror | Ø1.69x | Ø1.69x | Noticeably larger circle |
| Pixel | 2.34x | 1.21x | Wide — about 2.3x Glow width |

---

## Key Takeaways for Renders

1. **Most modules are 71mm square** (Glow, Brick, Voice) — about the size of a large coaster
2. **Sense is tiny** — 44mm, smaller than a credit card
3. **Screen-S is a tall rectangle** — portrait phone-like proportions (76x116mm)
4. **Pixel is the widest** — 166mm wide, like two modules side by side
5. **Round and Mirror are circular** — breaking the grid is their visual identity
6. **Controller is handheld** — Ø62mm puck, about 2.5 inches across
7. **Everything is shallow** — 16-28mm deep, thinner than a deck of cards

---

*Source: Manufacturer datasheets, product pages, and official specs. See HARDWARE-VISUAL-CATALOG.md for purchase links.*
*Updated: 2026-04-06*
