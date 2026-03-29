---
phase: 08-system-consolidation-security-hardening
plan: 04
subsystem: infra
tags: [smithers, skills, activation-triggers, routing, elevenlabs, mckee, kickstarter]

requires:
  - phase: 08-02
    provides: "Deduplicated skill set (574 -> cleaned)"
provides:
  - "5 custom skills with activation metadata for Orb/SC workflows"
  - "Smithers manifest.py scans activation_triggers and project fields"
  - "find_skill_by_trigger() enables query-based skill matching"
  - "Smithers system-prompt.md includes Custom Skills routing table"
affects: [smithers-routing, oracle-cards, sacred-circuits-content, kickstarter-campaign]

tech-stack:
  added: []
  patterns: [activation-trigger-routing, skill-forking-with-metadata]

key-files:
  created:
    - "~/.claude/skills/deity-voices/SKILL.md"
    - "~/.claude/skills/oracle-prompts/SKILL.md"
    - "~/.claude/skills/kickstarter-landing/SKILL.md"
    - "~/.claude/skills/sc-content-creator/SKILL.md"
    - "~/.claude/skills/sc-social/SKILL.md"
  modified:
    - "/Users/claw2501/services/smithers/manifest.py"
    - "/Users/claw2501/services/smithers/system-prompt.md"
    - "/Volumes/Extreme Pro/ACTIVE/smithers/system-prompt.md"
    - "/Volumes/Extreme Pro/ACTIVE/smithers/manifest.py"

key-decisions:
  - "Skills live outside worktree repo (global ~/.claude/skills/) -- not git-tracked in project repo"
  - "find_skill_by_trigger sorts by longest matching trigger for specificity"
  - "Both Smithers copies (local + Extreme Pro) updated in sync"

patterns-established:
  - "activation_triggers YAML list in skill frontmatter for auto-routing"
  - "project field in skill frontmatter for project-scoped filtering"
  - "find_skill_by_trigger() substring matching with specificity sort"

requirements-completed: [SEC-02]

duration: 4min
completed: 2026-03-28
---

# Phase 08 Plan 04: Custom Skills and Smithers Routing Summary

**5 Orb/SC-specific skills with activation metadata registered in Smithers for auto-routing via trigger matching**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-28T23:20:58Z
- **Completed:** 2026-03-28T23:25:00Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Created 5 customized skills forked from generic ones: deity-voices, oracle-prompts, kickstarter-landing, sc-content-creator, sc-social
- Updated Smithers manifest.py to scan activation_triggers and project fields from SKILL.md frontmatter
- Added find_skill_by_trigger() function for query-based skill matching (longest trigger wins for specificity)
- Updated system-prompt.md on both local and Extreme Pro copies with Custom Skills routing table

## Task Commits

Each task was committed atomically:

1. **Task 1: Create 5 customized skills** - not git-tracked (skills live at ~/.claude/skills/ which is gitignored in home repo)
2. **Task 2: Update Smithers manifest.py and system-prompt.md** - `38581a6` in Smithers repo (feat)

## Files Created/Modified
- `~/.claude/skills/deity-voices/SKILL.md` - ElevenLabs voice profiles for 21 Greek gods
- `~/.claude/skills/oracle-prompts/SKILL.md` - McKee storytelling for oracle reading prompts
- `~/.claude/skills/kickstarter-landing/SKILL.md` - Crowdfunding landing pages with $1 deposit CTA
- `~/.claude/skills/sc-content-creator/SKILL.md` - Sacred Circuits brand voice content creation
- `~/.claude/skills/sc-social/SKILL.md` - SC social media management across Instagram/TikTok/X
- `/Users/claw2501/services/smithers/manifest.py` - Added activation_triggers/project parsing and find_skill_by_trigger()
- `/Users/claw2501/services/smithers/system-prompt.md` - Added Custom Skills routing table
- `/Volumes/Extreme Pro/ACTIVE/smithers/system-prompt.md` - Synced Custom Skills routing table
- `/Volumes/Extreme Pro/ACTIVE/smithers/manifest.py` - Synced updated manifest

## Decisions Made
- Skills live outside the worktree repo at ~/.claude/skills/ (gitignored) -- this is by design for global skill availability
- find_skill_by_trigger() uses substring matching with specificity sorting (longest trigger match wins)
- Both copies of system-prompt.md and manifest.py kept in sync (local services/ and Extreme Pro)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Task 1 skills cannot be committed to the worktree repo since ~/.claude/skills/ is outside the repo boundary and gitignored in the home repo. Files exist on disk and are functional.

## Known Stubs

None - all skills are fully populated with content, no placeholder data.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Smithers now has activation metadata scanning for 5 custom skills
- Sub-agents can auto-select the right skill based on task description
- Ready for Phase 08 Plan 05 (Smithers routing integration) or any plan that needs deity voice, oracle prompt, or kickstarter skill routing

---
*Phase: 08-system-consolidation-security-hardening*
*Completed: 2026-03-28*
