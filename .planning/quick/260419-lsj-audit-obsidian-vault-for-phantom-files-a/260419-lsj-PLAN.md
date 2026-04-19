---
phase: quick-260419-lsj
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - ~/scripts/obsidian-audit.py
  - ~/scripts/obsidian-cleanup.py
autonomous: true
requirements: [AUDIT-01, AUDIT-02]

must_haves:
  truths:
    - "Running obsidian-audit.py produces a readable report of broken wikilinks and orphaned attachments"
    - "Report clearly separates broken links from orphaned files with counts and paths"
    - "Running obsidian-cleanup.py --dry-run shows what would be deleted without touching anything"
  artifacts:
    - path: "~/scripts/obsidian-audit.py"
      provides: "Vault audit — broken wikilinks + orphaned attachments"
    - path: "~/scripts/obsidian-cleanup.py"
      provides: "Safe cleanup script with dry-run guard"
  key_links:
    - from: "obsidian-audit.py"
      to: "vault markdown files"
      via: "glob + regex parse [[wikilinks]]"
      pattern: "\\[\\[.*?\\]\\]"
    - from: "obsidian-cleanup.py"
      to: "orphaned attachment paths"
      via: "reads audit output or re-scans"
---

<objective>
Write two Python scripts that audit the Obsidian vault for phantom files (broken wikilinks + orphaned attachments) and provide a safe cleanup path.

