# Spirit Sphere -- Enclosure Design Specification (v1)

Prototype enclosure for the Spirit Sphere bench rig. Two-part 3D-printed design: base enclosure housing electronics/battery and rotating arm for POV LED display.

**Design Philosophy:**
- v1 is a bench prototype, not a production enclosure
- Priority: functional mounting, easy access to components, stable rotation axis
- Material: PLA (cheap, fast to print, adequate for prototype)
- Expect 4-6 print iterations to get fit right

## Part 1: Base Enclosure

### Overview

Cylindrical base housing all stationary electronics and the battery pack. The motor and slip ring mount at the top center, forming the rotation axis. The ESP32-S3-BOX-3, battery, BMS, and buck converter sit inside.

- **Shape:** Cylindrical, 130mm base diameter x 80mm height
- **Wall thickness:** 2.5mm (strong enough for PLA prototype)
- **Print orientation:** Upright (base on build plate, no supports needed for outer wall)

### Top Surface

| Feature | Dimension | Notes |
|---------|-----------|-------|
| Center bore hole (slip ring) | 23mm diameter (22mm slip ring OD + 1mm tolerance) | Slip ring stator mounts flush, rotor extends above |
| Motor mount platform | 25mm x 15mm raised pad, 3mm above top surface | Surrounds slip ring bore, 2x M2 screw holes for N20 bracket |
| Hall sensor pocket | 5mm x 5mm x 3mm recess | Adjacent to rotation path, 15mm from center, oriented toward magnet arc |
| Wire pass-through slots | 3mm x 10mm (x2) | SPI + power wires from ESP32 to slip ring stator side |

### Side Wall Openings

| Feature | Dimension | Position | Notes |
|---------|-----------|----------|-------|
| USB-C cutout (BOX-3) | 12mm x 7mm | 20mm from base, centered on BOX-3 USB port | Programming and debug access |
| USB-C cutout (BMS) | 12mm x 7mm | 20mm from base, 90 degrees from BOX-3 cutout | Battery charging port |
| Mute button mount hole | 12mm diameter | 40mm from base, accessible position | Momentary push button (SPHERE-06) |
| Mute LED mount hole | 5mm diameter | Adjacent to mute button, 5mm offset | Red LED indicator (SPHERE-06) |
| Ventilation slots | 3mm x 20mm (x6) | Evenly spaced around base, 10mm from bottom | Motor heat + ESP32 heat dissipation |

### Interior Layout

```
      Top View (looking down into base)
  +----------------------------------+
  |                                  |
  |    +--------+    [Motor Mount]   |
  |    | Buck   |      (center)      |
  |    | Conv   |     /  23mm  \     |
  |    +--------+    | bore    |     |
  |                   \ hole  /      |
  |    +--------+                    |
  |    | BMS    |                    |
  |    | Board  |                    |
  |    +--------+                    |
  |                                  |
  |  +---------------------------+   |
  |  |                           |   |
  |  |    ESP32-S3-BOX-3         |   |
  |  |    (95 x 90 x 45mm)      |   |
  |  |                           |   |
  |  +---------------------------+   |
  |                                  |
  |  [====== 3x 18650 Pack =====]   |
  |  [  65mm x 55mm footprint   ]   |
  |                                  |
  +----------------------------------+
        130mm diameter
```

### Interior Features

- **BOX-3 cradle/shelf:** 100mm x 95mm x 50mm cavity, raised 20mm from base floor to keep clear of battery compartment below. Side clips or friction fit to hold BOX-3 in place. 5mm clearance on all sides for airflow.
- **Battery holder mounting points:** 65mm x 55mm footprint at base floor level (below BOX-3 shelf). 4x M3 standoff posts for securing 3-cell 18650 holder. 5mm clearance around cells for heat dissipation.
- **BMS mounting posts:** 2x M3 standoffs, positioned near battery compartment. Short wire runs to cell holder terminals.
- **Buck converter mounting posts:** 2x M3 standoffs, positioned near top of base (close to slip ring power wires). Short wire runs to BMS output and 5V distribution.
- **Wire routing channels:** 3mm wide x 3mm deep channels molded into interior walls. Route power wires from battery -> BMS -> buck converter -> ESP32/slip ring. Route SPI wires from ESP32 GPIO 11/12 -> slip ring stator wires 3/4.

