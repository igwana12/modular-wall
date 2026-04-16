# mosAIc — Image Generation Reference

**Purpose**: Feed this file to ANY image generation tool (Nano Banana, Higgsfield, Luma, Midjourney) to ensure brand-consistent, dimensionally-accurate product images.

---

## Brand Constants (ALWAYS apply)

### Colors
- Primary accent: Teal #00D4AA (RGB 0, 212, 170)
- Secondary accent: Amber #FFB347 (RGB 255, 179, 71)
- Background: Dark #0D0D1A (nearly black with blue tint)
- Housing material: Dark matte black (RGB ~10, 10, 13)
- Pogo pins: Gold (RGB 212, 176, 56)
- Magnets: Silver (RGB 192, 192, 200)
- PCB: Green (RGB 5, 46, 13)

### Photography Style
- Dark moody studio background
- Dramatic side lighting from upper-left (warm white key light)
- Cool fill light from lower-right
- Teal accent/rim light from behind
- 85mm lens equivalent, f/2.8
- Shallow depth of field (optional — disable for product catalog shots)
- No visible logos or text on modules (clean surfaces)

### Material Finish
- Housing: Dark matte, slight texture, NOT glossy, NOT shiny
- Acrylic panels: Smoke-tinted semi-transparent (gray #2064)
- Electronics visible through translucent panels when appropriate

---

## Module Dimensions (FROM CSV — USE THESE EXACTLY)

### Rectangular Modules
| Module | Width mm | Height mm | Depth mm | Shape Description |
|--------|---------|-----------|----------|-------------------|
| Screen-S | 76 | 116 | 20 | PORTRAIT rectangle — taller than wide |
| Screen-M | 144 | 94 | 22 | LANDSCAPE rectangle — wider than tall |
| Glow | 71 | 71 | 20 | Perfect SQUARE |
| Glow-Edge | 71 | 71 | 22 | Perfect SQUARE (slightly deeper) |
| Pixel | 166 | 86 | 23 | WIDE rectangle — widest module, ~2x wider than Glow |
| Voice | 71 | 71 | 23 | Perfect SQUARE (same as Glow) |
| Speaker-S | 90 | 90 | 30 | Larger SQUARE (deepest rectangular module) |
| Sense | 44 | 44 | 16 | TINY square — smallest module, barely bigger than a stamp |
| Sense-Air | 44 | 44 | 16 | TINY square (same as Sense) |
| Brick | 71 | 71 | 20 | Perfect SQUARE (same as Glow, no electronics) |
| Hub | 91 | 62 | 22 | LANDSCAPE rectangle — wider than tall |
| eInk | 180 | 120 | 15 | Large LANDSCAPE rectangle — thinnest module |
| Cam-AI | 44 | 44 | 18 | TINY square (same size as Sense) |
| Cam-Depth | 120 | 40 | 35 | WIDE BAR shape — like a soundbar |
| Input-Knob | 44 | 44 | 16 | TINY square with protruding knob |
| Input-Button | 44 | 44 | 20 | TINY square with domed button |
| Marble-Track | 71 | 71 | 25 | SQUARE with visible track channel |
| Holo | 140 | 140 | 40 | LARGE square — biggest square module, deepest |

### Circular Modules
| Module | Diameter mm | Depth mm | Shape Description |
|--------|------------|----------|-------------------|
| Round | 91 | 19 | Medium CIRCLE |
| Mirror | 120 | 28 | Large CIRCLE — biggest circular module |
| Controller | 62 | 18 | Small CIRCLE — handheld, NOT wall-mounted |

### Wearable
| Module | Diameter mm | Width mm | Description |
|--------|------------|----------|-------------|
| Ring | 22 (outer) | 8 (band) | Finger ring — TINY |

---

## Relative Scale Reference

When showing multiple modules together, USE THESE RATIOS (Glow = 1.0x):

```
Sense (0.62x) ← TINY
Controller (Ø0.87x) ← small circle
Glow/Brick/Voice (1.0x) ← REFERENCE SQUARE (71mm)
Hub (1.28x wide, 0.87x tall) ← slightly wider
Screen-S (1.07x wide, 1.63x tall) ← PORTRAIT, notably taller
Round (Ø1.28x) ← medium circle
Speaker-S (1.27x) ← bigger square
Mirror (Ø1.69x) ← large circle
Pixel (2.34x wide, 1.21x tall) ← WIDEST MODULE
Holo (1.97x) ← largest square
eInk (2.54x wide, 1.69x tall) ← largest rectangle
```

---

## Module-Specific Prompt Fragments

Copy-paste these into any image generation prompt:

### Screen-S
```
A portrait-oriented rectangular module (76mm wide x 116mm tall x 20mm deep — taller than wide, like a phone standing up). Dark matte housing with a 2.8" IPS LCD screen recessed in the front face showing a teal (#00D4AA) weather widget. Gold pogo pin connectors on the left and right edges.
```

### Glow
```
A perfect square module (71mm x 71mm x 20mm). Dark matte housing with warm amber (#FFB347) light glowing through a frosted translucent diffuser panel on the front face. Soft, volumetric light.
```

### Pixel
```
A WIDE rectangular module (166mm wide x 86mm tall x 23mm deep — about twice as wide as a Glow square). Dark matte housing with a vivid 64x32 RGB LED pixel matrix showing colorful retro pixel art. Individual LED pixels visible.
```

### Sense
```
A VERY SMALL square module (only 44mm x 44mm x 16mm — barely bigger than a postage stamp). Dark matte housing, completely featureless smooth front face with only a tiny dim red LED in one corner. Ultra-minimal.
```

### Hub
```
A landscape-oriented rectangular module (91mm wide x 62mm tall x 22mm deep — wider than tall). Dark matte housing with a blue (#4488FF) status LED. USB-C port visible on one edge.
```

### Round
```
A CIRCULAR module (91mm diameter x 19mm deep — a perfect circle). Dark matte housing with a round 1.43" AMOLED display showing a teal clock face. An LED halo ring glows teal around the display edge.
```

### Mirror
```
A LARGE CIRCULAR module (120mm diameter x 28mm deep — the biggest circle). Dark matte housing with a round 5" display, a tiny camera lens at the top, and an LED ring light around the perimeter.
```

### Holo
```
A LARGE SQUARE module (140mm x 140mm x 40mm — the biggest and deepest square). Dark matte housing with a clear acrylic front panel. Behind it, a POV holographic fan displays floating sacred geometry in purple and teal.
```

### Controller
```
A SMALL CIRCULAR handheld device (62mm diameter x 18mm deep — fits in your palm). Dark matte housing with a round 2.1" display and a metallic rotary encoder ring around the edge.
```

### Ring
```
A smart ring worn on a finger (22mm outer diameter, 8mm wide band). Dark matte with a thin teal LED accent stripe. TINY — shows only on a hand for scale.
```

---

## Wall Configuration Prompts

### Starter (5 modules, $185)
```
A small wall arrangement on dark steel: two 71mm amber Glow squares flanking a tall 76x116mm Screen-S in the center, with a wide 166x86mm Pixel below and a plain 71mm Brick filling the corner. Modules are palm-sized. Total wall width ~245mm. Magnetic pogo pin connections between adjacent modules.
```

### Media Center (9 modules, $454)
```
A medium wall arrangement on dark steel: three screens across the top (76mm Screen-S, 144mm Screen-M, 76mm Screen-S). Middle row: two 90mm Speaker-S squares flanking a wide 166mm Pixel. Bottom: two 71mm Glow squares with a tiny 44mm Sense between them. Total width ~360mm.
```

### Premium (11 modules, $616)
```
A large wall arrangement mixing shapes: a 120mm Mirror CIRCLE and 91mm Round CIRCLE at the top breaking the rectangular grid. Two 76x116mm Screen-S rectangles and three 71mm Glow squares fill the sides. A large 140mm Holo SQUARE anchors the bottom center. Two tiny 44mm Sense modules tuck into gaps. Mixed shapes create visual drama. Total width ~400mm.
```

---

## Photography Don'ts
- DON'T make modules look tablet-sized — they're palm-sized (44-166mm)
- DON'T use glossy/shiny materials — everything is matte
- DON'T show modules floating in space — show them on steel wall or dark surface
- DON'T make all modules the same size — the size variance IS the visual identity
- DON'T use white/bright backgrounds — always dark (#0D0D1A or studio black)
- DON'T forget pogo pins on edges — they're a defining visual element
- DON'T use generic "smart home" stock photo vibes — this is cyberpunk + ancient mosaic

---

*Feed this entire file as context to any image generation session for brand-consistent results.*
