# Globe 2.0 — Original Treatment

**Source**: Niko's original treatment document (Globe 🌎 2.0.html)
**Status**: Concept with patent synopsis
**Connection**: Standalone product AND potential module for the Modular Wall

---

## Elevator Pitch

Not too long ago, the bedside table used to be occupied by a globe of the world in many young children's homes. Not only did it teach geography to young minds and one's place in the world, but also served as a soothing night light. This unique tool has been disrupted by Google Maps and globes are harder to find these days.

With the globe's slow extinction something profound is also in danger of being lost. This very simple object made a counterintuitive truth evident and easily understood. To all who were lucky enough to grow up with one or interact with one at school, the fact that the Earth is actually round and not flat, was made accessible, digestible, and intuitively understood through this scaled representation of the earth.

Something that had been a mystery up until only 500 years ago, and the reason that this counterintuitive fact was difficult to understand and took Humanity such a long time to figure out is because of the massive difference in scale between us humans and the planet.

Due to that difference in scale, it's very hard for us to fathom the curvature of the Earth. By reducing its size and making it a bedside table lamp, the counterintuitive truth becomes commonsensical, intuitive, and allows children to shape an understanding of the world with a planetary perspective.

**Our inability to comprehend our civilization's collective impact on the environment via climate change, and on the natural world and the ecosystems, is driven by a very similar problem of scale and our perception of time.**

Our inability to appreciate our collective impact over decades and centuries can only now be visualized.

We have been monitoring the Earth from outer space and have massive datasets accumulated over 40-50 years. A lot of these datasets are in the public domain.

---

## The Product

Globe 2.0 is a spherical display made out of plastic (ideally recycled from the sea) about the size of a basketball. Inside, a pico-laser projector projects content aggregated from NASA, ESA, etc. onto the surface of the sphere. The sphere would stand on an Alexa Puck-shaped base, in which a small Raspberry Pi with WiFi and Bluetooth connectivity would allow it to connect to the internet. The content on the globe could be controlled via an app on a smartphone or tablet.

Libraries of content would be packaged, formatted, and updated on the app regularly, and various nature documentaries could be woven into the interactive experience with Globe 2.0.

---

## The Thesis

Just as the initial globe demystified the shape of the earth and our place on it, Globe 2.0 will attempt to intuitively shape our consciousness and sensitize all of us to the planet's interconnectivity.

Globe 2.0 becomes a display that can transmit all kinds of data. Documentaries about the natural world, or urbanization, are integrated into the physical object.

---

## Content Examples

- A year of CO2 emissions (time-lapse)
- Interactive dataset controlled through the app (Google-sourced)
- 120 years of global warming data
- Human population growth through time
- Educational datasets that could be licensed
- Global warming data visualization
- Urban sprawl and depletion of natural resources
- Polar icecap melting time-lapse
- Pop-up windows with additional data and video documentaries
- Companion app as second screen for associated content

---

## Business Potential

- Potential acquisition target for Amazon, Google, or Apple as a smart home object
- Could become the physical interface for Alexa, Google Voice, Apple Home
- Target price: $200-300 (basketball/small size)
- Scalable for universities, classrooms, and public venues

---

## Technical Direction (2026 Update)

**The 2018 projection/mirror approach is DEPRECATED.** The laser projector + concave mirror + frosted sphere design was innovative but fragile, expensive, and had fundamental focus distance constraints.

**New primary direction: LED surface globe.** Options include:
1. **Flexible LED matrix** (WS2812B / SK6812 on flexible PCB) bent/mounted onto a spherical frame — silent, no moving parts, addressable pixels
2. **POV globe** (existing firmware at `/Users/claw2501/firmware/pov-globe/`) — spinning APA102 LEDs create volumetric display. Already prototyped. Trade-off: noise + mechanical complexity.
3. **Spherical LED display products** — commercial spherical LED displays may now exist at consumer-accessible prices (research needed)
4. **Projection** — retained as a secondary/fallback option, not primary

The LED approach is more reliable, wall-mountable, silent, and aligns with the modular wall's construction philosophy (ESP32-driven addressable LEDs).

---

## Original Patent Synopsis (2018 — Historical Reference)

> *Note: This approach has been superseded by the LED surface direction above. Retained for historical context.*

Globe 2.0 is a WiFi and Bluetooth enabled interactive spherical display. It operates by using 2 lasers or LED pico projectors to stitch video and other specifically tailored content on the interior of a 10" diameter frosted plastic sphere.

