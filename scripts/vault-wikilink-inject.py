#!/usr/bin/env python3
"""
vault-wikilink-inject.py — Step 1/5: Inject [[wikilinks]] into vault notes.

Usage: python3 vault-wikilink-inject.py [--vault PATH] [--dry-run]
Default vault: /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault
Exit 0 on success, non-zero on error.
Prints one-line summary at end: "modified: N notes / skipped: M / errors: E"
"""

import argparse
import os
import re
import sys

VAULT_DEFAULT = "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault"
SKIP_DIRS = {".obsidian", ".trash", ".git", "MOC"}
SKIP_TITLES_EXACT = {
    "the", "and", "for", "with", "from", "this", "that", "into", "your",
    "our", "about", "home", "index",
}
MIN_TITLE_LEN = 4


def collect_md_files(vault):
    """Return all .md paths, skipping SKIP_DIRS and macOS resource forks."""
    result = []
    for root, dirs, files in os.walk(vault):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for f in files:
            if f.endswith(".md") and not f.startswith("._"):
                result.append(os.path.join(root, f))
    return result


def build_title_index(md_files):
    """Build {lower_stem: original_stem} index with filters applied."""
    index = {}
    for path in md_files:
        stem = os.path.splitext(os.path.basename(path))[0]
        lower = stem.lower()
        if len(lower) < MIN_TITLE_LEN:
            continue
        if lower.isnumeric():
            continue
        if lower in SKIP_TITLES_EXACT:
            continue
        index[lower] = stem
    return index


def split_frontmatter_body(text):
    """Return (frontmatter_str, body_str). frontmatter_str includes the --- fences."""
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            fm = text[:end + 4]
            body = text[end + 4:]
            return fm, body
    return "", text


def mask_protected_spans(body):
    """
    Replace all protected spans (code blocks, inline code, wikilinks, markdown links,
    bare URLs) with placeholder tokens. Returns (masked_body, restore_map).
    Placeholder format: \x00N\x00 where N is integer index.
    """
    tokens = []

    def make_token(text):
        idx = len(tokens)
        tokens.append(text)
        return f"\x00{idx}\x00"

    # Order matters: fenced blocks first, then inline, then links
    patterns_ordered = [
        # Fenced code blocks (``` or ~~~)
        (r'```[\s\S]*?```', re.DOTALL),
        (r'~~~[\s\S]*?~~~', re.DOTALL),
        # Inline code
        (r'`[^`\n]+`', 0),
        # Existing wikilinks [[...]]
        (r'\[\[[^\]]*\]\]', 0),
        # Markdown links [text](url) — mask the whole thing
        (r'\[[^\]]*\]\([^)]*\)', 0),
        # Bare URLs
        (r'https?://\S+', 0),
    ]

    for pat, flags in patterns_ordered:
        def replace_token(m, _tok=tokens):
            idx = len(_tok)
            _tok.append(m.group(0))
            return f"\x00{idx}\x00"
        body = re.sub(pat, replace_token, body, flags=flags)

    return body, tokens


def restore_tokens(body, tokens):
    """Reverse mask_protected_spans."""
    def restore(m):
        idx = int(m.group(1))
        return tokens[idx]
    return re.sub(r'\x00(\d+)\x00', restore, body)


def inject_wikilinks(body, title_index, note_stem):
    """Return modified body with first-occurrence wikilinks injected."""
    # Mask protected spans so we never touch them
    masked, tokens = mask_protected_spans(body)

    # Find titles already wikilinked (they're now tokens — scan original body)
    already_linked = set()
    existing = re.findall(r'\[\[([^\]|]+)(?:\|[^\]]+)?\]\]', body)
    for e in existing:
        already_linked.add(e.lower())
        already_linked.add(e.lower().replace(" ", "-"))
        already_linked.add(e.lower().replace("-", " "))

    # Also scan token values for wikilinks already present
    for tok in tokens:
        if tok.startswith("[["):
            inner = re.match(r'\[\[([^\]|]+)', tok)
            if inner:
                e = inner.group(1)
                already_linked.add(e.lower())
                already_linked.add(e.lower().replace(" ", "-"))
                already_linked.add(e.lower().replace("-", " "))

    # Build sorted list: longer titles first to avoid partial matches
    sorted_titles = sorted(title_index.keys(), key=len, reverse=True)

    for lower_title in sorted_titles:
        original = title_index[lower_title]
        if lower_title == note_stem.lower():
            continue
        if lower_title in already_linked:
            continue

        escaped = re.escape(lower_title)
        # Only match outside placeholder tokens (\x00...\x00)
        pattern = r'(?<!\x00)\b(' + escaped + r')\b'

        new_masked, count = re.subn(
            pattern, f'[[{original}]]', masked, count=1, flags=re.IGNORECASE | re.UNICODE
        )

        if count > 0:
            masked = new_masked
            already_linked.add(lower_title)

    return restore_tokens(masked, tokens)


def process_note(path, title_index, dry_run):
    """Process a single note file. Returns True if modified."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()
    except Exception as e:
        return False, str(e)

    fm, body = split_frontmatter_body(text)
    stem = os.path.splitext(os.path.basename(path))[0]

    new_body = inject_wikilinks(body, title_index, stem)

    if new_body == body:
        return False, None

    if not dry_run:
        new_text = fm + new_body
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_text)

    return True, None


def main():
    parser = argparse.ArgumentParser(description="Inject wikilinks into Obsidian vault")
    parser.add_argument("--vault", default=VAULT_DEFAULT)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    vault = args.vault
    if not os.path.isdir(vault):
        print(f"ERROR: vault not found at {vault}", file=sys.stderr)
        sys.exit(1)

    md_files = collect_md_files(vault)
    title_index = build_title_index(md_files)
    print(f"Title index: {len(title_index)} entries from {len(md_files)} notes")

    modified = skipped = errors = 0

    for path in md_files:
        changed, err = process_note(path, title_index, args.dry_run)
        if err:
            errors += 1
        elif changed:
            modified += 1
        else:
            skipped += 1

    mode = " [DRY-RUN]" if args.dry_run else ""
    print(f"modified: {modified} notes / skipped: {skipped} / errors: {errors}{mode}")


if __name__ == "__main__":
    main()
