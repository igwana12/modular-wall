"use client";

import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { MODULES } from "@/lib/modules";
import { Star, Download, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const InterfaceSceneCanvas = lazy(() =>
  import("@/components/three/interface-scenes").then((m) => ({ default: m.InterfaceSceneCanvas }))
);

// ─── Interface data model ──────────────────────────────────────
interface InterfaceApp {
  name: string;
  creator: string;
  moduleId: string;
  sceneId: string;
  downloads: number;
  rating: number;
  apis: string[];
  libs: string[];
  description: string;
  previewBg: string;
  isStatic?: boolean;
}

const MODULE_MAP = Object.fromEntries(MODULES.map((m) => [m.id, m]));

// ─── 27 Interface Apps with animated scene IDs ─────────────────
const INTERFACES: InterfaceApp[] = [
  // Screen-S
  { name: "Weather Station", creator: "studio.ambient", moduleId: "screen-s", sceneId: "weather-station", downloads: 12400, rating: 4.8, apis: ["CSS2DRenderer", "ShaderMaterial", "Points"], libs: ["Three.js", "OpenWeather API"], description: "Animated rain particles with teal temperature display. Humidity gauge arc and 5-day forecast bars.", previewBg: "linear-gradient(180deg, #0a2a3a 0%, #001a14 100%)" },
  { name: "Now Playing", creator: "waveform.labs", moduleId: "screen-s", sceneId: "now-playing", downloads: 8900, rating: 4.6, apis: ["CanvasTexture", "InstancedMesh", "Color"], libs: ["Three.js", "Spotify API", "GSAP"], description: "Pulsing album art glow with audio waveform bar graph. Track info overlay.", previewBg: "linear-gradient(180deg, #1a0a2e 0%, #0a0a1a 100%)" },
  { name: "Week View", creator: "calflow.io", moduleId: "screen-s", sceneId: "week-view", downloads: 6200, rating: 4.5, apis: ["CSS3DObject", "MeshStandardMaterial"], libs: ["Three.js", "Google Calendar", "date-fns"], description: "Animated calendar event blocks with subtle 3D perspective shifts.", previewBg: "linear-gradient(180deg, #0a1a2e 0%, #0a0a14 100%)" },

  // Glow
  { name: "Circadian Flow", creator: "bio.rhythm", moduleId: "glow", sceneId: "circadian-flow", downloads: 15600, rating: 4.9, apis: ["ShaderMaterial", "Color", "Clock"], libs: ["Three.js", "sunrise-sunset API"], description: "Warm amber→cool blue gradient driven by custom ShaderMaterial with time uniform. Breathing pulse.", previewBg: "linear-gradient(135deg, #2a1800 0%, #0a0a14 100%)" },
  { name: "Notify Pulse", creator: "alert.studio", moduleId: "glow", sceneId: "notify-pulse", downloads: 9800, rating: 4.7, apis: ["RingGeometry", "MathUtils", "Color"], libs: ["Three.js", "MQTT.js"], description: "Teal ripple rings expanding outward with animated scale and opacity. Color-coded by alert type.", previewBg: "linear-gradient(135deg, #001a2e 0%, #0a0a14 100%)" },
  { name: "Breathe", creator: "zen.modules", moduleId: "glow", sceneId: "breathe", downloads: 7200, rating: 4.8, apis: ["ShaderMaterial", "Clock"], libs: ["Three.js"], description: "Slow purple aurora waves from noise-based ShaderMaterial. Guided breathing visualization.", previewBg: "linear-gradient(135deg, #1a0a2e 0%, #0a0a14 100%)" },

  // Pixel
  { name: "Spectrum VU", creator: "audio.viz", moduleId: "pixel", sceneId: "spectrum-vu", downloads: 18200, rating: 4.9, apis: ["InstancedMesh", "AudioAnalyser", "Color"], libs: ["Three.js", "Web Audio API"], description: "32 animated columns from simulated FFT data. Green→amber→red color gradient per column height.", previewBg: "linear-gradient(0deg, #0a0a0a 0%, #1a0a14 100%)" },
  { name: "Pixel Canvas", creator: "retro.studio", moduleId: "pixel", sceneId: "pixel-canvas", downloads: 11300, rating: 4.6, apis: ["InstancedMesh", "DataTexture", "Color"], libs: ["Three.js", "Pixi.js"], description: "Animated pixel art sprite cycling through heart frames. 16×8 instanced grid with pulsing scale.", previewBg: "linear-gradient(0deg, #0a0a14 0%, #0a0a1a 100%)" },
  { name: "Snake Classic", creator: "arcade.wall", moduleId: "pixel", sceneId: "snake-classic", downloads: 14500, rating: 4.7, apis: ["InstancedMesh", "Clock", "MathUtils"], libs: ["Three.js"], description: "Snake-like block animation weaving across the panel. Food pellet blinks red.", previewBg: "linear-gradient(0deg, #0a0a0a 0%, #001a0a 100%)" },

  // Round
  { name: "Analog Lux", creator: "clockface.co", moduleId: "round", sceneId: "analog-lux", downloads: 21000, rating: 4.9, apis: ["RingGeometry", "Clock", "MathUtils"], libs: ["Three.js"], description: "Rotating teal minute hand, amber second hand ticking smoothly. 12 hour markers on ring.", previewBg: "radial-gradient(circle, #001a14 0%, #0a0a14 100%)" },
  { name: "Compass Nav", creator: "wayfinder.ui", moduleId: "round", sceneId: "compass-nav", downloads: 5400, rating: 4.4, apis: ["RingGeometry", "MathUtils", "Sprite"], libs: ["Three.js", "Geolocation API"], description: "Rotating compass needle with cardinal direction markers. Red north pointer oscillates.", previewBg: "radial-gradient(circle, #0a1a0a 0%, #0a0a14 100%)" },
  { name: "Pomodoro Ring", creator: "focus.flow", moduleId: "round", sceneId: "pomodoro-ring", downloads: 8700, rating: 4.7, apis: ["RingGeometry", "Clock", "Color"], libs: ["Three.js", "GSAP"], description: "Countdown arc ring depleting over time. Pulses red when near zero.", previewBg: "radial-gradient(circle, #1a0a00 0%, #0a0a14 100%)" },

  // Hub
  { name: "Net Topology", creator: "mesh.ops", moduleId: "hub", sceneId: "net-topology", downloads: 4200, rating: 4.5, apis: ["Points", "LineBasicMaterial", "Color"], libs: ["Three.js", "D3.js", "Sigma.js"], description: "Animated data pulses traveling along connection lines between module nodes.", previewBg: "linear-gradient(135deg, #001a14 0%, #0a0a14 100%)" },
  { name: "System Monitor", creator: "ops.dashboard", moduleId: "hub", sceneId: "system-monitor", downloads: 6800, rating: 4.6, apis: ["CSS2DRenderer", "CanvasTexture"], libs: ["Three.js", "Chart.js", "ECharts"], description: "CPU, RAM and temperature bars animated in real-time. Color shifts on threshold.", previewBg: "linear-gradient(135deg, #0a1a0a 0%, #0a0a14 100%)" },
  { name: "Scene Control", creator: "home.maestro", moduleId: "hub", sceneId: "scene-control", downloads: 9100, rating: 4.8, apis: ["CSS3DRenderer", "Raycaster", "Color"], libs: ["Three.js", "Home Assistant", "MQTT.js"], description: "Scene buttons that pulse when active. Morning, Focus, Movie — one tap to switch.", previewBg: "linear-gradient(135deg, #0a0a2e 0%, #0a0a14 100%)" },

  // Voice
  { name: "Waveform Live", creator: "audio.viz", moduleId: "voice", sceneId: "waveform-live", downloads: 7600, rating: 4.5, apis: ["AudioAnalyser", "BufferGeometry", "Line"], libs: ["Three.js", "Web Audio API"], description: "Animated oscilloscope waveform. Three overlapping sine waves create a rich voice visualization.", previewBg: "linear-gradient(135deg, #0a0a2e 0%, #0a0a14 100%)" },
  { name: "Voice Assistant", creator: "talk.wall", moduleId: "voice", sceneId: "voice-assistant", downloads: 13200, rating: 4.7, apis: ["RingGeometry", "ShaderMaterial"], libs: ["Three.js", "Whisper API", "ElevenLabs"], description: "Concentric rings pulsing outward when listening. Center dot breathes.", previewBg: "linear-gradient(135deg, #1a0a2e 0%, #0a0a14 100%)" },
  { name: "Intercom", creator: "connect.io", moduleId: "voice", sceneId: "intercom", downloads: 4800, rating: 4.3, apis: ["AudioListener", "PositionalAudio"], libs: ["Three.js", "WebRTC"], description: "Pulsing speaker dot with sound wave arcs. Connects to other Voice modules.", previewBg: "linear-gradient(135deg, #0a1a2e 0%, #0a0a14 100%)" },

  // Mirror
  { name: "Deity Oracle", creator: "pantheon.studio", moduleId: "mirror", sceneId: "deity-oracle", downloads: 6700, rating: 4.8, apis: ["EdgesGeometry", "SphereGeometry", "Points"], libs: ["Three.js", "MediaPipe", "TensorFlow.js"], description: "Rotating face mesh wireframe with teal glow crown orbs. Pantheon deity overlay.", previewBg: "radial-gradient(circle, #2a0a2e 0%, #0a0a14 100%)" },
  { name: "Form Check", creator: "fit.mirror", moduleId: "mirror", sceneId: "form-check", downloads: 8900, rating: 4.6, apis: ["SkeletonHelper", "Bone", "CSS2DRenderer"], libs: ["Three.js", "MediaPipe Pose"], description: "Animated stick figure with joint dots. Subtle squat animation cycle.", previewBg: "radial-gradient(circle, #0a2a0a 0%, #0a0a14 100%)" },
  { name: "Glam Filter", creator: "beauty.lens", moduleId: "mirror", sceneId: "glam-filter", downloads: 5100, rating: 4.4, apis: ["ShaderMaterial", "EffectComposer", "Points"], libs: ["Three.js", "MediaPipe Face Mesh"], description: "Swirling particle vortex with golden eye center. Beauty filter visualization.", previewBg: "radial-gradient(circle, #2a1a2e 0%, #0a0a14 100%)" },

  // Holo
  { name: "Sacred Forms", creator: "pantheon.studio", moduleId: "holo", sceneId: "sacred-forms", downloads: 11200, rating: 4.9, apis: ["Points", "EdgesGeometry", "IcosahedronGeometry"], libs: ["Three.js"], description: "Wireframe icosahedron + octahedron rotating with 300 orbiting particles. Additive blending.", previewBg: "linear-gradient(135deg, #1a0a2e 0%, #0a0a14 100%)" },
  { name: "3D Viewer", creator: "model.hub", moduleId: "holo", sceneId: "3d-viewer", downloads: 7800, rating: 4.5, apis: ["MeshBasicMaterial", "BoxGeometry"], libs: ["Three.js", "three-gltf-loader"], description: "Rotating wireframe cube with purple glow. Holographic model viewer concept.", previewBg: "linear-gradient(135deg, #0a1a2e 0%, #0a0a14 100%)" },
  { name: "Alert Beacon", creator: "notify.3d", moduleId: "holo", sceneId: "alert-beacon", downloads: 3900, rating: 4.3, apis: ["SphereGeometry", "ShaderMaterial", "Color"], libs: ["Three.js", "MQTT.js"], description: "Expanding wireframe sphere pulses with fading opacity. Red alert beacon.", previewBg: "linear-gradient(135deg, #2a0a0a 0%, #0a0a14 100%)" },

  // eInk
  { name: "Daily Quote", creator: "paper.ink", moduleId: "eink", sceneId: "daily-quote", downloads: 3200, rating: 4.6, apis: ["MeshStandardMaterial"], libs: ["Three.js"], description: "Paper-textured surface with text line layout. No animation — e-ink stays static.", previewBg: "linear-gradient(135deg, #1a1a14 0%, #0a0a0a 100%)", isStatic: true },
  { name: "Art Display", creator: "dither.studio", moduleId: "eink", sceneId: "art-display", downloads: 2800, rating: 4.4, apis: ["InstancedMesh", "CircleGeometry"], libs: ["Three.js"], description: "Floyd-Steinberg dithered dot pattern on warm paper. Static e-ink art.", previewBg: "linear-gradient(135deg, #1a1a14 0%, #0a0a0a 100%)", isStatic: true },
  { name: "Schedule", creator: "plan.day", moduleId: "eink", sceneId: "schedule", downloads: 4100, rating: 4.5, apis: ["MeshBasicMaterial", "PlaneGeometry"], libs: ["Three.js"], description: "Time column with colored event blocks. Clean, minimal e-ink schedule.", previewBg: "linear-gradient(135deg, #1a1a14 0%, #0a0a0a 100%)", isStatic: true },
];

// ─── Module filter tabs ────────────────────────────────────────
const MODULE_TABS = [
  { id: "all", label: "All" },
  ...["screen-s", "glow", "pixel", "round", "hub", "voice", "mirror", "holo", "eink"].map((id) => ({
    id, label: MODULE_MAP[id]?.name ?? id,
  })),
];

function formatDownloads(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

// ─── Interface Card with Live 3D Preview ───────────────────────
function InterfaceCard({ app, allAppsForModule }: { app: InterfaceApp; allAppsForModule: InterfaceApp[] }) {
  const [currentIdx, setCurrentIdx] = useState(() => allAppsForModule.findIndex((a) => a.sceneId === app.sceneId));
  const current = allAppsForModule[currentIdx] || app;
  const mod = MODULE_MAP[current.moduleId];
  if (!mod) return null;

  const maxDim = 140;
  const scale = maxDim / Math.max(mod.width_mm, mod.height_mm);
  const pw = mod.width_mm * scale;
  const ph = mod.height_mm * scale;
  const hasMultiple = allAppsForModule.length > 1;

  return (
    <div className="group rounded-2xl border border-border/50 bg-surface-raised/50 overflow-hidden transition-all duration-300 hover:bg-surface-raised hover:border-border">
      {/* Live 3D Preview */}
      <div className="relative flex items-center justify-center p-4" style={{ background: current.previewBg, minHeight: 170 }}>
        <div style={{ width: pw, height: ph, borderRadius: mod.shape === "circle" ? "50%" : 8, border: `1.5px solid ${mod.color}30`, boxShadow: `0 0 30px ${mod.color}15`, overflow: "hidden" }}>
          <Suspense fallback={
            <div className="w-full h-full animate-pulse" style={{ background: `${mod.color}10` }} />
          }>
            <InterfaceSceneCanvas
              sceneId={current.sceneId}
              width={pw}
              height={ph}
              isCircle={mod.shape === "circle"}
              isStatic={current.isStatic}
            />
          </Suspense>
        </div>

        {/* Module badge */}
        <div className="absolute top-3 left-3 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold backdrop-blur-md" style={{ color: mod.color, backgroundColor: `${mod.color}15`, border: `1px solid ${mod.color}25` }}>
          {mod.name}
        </div>

        {/* Interface switcher arrows */}
        {hasMultiple && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentIdx((i) => (i - 1 + allAppsForModule.length) % allAppsForModule.length); }}
              className="rounded-full p-1 backdrop-blur-md" style={{ backgroundColor: `${mod.color}20`, border: `1px solid ${mod.color}30`, color: mod.color }}
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <span className="text-[9px] font-mono backdrop-blur-md rounded-full px-2 py-0.5" style={{ color: mod.color, backgroundColor: `${mod.color}15` }}>
              {currentIdx + 1}/{allAppsForModule.length}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentIdx((i) => (i + 1) % allAppsForModule.length); }}
              className="rounded-full p-1 backdrop-blur-md" style={{ backgroundColor: `${mod.color}20`, border: `1px solid ${mod.color}30`, color: mod.color }}
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="font-semibold text-sm">{current.name}</h4>
            <p className="text-[11px] text-muted-foreground font-mono">{current.creator}</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-0.5"><Star className="h-3 w-3 text-amber" fill="currentColor" />{current.rating}</span>
            <span className="flex items-center gap-0.5"><Download className="h-3 w-3" />{formatDownloads(current.downloads)}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{current.description}</p>
        <div className="flex flex-wrap gap-1">
          {current.apis.slice(0, 3).map((api) => (
            <span key={api} className="rounded px-1.5 py-0.5 text-[9px] font-mono bg-teal/8 text-teal/70 border border-teal/15">{api}</span>
          ))}
          {current.libs.slice(0, 2).map((lib) => (
            <span key={lib} className="rounded px-1.5 py-0.5 text-[9px] font-mono bg-amber/8 text-amber/70 border border-amber/15">{lib}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Gallery ──────────────────────────────────────────────
export function InterfaceGallery() {
  const [activeTab, setActiveTab] = useState("all");
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Group interfaces by module for the card switcher
  const byModule = INTERFACES.reduce<Record<string, InterfaceApp[]>>((acc, app) => {
    (acc[app.moduleId] ??= []).push(app);
    return acc;
  }, {});

  // In "all" mode, show one card per module (user can cycle through interfaces).
  // In filtered mode, show all interfaces for that module.
  const cards = activeTab === "all"
    ? Object.entries(byModule).map(([moduleId, apps]) => ({ key: moduleId, app: apps[0], allApps: apps }))
    : (byModule[activeTab] || []).map((app) => ({ key: app.sceneId, app, allApps: byModule[activeTab] || [app] }));

  return (
    <section id="interfaces" className="relative py-24 md:py-32" ref={ref} aria-label="mosAIc Interface Gallery">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-4 py-2 text-sm font-mono text-amber mb-4">
            <Sparkles className="h-4 w-4" />App Store for Walls
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">mosAIc Interfaces</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your wall runs apps. Anyone can build them. Share with the community.
            <br /><span className="text-foreground font-medium">Every module is a platform.</span>{" "}Every interface is open source.{" "}
            <a href="https://omma.build" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">Build your own with Omma →</a>
          </p>
        </div>

        {/* Module filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {MODULE_TABS.map((tab) => {
            const mod = MODULE_MAP[tab.id];
            const isActive = activeTab === tab.id;
            const count = byModule[tab.id]?.length;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                style={{ backgroundColor: isActive ? `${mod?.color ?? "#00D4AA"}15` : "transparent", border: `1px solid ${isActive ? (mod?.color ?? "#00D4AA") + "40" : "transparent"}`, color: isActive ? mod?.color ?? "#00D4AA" : "#8888aa" }}>
                {tab.label}{count ? ` (${count})` : ""}
              </button>
            );
          })}
        </div>

        {/* Interface cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease-out, transform 0.6s ease-out" }}>
          {cards.map(({ key, app, allApps }) => (
            <InterfaceCard key={key} app={app} allAppsForModule={allApps} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
          {[["27", "Live Interfaces", "text-teal"], ["9", "Module Types", "text-amber"], ["220k+", "Downloads", "text-foreground"], ["Open", "Source", "text-purple-400"]].map(([val, label, cls]) => (
            <div key={label}><div className={`text-3xl font-bold tabular-nums ${cls}`}>{val}</div><div className="text-xs text-muted-foreground font-mono mt-1">{label}</div></div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">Built with Three.js, Web Audio, MediaPipe, and the mosAIc SDK.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#configurator" className="inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-2.5 text-sm font-semibold text-background transition-all hover:bg-teal/90 hover:shadow-[0_0_30px_rgba(0,212,170,0.3)]">
              <Sparkles className="h-4 w-4" />Build Your Wall
            </a>
            <a href="https://github.com/igwana12/modular-wall" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-teal/30 px-6 py-2.5 text-sm font-medium text-teal transition-all hover:bg-teal/10">
              Create an Interface
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
