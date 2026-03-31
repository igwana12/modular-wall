#!/usr/bin/env python3
"""
Batch pipeline: vectorize photographed B&W logo designs to SVG, then render
each SVG as a 3D turntable MP4 via Blender.

Usage:
  python3 batch_pipeline.py                 # Full pipeline (vectorize + render)
  python3 batch_pipeline.py --dry-run       # List what would be processed
  python3 batch_pipeline.py --vectorize-only # SVG only, skip Blender renders
"""
import argparse
import glob
import os
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

# ── Paths ──────────────────────────────────────────────────────────────────────
OUTPUT_BASE = Path("/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos")
SVG_DIR = OUTPUT_BASE / "svg"
CLEAN_DIR = OUTPUT_BASE / "clean"
RENDER_DIR = OUTPUT_BASE / "renders"
LOG_FILE = OUTPUT_BASE / "batch_log.txt"
BLENDER_SCRIPT = OUTPUT_BASE / "blender_extrude_render.py"
BLENDER_BIN = "/opt/homebrew/bin/blender"

# ── Already-processed logos (skip these filenames) ─────────────────────────────
ALREADY_DONE = {
    "IMG_7046": "zeus-lightning",
    "IMG_7040": "gorilla-profile",
    "IMG_7038": "rosette",
}

# ── Default vectorization settings ─────────────────────────────────────────────
DEFAULT_BLUR = 2
DEFAULT_THRESHOLD = 140
DEFAULT_TURDSIZE = 20


def derive_name(filename: str) -> str:
    """IMG_7036.JPG -> img-7036"""
    stem = Path(filename).stem  # IMG_7036
    return stem.lower().replace("_", "-")  # img-7036


def clean_and_vectorize(name: str, src: Path) -> bool:
    """Replicate vectorize_v2.py logic: grayscale -> blur -> threshold -> crop -> potrace."""
    try:
        img = Image.open(src).convert("L")

        # Gaussian blur
        img = img.filter(ImageFilter.GaussianBlur(radius=DEFAULT_BLUR))

        # Threshold: black logo on white background
        img = img.point(lambda p: 0 if p < DEFAULT_THRESHOLD else 255)

        # Auto-crop via inverted bounding box with padding
        inverted = ImageOps.invert(img)
        bbox = inverted.getbbox()
        if bbox:
            pad = 20
            x1 = max(0, bbox[0] - pad)
            y1 = max(0, bbox[1] - pad)
            x2 = min(img.width, bbox[2] + pad)
            y2 = min(img.height, bbox[3] + pad)
            img = img.crop((x1, y1, x2, y2))

        # Save clean PNG for reference
        clean_png = CLEAN_DIR / f"{Path(src).stem}_clean.png"
        img.save(clean_png)

        # Save as PBM (potrace native format)
        pbm_path = CLEAN_DIR / f"{name}.pbm"
        img_bw = img.convert("1")
        img_bw.save(pbm_path)

        # Run potrace
        svg_path = SVG_DIR / f"{name}.svg"
        cmd = [
            "potrace",
            "-s",
            "-o", str(svg_path),
            "--turdsize", str(DEFAULT_TURDSIZE),
            "--alphamax", "1.0",
            "--opttolerance", "0.2",
            str(pbm_path),
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)

        if result.returncode != 0:
            return False

        return svg_path.exists() and svg_path.stat().st_size > 100

    except Exception as e:
        print(f"    ERROR vectorizing {name}: {e}")
        return False


def render_with_blender(svg_path: Path, name: str) -> bool:
    """Call Blender to extrude SVG and render turntable MP4."""
    cmd = [
        BLENDER_BIN,
        "--background",
        "--python", str(BLENDER_SCRIPT),
        "--",
        str(svg_path),
        name,
        str(RENDER_DIR),
    ]
    try:
        result = subprocess.run(
            cmd, capture_output=True, text=True, timeout=300
        )
        if result.returncode != 0:
            print(f"    Blender stderr: {result.stderr[-500:]}")
            return False

        mp4_path = RENDER_DIR / f"{name}-turntable.mp4"
        return mp4_path.exists() and mp4_path.stat().st_size > 1000

    except subprocess.TimeoutExpired:
        print(f"    TIMEOUT: Blender exceeded 5 min for {name}")
        return False
    except Exception as e:
        print(f"    ERROR rendering {name}: {e}")
        return False


