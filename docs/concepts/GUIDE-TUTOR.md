# The Guide — AI Tutor That Lives On Your Wall

**Date**: 2026-04-06
**Status**: Concept — core to onboarding and retention
**Type**: Software layer + first-install experience

---

## The Idea

The first thing you install on your first Screen module is **The Guide** — an AI tutor with a face, a voice, and a personality. Think Zeus from the Pantheon rendered on a 2.8" screen, teaching you how to build with AI, expand your wall, and understand the technology behind every module.

The Guide is your **Smithers for the wall** — part teacher, part troubleshooter, part advisor, part salesperson.

**Tagline**: "Your wall's first voice."

---

## What The Guide Does

### Phase 1: First Boot (Day 1)
You snap your first Screen-S module on the wall. It powers up. The Guide appears:

> *"Welcome to mosAIc. I'm your Guide. I'll teach you how to build, expand, and understand your wall. Let's start with what you have."*

The Guide walks you through:
1. **What just happened** — how the module connected (pogo pins, CAN Bus, WiFi)
2. **What you're looking at** — the screen, the display framework, the weather widget
3. **Your first customization** — change the widget, adjust the glow color, set your location
4. **The fundamentals** — what's an ESP32, what's WiFi, what's an API

### Phase 2: Learning (Week 1-4)
The Guide becomes your AI tutor for IoT/AI fundamentals:

| Lesson | What You Learn | What You Build |
|--------|---------------|----------------|
| **Terminology** | ESP32, GPIO, I2C, SPI, WiFi, BLE, API, JSON, MQTT | Glossary that appears on your eInk module |
| **How APIs work** | REST, endpoints, JSON responses, authentication | Pull weather from OpenWeather API, display on screen |
| **How LEDs work** | Addressable LEDs, color spaces, PWM, animation | Program a Glow module to shift colors |
| **How sensors work** | mmWave, PIR, temperature, humidity | Read presence data from Sense module |
| **How audio works** | I2S, DAC, speakers, microphones | Play a sound through Voice module |
| **How AI works** | Models, inference, prompts, local vs cloud | Ask your wall a question, get an answer |

### Phase 3: Building (Month 1-3)
The Guide teaches you to **vibe code** — build things with AI assistance:

- **"I want my wall to show my Spotify now-playing"** → Guide walks you through the Spotify API, OAuth, and display rendering
- **"I want it to glow red when CO2 is high"** → Guide connects Sense-Air to Glow via a simple rule
- **"I want to build a face filter"** → Guide walks you through MediaPipe, the Mirror module camera, and real-time rendering

### Phase 4: Expanding (Ongoing)
The Guide becomes your **expansion advisor** — proactively suggesting new modules based on your usage:

> *"I notice you check the weather every morning and listen to music while you work. Have you considered adding a Speaker-S module? It would give you spatial audio from the wall, and I can sync it with your Spotify visualizer on the Pixel module."*

> *"You've been using the Voice module a lot for commands. The Ring controller would let you gesture at modules instead of speaking — and it teaches you about IMU sensors and BLE."*

> *"Your wall has been running for 3 months. Want me to compile your first Quarterly Review? I'll need about 10 minutes to gather your data."*

### Phase 5: Mastery (Month 6+)
The Guide evolves from teacher to collaborator:

- **Troubleshooting**: "Module 7 is showing CAN Bus errors. Let me diagnose — looks like a loose pogo pin connection. Try re-seating it."
- **Optimization**: "Your Glow modules are drawing 12W total. I can reduce that to 8W by adjusting the brightness curve — you won't notice the difference."
- **Community**: "A user in the Gallery posted a wall configuration similar to yours but with a depth camera. Want to see it?"
- **Advanced projects**: "Ready to build your own module from scratch? Let's design a custom PCB in KiCad."

---

## The Guide's Personality

### Appearance Options
The Guide has a FACE — rendered on the Screen module. Users choose their Guide persona:

| Persona | Visual | Voice | Personality |
|---------|--------|-------|-------------|
| **Zeus** | Pantheon Zeus render — golden beard, lightning crown | Authoritative, deep | Direct, commanding, expects greatness |
| **Athena** | Pantheon Athena render — helmet, owl, wise eyes | Clear, measured | Strategic, methodical, praises clever solutions |
| **Hermes** | Pantheon Hermes render — winged hat, quick smile | Quick, energetic | Fast-paced, playful, loves shortcuts and hacks |
| **Custom** | User's own avatar or AI-generated face | User-selected TTS voice | User-defined personality prompt |
| **Minimal** | No face — just text and voice | Neutral TTS | Facts only, no personality |

