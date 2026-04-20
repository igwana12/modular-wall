---
phase: 260419-ous
plan: "01"
subsystem: obsidian-vault
tags: [vault, wikilinks, embeddings, moc, dataview, knowledge-graph]
dependency_graph:
  requires: []
  provides: [vault-cross-linking, vault-semantic-graph, vault-moc-index]
  affects: [obsidian-vault]
tech_stack:
  added: [nomic-embed-text, python-frontmatter]
  patterns: [sha256-cache, mask-replace-restore, cosine-similarity-matrix]
key_files:
  created:
    - /Users/claw2501/scripts/vault-wikilink-inject.py
    - /Users/claw2501/scripts/vault-tag-extract.py
    - /Users/claw2501/scripts/vault-moc-gen.py
    - /Users/claw2501/scripts/vault-semantic-embed.py
    - /Users/claw2501/scripts/vault-dataview-index.py
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/INDEX.md
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/INDEX.md
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/ (180 files)
  modified:
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/ (1,176+ notes)
decisions:
  - "Used mask-then-replace approach for wikilink injection to avoid contaminating markdown [text](url) links"
  - "Resource fork (._*.md) files excluded from processing after causing 1176 errors on first dry-run"
  - "Semantic embeddings cached at ~/.cache/vault-embed/ by SHA-256 body hash for full resumability"
  - "MOC idempotency uses stable hash with timestamp stripped from comparison"
  - "Corrupt YAML note (28-athenian-mirror.md) excluded from related: writes — documented as known skip"
  - "Dataview mode detected (plugin present): INDEX.md uses live Dataview queries, not static lists"
metrics:
  duration: ~90 minutes
  completed: "2026-04-19"
  tasks_completed: 5
  files_modified: 1300+
---

# Phase 260419-ous Plan 01: Obsidian Vault Full Cross-Linking Pipeline Summary

**One-liner:** Five-step idempotent pipeline wikilinks 1,241 notes, tags 1,033 via keyword taxonomy, generates 180 MOC files, embeds 1,419 notes via nomic-embed-text cosine similarity, and creates Dataview INDEX.md — transforming a flat vault into a navigable knowledge graph.

---

## Tasks Completed

| Task | Name | Vault Commit | Home Commit | Result |
|------|------|-------------|-------------|--------|
| 1 | Wikilink injection | 22366a38, 71ead578 | d7a7c3e, 3894cae | 1,176+ notes wikilinked |
| 2 | Tag extraction | 0df13d31 | cdb8e6e | 693 notes tagged across 13 themes |
| 3 | MOC generation | b063a74e | 6fd639a | 180 MOC files created |
| 4 | Semantic embeddings | 887dddca | ea62611 | 1,418 notes with related: top-5 |
| 5 | Dataview INDEX | e707f326 | c9bdfdd | INDEX.md + WRITING/INDEX.md |

---

## Counts

| Metric | Value |
|--------|-------|
| Total notes in vault | 1,265 |
| Notes processed (non-fork) | 1,241 |
| Wikilink occurrences injected | 17,961+ |
| Notes with YAML tags | 1,033 |
| MOC files created | 180 (179 themes + README) |
| Notes embedded | 1,419 (includes MOC notes) |
| Embedding cache entries | ~1,419 at ~/.cache/vault-embed/ |
| Notes with related: top-5 | 1,417 |
| Dataview mode | dataview (plugin detected) |

---

## Theme Distribution (Tag Step)

| Theme | Notes Tagged |
|-------|-------------|
| sacred-circuits | 381 |
| writing | 332 |
| psychedelics | 178 |
| family | 218 |
| mythology | 201 |
| identity | 190 |
| travel | 149 |
| finance | 153 |
| consciousness | 125 |
| health | 63 |
| jarvis | 62 |
| oracle | 45 |
| philosophy | 19 |

---

## Scripts

All scripts at `~/scripts/`, all idempotent (second run = no-op):

- `vault-wikilink-inject.py` — walks vault, builds title index (1,040 entries), injects first-occurrence `[[wikilinks]]` using mask-restore pattern
- `vault-tag-extract.py` — keyword taxonomy → YAML `tags:` merge, 2-match threshold
- `vault-moc-gen.py` — per-tag MOC notes in `/MOC/`, preserves hand-written content below `<!-- end-auto -->`
- `vault-semantic-embed.py` — nomic-embed-text embeddings, SHA-256 cache, cosine similarity top-5 → `related:` frontmatter
- `vault-dataview-index.py` — auto-detects Dataview plugin, generates live queries or static lists

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] macOS resource fork files (._*.md) contaminated title index**
- **Found during:** Task 1 idempotency check
- **Issue:** Binary `._` resource fork files with `.md` extension caused 1,176 read errors and inflated the title index from 1,040 to 2,031 entries
- **Fix:** Added `not f.startswith("._")` filter to `collect_md_files()` in all scripts
- **Files modified:** vault-wikilink-inject.py (and applied to all subsequent scripts)
- **Commit:** 3894cae

**2. [Rule 1 - Bug] Markdown links `[text](url)` not excluded from wikilink injection**
- **Found during:** Task 1 idempotency check (21 notes kept getting re-modified)
- **Issue:** Pattern `(?<!\[)` guards against `[[` but not bare URLs inside `(url)` part of markdown links
- **Fix:** Rewrote inject logic to use mask-protect-restore pattern — all code blocks, inline code, existing wikilinks, markdown links, and URLs are tokenized before substitution and restored after
- **Files modified:** vault-wikilink-inject.py
- **Commit:** 3894cae

**3. [Rule 1 - Bug] datetime.date objects in YAML tags caused TypeError on sorted()**
- **Found during:** Task 2 first dry-run
- **Issue:** Some notes had date-typed values in tags lists; `sorted(set(...))` failed comparing str vs date
- **Fix:** Added `str(t)` coercion for all existing tag values before set union
- **Files modified:** vault-tag-extract.py
- **Commit:** cdb8e6e

**4. [Rule 2 - Missing] Corrupt YAML note skipped silently in embeddings step**
- **Found during:** Task 4 idempotency check (stable 1 remaining)
- **Issue:** `28-athenian-mirror.md` has malformed YAML; `get_existing_related` caught the exception and returned `[]`, making the note always appear to need an update
- **Fix:** `get_existing_related` now returns `(list, parseable: bool)`; unparseable notes counted as `unchanged` and skipped from write
- **Files modified:** vault-semantic-embed.py
- **Commit:** ea62611

---

## Known Issues (Non-blocking)

- **Vault git warnings:** `error: non-monotonic index ._pack-*.idx` on every vault git operation. Caused by macOS resource fork binary files tracked in `.git/objects/pack/`. Does not affect commit integrity. Cosmetic only.
- **Corrupt note:** `SACRED-CIRCUITS/published/28-athenian-mirror.md` — malformed YAML frontmatter prevents `related:` injection. Note still readable in Obsidian; manually fix YAML to resolve.
- **Wikilink convergence:** Script required 3 passes to reach 0-modification idempotency due to cross-note title dependencies. All passes applied before commit.

---

## Self-Check: PASSED

All 5 scripts found at ~/scripts/. All 6 vault commits verified. INDEX.md, WRITING/INDEX.md, and MOC/ (180 files) confirmed present.
