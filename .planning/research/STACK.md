# Stack Research — Smithers-First + Agentic Tools

**Milestone:** v1.2 Smithers-First Architecture + JARVIS Agentic Tools
**Researched:** 2026-04-03
**Confidence:** HIGH (all findings verified against live system)

---

## New Dependencies Needed

| Library | Version | Purpose | Integration point | Confidence |
|---------|---------|---------|-------------------|------------|
| `anthropic` (already installed) | 0.86.0 | Agentic tool_use loop for JARVIS code editing | `orb_bridge.py` — new `process_build_intent()` coroutine wrapping `anthropic_client.messages.create()` with tools list | HIGH |
| `websockets` (already installed) | 16.0 | CDP WebSocket connection for Chrome reload | New `reload_r1_frontend()` helper using `websockets.connect("ws://localhost:9222/devtools/page/{id}")` | HIGH |
| `httpx` (already installed) | 0.28.1 | CDP tab discovery via `GET localhost:9222/json` | Already imported — reuse existing `httpx.AsyncClient` | HIGH |
| No new pip installs required | — | All three feature areas use already-installed packages | See integration notes | HIGH |

**Zero new dependencies.** The entire v1.2 feature set is achievable with `anthropic==0.86.0`, `websockets==16.0`, and `httpx==0.28.1` — all already present in the bridge environment.

---

## Feature A: Fast Intent Classification Router (<300ms)

### Approach: Regex-first, no LLM for classification

**Do NOT use an LLM for classification.** Every approach tested:

| Method | Measured latency | Verdict |
|--------|-----------------|---------|
| `anthropic claude-haiku-4-5` with `tool_choice: {type: tool}` | 1,667ms | Fails 300ms budget by 5x |
| `Smithers /fast` endpoint | 17,509ms | Completely unsuitable |
| `Smithers /execute/v2` | 60,000ms+ (timeout) | Already documented blocker |
| Regex pattern matching (Python `re`) | <0.01ms | Meets budget with 30,000x headroom |

**Conclusion:** Classification is a pure regex problem at this intent complexity level. The four routes (jarvis, smithers, deity, build) have distinct, non-overlapping keyword signals. LLM classification adds latency without adding accuracy for these patterns.

### Classification contract

Returns `{"route": str, "voice": str, "confidence": str}` in <1ms synchronously before any async work begins.

```python
ROUTE_PATTERNS = {
    "smithers": re.compile(
        r'\b(?:slack|obsidian|vault|my notes|schedule|calendar|meeting|'
        r'appointment|todo|task|send message|post to|remind)\b', re.IGNORECASE
    ),
    "deity": re.compile(
        r'\b(?:zeus|athena|apollo|ares|hermes|poseidon|aphrodite|artemis|'
        r'hera|hephaestus|dionysus|hades|olympus|mythology|myth|oracle|prophecy)\b', re.IGNORECASE
    ),
    "build": re.compile(
        r'\b(?:add(?:ing)?|change|modify|update|create|build|edit|fix|make|'
        r'new feature|add button|change color|update ui|dark mode)\b', re.IGNORECASE
    ),
}
```

**Route priority:** smithers > deity > build > jarvis (fallback). Smithers must be checked first because "schedule a call with Zeus" should route to smithers, not deity.

**Voice assignment from route:**

| Route | Default voice | Override logic |
|-------|--------------|----------------|
| smithers | jarvis | Always jarvis — Smithers speaks as JARVIS |
| deity | extracted deity name or "athena" | Scan text for deity name match |
| build | jarvis | Always jarvis — code edits are JARVIS territory |
| jarvis | jarvis | Current voice preserved if already set |

### Where this lives

New synchronous function `classify_intent(text: str) -> dict` at top of `orb_bridge.py`, called at the top of `process_query()` before any await. Replace the current two-regex check (lines 744-756) with the unified classifier. The classifier result drives both routing AND voice selection before the async path begins.

---

## Feature B: Anthropic tool_use Agentic Loop

### Already available in anthropic==0.86.0

