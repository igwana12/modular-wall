---
phase: 21-orphic-dedicated-endpoint
fixed_at: 2026-04-20T00:00:00Z
review_path: /Users/claw2501/.planning/phases/21-orphic-dedicated-endpoint/21-REVIEW.md
iteration: 1
findings_in_scope: 4
fixed: 3
skipped: 1
status: partial
---

# Phase 21: Code Review Fix Report

**Fixed at:** 2026-04-20
**Source review:** /Users/claw2501/.planning/phases/21-orphic-dedicated-endpoint/21-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 4 (WR-01 through WR-04)
- Fixed: 3
- Skipped: 1

## Fixed Issues

### WR-01: `response.content[0]` accessed without length check

**Files modified:** `backend/oracle/orphic_reading.py`
**Commit:** 36d6b46
**Applied fix:** Added `if not response.content: raise HTTPException(status_code=502, detail="LLM returned empty content")` guard immediately before the `response.content[0].text.strip()` access at line 225.

---

### WR-02: Multi-word keywords in `ORPHIC_THEME_KEYWORDS` can never match

**Files modified:** `backend/oracle/orphic_reading.py`
**Commit:** 2cbb0cf
**Applied fix:** Replaced the single token-intersection in `check_theme_gate()` with a two-path approach: phrase-based substring match for multi-word keywords (`"gold tablet"`, `"gold tablets"`) and token-intersection for single-word keywords. Results are unioned. Updated the docstring to reflect the new behavior.

---

### WR-03: `anthropic.AsyncAnthropic()` instantiated on every request

**Files modified:** `backend/oracle/orphic_reading.py`
**Commit:** c2e24f8
**Applied fix:** Added module-level `_anthropic_client` singleton and `_get_client()` lazy-initializer after the `logger` declaration. Replaced `client = anthropic.AsyncAnthropic()` inside `synthesize_orphic_reading()` with `client = _get_client()`.

---

## Skipped Issues

### WR-04: Async test functions have no asyncio runner

**File:** `backend/tests/test_orphic_endpoint.py:37-166`
**Reason:** False positive. Verified `asyncio_mode = auto` in `/Users/claw2501/services/jarvis-sandbox/backend/pytest.ini` — pytest-asyncio auto mode collects and runs `async def` test functions without requiring `@pytest.mark.asyncio` markers. Tests are not no-ops; the marker would be redundant.
**Original issue:** All five test functions declared `async def` with no `@pytest.mark.asyncio` decorator.

---

_Fixed: 2026-04-20_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
