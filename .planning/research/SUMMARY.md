# Research Summary — v1.2 Smithers-First + JARVIS Agentic Tools

**Project:** The Orb — JARVIS Bridge
**Milestone:** v1.2 Smithers-First Architecture + JARVIS Agentic Tools
**Researched:** 2026-04-03
**Confidence:** HIGH (all findings verified against live system and codebase)

---

## Executive Summary

v1.2 adds three capabilities to `orb_bridge.py`: a unified intent classifier that replaces two scattered inline regex checks, voice-role binding that locks the correct deity voice before any async work begins, and an agentic tool loop that lets JARVIS read/write r1-frontend files and reload Chrome on the R1 hardware. All three features are achievable with zero new pip dependencies — `anthropic==0.86.0`, `websockets==16.0`, and `httpx==0.28.1` are already installed. The highest-risk component is the classifier, which sits on the latency-critical hot path before every voice response.

The central architectural tension in this milestone is the classifier implementation. ARCHITECTURE.md initially recommended an LLM Router call with a classification prompt. STACK.md measured that path at 1,667ms minimum for Haiku — more than 5x the 300ms budget. The resolution is unambiguous: **regex wins**. Four routes (smithers, deity, build, jarvis) have non-overlapping keyword signals that a 30,000-line-per-second regex handles with headroom to spare. The LLM Router is reserved for actual answer generation, not classification. Any future need for semantic routing can be solved at that time with a dedicated lightweight endpoint.

The second tension — FEATURES.md flagging "fix port conflict first" versus PITFALLS.md treating health fixes as last-priority — resolves cleanly once the actual port landscape is understood. The 8000/8300 pair are two separate legitimate services, not a conflict. The real conflict is Chrome Helper occasionally occupying the bridge's own port 8400. This is a startup-time race condition, not a blocking issue for feature development. The recommended fix (auto-increment fallback at startup) takes 8 lines and can be merged in the same PR as the classifier. System health restoration of Mission Control, JARVIS web, and Health Dashboard is genuinely independent and belongs in its own phase after the feature work is stable.

---

## Stack Additions

| Component | Status | What It Is | Integration Point |
|-----------|--------|-----------|-------------------|
| `classify_intent()` | New function | Regex router returning `{route, voice, confidence}` | Top of `process_query()`, replaces lines 744-756 |
| `process_build_intent()` | New coroutine | Anthropic tool_use agentic loop, 5-iteration cap | Called when `route == "build"` |
| `execute_tool()` / `dispatch_tool()` | New helper | Dispatches read_file, write_file, exec_shell, reload_frontend | Called inside agentic loop per tool_use block |
| `reload_r1_frontend()` | New async helper | CDP WebSocket `Page.reload` via ADB-forwarded port 9222 | Called by `reload_frontend` tool; reuses `R1_SERIAL` global |
| `_find_free_port(start)` | New startup helper | Scans 8400-8409, returns first free port | Module startup, replaces hardcoded `PORT = 8400` |
| `anthropic_client` | Already exists | Used for vision (line 45); extend for tool_use | No change needed — API already imported |
| `websockets` | Already installed v16.0 | CDP WebSocket connection | New usage in `reload_r1_frontend()` |
| `httpx` | Already installed v0.28.1 | CDP tab discovery | New usage in `reload_r1_frontend()`, reuses existing client pattern |

**Zero new pip installs required.**

---

## Feature Table Stakes

### Smithers-First Routing

| Must Have | Rationale |
|-----------|-----------|
| <300ms classifier latency | Sits before every voice response; any overhead compounds with STT + LLM + TTS |
| Route priority: smithers > deity > build > jarvis | "Schedule a call with Zeus" must route to Smithers, not deity |
| Silent fallback on classifier failure | LLM Router degradation must not surface as user-visible errors |
| Voice locked before first `await` | Eliminates mid-function voice switches and the duplicate TTS early-return path |
| Smithers reached at :8200 for memory/Slack/Obsidian intents | The Smithers path is preserved — only the triggering mechanism changes |

### Voice-Role Binding

