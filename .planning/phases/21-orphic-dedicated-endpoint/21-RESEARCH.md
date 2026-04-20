# Phase 21: Orphic Dedicated Endpoint — Research

**Researched:** 2026-04-19
**Domain:** FastAPI endpoint authoring + existing oracle pipeline patterns
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

| Area | Decision |
|------|----------|
| Endpoint path | `POST /api/oracle/orphic` |
| Retrieval | `retrieve_oracle_wisdom(orphic_only=True)` — no Hellenic fallback |
| LLM output | McKee 4-beat JSON: inciting_incident / crisis / climax / resolution |
| System prompt | New Orphic-specific prompt (not Digital Pythia) |
| Deity injection | From request body; default = Goddess voice if absent |
| Theme gate | ≥2 ORPHIC_THEME_KEYWORD matches OR `force=true` |
| Gate failure response | 422 with message explaining theme gate |
| Integration test | POST with Dionysus theme (≥2 keywords) → 4-beat JSON |

### Claude's Discretion
None specified — all areas are locked.

### Deferred Ideas (OUT OF SCOPE)
- Streaming LLM response (batch only for Phase 21)
- Orphic endpoint in the frontend UI (backend only)
- Per-deity SOUL file caching (load fresh per request)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| MEM-01 | After each Oracle reading, JARVIS writes structured entry to `niko-obsidian-vault/sacred-circuits/readings/` — god, querent theme, key insight, date | Reading log pattern exists in `oracle/reading_log.py`; write-back can use `Path.write_text` |
| MEM-02 | Output schema defined and enforced for all agent write-back operations — unstructured vault writes blocked | Pydantic `BaseModel` response model enforces schema at the endpoint layer |
</phase_requirements>

---

## Summary

Phase 21 adds a standalone `POST /api/oracle/orphic` endpoint to `server.py` (the JARVIS sandbox backend at `:8350`). The codebase already has nearly all required primitives: `retrieve_oracle_wisdom(orphic_only=True)` is implemented and tested in `oracle/rag_retriever.py`, the `orphic_wisdom` ChromaDB collection exists and is populated, and `pipelines/orphic.py` contains an `OrphicPipeline` that already uses Orphic RAG and Claude synthesis. The new REST endpoint is a thin HTTP wrapper over that logic — it does NOT reuse the pipeline class (which is WebSocket-oriented), but borrows its patterns.

The primary design question is: where does the new endpoint live and how does it call Claude? Answer: the endpoint lives in `server.py` (consistent with all other `/api/oracle/*` routes) and calls Claude via `anthropic.AsyncAnthropic()` using the same pattern as `OrphicPipeline.execute()`. A Pydantic request model enforces the input contract; a Pydantic response model enforces the 4-beat output schema.

**Primary recommendation:** Write the endpoint directly in `server.py` below the existing oracle proxy block (line ~3395). Use `_PydanticBase` (already imported as `from pydantic import BaseModel as _PydanticBase`) for request and response models. Reuse `ORPHIC_THEME_KEYWORDS` from `oracle.rag_retriever` for the gate check.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| FastAPI | already installed | HTTP endpoint | All routes in `server.py` use FastAPI `@app.post` |
| Pydantic v2 | already installed | Request/response schema | Pattern established by `_MemoryLogEntry` in `server.py` |
| anthropic | already installed | LLM synthesis | Used directly in `pipelines/orphic.py` via `anthropic.AsyncAnthropic()` |
| chromadb | already installed | Orphic RAG retrieval | `orphic_wisdom` collection exists at `~/.jarvis/myth-vectors/` |

[VERIFIED: codebase grep + chromadb collection check]

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `oracle.rag_retriever` | local | RAG retrieval + ORPHIC_THEME_KEYWORDS | Import both the function and the frozenset |
| `pathlib.Path` | stdlib | SOUL file loading | Load `SOUL-{deity}.md` from personas dir per request |

---

## Architecture Patterns

### Where the endpoint lives

All `/api/oracle/*` routes are defined directly in `server.py` — not in a separate router file. The oracle proxy block starts at line 3266. The new endpoint should be appended to this block (after line 3394). [VERIFIED: server.py grep]

There is no `oracle/orphic.py` module (that would be a router file); the existing `pipelines/orphic.py` is a WebSocket pipeline class, not a REST router.

### Pydantic model pattern (from server.py)

```python
# Source: server.py lines 1576-1590
from pydantic import BaseModel as _PydanticBase

class _MemoryLogEntry(_PydanticBase):
    channel: str
    session_id: str | None = None
    role: str
    content: str
```

Apply same pattern for the Orphic endpoint:

