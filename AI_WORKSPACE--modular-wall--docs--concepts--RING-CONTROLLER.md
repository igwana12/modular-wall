# Ring Controller — Concept Brief

**Date**: 2026-04-06
**Status**: Concept
**Module ID**: ring
**Type**: Wearable accessory (not wall-mounted)

---

## The Idea

A 3D-printed smart ring worn on the index finger that acts as a wireless controller for the modular wall. It's a mouse, a microphone, a motion capture device, and a gesture controller — all in a ring you print yourself.

**Tagline**: "The wall on your finger."

---

## Core Functions

### 1. Gesture Mouse
- IMU (accelerometer + gyroscope) tracks hand movement in 3D space
- Point at a module → it highlights
- Swipe to scroll content on Screen modules
- Pinch gesture (thumb + index) to select
- Twist wrist to adjust values (volume, brightness, thermostat)
- Flick to dismiss, grab to move content between modules

### 2. Voice Input
- Tiny MEMS microphone (INMP441 or similar) on inner band near fingertip
- Bring hand near mouth → speak → wall responds
- More natural than shouting across the room at a wall
- Works as PTT (push-to-talk) — squeeze ring to activate mic
- Bone conduction pickup possible through finger contact

### 3. Motion Capture
- 6-axis IMU captures hand/arm movement
- Feed motion data to the wall for:
  - Drawing in the air → appears on Screen module
  - Conducting music → wall visualizer responds
  - Exercise tracking → rep counting, form scoring via arm movement
  - Sign language recognition (future)
- Pair with Mirror module's camera for full-body + hand tracking

### 4. Haptic Feedback
- Tiny vibration motor (coin-type, Ø8mm x 3mm)
- Buzz when you point at a module (confirms selection)
- Pattern vibrations for notifications
- Rhythm taps for music tempo
- Alert when timer/alarm fires on the wall

### 5. Biometric Sensor (Optional)
- Heart rate via PPG sensor on inner band (touching skin)
- Skin temperature
- Blood oxygen (SpO2) — same tech as Oura Ring
- Feed data to health dashboard on Screen module
- Exercise mode: real-time HR displayed on wall during workout

### 6. Proximity/NFC
- NFC tag reader — tap ring to NFC-tagged modules for quick actions
- Tap the Hub → pair/configure
- Tap a Brick → assign it a function
- Tap the Controller (puck) → transfer control

---

## Hardware Options

| Component | Option 1 | Option 2 | Option 3 |
|-----------|----------|----------|----------|
| **MCU** | XIAO ESP32S3 (20x17.5mm, $6) | XIAO nRF52840 (BLE, 20x17.5mm, $10) | M5Stamp S3 (14x14mm, $7) |
| **IMU** | MPU6050 (6-axis, 4x4mm, $2) | BMI270 (6-axis, low-power, $5) | LSM6DS3 (6-axis, $4) |
| **Microphone** | INMP441 MEMS (4x3x1mm, $1) | SPH0645 (with I2S, $3) | PDM mic (2x2mm, $1) |
| **Haptic** | Coin vibration motor (Ø8x3mm, $0.50) | LRA motor (Ø8x3mm, $2) | None |
| **Battery** | LiPo 50mAh (12x20x4mm, $3) | LiPo 30mAh (ring-shaped, $5) | None (wired test) |
| **HR Sensor** | MAX30102 PPG (5.6x3.3x1.5mm, $3) | None | None |
| **NFC** | PN532 NFC (varies, $4) | NFC tag only ($0.50) | None |
| **Charging** | Magnetic pogo pads (2-pin) | Wireless Qi coil ($3) | USB-C (too bulky) |

### Recommended BOM (Basic Ring)

| Component | Part | Size | Cost |
|-----------|------|------|------|
| MCU | XIAO ESP32S3 | 20x17.5x3.5mm | $6 |
| IMU | MPU6050 breakout | 20x16x3mm | $2 |
| Mic | INMP441 | 4x3x1mm | $1 |
| Haptic | Coin motor | Ø8x3mm | $0.50 |
| Battery | LiPo 50mAh | 12x20x4mm | $3 |
| Charging | Magnetic pogo 2-pin | 5x5mm | $1 |
| Enclosure | 3D-printed resin | Ø22mm ring band | $2 |
| **Total** | | | **~$15.50** |

### Recommended BOM (Premium Ring)

Add: BMI270 IMU ($5), MAX30102 HR ($3), LRA haptic ($2), NFC tag ($0.50)
**Total: ~$26**

### Retail Price: $49 (basic) / $79 (premium with HR)

---

## Physical Design

### Ring Dimensions
- **Inner diameter**: 18-22mm (ring sizes 8-13, parametric in CAD)
- **Band width**: 8-10mm
- **Band thickness**: 5-7mm (thickest at sensor bump)
- **Weight target**: <15g (comparable to Oura Ring Gen 3 at 6g)

### Form Factor
- **Top**: Slightly raised bump housing IMU + MCU (3mm rise)
- **Inner band**: Mic hole + optional HR sensor window
- **Side**: Teal LED indicator strip (2 SK6812 mini LEDs)
- **Bottom**: Magnetic charging pads (2 pogo pin contacts)
- **Material**: Resin 3D print (SLA) for smooth finish, or PETG FDM for rough prototype