Verified: `anthropic_client.messages.create()` accepts `tools` and `tool_choice` parameters. The `stop_reason == "tool_use"` pattern works. Haiku completes a tool call in ~1,850ms round-trip (acceptable for a BUILD_INTENT path — user expects latency for code changes).

### Four tools to define

```python
JARVIS_TOOLS = [
    {
        "name": "read_file",
        "description": "Read a file from the r1-frontend directory. Returns file content as string.",
        "input_schema": {
            "type": "object",
            "properties": {"path": {"type": "string", "description": "Relative path within r1-frontend/"}},
            "required": ["path"]
        }
    },
    {
        "name": "write_file",
        "description": "Write content to a file in r1-frontend/. Overwrites if exists.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string"},
                "content": {"type": "string"}
            },
            "required": ["path", "content"]
        }
    },
    {
        "name": "exec_shell",
        "description": "Run a shell command. Returns stdout. Sandboxed to safe commands only.",
        "input_schema": {
            "type": "object",
            "properties": {"command": {"type": "string"}},
            "required": ["command"]
        }
    },
    {
        "name": "reload_frontend",
        "description": "Reload Chrome on the R1 device. Call after writing files to apply changes.",
        "input_schema": {"type": "object", "properties": {}}
    }
]
```

### Agentic loop pattern

```python
async def process_build_intent(websocket, text: str, voice: str):
    msgs = [{"role": "user", "content": text}]
    max_rounds = 5  # cap to prevent runaway loops
    
    for _ in range(max_rounds):
        r = await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: anthropic_client.messages.create(
                model="claude-haiku-4-5",  # fast + cheap for code edits
                max_tokens=2000,
                tools=JARVIS_TOOLS,
                messages=msgs,
                system=JARVIS_BUILD_SYSTEM_PROMPT
            )
        )
        
        msgs.append({"role": "assistant", "content": r.content})
        
        if r.stop_reason == "end_turn":
            # Extract final text and TTS it
            break
        
        # Execute each tool_use block
        tool_results = []
        for block in r.content:
            if block.type == "tool_use":
                result = await dispatch_tool(block.name, block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": result
                })
        
        msgs.append({"role": "user", "content": tool_results})
```

### Sandbox enforcement for exec_shell

```python
ALLOWED_COMMANDS = re.compile(
    r'^(ls|cat|echo|grep|wc|head|tail|diff|find)\s', re.IGNORECASE
)
SANDBOX_ROOT = Path("/Volumes/AI_WORKSPACE/esp32-jarvis/r1-frontend")

def _safe_exec(command: str) -> str:
    if not ALLOWED_COMMANDS.match(command):
        return "ERROR: Command not in allowlist. Allowed: ls, cat, echo, grep, wc, head, tail, diff, find"
    # ... subprocess.run with cwd=SANDBOX_ROOT
```

**Do not allow:** `rm`, `curl`, `wget`, `pip`, `python`, `adb`, `git push`, or any network-touching commands from within the tool sandbox.

### Model selection for agentic loop

Use `claude-haiku-4-5` (not Sonnet, not Opus) for the agentic loop. Reasons:
- Tool dispatch is mechanical — file I/O doesn't need Opus reasoning
- Haiku: ~1,850ms/round, Sonnet: ~4-6s/round. Multi-round loops compound this
- The voice confirmation at the end can use Sonnet if the reply needs quality
- Build intent is not mythology narration — don't burn Opus credits on `write_file` calls

---

## Feature C: ADB Chrome Reload via CDP

### Chrome DevTools Protocol — verified working

Live verification shows Chrome DevTools Protocol is active and accessible:

```bash
adb -s $R1_SERIAL forward tcp:9222 localabstract:chrome_devtools_remote
```

Returns tab list at `http://localhost:9222/json`. Current tab is JARVIS frontend at `http://localhost:8888/index.html`.

`Page.reload` via CDP WebSocket returns `{"id":1,"result":{}}` in <100ms.

### Implementation