### Sacred Circuits Integration
The Pantheon personas ARE the Guide. The 318 mythology entities from the master CSV become potential Guide personalities. Each deity brings their domain expertise:

- **Hephaestus** (god of craftsmanship): Best for hardware lessons, building, materials
- **Apollo** (god of light and music): Best for LED programming, audio, creative projects
- **Athena** (goddess of wisdom): Best for strategy, architecture, system design
- **Hermes** (messenger god): Best for networking, APIs, communication protocols
- **Prometheus** (fire-bringer): Best for first-time builders, "stealing fire from the gods" = learning to code

---

## Technical Architecture

### On the Screen Module
```
[Screen-S Module — ESP32]
    ├── Guide UI (LVGL)
    │   ├── Face renderer (animated avatar, 30fps)
    │   ├── Text bubble (lesson content, tips)
    │   ├── Progress indicator (lesson X of Y)
    │   └── Quick actions (next lesson, ask question, skip)
    ├── Voice output (to Voice module via CAN Bus)
    └── Guide API client (to Hub)
```

### On the Hub
```
[Hub — Orange Pi / RPi]
    ├── Guide Engine (Python)
    │   ├── Lesson curriculum (structured content)
    │   ├── User progress tracker (SQLite)
    │   ├── Usage analyzer (what modules are used, how often)
    │   ├── Expansion recommender (suggests next modules)
    │   ├── Troubleshooter (diagnose common issues)
    │   └── LLM interface (Claude API or local Ollama for freeform Q&A)
    ├── Avatar renderer (generates face frames for Screen)
    └── TTS engine (ElevenLabs API or local Piper TTS)
```

### LLM Options for The Guide
| Tier | Model | Cost | Capability |
|------|-------|------|-----------|
| Free | Ollama (qwen2.5-coder, llama3.2) | $0 | Basic Q&A, code help |
| Cheap | Gemini Flash, GPT-4o-mini | ~$0.01/session | Good tutoring, troubleshooting |
| Balanced | Claude Sonnet, GPT-4o | ~$0.05/session | Excellent teaching, nuanced advice |
| Premium | Claude Opus | ~$0.50/session | Best possible tutoring, creative projects |

**Default**: Free tier (Ollama local on Hub Pro/Ultra). Users can upgrade to cloud LLMs for better tutoring quality.

---

## Expansion Recommendation Engine

The Guide doesn't just teach — it sells (gently). Based on usage data:

### Signal → Recommendation Logic
| Signal | Recommendation | Why |
|--------|---------------|-----|
| User checks weather daily | "Add eInk module — always-on weather, zero power" | Natural next step |
| User plays music often | "Speaker-S would give you real audio, not just the tiny exciter" | Quality upgrade |
| User has 5+ modules | "The Ring controller would let you gesture instead of touch" | Convenience upgrade |
| User asks about cameras | "Mirror module: smart mirror + AR + exercise tracking" | Interest match |
| User has kids | "Marble-Track module: your kids will learn physics AND coding" | Family expansion |
| User hit 15 modules | "Your Hub Basic is at capacity. Hub Pro unlocks voice AI + Auto Journal" | Hub upgrade |
| User completed all 6 lessons | "Ready to build a custom module? Here's the PCB design lesson..." | Mastery path |

### Revenue Impact
- The Guide increases **average modules per customer** from 5 to 12+ (projected)
- Expansion recommendations convert at 15-25% (based on Spotify Discover Weekly engagement)
- Hub upgrades driven by Guide at ~10% conversion when capacity signals trigger

---

## The Pantheon Oracle Module

A dedicated module (or software plugin) that combines:

### Oracle Card Integration
- NFC reader on the wall (or in the Ring controller)
- Tap a physical Oracle Card → wall displays that deity's oracle reading
- AI generates a personalized reading based on your life data (Auto Journal) + the deity's domain
- "Zeus says: Your projects are multiplying but your energy is scattered. Focus on one thunderbolt."

### Horoscope / Daily Guidance
- Morning scene includes a brief oracle reading on the Screen module
- Based on your zodiac sign + current life context (from Auto Journal data)
- Deity of the day rotates through the Pantheon
- Voice module speaks the reading in the deity's voice (ElevenLabs)

### How It's Built (Education Lesson)
- **Lesson: Build Your Own Oracle** — connect NFC reader, query LLM with deity persona prompt, display on screen, play TTS audio
- **What you learn**: NFC protocols, prompt engineering, persona design, TTS integration
- **Industry**: Entertainment tech, chatbot design, interactive installations

---

## Education Pathway

