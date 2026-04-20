---
phase: 21
title: Orphic Dedicated Endpoint
status: context-complete
date: 2026-04-19
---

# Phase 21 — Decisions

## Response Schema
**Decision:** Full LLM synthesis — not raw RAG chunks.
The endpoint calls an LLM and returns a structured McKee 4-beat JSON response:
```json
{
  "inciting_incident": "...",
  "crisis": "...",
  "climax": "...",
  "resolution": "..."
}
```
Each field is prose (1-3 sentences). The LLM synthesizes the Orphic RAG chunks into a narrative arc.

## LLM Prompt
**Decision:** New Orphic-specific system prompt — do NOT reuse `ORACLE_SYSTEM_PROMPT` ("Digital Pythia") from `oracle.py`.
The Orphic prompt should be distinct: mystery tradition voice, chthonic register, underworld cosmology. Inject the deity's SOUL file content as persona context. Structure the LLM response explicitly as 4 named beats.

## SOUL Persona Injection
**Decision:** `deity` key is accepted from the request body. If absent or blank, silently fall back to the Goddess voice (`SOUL-Goddess.md`). No 422 on missing deity — only on theme gate failure (see below).

## Theme Gate
**Decision:** Minimum 2 keyword matches from `ORPHIC_THEME_KEYWORDS` required to pass the gate. Single-word hit is insufficient. `force=true` bypasses the gate entirely (no minimum required, no logged warning — silent bypass).

---

## Locked Implementation Choices

| Area | Decision |
|------|----------|
| Endpoint path | `POST /api/oracle/orphic` |
| Retrieval | `retrieve_oracle_wisdom(orphic_only=True)` — no Hellenic fallback |
| LLM output | McKee 4-beat JSON: inciting_incident / crisis / climax / resolution |
| System prompt | New Orphic-specific prompt (not Digital Pythia) |
| Deity injection | From request body; default = Goddess voice if absent |
| Theme gate | ≥2 ORPHIC_THEME_KEYWORD matches OR `force=true` |
| Gate failure response | 422 with message explaining theme gate |
| Integration test | POST with Dionysus theme (≥2 keywords) → 4-beat JSON |

## Deferred / Out of Scope
- Streaming LLM response (batch only for Phase 21)
- Orphic endpoint in the frontend UI (backend only)
- Per-deity SOUL file caching (load fresh per request)
