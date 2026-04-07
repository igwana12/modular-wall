"""Refine Mirror module: Ø120mm x 28mm, circular LCD + camera + ring light."""
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
mat_screen = make_material("mat_screen_emission", COL_SCREEN, roughness=0.05, metallic=0.9, emission_color=srgb_to_linear(255, 136, 221), emission_strength=1.5)
mat_ring_light = make_material("mat_ring_light", COL_WHITE_LED, emission_color=COL_WHITE_LED, emission_strength=3.0)
mat_camera = make_material("mat_camera", srgb_to_linear(5, 5, 8), roughness=0.2, metallic=0.8)
mat_glass = make_material("mat_glass", srgb_to_linear(60, 60, 70), roughness=0.05, alpha=0.5)

# Circular housing: Ø120mm, 28mm deep
add_cylinder("housing", (0, 0, 0), 60*MM, 28*MM, mat_housing, 64)

# Circular display: Ø100mm
add_cylinder("MR_Display", (0, 0, 12*MM), 50*MM, 3*MM, mat_screen, 64)

# Glass cover: Ø114mm
add_cylinder("MR_Glass", (0, 0, 14*MM), 57*MM, 1*MM, mat_glass, 64)

# Ring light — 24 LEDs around the edge
for i in range(24):
    angle = (i / 24) * math.pi * 2
    x = math.cos(angle) * 55*MM
    y = math.sin(angle) * 55*MM
    add_box(f"MR_RingLED_{i}", (x, y, 13*MM), (3*MM, 3*MM, 1.5*MM), mat_ring_light)

# Camera module: 8x8x5mm (top center)
add_box("MR_Camera", (0, 48*MM, 12*MM), (8*MM, 8*MM, 5*MM), mat_camera)
# Camera lens
add_cylinder("MR_Lens", (0, 48*MM, 14.5*MM), 2.5*MM, 1*MM, mat_glass, 16)

# PCB: Ø110mm circular (approximated as Ø110)
add_cylinder("MR_PCB", (0, 0, -4*MM), 55*MM, 1.6*MM, mat_pcb, 48)

# RPi Zero 2W: 65x30x5mm
add_ic_chip("MR_RPi", (0, -10*MM, -1*MM), (65, 30, 5), mat_ic)

# Camera CSI connector
add_box("MR_CSI", (0, 25*MM, -2*MM), (20*MM, 5*MM, 2*MM), mat_silver)

# Pogo pins — ring arrangement (8 pins)
for i in range(8):
    angle = (i / 8) * math.pi * 2 + math.pi / 8
    x = math.cos(angle) * 50*MM
    y = math.sin(angle) * 50*MM
    add_pogo_pin(f"pin_{i}", (x, y, -12*MM), mat_gold)

# Magnets — 4 around the edge
for i in range(4):
    angle = (i / 4) * math.pi * 2
    x = math.cos(angle) * 48*MM
    y = math.sin(angle) * 48*MM
    add_magnet(f"mag_{i}", (x, y, -12*MM), mat_silver)

scatter_smd_components("MR", 45, 45, -3, count_caps=8, count_res=5, mat_cap=mat_cap, mat_res=mat_res)

setup_camera(location=(0.35, -0.35, 0.25))
setup_lighting()

out = os.path.join(os.path.dirname(__file__), "..", "modules", "refined", "mirror.blend")
bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(out))
print(f"[Refine] Saved: {out}")
