# Phase 1: Pipeline Audit + Oracle Backend - Research

**Researched:** 2026-03-28
**Domain:** FastAPI backend service, streaming AI pipeline (LLM + RAG + TTS), existing infrastructure audit
**Confidence:** HIGH

## Summary

Phase 1 has two distinct workstreams: (1) audit the existing Sacred Circuits infrastructure to understand what works, what is broken, and what is missing, and (2) stand up a new FastAPI service (orb-backend at :8300) that provides the complete AI reading pipeline. The research confirms that most building blocks already exist but are scattered across services and repos that need to be inventoried and wired together.

The existing infrastructure is in better shape than expected for the backend plumbing but worse for the Content DB. Smithers (:8200) and LLM Router (:8100) are healthy and running. The SC pipeline at :5173 is confirmed DOWN (launchd registered as `com.openclaw.sacred-circuits-8000` but not running). ChromaDB has 177MB of embedded content (15,645 chunks from 3,897 files) but this is Obsidian vault content, NOT a Pinecone index. The images catalog has 7,104 items with god-name tagging (Zeus: 66, Apollo: 48, Athena: 29, Poseidon: 19, Aphrodite: 14) but images live on an external drive (`/Volumes/Extreme Pro/sacred-circuits-outputs/`) and have no API serving them. ElevenLabs voice IDs exist for 5 voices in JARVIS (not 21 deity voices yet), and the `elevenlabs` Python package is NOT installed in the system Python or any existing venv. The `pinecone` package is also NOT installed.

**Primary recommendation:** Build orb-backend as a clean FastAPI service in its own venv at `~/services/orb-backend/`, following the exact patterns established by Smithers and LLM Router. The audit should be a structured sweep of the 5 services + Content DB + voice config, producing a gap document. The streaming pipeline is the critical path -- get SSE streaming working end-to-end before anything else.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Targeted audit (1-2 days). Check what's running, what's broken, what connects to what. Map the 5 services (Smithers :8200, LLM Router :8100, OpenClaw :18789, SC pipeline :5173, Ollama :11434) + Content DB + ElevenLabs voices. Document gaps with severity ratings.
- **D-02:** SC pipeline at localhost:5173 is currently NOT running. Audit must determine if it can be revived or needs replacement.
- **D-03:** Audit output is a single markdown document listing every gap with severity (critical/moderate/minor) and whether it blocks Oracle Cards.
- **D-04:** New standalone FastAPI service at :8300 (orb-backend). NOT an extension of Smithers. Clean separation: Smithers stays as orchestrator, orb-backend handles all reading-specific logic.
- **D-05:** orb-backend will have two protocol adapters: REST+SSE for web (Oracle Cards), WebSocket for hardware (Spirit Sphere). Both share the same reading pipeline internally.
- **D-06:** orb-backend consumes existing services: Smithers for LLM routing, Pinecone for RAG, ElevenLabs for TTS, Content DB for imagery.
- **D-07:** Individual JSON files per god: `gods/zeus.json`, `gods/athena.json`, etc. Each file contains: personality prompt template, ElevenLabs voice ID, PANTHEON art references, mythology keywords, reading style parameters.
- **D-08:** Adding or modifying a deity is a config file change, not a code change. No database needed for 21 entries.
- **D-09:** Streaming chain (mandatory): User intent -> Pinecone RAG context retrieval -> Claude LLM streaming with sentence detection -> ElevenLabs TTS per sentence -> SSE/WebSocket to client. Progressive delivery, target <1s to first audio byte.
- **D-10:** No batch-then-stream. Sequential buffering creates 2-4s dead air that kills the magic.
- **D-11:** ElevenLabs Flash v2.5 via WebSocket streaming for TTS (75ms model latency confirmed by research).