### Bottom Plate

- Flat surface for table stability
- 4x rubber damper feet (M3 bolt-mount or adhesive-backed), positioned at 90-degree intervals near outer edge
- Rubber dampers provide vibration isolation from N20 motor (per research pitfall 6: motor vibration causes audio feedback)
- Optional: removable bottom plate (4x M3 screws) for battery access without disassembling top

## Part 2: Sphere Mount / Rotating Assembly

### Overview

Vertical arm extending from the slip ring rotor, carrying the APA102 LED strip. Rotates at 3-5 RPM driven by the N20 motor through the slip ring.

### Design Option A: Single Straight Arm (Start Here)

- **Shape:** Flat rectangular arm, straight vertical
- **Arm length:** 250mm (36 LEDs at ~7mm pitch for 144 LEDs/m strip)
- **Arm width:** 10mm (7mm LED strip + 1.5mm margin each side for adhesive)
- **Arm thickness:** 3mm (rigid enough in PLA at this width)
- **Attachment:** Press-fit or set screw onto slip ring rotor shaft
- **LED mounting:** Flat channel on one face for APA102 strip with adhesive backing
- **Wire channel:** 2mm groove on back face for SPI data + power wires from slip ring rotor to LED strip input end

### Design Option B: Curved Half-Sphere Arc (Future)

- Curved arm forming 180-degree arc (hemisphere profile)
- Better spherical image quality but harder to balance and print
- Defer to v1.2+ after straight arm proves functional

### Counterweight

- Single-arm design requires counterweight on opposite side for rotational balance
- **Method:** M6 bolt + nuts threaded into a stub arm on opposite side of slip ring rotor
- **Stub arm:** 80mm length, same attachment point as main arm but opposite direction
- **Adjustment:** Slide nuts along bolt to tune balance point. Target: <2mm wobble at 5 RPM.

### Magnet Mount

- 3mm diameter x 2mm deep pocket at arm base (near slip ring rotor attachment point)
- Holds neodymium disc magnet (3mm x 1mm)
- Press-fit with CA glue for retention
- Positioned to pass Hall sensor at consistent radius (15mm from center)

## Assembly Diagram (ASCII)

```
        [APA102 LED Strip - 36 LEDs, 250mm]
              |
        [Arm - 10mm wide x 3mm thick]
              |
     [Magnet]====[Slip Ring Rotor]====[Counterweight Stub]
                       |                    [M6 Bolt+Nuts]
              ====[Slip Ring]====
                       |
              [Motor Shaft Coupler]
                       |
          +---[N20 Motor Mount]---+
          |      [23mm bore]      |
          |                       |
          |  [Buck Conv]  [BMS]   |
          |                       |
          |  [ESP32-S3-BOX-3]     |
          |  [95 x 90 x 45mm]    |
          |                       |
          |  [3x 18650 Pack]      |
          |  [65 x 55mm]         |
          +---[Base Plate]--------+
              [Rubber Feet x4]
```

## Dimensional Summary Table

