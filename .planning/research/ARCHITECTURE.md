# Architecture Research — Smithers-First + Agentic Tools

**Project:** The Orb — v1.2 Milestone
**Researched:** 2026-04-03
**Confidence:** HIGH (based on direct source reading of orb_bridge.py, 1389 lines)

---

## Current Data Flow

```
R1 button press
  → PTT daemon (ADB) → HTTP GET /ptt (port 8401)
      → broadcast_ptt() → WebSocket {type: "ptt_toggle"} → frontend

User speaks (PTT held)
  → Browser mic → PCM bytes → WebSocket (port 8400)

audio_end received
  → transcribe_browser_pcm() → AssemblyAI → text
  → process_query(text, voice, model, tier)
      → check smithers_triggers / smithers_tools regex (inline)
          → YES: route_smithers() [60s timeout, Smithers :8200]
          → NO:  route_query()
                  → deity voice? → route_deity() [LLM Router :8100, 30s]
                  → JARVIS voice? → route_llm_direct() [LLM Router :8100, 30s]
      → pick_wireframe(reply) → WebSocket {type: "wireframe"}
      → get_tts_audio(reply, voice_id) → ElevenLabs Flash v2.5
      → stream PCM audio bytes → WebSocket → R1 browser plays audio
      → {type: "done", has_follow_up: bool}
```

### Key Existing Structures

**conversation_history:** `defaultdict(list)` keyed by voice name. Max 6 turns (12 messages). Each route function manages its own history append independently.

**Voice selection:** `client_voice` is a session-level variable set by `{type: "set_voice"}`. The `voice` key on the outbound `response` message controls what the frontend renders.

**VOICES dict:** Maps voice name → ElevenLabs voice ID. All TTS calls use `VOICES.get(voice, VOICES["jarvis"])["id"]`. This is the single source of truth for voice ID resolution. 13 voices total: jarvis + 12 deities.

**Smithers trigger logic:** A regex in `process_query()` lines 744-757 decides whether to call `route_smithers()` or fall through to `route_query()`. There is no pre-classification step — the decision is made with inline regexes and an early-return block that hardcodes `voice = "jarvis"` for Smithers responses.

**Agentic infrastructure:** The `anthropic_client` is already instantiated at module level (line 45, used for vision). The `anthropic` package is already imported. No additional package installation needed for agentic tool_use.

**ADB reload:** No ADB-based frontend reload exists today. The ADB shell command pattern is well-established throughout the file (lines 604-635, 1295-1354). Reloading the R1 browser is achievable with `adb shell am force-stop org.mozilla.firefox` followed by the URL reopen.

---

## Proposed Changes

### New Components

#### 1. `classify_intent(text: str, current_voice: str) -> dict`

A new async function in `orb_bridge.py`. This is NOT a Smithers endpoint call — Smithers at 60s+ latency cannot meet the <300ms classification budget.

**Implementation:** Call LLM Router directly at `:8100` with a minimal classification prompt. Use the cheapest/fastest model tier (haiku or equivalent). Return `{"route": "smithers"|"jarvis"|"goddess", "voice": str, "build_intent": bool}`.

**Why not a Smithers /classify endpoint:** Smithers' 60s+ response time makes it structurally incompatible with a pre-flight classifier. The classifier must be a thin LLM call through LLM Router using a small model and a one-shot classification prompt (approximately 200 tokens input, 50 tokens output).

**Why not regex-only:** The three-way routing (smithers/jarvis/goddess) and BUILD_INTENT detection require semantic understanding that regexes cannot reliably provide. The existing regex approach was an acknowledged workaround.

**Classification prompt design:**
```
Classify this voice query. Reply ONLY with JSON on one line.
{"route": "smithers"|"jarvis"|"goddess", "voice": "jarvis"|"zeus"|"athena"|"poseidon"|..., "build_intent": true|false}

route: smithers if calendar/schedule/Slack/Obsidian/tasks/send message. goddess if mythology/gods/oracle/prophecy/divine/sacred. jarvis otherwise.
build_intent: true only if user wants to modify, build, or reload the JARVIS frontend interface.
voice: current voice unless query clearly matches a specific deity (then name that deity).

Current voice: {current_voice}
Query: {text}
```

**Timeout:** 3 seconds hard cap. On timeout or JSON parse error, fall back silently to `{"route": "jarvis", "voice": current_voice, "build_intent": False}`. No error message to the user.

#### 2. `run_agentic_loop(websocket, text: str, voice: str)`

A new async function. Called when `classify_result["build_intent"] == True`.

**Tool definitions (4 tools):**
- `read_file(path: str)` — reads files. Sandbox check: path must resolve within the `r1-frontend/` directory. Reject with error message if outside.
- `write_file(path: str, content: str)` — writes files, same sandbox restriction.
- `exec_shell(command: str)` — explicit allow-list only: `["npm run build", "git status", "git diff", "python -m pytest"]`. Reject anything else with a descriptive error returned to the LLM.
- `reload_frontend()` — no arguments. Runs ADB force-stop + URL reopen using the existing `R1_SERIAL` global.

