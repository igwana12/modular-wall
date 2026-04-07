#!/bin/bash
# Batch render all mosAIc module interfaces
# Usage: bash batch_render.sh

BLENDER="/opt/homebrew/bin/blender"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
RENDER_SCRIPT="$SCRIPT_DIR/render_module.py"
BASE_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
TEXTURES="$BASE_DIR/images/textures"
OUTPUT="$BASE_DIR/images/renders"
REFINED="$BASE_DIR/blender/modules/refined"
BASIC="$BASE_DIR/blender/modules"

mkdir -p "$OUTPUT"

render() {
    local blend="$1"
    local texture="$2"
    local output="$3"

    if [ ! -f "$blend" ]; then
        echo "  SKIP (no blend): $blend"
        return
    fi
    if [ ! -f "$texture" ]; then
        echo "  SKIP (no texture): $texture"
        return
    fi

    echo "  Rendering: $(basename "$output")..."
    "$BLENDER" -b "$blend" --python "$RENDER_SCRIPT" -- "$texture" "$output" 2>&1 | grep -E "Saved:|Error"
}

echo "═══════════════════════════════════════"
echo "  mosAIc Module Render Pipeline"
echo "  36 renders across 12 modules"
echo "═══════════════════════════════════════"

# Screen-S (refined)
echo ""
echo "─── Screen-S (3 interfaces) ───"
BLEND_SS="$REFINED/screen-s.blend"
render "$BLEND_SS" "$TEXTURES/screen-s-weather-station.png" "$OUTPUT/screen-s-weather-station.png"
render "$BLEND_SS" "$TEXTURES/screen-s-now-playing.png" "$OUTPUT/screen-s-now-playing.png"
render "$BLEND_SS" "$TEXTURES/screen-s-week-view.png" "$OUTPUT/screen-s-week-view.png"

# Screen-M (basic)
echo ""
echo "─── Screen-M (3 interfaces) ───"
BLEND_SM="$BASIC/screen-m.blend"
render "$BLEND_SM" "$TEXTURES/screen-m-health-dashboard.png" "$OUTPUT/screen-m-health-dashboard.png"
render "$BLEND_SM" "$TEXTURES/screen-m-smart-home.png" "$OUTPUT/screen-m-smart-home.png"
render "$BLEND_SM" "$TEXTURES/screen-m-media-player.png" "$OUTPUT/screen-m-media-player.png"

# Glow (refined)
echo ""
echo "─── Glow (3 states) ───"
BLEND_GL="$REFINED/glow.blend"
render "$BLEND_GL" "$TEXTURES/glow-circadian-flow.png" "$OUTPUT/glow-circadian-flow.png"
render "$BLEND_GL" "$TEXTURES/glow-notify-pulse.png" "$OUTPUT/glow-notify-pulse.png"
render "$BLEND_GL" "$TEXTURES/glow-breathe.png" "$OUTPUT/glow-breathe.png"

# Pixel (refined)
echo ""
echo "─── Pixel (3 interfaces) ───"
BLEND_PX="$REFINED/pixel.blend"
render "$BLEND_PX" "$TEXTURES/pixel-spectrum-vu.png" "$OUTPUT/pixel-spectrum-vu.png"
render "$BLEND_PX" "$TEXTURES/pixel-pixel-canvas.png" "$OUTPUT/pixel-pixel-canvas.png"
render "$BLEND_PX" "$TEXTURES/pixel-snake-classic.png" "$OUTPUT/pixel-snake-classic.png"

# Round (refined)
echo ""
echo "─── Round (3 interfaces) ───"
BLEND_RD="$REFINED/round.blend"
render "$BLEND_RD" "$TEXTURES/round-analog-lux.png" "$OUTPUT/round-analog-lux.png"
render "$BLEND_RD" "$TEXTURES/round-compass-nav.png" "$OUTPUT/round-compass-nav.png"
render "$BLEND_RD" "$TEXTURES/round-pomodoro-ring.png" "$OUTPUT/round-pomodoro-ring.png"

