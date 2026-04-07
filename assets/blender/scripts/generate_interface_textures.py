#!/usr/bin/env python3
"""
Generate interface texture images for mosAIc module renders.
Each texture is a PNG matching the module's display resolution.
Uses PIL/Pillow — run standalone (not in Blender).
"""

import os
import math
import random
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "images", "textures")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Brand colors
TEAL = (0, 212, 170)
AMBER = (255, 179, 71)
RED = (255, 68, 102)
PURPLE = (136, 136, 255)
PINK = (255, 136, 221)
HOLO_PURPLE = (204, 68, 255)
DARK = (10, 10, 20)
DARK2 = (15, 15, 30)
WHITE = (230, 230, 230)
GRAY = (100, 100, 120)

def lerp_color(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))


# ─── Screen-S: 320x240 (portrait → 240x320 for the actual display) ──
def screen_s_weather(w=320, h=240):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    # Rain particles
    for _ in range(60):
        x, y = random.randint(0, w), random.randint(0, h)
        d.line([(x, y), (x - 1, y + 4)], fill=(68, 170, 204, 80), width=1)
    # Temperature
    d.rounded_rectangle([40, 20, 280, 90], radius=8, fill=(0, 40, 30))
    d.text((160, 40), "72°F", fill=TEAL, anchor="mt")
    d.text((160, 70), "Cloudy", fill=GRAY, anchor="mt")
    # Humidity arc
    for i in range(180):
        a = math.radians(180 + i)
        r = 50
        x, y = 160 + math.cos(a) * r, 160 + math.sin(a) * r
        d.ellipse([x - 1, y - 1, x + 1, y + 1], fill=TEAL if i < 130 else DARK2)
    d.text((160, 155), "65%", fill=TEAL, anchor="mm")
    # 5-day forecast bars
    for i, h_val in enumerate([30, 45, 38, 52, 40]):
        x = 50 + i * 50
        color = TEAL if i < 3 else AMBER
        d.rectangle([x, 210 - h_val, x + 30, 210], fill=color)
        d.text((x + 15, 220), ["M", "T", "W", "T", "F"][i], fill=GRAY, anchor="mt")
    img.save(os.path.join(OUTPUT_DIR, "screen-s-weather-station.png"))

def screen_s_now_playing(w=320, h=240):
    img = Image.new("RGB", (w, h), (26, 10, 46))
    d = ImageDraw.Draw(img)
    # Album art placeholder
    d.rounded_rectangle([85, 15, 235, 135], radius=12, fill=(50, 30, 80))
    d.rounded_rectangle([95, 25, 225, 125], radius=8, outline=PURPLE, width=2)
    d.text((160, 75), "♫", fill=PURPLE, anchor="mm")
    # Track info
    d.text((160, 150), "Midnight City", fill=WHITE, anchor="mt")
    d.text((160, 170), "M83", fill=GRAY, anchor="mt")
    # Progress bar
    d.rectangle([40, 195, 280, 198], fill=(40, 40, 60))
    d.rectangle([40, 195, 180, 198], fill=PURPLE)
    d.ellipse([176, 192, 184, 202], fill=PURPLE)
    # Waveform bars
    for i in range(24):
        bh = 5 + abs(math.sin(i * 0.5)) * 15
        x = 40 + i * 10
        d.rectangle([x, 220 - bh, x + 6, 220], fill=PURPLE)
    img.save(os.path.join(OUTPUT_DIR, "screen-s-now-playing.png"))

def screen_s_week_view(w=320, h=240):
    img = Image.new("RGB", (w, h), (10, 15, 30))
    d = ImageDraw.Draw(img)
    # Header
    d.text((160, 15), "APRIL 2026", fill=TEAL, anchor="mt")
    # Day headers
    days = ["M", "T", "W", "T", "F", "S", "S"]
    for i, day in enumerate(days):
        x = 30 + i * 40
        color = TEAL if i == 2 else GRAY
        d.text((x, 35), day, fill=color, anchor="mt")
        if i == 2:
            d.ellipse([x - 8, 28, x + 8, 44], outline=TEAL, width=1)
    # Event blocks
    events = [
        (50, "Team standup", TEAL, 0.7),
        (90, "Design review", AMBER, 0.5),
        (130, "Deep work", PURPLE, 0.85),
        (170, "Lunch w/ Alex", RED, 0.4),
    ]
    for y, text, color, width_frac in events:
        ew = int(260 * width_frac)
        d.rounded_rectangle([30, y, 30 + ew, y + 28], radius=6, fill=(*color, 40), outline=color, width=1)
        d.text((40, y + 8), text, fill=color)
    img.save(os.path.join(OUTPUT_DIR, "screen-s-week-view.png"))


