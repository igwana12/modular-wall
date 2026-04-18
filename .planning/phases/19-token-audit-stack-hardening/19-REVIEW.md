---
phase: 19-token-audit-stack-hardening
reviewed: 2026-04-18T00:00:00Z
depth: standard
files_reviewed: 9
files_reviewed_list:
  - /Users/claw2501/services/jarvis-sandbox/backend/usage_logger.py
  - /Users/claw2501/services/smithers/scripts/token_audit.py
  - /Users/claw2501/services/smithers/context_trimmer.py
  - /Users/claw2501/services/smithers/tests/test_context_trimmer.py
  - /Users/claw2501/services/jarvis-sandbox/backend/server.py
  - /Users/claw2501/services/smithers/executor.py
  - /Users/claw2501/.claude/SOUL.md
  - /Users/claw2501/Library/LaunchAgents/com.claw.morning-briefing.plist
  - /Users/claw2501/services/smithers/heartbeat.py
findings:
  critical: 3
  warning: 5
  info: 4
  total: 12
status: issues_found
---

# Phase 19: Code Review Report

**Reviewed:** 2026-04-18
**Depth:** standard
**Files Reviewed:** 9
**Status:** issues_found

## Summary

Phase 19 introduces the usage logger, token audit script, context trimmer, SOUL.md behavioral spine, heartbeat beats, and a morning briefing LaunchAgent. The core logic is solid — WAL-mode SQLite, fire-and-forget async logging, circuit breaker, hard-disabled gate. Three critical issues need fixing before production: a hardcoded weak default password exposed to the browser DOM, a Deepgram API key committed in plaintext, and a timing-based SQLite row insertion vulnerability. Several warnings cover logic gaps in `_tier_for`, the `asyncio.run()` nesting pattern, and missing error surfacing.

---

## Critical Issues

### CR-01: Hardcoded weak default password for JARVIS web access

**File:** `/Users/claw2501/services/jarvis-sandbox/backend/server.py:110`

**Issue:** `JARVIS_ACCESS_PASSWORD` defaults to the literal string `"ooo"` when `JARVIS_ACCESS_PASSWORD` is not set in the environment. This value is then injected verbatim into every served HTML page as a `<meta>` tag (line 819) and set as a session cookie (line 838). Any unauthenticated client who fetches the index page before logging in receives the password in the HTML source. If the env var is never set, the weak default is the real password in production.

**Fix:**
```python
JARVIS_ACCESS_PASSWORD = os.getenv("JARVIS_ACCESS_PASSWORD")
if not JARVIS_ACCESS_PASSWORD:
    raise RuntimeError(
        "JARVIS_ACCESS_PASSWORD env var is required. Set it in .env before starting."
    )
```
Remove the fallback entirely — fail at startup rather than silently accept a trivial password. If a default is truly needed for local dev only, use `secrets.token_urlsafe(16)` so it is random per-process and never a known string.

---

### CR-02: Deepgram API key hardcoded in source

**File:** `/Users/claw2501/services/jarvis-sandbox/backend/server.py:164`

**Issue:** The Deepgram API key is hardcoded as a fallback literal:
```python
DEEPGRAM_KEY = os.getenv("DEEPGRAM_API_KEY", "c4807cc8433420a94534597cc1471a66fce77ec1")
```
This key is committed to source control and will be active even if the env var is unset. Anyone with read access to this file has a working key.

**Fix:**
```python
DEEPGRAM_KEY = os.getenv("DEEPGRAM_API_KEY", "")
```
Revoke the exposed key immediately and rotate to a new one loaded only from the environment.

---

### CR-03: SQLite row ID used as timestamp collision vector in Ollama fallback

**File:** `/Users/claw2501/services/smithers/executor.py:505`

**Issue:** The Ollama tool-call path generates tool call IDs using `int(time.time())`:
```python
"id": f"call_{int(time.time())}",
```
`time.time()` has second-level resolution. If two Ollama tool calls occur within the same second — possible in tight loops — both receive identical IDs (`call_1713398400`). Downstream code in `_convert_to_anthropic_messages` uses these IDs to match `tool_result` blocks to `tool_use` blocks. A collision causes the second result to be silently dropped or mismatched, corrupting the conversation context passed to Claude.

