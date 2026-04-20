#!/usr/bin/env python3
"""
vault-tag-extract.py — Step 2/5: Extract tags into YAML frontmatter.

Usage: python3 vault-tag-extract.py [--vault PATH] [--dry-run]
Default vault: /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault
Exit 0 on success, non-zero on error.
Prints summary: "tagged: N / skipped: M / themes: {theme: count}"
"""

import argparse
import os
import re
import sys

import frontmatter

VAULT_DEFAULT = "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault"
SKIP_DIRS = {".obsidian", ".trash", ".git", "MOC"}

TAXONOMY = {
    "mythology": [
        "greek god", "zeus", "athena", "hermes", "oracle", "pantheon",
        "myth", "olympus", "hades", "persephone", "dionysus",
    ],
    "travel": [
        "flight", "itinerary", "hotel", "airbnb", "passport", "visa",
        "trip", "journey", "expedition",
    ],
    "consciousness": [
        "consciousness", "awareness", "meditation", "mindfulness",
        "awakening", "lucid", "non-dual",
    ],
    "psychedelics": [
        "psilocybin", "mushroom", "ayahuasca", "dmt", "lsd", "ketamine",
        "trip report", "integration",
    ],
    "sacred-circuits": [
        "sacred circuits", "sc brand", "sacred-circuits",
    ],
    "mosaic": [
        "mosaic", "modular wall", "wall computer", "pogo-pin", "mosaic module",
    ],
    "jarvis": [
        "jarvis", "voice assistant", "llm router", "smithers",
    ],
    "oracle": [
        "oracle card", "tarot", "divination", "reading", "card deck", "spirit sphere",
    ],
    "family": [
        "mom", "dad", "sister", "brother", "family", "wedding",
        "anniversary", "kids",
    ],
    "finance": [
        "invoice", "tax", "budget", "expense", "revenue", "kickstarter",
        "stripe", "bank",
    ],
    "health": [
        "doctor", "diagnosis", "medication", "exercise", "sleep",
        "therapy", "workout",
    ],
    "writing": [
        "draft", "essay", "blog", "post", "substack", "manuscript",
        "chapter", "story",
    ],
    "philosophy": [
        "stoic", "epictetus", "seneca", "marcus aurelius", "nietzsche",
        "kant", "ethics",
    ],
    "identity": [
        "who am i", "self-concept", "purpose", "values", "mission", "vision",
    ],
}


def collect_md_files(vault):
    result = []
    for root, dirs, files in os.walk(vault):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for f in files:
            if f.endswith(".md") and not f.startswith("._"):
                result.append(os.path.join(root, f))
    return result


def detect_themes(stem, full_text_lower):
    """Return sorted list of theme tags that match this note."""
    themes = []
    stem_lower = stem.lower()
    for theme, keywords in TAXONOMY.items():
        # Theme name in stem is instant match
        if theme in stem_lower or theme.replace("-", " ") in stem_lower:
            themes.append(theme)
            continue
        # Count keyword matches in full text
        match_count = 0
        for kw in keywords:
            # Count all occurrences of keyword in text
            occurrences = len(re.findall(re.escape(kw), full_text_lower))
            match_count += occurrences
        if match_count >= 2:
            themes.append(theme)
    return sorted(themes)


def process_note(path, dry_run):
    """Process a single note. Returns (modified: bool, new_tags: list, error: str|None)."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            raw = f.read()
    except Exception as e:
        return False, [], str(e)

    stem = os.path.splitext(os.path.basename(path))[0]
    full_text_lower = raw.lower()

    new_theme_tags = detect_themes(stem, full_text_lower)
    if not new_theme_tags:
        return False, [], None

    # Load with python-frontmatter
    try:
        post = frontmatter.loads(raw)
    except Exception as e:
        return False, [], f"frontmatter parse error: {e}"

    existing_tags = post.get("tags", [])
    if isinstance(existing_tags, str):
        existing_tags = [t.strip() for t in existing_tags.split(",") if t.strip()]
    elif isinstance(existing_tags, list):
        # Coerce any non-string items (e.g. datetime.date from YAML) to str
        existing_tags = [str(t) for t in existing_tags]
    else:
        existing_tags = []

    merged = sorted(set(existing_tags) | set(new_theme_tags))

    if merged == sorted(existing_tags):
        return False, [], None  # No change

    if not dry_run:
        post["tags"] = merged
        new_raw = frontmatter.dumps(post)
        # Ensure trailing newline
        if not new_raw.endswith("\n"):
            new_raw += "\n"
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_raw)

    return True, new_theme_tags, None


def main():
    parser = argparse.ArgumentParser(description="Extract tags into YAML frontmatter")
    parser.add_argument("--vault", default=VAULT_DEFAULT)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    vault = args.vault
    if not os.path.isdir(vault):
        print(f"ERROR: vault not found at {vault}", file=sys.stderr)
        sys.exit(1)

    md_files = collect_md_files(vault)

    tagged = skipped = errors = 0
    theme_counts = {t: 0 for t in TAXONOMY}

    for path in md_files:
        modified, new_tags, err = process_note(path, args.dry_run)
        if err:
            errors += 1
        elif modified:
            tagged += 1
            for t in new_tags:
                theme_counts[t] = theme_counts.get(t, 0) + 1
        else:
            skipped += 1

    active_themes = {k: v for k, v in theme_counts.items() if v > 0}
    mode = " [DRY-RUN]" if args.dry_run else ""
    print(f"tagged: {tagged} / skipped: {skipped} / errors: {errors} / themes: {active_themes}{mode}")


if __name__ == "__main__":
    main()
