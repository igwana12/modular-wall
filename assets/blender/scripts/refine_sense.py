"""Refine Sense module: 44x44x16mm, mmWave radar + XIAO ESP32."""
import bpy, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from refine_common import *

clear_scene()

mat_housing = make_material("mat_housing", COL_HOUSING, roughness=0.85, metallic=0.1)
mat_pcb = make_material("mat_pcb", COL_PCB, roughness=0.6, metallic=0.3)
mat_gold = make_material("mat_gold_pin", COL_GOLD, roughness=0.2, metallic=0.95)
mat_silver = make_material("mat_silver", COL_SILVER, roughness=0.3, metallic=0.9)
mat_ic = make_material("mat_ic_chip", COL_IC, roughness=0.4, metallic=0.8)
mat_cap = make_material("mat_capacitor", COL_CAPACITOR, roughness=0.7)
mat_res = make_material("mat_resistor", COL_RESISTOR, roughness=0.5)

# Housing: 44x44x16mm (smallest module!)
add_box("housing", (0, 0, 0), (44*MM, 44*MM, 16*MM), mat_housing)

# Front panel (smoke acrylic)
mat_acrylic = make_material("mat_acrylic", COL_ACRYLIC, roughness=0.1, alpha=0.7)
add_box("SE_FrontPanel", (0, 0, 7.5*MM), (42*MM, 42*MM, 2*MM), mat_acrylic)

# PCB: 42x42x1.6mm
add_box("SE_PCB", (0, 0, 2*MM), (42*MM, 42*MM, 1.6*MM), mat_pcb)

# LD2410C mmWave radar: 18x18x4mm
add_ic_chip("SE_Radar", (0, 5*MM, 4.5*MM), (18, 18, 4), mat_ic)

# XIAO ESP32-S3: 20x17.5x3.5mm (it barely fits!)
add_ic_chip("SE_ESP32", (0, -10*MM, 4.5*MM), (20, 17.5, 3.5), mat_ic)

# Status LED (dim red/teal)
mat_led = make_material("mat_led_status", srgb_to_linear(255, 50, 50), emission_color=srgb_to_linear(255, 50, 50), emission_strength=3.0)
add_box("SE_LED", (0, 0, 8.5*MM), (1.5*MM, 1.5*MM, 0.8*MM), mat_led)

# Pogo pins — 4 per bottom edge
for i, x in enumerate([-12, -4, 4, 12]):
    add_pogo_pin(f"pin_{i}", (x*MM, -23*MM, -7*MM), mat_gold)
    add_pogo_pin(f"pin_{i+4}", (x*MM, 23*MM, -7*MM), mat_gold)

# Corner magnets (smaller: 6mm dia)
for i, (x, y) in enumerate([(-15, -15), (15, -15), (-15, 15), (15, 15)]):
    add_cylinder(f"mag_{i}", (x*MM, y*MM, -7*MM), 3*MM, 2*MM, mat_silver)

# Tiny SMD components
scatter_smd_components("SE", 18, 18, 3, count_caps=4, count_res=3, mat_cap=mat_cap, mat_res=mat_res)

setup_camera(location=(0.2, -0.2, 0.15))
setup_lighting()

out = os.path.join(os.path.dirname(__file__), "..", "modules", "refined", "sense.blend")
bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(out))
print(f"[Refine] Saved: {out}")
