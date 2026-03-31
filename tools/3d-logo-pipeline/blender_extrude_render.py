"""
Blender Python script: Import SVG, extrude to 3D, set up materials/lighting,
render turntable animation as PNG sequence, then compile to MP4.

Usage: blender --background --python blender_extrude_render.py -- <svg_path> <name> <render_dir>
"""
import bpy
import sys
import os
import subprocess
import math
from pathlib import Path


def get_args():
    """Get args after the '--' separator."""
    argv = sys.argv
    if "--" in argv:
        return argv[argv.index("--") + 1:]
    return []


def clear_scene():
    """Remove all objects from the scene."""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    # Remove orphan data
    for block in bpy.data.meshes:
        if block.users == 0:
            bpy.data.meshes.remove(block)
    for block in bpy.data.materials:
        if block.users == 0:
            bpy.data.materials.remove(block)
    for block in bpy.data.curves:
        if block.users == 0:
            bpy.data.curves.remove(block)


def import_svg(svg_path):
    """Import SVG file and return the imported objects."""
    before = set(bpy.data.objects)
    bpy.ops.import_curve.svg(filepath=svg_path)
    after = set(bpy.data.objects)
    new_objects = after - before
    return list(new_objects)


def process_svg_objects(objects, extrude_depth=0.15):
    """Merge all SVG curves into one curve object, then extrude.

    SVG import creates one curve object per <path>. Potrace SVGs have
    paths with sub-paths that define fill vs holes via winding order.
    We merge all splines into a single curve object so fill_mode='BOTH'
    correctly handles the holes, then extrude for 3D depth.
    """
    curve_objects = [o for o in objects if o.type == 'CURVE']
    empty_objects = [o for o in objects if o.type == 'EMPTY']

    if not curve_objects:
        print("  WARNING: No curve objects found in SVG import")
        return None

    # Join all curves into one curve object (preserves spline winding = holes)
    bpy.ops.object.select_all(action='DESELECT')
    for obj in curve_objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = curve_objects[0]
    bpy.ops.object.join()

    # Now we have a single curve object with all splines
    curve_obj = bpy.context.active_object
    curve_obj.data.fill_mode = 'BOTH'
    curve_obj.data.extrude = extrude_depth
    curve_obj.data.bevel_depth = 0.001  # Hair-thin bevel — elegant, not chunky

    print(f"  Curve splines: {len(curve_obj.data.splines)}")

    # Convert to mesh for proper rendering
    bpy.ops.object.convert(target='MESH')

    final = bpy.context.active_object

    # Remove empties left over from SVG import
    for obj in empty_objects:
        bpy.data.objects.remove(obj, do_unlink=True)

    print(f"  Final mesh verts: {len(final.data.vertices)}")
    return final


def center_and_scale(obj, target_size=2.0):
    """Center the object at origin and scale to target size."""
    # Set origin to geometry center
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')

    # Move to world origin
    obj.location = (0, 0, 0)

    # Scale to target size
    dims = obj.dimensions
    max_dim = max(dims.x, dims.y, dims.z)
    if max_dim > 0:
        scale_factor = target_size / max_dim
        obj.scale = (scale_factor, scale_factor, scale_factor)
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)


