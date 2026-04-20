---
phase: 21
plan: "01"
subsystem: oracle
tags:
  - oracle
  - orphic
  - mckee
  - vault
  - fastapi
dependency_graph:
  requires:
    - oracle/rag_retriever.py (ORPHIC_THEME_KEYWORDS, retrieve_oracle_wisdom, format_wisdom_for_llm)
    - niko-obsidian-vault/PROJECTS/The Orb/personas/ (SOUL persona files)
  provides:
    - POST /api/oracle/orphic (standalone McKee 4-beat Orphic reading endpoint)
    - oracle/orphic_reading.py (reusable Orphic reading helper module)
    - SOUL-Goddess.md (default Goddess persona when deity omitted)
    - ~/niko-obsidian-vault/sacred-circuits/readings/ (runtime vault write-back)
  affects:
    - server.py (new route added between oracle_health_check and Alexa block)
tech_stack:
  added:
    - oracle/orphic_reading.py (new module — Pydantic models, theme gate, SOUL loader, synthesis, vault write-back)
    - tests/test_orphic_endpoint.py (pytest-asyncio integration + security tests)
    - niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-Goddess.md (new persona file)
  patterns:
    - TDD red/green cycle (task 1 RED, tasks 2+3 GREEN)
    - Thin route wrapper delegating to pure helper module
    - Path-traversal guard via regex whitelist + resolve().relative_to()
    - Pydantic DoS mitigations (max_length on question/deity/keywords)
key_files:
  created:
    - /Users/claw2501/services/jarvis-sandbox/backend/oracle/orphic_reading.py
    - /Users/claw2501/services/jarvis-sandbox/backend/tests/test_orphic_endpoint.py
    - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-Goddess.md
  modified:
    - /Users/claw2501/services/jarvis-sandbox/backend/server.py
decisions:
  - "Goddess fallback loaded from SOUL-Goddess.md file (NOT inline constant) — maintains uniform load_soul_file path for all deities including fallback"
  - "Patching strategy: patch both oracle.orphic_reading.write_reading_to_vault AND server.write_reading_to_vault because server.py uses direct import binding"
  - "Theme gate tokenization strips punctuation before matching (rebirth? → rebirth) — required for natural language questions"
metrics:
  duration: "~38 minutes"
  completed_date: "2026-04-20"
  tasks_completed: 4
  files_changed: 4
---

# Phase 21 Plan 01: Orphic Dedicated Endpoint Summary

**One-liner:** Standalone `POST /api/oracle/orphic` endpoint with McKee 4-beat JSON output, SOUL persona file injection, Orphic theme gate, path-traversal guard, and Obsidian vault write-back.

---

## What Was Built

### Files Created

**`oracle/orphic_reading.py`** (330 lines)
Pure helper module containing:
- `OrphicReadingRequest` / `OrphicReadingResponse` — Pydantic models with DoS mitigations (`max_length` on question/deity/keywords)
- `ORPHIC_MCKEE_SYSTEM_PROMPT` — new Orphic-specific system prompt (distinct from Digital Oracle and segments-schema ORPHIC_SYSTEM_PROMPT)
- `ORPHIC_SOULS_DIR` / `ORPHIC_READINGS_DIR` — path constants
- `check_theme_gate()` — ≥2 keyword matches from `ORPHIC_THEME_KEYWORDS`, punctuation stripped, `force=True` bypass
- `load_soul_file()` — path-traversal guard (regex whitelist `[a-z][a-z0-9_-]*` + `resolve().relative_to()`); Goddess loaded from `SOUL-Goddess.md` (not inline constant)
- `synthesize_orphic_reading()` — full pipeline: gate → SOUL → RAG(`orphic_only=True`) → Claude → `OrphicReadingResponse`
- `write_reading_to_vault()` — MEM-01 durable vault write with frontmatter (deity, querent_theme, key_insight, date) and 4 McKee H2 sections

