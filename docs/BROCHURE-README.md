# mosAIc Product Brochure

## Overview
Professional 12-page PDF product brochure for mosAIc modular wall computer system by Sacred Circuits.

**File:** `mosaic-brochure-2026.pdf`
**Pages:** 12
**Format:** Letter size (8.5" x 11")
**Theme:** Cyberpunk meets Mediterranean - Dark, moody, premium

## Brand Guidelines Applied

### Colors
- **Teal:** #00D4AA (primary brand color)
- **Amber:** #FFB347 (accent color) 
- **Dark backgrounds:** #0a0a1a, #111122
- **White/Gray:** For text and details

### Typography
- **Helvetica family** (built-in) for clean, modern aesthetic
- Bold for headers and emphasis
- Multiple sizes for hierarchy

### Design Elements
- Dark backgrounds throughout
- Geometric accents and borders
- Module diagrams at actual relative scale
- Professional layout with consistent spacing

## Page Contents

1. **Cover** - Logo, tagline, brand, year
2. **The Thesis** - Philosophy and positioning 
3. **How It Works** - 3-step process explanation
4. **Module Catalog (Part 1)** - 6 modules with specs
5. **Module Catalog (Part 2)** - 6 modules with specs
6. **Preset Configurations** - Starter, Media Center, Premium
7. **Interface Gallery** - App store concept
8. **Technology Stack** - Technical details
9. **Sacred Circuits Universe** - Brand ecosystem
10. **Manufacturing** - 3D printing and production
11. **Community & Open Source** - GitHub, education
12. **Back Cover** - CTA, pricing, contact info

## Module Data Accuracy

All 12 modules included with real dimensions from component specs:

| Module | Dimensions | Price | Type |
|--------|------------|-------|------|
| Screen-S | 76x116mm | $79 | Rectangle |
| Screen-M | 144x94mm | $119 | Rectangle |
| Glow | 71x71mm | $49 | Square |
| Pixel | 166x86mm | $59 | Rectangle |
| Voice | 71x71mm | $39 | Square |
| Sense | 44x44mm | $29 | Small square |
| Brick | 71x71mm | $9 | Square |
| Hub | 91x62mm | $49 | Rectangle |
| Holo | 140x140mm | $99 | Large square |
| Round | 91mm ⌀ | $69 | Circle |
| Mirror | 120mm ⌀ | $129 | Circle |
| eInk | 180x120mm | $59 | Large rectangle |

## Generation Scripts

### `create_brochure.py`
Original comprehensive script with all 12 pages. Uses reportlab canvas for direct PDF generation.

### `enhanced_brochure.py` 
Improved version with:
- Better visual hierarchy
- Enhanced module grid layouts
- Gradient backgrounds
- Geometric decorative elements
- Consistent header/footer system

## Technical Implementation

- **Library:** reportlab (Python PDF generation)
- **Approach:** Direct canvas drawing for precise control
- **Graphics:** Geometric shapes for module outlines
- **Colors:** HexColor for exact brand color matching
- **Typography:** Built-in Helvetica family
- **Layout:** Manual positioning for premium design control

## Usage

Generate the brochure:
```bash
python docs/create_brochure.py
# or
python docs/enhanced_brochure.py
```

## Project Context

This brochure supports the mosAIc modular wall computer project:
- **Repository:** github.com/igwana12/modular-wall
- **Status:** 33+ commits, active development
- **Hardware:** ESP32-S3 based modules
- **Software:** Three.js interface gallery
- **Brand:** Sacred Circuits (mythology meets technology)

The brochure reflects the current project state and serves as both a product marketing tool and a technical specification document for potential customers and community contributors.