**Fix:**
```python
import uuid
"id": f"call_{uuid.uuid4().hex[:12]}",
```
Or use `f"call_{int(time.time() * 1000)}"` for millisecond granularity as a minimal change.

---

## Warnings

### WR-01: `_tier_for` treats all unknown models as "cheap" — silent miscategorization

**File:** `/Users/claw2501/services/jarvis-sandbox/backend/usage_logger.py:29-36`

**Issue:** The function returns `"cheap"` for both the explicit `haiku` branch AND the final fallthrough default. Any model whose name contains neither `opus`, `sonnet`, nor `haiku` (e.g., `claude-3-7-sonnet`, DeepSeek, Kimi, GPT-4o) is silently tagged `cheap`. This corrupts cost-per-tier reports in the token audit because expensive cloud models show up in the cheap bucket.

**Fix:**
```python
def _tier_for(model: str) -> str:
    m = model.lower()
    if "opus" in m:
        return "pro"
    if "sonnet" in m:
        return "pro"
    if "haiku" in m:
        return "cheap"
    # Unknown model — log a warning so the cost table can be updated
    print(f"[usage_logger] Unknown model tier for '{model}' — defaulting to 'unknown'", file=sys.stderr)
    return "unknown"
```

---

### WR-02: `asyncio.run()` inside a thread that may already have a running loop

**File:** `/Users/claw2501/services/smithers/executor.py:372`

**Issue:** The MCP tool dispatch path calls `asyncio.run(_bridge.call_tool(...))` inside `execute_with_tools`, which is a synchronous function called from a thread. The `RuntimeError` fallback to `ThreadPoolExecutor` catches the case where a loop is already running, but the comment says "Fallback: event loop already running in this thread context" — this is the common case when Smithers is called from a FastAPI async endpoint via `asyncio.run_in_executor`. The primary path will therefore almost always fail and add latency before the fallback kicks in.

**Fix:** Use `asyncio.get_event_loop().run_until_complete()` with an explicit check, or restructure `execute_with_tools` to be `async def` so it can await directly. At minimum, swap the try/except order so the ThreadPoolExecutor path is tried first when there is a running loop:
```python
try:
    loop = asyncio.get_running_loop()
    # Already in an async context — run in thread pool to avoid blocking
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
        result = pool.submit(asyncio.run, _bridge.call_tool(tool_name, arguments)).result(timeout=35)
except RuntimeError:
    result = asyncio.run(_bridge.call_tool(tool_name, arguments))
```

---

### WR-03: Budget check reads stale cost data — race condition under concurrent beats

**File:** `/Users/claw2501/services/smithers/heartbeat.py:135-156`

**Issue:** `_check_budget()` calls `cost_tracker.get_daily_cost()` which reads from `routing_history.db`. The usage logger (`usage_logger.py`) writes to a different database (`usage.db`). JARVIS-sandbox spend never appears in `routing_history.db`, so the circuit breaker never sees it. The two cost stores are siloed — the budget check is blind to half the spend.

**Fix:** Either (a) have `get_daily_cost()` aggregate from both `routing_history.db` and `usage.db`, or (b) have `usage_logger.py` write to `routing_history.db` instead of a separate file, unifying cost tracking into one source. This is architecturally significant — flag for Niko before the circuit breaker gives a false "under budget" signal.

---

### WR-04: `compress_context` silently drops all context except the task line

**File:** `/Users/claw2501/services/smithers/context_trimmer.py:29-42`

**Issue:** When a prompt exceeds budget, the function preserves only the `Task: ...` paragraph (up to the next blank line, line 31-32). Everything else — tool results, conversation history, data payloads — is discarded. The compressed wrapper says "trimmed to fit" but the LLM receives only the core task with zero context. For agentic loops where tool results are in the prompt, this produces responses that ignore all retrieved data.

