# Modular Wall — Visual Style Direction

**Decision Date**: 2026-04-06
**Decision Maker**: Niko (CEO)
**Issue**: igwana12/modular-wall#2

---

## Selected Style: **Minimal (Style 1)**

After reviewing the 4 Blender style variants, I'm selecting **Style 1: Minimal** for V1 launch.

---

## Rationale

### 1. Council Alignment
The 5-expert council recommended a **cyberpunk/transparent aesthetic**. Style 1's clean, functional design with visible internals (pogo pins, USB-C, electronics) aligns perfectly with this vision.

### 2. "Narrow Before Widen" Mandate
Our core constraint is to launch with 2 display types and 1 hero use case. Style 1 is the simplest, most direct execution—no ornamental complexity that would slow manufacturing or increase cost.

### 3. Development Maturity
Style 1 is the most complete variant:
- **Style 1 (Minimal)**: 36 objects — fully developed
- Style 2 (Rounded): 2 objects — incomplete
- Style 3 (Baroque): 7 objects — adds ornamental complexity
- Style 4 (Wood): 2 objects — material variant only

### 4. Manufacturing Simplicity
- Clean geometric forms = easier 3D printing
- No ornamental details = lower failure rate in pilot run
- Faster iteration cycles for Phase 1-3 prototyping
- Lower PETG/ABS filament cost per module

### 5. Target Audience Fit
Our beachhead is tech-forward adults 25-40, makers, ESP32/Home Assistant community. They value:
- **Function over form**
- **Visible electronics** (badge of technical literacy)
- **Modular/hackable aesthetic**
- NOT consumer-friendly Apple-style concealment

Style 1 says: "I built this. I understand what's inside."

### 6. Campaign Aesthetic
For Phase 4 visual campaign, Style 1 renders well as:
- **Cyberpunk art installation** (smoke acrylic + internal LED glow)
- **Tech workbench vibe** (visible connectors, raw electronics)
- **Modular/systemic** (grid of identical clean modules vs ornamental chaos)

### 7. Future Expansion Path
Selecting Minimal for V1 doesn't prevent future variants:
- Post-launch, offer Style 3 (Baroque) as premium "ornamental" line
- Style 4 (Wood) could be "Warm/Natural" variant for home office buyers
- Style 2 (Rounded) could be "Consumer-Friendly" mass-market version

But V1 = tech enthusiasts who want Minimal.

---

## Comparison Matrix

| Criterion | Minimal | Rounded | Baroque | Wood |
|-----------|---------|---------|---------|------|
| **Council recommendation** | ✅ Cyberpunk | ❌ Too soft | ❌ Too ornate | ❌ Too traditional |
| **Development completeness** | ✅ 36 objects | ❌ 2 objects | ⚠️ 7 objects | ❌ 2 objects |
| **Manufacturing complexity** | ✅ Simple | ⚠️ Unknown | ❌ Complex | ⚠️ Unknown |
| **3D print reliability** | ✅ High | ❌ Untested | ❌ Ornaments fragile | ❌ Untested |
| **Target audience fit** | ✅ Tech/maker | ❌ Consumer | ❌ Art/design | ⚠️ Office/home |
| **Campaign aesthetic** | ✅ Cyberpunk | ❌ Generic | ⚠️ Niche | ❌ Traditional |
| **Cost per module** | ✅ Lowest | ❌ Unknown | ❌ Highest | ❌ Unknown |
| **Speed to Phase 1** | ✅ Immediate | ❌ Needs dev | ❌ Needs dev | ❌ Needs dev |

---

## What Gets Archived

Non-selected variants are **NOT deleted**—they're archived for future exploration:

- `Shell_Rounded`, `Display_Rounded` → Archive for post-launch consumer variant
- `Shell_Baroque`, `Display_Baroque`, `Ornament_1-4` → Archive for premium ornamental line
- `Shell_Wood`, `Display_Wood` → Archive for warm/natural home office variant

These remain in the Blender file but are hidden from active development.

---

## Next Steps (Phase 4 Campaign Work)

### For Apollo (Creative Director):
1. ✅ Archive non-selected styles (hide collections, don't delete)
2. Focus all Phase 4 rendering work on Style 1: Minimal
3. Apply Poly Haven materials:
   - **Enclosure**: Smoke-tinted acrylic (#2064 Gray Smoke reference)
   - **Frame**: Anodized aluminum (MakerBeamXL texture)
   - **Display**: Glossy LCD glass with blue glow
   - **Internal glow**: SK6812 RGBW LED strip simulation
4. Render hero shots:
   - Single module close-up (internal details visible)
   - 3x3 grid wall installation
   - Close-up of magnetic pogo connectors
   - Internal LED glow (lights off vs lights on)

### For Athena (Industrial Designer):
1. ✅ Use Style 1 geometry for all Phase 1-3 3D printing
2. Refine corner brackets for 15x15mm MakerBeamXL mounting
3. Add ventilation slots for thermal management (per council warning)
4. Design smoke acrylic cutting templates

---

## Visual Identity Keywords

For all Phase 4+ creative work, use these as north star:

- **Cyberpunk** (not steampunk, not retro-futurism)
- **Transparent/translucent** (smoke acrylic, visible internals)
- **Modular/systemic** (grid, repetition, building blocks)
- **Functional** (electronics-as-decoration, not hidden)
- **Glowing** (internal LEDs, edge-lit acrylic, ambient light)
- **Technical** (visible connectors, wiring, PCBs)

**NOT**:
- Consumer-friendly concealment
- Organic/natural materials
- Ornamental decoration
- Retro aesthetics

---

## Decision Locked

**Style 1: Minimal** is the official V1 visual direction. All Phase 1-8 work proceeds with this aesthetic.

Other styles remain archived for post-launch exploration but are OUT OF SCOPE for Phase 0-8.

---

*Approved: Niko (CEO) — 2026-04-06*
*Blender File: `~/Downloads/modular-wall-casing-4-styles.blend`*
*Active Collection: `Style_1_Minimal`*
