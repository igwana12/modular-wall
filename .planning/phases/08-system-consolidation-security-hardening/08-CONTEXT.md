# Phase 8: System Consolidation & Security Hardening - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning
**Source:** Live audit session (7 sub-agents scanned all drives, skills, MCP servers, services, credentials)

<domain>
## Phase Boundary

This phase consolidates and secures the entire Claw AI ecosystem:
- Centralize API credentials into encrypted vault (eliminate scattered .env files)
- Deduplicate skills from 4+ locations into single source of truth
- Remove irrelevant skills (bioinformatics, quantum, pharma) to reduce noise
- Version-control critical services on Extreme Pro
- Clean stale agent worktrees
- Register customized skills in Smithers manifest for auto-routing
- Verify everything still works after changes

This is infrastructure work — no frontend, no product features.

</domain>

<decisions>
## Implementation Decisions

### Security: Credential Consolidation (SEC-01)
- All API keys currently scattered across 9+ .env files on Extreme Pro and AI_WORKSPACE
- Master wallet at /Volumes/Extreme Pro/CONFIG/API_KEYS_WALLET.env (updated Mar 26)
- KeePass databases at /Volumes/Extreme Pro/CONFIG/Passwords.kdbx and /Volumes/AI_WORKSPACE/Passwords.kdbx
- sync-keys.sh at /Volumes/Extreme Pro/CONFIG/ (updated Mar 26, post-incident — needs audit)
- Live Hyperliquid trading bot at /Volumes/AI_WORKSPACE/Trading/metasignals-bot/.env has real wallet keys
- DECISION: Consolidate into single encrypted .env.vault approach — services read from one canonical location, symlinked where needed
- ALREADY DONE: sweet-cookie browser cookie extraction library removed, cookies.js rewritten to env-vars only
- ALREADY DONE: Smithers bound to 127.0.0.1 (server.py x2 + LaunchAgent plist patched)

### Skill Deduplication (SEC-02)
- Skills exist in 4+ locations:
  1. ~/.claude/skills/ (428 native + 146 symlinks = 574 visible)
  2. ~/.agents/skills/ (98 skills — source for 146 symlinks)
  3. /Volumes/Extreme Pro/SKILLS/ (trading-plugins with 2 third-party packs)
  4. /Volumes/AI_WORKSPACE/SKILLS_LIBRARY/ (18 skill directories)
  5. /Volumes/AI_WORKSPACE/CORE/anthropic-skills/ (22 dirs)
  6. /Volumes/AI_WORKSPACE/CORE/claude-trading-skills/ (28 dirs)
- DECISION: ~/.claude/skills/ is the canonical location. ~/.agents/skills/ is the shared source via symlinks. Everything else should either be symlinked in or archived.
- tradermonty-claude-trading-skills (18 trading skills on Extreme Pro) should be evaluated for integration

### Bloat Removal (SEC-03)
- ~150 irrelevant skills identified:
  - Bioinformatics (27): AlphaFold, PubChem, DrugBank, RNA-seq, scanpy, etc.
  - Scientific databases (32): UniProt, COSMIC, KEGG, ClinVar, etc.
  - Quantum computing (3): Qiskit, Cirq, PennyLane
  - Clinical/Pharma (8): PyHealth, clinical-decision-support, etc.
  - Materials science (3): PyMatGen, AstroPy, etc.
  - Redundant ML training (~20): DeepSpeed, Megatron, FSDP, vLLM, TensorRT (not training models)
- DECISION: Move to archive, don't delete — can restore if needed
- Dormant projects on Extreme Pro (88GB): Mobile Specialist (48GB), Psychedelic Journeys (40GB) — archive

### Git Init Critical Services (SEC-04)
- No .git repos found in /Volumes/Extreme Pro/ACTIVE/ — all unversioned
- Critical services to git-init: Smithers, LLM Router, Sacred Circuits Pipeline (v2)
- DECISION: git init with initial commit, add .gitignore (exclude .env, __pycache__, .venv, node_modules)

### Worktree Cleanup (SEC-05)
- 8+ stale agent worktrees in /Users/claw2501/services/smithers/.claude/worktrees/
- Each contains a full copy of server.py at outdated versions
- DECISION: Remove all stale worktrees

### Smithers Auto-Routing Integration (NEW — from user request)
- After skills are customized, register them in Smithers manifest
- Update Smithers system-prompt.md to know about customized skills and when to activate them
- Update routing rules so sub-agents auto-select the right skill for the right task
- Skills to customize and register:
  - deity-voices (forked from ai-voice-cloning) — for oracle card voice work
  - oracle-prompts (forked from prompt-engineering) — for deity reading prompts
  - kickstarter-landing (forked from landing-page-design) — for crowdfunding
  - sc-content-creator (forked from content-creator) — Sacred Circuits brand voice
  - sc-social (forked from social-content) — SC social media

