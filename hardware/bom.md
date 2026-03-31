# Spirit Sphere -- Bill of Materials (BOM)

Bench rig build for POV volumetric LED display with voice AI.

**Estimated Total: $130-150**

## Core Components

| # | Component | Spec | Qty | Unit Price | Source | Lead Time | Notes |
|---|-----------|------|-----|-----------|--------|-----------|-------|
| 1 | ESP32-S3-BOX-3 | N16R8, built-in mic/speaker/WiFi/LCD | 1 | $40 | Espressif / Amazon | 3-5 days | Primary dev platform. Built-in INMP441 mic + speaker eliminates separate audio hardware for v1. |
| 2 | APA102 LED strip | 144 LEDs/m, 5V, IP30, black PCB | 1m | $15 | AliExpress / Amazon | 1-2 weeks | Cut to 36 LEDs (~25cm) for one arm. SK9822 is acceptable budget alternative. |
| 3 | N20 micro gear motor | 3-5V, 3-5 RPM, metal gearbox | 1 | $5 | AliExpress / Amazon | 1-2 weeks | With mounting bracket. Rubber-damped for <35dB operation. |
| 4 | US5881LUA Hall effect sensor | Unipolar, active-low, SOT-23 | 1 | $2 | AliExpress / Mouser | 1-2 weeks | Position sync for POV column timing. |
| 5 | Neodymium disc magnet | 3mm x 1mm | 2 | $1 | Amazon | 3-5 days | Triggers Hall sensor once per revolution. Spare included. |
| 6 | 6-wire slip ring | 12.5mm bore, 2A per wire | 1 | $8 | Adafruit #736 / AliExpress | 1-2 weeks | 6 wires: VCC, GND, SPI CLK, SPI DATA, +2 spare for future expansion. |

## Power System

| # | Component | Spec | Qty | Unit Price | Source | Lead Time | Notes |
|---|-----------|------|-----|-----------|--------|-----------|-------|
| 7 | 18650 Li-ion cells | 3.7V, 2500mAh+, Samsung 25R or equiv | 3 | $5 each | Amazon | 3-5 days | 3S configuration (11.1V nominal). Must be matched cells. |
| 8 | 3S BMS board | USB-C charge, 2-4A rate, balance + protection | 1 | $5 | AliExpress / Amazon | 1-2 weeks | Handles overcharge, overdischarge, overcurrent protection. |
| 9 | 18650 battery holder | 3-cell series, wire leads | 1 | $2 | Amazon | 3-5 days | Secure mechanical mounting for cells. |
| 10 | LM2596 buck converter | Adjustable input (7-35V), 3A output | 1 | $3 | Amazon / AliExpress | 1 week | Set to 5V output. Powers both ESP32 and LEDs. |

## Interface Components

| # | Component | Spec | Qty | Unit Price | Source | Lead Time | Notes |
|---|-----------|------|-----|-----------|--------|-----------|-------|
| 11 | Momentary push button | SPST, normally open, tactile | 1 | $0.50 | Any electronics supplier | In stock | Mic mute toggle (SPHERE-06 requirement). |
| 12 | Red LED | 3mm or 5mm through-hole | 1 | $0.10 | Any electronics supplier | In stock | Mute status indicator. |

## Passive Components

| # | Component | Spec | Qty | Unit Price | Source | Lead Time | Notes |
|---|-----------|------|-----|-----------|--------|-----------|-------|
| 13 | 220 ohm resistor | 1/4W, through-hole | 1 | $0.05 | Any | In stock | Current limiting for mute indicator LED. |
| 14 | 100 ohm resistors | 1/4W, through-hole | 2 | $0.05 each | Any | In stock | SPI signal termination through slip ring (CLK + DATA lines). |
| 15 | 10K ohm resistor | 1/4W, through-hole | 1 | $0.05 | Any | In stock | Pull-up for Hall effect sensor output. |
| 16 | 1N4007 diode | Flyback protection | 1 | $0.10 | Any | In stock | Across motor terminals to suppress inductive kickback. |

## Assembly Supplies

| # | Component | Spec | Qty | Unit Price | Source | Lead Time | Notes |
|---|-----------|------|-----|-----------|--------|-----------|-------|
| 17 | Hookup wire | 22-24 AWG, stranded, assorted colors | 1 roll | $5 | Amazon | In stock | All inter-component connections. |
| 18 | Heat shrink tubing | Assorted diameters | 1 set | $3 | Amazon | In stock | Wire protection and insulation. |
| 19 | PLA filament | 1.75mm, any color | 1 roll | $20 | Amazon | In stock | 3D-printed base enclosure and LED arm mount. |
| 20 | Rubber damper feet | M3 bolt-mount or adhesive | 4 | $2 (set) | Amazon | In stock | Motor vibration isolation on base plate. |

## Cost Summary

| Category | Subtotal |
|----------|----------|
| Core components (#1-6) | ~$71 |
| Power system (#7-10) | ~$25 |
| Interface (#11-12) | ~$0.60 |
| Passives (#13-16) | ~$0.30 |
| Assembly supplies (#17-20) | ~$30 |
| **Total estimated** | **~$127** |

*Prices are approximate. Shipping not included. AliExpress is cheapest but has longest lead times (1-2 weeks). Amazon has faster shipping at slight premium.*

## Procurement Status

All items are listed with their current procurement state.

| # | Component | Status | Notes |
|---|-----------|--------|-------|
| 1 | ESP32-S3-BOX-3 | TO ORDER | Primary blocker for hardware testing |
| 2 | APA102 LED strip | TO ORDER | |
| 3 | N20 micro gear motor | TO ORDER | |
| 4 | US5881LUA Hall sensor | TO ORDER | |
| 5 | Neodymium magnets | TO ORDER | |
| 6 | 6-wire slip ring | TO ORDER | |
| 7 | 18650 Li-ion cells (x3) | TO ORDER | Must be matched set |
| 8 | 3S BMS board | TO ORDER | |
| 9 | 18650 battery holder | TO ORDER | |
| 10 | LM2596 buck converter | TO ORDER | |
| 11 | Momentary button | TO ORDER | Generic, any supplier |
| 12 | Red LED | TO ORDER | Generic |
| 13 | 220 ohm resistor | TO ORDER | Generic |
| 14 | 100 ohm resistors (x2) | TO ORDER | Generic |
| 15 | 10K ohm resistor | TO ORDER | Generic |
| 16 | 1N4007 diode | TO ORDER | Generic |
| 17 | Hookup wire | TO ORDER | |
| 18 | Heat shrink tubing | TO ORDER | |
| 19 | PLA filament | TO ORDER | Requires 3D printer access |
| 20 | Rubber damper feet | TO ORDER | |

**Priority order:** Items 1 (ESP32-S3-BOX-3) and 2 (APA102 strip) are critical path. Order these first. Everything else can wait until these arrive.

## Notes

- The ESP32-S3-BOX-3 includes built-in microphone and speaker, eliminating the need for separate INMP441 mic and MAX98357A amplifier for the bench rig phase.
- The BOM covers a single-arm bench rig. Full sphere (6-8 arms) will require 6-8x the APA102 strip length and more complex slip ring or wireless power.
- 3D printer access is assumed. If not available, enclosure can be built from acrylic sheet or wood for prototyping.
