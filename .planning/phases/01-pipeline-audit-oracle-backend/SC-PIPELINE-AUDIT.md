# Sacred Circuits Pipeline Audit

## Date: 2026-03-28

## Executive Summary

The Sacred Circuits infrastructure is in solid shape for the backend plumbing (Smithers, LLM Router, OpenClaw all healthy) but has significant gaps in the content serving and voice layers. The SC pipeline at :5173/:8000 is DOWN and running from an external drive path, making it unreliable. ChromaDB has 176MB of RAG data (15,645 chunks) but Pinecone is NOT configured. ElevenLabs has 39 voices available (including 5 project-specific cloned/professional voices), but none are deity-specific. The images catalog has 7,104 items with deity tagging, but 6 of the 21 target gods have zero tagged images. The core reading pipeline (orb-backend) does not exist yet and is the primary deliverable of this phase.

## Service Status

| Service | Port | Status | Notes |
|---------|------|--------|-------|
| Smithers | 8200 | **UP** | `{"status":"ok"}` - Healthy, launchd managed |
| LLM Router | 8100 | **UP** | `{"status":"ok","service":"llm-router"}` - Healthy, launchd managed |
| OpenClaw Gateway | 18789 | **UP** | `{"ok":true,"status":"live"}` - Healthy |
| SC Pipeline (frontend) | 5173 | **DOWN** | No response. Vite dev server not running. |
| SC Pipeline (backend) | 8000 | **DOWN** | Launchd registered (`com.openclaw.sacred-circuits-8000`) but not responding. WorkingDirectory points to `/Volumes/Extreme Pro/ACTIVE/sacred-circuits-pipeline/python_backend` (external drive dependency). |
| Ollama | 11434 | **UP** | 6 models loaded: gpt-oss:20b, dolphin-mistral:7B, llama3.2:3.2B, qwen2.5-coder:32b, deepseek-r1:8b, llama3.2-vision:10.7B |
| orb-backend | 8300 | **MISSING** | Does not exist yet. This plan creates it. |

## Gap Summary

| # | Gap | Severity | Blocks Oracle Cards? | Notes |
|---|-----|----------|---------------------|-------|
| 1 | orb-backend service does not exist | Critical | Yes | Primary deliverable of Plan 01-01 |
| 2 | No deity configuration system | Critical | Yes | Need 21 god JSON configs with prompts, voice IDs, colors |
| 3 | No Content DB serving layer | Critical | Yes | images_catalog.json exists but no API endpoint serves it |
| 4 | No Pinecone index or API key | Moderate | No | ChromaDB (176MB, 15,645 chunks) available as Phase 1 RAG fallback |
| 5 | No deity-specific ElevenLabs voices | Moderate | No | 5 project voices available for Phase 1 mapping; deity voices needed Phase 2 |
| 6 | SC pipeline (:5173/:8000) is DOWN | Minor | No | Its functions (content generation) are NOT needed for Oracle Cards readings |
| 7 | 6 gods have zero tagged images in catalog | Moderate | Partially | Persephone, Hestia, Nike, Pan, Eros, Tyche have 0 images. Readings can work without images. |
| 8 | No streaming SSE endpoint for readings | Critical | Yes | Deliverable of Plan 01-02 |
| 9 | No ElevenLabs TTS integration | Critical | Yes | SDK not installed in any service venv. Deliverable of Plan 01-02 |
| 10 | External drive dependency for images | Moderate | Partially | Images on `/Volumes/Extreme Pro/`. Service must degrade gracefully when unmounted. |

## Content DB Status

- **Total images cataloged:** 7,104
- **Catalog file:** `~/repos/Sacred-circuits-automation-/catalogs/images_catalog.json`
- **External drive mounted:** Yes (`/Volumes/Extreme Pro/sacred-circuits-outputs/`)
- **Serving layer:** MISSING -- needs orb-backend endpoint
- **Collections:** organized (448), midjourney (3,722), Odyssey candidates (1,493), staging/approved (457), animations/frames (673), legacy (186+)

### Images per Deity