### Claude's Discretion
- FastAPI project structure and module organization
- Error handling and retry logic for external services
- Logging and monitoring approach
- Test strategy for the reading pipeline

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| INFRA-01 | SC pipeline audit completed -- all gaps documented with severity | Audit protocol defined; service health checks verified (Smithers OK, LLM Router OK, SC :5173 DOWN); Content DB structure mapped |
| INFRA-02 | orb-backend FastAPI service running at :8300 with deity config system | FastAPI patterns from Smithers/LLM Router documented; launchd service pattern established; deity JSON config structure defined |
| INFRA-03 | Reading pipeline connected: Smithers -> LLM Router -> Pinecone RAG -> ElevenLabs TTS | LLM Router API documented (LLMRequest/LLMResponse models); ElevenLabs WebSocket API verified; Pinecone NOT yet available (needs install + config) |
| INFRA-04 | Content DB queryable by god name (6,252 SC images + 2,891 Midjourney) | Images catalog JSON exists (7,104 items) with god-name tags; images on external drive; needs serving layer |
| INFRA-05 | Streaming SSE endpoint for web readings (no buffered responses) | sse-starlette 3.3.3 already in Smithers venv; FastAPI SSE pattern documented; sentence-boundary detection needed for TTS chunking |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| FastAPI | 0.135.1 | HTTP API framework | Already used by Smithers and LLM Router; async-native; SSE + WebSocket built in |
| uvicorn | 0.41.0 | ASGI server | Standard FastAPI deployment; already running Smithers and LLM Router |
| sse-starlette | 3.3.3 | Server-Sent Events | Already installed in Smithers venv; provides EventSourceResponse for streaming |
| httpx | 0.28.1 | Async HTTP client | Already used by Smithers for inter-service calls; needed for LLM Router + Pinecone |
| anthropic | 0.84.0 | Claude API client | Already in Smithers venv; needed for direct Claude streaming if bypassing LLM Router |
| pydantic | 2.x | Data validation | Already used by all services; request/response models |
| python-dotenv | 1.0.1 | Env var loading | Standard pattern across all services |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| elevenlabs | latest | ElevenLabs TTS SDK | WebSocket streaming TTS; deity voice generation |
| pinecone-client | latest | Pinecone vector DB | RAG context retrieval for oracle readings |
| websockets | 16.0 | WebSocket protocol | Already in Smithers venv; needed for ElevenLabs WebSocket API |
| aiofiles | 23.2.1 | Async file I/O | Loading deity JSON configs, serving Content DB images |
| rich | 13.9.4 | Logging/formatting | Console output; matches Smithers pattern |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| sse-starlette | FastAPI StreamingResponse | sse-starlette handles SSE protocol details (event names, retry, keep-alive heartbeats); StreamingResponse is raw bytes |
| pinecone-client | ChromaDB (already installed) | ChromaDB exists locally with 177MB data, but CONTEXT.md specifies Pinecone for RAG; ChromaDB could be a fallback |
| elevenlabs SDK | Direct WebSocket via websockets | SDK handles auth, reconnection, audio encoding; direct WS is more control but more code |

**Installation:**
```bash
# In new venv at ~/services/orb-backend/
python3.10 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn[standard] httpx pydantic python-dotenv
pip install sse-starlette websockets aiofiles rich
pip install elevenlabs pinecone-client anthropic
```

**Version verification:** FastAPI 0.135.1 and uvicorn 0.41.0 confirmed via Smithers venv. Python 3.10.19 confirmed as runtime for both existing services. New venv MUST use Python 3.10 (not system Python 3.14) to match existing services.

## Architecture Patterns

### Recommended Project Structure
```
~/services/orb-backend/
├── .env                    # API keys (ElevenLabs, Pinecone, Anthropic)
├── .venv/                  # Python 3.10 virtual environment
├── server.py               # FastAPI app, routes, lifespan
├── pipeline.py             # Core reading pipeline orchestration
├── streaming.py            # SSE + sentence detection + TTS streaming
├── deity_config.py         # Load and cache god JSON files
├── content_db.py           # Query images catalog by deity name
├── rag.py                  # Pinecone RAG retrieval
├── tts.py                  # ElevenLabs WebSocket streaming
├── models.py               # Pydantic request/response models
├── gods/                   # One JSON file per deity (21 files)
│   ├��─ zeus.json
│   ├─��� athena.json
│   ├── aphrodite.json
���   └── ...
├── data/                   # Runtime data (sessions, logs)
├── requirements.txt        # Pinned dependencies
└── start.sh                # uvicorn startup script
```

