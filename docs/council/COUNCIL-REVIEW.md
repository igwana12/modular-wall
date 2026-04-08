# The Modular Wall — Council Review

**Date**: 2026-04-05
**Source**: 5-perspective expert council analysis

---

## Top 3 Cross-Cutting Themes

### 1. Narrow Before You Widen
Four of five experts flagged the same issue: too many value props, too many module types, too broad an audience. Launch with ONE hero use case, TWO display types, ONE target customer. Expand after validation.

### 2. Pre-Assembled Modules, Mechanical-Only User Assembly
The hardware designer, manufacturing expert, and education expert all converge: pre-assembled, pre-tested electrical modules with mechanical-only user assembly. Open-source STLs should be a customization option, not the default path. The single biggest predictor of hardware product failure is user-facing electrical assembly.

### 3. The Creative Capture Loop Is Your Differentiator
The market strategist and creative technologist agree: dashboards and ambient light are table stakes. The depth-camera-to-stylized-avatar loop is the thing that makes people stop scrolling. Build ONE magical demo to perfection and let it carry your launch.

---

## Hardware Product Designer

**Strengths**: Aluminum extrusion + 3D-printed corners is proven. Mixed-module approach is genuinely novel. Snap-together removes the biggest barrier (soldering).

**Concerns**:
- **Weight**: 12-16 modules = 5-8kg. 3D-printed corners will creep/deform over 6-18 months under sustained load + thermal cycling.
- **Vibration**: Surface exciters adjacent to cameras/screens will cause jitter. Need vibration isolation.
- **Connector reliability**: 16 snap connections = many potential failure points.
- **Thermal**: Dense grid of panels + enclosed acrylic = thermal pocket (60-70C).

**Recommendations**:
- Injection-molded corners for sold kits (~$0.80-1.50/corner vs $0.30 filament). Keep STLs open-source.
- Two-part bus: separate power rail and data rail physically.
- Foam gasket/silicone damper at each mount point (~$0.05/gasket).
- French cleat wall mount system from same aluminum extrusion stock.

**Change first**: Replace 3D-printed structural corners with injection-molded in the starter kit.

---

## Market Strategist

**Strengths**: "I built this" identity market is real and growing. $425 starter price is credible. 10 value props = optionality to find PMF.

**Concerns**:
- **"Minority Report for makers" is an insider reference** — means nothing to parents, creators, or smart home buyers. Sets undeliverable expectations.
- **10 value props = no positioning.** "Does everything" → customer hears "does nothing well."
- **Ages 14-50 is everyone, which is no one.** 14-year-olds don't have $425. Tinkerers can buy raw parts cheaper. Parents want polished STEM kits.
- **Kickstarter fatigue for modular hardware** — Phonebloks, Project Ara, Blocks Smartwatch all died.

**Recommendations**:
- **Lead with ONE use case**: ambient art / information display. "A wall that thinks."
- **Target**: tech-forward adults 25-40 who own smart home devices + maker tools (2-4M in US).
- **Beachhead**: 0.1-0.5% = 2,000-20,000 units. At $425 = $850K-$8.5M.
- **Reposition as**: "The open-source ambient computer." Drop "Minority Report."
- **Bundle**: Starter ($425) = frame + 2 displays + 1 sensor + brain. Expansion packs $75-150 each.
- **GTM**: Kickstarter → Shopify direct → Adafruit/SparkFun/Pimoroni. NO retail.

**Change first**: Kill nine of ten value props from launch messaging. Lead with one.

---

## Education / STEM Expert

**Strengths**: Persistent artifact (not disposable like most STEM kits). ESP32-per-panel teaches SPI, I2C, PWM module by module → systems thinking. Aligned with maker education movement.

**Concerns**:
- **Kit ≠ curriculum.** Schools need NGSS/ISTE/CSTA alignment, lesson plans, assessment rubrics, teacher guides.
- **Age 14 is ambitious** for 4 simultaneous learning curves (mechanical + electrical + firmware + software).
- **No educational infrastructure** compared to micro:bit (millions deployed) or Makeblock (classroom management software).

**Recommendations**:
- QR-coded lesson per module following Use-Modify-Create framework.
- Align to CSTA K-12 CS Standards and NGSS Engineering Design standards.
- Build a teacher dashboard.
- Partner with one makerspace network early (Nation of Makers, Fab Foundation).

**Change first**: Develop three structured lesson plans before launching. Ship with starter kit.

---

## Creative Technologist / Interaction Designer

**Strengths**: Input-output capture loop is the most differentiated proposition — genuinely new at this price point. Mixed display surface creates something no single device can replicate. Depth camera + wall display is underexplored (Microsoft's RoomAlive/Illumiroom never shipped consumer).

**Concerns**:
- **"Standing in front of a wall" UX is unresolved.** Touch requires walking to wall. Voice has latency. Phone defeats purpose. Gesture is unreliable.
- **Consumer depth camera mocap is noisy** — gap between "mocap studio" expectation and reality is dangerous.
- **Sketch digitization is a solved problem** (Wacom, iPad) — dilutes the novel aspects.

**Recommendations**:
- **Three-zone interaction model**:
  - Far field (8+ ft): Ambient mode, mmWave adjusts content passively
  - Mid field (3-8 ft): Gesture + voice + body tracking activates
  - Near field (0-3 ft): Touch + camera + handheld controller
- **ONE magical demo**: Stand in front, depth camera captures silhouette, AI generates stylized avatar in real-time on LED matrix. Technically achievable with $50 depth camera + ESP32 + LED matrix. Photographs spectacularly. Social media shareable.
- **Add generative mode**: AI art evolves throughout day, responding to sensor data.

**Change first**: Define the three-zone interaction model before finalizing module list. Interaction model should drive module selection, not vice versa.

---

## Manufacturing / Supply Chain Expert

**Strengths**: Commodity components (ESP32: $3-5, extrusion: $2-4/m, LEDs: $0.08/ea). Multi-source, stable supply. Open hardware lets community source alternatives. No injection molding tooling needed pre-5K units.

**Concerns**:
- **ESP32-S3 is single-sourced** (Espressif/TSMC 40nm). Lead times stretched to 20-40 weeks in 2023-2024. Order 4-6 months before ship.
- **"3D print your own" creates quality variance.** Bambu X1C user gets perfect corners; Ender 3 user gets garbage. Support tickets will reflect worst printers.
- **User assembly failure math**: 5% connection failure rate × 20 connections = 64% probability of at least one fault per build. Unacceptable.
- **Mixed display sourcing**: 6+ display technologies = 6+ vendors = operational complexity at startup volumes.
- **Acrylic cutting at low volume**: $5-15/panel from Ponoko/SendCutSend.

**Recommendations**:
- Pre-assemble electrical modules as sealed, tested units. Users do mechanical assembly only.
- Offer pre-cut extrusion + pre-printed corners in starter kit. Charge $30-50 premium. STLs for customizers.
- Starter kit: TWO display types only (LCD + LED matrix). AMOLED, e-ink, transparent OLED, holo fan as expansion.
- 100-unit pilot run before Kickstarter. Measure assembly time, failure rate, NPS.
- Maintain 90-day ESP32-S3 buffer inventory ($20K for 1,000 kits).

**Change first**: Pre-assemble every electrical module as a sealed, tested unit. Eliminate user-facing electrical assembly entirely.
