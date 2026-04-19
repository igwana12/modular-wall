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
    """Return all .md paths, skipping SKIP_DIRS."""
    result = []
    for root, dirs, files in os.walk(vault):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for f in files:
            if f.endswith(".md"):
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


def is_in_code(text, start):
    """Check if position `start` falls inside a fenced code block or inline code."""
    # Check inline code `...`
    # Count backtick pairs before start
    before = text[:start]
    # Fenced code blocks: count opening ``` that haven't been closed
    fenced = re.findall(r'```[^\n]*', before)
    # Simple heuristic: odd number of ``` fences = inside fenced block
    fence_count = len(re.findall(r'^```', before, re.MULTILINE))
    if fence_count % 2 == 1:
        return True
    # Inline code: count backticks (non-triple)
    # Strip triple backticks first
    stripped = re.sub(r'```[\s\S]*?```', '', before)
    if stripped.count('`') % 2 == 1:
        return True
    return False


def inject_wikilinks(body, title_index, note_stem):
    """Return modified body with first-occurrence wikilinks injected."""
    # Track which titles we've already linked in this note
    already_linked = set()

    # Find all existing wikilinks in body and mark those titles as done
    existing = re.findall(r'\[\[([^\]|]+)(?:\|[^\]]+)?\]\]', body)
    for e in existing:
        already_linked.add(e.lower())
        already_linked.add(e.lower().replace(" ", "-"))
        already_linked.add(e.lower().replace("-", " "))

    # Build sorted list: longer titles first to avoid partial matches
    sorted_titles = sorted(title_index.keys(), key=len, reverse=True)

    for lower_title in sorted_titles:
        original = title_index[lower_title]
        if lower_title == note_stem.lower():
            continue  # Don't self-link
        if lower_title in already_linked:
            continue  # Already wikilinked somewhere

        # Build pattern: whole-word, case-insensitive, not inside [[...]] or [text](url) or URL
        # Escape the title for regex use
        escaped = re.escape(lower_title)
        pattern = r'(?<!\[)(?<!\[\[)\b(' + escaped + r')\b(?!\])'

        def replacer(m, orig=original, linked=already_linked, lt=lower_title):
            # Check position not inside code
            start = m.start()
            if is_in_code(body_working[0], start):
                return m.group(0)
            linked.add(lt)
            return f'[[{orig}]]'

        # We need mutable reference for is_in_code closure
        body_working = [body]

        new_body, count = re.subn(pattern, replacer, body, count=1, flags=re.IGNORECASE | re.UNICODE)

        if count > 0:
            body = new_body
            already_linked.add(lower_title)

    return body


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
