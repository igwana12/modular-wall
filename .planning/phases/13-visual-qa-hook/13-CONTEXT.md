# Phase 13: Visual QA Hook - Context

**Gathered:** 2026-04-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Create a PostToolUse hook that detects frontend file changes in the JARVIS frontend, captures a Playwright screenshot, compares against a git-tracked baseline using pixel diff, and blocks commits when visual regressions exceed a 5% threshold.

</domain>

<decisions>
## Implementation Decisions

### Trigger Scope
- **D-01:** Hook triggers ONLY on JARVIS frontend file changes at `/Volumes/Extreme Pro/ACTIVE/jarvis/frontend/`
- **D-02:** Matching file extensions: `*.tsx`, `*.css`, `*.html`
- **D-03:** Oracle app and other frontends are NOT in scope for this phase
- **D-04:** Hook type: PostToolUse — fires AFTER Write/Edit completes, so the file change is on disk when screenshot is taken

### Screenshot Capture
- **D-05:** Use Playwright MCP tools for screenshots — `mcp__playwright__browser_navigate` and `mcp__playwright__browser_take_screenshot` are confirmed available in settings.json
- **D-06:** JARVIS frontend must be running locally for screenshots to work. If JARVIS is not running, the hook should warn and skip (not block).
- **D-07:** Screenshot the main JARVIS page — the dashboard/conversation view that shows the blob, panels, and media overlay

### Comparison Approach
- **D-08:** Pixel-by-pixel diff comparison
- **D-09:** Threshold: 5% — flag when more than 5% of pixels differ from baseline
- **D-10:** Comparison implemented in Node.js (matching existing hook patterns). Use a lightweight pixel comparison library or raw buffer comparison — no heavy dependencies.

### Baseline Management
- **D-11:** Baselines stored git-tracked in `.visual-qa/baselines/` directory
- **D-12:** Manual baseline update via a command/script (e.g., `scripts/update-visual-baseline.sh`)
- **D-13:** When hook flags a regression and user approves the commit, they must manually run the update command to refresh the baseline
- **D-14:** Baseline filenames should be descriptive: `jarvis-dashboard.png`, `jarvis-reading.png`, etc.

### Commit Gating
- **D-15:** When pixel diff exceeds 5%, the hook outputs a BLOCK response (consistent with Phase 11 guard behavior)
- **D-16:** The block message should include: which baseline changed, percentage of pixels different, path to the diff image
- **D-17:** User can override by approving the tool call in Claude Code's permission prompt (same as other blocking hooks)

### Claude's Discretion
- Whether to use a Node.js image comparison library (like `pixelmatch`) or shell-based ImageMagick comparison
- How to handle the case where no baseline exists yet (first run) — suggest auto-creating the initial baseline
- Whether to generate a visual diff image showing which pixels changed
- Hook timeout — Playwright screenshot + comparison needs more time than a simple check

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Hook Infrastructure
- `~/.claude/hooks/gsd-prompt-guard.js` — Reference for hook patterns (stdin JSON, tool_name parsing, block vs advisory output)
- `~/.claude/settings.json` — Hook wiring (PostToolUse section for matcher configuration)

### JARVIS Frontend
- `/Volumes/Extreme Pro/ACTIVE/jarvis/frontend/` — Target directory for file change detection
- JARVIS runs locally — executor needs to know how to start/check if it's running

### Playwright MCP
- Playwright MCP tools available: browser_navigate, browser_take_screenshot, browser_snapshot, browser_evaluate
- These are MCP tools accessible from Claude Code, but the hook runs as a Node.js script — it may need to call Playwright directly (not via MCP)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `gsd-prompt-guard.js` — Established hook pattern: stdin JSON parsing, tool_name/tool_input extraction, exit(0) for allow, structured output for block
- Phase 11 added `Write|Edit|Bash` to PreToolUse matcher — PostToolUse may need similar matcher addition
- Settings.json already has PostToolUse hooks for `gsd-context-monitor.js`, `jarvis-memory-bridge.js`, `obsidian-archive.js`

### Established Patterns
- PostToolUse hooks have 5-10s timeout in settings.json
- Hooks receive tool result data on stdin (different from PreToolUse which receives tool input)
- Existing PostToolUse hooks match on specific tool names: `Edit|Write|MultiEdit`

### Integration Points
- PostToolUse `Edit|Write` matcher — add visual QA hook to this chain
- Settings.json PostToolUse array — new entry alongside existing hooks
- `.visual-qa/baselines/` directory — new git-tracked directory for baseline images

</code_context>

<specifics>
## Specific Ideas

- The hook needs to handle Playwright invocation from a Node.js script (not via MCP tools, since hooks run outside Claude Code's tool context)
- Consider using `npx playwright` or a pre-installed Playwright binary for screenshots
- Pixel comparison: `pixelmatch` npm package is lightweight (~50 lines, no native deps) and widely used for visual regression testing
- The 5% threshold is configurable — store it in a config file so it can be tuned without editing the hook

</specifics>

<deferred>
## Deferred Ideas

- Oracle app visual QA — extend to Next.js oracle-app frontend in future phase
- Perceptual diff (SSIM) — upgrade from pixel diff if false positives become a problem
- Auto-update baselines on approval — reduce friction but requires hook-to-hook communication
- CI/CD integration — run visual QA in GitHub Actions, not just locally

</deferred>

---

*Phase: 13-visual-qa-hook*
*Context gathered: 2026-04-02*