### Post-Consolidation Verification (SEC-06)
- All services must still be running after changes
- All cron jobs intact
- All MCP servers responding
- All skills still accessible via Claude Code
- Smithers manifest refreshed and valid

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Smithers Configuration
- `/Volumes/Extreme Pro/ACTIVE/smithers/system-prompt.md` — Smithers operational protocol
- `/Users/claw2501/services/smithers/server.py` — Main Smithers server
- `/Users/claw2501/services/smithers/manifest.py` — Manifest builder (skill scanning)

### Credential Locations
- `/Volumes/Extreme Pro/CONFIG/API_KEYS_WALLET.env` — Master API keys
- `/Volumes/Extreme Pro/CONFIG/sync-keys.sh` — Key sync script (audit this)
- `/Volumes/Extreme Pro/CONFIG/Passwords.kdbx` — KeePass vault

### Skill Sources
- `~/.claude/skills/` — Claude Code skills (canonical)
- `~/.agents/skills/` — Shared agent skills (symlink source)
- `/Volumes/Extreme Pro/SKILLS/trading-plugins/` — Third-party trading skills

### LaunchAgents
- `~/Library/LaunchAgents/com.claw.smithers.plist` — Smithers auto-start
- `~/Library/LaunchAgents/com.claw.llm-router.plist` — LLM Router auto-start

</canonical_refs>

<specifics>
## Specific Ideas

- Use KeePass CLI (keepassxc-cli) to manage credentials programmatically
- Create a single `load-keys.sh` script that services source from the encrypted vault
- For skill archival, create ~/.claude/skills-archive/ rather than deleting
- Smithers manifest.py already scans ~/.claude/skills/ — extend to include skill metadata (when to activate)

</specifics>

<deferred>
## Deferred Ideas

- Full permission model review (re-enabling selective permissions) — monitor first
- ESP32/Hardware skills — build when Phase 4 starts
- QR Code and Print Design skills — build when Phase 3 resumes

</deferred>

---

## Extreme Pro Drive — Sacred Circuits Media Inventory (Scanned 2026-03-29)

The following assets on /Volumes/Extreme Pro/ are relevant to the Orb project and should be considered in future phase planning:

### Sacred Circuits Empire (35 GB)
- **Path:** `/Volumes/Extreme Pro/ACTIVE/sacred-circuits-empire/`
- Professional voiceover recordings (14+ AIFF + MP3 files)
- Video output, audio output, media cache
- GLOBAL_ORACLE_MANIFESTO.md, MEDIA_GENERATION_PIPELINE.md
- Philosophy knowledge base, oracle schemas, user profiles

### Sacred Circuits Outputs (63.5 GB)
- **Path:** `/Volumes/Extreme Pro/sacred-circuits-outputs/`
- Midjourney images with JSON metadata (hundreds of PNGs — cosmic/orb/spiritual themes)
- Videos (316 MB), voiceovers (110 MB — "all_wise_one" recordings)
- Sound effects, TikTok scripts, catalogs, research briefs

### MYTHS Database (Deity Content)
- **Path:** `/Volumes/Extreme Pro/MYTHS/`
- Complete deity profiles: 01-ZEUS through 21-MNEMOSYNE
- Per-deity EXPORTS/ directories with PANELS/, VIDEO/, AUDIO/, STITCH/
- VOICE-PROFILES.md — deity voice characterizations
- Production scripts: THE_PANTHEON_SYSTEM.py, MYTHOLOGY_MASTER_PIPELINE.py

### Oracle Cards Strategy
- **Path:** `/Volumes/Extreme Pro/Sacred Circuits Global Media Empire/`
- SACRED_CIRCUITS_ORACLE_CARDS_MONETIZATION_STRATEGY.md
- Midjourney storyboard prompts (Zeus-specific, 16:9, 9:16 formats)
- Storyboard generation scripts and viewer templates

### Sacred Circuits Pipeline v1 + v2 (~111 GB)
- **Path:** `/Volumes/Extreme Pro/ACTIVE/sacred-circuits-pipeline/` and `sacred-circuits-v2/`
- Full image/video/voice generation pipeline
- Kling AI video synthesis, Midjourney integration, multi-platform distribution

### Total: ~211 GB of media and pipeline infrastructure on Extreme Pro

---

*Phase: 08-system-consolidation-security-hardening*
*Context gathered: 2026-03-28 via live audit session*
