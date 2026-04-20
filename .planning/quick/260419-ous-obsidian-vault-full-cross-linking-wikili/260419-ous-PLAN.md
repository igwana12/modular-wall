---
phase: 260419-ous
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - /Users/claw2501/scripts/vault-wikilink-inject.py
  - /Users/claw2501/scripts/vault-tag-extract.py
  - /Users/claw2501/scripts/vault-moc-gen.py
  - /Users/claw2501/scripts/vault-semantic-embed.py
  - /Users/claw2501/scripts/vault-dataview-index.py
autonomous: true
requirements: [VAULT-XLINK-01, VAULT-XLINK-02, VAULT-XLINK-03, VAULT-XLINK-04, VAULT-XLINK-05]

must_haves:
  truths:
    - "Every note in the vault references other notes via [[wikilinks]] when titles are mentioned"
    - "Every note has YAML frontmatter with tags: from the curated taxonomy"
    - "A /MOC/ folder exists at vault root with one Map-of-Content note per major theme"
    - "Every note has YAML frontmatter related: list of top-5 semantic neighbors"
    - "An INDEX.md exists at vault root (Dataview queries if plugin installed, static lists otherwise)"
    - "Each step is committed atomically to the vault's git repo"
    - "All scripts are idempotent — re-running produces no spurious diffs"
  artifacts:
    - path: "/Users/claw2501/scripts/vault-wikilink-inject.py"
      provides: "Wikilink injection for unambiguous title matches"
    - path: "/Users/claw2501/scripts/vault-tag-extract.py"
      provides: "YAML tag extraction using curated taxonomy"
    - path: "/Users/claw2501/scripts/vault-moc-gen.py"
      provides: "Map-of-Content generation per theme"
    - path: "/Users/claw2501/scripts/vault-semantic-embed.py"
      provides: "Semantic neighbor linking via nomic-embed-text"
    - path: "/Users/claw2501/scripts/vault-dataview-index.py"
      provides: "Vault-wide INDEX.md (Dataview or static)"
    - path: "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC/"
      provides: "Per-theme Map-of-Content notes"
    - path: "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/INDEX.md"
      provides: "Vault-wide index with Dataview or static link lists"
  key_links:
    - from: "vault-wikilink-inject.py"
      to: "vault notes"
      via: "title index → conservative regex substitution"
      pattern: "\\[\\[[^\\]]+\\]\\]"
    - from: "vault-tag-extract.py"
      to: "YAML frontmatter"
      via: "python-frontmatter merge (do not overwrite existing keys)"
      pattern: "^---\\n.*tags:"
    - from: "vault-semantic-embed.py"
      to: "ollama nomic-embed-text"
      via: "local HTTP to ollama daemon, cosine similarity top-5"
      pattern: "related:"
    - from: "vault-moc-gen.py"
      to: "tag index from step 2"
      via: "group notes by tag → wikilink list per theme"
      pattern: "MOC/[A-Za-z0-9_-]+\\.md"
    - from: "vault-dataview-index.py"
      to: ".obsidian/plugins/dataview"
      via: "filesystem check → dynamic query vs static list"
      pattern: "```dataview"
---

<objective>
Cross-link the entire Obsidian vault (1,265 notes) at `/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/` in five atomic, idempotent steps. Each step produces a reusable Python script in `~/scripts/`, runs against the whole vault, and commits its diff to the vault's git repo. Tasks are strictly sequential: each step consumes the output of the previous (wikilinks → tags → MOCs → embeddings → index).

Purpose: Turn a flat collection of 1,265 notes into a navigable, self-referential knowledge graph with Obsidian-native features (wikilinks, tags, MOCs, Dataview) plus semantic similarity.