# Hub (refined)
echo ""
echo "─── Hub (3 interfaces) ───"
BLEND_HB="$REFINED/hub.blend"
render "$BLEND_HB" "$TEXTURES/hub-net-topology.png" "$OUTPUT/hub-net-topology.png"
render "$BLEND_HB" "$TEXTURES/hub-system-monitor.png" "$OUTPUT/hub-system-monitor.png"
render "$BLEND_HB" "$TEXTURES/hub-scene-control.png" "$OUTPUT/hub-scene-control.png"

# Voice (basic)
echo ""
echo "─── Voice (3 interfaces) ───"
BLEND_VO="$BASIC/voice.blend"
render "$BLEND_VO" "$TEXTURES/voice-waveform-live.png" "$OUTPUT/voice-waveform-live.png"
render "$BLEND_VO" "$TEXTURES/voice-voice-assistant.png" "$OUTPUT/voice-voice-assistant.png"
render "$BLEND_VO" "$TEXTURES/voice-intercom.png" "$OUTPUT/voice-intercom.png"

# Mirror (basic)
echo ""
echo "─── Mirror (3 interfaces) ───"
BLEND_MR="$BASIC/mirror.blend"
render "$BLEND_MR" "$TEXTURES/mirror-deity-oracle.png" "$OUTPUT/mirror-deity-oracle.png"
render "$BLEND_MR" "$TEXTURES/mirror-form-check.png" "$OUTPUT/mirror-form-check.png"
render "$BLEND_MR" "$TEXTURES/mirror-glam-filter.png" "$OUTPUT/mirror-glam-filter.png"

# Holo (basic — use holo-fan.blend)
echo ""
echo "─── Holo (3 interfaces) ───"
BLEND_HO="$BASIC/holo-fan.blend"
render "$BLEND_HO" "$TEXTURES/holo-sacred-forms.png" "$OUTPUT/holo-sacred-forms.png"
render "$BLEND_HO" "$TEXTURES/holo-3d-viewer.png" "$OUTPUT/holo-3d-viewer.png"
render "$BLEND_HO" "$TEXTURES/holo-alert-beacon.png" "$OUTPUT/holo-alert-beacon.png"

# Sense (basic)
echo ""
echo "─── Sense (3 states) ───"
BLEND_SE="$BASIC/sense.blend"
render "$BLEND_SE" "$TEXTURES/sense-radar-active.png" "$OUTPUT/sense-radar-active.png"
render "$BLEND_SE" "$TEXTURES/sense-motion-map.png" "$OUTPUT/sense-motion-map.png"
render "$BLEND_SE" "$TEXTURES/sense-gesture-zone.png" "$OUTPUT/sense-gesture-zone.png"

# Brick (basic)
echo ""
echo "─── Brick (3 variants) ───"
BLEND_BR="$BASIC/brick.blend"
render "$BLEND_BR" "$TEXTURES/brick-default.png" "$OUTPUT/brick-default.png"
render "$BLEND_BR" "$TEXTURES/brick-cable-route.png" "$OUTPUT/brick-cable-route.png"
render "$BLEND_BR" "$TEXTURES/brick-mounted.png" "$OUTPUT/brick-mounted.png"

# eInk (basic)
echo ""
echo "─── eInk (3 interfaces) ───"
BLEND_EI="$BASIC/eink.blend"
render "$BLEND_EI" "$TEXTURES/eink-daily-quote.png" "$OUTPUT/eink-daily-quote.png"
render "$BLEND_EI" "$TEXTURES/eink-art-display.png" "$OUTPUT/eink-art-display.png"
render "$BLEND_EI" "$TEXTURES/eink-schedule.png" "$OUTPUT/eink-schedule.png"

echo ""
echo "═══════════════════════════════════════"
RENDERED=$(ls "$OUTPUT"/*.png 2>/dev/null | wc -l | tr -d ' ')
echo "  Complete! $RENDERED renders in $OUTPUT"
echo "═══════════════════════════════════════"
