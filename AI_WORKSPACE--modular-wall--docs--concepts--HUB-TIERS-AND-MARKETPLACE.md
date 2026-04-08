# Hub Tiers & Module Marketplace

**Date**: 2026-04-06
**Status**: Concept — core to business model

---

## Hub Tiers — Choose Your Brain

The Hub is the only module with tiered options. Users pick the brain that matches their ambition — and can upgrade later without replacing anything else.

### Hub Basic — "The Starter" ($49)

| Spec | Detail |
|------|--------|
| **Board** | Raspberry Pi 5 8GB |
| **CPU** | 4-core Cortex-A76 @ 2.4 GHz |
| **RAM** | 8 GB |
| **AI Power** | None (CPU only) |
| **Best For** | 1-15 modules, ambient displays, no AI features |
| **Handles** | Scene switching, content routing, web dashboard, OTA updates |
| **Doesn't Handle** | Voice AI, computer vision, Auto Journal, LLM inference |

**Message**: "You want a beautiful wall that shows weather, clock, ambient light, and pixel art? This is all you need."

### Hub Pro — "The Brain" ($109)

| Spec | Detail |
|------|--------|
| **Board** | Orange Pi 5+ 16GB |
| **CPU** | 8-core A76/A55 @ 2.4 GHz |
| **RAM** | 16 GB |
| **AI Power** | 6 TOPS (Rockchip NPU) |
| **Best For** | 10-30 modules, voice commands, basic AI features |
| **Handles** | Everything Basic does + voice activity detection, simple AI routing, Auto Journal, health data aggregation |
| **Doesn't Handle** | Real-time computer vision, depth camera processing, local LLM |

**Message**: "You want your wall to listen, learn your patterns, and compile your life journal? This is the sweet spot."

### Hub Ultra — "The Powerhouse" ($249)

| Spec | Detail |
|------|--------|
| **Board** | NVIDIA Jetson Orin Nano Super |
| **CPU** | 6-core Cortex-A78AE @ 1.5 GHz |
| **RAM** | 8 GB (shared GPU) |
| **AI Power** | 67 TOPS (NVIDIA Ampere GPU) |
| **Best For** | 20-50+ modules, Mirror module, depth camera, full AI |
| **Handles** | Everything Pro does + real-time face mesh, pose estimation, body tracking, local LLM (small models), video processing |
| **Doesn't Handle** | Nothing — this is the ceiling |

**Message**: "You want your wall to see you, track your movement, run AR filters, and think locally? This is for builders who want it all."

---

## Upgrade Path — No Waste

The critical design decision: **upgrading the Hub doesn't require replacing any modules.**

1. User starts with Hub Basic ($49) and 5 modules
2. Six months later, they add a Mirror module and want AR filters
3. They buy Hub Pro ($109), swap it into the same housing, reconnect USB-C
4. All modules auto-reconnect (stored WiFi credentials, CAN Bus re-discovery)
5. Mirror module now works with AI features
6. **The old Hub Basic goes on the marketplace** — someone else starts their journey with it

### What Transfers During Upgrade
- WiFi credentials (stored in Hub EEPROM, migrated via backup/restore script)
- Module layout and scene configurations (exported as JSON, imported to new Hub)
- Auto Journal data (on USB SSD, just plug into new Hub)
- Firmware versions (new Hub re-verifies and updates if needed)

### What the User Does
1. Export config from old Hub (one button in web dashboard)
2. Unplug old Hub USB-C
3. Plug in new Hub USB-C
4. Import config (one button)
5. Done — 5 minutes

---

## Module Marketplace — "The Wall Exchange"

### The Vision

A community marketplace where users buy, sell, and trade modules. This creates:
- **Lower barrier to entry** — buy used modules at 50-70% retail
- **Upgrade path without waste** — sell what you outgrow, buy what you need
- **Community lock-in** — the more people in the ecosystem, the more liquid the market
- **Sustainability story** — modules don't go to landfill, they get reused

### How It Works

#### Listing a Module
1. Open web dashboard → Marketplace → "Sell a Module"
2. Remove module from wall → Hub marks it as "deactivated"
3. Module's serial number, type, firmware version, and health data auto-populate the listing
4. User sets price (marketplace suggests based on type, age, condition)
5. User adds photos (or uses the stock product image)
6. Listed on the marketplace

