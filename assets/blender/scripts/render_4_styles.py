#!/usr/bin/env python3
"""
Render a module in all 4 casing styles from the 4-styles blend file.
Usage: blender -b modular-wall-casing-4-styles.blend --python render_4_styles.py -- <texture.png> <output_dir>

Renders 4 images: style-1-minimal.png, style-2-rounded.png, style-3-baroque.png, style-4-wood.png
"""

import bpy
import sys
import os
import math

STYLES = [
    {"name": "minimal", "collection": "Style_1_Minimal", "display": "Display_LCD"},
    {"name": "rounded", "collection": "Style_2_Rounded", "display": "Display_Rounded"},
    {"name": "baroque", "collection": "Style_3_Baroque", "display": "Display_Baroque"},
    {"name": "wood", "collection": "Style_4_Wood", "display": "Display_Wood"},
]

def get_args():
    argv = sys.argv
    if "--" in argv:
        return argv[argv.index("--") + 1:]
    return []

def hide_all_styles():
    """Hide all style collections."""
    for style in STYLES:
        col = bpy.data.collections.get(style["collection"])
        if col:
            col.hide_render = True
            col.hide_viewport = True

def show_style(style_info):
    """Show only one style collection."""
    hide_all_styles()
    col = bpy.data.collections.get(style_info["collection"])
    if col:
        col.hide_render = False
        col.hide_viewport = False

def apply_texture_to_display(display_name, texture_path):
    """Apply interface texture to the display object's material."""
    obj = bpy.data.objects.get(display_name)
    if not obj or not obj.data.materials:
        print(f"  WARNING: Display object '{display_name}' not found or has no materials")
        return

    mat = obj.data.materials[0]
    if not mat.use_nodes:
        mat.use_nodes = True

    tree = mat.node_tree
    nodes = tree.nodes
    links = tree.links

    img = bpy.data.images.load(texture_path)

    tex_node = None
    for node in nodes:
        if node.type == 'TEX_IMAGE':
            tex_node = node
            break
    if not tex_node:
        tex_node = nodes.new('ShaderNodeTexImage')
        tex_node.location = (-400, 300)
    tex_node.image = img

    for node in nodes:
        if node.type == 'BSDF_PRINCIPLED':
            links.new(tex_node.outputs['Color'], node.inputs['Emission Color'])
            node.inputs['Emission Strength'].default_value = 3.0
            links.new(tex_node.outputs['Color'], node.inputs['Base Color'])
            break
        elif node.type == 'EMISSION':
            links.new(tex_node.outputs['Color'], node.inputs['Color'])
            node.inputs['Strength'].default_value = 3.0
            break

def setup_render(output_path):
    scene = bpy.context.scene
    render = scene.render
    render.engine = 'BLENDER_EEVEE'
    render.resolution_x = 1920
    render.resolution_y = 1080
    render.resolution_percentage = 100
    render.filepath = output_path
    render.image_settings.file_format = 'PNG'
    render.image_settings.color_mode = 'RGB'
    render.image_settings.compression = 15
    render.film_transparent = False

    eevee = scene.eevee
    eevee.taa_render_samples = 128

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
        print("Usage: blender -b 4-styles.blend --python render_4_styles.py -- <texture.png> <output_dir>")
        sys.exit(1)

    texture_path = os.path.abspath(args[0])
    output_dir = os.path.abspath(args[1])
    os.makedirs(output_dir, exist_ok=True)

    print(f"[mosAIc 4-Styles] Texture: {texture_path}")
    print(f"[mosAIc 4-Styles] Output dir: {output_dir}")

    for style in STYLES:
        print(f"\n[mosAIc 4-Styles] Rendering style: {style['name']}...")
        show_style(style)
        apply_texture_to_display(style["display"], texture_path)
        output_path = os.path.join(output_dir, f"screen-s-style-{style['name']}.png")
        setup_render(output_path)
        bpy.ops.render.render(write_still=True)
        print(f"  Saved: {output_path}")

    print(f"\n[mosAIc 4-Styles] Complete! 4 style renders saved.")

if __name__ == "__main__":
    main()
