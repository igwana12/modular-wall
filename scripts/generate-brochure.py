#!/usr/bin/env python3
"""
Generate the Modular Wall product brochure PDF.
Pulls data from master CSV and uses generated images.
"""

import csv
import os
from fpdf import FPDF


def sanitize(text):
    """Replace unicode chars that latin-1 can't encode"""
    return (text
        .replace('\u2014', '--')
        .replace('\u2013', '-')
        .replace('\u2018', "'")
        .replace('\u2019', "'")
        .replace('\u201c', '"')
        .replace('\u201d', '"')
        .replace('\u2026', '...')
        .replace('\u00d8', 'O')  # Ø
    )

BASE = "/Volumes/AI_WORKSPACE/modular-wall"
CSV_PATH = f"{BASE}/assets/modular-wall-master.csv"
IMG_DIR = f"{BASE}/assets/images"
HERO_DIR = f"{BASE}/software/configurator/public"
OUTPUT = f"{BASE}/assets/modular-wall-brochure.pdf"

# Brand colors (RGB)
TEAL = (0, 212, 170)
AMBER = (255, 179, 71)
DARK_BG = (13, 13, 26)
DARK_SURFACE = (26, 26, 46)
WHITE = (240, 240, 240)
MUTED = (136, 136, 170)


class BrochurePDF(FPDF):
    def __init__(self):
        super().__init__(orientation='L', unit='mm', format='A4')
        self.set_auto_page_break(auto=False)

    def dark_page(self):
        """Fill page with dark background"""
        self.set_fill_color(*DARK_BG)
        self.rect(0, 0, 297, 210, 'F')

    def add_teal_accent(self, x, y, w, h):
        self.set_draw_color(*TEAL)
        self.set_line_width(0.5)
        self.line(x, y, x + w, y)

    def section_header(self, label, title, y=20):
        # Label
        self.set_font("Helvetica", "B", 8)
        self.set_text_color(*TEAL)
        self.set_xy(25, y)
        self.cell(0, 5, label.upper(), ln=True)
        # Title
        self.set_font("Helvetica", "B", 28)
        self.set_text_color(*WHITE)
        self.set_xy(25, y + 7)
        self.cell(0, 12, title, ln=True)
        # Accent line
        self.add_teal_accent(25, y + 22, 60, 0)
        return y + 28


