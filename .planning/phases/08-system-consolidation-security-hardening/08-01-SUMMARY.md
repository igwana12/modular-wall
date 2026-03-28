---
phase: 08-system-consolidation-security-hardening
plan: 01
subsystem: infra
tags: [security, credentials, env, bash, keychain]

requires: []
provides:
  - "Audited credential inventory across all drives and services"
  - "Canonical load-keys.sh for services to source wallet keys"
  - "Hardened sync-keys.sh with freshness check and expanded targets"
  - "Credential audit report documenting 55+ .env files across 3 drives"
affects: [08-02, 08-03, 08-04, 08-05]

tech-stack:
  added: []
  patterns:
    - "Source load-keys.sh instead of maintaining per-service .env duplicates"
    - "Wallet freshness check prevents stale key propagation"

key-files:
  created:
    - "/Volumes/Extreme Pro/CONFIG/load-keys.sh"
    - "/Volumes/Extreme Pro/CONFIG/credential-audit-2026-03-28.txt"
  modified:
    - "/Volumes/Extreme Pro/CONFIG/sync-keys.sh"
    - "/Volumes/AI_WORKSPACE/Trading/metasignals-bot/.env"

key-decisions:
  - "External drive files not committed to git -- audit artifacts live on Extreme Pro"
  - "Added 2 new sync targets (python_backend, llm-council) and removed 1 missing target (sacred-circuits-empire)"
  - "Fixed world-readable permissions on exposed_credentials .env files (644 to 600)"

patterns-established:
  - "Wallet freshness guard: sync-keys.sh refuses to run if wallet is older than any target"
  - "Canonical loader pattern: source load-keys.sh to get all keys, no per-service duplication"

requirements-completed: [SEC-01]

duration: 8min
completed: 2026-03-28
---

# Phase 08 Plan 01: Credential Audit and Key Consolidation Summary

**Post-incident credential audit across 55+ .env files, canonical load-keys.sh loader, and hardened sync-keys.sh with wallet freshness guard**

## Performance

- **Duration:** 8 min
- **Started:** 2026-03-28T23:10:05Z
- **Completed:** 2026-03-28T23:18:30Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Full audit of 55+ .env files across Extreme Pro, AI_WORKSPACE, and local services -- catalogued every key location
- Found 4 stale keys in services/smithers/.env that diverged from the master wallet (ANTHROPIC_API_KEY, XAI_API_KEY, MOONSHOT_API_KEY, PERPLEXITY_API_KEY)
- Created canonical load-keys.sh that services can source to get all wallet keys in one command
- Hardened sync-keys.sh with wallet freshness check (refuses to propagate stale keys), expanded from 28 to 30 targets
- Fixed world-readable permissions on 2 exposed_credentials .env files (644 to 600)

## Task Commits

Each task was committed atomically:

1. **Task 1: Audit sync-keys.sh and all .env files across drives** - No git commit (all files on external drives, not in repo)
2. **Task 2: Create canonical load-keys.sh and harden trading bot credentials** - No git commit (all files on external drives, not in repo)

**Plan metadata:** (pending) docs commit with SUMMARY.md and STATE.md

_Note: This plan operates entirely on external drive files. No source code in the git repo was created or modified. The SUMMARY.md and state updates are the only git-tracked artifacts._

## Files Created/Modified
- `/Volumes/Extreme Pro/CONFIG/load-keys.sh` - Canonical key loader, source to export all wallet keys
- `/Volumes/Extreme Pro/CONFIG/sync-keys.sh` - Updated with audit header, freshness guard, 2 new targets, 1 removed target
- `/Volumes/Extreme Pro/CONFIG/credential-audit-2026-03-28.txt` - Full audit report with findings and recommendations
- `/Volumes/AI_WORKSPACE/Trading/metasignals-bot/.env` - Added wallet key warning comment

## Decisions Made
- External drive files are NOT committed to git -- credential management scripts and audit reports live exclusively on the Extreme Pro external drive
- Added python_backend/.env and llm-council/.env as new sync targets (5 ACTIVE .env files were found outside sync coverage; these 2 contain keys that need syncing)
- Removed sacred-circuits-empire/.env from sync targets (file does not exist, was silently failing)
- Fixed exposed_credentials permissions as Rule 2 auto-fix (security critical)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Security] Fixed world-readable permissions on exposed_credentials .env files**
- **Found during:** Task 1 (audit scan)
- **Issue:** /Volumes/AI_WORKSPACE/_REVIEW/exposed_credentials/.env had 644 permissions (world-readable)
- **Fix:** chmod 600 on both exposed_credentials .env files (Extreme Pro and AI_WORKSPACE)
- **Files modified:** 2 exposed_credentials .env files
- **Verification:** ls -la confirms -rw------- permissions
- **Committed in:** N/A (external drive files)

---

**Total deviations:** 1 auto-fixed (1 security)
**Impact on plan:** Essential security fix discovered during audit. No scope creep.

## Issues Encountered
- Smithers .env has 4 keys mismatched with wallet. This was documented in the audit report. The user needs to re-run sync-keys.sh to propagate the wallet keys. This is an IMMEDIATE action item.

## Known Stubs
None -- this plan produces scripts and an audit report, not application code.

## User Setup Required
**IMMEDIATE ACTION:** Run sync-keys.sh to fix the 4 stale keys in services/smithers/.env:
```bash
bash "/Volumes/Extreme Pro/CONFIG/sync-keys.sh"
```

## Next Phase Readiness
- Credential inventory complete -- all .env locations documented
- Canonical loader ready for services to adopt
- Sync script hardened with freshness check
- Ready for remaining Phase 08 plans (skill deduplication, git-init, worktree cleanup)

## Self-Check: PASSED

- load-keys.sh: FOUND
- sync-keys.sh: FOUND
- credential-audit-2026-03-28.txt: FOUND
- 08-01-SUMMARY.md: FOUND

---
*Phase: 08-system-consolidation-security-hardening*
*Completed: 2026-03-28*