**Loop structure (bounded):**
```python
MAX_ITERATIONS = 10
iteration = 0
while iteration < MAX_ITERATIONS:
    response = anthropic_client.messages.create(
        model="claude-sonnet-4-20250514",
        tools=[...tool_defs],
        messages=messages
    )
    if response.stop_reason == "end_turn":
        break
    # execute tool calls, append results, continue
    iteration += 1
```

**Voice confirmation:** When the loop completes, the final assistant text is sent through `get_tts_audio()` and streamed back — same pipeline as any other query response.

**UI feedback during loop:** Send `{type: "thinking", voice: voice}` before the loop starts. Optionally send `{type: "response", text: "Reading file...", voice: voice, model: "agentic"}` for each tool call so the user can see progress in the frontend.

#### 3. `execute_tool(tool_name: str, tool_input: dict) -> str`

A synchronous helper called inside `run_agentic_loop()`. Returns a string result to append to the Anthropic messages list as a `tool_result` block.

Handles the four tools with all sandbox enforcement. The `reload_frontend` tool wraps the existing ADB pattern from `_startup_r1()`.

### Modified Components

#### `process_query()` — Insert Classification Pre-Flight

**Current structure (simplified):**
```python
def process_query(ws, text, voice, model, tier):
    if smithers_triggers.search(text) or smithers_tools.search(text):
        voice = "jarvis"          # hardcoded override
        result = await route_smithers(...)
        # early return after TTS
        return
    # fast path
    result = await route_query(text, voice, model, tier)
    # TTS + done
```

**New structure:**
```python
async def process_query(ws, text, voice, model, tier):
    classification = await classify_intent(text, voice)
    
    # Voice-role binding
    if classification["voice"] != voice:
        voice = classification["voice"]
        await ws.send(json.dumps({"type": "voice_changed", "voice": voice}))
    
    # Agentic path — short-circuits routing entirely
    if classification["build_intent"]:
        await run_agentic_loop(ws, text, voice)
        return
    
    await ws.send(json.dumps({"type": "thinking", "voice": voice}))
    
    # Routing
    route = classification["route"]
    if route == "smithers":
        result = await route_smithers(text, voice, None, None)
    elif route == "goddess":
        result = await route_deity(text, voice, model, tier)
    else:
        result = await route_llm_direct(text, voice, model or "anthropic/claude-sonnet-4.5", tier)
    
    # [TTS + wireframe + done pipeline — unchanged]
```

The inline regex block (`smithers_triggers`, `smithers_tools`, lines 744-757) and its early-return block are deleted. The duplicate TTS/done code in the early-return path is eliminated — there is now one TTS path at the end of `process_query()`.

**Voice override:** When classification switches voice, send `{type: "voice_changed", voice: classified_voice}` before `{type: "thinking"}`. Update local `voice` variable. The `VOICES` dict and `get_tts_audio()` call at the end remain unchanged.

#### `route_smithers()`, `route_deity()`, `route_llm_direct()` — No Changes

These functions are stable. All new behavior routes through them via `process_query()`. Their internal fallback chains are preserved.

#### `conversation_history` — No Changes

History is keyed by voice name. When classification switches voice, the new voice gets its own history automatically (defaultdict behavior). The agentic loop does NOT touch conversation_history — its messages list is local and ephemeral.

#### `HealthHandler` — No Changes for Core Features

Port conflict fix (8000 vs 8300), Mission Control (:4000) restore, JARVIS web (:5556), Health Dashboard (:6001) are operational fixes. Handle in Phase 4, separate from feature PRs.

### Data Flow Changes

```
BEFORE:
  text → process_query()
       → [inline regex] → route_smithers() [early return path]
                       OR route_query() [fast path]
       → TTS → done

AFTER:
  text → classify_intent() [<300ms, LLM Router cheap model]
       → build_intent? → run_agentic_loop() → tool execution → TTS confirm → done
       → route == "smithers" → route_smithers()
       → route == "goddess"  → route_deity(text, classified_voice)
       → route == "jarvis"   → route_llm_direct()
       → [single TTS + wireframe + done pipeline]
```

**New WebSocket message types emitted (net additions only):**
- `{type: "tool_call", tool: "read_file", path: "..."}` — agentic loop progress (optional, for UI feedback)
- `{type: "tool_result", tool: "write_file", success: bool}` — tool execution result

No existing WebSocket message types are removed or renamed. The frontend does not require changes for Phases 1-2. Phase 3 (agentic) may warrant frontend display of tool call progress, but the feature works without it.

---

## Build Order

### Phase 1: Classifier Shim (foundation — build first)

Build `classify_intent()` and integrate it into `process_query()`.

**Deliverables:**
- `classify_intent()` function with LLM Router call, 3s timeout, fallback
- Remove inline regex block from `process_query()`
- Replace early-return Smithers path with classifier-driven dispatch
- Single TTS/done path at end of `process_query()`

**Test gates:**
- "What's on my calendar?" routes to smithers
- "Tell me about Zeus" routes to goddess, voice = zeus
- "What time is it?" routes to jarvis
- Smithers tool path still reaches :8200
- JARVIS fast path still hits LLM Router
- Classifier failure (LLM Router down) falls back silently, response still works

