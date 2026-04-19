#!/usr/bin/env python3
"""
obsidian-cleanup.py — Safely clean up orphaned attachments identified by obsidian-audit.py.

Usage:
    python3 obsidian-cleanup.py [--audit-file PATH] [--vault PATH] [--execute]

Default behavior: dry-run (shows what would be deleted, touches nothing).
Pass --execute to actually move files to ~/obsidian-phantom-trash/.

Guards:
  - Never touches .md files
  - Never deletes files outside the vault path
"""

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path


DEFAULT_AUDIT_FILE = Path.home() / "scripts" / "obsidian-audit-results.json"
DEFAULT_VAULT = Path("/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault")
TRASH_DIR = Path.home() / "obsidian-phantom-trash"
LOG_FILE = Path.home() / "scripts" / "obsidian-cleanup-log.txt"


def load_audit(audit_file: Path) -> dict:
    """Load audit results JSON. Exits with error if missing."""
    audit_file = audit_file.expanduser()
    if not audit_file.exists():
        print(
            f"ERROR: Audit file not found: {audit_file}\n"
            "Run obsidian-audit.py first.",
            file=sys.stderr,
        )
        sys.exit(1)

    with audit_file.open(encoding="utf-8") as f:
        return json.load(f)


def get_file_size_mb(path: Path) -> float:
    """Return file size in MB, or 0.0 if inaccessible."""
    try:
        return path.stat().st_size / (1024 * 1024)
    except Exception:
        return 0.0


def resolve_orphan_paths(vault: Path, orphaned_rel_paths: list[str]) -> list[tuple[str, Path]]:
    """Return list of (rel_path, abs_path) for orphaned files that still exist."""
    result = []
    for rel in orphaned_rel_paths:
        abs_path = vault / rel
        if abs_path.exists():
            result.append((rel, abs_path))
    return result


def guard_check(abs_path: Path, vault: Path) -> str | None:
    """
    Returns an error string if the file should NOT be deleted, else None.
    Guards:
      1. No .md files
      2. Must be inside vault
    """
    if abs_path.suffix.lower() == ".md":
        return f"SKIPPED (is a .md file): {abs_path}"
    try:
        abs_path.relative_to(vault)
    except ValueError:
        return f"SKIPPED (outside vault): {abs_path}"
    return None


def print_summary(orphan_paths: list[tuple[str, Path]], vault: Path) -> None:
    """Print what would be (or will be) deleted."""
    total_mb = sum(get_file_size_mb(p) for _, p in orphan_paths)
    print()
    print(f"Orphaned attachments to delete: {len(orphan_paths)} files")
    print(f"Total size: {total_mb:.2f} MB")
    print()
    print("Files:")
    for rel, abs_path in orphan_paths:
        mb = get_file_size_mb(abs_path)
        print(f"  {rel}  ({mb:.2f} MB)")
    print()


def dry_run(orphan_paths: list[tuple[str, Path]], vault: Path) -> None:
    """Show what would be deleted. Touch nothing."""
    print_summary(orphan_paths, vault)
    print("Dry run complete. Pass --execute to delete.")


def execute_cleanup(orphan_paths: list[tuple[str, Path]], vault: Path) -> None:
    """Move orphaned files to trash dir after confirmation."""
    print_summary(orphan_paths, vault)

    n = len(orphan_paths)
    answer = input(f"Type 'yes' to move {n} files to {TRASH_DIR}: ").strip().lower()
    if answer != "yes":
        print("Aborted. Nothing deleted.")
        sys.exit(0)

    TRASH_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().isoformat(timespec="seconds")
    log_lines = [f"=== obsidian-cleanup run: {timestamp} ===\n"]

    moved = 0
    skipped = 0
    for rel, abs_path in orphan_paths:
        guard_err = guard_check(abs_path, vault)
        if guard_err:
            print(f"  SKIP: {guard_err}")
            log_lines.append(f"  SKIP: {guard_err}\n")
            skipped += 1
            continue

        # Preserve directory structure in trash
        dest = TRASH_DIR / rel
        dest.parent.mkdir(parents=True, exist_ok=True)

        # Avoid clobbering existing file in trash
        if dest.exists():
            stem = dest.stem
            suffix = dest.suffix
            dest = dest.with_name(f"{stem}_{timestamp.replace(':', '-')}{suffix}")

        try:
            abs_path.rename(dest)
            print(f"  MOVED: {rel} -> {dest}")
            log_lines.append(f"  MOVED: {rel} -> {dest}\n")
            moved += 1
        except Exception as e:
            print(f"  ERROR moving {rel}: {e}")
            log_lines.append(f"  ERROR: {rel}: {e}\n")
            skipped += 1

    log_lines.append(f"\nTotal moved: {moved}, skipped/errored: {skipped}\n\n")

    # Write log
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with LOG_FILE.open("a", encoding="utf-8") as f:
        f.writelines(log_lines)

    print()
    print(f"Done. {moved} files moved to {TRASH_DIR}. Log: {LOG_FILE}")


def main():
    parser = argparse.ArgumentParser(
        description="Safely clean up orphaned attachments found by obsidian-audit.py.",
    )
    parser.add_argument(
        "--audit-file",
        type=Path,
        default=DEFAULT_AUDIT_FILE,
        help=f"Path to audit JSON (default: {DEFAULT_AUDIT_FILE})",
    )
    parser.add_argument(
        "--vault",
        type=Path,
        default=DEFAULT_VAULT,
        help=f"Vault path for safety guard (default: {DEFAULT_VAULT})",
    )
    parser.add_argument(
        "--execute",
        action="store_true",
        default=False,
        help="Actually move orphaned files to ~/obsidian-phantom-trash/ (default: dry-run)",
    )
    args = parser.parse_args()

    vault = args.vault.expanduser().resolve()
    audit = load_audit(args.audit_file)

    orphaned_rel = audit.get("orphaned_attachments", [])
    if not orphaned_rel:
        print("No orphaned attachments found in audit file. Nothing to do.")
        sys.exit(0)

    orphan_paths = resolve_orphan_paths(vault, orphaned_rel)

    if len(orphan_paths) < len(orphaned_rel):
        missing = len(orphaned_rel) - len(orphan_paths)
        print(f"Note: {missing} orphaned file(s) from audit no longer exist on disk (already removed?).")

    if not orphan_paths:
        print("No orphaned files found on disk. Nothing to do.")
        sys.exit(0)

    if args.execute:
        execute_cleanup(orphan_paths, vault)
    else:
        dry_run(orphan_paths, vault)


if __name__ == "__main__":
    main()
