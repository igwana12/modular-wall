---
phase: 15-jarvis-agentic-tools
plan: "01"
subsystem: orb-bridge
tags: [jarvis, agentic, tool-use, voice, r1-frontend, security]
dependency_graph:
  requires: []
  provides: [run_build_loop, build-route-classifier]
  affects: [orb_bridge.py, classify_intent, process_query]
tech_stack:
  added: [pathlib.Path, subprocess (top-level import)]
  patterns: [Claude tool-use loop, Path sandbox guard, frozenset allowlist, asyncio run_in_executor]
key_files:
  modified:
    - path: /Users/claw2501/esp32-jarvis/bridge/orb_bridge.py
      changes: Added _BUILD_PATTERN constant, Priority 2c in classify_intent(), build route dispatch in process_query(), Phase 15 agentic build loop block (8 functions, 2 constants)
decisions:
  - "ADB am start re-navigation over CDP: CDP requires --remote-debugging-port flag on R1 Chrome which is not set; am start is reliable and already proven in _tool_reload_frontend"
  - "ALLOWED_COMMANDS = {git status, git diff} only: r1-frontend is a plain static site with no package.json or build step; npm run build would fail and is excluded"
  - "Top-level subprocess import added: multiple local import subprocess as _sp existed; consolidating to top-level is cleaner and consistent"
  - "Build route placed at Priority 2c (after deity domain, before jarvis fallback): smithers handles explicit task/productivity triggers at Priority 1 — build intent is visual/UI modification, distinct from task management"
  - "5-iteration cap checked BEFORE each API call: prevents runaway spend even if Claude returns tool_use on final iteration"
metrics:
  duration: ~12min
  completed_date: "2026-04-17"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 1
---

# Phase 15 Plan 01: JARVIS Agentic Build Loop Summary

Voice-to-code pipeline in orb_bridge.py — build-intent classifier routes to a bounded Claude tool-use loop with 4 sandboxed tools and immediate TTS ACK.

## What Was Built

Added the complete Phase 15 agentic build loop to `/Users/claw2501/esp32-jarvis/bridge/orb_bridge.py`:

**Task 1 — Classifier + Route Dispatch**
- `_BUILD_PATTERN` regex constant (line 240) detects UI/frontend modification utterances
- `classify_intent()` Priority 2c check: routes build-intent to `{"route": "build", "voice": "jarvis"}`
- `process_query()` `elif route == "build"` branch dispatches to `run_build_loop()`

**Task 2 — Agentic Build Loop + 4 Sandboxed Tools**
- `SANDBOX_ROOT` = `Path("/Users/claw2501/esp32-jarvis/r1-frontend").resolve()` (line 2084)
- `ALLOWED_COMMANDS` frozenset: `{"git status", "git diff"}` (line 2086)
- `_assert_safe_path()` — path traversal guard using `Path.resolve().is_relative_to(SANDBOX_ROOT)` (line 2094)
- `_tool_read_file()` — sandboxed file read (line 2104)
- `_tool_write_file()` — sandboxed file write with auto-mkdir (line 2117)
- `_tool_exec_shell()` — exact-string allowlist, 30s timeout, asyncio executor (line 2130)
- `_tool_reload_frontend()` — ADB am start re-navigation, re-detects serial on each call (line 2157)
- `_build_tool_definitions()` — Anthropic tool schema for all 4 tools (line 2187)
- `_dispatch_tool()` — tool router, never raises (line 2264)
- `run_build_loop()` — TTS ACK before first API call, 5-iteration cap before each API call, voices failure summary on cap hit (line 2281)

## Commits

| Task | Commit | Repo | Description |
|------|--------|------|-------------|
| 1 | 2b40618 | esp32-jarvis | feat(15-01): add _BUILD_PATTERN classifier and build route dispatch |
| 2 | ea53ae9 | esp32-jarvis | feat(15-01): implement run_build_loop and 4 sandboxed tools |

## Verification Results

- Syntax check: `python3 -c "import ast; ast.parse(...)"` → OK
- Pattern smoke test: `make the orb pulse faster` → True, `change the background color` → True, `whats the weather` → False
- All 8 functions present at expected line numbers
- `SANDBOX_ROOT` uses `Path.resolve().is_relative_to()` (not a prefix string check)
- `ALLOWED_COMMANDS` = `{"git status", "git diff"}` — no npm run build
- `anthropic_client` variable confirmed at line 61 — matches variable used in `run_build_loop()`

## Deviations from Plan

None — plan executed exactly as written.

The plan noted to verify the Anthropic client variable name (`anthropic_client` vs another name). Confirmed: line 61 of orb_bridge.py defines `anthropic_client = anthropic.Anthropic(...)`. The build loop uses this exact name.

## Threat Mitigations Applied (from threat_model)

| Threat ID | Mitigation | Status |
|-----------|-----------|--------|
| T-15-01 | `Path.resolve().is_relative_to(SANDBOX_ROOT)` in `_assert_safe_path()` | Implemented |
| T-15-02 | Exact frozenset membership check in `_tool_exec_shell()` | Implemented |
| T-15-03 | Prompt injection via file content — accepted residual risk | Accepted |
| T-15-04 | 5-iteration cap checked before each API call | Implemented |
| T-15-05 | 30s subprocess timeout + asyncio run_in_executor | Implemented |
| T-15-06 | Build route at Priority 2c — below smithers Priority 1 | Implemented |

## Threat Flags

None — no new network endpoints, auth paths, or schema changes beyond what the plan specified.

## Known Stubs

None — all data paths are wired. The build loop calls real Anthropic API, real ADB, real file I/O.

## Self-Check: PASSED

- `/Users/claw2501/esp32-jarvis/bridge/orb_bridge.py` exists and modified
- Commit `2b40618` exists in esp32-jarvis repo
- Commit `ea53ae9` exists in esp32-jarvis repo
- All 8 new functions confirmed at expected line numbers
- Syntax check passes