| Must Have | Rationale |
|-----------|-----------|
| `voice_changed` WebSocket message sent before `thinking` | Frontend needs to update avatar before processing animation starts |
| Voice validated against `VOICES.keys()` before use | Hallucinated voice names cause KeyError and drop the WebSocket connection |
| History keyed by session, not voice name | Current design loses context when voice switches mid-conversation |
| ElevenLabs session closed before opening new voice session | Concurrent TTS WebSocket sends corrupt the connection |

### JARVIS Agentic Tools

| Must Have | Rationale |
|-----------|-----------|
| Sandbox: `Path.resolve()` assertion on all file paths | Path traversal is a documented CVE pattern (CVE-2025-53109) |
| `exec_shell` allowlist only, `shell=False` | Prompt injection via voice has 94.4% success rate against LLM agents without Python-level enforcement |
| Hard cap: `MAX_AGENTIC_ITERATIONS = 5`, 30s wall-clock timeout | Uncapped loops drain credits and hold WebSocket open silently |
| Voice acknowledgement before loop starts ("Working on it") | 10-40s loops with no feedback feel like dead hardware |
| `asyncio.Lock` on all TTS sends per client | Concurrent sends to same WebSocket client corrupt connection state |
| ADB subprocess wrapped in `run_in_executor` | `adb` commands block event loop for 800ms-3s if called synchronously |

---

## Recommended Build Order

The three researchers produced two different orderings. ARCHITECTURE.md said classifier → voice-role → agentic → health. FEATURES.md said health first. The synthesized ordering below resolves this by separating "what unblocks the features" from "what is independent."

### Step 1: Regex Classifier + Voice Lock + Port Fix (1 PR)

Build `classify_intent(text)` using the STACK.md regex patterns with route priority: smithers > deity > build > jarvis. Wire it into the top of `process_query()`. Delete the inline `smithers_triggers`/`smithers_tools` block (lines 744-756) and its early-return TTS path — there is now one TTS path at the end of `process_query()`. Add the 8-line `_find_free_port()` startup helper. Add `voice_changed` WebSocket message when classifier overrides voice. Switch `conversation_history` keying from voice name to session/connection object.

**Why first:** Steps 2 and 3 consume classifier output — nothing else can be built without it. This is the highest-risk change because it touches the hot path for every voice query. Shipping it alone measures real p95 latency on R1 hardware before adding agentic complexity. The port fix belongs here because it is trivial and prevents a startup failure that would block testing the classifier itself.

**Test gates:**
- "What's on my calendar?" → smithers route, JARVIS voice, reaches :8200
- "Tell me about Zeus" → deity route, zeus voice
- "Add a dark mode toggle" → build route, JARVIS voice
- "Schedule a call with Zeus" → smithers route (smithers > deity priority)
- "What time is it?" → jarvis fallback
- Classifier with LLM Router down → silent fallback, response still completes

### Step 2: Agentic Tool Loop (1 PR, depends on Step 1)

Build `process_build_intent()`, `execute_tool()`, and `reload_r1_frontend()`. Define the four tool schemas (read_file, write_file, exec_shell, reload_frontend). Enforce path sandbox with `Path.resolve()` assertion and exec_shell allowlist at the Python level — never in the LLM prompt. Send voice acknowledgement via existing fast TTS path before dispatching loop as `asyncio.create_task`. Send voice confirmation when loop completes. Cap at `MAX_AGENTIC_ITERATIONS = 5` with a 30s wall-clock timeout. Wrap all ADB calls in `run_in_executor`.

Use `claude-haiku-4-5` for the agentic loop (1,850ms/round measured); reserve Sonnet for the final voice reply if quality warrants it.

**Why second:** Cannot build without the classifier's `route == "build"` flag. The CDP reload path and ADB sandbox require real R1 hardware for meaningful testing.

**Test gates (hardware required):**
- "Add a red border to the thinking bubble" → reads file → writes change → CDP reload → voice confirms
- Path traversal attempt (`../../.ssh/authorized_keys`) → Python assertion rejects before subprocess, loop hears error, does not proceed
- `rm -rf` shell command → allowlist rejects, loop hears error, voice reports failure
- Impossible request → hits iteration 5 → exits loop → voice says "I ran into trouble"
- Voice acknowledgement heard before any tool execution begins

### Step 3: System Health Restoration (1 PR, independent)