### Pattern 1: Flat Module Layout (Match Smithers)
**What:** All Python modules at the top level of the service directory. No `src/` or nested package structure.
**When to use:** Always for this project. Smithers and LLM Router both use this pattern.
**Example:**
```python
# server.py (matches Smithers server.py pattern)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from pipeline import execute_reading
from deity_config import load_deity, list_deities
from models import ReadingRequest, ReadingResponse

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Pre-load deity configs, verify service connections
    yield

app = FastAPI(title="Orb Backend", version="1.0.0", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
```

### Pattern 2: Streaming Pipeline with Sentence Detection
**What:** Stream Claude tokens, detect sentence boundaries, send complete sentences to ElevenLabs TTS, forward audio chunks to client via SSE.
**When to use:** Every reading request. This is the core of the product.
**Example:**
```python
# streaming.py
import re
from sse_starlette.sse import EventSourceResponse

SENTENCE_END = re.compile(r'[.!?]\s+|[.!?]$')

async def stream_reading(deity: str, intent: str, rag_context: str):
    """Generator that yields SSE events as the reading streams."""
    sentence_buffer = ""

    async for token in claude_stream(deity, intent, rag_context):
        sentence_buffer += token
        yield {"event": "text", "data": token}

        # Detect sentence boundary
        if SENTENCE_END.search(sentence_buffer):
            sentence = sentence_buffer.strip()
            sentence_buffer = ""
            # Fire TTS for completed sentence (don't await -- stream in parallel)
            async for audio_chunk in tts_stream(deity, sentence):
                yield {"event": "audio", "data": base64_encode(audio_chunk)}

    # Final flush
    if sentence_buffer.strip():
        async for audio_chunk in tts_stream(deity, sentence_buffer.strip()):
            yield {"event": "audio", "data": base64_encode(audio_chunk)}

    yield {"event": "done", "data": ""}
```

### Pattern 3: Deity Configuration as Data
**What:** Each god is a JSON file loaded at startup and cached in memory.
**When to use:** Any deity-specific behavior.
**Example:**
```python
# gods/zeus.json
{
    "id": "zeus",
    "name": "Zeus",
    "title": "King of the Gods",
    "voice_id": "ELEVENLABS_VOICE_ID_HERE",
    "system_prompt": "You are Zeus, King of the Gods, ruler of Mount Olympus...",
    "mythology_keywords": ["thunder", "lightning", "power", "authority", "sky"],
    "reading_style": "authoritative, commanding, paternal, occasionally wrathful",
    "art_collection": "zeus",
    "color_palette": ["#1a237e", "#ffd600", "#ffffff"],
    "mckee_guidance": "Zeus readings follow power dynamics. Value progression: order -> challenge -> chaos -> restored order through authority."
}
```

### Pattern 4: Service Health at Startup
**What:** Verify all downstream services are reachable during FastAPI lifespan startup.
**When to use:** Always. Fail fast if Smithers/LLM Router/Pinecone/ElevenLabs are unreachable.
**Example:**
```python
# server.py lifespan
async def lifespan(app: FastAPI):
    checks = {
        "smithers": "http://localhost:8200/health",
        "llm_router": "http://localhost:8100/health",
    }
    async with httpx.AsyncClient() as client:
        for name, url in checks.items():
            try:
                r = await client.get(url, timeout=5.0)
                logger.info(f"{name}: {'OK' if r.status_code == 200 else 'DEGRADED'}")
            except Exception:
                logger.warning(f"{name}: UNREACHABLE -- some features will be degraded")
    yield
```

