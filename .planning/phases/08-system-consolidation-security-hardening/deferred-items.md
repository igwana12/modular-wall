# Deferred Items - Phase 08

## Discovered During Plan 05 (Post-Consolidation Verification)

### 1. Broken Symlinks in Skills Directory
- **55 broken symlinks** in `~/.claude/skills/` pointing to `../../.agents/skills/*`
- Pre-existing from old skill installation method
- Cosmetic issue -- manifest correctly ignores them (detects 539 valid skills)
- Fix: `find ~/.claude/skills/ -type l ! -exec test -e {} \; -delete`

### 2. Missing Cron Script Paths
- `github-backup.sh` at `/Users/claw2501/.openclaw/workspace/tools/github-backup.sh` -- MISSING
- `meta-cron.sh` at `/Users/claw2501/.openclaw/workspace/tools/meta-cron.sh` -- MISSING
- `sunday-reflection-create.sh` at `/Users/claw2501/.openclaw/workspace/tools/sunday-reflection-create.sh` -- MISSING
- Pre-existing, not caused by Phase 08

### 3. JARVIS HTTP Endpoint
- PID 3241 running but HTTP 000 on port 5555
- LaunchAgent shows exit code 78
- Pre-existing issue

### 4. Optional LaunchAgents in Error State
- com.openclaw.sacred-circuits-8000 (exit 1)
- com.openclaw.portfolio-pulse (exit 2)
- com.claw.health-dashboard (exit 1)
- com.claw.infranodus (exit 1)
- Pre-existing, non-critical
