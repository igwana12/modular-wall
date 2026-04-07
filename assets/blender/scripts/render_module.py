#!/usr/bin/env python3
"""
Blender headless render script for mosAIc modules.
Run: blender -b <blend_file> --python render_module.py -- <texture_path> <output_path>

Applies an interface texture to the LCD/screen material, then renders with EEVEE.
"""

import bpy
import sys
import os

def get_args():
    """Get arguments after '--' from command line."""
    argv = sys.argv
    if "--" in argv:
        return argv[argv.index("--") + 1:]
    return []

def find_screen_material():
    """Find the screen/LCD emission material."""
    candidates = ["mat_screen_emission", "Screen", "screen_emission", "LCD", "display"]
    for name in candidates:
        if name in bpy.data.materials:
            return bpy.data.materials[name]
    # Fallback: find any material with 'screen' or 'lcd' in name
    for mat in bpy.data.materials:
        if any(kw in mat.name.lower() for kw in ["screen", "lcd", "display", "emission"]):
            return mat
    return None

def apply_texture_to_material(mat, texture_path):
    """Replace the emission color/texture of a material with our interface texture."""
    if not mat.use_nodes:
        mat.use_nodes = True

    tree = mat.node_tree
    nodes = tree.nodes
    links = tree.links

    # Load the texture image
    img = bpy.data.images.load(texture_path)

    # Find or create image texture node
    tex_node = None
    for node in nodes:
        if node.type == 'TEX_IMAGE':
            tex_node = node
            break

    if not tex_node:
        tex_node = nodes.new('ShaderNodeTexImage')
        tex_node.location = (-400, 300)

    tex_node.image = img
    tex_node.interpolation = 'Smart'

    # Find the principled BSDF or emission node
    output_node = None
    principled = None
    emission = None
    for node in nodes:
        if node.type == 'OUTPUT_MATERIAL':
            output_node = node
        elif node.type == 'BSDF_PRINCIPLED':
            principled = node
        elif node.type == 'EMISSION':
            emission = node

    if principled:
        # Connect texture to emission color and base color
        links.new(tex_node.outputs['Color'], principled.inputs['Emission Color'])
        principled.inputs['Emission Strength'].default_value = 3.0
        links.new(tex_node.outputs['Color'], principled.inputs['Base Color'])
    elif emission:
        links.new(tex_node.outputs['Color'], emission.inputs['Color'])
        emission.inputs['Strength'].default_value = 3.0
    elif output_node:
        # Direct connection: create emission shader
        emit = nodes.new('ShaderNodeEmission')
        emit.location = (-100, 300)
        emit.inputs['Strength'].default_value = 3.0
        links.new(tex_node.outputs['Color'], emit.inputs['Color'])
        links.new(emit.outputs['Emission'], output_node.inputs['Surface'])

def apply_minimal_style():
    """Apply Minimal (Cyberpunk) material overrides to housing/acrylic/pins."""
    DARK_HOUSING = (10/255, 10/255, 13/255, 1.0)  # RGB(10,10,13)
    GOLD_PIN = (212/255, 176/255, 56/255, 1.0)
    SILVER_MAG = (192/255, 192/255, 200/255, 1.0)
    PCB_GREEN = (5/255, 46/255, 13/255, 1.0)

    for mat in bpy.data.materials:
        name_lower = mat.name.lower()
        if not mat.use_nodes:
            continue
        principled = None
        for node in mat.node_tree.nodes:
            if node.type == 'BSDF_PRINCIPLED':
                principled = node
                break
        if not principled:
            continue

        # Housing → dark matte black
        if any(kw in name_lower for kw in ["housing", "bezel", "case", "body", "shell", "mat_housing"]):
            principled.inputs['Base Color'].default_value = DARK_HOUSING
            principled.inputs['Roughness'].default_value = 0.85
            principled.inputs['Metallic'].default_value = 0.1

        # Gold pins
        elif any(kw in name_lower for kw in ["gold", "pin", "pogo"]):
            principled.inputs['Base Color'].default_value = GOLD_PIN
            principled.inputs['Roughness'].default_value = 0.2
            principled.inputs['Metallic'].default_value = 0.95

        # Silver/magnets
        elif any(kw in name_lower for kw in ["silver", "mag", "metal"]):
            principled.inputs['Base Color'].default_value = SILVER_MAG
            principled.inputs['Roughness'].default_value = 0.3
            principled.inputs['Metallic'].default_value = 0.9

        # PCB
        elif any(kw in name_lower for kw in ["pcb", "board"]):
            principled.inputs['Base Color'].default_value = PCB_GREEN
            principled.inputs['Roughness'].default_value = 0.6
            principled.inputs['Metallic'].default_value = 0.3

        # Acrylic → smoke tint, semi-transparent
        elif any(kw in name_lower for kw in ["acrylic", "glass", "transparent", "diffus"]):
            principled.inputs['Base Color'].default_value = (0.15, 0.15, 0.18, 1.0)
            principled.inputs['Roughness'].default_value = 0.1
            principled.inputs['Alpha'].default_value = 0.7
            mat.blend_method = 'BLEND' if hasattr(mat, 'blend_method') else None


