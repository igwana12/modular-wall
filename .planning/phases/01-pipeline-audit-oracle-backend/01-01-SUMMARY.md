---
phase: 01-pipeline-audit-oracle-backend
plan: 01
subsystem: infra
tags: [fastapi, python, deity-config, content-db, elevenlabs, mckee, audit]

# Dependency graph
requires: []
provides:
  - SC-PIPELINE-AUDIT.md with gap analysis of all Sacred Circuits infrastructure
  - orb-backend FastAPI service at :8300 with deity config and content endpoints
  - 21 deity JSON configs with McKee-infused system prompts and voice mappings
  - Content DB query layer for images_catalog.json with graceful drive handling
affects: [01-02-PLAN, phase-02, phase-03]

# Tech tracking
tech-stack:
  added: [fastapi 0.135.1, uvicorn 0.41.0, sse-starlette 3.3.3, httpx 0.28.1, elevenlabs, anthropic, python-dotenv 1.0.1]
  patterns: [flat-module FastAPI service, deity JSON config system, content catalog query, launchd service management]

key-files:
  created:
    - services/orb-backend/server.py
    - services/orb-backend/models.py
    - services/orb-backend/deity_config.py
    - services/orb-backend/content_db.py
    - services/orb-backend/requirements.txt
    - services/orb-backend/start.sh
    - services/orb-backend/gods/*.json (21 files)
    - Library/LaunchAgents/com.claw.orb-backend.plist
    - .planning/phases/01-pipeline-audit-oracle-backend/SC-PIPELINE-AUDIT.md
  modified: []

key-decisions:
  - "ChromaDB for Phase 1 RAG (Pinecone not configured, ChromaDB has 15,645 chunks ready)"
  - "Map 5 project voices + 7 premade voices across 21 gods for Phase 1 (deity-specific voices deferred to Phase 2)"
  - "SC pipeline (:5173/:8000) not needed for Oracle Cards -- mythology data extracted, pipeline itself ignored"
  - "External drive images served with graceful degradation (available=false when unmounted)"

patterns-established:
  - "Deity JSON config: one file per god in gods/ directory, no code changes to add a deity"
  - "Content DB: load catalog at startup, filter by deity tag, check drive mount status"
  - "Service health check: lifespan startup verifies downstream services, reports degraded status"

requirements-completed: [INFRA-01, INFRA-02, INFRA-04]

# Metrics
duration: 10min
completed: 2026-03-28
---

# Phase 01 Plan 01: Pipeline Audit + Oracle Backend Summary

**SC infrastructure audit revealing 10 gaps with severity ratings, plus running orb-backend at :8300 serving 21 McKee-infused deity configs and Content DB image queries**

## Performance

- **Duration:** 10 min
- **Started:** 2026-03-28T06:25:14Z
- **Completed:** 2026-03-28T06:35:08Z
- **Tasks:** 2
- **Files modified:** 30

## Accomplishments
- Comprehensive SC pipeline audit: 5 services checked, 10 gaps documented with severity and Oracle Cards impact
- orb-backend running at :8300 with /health, /api/deities, /api/deities/{id}, /api/content/{id} endpoints
- 21 deity JSON configs with rich McKee storytelling system prompts, voice ID mappings, color palettes, and mythology keywords
- Content DB endpoint querying 7,104 images by deity tag with graceful external drive handling
- ElevenLabs voice inventory: 39 voices mapped across 21 gods using 5 project + 7 premade voices

## Task Commits

Each task was committed atomically:

1. **Task 1: SC Pipeline Infrastructure Audit** - `a0437bf` (feat)
2. **Task 2: Scaffold orb-backend with Deity Config and Content DB** - `90b4755` (feat)

## Files Created/Modified
- `.planning/phases/01-pipeline-audit-oracle-backend/SC-PIPELINE-AUDIT.md` - Full infrastructure audit with gap table
- `services/orb-backend/server.py` - FastAPI app with health, deity, content, and placeholder endpoints
- `services/orb-backend/models.py` - Pydantic models (DeityInfo, ContentImage, HealthResponse, ReadingRequest)
- `services/orb-backend/deity_config.py` - Load/cache deity JSON configs from gods/ directory
- `services/orb-backend/content_db.py` - Query images catalog by deity with drive mount detection
- `services/orb-backend/requirements.txt` - Pinned Python dependencies (42 packages)
- `services/orb-backend/start.sh` - Uvicorn startup script
- `services/orb-backend/gods/*.json` - 21 deity configuration files
- `Library/LaunchAgents/com.claw.orb-backend.plist` - Launchd service for auto-restart

## Decisions Made
- **ChromaDB over Pinecone for Phase 1 RAG:** No PINECONE_API_KEY found anywhere. ChromaDB has 176MB / 15,645 chunks of mythology-relevant content already indexed. Zero cost, zero setup.
- **Voice mapping strategy:** 5 project voices (2501, AI Goddess, Theos, Gaia, Foxy) + 7 premade voices (George, Harry, Lily, Adam, Bill, Callum, Matilda) cover all 21 gods. Deity-specific voice creation deferred to Phase 2.
- **SC pipeline verdict:** DOWN and NOT needed for Oracle Cards. Its content generation functions (Substack/TikTok) are irrelevant to the reading pipeline. Mythology data (correlations, colors, keywords) extracted into deity JSON configs.
- **Content DB serving model:** Serve catalog JSON via API, mark images available/unavailable based on drive mount. CDN/caching deferred.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all services responded as expected, all dependencies installed cleanly.

## Known Stubs

- `GET /api/oracle/read/{deity_id}` returns 501 "Not implemented" -- intentional placeholder for Plan 01-02
- `WS /ws/sphere` is a stub WebSocket endpoint -- intentional placeholder for Spirit Sphere phase

Both stubs are documented and scheduled for implementation in subsequent plans.

## User Setup Required

None - no external service configuration required. API keys copied from existing Smithers .env.

## Next Phase Readiness
- orb-backend is running and ready for Plan 01-02 to implement the streaming reading pipeline
- All 21 deity configs loaded with system prompts ready for LLM calls
- Content DB queryable by deity name
- LLM Router (:8100) and Smithers (:8200) confirmed healthy and ready for integration
- ChromaDB available for RAG context retrieval

## Self-Check: PASSED

All files verified present. All commits verified in git log. Service confirmed running at :8300.

---
*Phase: 01-pipeline-audit-oracle-backend*
*Completed: 2026-03-28*
