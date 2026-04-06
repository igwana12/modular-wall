# Modular Wall — Higgsfield Video Campaign

**Date**: 2026-04-06
**Platform**: [Higgsfield AI](https://higgsfield.ai/)
**Tools**: Cinema Studio, Click to Ad, Seedance 2.0
**Format**: 9:16 vertical (TikTok/Reels/Shorts) + 16:9 horizontal (YouTube/web)

---

## Prompt Architecture (Three-Layer System)

Higgsfield uses a **layered prompt system** — NEVER mix these layers:

### Layer 1: Keyframe/Image Prompt (Popcorn)
Controls: framing, lighting, lens, environment. This locks the visual base.
```
- [Shot type]: Medium close-up / Wide / Extreme close-up
- [Camera angle]: Eye level / Low angle / High angle
- [Lighting]: Soft directional from [direction], [quality]
- [Environment]: [Setting], [background]
- [Lens]: 50mm / 35mm / 85mm, depth of field, grain
- [Mood]: Premium / Tense / Warm / Technical
```

### Layer 2: Identity/Product Prompt (Seedream)
Controls: product appearance, surface, materials. NO camera moves here.

### Layer 3: Video/Motion Prompt (Seedance/Veo/Kling)
Controls: motion, camera movement, animation. NO lighting changes here.
```
"Subject [initial state] for first second, then [action].
Camera performs [specific move] at [angle].
[Camera quality]: handheld / stabilized / tripod.
End mood: [descriptor]."
```

### Critical Rules
- **NEVER** put camera movement in identity prompts
- **NEVER** put lighting in video prompts (causes flicker)
- One camera move per clip (stacking degrades quality)
- Use specific verbs: dolly, orbit, handheld — NOT "cinematic" or "dynamic"
- Reference filmmakers for style: Roger Deakins, Denis Villeneuve
- Adjust ONE variable at a time when iterating

### Camera Commands That Work
| Command | Effect |
|---------|--------|
| Slow dolly in | Gradual cinematic approach |
| Orbit | Camera circles subject |
| Handheld shake | Natural tension |
| Crash zoom | Sudden dramatic push |
| Arc left/right | Sweeping reveal |
| Bullet time | Frozen-moment rotation |
| 3D rotation | Full product rotation |
| Exploded view | Components separate in space |

### Models to Choose
| Model | Best For |
|-------|----------|
| **WAN 2.6** | Multi-shot continuity |
| **Seedance 2.0** | Motion from keyframes |
| **Kling 2.6** | Dialogue/performance |
| **Veo 3.1** | Realism/lighting |
| **Popcorn** | Keyframe generation |
| **Recast** | Character replacement |

### Workflow
1. Render key frames in Blender → export as PNGs
2. Upload to Higgsfield as input images (Layer 1)
3. Write motion prompt (Layer 3) — one camera move per clip
4. Generate 5-12 second clips
5. Iterate: adjust ONE variable, regenerate
6. Edit clips together for longer sequences
7. Add voiceover, SFX, music in post

---

## CATEGORY 1: PRODUCT SPEC VIDEOS (5-12 seconds each)

### Video 1: "The Module" — Hero Product Shot
```
Prompt: A sleek, minimal dark matte electronic module with a glowing blue 2.8-inch LCD screen recessed into its front face, sitting on a matte black surface. The module is rectangular, approximately the size of a smartphone, with rounded corners and a thin 3mm bezel around the screen. Small gold pogo pin connectors visible on the edges. Dramatic side lighting, shallow depth of field, slow 180-degree orbit around the object. Dark moody studio lighting with teal accent. Product photography aesthetic, 8K detail.
```

### Video 2: "Snap Together" — Magnetic Connection
```
Prompt: Close-up macro shot of two dark matte electronic modules being brought together side by side. As they approach, neodymium magnets snap them together with a satisfying click. Gold pogo pin connectors align perfectly. A subtle teal LED glow pulses through the seam where they connect. Extreme close-up, rack focus from connector to full module. Studio lighting, shallow depth of field. Satisfying ASMR product video aesthetic.
```

### Video 3: "The Wall" — Full Installation
```
Prompt: A modern living room wall with a grid of 12 modular electronic panels of varying sizes. Some panels display colorful screens, some glow with ambient teal and amber light, one shows a holographic rotating earth globe, another displays a clock. The wall transitions from morning mode (warm sunrise colors) to evening mode (cool blue ambient). Slow push-in camera move toward the wall. Warm interior lighting, golden hour feel. Smart home lifestyle photography.
```

### Video 4: "Inside the Module" — Transparent View
```
Prompt: An exploded view of a modular electronic brick floating in dark space. The transparent smoke-tinted acrylic shell separates from the green PCB circuit board, which separates from the LCD screen, which separates from the aluminum frame rails. Each layer floats apart revealing internal components — ESP32 chip, LED strips glowing teal, gold pogo pins, neodymium magnets. Slow rotation, dramatic lighting from below. Technical product visualization, dark background, cinematic.
```

### Video 5: "Magnetic Snap" — Wall Mount
```
Prompt: A hand places a glowing electronic module onto a dark metal wall surface. The module snaps into place magnetically with a satisfying click. The screen immediately lights up showing a weather widget. Camera follows the hand placing a second module next to the first — it snaps on and displays a clock. Then a third — ambient light panel that glows warm amber. Building a wall one module at a time. Close-up, tracking shot. Warm interior lighting.
```

---

## CATEGORY 2: COMMERCIALS (12-30 seconds each)

### Commercial 1: "Your Desktop, On Your Wall" (15 sec)
```
SHOT 1 (0-3s): Close-up of a person's hand swiping endlessly on a smartphone, doomscrolling. Frustrated expression reflected in the glass. Blue phone light on face. Dark room.

SHOT 2 (3-6s): The same person looks up from their phone at a bare wall. Camera pans to the empty wall. Moment of decision.

SHOT 3 (6-10s): Time-lapse of modules being placed on the wall one by one — screens, light panels, speakers, a clock, a pixel art display. The wall comes alive with color and light.

SHOT 4 (10-13s): Wide shot — the person stands in front of their completed wall, arms crossed, smiling. The wall displays their day: calendar, music visualizer, weather, a cooking video. The phone sits face-down on the table, forgotten.

SHOT 5 (13-15s): Text overlay: "Your desktop. On your wall. [Product Name]"
```

### Commercial 2: "Apps Escape the Phone" (12 sec)
```
SHOT 1 (0-3s): A smartphone screen showing app icons (clock, weather, music, camera). The icons begin to shake and glow.

SHOT 2 (3-6s): The app icons float out of the phone screen as glowing 3D cubes, rising into the air.

SHOT 3 (6-9s): The floating cubes fly across the room and land on a wall, each becoming a physical module — the clock icon becomes a real clock module, the music icon becomes a speaker module, the weather icon becomes a screen showing weather.

SHOT 4 (9-12s): Camera pulls back to reveal the full modular wall, alive and glowing. Text: "Software ate the world. AI is giving it back."
```

### Commercial 3: "Father & Daughter Build" (30 sec)
```
SHOT 1 (0-5s): A father and his ~12-year-old daughter sit at a table. Between them: aluminum rods, 3D-printed corner pieces, a small screen module, and tools. They're building something together, laughing.

SHOT 2 (5-10s): Close-up of the daughter snapping an aluminum rod into a 3D-printed corner piece. Satisfying click. She holds up the completed frame proudly.

SHOT 3 (10-15s): The father slides the CYD screen module into the frame. It lights up with a blue glow. The daughter's eyes light up.

SHOT 4 (15-20s): They walk to the wall together. The daughter places the module on the magnetic wall. It snaps on. The screen shows "Hello, Maya!" with a pixel art smiley face.

SHOT 5 (20-25s): Time-lapse: over days, more modules appear on the wall. The daughter adds a pixel art panel, a glow module, a small speaker. The wall grows.

SHOT 6 (25-30s): Wide shot of the daughter's bedroom. The wall glows with her personal creation — art, a clock, ambient light, a small screen showing her favorite YouTuber. She sits on her bed, looking at what she built. Text: "Build the wall. Build the future. [Product Name]"
```

### Commercial 4: "The Morning" (15 sec)
```
SHOT 1 (0-3s): Dark bedroom, 6:30 AM. A wall of modules is completely dark except for a dim red clock showing 6:30.

SHOT 2 (3-6s): The glow modules slowly warm up — shifting from dark to warm amber to soft white, simulating sunrise. The room gradually fills with warm light.

SHOT 3 (6-9s): A screen module activates showing the day's weather and first calendar event. A speaker module softly plays a morning briefing voice. "Good morning. You have three meetings today. It's 22 degrees and sunny."

SHOT 4 (9-12s): The person sits up in bed, glancing at the wall. Everything they need for the day is right there — calendar, weather, news headlines on an e-ink panel, a cooking video playing a breakfast recipe.

SHOT 5 (12-15s): Text overlay: "Your wall wakes up before you do."
```

---

## CATEGORY 3: ASSEMBLY / USER MANUAL VIDEOS (15-30 sec each)

### Assembly 1: "Unboxing — What's in the Starter Kit"
```
Prompt: Top-down shot of a clean white table. Hands open a matte black box with [Product Name] logo. Items are placed one by one in a grid: aluminum rods (silver), 3D-printed corner pieces (dark gray), a CYD screen module (green PCB with screen), LED strip (coiled), neodymium magnets (silver discs), smoke acrylic panel, pogo pin connectors, USB-C cable. Each item placed precisely with a soft click sound. Overhead camera, stop-motion feel, warm studio lighting. ASMR unboxing aesthetic.
```

### Assembly 2: "Building the Frame"
```
Prompt: Close-up of hands assembling a small rectangular frame. Step 1: A 3D-printed dark gray corner piece is placed on the table. Step 2: An aluminum rod slides into the corner piece with a satisfying click. Step 3: Another corner piece goes on the other end. Step 4: Four rods and four corners form a complete rectangle. The frame is held up to camera. Clean macro photography, white background, step-by-step.
```

### Assembly 3: "Inserting the Screen"
```
Prompt: Close-up of hands sliding a green PCB (CYD ESP32 display module) into the assembled aluminum frame. The board slots in perfectly. Then a smoke-tinted acrylic front panel slides over the top — the screen is now recessed behind the acrylic, visible but protected. Fingers press down and the panel clicks into place. The screen powers on with a blue glow. Extreme close-up, white background, product assembly video.
```

### Assembly 4: "Mounting on the Wall"
```
Prompt: A person holds a completed module — dark matte rectangle with glowing blue screen. They approach a wall covered with a thin metal sheet (painted matte black). The module is placed against the wall — neodymium magnets snap it into place with a satisfying thud. The screen stays lit. A second module is placed next to it — magnets align, edge connectors engage, the second screen lights up. Building a wall one module at a time. Medium shot, warm interior lighting.
```

### Assembly 5: "Connecting Power"
```
Prompt: Extreme close-up of the back of a module being placed on the magnetic wall. As it makes contact, gold pogo pins press against contact pads on the wall plate. A tiny LED indicator on the module changes from red to green — power connected. The screen on the front activates. No cables. No plugs. Just magnetic contact. Macro photography, shallow depth of field, dramatic side lighting.
```

---

## PRODUCTION NOTES

### Visual Style Guide
- **Primary colors**: Dark matte black/gray (modules), teal/cyan (LED accents), warm amber (ambient glow)
- **Secondary**: Gold (pogo pins, brass accents), green (PCB), smoke gray (acrylic)
- **Lighting**: Dramatic side lighting for product shots, warm interior for lifestyle, dark studio for hero shots
- **Camera**: Slow orbits, push-ins, macro close-ups. No fast cuts. Let the product breathe.
- **Sound**: ASMR-style clicks and snaps for assembly. Ambient electronic music for lifestyle. Clean voiceover for specs.

### Models to Use on Higgsfield
- **Seedance 2.0**: Best for image-to-video (use Blender renders as input frames)
- **Kling 2.1**: Good for cinematic motion
- **Veo 3.1**: Best for realism and lighting
- **Click to Ad**: When we have a product page URL, auto-generate social ads

### Workflow
1. Render key frames in Blender (we have the 4 style models)
2. Use Blender renders as input images for Higgsfield
3. Generate 5-12 second clips
4. Edit together in sequence for longer commercials
5. Add voiceover, sound effects, music in post

### Campaign Phases
1. **Phase 1 — Teaser**: Product hero shots (Videos 1-5) → social media
2. **Phase 2 — Story**: Commercials 1-4 → YouTube/TikTok/Instagram
3. **Phase 3 — Education**: Assembly videos 1-5 → YouTube/website
4. **Phase 4 — Community**: User-generated build videos → reshare

---

## Higgsfield Reference Links

- [Cinema Studio](https://higgsfield.ai/create/video)
- [Click to Ad Generator](https://higgsfield.ai/app/link-to-video-ad)
- [Prompt Guide for Cinematic Videos](https://higgsfield.ai/blog/Prompt-Guide-to-Cinematic-AI-Videos)
- [How to Create on Higgsfield](https://higgsfield.ai/blog/AI-Video-Generator-How-to-Create-on-Higgsfield)
- [Seedance 2.0](https://higgsfield.ai/seedance/2.0)
- [Commercial Video Features](https://higgsfield.ai/commercial)
- [Segmind Prompt Guide](https://blog.segmind.com/higgsfield-ai-prompt-guide-video-creation/)