### Anti-Patterns to Avoid
- **Extending Smithers:** Do NOT add reading logic to Smithers. D-04 explicitly requires a separate service.
- **Batch-then-stream:** Do NOT generate the full reading text, then generate all audio, then send to client. D-10 forbids this.
- **Database for deity config:** 21 JSON files is the right answer. A database adds complexity for zero benefit at this scale.
- **Custom LLM client:** Use the `anthropic` SDK or call LLM Router via `httpx`. Do not hand-roll HTTP calls to Claude API.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SSE protocol | Raw StreamingResponse with manual event formatting | `sse-starlette` EventSourceResponse | Handles heartbeats, client disconnects, event names, retry directives |
| TTS streaming | Direct HTTP POST to ElevenLabs REST API | `elevenlabs` SDK WebSocket streaming | WebSocket gives per-sentence streaming; REST API is batch-only |
| Sentence detection | Complex NLP sentence tokenizer | Regex on `.!?` boundaries | Good enough for TTS chunking; NLP adds latency and dependency |
| Vector search | Custom embedding + similarity code | `pinecone-client` | Already indexed; handles scale, filtering, metadata |
| Service process management | Manual `nohup` or screen sessions | launchd plist (macOS) | Matches Smithers/LLM Router pattern; auto-restart on crash |

**Key insight:** The entire reading pipeline is a composition of existing services and APIs. The orb-backend is a thin orchestrator, not a compute engine. Keep it thin.

## Common Pitfalls

### Pitfall 1: Python Version Mismatch
**What goes wrong:** System Python is 3.14 but existing services run on 3.10.19 via venvs. Creating a venv with `python3 -m venv` would use 3.14, causing potential package incompatibilities.
**Why it happens:** macOS system Python is 3.14 via Homebrew, but services were set up with 3.10.
**How to avoid:** Create venv explicitly with `python3.10 -m venv .venv`. The 3.10 binary exists at the path used by existing service venvs.
**Warning signs:** Import errors, typing syntax issues, package build failures.

### Pitfall 2: External Drive Dependency for Content DB
**What goes wrong:** The images catalog references files on `/Volumes/Extreme Pro/sacred-circuits-outputs/`. If the external drive is not mounted, Content DB queries return broken paths.
**Why it happens:** SC media lives on an external SSD, not on the boot drive.
**How to avoid:** Content DB module must check drive availability at startup and degrade gracefully. For INFRA-04, serve the catalog JSON as the query interface but validate paths exist before returning them. Consider a CDN/local cache strategy for Phase 2.
**Warning signs:** File-not-found errors on image paths; service works on dev machine but fails after reboot without drive.

### Pitfall 3: ElevenLabs Voice IDs Not Configured for 21 Gods
**What goes wrong:** The CONTEXT.md says "ElevenLabs deity voice profiles already configured" but research shows only 5 voices exist in JARVIS (2501, Goddess, Theos, Niki, JARVIS). The 21 deity voices do NOT yet exist.
**Why it happens:** The project-level research assumed deity voices were ready, but verification shows only the JARVIS voice set.
**How to avoid:** The audit must explicitly inventory which ElevenLabs voices exist and which need to be created. For Phase 1, use available voices (map multiple gods to the same voice) and flag voice creation as a Phase 2 task.
**Warning signs:** Voice ID in deity JSON returns 404 from ElevenLabs API.

### Pitfall 4: Pinecone Index May Not Exist
**What goes wrong:** The existing RAG uses ChromaDB (local, 177MB at `~/repos/Sacred-circuits-automation-/chroma_db/`), NOT Pinecone. If the plan assumes a Pinecone index with SC content, it will find nothing.
**Why it happens:** The project research mentions "Pinecone vectors populated" but the actual build-rag.py script uses ChromaDB. There may be a separate Pinecone index, but it was not found in the .env files.
**How to avoid:** Audit must verify: (1) Does a Pinecone index exist? (2) What is in it? (3) If not, is ChromaDB adequate for Phase 1? ChromaDB has 15,645 chunks from the Obsidian vault already embedded. Using ChromaDB for Phase 1 RAG would unblock development while Pinecone is set up.
**Warning signs:** No PINECONE_API_KEY in .env; pinecone-client not installed.

