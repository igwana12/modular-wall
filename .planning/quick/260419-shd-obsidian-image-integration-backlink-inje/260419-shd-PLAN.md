---
phase: 260419-shd-obsidian-image-integration
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - ~/scripts/vault-image-backlink.py
  - ~/scripts/vault-image-moc-gen.py
  - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/**
autonomous: true
requirements:
  - IMG-01-backlink-injection
  - IMG-02-rerun-crosslinking
  - IMG-03-image-mocs

must_haves:
  truths:
    - "Every vault note referenced in catalog.csv related_notes has an images: YAML field listing its linked images"
    - "Every such note has an ## Images section with markdown links + descriptions"
    - "Backlink script is idempotent — second run produces zero changes"
    - "Tag extract, MOC gen, semantic embed, Dataview index scripts all re-run successfully after image integration"
    - "MOC/images/by-deity.md, by-mood.md, by-theme.md exist with grouped entries from catalog.csv"
    - "Image MOCs preserve an end-auto marker for hand-written additions"
    - "Each task ends with an atomic vault git commit"
  artifacts:
    - path: "~/scripts/vault-image-backlink.py"
      provides: "Backlink injector — parses catalog.csv, injects YAML + Images section into related notes"
      min_lines: 80
    - path: "~/scripts/vault-image-moc-gen.py"
      provides: "Image MOC generator — creates MOC/images/by-{deity,mood,theme}.md from catalog.csv"
      min_lines: 80
    - path: "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/images/by-deity.md"
      provides: "Deity-grouped image index"
      contains: "end-auto"
    - path: "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/images/by-mood.md"
      provides: "Mood-grouped image index"
      contains: "end-auto"
    - path: "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/images/by-theme.md"
      provides: "Theme-grouped image index"
      contains: "end-auto"
  key_links:
    - from: "catalog.csv related_notes column"
      to: "vault note YAML images field + Images section"
      via: "vault-image-backlink.py"
      pattern: "images:"
    - from: "IMAGES/_INDEX.md tags"
      to: "vault-tag-extract.py output"
      via: "re-run after backlink injection"
      pattern: "tag extraction completes exit 0"
    - from: "catalog.csv deity/mood/theme columns"
      to: "MOC/images/by-*.md grouped sections"
      via: "vault-image-moc-gen.py"
      pattern: "grouped headings present"
---

<objective>
Integrate the image catalog (catalog.csv) into the Obsidian vault by injecting backlinks into related notes, re-running existing cross-linking scripts, and generating image MOCs grouped by deity, mood, and theme.

Purpose: Images live outside the vault (on Extreme Pro) but their metadata must surface inside the vault so notes mentioning a deity/theme show which images relate. Makes the catalog discoverable via Dataview, tags, and graph view.

Output:
- ~/scripts/vault-image-backlink.py (new)
- ~/scripts/vault-image-moc-gen.py (new)
- Updated vault notes with images YAML + Images section
- Regenerated tags, MOCs, embeddings, Dataview index
- 3 new MOC files: MOC/images/by-deity.md, by-mood.md, by-theme.md
- 3 atomic vault git commits
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
Vault root: `/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/`
Catalog: `/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/IMAGES/catalog.csv`
Image files (outside vault): `/Volumes/Extreme Pro/sacred-circuits-outputs/images/midjourney/`

Existing scripts in `~/scripts/` (confirmed present):
- `vault-wikilink-inject.py` — injects [[wikilinks]] between notes based on title matches
- `vault-tag-extract.py` — extracts tags from YAML and content, writes _INDEX.md tag lists
- `vault-moc-gen.py` — regenerates Maps of Content from tag clusters
- `vault-semantic-embed.py` — SHA-256 cached embedding (only re-embeds changed notes)
- `vault-dataview-index.py` — regenerates root INDEX.md Dataview queries

catalog.csv columns: `filename, path, description, deities, locations, mood, scene_type, styles, objects, sacred_circuits_themes, all_tags, related_notes, extracted_from_grid`

`related_notes` is semicolon-separated vault-relative paths (e.g. `CHARACTERS/Zeus.md; LOCATIONS/Olympus.md`).
Lists inside other columns (deities, mood, sacred_circuits_themes) may be semicolon- or comma-separated — detect and handle both.
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Backlink injection script + run + commit</name>
  <files>
    - ~/scripts/vault-image-backlink.py (new)
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/** (notes referenced in related_notes)
  </files>
  <action>
Create `~/scripts/vault-image-backlink.py`:

1. CLI args:
   - `--vault /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault` (required)
   - `--catalog IMAGES/catalog.csv` (default relative to vault)
   - `--dry-run` (print planned changes, no writes)

2. Parse catalog.csv with `csv.DictReader` (handle quoted fields, commas inside values).

3. Build a dict `note_path -> list[image_row]`:
   - For each row, split `related_notes` on `;`, strip whitespace, skip empty.
   - Resolve each path against vault root. Skip if file does not exist (log WARN, do not create).
   - Append the full image row dict to the list for that note.

4. For each (note_path, image_rows) pair, mutate the note:
   - Read entire file as UTF-8.
   - Parse YAML frontmatter (detect a leading fenced YAML block). If absent, insert an empty one.
   - Set/replace the `images` key with a sorted-unique list of image filenames (the `filename` column).
     - Use `ruamel.yaml` if available for comment preservation; else `pyyaml` with round-trip best-effort. Preserve any other existing keys untouched.
   - In the body, find or create an `## Images` section:
     - If the section exists, replace its contents (from that heading down to the next `## ` heading or EOF) with the regenerated block.
     - Block content: one bullet per image, format:
       `- **{filename}** — {description} ([catalog](IMAGES/catalog.csv))`
     - Sort bullets alphabetically by filename for deterministic idempotency.
   - Write file back only if content changed (byte-compare pre/post). Track `modified_count`.

5. Idempotency: running twice must report `modified_count == 0` on the second run. Guarantee by sorting both the YAML list and the bullet list, and by normalizing trailing newlines.

6. Print summary: `{scanned} catalog rows, {notes_touched} notes updated, {notes_missing} missing, {unchanged} unchanged.`

Then execute:

```bash
python3 ~/scripts/vault-image-backlink.py --vault "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault"
# idempotency check
python3 ~/scripts/vault-image-backlink.py --vault "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault"
```

Then commit in vault:
```bash
cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault"
git add -A
git commit -m "feat(images): inject image backlinks from catalog.csv into related notes

Adds images YAML field and Images section to every note referenced
in catalog.csv related_notes column. Idempotent.

Script: ~/scripts/vault-image-backlink.py"
```

Avoid: global regex replacements across the whole vault (targeted file edits only). Avoid overwriting other YAML keys. Avoid creating new notes — skip missing with WARN.
  </action>
  <verify>
    <automated>python3 ~/scripts/vault-image-backlink.py --vault "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" 2>&amp;1 | grep -Ei "unchanged|0 notes (updated|touched)"</automated>
  </verify>
  <done>
    - Script exists and runs without error
    - First run updates N greater-than 0 notes, second run reports 0 updates (idempotent)
    - At least one sample note shows an `images` YAML key and an `## Images` section
    - Vault git commit created with the feat(images) message
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Re-run existing cross-linking scripts + commit</name>
  <files>
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/_INDEX.md
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/**
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/INDEX.md
    - semantic embeddings cache (wherever vault-semantic-embed.py stores it)
  </files>
  <action>
Re-run the existing cross-linking pipeline in this exact order (each must succeed before the next):

```bash
VAULT="/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault"

python3 ~/scripts/vault-tag-extract.py --vault "$VAULT"
python3 ~/scripts/vault-moc-gen.py --vault "$VAULT"
python3 ~/scripts/vault-semantic-embed.py --vault "$VAULT"
python3 ~/scripts/vault-dataview-index.py --vault "$VAULT"
```

If any script accepts different CLI flags (check `--help` first to confirm), use what it actually expects. Do not invent flags.

After all four complete exit 0, commit in vault:

```bash
cd "$VAULT"
git add -A
git commit -m "chore(vault): rerun cross-linking pipeline after image backlink injection

- tag extract (picks up IMAGES/_INDEX.md + new Images sections)
- MOC regen (updated tag clusters)
- semantic embed (only changed notes re-embedded via SHA-256 cache)
- Dataview index regen

Triggered by: vault-image-backlink.py run in previous commit"
```

Note: If semantic-embed reports large cost/time before running, STOP and report count to user — do not spend unbounded tokens. The SHA-256 cache should make this cheap; if it's not, something is wrong.

Avoid: running scripts out of order (tag-extract must precede moc-gen since moc-gen reads tag state).
  </action>
  <verify>
    <automated>cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" &amp;&amp; git log -1 --oneline | grep "rerun cross-linking"</automated>
  </verify>
  <done>
    - All 4 scripts exit 0
    - INDEX.md updated (mtime newer than before)
    - MOC/ directory contents refreshed
    - Semantic embed cache updated only for changed notes (not full rebuild)
    - Vault git commit created with chore(vault) message
  </done>
</task>

<task type="auto" tdd="false">
  <name>Task 3: Image MOC generator + run + commit</name>
  <files>
    - ~/scripts/vault-image-moc-gen.py (new)
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/images/by-deity.md (new)
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/images/by-mood.md (new)
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/images/by-theme.md (new)
  </files>
  <action>
Create `~/scripts/vault-image-moc-gen.py`:

1. CLI args:
   - `--vault ...` (required)
   - `--catalog IMAGES/catalog.csv`
   - `--dry-run`

2. Parse catalog.csv (same DictReader approach as Task 1).

3. For each of three grouping dimensions (`deities`, `mood`, `sacred_circuits_themes`):
   - Split each row's value on `;` first, then `,` as fallback, strip whitespace.
   - Build `group_value -> list[row]` dict.
   - Sort group keys alphabetically (case-insensitive); sort rows within a group by filename.

4. Generate each MOC file at `MOC/images/by-{dimension}.md`:
   - YAML frontmatter with keys: `type: moc`, `source: IMAGES/catalog.csv`, `auto_generated: true`, `generated_at: {ISO timestamp}`.
   - Title: `# Images by {Dimension}`
   - Brief intro paragraph (one line).
   - For each group key, a `## {Group}` section with one bullet per image:
     `- **{filename}** — {description}`
     followed by, if row has related_notes, an indented line:
     `  - Related: [[{note-basename}]], [[{note-basename}]], ...`
   - Terminate auto-content with an HTML comment `end-auto` marker on its own line.
   - If file already exists, preserve everything AFTER the end-auto marker (hand-written additions). Replace only the auto portion above the marker.

5. Idempotency: sort every list; do NOT write wall-clock `generated_at` if it would cause spurious diffs. Simplest strategy: compute the pre-marker body first, compare to existing pre-marker body, skip write if identical. Only update `generated_at` when actual content changes.

6. Print summary: `{n_deities} deities, {n_moods} moods, {n_themes} themes, {n_images} images indexed.`

Then execute:

```bash
mkdir -p "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/images"
python3 ~/scripts/vault-image-moc-gen.py --vault "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault"
# idempotency check
python3 ~/scripts/vault-image-moc-gen.py --vault "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault"
```

Then commit in vault:

```bash
cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault"
git add -A
git commit -m "feat(moc): generate image MOCs by deity / mood / theme

Creates MOC/images/by-deity.md, by-mood.md, by-theme.md from catalog.csv.
Preserves end-auto marker for hand-written additions.

Script: ~/scripts/vault-image-moc-gen.py"
```

Avoid: destroying hand-written content after the end-auto marker. Avoid creating the MOC directory without `mkdir -p`. Avoid re-running the full cross-linking pipeline here — that's Task 2, already done.
  </action>
  <verify>
    <automated>test -f "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/images/by-deity.md" &amp;&amp; test -f "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/images/by-mood.md" &amp;&amp; test -f "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/images/by-theme.md"</automated>
  </verify>
  <done>
    - Script exists and runs without error
    - All three MOC files exist with the end-auto marker present
    - Second run produces no git diff (idempotent)
    - Vault git commit created with feat(moc) message
  </done>
</task>

</tasks>

<verification>
Phase-level checks after all 3 tasks complete:

1. `cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" && git log --oneline -3` shows three commits in order: feat(images), chore(vault), feat(moc).
2. `test -f ~/scripts/vault-image-backlink.py && test -f ~/scripts/vault-image-moc-gen.py` — both new scripts exist.
3. Pick 3 random rows from catalog.csv with non-empty `related_notes`; verify each referenced note has an `images` YAML key AND an `## Images` section.
4. `ls "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/images/"` shows by-deity.md, by-mood.md, by-theme.md.
5. Re-run all three scripts in sequence — `git status` reports no changes (idempotency).
</verification>

<success_criteria>
- 3 vault git commits pushed-ready (feat(images), chore(vault), feat(moc))
- 2 new scripts in `~/scripts/` (idempotent, `--dry-run` supported)
- Every note referenced in catalog.csv related_notes has images surfaced via YAML + dedicated section
- 3 image MOC files live under MOC/images/ with preserved hand-edit zones
- All 4 existing cross-linking scripts re-ran successfully against the updated vault
- Second run of every script produces zero changes
</success_criteria>

<output>
After completion, create `.planning/quick/260419-shd-obsidian-image-integration-backlink-inje/260419-shd-SUMMARY.md` summarizing:
- Scripts created
- Counts: notes touched, images indexed, MOC entries
- Any skipped/missing notes warned about
- Git commit SHAs (3 vault commits)
- Any follow-up items (e.g. notes with empty descriptions that could use enrichment)
</output>
