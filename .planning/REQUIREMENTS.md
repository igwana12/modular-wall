# Claude Code Infrastructure Upgrades — Requirements

**Defined:** 2026-04-01
**Core Value:** Upgrade the existing Smithers-controlled system with tactical improvements that enhance session mobility, automation, visual QA, and security.

## v1.1 Requirements

Requirements for infrastructure upgrade milestone. Each maps to roadmap phases.

### Scheduling

- [ ] **SCHED-01**: All 5 existing scheduled tasks are verified active and executing on their defined cadence
- [ ] **SCHED-02**: Morning briefing task produces a daily summary accessible before 9am
- [ ] **SCHED-03**: API health check detects and reports when any of the 9 services are down

### Session Mobility

- [x] **MOBIL-01**: User can start a session on desktop and resume it on mobile via teleport
- [x] **MOBIL-02**: Remote control is enabled and accessible from browser/phone
- [x] **MOBIL-03**: Session handoff preserves conversation context across devices

### Visual QA

- [x] **VISQA-01**: PostToolUse hook fires on frontend file changes (tsx/css/html) and captures a Playwright screenshot
- [ ] **VISQA-02**: Screenshot comparison detects visual regressions above a configurable threshold
- [ ] **VISQA-03**: Visual QA results block commit when delta exceeds threshold

### Loop Polling

- [x] **LOOP-01**: Orb-backend health poll runs every 5 minutes and reports failures
- [x] **LOOP-02**: Trello Command Center poll runs every 15 minutes and surfaces new cards
- [x] **LOOP-03**: Log scanner polls orb-backend.log every 30 minutes for errors

### Approval Boundaries

- [x] **APPR-01**: Prompt guard blocks Slack messages to channels outside #pantheon and #the-orb
- [x] **APPR-02**: Prompt guard requires explicit confirmation before git push to main
- [x] **APPR-03**: Prompt guard blocks writes to files containing API keys or tokens (.env, credentials)

### Context Profiles

- [x] **CTXP-01**: Routing policy includes context profiles mapping task types to relevant directories
- [x] **CTXP-02**: Smithers routing applies the correct context profile based on task classification
- [x] **CTXP-03**: Unnecessary directories are excluded from sessions to reduce context pollution

## v2 Requirements

Deferred to future milestone. Tracked but not in current roadmap.

### Advanced Automation

- **AUTO-01**: Webhook-triggered scheduled tasks (external event → Claude Code action)
- **AUTO-02**: Cross-session state sharing via shared memory files
- **AUTO-03**: Automatic skill activation based on file type detection

## Out of Scope

| Feature | Reason |
|---------|--------|
| New skills creation | 565+ skills already exist, focus on infrastructure not content |
| Smithers model routing changes | Cost-optimized routing already at $12-20/month, don't touch |
| Hook rewrite | 8 hooks already work, only extending gsd-prompt-guard |
| Agent SDK integration | Future milestone — evaluate after infrastructure is solid |
| MCP server additions | Current MCP config sufficient for this milestone |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SCHED-01 | Phase 10 | Pending |
| SCHED-02 | Phase 10 | Pending |
| SCHED-03 | Phase 10 | Pending |
| LOOP-01 | Phase 10 | Complete |
| LOOP-02 | Phase 10 | Complete |
| LOOP-03 | Phase 10 | Complete |
| APPR-01 | Phase 11 | Pending |
| APPR-02 | Phase 11 | Pending |
| APPR-03 | Phase 11 | Pending |
| CTXP-01 | Phase 11 | Complete |
| CTXP-02 | Phase 11 | Complete |
| CTXP-03 | Phase 11 | Complete |
| MOBIL-01 | Phase 12 | Complete |
| MOBIL-02 | Phase 12 | Complete |
| MOBIL-03 | Phase 12 | Complete |
| VISQA-01 | Phase 13 | Complete |
| VISQA-02 | Phase 13 | Pending |
| VISQA-03 | Phase 13 | Pending |

**Coverage:**
- v1.1 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0

---
*Requirements defined: 2026-04-01*
*Last updated: 2026-04-01 after roadmap creation*