| Component | Dimension | Clearance | Location |
|-----------|-----------|-----------|----------|
| Base outer diameter | 130mm | - | Bottom enclosure |
| Base height | 80mm | - | Bottom enclosure |
| Base wall thickness | 2.5mm | - | All walls |
| Slip ring bore hole | 22mm + 1mm tolerance = 23mm | 1mm radial | Top center |
| Motor mount platform | 25mm x 15mm x 3mm raised | - | Top center, around bore |
| BOX-3 cradle | 100mm x 95mm x 50mm | 5mm sides | Base interior, raised 20mm |
| Battery compartment | 70mm x 60mm x 20mm | 5mm all sides | Base floor, below BOX-3 shelf |
| BMS mount | 30mm x 20mm | - | Interior wall, near battery |
| Buck converter mount | 25mm x 15mm | - | Interior wall, near top |
| Mute button hole | 12mm diameter | - | Base side wall, 40mm from bottom |
| Mute LED hole | 5mm diameter | - | Base side wall, near mute button |
| USB-C cutouts (x2) | 12mm x 7mm each | - | Base side wall, 20mm from bottom |
| Ventilation slots (x6) | 3mm x 20mm each | - | Base side wall, 10mm from bottom |
| Arm length | 250mm | - | Rotating above base |
| Arm width | 10mm | 1.5mm each side of LED strip | Rotating above base |
| Arm thickness | 3mm | - | Rotating above base |
| Counterweight stub | 80mm length | - | Opposite side of arm |
| Hall sensor pocket | 5mm x 5mm x 3mm | - | Top surface, 15mm from center |
| Magnet pocket | 3mm dia x 2mm deep | - | Arm base, 15mm from center |

## Printing Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Layer height | 0.2mm | Standard quality, good for prototype |
| Infill | 20% | Adequate strength for PLA prototype |
| Supports | Yes | Needed for USB-C cutouts, internal shelf overhangs, bore hole |
| Material | PLA | Cheap, fast to print, adequate for indoor prototype |
| Nozzle | 0.4mm standard | Default nozzle for most printers |
| Print temperature | 200-210C (PLA dependent) | Consult filament manufacturer |
| Bed temperature | 60C | Standard PLA bed temp |
| Estimated print time (base) | 6-8 hours | Depending on printer speed |
| Estimated print time (arm) | 1-2 hours | Simple geometry |
| Estimated print time (total) | 8-12 hours | Both parts combined |
| Estimated PLA usage | 150-200g | ~$3-5 per print at typical filament cost |

## Iteration Budget

| Version | Goal | Focus |
|---------|------|-------|
| v1.0 | First print, verify component fit | Check bore hole, BOX-3 cradle, battery holder, USB-C cutout alignment |
| v1.1 | Adjust tolerances based on v1.0 | Tighten or loosen fits, fix any warping or overhang issues |
| v1.2 | Cable management + ventilation | Add/refine wire channels, improve airflow, motor vibration isolation |
| v1.3 | Balance and rotation | Tune counterweight, verify slip ring clearance during rotation |
| v1.4-v1.5 | Aesthetic refinements (if time permits) | Smooth surfaces, logo/branding, snap-fit lid improvements |

**Budget:** 4-6 prints at ~$3-5 PLA each = $12-30 total filament cost

## File Naming Convention

- `enclosure-base-v1.0.stl` / `.step` / `.f3d`
- `enclosure-arm-v1.0.stl` / `.step` / `.f3d`
- `enclosure-counterweight-v1.0.stl` / `.step` / `.f3d`
- Store in `hardware/cad/` directory
- Increment version number with each iteration (v1.0, v1.1, v1.2, etc.)

## CAD Modeling Notes

- Model in FreeCAD (free) or Fusion 360 (free for personal use)
- Export STL for slicing, STEP for interchange
- Keep parametric dimensions for easy iteration (bore hole diameter, wall thickness, etc.)
- Use 0.2mm tolerance on all press-fit interfaces (slip ring bore, button holes)
- Round external edges with 1mm fillet for print quality

## References

- Component dimensions from [hardware/bom.md](bom.md)
- Pin connections and layout from [hardware/wiring-diagram.md](wiring-diagram.md)
- Vibration isolation requirement from Phase 7 research (pitfall 6: motor vibration causes audio feedback)
- Slip ring bore dimension: 12.5mm bore, ~22mm OD (Adafruit #736 / AliExpress equivalent)