Restore Mission Control (:4000), JARVIS web (:5556), Health Dashboard (:6001). Document port registry in CLAUDE.md. Define restart order: stop JARVIS web first, then fix Mission Control, then restart JARVIS web. Set canonical `ORB_BACKEND_PORT=8300` env var and grep-verify zero stale references to 8000 in startup configs. Fix R1 ADB serial caching: per-call lookup with 30s TTL instead of module-load-time capture. Add startup health check (`curl -s http://localhost:8300/health`) before declaring orb-backend live.

**Why last:** Genuinely independent from Steps 1-2. None of these fixes enable or block the classifier or agentic loop. Mixing operational fixes with feature PRs makes regressions harder to attribute. Do this after the features are stable in production on R1.

---

## Watch Out For

### 1. Classifier latency creep — keep it regex, resist LLM temptation

Every voice query now awaits `classify_intent()` before anything else. Haiku measured at 1,667ms on this machine — 5x over the 300ms budget. Regex runs in <0.01ms. The four routes have non-overlapping keyword signals; regex accuracy equals LLM accuracy for these patterns. If future intent ambiguity emerges (e.g., "Zeus said something about my calendar"), extend the regex patterns with a tiebreaker rule — do not add an LLM call.

**Prevention:** Regex only. Synchronous call. Log classifier decisions for the first week to tune coverage. Measure p95 after first production deployment.

### 2. Voice name used as dict key without validation crashes the connection

The classifier returns a `voice` string derived from text matching. If that string is not in `VOICES.keys()` — from hallucination, a new deity name, or a match error — the subsequent `VOICES[voice]` call raises `KeyError` and the WebSocket handler crashes silently. The user hears nothing; the frontend shows an error state.

**Prevention:** One line immediately after the classifier call: `voice = intent["voice"] if intent["voice"] in VOICES else "jarvis"`. Log unexpected voice labels for pattern improvement.

### 3. `conversation_history` keyed by voice name loses context on every route switch

The current design writes history under the voice name. When the classifier routes a mythology question to voice `"zeus"`, the next JARVIS query reads `conversation_history["jarvis"]` and has no memory of the prior exchange. This was a pre-existing design issue that the classifier makes unavoidable to fix.

**Prevention:** Key history by WebSocket connection object or session UUID, not voice name. Voice controls only which ElevenLabs voice ID goes to `get_tts_audio()`. Change this in Step 1 while the classifier is already touching `process_query()` — it is a 2-line change with high correctness impact.

### 4. `write_file` path traversal escapes the sandbox

The LLM generates `write_file("../../.ssh/authorized_keys", malicious_content)`. String prefix checks fail against traversal sequences. This matches the pattern of CVE-2025-53109 and CVE-2025-53110 in the filesystem MCP server.

**Prevention:** `resolved = Path(SANDBOX_ROOT / filename).resolve(); assert str(resolved).startswith(str(SANDBOX_ROOT.resolve()))`. Always `pathlib.Path`, never string concatenation. Return an error string to the LLM on rejection — the loop can decide how to proceed without escalating.

### 5. ADB calls inside `async def` block the event loop

`subprocess.run()` inside an async function is synchronous. ADB commands targeting R1 take 800ms-3s depending on USB responsiveness. Every other connected WebSocket client stalls during that window. The pattern already exists correctly in `get_calendar_context()` — new ADB calls must follow it.

**Prevention:** `await asyncio.get_event_loop().run_in_executor(None, lambda: subprocess.run(..., timeout=5))`. Apply to every new ADB call in `reload_r1_frontend()` and any shell tool inside `execute_tool()`. Add a 5s timeout to every ADB call — ADB hangs silently on device disconnect without one.

---

## Key Decisions for Requirements

These are settled. The requirements author must treat them as constraints, not open questions.