```python
class OrphicReadingRequest(_PydanticBase):
    question: str
    deity: str | None = None      # defaults to Goddess if absent
    force: bool = False            # bypass theme gate

class OrphicReadingResponse(_PydanticBase):
    inciting_incident: str
    crisis: str
    climax: str
    resolution: str
    deity: str                     # resolved deity name used
```

[VERIFIED: codebase]

### Theme gate implementation

`ORPHIC_THEME_KEYWORDS` is a `frozenset` in `oracle/rag_retriever.py` (line 46). The gate logic from `retrieve_myth_context()` shows the established pattern:

```python
# Source: oracle/rag_retriever.py line 443
query_lower = query.lower()
use_orphic = bool(ORPHIC_THEME_KEYWORDS & set(query_lower.split()))
```

For the endpoint gate (requiring ≥2 matches, not just ≥1):

```python
from oracle.rag_retriever import ORPHIC_THEME_KEYWORDS

words = set(request.question.lower().split())
matches = ORPHIC_THEME_KEYWORDS & words
if len(matches) < 2 and not request.force:
    raise HTTPException(
        status_code=422,
        detail=f"Orphic theme gate: need ≥2 keyword matches, found {len(matches)}. "
               f"Pass force=true to bypass."
    )
```

[VERIFIED: codebase]

### SOUL file loading

SOUL files live at `/Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-{deity}.md` (lowercase deity name). 20 files confirmed: SOUL-aphrodite.md through SOUL-zeus.md. No `SOUL-Goddess.md` exists — the fallback Goddess persona must be handled either by a hardcoded fallback string or by selecting a composite. [VERIFIED: directory listing]

The default Goddess voice in `pipelines/orphic.py` uses the `ORPHIC_FALLBACK_PROMPT` constant (line 108-115) which is hardcoded — no file load. The endpoint should follow the same pattern: if no deity or if deity file not found, use an inline Goddess fallback persona string rather than loading a file.

For named deities with SOUL files:

```python
PERSONAS_DIR = Path.home() / "niko-obsidian-vault/PROJECTS/The Orb/personas"

def load_soul_file(deity: str | None) -> str:
    if not deity:
        return GODDESS_FALLBACK_PERSONA   # inline constant
    soul_path = PERSONAS_DIR / f"SOUL-{deity.lower()}.md"
    if soul_path.exists():
        return soul_path.read_text(encoding="utf-8")
    return GODDESS_FALLBACK_PERSONA
```

[VERIFIED: codebase + directory listing]

### LLM call pattern (from pipelines/orphic.py)

```python
# Source: pipelines/orphic.py lines 219-231
client = anthropic.AsyncAnthropic()
response = await client.messages.create(
    model="claude-opus-4-20250514",
    max_tokens=1500,
    system=system_prompt,
    messages=[{"role": "user", "content": user_message}],
)
raw = response.content[0].text.strip()
if raw.startswith("```"):
    raw = raw.split("\n", 1)[1].rsplit("```", 1)[0].strip()
synthesis_json = json.loads(raw)
```

For the Phase 21 endpoint, same pattern but with a 4-beat response schema instead of `segments`. The system prompt must instruct Claude to return JSON with exactly the keys: `inciting_incident`, `crisis`, `climax`, `resolution`.

[VERIFIED: codebase]

### RAG retrieval call for the endpoint

The `retrieve_oracle_wisdom` signature accepts `hexagram_name`, `archetype_names`, `keywords`, `monomyth_stage`, `question`. For the Orphic endpoint with no I Ching context:

```python
# Source: pipelines/orphic.py lines 192-203
keywords = [w for w in text.split() if len(w) > 3][:10]
if deity_name:
    keywords.insert(0, deity_name.lower())

