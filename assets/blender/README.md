# Blender Environment — mosAIc Modular Wall

**Last Updated**: 2026-04-08
**Maintained by**: Apollo 2 (Creative Director)

---

## Environment

| Setting | Value |
|---------|-------|
| **Blender Version** | 5.1.0 (build 2026-03-17, hash adfe2921d5f3) |
| **Platform** | macOS (Darwin, Apple Silicon) |
| **Render Engine** | EEVEE (default), Cycles available |
| **Resolution** | 1920 x 1080 (16:9) |
| **FPS** | 24 |
| **Color Management** | Filmic (Blender default) |

## File: `modular-wall-casing-4-styles.blend`

Primary Blender file containing all 4 style variants of the modular wall module casing.

**Source**: `~/Downloads/modular-wall-casing-4-styles.blend`
**Working Copy**: `assets/blender/modular-wall-casing-4-styles.blend`

### Selected Style: **Style 1 — Minimal**

Per CEO decision (2026-04-06), all V1 work uses Style 1: Minimal. Other styles are archived (hidden, not deleted). See `docs/VISUAL-STYLE.md` for full rationale.

### Collections

| Collection | Objects | Status | Notes |
|-----------|---------|--------|-------|
| **Style_1_Minimal** | 36 | **Active** | V1 production style |
| Style_2_Rounded | 2 | Archived | Post-launch consumer variant |
| Style_3_Baroque | 7 | Archived | Post-launch premium line |
| Style_4_Wood | 2 | Archived | Post-launch home office variant |
| Collection | 5 | Shared | Common objects (camera, lights, ground) |

### Object Inventory (Style_1_Minimal)

**Casing & Structure:**
- `Outer_Shell` — Main module enclosure (92mm x 56mm x ~25mm)
- `Frame_Inset` — Inner frame (71.6mm x 57.2mm x 4mm)

**Display:**
- `Display_LCD` — LCD screen panel (57.1mm x 42.7mm x 1mm)

**Electronics:**
- `CYD_PCB` — ESP32-2432S028R PCB (86mm x 50mm x 1.6mm)
- `USB_C_Port` / `USB_C_Slot.001` — USB-C connectors

**Edge Connectors (4 sides, 4 pins each):**
- `Edge_Top`, `Edge_Bottom`, `Edge_Left`, `Edge_Right` — Connector housings
- `Edge_*_Pin_1` through `Edge_*_Pin_4` — 16 pogo contact pins total

**Magnetic Mounting:**
- `Magnet_1` through `Magnet_4` — Corner neodymium magnets (10mm x 10mm x 3mm)

**Pogo Pin Assembly:**
- `Pogo_Housing` — Central pogo pin housing
- `Pogo_1` through `Pogo_6` — 6 spring-loaded pogo pins (2mm x 2mm x 4mm)

### Lighting Setup

| Light | Type | Energy | Position | Role |
|-------|------|--------|----------|------|
| `Key_Light` | Area | 12.0 | (0.2, -0.08, 0.18) | Primary illumination |
| `Fill_Light` | Area | 4.5 | (-0.1, 0.06, 0.12) | Shadow fill |
| `Rim_Light` | Area | 7.5 | (0.04, 0.12, 0.06) | Edge highlight |

### Camera

| Setting | Value |
|---------|-------|
| Name | `RenderCam` |
| Type | Perspective |
| Lens | 28mm |
| Position | (0.22, -0.30, 0.12) |

### Materials (19 total)

| Material | Purpose |
|----------|---------|
| `Shell_White_Matte` | Main enclosure shell |
| `Shell_Dark` | Dark variant of shell |
| `PCB_Green` | Circuit board |
| `LCD_Screen` | Display panel |
| `Connector_Housing` | Edge connector bodies |
| `Connector_Housing_Edge` | Edge connector trim |
| `Connector_Pad` | Electrical contact pads |
| `Pogo_Gold` | Pogo pin contacts |
| `Gold_v2` | Alternate gold material |
| `Magnet_Silver` / `Magnet_v2` | Neodymium magnets |
| `Clip_PETG` | PETG mounting clips |
| `USB_Dark` / `USB_v2` | USB-C port materials |
| `IC_Black` | IC/chip components |
| `LED_Teal_Glow` | Status LED indicator |
| `Ground_Dark` | Studio ground plane |
| `Antique_Gold_Frame` | Baroque style (archived) |
| `Walnut_Wood` | Wood style (archived) |

---

## Poly Haven Add-on (Not Yet Installed)

The Poly Haven Surface add-on provides free, CC0-licensed PBR materials directly within Blender.

### Installation Steps

1. Open Blender > Edit > Preferences > Get Extensions
2. Search for "Poly Haven" in the Extensions repository
3. Click Install
4. Enable the add-on in Preferences > Add-ons

