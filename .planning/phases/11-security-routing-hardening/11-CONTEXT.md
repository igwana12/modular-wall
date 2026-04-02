# Phase 11: Security & Routing Hardening - Context

**Gathered:** 2026-04-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Extend the existing `gsd-prompt-guard.js` hook with 3 new BLOCKING rules (Slack channel restriction, git push main protection, secret file write prevention) and add directory-based context profiles to Smithers routing policy so sessions automatically load relevant directories based on task type.

</domain>

<decisions>
## Implementation Decisions

### Guard Behavior
- **D-01:** All 3 new rules use HARD BLOCK mode — operations are rejected, not just warned. User can override by approving the tool call in Claude Code's permission prompt.
- **D-02:** The existing prompt injection guard remains ADVISORY-ONLY (no change to current behavior). Only the 3 new rules are blocking.
- **D-03:** Implement as an extension of the existing `gsd-prompt-guard.js` at `~/.claude/hooks/gsd-prompt-guard.js`, not a separate hook file.

### Slack Channel Allowlist
- **D-04:** Allowed channels: #pantheon, #the-orb, #operations. All other channels are BLOCKED.
- **D-05:** The guard must match on channel name or channel ID. Need to resolve channel IDs for the 3 allowed channels from Slack MCP config.
- **D-06:** Block applies to any Slack MCP tool call that posts/sends a message (not reads).

### Git Push Protection
- **D-07:** `git push` to `main` or `master` branch triggers a hard block requiring explicit confirmation.
- **D-08:** Push to any other branch is allowed without blocking.
- **D-09:** The guard triggers on Bash tool calls containing `git push` with `main` or `master` as target.

### Secret File Protection
- **D-10:** Standard secret file patterns blocked from writes: `.env`, `.env.*`, `credentials.json`, `secrets.*`, `*.pem`, `*.key`, `*_SECRET*`, `*_TOKEN*`, `*_API_KEY*`
- **D-11:** Block applies to Write and Edit tool calls targeting files matching these patterns.
- **D-12:** Block applies regardless of directory — secrets anywhere in the filesystem are protected.

### Context Profiles
- **D-13:** Directory-based detection — the working directory determines which context profile applies.
- **D-14:** 4 context profiles defined:
  - `orb`: working in `services/orb-backend/` or `oracle-app/` → include oracle cards, backend, Stripe, deployment dirs. Exclude firmware/, JARVIS services.
  - `jarvis`: working in `services/jarvis/` → include JARVIS frontend, voice services, media engine. Exclude firmware/, oracle-app/.
  - `hardware`: working in `firmware/` → include ESP32 configs, hardware docs, component specs. Exclude services/jarvis/, oracle-app/.
  - `creative`: working in Sacred Circuits paths or Obsidian vault → include content DB, art assets, mythology corpus. Exclude firmware/, services/.
- **D-15:** Context profiles are stored in Smithers routing_policy.json as a new `context_profiles` section.
- **D-16:** Profile application is advisory — it recommends which `--add-dir` directories to include/exclude, but doesn't force directory removal from an active session.

### Claude's Discretion
- Exact channel IDs for #pantheon, #the-orb, #operations — Claude resolves these from Slack MCP
- Hook implementation pattern (how to extend gsd-prompt-guard.js vs creating a new hook) — Claude decides based on code complexity
- Whether to add the hook matchers to settings.json for new tool types (Bash for git, Slack MCP tools) or handle within the existing Write|Edit matcher

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Hook Infrastructure
- `~/.claude/hooks/gsd-prompt-guard.js` — Current prompt injection guard (advisory-only, PreToolUse on Write|Edit)
- `~/.claude/settings.json` — Hook wiring, permission config, tool matchers

### Routing Infrastructure
- `/Volumes/Extreme Pro/ACTIVE/smithers/data/routing_policy.json` — Smithers routing rules (add context_profiles section)
- `/Volumes/Extreme Pro/ACTIVE/smithers/data/cost_table.json` — Model cost tiers (for reference)

### Slack Configuration
- `~/.claude/settings.local.json` — Slack MCP tokens
- `~/.claude/mcp.json` — MCP server configuration

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `gsd-prompt-guard.js` — 97 lines, well-structured Node.js hook. Reads stdin JSON, parses tool_name and tool_input, checks patterns, exits 0 (allow) or outputs hookSpecificOutput (warn). Can be extended with new rule blocks.
- Settings.json hook wiring — PreToolUse matcher currently set to `Write|Edit`. Will need to add matchers for Bash (git push) and Slack MCP tools.

### Established Patterns
- Hooks use Node.js with stdin JSON parsing, 3s timeout
- Advisory mode outputs `hookSpecificOutput.additionalContext` with warning text
- Blocking mode would need to output a blocking response (exit code or structured output that prevents the tool call)

### Integration Points
- PreToolUse hooks fire before tool execution — the right place for blocking rules
- Settings.json `hooks.PreToolUse` array — add new matcher entries for Bash and Slack tools
- `routing_policy.json` — add `context_profiles` section alongside existing `recurring_tasks`

</code_context>

<specifics>
## Specific Ideas

- The security incident of 2026-03-22 (malware, credential theft, API key compromise) makes secret file protection particularly important
- User's `allow: ["*"]` and `bypassPermissions` settings mean the guard hooks are the primary safety net
- Context profiles should reduce context pollution — loading all 7 additional directories wastes context on irrelevant files

</specifics>

<deferred>
## Deferred Ideas

- JARVIS voice alerts for security violations — future enhancement
- Automatic context profile switching mid-session — complex, defer
- Per-profile model routing (different LLM models for different task types) — already handled by Smithers routing, not needed here

### Reviewed Todos (not folded)
- "Set up Stripe and Resend API keys for Oracle Cards" — not related to security/routing, belongs in Oracle Cards scope

</deferred>

---

*Phase: 11-security-routing-hardening*
*Context gathered: 2026-04-02*