| Deity | Count | Status |
|-------|-------|--------|
| Prometheus | 81 | Good |
| Zeus | 48 | Good |
| Apollo | 46 | Good |
| Hera | 28 | Good |
| Hermes | 28 | Good |
| Athena | 20 | Good |
| Artemis | 20 | Good |
| Poseidon | 19 | Good |
| Dionysus | 18 | Good |
| Hephaestus | 15 | Good |
| Demeter | 14 | Good |
| Aphrodite | 13 | Good |
| Ares | 7 | Low |
| Hecate | 6 | Low |
| Hades | 5 | Low |
| Persephone | 0 | **Missing** |
| Hestia | 0 | **Missing** |
| Nike | 0 | **Missing** |
| Pan | 0 | **Missing** |
| Eros | 0 | **Missing** |
| Tyche | 0 | **Missing** |

**Note:** Top non-deity tags include "greek" (390), "sacred" (350), "golden" (341), "moebius" (341) -- many images have thematic but not deity-specific tags. Some images for missing deities may exist under different tag names.

## RAG Status

- **Pinecone:** NOT AVAILABLE -- No `PINECONE_API_KEY` found in any service .env file
- **ChromaDB:** AVAILABLE
  - Location: `~/repos/Sacred-circuits-automation-/chroma_db/`
  - Size: 176MB
  - Collections: 3 (d846..., e786..., e97d...)
  - Content: 15,645 chunks from Obsidian vault (sacred-circuits, book-knowledge content)
- **Recommendation:** Use ChromaDB for Phase 1 RAG. Set up Pinecone as a Phase 2/3 task if scale requires it. ChromaDB is local, zero-cost, and already populated with mythology-relevant content.

## ElevenLabs Voice Status

**API Key:** Found in Smithers .env (sk_a5a2...a98)
**Total voices available:** 39 (21 premade + 8 professional + 5 generated + 5 cloned)

### Project-Specific Voices (usable for deity mapping)

| Voice Name | Voice ID | Category | Suggested Deity Mapping |
|------------|----------|----------|------------------------|
| project 2501 sacred male | UP8se13tCkT2tQESxOoF | cloned | Zeus, Ares, Prometheus (authoritative male) |
| AI goddess Sacred Circuits | YP3kC7LvA34E1Nhk6DWR | cloned | Athena, Hera, Demeter (authoritative female) |
| Theos | n0vzWypeCK1NlWPVwhOc | professional | Apollo, Hermes, Dionysus (philosophical male) |
| Gaia | IzuE4cSiMB3AFM2gOtiE | generated | Persephone, Artemis, Hestia (earth/nature female) |
| Foxy - Futuristic Robotic AGI | w57l537QdET3I3gBAWpV | generated | Hephaestus, Nike (tech/forge voice) |

### Premium Premade Voices (good fallbacks)

| Voice Name | Voice ID | Suggested Deity Mapping |
|------------|----------|------------------------|
| George - Warm Storyteller | JBFqnCBsd6RMkjVDRZzb | Poseidon (deep, captivating) |
| Harry - Fierce Warrior | SOYHLrjzK2X1ezoPC6cr | Hades (fierce, underworld) |
| Lily - Velvety Actress | pFZP5JQG7iQjIQuC4Bku | Aphrodite (sensual, velvety) |
| Adam - Dominant, Firm | pNInz6obpgDQGcFmaJgB | Pan (dominant, firm) |
| Bill - Wise, Mature | pqHfZKP75CvOlQylNhV4 | Hecate (wise, mature) |
| Callum - Husky Trickster | N2lVS1w4EtoT3dr4eOWO | Eros (trickster, playful) |
| Matilda - Professional | XrExE9yKIg1WjnnlVkGX | Tyche (professional, balanced) |

### Greek-Language Professional Voices (bonus)

| Voice Name | Voice ID | Notes |
|------------|----------|-------|
| Christos | PaZ8laODC1yRxHTPYJFh | Greek male |
| Eleni SoulVoice | 1gkXJMvrzBWAwt0XqBaa | Greek female, bilingual |
| Iordanis | CsiIKWiAQRGMe7qh9P9q | Greek male |
| Takis | KDImLuG6RkuyuX5httC7 | Greek male, narrational |
| Chrysa | 4hx4668A4ljDTKS4m5oV | Greek female |