#### Module Health Score
Every module tracks its own health via ESP32:
- **Power cycles** — how many times it's been turned on/off
- **Uptime hours** — total hours active
- **Error count** — CAN Bus errors, WiFi disconnects, sensor failures
- **Firmware version** — is it current?
- **Temperature history** — has it ever overheated?

This data generates a **Health Score (0-100)** displayed on the listing:
- 90-100: Like new
- 70-89: Good condition
- 50-69: Fair — works fine, shows wear
- Below 50: Parts only

#### Buyer Experience
1. Browse by module type, price, health score, location
2. Purchase (Stripe payment through the marketplace)
3. Seller ships module (or local pickup)
4. Buyer snaps module onto their wall
5. Hub discovers it, updates firmware if needed
6. **Instant compatibility** — every module works with every Hub tier

#### Revenue Model
- **10% marketplace fee** on each sale
- **Free listing** — no cost to list
- **Verified seller badge** — for users with 5+ successful sales
- **Certified refurbished program** — we buy back, test, reflash, resell at 80% retail with warranty

### Pricing Guide (Used Market)

| Module | Retail New | Expected Used (6mo) | Expected Used (1yr) |
|--------|-----------|--------------------|--------------------|
| Screen-S | $79 | $50-60 | $40-50 |
| Glow | $49 | $30-40 | $25-30 |
| Pixel | $59 | $40-45 | $30-40 |
| Voice | $39 | $25-30 | $20-25 |
| Sense | $29 | $18-22 | $15-18 |
| Hub Basic | $49 | $30-35 | $20-30 |
| Hub Pro | $109 | $70-85 | $55-70 |
| Round | $69 | $45-55 | $35-45 |
| Mirror | $129 | $85-100 | $65-85 |
| Holo | $99 | $65-75 | $50-65 |

### Community Features

#### Module Swap Meet
- Users post "Want to Trade" listings
- "I have 3 Glow modules, looking for 1 Pixel" → matched with someone doing the opposite
- No money changes hands — pure swap

#### Wall Gallery
- Users share photos/screenshots of their wall configurations
- Upvote system — best walls get featured
- "Copy This Wall" button — auto-generates a shopping cart with all the modules in that config

#### Build Challenges
- Monthly challenges: "Best 5-module wall under $200"
- Community votes on winners
- Winner gets a free module or Hub upgrade

#### Starter Pack Exchange
- Graduating users (outgrew their starter kit) can donate/sell to new users
- "Pay it forward" program — subsidized starter kits from donated modules

---

## Website Integration — The Onboarding Flow

When a new user arrives at the website:

### Step 1: Choose Your Hub
```
"How smart do you want your wall to be?"

[Hub Basic - $49]           [Hub Pro - $109]          [Hub Ultra - $249]
"Display & ambient"         "Voice & learning"         "Vision & AI"
✓ Weather, clock, art       ✓ Everything Basic +       ✓ Everything Pro +
✓ Ambient lighting          ✓ Voice commands           ✓ AR face filters
✓ Pixel art & info          ✓ Auto Journal             ✓ Exercise tracking
✓ 15 modules max            ✓ Pattern learning         ✓ Body tracking
                            ✓ 30 modules max           ✓ Local AI inference
                                                       ✓ 50+ modules

        "You can upgrade anytime. Your modules stay."
```

### Step 2: Choose Your Modules
(The configurator already handles this — drag and drop onto the grid)

### Step 3: Check the Marketplace
```
"Save up to 40% with verified pre-owned modules"

[Browse Marketplace]  or  [Buy New]

Featured: "Starter Kit (used, 92/100 health) — $89" (vs $185 new)
```

---

## Education Pathway

### Lesson: "Build a Marketplace"
**Learn**: How two-sided marketplaces work — listings, transactions, trust, fees
**Build**: Simple marketplace page where users can list and browse modules
**Industry**: E-commerce (eBay, Etsy, StockX, Facebook Marketplace)
**Skills**: Database design, payment integration, trust/reputation systems, search/filter

---

## Sacred Circuits Crossover

- **Named modules**: Users can name their modules ("Zeus" the Screen-S, "Athena" the Mirror)
- **Module lineage**: Track which walls a module has been part of — its "odyssey"
- **Mythological marketplace**: Trades framed as "offerings" — "I offer my Glow to the community"
- **Seasonal markets**: Themed around Greek calendar (Anthesteria = spring swap meet)

---

*"The wall is never done — it grows, evolves, and its modules find new homes. Every module has a story, and the marketplace is where those stories continue."*
