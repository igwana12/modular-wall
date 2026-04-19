---
phase: quick-260419-nlm
plan: "01"
type: execute
wave: 1
depends_on: []
files_modified:
  - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/
autonomous: true
requirements: [QUICK-260419-NLM]
tags: [writing, google-drive, obsidian, import, conversion]

must_haves:
  truths:
    - "Every readable file from the Google Drive WRITING folder is now a .md file under the Obsidian vault's WRITING/ directory"
    - "All four top-level source subfolders (TRANSCRIPTIONS, DRAFT 1, BOOK, ideas for start ups) are mirrored in the destination"
    - "All BOOK subfolders (notes_parables_based on RECORDINGS, OLD ALEXANDRA THE BOOK, OLD parables, TRANSCRIPTIONS_SARALENA) are mirrored"
    - ".gdoc files are resolved to actual text via Google Drive MCP — not left as empty JSON stubs"
    - ".docx files are converted with textutil (macOS-native, pandoc is NOT installed on this machine)"
    - ".txt files are copied with .md extension, content preserved"
    - "Temporary Microsoft Office lock files (~$*.docx) are skipped"
    - "Duplicate '(1)' suffix files are deduplicated against their base name (import whichever is larger/newer)"
    - "INDEX.md at destination root lists every imported file with relative link"
  artifacts:
    - path: "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/INDEX.md"
      provides: "Navigation hub for the imported writing archive"
      min_lines: 30
    - path: "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/TRANSCRIPTIONS/"
      provides: "23 STE-### transcription markdown files"
      contains: "STE-006"
    - path: "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/DRAFT 1/"
      provides: "5 chapter draft markdown files from .gdoc sources"
      contains: "Prologue"
    - path: "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/BOOK/"
      provides: "Book draft tree with 4 subfolders"
      contains: "notes_parables_based on RECORDINGS"
    - path: "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/ideas for start ups/"
      provides: "Startup ideas docs from .docx sources"
      contains: "Globe"
  key_links:
    - from: "INDEX.md"
      to: "every imported .md file"
      via: "relative markdown link"
      pattern: "\\[.*\\]\\(.*\\.md\\)"
    - from: ".gdoc resolver"
      to: "Google Drive MCP"
      via: "mcp__claude_ai_Google_Drive__read_file_content or search_files + read"
      pattern: "mcp__claude_ai_Google_Drive__"
    - from: ".docx resolver"
      to: "textutil -convert txt"
      via: "shell command"
      pattern: "textutil -convert txt"
---

<objective>
Import every readable file from the Google Drive WRITING folder into the Obsidian vault's WRITING/ tree, converting each source format to clean markdown while preserving the folder hierarchy. This fills the gap left by the prior 260419-0r0 task, which only handled 11 files from a separate G-Drive USB source — this task sweeps the full cloud WRITING archive (approximately 60 files) into the MIGRATION vault.

Purpose: Make the entire writing archive (transcriptions, book drafts, parables, startup notes) searchable, linkable, and versioned inside Obsidian for reference during Sacred Circuits + Oracle narrative work.

Output: A WRITING/ tree in the MIGRATION vault with one .md file per source document, an INDEX.md navigation hub, and a conversion report in this task's SUMMARY.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/quick/260419-0r0-convert-g-drive-writting-doc-pages-files/260419-0r0-SUMMARY.md

<environment>
- Source root (note trailing space): `/Users/claw2501/Library/CloudStorage/GoogleDrive-igwana@gmail.com/My Drive/WRITING ` — ALWAYS quote this path, the trailing space is real.
- Destination root: `/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/` — create it, the vault exists but this subdirectory does not.
- `pandoc` is NOT installed (plan context mentioned pandoc — that was wrong). Use macOS `textutil` for .docx — verified working on `BOOK/notes_parables_based on RECORDINGS/Design and friction.docx`.
- `textutil` for .docx: `textutil -convert txt -stdout "$SRC" > "$DEST.md"` (UTF-8 by default).
- `.gdoc` files are tiny JSON stubs pointing to Google Drive — reading the file directly will NOT give you prose. You MUST call the Google Drive MCP.
</environment>

