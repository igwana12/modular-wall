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

    # Film
    render.film_transparent = True

    # EEVEE settings
    eevee = scene.eevee
    eevee.taa_render_samples = 64

    # World — dark background
    if scene.world is None:
        scene.world = bpy.data.worlds.new("World")
    scene.world.use_nodes = True
    bg = scene.world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (0.02, 0.02, 0.04, 1.0)
        bg.inputs[1].default_value = 0.3

def main():
    args = get_args()
    if len(args) < 2:
        print("Usage: blender -b file.blend --python render_module.py -- <texture.png> <output.png>")
        sys.exit(1)

    texture_path = os.path.abspath(args[0])
    output_path = os.path.abspath(args[1])

    print(f"[mosAIc Render] Texture: {texture_path}")
    print(f"[mosAIc Render] Output: {output_path}")

    # Find and apply texture
    mat = find_screen_material()
    if mat:
        print(f"[mosAIc Render] Applying texture to material: {mat.name}")
        apply_texture_to_material(mat, texture_path)
    else:
        print("[mosAIc Render] WARNING: No screen material found — rendering without texture")

    # Setup render
    setup_render(output_path)

    # Render
    print("[mosAIc Render] Rendering...")
    bpy.ops.render.render(write_still=True)
    print(f"[mosAIc Render] Saved: {output_path}")

if __name__ == "__main__":
    main()
