---
phase: quick-260419-ueh
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - /Users/claw2501/niko-obsidian-vault/WRITING/
  - /Users/claw2501/niko-obsidian-vault/IMAGES/catalog.csv
  - /Users/claw2501/niko-obsidian-vault/IMAGES/_INDEX.md
  - /Users/claw2501/niko-obsidian-vault/MOC/
autonomous: true
requirements:
  - QUICK-260419-UEH
must_haves:
  truths:
    - "niko-obsidian-vault contains all WRITING/ files from Extreme Pro without overwriting newer existing notes"
    - "niko-obsidian-vault/IMAGES/ contains catalog.csv and _INDEX.md from Extreme Pro"
    - "niko-obsidian-vault/MOC/ exists and contains the 180+ auto-generated MOC files"
    - "Source vault on Extreme Pro is untouched (rsync copy, not move)"
    - "All 6 vault scripts have been re-run against the master vault successfully"
  artifacts:
    - path: "/Users/claw2501/niko-obsidian-vault/WRITING/"
      provides: "Full WRITING corpus (STE transcriptions + doc/pages conversions)"
    - path: "/Users/claw2501/niko-obsidian-vault/IMAGES/catalog.csv"
      provides: "Image catalog used by image-backlink and image-moc-gen scripts"
    - path: "/Users/claw2501/niko-obsidian-vault/IMAGES/_INDEX.md"
      provides: "Image index note"
    - path: "/Users/claw2501/niko-obsidian-vault/MOC/"
      provides: "Theme-based Map-of-Content notes"
  key_links:
    - from: "vault-image-backlink.py"
      to: "/Users/claw2501/niko-obsidian-vault/IMAGES/catalog.csv"
      via: "--vault arg + default --catalog IMAGES/catalog.csv"
      pattern: "catalog\\.csv"
    - from: "vault-wikilink-inject.py"
      to: "/Users/claw2501/niko-obsidian-vault/WRITING/"
      via: "--vault arg, scans all .md files"
      pattern: "--vault /Users/claw2501/niko-obsidian-vault"
---

<objective>
Copy WRITING/, IMAGES/{catalog.csv,_INDEX.md}, and MOC/ from the Extreme Pro migration vault into the master niko-obsidian-vault using rsync (non-destructive), then re-run the full cross-linking pipeline against the master vault so wikilinks, tags, MOCs, embeddings, and image backlinks are regenerated for the combined corpus.

Purpose: Consolidate all writing/image/MOC assets into the single canonical vault (niko-obsidian-vault) so cross-linking operates over the full knowledge base. Previous quick tasks (260419-0r0, 260419-nlm, 260419-ous, 260419-shd) produced these assets on the Extreme Pro drive; this task brings them home.

Output: Master vault populated with new content + regenerated cross-links across all notes.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
Source vault: `/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/`
- WRITING/: 128 .md files (STE + .docx/.pages/.gdoc conversions)
- IMAGES/catalog.csv + IMAGES/_INDEX.md
- MOC/: 374 .md files (auto-generated)

Destination (master): `/Users/claw2501/niko-obsidian-vault/`
- WRITING/ already exists with 164 .md files (NEWER than source — must use rsync --update to prevent overwriting)
- IMAGES/ already exists (catalog.csv + _INDEX.md will be added/updated)
- MOC/ does NOT exist yet

Scripts (all in `~/scripts/`, all accept `--vault`; image scripts require `--vault`):
- vault-wikilink-inject.py
- vault-tag-extract.py
- vault-moc-gen.py
- vault-semantic-embed.py
- vault-image-backlink.py (also supports `--catalog`, default `IMAGES/catalog.csv`)
- vault-image-moc-gen.py (also supports `--catalog`, default `IMAGES/catalog.csv`)

Verified via `grep add_argument` — all six scripts accept `--vault`.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rsync WRITING, IMAGES files, and MOC from Extreme Pro into master vault</name>
  <files>
    /Users/claw2501/niko-obsidian-vault/WRITING/
    /Users/claw2501/niko-obsidian-vault/IMAGES/catalog.csv
    /Users/claw2501/niko-obsidian-vault/IMAGES/_INDEX.md
    /Users/claw2501/niko-obsidian-vault/MOC/
  </files>
  <action>
Run three rsync commands (source intact — never use --remove-source-files):

1. WRITING/ (use --update so newer files in destination are preserved; destination currently has 164 files, source has 128):
   ```
   rsync -av --update "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/" "/Users/claw2501/niko-obsidian-vault/WRITING/"
   ```

2. IMAGES catalog + index (just the two files, not the whole IMAGES/ folder to avoid pulling stray files):
   ```
   rsync -av --update "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/IMAGES/catalog.csv" "/Users/claw2501/niko-obsidian-vault/IMAGES/catalog.csv"
   rsync -av --update "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/IMAGES/_INDEX.md" "/Users/claw2501/niko-obsidian-vault/IMAGES/_INDEX.md"
   ```

