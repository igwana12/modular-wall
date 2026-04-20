#!/usr/bin/env python3
"""
vault-image-backlink.py

Parse catalog.csv and inject image backlinks into related vault notes.
Adds/replaces:
  - YAML frontmatter `images:` key (sorted list of filenames)
  - `## Images` section with one bullet per image

Idempotent: second run reports 0 modifications.
"""

import argparse
import csv
import os
import re
import sys
from collections import defaultdict
from typing import Optional


def parse_args():
    p = argparse.ArgumentParser(description="Inject image backlinks into vault notes from catalog.csv")
    p.add_argument("--vault", required=True, help="Path to Obsidian vault root")
    p.add_argument("--catalog", default="IMAGES/catalog.csv", help="Catalog CSV path (relative to vault)")
    p.add_argument("--dry-run", action="store_true", help="Print planned changes without writing")
    return p.parse_args()


def parse_frontmatter(text: str):
    """Return (yaml_text, body_text) or (None, full_text) if no frontmatter."""
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, text
    yaml_block = text[3:end].strip()
    rest = text[end + 4:]
    if rest.startswith("\n"):
        rest = rest[1:]
    return yaml_block, rest


def set_yaml_images(yaml_text: Optional[str], images: list[str]) -> str:
    """Set/replace the `images:` key in YAML, preserving all other keys."""
    images_block = "images:\n" + "".join(f"  - {img}\n" for img in images)

    if yaml_text is None:
        return images_block.rstrip()

    # Remove existing images block (key + list lines following it).
    # Also strip any orphaned bare list items at the very start of YAML that
    # resulted from a previous broken write (images key lost, items became root-level).
    lines = yaml_text.split("\n")
    new_lines = []
    skip = False
    preamble_done = False  # once we see a real key, stop stripping leading bare items
    for line in lines:
        if re.match(r"^images\s*:", line):
            skip = True
            preamble_done = True
            continue
        if skip:
            # list item belonging to images key
            if re.match(r"^\s+-", line):
                continue
            else:
                skip = False
        # Strip leading bare list items before any YAML key (orphaned from broken run)
        if not preamble_done and re.match(r"^-\s+\S", line) and not re.match(r"^\w", line):
            # bare list item with no preceding key — skip it
            continue
        if re.match(r"^\w", line):
            preamble_done = True
        new_lines.append(line)

    base = "\n".join(new_lines).strip()
    if base:
        return base + "\n" + images_block.rstrip()
    return images_block.rstrip()


def build_images_section(image_rows: list[dict]) -> str:
    """Build the ## Images section body (sorted by filename)."""
    sorted_rows = sorted(image_rows, key=lambda r: r["filename"].lower())
    lines = ["## Images\n"]
    for r in sorted_rows:
        filename = r["filename"]
        desc = r.get("description", "").strip() or "No description"
        lines.append(f"- **{filename}** — {desc} ([catalog](IMAGES/catalog.csv))\n")
    return "".join(lines)


def inject_images_section(body: str, images_section: str) -> str:
    """Find or create ## Images section, replacing its content."""
    # Find existing ## Images heading
    pattern = re.compile(r"^## Images\s*\n", re.MULTILINE)
    match = pattern.search(body)

    if match:
        start = match.start()
        # Find where this section ends (next ## heading or EOF)
        next_section = re.search(r"^## ", body[match.end():], re.MULTILINE)
        if next_section:
            end = match.end() + next_section.start()
        else:
            end = len(body)
        return body[:start] + images_section + "\n" + body[end:].lstrip("\n")
    else:
        # Append at end
        if body.endswith("\n"):
            return body + "\n" + images_section
        return body + "\n\n" + images_section


def process_note(path: str, image_rows: list[dict], dry_run: bool) -> bool:
    """Inject backlinks into a single note. Returns True if modified."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            original = f.read()
    except Exception as e:
        print(f"  ERROR reading {path}: {e}", file=sys.stderr)
        return False

    yaml_text, body = parse_frontmatter(original)

    # Build sorted unique image filenames
    seen = set()
    unique_rows = []
    for r in image_rows:
        fn = r["filename"]
        if fn not in seen:
            seen.add(fn)
            unique_rows.append(r)
    filenames = sorted([r["filename"] for r in unique_rows], key=str.lower)

    new_yaml = set_yaml_images(yaml_text, filenames)
    images_section = build_images_section(unique_rows)
    new_body = inject_images_section(body, images_section)

    # Reconstruct file
    new_content = f"---\n{new_yaml}\n---\n{new_body}"

    # Normalize trailing newline
    if not new_content.endswith("\n"):
        new_content += "\n"

    if new_content == original:
        return False  # unchanged

    if dry_run:
        print(f"  [DRY-RUN] Would update: {path}")
    else:
        try:
            with open(path, "w", encoding="utf-8") as f:
                f.write(new_content)
        except Exception as e:
            print(f"  ERROR writing {path}: {e}", file=sys.stderr)
            return False
    return True


def main():
    args = parse_args()
    vault = args.vault.rstrip("/")
    catalog_path = os.path.join(vault, args.catalog)

    if not os.path.exists(catalog_path):
        print(f"ERROR: Catalog not found: {catalog_path}", file=sys.stderr)
        sys.exit(1)

    # Parse catalog
    note_images: dict[str, list[dict]] = defaultdict(list)
    scanned = 0

    with open(catalog_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            scanned += 1
            rn = row.get("related_notes", "").strip()
            if not rn:
                continue
            for rel_path in rn.split(";"):
                rel_path = rel_path.strip()
                if not rel_path:
                    continue
                full_path = os.path.join(vault, rel_path)
                note_images[full_path].append(row)

    notes_touched = 0
    notes_missing = 0
    notes_unchanged = 0

    for note_path, rows in note_images.items():
        if not os.path.exists(note_path):
            print(f"  WARN: missing note: {note_path}", file=sys.stderr)
            notes_missing += 1
            continue
        modified = process_note(note_path, rows, args.dry_run)
        if modified:
            notes_touched += 1
            print(f"  updated: {note_path}")
        else:
            notes_unchanged += 1

    print(
        f"\nDone: {scanned} catalog rows, {notes_touched} notes updated, "
        f"{notes_missing} missing, {notes_unchanged} unchanged."
    )


if __name__ == "__main__":
    main()
