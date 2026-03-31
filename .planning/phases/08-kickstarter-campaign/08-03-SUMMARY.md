---
phase: 08-kickstarter-campaign
plan: 03
subsystem: community
tags: [discord, email, kit, convertkit, open-source, github, esp32, content-marketing]

requires:
  - phase: 03
    provides: Kit/ConvertKit webhook integration for deposit and signup flows
provides:
  - Discord server blueprint with 6 categories, 14 channels, and 5 roles
  - Kit email drip sequences (5 pre-launch + 3 post-campaign)
  - 12-week build-in-public content calendar across 7 channels
  - GitHub orb-firmware repo structure mapping 53 firmware files
  - Draft README with quick start and architecture for open-source repo
  - CONTRIBUTING guidelines with open vs proprietary boundaries
affects: [kickstarter-launch, community-management, github-publication]

tech-stack:
  added: [kit-convertkit, discord, mee6-or-carl-bot]
  patterns: [multi-license-open-source, build-in-public-content-strategy]

key-files:
  created:
    - campaign/community/discord-setup.md
    - campaign/community/email-sequences.md
    - campaign/community/build-in-public-plan.md
    - campaign/open-source/repo-structure.md
    - campaign/open-source/README.md
    - campaign/open-source/CONTRIBUTING.md

key-decisions:
  - "Multi-license approach: MIT (firmware), CERN-OHL-S-2.0 (hardware), CC BY-SA 4.0 (enclosure)"
  - "Phased GitHub releases: v0.1.0 oracle-engine only, v0.2.0 adds pov-globe, v0.3.0 spirit-sphere, v1.0.0 at launch"
  - "4-phase Discord seeding: core (50-100), makers (200-300), content-driven (500-800), launch (1000+)"

patterns-established:
  - "Open vs proprietary boundary: firmware/hardware open, voices/prompts/art proprietary"
  - "Email tag strategy: deposit_holder, email_only, backer_* for segment-specific sequences"

requirements-completed: [KS-06, KS-07]

duration: 5min
completed: 2026-03-31
---

# Phase 08 Plan 03: Community & Open-Source Summary

**Discord server blueprint, Kit email sequences (8 emails), 12-week build-in-public calendar, and orb-firmware GitHub repo structure with multi-license documentation**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-31T13:27:15Z
- **Completed:** 2026-03-31T13:32:30Z
- **Tasks:** 2
- **Files created:** 6

## Accomplishments
- Discord server with 6 categories (WELCOME, ANNOUNCEMENTS, COMMUNITY, BUILDERS, KICKSTARTER, VOICE), 14 channels, 5 roles, and a 4-phase seeding strategy targeting 1,000+ members at launch
- Kit email drip sequences: 5 pre-launch emails (week 12 to launch day) and 3 post-campaign emails (month 1 to month 5), with tag-based segmentation
- 12-week build-in-public content calendar covering Reddit, YouTube, TikTok, Discord, Email, Hacker News, and Twitter/X with weekly content assignments
- Open-source repo structure mapping all 53 firmware files and 4 hardware docs to a publishable GitHub layout with sanitization checklist
- Draft README with badges, quick start, architecture diagram, and three-license breakdown (MIT/CERN-OHL-S-2.0/CC BY-SA 4.0)
- CONTRIBUTING.md with pull request workflow, Arduino code style guide, and clear open vs proprietary boundaries

## Task Commits

Each task was committed atomically:

1. **Task 1: Design Discord server and email drip sequences** - `9c35ac9` (feat)
2. **Task 2: Prepare open-source repo structure and documentation** - `f146ca8` (feat)

## Files Created/Modified
- `campaign/community/discord-setup.md` - Discord server blueprint with channels, roles, bots, and seeding strategy
- `campaign/community/email-sequences.md` - Kit drip sequences: 5 pre-launch + 3 post-campaign emails
- `campaign/community/build-in-public-plan.md` - 12-week content calendar across 7 channels
- `campaign/open-source/repo-structure.md` - Maps firmware/ and hardware/ to GitHub repo layout
- `campaign/open-source/README.md` - Draft GitHub README for orb-firmware repo
- `campaign/open-source/CONTRIBUTING.md` - Contribution guidelines with code style and PR workflow

## Decisions Made
- Multi-license approach: MIT for firmware code, CERN-OHL-S-2.0 for hardware designs, CC BY-SA 4.0 for 3D printable enclosure files
- Phased GitHub release plan: v0.1.0 (Oracle Engine only at week 12), v0.2.0 (POV Globe at week 8), v0.3.0 (Spirit Sphere at week 4), v1.0.0 (Kickstarter launch day)
- 4-phase Discord seeding: existing deposit holders first, then maker subreddits, then content-driven growth, then Kickstarter launch wave
- MEE6 or Carl-bot for Discord automation (no custom bot needed for v1)
- Email segmentation via Kit tags: deposit_holder, email_only, and tier-specific backer tags

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- `campaign/` directory is in .gitignore -- used `git add -f` to force-add files. This is expected since campaign docs are planning artifacts that should be tracked.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Community infrastructure fully documented and ready for Discord server creation
- Email sequences ready for Kit automation setup
- Open-source repo structure ready for GitHub publication when firmware is sanitized
- Content calendar provides a week-by-week action plan for pre-launch marketing

## Self-Check: PASSED

All 6 files verified present. Both task commits (9c35ac9, f146ca8) confirmed in git log.

---
*Phase: 08-kickstarter-campaign*
*Completed: 2026-03-31*