**Why first:** Phase 2 (voice-role) and Phase 3 (agentic) both consume classifier output. Neither can be built independently without it. This is also the highest-risk component — measuring actual p95 latency of classify_intent() must happen here before committing to the architecture.

### Phase 2: Voice-Role Binding (depends on Phase 1, small change)

Add voice override logic in `process_query()` using `classification["voice"]`.

**Deliverables:**
- `voice_changed` message sent before `thinking` when classifier overrides voice
- Local `voice` variable updated before routing
- Validate that VOICES dict has all expected voice names (it does: 13 voices)

**Why second:** Depends on classifier. Is a 3-4 line change. Validates that the classifier is returning useful voice recommendations before the agentic loop adds complexity. Ship and confirm in production on R1 before proceeding.

### Phase 3: Agentic Tools (depends on Phase 1)

Build `run_agentic_loop()` and `execute_tool()`.

**Deliverables:**
- Tool schema definitions (Anthropic tool_use format)
- `read_file`, `write_file`, `exec_shell`, `reload_frontend` implementations
- Sandbox enforcement on file paths and shell commands
- Loop integration in `process_query()` via `build_intent` flag
- Bounded loop (10 iterations max)

**Test gates (must run against real R1 hardware):**
- "Add a red border to the thinking bubble" → reads index.html → writes change → reloads R1 browser → voice confirms
- Sandbox rejection: attempt to read `/etc/passwd` → loop receives error, does not proceed
- Shell allow-list: attempt `rm -rf /` → rejected, loop receives error

**Why third:** Most complex feature. Has the most failure modes. Should not be in the same PR as Phase 1+2. The ADB reload path cannot be unit-tested without hardware.

### Phase 4: System Health Fixes (independent, last)

Fix port conflict between orb-backend :8000 vs expected :8300. Restore Mission Control (:4000), JARVIS web (:5556), Health Dashboard (:6001).

**Why last:** Independent of the new features. Does not block Phases 1-3. Mixing operational fixes with feature work risks masking regressions.

---

## Key Design Decisions

**Decision 1: Classifier lives in orb_bridge.py, not as a Smithers /classify endpoint.**
Smithers at 60s+ cannot be a pre-flight gate. The classifier is a direct LLM Router call. If Smithers adds a fast /classify endpoint later, the swap is a one-line URL change.

**Decision 2: The classifier always returns a voice recommendation.**
This unifies the hardcoded `voice = "jarvis"` override in the current Smithers trigger path (lines 749-757) with new mythology routing. One `voice` key replaces the scattered inline overrides.

**Decision 3: BUILD_INTENT is a short-circuit, not a route variant.**
The agentic loop is a separate execution path, not a new value in `route`. This keeps `run_agentic_loop()` self-contained and prevents tool execution artifacts from leaking into `conversation_history`.

**Decision 4: `exec_shell` uses an allow-list, not a denylist.**
Safer by default. The allow-list is `["npm run build", "git status", "git diff", "python -m pytest"]`. Any command not on this list is rejected with an explicit error fed back into the Anthropic loop. The LLM can then decide how to proceed without that command.

**Decision 5: Do not modify `route_smithers()`, `route_deity()`, or `route_llm_direct()`.**
All new behavior routes through them. Change surface is limited to `process_query()` and the new functions. This is the lowest-risk approach given the existing fallback chains in each route function.

**Decision 6: `conversation_history` is not passed to the agentic loop.**
The agentic loop is a one-shot task execution, not a conversational turn. Its messages list is created locally, used, and discarded. Mixing it into conversation_history would corrupt the persona's conversational context.

**Decision 7: Classifier fallback must be silent and fast.**
If `classify_intent()` fails, fall back to current behavior with no user-visible error. Log internally. This preserves voice UX when LLM Router is degraded.

---

## Integration Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Classifier adds >300ms latency | HIGH | Use cheapest model tier (haiku), minimal prompt, 3s hard timeout with silent fallback |
| Classifier misroutes mythology as Smithers | MEDIUM | Tune prompt with examples; user can still say "ask Smithers..." to force-route |
| Agentic loop runs indefinitely | HIGH | Hard cap at 10 tool call iterations; voice error response if exceeded |
| exec_shell sandboxing bypassed via path traversal | HIGH | Explicit allow-list only; no substring matching of commands |
| ADB reload fails silently in agentic loop | MEDIUM | tool result must include success/failure bool; loop reports failure in voice response |
| Port conflict (8000 vs 8300) causes content image fetch to fail | LOW | Already failing silently (line 928: `pass`); fix in Phase 4 |
| Duplicate TTS path removed, edge case missed | MEDIUM | Read the full early-return block (lines 760-784) before deleting; validate against test matrix |

---

## Sources

- Direct reading of `/Volumes/AI_WORKSPACE/esp32-jarvis/bridge/orb_bridge.py` (full file, 1389 lines) — HIGH confidence
- `/Users/claw2501/.planning/PROJECT.md` — milestone v1.2 target features — HIGH confidence
- Anthropic tool_use API: pattern already used in file via `anthropic_client` for vision (lines 960-984) — HIGH confidence
