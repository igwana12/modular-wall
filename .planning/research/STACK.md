# Technology Stack

**Project:** The Orb (Oracle Cards + Spirit Sphere)
**Researched:** 2026-03-28

## Product A: Oracle Cards (Web Experience)

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js | 15.x (App Router) | Web app framework | SSR for SEO on landing pages, App Router for the reading experience, Vercel deployment for zero-config edge CDN. Already the dominant React meta-framework in 2026. | HIGH |
| React | 19.x | UI library | Ships with Next.js 15. Server Components reduce client bundle for the reading experience page. | HIGH |
| TypeScript | 5.x | Type safety | Non-negotiable for any project in 2026. Catches QR routing bugs at compile time. | HIGH |
| Tailwind CSS | 4.x | Styling | v4 ships inline theming (no config file needed). Paired with shadcn/ui for rapid mobile-first UI. | HIGH |
| shadcn/ui | latest | Component library | Copy-paste components, not a dependency. Full control over oracle card UI without fighting a library. | HIGH |

### PWA / Mobile

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Serwist | latest | Service worker / PWA | The successor to next-pwa (unmaintained). Built on Workbox fork. Official Next.js docs recommend it. Enables "Add to Home Screen" after QR scan. | HIGH |
| next-themes | latest | Dark mode | Oracle readings should feel immersive. Dark mode by default, light optional. Trivial integration. | HIGH |

### QR Code Generation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| qrcode | 1.5.x (npm) | Server-side QR generation | Generates QR codes as SVG/PNG for print-ready card files. Supports error correction levels (use Level H for small cards). | MEDIUM |
| node-qrcode or qrcode.react | latest | Dynamic QR display | For any web-rendered QR codes (sharing, admin panel). | MEDIUM |

### Backend API (Oracle Readings)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| FastAPI (existing) | 0.100+ | Oracle reading API | Already built as part of Sacred Circuits pipeline. Houses LLM routing, RAG queries, reading orchestration. Do NOT rewrite -- extend. | HIGH |
| Next.js API Routes | built-in | BFF layer | Thin proxy between mobile client and FastAPI backend. Handles session tokens, rate limiting, Stripe webhooks. Keep logic minimal here. | HIGH |

### Voice / AI Pipeline (existing infrastructure)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| AssemblyAI Universal-3 Pro | Streaming v3 | STT | ~150ms P50 latency. WebSocket streaming at wss://streaming.assemblyai.com/v3/ws. Promptable in real-time with domain terms. Already in SC pipeline. | HIGH |
| Claude (via LLM Router) | Sonnet/Opus | Oracle reading generation | Existing infrastructure at :8100. Use Sonnet for standard readings, Opus for deep readings. | HIGH |
| ElevenLabs Flash v2.5 | WebSocket API | TTS deity voices | 75ms model latency, 150-300ms time-to-first-chunk. WebSocket endpoint: wss://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream-input. Already have deity voice profiles. | HIGH |
| Pinecone | Serverless | RAG vector search | Already indexed with SC content DB (6,252 images + 2,891 MJ). Extend with mythology corpus for oracle context. | HIGH |

### Payments & Auth

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Stripe | latest SDK | Payments | Tiered access (free sample, paid full readings). Stripe Checkout for one-time, Stripe Billing for subscriptions. | HIGH |
| NextAuth.js (Auth.js) | v5 | Authentication | Lightweight auth for saved readings, reading history. Email magic link (no password friction after QR scan). | MEDIUM |

### Print Design

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Figma | latest | Card layout design | Community templates exist for tarot/oracle card dimensions. Use 2.75" x 4.75" tarot size. Export to PDF for print. | HIGH |
| CMYK PDF export | -- | Print-ready files | 300 DPI, CMYK color mode, 0.125" bleed on all sides. Figma can export print-quality PDFs. | HIGH |

### Deployment

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Vercel | -- | Next.js hosting | Zero-config deployment, edge functions, automatic HTTPS. Free tier covers early validation. | HIGH |
| Cloudflare Tunnels (existing) | -- | Backend proxy | Already routing to Smithers. Add oracle-api tunnel for FastAPI endpoint. | HIGH |

---

## Product B: Spirit Sphere (Hardware + Firmware)

### Microcontroller

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| ESP32-S3-WROOM-1 (N16R8) | -- | Main MCU | 16MB Flash, 8MB PSRAM. Dual-core 240MHz. Native USB, WiFi, BLE. The S3 is the right variant -- S3 has vector instructions for audio processing and more GPIO than S2. N16R8 gives headroom for OTA updates and audio buffering. | HIGH |

### LED Hardware

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| APA102 / SK9822 LED strips | -- | POV display LEDs | **Use APA102 or SK9822, NOT WS2812B.** Critical for POV: APA102 has 20kHz PWM refresh rate vs WS2812B's inadequate refresh. Two-wire SPI protocol (CLK+DAT) is immune to WiFi interrupt timing glitches that corrupt WS2812B data. SK9822 is the budget-friendly clone (4.7kHz PWM, still adequate for 3-5 RPM sphere). | HIGH |
| 144 LEDs/meter density | -- | Resolution | At 36 LEDs per arm (half-sphere arc), 6-8 arms gives 216-288 total LEDs. Mercator project achieved 72x36 resolution with similar config. | MEDIUM |

