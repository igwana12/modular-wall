---
phase: 15-jarvis-agentic-tools
plan: "02"
subsystem: orb-bridge
tags: [jarvis, agentic, testing, security, r1-hardware, checkpoint-pending]
dependency_graph:
  requires: [15-01]
  provides: [test_agentic_tools]
  affects: [/Users/claw2501/esp32-jarvis/bridge/test_agentic_tools.py]
tech_stack:
  added: [pytest, unittest.mock, asyncio.run in tests]
  patterns: [patch.dict sys.modules for safe import, MagicMock for Anthropic client, AsyncMock-free loop cap test]
key_files:
  created:
    - path: /Users/claw2501/esp32-jarvis/bridge/test_agentic_tools.py
      changes: 5 unit tests for security boundaries — path traversal, allowlist enforcement, loop cap
decisions:
  - "Module-level side effects (port claim, ADB detection, Anthropic init) suppressed via patch.dict(sys.modules, anthropic) + patch(subprocess.run) before import — avoids marking tests integration-only"
  - "Loop cap test uses max_iterations=3 (not 5) to keep runtime fast while exercising the same code path"
  - "test_allowlist_passes_approved runs real git subprocess in SANDBOX_ROOT — acceptable because git is always available and the test only checks the allowlist guard, not file output"
metrics:
  duration: ~8min
  completed_date: "2026-04-17"
  tasks_completed: 1
  tasks_total: 2
  files_created: 1
checkpoint_status: PENDING — awaiting R1 hardware verification
---

# Phase 15 Plan 02: Unit Tests + R1 Hardware Verification Summary

5 pytest tests for agentic build loop security boundaries — all pass in 0.22s. R1 hardware checkpoint pending user verification.

## What Was Built

**Task 1 — Unit Tests (COMPLETE)**

Created `/Users/claw2501/esp32-jarvis/bridge/test_agentic_tools.py` with 5 tests:

| Test | What it verifies | Result |
|------|-----------------|--------|
| `test_path_traversal_blocked` | `_assert_safe_path("../../etc/passwd")` raises ValueError with "Path traversal blocked" | PASS |
| `test_sandbox_allows_valid_path` | `_assert_safe_path("js/thinking-mesh.js")` returns Path relative to SANDBOX_ROOT | PASS |
| `test_allowlist_blocks_unapproved` | `_tool_exec_shell("rm -rf /")` returns "ERROR: Command not allowed" | PASS |
| `test_allowlist_passes_approved` | `_tool_exec_shell("git status")` does NOT return "ERROR: Command not allowed" | PASS |
| `test_loop_cap` | `run_build_loop()` returns string containing "limit" after 3 iterations | PASS |

**Full pytest run:**
```
5 passed in 0.22s
```

**Import strategy:** Module-level side effects (port 8400 kill, ADB serial detection, Anthropic client init) suppressed using `patch.dict(sys.modules, {"anthropic": mock})` and `patch("subprocess.run")` before import. No integration markers needed — all 5 tests run fully automated.

**Task 2 — R1 Hardware Checkpoint (PENDING)**

Manual verification on R1 hardware required. See checkpoint details below.

## Commits

| Task | Commit | Repo | Description |
|------|--------|------|-------------|
| 1 | 1e68a68 | esp32-jarvis | test(15-02): add unit tests for agentic build loop security boundaries |

## Deviations from Plan

None — plan executed exactly as written.

The plan stated to mark loop cap test `@pytest.mark.integration` if mocking was too complex. In practice, mocking was clean using `patch.dict(sys.modules)` before import, so all 5 tests run without integration markers.

## Known Stubs

None — all tests exercise real code paths against real functions.

## Threat Flags

None.

## Self-Check: PASSED

- `/Users/claw2501/esp32-jarvis/bridge/test_agentic_tools.py` exists (164 lines)
- Commit `1e68a68` exists in esp32-jarvis repo
- `python3 -m pytest test_agentic_tools.py -v` exits 0, 5 passed in 0.22s

## R1 Hardware Checkpoint (Task 2 — PENDING)

This plan is paused at the hardware verification checkpoint. See PLAN.md Task 2 for full verification steps.

**Short version:**
1. Start bridge: `python3 /Users/claw2501/esp32-jarvis/bridge/orb_bridge.py`
2. Say on R1: "make the orb pulse faster"
3. Verify: "Working on it" TTS fires within ~1s
4. Verify: thinking-mesh.js mtime updates, browser reloads, JARVIS voices completion
5. Direct test: `from orb_bridge import _assert_safe_path; _assert_safe_path("../../etc/passwd")` → ValueError

**Resume signal:** Reply "approved", "partial: [failures]", or "blocked: no R1"