# ─── Glow: 256 pixels (16x16 grid) ──────────────────────────────
def glow_circadian(w=256, h=256):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    for y in range(16):
        for x in range(16):
            cx, cy = x * 16 + 8, y * 16 + 8
            dist = math.sqrt((x - 7.5) ** 2 + (y - 7.5) ** 2) / 10
            t = max(0, min(1, 0.5 + math.sin(x * 0.4) * 0.3 - dist * 0.3))
            color = lerp_color(AMBER, (40, 20, 10), t)
            d.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=color)
    img.save(os.path.join(OUTPUT_DIR, "glow-circadian-flow.png"))

def glow_notification(w=256, h=256):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    center = w // 2
    for r in range(4):
        radius = 30 + r * 25
        opacity = max(10, 200 - r * 50)
        color = (0, 212, 170, opacity)
        for a in range(360):
            x = center + int(math.cos(math.radians(a)) * radius)
            y = center + int(math.sin(math.radians(a)) * radius)
            if 0 <= x < w and 0 <= y < h:
                d.ellipse([x - 1, y - 1, x + 1, y + 1], fill=TEAL)
    d.ellipse([center - 15, center - 15, center + 15, center + 15], fill=TEAL)
    img.save(os.path.join(OUTPUT_DIR, "glow-notify-pulse.png"))

def glow_meditation(w=256, h=256):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    for y in range(16):
        for x in range(16):
            cx, cy = x * 16 + 8, y * 16 + 8
            wave = math.sin(x * 0.5) * math.cos(y * 0.4) * 0.5 + 0.5
            color = lerp_color((80, 20, 120), (0, 100, 80), wave)
            d.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=color)
    img.save(os.path.join(OUTPUT_DIR, "glow-breathe.png"))


# ─── Pixel: 64x32 HUB75 ─────────────────────────────────────────
def pixel_vu_meter(w=640, h=320):
    img = Image.new("RGB", (w, h), (5, 5, 5))
    d = ImageDraw.Draw(img)
    for i in range(32):
        freq = abs(math.sin(i * 0.3 + 1.5))
        col_height = int(freq * 28) + 2
        for j in range(col_height):
            t = j / 30
            color = lerp_color((0, 200, 100), RED, t) if t < 0.7 else RED
            x, y = i * 20 + 2, h - (j + 1) * 10 - 2
            d.rectangle([x, y, x + 16, y + 8], fill=color)
    img.save(os.path.join(OUTPUT_DIR, "pixel-spectrum-vu.png"))

def pixel_art(w=640, h=320):
    img = Image.new("RGB", (w, h), (5, 5, 10))
    d = ImageDraw.Draw(img)
    heart = [
        "  ##  ##  ",
        " ########",
        " ########",
        "  ######  ",
        "   ####   ",
        "    ##    ",
    ]
    colors = [RED, AMBER, TEAL, PURPLE]
    for dy, row in enumerate(heart):
        for dx, ch in enumerate(row):
            if ch == "#":
                color = colors[(dx + dy) % len(colors)]
                x, y = 200 + dx * 25, 40 + dy * 25
                d.rectangle([x, y, x + 22, y + 22], fill=color)
    img.save(os.path.join(OUTPUT_DIR, "pixel-pixel-canvas.png"))

def pixel_snake(w=640, h=320):
    img = Image.new("RGB", (w, h), (5, 5, 5))
    d = ImageDraw.Draw(img)
    d.rectangle([2, 2, w - 3, h - 3], outline=(0, 50, 40), width=1)
    snake = [(300, 160), (280, 160), (260, 160), (240, 160), (220, 160), (200, 160)]
    for i, (sx, sy) in enumerate(snake):
        brightness = max(80, 255 - i * 30)
        d.rectangle([sx, sy, sx + 18, sy + 18], fill=(0, brightness, int(brightness * 0.65)))
    d.rectangle([450, 120, 468, 138], fill=RED)
    d.text((320, 300), "SCORE: 2450", fill=(0, 100, 80), anchor="mt")
    img.save(os.path.join(OUTPUT_DIR, "pixel-snake-classic.png"))


