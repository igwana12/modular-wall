# Mirror Module — Concept Brief

**Date**: 2026-04-06
**Status**: Concept — needs prototyping
**Module ID**: mirror
**Base**: Round display (1.43" or 5" circular AMOLED) + Camera (OV5640 wide-angle) + LED ring light

---

## The Idea

A circular display + camera module that turns the modular wall into a smart mirror. The round form factor is the key — it looks like a mirror, acts like a mirror, but it's alive with AI.

**Tagline**: "Mirror, mirror on the wall."

---

## Core Features

### 1. Smart Mirror (Default Mode)
- Live camera feed displayed on the circular screen = mirror
- LED ring around the perimeter provides perfect ring-light illumination
- Adjustable color temperature (warm for morning, cool for makeup)
- Auto-brightness based on ambient light sensor

### 2. AR Beauty Filters
- Real-time face mesh overlay (MediaPipe face landmarks)
- Virtual makeup try-on
- Skin analysis (texture, hydration indicators)
- Hair color preview
- Aging/de-aging filter (fun)
- Mythological deity face filters (Sacred Circuits crossover — see yourself as Zeus, Athena, Aphrodite)

### 3. Motion Capture
- Full-body pose estimation via camera (MediaPipe Pose — 33 keypoints)
- Exercise form checker — overlay skeleton on your body, highlight bad form in red
- Yoga pose guide — show target pose as ghost overlay, match your body to it
- Dance tutorial — follow-along with pose matching and scoring
- Rep counter — automatic counting for pushups, squats, lunges

### 4. Exercise & Fitness
- Guided workouts with real-time form correction
- Heart rate estimation from face (rPPG — remote photoplethysmography)
- Calorie burn estimation
- Exercise history synced to health dashboard (Screen-S module)
- Timer/interval training with LED ring color changes (green=go, red=rest)

### 5. Video Communication
- Video calls displayed in the circular frame
- Ring light auto-activates for good lighting
- Background blur / virtual background
- "Portal" mode — always-on ambient connection to another Mirror module elsewhere

### 6. Creative Tools
- Sketch-on-face mode — draw on your face with finger gestures
- Time-lapse selfie — capture a photo every day, compile over months
- Morphing effects — face morph into animals, objects, art styles
- Style transfer — see yourself rendered as a Monet painting, anime character, Greek sculpture

---

## Hardware

| Component | Part | Cost |
|-----------|------|------|
| Display | 5" round IPS 1080x1080 (Waveshare HDMI) | ~$55 |
| Camera | OV5640 160-deg wide-angle | ~$8 |
| LED ring | SK6812 RGBW ring (24 LEDs) | ~$5 |
| Compute | ESP32-S3 or RPi Zero 2W (for ML) | ~$6-15 |
| Enclosure | 3D-printed circular housing | ~$5 |
| **Total BOM** | | **~$79-88** |

**Alternative (compact)**: Use the 1.43" round AMOLED ($29) for a smaller, simpler mirror — less ML capability but still functional as a smart vanity mirror with ring light.

### Retail Price: $129 (premium module)

---

## Software Stack

- **MediaPipe** (Google) — face mesh, pose estimation, hand tracking (free, runs on-device)
- **ONNX Runtime** — lightweight ML inference on ESP32-S3 or RPi
- **OpenCV** — camera feed processing, filter rendering
- **LVGL** — UI rendering on the circular display
- **WLED** — LED ring control (color temperature, effects)

---

## Use Cases by Time of Day

| Time | Mode | What Happens |
|------|------|-------------|
| 6:30 AM | Morning mirror | Warm ring light, clean mirror, weather overlay in corner |
| 7:00 AM | Grooming | Magnification mode, skin analysis, ring light at 5000K |
| 9:00 AM | Video call | Auto ring light, background blur, camera active |
| 12:00 PM | Exercise | Full-body pose estimation, form correction, rep counter |
| 6:00 PM | Fun | AR filters, morphing effects, deity face overlays |
| 11:00 PM | Night | Ultra-dim, warm 2700K ring light, nightlight mode |

---

## Competitive Advantage

No consumer product combines:
- Circular form factor (breaks the rectangular screen monotony)
- AI-powered AR filters + motion capture
- Ring light illumination
- Modular snap-together integration
- Exercise form correction