<source_inventory>
TRANSCRIPTIONS/ — 23 .txt files: STE-006 through STE-029 (skip STE-024, not present). Otter.ai transcriptions, already plain text.

DRAFT 1/ — 5 .gdoc files:
  1_Prologue.gdoc, 2_Introduction_Muse.gdoc, 3-Cancun.gdoc,
  4_To Tulum_0=1_special Generation.gdoc, 5_Palenque.gdoc

BOOK/ (contains 1 .gdoc + 5 subfolders):
  - YOUR BOOK! (Recovered).gdoc
  - ideas/ — EMPTY, skip
  - notes_parables_based on RECORDINGS/ — 9 .docx files (all listed below)
  - OLD ALEXANDRA THE BOOK/ — 4 real .docx + 4 ~$ lock files to skip
  - OLD parables/ — 12 .gdoc files
  - TRANSCRIPTIONS_SARALENA/ — 9 .gdoc files (TR 1, 2, 3, 5, 7, 9, 10, TR-5 duplicate, Journal - Thesis)

BOOK/notes_parables_based on RECORDINGS/:
  1_Why we dance.docx, 2_War and festivals.docx, 3_Dionisian Apolonian.docx,
  4_birth of a star.docx, 5_Macro Macro Symbiosis.docx, Design and friction.docx,
  Gutemala Costa Rica Mitoulas_otter.ai.docx, Mescalin Flying.docx,
  Palenque_otter.ai (1).docx

BOOK/OLD ALEXANDRA THE BOOK/ (real files only, ~$ = lock files):
  0_Prologue.docx, 1_Dancing our way out of the animal kingdom.docx,
  2_Introduction_Muse.docx, Cancun Sept 15 2001.docx

BOOK/OLD parables/ (.gdoc):
  1_Dancing Our way out of the animal kingdom.gdoc,
  2_War and Festivals push us to our Higher Selves.gdoc,
  3_The Importance of the Poetic Mindset.gdoc,
  4_The Birth of a Star in Modernity.gdoc,
  5_Gaia Hypothesis Noosphere Collective Consciousness: Spore Theory.gdoc,
  6_Calibrating the Collective Consciousness: Mass Televised Live Events- Sports, Olympics.gdoc,
  7_Ancient Rites of Passage: Mystical Experience in Antiquity and the Birth of Modern Festivals and 60's LSD.gdoc,
  8_Goa and the birth of Psychedelic Trance - 90's.gdoc,
  Alison_Ettina.gdoc, CHILDREN'S STORY - Magic Berries of the Forest (Recovered).gdoc,
  The eb and flow amongst the Dionysian and the Appollonian Principle.gdoc,
  What they did with technology!.gdoc

BOOK/TRANSCRIPTIONS_SARALENA/ (.gdoc):
  Journal - Thesis.gdoc, TR 1 - 0 =1 Dionysian Apollonian.gdoc, TR 10 - Psy-Trance DJs - Spell Casting.gdoc,
  TR 2 - Traveling.gdoc, TR 3 - India - Pushkar.gdoc, TR 5 - Solstice Grove.gdoc,
  TR 7 - Ecuador.gdoc, TR 9 - Flying on Mescaline.gdoc, TR-5 - Solstice grove.gdoc (duplicate of TR 5)

ideas for start ups/: Globe 2.docx (skip ~$lobe 2.docx lock file)

Total real files: ~23 txt + 26 gdoc + 14 docx = ~63 source docs
</source_inventory>

<skip_rules>
- Files starting with `~$` — Microsoft Office temporary lock files, always skip.
- The empty `BOOK/ideas/` subfolder — nothing to import.
- If a filename has a "(1)" duplicate suffix (e.g., `STE-026 [FIX]_otter_ai (1).txt`, `Palenque_otter.ai (1).docx`, `TR-5 - Solstice grove.gdoc`): compare against the base filename. If only the (1) variant exists, use it and strip "(1)" from destination name. If both exist, import whichever is larger and log the decision.
</skip_rules>

