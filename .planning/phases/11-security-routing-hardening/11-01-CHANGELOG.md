# 11-01 Changelog: Prompt Guard Extension

Files modified outside repo (system config):

## Task 1: Extend gsd-prompt-guard.js

**File:** `/Users/claw2501/.claude/hooks/gsd-prompt-guard.js`
**Version:** 1.30.0 -> 1.31.0

**Changes:**
- Added SLACK CHANNEL GUARD: Advisory warning when Bash commands target Slack channels outside #pantheon and #the-orb allowlist
- Added GIT PUSH GUARD: Advisory warning when Bash commands push to main/master branch
- Added SECRET FILE GUARD: Advisory warning when Write/Edit targets .env, credentials, secrets, tokens, .pem, .key files
- Refactored into modular guard functions (checkPromptInjection, checkSlackChannel, checkGitPush, checkSecretFile)
- Extended tool matching from Write|Edit only to Write|Edit|Bash
- All guards remain advisory-only (do not block operations)

**Test Results:**
- Slack to #general: WARNED (correct)
- Slack to #the-orb: PASSED (correct)
- git push origin main: WARNED (correct)
- Write to .env: WARNED (correct)

## Task 2: Update settings.json hook matcher

**File:** `/Users/claw2501/.claude/settings.json`
**Change:** PreToolUse matcher updated from "Write|Edit" to "Write|Edit|Bash"
**Verified:** `node -e` confirms matcher includes "Bash"

## Bug Fix: Slack guard false positive on hashtags

**File:** `/Users/claw2501/.claude/hooks/gsd-prompt-guard.js`
**Rule 1 (auto-fix bug):** The `/#[a-z]/` context check in `checkSlackChannel` matched any `#word` pattern in any Bash command, including git commit messages with `#CHANGELOG`. Fixed to only trigger when command contains `\bslack\b` (case-insensitive) or matches the `SLACK_POST_PATTERN` regex.

## Task 3: Integration test results (all 8 pass)

| # | Test | Expected | Result |
|---|------|----------|--------|
| 1 | Slack to #general | WARN | WARN |
| 2 | Slack to #the-orb | PASS | PASS |
| 3 | Slack to #pantheon | PASS | PASS |
| 4 | git push origin main | WARN | WARN |
| 5 | git push origin feature-branch | PASS | PASS |
| 6 | Write to .env | WARN | WARN |
| 7 | Write to normal .ts | PASS | PASS |
| 8 | Prompt injection in .planning/ | WARN | WARN |
