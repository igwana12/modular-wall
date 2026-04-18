---
phase: 20-pantheon-oracle-expansion
plan: "02"
subsystem: oracle-rag
tags: [rag, chromadb, orphic, dual-collection, myth-vectors]
dependency_graph:
  requires: [oracle-rag-live]
  provides: [orphic-rag-live, dual-collection-routing]
  affects: [oracle-pipeline, reading-router]
tech_stack:
  added: [orphic_wisdom-chromadb-collection]
  patterns: [dual-collection-rag-routing, orphic-theme-keyword-detection]
key_files:
  created: []
  modified:
    - /Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py
  data_deployed:
    - /Volumes/Extreme Pro/ACTIVE/pantheon-training-data/orphic.db
    - ~/.jarvis/myth-vectors/orphic_wisdom (ChromaDB collection, 376 chunks)
decisions:
  - "orphic_wisdom collection created WITH EF (all-mpnet-base-v2) since it is a new collection — no persisted EF conflict"
  - "Orphic query uses query_texts= (not query_embeddings=) because EF is registered on collection"
  - "Hellenic collection (myth_notes) query pattern unchanged — still uses pre-embedded query_embeddings="
  - "Orphic routing only fires when ORPHIC_THEME_KEYWORDS intersect query tokens — non-Orphic queries unaffected"
metrics:
  duration: "~15 minutes"
  completed: "2026-04-18T23:10:00Z"
  tasks_completed: 3
  tasks_total: 3
  files_modified: 2
requirements_completed: [ORPHIC-DEPLOY-01, ORPHIC-DEPLOY-02, ORPHIC-DEPLOY-03, ORPHIC-SHEETS-01]
---

# Phase 20 Plan 02: Orphic Tradition Deployment + Dual-Collection RAG Summary

Deployed orphic.db (408KB, 376 RAG chunks) alongside pantheon.db, ingested all 376 Orphic chunks into a new orphic_wisdom ChromaDB collection using all-mpnet-base-v2, and added dual-collection routing to rag_retriever.py — Orphic-themed oracle queries now return source="orphic" results from the Orphic tradition corpus without affecting Hellenic RAG.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Deploy orphic.db + ingest orphic_wisdom ChromaDB collection (376 chunks) | ea78a99 | orphic.db (data), ~/.jarvis/myth-vectors/orphic_wisdom (ChromaDB) |
| 2 | Add dual-collection retrieval routing to rag_retriever.py | ea78a99 | rag_retriever.py |
| 3 | Add Orphic tabs to Google Sheets copy | 121173f | docs/oracle/orphic-sheets.md (sheet URL recorded) |

## Verification Results

- `orphic.db` at `/Volumes/Extreme Pro/ACTIVE/pantheon-training-data/orphic.db` — 408KB, confirmed
- `orphic_wisdom` collection count: 376 (>= 370 threshold) — PASS
- `check_rag_ready()` returns True (Hellenic myth_notes unaffected) — PASS
- `retrieve_oracle_wisdom('The Wheel', ['Death'], ['dionysus', 'soul'])` returns 6 results, 1 Orphic — PASS
- Full dual smoke test: "Hellenic RAG: OK | Orphic chunks: 376 | Orphic in results: 1 | ALL CHECKS PASS"

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Chunk files are .txt not .json — ingest script adapted**
- **Found during:** Task 1 extraction
- **Issue:** The plan's ingest script template assumed `.json` chunk files. The actual orphic_chunks.tar.gz contains 376 `.txt` plain-text files in a subdirectory (`orphic_chunks/orphic_chunks/`).
- **Fix:** Adapted ingest script to `glob("*.txt")`, read as plain text, derive chunk_id from filename stem, build minimal metadata with `source="orphic"` and `chunk_type` from filename suffix.
- **Files modified:** `/tmp/ingest_orphic.py` (ephemeral, not committed)
- **Commit:** ea78a99

**2. [Rule 1 - Design] Orphic collection uses EF-registered query_texts= not pre-embedded query_embeddings=**
- **Found during:** Task 2 implementation
- **Issue:** The critical context from 20-01 warns against passing EF when retrieving myth_notes because it was persisted with `default` EF. However, orphic_wisdom is a NEW collection created WITH an explicit `all-mpnet-base-v2` EF — so `get_orphic_collection()` can retrieve it with the same EF and use `query_texts=` directly.
- **Fix:** `get_orphic_collection()` registers the EF and `orphic_col.query(query_texts=[...])` is used in the routing block. This is correct for this collection.
- **Files modified:** `rag_retriever.py`
- **Commit:** ea78a99

## Google Sheets

Working copy with Orphic tabs: https://docs.google.com/spreadsheets/d/1ZuC66isqR1BkmMZF-48P76gLIcjSEApPdHzlsu0FbvY/edit

- "Orphic Entities" tab: 33 rows from orphic_entities_tab.csv
- "Orphic Ideas" tab: 16 rows from orphic_ideas_tab.csv
- Master sheet unchanged (T-20-02-02 threat mitigation confirmed)

## Known Stubs

None.

## Threat Flags

None — all changes are local filesystem operations. No new network endpoints introduced. orphic.db is read-only during ingest (new standalone file, pantheon.db untouched).

## Self-Check: PASSED

- `/Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py` — exists, modified
- `/Volumes/Extreme Pro/ACTIVE/pantheon-training-data/orphic.db` — exists (408KB)
- Commit ea78a99 — in jarvis-sandbox git log
- `check_rag_ready()` returns True (verified in smoke test)
- `orphic_wisdom` collection count 376 (verified)