### The Guide teaches you to build The Guide itself

The meta-lesson: once you've learned enough from The Guide, it teaches you how IT was built:

1. **Lesson 7**: How The Guide renders an avatar on a 2.8" screen (LVGL, frame buffers)
2. **Lesson 8**: How The Guide talks (TTS engines, I2S audio, voice synthesis)
3. **Lesson 9**: How The Guide thinks (LLM integration, prompt engineering, context management)
4. **Lesson 10**: How The Guide recommends (usage analytics, recommendation algorithms)
5. **Lesson 11**: Build your own Guide persona (custom avatar, custom voice, custom personality)
6. **Lesson 12**: Publish your Guide persona to the community marketplace

**The student becomes the teacher. The Guide teaches you to replace it with your own creation.**

---

---

## Beyond the Wall — Learning to Create with AI

The Guide doesn't just teach you about the wall. It teaches you a **methodology for learning anything with AI**. The wall is the medium, but the skill is universal.

### The Vibe Coding Philosophy

The Guide teaches the new creative process:

1. **Describe what you want** — in plain language, to an AI
2. **Get a first draft** — AI generates code/design/content instantly
3. **Iterate by conversation** — "make it warmer", "add a fade", "that's too bright"
4. **Understand what happened** — the Guide explains WHY the code works
5. **Modify it yourself** — now you know enough to tweak directly
6. **Combine and remix** — take pieces from different projects, mash them together
7. **Ship it** — the wall displays your creation. It's real. It works.

This is how you learn in the AI era. Not textbooks → exams. **Describe → generate → understand → modify → ship.**

### The Learning Stack

The Guide teaches these skills in order, each building on the last:

| Level | Skill | Wall Application | Universal Application |
|-------|-------|-----------------|----------------------|
| 1 | **Terminology** | Learn what ESP32, GPIO, WiFi mean | Know the vocabulary of any field in 30 minutes |
| 2 | **Prompt engineering** | Ask AI to generate a weather widget | Write prompts that get results in any domain |
| 3 | **Reading code you didn't write** | Understand the weather widget AI generated | Read any codebase, any documentation, any paper |
| 4 | **Data structures** | JSON from APIs, CSV from sensors | Understand how information is organized anywhere |
| 5 | **APIs and integration** | Connect Spotify to your wall | Connect any service to any other service |
| 6 | **Rapid prototyping** | Build a new module feature in an hour | Build MVPs of any idea in a day |
| 7 | **Debugging with AI** | "Why isn't my LED animation smooth?" | Diagnose problems by describing symptoms |
| 8 | **Deep dives** | Understand CAN Bus protocol deeply when needed | Go deep on any topic by asking AI to teach you layer by layer |
| 9 | **Building assets** | Train a LoRA on your art style for wall content | Build reusable resources (datasets, models, templates) |
| 10 | **Teaching others** | Create your own Guide persona, share your wall | Document your knowledge, mentor others, build community |

### Key Insight: Depth on Demand

The Guide doesn't force you to learn everything. It teaches you **just enough** to accomplish what you want, then offers to go deeper:

> *"Your LED animation is running at 15fps because you're using delay() in the loop. That blocks the CPU. Want me to explain why, or just fix it?"*

If you say "fix it" → it fixes it and you keep building.
If you say "explain" → it teaches you about non-blocking timers, millis(), and the event loop.

**Both paths are valid.** The wall works either way. But the knowledge compounds — each "explain" moment makes the next project faster.

### Building Your Knowledge Base

The Guide helps you build **your own reference library** as you learn:

- **Obsidian notes**: Every lesson generates a markdown note synced to your Obsidian vault
- **Code snippets**: Working examples saved to your personal library
- **Troubleshooting log**: Every bug you hit and how it was solved
- **Component reference**: What you've used, what worked, what didn't
- **Project journal**: Auto Journal captures your build process over time

After 6 months, you don't just have a wall — you have a **personal knowledge base** about IoT, AI, and creative computing that no course could teach.

### The Meta-Skill

The most valuable thing the Guide teaches isn't any specific technology. It's the meta-skill:

**How to learn something you know nothing about, quickly, using AI as your partner.**

A 14-year-old who learns this on the mosAIc wall can apply it to:
- Learning a new programming language in a weekend
- Understanding a scientific paper in an afternoon
- Building a prototype of any idea in a day
- Teaching themselves music theory, architecture, game design, robotics

The wall is the training ground. The skill is permanent.

---

*"The Guide doesn't just show you how to build a wall. It shows you how to build the thing that shows you how to build a wall. And then it lets you teach someone else."*
