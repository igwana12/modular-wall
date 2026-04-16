"""
Common utilities for mosAIc module refinement scripts.
All dimensions in meters (Blender units). 1mm = 0.001m.
"""

import bpy
import math

# ─── Material Colors (linear sRGB) ──────────────────────────────
# Convert from sRGB to linear: pow(x/255, 2.2)
def srgb_to_linear(r, g, b):
    return (pow(r/255, 2.2), pow(g/255, 2.2), pow(b/255, 2.2), 1.0)

COL_HOUSING = srgb_to_linear(10, 10, 13)
COL_PCB = srgb_to_linear(5, 46, 13)
COL_GOLD = srgb_to_linear(212, 176, 56)
COL_SILVER = srgb_to_linear(192, 192, 200)
COL_IC = srgb_to_linear(15, 15, 18)
COL_CAPACITOR = srgb_to_linear(194, 153, 107)
COL_RESISTOR = srgb_to_linear(20, 15, 12)
COL_ACRYLIC = srgb_to_linear(40, 40, 46)
COL_SCREEN = srgb_to_linear(0, 212, 170)
COL_LED_TEAL = srgb_to_linear(0, 212, 170)
COL_LED_AMBER = srgb_to_linear(255, 179, 71)
COL_USB = srgb_to_linear(192, 192, 200)
COL_WHITE_LED = srgb_to_linear(240, 240, 245)

MM = 0.001  # 1mm in Blender units


def clear_scene():
    """Remove all existing objects from the scene."""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    for col in bpy.data.collections:
        bpy.data.collections.remove(col)


def make_material(name, color, roughness=0.5, metallic=0.0, emission_color=None, emission_strength=0.0, alpha=1.0):
    """Create a PBR material with Principled BSDF."""
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs['Base Color'].default_value = color
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['Metallic'].default_value = metallic
    if emission_color:
        bsdf.inputs['Emission Color'].default_value = emission_color
        bsdf.inputs['Emission Strength'].default_value = emission_strength
    if alpha < 1.0:
        bsdf.inputs['Alpha'].default_value = alpha
        mat.blend_method = 'BLEND' if hasattr(mat, 'blend_method') else None
    return mat


def add_box(name, location, dimensions, material):
    """Add a box mesh with given dimensions (x,y,z in meters) and material."""
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (dimensions[0]/2, dimensions[1]/2, dimensions[2]/2)
    bpy.ops.object.transform_apply(scale=True)
    obj.data.materials.append(material)
    return obj


def add_cylinder(name, location, radius, depth, material, segments=32):
    """Add a cylinder mesh."""
    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=depth, location=location, vertices=segments)
    obj = bpy.context.active_object
    obj.name = name
    obj.data.materials.append(material)
    return obj


def add_circle_disc(name, location, radius, material, segments=64):
    """Add a flat circular disc (very thin cylinder)."""
    return add_cylinder(name, location, radius, 0.5*MM, material, segments)


def add_pogo_pin(name, location, material):
    """Add a standard pogo pin (1.5mm dia, 2mm tall)."""
    return add_cylinder(name, location, 0.75*MM, 2*MM, material, 12)


def add_magnet(name, location, material):
    """Add a standard magnet (10mm dia, 3mm tall)."""
    return add_cylinder(name, location, 5*MM, 3*MM, material, 24)


def add_smd_cap(name, location, material):
    """Add SMD capacitor (2.0 x 1.2 x 1.0mm)."""
    return add_box(name, location, (2*MM, 1.2*MM, 1*MM), material)


def add_smd_resistor(name, location, material):
    """Add SMD resistor (1.6 x 0.8 x 0.6mm)."""
    return add_box(name, location, (1.6*MM, 0.8*MM, 0.6*MM), material)


def add_ic_chip(name, location, size_mm, material):
    """Add an IC chip (size_mm is (x,y,z) in mm)."""
    return add_box(name, location, (size_mm[0]*MM, size_mm[1]*MM, size_mm[2]*MM), material)


