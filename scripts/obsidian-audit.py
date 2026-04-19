#!/usr/bin/env python3
"""
obsidian-audit.py — Audit an Obsidian vault for broken wikilinks and orphaned attachments.

Usage:
    python3 obsidian-audit.py [--vault PATH] [--json-out PATH]

Outputs:
    - Human-readable report to stdout
    - JSON sidecar at ~/scripts/obsidian-audit-results.json (overridable with --json-out)
"""

import argparse
import json
import re
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

# Directories to skip entirely (plugin assets, git internals)
EXCLUDE_DIRS = {".obsidian", ".git", "node_modules"}

# Attachment extensions to track
ATTACHMENT_EXTS = {
    ".pdf", ".png", ".jpg", ".jpeg", ".gif",
    ".webp", ".svg", ".mp4", ".mov", ".zip",
}

# Regex: capture wikilink target (before | and before #)
WIKILINK_RE = re.compile(r"\[\[([^\]|#]+)")

# Regex: markdown image/link syntax [text](path)
MD_LINK_RE = re.compile(r"\[.*?\]\(([^)]+)\)")


def _excluded(p: Path, vault: Path) -> bool:
    """Return True if any path component relative to vault is in EXCLUDE_DIRS."""
    return any(part in EXCLUDE_DIRS for part in p.relative_to(vault).parts)


def collect_notes(vault: Path) -> dict[str, list[Path]]:
    """Return {lowercased_basename: [full_paths]} for every .md file."""
    notes: dict[str, list[Path]] = defaultdict(list)
    for p in vault.rglob("*.md"):
        if not _excluded(p, vault):
            notes[p.stem.lower()].append(p)
    return notes


def collect_attachments(vault: Path) -> list[Path]:
    """Return all non-.md files with recognized attachment extensions."""
    result = []
    for p in vault.rglob("*"):
        if p.is_file() and p.suffix.lower() in ATTACHMENT_EXTS and not _excluded(p, vault):
            result.append(p)
    return result


def extract_wikilinks(text: str) -> list[str]:
    """Extract wikilink targets (normalized: stripped, lowercased)."""
    links = []
    for m in WIKILINK_RE.finditer(text):
        target = m.group(1).strip().lower()
        if target:
            links.append(target)
    return links


def extract_referenced_attachment_basenames(text: str) -> set[str]:
    """Extract basenames of referenced attachments from a note's text."""
    referenced: set[str] = set()

    # Wikilinks that look like attachments: [[file.pdf]] or [[file.pdf|label]]
    for m in WIKILINK_RE.finditer(text):
        target = m.group(1).strip()
        p = Path(target)
        if p.suffix.lower() in ATTACHMENT_EXTS:
            referenced.add(p.name.lower())

    # Markdown links: [label](path/to/file.pdf)
    for m in MD_LINK_RE.finditer(text):
        target = m.group(1).strip()
        p = Path(target)
        if p.suffix.lower() in ATTACHMENT_EXTS:
            referenced.add(p.name.lower())

    # Bare filenames with attachment extensions (e.g., `some file.pdf`)
    for ext in ATTACHMENT_EXTS:
        bare_re = re.compile(r"[\w\s\-\.]+\\" + ext + r"\b", re.IGNORECASE)
        # simpler: find word sequences ending in extension
    for ext in ATTACHMENT_EXTS:
        pattern = re.compile(r'[\w\-\. ]+' + re.escape(ext), re.IGNORECASE)
        for m in pattern.finditer(text):
            name = Path(m.group(0).strip()).name.lower()
            referenced.add(name)

    return referenced


