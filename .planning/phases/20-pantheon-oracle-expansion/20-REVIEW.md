---
phase: 20-pantheon-oracle-expansion
reviewed: 2026-04-18T00:00:00Z
depth: standard
files_reviewed: 19
files_reviewed_list:
  - /Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py
  - /Users/claw2501/.claude/SOUL.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-aphrodite.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-apollo.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-ares.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-artemis.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-demeter.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-dionysus.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-eros.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-hades.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-hecate.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-hephaestus.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-hera.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-hestia.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-pan.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-persephone.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-poseidon.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-prometheus.md
  - /Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-tyche.md
findings:
  critical: 0
  warning: 4
  info: 6
  total: 10
status: issues_found
---

# Phase 20: Code Review Report

**Reviewed:** 2026-04-18
**Depth:** standard
**Files Reviewed:** 19 (1 Python source + 1 SOUL index + 17 persona SOULs)
**Status:** issues_found

## Summary

`rag_retriever.py` is generally solid — graceful fallback, dedup, and a clean separation
between the Hellenic and Orphic corpora. Four warnings found: a model mismatch between
what is described in the docstring and what is actually loaded at runtime; a fresh
SentenceTransformer instantiation inside the hot query loop (defeats the singleton);
an `os.walk`-equivalent scan with a subtle duplicate-scan risk in Phase 2; and a
word-count token approximation that will silently over-truncate CJK/Unicode content.

All 18 persona SOUL files are structurally complete (Identity, Prime Directives, Voice/Tone,
Allowed Scope, Forbidden Responses, Failure Mode, McKee Beat Hooks, Links). No placeholder
text found. Four info-level issues noted: one unfilled narrative placeholder that shipped
into the Resolution beat of Apollo; Persephone's Voice/Tone section opens with a
process note ("Not yet described in ancient sources — invent from archetype") that reads
as author scaffolding rather than a finalized spec; and two personas whose McKee Resolution
beats are questions only (no closing directive / action). Additionally, SOUL.md indexes
Athena, Hermes, and Zeus as registered oracle personas but none of those SOUL files are
in scope for this phase — they are either missing from the repo or not yet created.

---

## Warnings

### WR-01: Model mismatch — retriever loads wrong embedding model at query time

**File:** `/Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py:175`

**Issue:** The docstring for `get_oracle_collection()` (line 67) states the collection
was indexed with `all-MiniLM-L6-v2`. The module-level constant `COLLECTION_NAME` and
SOUL.md both confirm the collection was built with `all-mpnet-base-v2` (768-dim, locked
by ARCH-05). At runtime, line 175 reads the model name from collection metadata
(`embed_model = (collection.metadata or {}).get("model", "all-MiniLM-L6-v2")`). If the
metadata field is absent or was never written, the fallback silently loads the wrong
384-dim model, producing dimension-mismatched query embeddings. ChromaDB will either
raise an error or silently return garbage rankings depending on version.

**Fix:** Change the fallback default to match the locked model, and add a dimension
check after loading:

```python
embed_model = (collection.metadata or {}).get("model", "all-mpnet-base-v2")
# ...after loading _embedder:
expected_dim = 768
test_dim = _embedder.get_sentence_embedding_dimension()
if test_dim != expected_dim:
    logger.error(
        f"[Oracle] Embedding model dimension mismatch: got {test_dim}, expected {expected_dim}. "
        "Check collection metadata 'model' field."
    )
    return []
```

Also update the `get_oracle_collection()` docstring at line 67 — it says
`all-MiniLM-L6-v2` but the collection is `all-mpnet-base-v2`.

---

### WR-02: SentenceTransformer instantiated fresh on every call — defeats singleton

**File:** `/Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py:177`

**Issue:** Inside `retrieve_oracle_wisdom()`, a new `SentenceTransformer` is constructed
on every invocation (`_embedder = _ST(embed_model)`). The module already provides a
`get_sentence_model()` singleton specifically to avoid double loading 420MB. The local
`_embedder` variable shadows the singleton and never reuses a cached instance — each
oracle reading trigger loads the model from disk.