### Pitfall 5: Streaming SSE Proxy Timeouts
**What goes wrong:** SSE connection dies mid-reading because a reverse proxy (Cloudflare tunnel) or client times out after 60 seconds of perceived inactivity.
**Why it happens:** Oracle readings generate 500+ words of text plus audio. If there is a gap between text completion and audio generation, the SSE stream may appear idle.
**How to avoid:** Send SSE heartbeat comments (`:keepalive`) every 15 seconds. Ensure the Cloudflare tunnel config has adequate timeout. Test with actual tunnel, not just localhost.
**Warning signs:** Readings work on localhost but fail through the tunnel; partial readings with sudden disconnect.

## Code Examples

### SSE Reading Endpoint
```python
# Source: FastAPI SSE pattern + sse-starlette docs
from fastapi import FastAPI, Request
from sse_starlette.sse import EventSourceResponse

@app.get("/api/oracle/read/{deity}")
async def oracle_reading(deity: str, intent: str, request: Request):
    """Stream an oracle reading via SSE."""
    deity_config = load_deity(deity)
    if not deity_config:
        raise HTTPException(status_code=404, detail=f"Unknown deity: {deity}")

    async def event_generator():
        # Send deity metadata immediately
        yield {"event": "deity", "data": json.dumps({
            "name": deity_config["name"],
            "title": deity_config["title"],
            "image": get_deity_image(deity),
        })}

        # Stream the reading
        async for event in stream_reading(deity, intent):
            if await request.is_disconnected():
                break
            yield event

    return EventSourceResponse(event_generator())
```

### ElevenLabs WebSocket TTS
```python
# Source: ElevenLabs WebSocket docs (elevenlabs.io/docs/eleven-api/websockets)
import websockets
import json
import base64

async def tts_stream(voice_id: str, text: str):
    """Stream TTS audio for a sentence via ElevenLabs WebSocket."""
    uri = f"wss://api.elevenlabs.io/v1/text-to-speech/{voice_id}/stream-input"
    params = "?model_id=eleven_flash_v2_5&output_format=mp3_44100_128"

    async with websockets.connect(uri + params) as ws:
        # Initialize stream
        await ws.send(json.dumps({
            "text": " ",
            "xi_api_key": ELEVENLABS_API_KEY,
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.8},
        }))

        # Send text
        await ws.send(json.dumps({"text": text}))

        # Signal end
        await ws.send(json.dumps({"text": ""}))

        # Receive audio chunks
        async for message in ws:
            data = json.loads(message)
            if data.get("audio"):
                yield base64.b64decode(data["audio"])
            if data.get("isFinal"):
                break
```

### LLM Router Call Pattern
```python
# Source: Verified from ~/services/llm-router/main.py
async def call_llm_router(system_prompt: str, message: str, tier: str = "pro") -> str:
    """Call LLM Router for oracle reading generation."""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8100/route",
            json={
                "message": message,
                "system": system_prompt,
                "tier": tier,
                "max_tokens": 4096,
            },
            timeout=60.0,
        )
        response.raise_for_status()
        data = response.json()
        return data["response"]
```