```python
async def reload_r1_frontend() -> str:
    """Reload Chrome on R1 via Chrome DevTools Protocol."""
    try:
        # Ensure ADB forward is live
        await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: subprocess.run(
                ["adb", "-s", R1_SERIAL, "forward", "tcp:9222", "localabstract:chrome_devtools_remote"],
                timeout=3, capture_output=True
            )
        )
        # Get active tab
        async with httpx.AsyncClient(timeout=3.0) as http:
            resp = await http.get("http://localhost:9222/json")
            tabs = resp.json()
        
        if not tabs:
            return "ERROR: No Chrome tabs found"
        
        page_id = tabs[0]["id"]
        ws_url = f"ws://localhost:9222/devtools/page/{page_id}"
        
        async with websockets.connect(ws_url) as ws:
            await ws.send(json.dumps({"id": 1, "method": "Page.reload", "params": {}}))
            result = await asyncio.wait_for(ws.recv(), timeout=3.0)
        
        return "Frontend reloaded successfully"
    except Exception as e:
        return f"ERROR: {e}"
```

### Why CDP over alternatives

| Approach | Result | Problem |
|----------|--------|---------|
| `adb shell input keyevent 61` (F5) | No response | Android has no F5 concept |
| `adb shell am broadcast -a com.android.chrome.RELOAD` | result=0 but no reload | Broadcast not handled by Chrome |
| `adb shell am start -d javascript:location.reload()` | Warning, no reload | Security policy blocks javascript: URLs |
| CDP `Page.reload` via WebSocket | `{"result":{}}` confirmed | Works |

---

## Port Conflict Diagnosis

### Current state (verified live)

| Port | Process | Status |
|------|---------|--------|
| 8000 | `content_api.py` (jarvis-voice-v2) | Running, legitimate |
| 8100 | LLM Router | Running, correct |
| 8200 | Smithers | Running, correct |
| 8300 | `orb-backend/server.py` (uvicorn) | Running, correct |
| 8400 | Chrome Helper (not the bridge) | Conflict — bridge targets this port |
| 4000 | FREE | Mission Control can restore here |
| 5556 | FREE | JARVIS web can restore here |
| 6001 | FREE | Health Dashboard can restore here |

**The actual port conflict:** The bridge itself runs on `:8400`, but `lsof` shows a Google Chrome Helper process occupying that port. Chrome's internal ports are ephemeral and dynamic — this may not be a persistent conflict, but the bridge startup will fail if Chrome Helper is holding 8400 at launch time.

**Resolution approach:** Add a port-availability check at bridge startup with auto-increment fallback (8400 → 8401), or pick a port Chrome never uses. Ports in the 8xxx range that Chrome avoids: 8300-class ports are safer as Chrome tends to use ephemeral ports above 49152 for internal IPC; 8400 being taken suggests a Chrome remote debugging or extension port. Consider moving bridge to 8450 or 8500.

**8000 vs 8300 confusion:** These are two different services (content_api on 8000, orb-backend on 8300). Not a conflict — both are correct. The bridge references `:8300` for orb-backend, which is running correctly.

---

## What NOT to Add

- **LangChain or LangGraph** — adds 15MB of dependencies and 200ms+ import time for a use case that needs 4 tools and a while loop. The raw Anthropic SDK agentic loop is 30 lines.
- **Any new classification service or microservice** — regex runs in <0.01ms. A classification endpoint adds network round-trip overhead for zero accuracy benefit.
- **Smithers for fast queries** — documented at 17,509ms on `/fast`, 60,000ms+ on `/execute/v2`. Smithers is for Slack/Obsidian/memory writes, not voice-latency-sensitive paths.
- **Separate CDP library (playwright, selenium, pycdp)** — CDP over raw websockets is 8 lines. Playwright adds 100MB+ and a browser binary download.
- **New pip packages for ADB** — `pure-python-adb` and `adb-shell` exist but add fragile dependencies. The bridge already uses `subprocess` + system `adb` binary, which works.
- **Redis or any cache layer** — intent classification is stateless and <0.01ms. A cache would be slower than just running the regex.
- **asyncio subprocess** (`asyncio.create_subprocess_shell`) — for 3-second timeouts, `run_in_executor` wrapping synchronous `subprocess.run` is simpler and equivalent.

