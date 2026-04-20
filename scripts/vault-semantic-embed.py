#!/usr/bin/env python3
"""
vault-semantic-embed.py — Step 4/5: Semantic similarity + related: frontmatter.

Usage: python3 vault-semantic-embed.py [--vault PATH] [--dry-run]
Default vault: /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault
--dry-run: embeds and computes similarities, but does NOT write frontmatter changes.
Exit 0 on success, non-zero on error.
Prints: "embedded: N / cached: M / updated_related: K / unchanged: U"
"""

import argparse
import hashlib
import json
import os
import re
import sys
import time

import frontmatter
import numpy as np
import requests

VAULT_DEFAULT = "/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault"
SKIP_DIRS = {".obsidian", ".trash", ".git"}
CACHE_DIR = os.path.expanduser("~/.cache/vault-embed")
OLLAMA_URL = "http://localhost:11434/api/embeddings"
MODEL = "nomic-embed-text"
CHUNK_SIZE = 2000
CHUNK_OVERLAP = 200
TOP_N = 5
MAX_RETRIES = 3


def collect_md_files(vault):
    result = []
    for root, dirs, files in os.walk(vault):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for f in files:
            if f.endswith(".md") and not f.startswith("._"):
                result.append(os.path.join(root, f))
    return result


def strip_frontmatter(text):
    """Return body text only, stripped of YAML frontmatter."""
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            return text[end + 4:].strip()
    return text.strip()


def chunk_text(text, size=CHUNK_SIZE, overlap=CHUNK_OVERLAP):
    """Split text into overlapping windows."""
    if len(text) <= size:
        return [text]
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + size, len(text))
        chunks.append(text[start:end])
        if end == len(text):
            break
        start += size - overlap
    return chunks


def sha256_of(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def load_cache(sha):
    path = os.path.join(CACHE_DIR, f"{sha}.json")
    if os.path.exists(path):
        try:
            with open(path) as f:
                return json.load(f)["embedding"]
        except Exception:
            return None
    return None


def save_cache(sha, embedding):
    os.makedirs(CACHE_DIR, exist_ok=True)
    path = os.path.join(CACHE_DIR, f"{sha}.json")
    with open(path, "w") as f:
        json.dump({"embedding": embedding}, f)


def embed_text(text, retries=MAX_RETRIES):
    """Call ollama API. Returns list[float] or raises."""
    for attempt in range(retries):
        try:
            resp = requests.post(
                OLLAMA_URL,
                json={"model": MODEL, "prompt": text},
                timeout=60,
            )
            resp.raise_for_status()
            return resp.json()["embedding"]
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
            else:
                raise


def get_note_embedding(body, sha):
    """Return (embedding_vector, from_cache: bool)."""
    cached = load_cache(sha)
    if cached is not None:
        return np.array(cached, dtype=np.float32), True

    chunks = chunk_text(body)
    chunk_embeddings = []
    for chunk in chunks:
        chunk_sha = sha256_of(chunk)
        cached_chunk = load_cache(chunk_sha)
        if cached_chunk is not None:
            chunk_embeddings.append(np.array(cached_chunk, dtype=np.float32))
        else:
            vec = embed_text(chunk)
            chunk_embeddings.append(np.array(vec, dtype=np.float32))
            save_cache(chunk_sha, vec)

    if len(chunk_embeddings) == 1:
        vec = chunk_embeddings[0]
    else:
        vec = np.mean(chunk_embeddings, axis=0)

    # Normalize
    norm = np.linalg.norm(vec)
    if norm > 0:
        vec = vec / norm

    save_cache(sha, vec.tolist())
    return vec, False


def cosine_sim_matrix(vectors):
    """Return NxN cosine similarity matrix for normalized vectors."""
    mat = np.array(vectors, dtype=np.float32)
    # Normalize rows
    norms = np.linalg.norm(mat, axis=1, keepdims=True)
    norms[norms == 0] = 1
    mat = mat / norms
    return mat @ mat.T


def get_existing_related(path):
    """Return (related_list, parseable: bool)."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            post = frontmatter.loads(f.read())
        related = post.get("related", [])
        if isinstance(related, list):
            return [str(r) for r in related], True
        return [], True
    except Exception:
        return [], False


def write_related(path, related_list):
    """Overwrite only the related: key in YAML frontmatter."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            raw = f.read()
        post = frontmatter.loads(raw)
        post["related"] = related_list
        new_raw = frontmatter.dumps(post)
        if not new_raw.endswith("\n"):
            new_raw += "\n"
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_raw)
        return None
    except Exception as e:
        return str(e)


