"""Refine Brick module: 71x71x20mm, structural filler with magnets + cable passthrough."""
import bpy, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from refine_common import *

clear_scene()

mat_housing = make_material("mat_housing", COL_HOUSING, roughness=0.9, metallic=0.1)
mat_silver = make_material("mat_silver", COL_SILVER, roughness=0.3, metallic=0.9)
mat_gold = make_material("mat_gold_pin", COL_GOLD, roughness=0.2, metallic=0.95)
mat_rib = make_material("mat_rib", srgb_to_linear(18, 18, 22), roughness=0.8, metallic=0.2)

# Housing: 71x71x20mm
add_box("housing", (0, 0, 0), (71*MM, 71*MM, 20*MM), mat_housing)

# Cable passthrough channel: 10x60x8mm through center
add_box("BR_Passthrough", (0, 0, 2*MM), (10*MM, 60*MM, 8*MM), mat_rib)

# Structural ribs (internal)
for i, x in enumerate([-20, 0, 20]):
    add_box(f"BR_Rib_{i}", (x*MM, 0, -2*MM), (2*MM, 60*MM, 12*MM), mat_rib)

# Top face plate
add_box("BR_TopPlate", (0, 0, 9.5*MM), (69*MM, 69*MM, 1.5*MM), mat_housing)

# Corner magnets
add_corner_magnets("mag", 27, 27, -8.5*MM, mat_silver)

# Pogo pass-through pins (optional, 4 bottom)
for i, x in enumerate([-12, -4, 4, 12]):
    add_pogo_pin(f"pin_{i}", (x*MM, -36*MM, -8*MM), mat_gold)
    add_pogo_pin(f"pin_{i+4}", (x*MM, 36*MM, -8*MM), mat_gold)

# Mounting rail slot
add_box("BR_Rail", (0, 0, -9*MM), (60*MM, 4*MM, 3*MM), mat_silver)

setup_camera()
setup_lighting()

out = os.path.join(os.path.dirname(__file__), "..", "modules", "refined", "brick.blend")
bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(out))
print(f"[Refine] Saved: {out}")
