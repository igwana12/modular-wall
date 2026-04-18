---
phase: 20-pantheon-oracle-expansion
plan: "01"
subsystem: oracle-rag
tags: [rag, chromadb, oracle, myth-vectors, fix]
dependency_graph:
  requires: []
  provides: [oracle-rag-live]
  affects: [oracle-pipeline, reading-router]
tech_stack:
  added: []
  patterns: [pre-embed-with-sentence-transformers, chromadb-no-ef-conflict]
key_files:
  modified:
    - /Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py
decisions:
  - "Use get_collection() without EF to avoid ChromaDB persisted/new EF conflict"
  - "Pre-embed queries with SentenceTransformer(all-MiniLM-L6-v2) and pass query_embeddings"
  - "Detect embedding model from collection metadata['model'] at runtime"
metrics:
  duration: "~10 minutes"
  completed: "2026-04-18T22:35:01Z"
  tasks_completed: 1
  tasks_total: 1
  files_modified: 1
requirements_completed: [RAG-PATH-01, RAG-PATH-02]
---

# Phase 20 Plan 01: Fix Oracle RAG Path + Collection Constants Summary

Fixed three broken constants and one EF conflict in rag_retriever.py so the oracle RAG pipeline connects to the real 218-chunk myth_notes ChromaDB at ~/.jarvis/myth-vectors — check_rag_ready() now returns True and retrieve_oracle_wisdom() returns myth chunks on query.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Fix CHROMA_PATH, COLLECTION_NAME, MIN_DOC_COUNT + EF conflict | d02b9e6 | rag_retriever.py |

## Verification Results

- `check_rag_ready()` returns True (218 docs >= MIN_DOC_COUNT 200)
- `retrieve_oracle_wisdom('Prometheus', ['Hero', 'Trickster'], ['fire', 'theft'])` returns 4 chunks
- All four constant/grep acceptance criteria pass

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] ChromaDB EF conflict on collection retrieval**
- **Found during:** Task 1 verification
- **Issue:** The myth_notes collection was persisted with ChromaDB's built-in `default` EF type. Passing any named `SentenceTransformerEmbeddingFunction` to `get_collection()` or `get_or_create_collection()` raises: "Embedding function conflict: new: sentence_transformer vs persisted: default."
- **Fix:** Changed `get_oracle_collection()` to call `client.get_collection(name=COLLECTION_NAME)` with no EF argument. Updated `retrieve_oracle_wisdom()` to detect `embed_model` from `collection.metadata['model']`, load a `SentenceTransformer` singleton, pre-embed each query string, and pass `query_embeddings=` instead of `query_texts=`.
- **Files modified:** `/Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py`
- **Commit:** d02b9e6

## Known Stubs

None.

## Threat Flags

None — changes are local filesystem path redirections with no new network surface.

## Self-Check: PASSED

- `/Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py` — exists, modified
- Commit d02b9e6 — exists in `/Users/claw2501/services/jarvis-sandbox` git log
- `check_rag_ready()` verified True in CI run above