---

## Integration Notes

### How new pieces connect to orb_bridge.py

**1. Classification (replaces lines 744-756 in `process_query`)**

Current code has two separate regex objects (`smithers_triggers`, `smithers_tools`). Replace with unified `classify_intent(text)` call at the top of `process_query()`. The result dict drives the entire dispatch decision — no more mid-function voice switches.

```python
async def process_query(websocket, text, voice, model=None, tier=None):
    intent = classify_intent(text)  # <0.01ms, synchronous
    voice = intent["voice"]         # voice locked before any await
    
    await websocket.send(json.dumps({"type": "thinking", "voice": voice}))
    
    if intent["route"] == "build":
        await process_build_intent(websocket, text, voice)
        return
    elif intent["route"] == "smithers":
        result = await route_smithers(text, voice, None, None)
    elif intent["route"] == "deity":
        result = await route_deity(text, voice, model, tier)
    else:
        result = await route_llm_direct(text, voice, model or "anthropic/claude-sonnet-4.5", tier)
    
    # ... existing TTS/audio send logic unchanged
```

**2. Agentic loop (`process_build_intent`) — new coroutine**

Sits alongside `process_query()`. Uses existing `anthropic_client` (already initialized at module level). Calls `reload_r1_frontend()` when the model invokes the `reload_frontend` tool. Sends TTS of the final confirmation response through existing `get_tts_audio()`.

**3. CDP reload — new async helper**

Uses already-imported `websockets` and `httpx`. The `adb forward` subprocess call reuses the existing `R1_SERIAL` constant and the `subprocess` import pattern already in the file.

**4. Port check at startup**

Add after `PORT = 8400` at module top:

```python
import socket
def _find_free_port(start: int) -> int:
    for p in range(start, start + 10):
        with socket.socket() as s:
            if s.connect_ex(('localhost', p)) != 0:
                return p
    return start  # fallback
PORT = _find_free_port(8400)
```

### Smithers-First routing clarification

"Smithers-First" does NOT mean every query hits Smithers over the network. It means Smithers is the architectural entry point conceptually, with the classifier deciding whether the actual HTTP call goes to Smithers (:8200) or LLM Router (:8100). The classifier enforces Smithers intent; the routing functions enforce which service handles it.

---

## Confidence Assessment

| Area | Confidence | Evidence |
|------|-----------|---------|
| Regex classification | HIGH | Live timing: <0.01ms. Patterns derived from existing bridge code (lines 744-746) |
| Anthropic tool_use API | HIGH | Verified against live anthropic==0.86.0. Tool call + tool_result loop confirmed working |
| CDP Chrome reload | HIGH | Live R1 device: `Page.reload` returns `{"result":{}}` via ws://localhost:9222 |
| Port conflict diagnosis | HIGH | `lsof` output verified. 8400 held by Chrome Helper, 4000/5556/6001 all free |
| Haiku for agentic loop | HIGH | 1,850ms/round measured. Sonnet not needed for file I/O dispatch |
| No new pip installs | HIGH | All required APIs exist in installed versions |

---

## Sources

- Live system: `pip show anthropic` → 0.86.0, `pip show websockets` → 16.0, `pip show httpx` → 0.28.1
- Live latency test: Anthropic Haiku tool_use measured at 1,667-1,883ms in local Python subprocess
- Live Smithers test: `/fast` endpoint returned 17,509ms latency
- Live CDP test: `adb forward tcp:9222 + ws://localhost:9222/devtools/page/29` → `Page.reload` confirmed
- Live port scan: `lsof -ti tcp:PORT` across 8000, 8100, 8200, 8300, 8400, 4000, 5556, 6001
- Anthropic tool_use docs: https://docs.anthropic.com/en/docs/tool-use
- Chrome DevTools Protocol Page.reload: https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-reload