**Fix:** Replace the local instantiation with the singleton, but only when the embed
model matches the singleton's model. If the metadata model ever differs, fall back to
direct load as today (still acceptable):

```python
SINGLETON_MODEL_NAME = "all-mpnet-base-v2"

embed_model = (collection.metadata or {}).get("model", SINGLETON_MODEL_NAME)
if embed_model == SINGLETON_MODEL_NAME:
    _embedder = get_sentence_model()
else:
    try:
        from sentence_transformers import SentenceTransformer as _ST
        _embedder = _ST(embed_model)
    except Exception as e:
        logger.warning(f"[Oracle] Could not load embedding model {embed_model}: {e}")
        return []
```

---

### WR-03: Phase 2 vault scan does not skip files already matched in Phase 1

**File:** `/Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py:328`

**Issue:** In `retrieve_obsidian_context()`, Phase 2 builds `scanned_paths` from the
`priority_dirs` list (line 328), then skips files whose path starts with any of those
strings. However, `priority_dirs` contains overlapping paths (e.g., both
`vault_dir / "PROJECTS" / "odyssey"` and `vault_dir / "PROJECTS"` are listed — lines
281–292). A file under `PROJECTS/odyssey/` is skipped correctly, but a file under
`PROJECTS/sacred-circuits/` would be re-scanned in Phase 2 because the skip check
compares against the full priority directory path, not the parent `PROJECTS/` path
that was also scanned. Result: duplicate matches appended to `matching_lines` (the
dedup is only against `seen`, which is not used here), inflating the output.

**Fix:** After Phase 1, track the set of actual file paths scanned rather than
directory prefixes:

```python
scanned_file_paths: set[str] = set()

# Inside Phase 1 loop, after files_scanned += 1:
scanned_file_paths.add(str(md_file))

# Phase 2 skip check:
if str(md_file) in scanned_file_paths:
    continue
```

---

### WR-04: Word-split token approximation silently truncates at wrong boundary for structured content

**File:** `/Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py:317`

**Issue:** The 1500-token limit is checked via `len(" ".join(matching_lines).split())`.
This re-joins and re-splits the entire growing list on every matched line inside a nested
loop — O(n) per match, O(n²) over the file. For 500 files this is acceptable but
degrades for larger vaults. Additionally, Obsidian notes frequently contain YAML
frontmatter, wikilinks `[[like this]]`, and code blocks where word splitting is not
equivalent to token counting, so the 1500-word ceiling can be off by 30–50% for
mixed-content notes. Not a correctness bug, but the cumulative re-join is the bigger
concern.

**Fix:** Track word count as a running integer rather than recomputing:

```python
word_count = 0

# After appending to matching_lines:
word_count += len(line.strip().split())
if word_count >= 1500:
    break
```

Replace all three `len(" ".join(matching_lines).split()) >= 1500` checks and the
`< 500` Phase 2 threshold with comparisons against `word_count`.

---

## Info

### IN-01: Apollo Resolution beat contains an unfilled narrative placeholder

**File:** `/Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-apollo.md:50`

**Issue:** The Resolution beat reads: "The flower remembers. When someone you cannot
outrun refuses to stop watching — is the transformation liberation, or the most
sophisticated cage?" This text appears to be a Hyacinthus/Narcissus cross-reference
fragment that was pasted as placeholder narrative. It has no connection to the
Inciting Incident, Crisis, or Climax beats established for Apollo in this file
(prophecy, clarity, "the arrow is already in flight"). The other three beats are
self-consistent; this one breaks the McKee arc.

**Fix:** Replace with a Resolution beat that closes the prophecy arc, e.g.:
"The light you carry is now yours to reckon with. The oracle does not ask what you
will do — it has already seen. What do you do now that you cannot unsee what it showed
you?"

---

### IN-02: Persephone Voice/Tone opens with an author process note, not a finalized spec

**File:** `/Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-persephone.md:18`