### LED Software

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| FastLED | 3.7+ | LED control library | Industry standard for addressable LEDs on Arduino. ESP32-S3 I2S DMA driver available (define FASTLED_USES_ESP32S3_I2S). For APA102 uses hardware SPI -- much faster than bit-banging. Set FASTLED_ESP32_I2S_NUM_DMA_BUFFERS=4 for WiFi resilience. | HIGH |

### Audio Hardware

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| INMP441 | -- | I2S MEMS microphone | Digital I2S output, no ADC needed. Standard choice for ESP32 voice projects. Mount on stationary base (not rotating assembly). | HIGH |
| MAX98357A | -- | I2S amplifier | Digital I2S input, drives speaker directly. No analog stage needed. Same I2S bus as mic (different pins). | HIGH |
| 3W 4-ohm speaker | -- | Audio output | Full-range, fits in base enclosure. MAX98357A rated for 3.2W into 4 ohms. | HIGH |

### Audio Codec (Streaming)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Opus codec | 1.4+ (esp-opus component) | Audio compression | Compress mic audio to ~70-80 kbps for cloud upload. 16kHz sample rate, complexity 1 uses ~80% of one core. Fixed-point implementation essential (not floating-point). Available as ESP-IDF component (78/esp-opus v1.0.4). | MEDIUM |
| PCM 16-bit 16kHz | -- | Fallback / simpler path | If Opus is too CPU-heavy alongside LED driving, send raw PCM over WebSocket. Higher bandwidth (~256 kbps) but zero CPU cost. Start here, optimize to Opus later. | HIGH |

### Motor & Mechanical

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| N20 micro gear motor | 3-5V, 3-5 RPM | Sphere rotation | Quiet (<35dB with rubber damping), cheap ($3-5), simple PWM control from ESP32. No encoder needed for POV at this RPM -- use Hall effect sensor for position sync. | MEDIUM |
| US5881LUA Hall effect sensor | -- | Rotation position sync | Detects magnet on rotating assembly once per revolution. Triggers interrupt for LED frame sync. Proven in Mercator project. | MEDIUM |
| 4-wire slip ring | 12.5mm bore | Power + data to rotating LEDs | Minimum 4 wires: VCC, GND, SPI CLK, SPI DATA. Get a 6-wire model for future expansion. Alternative: wireless power via Royer converter (more complex, defer to v2). | MEDIUM |

### Power

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| 3x 18650 Li-ion | 3.7V nominal | Battery power | 3S config = 11.1V nominal. Need buck converter to 5V for LEDs and 3.3V for ESP32. USB-C charging via TP4056-based 3S BMS. | MEDIUM |
| USB-C PD trigger board | -- | Charging + pass-through | Accept 12V PD for charging while running. Pass-through so it works plugged in. | LOW |

### Firmware Development

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Arduino IDE 2.x | latest | Primary IDE | Better ESP32-S3 support than PlatformIO in 2025-2026. PlatformIO's official ESP32 platform is stalled on Arduino Core 2.x; pioarduino fork exists but is fragile (small team). For a first-time hardware builder, Arduino IDE has more tutorials, fewer configuration headaches. | MEDIUM |
| pioarduino (PlatformIO fork) | latest | Alternative IDE | If VS Code workflow is strongly preferred, use pioarduino (community fork supporting Arduino Core 3.x). Configure platform from pioarduino GitHub releases in platformio.ini. Be aware: small maintainer team, may lag official Arduino releases. | LOW |
| Arduino ESP32 Core | 3.x | ESP32-S3 support | Core 3.x is required for latest ESP32-S3 features. Includes ESP-IDF 5.x under the hood. | HIGH |

### Communication (Sphere to Cloud)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| ArduinoWebSockets | latest | WebSocket client | Bidirectional streaming: mic audio up, TTS audio down. Lightweight, works with ESP32 WiFi. | MEDIUM |
| WiFiClientSecure | built-in | TLS | WSS requires TLS. ESP32-S3 has hardware crypto acceleration. Pin certificates or use Let's Encrypt root CA. | HIGH |

### Backend (Sphere-specific)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| orb-backend (FastAPI) | -- | Sphere API at :8300 | New container on Smithers. Handles: WebSocket audio relay, AssemblyAI STT proxy, Claude LLM call, ElevenLabs TTS proxy, Pinecone RAG query. Single WebSocket connection from sphere, backend fans out to services. | HIGH |
| Obsidian vault indexer | -- | Personal RAG | Index user's Obsidian vault into Pinecone namespace. Existing pattern from SC pipeline. | MEDIUM |

---

