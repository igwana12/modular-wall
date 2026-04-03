# Phase 12: Session Mobility - Context

**Gathered:** 2026-04-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Configure, test, and document Claude Code's session mobility features: `/remote-control`, `/teleport`, `--resume`, `--name`. Verify a full round-trip (Mac terminal → phone browser → back to terminal). Create a cheat sheet and session naming convention. No new code — this is testing and documentation of existing features.

</domain>

<decisions>
## Implementation Decisions

### Feature Availability (from research)
- **D-01:** `/remote-control` is available in v2.1.90 — bridges CLI session to claude.ai/code for browser/phone continuation.
- **D-02:** `/teleport` is available for subscribers — resumes web session into CLI.
- **D-03:** `--resume` / `--continue` / `--name` are standard CLI flags for session management.
- **D-04:** `/rc` mode requires `--text` flag for TUI compatibility in remote sessions.

### Testing Workflow
- **D-05:** Full round-trip test required: Mac terminal → `/remote-control` → phone browser (claude.ai/code) → make a change → `/teleport` back to terminal. Document each step with what worked and what didn't.
- **D-06:** Test must verify conversation context (history and file state) survives the round trip.
- **D-07:** Document any limitations discovered (e.g., tool calls that don't work remotely, MCP servers unavailable in web mode).

### Session Naming Convention
- **D-08:** Project-task format: `jarvis-frontend`, `orb-hardware`, `sc-content`, `trading-signals`. Matches the 4 context profiles from Phase 11 (orb, jarvis, hardware, creative).
- **D-09:** Apply naming via `--name` flag or `/name` slash command at session start.
- **D-10:** Session names should be unique enough to identify in a picker but short enough to type.

### Deliverables
- **D-11:** A session mobility cheat sheet (markdown) saved in the project for reference.
- **D-12:** Round-trip test results documented (pass/fail, issues, workarounds).
- **D-13:** No new code or hooks — this phase is pure configuration and documentation.

### Claude's Discretion
- Exact test script steps (what commands to run in what order)
- Cheat sheet format and location
- Whether to add a session-start hook that auto-names sessions based on working directory

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Claude Code Features
- `~/.claude/cache/changelog.md` — Changelog with teleport/remote-control feature entries (v2.0.47, v2.0.52, v2.1.51, v2.1.81, v2.1.84)
- `claude --help` output — Current CLI flags (--resume, --continue, --name, --chrome)

### Prior Phase Integration
- `.planning/phases/11-security-routing-hardening/11-CONTEXT.md` — Context profiles (orb, jarvis, hardware, creative) that inform session naming

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `gsd-check-update.js` SessionStart hook — could be extended to auto-name sessions based on working directory
- Context profiles from Phase 11 — session names can mirror profile names

### Established Patterns
- Hooks use Node.js with stdin JSON parsing
- Settings.json for configuration
- GSD `--text` flag support for remote session compatibility

### Integration Points
- `/remote-control` bridges to claude.ai/code
- `/teleport` pulls web sessions into terminal
- `--name` flag labels sessions for cross-device discovery

</code_context>

<specifics>
## Specific Ideas

- Session naming should match Phase 11 context profiles so there's a consistent vocabulary across the system
- The round-trip test is the key deliverable — if it works, document it; if it doesn't, document the limitations
- This is a low-risk, documentation-heavy phase — mostly testing existing features, not building new ones

</specifics>

<deferred>
## Deferred Ideas

- Auto-naming hook that sets session name based on working directory detection — nice-to-have, not required
- Mobile-specific UX optimizations — depends on Anthropic's mobile app roadmap
- Cross-device notification when a session is available for pickup — future feature request

</deferred>

---

*Phase: 12-session-mobility*
*Context gathered: 2026-04-02*