<interfaces>
Google Drive MCP tools available to executor:
- `mcp__claude_ai_Google_Drive__search_files` — search by name (use when file ID unknown)
- `mcp__claude_ai_Google_Drive__get_file_metadata` — fetch file ID and metadata
- `mcp__claude_ai_Google_Drive__read_file_content` — read Google Doc content as text (primary for .gdoc)
- `mcp__claude_ai_Google_Drive__download_file_content` — fallback if read_file_content fails
- `mcp__claude_ai_Google_Drive__list_recent_files` — list files in a folder

.gdoc file structure: tiny JSON stub like `{"doc_id":"1AbC...","email":"...","resource_id":"document:1AbC..."}`. Extract `doc_id` by reading the local file as JSON, then pass to `read_file_content`. If the MCP tool expects a different arg shape, fall back to `search_files` by filename + `read_file_content` with the returned ID.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Build inventory + convert .txt and .docx files</name>
  <files>/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/ (create tree), conversion script at /tmp/260419-nlm-convert.sh</files>
  <action>
Step 1 — Create destination tree:
```bash
SRC="/Users/claw2501/Library/CloudStorage/GoogleDrive-igwana@gmail.com/My Drive/WRITING "
DEST="/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING"
mkdir -p "$DEST/TRANSCRIPTIONS" "$DEST/DRAFT 1" \
  "$DEST/BOOK/notes_parables_based on RECORDINGS" \
  "$DEST/BOOK/OLD ALEXANDRA THE BOOK" \
  "$DEST/BOOK/OLD parables" \
  "$DEST/BOOK/TRANSCRIPTIONS_SARALENA" \
  "$DEST/ideas for start ups"
```

Step 2 — Build source inventory to /tmp/260419-nlm-inventory.tsv with columns: `src_path\ttype\tdest_path\tstatus`. Scan with `find "$SRC" -type f` and classify:
  - `.txt` → type=txt
  - `.docx` not starting with `~$` → type=docx
  - `.gdoc` → type=gdoc (handled in Task 2)
  - `~$*.docx` → skip (log to inventory with status=skip-lockfile)
  - Empty `BOOK/ideas/` → nothing to record

Step 3 — Convert .txt files (copy with .md extension, strip " [FIX]_otter_ai" from STE filenames and "(1)" duplicate marker):
```bash
# For each STE-NNN [FIX]_otter_ai.txt, destination name = STE-NNN.md
cp "$SRC/TRANSCRIPTIONS/STE-006 [FIX]_otter_ai.txt" "$DEST/TRANSCRIPTIONS/STE-006.md"
# ... iterate all 23 files. For STE-026 and STE-028 with (1) suffix, strip (1).
```

Step 4 — Convert .docx files with textutil (pandoc is NOT installed on this machine):
```bash
textutil -convert txt -stdout "$SRC_DOCX" > "$DEST_MD"
```
Apply to:
  - All 9 files in `BOOK/notes_parables_based on RECORDINGS/`
  - 4 real .docx in `BOOK/OLD ALEXANDRA THE BOOK/` (skip all `~$*` lock files)
  - `ideas for start ups/Globe 2.docx` → `ideas for start ups/Globe 2.md`
  - For `Palenque_otter.ai (1).docx`: destination = `Palenque_otter.ai.md` (strip (1))

Destination filenames: keep original base name, swap extension to `.md`. Preserve spaces and special chars — Obsidian handles them.

After each conversion, verify destination file size > 0. If textutil exits nonzero or produces empty output, log to inventory with status=error and stop (do not silently skip — surface for the user).