def audit_vault(vault: Path):
    """Run the full audit and return result dict."""
    print(f"Scanning vault: {vault}", flush=True)

    # --- Collect notes ---
    note_map = collect_notes(vault)
    all_note_paths: list[Path] = [p for paths in note_map.values() for p in paths]
    note_count = len(all_note_paths)
    print(f"  Found {note_count} notes...", flush=True)

    # --- Collect attachments ---
    all_attachments = collect_attachments(vault)
    attachment_count = len(all_attachments)
    print(f"  Found {attachment_count} attachments...", flush=True)

    # --- Scan each note ---
    broken_links: list[dict] = []
    referenced_basenames: set[str] = set()

    for note_path in all_note_paths:
        try:
            text = note_path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        rel = note_path.relative_to(vault)

        # Check wikilinks
        for link_target in extract_wikilinks(text):
            # Strip extension if someone linked with it (e.g., [[note.md]])
            stem = Path(link_target).stem.lower() if "." in link_target else link_target
            # Only check as note link if it doesn't look like an attachment
            if Path(link_target).suffix.lower() in ATTACHMENT_EXTS:
                continue
            if stem not in note_map:
                broken_links.append({
                    "source": str(rel),
                    "link": link_target,
                })

        # Collect referenced attachment basenames
        referenced_basenames |= extract_referenced_attachment_basenames(text)

    print(f"  Checked wikilinks... {len(broken_links)} broken.", flush=True)

    # --- Find orphaned attachments ---
    orphaned: list[str] = []
    for att_path in all_attachments:
        if att_path.name.lower() not in referenced_basenames:
            orphaned.append(str(att_path.relative_to(vault)))

    print(f"  Found {len(orphaned)} orphaned attachments.", flush=True)

    return {
        "vault": str(vault),
        "scanned_notes": note_count,
        "scanned_attachments": attachment_count,
        "broken_links": broken_links,
        "orphaned_attachments": sorted(orphaned),
    }


def print_report(result: dict) -> None:
    """Print human-readable audit report."""
    broken = result["broken_links"]
    orphaned = result["orphaned_attachments"]

    # Group broken links by source file
    by_source: dict[str, list[str]] = defaultdict(list)
    for item in broken:
        by_source[item["source"]].append(item["link"])

    today = date.today().isoformat()

    print()
    print("===== OBSIDIAN VAULT AUDIT =====")
    print(f"Vault: {result['vault']}")
    print(f"Scanned: {result['scanned_notes']} notes, {result['scanned_attachments']} attachments")
    print(f"Date: {today}")
    print()

    print(f"--- BROKEN WIKILINKS ({len(broken)} found) ---")
    if by_source:
        for src in sorted(by_source):
            print(f"  {src}")
            for link in by_source[src]:
                print(f"    -> [[{link}]]")
    else:
        print("  None found.")
    print()

    print(f"--- ORPHANED ATTACHMENTS ({len(orphaned)} found) ---")
    if orphaned:
        for att in orphaned:
            print(f"  {att}")
    else:
        print("  None found.")
    print()

    notes_with_broken = len(by_source)
    total_issues = len(broken) + len(orphaned)

    print("--- SUMMARY ---")
    print(f"  Broken wikilinks : {len(broken)} (in {notes_with_broken} notes)")
    print(f"  Orphaned files   : {len(orphaned)}")
    print(f"  Total issues     : {total_issues}")
    print()


def main():
    default_vault = Path.home() / "Volumes" / "Extreme Pro" / "MIGRATION" / "2501-DEPLOYMENT" / "obsidian-vault"
    # Resolve actual path — on macOS /Volumes is at root
    default_vault_abs = Path("/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault")

    parser = argparse.ArgumentParser(
        description="Audit an Obsidian vault for broken wikilinks and orphaned attachments.",
    )
    parser.add_argument(
        "--vault",
        type=Path,
        default=default_vault_abs,
        help="Path to the Obsidian vault (default: /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/)",
    )
    parser.add_argument(
        "--json-out",
        type=Path,
        default=Path.home() / "scripts" / "obsidian-audit-results.json",
        help="Path to write JSON results (default: ~/scripts/obsidian-audit-results.json)",
    )
    args = parser.parse_args()

    vault = args.vault.expanduser().resolve()
    if not vault.exists() or not vault.is_dir():
        print(f"ERROR: Vault not found or not a directory: {vault}", file=sys.stderr)
        sys.exit(1)

    result = audit_vault(vault)
    print_report(result)

    # Write JSON sidecar
    json_out = args.json_out.expanduser()
    json_out.parent.mkdir(parents=True, exist_ok=True)
    json_out.write_text(json.dumps(result, indent=2), encoding="utf-8")
    print(f"JSON results written to: {json_out}")


if __name__ == "__main__":
    main()