Output: Five idempotent scripts + five atomic vault commits producing wikilinks across all notes, YAML tags on all notes, per-theme MOC notes, top-5 semantic neighbors in frontmatter, and a vault-wide INDEX.md.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
Vault path: `/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/`
Scripts directory: `/Users/claw2501/scripts/`
Note count: 1,265 `.md` files (confirmed)
Ollama: running locally; `nomic-embed-text` NOT yet pulled — Step 4 must pull it first.
Git repo: vault is a git repo; commits happen inside the vault dir.
Theme taxonomy (curated, fixed): `mythology, travel, consciousness, psychedelics, sacred-circuits, mosaic, jarvis, oracle, family, finance, health, writing, philosophy, identity`

**Constraints from request:**
- Idempotent scripts (safe re-run, no spurious diffs)
- Atomic git commit per step
- 5 tasks max (one per step)
- Each task commits with message `chore(vault): <step name>` from inside the vault dir

**Python environment:** Use `python3` with stdlib + `python-frontmatter`, `pyyaml`, `requests`, `numpy`. Install to user site if missing: `python3 -m pip install --user python-frontmatter pyyaml requests numpy`.

<interfaces>
All scripts share a common shape:

```python
# Usage: python3 vault-<step>.py [--vault PATH] [--dry-run]
# Default vault: /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault
# --dry-run prints what would change without writing
# Exit 0 on success, non-zero on error
# Prints one-line summary at end: "modified: N notes / skipped: M / errors: E"
```

YAML frontmatter merge rule (shared across steps 2, 4):
- If frontmatter exists → load with `python-frontmatter`, update keys, preserve rest
- If absent → prepend `---\n...\n---\n` block
- Never touch body content (only frontmatter) in steps 2 and 4
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Wikilink injection across entire vault</name>
  <files>/Users/claw2501/scripts/vault-wikilink-inject.py</files>
  <action>
Create `~/scripts/vault-wikilink-inject.py`. The script:

