# Phase 1: Pipeline Audit + Oracle Backend - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Verify the Sacred Circuits pipeline to identify what works, what's broken, and what's missing. Then stand up a new orb-backend FastAPI service at :8300 that provides the shared AI reading pipeline for both Oracle Cards (web/SSE) and Spirit Sphere (WebSocket). This phase delivers working infrastructure, not user-facing features.

</domain>

<decisions>
## Implementation Decisions

### Audit Scope
- **D-01:** Targeted audit (1-2 days). Check what's running, what's broken, what connects to what. Map the 5 services (Smithers :8200, LLM Router :8100, OpenClaw :18789, SC pipeline :5173, Ollama :11434) + Content DB + ElevenLabs voices. Document gaps with severity ratings.
- **D-02:** SC pipeline at localhost:5173 is currently NOT running. Audit must determine if it can be revived or needs replacement.
- **D-03:** Audit output is a single markdown document listing every gap with severity (critical/moderate/minor) and whether it blocks Oracle Cards.

### Backend Identity
- **D-04:** New standalone FastAPI service at :8300 (orb-backend). NOT an extension of Smithers. Clean separation: Smithers stays as orchestrator, orb-backend handles all reading-specific logic.
- **D-05:** orb-backend will have two protocol adapters: REST+SSE for web (Oracle Cards), WebSocket for hardware (Spirit Sphere). Both share the same reading pipeline internally.
- **D-06:** orb-backend consumes existing services: Smithers for LLM routing, Pinecone for RAG, ElevenLabs for TTS, Content DB for imagery.

### Deity Configuration System
- **D-07:** Individual JSON files per god: `gods/zeus.json`, `gods/athena.json`, etc. Each file contains: personality prompt template, ElevenLabs voice ID, PANTHEON art references, mythology keywords, reading style parameters.
- **D-08:** Adding or modifying a deity is a config file change, not a code change. No database needed for 21 entries.

### Reading Pipeline Flow
- **D-09:** Streaming chain (mandatory, per research): User intent -> Pinecone RAG context retrieval -> Claude LLM streaming with sentence detection -> ElevenLabs TTS per sentence -> SSE/WebSocket to client. Progressive delivery, target <1s to first audio byte.
- **D-10:** No batch-then-stream. Sequential buffering creates 2-4s dead air that kills the magic (per pitfalls research).
- **D-11:** ElevenLabs Flash v2.5 via WebSocket streaming for TTS (75ms model latency confirmed by research).

### Claude's Discretion
- FastAPI project structure and module organization
- Error handling and retry logic for external services
- Logging and monitoring approach
- Test strategy for the reading pipeline

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Infrastructure
- `~/services/smithers/` -- Smithers orchestrator service (:8200), has routing + MCP tools
- `~/services/llm-router/` -- LLM Router (:8100), model routing with cost tracking
- `~/repos/Sacred-circuits-automation-/` -- SC automation repo with pipeline code
- `~/.openclaw/workspace/` -- OpenClaw workspace with tools and configs

### Research
- `.planning/research/ARCHITECTURE.md` -- Component boundaries, data flow, build order
- `.planning/research/STACK.md` -- Technology recommendations with versions
- `.planning/research/PITFALLS.md` -- Voice latency, streaming requirements
- `.planning/research/SUMMARY.md` -- Executive summary with phase implications

### Project
- `.planning/PROJECT.md` -- Project context, constraints, key decisions
- `.planning/REQUIREMENTS.md` -- INFRA-01 through INFRA-05 define this phase's requirements

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Smithers (:8200) has working MCP tools (smithers_route, smithers_execute) and health endpoint
- LLM Router (:8100) has model routing with cost tracking, council mode
- Content DB exists with 6,252 SC images + 2,891 Midjourney searchable by god name
- ElevenLabs deity voice profiles already configured
- Pinecone vectors for RAG already populated with SC content

### Established Patterns
- Python services (Smithers, LLM Router) use FastAPI pattern
- Smithers has cost_tracker.py, context_store.py, executor.py -- similar patterns needed for orb-backend
- Services managed via launchd (com.claw.smithers)

### Integration Points
- orb-backend (:8300) will call Smithers (:8200) for LLM routing
- orb-backend will call LLM Router (:8100) directly for model selection
- orb-backend will call Pinecone for RAG context
- orb-backend will call ElevenLabs WebSocket API for streaming TTS
- Content DB access method needs discovery during audit

</code_context>

<specifics>
## Specific Ideas

- User confirmed: Cards + phone app trigger stories FIRST, Spirit Sphere "snow globe with LEDs" comes later. This is the established product sequence.
- The "80% built" claim for SC pipeline needs verification -- SC at :5173 is currently down.
- McKee storytelling principles must be baked into the reading prompt templates from the start (not retrofitted later).

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope

</deferred>

---

*Phase: 01-pipeline-audit-oracle-backend*
*Context gathered: 2026-03-28*