def setup_lighting():
    """Set up dramatic 3-point studio lighting per IMAGE-GENERATION-REFERENCE spec."""
    # Remove existing lights
    for obj in list(bpy.data.objects):
        if obj.type == 'LIGHT':
            bpy.data.objects.remove(obj, do_unlink=True)

    scene = bpy.context.scene

    # Key light — warm white, upper-left
    key = bpy.data.lights.new("Key", 'AREA')
    key.energy = 30
    key.color = (1.0, 0.95, 0.9)
    key.size = 0.3
    key_obj = bpy.data.objects.new("Key", key)
    key_obj.location = (0.15, -0.15, 0.25)
    key_obj.rotation_euler = (0.8, 0.2, 0.3)
    scene.collection.objects.link(key_obj)

    # Fill light — cool, lower-right
    fill = bpy.data.lights.new("Fill", 'AREA')
    fill.energy = 10
    fill.color = (0.8, 0.85, 1.0)
    fill.size = 0.4
    fill_obj = bpy.data.objects.new("Fill", fill)
    fill_obj.location = (-0.2, 0.1, 0.1)
    fill_obj.rotation_euler = (1.2, -0.3, -0.2)
    scene.collection.objects.link(fill_obj)

    # Accent/rim light — teal, from behind
    accent = bpy.data.lights.new("Accent", 'POINT')
    accent.energy = 8
    accent.color = (0.0, 0.83, 0.67)  # Teal
    accent_obj = bpy.data.objects.new("Accent", accent)
    accent_obj.location = (0.05, 0.15, 0.08)
    scene.collection.objects.link(accent_obj)


def setup_render(output_path):
    """Configure EEVEE render settings for product shot quality."""
    scene = bpy.context.scene
    render = scene.render

    # Engine
    render.engine = 'BLENDER_EEVEE'

    # Resolution
    render.resolution_x = 1920
    render.resolution_y = 1080
    render.resolution_percentage = 100

    # Output
    render.filepath = output_path
    render.image_settings.file_format = 'PNG'
    render.image_settings.color_mode = 'RGBA'
    render.image_settings.compression = 15

    # Film — NOT transparent, use dark background
    render.film_transparent = False

    # EEVEE settings
    eevee = scene.eevee
    eevee.taa_render_samples = 128

    # World — dark background #0D0D1A
    if scene.world is None:
        scene.world = bpy.data.worlds.new("World")
    scene.world.use_nodes = True
    bg = scene.world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (13/255, 13/255, 26/255, 1.0)
        bg.inputs[1].default_value = 0.15

def main():
    args = get_args()
    if len(args) < 2:
        print("Usage: blender -b file.blend --python render_module.py -- <texture.png> <output.png>")
        sys.exit(1)

    texture_path = os.path.abspath(args[0])
    output_path = os.path.abspath(args[1])

    print(f"[mosAIc Render] Texture: {texture_path}")
    print(f"[mosAIc Render] Output: {output_path}")

    # Apply Minimal (Cyberpunk) material style
    print("[mosAIc Render] Applying Minimal style materials...")
    apply_minimal_style()

    # Setup dramatic lighting
    print("[mosAIc Render] Setting up studio lighting...")
    setup_lighting()

    # Find and apply interface texture to screen
    mat = find_screen_material()
    if mat:
        print(f"[mosAIc Render] Applying texture to material: {mat.name}")
        apply_texture_to_material(mat, texture_path)
    else:
        print("[mosAIc Render] WARNING: No screen material found — rendering without texture")

    # Setup render settings
    setup_render(output_path)

    # Render
    print("[mosAIc Render] Rendering...")
    bpy.ops.render.render(write_still=True)
    print(f"[mosAIc Render] Saved: {output_path}")

if __name__ == "__main__":
    main()
