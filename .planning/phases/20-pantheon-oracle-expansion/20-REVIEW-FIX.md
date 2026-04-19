---
phase: 20-pantheon-oracle-expansion
fixed_at: 2026-04-19T01:00:33Z
review_path: /Users/claw2501/.planning/phases/20-pantheon-oracle-expansion/20-REVIEW.md
iteration: 1
findings_in_scope: 4
fixed: 2
skipped: 2
status: partial
---

# Phase 20: Code Review Fix Report

**Fixed at:** 2026-04-19T01:00:33Z
**Source review:** /Users/claw2501/.planning/phases/20-pantheon-oracle-expansion/20-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 4 (WR-01, WR-02, WR-03, WR-04)
- Fixed: 2 (WR-01, WR-02 — committed together, same file section)
- Skipped: 2 (WR-03, WR-04 — code context differs from review)

## Fixed Issues

### WR-01 + WR-02: Correct fallback embedding model and use singleton

**Files modified:** `services/jarvis-sandbox/backend/oracle/rag_retriever.py`
**Commit:** 6d3b8ab
**Applied fix:**

- WR-01: Changed fallback default in `retrieve_oracle_wisdom()` from `"all-MiniLM-L6-v2"` to `"all-mpnet-base-v2"` to match the ARCH-05 locked model (768-dim). Added a dimension guard after model load: reads `get_sentence_embedding_dimension()`, logs an error and returns `[]` if it is not 768. Also corrected the `get_oracle_collection()` docstring which still referenced `all-MiniLM-L6-v2`.

- WR-02: Replaced the unconditional `_ST(embed_model)` instantiation with a branch: when `embed_model == SINGLETON_MODEL_NAME` the existing `get_sentence_model()` singleton is used; only when metadata specifies a different model does it fall back to a fresh load. This restores the intended behavior — no 420MB reload per oracle call under normal conditions.

---

## Skipped Issues

### WR-03: Phase 2 vault scan does not skip files already matched in Phase 1

**File:** `/Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py:328`
**Reason:** code context differs from review — the two-phase vault scan with `priority_dirs`, `scanned_paths`, and the 1500-token threshold described in this finding does not exist in the current file. `retrieve_obsidian_context()` is a single-phase glob scan (50-file limit) with a 500-word ceiling. There is no Phase 1 / Phase 2 structure to fix.
**Original issue:** Phase 2 could re-scan files already visited in Phase 1 due to overlapping directory prefix checks, inflating `matching_lines`.

---

### WR-04: Word-split token approximation re-joins on every match (O(n²))

**File:** `/Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py:317`
**Reason:** code context differs from review — the three `>= 1500` word-count checks described in this finding do not exist in the current file. The only threshold present is `>= 500` (lines 290 and 294), using the same `len(" ".join(matching_lines).split())` pattern. The fix as written (replacing three 1500 checks with a running `word_count` integer) cannot be applied without also changing the threshold value, which would be a behavioural change not sanctioned by the review. The underlying O(n) re-join issue on the 500 threshold is a real but minor concern for a 50-file scan; flagging for human review before changing.
**Original issue:** Running `len(" ".join(matching_lines).split())` inside a nested loop is O(n) per match; reviewer also noted the 1500-word ceiling can be off by 30-50% for mixed-content notes.

---

_Fixed: 2026-04-19T01:00:33Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
