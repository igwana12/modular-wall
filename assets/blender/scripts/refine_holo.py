"""Refine Holo module: 140x140x40mm, POV holographic fan display."""
import bpy, sys, os, math
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
mat_acrylic = make_material("mat_acrylic", COL_ACRYLIC, roughness=0.1, alpha=0.6)
mat_blade = make_material("mat_blade", srgb_to_linear(20, 20, 25), roughness=0.3, metallic=0.6)
mat_led_strip = make_material("mat_led_holo", COL_LED_TEAL, emission_color=srgb_to_linear(204, 68, 255), emission_strength=4.0)

# Housing: 140x140x40mm
add_box("housing", (0, 0, 0), (140*MM, 140*MM, 40*MM), mat_housing)

# Safety acrylic cover: 138x138x3mm
add_box("HO_Cover", (0, 0, 19.5*MM), (138*MM, 138*MM, 3*MM), mat_acrylic)

# Motor hub center: Ø20mm, 15mm
add_cylinder("HO_Motor", (0, 0, 5*MM), 10*MM, 15*MM, mat_silver)

# Fan blades (2 blades, 120mm span)
for i in range(2):
    angle = i * math.pi
    x = math.cos(angle) * 30*MM
    y = math.sin(angle) * 30*MM
    blade = add_box(f"HO_Blade_{i}", (x, y, 10*MM), (55*MM, 8*MM, 2*MM), mat_blade)
    blade.rotation_euler = (0, 0, angle)

# LED strips on blades
for i in range(2):
    angle = i * math.pi
    for j in range(5):
        dist = (15 + j * 10) * MM
        x = math.cos(angle) * dist
        y = math.sin(angle) * dist
        add_box(f"HO_LED_{i}_{j}", (x, y, 11*MM), (3*MM, 3*MM, 1*MM), mat_led_strip)

# Driver PCB: 130x50x1.6mm (at bottom)
add_box("HO_PCB", (0, -30*MM, -12*MM), (130*MM, 50*MM, 1.6*MM), mat_pcb)

# XIAO ESP32-S3
add_ic_chip("HO_ESP32", (-30*MM, -30*MM, -10*MM), (20, 17.5, 3.5), mat_ic)

# Motor driver IC
add_ic_chip("HO_DriverIC", (20*MM, -30*MM, -10*MM), (10, 10, 2), mat_ic)

# Pogo pins
for i, x in enumerate([-46, -16, 16, 46]):
    add_pogo_pin(f"pin_{i}", (x*MM, -71*MM, -18*MM), mat_gold)
    add_pogo_pin(f"pin_{i+4}", (x*MM, 71*MM, -18*MM), mat_gold)
for i, y in enumerate([-23, -8, 8, 23]):
    add_pogo_pin(f"pin_{i+8}", (-71*MM, y*MM, -18*MM), mat_gold)
    add_pogo_pin(f"pin_{i+12}", (71*MM, y*MM, -18*MM), mat_gold)

# Corner magnets
add_corner_magnets("mag", 55, 55, -18*MM, mat_silver)

# SMD components
scatter_smd_components("HO", 60, 22, -11, count_caps=6, count_res=4, mat_cap=mat_cap, mat_res=mat_res)

setup_camera(location=(0.45, -0.4, 0.35))
setup_lighting()

out = os.path.join(os.path.dirname(__file__), "..", "modules", "refined", "holo.blend")
bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(out))
print(f"[Refine] Saved: {out}")