This is a logic error: the intent of compression is to fit the most relevant content into budget, not to discard everything except the first paragraph.

**Fix:** Implement a budget-proportional truncation that keeps the head (task + instructions) AND the tail (most recent tool results), discarding the middle:
```python
head = prompt[:budget_chars // 2]
tail = prompt[-(budget_chars // 2):]
return (
    f"{head}\n\n[...{len(prompt) - budget_chars:,} chars trimmed...]\n\n{tail}"
)
```

---

### WR-05: LaunchAgent exposes secrets file path but curl never reads it

**File:** `/Users/claw2501/Library/LaunchAgents/com.claw.morning-briefing.plist:24-26`

**Issue:** `DOTENV_PATH` is set to the master API keys env file path in `EnvironmentVariables`. However, the `ProgramArguments` is a plain `curl` command — curl does not read `DOTENV_PATH`. The env var is never consumed. If the intent was to make the heartbeat endpoint aware of the secrets path, it has no effect. The path to the master key file is visible in the plist (which is a world-readable file under `~/Library/LaunchAgents/`) and serves no purpose in its current form.

**Fix:** Remove the `DOTENV_PATH` key from `EnvironmentVariables` in the plist. If Smithers needs to load that env file, configure the path inside Smithers' own launchd plist where the Python process can read it, not in the curl plist.

---

## Info

### IN-01: `test_compress_with_budget` assertion is too loose to catch regressions

**File:** `/Users/claw2501/services/smithers/tests/test_context_trimmer.py:32-35`

**Issue:** The test checks `len(out) <= 2000` for input of 5000 chars compressed to a 400-char budget. The compressed wrapper text alone is ~200 chars, so the assertion passes even if the function returns the full uncompressed input. The upper bound should be tighter.

**Fix:**
```python
def test_compress_with_budget():
    big = "x" * 5000
    out = compress_context(big, budget_tokens=100)  # ~400 chars
    assert len(out) < 600  # must actually be compressed, not just "under 2000"
    assert "trimmed" in out  # verify the compressed wrapper is present
```

---

### IN-02: `token_audit.py` opens subprocess to call `open` on every run

**File:** `/Users/claw2501/services/smithers/scripts/token_audit.py:138-141`

**Issue:** `subprocess.run(["open", ...])` launches Finder/default app on every execution. If this script is run in a cron job, CI, or headless SSH session, it will either fail silently (macOS `open` with no display) or pop an unexpected window during an unattended run.

**Fix:** Guard with an explicit `--open` flag or check for a TTY:
```python
if sys.stdout.isatty():
    subprocess.run(["open", str(report_path)], check=False, timeout=5)
```

---

### IN-03: Module-level `_load_agent_channels()` call in heartbeat.py runs at import time

**File:** `/Users/claw2501/services/smithers/heartbeat.py:63`

**Issue:** `AGENT_CHANNELS = _load_agent_channels()` executes at module import. If `agent_manifest.json` is missing or malformed at startup, the module silently gets an empty dict and all beats process zero channels without any error. The warning log at line 59 is swallowed.

**Fix:** Either raise on empty result, or defer loading into each beat function with a freshness check (so a missing manifest is surfaced at beat time, not silently at startup):
```python
AGENT_CHANNELS: dict[str, dict] = {}  # populated lazily in each beat
```

---

### IN-04: SOUL.md references SOUL files that may not exist yet

**File:** `/Users/claw2501/.claude/SOUL.md:34-37`

**Issue:** The Agent Registry table lists paths for Zeus, Athena, Hermes persona SOULs and an Admin SOUL. These are referenced as authoritative but the file itself notes "Full 21-god persona library lands in Phase 20." If any agent tries to load these files now (before Phase 20), they get silent failures. No runtime code reads this file directly, so this is documentation debt rather than a live bug.

**Fix:** Add a note to each missing entry: `(not yet created — Phase 20)` so it is clear which files exist vs which are placeholders.

---

_Reviewed: 2026-04-18_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
