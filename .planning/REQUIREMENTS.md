# Claude Code Infrastructure Upgrades -- Requirements

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
- [x] **VISQA-02**: Screenshot comparison detects visual regressions above a configurable threshold
- [x] **VISQA-03**: Visual QA results block commit when delta exceeds threshold

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

## v1.2 Requirements

**Milestone:** Smithers-First Architecture + JARVIS Agentic Tools
**Defined:** 2026-04-04
**Core value:** Make Smithers the single conversation entry point with clear voice-role identity, and give JARVIS the ability to modify its own interface via voice commands.

### Routing & Voice Identity

- [ ] **ROUT-01**: Every query from R1 and JARVIS web is classified by a regex intent classifier before reaching the LLM path -- routing to smithers, jarvis, or goddess route
- [ ] **ROUT-02**: Each route is bound to the correct ElevenLabs voice -- Smithers voice for tasks/orchestration, JARVIS voice for general conversation, Goddess voice for mythology/storytelling
- [ ] **ROUT-03**: The classifier runs in parallel with the fast path (not as a sequential gate) so total voice latency stays under 300ms
- [ ] **ROUT-04**: The conversation_history dict is re-keyed so routing changes cannot silently write context into the wrong voice bucket

### Agentic Tools

- [ ] **AGEN-01**: User can say a build-intent command ("make the orb pulse faster", "change the color") and JARVIS reads the relevant frontend file and writes the change
- [ ] **AGEN-02**: File reads and writes are sandboxed to r1-frontend/ via Path.resolve() assertion -- paths outside the sandbox return an error to the LLM
- [ ] **AGEN-03**: exec_shell accepts only an explicit allowlist of commands (npm run build, git status, git diff) -- any other command is refused with an error string
- [ ] **AGEN-04**: reload_frontend uses ADB to refresh the R1 browser after a code change -- uses am start re-navigation (CDP upgrade path deferred until R1 remote-debug status confirmed)
- [ ] **AGEN-05**: The agentic loop is capped at 5 iterations -- on cap hit, JARVIS speaks a failure summary rather than looping indefinitely

### System Health

- [ ] **HLTH-01**: orb-backend starts cleanly with no port conflicts -- root cause diagnosed and fixed (port 8400 Chrome Helper race + env var canonicalization)
- [ ] **HLTH-02**: Mission Control (:4000) is running and responding to health checks
- [ ] **HLTH-03**: JARVIS web (:5556) is running and accessible
- [ ] **HLTH-04**: Health Dashboard (:6001) is running and showing accurate service status

## v2 Requirements

Deferred to future milestone. Tracked but not in current roadmap.

### Advanced Automation

- **AUTO-01**: Webhook-triggered scheduled tasks (external event -> Claude Code action)
- **AUTO-02**: Cross-session state sharing via shared memory files
- **AUTO-03**: Automatic skill activation based on file type detection

## Out of Scope

| Feature | Reason |
|---------|--------|
| New skills creation | 565+ skills already exist, focus on infrastructure not content |
| Smithers model routing changes | Cost-optimized routing already at $12-20/month, don't touch |
| Hook rewrite | 8 hooks already work, only extending gsd-prompt-guard |
| Agent SDK integration | Future milestone -- evaluate after infrastructure is solid |
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
| VISQA-02 | Phase 13 | Complete |
| VISQA-03 | Phase 13 | Complete |
| ROUT-01 | Phase 14 | Pending |
| ROUT-02 | Phase 14 | Pending |
| ROUT-03 | Phase 14 | Pending |
| ROUT-04 | Phase 14 | Pending |
| AGEN-01 | Phase 15 | Pending |
| AGEN-02 | Phase 15 | Pending |
| AGEN-03 | Phase 15 | Pending |
| AGEN-04 | Phase 15 | Pending |
| AGEN-05 | Phase 15 | Pending |
| HLTH-01 | Phase 16 | Pending |
| HLTH-02 | Phase 16 | Pending |
| HLTH-03 | Phase 16 | Pending |
| HLTH-04 | Phase 16 | Pending |

### R1 Face Integration & Contextual Assets

- [ ] **FACE-01**: Zeus face displays emotion expressions (BrowFurrow, BrowRaise, EyesSquint, MouthOpen) driven by Claude mood_tag during speech, with smooth lerp transitions
- [ ] **FACE-02**: Athena goddess face GLB generated from existing Blender displacement mask, integrated into R1 frontend with same jaw/expression system as Zeus
- [ ] **ASSET-01**: All 62 scanned 2D→3D icon GLBs (IMG_7036–7099) deployed to R1 frontend models/ directory and merged into wireframe-catalog.json
- [ ] **ASSET-02**: Keyword trigger map built — conversation text matched to GLB models, triggering contextual morph via existing point-cloud transformation engine during speech
- [ ] **POLISH-01**: Wireframe outline emphasis and visual QA completed for all 12 sacred animals + 62 scanned icons in all render modes
- [ ] **PERF-01**: FPS benchmark measured on actual R1 hardware with all systems active (morph + particles + face + rings + constellation lines)

| Requirement | Phase | Status |
|-------------|-------|--------|
| FACE-01 | Phase 17 | Pending |
| FACE-02 | Phase 17 | Pending |
| ASSET-01 | Phase 17 | Pending |
| ASSET-02 | Phase 17 | Pending |
| POLISH-01 | Phase 17 | Pending |
| PERF-01 | Phase 17 | Pending |