**Alternative (manual):**
- Download from: polyhaven.com/addon (Blender 4.2+ extension format)
- Install via Preferences > Add-ons > Install from Disk

### Recommended Material Packs for Campaign Visuals

Per the Visual Style direction (cyberpunk/transparent aesthetic), these Poly Haven materials are candidates:

#### Metal / Aluminum (for frame and structural elements)
1. **Brushed Aluminum** — Anodized aluminum for MakerBeamXL frame texture
2. **Metal Plate** — Industrial metal base plate
3. **Stainless Steel** — Clean reflective metal for connectors
4. **Dark Metal** — Dark anodized option for contrast
5. **Copper** — Accent material for PCB traces

#### Acrylic / Glass (for transparent enclosure shell)
6. **Glass (Rough)** — Smoke-tinted acrylic simulation (#2064 Gray Smoke)
7. **Glass (Clear)** — Clean transparent variant
8. **Frosted Glass** — Diffused acrylic option

#### Electronics / Technical
9. **PCB texture** — Custom: enhance existing PCB_Green with trace detail
10. **Carbon Fiber** — Optional accent material for premium feel

#### Environment / Background
11. **Studio Softbox HDRI** — Clean product photography lighting
12. **Industrial Interior HDRI** — Contextual cyberpunk environment

### Material Mapping Plan (Style 1)

| Component | Current Material | Target Poly Haven Material | Notes |
|-----------|-----------------|---------------------------|-------|
| Outer_Shell | Shell_White_Matte | Smoke-tinted glass/acrylic | Key visual identity change |
| Frame_Inset | Shell_White_Matte | Brushed aluminum | MakerBeamXL reference |
| Display_LCD | LCD_Screen | Keep + add blue glow emission | Internal LED simulation |
| CYD_PCB | PCB_Green | Enhanced PCB with trace detail | More realistic |
| Edge connectors | Connector_Housing | Dark metal | Industrial look |
| Pogo pins | Pogo_Gold | Stainless steel / gold PBR | More realistic |
| Magnets | Magnet_Silver | Stainless steel | Consistent metallic |
| Ground | Ground_Dark | Studio backdrop or HDRI | Cleaner product shots |

---

## Render Settings

### EEVEE (Current — Fast Preview)

| Setting | Value | Notes |
|---------|-------|-------|
| Engine | EEVEE | Fast, good for iteration |
| Samples | 64 (default) | Increase to 128+ for final |
| Resolution | 1920x1080 | 16:9 standard |
| Resolution % | 100% (50% for tests) | Half-res for quick tests |
| Bloom | Consider enabling | For LED glow effects |
| Screen Space Reflections | Enable | For metallic/glass surfaces |
| Ambient Occlusion | Enable | Adds depth to crevices |

### Cycles (For Final Campaign Renders)

| Setting | Recommended Value | Notes |
|---------|------------------|-------|
| Engine | Cycles | Physically accurate |
| Device | GPU Compute (Metal) | Apple Silicon GPU |
| Samples | 256-512 | Balance quality/time |
| Denoiser | OpenImageDenoise | Built-in, good results |
| Resolution | 1920x1080 or 3840x2160 | 4K for hero shots |
| Light Paths | Default or increase transparency | For acrylic shell |
| Film > Transparent | Enable for compositing | Isolated product shots |

### Recommended Campaign Render Shots

Per VISUAL-STYLE.md:
1. **Single module close-up** — Internal details visible through smoke acrylic
2. **3x3 grid wall installation** — Modular system showcase
3. **Magnetic pogo connector close-up** — Technical detail
4. **Internal LED glow** — Lights off vs. lights on comparison

---

## Directory Structure

```
assets/blender/
  modular-wall-casing-4-styles.blend   # Primary working file
  renders/
    test-render-minimal-style.png       # Test render (960x540, EEVEE)
  README.md                             # This file
```

---

## Dependencies

| Dependency | Status | Required For |
|-----------|--------|-------------|
| Blender 5.1+ | Installed | All rendering |
| Poly Haven Add-on | **Not installed** | PBR material library |
| SACA-93 (Visual Style Selection) | Decision made (docs/VISUAL-STYLE.md) | Style direction |

---

## Notes

- All dimensions in the .blend file are in meters (Blender default). 1 Blender unit = 1 meter. Module dimensions are in the 0.05-0.09m range (50-90mm real-world).
- Non-selected style variants (Rounded, Baroque, Wood) are kept in the file but should be hidden for all V1 renders.
- The .blend file was originally at `~/Downloads/` — this copy in `assets/blender/` is the canonical working version going forward.
- For consistent renders across team members, always use the RenderCam and included 3-point lighting setup.
