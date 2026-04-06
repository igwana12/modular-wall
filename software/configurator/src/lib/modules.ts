export interface ModuleType {
  id: string;
  name: string;
  price: number;
  color: string;
  icon: string;
  description: string;
  shortDesc: string;
  image: string;
}

export const MODULES: ModuleType[] = [
  {
    id: "screen-s",
    name: "Screen-S",
    price: 79,
    color: "#00D4AA",
    icon: "Monitor",
    description: "2.8\" LCD touchscreen. Widgets, dashboards, album art, weather — whatever your AI decides matters right now.",
    shortDesc: "2.8\" LCD touchscreen",
    image: "/module-screen.jpg",
  },
  {
    id: "glow",
    name: "Glow",
    price: 49,
    color: "#FFB347",
    icon: "Sun",
    description: "Ambient LED diffusion panel. Circadian rhythms, mood lighting, notification halos. Light that thinks.",
    shortDesc: "Ambient LED panel",
    image: "/module-glow.jpg",
  },
  {
    id: "pixel",
    name: "Pixel",
    price: 59,
    color: "#ff4466",
    icon: "Grid3X3",
    description: "16x16 LED matrix. Pixel art, VU meters, scrolling text, retro visualizations. The wall's personality layer.",
    shortDesc: "LED matrix display",
    image: "/module-pixel.jpg",
  },
  {
    id: "voice",
    name: "Voice",
    price: 39,
    color: "#8888ff",
    icon: "Mic",
    description: "Speaker + MEMS microphone. Talk to your wall. It talks back. Local wake word, far-field pickup.",
    shortDesc: "Speaker + microphone",
    image: "/module-voice.jpg",
  },
  {
    id: "sense",
    name: "Sense",
    price: 29,
    color: "#44ddff",
    icon: "Eye",
    description: "mmWave presence detection. Knows you're there without cameras. Gesture zones. Privacy-first awareness.",
    shortDesc: "Presence detection",
    image: "/module-sense.jpg",
  },
  {
    id: "brick",
    name: "Brick",
    price: 9,
    color: "#555577",
    icon: "Square",
    description: "Structural filler. Magnetic mount, cable passthrough. Every wall needs negative space.",
    shortDesc: "Structural filler",
    image: "/module-brick.jpg",
  },
  {
    id: "hub",
    name: "Hub",
    price: 49,
    color: "#00D4AA",
    icon: "Cpu",
    description: "ESP32-S3 brain. WiFi, BLE mesh, USB-C power distribution. One per wall. Required.",
    shortDesc: "Central brain (required)",
    image: "/module-hub.jpg",
  },
  {
    id: "holo",
    name: "Holo",
    price: 99,
    color: "#cc44ff",
    icon: "Sparkles",
    description: "Holographic fan display. Floating 3D visuals in mid-air. The module that makes people stop and stare.",
    shortDesc: "Hologram fan display",
    image: "/module-holo.jpg",
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

export type GridCell = ModuleType | null;

export const GRID_ROWS = 4;
export const GRID_COLS = 6;
