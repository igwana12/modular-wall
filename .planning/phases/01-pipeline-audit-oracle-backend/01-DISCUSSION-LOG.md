# Phase 1: Pipeline Audit + Oracle Backend - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md -- this log preserves the alternatives considered.

**Date:** 2026-03-28
**Phase:** 01-pipeline-audit-oracle-backend
**Areas discussed:** Audit scope, Backend identity, Deity config system, Reading pipeline flow

---

## Audit Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Targeted audit | 1-2 days. Check running services, map 5 services + Content DB + voices. Document gaps with severity. | Yes |
| Full inventory | 3-5 days. Catalog every file, endpoint, integration. Comprehensive but slow. | |
| Smoke test only | Half day. Try end-to-end reading, fix what breaks. | |

**User's choice:** Targeted audit (Recommended)
**Notes:** None -- user accepted recommended approach.

---

## Backend Identity

| Option | Description | Selected |
|--------|-------------|----------|
| New FastAPI at :8300 | Clean separation. Smithers stays orchestrator, orb-backend handles readings. | Yes |
| Extend Smithers :8200 | Add reading endpoints to existing Smithers. Fewer services but couples logic. | |
| You decide | Claude picks based on architecture. | |

**User's choice:** New FastAPI at :8300 (Recommended)
**Notes:** None -- clean separation preferred.

---

## Deity Config System

| Option | Description | Selected |
|--------|-------------|----------|
| JSON files per god | gods/zeus.json etc. Easy to edit, version control. | Yes |
| Single config file | One gods.json with all 21. Simpler but harder to manage. | |
| Database | Full CRUD. Overkill for 21 entries. | |

**User's choice:** JSON files per god (Recommended)
**Notes:** None -- file-per-god for easy management.

---

## Reading Pipeline Flow

| Option | Description | Selected |
|--------|-------------|----------|
| Streaming chain | Intent -> RAG -> Claude streaming -> TTS per sentence -> SSE. Progressive, <1s first audio. | Yes |
| Batch then stream | Full text first, then stream TTS. 5-10s delay. | |
| You decide | Claude designs optimal pipeline. | |

**User's choice:** Streaming chain (Recommended)
**Notes:** Research strongly supports this. Batch creates 2-4s dead air.

---

## Claude's Discretion

- FastAPI project structure and module organization
- Error handling and retry logic
- Logging and monitoring approach
- Test strategy

## Deferred Ideas

None -- discussion stayed within phase scope.
