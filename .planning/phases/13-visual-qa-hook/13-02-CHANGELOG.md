# 13-02 Changelog: Visual Regression Comparison

Files modified outside repository boundary. Tracked here for audit trail.

## Task 1: Pixelmatch comparison and baseline management

### Modified
- `/Users/claw2501/.claude/hooks/visual-qa-hook.js` - Extended with pixelmatch comparison (225 lines)
  - Baseline lookup and first-run auto-save
  - Pixel comparison using pixelmatch + pngjs
  - Dimension mismatch treated as 100% diff
  - Diff image generation in ~/.visual-qa/diffs/
  - Regression state written to /tmp/visual-qa-state.json
  - Advisory output with diff percentage and resolution steps

### Created
- `/Users/claw2501/.claude/hooks/package.json` - Node.js package manifest for hook dependencies
- `/Users/claw2501/.claude/hooks/package-lock.json` - Lock file for pixelmatch + pngjs
- `/Users/claw2501/scripts/update-visual-baseline.sh` - Baseline update script (chmod +x)
  - Copies latest screenshot as new baseline
  - Clears regression state in /tmp/visual-qa-state.json

### Dependencies installed
- pixelmatch (npm, local to ~/.claude/hooks/)
- pngjs (npm, local to ~/.claude/hooks/)

## Task 2: Commit guard and PreToolUse wiring

### Created
- `/Users/claw2501/.claude/hooks/visual-qa-commit-guard.js` - PreToolUse hook (83 lines)
  - Reads /tmp/visual-qa-state.json for regression state
  - Filters: only Bash tool calls containing "git commit"
  - 1-hour staleness check (ignores old state from previous sessions)
  - Advisory warning with baseline name, diff %, diff image path, resolution steps
  - User can override via Claude Code permission prompt

### Modified
- `/Users/claw2501/.claude/settings.json` - Added PreToolUse entry for visual-qa-commit-guard.js
  - PostToolUse: 4 hooks, PreToolUse: 2 hooks (all existing hooks preserved)

### Verification Results
- Regression active + git commit -> BLOCKED (with message)
- No regression + git commit -> ALLOWED (silent exit)
- Non-git-commit Bash commands -> ALLOWED (silent exit)
- Stale state (>1 hour) -> ALLOWED
- Settings.json valid JSON with correct hook counts
