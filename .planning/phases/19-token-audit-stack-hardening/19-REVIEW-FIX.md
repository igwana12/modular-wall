---
phase: 19-token-audit-stack-hardening
fixed_at: 2026-04-18T20:03:52Z
review_path: /Users/claw2501/.planning/phases/19-token-audit-stack-hardening/19-REVIEW.md
iteration: 1
findings_in_scope: 8
fixed: 6
skipped: 2
status: partial
---

# Phase 19: Code Review Fix Report

**Fixed at:** 2026-04-18T20:03:52Z
**Source review:** /Users/claw2501/.planning/phases/19-token-audit-stack-hardening/19-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 8 (CR-01, CR-02, CR-03, WR-01, WR-02, WR-03, WR-04, WR-05)
- Fixed: 6
- Skipped: 2

## Fixed Issues

### CR-01: Hardcoded weak default password for JARVIS web access

**Files modified:** `services/jarvis-sandbox/backend/server.py`
**Commit:** ba007e7
**Applied fix:** Replaced `os.getenv("JARVIS_ACCESS_PASSWORD", "ooo")` with a bare `os.getenv` followed by a `RuntimeError` raise if the value is falsy. Server now refuses to start without the env var set. CR-02 was committed in the same atomic commit since both touch the same file.

---

### CR-02: Deepgram API key hardcoded in source

**Files modified:** `services/jarvis-sandbox/backend/server.py`
**Commit:** ba007e7
**Applied fix:** Replaced `os.getenv("DEEPGRAM_API_KEY", "c4807cc8433420a94534597cc1471a66fce77ec1")` with `os.getenv("DEEPGRAM_API_KEY", "")`. The literal key is removed from source. Rotate the Deepgram key — it was committed and must be considered compromised.

---

### CR-03: SQLite row ID used as timestamp collision vector in Ollama fallback

**Files modified:** `services/smithers/executor.py`
**Commit:** 4c7dab7
**Applied fix:** Added `import uuid` to module imports and changed `f"call_{int(time.time())}"` to `f"call_{uuid.uuid4().hex[:12]}"` at line 506. Tool call IDs are now collision-free random hex strings.

---

### WR-01: `_tier_for` treats all unknown models as "cheap"

**Files modified:** `services/jarvis-sandbox/backend/usage_logger.py`
**Commit:** 2884ac1
**Applied fix:** Split the `if "opus" in m or "sonnet" in m` branch into two separate checks. Added a `print(..., file=sys.stderr)` warning and `return "unknown"` for the fallthrough case. Unknown models are no longer silently bucketed as cheap.

---

### WR-02: `asyncio.run()` inside a thread that may already have a running loop

**Files modified:** `services/smithers/executor.py`
**Commit:** f81e4de
**Applied fix:** Swapped the try/except order. Now calls `asyncio.get_running_loop()` first — if a loop is running (the common FastAPI case), routes to `ThreadPoolExecutor` immediately without triggering a `RuntimeError`. Only falls back to direct `asyncio.run()` when no loop is detected. Note: `import concurrent.futures` moved inside the block (was already imported inline in the original fallback path).

---

### WR-04: `compress_context` silently drops all context except the task line

**Files modified:** `services/smithers/context_trimmer.py`
**Commit:** 855fb9e
**Applied fix:** Replaced the task-extraction-only strategy with a head+tail truncation: keeps the first `budget_chars // 2` chars (task + instructions) and the last `budget_chars // 2` chars (most recent tool results), discarding the middle. Trim marker shows exact chars removed. Docstring updated to match.

---

### WR-05: LaunchAgent exposes secrets file path but curl never reads it

**Files modified:** `/Users/claw2501/Library/LaunchAgents/com.claw.morning-briefing.plist`
**Commit:** n/a — plist is not under git version control
**Applied fix:** Removed the `DOTENV_PATH` key and its value (`master-api-keys.env` path) from the `EnvironmentVariables` dict. The key was never consumed by the curl command and exposed the secrets file path in a world-readable plist.

---

## Skipped Issues

### WR-03: Budget check reads stale cost data — race condition under concurrent beats

**File:** `services/smithers/heartbeat.py:135-156`
**Reason:** Requires architectural decision — the two cost stores (`routing_history.db` and `usage.db`) are owned by different services (Smithers and JARVIS-sandbox). Unifying them requires either (a) JARVIS-sandbox writing to Smithers' DB (cross-service coupling) or (b) `get_daily_cost()` aggregating across both DBs (requires Smithers to know about JARVIS's DB path). Neither option should be auto-applied without Niko's sign-off. The circuit breaker is currently blind to JARVIS spend and may give false "under budget" signals.
**Original issue:** `_check_budget()` reads only `routing_history.db`; JARVIS spend goes to `usage.db`. The two are siloed.

---

_Fixed: 2026-04-18T20:03:52Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