### Parametric Design
- Ring sizes generated parametrically (OpenSCAD or Fusion 360)
- User enters their ring size → CAD generates exact fit
- Component cavities are fixed, band diameter adjusts
- STL files for every size published on GitHub

---

## Communication

- **BLE 5.0** to Hub module (low latency, low power)
- **ESP-NOW** for sub-millisecond gesture response (if using ESP32S3)
- **Battery life**: 8-12 hours active use, 3-5 days standby
- **Charging**: Magnetic cradle (3D-printed stand with pogo pins)

---

## Education Pathways

### Lesson 1: Wearable Basics (Week 1)
**Learn**: How fitness trackers work — IMU, accelerometer, gyroscope axes
**Build**: Wire MPU6050 to ESP32, read raw acceleration data, display on wall Screen
**Industry**: Wearable tech (Fitbit, Apple Watch, Oura Ring, Whoop)

### Lesson 2: Gesture Recognition (Week 2)
**Learn**: How gesture-based interfaces work — signal filtering, gesture classification
**Build**: Detect 5 gestures (point, swipe, pinch, twist, flick) from IMU data
**Industry**: AR/VR controllers (Meta Quest, Apple Vision Pro hand tracking)

### Lesson 3: Voice on a Wearable (Week 3)
**Learn**: How voice assistants work on tiny devices — wake word, VAD, streaming STT
**Build**: Add INMP441 mic, detect voice activity, stream audio to Hub for STT
**Industry**: Smart speakers (Alexa, Google Home), hearing aids, translation earbuds

### Lesson 4: Haptic Design (Week 4)
**Learn**: How haptic feedback creates "feel" — vibration patterns, amplitude, frequency
**Build**: Create 5 haptic patterns (tap, buzz, pulse, heartbeat, alert), trigger from wall events
**Industry**: Game controllers (DualSense), phones (Taptic Engine), accessibility devices

### Lesson 5: Health Sensing (Week 5)
**Learn**: How PPG heart rate sensors work — LED + photodiode, pulse detection, SpO2
**Build**: Add MAX30102, measure heart rate, display live on wall health dashboard
**Industry**: Medical devices, clinical wearables, remote patient monitoring

### Lesson 6: 3D Printing Wearables (Week 6)
**Learn**: How to design wearable enclosures — ergonomics, sizing, material selection, finish
**Build**: Design parametric ring in CAD, print in resin, assemble electronics
**Industry**: Product design, prosthetics, custom medical devices, jewelry tech

### The Meta-Lesson
Building this ring teaches the exact technology behind:
- **Oura Ring** ($300, $1B+ valuation) — health sensing + wearable form factor
- **Apple Vision Pro** ($3,500) — hand tracking + gesture recognition
- **AirPods** ($250) — voice on a tiny wearable + haptic feedback
- **Meta Quest controllers** ($300) — IMU-based motion tracking

A $49 ring that teaches the tech behind $5B worth of products.

---

## Wall Integration

| Module | Ring Interaction |
|--------|-----------------|
| **Screen-S** | Point to scroll, pinch to select, swipe to dismiss |
| **Glow** | Twist wrist to adjust brightness/color temperature |
| **Pixel** | Draw in the air → pixel art appears on matrix |
| **Voice** | Bring ring near mouth → PTT voice command |
| **Sense** | Ring + mmWave = precise gesture zones |
| **Mirror** | Full hand tracking for AR filters + exercise |
| **Input-Knob** | Virtual knob — twist ring instead of physical knob |
| **Marble-Track** | Flick gesture releases marble electromagnet |
| **Hub** | NFC tap to pair/configure |

---

## Differentiation

No consumer product combines:
- **3D-printable** custom-fit wearable
- **Gesture mouse** for a wall interface
- **Voice input** on a ring form factor
- **Motion capture** from finger/hand movement
- **Open hardware** — print your own, modify the design

Closest competitors:
- **Oura Ring** ($300) — health only, no gesture, closed hardware
- **Nod Ring** (defunct) — gesture only, no voice, no health
- **Tap Strap** ($200) — keyboard input, not a ring, no health
- **Genki Wave Ring** ($100) — MIDI control only, music-specific

---

## Sacred Circuits Crossover

- **Deity channeling**: Wear the ring, speak as a god → voice changes to deity voice on the wall
- **Oracle mode**: Ring vibrates when a deity "responds" — haptic divination
- **318 NFC tags**: Each Oracle Card could have an NFC tag → tap ring to card → wall displays that deity's oracle reading
- **Motion ritual**: Gesture patterns that trigger specific mythology scenes on the wall

---

## Next Steps

1. Prototype with XIAO ESP32S3 + MPU6050 + INMP441 on breadboard (no ring form yet)
2. Test BLE latency to Hub module
3. Design parametric ring in Fusion 360 / OpenSCAD
4. Resin print first prototype ring
5. Test gesture recognition accuracy (5 gestures, >90% accuracy target)
6. Integrate with Wall Controller Agent API

---

*"Your wall. Your hand. Your voice. One ring to control them all."*