### Three Main Components:
1. **The Base**: Small processor, WiFi, Bluetooth, power supply, board connecting to projectors
2. **The Sphere**: Frosted 14" diameter white opaque plastic sphere
3. **The Projection Module**: Centered on top of the base inside the sphere — projectors + concave mirrors reflecting projection onto the interior of the opaque sphere

### Technical Approach:
- 2 projection feeds stitched on the interior seamlessly using concave mirrors
- Software ensures projections on exterior are high resolution, in focus, and accurate
- Uses pico laser projectors (differentiator from competitors)

---

## Why Physical, Not VR/AR?

Ever since Google Maps/Earth was created, the analog tool of a bedside globe went extinct. It was a signature educational tool in the room of every young child which explained a counterintuitive truth — that the earth is round and not flat. This counterintuitive truth is not evident due to a difference in the scale of the human body and the size of the earth, thus making our sensory perception render the earth flat.

The same is true with climate change and human impact on the biosphere. It is again a matter of scale. Due to our perception of time and our inability to appreciate our collective impact on the planet, we are unable to realize that we are transforming it at exponential speed. It is not a coincidence that scientists have baptized this geological era: Anthropocene.

**The idea of a physical Globe 2.0 living in the room of every child in the world, and subconsciously reminding us of the scale and accelerated speed of our collective impact, is the reason a physical globe is better than an AR or VR version.**

---

## Engineering History (2018 WhatsApp Thread)

Source: `Globe 🌎 2.0.html` — WhatsApp group chat with Giorgos (giorgos@2monochannels.com) and collaborators, March 2018.

### Projection Configurations Explored
- **A**: Projection stem inside sphere, 1/3 of the way in
- **B**: Projection stem in center with 4 pico projectors on a tetrahedron
- **C**: Projection at the base of the sphere (RECOMMENDED — maximizes throw ratio, reduces mechanical complexity)
- **Triangle stem**: 3 projectors
- **Square stem**: 4 projectors on sides or corners

### Key Engineering Decisions
- **Laser projectors preferred over DLP** — 20,000h lifespan vs 2,000h for bulb-based
- **LaserBeam Pro C200** identified as candidate projector (~$200 on eBay)
- **Bottom-base projection** selected — maximizes throw ratio up to sphere diameter, reduces projector count, more robust than stem designs
- **Sphere sourcing**: Frosted acrylic hemispheres from China (Alibaba), joined to make full sphere. Athens vendor quoted €240 (too expensive), China preferred.
- **Target sphere diameter**: 60-65cm for prototype
- **Mirrors**: DuraVision first-surface convex mirrors (NZ company with EU reps — Bohle UK, Securikey, Convex Mirror Shop UK)
- **Focus challenge**: Projectors don't focus closer than 15cm — constrains minimum sphere diameter
- **TI DLP chipsets** researched ($38-58 per unit at volume on Alibaba)

### Collaborator
- **Giorgos** (giorgos@2monochannels.com) — Athens-based, handled optics engineering, mirror sourcing, sphere procurement

## Competitive Landscape (from treatment)

- Several similar projects exist but none use pico laser projectors
- Gakken World Eye (Japan): similar concept but lower resolution, only covers half the sphere
- Open-source projects exist but none connect to apps

---

## Connection to the Modular Wall

Globe 2.0 is the **perfect embodiment of the wall's thesis**: "As software ate the world, AI is going to throw it back up." Google Maps ate the physical globe. Globe 2.0 gives it back — but now it's alive with 50 years of satellite data, connected to the internet, and controlled by AI.

Globe 2.0 can exist as:
1. **Standalone product** — bedside/desk object, $200-300
2. **Wall module** — mounted on the modular wall frame, integrated with surrounding panels that show related data (CO2 charts on an LCD, documentary clips on a video panel, temperature trends on an e-ink display)
3. **Both** — detachable from the wall, usable independently

---

## Cross-References

- [[ENHANCED-BRIEF]] — Modular Wall master document
- [[Chapter-07-Tulum-Zero-Equals-One]] — First Waver / Special Generation concept
- [[TR-01-Dionysian-Apollonian]] — Analog-to-digital philosophical framework
- [[VISION]] — Original modular wall vision
- [[FULL_SPEC_v2]] — Spirit Sphere / POV Globe technical spec (related hardware)
