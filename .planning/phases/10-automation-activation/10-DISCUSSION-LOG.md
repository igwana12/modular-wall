# Phase 10: Automation Activation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-02
**Phase:** 10-automation-activation
**Areas discussed:** Task activation, Failure handling, Cost guardrails

---

## Task Activation

| Option | Description | Selected |
|--------|-------------|----------|
| /schedule (Recommended) | Use Claude Code's built-in /schedule command -- tasks run on Anthropic cloud | |
| External cron | System crontab or launchd on Smithers -- full control, runs locally | |
| OpenClaw daemon | Route through existing OpenClaw gateway (:18789) | |

**User's initial choice:** /schedule (Recommended)

**REVISED after further discussion:** User explicitly rejected cloud billing. Changed to local cron on Smithers. User's reasoning: "I'm not ready to put my entire life and financial success on an automated pilot unless I'm certain that the systems I know how to use are routed the right way." This is experimentation and learning, not production automation.

---

### Cadence

| Option | Description | Selected |
|--------|-------------|----------|
| Proposed defaults | morning-briefing 7am, health every 6hr, wispr 11pm, weekly Sun 10am, note 6am | ✓ |
| Tighter monitoring | More frequent checks | |
| Custom times | User specifies per-task | |

**User's choice:** Proposed defaults

---

### Local Testing Method

| Option | Description | Selected |
|--------|-------------|----------|
| Manual CLI | Run each task by hand | |
| Local cron on Smithers | launchd/cron jobs on Mac | ✓ |
| Both | Manual first, then cron | |

**User's choice:** Local cron on Smithers

---

### Soak Period

| Option | Description | Selected |
|--------|-------------|----------|
| 1 week | Short validation | |
| 2 weeks | Covers weekday + weekend patterns twice | ✓ |
| Until I say so | No fixed timeline | |

**User's choice:** 2 weeks

---

## Failure Handling

| Option | Description | Selected |
|--------|-------------|----------|
| Slack to #the-orb | Post failure alerts to #the-orb channel | ✓ |
| JARVIS voice alert | JARVIS announces failures in next session | |
| Both | Slack + JARVIS voice | |

**User's choice:** Slack to #the-orb

---

### Alert Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Down only (Recommended) | Alert when service unreachable | ✓ |
| Down + degraded | Also alert on slow responses or error spikes | |

**User's choice:** Down only

---

## Cost Guardrails

| Option | Description | Selected |
|--------|-------------|----------|
| $5/month ceiling | Hard cap, pause non-critical on hit | ✓ |
| $10/month ceiling | More headroom | |
| No ceiling | Monitor only | |

**User's choice:** $5/month ceiling

---

### Protected Tasks

| Option | Description | Selected |
|--------|-------------|----------|
| Health + briefing | api-health-check and morning-briefing always run | ✓ |
| Health only | Only api-health-check protected | |
| All protected | Ceiling is advisory only | |

**User's choice:** Health + briefing

---

## Claude's Discretion

- Loop polling intervals
- Log error patterns for orb-backend.log
- Trello polling scope (which boards/columns)

## Deferred Ideas

- Cloud promotion via /schedule — after 2-week local soak
- JARVIS voice alerts for failures
- Degraded performance monitoring
- Financial awareness in morning briefing
- Automated Slack chapter content routing
