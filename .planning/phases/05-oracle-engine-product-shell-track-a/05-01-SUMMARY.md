---
phase: 05-oracle-engine-product-shell-track-a
plan: 01
subsystem: api
tags: [ollama, rag, websocket, fastapi, llm-fallback, protocol-swap]

requires:
  - phase: 04-oracle-engine-hardware-fundamentals-track-a
    provides: "WebSocket sphere handler, pipeline.py, rag.py, deity_config.py"
provides:
  - "Ollama LLM fallback (three-tier: Anthropic -> LLM Router -> Ollama)"
  - "REST API for mythology RAG queries (POST /api/rag/query, GET /api/rag/status)"
  - "Swappable deity protocol API (GET /api/protocols, GET /api/protocols/{id}, POST /api/protocols/reload)"
  - "WebSocket hot-swap protocol (swap_protocol message type)"
affects: [05-02, 05-03, 06-pov-globe-prototype-track-b]

tech-stack:
  added: [ollama-integration]
  patterns: [cascading-llm-fallback, hot-swap-websocket-protocol, rag-source-abstraction]

key-files:
  created: []
  modified:
    - services/orb-backend/pipeline.py
    - services/orb-backend/server.py
    - services/orb-backend/sphere_ws.py
    - services/orb-backend/models.py
    - services/orb-backend/rag.py
    - services/orb-backend/deity_config.py

key-decisions:
  - "Cascading LLM fallback (not toggle): Anthropic -> LLM Router -> Ollama, automatic failover"
  - "rag_source() abstraction returns 'chromadb' or 'keywords' without exposing internals"
  - "Protocol API reuses existing deity config infrastructure (gods/ JSON files are the protocols)"

patterns-established:
  - "Three-tier LLM fallback: try cloud streaming, then cloud full, then local Ollama"
  - "Hot-swap WebSocket protocol: swap_protocol message changes deity without reconnection"
  - "Protocol = deity config: no separate protocol format, gods/*.json is the single source of truth"

requirements-completed: [ENGINE-01, ENGINE-02, ENGINE-03]

duration: 3min
completed: 2026-03-29
---

# Phase 5 Plan 1: Oracle Engine Intelligence Layer Summary

**Three-tier LLM fallback (Anthropic/Router/Ollama), swappable deity protocol API with 21 protocols, and RAG mythology query endpoint**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-29T03:18:22Z
- **Completed:** 2026-03-29T03:21:39Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Pipeline falls back to local Ollama when Anthropic API is unreachable (streaming and full modes)
- 21 deity protocols listable, downloadable, and hot-swappable via REST API and WebSocket
- RAG mythology context queryable via dedicated POST endpoint with source tracking
- Health endpoint reports Ollama reachability and RAG backend type

## Task Commits

Each task was committed atomically:

1. **Task 1: Ollama LLM fallback + RAG query endpoint** - `69c9ef1` (feat)
2. **Task 2: Swappable protocol API + WebSocket hot-swap** - `75e07bd` (feat)

## Files Created/Modified
- `services/orb-backend/pipeline.py` - Three-tier LLM fallback with _ollama_stream(), check_ollama()
- `services/orb-backend/server.py` - Protocol endpoints, RAG endpoints, Ollama health in lifespan
- `services/orb-backend/sphere_ws.py` - swap_protocol WebSocket message handler
- `services/orb-backend/models.py` - ProtocolInfo, ProtocolListResponse, RagQuery*, RagStatus* models
- `services/orb-backend/rag.py` - rag_source() function for backend type detection
- `services/orb-backend/deity_config.py` - get_protocol_ids() for sorted deity ID list

## Decisions Made
- Cascading fallback (not config toggle) -- Anthropic errors automatically cascade to Ollama
- rag_source() abstraction hides ChromaDB vs keywords implementation detail from API consumers
- Protocol API maps directly to existing gods/ JSON configs -- no separate protocol schema needed

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - Ollama is optional (fallback only activates when cloud is down). No new env vars required beyond existing OLLAMA_URL and OLLAMA_MODEL defaults.

## Known Stubs
None - all endpoints are fully wired to existing data sources.

## Next Phase Readiness
- Protocol swap and Ollama fallback ready for firmware integration (Phase 5 Plan 2/3)
- RAG endpoint available for oracle web app consumption
- POV globe (Phase 6) can use protocol API for deity switching

## Self-Check: PASSED

All 6 modified files exist. Both commit hashes (69c9ef1, 75e07bd) verified in git log. SUMMARY.md created.

---
*Phase: 05-oracle-engine-product-shell-track-a*
*Completed: 2026-03-29*
