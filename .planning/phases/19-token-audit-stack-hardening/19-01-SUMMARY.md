---
phase: 19-token-audit-stack-hardening
plan: "01"
subsystem: token-audit
tags: [cost-tracking, usage-logging, sqlite, cli-tools, anthropic]
dependency_graph:
  requires: []
  provides: [usage_logger, token_audit_cli, jarvis_usage_instrumentation]
  affects: [llm-router/usage.db, jarvis-sandbox/backend/server.py, smithers/scripts]
tech_stack:
  added: []
  patterns: [fire-and-forget async logging, asyncio.to_thread for sync sqlite, PRAGMA query_only for audit reads]
key_files:
  created:
    - /Users/claw2501/services/jarvis-sandbox/backend/usage_logger.py
    - /Users/claw2501/services/smithers/scripts/token_audit.py
    - /Users/claw2501/services/smithers/reports/token-audit-2026-04-18.md
  modified:
    - /Users/claw2501/services/jarvis-sandbox/backend/server.py
decisions:
  - "Used asyncio.to_thread for sqlite insert in usage_logger — avoids blocking event loop without requiring aiosqlite in JARVIS sandbox"
  - "Used asyncio.create_task (not run_coroutine_threadsafe) at both sonnet call sites — both _claude_vision and _claude_respond are already async def"
  - "cost_table.json lookup falls back to 0.0 for claude-sonnet-4-20250514 — key not in table, acceptable per plan spec"
metrics:
  duration_seconds: 141
  completed_date: "2026-04-18"
  tasks_completed: 3
  tasks_total: 3
  files_created: 2
  files_modified: 1
requirements_satisfied: [COST-01]
---

# Phase 19 Plan 01: JARVIS Usage Logging + Token Audit CLI Summary

**One-liner:** Fire-and-forget async usage logging at both JARVIS sonnet call sites writing to llm-router/usage.db, plus a CLI audit script that ranks top token killers with stale-data guard.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create usage_logger.py helper | 9c54d8f | jarvis-sandbox/backend/usage_logger.py (created) |
| 2 | Instrument 2 claude.messages.create sites | 3bca02a | jarvis-sandbox/backend/server.py (modified) |
| 3 | Create token_audit.py CLI with stale-data guard | f5d121e | smithers/scripts/token_audit.py (created) |

## What Was Built

**usage_logger.py** — Self-contained async helper in jarvis-sandbox/backend:
- `log_jarvis_usage(model, resp, endpoint="jarvis-sandbox")` — inserts one row per Anthropic call
- Uses `asyncio.to_thread` to run the sqlite insert off the event loop
- `PRAGMA journal_mode=WAL` for concurrent-write safety
- `_price()` lookup from smithers/data/cost_table.json with 0.0 fallback
- `_tier_for()` classifies sonnet/opus → "pro", haiku → "cheap"
- Never raises — all errors printed to stderr and swallowed

**server.py instrumentation:**
- Import added in local-imports section: `from usage_logger import log_jarvis_usage`
- `_claude_vision` (async): `asyncio.create_task(log_jarvis_usage(...))` after `resp = claude.messages.create(...)`
- `_claude_respond` (async): same pattern after the sonnet call
- Fast-path / haiku code paths untouched (verified by grep)

**token_audit.py** — CLI at smithers/scripts/:
- Opens usage.db READ-ONLY via `PRAGMA query_only = ON`
- Stale-data guard: `SELECT MAX(date) FROM usage` — warns if >24h old or zero rows
- Groups by `(model, endpoint)`, sorts by total_tokens DESC
- Rich table output if rich is installed, plain text fallback
- TOP N TOKEN KILLERS highlighted section
- Saves markdown report to smithers/reports/token-audit-YYYY-MM-DD.md
- Opens report with `subprocess.run(["open", ...])` per feedback_open_in_finder
- Exit 0 on success, exit 1 if DB unreachable
- Never touches routing_history.db task column (T-19-01-01 mitigation)

## Verification Results

```
# Task 1 verify
python3 -c "from usage_logger import log_jarvis_usage, _price, _tier_for; ..."
→ OK

# Task 2 verify (AST parse + import + count check)
python3 -c "import ast; ast.parse(open('backend/server.py').read()); ..."
→ OK

# Task 3 live run
python3 token_audit.py --days 30 --top 3
→ Rich table printed, report saved, TOP 3 TOKEN KILLERS section present

# Fast-path integrity
grep -B 10 "log_jarvis_usage" server.py | grep -c -i "haiku"
→ 0 (haiku untouched)
```

## Live Audit Output (2026-04-18)

Top killer: `claude-sonnet-4-20250514` @ `/ask` — 480,604 tokens, 774 requests, $2.89 over 30 days.

## Deviations from Plan

None — plan executed exactly as written.

The only minor note: `_claude_vision` at line 476 is already `async def`, so `asyncio.create_task` was used directly (as specified in the plan's Task 2 action item 3: "if the enclosing function is already async def, use asyncio.create_task directly"). The try/except wrapped form from action item 2 was not needed for this site.

## Known Stubs

None. Both call sites are wired to real DB writes. Audit script reads from live usage.db.

## Self-Check: PASSED

- `/Users/claw2501/services/jarvis-sandbox/backend/usage_logger.py` — exists
- `/Users/claw2501/services/smithers/scripts/token_audit.py` — exists
- `/Users/claw2501/services/smithers/reports/token-audit-2026-04-18.md` — exists
- Commits 9c54d8f, 3bca02a verified in jarvis-sandbox; f5d121e verified in smithers