wisdom = retrieve_oracle_wisdom(
    hexagram_name="",
    archetype_names=[deity_name] if deity_name else [],
    keywords=keywords,
    monomyth_stage="",
    question=text,
    orphic_only=True,
)
```

[VERIFIED: codebase]

### New Orphic McKee system prompt

The existing `ORPHIC_SYSTEM_PROMPT` in `pipelines/orphic.py` returns `{"segments": [...]}` — not 4-beat McKee. Phase 21 requires a distinct prompt returning `{inciting_incident, crisis, climax, resolution}`.

Key differences from existing prompts:
- `ORACLE_SYSTEM_PROMPT` (the "Digital Pythia") — LOCKED OUT per CONTEXT.md
- Existing `ORPHIC_SYSTEM_PROMPT` — voice-segment schema, not McKee beats
- Phase 21 prompt — Orphic mystery register + explicit McKee 4-beat structure

The Phase 21 prompt should include:
1. Orphic mystery tradition voice (chthonic register, underworld cosmology)
2. The deity's SOUL file injected as persona context
3. Explicit instruction to return JSON with 4 named keys
4. McKee beat definitions for each field

[ASSUMED] The specific wording of the new system prompt is creative discretion; no reference source constrains it beyond the CONTEXT.md register description.

### Recommended Project Structure

No new files needed. All additions go in `server.py`:
- `OrphicReadingRequest` Pydantic model
- `OrphicReadingResponse` Pydantic model
- `ORPHIC_MCKEEE_SYSTEM_PROMPT` constant
- `GODDESS_FALLBACK_PERSONA` constant
- `load_soul_file()` helper function
- `@app.post("/api/oracle/orphic")` endpoint

The integration test goes in `backend/tests/test_orphic_endpoint.py`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Input validation | Manual dict key checks | Pydantic BaseModel | Already the project pattern; handles 422 automatically for missing required fields |
| RAG retrieval | Custom ChromaDB queries | `retrieve_oracle_wisdom(orphic_only=True)` | Already tested, handles dedup, model mismatch guard, graceful fallback |
| JSON fence stripping | Custom regex | `raw.split("\n", 1)[1].rsplit("```", 1)[0]` | Exact pattern from `pipelines/orphic.py` — already battle-tested |
| Theme keyword set | Inline list | `ORPHIC_THEME_KEYWORDS` frozenset from `rag_retriever` | Already defined and correct; don't duplicate |

---

## Common Pitfalls

### Pitfall 1: `retrieve_oracle_wisdom` dimension guard
**What goes wrong:** The `myth_notes` collection was indexed without a named EF; passing a named EF causes a conflict. `orphic_wisdom` uses a named EF (`SentenceTransformerEmbeddingFunction`). The function handles this difference internally — but only if called with `orphic_only=True` via `get_orphic_collection()`.
**Why it happens:** Two collections with different indexing strategies.
**How to avoid:** Always call `retrieve_oracle_wisdom(..., orphic_only=True)` — do not call `get_oracle_collection()` directly in the endpoint.
**Warning signs:** `ChromaDB error: EF conflict` in logs.

[VERIFIED: rag_retriever.py lines 95-115, 217-239]

### Pitfall 2: No SOUL-Goddess.md file
**What goes wrong:** Code tries to load `SOUL-Goddess.md` for the default deity fallback — file does not exist.
**Why it happens:** The 20 SOUL files cover named deities only; the Goddess voice is an Orphic composite.
**How to avoid:** Hardcode the Goddess fallback persona as a constant (as `pipelines/orphic.py` does with `ORPHIC_FALLBACK_PROMPT`). Do not attempt file load for the Goddess case.

[VERIFIED: directory listing]

### Pitfall 3: JSON parse failure from Claude
**What goes wrong:** Claude returns markdown fences or extra text around the JSON; `json.loads()` raises.
**Why it happens:** LLMs sometimes add `\`\`\`json` even when instructed not to.
**How to avoid:** Apply the fence-stripping pattern from `pipelines/orphic.py` before parsing. Wrap in try/except and return a structured error rather than a 500.

[VERIFIED: pipelines/orphic.py lines 229-244]

### Pitfall 4: Theme gate word-boundary false matches
**What goes wrong:** Single-character splits miss multi-word keywords like "gold tablets" — `ORPHIC_THEME_KEYWORDS` includes `"gold tablet"` and `"gold tablets"` as multi-word strings, but `set(text.split())` only matches single tokens.
**Why it happens:** The frozenset contains `"gold tablet"` and `"gold tablets"` as exact strings that will never match single-word tokenization.
**How to avoid:** The gate only needs to count single-word keyword matches (soul, death, orpheus, etc.). The multi-word entries in `ORPHIC_THEME_KEYWORDS` ("gold tablet", "gold tablets") will never match the split-based gate — this is acceptable; they are there for substring search contexts elsewhere.

[VERIFIED: rag_retriever.py lines 46-51]

### Pitfall 5: 422 vs 400 status confusion
**What goes wrong:** HTTPException with status_code=422 is correct per CONTEXT.md, but FastAPI also auto-generates 422 for Pydantic validation failures with a different schema — callers may conflate the two.
**Why it happens:** FastAPI reserves 422 for request validation errors.
**How to avoid:** Use 422 as specified. Include a clear `detail` string that distinguishes theme gate failure from schema validation failure.

[ASSUMED] FastAPI 422 usage for business logic gates is unconventional but explicitly decided in CONTEXT.md.

---

## Code Examples