Update inventory TSV with status=done for each successful conversion.
  </action>
  <behavior>
    - 23 .md files exist under WRITING/TRANSCRIPTIONS/ named STE-006.md through STE-029.md (minus STE-024)
    - 9 .md files exist under WRITING/BOOK/notes_parables_based on RECORDINGS/
    - 4 .md files exist under WRITING/BOOK/OLD ALEXANDRA THE BOOK/ (no ~$ lock files)
    - 1 .md file exists at WRITING/ideas for start ups/Globe 2.md
    - Every converted file has size > 0
    - /tmp/260419-nlm-inventory.tsv lists every source file with its resolved status
  </behavior>
  <verify>
    <automated>DEST="/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING"; txt_count=$(find "$DEST/TRANSCRIPTIONS" -name "*.md" | wc -l | tr -d ' '); docx_notes=$(find "$DEST/BOOK/notes_parables_based on RECORDINGS" -name "*.md" | wc -l | tr -d ' '); docx_alex=$(find "$DEST/BOOK/OLD ALEXANDRA THE BOOK" -name "*.md" | wc -l | tr -d ' '); docx_ideas=$(find "$DEST/ideas for start ups" -name "*.md" | wc -l | tr -d ' '); empty=$(find "$DEST" -name "*.md" -empty | wc -l | tr -d ' '); echo "txt=$txt_count notes=$docx_notes alex=$docx_alex ideas=$docx_ideas empty=$empty"; [ "$txt_count" = "23" ] && [ "$docx_notes" = "9" ] && [ "$docx_alex" = "4" ] && [ "$docx_ideas" = "1" ] && [ "$empty" = "0" ] && echo PASS || echo FAIL</automated>
  </verify>
  <done>Expected `txt=23 notes=9 alex=4 ideas=1 empty=0 PASS`. Inventory TSV complete with one row per source file. No ~$ lock files present in destination.</done>
</task>

<task type="auto">
  <name>Task 2: Resolve .gdoc files via Google Drive MCP and write INDEX.md</name>
  <files>/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/ (26 .md files + INDEX.md)</files>
  <action>
Step 1 — Collect .gdoc source list (26 files):
  - `BOOK/YOUR BOOK! (Recovered).gdoc` → `BOOK/YOUR BOOK! (Recovered).md`
  - 5 in `DRAFT 1/`
  - 12 in `BOOK/OLD parables/`
  - 9 in `BOOK/TRANSCRIPTIONS_SARALENA/` (for `TR-5 - Solstice grove.gdoc` duplicate of `TR 5 - Solstice Grove.gdoc`: import both, log which content is identical; if identical, delete the TR-5 duplicate and log it)

Step 2 — For each .gdoc, resolve content via MCP. Two-path strategy:

  Path A (preferred) — extract doc_id from local JSON stub:
  ```bash
  cat "$SRC_GDOC" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d.get('doc_id') or d.get('resource_id','').split(':')[-1])"
  ```
  Then call `mcp__claude_ai_Google_Drive__read_file_content` with that ID.

  Path B (fallback) — if Path A fails or the JSON shape is different:
  1. Call `mcp__claude_ai_Google_Drive__search_files` with the filename stem (no extension).
  2. Filter results to the matching folder parent when ambiguous.
  3. Call `mcp__claude_ai_Google_Drive__read_file_content` with the returned file ID.

Step 3 — Write returned text to destination .md (swap .gdoc extension to .md, preserve base name, strip any "(1)" duplicate marker).

Step 4 — Handle failures explicitly: if a .gdoc cannot be resolved after both paths, write a stub file containing only a header line `# <filename>\n\n> Unresolved via Google Drive MCP on 2026-04-19. Source doc_id: <id>\n` and record status=unresolved in /tmp/260419-nlm-inventory.tsv. Do NOT pretend success.