def add_usb_c(name, location, material):
    """Add USB-C connector (8.9 x 3.3 x 2.5mm)."""
    return add_box(name, location, (8.9*MM, 3.3*MM, 2.5*MM), material)


def add_pogo_row(prefix, y, x_positions, z, material):
    """Add a row of pogo pins at given x positions."""
    pins = []
    for i, x in enumerate(x_positions):
        pins.append(add_pogo_pin(f"{prefix}_{i}", (x*MM, y*MM, z*MM), material))
    return pins


def add_corner_magnets(prefix, half_w, half_h, z, material):
    """Add 4 magnets at corners."""
    positions = [(-half_w, -half_h), (half_w, -half_h), (-half_w, half_h), (half_w, half_h)]
    magnets = []
    for i, (x, y) in enumerate(positions):
        magnets.append(add_magnet(f"{prefix}_{i}", (x*MM, y*MM, z*MM), material))
    return magnets


def setup_camera(location=(0.325, -0.325, 0.244), target=(0, 0, 0.01)):
    """Add and aim a camera."""
    bpy.ops.object.camera_add(location=location)
    cam = bpy.context.active_object
    cam.name = "Camera"
    # Point at target
    direction = [target[i] - location[i] for i in range(3)]
    import mathutils
    rot = mathutils.Vector(direction).to_track_quat('-Z', 'Y')
    cam.rotation_euler = rot.to_euler()
    cam.data.lens = 85
    bpy.context.scene.camera = cam
    return cam


def setup_lighting():
    """Add 3-point studio lighting."""
    # Key light — warm white, upper-left
    bpy.ops.object.light_add(type='AREA', location=(0.15, -0.15, 0.25))
    key = bpy.context.active_object
    key.name = "Key"
    key.data.energy = 30
    key.data.color = (1.0, 0.95, 0.9)
    key.data.size = 0.3

    # Fill light — cool, lower-right
    bpy.ops.object.light_add(type='AREA', location=(-0.2, 0.1, 0.1))
    fill = bpy.context.active_object
    fill.name = "Fill"
    fill.data.energy = 10
    fill.data.color = (0.8, 0.85, 1.0)
    fill.data.size = 0.4

    # Accent — teal rim from behind
    bpy.ops.object.light_add(type='POINT', location=(0.05, 0.15, 0.08))
    accent = bpy.context.active_object
    accent.name = "Accent"
    accent.data.energy = 8
    accent.data.color = (0.0, 0.83, 0.67)


def setup_render(output_path):
    """Configure EEVEE render at 1920x1080."""
    scene = bpy.context.scene
    scene.render.engine = 'BLENDER_EEVEE'
    scene.render.resolution_x = 1920
    scene.render.resolution_y = 1080
    scene.render.film_transparent = False
    scene.eevee.taa_render_samples = 128

    if scene.world is None:
        scene.world = bpy.data.worlds.new("World")
    scene.world.use_nodes = True
    bg = scene.world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (0.005, 0.005, 0.01, 1.0)
        bg.inputs[1].default_value = 0.15

    scene.render.filepath = output_path
    scene.render.image_settings.file_format = 'PNG'


def scatter_smd_components(prefix, pcb_half_w, pcb_half_h, pcb_z, count_caps=8, count_res=5, mat_cap=None, mat_res=None):
    """Scatter SMD caps and resistors across a PCB area."""
    import random
    random.seed(42)
    components = []
    for i in range(count_caps):
        x = random.uniform(-pcb_half_w*0.8, pcb_half_w*0.8)
        y = random.uniform(-pcb_half_h*0.8, pcb_half_h*0.8)
        components.append(add_smd_cap(f"{prefix}_Cap_{i}", (x*MM, y*MM, (pcb_z+1)*MM), mat_cap))
    for i in range(count_res):
        x = random.uniform(-pcb_half_w*0.8, pcb_half_w*0.8)
        y = random.uniform(-pcb_half_h*0.8, pcb_half_h*0.8)
        components.append(add_smd_resistor(f"{prefix}_Res_{i}", (x*MM, y*MM, (pcb_z+0.5)*MM), mat_res))
    return components
