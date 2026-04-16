export type ModuleShape = "rectangle" | "square" | "circle";

export interface ModuleType {
  id: string;
  name: string;
  price: number;
  color: string;
  icon: string;
  description: string;
  shortDesc: string;
  image: string;
  /** 3 render variants for the image carousel */
  renders: string[];
  /** Physical dimensions from master CSV */
  width_mm: number;
  height_mm: number;
  depth_mm: number;
  shape: ModuleShape;
  /** Whether this module mounts on the wall (false = handheld/wearable) */
  wallMount: boolean;
}

// 1 grid unit = 1mm for precision; display scale applied in UI
// Sense (44x44) is the smallest wall module

export const MODULES: ModuleType[] = [
  {
    id: "screen-s",
    name: "Screen-S",
    price: 79,
    color: "#00D4AA",
    icon: "Monitor",
    description: "2.8\" LCD touchscreen. Widgets, dashboards, album art, weather — whatever your AI decides matters right now.",
    shortDesc: "2.8\" LCD touchscreen",
    image: "/module-screen-s.png",
    renders: ["/renders/screen-s-weather-station.png", "/renders/screen-s-now-playing.png", "/renders/screen-s-week-view.png"],
    width_mm: 76,
    height_mm: 116,
    depth_mm: 20,
    shape: "rectangle",
    wallMount: true,
  },
  {
    id: "screen-m",
    name: "Screen-M",
    price: 119,
    color: "#00D4AA",
    icon: "Monitor",
    description: "5\" LCD touchscreen. Health dashboards, smart home control, media player. The module for data-rich interfaces.",
    shortDesc: "5\" LCD touchscreen",
    image: "/module-screen-m.png",
    renders: ["/renders/screen-m-health-dashboard.png", "/renders/screen-m-smart-home.png", "/renders/screen-m-media-player.png"],
    width_mm: 144,
    height_mm: 94,
    depth_mm: 22,
    shape: "rectangle",
    wallMount: true,
  },
  {
    id: "glow",
    name: "Glow",
    price: 49,
    color: "#FFB347",
    icon: "Sun",
    description: "Ambient LED diffusion panel. Circadian rhythms, mood lighting, notification halos. Light that thinks.",
    shortDesc: "Ambient LED panel",
    image: "/module-glow.png",
    renders: ["/renders/glow-circadian-flow.png", "/renders/glow-notify-pulse.png", "/renders/glow-breathe.png"],
    width_mm: 71,
    height_mm: 71,
    depth_mm: 20,
    shape: "square",
    wallMount: true,
  },
  {
    id: "pixel",
    name: "Pixel",
    price: 59,
    color: "#ff4466",
    icon: "Grid3X3",
    description: "64x32 HUB75 LED matrix. Pixel art, VU meters, scrolling text, retro visualizations. The wall's personality layer.",
    shortDesc: "HUB75 LED matrix",
    image: "/module-pixel.png",
    renders: ["/renders/pixel-spectrum-vu.png", "/renders/pixel-pixel-canvas.png", "/renders/pixel-snake-classic.png"],
    width_mm: 166,
    height_mm: 86,
    depth_mm: 23,
    shape: "rectangle",
    wallMount: true,
  },
  {
    id: "voice",
    name: "Voice",
    price: 39,
    color: "#8888ff",
    icon: "Mic",
    description: "Speaker + MEMS microphone. Talk to your wall. It talks back. Local wake word, far-field pickup.",
    shortDesc: "Speaker + microphone",
    image: "/module-voice.png",
    renders: ["/renders/voice-waveform-live.png", "/renders/voice-voice-assistant.png", "/renders/voice-intercom.png"],
    width_mm: 71,
    height_mm: 71,
    depth_mm: 23,
    shape: "square",
    wallMount: true,
  },
  {
    id: "sense",
    name: "Sense",
    price: 29,
    color: "#44ddff",
    icon: "Eye",
    description: "mmWave presence detection. Knows you're there without cameras. Gesture zones. Privacy-first awareness.",
    shortDesc: "Presence detection",
    image: "/module-sense.png",
    renders: ["/renders/sense-radar-active.png", "/renders/sense-motion-map.png", "/renders/sense-gesture-zone.png"],
    width_mm: 44,
    height_mm: 44,
    depth_mm: 16,
    shape: "square",
    wallMount: true,
  },
  {
    id: "brick",
    name: "Brick",
    price: 9,
    color: "#555577",
    icon: "Square",
    description: "Structural filler. Magnetic mount, cable passthrough. Every wall needs negative space.",
    shortDesc: "Structural filler",
    image: "/module-brick.png",
    renders: ["/renders/brick-default.png", "/renders/brick-cable-route.png", "/renders/brick-mounted.png"],
    width_mm: 71,
    height_mm: 71,
    depth_mm: 20,
    shape: "square",
    wallMount: true,
  },
  {
    id: "hub",
    name: "Hub",
    price: 49,
    color: "#00D4AA",
    icon: "Cpu",
    description: "Orange Pi brain. WiFi, BLE mesh, USB-C power distribution. One per wall. Required.",
    shortDesc: "Central brain (required)",
    image: "/module-hub.png",
    renders: ["/renders/hub-net-topology.png", "/renders/hub-system-monitor.png", "/renders/hub-scene-control.png"],
    width_mm: 91,
    height_mm: 62,
    depth_mm: 22,
    shape: "rectangle",
    wallMount: true,
  },
  {
    id: "holo",
    name: "Holo",
    price: 99,
    color: "#cc44ff",
    icon: "Sparkles",
    description: "Holographic fan display. Floating 3D visuals in mid-air. The module that makes people stop and stare.",
    shortDesc: "Hologram fan display",
    image: "/module-holo.png",
    renders: ["/renders/holo-sacred-forms.png", "/renders/holo-3d-viewer.png", "/renders/holo-alert-beacon.png"],
    width_mm: 140,
    height_mm: 140,
    depth_mm: 40,
    shape: "square",
    wallMount: true,
  },
  {
    id: "round",
    name: "Round",
    price: 69,
    color: "#00ffcc",
    icon: "Circle",
    description: "1.43\" circular AMOLED with LED halo ring. Clocks, gauges, status indicators, notification orbits. The module that breaks the grid.",
    shortDesc: "Circular AMOLED + LED ring",
    image: "/module-round.png",
    renders: ["/renders/round-analog-lux.png", "/renders/round-compass-nav.png", "/renders/round-pomodoro-ring.png"],
    width_mm: 91,
    height_mm: 91,
    depth_mm: 19,
    shape: "circle",
    wallMount: true,
  },
  {
    id: "mirror",
    name: "Mirror",
    price: 129,
    color: "#ff88dd",
    icon: "ScanFace",
    description: "5\" circular display + camera + ring light. Smart mirror, AR filters, exercise form checker. Mirror, mirror on the wall.",
    shortDesc: "Smart mirror + camera + AI",
    image: "/module-mirror.png",
    renders: ["/renders/mirror-deity-oracle.png", "/renders/mirror-form-check.png", "/renders/mirror-glam-filter.png"],
    width_mm: 120,
    height_mm: 120,
    depth_mm: 28,
    shape: "circle",
    wallMount: true,
  },
  {
    id: "eink",
    name: "eInk",
    price: 59,
    color: "#888888",
    icon: "FileText",
    description: "7.5\" e-paper display. Always-on quotes, art, schedules. Content that stays without power.",
    shortDesc: "E-paper display",
    image: "/module-eink.png",
    renders: ["/renders/eink-daily-quote.png", "/renders/eink-art-display.png", "/renders/eink-schedule.png"],
    width_mm: 180,
    height_mm: 120,
    depth_mm: 15,
    shape: "rectangle",
    wallMount: true,
  },
];

