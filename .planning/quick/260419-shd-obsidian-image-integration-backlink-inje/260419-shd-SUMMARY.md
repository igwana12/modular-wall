---
phase: 260419-shd-obsidian-image-integration
plan: 01
completed: 2026-04-20
duration: ~30 min
tasks_completed: 3
scripts_created:
  - ~/scripts/vault-image-backlink.py
  - ~/scripts/vault-image-moc-gen.py
vault_commits:
  - 2e4fad10
  - 6c1639e5
  - e3d93ade
  - fff29594
home_repo_commits:
  - 04403c2
  - be784a3
  - a530ed6
---

# 260419-shd: Obsidian Image Integration Summary

## One-liner

Backlink injection pipeline from catalog.csv into vault notes + image MOC generation by deity/mood/theme, fully idempotent.

## Scripts Created

### ~/scripts/vault-image-backlink.py
Parses `IMAGES/catalog.csv`, resolves `related_notes` paths against vault root, injects:
- `images:` YAML frontmatter key (sorted unique filenames)
- `## Images` section in note body (one bullet per image with description + catalog link)

Idempotent: second run reports 0 modifications. Supports `--dry-run`.

### ~/scripts/vault-image-moc-gen.py
Generates three MOC files from catalog.csv grouped by dimension:
- `MOC/images/by-deity.md` — grouped by `deities` column
- `MOC/images/by-mood.md` — grouped by `mood` column
- `MOC/images/by-theme.md` — grouped by `sacred_circuits_themes` column

Each MOC has YAML frontmatter (`type: moc`, `auto_generated: true`, `generated_at`), grouped `## {Value}` sections, bullet-per-image with description, related note wikilinks, and `<!-- end-auto -->` marker to preserve hand-written additions. Supports `--dry-run`.

## Counts

| Metric | Value |
|--------|-------|
| Catalog rows scanned | 1,191 |
| Notes updated (backlinks) | 9 |
| Notes skipped — missing | 155 |
| Unique deities indexed | 25 |
| Unique moods indexed | 4 |
| Unique themes indexed | 19 |
| MOC files created | 3 |
| Cross-linking scripts re-run | 4 |

## Notes with Backlinks Injected

- `SACRED-CIRCUITS/COMPLETE_CATALOG.md`
- `SACRED-CIRCUITS/COMPLETE_TIMELINE_EXTRACTED.md`
- `SACRED-CIRCUITS/INDEX.md`
- `SACRED-CIRCUITS/ODYSSEY_CONNECTIONS_INDEX.md`
- `SACRED-CIRCUITS/PUBLICATION_TIMELINE_VERIFICATION.md`
- `SACRED-CIRCUITS/SACRED_CIRCUITS_MASTER_INDEX.md`
- `SACRED-CIRCUITS/VERIFIED_PUBLICATION_TIMELINE.md`
- `PROJECTS/ideas-vault/pantheon/VOICE_SPECS_FEB21-22.md`
- `PROJECTS/odyssey/chapters/Chapter-11-Costa-Rica-Pacific-Coast.md`

## Skipped / Missing Notes (155 total)

Most missing paths reference sub-directories that weren't migrated to this vault instance:
- `SACRED-CIRCUITS/Achilles.md`, `SACRED-CIRCUITS/Research/Podcasts/...`, etc. (deity character sheets)
- `SACRED-CIRCUITS/Mythology-Bible/...` (storyboard and prompt files)
- `SACRED-CIRCUITS/Originals/...` (manuscript chapters)
- `SACRED-CIRCUITS/.images/...` (image reference notes)

These paths are valid future targets — notes need to be migrated/created before backlinks will inject.

## Vault Git Commits

| Hash | Message |
|------|---------|
| `2e4fad10` | feat(images): inject image backlinks from catalog.csv into related notes |
| `6c1639e5` | chore(vault): rerun cross-linking pipeline after image backlink injection |
| `e3d93ade` | feat(moc): generate image MOCs by deity / mood / theme |
| `fff29594` | fix(images): repair corrupted YAML frontmatter from first backlink run |

## Deviations

### Auto-fixed: YAML Frontmatter Corruption

**Found during:** Task 1 idempotency verification  
**Issue:** First run produced malformed YAML — when the script wrote `images:\n  - fn1` and the surrounding context had existing frontmatter, the YAML key got stripped on re-run but the list items remained as root-level bare `- filename` entries. This caused the script to write on every run.  
**Fix:** Added orphaned bare list item detection in `set_yaml_images()` — strips leading `- item` lines before any YAML key during the strip phase. This normalizes corrupted state on the next run.  
**Commit:** `fff29594` (vault), `a530ed6` (home repo)

### Auto-fixed: MOC Generator Idempotency

**Found during:** Task 3 second run  
**Issue:** The intro text in `build_auto_body` included `END_AUTO_MARKER` as a literal string, which caused `rfind("\n" + END_AUTO_MARKER)` to find the intro mention instead of the real marker. Also had a duplicate `existing_body_trimmed` assignment.  
**Fix:** Removed `END_AUTO_MARKER` from intro text (replaced with plain English). Removed dead duplicate assignment.  
**Commit:** via home repo scripts

## Follow-up Items

1. **155 missing notes** — majority are deity character sheets (`Achilles.md`, `Zeus.md`, etc.) and manuscript chapters that exist in a different vault instance or haven't been migrated. When those notes arrive, the backlink script will inject automatically on next run (idempotent).

2. **Empty descriptions** — a significant portion of catalog rows have truncated descriptions (e.g. "Clean crystalline lines depicting vast metaph"). These could be enriched via a future catalog enrichment pass using the full image paths.

3. **Deities column sparsity** — many rows have empty `deities` column, so `by-deity.md` has a large `(untagged)` group (majority of 1,191 images). A catalog enrichment pass tagging images to deities would improve MOC usefulness.

4. **`generated_at` timestamps** — by design, `generated_at` only updates when MOC content changes. This keeps git diffs clean.

## Self-Check

- [x] `~/scripts/vault-image-backlink.py` exists
- [x] `~/scripts/vault-image-moc-gen.py` exists
- [x] `MOC/images/by-deity.md` exists with `<!-- end-auto -->`
- [x] `MOC/images/by-mood.md` exists with `<!-- end-auto -->`
- [x] `MOC/images/by-theme.md` exists with `<!-- end-auto -->`
- [x] 9 notes have `images:` YAML key and `## Images` section
- [x] Backlink script: second run = 0 updates (idempotent)
- [x] MOC script: second run = 0 writes (idempotent)
- [x] 4 vault git commits exist
- [x] 3 home repo commits exist