def create_metallic_material(name="LogoMetal"):
    """Create a polished silver metallic material."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links

    nodes.clear()

    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.location = (0, 0)
    bsdf.inputs['Base Color'].default_value = (0.85, 0.85, 0.88, 1.0)  # Silver
    bsdf.inputs['Metallic'].default_value = 0.95
    bsdf.inputs['Roughness'].default_value = 0.2
    bsdf.inputs['IOR'].default_value = 2.5

    output = nodes.new('ShaderNodeOutputMaterial')
    output.location = (300, 0)
    links.new(bsdf.outputs['BSDF'], output.inputs['Surface'])

    return mat


def apply_material(obj, mat):
    """Apply material to object, clearing any SVG-imported black fill materials first."""
    obj.data.materials.clear()
    obj.data.materials.append(mat)


def setup_lighting():
    """Set up 3-point lighting."""
    # Key light (strong, slightly warm)
    bpy.ops.object.light_add(type='AREA', location=(3, -2, 4))
    key = bpy.context.active_object
    key.name = "KeyLight"
    key.data.energy = 200
    key.data.color = (1.0, 0.95, 0.9)
    key.data.size = 3
    key.rotation_euler = (math.radians(45), 0, math.radians(30))

    # Fill light (softer, cooler)
    bpy.ops.object.light_add(type='AREA', location=(-3, -1, 2))
    fill = bpy.context.active_object
    fill.name = "FillLight"
    fill.data.energy = 80
    fill.data.color = (0.9, 0.92, 1.0)
    fill.data.size = 4
    fill.rotation_euler = (math.radians(60), 0, math.radians(-45))

    # Rim light (behind, strong edge)
    bpy.ops.object.light_add(type='AREA', location=(0, 3, 2))
    rim = bpy.context.active_object
    rim.name = "RimLight"
    rim.data.energy = 150
    rim.data.color = (1.0, 1.0, 1.0)
    rim.data.size = 2
    rim.rotation_euler = (math.radians(-30), 0, math.radians(180))


def setup_camera(logo_obj, padding=1.5):
    """Set up camera elevated and angled down at the spinning logo.

    SVG imports into XY plane, extrusion along Z. Z-axis rotation = spinning coin.
    Camera sits at ~35 degrees elevation, pulled back to frame the full logo face.
    You see the face spinning with a hint of the thin edge catching the light.
    """
    dims = logo_obj.dimensions
    d = max(dims.x, dims.y) * 2.2
    # 35-degree elevation: mostly looking at the face, slight top-down angle
    cam_x = 0
    cam_y = -d * 0.7   # pulled back in Y
    cam_z = d * 0.5    # elevated in Z

    bpy.ops.object.camera_add(location=(cam_x, cam_y, cam_z))
    cam = bpy.context.active_object
    cam.name = "TurntableCamera"

    # Aim at center
    bpy.ops.object.empty_add(location=(0, 0, 0))
    target = bpy.context.active_object
    target.name = "CameraTarget"

    cam_constraint = cam.constraints.new(type='TRACK_TO')
    cam_constraint.target = target
    cam_constraint.track_axis = 'TRACK_NEGATIVE_Z'
    cam_constraint.up_axis = 'UP_Y'

    # Set as active camera
    bpy.context.scene.camera = cam

    # Camera settings
    cam.data.lens = 50
    cam.data.clip_end = d * 4

    print(f"  Camera at Z={cam_z:.2f}, dims: ({dims.x:.2f}, {dims.y:.2f}, {dims.z:.2f})")
    return cam


def setup_background():
    """Set dark background."""
    world = bpy.data.worlds['World']
    world.use_nodes = True
    nodes = world.node_tree.nodes
    bg = nodes.get('Background')
    if bg:
        bg.inputs['Color'].default_value = (0.04, 0.04, 0.04, 1.0)  # #0A0A0A
        bg.inputs['Strength'].default_value = 1.0


def create_coin_body(radius=1.0, depth=0.12, vertices=128):
    """Create a gold coin disc standing upright, face toward -Y.

    A cylinder rotated 90 deg around X: circular face in XZ plane,
    depth along Y. Bevel on the rim gives the rounded coin edge.
    """
    bpy.ops.mesh.primitive_cylinder_add(
        radius=radius, depth=depth, vertices=vertices, location=(0, 0, 0)
    )
    coin = bpy.context.active_object
    coin.name = "CoinBody"

    # Stand upright — face toward -Y
    coin.rotation_euler = (math.radians(90), 0, 0)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)

    # Bevel the rim for a smooth coin edge
    bpy.ops.object.modifier_add(type='BEVEL')
    mod = coin.modifiers[-1]
    mod.width = depth * 0.25
    mod.segments = 4
    mod.limit_method = 'ANGLE'
    bpy.ops.object.modifier_apply(modifier=mod.name)

    bpy.ops.object.shade_smooth()
    print(f"  Coin: radius={radius}, depth={depth}")
    return coin


def place_logo_on_coin(svg_path, coin_radius=1.0, coin_depth=0.12, logo_fill=0.65):
    """Import SVG, extrude shallowly, scale to fit coin face, stand upright.

    Logo is scaled to logo_fill fraction of coin diameter and positioned
    so it sits raised on the coin front face (protruding toward camera).
    """
    objects = import_svg(svg_path)
    logo = process_svg_objects(objects, extrude_depth=0.04)

    # Center at origin
    bpy.ops.object.select_all(action='DESELECT')
    logo.select_set(True)
    bpy.context.view_layer.objects.active = logo
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    logo.location = (0, 0, 0)
    bpy.ops.object.transform_apply(location=True)

    # Scale logo to fill logo_fill of coin diameter
    dims = logo.dimensions
    max_face = max(dims.x, dims.y)   # XY plane (pre-upright)
    if max_face > 0:
        sf = (coin_radius * 2 * logo_fill) / max_face
        logo.scale = (sf, sf, sf)
        bpy.ops.object.transform_apply(scale=True)

    # Orient upright — face toward -Y, matching coin
    logo.rotation_euler = (math.radians(90), 0, 0)
    bpy.ops.object.transform_apply(rotation=True)

    # After upright rotation, logo.dimensions.y is the extrusion depth in world space.
    # Clamp it to 4% of coin radius — just enough to catch light, not a spike.
    target_raise = coin_radius * 0.04
    current_depth = logo.dimensions.y
    if current_depth > 0:
        logo.scale.y *= target_raise / current_depth
        bpy.ops.object.transform_apply(scale=True)

    # Position: back face of logo flush with coin front face (-Y side of coin)
    logo.location.y = -(coin_depth / 2)
    bpy.ops.object.transform_apply(location=True)

    bpy.ops.object.shade_smooth()
    print(f"  Logo placed: fill={logo_fill}, raise={target_raise:.4f}")
    return logo


def orient_upright(obj):
    """Stand the logo upright so its face points toward the camera (-Y).

    SVG imports flat in XY plane with face toward +Z.
    Rotating +90 deg around X tips it upright: face toward -Y, height along Z.
    Transform is applied so euler resets to (0,0,0) for clean spin animation.
    """
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    obj.rotation_euler = (math.radians(90), 0, 0)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    print("  Logo oriented upright (face toward -Y)")


def set_depth_ratio(obj, ratio=1/10):
    """Scale the thin dimension (Y after upright) to ratio of the face height (Z).

    After orient_upright: X=width, Z=height, Y=thin extrusion depth.
    Scales Y so depth = ratio * Z.
    """
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj

    dims = obj.dimensions
    face_height = dims.z          # Z is the standing height
    current_depth = dims.y        # Y is the thin extrusion after upright
    if current_depth > 0 and face_height > 0:
        target_depth = face_height * ratio
        obj.scale.y *= target_depth / current_depth
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
        print(f"  Depth set to {target_depth:.4f} ({ratio:.3f} × height {face_height:.4f})")


def setup_fixed_camera(logo_obj):
    """Fixed camera slightly below the coin, tilted up ~15 deg — matches reference.

    Logo faces -Y. Camera at (0, -d, -d*0.25): below center, looking up.
    This gives the iconic gold coin presentation angle from the 99designs reference.
    """
    dims = logo_obj.dimensions
    d = max(dims.x, dims.z) * 2.2
    elev = -d * 0.25    # below center — camera looks up at the coin face

    bpy.ops.object.camera_add(location=(0, -d, elev))
    cam = bpy.context.active_object
    cam.name = "FrontCamera"

    bpy.ops.object.empty_add(location=(0, 0, 0))
    target = bpy.context.active_object
    target.name = "CameraTarget"

    constraint = cam.constraints.new(type='TRACK_TO')
    constraint.target = target
    constraint.track_axis = 'TRACK_NEGATIVE_Z'
    constraint.up_axis = 'UP_Y'

    bpy.context.scene.camera = cam
    cam.data.lens = 50
    cam.data.clip_end = d * 6
    print(f"  Camera at Y={-d:.2f}, elevation={elev:.2f}")
    return cam


def setup_globe_spin(obj, frames=240):
    """Logo spins around its vertical (Z) axis — globe/top spin.

    Object is upright (face toward -Y). Rotating around Z makes the face
    sweep left→edge→back→edge→face. One keyframe per frame: no 360=0 wrapping bug.
    """
    scene = bpy.context.scene
    scene.frame_start = 1
    scene.frame_end = frames

    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj

    for i in range(frames + 1):
        angle = 2 * math.pi * i / frames
        obj.rotation_euler = (0, 0, angle)
        obj.keyframe_insert(data_path="rotation_euler", frame=i + 1)

    # Linear interpolation
    if obj.animation_data and obj.animation_data.action:
        try:
            for fcurve in obj.animation_data.action.fcurves:
                for kp in fcurve.keyframe_points:
                    kp.interpolation = 'LINEAR'
        except Exception as e:
            print(f"  Warning: {e}")

    print(f"  Globe spin: {frames} frames baked around Z axis")


def setup_camera_orbit(logo_obj, frames=240):
    """Camera orbits around the X axis in the YZ plane, always pointing at origin.

    Root cause of previous no-motion bug: two keyframes at 0deg and 360deg are
    the same angle — Blender interpolates between identical values = static.
    Fix: bake one position keyframe per frame using explicit trig. No wrapping possible.

    Camera starts elevated in front (face visible), orbits over the top,
    passes behind, swings below, returns to start — full 360 around X.
    """
    dims = logo_obj.dimensions
    radius = max(dims.x, dims.y) * 2.0

    # Start angle: ~60 deg up from horizontal front = face clearly visible at frame 1
    start_angle = math.radians(60)

    init_y = -radius * math.cos(start_angle)
    init_z = radius * math.sin(start_angle)

    bpy.ops.object.camera_add(location=(0, init_y, init_z))
    cam = bpy.context.active_object
    cam.name = "OrbitCamera"

    # Empty at origin — camera always tracks this
    bpy.ops.object.empty_add(location=(0, 0, 0))
    target = bpy.context.active_object
    target.name = "CameraTarget"

    constraint = cam.constraints.new(type='TRACK_TO')
    constraint.target = target
    constraint.track_axis = 'TRACK_NEGATIVE_Z'
    constraint.up_axis = 'UP_Y'

    bpy.context.scene.camera = cam
    cam.data.lens = 50
    cam.data.clip_end = radius * 6

    scene = bpy.context.scene
    scene.frame_start = 1
    scene.frame_end = frames

    # Bake one position keyframe per frame — bulletproof, no 360=0 wrapping
    # Orbit around Y axis: camera moves in XZ plane (horizontal spin, not tumble)
    for i in range(frames + 1):
        angle = start_angle + 2 * math.pi * i / frames
        cam.location = (
            radius * math.sin(angle),    # XZ plane: horizontal orbit
            -radius * math.cos(angle),
            radius * 0.4,                # fixed elevation so face stays visible
        )
        cam.keyframe_insert(data_path="location", frame=i + 1)

    # Linear interpolation between position keyframes
    if cam.animation_data and cam.animation_data.action:
        try:
            for fcurve in cam.animation_data.action.fcurves:
                for kp in fcurve.keyframe_points:
                    kp.interpolation = 'LINEAR'
        except Exception as e:
            print(f"  Warning: {e}")

    print(f"  Camera orbit: radius={radius:.2f}, start_angle=60deg, {frames+1} keyframes baked")
    return cam


def setup_render(render_dir, name, frames=120, resolution=(1920, 1080)):
    """Configure render settings."""
    scene = bpy.context.scene
    scene.render.engine = 'BLENDER_EEVEE'
    scene.render.resolution_x = resolution[0]
    scene.render.resolution_y = resolution[1]
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = False
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'

    # Output path for PNG sequence
    seq_dir = os.path.join(render_dir, f"{name}_seq")
    os.makedirs(seq_dir, exist_ok=True)
    scene.render.filepath = os.path.join(seq_dir, f"{name}_")

    # EEVEE settings for quality
    scene.eevee.taa_render_samples = 64

    return seq_dir


def render_animation():
    """Render the full animation."""
    bpy.ops.render.render(animation=True)


def compile_to_mp4(seq_dir, name, render_dir, frames=120, fps=30):
    """Use ffmpeg to compile PNG sequence into MP4."""
    input_pattern = os.path.join(seq_dir, f"{name}_*.png")
    # Find the actual frame numbering pattern
    files = sorted(Path(seq_dir).glob(f"{name}_*.png"))
    if not files:
        print(f"ERROR: No PNG files found in {seq_dir}")
        return False

    # Blender typically outputs name_0001.png format
    output_mp4 = os.path.join(render_dir, f"{name}-turntable.mp4")

    cmd = [
        "ffmpeg", "-y",
        "-framerate", str(fps),
        "-i", os.path.join(seq_dir, f"{name}_%04d.png"),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", "18",
        "-preset", "medium",
        output_mp4,
    ]
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"ffmpeg error: {result.stderr}")
        return False
    print(f"Created: {output_mp4}")
    return True


def main():
    args = get_args()
    if len(args) < 3:
        print("Usage: blender --background --python script.py -- <svg_path> <name> <render_dir>")
        sys.exit(1)

    svg_path = args[0]
    name = args[1]
    render_dir = args[2]
    frames = 240   # 10 seconds @ 24fps — slow Mario coin rotation
    fps = 24

    print(f"\n{'='*60}")
    print(f"Processing: {name}")
    print(f"SVG: {svg_path}")
    print(f"Render dir: {render_dir}")
    print(f"{'='*60}")

    # 1. Clear scene
    print("Clearing scene...")
    clear_scene()

    # 2. Import SVG logo
    print("Importing SVG...")
    objects = import_svg(svg_path)

    # 3. Extrude and join
    print("Processing geometry...")
    logo = process_svg_objects(objects, extrude_depth=0.12)

    # 4. Orient upright — face toward camera
    print("Orienting upright...")
    orient_upright(logo)

    # 5. Center and scale
    print("Centering and scaling...")
    center_and_scale(logo, target_size=2.0)

    # 6. Depth = 1/10 of face height
    print("Setting depth...")
    set_depth_ratio(logo, ratio=1/10)

    # 7. Metallic material
    print("Applying material...")
    mat = create_metallic_material()
    apply_material(logo, mat)

    # 8. Smooth shading
    bpy.ops.object.select_all(action='DESELECT')
    logo.select_set(True)
    bpy.context.view_layer.objects.active = logo
    bpy.ops.object.shade_smooth()

    # 9. Lighting
    print("Setting up lighting...")
    setup_lighting()

    # 10. Background
    print("Setting dark background...")
    setup_background()

    # 11. Camera
    print("Setting up camera...")
    setup_fixed_camera(logo)

    # 12. Globe spin — baked per-frame Z rotation
    print("Setting up globe spin...")
    setup_globe_spin(logo, frames=frames)

    # 10. Render
    print("Configuring render...")
    seq_dir = setup_render(render_dir, name, frames=frames)

    print(f"Rendering {frames} frames...")
    render_animation()

    print("Compiling to MP4...")
    compile_to_mp4(seq_dir, name, render_dir, frames=frames, fps=fps)

    print(f"\nDONE: {name}")


if __name__ == "__main__":
    main()