3. MOC/ (destination does not exist yet — rsync will create it):
   ```
   rsync -av --update "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/" "/Users/claw2501/niko-obsidian-vault/MOC/"
   ```

Use `-av --update` (archive + verbose + skip-newer-on-destination). Do NOT use `--delete` — additive copy only. Do NOT use `--remove-source-files` — source must remain intact.

Why `--update` is critical for WRITING: destination already has 164 .md files (more than source 128), meaning some notes have been edited locally since the Extreme Pro snapshot. Overwriting them would cause regression (violates the no-regression rule in MEMORY.md).
  </action>
  <verify>
    <automated>
test -d /Users/claw2501/niko-obsidian-vault/MOC && \
test -f /Users/claw2501/niko-obsidian-vault/IMAGES/catalog.csv && \
test -f /Users/claw2501/niko-obsidian-vault/IMAGES/_INDEX.md && \
test -d "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING" && \
[ $(find /Users/claw2501/niko-obsidian-vault/MOC -name "*.md" | wc -l) -ge 180 ] && \
[ $(find /Users/claw2501/niko-obsidian-vault/WRITING -name "*.md" | wc -l) -ge 164 ] && \
echo OK
    </automated>
  </verify>
  <done>
- /Users/claw2501/niko-obsidian-vault/MOC/ exists with >= 180 .md files
- /Users/claw2501/niko-obsidian-vault/IMAGES/catalog.csv and _INDEX.md exist
- /Users/claw2501/niko-obsidian-vault/WRITING/ has >= 164 .md files (existing files preserved, new files added)
- Source vault on Extreme Pro still intact (WRITING directory still present)
  </done>
</task>

<task type="auto">
  <name>Task 2: Re-run the 6 vault cross-linking scripts against the master vault</name>
  <files>
    /Users/claw2501/niko-obsidian-vault/
  </files>
  <action>
Run all 6 scripts in order against `/Users/claw2501/niko-obsidian-vault/`. Each accepts `--vault`. The two image scripts require `--vault` (not just optional). Run sequentially — later scripts consume outputs of earlier ones (wikilinks → tags → MOCs → embeddings → image backlinks → image MOCs).

```
python3 ~/scripts/vault-wikilink-inject.py --vault /Users/claw2501/niko-obsidian-vault
python3 ~/scripts/vault-tag-extract.py --vault /Users/claw2501/niko-obsidian-vault
python3 ~/scripts/vault-moc-gen.py --vault /Users/claw2501/niko-obsidian-vault
python3 ~/scripts/vault-semantic-embed.py --vault /Users/claw2501/niko-obsidian-vault
python3 ~/scripts/vault-image-backlink.py --vault /Users/claw2501/niko-obsidian-vault
python3 ~/scripts/vault-image-moc-gen.py --vault /Users/claw2501/niko-obsidian-vault
```

Run each in the foreground (not background) so exit codes are captured. If any script exits non-zero, STOP and report the failure before moving on — do not silently continue. The semantic embed step may take longer than typical bash timeout; if needed, invoke with a longer timeout (up to 10 min) or use run_in_background for that single script only.

Image scripts default `--catalog IMAGES/catalog.csv` which is the file rsync'd in Task 1 — no extra flag needed.
  </action>
  <verify>
    <automated>
ls /Users/claw2501/niko-obsidian-vault/MOC/*.md | head -1 && \
grep -l "related:" /Users/claw2501/niko-obsidian-vault/WRITING/*.md 2>/dev/null | head -1 && \
echo OK
    </automated>
  </verify>
  <done>
- All 6 scripts exited 0
- MOC/ has regenerated content (timestamps updated)
- At least one WRITING/ note contains `related:` frontmatter (semantic embed output) OR wikilinks (wikilink inject output) confirming scripts touched the vault
- No script produced a traceback or error output
  </done>
</task>

</tasks>

<verification>
- Source vault on Extreme Pro is untouched (WRITING/ still present with original file count)
- Master vault contains MOC/ folder (new) and updated IMAGES/catalog.csv + _INDEX.md
- Master vault WRITING/ file count is >= pre-task count (nothing lost to overwrite)
- All 6 cross-linking scripts executed without error
</verification>

<success_criteria>
- niko-obsidian-vault has WRITING/ (>=164 .md), IMAGES/{catalog.csv,_INDEX.md}, and MOC/ (>=180 .md)
- Extreme Pro source vault intact (verify with `test -d "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING"`)
- 6 cross-linking scripts all exit 0
- Sample WRITING/ note contains generated frontmatter (tags, related, or wikilinks) confirming cross-linking pipeline ran end-to-end
</success_criteria>

<output>
After completion, create `.planning/quick/260419-ueh-move-writing-images-moc-from-extreme-pro/260419-ueh-SUMMARY.md` documenting:
- Files copied (counts before/after for WRITING, IMAGES, MOC)
- Scripts run and their outputs (successes, warnings)
- Any skipped files due to --update (files in destination newer than source)
- Final vault note count
</output>