Step 5 — Build INDEX.md at `$DEST/INDEX.md`:
```markdown
# WRITING — Google Drive Archive Import

Imported 2026-04-19 from Google Drive WRITING folder into MIGRATION vault.

## TRANSCRIPTIONS (Otter.ai — STE series)
- [[TRANSCRIPTIONS/STE-006]]
... (all 23)

## DRAFT 1 (Book chapter drafts)
- [[DRAFT 1/1_Prologue]]
... (all 5)

## BOOK
### notes_parables_based on RECORDINGS
- [[BOOK/notes_parables_based on RECORDINGS/1_Why we dance]]
... (all 9)

### OLD ALEXANDRA THE BOOK
- [[BOOK/OLD ALEXANDRA THE BOOK/0_Prologue]]
... (all 4)

### OLD parables
- [[BOOK/OLD parables/1_Dancing Our way out of the animal kingdom]]
... (all 12)

### TRANSCRIPTIONS_SARALENA
- [[BOOK/TRANSCRIPTIONS_SARALENA/TR 1 - 0 =1 Dionysian Apollonian]]
... (all 9)

### Standalone
- [[BOOK/YOUR BOOK! (Recovered)]]

## ideas for start ups
- [[ideas for start ups/Globe 2]]

## Unresolved (if any)
(list files that failed MCP resolution, with their error)

## Conversion Summary
- Source: `/Users/claw2501/Library/CloudStorage/GoogleDrive-igwana@gmail.com/My Drive/WRITING /`
- .txt → copied as .md (23 files)
- .docx → textutil to markdown (14 files)
- .gdoc → Google Drive MCP `read_file_content` (26 files)
- Skipped: 4 lock files (~$*.docx), empty BOOK/ideas/ folder
```
Use Obsidian `[[wiki-link]]` syntax with forward-slash paths — Obsidian handles spaces.
  </action>
  <behavior>
    - Every .gdoc source has a corresponding .md in the destination tree (either real content or explicitly marked unresolved stub)
    - INDEX.md exists at destination root with sections for every subfolder
    - INDEX.md lists every imported .md file
    - No .gdoc file is silently dropped — success or marked unresolved
  </behavior>
  <verify>
    <automated>DEST="/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING"; total_md=$(find "$DEST" -name "*.md" ! -name "INDEX.md" | wc -l | tr -d ' '); index_exists=$([ -f "$DEST/INDEX.md" ] && echo yes || echo no); index_lines=$(wc -l < "$DEST/INDEX.md" 2>/dev/null | tr -d ' '); empty=$(find "$DEST" -name "*.md" -empty | wc -l | tr -d ' '); echo "total_md=$total_md index=$index_exists index_lines=$index_lines empty=$empty"; [ "$total_md" -ge "62" ] && [ "$index_exists" = "yes" ] && [ "$index_lines" -ge "30" ] && [ "$empty" = "0" ] && echo PASS || echo FAIL</automated>
  </verify>
  <done>Expected `PASS`: at least 62 .md files across the tree (23 txt + 14 docx + 25 gdoc minimum, counting duplicates handling), INDEX.md ≥30 lines, zero empty files. Any unresolved .gdoc files are flagged both in the file stub and in INDEX.md's "Unresolved" section.</done>
</task>

</tasks>

<verification>
After both tasks complete, run:

```bash
DEST="/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING"

# Structural verification
echo "=== Tree ===" && find "$DEST" -type d
echo "=== File counts by folder ===" && find "$DEST" -name "*.md" -type f | awk -F/ '{NF--; print}' OFS=/ | sort | uniq -c
echo "=== Empty files (should be 0) ===" && find "$DEST" -name "*.md" -empty
echo "=== Lock files leaked (should be 0) ===" && find "$DEST" -name '~$*'
echo "=== Total .md files ===" && find "$DEST" -name "*.md" | wc -l
echo "=== INDEX.md size ===" && wc -l "$DEST/INDEX.md"
```

Spot-check three files for content quality:
```bash
head -20 "$DEST/TRANSCRIPTIONS/STE-006.md"
head -20 "$DEST/BOOK/notes_parables_based on RECORDINGS/Design and friction.md"
head -20 "$DEST/DRAFT 1/1_Prologue.md"
```

All three should show actual prose, not JSON stubs, XML tags, or binary garbage.
</verification>

<success_criteria>
- Destination `WRITING/` tree mirrors source folder structure
- At least 62 .md files imported (23 txt + 14 docx + 25 gdoc after duplicate dedup)
- Zero empty .md files
- Zero `~$*` lock files in destination
- INDEX.md ≥30 lines with sections for every subfolder
- Spot-check reveals real prose content (not JSON/XML/binary)
- Every unresolvable .gdoc is explicitly flagged in its stub and in INDEX.md — no silent drops
- /tmp/260419-nlm-inventory.tsv records the fate of every source file
</success_criteria>

<output>
After completion, create `.planning/quick/260419-nlm-import-all-files-from-google-drive-writi/260419-nlm-SUMMARY.md` with:
- Per-folder file counts (source vs destination)
- List of any unresolved .gdoc files and the MCP errors returned
- Decisions made on (1) duplicate files
- Total bytes imported
- Path to INDEX.md for the user to open in Obsidian
</output>