def log(msg: str, logfile=None):
    """Print and optionally write to log file."""
    print(msg)
    if logfile:
        logfile.write(msg + "\n")
        logfile.flush()


def main():
    parser = argparse.ArgumentParser(description="Batch 3D logo pipeline")
    parser.add_argument("--dry-run", action="store_true", help="List images without processing")
    parser.add_argument("--vectorize-only", action="store_true", help="SVG only, skip Blender renders")
    args = parser.parse_args()

    # Ensure output directories exist
    SVG_DIR.mkdir(parents=True, exist_ok=True)
    CLEAN_DIR.mkdir(parents=True, exist_ok=True)
    RENDER_DIR.mkdir(parents=True, exist_ok=True)

    # Discover all logo images
    pattern = str(Path.home() / "Downloads" / "IMG_7*.JPG")
    all_images = sorted(glob.glob(pattern))

    if not all_images:
        print(f"No images found matching {pattern}")
        sys.exit(1)

    # Determine which to skip
    existing_svgs = {p.stem for p in SVG_DIR.glob("*.svg")}
    to_process = []

    for img_path in all_images:
        stem = Path(img_path).stem  # e.g. IMG_7036

        # Skip explicitly done logos
        if stem in ALREADY_DONE:
            continue

        name = derive_name(img_path)

        # Skip if SVG already exists
        if name in existing_svgs:
            continue

        to_process.append((name, Path(img_path)))

    total = len(to_process)
    skipped = len(all_images) - total

    print(f"{'='*60}")
    print(f"3D Logo Batch Pipeline")
    print(f"{'='*60}")
    print(f"Total images found:  {len(all_images)}")
    print(f"Already processed:   {skipped}")
    print(f"To process:          {total}")
    print(f"Mode:                {'DRY RUN' if args.dry_run else 'vectorize-only' if args.vectorize_only else 'full (vectorize + render)'}")
    print(f"{'='*60}")

    if args.dry_run:
        print("\nImages to process:")
        for i, (name, src) in enumerate(to_process, 1):
            print(f"  [{i:3d}/{total}] {name} <- {src.name}")
        print(f"\nSkipped ({skipped}):")
        for stem, alias in ALREADY_DONE.items():
            print(f"  {stem} (already done as '{alias}')")
        for name in sorted(existing_svgs):
            if name not in ALREADY_DONE.values():
                print(f"  {name} (SVG exists)")
        sys.exit(0)

    # Full run
    logfile = open(LOG_FILE, "a")
    log(f"\n{'='*60}", logfile)
    log(f"Batch started: {datetime.now().isoformat()}", logfile)
    log(f"Processing {total} images", logfile)

    succeeded = 0
    failed = []
    start_time = time.time()

    for i, (name, src) in enumerate(to_process, 1):
        log(f"\n[{i}/{total}] {name} ({src.name})", logfile)

        # Step 1: Vectorize
        vec_ok = clean_and_vectorize(name, src)
        if not vec_ok:
            log(f"  FAILED: vectorize", logfile)
            failed.append((name, "vectorize"))
            continue
        log(f"  vectorize OK -> svg/{name}.svg", logfile)

        if args.vectorize_only:
            succeeded += 1
            continue

        # Step 2: Blender render
        svg_path = SVG_DIR / f"{name}.svg"
        render_ok = render_with_blender(svg_path, name)
        if not render_ok:
            log(f"  FAILED: render", logfile)
            failed.append((name, "render"))
            continue
        log(f"  render OK -> renders/{name}-turntable.mp4", logfile)
        succeeded += 1

    elapsed = time.time() - start_time
    log(f"\n{'='*60}", logfile)
    log(f"Batch complete: {datetime.now().isoformat()}", logfile)
    log(f"Duration: {elapsed/60:.1f} min", logfile)
    log(f"Succeeded: {succeeded}/{total}", logfile)
    log(f"Failed: {len(failed)}/{total}", logfile)
    if failed:
        log("Failures:", logfile)
        for name, stage in failed:
            log(f"  {name}: {stage}", logfile)
    log(f"{'='*60}", logfile)
    logfile.close()

    sys.exit(0 if not failed else 1)


if __name__ == "__main__":
    main()
