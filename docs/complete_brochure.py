#!/usr/bin/env python3
"""
Complete mosAIc Product Brochure Generator - All 12 Pages
Creates a professional 12-page PDF brochure for Sacred Circuits mosAIc
"""

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch, mm
from reportlab.lib.colors import HexColor
import math

# Brand colors
TEAL = HexColor("#00D4AA")
AMBER = HexColor("#FFB347")
DARK_BG = HexColor("#0a0a1a")
DARK_BG2 = HexColor("#111122")
WHITE = HexColor("#FFFFFF")
GRAY = HexColor("#888888")

# Page dimensions
PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN = 0.75 * inch

def add_page_background(c):
    """Add dark background to page"""
    c.setFillColor(DARK_BG)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)

def add_header(c, page_num):
    """Add page header"""
    if page_num > 1 and page_num < 12:
        c.setFillColor(TEAL)
        c.setFont("Helvetica", 8)
        c.drawString(MARGIN, PAGE_HEIGHT - 0.4*inch, "mosAIc by Sacred Circuits")
        
        c.setFillColor(GRAY)
        c.setFont("Helvetica", 8)
        c.drawRightString(PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 0.4*inch, f"Page {page_num}")

def create_complete_brochure():
    """Create the complete 12-page mosAIc brochure"""
    filename = "/Volumes/AI_WORKSPACE/modular-wall/docs/mosaic-brochure-2026.pdf"
    
    c = canvas.Canvas(filename, pagesize=letter)
    c.setTitle("mosAIc - Modular Wall Computer System - 2026 Product Guide")
    c.setAuthor("Sacred Circuits")
    c.setSubject("Product Brochure")
    
    # Module data
    modules = [
        {"name": "Screen-S", "width": 76, "height": 116, "price": 79, "desc": "2.8\" LCD touchscreen"},
        {"name": "Screen-M", "width": 144, "height": 94, "price": 119, "desc": "5\" LCD touchscreen"},
        {"name": "Glow", "width": 71, "height": 71, "price": 49, "desc": "Ambient LED panel"},
        {"name": "Pixel", "width": 166, "height": 86, "price": 59, "desc": "HUB75 LED matrix"},
        {"name": "Voice", "width": 71, "height": 71, "price": 39, "desc": "Speaker + mic"},
        {"name": "Sense", "width": 44, "height": 44, "price": 29, "desc": "mmWave presence"},
        {"name": "Brick", "width": 71, "height": 71, "price": 9, "desc": "Structural filler"},
        {"name": "Hub", "width": 91, "height": 62, "price": 49, "desc": "Central brain (required)"},
        {"name": "Holo", "width": 140, "height": 140, "price": 99, "desc": "Holographic fan"},
        {"name": "Round", "width": 91, "height": 91, "price": 69, "desc": "AMOLED + LED ring", "circle": True},
        {"name": "Mirror", "width": 120, "height": 120, "price": 129, "desc": "Smart mirror + camera", "circle": True},
        {"name": "eInk", "width": 180, "height": 120, "price": 59, "desc": "E-paper display"},
    ]
    
    # PAGE 1 - COVER
    add_page_background(c)
    
    # mosAIc logo
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 72)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 2*inch, "mosAIc")
    
    # Tagline
    c.setFillColor(AMBER)
    c.setFont("Helvetica", 24)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 2.8*inch, "Your desktop. On your wall.")
    
    # Sacred Circuits brand
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 18)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 4*inch, "Sacred Circuits")
    
    # Product guide
    c.setFillColor(TEAL)
    c.setFont("Helvetica", 16)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 4.5*inch, "2026 Product Guide")
    
    # Decorative line
    c.setStrokeColor(AMBER)
    c.setLineWidth(3)
    c.line(PAGE_WIDTH/2 - 2*inch, PAGE_HEIGHT - 5*inch, PAGE_WIDTH/2 + 2*inch, PAGE_HEIGHT - 5*inch)
    
    c.showPage()  # Page 1 complete
    
    # PAGE 2 - THE THESIS
    add_page_background(c)
    add_header(c, 2)
    
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 32)
    c.drawString(MARGIN, PAGE_HEIGHT - 1.5*inch, "The Thesis")
    
    c.setFillColor(AMBER)
    c.setFont("Helvetica-Bold", 16)
    y = PAGE_HEIGHT - 2.5*inch
    quote_lines = [
        "\"As software ate the world,",
        "AI is throwing it back up.",
        "Apps are escaping the phone.", 
        "The wall is where they land.\""
    ]
    for line in quote_lines:
        c.drawString(MARGIN, y, line)
        y -= 24
    
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 14)
    y -= 30
    
    text_blocks = [
        "mosAIc represents the next evolution of computing interfaces.",
        "",
        "• Open source hardware meets proprietary AI orchestration",
        "• Modular design allows infinite customization",
        "• Community-built ecosystem of wall applications", 
        "• Local-first AI keeps your data private",
        "",
        "The smartphone put a computer in your pocket.",
        "mosAIc puts your computer on your wall."
    ]
    
    for block in text_blocks:
        if block:
            c.drawString(MARGIN, y, block)
        y -= 18
    
    c.showPage()  # Page 2 complete
    
    # PAGE 3 - HOW IT WORKS
    add_page_background(c)
    add_header(c, 3)
    
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 32)
    c.drawString(MARGIN, PAGE_HEIGHT - 1.5*inch, "How It Works")
    
    y = PAGE_HEIGHT - 2.5*inch
    steps = [
        ("1. Choose Modules", [
            "Select from 12 different module types",
            "Screens, sensors, lights, speakers and more", 
            "Each module serves a specific function"
        ]),
        ("2. Snap Together", [
            "Magnetic pogo-pin connectors",
            "No tools, no wires, no complexity",
            "Modules auto-discover and configure"
        ]),
        ("3. AI Orchestrates", [
            "Local-first AI coordinates modules",
            "Creates seamless multi-module experiences",
            "Adapts to your usage patterns"
        ])
    ]
    
    for step_title, step_desc in steps:
        c.setFillColor(AMBER)
        c.setFont("Helvetica-Bold", 18)
        c.drawString(MARGIN, y, step_title)
        y -= 30
        
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 12)
        for line in step_desc:
            c.drawString(MARGIN + 20, y, f"• {line}")
            y -= 16
        y -= 20
    
    c.showPage()  # Page 3 complete
    
    # PAGE 4 - MODULE CATALOG (Part 1)
    add_page_background(c)
    add_header(c, 4)
    
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 32)
    c.drawString(MARGIN, PAGE_HEIGHT - 1*inch, "Module Catalog")
    
    # Draw first 6 modules
    modules_page1 = modules[:6]
    y_pos = PAGE_HEIGHT - 1.8*inch
    
    for i, module in enumerate(modules_page1):
        if i % 3 == 0 and i > 0:
            y_pos -= 2.2*inch
        
        x_pos = MARGIN + (i % 3) * 2.2*inch
        
        # Module outline
        width_mm = module['width']
        height_mm = module['height'] 
        scale = 0.6
        is_circle = module.get('circle', False)
        
        width_pt = (width_mm * 72 / 25.4) * scale
        height_pt = (height_mm * 72 / 25.4) * scale
        
        c.setStrokeColor(TEAL)
        c.setFillColor(DARK_BG2)
        c.setLineWidth(2)
        
        if is_circle:
            radius = width_pt / 2
            c.circle(x_pos + radius, y_pos - radius, radius, fill=1, stroke=1)
        else:
            c.rect(x_pos, y_pos - height_pt, width_pt, height_pt, fill=1, stroke=1)
        
        # Labels
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(x_pos, y_pos - max(height_pt, width_pt) - 20, module['name'])
        
        c.setFillColor(AMBER)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(x_pos, y_pos - max(height_pt, width_pt) - 35, f"${module['price']}")
        
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 9)
        c.drawString(x_pos, y_pos - max(height_pt, width_pt) - 50, module['desc'])
        
        c.setFont("Helvetica", 8)
        if is_circle:
            c.drawString(x_pos, y_pos - max(height_pt, width_pt) - 63, f"{width_mm}mm ⌀")
        else:
            c.drawString(x_pos, y_pos - max(height_pt, width_pt) - 63, f"{width_mm}×{height_mm}mm")
    
    c.showPage()  # Page 4 complete
    
    # PAGE 5 - MODULE CATALOG (Part 2)
    add_page_background(c)
    add_header(c, 5)
    
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 32)
    c.drawString(MARGIN, PAGE_HEIGHT - 1*inch, "Module Catalog")
    
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 12)
    c.drawString(MARGIN, PAGE_HEIGHT - 1.3*inch, "(continued)")
    
    # Draw remaining 6 modules
    modules_page2 = modules[6:]
    y_pos = PAGE_HEIGHT - 1.8*inch
    
    for i, module in enumerate(modules_page2):
        if i % 3 == 0 and i > 0:
            y_pos -= 2.2*inch
        
        x_pos = MARGIN + (i % 3) * 2.2*inch
        
        # Module outline
        width_mm = module['width']
        height_mm = module['height']
        scale = 0.6
        is_circle = module.get('circle', False)
        
        width_pt = (width_mm * 72 / 25.4) * scale
        height_pt = (height_mm * 72 / 25.4) * scale
        
        c.setStrokeColor(TEAL)
        c.setFillColor(DARK_BG2)
        c.setLineWidth(2)
        
        if is_circle:
            radius = width_pt / 2
            c.circle(x_pos + radius, y_pos - radius, radius, fill=1, stroke=1)
        else:
            c.rect(x_pos, y_pos - height_pt, width_pt, height_pt, fill=1, stroke=1)
        
        # Labels
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(x_pos, y_pos - max(height_pt, width_pt) - 20, module['name'])
        
        c.setFillColor(AMBER)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(x_pos, y_pos - max(height_pt, width_pt) - 35, f"${module['price']}")
        
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 9)
        c.drawString(x_pos, y_pos - max(height_pt, width_pt) - 50, module['desc'])
        
        c.setFont("Helvetica", 8)
        if is_circle:
            c.drawString(x_pos, y_pos - max(height_pt, width_pt) - 63, f"{width_mm}mm ⌀")
        else:
            c.drawString(x_pos, y_pos - max(height_pt, width_pt) - 63, f"{width_mm}×{height_mm}mm")
    
    c.showPage()  # Page 5 complete
    
    # PAGE 6 - PRESET CONFIGURATIONS
    add_page_background(c)
    add_header(c, 6)
    
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 32)
    c.drawString(MARGIN, PAGE_HEIGHT - 1*inch, "Preset Configurations")
    
    configurations = [
        ("Starter", 206, ["Hub", "Screen-S", "Voice", "Glow"]),
        ("Media Center", 453, ["Hub", "Screen-M", "Voice", "Pixel", "Round", "eInk"]),
        ("Premium", 701, ["Hub", "Screen-M", "Voice", "Mirror", "Holo", "Sense", "Round"])
    ]
    
    y = PAGE_HEIGHT - 2*inch
    for config_name, price, components in configurations:
        c.setFillColor(AMBER)
        c.setFont("Helvetica-Bold", 18)
        c.drawString(MARGIN, y, f"{config_name} - ${price}")
        
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 12)
        c.drawString(MARGIN, y - 20, "Includes: " + " • ".join(components))
        
        y -= 80
    
    c.showPage()  # Page 6 complete
    
    # PAGE 7 - INTERFACE GALLERY
    add_page_background(c)
    add_header(c, 7)
    
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 32)
    c.drawString(MARGIN, PAGE_HEIGHT - 1*inch, "Interface Gallery")
    
    c.setFillColor(AMBER)
    c.setFont("Helvetica-Bold", 18)
    c.drawString(MARGIN, PAGE_HEIGHT - 1.5*inch, "App Store for Walls")
    
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 14)
    y = PAGE_HEIGHT - 2*inch
    
    interface_text = [
        "mosAIc Interfaces are distributed applications that run across",
        "multiple modules to create cohesive experiences:",
        "",
        "• Dashboard - System monitoring across multiple screens",
        "• Media Hub - Music visualization spanning pixel matrices",
        "• Smart Home - Control panels with ambient feedback",
        "• Productivity - Multi-screen workflows and notifications",
        "• Games - Interactive experiences using all sensors",
        "",
        "Community Marketplace:",
        "• Anyone can build and share interfaces",
        "• Open development platform", 
        "• Revenue sharing for popular interfaces",
        "• Educational modules for STEM learning"
    ]
    
    for line in interface_text:
        if line:
            c.drawString(MARGIN, y, line)
        y -= 18
    
    c.showPage()  # Page 7 complete
    
    # PAGE 8 - TECHNOLOGY
    add_page_background(c)
    add_header(c, 8)
    
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 32)
    c.drawString(MARGIN, PAGE_HEIGHT - 1*inch, "Technology Stack")
    
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 14)
    y = PAGE_HEIGHT - 1.8*inch
    
    tech_text = [
        "Hardware Platform:",
        "• ESP32-S3 microcontroller (WiFi + BLE)",
        "• Magnetic pogo-pin connectors for power and data",
        "• Custom PCB design optimized for wall mounting",
        "",
        "Networking:",
        "• BLE mesh network for inter-module communication",
        "• WiFi for internet connectivity and updates",
        "• Local-first architecture minimizes cloud dependency",
        "",
        "AI Orchestration:",
        "• Local edge AI for privacy and low latency", 
        "• Adaptive module coordination algorithms",
        "• Pattern learning for personalized experiences",
        "",
        "Open Source Commitment:",
        "• Hardware designs (STL/CAD files) - MIT License",
        "• Firmware and drivers - Open source",
        "• Software platform - Proprietary with open interfaces"
    ]
    
    for line in tech_text:
        if line.endswith(":"):
            c.setFillColor(AMBER)
            c.setFont("Helvetica-Bold", 14)
        else:
            c.setFillColor(WHITE)
            c.setFont("Helvetica", 12)
        
        c.drawString(MARGIN, y, line)
        y -= 16
    
    c.showPage()  # Page 8 complete
    
    # PAGE 9 - SACRED CIRCUITS UNIVERSE
    add_page_background(c)
    add_header(c, 9)
    
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 32)
    c.drawString(MARGIN, PAGE_HEIGHT - 1*inch, "Sacred Circuits")
    
    c.setFillColor(AMBER)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(MARGIN, PAGE_HEIGHT - 1.4*inch, "Mythology Meets Technology")
    
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 14)
    y = PAGE_HEIGHT - 2*inch
    
    products = [
        ("Oracle Cards", [
            "Digital divination meets ancient wisdom.",
            "AI-powered tarot and oracle experiences."
        ]),
        ("Spirit Sphere", [
            "Ambient computing orb for meditation.",
            "Breathing light patterns sync with your state."
        ]),
        ("mosAIc Wall", [
            "Modular computing surfaces.",
            "Your digital life, architecturally integrated."
        ])
    ]
    
    for product_name, descriptions in products:
        c.setFillColor(AMBER)
        c.setFont("Helvetica-Bold", 16)
        c.drawString(MARGIN, y, product_name)
        y -= 25
        
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 12)
        for desc in descriptions:
            c.drawString(MARGIN + 20, y, desc)
            y -= 16
        y -= 20
    
    c.setFillColor(TEAL)
    c.setFont("Helvetica", 12)
    c.drawString(MARGIN, y - 30, "One mythology. Three product lines. Infinite possibilities.")
    
    c.showPage()  # Page 9 complete
    
    # PAGE 10 - 3D PRINTING & MANUFACTURING
    add_page_background(c)
    add_header(c, 10)
    
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 32)
    c.drawString(MARGIN, PAGE_HEIGHT - 1*inch, "Manufacturing")
    
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 14)
    y = PAGE_HEIGHT - 1.8*inch
    
    manufacturing_text = [
        "Materials & Methods:",
        "• PETG housing for durability and aesthetics",
        "• Laser-cut acrylic panels for displays", 
        "• Custom injection-molded connectors",
        "• Professional assembly and quality testing",
        "",
        "Production Partners:",
        "• Slant 3D API - Primary manufacturing (US-based)",
        "• JLC3DP - Backup production (International)",
        "• Local makerspaces - Community builds",
        "",
        "Quality Standards:",
        "• FCC certification for wireless modules",
        "• CE marking for European markets",
        "• RoHS compliance for electronic components",
        "• 2-year warranty on all modules"
    ]
    
    for line in manufacturing_text:
        if line.endswith(":"):
            c.setFillColor(AMBER)
            c.setFont("Helvetica-Bold", 14)
        elif line:
            c.setFillColor(WHITE)
            c.setFont("Helvetica", 12)
        
        if line:
            c.drawString(MARGIN, y, line)
        y -= 16
    
    c.showPage()  # Page 10 complete
    
    # PAGE 11 - COMMUNITY & OPEN SOURCE  
    add_page_background(c)
    add_header(c, 11)
    
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 32)
    c.drawString(MARGIN, PAGE_HEIGHT - 1*inch, "Community")
    
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 14)
    y = PAGE_HEIGHT - 1.8*inch
    
    community_text = [
        "Open Development:",
        "• GitHub: igwana12/modular-wall",
        "• 33+ commits and growing",
        "• Active community of contributors",
        "",
        "Interface Marketplace:",
        "• Community-built applications",
        "• Revenue sharing for developers",
        "• Open SDK and documentation",
        "",
        "Educational Mission:",
        "• STEM lessons for each module type",
        "• University research partnerships",
        "• Maker faire demonstrations",
        "",
        "Join the Community:",
        "• Discord server for real-time chat",
        "• Monthly virtual meetups", 
        "• Beta testing programs for new modules"
    ]
    
    for line in community_text:
        if line.endswith(":"):
            c.setFillColor(AMBER)
            c.setFont("Helvetica-Bold", 14)
        elif line:
            c.setFillColor(WHITE)
            c.setFont("Helvetica", 12)
        
        if line:
            c.drawString(MARGIN, y, line)
        y -= 16
    
    c.showPage()  # Page 11 complete
    
    # PAGE 12 - BACK COVER
    add_page_background(c)
    
    # Build Your Wall CTA
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 48)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 2*inch, "Build Your Wall")
    
    # Pricing
    c.setFillColor(AMBER)
    c.setFont("Helvetica-Bold", 24)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 3*inch, "$9 to $129 per module")
    
    # URLs and contact
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 16)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 4*inch, "mosaic.sacredcircuits.com")
    
    c.setFont("Helvetica", 14)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 4.5*inch, "github.com/igwana12/modular-wall")
    
    # Sacred Circuits branding
    c.setFillColor(TEAL)
    c.setFont("Helvetica-Bold", 20)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 6*inch, "Sacred Circuits")
    
    c.setFillColor(AMBER)
    c.setFont("Helvetica", 12)
    c.drawCentredString(PAGE_WIDTH/2, PAGE_HEIGHT - 6.5*inch, "Mythology meets technology")
    
    # Decorative border
    c.setStrokeColor(TEAL)
    c.setLineWidth(3)
    c.rect(MARGIN/2, MARGIN/2, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - MARGIN, fill=0, stroke=1)
    
    c.save()  # Save the PDF
    print(f"✅ Complete mosAIc brochure created: {filename}")
    print(f"📄 12 pages generated successfully")
    return filename

if __name__ == "__main__":
    create_complete_brochure()