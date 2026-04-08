"""Refine eInk module: 180x120x15mm, 7.5-inch e-paper + ESP32."""
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
# E-paper has a warm white surface (not emissive — it reflects light)
mat_epaper = make_material("mat_screen_emission", srgb_to_linear(232, 224, 208), roughness=0.95, metallic=0.0)
mat_bezel = make_material("mat_bezel", srgb_to_linear(15, 15, 18), roughness=0.8)
mat_battery = make_material("mat_battery", srgb_to_linear(40, 40, 45), roughness=0.6, metallic=0.3)

# Housing: 180x120x15mm (thinnest module)
add_box("housing", (0, 0, 0), (180*MM, 120*MM, 15*MM), mat_housing)

# E-paper panel: 163x98x1.2mm (the actual display area)
add_box("EI_EPaper", (0, 3*MM, 6.5*MM), (163*MM, 98*MM, 1.2*MM), mat_epaper)

# Bezel frame
add_box("bezel", (0, 3*MM, 7.2*MM), (170*MM, 108*MM, 0.8*MM), mat_bezel)

# Thin PCB: 175x115x1.0mm
add_box("EI_PCB", (0, 0, -2*MM), (175*MM, 115*MM, 1.0*MM), mat_pcb)

# XIAO ESP32-S3: 20x17.5x3.5mm
add_ic_chip("EI_ESP32", (-60*MM, -35*MM, -0.5*MM), (20, 17.5, 3.5), mat_ic)

# E-paper driver IC: 10x10x1.5mm
add_ic_chip("EI_DriverIC", (40*MM, -35*MM, -0.5*MM), (10, 10, 1.5), mat_ic)

# Flat LiPo battery: 60x40x4mm (e-ink can run on battery for months)
add_box("EI_Battery", (0, -30*MM, -5*MM), (60*MM, 40*MM, 4*MM), mat_battery)

# FPC ribbon connector (paper to driver)
add_box("EI_FPC", (0, -48*MM, 2*MM), (30*MM, 3*MM, 0.5*MM), mat_silver)

# Pogo pins — 4 per long edge
for i, x in enumerate([-60, -20, 20, 60]):
    add_pogo_pin(f"pin_{i}", (x*MM, -61*MM, -6*MM), mat_gold)
    add_pogo_pin(f"pin_{i+4}", (x*MM, 61*MM, -6*MM), mat_gold)
for i, y in enumerate([-20, 20]):
    add_pogo_pin(f"pin_{i+8}", (-91*MM, y*MM, -6*MM), mat_gold)
    add_pogo_pin(f"pin_{i+10}", (91*MM, y*MM, -6*MM), mat_gold)

# Corner magnets
add_corner_magnets("mag", 75, 50, -6*MM, mat_silver)

# SMD components
scatter_smd_components("EI", 80, 50, -1.5, count_caps=6, count_res=4, mat_cap=mat_cap, mat_res=mat_res)

setup_camera(location=(0.5, -0.4, 0.3))
setup_lighting()

out = os.path.join(os.path.dirname(__file__), "..", "modules", "refined", "eink.blend")
bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(out))
print(f"[Refine] Saved: {out}")
