"""Refine Screen-M module: 144x94x22mm, 5-inch IPS LCD, ESP32-S3."""
import bpy, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from refine_common import *

clear_scene()

# Materials
mat_housing = make_material("mat_housing", COL_HOUSING, roughness=0.85, metallic=0.1)
mat_pcb = make_material("mat_pcb", COL_PCB, roughness=0.6, metallic=0.3)
mat_gold = make_material("mat_gold_pin", COL_GOLD, roughness=0.2, metallic=0.95)
mat_silver = make_material("mat_silver", COL_SILVER, roughness=0.3, metallic=0.9)
mat_ic = make_material("mat_ic_chip", COL_IC, roughness=0.4, metallic=0.8)
mat_cap = make_material("mat_capacitor", COL_CAPACITOR, roughness=0.7)
mat_res = make_material("mat_resistor", COL_RESISTOR, roughness=0.5)
mat_acrylic = make_material("mat_acrylic", COL_ACRYLIC, roughness=0.1, alpha=0.7)
mat_screen = make_material("mat_screen_emission", COL_SCREEN, roughness=0.3, emission_color=COL_SCREEN, emission_strength=2.0)
mat_usb = make_material("mat_usb_c", COL_USB, roughness=0.3, metallic=0.9)

# Housing: 144x94x22mm
add_box("housing", (0, 0, 0), (144*MM, 94*MM, 22*MM), mat_housing)

# Front panel (smoke acrylic): 142x92x3mm
add_box("SM_FrontPanel", (0, 0, 10.5*MM), (142*MM, 92*MM, 3*MM), mat_acrylic)

# Main PCB: 140x90x1.6mm
add_box("SM_PCB", (0, 0, 3*MM), (140*MM, 90*MM, 1.6*MM), mat_pcb)

# 5-inch LCD: 108x65x3mm
add_box("SM_LCD", (0, 5*MM, 5*MM), (108*MM, 65*MM, 3*MM), mat_screen)

# LCD bezel
add_box("bezel", (0, 5*MM, 8*MM), (112*MM, 69*MM, 0.8*MM), mat_housing)

# ESP32-S3 chip: 18x25.5x3mm
add_ic_chip("SM_ESP32", (-40*MM, -20*MM, 4.5*MM), (18, 25.5, 3), mat_ic)

# Crystal oscillator
add_box("SM_Crystal", (30*MM, -25*MM, 4.5*MM), (3*MM, 3*MM, 3*MM), mat_silver)

# USB-C port
add_usb_c("SM_USBC", (-72*MM, 0, 3*MM), mat_usb)

# Pogo pins — 4 per edge (top/bottom)
for i, x in enumerate([-46, -16, 16, 46]):
    add_pogo_pin(f"pin_{i}", (x*MM, -48*MM, 0), mat_gold)
    add_pogo_pin(f"pin_{i+4}", (x*MM, 48*MM, 0), mat_gold)
# 4 per edge (left/right)
for i, y in enumerate([-23, -8, 8, 23]):
    add_pogo_pin(f"pin_{i+8}", (-73*MM, y*MM, 0), mat_gold)
    add_pogo_pin(f"pin_{i+12}", (73*MM, y*MM, 0), mat_gold)

# Corner magnets
add_corner_magnets("mag", 60, 38, -10*MM, mat_silver)

# SMD components
scatter_smd_components("SM", 65, 40, 4, mat_cap=mat_cap, mat_res=mat_res)

# Camera + lighting
setup_camera(location=(0.4, -0.35, 0.28))
setup_lighting()

# Save
out = os.path.join(os.path.dirname(__file__), "..", "modules", "refined", "screen-m.blend")
bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(out))
print(f"[Refine] Saved: {out}")