### Complete endpoint skeleton

```python
# Source: pattern from server.py + pipelines/orphic.py

import json
import re
from pathlib import Path
import anthropic
from fastapi import HTTPException
from pydantic import BaseModel as _PydanticBase
from oracle.rag_retriever import (
    retrieve_oracle_wisdom,
    format_wisdom_for_llm,
    ORPHIC_THEME_KEYWORDS,
)

ORPHIC_SOULS_DIR = Path.home() / "niko-obsidian-vault/PROJECTS/The Orb/personas"

ORPHIC_MCKEEE_SYSTEM_PROMPT = """..."""  # new prompt, see below

GODDESS_FALLBACK_PERSONA = """..."""     # inline, mirroring ORPHIC_FALLBACK_PROMPT

class OrphicReadingRequest(_PydanticBase):
    question: str
    deity: str | None = None
    force: bool = False

class OrphicReadingResponse(_PydanticBase):
    inciting_incident: str
    crisis: str
    climax: str
    resolution: str
    deity: str

def _load_soul(deity: str | None) -> str:
    if not deity:
        return GODDESS_FALLBACK_PERSONA
    path = ORPHIC_SOULS_DIR / f"SOUL-{deity.lower()}.md"
    return path.read_text(encoding="utf-8") if path.exists() else GODDESS_FALLBACK_PERSONA

@app.post("/api/oracle/orphic", response_model=OrphicReadingResponse)
async def orphic_reading(req: OrphicReadingRequest):
    # Theme gate
    words = set(req.question.lower().split())
    matches = ORPHIC_THEME_KEYWORDS & words
    if len(matches) < 2 and not req.force:
        raise HTTPException(
            status_code=422,
            detail=f"Orphic theme gate: need ≥2 keyword matches, found {len(matches)}."
        )

    # Deity + SOUL file
    deity = req.deity or None
    soul_text = _load_soul(deity)
    display_deity = deity or "Goddess"

    # RAG
    keywords = [w for w in req.question.split() if len(w) > 3][:10]
    if deity:
        keywords.insert(0, deity.lower())
    wisdom = retrieve_oracle_wisdom(
        hexagram_name="", archetype_names=[display_deity],
        keywords=keywords, monomyth_stage="", question=req.question,
        orphic_only=True,
    )
    wisdom_text = format_wisdom_for_llm(wisdom, "")

    # LLM synthesis
    user_msg = f"Deity: {display_deity}\n\nSOUL context:\n{soul_text[:1500]}\n\nQuestion: {req.question}\n\nOrphic corpus:\n{wisdom_text[:2500] or 'None retrieved.'}"
    client = anthropic.AsyncAnthropic()
    response = await client.messages.create(
        model="claude-opus-4-20250514",
        max_tokens=1200,
        system=ORPHIC_MCKEEE_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_msg}],
    )
    raw = response.content[0].text.strip()
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1].rsplit("```", 1)[0].strip()
    try:
        parsed = json.loads(raw)
    except Exception:
        raise HTTPException(status_code=500, detail="LLM returned unparseable JSON")

    return OrphicReadingResponse(
        inciting_incident=parsed["inciting_incident"],
        crisis=parsed["crisis"],
        climax=parsed["climax"],
        resolution=parsed["resolution"],
        deity=display_deity,
    )
```

[VERIFIED: pattern from server.py + pipelines/orphic.py]

### Integration test skeleton (pytest + httpx)

```python
# Source: pattern from backend/tests/test_oracle_pipeline.py + test_rag_retriever.py

import pytest
from httpx import AsyncClient, ASGITransport

@pytest.mark.asyncio
async def test_orphic_endpoint_dionysus_theme():
    """Integration: POST with Dionysus theme (≥2 keywords) → 4-beat JSON."""
    from server import app
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.post("/api/oracle/orphic", json={
            "question": "Dionysus and the vine — what dies in my rebirth?",
        })
    assert resp.status_code == 200
    data = resp.json()
    for key in ("inciting_incident", "crisis", "climax", "resolution", "deity"):
        assert key in data
        assert isinstance(data[key], str)
        assert len(data[key]) > 0

@pytest.mark.asyncio
async def test_orphic_gate_rejects_off_theme():
    from server import app
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.post("/api/oracle/orphic", json={
            "question": "What should I have for breakfast?",
        })
    assert resp.status_code == 422

@pytest.mark.asyncio
async def test_orphic_force_bypasses_gate():
    from server import app
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.post("/api/oracle/orphic", json={
            "question": "What should I have for breakfast?",
            "force": True,
        })
    assert resp.status_code == 200
