# Spirit Sphere -- Battery System Guide

Comprehensive wiring, safety, and testing guide for the 3S 18650 battery system with USB-C charging pass-through.

## Battery Configuration

| Parameter | Value |
|-----------|-------|
| Configuration | 3S1P (3 cells in series, 1 parallel string) |
| Nominal voltage | 11.1V (3 x 3.7V) |
| Full charge voltage | 12.6V (3 x 4.2V) |
| Empty voltage (cutoff) | 9.0V (3 x 3.0V) |
| Capacity | 2500-3000mAh (depends on cell choice) |
| Recommended cell | Samsung 25R (2500mAh, 20A continuous) or equivalent |
| Energy | ~27.75Wh at nominal voltage |

## Components

| # | Component | Spec | BOM Ref | Notes |
|---|-----------|------|---------|-------|
| 1 | 18650 Li-ion cells | 3.7V, 2500mAh+, matched set | BOM #7 | MUST be same brand, model, capacity, age |
| 2 | 18650 battery holder | 3-cell series, spring contacts | BOM #9 | DO NOT solder directly to cells |
| 3 | 3S BMS board | USB-C input, balance charging, protection | BOM #8 | Overcharge, overdischarge, short circuit protection |
| 4 | LM2596 buck converter | Adjustable, 7-35V input, 3A output | BOM #10 | Set to 5V output before connecting loads |
| 5 | Main power switch | SPST toggle, 3A rated | Optional | Between BMS output and buck converter input |

See [hardware/bom.md](bom.md) for sourcing details and pricing.

## Wiring Diagram

```
    Cell 1         Cell 2         Cell 3
  +------+       +------+       +------+
  | 3.7V |       | 3.7V |       | 3.7V |
  +--+---+       +--+---+       +--+---+
     |   |          |   |          |   |
     +   -          +   -          +   -
     |   +----------+   +----------+   |
     |        |               |        |
     B+       B1              B2       B-
     |        |               |        |
     +--------+---[ 3S BMS ]--+--------+
                   |     |
                   P+    P-    <-- BMS protected output (9.0-12.6V)
                   |     |
              [USB-C IN] |     <-- External charger (5V 2A typical)
              (charging) |
                   |     |
            [Power Switch]     <-- Optional: full system shutdown
                   |     |
              +----v-----v----+
              |   LM2596      |
              |   Buck Conv   |
              |   IN: P+/P-   |
              |   OUT: 5V     |
              +--+------+--+--+
                 |      |  |
          +------+   +--+  +----------+
          |          |                 |
   [ESP32-S3-BOX-3] [APA102 LEDs]  [N20 Motor]
   via USB-C or      via slip ring   via MOSFET
   5V header pin     wires 1+2       (see wiring-diagram.md)
```

### BMS Board Wiring Detail

The 3S BMS has specific pad labels. Match carefully:

| BMS Pad | Connect To | Wire Color (suggested) |
|---------|-----------|----------------------|
| B+ | Cell 1 positive terminal | Red |
| B1 | Junction of Cell 1 negative / Cell 2 positive | Yellow |
| B2 | Junction of Cell 2 negative / Cell 3 positive | Green |
| B- | Cell 3 negative terminal | Black |
| P+ | Load positive (to buck converter VIN+) | Red (thicker) |
| P- | Load negative (to buck converter VIN-) | Black (thicker) |

## Safety Requirements (CRITICAL)

These are non-negotiable. Violating any of these risks fire, explosion, or component destruction.

1. **NEVER connect 3S pack directly to ESP32 or LEDs.** The 3S pack outputs 9.0-12.6V. The ESP32-S3-BOX-3 accepts 5V max via USB-C. APA102 LEDs are rated for 5V. Direct connection at 9-12.6V WILL destroy both components instantly.

2. **ALWAYS use matched cells.** All three 18650 cells must be the same brand, model, capacity, and ideally from the same production batch. Mismatched cells cause dangerous voltage imbalance during charging -- one cell can be overcharged while another is undercharged.

3. **NEVER charge without BMS.** The BMS prevents overcharge above 4.2V per cell (thermal runaway risk), overdischarge below 2.7V per cell (cell damage), and short circuit (fire risk). Bypassing the BMS removes all safety protection.

4. **ALWAYS verify BMS protection ratings** before first use:
   - Overcharge cutoff: 4.25-4.30V per cell
   - Overdischarge cutoff: 2.5-2.7V per cell
   - Overcurrent/short circuit: 8-10A cutoff
   - Balance current: 50-100mA (ensures cells stay matched)

