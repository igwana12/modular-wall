#!/usr/bin/env python3
"""
Vectorize photographed B&W logo designs into clean SVGs.
v2: Auto-crop to logo bounding box, then vectorize.
"""
import subprocess
import sys
from pathlib import Path
from PIL import Image, ImageFilter, ImageOps

# Configuration
HERO_IMAGES = {
    "zeus-lightning": Path.home() / "Downloads" / "IMG_7046.JPG",
    "gorilla-profile": Path.home() / "Downloads" / "IMG_7040.JPG",
    "rosette": Path.home() / "Downloads" / "IMG_7038.JPG",
}

OUTPUT_BASE = Path("/Volumes/AI_WORKSPACE/jarvis-visuals/3d-logos")
SVG_DIR = OUTPUT_BASE / "svg"
CLEAN_DIR = OUTPUT_BASE / "clean"

# Per-image tuning
SETTINGS = {
    "zeus-lightning": {"blur": 2, "threshold": 140, "turdsize": 50, "crop_bottom_pct": 5},
    "gorilla-profile": {"blur": 2, "threshold": 135, "turdsize": 10},
    "rosette": {"blur": 3, "threshold": 130, "turdsize": 10},
}


def clean_and_vectorize(name: str, src: Path) -> bool:
    settings = SETTINGS[name]
    print(f"\n{'='*60}")
    print(f"Processing: {name} ({src.name})")

    # Load and convert to grayscale
    img = Image.open(src).convert("L")
    print(f"  Original size: {img.size}")

    # Apply Gaussian blur
    img = img.filter(ImageFilter.GaussianBlur(radius=settings["blur"]))

    # Apply threshold: black logo on white background
    threshold = settings["threshold"]
    img = img.point(lambda p: 0 if p < threshold else 255)

    # Pre-crop: remove bottom percentage if specified (removes page artifacts)
    crop_bottom = settings.get("crop_bottom_pct", 0)
    if crop_bottom > 0:
        trim_px = int(img.height * crop_bottom / 100)
        img = img.crop((0, 0, img.width, img.height - trim_px))
        print(f"  Trimmed bottom {crop_bottom}%: new height {img.height}")

    # Auto-crop: find bounding box of the black (logo) content
    inverted = ImageOps.invert(img)
    bbox = inverted.getbbox()
    if bbox:
        # Add padding
        pad = 20
        x1 = max(0, bbox[0] - pad)
        y1 = max(0, bbox[1] - pad)
        x2 = min(img.width, bbox[2] + pad)
        y2 = min(img.height, bbox[3] + pad)
        img = img.crop((x1, y1, x2, y2))
        print(f"  Cropped to: {img.size} (from bbox {bbox})")

    # Save clean PNG for reference
    clean_png = CLEAN_DIR / f"{src.stem}_clean.png"
    img.save(clean_png)

    # For potrace: we want the BLACK regions to be traced.
    # potrace traces dark (0) pixels in PBM format.
    # Our image has: black=logo(0), white=background(255) -- perfect.

    # Save as PBM (potrace's native format, better than BMP)
    pbm_path = CLEAN_DIR / f"{name}.pbm"
    img_bw = img.convert("1")  # 1-bit
    img_bw.save(pbm_path)
    print(f"  Saved PBM: {pbm_path}")

    # Run potrace: trace the black regions (logo silhouette)
    svg_path = SVG_DIR / f"{name}.svg"
    cmd = [
        "potrace",
        "-s",                    # SVG output
        "-o", str(svg_path),
        "--turdsize", str(settings.get("turdsize", 10)),
        "--alphamax", "1.0",     # smooth corners
        "--opttolerance", "0.2", # optimize curves
        str(pbm_path),
    ]
    print(f"  Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"  ERROR: potrace failed: {result.stderr}")
        return False

    if svg_path.exists() and svg_path.stat().st_size > 100:
        print(f"  SUCCESS: {svg_path} ({svg_path.stat().st_size} bytes)")

        # Print path count for debugging
        with open(svg_path) as f:
            content = f.read()
            path_count = content.count("<path")
            print(f"  SVG paths: {path_count}")
        return True
    else:
        print(f"  ERROR: SVG missing or too small")
        return False


def main():
    SVG_DIR.mkdir(parents=True, exist_ok=True)
    CLEAN_DIR.mkdir(parents=True, exist_ok=True)

    results = {}
    for name, src in HERO_IMAGES.items():
        if not src.exists():
            print(f"SKIP: {src} not found")
            results[name] = False
            continue
        results[name] = clean_and_vectorize(name, src)

    print(f"\n{'='*60}")
    print("RESULTS:")
    for name, ok in results.items():
        status = "OK" if ok else "FAILED"
        print(f"  {name}: {status}")

    return all(results.values())


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