1. Walks the vault recursively, collects all `.md` file stems (filename without extension) into a `title_index: dict[str_lower, original_stem]`. Skip files in `.obsidian/`, `.trash/`, `.git/`.
2. Filters the index: drop titles shorter than 4 chars (too noisy), drop pure numeric titles, drop common English words list (`the, and, for, with, from, this, that, into, your, our, about, home, index`).
3. For each note, reads body (not frontmatter). For each remaining title in the index, substitutes standalone occurrences of the title with `[[original_stem]]` ONLY when:
   - Match is case-insensitive whole-word (use `\b` regex boundaries, unicode-aware)
   - The match is NOT already inside an existing `[[...]]` wikilink
   - The match is NOT inside a markdown link `[text](url)` or URL
   - The match is NOT inside a fenced code block or inline `code`
   - The note being scanned is NOT the target itself (don't self-link)
   - Only the FIRST occurrence per note is linked (Obsidian convention — prevents noise)
4. Idempotency: if `[[title]]` already present anywhere, skip that title for that note entirely.
5. Writes changes in-place. Prints summary: `modified: N / skipped: M / errors: E`.
6. Use `python-frontmatter` to split YAML from body — never touch YAML in this step.

After the script is written and tested on a dry-run:
- Run `python3 ~/scripts/vault-wikilink-inject.py --dry-run` first, eyeball output.
- Run `python3 ~/scripts/vault-wikilink-inject.py` for real.
- `cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" && git add -A && git commit -m "chore(vault): inject wikilinks across all notes (step 1/5)"`

Re-run the script once more after the commit — the second run must report 0 modifications (idempotency check).
  </action>
  <verify>
    <automated>cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" && python3 ~/scripts/vault-wikilink-inject.py --dry-run 2>&1 | tail -5 | grep -E "modified: 0"</automated>
  </verify>
  <done>Script exists, wikilinks injected, atomic vault commit made, second run is a no-op (idempotent).</done>
</task>

<task type="auto">
  <name>Task 2: Tag extraction + YAML frontmatter merge</name>
  <files>/Users/claw2501/scripts/vault-tag-extract.py</files>
  <action>
Create `~/scripts/vault-tag-extract.py`. The script:

1. Defines the curated theme taxonomy as a dict of `theme_name → [trigger keywords/phrases]`:
   - `mythology`: [greek god, zeus, athena, hermes, oracle, pantheon, myth, olympus, hades, persephone, dionysus]
   - `travel`: [flight, itinerary, hotel, airbnb, passport, visa, trip, journey, expedition]
   - `consciousness`: [consciousness, awareness, meditation, mindfulness, awakening, lucid, non-dual]
   - `psychedelics`: [psilocybin, mushroom, ayahuasca, dmt, lsd, ketamine, trip report, integration]
   - `sacred-circuits`: [sacred circuits, sc brand, sacred-circuits]
   - `mosaic`: [mosaic, modular wall, wall computer, pogo-pin, mosaic module]
   - `jarvis`: [jarvis, voice assistant, llm router, smithers]
   - `oracle`: [oracle card, tarot, divination, reading, card deck, spirit sphere]
   - `family`: [mom, dad, sister, brother, family, wedding, anniversary, kids]
   - `finance`: [invoice, tax, budget, expense, revenue, kickstarter, stripe, bank]
   - `health`: [doctor, diagnosis, medication, exercise, sleep, therapy, workout]
   - `writing`: [draft, essay, blog, post, substack, manuscript, chapter, story]
   - `philosophy`: [stoic, epictetus, seneca, marcus aurelius, nietzsche, kant, ethics]
   - `identity`: [who am i, self-concept, purpose, values, mission, vision]
2. Walks vault (same skip rules as Task 1).
3. For each note: lowercase full text (title + body), count trigger matches per theme. Theme applies if count >= 2 matches OR the theme name appears in the title/filename.
4. Loads existing YAML via `python-frontmatter`. Merges: `tags = sorted(set(existing_tags + new_tags))`. Other frontmatter keys untouched.
5. If no tags apply, skip the note (don't add empty tag block).
6. Idempotency: re-run produces identical frontmatter (sorted unique tags).
7. Writes summary: `tagged: N / skipped: M / themes: {theme: count}`.

Run:
- `python3 ~/scripts/vault-tag-extract.py --dry-run`
- `python3 ~/scripts/vault-tag-extract.py`
- `cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" && git add -A && git commit -m "chore(vault): extract tags into YAML frontmatter (step 2/5)"`
- Re-run → must report 0 modifications.
  </action>
  <verify>
    <automated>cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" && python3 ~/scripts/vault-tag-extract.py --dry-run 2>&1 | tail -5 | grep -E "tagged: 0"</automated>
  </verify>
  <done>Script exists, tags added to all matching notes, existing frontmatter preserved, atomic commit made, second run is a no-op.</done>
</task>

<task type="auto">
  <name>Task 3: MOC (Map of Content) generation per theme</name>
  <files>/Users/claw2501/scripts/vault-moc-gen.py</files>
  <action>
Create `~/scripts/vault-moc-gen.py`. The script:

1. Ensures `<vault>/MOC/` folder exists.
2. Walks vault, reads each note's YAML `tags:` (result of Task 2). Builds `theme → [note_stem, ...]`.
3. For each theme present in any note, writes `<vault>/MOC/<theme>.md` with this exact structure:

   ```
   ---
   moc: true
   theme: <theme>
   generated: <ISO date>
   note_count: <N>
   ---

   # MOC: <Theme Title-Cased>

   > Auto-generated. Regenerated by `~/scripts/vault-moc-gen.py`. Do not hand-edit the list section.

   ## Notes (<N>)

   - [[note-1]]
   - [[note-2]]
   ...
   ```

   Notes sorted alphabetically. Wikilinks use exact file stem.
4. Idempotency: if file exists and content would be byte-identical → skip write. If the theme list has changed, overwrite the auto-generated sections but preserve any hand-written section BELOW a marker line `<!-- end-auto -->` (append marker on first generation).
5. Additionally writes `<vault>/MOC/README.md` — a top-level MOC index linking to each theme MOC.
6. Exit summary: `mocs_created: N / mocs_updated: M / mocs_unchanged: K`.

Run:
- `python3 ~/scripts/vault-moc-gen.py --dry-run`
- `python3 ~/scripts/vault-moc-gen.py`
- `cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" && git add -A && git commit -m "chore(vault): generate per-theme MOCs (step 3/5)"`
- Re-run → `mocs_updated: 0` (all unchanged).
  </action>
  <verify>
    <automated>test -d "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC" && ls "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/MOC" | grep -c "\.md$" | awk '$1 >= 2 {exit 0} {exit 1}' && cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" && python3 ~/scripts/vault-moc-gen.py --dry-run 2>&1 | tail -3 | grep -E "mocs_updated: 0"</automated>
  </verify>
  <done>`/MOC/` folder populated with one file per detected theme + README.md, atomic commit made, second run reports zero updates.</done>
</task>

<task type="auto">
  <name>Task 4: Semantic similarity embeddings + related: frontmatter</name>
  <files>/Users/claw2501/scripts/vault-semantic-embed.py</files>
  <action>
Create `~/scripts/vault-semantic-embed.py`. The script:

1. Ensures `nomic-embed-text` is pulled: runs `ollama list`, if absent runs `ollama pull nomic-embed-text` (blocking, stdout streamed to console).
2. Walks vault. For each note:
   - Strips YAML frontmatter.
   - If body length > 2000 chars, chunks into overlapping 2000-char windows (200-char overlap), embeds each chunk, averages (mean pool) into one note vector.
   - If body length <= 2000, single embedding.
3. Uses an embeddings cache at `~/.cache/vault-embed/<sha256>.json` keyed on SHA-256 of the stripped body. Cache hits skip the ollama call — this is the primary idempotency mechanism.
4. Calls ollama via `http://localhost:11434/api/embeddings` with `{"model": "nomic-embed-text", "prompt": chunk}`. Uses `requests` with a 60s timeout and retries (max 3) on connection error.
5. After all vectors computed, builds `N x D` numpy matrix. For each note, computes cosine similarity vs all others, takes top-5 (excluding self, excluding MOC notes in `/MOC/`).
6. Writes `related:` list to each note's YAML frontmatter as a list of wikilinks:
   ```yaml
   related:
     - "[[note-a]]"
     - "[[note-b]]"
     ...
   ```
   Merge rule: overwrite `related:` key only, preserve all other keys. Never touch body.
7. Idempotency: if the computed top-5 matches existing `related:` in YAML (order-insensitive), skip write.
8. Prints summary: `embedded: N / cached: M / updated_related: K / unchanged: U`.

Run:
- `python3 ~/scripts/vault-semantic-embed.py --dry-run` (still embeds, just doesn't write)
- `python3 ~/scripts/vault-semantic-embed.py`
- `cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" && git add -A && git commit -m "chore(vault): add semantic related: top-5 neighbors (step 4/5)"`
- Re-run → `updated_related: 0`.

Note: 1,265 embeddings at ~50ms each on local ollama = ~60s. First run will be slower due to model load.
  </action>
  <verify>
    <automated>ollama list 2>/dev/null | grep -q "nomic-embed-text" && cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" && python3 ~/scripts/vault-semantic-embed.py --dry-run 2>&1 | tail -3 | grep -E "updated_related: 0"</automated>
  </verify>
  <done>nomic-embed-text pulled, all notes have `related:` top-5 in YAML, cache populated, atomic commit made, second run is a no-op.</done>
</task>

<task type="auto">
  <name>Task 5: Dataview queries (or static fallback) + vault INDEX.md</name>
  <files>/Users/claw2501/scripts/vault-dataview-index.py</files>
  <action>
Create `~/scripts/vault-dataview-index.py`. The script:

1. Detects Dataview: checks `<vault>/.obsidian/plugins/dataview/` exists and `main.js` is present. Sets `DATAVIEW = True/False`.
2. Generates `<vault>/INDEX.md` with these sections:
   - **By tag** — one section per theme (from taxonomy), queries `file.tags` contains `#<theme>`
   - **Recent (30 days)** — notes modified in last 30 days, sorted desc
   - **By folder** — top-level folders with note counts
   - **MOCs** — list of `/MOC/*.md` files
   - **Orphans** — notes with no backlinks (Dataview) or skip section (static)

   If `DATAVIEW = True`, each section uses a ```dataview``` code block:
   ```
   ```dataview
   TABLE file.ctime AS "Created"
   FROM #mythology
   SORT file.ctime DESC
   ```
   ```
   If `DATAVIEW = False`, the script computes each section statically at generation time (walks vault, reads frontmatter, emits markdown link lists). Regeneration keeps lists current.

3. Also updates `<vault>/WRITING/INDEX.md` with writing-scoped queries (tag:#writing, folder:WRITING/).
4. Both files include a header:
   ```
   > Auto-generated by `~/scripts/vault-dataview-index.py` on <ISO date>. Mode: <dataview|static>.
   ```
5. Idempotency: if generated content (excluding the timestamp line) matches current file → skip write. Use a stable hash of the content sans timestamp.
6. Summary: `mode: <dataview|static> / index_updated: <bool> / writing_index_updated: <bool>`.

Run:
- `python3 ~/scripts/vault-dataview-index.py --dry-run`
- `python3 ~/scripts/vault-dataview-index.py`
- `cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" && git add -A && git commit -m "chore(vault): generate vault INDEX.md + WRITING/INDEX.md (step 5/5)"`
- Re-run → `index_updated: False, writing_index_updated: False`.
  </action>
  <verify>
    <automated>test -f "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/INDEX.md" && test -f "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/INDEX.md" && cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault" && python3 ~/scripts/vault-dataview-index.py --dry-run 2>&1 | tail -3 | grep -E "index_updated: False"</automated>
  </verify>
  <done>Both INDEX.md files exist (Dataview or static), atomic commit made, second run is a no-op.</done>
</task>

</tasks>

<verification>
After all 5 tasks complete, run from the vault directory:

```bash
cd "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault"

# 1. Five atomic commits landed
git log --oneline -5 | grep -c "step [1-5]/5" # expect 5

# 2. Wikilinks present across vault
grep -rE "\[\[[^]]+\]\]" --include="*.md" . | wc -l   # expect > 1000

# 3. Tags in frontmatter
grep -rlE "^tags:" --include="*.md" . | wc -l         # expect > 500

# 4. MOC folder populated
ls MOC/*.md | wc -l                                    # expect >= 10

# 5. related: in frontmatter
grep -rlE "^related:" --include="*.md" . | wc -l      # expect > 1000

# 6. Vault INDEX.md exists
test -f INDEX.md && test -f WRITING/INDEX.md && echo "indexes present"

# 7. All scripts idempotent (rerun reports zero changes)
for s in wikilink-inject tag-extract moc-gen semantic-embed dataview-index; do
  python3 ~/scripts/vault-$s.py --dry-run 2>&1 | tail -2
done
```
</verification>

<success_criteria>
- All 5 scripts exist in `~/scripts/` and are idempotent (second run = no-op)
- 5 atomic commits in vault git log, one per step
- Every note (where applicable) has wikilinks, YAML tags, and `related:` top-5
- `/MOC/` folder has one note per detected theme + README.md
- `INDEX.md` at vault root + updated `WRITING/INDEX.md` (Dataview if plugin present, else static)
- `nomic-embed-text` model pulled into ollama
- Embeddings cache populated at `~/.cache/vault-embed/`
</success_criteria>

<output>
After completion, create `.planning/quick/260419-ous-obsidian-vault-full-cross-linking-wikili/260419-ous-SUMMARY.md` recording:
- Script paths
- Vault commit hashes for each step
- Counts: notes linked, notes tagged, MOCs created, notes embedded, index mode (dataview/static)
- Any notes skipped or errors encountered
</output>