5. **NEVER solder directly to 18650 cells.** The heat from soldering can damage the cell's internal separator, creating an internal short that may cause thermal runaway hours or days later. Use a battery holder with spring contacts, or use cells with pre-welded nickel tabs.

6. **Keep battery away from heat sources.** Mount the battery holder at the base of the enclosure, away from the motor (generates heat under load) and the buck converter (generates heat during conversion). Maintain at least 10mm clearance.

7. **Add a main power switch** between BMS output (P+/P-) and buck converter input. This allows full system shutdown without disconnecting wires. Prevents parasitic drain from BMS quiescent current (~20mA) during storage.

8. **Store at 3.7V per cell (50% charge)** if not used for more than 2 weeks. Full charge storage degrades Li-ion cells faster.

9. **Inspect cells before each use.** Look for dents, swelling, torn wraps, or exposed metal. Damaged cells must be safely disposed of at a battery recycling center -- never in regular trash.

10. **Keep a fire extinguisher or sand bucket nearby** during initial assembly and testing. Li-ion cells can vent flammable gas if shorted or punctured.

## USB-C Charging Pass-Through

The BMS board's USB-C input handles charging. The system can operate while charging.

| Parameter | Value |
|-----------|-------|
| Charge input | USB-C, 5V 2A typical (10W) |
| Charge current | 1-2A (BMS-limited) |
| Charge time | ~2.5 hours at 1A (2500mAh cells) |
| Pass-through | Yes -- device operates from BMS output while charging |
| Charge indicator | BMS board LED (red = charging, green = full, varies by board) |

**How pass-through works:** The BMS simultaneously charges the cells from USB-C input and provides protected output on P+/P-. The buck converter receives power from P+/P- regardless of whether the system is on battery or USB-C power. There is no interruption during charge/discharge transition.

**For v1 prototype:** Use a standard USB-C 5V 2A charger (phone charger). Do NOT use USB-C PD chargers that negotiate higher voltages -- most 3S BMS boards only accept 5V input. USB-C PD trigger boards for 12V charging are deferred to v1.1.

## Buck Converter Setup

The LM2596 adjustable buck converter steps the 3S battery voltage (9.0-12.6V) down to a stable 5V rail for all downstream components.

### Setup Procedure

1. **Before connecting any load**, connect the buck converter input to the BMS P+/P- output
2. **MEASURE output with multimeter** -- turn the adjustment potentiometer slowly until output reads **5.0V +/- 0.1V**
3. The potentiometer is a multi-turn trimmer. Small adjustments are normal. Turn clockwise to increase voltage, counterclockwise to decrease (varies by module -- verify direction).
4. **Mark the potentiometer position** with a dot of nail polish or marker to detect accidental changes
5. Verify output stays within 4.9-5.1V across the input voltage range:
   - Test at 9.0V input (simulates empty battery) -- should output ~5.0V
   - Test at 12.6V input (simulates full battery) -- should output ~5.0V
6. If output sags below 4.8V under load, verify input connections and check for loose wires

### Load Distribution from 5V Rail

| Load | Connection | Max Current | Notes |
|------|-----------|-------------|-------|
| ESP32-S3-BOX-3 | USB-C cable or 5V header pin | 350mA peak | WiFi + audio active |
| APA102 LEDs (x36) | Via slip ring wires 1 (VCC) + 2 (GND) | 720mA peak | All RGB full white (rarely hits this) |
| N20 Motor | Via MOSFET low-side switch | 300mA peak | Under load with rotating assembly |
| **Total 5V rail** | | **1370mA peak** | Well within LM2596 3A rating |

## Power Budget Table

| Component | Voltage | Current (typical) | Current (peak) | Power (typical) | Notes |
|-----------|---------|-------------------|----------------|-----------------|-------|
| ESP32-S3-BOX-3 | 5V | 150mA | 350mA | 0.75W | WiFi + audio active |
| APA102 x36 LEDs | 5V | 360mA | 720mA | 1.80W | 20mA per LED channel, 3 channels |
| N20 Motor | 5V | 100mA | 300mA | 0.50W | Under load (spinning arm + slip ring drag) |
| Hall sensor (US5881LUA) | 3.3V | 5mA | 5mA | 0.02W | From ESP32 3.3V regulator |
| Mute LED indicator | 3.3V | 10mA | 10mA | 0.03W | Via 220 ohm resistor |
| BMS quiescent | - | 20mA | 20mA | 0.22W | Always-on standby draw |
| Buck converter overhead | - | 50mA | 50mA | 0.55W | ~85% conversion efficiency loss |
| **Total** | | **695mA** | **1455mA** | **3.87W** | At 5V equivalent |

### Runtime Estimates

