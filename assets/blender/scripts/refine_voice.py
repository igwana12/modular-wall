"""Refine Voice module: 71x71x23mm, speaker driver + MEMS mic + ESP32."""
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
mat_grille = make_material("mat_grille", srgb_to_linear(25, 25, 30), roughness=0.7, metallic=0.5)
mat_speaker = make_material("mat_speaker", srgb_to_linear(30, 30, 40), roughness=0.6)

# Housing: 71x71x23mm
add_box("housing", (0, 0, 0), (71*MM, 71*MM, 23*MM), mat_housing)

# Speaker grille (front): 69x69x1.5mm with perforated look
add_box("VO_Grille", (0, 0, 11.5*MM), (69*MM, 69*MM, 1.5*MM), mat_grille)

# Speaker driver: Ø32mm, 13mm deep
add_cylinder("VO_Driver", (0, 0, 3*MM), 16*MM, 13*MM, mat_speaker)

# Speaker cone (slightly smaller)
add_cylinder("VO_Cone", (0, 0, 6*MM), 14*MM, 4*MM, mat_silver, 32)

# PCB: 68x68x1.6mm
add_box("VO_PCB", (0, 0, -5*MM), (68*MM, 68*MM, 1.6*MM), mat_pcb)

# XIAO ESP32-S3: 20x17.5x3.5mm
add_ic_chip("VO_ESP32", (-15*MM, -15*MM, -3*MM), (20, 17.5, 3.5), mat_ic)

# MAX98357A audio amp: 5x5x1mm
add_ic_chip("VO_AmpIC", (15*MM, -15*MM, -3.5*MM), (5, 5, 1), mat_ic)

# INMP441 MEMS mic: 4x3x1.2mm
add_ic_chip("VO_Mic", (20*MM, 20*MM, -3.5*MM), (4, 3, 1.2), mat_ic)

# Status LED (teal)
mat_led = make_material("mat_led_teal", COL_LED_TEAL, emission_color=COL_LED_TEAL, emission_strength=5.0)
add_box("VO_LED", (25*MM, -25*MM, 11.5*MM), (2*MM, 2*MM, 1*MM), mat_led)

# Pogo pins — 4 per edge (bottom/top)
for i, x in enumerate([-23, -8, 8, 23]):
    add_pogo_pin(f"pin_{i}", (x*MM, -36*MM, -10*MM), mat_gold)
    add_pogo_pin(f"pin_{i+4}", (x*MM, 36*MM, -10*MM), mat_gold)
for i, y in enumerate([-12, 12]):
    add_pogo_pin(f"pin_{i+8}", (-36*MM, y*MM, -10*MM), mat_gold)
    add_pogo_pin(f"pin_{i+10}", (36*MM, y*MM, -10*MM), mat_gold)

# Corner magnets
add_corner_magnets("mag", 27, 27, -10*MM, mat_silver)

# SMD components
scatter_smd_components("VO", 30, 30, -4.5, count_caps=6, count_res=4, mat_cap=mat_cap, mat_res=mat_res)

setup_camera()
setup_lighting()

out = os.path.join(os.path.dirname(__file__), "..", "modules", "refined", "voice.blend")
bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(out))
print(f"[Refine] Saved: {out}")
