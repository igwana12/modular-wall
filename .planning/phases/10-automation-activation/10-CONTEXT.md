# Phase 10: Automation Activation - Context

**Gathered:** 2026-04-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Activate 5 existing scheduled tasks and 3 polling loops on LOCAL infrastructure only. All automation runs on Smithers via local cron — no Anthropic cloud billing, no /schedule. Tasks route through existing Smithers (:8200) and Hunter Alpha (FREE tier). Cloud promotion is explicitly deferred until the user decides local validation is complete.

</domain>

<decisions>
## Implementation Decisions

### Task Activation
- **D-01:** ALL tasks run locally on Smithers via cron/launchd — NOT Anthropic's /schedule cloud service. Zero cloud billing.
- **D-02:** Local cron is the execution mechanism. No manual CLI triggers — set up proper cron jobs that run on schedule while machine is awake.
- **D-03:** 2-week local soak test before any consideration of cloud promotion. Cloud promotion is a separate future decision, not part of this phase.
- **D-04:** Route all task execution through Smithers (:8200) using Hunter Alpha (FREE tier) to keep costs at zero.

### Task Cadences
- **D-05:** morning-briefing: 7am daily
- **D-06:** api-health-check: every 6 hours
- **D-07:** wispr-daily-sync: 11pm daily
- **D-08:** weekly-improvement: Sunday 10am
- **D-09:** daily-obsidian-note: 6am daily

### Failure Handling
- **D-10:** All failure alerts go to Slack #the-orb channel
- **D-11:** Down-only alerts — alert when a service is completely unreachable. No degraded performance monitoring (that's v2).
- **D-12:** No JARVIS voice alerts for now — Slack is the single notification channel.

### Cost Guardrails
- **D-13:** $5/month hard ceiling on automation token spend (should be near-zero with Hunter Alpha FREE tier, but ceiling exists as safety net)
- **D-14:** Protected tasks that never pause even if ceiling hit: api-health-check + morning-briefing
- **D-15:** Non-critical loops and tasks pause if $5 ceiling reached

### Content & Fine-Tuning Philosophy
- **D-16:** Morning briefing content, Slack chapter routing, and task outputs will be iteratively fine-tuned WITH the user over the soak period — not locked in upfront.
- **D-17:** Each Slack channel represents a different chapter of the user's life. The content routed to each channel needs to be carefully audited together, not automated blindly.
- **D-18:** This is experimentation and learning — not production automation. Build for iteration, not permanence.

### Claude's Discretion
- Loop polling intervals (5m/15m/30m as proposed in roadmap) — Claude can set these based on what makes sense for local cron granularity
- Log error patterns for orb-backend.log scanning — Claude decides what constitutes a meaningful error
- Trello polling scope — Claude decides which board columns to watch based on existing Trello board structure

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Scheduled Task Definitions
- `~/.claude/scheduled-tasks/morning-briefing/SKILL.md` — Morning briefing task definition
- `~/.claude/scheduled-tasks/api-health-check/SKILL.md` — API health check task definition
- `~/.claude/scheduled-tasks/wispr-daily-sync/SKILL.md` — Wispr voice transcript sync definition
- `~/.claude/scheduled-tasks/weekly-improvement/SKILL.md` — Weekly system review definition
- `~/.claude/scheduled-tasks/daily-obsidian-note/SKILL.md` — Daily Obsidian note creation definition

### Existing Infrastructure
- `~/.claude/settings.json` — Current hook and permission configuration
- `~/.claude/hooks/` — 8 existing hooks (understand patterns before adding)
- `/Volumes/Extreme Pro/ACTIVE/smithers/data/routing_policy.json` — Smithers routing rules (Hunter Alpha FREE tier)
- `/Volumes/Extreme Pro/ACTIVE/smithers/data/cost_table.json` — Model cost tiers

### Slack Integration
- `~/.claude/settings.local.json` — Slack MCP tokens and configuration
- `~/.claude/mcp.json` — MCP server configuration including Slack

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- 5 scheduled task SKILL.md files already fully written — need cron wrappers, not rewrites
- Ralph Loop plugin at `~/.claude/plugins/marketplaces/claude-plugins-official/plugins/ralph-loop/` — may inform loop design
- `gsd-prompt-guard.js` hook — established pattern for PreToolUse hooks
- Smithers routing at :8200 — Hunter Alpha FREE tier for all recurring automation

### Established Patterns
- Hooks use Node.js with stdin JSON parsing (see gsd-prompt-guard.js, obsidian-archive.js)
- Settings.json scoping: user > project > local
- Slack MCP uses korotovsky-slack-mcp-server with socket tokens

### Integration Points
- Cron jobs trigger Claude CLI or direct Smithers API calls
- Failure alerts post to Slack #the-orb via Slack MCP
- Smithers :8200 POST /route for LLM calls within tasks
- orb-backend :8300 for health check target
- 9 total services to monitor (from system_state memory)

</code_context>

<specifics>
## Specific Ideas

- User wants to iteratively fine-tune briefing content together during soak period — not set-and-forget
- Each Slack channel is a "chapter" of the user's life — routing must be intentional, not blanket
- User is cost-conscious — currently spending on AI tools/APIs with limited revenue return. Every automation must justify its existence.
- This is an experimental/learning phase — build for easy iteration and teardown, not permanence

</specifics>

<deferred>
## Deferred Ideas

- Cloud promotion via /schedule — revisit after 2-week local soak test proves value
- JARVIS voice alerts for failures — consider after Slack alerting is validated
- Degraded performance monitoring (slow responses, error rate spikes) — v2 concern
- Morning briefing financial awareness section (revenue vs burn rate tracking) — future enhancement
- Automated content routing optimization across Slack chapters — needs user audit first

### Reviewed Todos (not folded)
- "Set up Stripe and Resend API keys for Oracle Cards" — not related to automation activation, belongs in Oracle Cards scope

</deferred>

---

*Phase: 10-automation-activation*
*Context gathered: 2026-04-02*