**`tests/test_orphic_endpoint.py`** (166 lines)
6 async pytest tests:
- `test_orphic_endpoint_dionysus_theme` — 200 + 5-key schema with Dionysus question
- `test_orphic_gate_rejects_off_theme` — 422 with "theme gate" in detail
- `test_orphic_force_bypasses_gate` — 200 with force=True bypass
- `test_orphic_deity_file_loaded` — Dionysus SOUL persona injected into user_message
- `test_orphic_deity_path_traversal_rejected` — path traversal blocked (400) or Goddess fallback (200)
- `test_orphic_vault_writeback_called_on_success` — `write_reading_to_vault` called with correct req/resp types

**`SOUL-Goddess.md`** (58 lines)
Canonical SOUL persona file in `/Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/`. 9 headings, 4 McKee beats. Primordial feminine mystery voice — Gaia, Nyx, Persephone fused. Loaded by `load_soul_file()` when `deity` is omitted.

### Files Modified

**`server.py`** — single new `@app.post("/api/oracle/orphic", response_model=OrphicReadingResponse)` route inserted after `oracle_health_check` (line ~3395), before Alexa block. Thin wrapper: calls `synthesize_orphic_reading`, then `write_reading_to_vault` with filesystem errors caught non-fatally.

### Vault Write-Back Path

Runtime files created at: `~/niko-obsidian-vault/sacred-circuits/readings/YYYY-MM-DD-{deity}-orphic.md`

Directory already existed. Format: YAML frontmatter (deity, querent_theme, key_insight, date) + H1 title + 4 McKee H2 sections (Inciting Incident, Crisis, Climax, Resolution).

---

## Key Decisions Honoured from CONTEXT.md

| Decision | Status |
|----------|--------|
| New Orphic-specific McKee system prompt (not Digital Oracle) | Applied — `ORPHIC_MCKEE_SYSTEM_PROMPT` is distinct |
| Goddess fallback via SOUL-Goddess.md file load (NOT inline constant) | Applied — `_load_goddess()` reads file, never uses `GODDESS_FALLBACK_PERSONA` |
| `retrieve_oracle_wisdom(orphic_only=True)` — no Hellenic fallback | Applied |
| Theme gate ≥2 keywords OR `force=True` | Applied with punctuation stripping fix |
| `deity` absent → Goddess (no 422), only gate failure raises 422 | Applied |
| MEM-01: vault write-back on every successful 200 | Applied |
| MEM-02: Pydantic schema enforcement, 422 on gate, 400 on path traversal | Applied |

---

## Test Results

```
tests/test_orphic_endpoint.py::test_orphic_endpoint_dionysus_theme PASSED
tests/test_orphic_endpoint.py::test_orphic_gate_rejects_off_theme PASSED
tests/test_orphic_endpoint.py::test_orphic_force_bypasses_gate PASSED
tests/test_orphic_endpoint.py::test_orphic_deity_file_loaded PASSED
tests/test_orphic_endpoint.py::test_orphic_deity_path_traversal_rejected PASSED
tests/test_orphic_endpoint.py::test_orphic_vault_writeback_called_on_success PASSED

6 passed, 6 warnings in 9.34s
```

Full suite (excluding pre-existing `test_phrase_cache.py` collection error):
- 272 passed, 12 failed — **12 failures are pre-existing** (test_oracle_infra, test_rag_retriever, test_router) and unchanged from baseline.

---

## Manual Smoke Test

The server on `:8350` was running the old code (pre-Phase 21 deploy). Per `CLAUDE.md`, long-running processes cannot be restarted from the Bash tool. The automated test `test_orphic_vault_writeback_called_on_success` is the gating check and passes.

Expected vault file on next server restart + curl:
```
~/niko-obsidian-vault/sacred-circuits/readings/2026-04-20-dionysus-orphic.md
```

Expected frontmatter:
```yaml
---
deity: Dionysus
querent_theme: "Dionysus and the vine — what dies in my rebirth?"
key_insight: "..."
date: 2026-04-20
---
```

To run smoke manually after server restart:
```bash
curl -X POST http://localhost:8350/api/oracle/orphic \
  -H "Content-Type: application/json" \
  -d '{"question": "death and rebirth at the threshold of dionysus"}'
```

---

## Threat Mitigations Applied