| Scenario | Current Draw | Runtime (2500mAh cells) | Notes |
|----------|-------------|------------------------|-------|
| Typical use | 695mA | ~3.6 hours | Normal conversation + POV animation |
| Peak use | 1455mA | ~1.7 hours | All LEDs full white + WiFi burst + motor stall |
| Idle (standby) | 220mA | ~11.4 hours | ESP32 connected, no audio, LEDs dim pulse |

**Calculation:** Runtime = Cell Capacity / Current Draw. Accounting for buck converter efficiency (~85%): effective 5V capacity = (2500mAh x 11.1V x 0.85) / 5V = ~4700mAh at 5V. Typical runtime = 4700mAh / 695mA = ~6.8 hours. Conservative estimate (accounting for cell aging and measurement error): ~3.6 hours.

## Testing Procedure

Follow these steps in order. Do NOT skip steps or combine them.

### Step 1: Cell Verification
- Place all 3 cells in the holder
- Measure each cell voltage individually with multimeter
- All cells should read within 0.1V of each other (e.g., 3.65V, 3.70V, 3.68V)
- If any cell is more than 0.2V different, charge cells individually before proceeding

### Step 2: BMS Connection
- Connect battery holder wires to BMS (B+, B1, B2, B-)
- Observe correct polarity -- **reversing B+/B- will destroy the BMS**
- Measure BMS output (P+ to P-) with multimeter
- Should read 9.0-12.6V depending on cell charge state

### Step 3: Charge Test
- Connect USB-C charger to BMS
- Verify charging indicator LED lights up
- Measure cell voltages after 10 minutes -- should be slowly increasing
- Verify no heat from BMS board (warm is OK, hot is NOT)

### Step 4: Buck Converter Calibration
- Connect buck converter input to BMS P+/P-
- **With NO load connected to output**: adjust potentiometer until output reads 5.0V
- Verify with multimeter at output terminals
- Mark potentiometer position

### Step 5: ESP32 Power Test
- Connect ESP32-S3-BOX-3 to buck converter 5V output (via USB-C cable or 5V pin)
- Verify BOX-3 boots normally
- Measure 5V rail under load -- should stay above 4.8V
- Run for 5 minutes, check for heat on buck converter

### Step 6: LED Power Test
- Connect APA102 strip (via slip ring or direct) to 5V rail
- Run test pattern (all LEDs white at 50% brightness)
- Measure 5V rail under load -- should stay above 4.8V
- Verify no LED flickering (voltage sag indicator)

### Step 7: Motor Power Test
- Connect N20 motor (via MOSFET circuit) to 5V rail
- Run motor at target RPM (3-5 RPM)
- Measure 5V rail -- should stay above 4.8V even during motor startup surge

### Step 8: Combined Load Test
- All peripherals running simultaneously: ESP32 + LEDs + motor
- Measure 5V rail: must stay above 4.8V
- Monitor for 10 minutes continuously
- Check battery voltage trend (should decrease slowly and linearly)

### Step 9: Charging While Running
- Plug in USB-C charger while all peripherals are active
- Verify device continues operating without interruption
- Verify charging indicator activates
- Run for 5 minutes to confirm stability

### Step 10: Discharge Protection Test
- Disconnect charger
- Let system run until BMS triggers overdischarge protection
- BMS should cut output at ~9.0V (3.0V per cell)
- System should shut down cleanly (no data corruption)
- Verify cells can be recharged after protection trip

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| BMS output is 0V | Overdischarge protection tripped | Charge via USB-C for 10 minutes, then recheck |
| 5V rail drops below 4.5V under load | Buck converter can't sustain load, or cells nearly empty | Check cell voltage. If cells >10V and still sagging, check wire connections for high resistance |
| ESP32 resets randomly | Voltage dip during motor startup | Add 470uF electrolytic capacitor across buck converter output |
| LEDs flicker when motor starts | Motor inrush current causing voltage sag | Add soft-start to motor (PWM ramp from 0-100% over 500ms) -- already implemented in firmware |
| BMS gets hot during charging | Charge current too high for board rating | Use lower-current charger (1A instead of 2A) |
| Cells have different voltages after charging | BMS balance function not working or cells too mismatched | Replace cells with matched set; verify BMS balance wires are connected |

## References

- Component specifications and sourcing: [hardware/bom.md](bom.md)
- Full pin-to-pin connections and GPIO allocation: [hardware/wiring-diagram.md](wiring-diagram.md)
- Research pitfall 5: "3S Battery Voltage vs ESP32 Input" -- details voltage regulation chain
- Research pitfall 6: "Motor Vibration Causes Audio Feedback" -- battery placement considerations