### Launchd Plist Pattern
```xml
<!-- Source: Verified from ~/Library/LaunchAgents/com.claw.smithers.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "...">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.claw.orb-backend</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Users/claw2501/services/orb-backend/.venv/bin/uvicorn</string>
        <string>server:app</string>
        <string>--host</string>
        <string>0.0.0.0</string>
        <string>--port</string>
        <string>8300</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/Users/claw2501/services/orb-backend</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/orb-backend.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/orb-backend.err</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>DOTENV_PATH</key>
        <string>/Users/claw2501/services/orb-backend/.env</string>
    </dict>
</dict>
</plist>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next-pwa for PWA | Serwist | 2024 | next-pwa unmaintained; Serwist is official successor |
| ElevenLabs REST TTS | ElevenLabs WebSocket streaming | 2024 | REST is batch-only; WebSocket enables per-sentence streaming |
| ElevenLabs v1 models | Flash v2.5 (75ms latency) | 2025 | 3-4x faster time-to-first-byte than v1 |
| Pinecone legacy client | pinecone-client (serverless) | 2024 | New client for serverless indexes; different API surface |
| FastAPI StreamingResponse for SSE | sse-starlette EventSourceResponse | Established | sse-starlette handles SSE protocol correctly; StreamingResponse is raw |

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Python 3.10 | All services | Yes | 3.10.19 | -- |
| FastAPI | orb-backend | Yes | 0.135.1 (in Smithers venv) | -- |
| uvicorn | orb-backend | Yes | 0.41.0 | -- |
| Smithers | LLM routing | Yes | Running at :8200 | Direct Claude API calls |
| LLM Router | Model selection | Yes | Running at :8100 | Direct Claude API calls |
| SC Pipeline | Audit target | DOWN | :5173 not responding | Investigate during audit |
| Ollama | Local models | Unknown | Not checked | Not required for Phase 1 |
| ElevenLabs API | TTS | Available (API key in .env) | -- | No fallback for voice |
| elevenlabs SDK | TTS Python client | NOT installed | -- | Install in new venv |
| pinecone-client | RAG | NOT installed | -- | ChromaDB as Phase 1 fallback |
| ChromaDB | RAG fallback | Yes | Installed; 177MB data | Primary if Pinecone unavailable |
| External SSD | Content DB images | Mounted | /Volumes/Extreme Pro | Graceful degradation if unmounted |
| launchd | Service management | Yes | macOS native | -- |

**Missing dependencies with no fallback:**
- ElevenLabs API key exists but SDK not installed -- must install in orb-backend venv
- If NO voice IDs exist for any deity, TTS will fail -- audit must verify voice availability

**Missing dependencies with fallback:**
- pinecone-client not installed and no PINECONE_API_KEY found -- ChromaDB (local, 15,645 chunks) can serve as Phase 1 RAG source
- SC pipeline at :5173 is down -- audit will determine if revivable or if its functions are already covered by other services

## Open Questions

1. **Does a Pinecone index with SC content actually exist?**
   - What we know: ChromaDB exists locally with 15,645 chunks. No PINECONE_API_KEY found in either .env file.
   - What's unclear: Was Pinecone ever set up? Is the "Pinecone vectors populated" claim from the project research accurate?
   - Recommendation: Audit must check. If no Pinecone index exists, use ChromaDB for Phase 1 and set up Pinecone as a separate task.

2. **How many of the 21 deity ElevenLabs voices actually exist?**
   - What we know: 5 voices confirmed in JARVIS config (2501, Goddess, Theos, Niki, JARVIS). None are deity-specific (no "Zeus voice", no "Athena voice").
   - What's unclear: Were additional voices created in ElevenLabs that are not referenced in code? Are any of the 5 voices usable as deity voices?
   - Recommendation: Audit must call ElevenLabs API to list all voices. For Phase 1, map available voices to deities (e.g., "2501 Protocol" as Zeus, "AI Goddess" as Athena). Create actual deity voices in Phase 2.

3. **What is the SC pipeline's actual state?**
   - What we know: :5173 is down. Launchd service `com.openclaw.sacred-circuits-8000` exists but backend at :8000 is also not responding. The repo at `~/repos/Sacred-circuits-automation-/` has full code.
   - What's unclear: Can it be started? Is it needed for Phase 1? Its key value was content generation (Substack/TikTok pipeline), not oracle readings.
   - Recommendation: Try starting it during audit. If it works, document what it provides. If not, it is likely NOT needed for Phase 1 -- orb-backend replaces its reading-relevant functions.

4. **Content DB serving strategy**
   - What we know: 7,104 images cataloged in JSON. Images on external drive. No HTTP serving layer exists.
   - What's unclear: Should orb-backend serve images directly? Use a CDN? Serve just the catalog and let the client access images via file paths?
   - Recommendation: For Phase 1, orb-backend serves the JSON catalog via API. Images served as static files via a simple endpoint or Cloudflare tunnel. CDN optimization deferred.

5. **Mythology correlations for RAG context**
   - What we know: `mythology_service.py` in SC pipeline has rich god correlations (keywords, domains, key phrases, modern applications). `build-rag.py` embeds Obsidian vault content into ChromaDB.
   - What's unclear: Is the existing ChromaDB content sufficient for oracle readings? Does it contain mythology-specific content or just general SC essays?
   - Recommendation: Audit ChromaDB collections to assess mythology content density. The `sacred-circuits` and `book-knowledge` collections likely have relevant mythological content.

## Existing Code to Reuse

### From SC Pipeline (~/repos/Sacred-circuits-automation-/)
| Asset | Location | Reuse Strategy |
|-------|----------|----------------|
| Mythology correlations (21 gods) | `python_backend/api_server.py` lines 72-98 | Extract into deity JSON files (D-07) |
| MythologyService class | `python_backend/services/mythology_service.py` | Reference for keyword matching, theoi.com integration |
| Mythology colors | `python_backend/services/mythology_colors.py` | Copy deity color palettes into JSON configs |
| Images catalog | `catalogs/images_catalog.json` | Load directly; 7,104 items with god-name tags |
| ChromaDB RAG index | `chroma_db/` (177MB) | Query for mythology context if Pinecone unavailable |
| Sound design aesthetic | `python_backend/services/sound_design_aesthetic.py` | Reference for audio atmosphere settings |
| Sacred Circuits framework | `python_backend/api_server.py` lines 61-160 | Mission, signals, voice tone -- feed into deity prompt templates |

### From JARVIS Voice (jarvis_voice_project memory)
| Asset | Location | Reuse Strategy |
|-------|----------|----------------|
| 5 ElevenLabs voice IDs | Memory: 2501, Goddess, Theos, Niki, JARVIS | Map to deities for Phase 1 |
| TTS credit-saving pattern | JARVIS backend | Apply same `want_tts` flag for cost control |
| McKee storytelling protocol | CLAUDE.md + JARVIS system prompt | Bake into every deity prompt template |

### From Smithers (~/services/smithers/)
| Asset | Location | Reuse Strategy |
|-------|----------|----------------|
| FastAPI project structure | `server.py` | Follow same flat-module, lifespan, CORS pattern |
| Cost tracking | `cost_tracker.py` | Adapt for reading cost tracking (LLM + TTS costs per reading) |
| LLM Router integration | `executor.py` lines 18-25 | Same URL constants and httpx call pattern |
| Launchd plist | `~/Library/LaunchAgents/com.claw.smithers.plist` | Template for orb-backend plist |

## Sources

### Primary (HIGH confidence)
- Smithers service code at `~/services/smithers/` -- verified running, healthy, code inspected
- LLM Router service code at `~/services/llm-router/` -- verified running, healthy, API models documented
- SC pipeline code at `~/repos/Sacred-circuits-automation-/` -- code exists, service DOWN, mythology data rich
- Images catalog at `catalogs/images_catalog.json` -- 7,104 items verified with god-name tag counts
- JARVIS voice project memory -- 5 ElevenLabs voice IDs confirmed
- [FastAPI SSE official docs](https://fastapi.tiangolo.com/tutorial/server-sent-events/) -- SSE implementation pattern
- [sse-starlette PyPI](https://pypi.org/project/sse-starlette/) -- EventSourceResponse library
- [ElevenLabs WebSocket docs](https://elevenlabs.io/docs/eleven-api/websockets) -- Real-time TTS streaming
- [ElevenLabs WebSocket API reference](https://elevenlabs.io/docs/api-reference/text-to-speech/v-1-text-to-speech-voice-id-stream-input) -- WebSocket protocol details

### Secondary (MEDIUM confidence)
- ChromaDB at `chroma_db/` -- 177MB, 15,645 chunks verified, but content quality for oracle readings unclear
- Pinecone claim from project research -- stated as available but no API key found in any .env

### Tertiary (LOW confidence)
- "21 deity voice profiles configured" claim -- only 5 voices found, deity-specific voices likely do not exist yet
- SC pipeline "80% complete" claim -- service is DOWN, actual functionality percentage unknown until audit

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries verified in existing service venvs, versions confirmed
- Architecture: HIGH -- following established patterns from Smithers and LLM Router
- Pitfalls: HIGH -- discovered real gaps (Pinecone missing, voices incomplete, external drive dependency) through direct verification

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (stable domain, no fast-moving dependencies)
