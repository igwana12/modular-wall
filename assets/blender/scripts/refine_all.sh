#!/bin/bash
# Run all 7 refinement scripts to generate refined .blend files
BLENDER="/opt/homebrew/bin/blender"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BASE="$SCRIPT_DIR/../modules"

echo "═══════════════════════════════════════"
echo "  Refining 7 remaining modules"
echo "═══════════════════════════════════════"

# Each script creates geometry from scratch (clears scene), so we use any .blend as base
BLANK="$BASE/screen-s.blend"

run_refine() {
    local script="$1"
    local name="$2"
    echo ""
    echo "─── $name ───"
    "$BLENDER" -b "$BLANK" --python "$script" 2>&1 | grep -E "^\[Refine\]|Error|Traceback"
}

run_refine "$SCRIPT_DIR/refine_screen_m.py" "Screen-M (144x94x22mm)"
run_refine "$SCRIPT_DIR/refine_voice.py" "Voice (71x71x23mm)"
run_refine "$SCRIPT_DIR/refine_sense.py" "Sense (44x44x16mm)"
run_refine "$SCRIPT_DIR/refine_brick.py" "Brick (71x71x20mm)"
run_refine "$SCRIPT_DIR/refine_holo.py" "Holo (140x140x40mm)"
run_refine "$SCRIPT_DIR/refine_mirror.py" "Mirror (Ø120x28mm)"
run_refine "$SCRIPT_DIR/refine_eink.py" "eInk (180x120x15mm)"

echo ""
echo "═══════════════════════════════════════"
REFINED=$(ls "$BASE/refined/"*.blend 2>/dev/null | wc -l | tr -d ' ')
echo "  Complete! $REFINED refined models in $BASE/refined/"
echo "═══════════════════════════════════════"