def main():
    parser = argparse.ArgumentParser(description="Semantic embeddings + related: frontmatter")
    parser.add_argument("--vault", default=VAULT_DEFAULT)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    vault = args.vault
    if not os.path.isdir(vault):
        print(f"ERROR: vault not found at {vault}", file=sys.stderr)
        sys.exit(1)

    # Ensure ollama has the model
    try:
        resp = requests.get("http://localhost:11434/api/tags", timeout=5)
        models = [m["name"] for m in resp.json().get("models", [])]
        if not any(MODEL in m for m in models):
            print(f"Pulling {MODEL}...", flush=True)
            os.system(f"ollama pull {MODEL}")
    except Exception as e:
        print(f"WARNING: Could not verify ollama model: {e}", file=sys.stderr)

    md_files = collect_md_files(vault)
    # Exclude empty notes
    valid_files = []
    bodies = []
    for path in md_files:
        try:
            with open(path, "r", encoding="utf-8") as f:
                text = f.read()
            body = strip_frontmatter(text)
            if len(body.strip()) < 10:
                continue
            valid_files.append(path)
            bodies.append(body)
        except Exception:
            continue

    total = len(valid_files)
    print(f"Processing {total} notes...", flush=True)

    # Step 1: compute all embeddings
    vectors = []
    embedded = cached = errors = 0

    for i, (path, body) in enumerate(zip(valid_files, bodies)):
        sha = sha256_of(body)
        try:
            vec, from_cache = get_note_embedding(body, sha)
            vectors.append(vec)
            if from_cache:
                cached += 1
            else:
                embedded += 1
            if (i + 1) % 100 == 0:
                print(f"  {i+1}/{total} embedded={embedded} cached={cached}", flush=True)
        except Exception as e:
            print(f"  ERROR {os.path.basename(path)}: {e}", file=sys.stderr)
            vectors.append(None)
            errors += 1

    # Filter out failed embeddings
    valid_indices = [i for i, v in enumerate(vectors) if v is not None]
    valid_files_ok = [valid_files[i] for i in valid_indices]
    vectors_ok = [vectors[i] for i in valid_indices]

    if not vectors_ok:
        print("ERROR: No embeddings computed", file=sys.stderr)
        sys.exit(1)

    # Step 2: compute similarity matrix
    print("Computing similarity matrix...", flush=True)
    sim_matrix = cosine_sim_matrix(vectors_ok)

    # Build set of MOC paths to exclude
    moc_dir = os.path.join(vault, "MOC")

    # Step 3: for each note, find top-5 neighbors
    updated_related = unchanged = 0

    for i, path in enumerate(valid_files_ok):
        is_moc = path.startswith(moc_dir)

        sims = sim_matrix[i].copy()
        sims[i] = -1  # exclude self

        # Exclude MOC notes from being neighbors
        for j, other_path in enumerate(valid_files_ok):
            if other_path.startswith(moc_dir):
                sims[j] = -1

        top_indices = np.argsort(sims)[::-1][:TOP_N]
        top_stems = [
            os.path.splitext(os.path.basename(valid_files_ok[j]))[0]
            for j in top_indices
            if sims[j] > -1
        ]

        related_links = [f"[[{stem}]]" for stem in top_stems]

        # Compare to existing
        existing, parseable = get_existing_related(path)
        if not parseable:
            # Corrupt YAML — skip silently, do not count as needing update
            unchanged += 1
            continue
        # Order-insensitive comparison
        if set(related_links) == set(existing):
            unchanged += 1
            continue

        if not args.dry_run:
            err = write_related(path, related_links)
            if err:
                errors += 1
                continue
        updated_related += 1

    mode = " [DRY-RUN]" if args.dry_run else ""
    print(f"embedded: {embedded} / cached: {cached} / updated_related: {updated_related} / unchanged: {unchanged}{mode}")


if __name__ == "__main__":
    main()
