# Spirit Sphere -- Wiring Diagram

Pin-to-pin connection guide for the ESP32-S3-BOX-3 bench rig with POV LED display.

## System Overview

```
                    +-----------------+
                    |  3x 18650 (3S)  |
                    |  11.1V nominal  |
                    +--------+--------+
                             |
                    +--------v--------+
                    |   3S BMS Board  |
                    | (USB-C charge)  |
                    +--------+--------+
                             |
                    +--------v--------+
                    |  LM2596 Buck    |
                    |  IN:9-12.6V     |
                    |  OUT: 5V / 3A   |
                    +--+-----+-----+--+
                       |     |     |
              +--------+  +--+--+  +--------+
              |           |     |           |
     +--------v---+  +---v-----v---+  +----v----------+
     |  ESP32-S3  |  | Slip Ring   |  | N20 Motor     |
     |  BOX-3     |  | (stationary |  | (via MOSFET   |
     |            |  |  side)      |  |  or direct)   |
     +--+-+-+--+--+  +---+----+---+  +---------------+
        | | |  |          |    |
        | | |  |     +----v----v----+
        | | |  |     | Slip Ring    |
        | | |  |     | (rotating    |
        | | |  |     |  side)       |
        | | |  |     +---+----+----+
        | | |  |         |    |
        | | |  |    +----v----v----+
        | | |  |    | APA102 Strip |
        | | |  |    | (36 LEDs)    |
        | | |  |    +-------------+
        | | |  |
        | | |  +--- Hall Sensor (GPIO 4)
        | | +------ Mute Button (GPIO 39)
        | +-------- Mute LED (GPIO 40)
        +---------- SPI CLK+DATA (GPIO 11, 12)
```

## Connection Details

### 1. SPI Bus: ESP32 -> Slip Ring -> APA102 LED Strip

The SPI data path goes through the slip ring to reach the rotating LED arm.

**Stationary side (ESP32 to slip ring):**

| ESP32-S3-BOX-3 Pin | Signal | Via | Slip Ring Wire | Notes |
|---------------------|--------|-----|----------------|-------|
| GPIO 11 (HSPI MOSI) | SPI DATA | 100 ohm series resistor | Wire 3 | Data line for APA102 |
| GPIO 12 (HSPI SCK) | SPI CLK | 100 ohm series resistor | Wire 4 | Clock line for APA102 |
| 5V rail | VCC | Direct | Wire 1 | Power for LEDs |
| GND | GND | Direct | Wire 2 | Common ground |
| -- | -- | -- | Wire 5 | Spare (future use) |
| -- | -- | -- | Wire 6 | Spare (future use) |

**Rotating side (slip ring to APA102):**

| Slip Ring Wire | APA102 Pin | Notes |
|----------------|------------|-------|
| Wire 1 (VCC) | 5V (red) | LED power |
| Wire 2 (GND) | GND (black) | Common ground |
| Wire 3 (DATA) | DI (data in, blue) | SPI MOSI |
| Wire 4 (CLK) | CI (clock in, green) | SPI SCK |

**100 ohm termination resistors** are placed in series on both SPI CLK and SPI DATA lines on the stationary side, between the ESP32 GPIO pins and the slip ring input. These dampen signal reflections caused by the slip ring's sliding contacts.

**SPI_SPEED must be set to 6 MHz (not 12 MHz) for slip ring reliability.** The slip ring introduces contact resistance and noise. At 12 MHz, signal integrity degrades and causes LED flickering or data corruption. Reduce to 6 MHz in `config.h`:

```cpp
#define SPI_SPEED  6000000  // 6 MHz -- derated for slip ring reliability
```

### 2. Motor Control: ESP32 -> N20 Gear Motor

| ESP32-S3-BOX-3 Pin | Signal | Destination | Notes |
|---------------------|--------|-------------|-------|
| GPIO 5 | PWM output | N-channel MOSFET gate (or motor terminal 1 if <40mA) | 1 kHz PWM, 8-bit resolution |
| -- | MOSFET drain | Motor terminal 1 | Low-side switching |
| -- | Motor terminal 2 | 5V rail | Motor power |
| -- | 1N4007 diode | Across motor terminals (cathode to 5V) | Flyback protection |

**If motor draws <40mA at stall:** GPIO 5 can drive the motor directly without a MOSFET. Measure stall current before deciding. Most N20 3-5RPM motors draw 60-200mA, so a MOSFET is recommended.

**Motor MOSFET wiring (if needed):**
```
GPIO 5 ---[10K]--- MOSFET Gate
                   MOSFET Source --- GND
                   MOSFET Drain --- Motor (-) terminal
                   Motor (+) terminal --- 5V rail
                   1N4007: cathode at 5V, anode at Motor (-) terminal
```

### 3. Hall Effect Sensor: US5881LUA -> ESP32

