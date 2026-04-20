#!/usr/bin/env python3
"""
vault-image-moc-gen.py

Generate image MOCs grouped by deity, mood, and sacred_circuits_themes
from catalog.csv. Creates/updates:
  - MOC/images/by-deity.md
  - MOC/images/by-mood.md
  - MOC/images/by-theme.md

Idempotent: preserves hand-written content after <!-- end-auto --> marker.
Only writes files when auto-content changes (generated_at preserved otherwise).
"""

import argparse
import csv
import os
import re
import sys
from collections import defaultdict
from datetime import datetime, timezone


DIMENSIONS = {
    "deity": ("deities", "Deity", "deity"),
    "mood": ("mood", "Mood", "mood"),
    "theme": ("sacred_circuits_themes", "Theme", "theme"),
}

END_AUTO_MARKER = "<!-- end-auto -->"


def parse_args():
    p = argparse.ArgumentParser(description="Generate image MOCs from catalog.csv")
    p.add_argument("--vault", required=True, help="Path to vault root")
    p.add_argument("--catalog", default="IMAGES/catalog.csv", help="Catalog CSV (relative to vault)")
    p.add_argument("--dry-run", action="store_true", help="Print planned output, no writes")
    return p.parse_args()


def split_values(raw: str) -> list[str]:
    """Split semicolon-then-comma-separated values, strip whitespace, drop empty."""
    if not raw or not raw.strip():
        return []
    # Try semicolon first
    parts = [p.strip() for p in raw.split(";")]
    if len(parts) == 1:
        # Fallback to comma
        parts = [p.strip() for p in raw.split(",")]
    return [p for p in parts if p]


def note_basenames(related_notes: str) -> list[str]:
    """Extract note basenames (without .md) from semicolon-separated paths."""
    if not related_notes.strip():
        return []
    names = []
    for p in related_notes.split(";"):
        p = p.strip()
        if p:
            basename = os.path.splitext(os.path.basename(p))[0]
            names.append(basename)
    return names


def build_auto_body(dimension_key: str, column: str, label: str, rows: list[dict]) -> str:
    """Build the auto-generated body (everything before end-auto marker)."""
    # Group rows by dimension value
    groups: dict[str, list[dict]] = defaultdict(list)
    for row in rows:
        vals = split_values(row.get(column, ""))
        if not vals:
            vals = ["(untagged)"]
        for v in vals:
            groups[v].append(row)

    # Sort groups case-insensitively, rows within each group by filename
    sorted_groups = sorted(groups.items(), key=lambda x: x[0].lower())

    lines = []
    lines.append(f"# Images by {label}\n")
    lines.append(f"\nAuto-generated from `IMAGES/catalog.csv`. "
                 f"Grouped by `{column}`. "
                 f"Edit below the end-auto marker to add hand-written notes.\n")

    for group_name, group_rows in sorted_groups:
        lines.append(f"\n## {group_name}\n")
        sorted_rows = sorted(group_rows, key=lambda r: r["filename"].lower())
        for r in sorted_rows:
            filename = r["filename"]
            desc = r.get("description", "").strip() or "No description"
            lines.append(f"- **{filename}** — {desc}\n")
            # Add related note wikilinks if present
            basenames = note_basenames(r.get("related_notes", ""))
            if basenames:
                links = ", ".join(f"[[{n}]]" for n in basenames)
                lines.append(f"  - Related: {links}\n")

    return "".join(lines)


def build_frontmatter(generated_at: str) -> str:
    return (
        "---\n"
        "type: moc\n"
        "source: IMAGES/catalog.csv\n"
        "auto_generated: true\n"
        f"generated_at: {generated_at}\n"
        "---\n"
    )


def load_existing(path: str) -> tuple[str, str]:
    """Load existing file. Return (pre_marker_content, post_marker_content).
    pre includes everything including the marker line.
    post is everything after the marker (may be empty string).
    """
    if not os.path.exists(path):
        return "", ""
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    idx = content.find(END_AUTO_MARKER)
    if idx == -1:
        # No marker — treat whole file as auto content, no preserved section
        return content, ""
    # Include the marker line itself in pre
    marker_end = idx + len(END_AUTO_MARKER)
    # Advance past the newline after marker
    if marker_end < len(content) and content[marker_end] == "\n":
        marker_end += 1
    pre = content[:marker_end]
    post = content[marker_end:]
    return pre, post


def extract_generated_at(pre: str) -> str | None:
    """Extract generated_at value from existing frontmatter."""
    m = re.search(r"^generated_at:\s*(.+)$", pre, re.MULTILINE)
    return m.group(1).strip() if m else None


def strip_frontmatter(text: str) -> str:
    """Strip leading YAML frontmatter block from text."""
    if not text.startswith("---"):
        return text
    end = text.find("\n---", 3)
    if end == -1:
        return text
    rest = text[end + 4:]
    if rest.startswith("\n"):
        rest = rest[1:]
    return rest


def generate_moc(
    path: str,
    dimension_key: str,
    column: str,
    label: str,
    rows: list[dict],
    dry_run: bool,
) -> bool:
    """Generate or update a single MOC file. Returns True if written."""
    new_auto_body = build_auto_body(dimension_key, column, label, rows)

    # Load existing
    existing_pre, post_marker = load_existing(path)
    existing_body = strip_frontmatter(existing_pre)

    # Strip trailing end-auto marker for body comparison
    # load_existing puts the marker inside pre; strip_frontmatter leaves it in existing_body
    marker_idx = existing_body.rfind("\n" + END_AUTO_MARKER)
    if marker_idx != -1:
        existing_body_trimmed = existing_body[:marker_idx].rstrip("\n")
    else:
        existing_body_trimmed = existing_body.rstrip("\n")

    if existing_body_trimmed == new_auto_body.rstrip("\n") and os.path.exists(path):
        # No change — skip write, preserve existing generated_at
        return False

    # Content changed: use current timestamp
    generated_at = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    frontmatter = build_frontmatter(generated_at)
    full_content = (
        frontmatter
        + new_auto_body.rstrip("\n")
        + "\n"
        + END_AUTO_MARKER
        + "\n"
        + post_marker
    )

    if dry_run:
        print(f"  [DRY-RUN] Would write: {path}")
    else:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write(full_content)
        print(f"  written: {path}")
    return True


def main():
    args = parse_args()
    vault = args.vault.rstrip("/")
    catalog_path = os.path.join(vault, args.catalog)

    if not os.path.exists(catalog_path):
        print(f"ERROR: Catalog not found: {catalog_path}", file=sys.stderr)
        sys.exit(1)

    with open(catalog_path, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    # Count unique values per dimension for summary
    counts = {}
    for dim_key, (column, label, slug) in DIMENSIONS.items():
        vals = set()
        for row in rows:
            for v in split_values(row.get(column, "")):
                vals.add(v)
        counts[dim_key] = len(vals)

    n_images = len(rows)

    for dim_key, (column, label, slug) in DIMENSIONS.items():
        moc_path = os.path.join(vault, "MOC", "images", f"by-{slug}.md")
        generate_moc(moc_path, dim_key, column, label, rows, args.dry_run)

    print(
        f"\nDone: {counts['deity']} deities, {counts['mood']} moods, "
        f"{counts['theme']} themes, {n_images} images indexed."
    )


if __name__ == "__main__":
    main()