Closest competitors:
- **Lululemon Mirror** ($1,495) — full-length, exercise only, not modular
- **Amazon Halo** (discontinued) — body composition, no display
- **Smart mirrors** (MagicMirror) — rectangular, DIY only, no AR

**This is a $129 module that does 60% of what a $1,500 fitness mirror does.**

---

## Sacred Circuits Crossover

The Mirror module + Pantheon content library = deity face filters:
- See yourself as **Zeus** (lightning crown, golden beard overlay)
- See yourself as **Athena** (helmet, owl on shoulder)
- See yourself as **Aphrodite** (rose petals, golden glow)
- See yourself as **Ares** (war paint, fire eyes)
- **318 entities** from the master CSV = 318 unique face filters

This is the "Mirror, mirror on the wall, who's the most divine of all?" experience.

---

## Integration with Other Modules

| Module | Integration |
|--------|------------|
| **Glow** | LED ring syncs with wall ambient lighting |
| **Voice** | "Mirror, show me Zeus" voice command |
| **Sense** | Auto-activates when you approach |
| **Screen-S** | Displays exercise stats, health data |
| **Pixel** | Shows workout timer, rep counter in pixel art |
| **Hub** | Routes camera feed to Wall Controller for other displays |

---

## Education Pathways — Every Module Is a Lesson

The Mirror module alone teaches a young person how to build real products across multiple industries:

### Lesson 1: Camera Basics (Week 1)
**Learn**: How digital cameras work — sensors, pixels, frame rates, resolution
**Build**: Connect OV5640 to ESP32, display live feed on circular screen
**Industry**: Photography, surveillance, medical imaging

### Lesson 2: Face Detection (Week 2)
**Learn**: How AI recognizes faces — landmarks, mesh, bounding boxes
**Build**: Run MediaPipe face mesh, overlay 468 landmarks on the mirror feed
**Industry**: Security, social media filters, identity verification

### Lesson 3: Pose Estimation (Week 3)
**Learn**: How AI tracks the human body — 33 keypoints, skeleton mapping
**Build**: Full-body pose estimation, draw skeleton overlay on display
**Industry**: Sports tech, physical therapy, gaming, film/VFX mocap

### Lesson 4: Exercise Form Checker (Week 4)
**Learn**: How health apps analyze movement — joint angles, rep counting, form scoring
**Build**: Detect squats/pushups, count reps, highlight bad form in red
**Industry**: Fitness tech (Peloton, Mirror, Apple Fitness+), physical therapy, sports coaching

### Lesson 5: Health Metrics (Week 5)
**Learn**: How wearables estimate health data — rPPG heart rate from face, calorie estimation
**Build**: Estimate heart rate from camera feed, display on Screen-S module
**Industry**: Wearables (Apple Watch, Oura, Whoop), telemedicine, clinical trials

### Lesson 6: AR Filters (Week 6)
**Learn**: How Snapchat/Instagram filters work — face mesh → texture mapping → real-time rendering
**Build**: Create a deity face filter (Zeus crown, Athena helmet) using the Pantheon library
**Industry**: Social media, entertainment, e-commerce (virtual try-on), education

### The Meta-Lesson
Every module in the wall is a compressed version of a product that raised millions in funding. The Mirror module alone touches the technology behind:
- **Lululemon Mirror** ($500M acquisition) — exercise form correction
- **Snapchat** ($20B) — AR face filters
- **Apple Watch** ($30B/year) — health metrics from sensors
- **Ring** ($1B acquisition) — camera + AI on a wall

A teenager who builds a Mirror module has touched the core technology of four billion-dollar companies. That's what "the wall teaches you IoT/AI as you build it" actually means.

---

## Next Steps

1. Generate product image (done)
2. Add to website module catalog (done)
3. Prototype with Waveshare 5" round display + ESP32-CAM
4. Test MediaPipe face mesh on ESP32-S3 vs RPi Zero 2W
5. Design 3D-printed circular enclosure with LED ring channel
6. Build "Mirror, mirror on the wall" demo — voice-activated deity filter

---

*"The mirror doesn't just reflect you. It reimagines you."*
