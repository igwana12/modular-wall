# mosAIc — Project Context

**Name**: mosAIc (lowercase m, capital AI)
**Type**: Modular AI-orchestrated wall computer — open hardware, proprietary software
**Stage**: Virtual product development (no physical prototypes yet)

## Tech Stack
- **Module compute**: ESP32-S3 ($4-6 per module)
- **Hub**: Orange Pi 5+ / RPi 5 / Jetson Orin Nano
- **Frame**: MakerBeamXL 15mm aluminum + 3D-printed PETG corners
- **Connectivity**: Magnetic pogo pins (4-pin: 5V, GND, CAN_H, CAN_L)
- **Communication**: Home WiFi + CAN Bus + ESP-NOW
- **Software**: FastAPI (Wall Controller), Next.js (Configurator/Website)
- **3D Modeling**: Blender (via MCP server)
- **Image Generation**: Nano Banana (Gemini), Blender renders

## Key Files
- Master CSV: `assets/modular-wall-master.csv` (source of truth)
- Component Dimensions: `docs/COMPONENT-DIMENSIONS.md`
- Brand Bible: `docs/BRAND-BIBLE.md`
- Image Generation Reference: `assets/IMAGE-GENERATION-REFERENCE.md`
- Blender models: `assets/blender/modules/`
- Website: `software/configurator/`

## Constraints
- LOCAL EXPERIMENT — no public launches, no registrations
- All dimensions from real datasheets
- Brand: mosAIc (never [MODULAR], never Mosaic)
- Colors: Teal #00D4AA, Amber #FFB347, Dark #0D0D1A
