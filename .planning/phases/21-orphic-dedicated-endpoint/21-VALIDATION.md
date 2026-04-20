---
phase: 21
slug: orphic-dedicated-endpoint
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-19
---

# Phase 21 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | pytest + pytest-asyncio |
| **Config file** | `backend/pytest.ini` (`asyncio_mode = auto`) |
| **Quick run command** | `cd /Users/claw2501/services/jarvis-sandbox/backend && python -m pytest tests/test_orphic_endpoint.py -x` |
| **Full suite command** | `cd /Users/claw2501/services/jarvis-sandbox/backend && python -m pytest tests/ -x` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick run command
- **After every plan wave:** Run full suite command
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 21-01-01 | 01 | 1 | MEM-01 | — | N/A | integration | `pytest tests/test_orphic_endpoint.py::test_orphic_endpoint_dionysus_theme -x` | ❌ W0 | ⬜ pending |
| 21-01-02 | 01 | 1 | MEM-02 | — | N/A | integration | `pytest tests/test_orphic_endpoint.py::test_orphic_gate_rejects_off_theme -x` | ❌ W0 | ⬜ pending |
| 21-01-03 | 01 | 1 | MEM-02 | — | N/A | unit | `pytest tests/test_orphic_endpoint.py::test_orphic_force_bypasses_gate -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/test_orphic_endpoint.py` — stubs for all 3 test cases above

*No framework install needed — pytest + pytest-asyncio already present in codebase.*

---

## Manual-Only Verifications

*All phase behaviors have automated verification.*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