```

[ASSUMED] httpx `ASGITransport` pattern — matches what pytest-asyncio + FastAPI tests typically use. The existing tests in `tests/` use a simpler direct-import pattern without an HTTP client; verify if `ASGITransport` is available before using it, or use `from fastapi.testclient import TestClient` (sync) as fallback.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `orphic_wisdom` ChromaDB collection | RAG retrieval | Yes | — | Returns empty list (graceful) |
| `anthropic` Python package | LLM synthesis | Yes (used in pipelines/orphic.py) | — | — |
| SOUL persona files | Deity persona injection | Yes (20 files) | — | Inline Goddess fallback constant |

[VERIFIED: chromadb collection list + directory listing]

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | pytest + pytest-asyncio |
| Config file | `backend/pytest.ini` (`asyncio_mode = auto`) |
| Quick run command | `cd /Users/claw2501/services/jarvis-sandbox/backend && python -m pytest tests/test_orphic_endpoint.py -x` |
| Full suite command | `cd /Users/claw2501/services/jarvis-sandbox/backend && python -m pytest tests/ -x` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MEM-01 | 4-beat JSON returned for valid Dionysus request | integration | `pytest tests/test_orphic_endpoint.py::test_orphic_endpoint_dionysus_theme -x` | No — Wave 0 |
| MEM-02 | 422 returned for off-theme request without force | integration | `pytest tests/test_orphic_endpoint.py::test_orphic_gate_rejects_off_theme -x` | No — Wave 0 |
| MEM-02 | `force=true` bypasses gate | unit | `pytest tests/test_orphic_endpoint.py::test_orphic_force_bypasses_gate -x` | No — Wave 0 |

### Wave 0 Gaps
- [ ] `tests/test_orphic_endpoint.py` — covers all 3 test cases above

*(No framework install needed — pytest + pytest-asyncio already present)*

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `httpx.AsyncClient` + `ASGITransport` is available for integration tests | Code Examples / Validation | Would need to use `TestClient` (sync) instead; low risk, easy swap |
| A2 | New Orphic McKee system prompt specific wording | Architecture Patterns | Wrong tone/structure; Claude may not produce valid 4-beat JSON — mitigated by explicit JSON schema instruction |
| A3 | 422 for business logic (theme gate) is acceptable to downstream callers | Common Pitfalls | Callers may not distinguish from Pydantic 422; acceptable per locked decision |

---

## Open Questions

1. **SOUL file for Goddess default**
   - What we know: No `SOUL-Goddess.md` file exists in the personas dir
   - What's unclear: Should the inline fallback replicate `ORPHIC_FALLBACK_PROMPT` from `pipelines/orphic.py`, or be a more detailed persona?
   - Recommendation: Reuse `ORPHIC_FALLBACK_PROMPT` verbatim as the inline constant — it is already written for this exact purpose

2. **Vault write-back for MEM-01/MEM-02**
   - What we know: REQUIREMENTS.md maps MEM-01 and MEM-02 to Phase 21; no reading log write-back is mentioned in CONTEXT.md
   - What's unclear: CONTEXT.md does not mention vault write-back at all; MEM-01 says "writes structured entry to sacred-circuits/readings/"
   - Recommendation: Treat vault write-back as out of scope for Phase 21 unless the planner adds it — CONTEXT.md is the authoritative scope document and does not include it

---

## Sources

### Primary (HIGH confidence)
- `server.py` lines 3266-3394 — all existing `/api/oracle/*` routes and proxy pattern
- `oracle/rag_retriever.py` — `retrieve_oracle_wisdom`, `ORPHIC_THEME_KEYWORDS`, `get_orphic_collection`
- `pipelines/orphic.py` — `OrphicPipeline`, `ORPHIC_SYSTEM_PROMPT`, `ORPHIC_FALLBACK_PROMPT`, Claude call pattern
- `backend/tests/` — test patterns (pytest-asyncio, direct import, mock)
- Directory listing: `niko-obsidian-vault/PROJECTS/The Orb/personas/` — 20 SOUL files confirmed
- ChromaDB collection list: `orphic_wisdom` confirmed present at `~/.jarvis/myth-vectors/`

### Secondary (MEDIUM confidence)
- `oracle_sidecar.py` — Pydantic `BaseModel` usage pattern in standalone FastAPI app

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified in existing codebase
- Architecture: HIGH — endpoint pattern, RAG call, LLM call all verified in existing code
- Pitfalls: HIGH — all verified against actual code behavior
- Test patterns: MEDIUM — existing tests use direct import; httpx ASGITransport assumed

**Research date:** 2026-04-19
**Valid until:** Stable — no external dependencies on moving targets