| Threat | Mitigation |
|--------|------------|
| T-21-01: Path traversal on deity field | Regex whitelist `[a-z][a-z0-9_-]*` (HTTP 400 on fail) + `resolve().relative_to(ORPHIC_SOULS_DIR)` (HTTP 400 on escape). Both guards present for named-deity AND Goddess path. |
| T-21-02: DoS via oversized question | `question: str = Field(..., max_length=2000)` |
| T-21-03: SOUL file information disclosure | Covered by T-21-01 traversal guard |
| T-21-04: Prompt injection via question | Accepted — internal API on localhost:8350, LLM output schema-validated post-call |
| T-21-05: DoS via unbounded keywords | `keywords: list[str] \| None = Field(None, max_length=20)` |
| T-21-06: No 422 audit trail | Accepted — internal tool, informative detail strings logged |
| T-21-07: No auth on endpoint | Accepted — consistent with all other `/api/oracle/*` routes |
| T-21-08: Path traversal on readings filename | `_SLUG_RE = re.compile(r"[^a-z0-9_-]+")` strips non-slug chars from deity display name |
| T-21-09: YAML frontmatter injection | `_summarize_question()` collapses whitespace, truncates, escapes `"` → `'` |

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Theme gate punctuation not stripped**
- **Found during:** Task 3 (test `test_orphic_endpoint_dionysus_theme` returned 422 instead of 200)
- **Issue:** Question "Dionysus and the vine — what dies in my rebirth?" tokenizes "rebirth?" with the question mark, which doesn't match the keyword "rebirth" in ORPHIC_THEME_KEYWORDS
- **Fix:** Changed `set(question.lower().split())` to use `re.compile(r"[^\w]")` to strip punctuation from each token before set intersection
- **Files modified:** `oracle/orphic_reading.py`
- **Commit:** `63b6dc3`

**2. [Rule 1 - Bug] Mock patching target for write_reading_to_vault**
- **Found during:** Task 3 (mock_write.called was False despite 200 response)
- **Issue:** `server.py` uses `from oracle.orphic_reading import write_reading_to_vault` (direct import binding). Patching `oracle.orphic_reading.write_reading_to_vault` patches the module attribute but the server holds a separate reference. The route calls the local binding, not the module attribute.
- **Fix:** Added `patch("server.write_reading_to_vault", mock_write)` alongside the existing `patch("oracle.orphic_reading.write_reading_to_vault")` in tests that assert `.called`
- **Files modified:** `tests/test_orphic_endpoint.py`
- **Commit:** `63b6dc3`

**3. [Rule 1 - Bug] capture_create returns_value reference error in test_orphic_deity_file_loaded**
- **Found during:** Task 3 test run
- **Issue:** `mock_client.messages.create` was replaced with `capture_create` coroutine, then `capture_create` tried to access `mock_client.messages.create.return_value` — but after replacement, `.create` IS `capture_create` (a plain function), which has no `.return_value`
- **Fix:** Saved `_mock_return = mock_client.messages.create.return_value` before replacing `.create`
- **Files modified:** `tests/test_orphic_endpoint.py`
- **Commit:** `63b6dc3`

---

## Commits

| Task | Commit | Repo | Description |
|------|--------|------|-------------|
| Task 1 (RED) | `9b679c6` | oracle-engine | test: 5 failing async test stubs |
| Task 1.5 | `461ff5ec` | niko-obsidian-vault | feat: SOUL-Goddess.md persona file |
| Task 2 | `60bf91c` | oracle-engine | feat: oracle/orphic_reading.py helper module |
| Task 3 (GREEN) | `63b6dc3` | oracle-engine | feat: server.py route + bug fixes |
| Task 4 | `47e4d9e` | oracle-engine | test: vault writeback assertion test |

---

## Self-Check: PASSED

- [x] `tests/test_orphic_endpoint.py` exists — 166 lines, 6 async tests
- [x] `oracle/orphic_reading.py` exists — 330 lines, 9 symbols importable
- [x] `SOUL-Goddess.md` exists — 58 lines, 9 headings, 4 McKee beats
- [x] `server.py` has `@app.post("/api/oracle/orphic"` — count: 1
- [x] All commits in oracle-engine repo: `9b679c6`, `60bf91c`, `63b6dc3`, `47e4d9e`
- [x] Vault repo commit: `461ff5ec` in niko-obsidian-vault
- [x] All 6 tests pass, 12 pre-existing failures unchanged
