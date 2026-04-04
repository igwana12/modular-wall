---
phase: 14-routing-foundation-voice-identity
plan: 02
subsystem: api
tags: [regex, intent-classification, voice-routing, websocket, esp32-jarvis]

# Dependency graph
requires:
  - phase: 14-01
    provides: session_id parameter on route_query/route_smithers/route_llm_direct/route_deity
provides:
  - classify_intent() regex function with smithers > deity > jarvis priority
  - Unified process_query dispatch eliminating duplicate TTS paths
  - Voice-role binding before any async work
affects: [orb-bridge, jarvis-frontend, deity-voices]

# Tech tracking
tech-stack:
  added: []
  patterns: [regex-intent-classification, voice-before-await, single-tts-pipeline]

key-files:
  created: []
  modified:
    - /Volumes/AI_WORKSPACE/esp32-jarvis/bridge/orb_bridge.py

key-decisions:
  - "Regex classifier (<0.01ms) instead of LLM gate (Haiku at 1,667ms) for zero latency cost"
  - "Smithers > deity priority: 'Schedule a call with Zeus' routes to Smithers, not deity handler"
  - "Jarvis fallback preserves current voice if user is already talking to a deity"

patterns-established:
  - "Intent classification via compiled regex at module level, not inline per-call"
  - "Voice identity locked before first await in process_query"
  - "Single unified TTS pipeline for all routes (no early-return duplicate paths)"

requirements-completed: [ROUT-01, ROUT-02, ROUT-03]

# Metrics
duration: 2min
completed: 2026-04-04
---

# Phase 14 Plan 02: Intent Classifier + Voice Dispatch Summary

**Regex intent classifier with smithers > deity > jarvis priority routing and unified single-TTS-path dispatch in process_query**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-04T03:06:31Z
- **Completed:** 2026-04-04T03:08:26Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Added classify_intent() synchronous regex classifier with three compiled patterns (_SMITHERS_PATTERN, _DEITY_NAMES_PATTERN, _DEITY_DOMAIN_PATTERN)
- Replaced inline smithers_triggers/smithers_tools block and duplicate TTS early-return path with classifier-driven dispatch
- Voice identity now locked before any async work begins via voice_changed WebSocket message
- All widget blocks preserved (Wolfram Alpha, crypto, news, maps, images, deity images)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add classify_intent() regex classifier function** - `b737c9b` (feat)
2. **Task 2: Replace inline Smithers block with classifier-driven dispatch** - `230e2c2` (feat)

## Files Created/Modified
- `/Volumes/AI_WORKSPACE/esp32-jarvis/bridge/orb_bridge.py` - Added classify_intent() function with 3 compiled regex patterns; rewrote process_query to use classifier dispatch with single TTS pipeline

## Decisions Made
- Regex-only classification (<0.01ms) per user decision -- Haiku LLM measured at 1,667ms, 5x over 300ms budget
- Smithers > deity priority ordering ensures productivity queries always route correctly even when they mention deity names
- Jarvis fallback preserves current_voice if already a deity, maintaining conversation continuity

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- classify_intent() is ready for future pattern expansion (add new regex patterns to _SMITHERS_PATTERN, _DEITY_NAMES_PATTERN, or _DEITY_DOMAIN_PATTERN)
- Voice-role binding pattern established for any future voice additions
- Unified TTS pipeline simplifies future response enrichment (all routes share the same path)

---
*Phase: 14-routing-foundation-voice-identity*
*Completed: 2026-04-04*