def load_modules():
    modules = []
    with open(CSV_PATH, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            modules.append(row)
    return modules


def safe_image(path, fallback=None):
    """Return path if image exists, otherwise fallback"""
    if os.path.exists(path):
        return path
    if fallback and os.path.exists(fallback):
        return fallback
    return None


def build_brochure():
    pdf = BrochurePDF()
    modules = load_modules()

    # ============================================
    # COVER PAGE
    # ============================================
    pdf.add_page()
    pdf.dark_page()

    # Hero image
    hero = safe_image(f"{HERO_DIR}/hero-wall.jpg", f"{IMG_DIR}/hero-wall.jpg")
    if hero:
        pdf.image(hero, x=0, y=0, w=297, h=210)
        # Dark overlay gradient (simulated with semi-transparent rect)
        pdf.set_fill_color(13, 13, 26)
        pdf.set_draw_color(13, 13, 26)
        # Bottom gradient
        for i in range(80):
            alpha = int(255 * (i / 80))
            pdf.set_fill_color(13, 13, 26)
            pdf.rect(0, 130 + i, 297, 1, 'F')

    # Title
    pdf.set_font("Helvetica", "B", 48)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(25, 140)
    pdf.cell(0, 18, "[MODULAR]", ln=True)

    pdf.set_font("Helvetica", "", 18)
    pdf.set_text_color(*TEAL)
    pdf.set_xy(25, 160)
    pdf.cell(0, 8, "Your desktop. On your wall.", ln=True)

    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*MUTED)
    pdf.set_xy(25, 172)
    pdf.cell(0, 5, "A modular, AI-orchestrated, snap-together mixed-media wall computer", ln=True)

    pdf.set_font("Helvetica", "", 7)
    pdf.set_text_color(100, 100, 120)
    pdf.set_xy(25, 195)
    pdf.cell(0, 5, "CONFIDENTIAL  |  LOCAL PROTOTYPE  |  2026", ln=True)

    # ============================================
    # PAGE 2: THE THESIS
    # ============================================
    pdf.add_page()
    pdf.dark_page()
    y = pdf.section_header("Philosophy", "As software ate the world,")

    pdf.set_font("Helvetica", "B", 28)
    pdf.set_text_color(*AMBER)
    pdf.set_xy(25, y + 2)
    pdf.cell(0, 12, "AI is throwing it back up.", ln=True)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(25, y + 22)
    pdf.multi_cell(120, 6, (
        "Software took the physical world and compressed it behind glass. "
        "The globe on your desk became Google Maps. The clock on your wall "
        "became a phone widget. The stereo became Spotify.\n\n"
        "Now AI dissolves the barrier that kept them there. The programming "
        "knowledge that locked hardware to specialists? Gone. A 16-year-old "
        "can describe what they want, AI writes the firmware, they print "
        "the case, and snap a physical module onto their wall.\n\n"
        "The things the phone stole from the physical world -- "
        "we're giving them back. And now they're alive."
    ))

    # First Waver quote
    pdf.set_font("Helvetica", "I", 9)
    pdf.set_text_color(*TEAL)
    pdf.set_xy(25, y + 80)
    pdf.multi_cell(120, 5, (
        '"We grew up analog but came of age digital. We have one foot '
        'in each world. This generation is uniquely positioned to build '
        'the bridge back."'
    ))
    pdf.set_font("Helvetica", "", 8)
    pdf.set_text_color(*MUTED)
    pdf.set_xy(25, y + 100)
    pdf.cell(0, 4, "-- The Odyssey, Chapter 7: Tulum", ln=True)

    # Right side image
    snap = safe_image(f"{HERO_DIR}/hero-snap.jpg", f"{IMG_DIR}/hero-snap.jpg")
    if snap:
        pdf.image(snap, x=160, y=30, w=120, h=80)
    unbox = safe_image(f"{HERO_DIR}/hero-unbox.jpg", f"{IMG_DIR}/hero-unbox.jpg")
    if unbox:
        pdf.image(unbox, x=160, y=115, w=120, h=80)

    # ============================================
    # PAGE 3: HOW IT WORKS
    # ============================================
    pdf.add_page()
    pdf.dark_page()
    y = pdf.section_header("Process", "Three steps. Zero complexity.")

    steps = [
        ("01", "Choose your modules", "Pick from screens, lights, sensors, speakers, and more. Each module is a magnetic tile.", TEAL),
        ("02", "Snap together", "Magnetic pogo-pin connectors. No wiring. No tools. Click onto any flat surface.", AMBER),
        ("03", "AI orchestrates", "A local-first AI agent learns your patterns. Your wall becomes context-aware, alive.", (136, 136, 255)),
    ]

    for i, (num, title, desc, color) in enumerate(steps):
        bx = 25 + i * 85
        # Number
        pdf.set_font("Helvetica", "B", 32)
        pdf.set_text_color(*color)
        pdf.set_xy(bx, y + 10)
        pdf.cell(30, 12, num)
        # Title
        pdf.set_font("Helvetica", "B", 14)
        pdf.set_text_color(*WHITE)
        pdf.set_xy(bx, y + 25)
        pdf.cell(75, 6, title)
        # Description
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(*MUTED)
        pdf.set_xy(bx, y + 33)
        pdf.multi_cell(75, 4.5, desc)

    # Scale reference
    scale_img = safe_image(f"{HERO_DIR}/hero-scale.jpg", f"{IMG_DIR}/hero-scale.jpg")
    if scale_img:
        pdf.image(scale_img, x=25, y=y + 70, w=80, h=55)

    pdf.set_font("Helvetica", "", 8)
    pdf.set_text_color(*MUTED)
    pdf.set_xy(25, y + 128)
    pdf.cell(0, 4, "Each module fits in your palm. 85mm x 65mm -- smaller than a phone.", ln=True)

    # ============================================
    # PAGE 4-5: MODULE CATALOG (4 per page)
    # ============================================
    primary_modules = [m for m in modules if m['module_id'] in
        ['screen-s', 'glow', 'pixel', 'voice', 'sense', 'brick', 'hub', 'holo', 'round', 'mirror']]

    for page_start in range(0, len(primary_modules), 4):
        pdf.add_page()
        pdf.dark_page()

        if page_start == 0:
            y = pdf.section_header("Modules", "The building blocks")
        else:
            y = pdf.section_header("Modules", "More building blocks")

        page_mods = primary_modules[page_start:page_start + 4]

        for i, mod in enumerate(page_mods):
            col = i % 2
            row = i // 2
            bx = 25 + col * 130
            by = y + 10 + row * 70

            # Module image
            img_path = safe_image(
                f"{HERO_DIR}/module-{mod['module_id']}.jpg",
                f"{IMG_DIR}/render-{mod['module_id']}.png"
            )
            if img_path:
                pdf.image(img_path, x=bx, y=by, w=50, h=35)

            # Module info
            tx = bx + 55

            # Parse color
            hex_color = mod.get('brand_color_hex', '#00D4AA').lstrip('#')
            r, g, b = int(hex_color[:2], 16), int(hex_color[2:4], 16), int(hex_color[4:6], 16)

            # Name + price
            pdf.set_font("Helvetica", "B", 14)
            pdf.set_text_color(r, g, b)
            pdf.set_xy(tx, by)
            pdf.cell(40, 6, mod['module_name'])

            pdf.set_font("Helvetica", "B", 12)
            pdf.set_text_color(*WHITE)
            pdf.set_xy(tx + 50, by)
            pdf.cell(20, 6, f"${mod['retail_price_usd']}")

            # Short desc
            pdf.set_font("Helvetica", "", 8)
            pdf.set_text_color(*MUTED)
            pdf.set_xy(tx, by + 7)
            pdf.cell(70, 4, f"{mod['housing_width_mm']}x{mod['housing_height_mm']}x{mod['housing_depth_mm']}mm | {mod['housing_shape']}")

            # Description
            pdf.set_font("Helvetica", "", 9)
            pdf.set_text_color(*WHITE)
            pdf.set_xy(tx, by + 13)
            desc = sanitize(mod['use_case'][:80] + ('...' if len(mod['use_case']) > 80 else ''))
            pdf.multi_cell(70, 4.5, desc)

            # Hardware option
            pdf.set_font("Helvetica", "", 7)
            pdf.set_text_color(*TEAL)
            pdf.set_xy(tx, by + 28)
            hw = sanitize(mod['hw1_model'][:60])
            pdf.cell(70, 3.5, f"Primary: {hw}")

    # ============================================
    # PAGE 6: EDUCATION
    # ============================================
    pdf.add_page()
    pdf.dark_page()
    y = pdf.section_header("Education", "Every module is a lesson")

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(25, y + 5)
    pdf.multi_cell(120, 6, (
        "Each module in the wall is a compressed version of a product that "
        "raised millions in funding. Building a Mirror module teaches you the "
        "core technology behind Lululemon Mirror ($500M acquisition), Snapchat "
        "($20B), Apple Watch ($30B/year), and Ring ($1B acquisition).\n\n"
        "A teenager who builds these modules doesn't just learn IoT -- they "
        "touch the actual technology stack behind billion-dollar companies."
    ))

    # Education table
    edu_modules = [m for m in modules if m.get('education_lesson')][:8]
    ty = y + 55

    # Header
    pdf.set_font("Helvetica", "B", 8)
    pdf.set_text_color(*TEAL)
    pdf.set_xy(25, ty)
    pdf.cell(30, 5, "MODULE")
    pdf.cell(80, 5, "WHAT YOU LEARN")
    pdf.cell(50, 5, "INDUSTRY")
    ty += 7

    for mod in edu_modules:
        pdf.set_font("Helvetica", "B", 8)
        hex_color = mod.get('brand_color_hex', '#00D4AA').lstrip('#')
        r, g, b = int(hex_color[:2], 16), int(hex_color[2:4], 16), int(hex_color[4:6], 16)
        pdf.set_text_color(r, g, b)
        pdf.set_xy(25, ty)
        pdf.cell(30, 4.5, mod['module_name'])

        pdf.set_font("Helvetica", "", 7)
        pdf.set_text_color(*WHITE)
        lesson = sanitize(mod['education_lesson'][:55] + ('...' if len(mod['education_lesson']) > 55 else ''))
        pdf.cell(80, 4.5, lesson)

        pdf.set_text_color(*MUTED)
        industry = sanitize(mod['lesson_industry'][:35])
        pdf.cell(50, 4.5, industry)
        ty += 6

    # ============================================
    # PAGE 7: TECHNICAL ARCHITECTURE
    # ============================================
    pdf.add_page()
    pdf.dark_page()
    y = pdf.section_header("Architecture", "How it all connects")

    pdf.set_font("Courier", "", 8)
    pdf.set_text_color(*TEAL)
    pdf.set_xy(25, y + 5)
    pdf.multi_cell(140, 4, (
        "  [Voice/App/AI]  -->  [Wall Controller Agent]  -->  [Modules]\n"
        "                        (FastAPI on Orange Pi)\n"
        "                              |\n"
        "              +---------------+---------------+\n"
        "              |               |               |\n"
        "         [CAN Bus]      [ArtNet/WiFi]    [ESP-NOW]\n"
        "         (wired data)   (LED control)    (sync clock)\n"
        "              |               |               |\n"
        "         [Screen] [Glow] [Pixel] [Voice] [Sense] ..."
    ))

    # Tech specs
    specs = [
        ("Module Compute", "ESP32-S3 per module ($4-8)"),
        ("Central Brain", "Orange Pi 5+ 16GB ($109) or Jetson Orin Nano ($249)"),
        ("Wired Data", "CAN Bus (TWAI) -- 1 Mbps, 112 nodes, built into ESP32"),
        ("LED Control", "ArtNet/sACN over WiFi -- WLED firmware"),
        ("Sync", "ESP-NOW -- sub-millisecond, 220m range"),
        ("Connector", "4-pin magnetic pogo: 5V, GND, CAN_H, CAN_L"),
        ("Wall Mount", "16-gauge steel sheet -- modules snap magnetically"),
        ("Frame", "MakerBeamXL 15x15mm aluminum + 3D-printed PETG corners"),
        ("Safety", "PTC fuse + TVS diode + reverse polarity per module ($0.40)"),
    ]

    ty = y + 55
    for label, value in specs:
        pdf.set_font("Helvetica", "B", 8)
        pdf.set_text_color(*AMBER)
        pdf.set_xy(25, ty)
        pdf.cell(40, 4.5, label)
        pdf.set_font("Helvetica", "", 8)
        pdf.set_text_color(*WHITE)
        pdf.cell(120, 4.5, value)
        ty += 6

    # ============================================
    # PAGE 8: COMPETITIVE POSITION
    # ============================================
    pdf.add_page()
    pdf.dark_page()
    y = pdf.section_header("Market", "Nobody makes this.")

    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(25, y + 5)
    pdf.multi_cell(120, 5, (
        "30+ competitors analyzed. The intersection of mixed media types + "
        "modular snap-together + AI orchestration is completely unoccupied."
    ))

    competitors = [
        ("Nanoleaf", "$80-300", "Light panels only", "No screens, audio, AI, sensors"),
        ("Govee", "$30-150", "Cheap LED panels", "No modularity between products"),
        ("Tidbyt", "$180", "Pixel display", "Standalone, not modular"),
        ("Samsung The Wall", "$100K+", "MicroLED panels", "Insane price, only screens"),
        ("Hypervsn", "$3,200/unit", "Hologram fans", "Enterprise only, no AI"),
        ("[MODULAR]", "$9-129", "Mixed media + AI", "All of the above, open hardware"),
    ]

    ty = y + 25
    # Header
    pdf.set_font("Helvetica", "B", 8)
    pdf.set_text_color(*TEAL)
    pdf.set_xy(25, ty)
    pdf.cell(40, 5, "COMPETITOR")
    pdf.cell(30, 5, "PRICE")
    pdf.cell(45, 5, "WHAT THEY DO")
    pdf.cell(60, 5, "WHAT THEY LACK")
    ty += 7

    for comp, price, does, lacks in competitors:
        is_us = comp == "[MODULAR]"
        pdf.set_font("Helvetica", "B" if is_us else "", 8)
        pdf.set_text_color(*(TEAL if is_us else WHITE))
        pdf.set_xy(25, ty)
        pdf.cell(40, 4.5, comp)
        pdf.set_text_color(*(AMBER if is_us else MUTED))
        pdf.cell(30, 4.5, price)
        pdf.set_text_color(*WHITE)
        pdf.set_font("Helvetica", "", 8)
        pdf.cell(45, 4.5, does)
        pdf.set_text_color(*(TEAL if is_us else MUTED))
        pdf.cell(60, 4.5, lacks)
        ty += 6

    # ============================================
    # PAGE 9: BUSINESS MODEL
    # ============================================
    pdf.add_page()
    pdf.dark_page()
    y = pdf.section_header("Business", "The numbers")

    # Pricing tiers
    tiers = [
        ("Starter", "Hub + 2 Glow + 1 Screen", "$149", "$199"),
        ("Explorer", "Hub + 1 Holo + 2 Glow + 1 Screen", "$249", "$349"),
        ("Oracle", "Hub + 2 Holo + 4 Glow + 2 Screen", "$449", "$599"),
        ("Installation", "Hub + 4 Holo + 8 Glow + 4 Screen + 2 Speaker", "$899", "$1,199"),
    ]

    ty = y + 10
    pdf.set_font("Helvetica", "B", 8)
    pdf.set_text_color(*TEAL)
    pdf.set_xy(25, ty)
    pdf.cell(30, 5, "TIER")
    pdf.cell(80, 5, "CONTENTS")
    pdf.cell(25, 5, "EARLY BIRD")
    pdf.cell(25, 5, "RETAIL")
    ty += 7

    for tier, contents, early, retail in tiers:
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(*AMBER)
        pdf.set_xy(25, ty)
        pdf.cell(30, 5, tier)
        pdf.set_font("Helvetica", "", 8)
        pdf.set_text_color(*WHITE)
        pdf.cell(80, 5, contents)
        pdf.set_text_color(*TEAL)
        pdf.cell(25, 5, early)
        pdf.set_text_color(*MUTED)
        pdf.cell(25, 5, retail)
        ty += 7

    # Revenue projections
    ty += 10
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(25, ty)
    pdf.cell(0, 6, "Revenue Projections")
    ty += 10

    projections = [
        ("Kickstarter", "$150-300K", "1,000-2,000 backers"),
        ("Year 1", "$200-400K", "Direct sales + post-KS"),
        ("Year 2", "$440-780K", "+ subscriptions + marketplace"),
        ("Year 3", "$1.5-2.9M", "+ retail + licensing"),
    ]

    for period, rev, note in projections:
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(*TEAL)
        pdf.set_xy(25, ty)
        pdf.cell(35, 5, period)
        pdf.set_font("Helvetica", "B", 12)
        pdf.set_text_color(*AMBER)
        pdf.cell(35, 5, rev)
        pdf.set_font("Helvetica", "", 8)
        pdf.set_text_color(*MUTED)
        pdf.cell(60, 5, note)
        ty += 8

    # Margin
    ty += 5
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(25, ty)
    pdf.cell(0, 5, "Blended gross margin target: 60-65%  |  Software subscription: ~95% margin")

    # ============================================
    # PAGE 10: ROADMAP
    # ============================================
    pdf.add_page()
    pdf.dark_page()
    y = pdf.section_header("Roadmap", "8 phases to launch")

    phases = [
        ("0", "Foundation", "Week 1-2", "$175", "Orders, dev environment, decisions"),
        ("1", "First Module", "Week 2-4", "--", "One working CYD screen module"),
        ("2", "Wall Controller", "Week 3-6", "--", "FastAPI agent, API, scenes"),
        ("3", "Multi-Module", "Week 5-8", "$400", "5-10 modules working together"),
        ("4", "Visual Campaign", "Week 6-10", "--", "Blender, images, video"),
        ("5", "Controller", "Week 8-12", "$50", "Handheld R1-style remote"),
        ("6", "Configurator", "Week 10-16", "--", "Website, AI onboarding"),
        ("7", "Globe 2.0", "Parallel", "TBD", "Spherical LED display"),
        ("8", "Launch Prep", "Week 14-20", "$1,200", "100-unit pilot, Kickstarter"),
    ]

    ty = y + 10
    for num, name, timeline, budget, focus in phases:
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(*TEAL)
        pdf.set_xy(25, ty)
        pdf.cell(8, 5, num)
        pdf.set_text_color(*WHITE)
        pdf.cell(35, 5, name)
        pdf.set_font("Helvetica", "", 8)
        pdf.set_text_color(*MUTED)
        pdf.cell(25, 5, timeline)
        pdf.set_text_color(*AMBER)
        pdf.cell(20, 5, budget)
        pdf.set_text_color(*WHITE)
        pdf.cell(100, 5, focus)
        ty += 7

    ty += 10
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*AMBER)
    pdf.set_xy(25, ty)
    pdf.cell(0, 5, "Total pre-launch budget: $2,000-3,000")

    # ============================================
    # BACK COVER
    # ============================================
    pdf.add_page()
    pdf.dark_page()

    pdf.set_font("Helvetica", "B", 36)
    pdf.set_text_color(*WHITE)
    pdf.set_xy(0, 70)
    pdf.cell(297, 15, "[MODULAR]", align='C', ln=True)

    pdf.set_font("Helvetica", "", 14)
    pdf.set_text_color(*TEAL)
    pdf.set_xy(0, 90)
    pdf.cell(297, 8, "Open hardware. Proprietary soul.", align='C', ln=True)

    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*MUTED)
    pdf.set_xy(0, 110)
    pdf.cell(297, 6, "github.com/igwana12/modular-wall", align='C', ln=True)

    pdf.set_font("Helvetica", "", 8)
    pdf.set_text_color(80, 80, 100)
    pdf.set_xy(0, 130)
    pdf.cell(297, 5, "22 module types  |  80 components cataloged  |  $9-129 per module", align='C', ln=True)
    pdf.set_xy(0, 137)
    pdf.cell(297, 5, "8-phase roadmap  |  60-65% gross margin  |  $150-300K Kickstarter target", align='C', ln=True)

    pdf.set_font("Helvetica", "", 7)
    pdf.set_text_color(60, 60, 80)
    pdf.set_xy(0, 190)
    pdf.cell(297, 4, "CONFIDENTIAL  |  LOCAL PROTOTYPE  |  A Sacred Circuits experiment", align='C', ln=True)

    # ============================================
    # OUTPUT
    # ============================================
    pdf.output(OUTPUT)
    print(f"Brochure generated: {OUTPUT}")
    print(f"Pages: {pdf.page}")


if __name__ == "__main__":
    build_brochure()