Purpose: The vault has 2,031 notes and known orphaned PDFs — a systematic audit catches all phantom issues before they accumulate further.
Output: obsidian-audit.py (full report) + obsidian-cleanup.py (safe delete with dry-run)
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
Vault path: /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/
- 2,031 markdown notes
- Known orphaned PDFs: 7 in FAMILY-OFFICE/fund-decks/, 3 in OPERATIONS/health/pdfs/
- Attachment extensions to check: .pdf, .png, .jpg, .jpeg, .gif, .webp, .svg, .mp4, .mov, .zip
- Wikilinks syntax: [[note-name]] or [[note-name|display]] or [[note-name#heading]]
- Vault is on external drive — all paths must be quoted to handle spaces
</context>

<tasks>

<task type="auto">
  <name>Task 1: Write obsidian-audit.py</name>
  <files>~/scripts/obsidian-audit.py</files>
  <action>
Create ~/scripts/obsidian-audit.py. The script audits the vault at a hardcoded default path (overridable via --vault arg).

Script logic:

1. COLLECT ALL NOTES: glob `**/*.md` under vault root. Build a set of note names (basename without .md, lowercased for case-insensitive matching).

2. COLLECT ALL ATTACHMENTS: glob everything that is NOT .md. Build a set of all attachment absolute paths.

3. SCAN FOR WIKILINKS: For each .md file, extract all `[[...]]` patterns using regex `\[\[([^\]|#]+)`. Strip the note name part (before | and before #). Normalize: strip whitespace, lowercase. Track: which source file contains the link + what it resolves to.

4. FIND BROKEN WIKILINKS: For each extracted link target, check if it exists in the note-name set. Wikilinks can point to notes by basename only (Obsidian default shortest path). A link is broken if no note with that basename exists anywhere in the vault.

5. FIND REFERENCED ATTACHMENTS: For each .md file, extract any path-like references — both wikilinks `[[filename.pdf]]` and markdown image/link syntax `[text](path)` and bare filenames with attachment extensions. Build a set of referenced attachment basenames (lowercased).

6. FIND ORPHANED ATTACHMENTS: Any attachment whose basename (lowercased) does not appear in the referenced set is orphaned.

7. OUTPUT: Print a human-readable report:

```
===== OBSIDIAN VAULT AUDIT =====
Vault: /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/
Scanned: 2031 notes, 847 attachments
Date: 2026-04-19

--- BROKEN WIKILINKS (N found) ---
  src/note-with-broken-link.md
    -> [[NonExistentNote]]
    -> [[AnotherMissingNote]]
  ...

--- ORPHANED ATTACHMENTS (N found) ---
  FAMILY-OFFICE/fund-decks/some-deck.pdf
  OPERATIONS/health/pdfs/report.pdf
  ...

--- SUMMARY ---
  Broken wikilinks : N (in M notes)
  Orphaned files   : N
  Total issues     : N
```

Also write a machine-readable JSON sidecar to `~/scripts/obsidian-audit-results.json` with structure:
```json
{
  "vault": "...",
  "scanned_notes": N,
  "scanned_attachments": N,
  "broken_links": [{"source": "rel/path.md", "link": "TargetName"}, ...],
  "orphaned_attachments": ["rel/path.pdf", ...]
}
```

Add `--vault` CLI arg (default: `/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/`).
Add `--json-out` CLI arg to override JSON output path.

Use only stdlib: pathlib, re, json, argparse, collections, datetime. No pip installs.
</action>
  <verify>
    <automated>cd ~ && python3 ~/scripts/obsidian-audit.py --help && echo "Script is runnable"</automated>
  </verify>
  <done>Script runs without error, --help prints usage, logic handles vault path with spaces correctly via pathlib.Path</done>
</task>

<task type="auto">
  <name>Task 2: Write obsidian-cleanup.py</name>
  <files>~/scripts/obsidian-cleanup.py</files>
  <action>
Create ~/scripts/obsidian-cleanup.py. This script reads ~/scripts/obsidian-audit-results.json (produced by obsidian-audit.py) and offers safe deletion of orphaned attachments.

Script logic:

1. Load ~/scripts/obsidian-audit-results.json. If missing, print error: "Run obsidian-audit.py first" and exit 1.

2. Show a summary of what would be affected:
```
Orphaned attachments to delete: N files
Total size: X MB

Files:
  FAMILY-OFFICE/fund-decks/some-deck.pdf  (1.2 MB)
  ...
```

3. DRY-RUN (default): Print what would be deleted. Never delete. Exit with message: "Dry run complete. Pass --execute to delete."

4. --execute flag: Prompt user for confirmation ("Type 'yes' to delete N files: "). On confirmation, delete each orphaned file. Log each deletion. Write a deletion log to ~/scripts/obsidian-cleanup-log.txt with timestamp + list of deleted files.

5. Never touch .md files. Never delete anything outside the vault path. Both guards are hard-coded checks.

Add `--audit-file` arg (default: ~/scripts/obsidian-audit-results.json).
Add `--vault` arg for path validation guard.
Use only stdlib.
</action>
  <verify>
    <automated>cd ~ && python3 ~/scripts/obsidian-cleanup.py --help && echo "Cleanup script is runnable"</automated>
  </verify>
  <done>Script runs, --help works, dry-run mode is the default (no --execute = no deletions), .md guard present in code</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>obsidian-audit.py and obsidian-cleanup.py in ~/scripts/</what-built>
  <how-to-verify>
1. Run the audit against the vault:
   ```bash
   python3 ~/scripts/obsidian-audit.py
   ```
2. Verify the report prints broken wikilinks and orphaned attachments sections.
3. Check that the 10 known orphaned PDFs appear (7 in FAMILY-OFFICE/fund-decks/, 3 in OPERATIONS/health/pdfs/).
4. Run cleanup dry-run:
   ```bash
   python3 ~/scripts/obsidian-cleanup.py
   ```
5. Verify it shows the orphaned files and says "Dry run complete" without deleting anything.
  </how-to-verify>
  <resume-signal>Type "approved" if report looks correct, or describe any issues</resume-signal>
</task>

</tasks>

<verification>
- python3 ~/scripts/obsidian-audit.py exits 0, prints report with both sections
- python3 ~/scripts/obsidian-cleanup.py exits 0, defaults to dry-run (no deletions)
- Known 10 orphaned PDFs appear in audit output
- ~/scripts/obsidian-audit-results.json written with valid JSON
</verification>

<success_criteria>
- Audit script finds and reports ALL broken wikilinks and orphaned attachments in one run
- Cleanup script defaults to dry-run — impossible to accidentally delete without --execute
- Both scripts handle paths with spaces (vault on external drive) without error
</success_criteria>

<output>
No SUMMARY.md needed for quick tasks. Results visible directly in terminal output.
</output>