# ─── Round: 466x466 circular AMOLED ─────────────────────────────
def round_clock(w=466, h=466):
    img = Image.new("RGB", (w, h), (0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy = w // 2, h // 2
    # Hour markers
    for i in range(12):
        a = math.radians(i * 30 - 90)
        x1, y1 = cx + math.cos(a) * 195, cy + math.sin(a) * 195
        x2, y2 = cx + math.cos(a) * 210, cy + math.sin(a) * 210
        d.line([(x1, y1), (x2, y2)], fill=TEAL, width=3)
    # Minute hand (10:10 position)
    a = math.radians(60 - 90)
    d.line([(cx, cy), (cx + math.cos(a) * 150, cy + math.sin(a) * 150)], fill=TEAL, width=4)
    # Hour hand
    a = math.radians(300 - 90)
    d.line([(cx, cy), (cx + math.cos(a) * 100, cy + math.sin(a) * 100)], fill=TEAL, width=5)
    # Second hand
    a = math.radians(180 - 90)
    d.line([(cx, cy), (cx + math.cos(a) * 170, cy + math.sin(a) * 170)], fill=AMBER, width=2)
    # Center dot
    d.ellipse([cx - 8, cy - 8, cx + 8, cy + 8], fill=(0, 255, 204))
    img.save(os.path.join(OUTPUT_DIR, "round-analog-lux.png"))

def round_compass(w=466, h=466):
    img = Image.new("RGB", (w, h), (0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy = w // 2, h // 2
    d.ellipse([cx - 200, cy - 200, cx + 200, cy + 200], outline=(0, 50, 40), width=2)
    dirs = [("N", -90, RED), ("E", 0, TEAL), ("S", 90, TEAL), ("W", 180, TEAL)]
    for label, angle, color in dirs:
        a = math.radians(angle)
        x, y = cx + math.cos(a) * 170, cy + math.sin(a) * 170
        d.text((x, y), label, fill=color, anchor="mm")
    # Needle
    a_n = math.radians(-80)
    d.polygon([
        (cx + math.cos(a_n) * 130, cy + math.sin(a_n) * 130),
        (cx - 8, cy + 8), (cx + 8, cy - 8)
    ], fill=(*RED, 180))
    a_s = math.radians(100)
    d.polygon([
        (cx + math.cos(a_s) * 100, cy + math.sin(a_s) * 100),
        (cx - 6, cy + 6), (cx + 6, cy - 6)
    ], fill=(*TEAL, 100))
    img.save(os.path.join(OUTPUT_DIR, "round-compass-nav.png"))

def round_timer(w=466, h=466):
    img = Image.new("RGB", (w, h), (0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy = w // 2, h // 2
    # Background ring
    d.arc([cx - 180, cy - 180, cx + 180, cy + 180], 0, 360, fill=(30, 30, 50), width=12)
    # Active arc (75% remaining)
    d.arc([cx - 180, cy - 180, cx + 180, cy + 180], -90, 180, fill=TEAL, width=12)
    d.text((cx, cy - 15), "18:42", fill=TEAL, anchor="mm")
    d.text((cx, cy + 15), "FOCUS", fill=GRAY, anchor="mm")
    img.save(os.path.join(OUTPUT_DIR, "round-pomodoro-ring.png"))


# ─── Hub: status LED only, render textures for topology viz ──────
def hub_topology(w=400, h=280):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    cx, cy = w // 2, h // 2
    nodes = [(cx, cy)] + [(cx + int(math.cos(a) * 100), cy + int(math.sin(a) * 80))
             for a in [i * math.pi / 3 for i in range(6)]]
    for i, (nx, ny) in enumerate(nodes[1:]):
        d.line([(cx, cy), (nx, ny)], fill=(0, 80, 60), width=1)
    for i, (nx, ny) in enumerate(nodes):
        r = 12 if i == 0 else 8
        color = TEAL if i % 2 == 0 else AMBER
        d.ellipse([nx - r, ny - r, nx + r, ny + r], fill=color)
    img.save(os.path.join(OUTPUT_DIR, "hub-net-topology.png"))

def hub_monitor(w=400, h=280):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    bars = [("CPU", 0.45, TEAL), ("RAM", 0.72, PURPLE), ("TEMP", 0.35, AMBER)]
    for i, (label, val, color) in enumerate(bars):
        y = 40 + i * 80
        d.text((20, y), label, fill=GRAY)
        d.rectangle([80, y, 380, y + 40], fill=(20, 20, 35))
        d.rectangle([80, y, 80 + int(300 * val), y + 40], fill=color)
        d.text((85, y + 12), f"{int(val * 100)}%", fill=WHITE)
    img.save(os.path.join(OUTPUT_DIR, "hub-system-monitor.png"))

def hub_scenes(w=400, h=280):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    scenes = [("Morning", AMBER), ("Focus", TEAL), ("Movie", PURPLE), ("Sleep", RED)]
    for i, (name, color) in enumerate(scenes):
        y = 20 + i * 65
        is_active = i == 1
        fill = (*color, 60) if is_active else (*color, 20)
        d.rounded_rectangle([20, y, 380, y + 50], radius=10, fill=fill, outline=color, width=2 if is_active else 1)
        d.text((200, y + 18), name, fill=color, anchor="mt")
    img.save(os.path.join(OUTPUT_DIR, "hub-scene-control.png"))


# ─── Voice/Sense/Brick/Holo/Mirror/eInk — simpler textures ─────
def voice_waveform(w=256, h=256):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    points = []
    for i in range(128):
        x = i * 2
        y = 128 + int(math.sin(i * 0.15 + 1) * 40 + math.sin(i * 0.3 + 2) * 20)
        points.append((x, y))
    d.line(points, fill=PURPLE, width=2)
    d.line([(0, 128), (256, 128)], fill=(30, 30, 50), width=1)
    img.save(os.path.join(OUTPUT_DIR, "voice-waveform-live.png"))

def voice_assistant(w=256, h=256):
    img = Image.new("RGB", (w, h), (20, 10, 40))
    d = ImageDraw.Draw(img)
    cx, cy = 128, 110
    for r in [80, 60, 40, 20]:
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=PURPLE, width=2)
    d.ellipse([cx - 8, cy - 8, cx + 8, cy + 8], fill=PURPLE)
    d.text((128, 210), "Listening...", fill=PURPLE, anchor="mt")
    img.save(os.path.join(OUTPUT_DIR, "voice-voice-assistant.png"))

def voice_intercom(w=256, h=256):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    cx, cy = 128, 128
    d.ellipse([cx - 25, cy - 25, cx + 25, cy + 25], fill=PURPLE)
    for r in [50, 70, 90]:
        d.arc([cx - r, cy - r, cx + r, cy + r], -30, 30, fill=PURPLE, width=2)
    img.save(os.path.join(OUTPUT_DIR, "voice-intercom.png"))

# Mirror
def mirror_deity(w=466, h=466):
    img = Image.new("RGB", (w, h), (20, 5, 30))
    d = ImageDraw.Draw(img)
    cx, cy = 233, 233
    # Crown orbs
    for i in range(7):
        a = math.radians(i * 180 / 7 + 90)
        x, y = cx + int(math.cos(a) * 120), cy - 50 + int(math.sin(a) * 80)
        d.ellipse([x - 10, y - 10, x + 10, y + 10], fill=PINK)
    # Face wireframe
    d.ellipse([cx - 60, cy - 80, cx + 60, cy + 40], outline=PINK, width=1)
    d.text((cx, cy + 100), "ATHENA", fill=PINK, anchor="mt")
    img.save(os.path.join(OUTPUT_DIR, "mirror-deity-oracle.png"))

def mirror_exercise(w=466, h=466):
    img = Image.new("RGB", (w, h), (5, 20, 10))
    d = ImageDraw.Draw(img)
    cx, cy = 233, 200
    # Stick figure
    d.ellipse([cx - 20, cy - 90, cx + 20, cy - 50], outline=TEAL, width=2)
    d.line([(cx, cy - 50), (cx, cy + 20)], fill=TEAL, width=2)
    d.line([(cx, cy - 30), (cx - 40, cy + 10)], fill=TEAL, width=2)
    d.line([(cx, cy - 30), (cx + 40, cy + 10)], fill=TEAL, width=2)
    d.line([(cx, cy + 20), (cx - 30, cy + 80)], fill=TEAL, width=2)
    d.line([(cx, cy + 20), (cx + 30, cy + 80)], fill=TEAL, width=2)
    d.text((cx, cy + 120), "REPS: 12  FORM: 94%", fill=TEAL, anchor="mt")
    img.save(os.path.join(OUTPUT_DIR, "mirror-form-check.png"))

def mirror_glam(w=466, h=466):
    img = Image.new("RGB", (w, h), (30, 15, 35))
    d = ImageDraw.Draw(img)
    cx, cy = 233, 220
    d.ellipse([cx - 70, cy - 90, cx + 70, cy + 50], outline=PINK, width=1)
    d.ellipse([cx - 20, cy - 40, cx - 5, cy - 25], fill=(*PINK, 100))
    d.ellipse([cx + 5, cy - 40, cx + 20, cy - 25], fill=(*PINK, 100))
    d.arc([cx - 20, cy, cx + 20, cy + 15], 0, 180, fill=PINK, width=1)
    d.text((cx, cy + 100), "Soft Glow", fill=PINK, anchor="mt")
    img.save(os.path.join(OUTPUT_DIR, "mirror-glam-filter.png"))

# Holo
def holo_sacred(w=512, h=512):
    img = Image.new("RGB", (w, h), (10, 5, 20))
    d = ImageDraw.Draw(img)
    cx, cy = 256, 256
    # Hexagon
    pts = [(cx + int(math.cos(math.radians(60 * i - 30)) * 150),
            cy + int(math.sin(math.radians(60 * i - 30)) * 150)) for i in range(6)]
    d.polygon(pts, outline=HOLO_PURPLE, fill=None)
    pts2 = [(cx + int(math.cos(math.radians(60 * i)) * 150),
             cy + int(math.sin(math.radians(60 * i)) * 150)) for i in range(6)]
    d.polygon(pts2, outline=TEAL, fill=None)
    for p in pts + pts2:
        d.line([(cx, cy), p], fill=(50, 20, 80), width=1)
    # Particles
    for _ in range(50):
        a = random.random() * math.pi * 2
        r = 80 + random.random() * 100
        x, y = cx + int(math.cos(a) * r), cy + int(math.sin(a) * r)
        d.ellipse([x - 2, y - 2, x + 2, y + 2], fill=HOLO_PURPLE)
    img.save(os.path.join(OUTPUT_DIR, "holo-sacred-forms.png"))

def holo_viewer(w=512, h=512):
    img = Image.new("RGB", (w, h), (5, 10, 25))
    d = ImageDraw.Draw(img)
    # Wireframe cube
    size = 100
    cx, cy = 256, 240
    front = [(cx - size, cy - size), (cx + size, cy - size), (cx + size, cy + size), (cx - size, cy + size)]
    off = 40
    back = [(x + off, y - off) for x, y in front]
    for i in range(4):
        d.line([front[i], front[(i + 1) % 4]], fill=HOLO_PURPLE, width=2)
        d.line([back[i], back[(i + 1) % 4]], fill=HOLO_PURPLE, width=1)
        d.line([front[i], back[i]], fill=HOLO_PURPLE, width=1)
    d.text((256, 430), "model.glb", fill=GRAY, anchor="mt")
    img.save(os.path.join(OUTPUT_DIR, "holo-3d-viewer.png"))

def holo_beacon(w=512, h=512):
    img = Image.new("RGB", (w, h), (15, 5, 5))
    d = ImageDraw.Draw(img)
    cx, cy = 256, 240
    for r in [120, 90, 60]:
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=RED, width=1)
    d.ellipse([cx - 25, cy - 25, cx + 25, cy + 25], fill=RED)
    d.text((cx, cy), "!", fill=WHITE, anchor="mm")
    d.text((cx, cy + 100), "3 new alerts", fill=RED, anchor="mt")
    img.save(os.path.join(OUTPUT_DIR, "holo-alert-beacon.png"))

# Sense
def sense_radar(w=200, h=200):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    cx, cy = 100, 100
    for r in [30, 50, 70]:
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(0, 120, 100), width=1)
    d.ellipse([cx - 5, cy - 5, cx + 5, cy + 5], fill=(68, 221, 255))
    img.save(os.path.join(OUTPUT_DIR, "sense-radar-active.png"))

def sense_motion(w=200, h=200):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    for y in range(10):
        for x in range(10):
            heat = math.sin(x * 0.8 + 1) * math.cos(y * 0.6) * 0.5 + 0.5
            color = lerp_color(DARK, (68, 221, 255), heat)
            d.rectangle([x * 20, y * 20, x * 20 + 18, y * 20 + 18], fill=color)
    img.save(os.path.join(OUTPUT_DIR, "sense-motion-map.png"))

def sense_gesture(w=200, h=200):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    # Hand outline
    d.ellipse([60, 40, 140, 160], outline=(68, 221, 255), width=2)
    d.line([(80, 40), (80, 20)], fill=(68, 221, 255), width=2)
    d.line([(100, 35), (100, 10)], fill=(68, 221, 255), width=2)
    d.line([(120, 35), (120, 15)], fill=(68, 221, 255), width=2)
    d.text((100, 175), "SWIPE →", fill=(68, 221, 255), anchor="mt")
    img.save(os.path.join(OUTPUT_DIR, "sense-gesture-zone.png"))

# Brick
def brick_default(w=256, h=256):
    img = Image.new("RGB", (w, h), (40, 40, 60))
    d = ImageDraw.Draw(img)
    for pos in [(40, 40), (216, 40), (40, 216), (216, 216)]:
        d.ellipse([pos[0] - 8, pos[1] - 8, pos[0] + 8, pos[1] + 8], fill=(80, 80, 110))
    img.save(os.path.join(OUTPUT_DIR, "brick-default.png"))

def brick_cable(w=256, h=256):
    img = Image.new("RGB", (w, h), (40, 40, 60))
    d = ImageDraw.Draw(img)
    d.rectangle([110, 20, 146, 236], fill=(30, 30, 45))
    d.rectangle([118, 30, 138, 226], fill=(20, 20, 35), outline=(50, 50, 70))
    img.save(os.path.join(OUTPUT_DIR, "brick-cable-route.png"))

def brick_mounted(w=256, h=256):
    img = Image.new("RGB", (w, h), (40, 40, 60))
    d = ImageDraw.Draw(img)
    d.rectangle([20, 120, 236, 136], fill=(60, 60, 80))
    for pos in [(40, 40), (216, 40), (40, 216), (216, 216)]:
        d.ellipse([pos[0] - 8, pos[1] - 8, pos[0] + 8, pos[1] + 8], fill=(80, 80, 110))
    img.save(os.path.join(OUTPUT_DIR, "brick-mounted.png"))

# eInk
def eink_quote(w=800, h=480):
    img = Image.new("RGB", (w, h), (232, 224, 208))
    d = ImageDraw.Draw(img)
    d.rectangle([60, 60, 740, 64], fill=(50, 50, 50))
    d.rectangle([60, 80, 600, 84], fill=(80, 80, 80))
    d.rectangle([60, 100, 680, 104], fill=(80, 80, 80))
    d.rectangle([60, 120, 500, 124], fill=(100, 100, 100))
    d.rectangle([60, 400, 200, 404], fill=(120, 120, 120))
    img.save(os.path.join(OUTPUT_DIR, "eink-daily-quote.png"))

def eink_art(w=800, h=480):
    img = Image.new("RGB", (w, h), (232, 224, 208))
    d = ImageDraw.Draw(img)
    for y in range(0, h, 8):
        for x in range(0, w, 8):
            val = math.sin(x * 0.02) * math.cos(y * 0.03) * 0.5 + 0.5
            if val > 0.5:
                d.ellipse([x + 2, y + 2, x + 5, y + 5], fill=(50, 50, 50))
    img.save(os.path.join(OUTPUT_DIR, "eink-art-display.png"))

def eink_schedule(w=800, h=480):
    img = Image.new("RGB", (w, h), (232, 224, 208))
    d = ImageDraw.Draw(img)
    times = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00"]
    colors_eink = [(80, 80, 80), (60, 60, 60), (100, 100, 100), (70, 70, 70), (90, 90, 90), (60, 60, 60)]
    for i, (t, c) in enumerate(zip(times, colors_eink)):
        y = 40 + i * 70
        d.text((40, y + 15), t, fill=(80, 80, 80))
        d.rectangle([120, y, 750, y + 55], fill=(*c, 30), outline=c, width=1)
    img.save(os.path.join(OUTPUT_DIR, "eink-schedule.png"))

# Screen-M
def screen_m_health(w=800, h=480):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([20, 20, 390, 230], radius=12, fill=(0, 30, 25), outline=TEAL, width=1)
    d.text((205, 50), "Heart Rate", fill=GRAY, anchor="mt")
    d.text((205, 100), "72", fill=TEAL, anchor="mm")
    d.text((205, 130), "BPM", fill=GRAY, anchor="mt")
    d.rounded_rectangle([410, 20, 780, 230], radius=12, fill=(20, 15, 35), outline=PURPLE, width=1)
    d.text((595, 50), "Steps", fill=GRAY, anchor="mt")
    d.text((595, 100), "8,432", fill=PURPLE, anchor="mm")
    d.rounded_rectangle([20, 250, 780, 460], radius=12, fill=(15, 15, 25), outline=AMBER, width=1)
    d.text((400, 280), "Sleep Quality", fill=GRAY, anchor="mt")
    d.text((400, 340), "7h 24m — 92%", fill=AMBER, anchor="mm")
    img.save(os.path.join(OUTPUT_DIR, "screen-m-health-dashboard.png"))

def screen_m_smarthome(w=800, h=480):
    img = Image.new("RGB", (w, h), DARK)
    d = ImageDraw.Draw(img)
    rooms = [("Living", TEAL, 0.8), ("Kitchen", AMBER, 0.6), ("Bedroom", PURPLE, 0.3), ("Office", TEAL, 0.9)]
    for i, (name, color, brightness) in enumerate(rooms):
        x, y = 20 + (i % 2) * 390, 20 + (i // 2) * 230
        d.rounded_rectangle([x, y, x + 370, y + 210], radius=12, fill=(15, 15, 25), outline=color, width=1)
        d.text((x + 185, y + 40), name, fill=color, anchor="mt")
        bw = int(300 * brightness)
        d.rectangle([x + 35, y + 130, x + 35 + bw, y + 150], fill=color)
        d.text((x + 185, y + 170), f"{int(brightness * 100)}%", fill=GRAY, anchor="mt")
    img.save(os.path.join(OUTPUT_DIR, "screen-m-smart-home.png"))

def screen_m_media(w=800, h=480):
    img = Image.new("RGB", (w, h), (15, 10, 25))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([20, 20, 480, 460], radius=16, fill=(30, 20, 50))
    d.text((250, 240), "♫", fill=PURPLE, anchor="mm")
    d.text((600, 40), "Now Playing", fill=WHITE, anchor="mt")
    d.text((600, 80), "Midnight City", fill=PURPLE, anchor="mt")
    d.text((600, 110), "M83", fill=GRAY, anchor="mt")
    d.rectangle([520, 150, 750, 155], fill=(40, 30, 60))
    d.rectangle([520, 150, 650, 155], fill=PURPLE)
    for i in range(16):
        bh = 5 + abs(math.sin(i * 0.5 + 2)) * 30
        d.rectangle([520 + i * 15, 400 - bh, 520 + i * 15 + 10, 400], fill=PURPLE)
    img.save(os.path.join(OUTPUT_DIR, "screen-m-media-player.png"))


if __name__ == "__main__":
    print("Generating interface textures...")
    funcs = [
        screen_s_weather, screen_s_now_playing, screen_s_week_view,
        screen_m_health, screen_m_smarthome, screen_m_media,
        glow_circadian, glow_notification, glow_meditation,
        pixel_vu_meter, pixel_art, pixel_snake,
        round_clock, round_compass, round_timer,
        hub_topology, hub_monitor, hub_scenes,
        voice_waveform, voice_assistant, voice_intercom,
        mirror_deity, mirror_exercise, mirror_glam,
        holo_sacred, holo_viewer, holo_beacon,
        sense_radar, sense_motion, sense_gesture,
        brick_default, brick_cable, brick_mounted,
        eink_quote, eink_art, eink_schedule,
    ]
    for fn in funcs:
        fn()
        print(f"  ✓ {fn.__name__}")
    print(f"\nDone! {len(funcs)} textures generated in {OUTPUT_DIR}")
