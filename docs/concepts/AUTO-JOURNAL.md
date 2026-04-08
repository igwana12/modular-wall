# Auto Journal — Life Memory Compiler

**Date**: 2026-04-06
**Status**: Concept
**Type**: Software plugin / service module (not a physical module)

---

## The Idea

A software layer that runs on the Hub and automatically compiles your digital life into **periodic memory journals** — weekly, monthly, quarterly, yearly. It watches what you pay attention to across all your devices and feeds, and creates multimedia memory capsules that play back on the wall.

**Tagline**: "The wall remembers what you lived."

---

## What It Watches (Data Sources)

### Content Consumption
- **Photos**: Apple Photos, Google Photos — which photos you viewed, favorited, shared
- **Music**: Spotify, Apple Music — listening history, top tracks, mood patterns
- **Video**: YouTube watch history, Netflix/streaming — what held your attention
- **Social**: Twitter/X likes, Instagram saves, Reddit upvotes — what resonated
- **News**: RSS feeds, newsletters — topics you followed

### Creative Output
- **Notes**: Obsidian vault activity — what you wrote, linked, revisited
- **Projects**: GitHub commits, file activity — what you built
- **Documents**: Google Docs, Notion — what you drafted, edited, shared
- **Messages**: Slack channels, key conversations — who you talked to about what

### Life Context
- **Calendar**: Events attended, people met, places visited
- **Health**: Steps, sleep, heart rate trends from wearables
- **Location**: Places visited (opt-in), travel patterns
- **Weather**: What the weather was like (ambient context)
- **Finance**: Major purchases, savings milestones (opt-in)

---

## What It Produces

### Weekly Digest
- 5-minute slideshow on Screen modules
- Top songs of the week playing on Voice/Speaker modules
- Key photos cycling on displays
- Glow modules shift to the "mood color" of the week
- "This week you wrote 3 notes about X, listened to Y 12 times, and spent the most time on Z"

### Monthly Memory
- 15-minute multimedia journal
- Photo montage with soundtrack (auto-selected from your top listens)
- Key quotes from your notes/tweets highlighted on eInk module
- People you interacted with most
- Projects that got the most attention
- Health trends visualized on Screen-M

### Quarterly Review
- Interactive wall experience — all modules participate
- Holo displays floating key images
- Pixel art visualization of your quarter (abstract data art)
- AI-narrated summary through Voice module (your choice of voice)
- Obsidian graph visualization showing knowledge growth on Screen-L

### Yearly Retrospective
- Full wall takeover — 30-minute experience
- "Your year in review" — like Spotify Wrapped but for your ENTIRE life
- Every module shows a different facet: music, photos, projects, health, people
- AI generates a narrative thread connecting your year's themes
- Exportable as video/PDF keepsake

---

## How It Works Technically

### Data Collection (Always Running on Hub)
```
[Hub / Orange Pi 5+]
    ├── Obsidian Vault Watcher (inotify on vault directory)
    ├── Spotify API poller (every 30 min)
    ├── Apple Health sync (daily)
    ├── Photo library indexer (weekly scan)
    ├── Calendar API sync (daily)
    ├── Twitter/X API (likes, bookmarks — daily)
    ├── GitHub API (commits, repos — daily)
    └── RSS/Newsletter parser (on arrival)
```

### Processing (Weekly on Hub)
```
[Raw Data] → [AI Summarizer (Claude/local LLM)] → [Memory Entry]
    ├── Key themes extracted
    ├── Sentiment/mood detected
    ├── People mentioned/tagged
    ├── Photos ranked by AI (composition, faces, emotion)
    ├── Music clustered by mood/energy
    └── Knowledge graph updated (Obsidian links)
```

### Storage
- **Obsidian vault**: Each journal entry is a markdown file with frontmatter
- **Local SQLite**: Indexed metadata for fast retrieval
- **Media cache**: Thumbnails and audio clips cached on Hub SSD
- **No cloud dependency** — everything local, everything yours

### Playback (On Demand or Scheduled)
- "Wall, show me last month" → triggers Monthly Memory scene
- Scheduled: Every Sunday evening at 8pm, Weekly Digest auto-plays
- Birthday mode: On your birthday, wall plays your Year in Review
- Nostalgia mode: Random memory from 1/3/5 years ago

---

## Wall Module Integration

| Module | Role in Auto Journal |
|--------|---------------------|
| **Screen-S/M** | Photo slideshows, data visualizations, calendar recaps |
| **Pixel** | Abstract data art — your week as pixel art (colors = mood, height = activity) |
| **Glow** | Ambient mood color shifts matching the period's emotional tone |
| **Voice** | AI-narrated summary, soundtrack playback |
| **Speaker-S** | Background music from your top listens that period |
| **eInk** | Key quotes, mantras, or insights that appeared in your notes |
| **Holo** | Floating key photos or 3D data visualizations |
| **Round** | Circular timeline/gauge showing progress on goals |
| **Mirror** | "Then vs now" face comparison (time-lapse selfie over months) |
| **Sense** | Detects when you're standing in front → auto-starts playback |

---

## Privacy Architecture

- **100% local processing** — no data leaves your house
- **No cloud sync** — Hub processes everything on-device
- **Encrypted storage** — AES-256 on local SSD
- **Selective sources** — user chooses which APIs to connect (opt-in per source)
- **Deletion** — delete any memory entry anytime, truly gone
- **Export** — export journal entries as encrypted archive to external drive

---

## Education Pathway

### Lesson: "Build Your Own Life Logger"
**Learn**: How personal data pipelines work — APIs, aggregation, AI summarization
**Build**: Connect Spotify API + Obsidian watcher + photo indexer, generate weekly digest
**Industry**: Quantified self, personal analytics (Spotify Wrapped, Apple Year in Review, Google Photos memories)
**Skills**: REST APIs, data aggregation, NLP summarization, multimedia composition

---

## Sacred Circuits Crossover

- **Mythology framing**: Each quarterly review is narrated by a different deity
  - Spring = Persephone (rebirth, new projects started)
  - Summer = Apollo (peak energy, creative output)
  - Autumn = Demeter (harvest, what bore fruit)
  - Winter = Hades (reflection, what ended, what lies dormant)
- **Oracle integration**: The wall's memory + Oracle Cards = personalized mythology readings grounded in your actual life data

---

## Relationship to Existing Wall Software

This is a **plugin for the Wall Controller Agent** — not a separate product:
```
Wall Controller Agent (FastAPI)
    ├── Module Discovery Plugin
    ├── Scene Manager Plugin
    ├── Content Router Plugin
    └── Auto Journal Plugin  ← THIS
        ├── Data Collectors (per-source)
        ├── AI Summarizer
        ├── Journal Composer
        └── Playback Scheduler
```

---

*"The wall doesn't just display the present. It remembers your past and reflects it back — curated by AI, composed as art, yours forever."*