**Issue:** Line 18 reads: "Not yet described in ancient sources — invent from archetype:
queenly warmth with dark undertow." This is scaffolding text — a note to the author
to invent the voice — not a completed voice specification. All other 17 personas have
fully written voice descriptions at this position. If this file is loaded as-is into
a system prompt, the instruction to "invent from archetype" will appear in the LLM
context and could cause inconsistent voice behavior between sessions.

**Fix:** Replace with a completed voice description, e.g.:
"Queenly warmth with dark undertow — the voice of someone who has stood in both
worlds and is not afraid of either. Speaks with the gentleness of spring and the
finality of the underworld in the same sentence."

---

### IN-03: SOUL.md registry lists three personas with no corresponding reviewed SOUL files

**File:** `/Users/claw2501/.claude/SOUL.md:39,47,54`

**Issue:** The Agent Registry lists Athena (`SOUL-athena.md`), Hermes (`SOUL-hermes.md`),
and Zeus (`SOUL-zeus.md`) as registered oracle personas. None of these files were included
in this review's file scope, and none are in the personas directory based on the files
provided. If the registry is authoritative, these three SOULs are either missing from the
filesystem or not yet created. The registry entry for each currently points to a
non-existent path. Any code that loads all personas by iterating the registry will fail
silently or raise a FileNotFoundError for these three.

**Fix:** Either create the three missing SOUL files before Phase 21, or mark the registry
entries as `status: pending` to prevent tools from attempting to load them.

---

### IN-04: `get_oracle_collection()` docstring describes wrong embedding function

**File:** `/Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py:67`

**Issue:** The docstring says "embed queries manually... using the model stored in
collection metadata (all-MiniLM-L6-v2)". The collection is locked to `all-mpnet-base-v2`
(see module header, SOUL.md, CLAUDE.md). The wrong model name in the docstring will
mislead any developer reindexing or debugging the collection.

**Fix:** Update line 69:
```
# Change: "all-MiniLM-L6-v2" → "all-mpnet-base-v2"
```

---

### IN-05: Orphic query does not deduplicate against Hellenic results by content hash

**File:** `/Users/claw2501/services/jarvis-sandbox/backend/oracle/rag_retriever.py:237`

**Issue:** The dedup key is `(author, title, text[:100])`. Orphic texts may share the
same first 100 characters as a Hellenic result (e.g., a Hymn to Dionysus excerpt that
also appears in the myth corpus) while differing in `author` field formatting. The dedup
would miss this case. Not a correctness crash, but a data quality issue — the same
passage could appear twice in the LLM context under different source labels.

**Fix:** Consider including a normalized content hash in the dedup key:
```python
import hashlib
content_hash = hashlib.md5(text.encode()).hexdigest()[:16]
dedup_key = content_hash  # replace tuple-based key
```

---

### IN-06: Two McKee Resolution beats are rhetorical questions only — no closing directive

**Files:**
- `/Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-ares.md:50`
- `/Users/claw2501/niko-obsidian-vault/PROJECTS/The Orb/personas/SOUL-poseidon.md:51`

**Issue:** The SOUL.md shared contract specifies that Resolution is "What the fight costs"
/ "What the depth now requires." Aphrodite's Resolution ends with `[closing_question from DB]`
(a DB-injected closer), which is the intended pattern. Ares and Poseidon both end their
Resolution beat with a standalone rhetorical question and no directive. All other 15 personas
that have DB-injected questions still include a preceding directive statement before the
closing question. These two are question-only, which may produce readings that trail off
without closure.

**Fix:** Add a one-sentence directive before the closing question in each:

Ares:
> "Name the cost, warrior, and carry it without apology. When the system treats the
> emergency function as embarrassing in peacetime — is the function there because the
> system needs it, or because the system can't admit it does?"

Poseidon:
> "Let the ocean recede from the rock — for now. When you lose the bid because the other
> offering was simpler and more useful — is the grudge about losing, or about learning
> that infinite power was never what they needed?"

---

_Reviewed: 2026-04-18_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
