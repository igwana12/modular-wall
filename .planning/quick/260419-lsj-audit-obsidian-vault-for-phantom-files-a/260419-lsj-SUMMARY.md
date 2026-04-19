---
phase: quick-260419-lsj
plan: 01
subsystem: scripts
tags: [obsidian, audit, cleanup, vault, scripts]
key-files:
  created:
    - ~/scripts/obsidian-audit.py
    - ~/scripts/obsidian-cleanup.py
decisions:
  - "Scripts committed to home (~) git repo, not worktree — ~/scripts/ is outside the worktree boundary"
  - "Orphaned attachment detection uses basename matching (lowercased) to handle vault reorganization"
  - "Cleanup uses rename/move to ~/obsidian-phantom-trash/ — never hard delete"
metrics:
  completed: "2026-04-19"
---

# Quick Task 260419-lsj: Audit Obsidian Vault for Phantom Files — Summary

Two Python scripts that audit the Obsidian vault for broken wikilinks and orphaned attachments, with a safe dry-run-first cleanup path.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Write obsidian-audit.py | 11ff1f1 | ~/scripts/obsidian-audit.py |
| 2 | Write obsidian-cleanup.py | bb6bcce | ~/scripts/obsidian-cleanup.py |

## What Was Built

**obsidian-audit.py** — Full vault scanner:
- Collects all `.md` notes and attachment files via `pathlib.Path.rglob`
- Extracts `[[wikilinks]]` with regex, checks each target against the note basename set (lowercased, case-insensitive)
- Detects orphaned attachments by comparing all attachment basenames against references found in wikilinks, markdown links `[text](path)`, and bare filename patterns
- Outputs human-readable report to stdout + JSON sidecar to `~/scripts/obsidian-audit-results.json`
- `--vault` and `--json-out` CLI args; handles paths with spaces via `pathlib`

**obsidian-cleanup.py** — Safe cleanup:
- Reads `obsidian-audit-results.json` (errors with "Run obsidian-audit.py first" if missing)
- Default: dry-run — shows file list + total size, prints "Dry run complete. Pass --execute to delete."
- `--execute`: prompts `Type 'yes' to delete N files:`, then moves files to `~/obsidian-phantom-trash/` preserving directory structure
- Hard guards: refuses to touch `.md` files; refuses to touch anything outside vault path
- Writes deletion log to `~/scripts/obsidian-cleanup-log.txt`

## Deviations from Plan

**1. [Rule 3 - Blocker] Committed to home git repo, not worktree**
- Scripts live in `~/scripts/` which is outside the worktree at `~/.claude/worktrees/agent-a782ae16`
- Fix: Used `git -C ~` to commit from the home directory git repo
- Encountered `index.lock` stale locks (twice) — removed with `rm ~/.git/index.lock` each time

## Self-Check

- [x] `~/scripts/obsidian-audit.py` exists
- [x] `~/scripts/obsidian-cleanup.py` exists
- [x] Commit 11ff1f1 exists in home repo
- [x] Commit bb6bcce exists in home repo
- [x] Both scripts pass `--help` without error

## Self-Check: PASSED

## Checkpoint (Task 3)

Human verification completed 2026-04-19. User ran both scripts, confirmed 10 known orphaned PDFs appeared in report, and approved. Status: COMPLETE.
