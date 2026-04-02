# Phase 11: Security & Routing Hardening - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.

**Date:** 2026-04-02
**Phase:** 11-security-routing-hardening
**Areas discussed:** Guard behavior, Slack allowlist, Secret patterns, Context profiles

---

## Guard Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Block (Recommended) | Hard block on unauthorized operations | ✓ |
| Warn only | Advisory warnings, operations proceed | |
| Mixed | Block Slack/secrets, warn on git push | |

**User's choice:** Block — hard block on all three rule types

---

## Slack Allowlist

| Option | Description | Selected |
|--------|-------------|----------|
| #pantheon + #the-orb only | Strictest, two channels | |
| Add #operations too | Three channels | ✓ |
| Let me list them | Custom allowlist | |

**User's choice:** #pantheon, #the-orb, #operations

---

## Secret Patterns

| Option | Description | Selected |
|--------|-------------|----------|
| Standard set (Recommended) | .env, credentials.json, *.pem, *.key, etc. | ✓ |
| Strict set | Standard + password/auth/private filenames | |
| Minimal | Only .env and credentials.json | |

**User's choice:** Standard set

---

## Context Profiles

### Detection Method

| Option | Description | Selected |
|--------|-------------|----------|
| Directory-based (Recommended) | Working directory determines profile | ✓ |
| Keyword-based | Scan prompt for keywords | |
| Manual selection | User picks at session start | |

### Profile Count

| Option | Description | Selected |
|--------|-------------|----------|
| 4 profiles (Recommended) | orb, jarvis, hardware, creative | ✓ |
| 2 profiles | orb (software) and hardware (firmware) | |
| Custom | User-defined profiles | |

---

## Claude's Discretion

- Channel ID resolution
- Hook implementation pattern
- Settings.json matcher configuration

## Deferred Ideas

None — discussion stayed within phase scope
