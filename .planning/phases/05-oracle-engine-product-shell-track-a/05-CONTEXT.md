# Phase 5: Oracle Engine — Product Shell - Context

**Gathered:** 2026-03-29
**Status:** Ready for planning
**Source:** Derived from ROADMAP, CLAUDE.md, PROJECT_BIBLE.md

<domain>
## Phase Boundary

Transform the Phase 4 voice AI prototype into a standalone product. Add local LLM fallback (Ollama), swappable deity personality protocols (config files, not reflashing), RAG knowledge queries, OTA firmware updates, and WiFi provisioning. The same electronics must fit inside multiple form factors.

</domain>

<decisions>
## Implementation Decisions

### Local LLM Fallback (from roadmap)
- Ollama running on home server (Smithers) as fallback when cloud (Anthropic API) unavailable
- LLM Router at :8100 already supports multiple models — add Ollama endpoint
- Quantized models: qwen2.5-coder, deepseek-r1, llama3.2 already installed locally

### Swappable Protocols (from user vision)
- Deity personality = JSON config file (system prompt, voice_id, color palette, knowledge scope)
- Already have 21 deity configs at services/orb-backend/gods/*.json
- Swap protocol = download new config via WiFi, no reflash needed
- Backend serves available protocols via API endpoint

### RAG Knowledge (from PROJECT_BIBLE)
- ChromaDB already has 15,645 chunks indexed
- 138 written myth stories available for RAG
- Backend RAG at services/orb-backend/rag.py already works

### OTA Updates (from CLAUDE.md)
- ESP32-S3 supports OTA via ArduinoOTA or HTTP update
- Serve firmware binaries from orb-backend

### WiFi Provisioning
- BLE or captive portal for initial WiFi setup
- ESP32-S3 supports both natively

### Form Factor (from user vision)
- Same PCB/electronics, different enclosures
- Target: desk crystal + stuffed animal as two demo form factors
- Enclosure design is mechanical, not code

</decisions>

<canonical_refs>
## Canonical References

- `services/orb-backend/server.py` — Backend with WebSocket + SSE
- `services/orb-backend/sphere_ws.py` — WebSocket voice pipeline (from Phase 4)
- `services/orb-backend/gods/*.json` — 21 deity personality configs
- `services/orb-backend/rag.py` — ChromaDB RAG
- `CLAUDE.md` — Tech stack, ESP32 details
- `/Volumes/Extreme Pro/ACTIVE/pantheon-training-data/PROJECT_BIBLE.md` — Master reference

</canonical_refs>

<deferred>
## Deferred

- Wake word detection (v2)
- Animation marketplace for custom content (v2)
- Personal RAG from user's Obsidian vault (v2)

</deferred>

---
*Phase: 05-oracle-engine-product-shell-track-a*
*Context gathered: 2026-03-29*
