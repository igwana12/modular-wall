# Frame System & Handheld Controller Research

**Date**: 2026-04-05

---

## Aluminum Extrusion — Recommended: MakerBeamXL (15x15mm)

| Profile | Size | Weight/m | Hardware | Threaded Ends | Price/m | Best For |
|---------|------|----------|----------|--------------|---------|----------|
| MakerBeam | 10x10mm | 136g | M3 | Yes | ~$8-12 | Tiny modules |
| **MakerBeamXL** | **15x15mm** | **297g** | **M3** | **Yes** | **~$6-10** | **IoT sweet spot** |
| OpenBeam | 15x15mm | 297g | M3 | No | ~$5-8 | Open source builds |
| Misumi HFS3 | 15x15mm | ~300g | M3 | Configurable | ~$3-6 | Precision/volume |
| 2020 Metric | 20x20mm | ~500g | M5 | No | ~$2-5 | Too large |

**Starter kit**: ~$90-120 (40 beams mixed lengths + brackets + hardware)
**Buy**: [makerbeam.com](https://www.makerbeam.com/makerbeamxl/), Amazon

## 3D-Printable Corner Connectors

**Best option**: [Corner Bracket Generator on MakerWorld](https://makerworld.com/en/models/709750) — parametric, customizable insert shape/size, 2-way to 6-way configurations.

Also available:
- [Extrusion Corner Plate Brackets for 1515](https://www.printables.com/model/154054) — ready to print, M3 holes
- [Parametric Mounting Brackets Generator](https://makerworld.com/en/models/1145333)
- MakerBeam corners with panel slot cutouts on STLFinder

**Print material**: PETG or ABS (PLA will creep under load). 50-100% infill for structural corners.

## Panel Attachment

**Recommended**: 3D-printed corners with integrated panel grooves — panels slide in, captured on all sides. No additional hardware needed for panel swapping.

Also viable: T-nut + bolt through panel, preset slide-and-lock nuts, 3D-printed snap clips.

---

## Handheld Controller — Component Options

### Best Candidates

| Device | Screen | MCU | Input | Price | Notes |
|--------|--------|-----|-------|-------|-------|
| **LILYGO T-Deck** | 2.8" LCD 320x240 | ESP32-S3 | Full QWERTY + trackball + encoder | ~$35-45 | Most complete, BlackBerry-style trackball |
| **M5Stack CardPuter** | 1.14" LCD 240x135 | ESP32-S3 | 56-key keyboard | ~$30 | Tiny, pocketable, card-sized |
| **M5Stack Core2** | 2" LCD 320x240 touch | ESP32 | Touchscreen + 3 buttons + IMU | ~$50 | Touch-first, vibration motor |
| **2.1" Round + Encoder** | 480x480 IPS round | ESP32-S3 | Magnetic rotary encoder | ~$25 | Beautiful dial interface |

### Rabbit R1 Reference Specs
- 2.88" touchscreen, MediaTek Helio P35, 128GB storage
- Push-to-talk button, 360-degree rotating camera
- Dimensions: 78 x 78 x 13mm, 115g
- The R1's appeal: single-purpose physicality, satisfying scroll wheel, bright orange

### Recommended Build
Custom enclosure (3D-printed) housing:
- ESP32-S3 (WiFi to wall controller)
- 2.1" round IPS display with magnetic rotary encoder (~$25)
- Physical buttons (select, back, mode)
- Small LiPo battery (500-1000mAh)
- Optional: INMP441 mic for voice commands

**Estimated BOM**: ~$40-50
**The key insight**: The rotary encoder + round display combo gives you a satisfying physical dial for scrolling through modules/scenes — similar to the R1's scroll wheel but with visual feedback.

---

## Depth Cameras — Current Options (2026)

| Camera | Price | Skeleton Tracking | Key Feature |
|--------|-------|-------------------|-------------|
| **Stereolabs ZED 2i** | $499 | Built-in 70-keypoint | Best accuracy, wide FOV |
| **Orbbec Femto Bolt** | ~$500-700 | Via Nuitrack | Azure Kinect replacement |
| **Luxonis OAK-D Pro** | ~$200-300 | Custom models | On-device 4 TOPS AI |
| **RealSense D555** | TBD | Via SDK | New V5 SoC, PoE, IP65 |

**Azure Kinect**: DISCONTINUED. Tech transferred to Orbbec.
**Intel RealSense**: ALIVE — spun out independently with $50M funding.

### AI Mocap (No Special Hardware)
- **Rokoko Vision**: Free, browser-based, works with any webcam
- **Plask**: $50/mo, upload video → clean animation
- **MediaPipe**: Free, 33 body keypoints from RGB camera

### Council's Recommended Demo
Wall-mounted ZED 2i ($499) captures your silhouette → AI generates stylized avatar in real-time on LED matrix. Technically achievable, photographs spectacularly, social media shareable.
