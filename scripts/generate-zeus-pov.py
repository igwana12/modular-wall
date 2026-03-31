#!/usr/bin/env python3
"""
generate-zeus-pov.py -- Generate a Zeus lightning bolt image for POV sphere display.

Creates a 480x240 equirectangular projection image (2:1 ratio) with a stylized
gold lightning bolt on a deep navy background. Output is used as input to
image-to-pov.py for conversion to PROGMEM frame data.

Usage:
    python scripts/generate-zeus-pov.py
    # then:
    python scripts/image-to-pov.py scripts/zeus-pov-source.png \
        -o firmware/spirit-sphere/image_data.h --mode sphere

Requirements: pip install Pillow
"""

import os
import sys

try:
    from PIL import Image, ImageDraw, ImageFilter
except ImportError:
    print("Missing Pillow. Install with: pip install Pillow")
    sys.exit(1)

# Image dimensions (2:1 for equirectangular sphere mapping)
WIDTH = 480
HEIGHT = 240

# Colors
BG_COLOR = (10, 10, 40)           # Deep navy background
BOLT_COLOR = (255, 215, 0)        # Gold lightning bolt
GLOW_COLOR = (255, 245, 150)      # Light gold glow
BRIGHT_CORE = (255, 255, 220)     # Near-white core of bolt

# Lightning bolt path (x, y coordinates as fractions of image size)
# Zigzag pattern from top-center to bottom-center
BOLT_POINTS_FRAC = [
    (0.50, 0.08),   # Top start
    (0.44, 0.20),   # Zig left
    (0.54, 0.30),   # Zag right
    (0.42, 0.45),   # Zig left (wider)
    (0.56, 0.55),   # Zag right (wider)
    (0.40, 0.68),   # Zig left
    (0.52, 0.78),   # Zag right
    (0.48, 0.92),   # Bottom end
]


def draw_bolt(draw, points, color, width):
    """Draw the lightning bolt as connected line segments."""
    for i in range(len(points) - 1):
        draw.line([points[i], points[i + 1]], fill=color, width=width)


def generate_zeus_image(output_path):
    """Generate the Zeus lightning bolt POV source image."""
    # Convert fractional coordinates to pixel coordinates
    bolt_points = [(int(x * WIDTH), int(y * HEIGHT)) for x, y in BOLT_POINTS_FRAC]

    # Create base image
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Layer 1: Wide outer glow (drawn on separate image for blur)
    glow_img = Image.new("RGB", (WIDTH, HEIGHT), (0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_img)
    draw_bolt(glow_draw, bolt_points, GLOW_COLOR, width=18)
    glow_img = glow_img.filter(ImageFilter.GaussianBlur(radius=12))

    # Layer 2: Medium glow
    mid_glow = Image.new("RGB", (WIDTH, HEIGHT), (0, 0, 0))
    mid_draw = ImageDraw.Draw(mid_glow)
    draw_bolt(mid_draw, bolt_points, BOLT_COLOR, width=10)
    mid_glow = mid_glow.filter(ImageFilter.GaussianBlur(radius=6))

    # Composite glow layers onto base using additive blending
    import numpy as np
    base_arr = np.array(img, dtype=np.float64)
    glow_arr = np.array(glow_img, dtype=np.float64)
    mid_arr = np.array(mid_glow, dtype=np.float64)

    # Add glow layers
    combined = base_arr + glow_arr * 0.6 + mid_arr * 0.8
    combined = combined.clip(0, 255).astype(np.uint8)
    img = Image.fromarray(combined)

    # Layer 3: Sharp core bolt (drawn directly on final image)
    draw = ImageDraw.Draw(img)
    draw_bolt(draw, bolt_points, BOLT_COLOR, width=5)
    draw_bolt(draw, bolt_points, BRIGHT_CORE, width=2)

    # Add small branch bolts for detail
    branches = [
        # (start_index, offset_x_frac, offset_y_frac) - small branches off main bolt
        (2, 0.08, 0.06),    # Branch right from point 2
        (4, -0.07, 0.05),   # Branch left from point 4
        (5, 0.06, 0.04),    # Branch right from point 5
    ]
    for start_idx, dx, dy in branches:
        sx, sy = bolt_points[start_idx]
        ex = sx + int(dx * WIDTH)
        ey = sy + int(dy * HEIGHT)
        draw.line([(sx, sy), (ex, ey)], fill=BOLT_COLOR, width=2)
        draw.line([(sx, sy), (ex, ey)], fill=BRIGHT_CORE, width=1)

    # Try to add "ZEUS" text if font available
    try:
        from PIL import ImageFont
        # Try system fonts
        font = None
        font_paths = [
            "/System/Library/Fonts/Helvetica.ttc",
            "/System/Library/Fonts/SFCompact.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        ]
        for fp in font_paths:
            if os.path.isfile(fp):
                try:
                    font = ImageFont.truetype(fp, 24)
                    break
                except Exception:
                    continue

        if font is None:
            font = ImageFont.load_default()

        # Center "ZEUS" text below bolt
        text = "ZEUS"
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        tx = (WIDTH - tw) // 2
        ty = int(HEIGHT * 0.93)
        draw.text((tx, ty), text, fill=BOLT_COLOR, font=font)
    except Exception:
        pass  # Skip text if anything goes wrong

    # Save output
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    img.save(output_path, "PNG")
    print(f"Generated Zeus POV source image: {output_path} ({WIDTH}x{HEIGHT})")


if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output = os.path.join(script_dir, "zeus-pov-source.png")
    generate_zeus_image(output)