| US5881LUA Pin | Connection | Notes |
|---------------|------------|-------|
| VCC (pin 1) | 3.3V rail | 3.3V supply from ESP32 |
| GND (pin 2) | GND | Common ground |
| OUT (pin 3) | GPIO 4 + 10K pull-up to 3.3V | Active-low output, FALLING edge interrupt |

```
3.3V ---[10K]---+--- GPIO 4
                |
         US5881LUA OUT (pin 3)
```

**Mounting:** Hall sensor is fixed to the stationary base. Neodymium magnet is attached to the rotating assembly. Sensor triggers once per revolution when magnet passes.

**Interrupt configuration:** `attachInterrupt(HALL_PIN, hallISR, FALLING)`

### 4. Mute Button + LED Indicator

| ESP32-S3-BOX-3 Pin | Signal | Connection | Notes |
|---------------------|--------|------------|-------|
| GPIO 39 | Button input | Momentary button to GND | INPUT_PULLUP, active-low |
| GPIO 40 | LED output | 220 ohm -> Red LED anode | LED cathode to GND |

```
GPIO 39 ---+--- Button --- GND
           |
      (internal pull-up)

GPIO 40 ---[220R]--- LED (+) --- LED (-) --- GND
```

**Debounce:** Software debounce (50ms) in firmware. Button toggles mute state on press.

### 5. Battery System

```
+--[ 18650 ]--[ 18650 ]--[ 18650 ]--+
|          3S (11.1V nominal)        |
+----------------+-------------------+
                 |
          +------v------+
          |  3S BMS     |
          |  USB-C in   |<---- External USB-C charger (12V PD or 5V 2A)
          |  B+ / B-    |----> Battery terminals
          |  P+ / P-    |----> Load output (protected)
          +------+------+
                 |
          +------v------+
          |  LM2596     |
          |  Vin: P+/P- |
          |  Vout: 5V   |----> ESP32-S3-BOX-3 (USB-C power or 5V header pin)
          |  Vout: 5V   |----> APA102 VCC (via slip ring wire 1)
          +-------------+
```

### CAUTION: Voltage Safety

**NEVER connect 3S battery (9-12.6V) directly to ESP32 or LEDs.** The ESP32-S3-BOX-3 accepts 5V via USB-C. The APA102 LEDs are rated for 5V. Direct 3S voltage WILL destroy both components instantly. Always route through the LM2596 buck converter set to 5V output.

**Verify LM2596 output with a multimeter BEFORE connecting any load.** Adjust the potentiometer until output reads 5.0V +/- 0.1V.

## GPIO Pin Summary

| GPIO | Function | Direction | Config | Notes |
|------|----------|-----------|--------|-------|
| 4 | Hall sensor | INPUT | INPUT_PULLUP, FALLING interrupt | Position sync |
| 5 | Motor PWM | OUTPUT | LEDC channel 0, 1kHz, 8-bit | Speed control |
| 11 | SPI MOSI (DATA) | OUTPUT | HSPI, 6 MHz | To APA102 via slip ring |
| 12 | SPI SCK (CLK) | OUTPUT | HSPI, 6 MHz | To APA102 via slip ring |
| 39 | Mute button | INPUT | INPUT_PULLUP | Active-low, 50ms debounce |
| 40 | Mute LED | OUTPUT | Digital HIGH/LOW | Red LED with 220 ohm series |

## Power Budget (Worst Case)

| Component | Current Draw | Notes |
|-----------|-------------|-------|
| ESP32-S3-BOX-3 | ~250mA | WiFi active + audio |
| APA102 (36 LEDs, full white) | ~720mA | 20mA per LED x 36 |
| N20 motor | ~150mA | Typical running current |
| Hall sensor | <5mA | Negligible |
| Mute LED | ~10mA | Through 220 ohm resistor |
| **Total worst case** | **~1.14A at 5V** | |

With 3x 18650 at 2500mAh (3S = 11.1V nominal): usable capacity through buck converter ~2000mAh at 5V (accounting for conversion efficiency ~85%). **Runtime: ~1.75 hours continuous at worst case.**

In practice, LED patterns rarely use full white, so typical draw is ~600-800mA giving ~2.5-3.3 hours runtime.

## Assembly Notes

1. **Test each subsystem independently** before combining:
   - ESP32 + LED strip (no motor, no slip ring) -- verify SPI data
   - ESP32 + motor + Hall sensor -- verify RPM measurement
   - Slip ring continuity test -- multimeter all 6 wires
   - Battery system -- verify 5V output under load

2. **Slip ring orientation:** Stationary wires go to ESP32 side. Rotating wires go to LED arm. Label wires before assembly.

3. **SPI signal quality:** If LEDs flicker or show wrong colors after slip ring integration, try:
   - Reduce SPI_SPEED from 6 MHz to 4 MHz
   - Add 100pF capacitors across CLK and DATA at the LED strip end
   - Shorten wires between slip ring and LED strip

4. **Motor mounting:** Use rubber damper feet between motor bracket and base. N20 motors at 3-5 RPM are quiet but can transmit vibration to enclosure if hard-mounted.