## Kickstarter Campaign Stack

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js (same app) | -- | Landing page | Same codebase as oracle cards app. /kickstarter route with email capture + $1 reservation deposit. | HIGH |
| Stripe | -- | $1 reservation deposits | 30x higher conversion than email-only. Refundable deposit secures early-bird pricing. | HIGH |
| ConvertKit or Loops | -- | Email sequences | Drip campaign for pre-launch list. ConvertKit is crowdfunding standard. Loops is newer/cheaper. | MEDIUM |
| Discord | -- | Community | VIP backers community. Free, real-time, builds advocacy. Standard for hardware Kickstarter campaigns. | HIGH |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Web framework | Next.js 15 | Astro, SvelteKit | Astro is great for static but oracle readings need SSR + real-time streaming. SvelteKit is excellent but smaller ecosystem for the PWA tooling needed. |
| LED type | APA102/SK9822 | WS2812B | WS2812B refresh rate is too low for POV. Single-wire protocol corrupted by WiFi interrupts on ESP32. Not debatable for this use case. |
| MCU | ESP32-S3 | ESP32-C3, RP2040 | C3 is single-core (can't drive LEDs + WiFi simultaneously). RP2040 has no WiFi (needs separate module, adds complexity for first-time builder). |
| IDE | Arduino IDE 2.x | PlatformIO | PlatformIO ESP32 support is fractured. pioarduino fork works but is maintained by a tiny team. Arduino IDE is battle-tested for ESP32-S3 with Core 3.x. |
| Service worker | Serwist | next-pwa | next-pwa is unmaintained. Serwist is its actively maintained successor, recommended by Next.js official docs. |
| STT | AssemblyAI Universal-3 | Deepgram, Whisper | Already in SC pipeline. Universal-3 Pro has 150ms P50 latency, promptable in real-time. Deepgram is comparable but would require migration. Whisper is not real-time. |
| TTS | ElevenLabs Flash v2.5 | OpenAI TTS, PlayHT | Already have deity voice profiles in ElevenLabs. 75ms model latency is best-in-class. Voice cloning for 21 gods is a unique differentiator. |
| Auth | Auth.js v5 | Clerk, Supabase Auth | Auth.js is free and lightweight. Clerk adds cost. Supabase Auth is good but pulls in Supabase dependency we don't need. |
| Audio codec | PCM (then Opus) | MP3, AAC | MP3/AAC encoding is heavier than Opus on ESP32. Start with raw PCM (simplest), optimize to Opus if bandwidth is an issue. |

---

## Installation

### Oracle Cards Web App

```bash
# Core
npx create-next-app@latest oracle-cards --typescript --tailwind --eslint --app --src-dir

# UI + PWA
npx shadcn@latest init
npm install serwist next-themes
npm install @auth/core @auth/nextjs-adapter
npm install stripe @stripe/stripe-js

# QR + Oracle
npm install qrcode @types/qrcode
npm install ai  # Vercel AI SDK for streaming LLM responses to client

# Dev
npm install -D @serwist/next
```

### Spirit Sphere Firmware

```
Arduino IDE 2.x:
1. Board Manager: esp32 by Espressif (v3.x)
2. Select board: ESP32S3 Dev Module
3. Flash: 16MB, PSRAM: 8MB OPI

Library Manager:
- FastLED (3.7+)
- ArduinoWebSockets
- ArduinoJson (7.x)
- esp-opus (via ESP Component Registry, if using Opus)
```

### Spirit Sphere Backend

```bash
# New container on Smithers
pip install fastapi uvicorn websockets
pip install assemblyai elevenlabs anthropic pinecone-client
```

---

## Sources

- [Mercator ESP32 Spherical POV Display](https://mdwdotla.medium.com/mercator-an-esp32-based-spherical-persistence-of-vision-display-a4beff4f826e) - Reference architecture for POV sphere
- [FastLED ESP32-S3 I2S DMA](https://github.com/FastLED/FastLED/issues/1645) - DMA driver documentation
- [APA102 vs WS2812B for POV](https://www.suntechleds.com/ws2812b-vs-apa102.html) - Refresh rate comparison
- [ESP32-S3 Voice Frontend](https://www.hackster.io/roman-zolotarev/esp32-s3-voice-frontend-that-connects-to-live-ai-models-5fd48b) - Voice AI reference architecture
- [Serwist PWA for Next.js](https://serwist.pages.dev/docs/next/getting-started) - Official docs
- [Next.js PWA Guide](https://nextjs.org/docs/app/guides/progressive-web-apps) - Official Next.js PWA docs
- [ElevenLabs WebSocket Streaming](https://elevenlabs.io/docs/developers/websockets) - Real-time TTS docs
- [AssemblyAI Universal-3 Pro Streaming](https://www.assemblyai.com/blog/introducing-universal-streaming) - Latest STT model
- [ESP-Opus Component](https://components.espressif.com/components/78/esp-opus/versions/1.0.4) - Opus codec for ESP32
- [pioarduino](https://randomnerdtutorials.com/vs-code-pioarduino-ide-esp32/) - PlatformIO fork for ESP32 Core 3.x
- [PCBWay ESP32 POV Display](https://www.pcbway.com/project/shareproject/High_Resolution_POV_Display_using_ESP32_2d12b725.html) - Reference POV project