**Missing:** Deity-specific custom voices (21 total needed). Phase 2 task: create distinct voice profiles per god using ElevenLabs voice design or cloning.

## Mythology Data

- **Source files:**
  - `~/repos/Sacred-circuits-automation-/python_backend/api_server.py` lines 72-98: 25 mythology correlations (domain + hook)
  - `~/repos/Sacred-circuits-automation-/python_backend/services/mythology_service.py`: Full MythologyService class with MYTH_CORRELATIONS dict containing name, title, domain, pattern, keywords[], modern_applications, theoi_path, key_phrases[] for each god
  - `~/repos/Sacred-circuits-automation-/python_backend/services/mythology_colors.py`: MYTHOLOGY_COLORS dict with colors[], palette_description, mood for each deity
- **21 Oracle Card gods covered:** Yes -- all 21 target gods have correlation data in mythology_service.py. Zeus through Tyche all have rich keyword and domain data.
- **Additional figures in source data:** Epimetheus, Atlas, Kronos, Argus, Pandora, Icarus, Daedalus, Sisyphus, Orpheus, Nemesis, Thanatos, Hypnos, Cronus -- available for future expansion beyond 21 cards.
- **Keyword data:** Available -- comprehensive keyword lists per deity (10-30 keywords each)
- **Color palettes:** Available -- 3 colors per deity with palette_description and mood

## SC Pipeline (:5173/:8000) Assessment

- **Current state:** DOWN. Both frontend (:5173 Vite) and backend (:8000 FastAPI) are not responding.
- **Launchd service:** `com.openclaw.sacred-circuits-8000` exists but uses `/usr/bin/python3` (system Python) and WorkingDirectory at `/Volumes/Extreme Pro/ACTIVE/sacred-circuits-pipeline/python_backend` (external drive -- fragile).
- **Code location:** `~/repos/Sacred-circuits-automation-/` has the full codebase. The launchd plist points to a different location on the external drive.
- **What it provides:** Content generation pipeline for Substack articles + TikTok scripts. Image generation via Midjourney/CometAPI. Voice synthesis. Video compilation with FFmpeg.
- **Needed for Oracle Cards:** **No.** The SC pipeline is a content CREATION tool (write articles, generate images, produce videos). Oracle Cards need a READING pipeline (take user intent, generate personalized reading, stream response). Different function entirely.
- **Recommendation:** **Ignore for Phase 1.** The SC pipeline's mythology data (correlations, colors, services) should be extracted into orb-backend's deity JSON configs, but the pipeline itself is not needed for oracle readings. Revisit in Phase 3+ if content generation needs arise.

## Infrastructure Dependency Map

```
Oracle Card Reading Flow (what needs to exist):

User -> [QR Code] -> [Web App (Phase 3)]
                          |
                     orb-backend :8300 (THIS PHASE)
                     /    |    \         \
                    /     |     \         \
             Deity    Content   LLM      TTS
             Config   DB        Router   (Phase 2)
             (JSON)   (catalog) :8100    ElevenLabs
                                  |
                              Smithers :8200
                              (orchestrator)
```

## Key Findings

1. **"80% complete" claim verdict:** PARTIALLY TRUE. The mythology data, image catalog, LLM routing, and orchestration are solid (that is the 80%). The missing 20% is: the reading-specific pipeline (orb-backend), streaming delivery (SSE/WebSocket), deity voice integration, and the web frontend. These are the highest-value, most user-facing pieces.

2. **Critical path for Oracle Cards:** orb-backend service -> deity config system -> Content DB API -> reading pipeline (LLM + RAG) -> streaming delivery -> TTS integration -> web frontend.

3. **Quick wins:** Smithers and LLM Router are healthy and ready to serve. ChromaDB has mythology content ready for RAG. Images catalog is tagged and queryable. ElevenLabs API key works with 39 available voices.

4. **Risk areas:** External drive dependency for images, no Pinecone (ChromaDB is adequate fallback), 6 gods with zero images, deity voices not yet created.