| Decision | Verdict | Evidence |
|----------|---------|----------|
| Classifier implementation | Regex, not LLM | Haiku = 1,667ms measured. Regex = <0.01ms. 30,000x headroom. |
| LLM for agentic loop | `claude-haiku-4-5` | 1,850ms/round. Sonnet adds 4-6s/round for mechanical file I/O that needs no reasoning depth. |
| Smithers role in v1.2 | Memory/Slack/Obsidian only | `/fast` = 17,509ms. `/execute/v2` = 60,000ms+. Not a voice-latency service. |
| New pip dependencies | Zero | anthropic 0.86.0, websockets 16.0, httpx 0.28.1 cover all three feature areas. |
| `exec_shell` sandboxing | Allowlist at Python level, `shell=False` | Prompt injection via voice has 94.4% LLM agent success rate. LLM system prompts are not enforcement. |
| Chrome reload mechanism | CDP `Page.reload` via WebSocket | ADB key events, broadcasts, and javascript: URLs confirmed non-functional on Android Chrome. |
| Port 8400 conflict | Auto-increment fallback `_find_free_port(8400)` | Chrome Helper holds 8400 intermittently. 8-line fix, no service migration needed. |
| `conversation_history` key | Session-based, not voice name | Voice-keyed history drops context on every route switch — unavoidable with a classifier. |
| Port registry (canonical) | 8000=JARVIS unified backend, 8100=LLM Router, 8200=Smithers, 8300=orb-backend | Verified live. Add to CLAUDE.md in Step 3. |
| R1 ADB serial caching | 30s TTL per-call | Module-load-time capture goes stale after R1 reboot, causing silent agentic failures. |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All library versions verified against live pip. Latency figures are measured values, not estimates. |
| Features | HIGH | Classifier patterns derived from existing orb_bridge.py lines 744-756. Change surface precisely mapped from 1,389-line codebase read. |
| Architecture | HIGH | Data flow traced through actual source code. New component boundaries identified against existing function signatures. |
| Pitfalls | HIGH | Combination of direct codebase review and cited CVE/OWASP sources. ADB and ElevenLabs patterns observed in existing code. |

**Overall confidence:** HIGH

### Gaps to Address During Implementation

- **Classifier edge cases:** Real user utterances will have ambiguous phrasing ("Zeus said something about my calendar"). Plan a tuning pass after the first week of production use. Log all classifier route decisions for review.
- **ADB reload confirmation:** PITFALLS recommends verifying a frontend ping-back after reload before voicing success. Decide in Step 2 whether to implement ping-back or accept best-effort confirmation for v1.2.
- **Per-client TTS lock structure:** The `asyncio.Lock` requirement for concurrent TTS sends requires auditing existing send patterns in `process_query()` before wiring in the agentic acknowledgement flow. Confirm the current code does not already have concurrent send paths that need the lock retrofitted.

---

## Sources

### Primary (HIGH confidence)
- `/Volumes/AI_WORKSPACE/esp32-jarvis/bridge/orb_bridge.py` — full codebase review, 1,389 lines, 2026-04-03
- Live latency measurements: Haiku tool_use 1,667-1,883ms; Smithers `/fast` 17,509ms; Smithers `/execute/v2` 60,000ms+; CDP `Page.reload` <100ms
- Live port scan via `lsof` across ports 8000, 8100, 8200, 8300, 8400, 4000, 5556, 6001
- Live pip: `anthropic==0.86.0`, `websockets==16.0`, `httpx==0.28.1`
- Live CDP test: `adb forward tcp:9222` + `ws://localhost:9222/devtools/page/29` → `Page.reload` confirmed

### Secondary (MEDIUM confidence)
- [Anthropic tool_use docs](https://docs.anthropic.com/en/docs/tool-use) — tool schema format, stop_reason patterns, bounded loop guidance
- [Chrome DevTools Protocol Page.reload](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-reload) — WebSocket message format
- [OWASP Top 10 for Agentic Applications 2026](https://www.trydeepteam.com/docs/frameworks-owasp-top-10-for-agentic-applications) — prompt injection success rate, path traversal CVE patterns
- [ElevenLabs Multi-Voice Support Docs](https://elevenlabs.io/docs/eleven-agents/customization/voice/multi-voice-support) — concurrent session behavior

### Tertiary (LOW confidence)
- [Voice AI latency benchmarks — Trillet](https://www.trillet.ai/blogs/voice-ai-latency-benchmarks) — 3s "feels broken" threshold (industry consensus, not measured on this specific stack)
- [macOS launchd stale process behavior](https://github.com/openclaw/openclaw/issues/39074) — port-conflict restart patterns

---

*Research completed: 2026-04-03*
*Ready for roadmap: yes*