### R1 Pipeline Control & Approval

- [ ] **PIPE-01**: Voice command "Start SC pipeline for [deity]" triggers Sacred Circuits automation scripts via Smithers shell execution and returns voice confirmation with asset count
- [ ] **PIPE-02**: Pipeline status query returns real-time progress (queued/generating/complete/failed) displayed on R1 with voice summary
- [ ] **PIPE-03**: Completed assets display as preview images on R1 behind the orb, with voice-driven approve/reject/redo workflow that feeds back into the pipeline
- [ ] **PIPE-04**: Approved outputs auto-save to Obsidian vault and post to configured Slack channel with approval metadata

| Requirement | Phase | Status |
|-------------|-------|--------|
| PIPE-01 | Phase 18 | Pending |
| PIPE-02 | Phase 18 | Pending |
| PIPE-03 | Phase 18 | Pending |
| PIPE-04 | Phase 18 | Pending |

**Coverage:**
- v1.1 requirements: 18 total, mapped to phases: 18, unmapped: 0
- v1.2 requirements: 19 total, mapped to phases: 19, unmapped: 0

## v1.3 Requirements

**Milestone:** Stack Upgrade — AI Creator Wiki Implementation
**Defined:** 2026-04-17
**Core value:** Transform the stack from AI-assisted to AI-native across Smithers, JARVIS, Obsidian, and Sacred Circuits.

### Cost & Efficiency

- [ ] **COST-01**: System identifies top 3 token killers across JARVIS/Smithers API calls from last 7 days of logs
- [ ] **COST-02**: Context trimming strategy implemented for top killers — measurable reduction in tokens per request
- [ ] **COST-03**: Adviser/Executor routing active — Opus used for Oracle readings and complex multi-step tasks, Haiku fast path (<2.5s) completely unchanged
- [ ] **COST-04**: supergemma4-26b-mlx validated as free-tier default in Smithers — confirmed routing CODING/REASONING/GENERAL/DATA tasks to port 8080

### Agent Behavior

- [ ] **BEHAV-01**: SOUL.md exists at `~/.claude/SOUL.md` — behavioral spec for JARVIS (voice persona), Smithers (orchestration principles), Sacred Circuits (reading tone)
- [ ] **BEHAV-02**: 21 Greek god persona files exist at `niko-obsidian-vault/sacred-circuits/souls/[god-name].md` — each specifies rhetorical style, mythological frame, forbidden responses
- [ ] **BEHAV-03**: Oracle Reading Skill exists at `~/.claude/skills/oracle-reading/SKILL.md` — callable by JARVIS, executes full Sacred Circuits reading chain, outputs structured result
- [ ] **BEHAV-04**: Morning Briefing Routine runs at 7AM on Smithers — compiles overnight JARVIS outputs, writes formatted briefing to `niko-obsidian-vault/AGENT_OUTPUT_SHELF/morning-briefing/`

### Obsidian Memory

- [ ] **MEM-01**: After each Oracle reading, JARVIS writes structured entry to `niko-obsidian-vault/sacred-circuits/readings/` — god, querent theme, key insight, date
- [ ] **MEM-02**: Output schema defined and enforced for all agent write-back operations — unstructured vault writes blocked
- [ ] **MEM-03**: Weekly content research pipeline runs via Firecrawl — scrapes mythology/AI content from YouTube/X/Reddit, outputs `content-brief.md` to `niko-obsidian-vault/sacred-circuits/content-briefs/`

### Pipelines

- [ ] **PIPE-05**: Oracle reading pipeline delivers complete reading in <30 seconds — QR scan → querent data → god selection → parallel agents → assembled reading
- [ ] **PIPE-06**: Human bottleneck removed from Oracle reading generation — AI generates full draft, human reviews and blesses only
- [ ] **PIPE-07**: Smithers dispatches 2 parallel agents simultaneously — research agent + writing agent run concurrently on Mac Mini
- [ ] **PIPE-08**: Sacred Circuits video pipeline produces review-ready clip — script → ElevenLabs god voice → Nano Banana visual → assembled short-form clip

| Requirement | Phase | Status |
|-------------|-------|--------|
| COST-01 | Phase 19 | Pending |
| COST-02 | Phase 19 | Pending |
| COST-04 | Phase 19 | Pending |
| BEHAV-01 | Phase 19 | Pending |
| BEHAV-04 | Phase 19 | Pending |
| BEHAV-02 | Phase 20 | Pending |
| BEHAV-03 | Phase 20 | Pending |
| COST-03 | Phase 20 | Pending |
| MEM-01 | Phase 21 | Pending |
| MEM-02 | Phase 21 | Pending |
| PIPE-05 | Phase 22 | Pending |
| PIPE-06 | Phase 22 | Pending |
| PIPE-07 | Phase 23 | Pending |
| PIPE-08 | Phase 23 | Pending |
| MEM-03 | Phase 23 | Pending |

**Coverage:**
- v1.3 requirements: 15 total, mapped to phases: 15, unmapped: 0

---
*Requirements defined: 2026-04-01 (v1.1), 2026-04-04 (v1.2, v1.2+face), 2026-04-17 (v1.3)*
*Last updated: 2026-04-17 after v1.3 roadmap creation*