// Ring and Controller are NOT wall modules — excluded from configurator
export const NON_WALL_MODULES: ModuleType[] = [
  {
    id: "ring",
    name: "Ring",
    price: 49,
    color: "#00D4AA",
    icon: "CircleDot",
    description: "3D-printed smart ring. Gesture mouse, voice input, motion capture, haptic feedback. The wall on your finger.",
    shortDesc: "Wearable gesture controller",
    image: "/module-ring.jpg",
    renders: [],
    width_mm: 20,
    height_mm: 20,
    depth_mm: 8,
    shape: "circle",
    wallMount: false,
  },
  {
    id: "controller",
    name: "Controller",
    price: 79,
    color: "#00D4AA",
    icon: "CircleDot",
    description: "Handheld rotary controller. Module selection, scene switching, dial control. The premium puck.",
    shortDesc: "Handheld remote",
    image: "/module-controller.jpg",
    renders: [],
    width_mm: 62,
    height_mm: 62,
    depth_mm: 18,
    shape: "circle",
    wallMount: false,
  },
];

export interface Scene {
  id: string;
  name: string;
  description: string;
  color: string;
  modules: string[];
  time: string;
}

export const SCENES: Scene[] = [
  {
    id: "morning",
    name: "Morning",
    description: "Warm amber glow ramps with sunrise. Calendar on Screen-S. Weather scrolling across Pixel. Voice reads your first three priorities. The wall becomes your ritual.",
    color: "#FFB347",
    modules: ["glow", "screen-s", "pixel", "voice"],
    time: "6:30 AM",
  },
  {
    id: "focus",
    name: "Focus",
    description: "Everything dims except what matters. Screen-S shows a single timer. Glow drops to deep blue. Sense detects you've left — pauses everything. Returns exactly where you were.",
    color: "#00D4AA",
    modules: ["screen-s", "glow", "sense"],
    time: "9:00 AM",
  },
  {
    id: "movie",
    name: "Movie Night",
    description: "Lights sync to on-screen content. Pixel mirrors the dominant color. Voice adjusts volume. Glow creates bias lighting that extends your TV beyond its bezels.",
    color: "#8888ff",
    modules: ["glow", "pixel", "voice", "sense"],
    time: "8:00 PM",
  },
  {
    id: "sleep",
    name: "Sleep",
    description: "Everything fades. Glow shifts to deep red at 1% brightness. Screen-S shows only the time — in a font so dim you can barely read it. Sense confirms you're in bed. The wall breathes off.",
    color: "#ff4466",
    modules: ["glow", "screen-s", "sense"],
    time: "11:00 PM",
  },
];

/** Placed module on the freeform canvas */
export interface PlacedModule {
  id: string;
  module: ModuleType;
  /** Position in mm from top-left of canvas */
  x: number;
  y: number;
}

// Canvas dimensions in mm — represents a 600x400mm wall section
export const CANVAS_WIDTH_MM = 600;
export const CANVAS_HEIGHT_MM = 400;

// Snap grid size in mm (half the smallest module)
export const SNAP_GRID_MM = 22;

export type GridCell = ModuleType | null;

// Legacy — kept for backward compat but configurator now uses freeform canvas
export const GRID_ROWS = 4;
export const GRID_COLS = 6;
