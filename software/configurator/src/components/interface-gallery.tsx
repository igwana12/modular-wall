"use client";

import { useState, useRef, useEffect } from "react";
import { MODULES } from "@/lib/modules";
import { Star, Download, Eye, Sparkles } from "lucide-react";

// ─── Interface data model ──────────────────────────────────────
interface InterfaceApp {
  name: string;
  creator: string;
  moduleId: string;
  downloads: number;
  rating: number;
  apis: string[];
  libs: string[];
  description: string;
  previewBg: string;
  /** Static SVG viewBox dimensions match real module mm */
  previewContent: React.ReactNode;
}

const MODULE_MAP = Object.fromEntries(MODULES.map((m) => [m.id, m]));

// ─── SVG Preview Components (pure React, no innerHTML) ─────────

function WeatherPreview() {
  return (
    <svg viewBox="0 0 76 116" fill="none" className="w-full h-full">
      <rect x="8" y="12" width="60" height="30" rx="4" fill="#00D4AA" opacity={0.15} />
      <text x="38" y="32" textAnchor="middle" fill="#00D4AA" fontSize="14" fontFamily="monospace" fontWeight="bold">72°</text>
      <circle cx="22" cy="56" r="8" fill="#FFB347" opacity={0.3} />
      <rect x="12" y="72" width="52" height="3" rx="1" fill="#00D4AA" opacity={0.2} />
      <rect x="12" y="80" width="38" height="3" rx="1" fill="#00D4AA" opacity={0.15} />
      <rect x="12" y="88" width="45" height="3" rx="1" fill="#FFB347" opacity={0.15} />
    </svg>
  );
}

function NowPlayingPreview() {
  return (
    <svg viewBox="0 0 76 116" fill="none" className="w-full h-full">
      <rect x="13" y="12" width="50" height="50" rx="6" fill="#8888ff" opacity={0.2} stroke="#8888ff" strokeOpacity={0.3} />
      <rect x="13" y="70" width="40" height="4" rx="1" fill="#ffffff" opacity={0.4} />
      <rect x="13" y="78" width="28" height="3" rx="1" fill="#8888ff" opacity={0.3} />
      <rect x="13" y="90" width="50" height="2" rx="1" fill="#ffffff" opacity={0.1} />
      <circle cx="18" cy="90" r="3" fill="#8888ff" opacity={0.5} />
    </svg>
  );
}

function WeekViewPreview() {
  const colors = ["#00D4AA", "#FFB347", "#8888ff", "#ff4466"];
  return (
    <svg viewBox="0 0 76 116" fill="none" className="w-full h-full">
      <text x="38" y="16" textAnchor="middle" fill="#00D4AA" fontSize="8" fontFamily="monospace" opacity={0.6}>APR 2026</text>
      {colors.map((c, i) => (
        <g key={i}>
          <rect x="10" y={38 + i * 20} width="56" height="14" rx="3" fill={c} opacity={0.12} stroke={c} strokeOpacity={0.25} />
          <rect x="14" y={42 + i * 20} width={[32, 24, 40, 20][i]} height="3" rx="1" fill={c} opacity={0.4} />
        </g>
      ))}
    </svg>
  );
}

function CircadianPreview() {
  const gradId = "circadian-glow";
  return (
    <svg viewBox="0 0 71 71" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id={gradId}>
          <stop offset="0%" stopColor="#FFB347" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#FFB347" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect x="5" y="5" width="61" height="61" rx="6" fill={`url(#${gradId})`} />
      {[20, 35, 50].map((y) =>
        [20, 35, 50].map((x) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#FFB347" opacity={0.2 + Math.sin(x * 0.1) * 0.3} />
        ))
      )}
    </svg>
  );
}

function NotifyPulsePreview() {
  return (
    <svg viewBox="0 0 71 71" fill="none" className="w-full h-full">
      <circle cx="35.5" cy="35.5" r="28" fill="none" stroke="#44ddff" strokeOpacity={0.3} strokeWidth="2" />
      <circle cx="35.5" cy="35.5" r="20" fill="none" stroke="#44ddff" strokeOpacity={0.2} strokeWidth="1.5" />
      <circle cx="35.5" cy="35.5" r="10" fill="#44ddff" opacity={0.15} />
      <circle cx="35.5" cy="35.5" r="4" fill="#44ddff" opacity={0.4} />
    </svg>
  );
}

function BreathePreview() {
  return (
    <svg viewBox="0 0 71 71" fill="none" className="w-full h-full">
      <circle cx="35.5" cy="35.5" r="25" fill="#FFB347" opacity={0.08} />
      <circle cx="35.5" cy="35.5" r="18" fill="#FFB347" opacity={0.12} />
      <circle cx="35.5" cy="35.5" r="10" fill="#FFB347" opacity={0.2} />
      <text x="35.5" y="38" textAnchor="middle" fill="#FFB347" fontSize="7" fontFamily="monospace" opacity={0.6}>inhale</text>
    </svg>
  );
}

function VUMeterPreview() {
  const bars = [10, 27, 42, 52, 37, 22, 32, 47, 57, 44, 27, 17];
  return (
    <svg viewBox="0 0 166 86" fill="none" className="w-full h-full">
      {bars.map((h, i) => (
        <rect key={i} x={4 + i * 13} y={82 - h} width="10" height={h} rx="1"
          fill={h > 40 ? "#ff4466" : h > 25 ? "#FFB347" : "#00D4AA"} opacity={0.4 + h / 80 * 0.4} />
      ))}
    </svg>
  );
}

function PixelCanvasPreview() {
  const pixels: [number, number, string][] = [
    [3, 1, "#ff4466"], [4, 1, "#ff4466"], [5, 1, "#ff4466"],
    [2, 2, "#FFB347"], [3, 2, "#FFB347"], [4, 2, "#00D4AA"], [5, 2, "#FFB347"], [6, 2, "#ff4466"],
    [3, 3, "#8888ff"], [4, 3, "#8888ff"], [5, 3, "#8888ff"],
  ];
  return (
    <svg viewBox="0 0 166 86" fill="none" className="w-full h-full">
      {pixels.map(([x, y, c], i) => (
        <rect key={i} x={60 + x * 6} y={15 + y * 6} width="6" height="6" fill={c} opacity={0.7} />
      ))}
      <text x="83" y="72" textAnchor="middle" fill="#aaa" fontSize="5" fontFamily="monospace" opacity={0.4}>16 colors</text>
    </svg>
  );
}

function SnakePreview() {
  return (
    <svg viewBox="0 0 166 86" fill="none" className="w-full h-full">
      <rect x="4" y="4" width="158" height="78" rx="2" fill="none" stroke="#00D4AA" strokeOpacity={0.15} />
      {[80, 75, 70, 65, 60, 55, 50].map((x, i) => (
        <rect key={i} x={x} y="40" width="5" height="5" fill="#00D4AA" opacity={1 - i * 0.1} />
      ))}
      <rect x="120" y="30" width="5" height="5" fill="#ff4466" opacity={0.8} />
      <text x="83" y="78" textAnchor="middle" fill="#00D4AA" fontSize="5" fontFamily="monospace" opacity={0.4}>SCORE: 2450</text>
    </svg>
  );
}

function AnalogClockPreview() {
  return (
    <svg viewBox="0 0 91 91" fill="none" className="w-full h-full">
      <circle cx="45.5" cy="45.5" r="42" fill="none" stroke="#00ffcc" strokeOpacity={0.2} strokeWidth="1.5" />
      <line x1="45.5" y1="45.5" x2="45.5" y2="18" stroke="#00ffcc" strokeOpacity={0.8} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="45.5" y1="45.5" x2="62" y2="45.5" stroke="#00ffcc" strokeOpacity={0.6} strokeWidth="1" strokeLinecap="round" />
      <circle cx="45.5" cy="45.5" r="2" fill="#00ffcc" />
    </svg>
  );
}

function CompassPreview() {
  return (
    <svg viewBox="0 0 91 91" fill="none" className="w-full h-full">
      <circle cx="45.5" cy="45.5" r="40" fill="none" stroke="#00ffcc" strokeOpacity={0.15} />
      <text x="45.5" y="14" textAnchor="middle" fill="#ff4466" fontSize="8" fontFamily="monospace" fontWeight="bold">N</text>
      <text x="80" y="48" textAnchor="middle" fill="#00ffcc" fontSize="7" fontFamily="monospace" opacity={0.5}>E</text>
      <text x="45.5" y="82" textAnchor="middle" fill="#00ffcc" fontSize="7" fontFamily="monospace" opacity={0.5}>S</text>
      <text x="11" y="48" textAnchor="middle" fill="#00ffcc" fontSize="7" fontFamily="monospace" opacity={0.5}>W</text>
      <polygon points="45.5,20 42,50 45.5,45 49,50" fill="#ff4466" opacity={0.5} />
    </svg>
  );
}

function PomodoroPreview() {
  return (
    <svg viewBox="0 0 91 91" fill="none" className="w-full h-full">
      <circle cx="45.5" cy="45.5" r="38" fill="none" stroke="#333" strokeWidth="3" />
      <path d="M 45.5 7.5 A 38 38 0 1 1 20 75" fill="none" stroke="#00D4AA" strokeWidth="3" strokeLinecap="round" />
      <text x="45.5" y="42" textAnchor="middle" fill="#00D4AA" fontSize="14" fontFamily="monospace" fontWeight="bold">18:42</text>
      <text x="45.5" y="54" textAnchor="middle" fill="#00D4AA" fontSize="6" fontFamily="monospace" opacity={0.5}>FOCUS</text>
    </svg>
  );
}

function NetTopologyPreview() {
  const nodes: [number, number, string][] = [[20, 15, "#00D4AA"], [70, 15, "#FFB347"], [25, 50, "#00D4AA"], [65, 50, "#FFB347"]];
  return (
    <svg viewBox="0 0 91 62" fill="none" className="w-full h-full">
      <circle cx="45" cy="31" r="5" fill="#00D4AA" opacity={0.4} />
      {nodes.map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill={c} opacity={0.3} />
          <line x1="45" y1="31" x2={x} y2={y} stroke="#00D4AA" strokeOpacity={0.15} />
        </g>
      ))}
    </svg>
  );
}

function SystemMonitorPreview() {
  return (
    <svg viewBox="0 0 91 62" fill="none" className="w-full h-full">
      <rect x="4" y="4" width="40" height="25" rx="3" fill="#00D4AA" opacity={0.08} stroke="#00D4AA" strokeOpacity={0.2} />
      <text x="24" y="14" textAnchor="middle" fill="#00D4AA" fontSize="5" fontFamily="monospace" opacity={0.6}>CPU 23%</text>
      <rect x="48" y="4" width="40" height="25" rx="3" fill="#FFB347" opacity={0.08} stroke="#FFB347" strokeOpacity={0.2} />
      <text x="68" y="14" textAnchor="middle" fill="#FFB347" fontSize="5" fontFamily="monospace" opacity={0.6}>RAM 4.2G</text>
      <rect x="4" y="34" width="83" height="24" rx="3" fill="#8888ff" opacity={0.06} stroke="#8888ff" strokeOpacity={0.15} />
      <text x="45" y="48" textAnchor="middle" fill="#8888ff" fontSize="4" fontFamily="monospace" opacity={0.5}>11 modules · 24°C</text>
    </svg>
  );
}

function SceneControlPreview() {
  const scenes: [string, string][] = [["Morning", "#FFB347"], ["Focus", "#00D4AA"], ["Movie", "#8888ff"]];
  return (
    <svg viewBox="0 0 91 62" fill="none" className="w-full h-full">
      {scenes.map(([name, color], i) => (
        <g key={i}>
          <rect x="6" y={4 + i * 18} width="79" height="14" rx="4" fill={color} opacity={0.1} stroke={color} strokeOpacity={0.25} />
          <text x="45" y={14 + i * 18} textAnchor="middle" fill={color} fontSize="5" fontFamily="monospace" opacity={0.6}>{name}</text>
        </g>
      ))}
    </svg>
  );
}

function WaveformPreview() {
  return (
    <svg viewBox="0 0 71 71" fill="none" className="w-full h-full">
      <line x1="6" y1="35.5" x2="65" y2="35.5" stroke="#8888ff" strokeOpacity={0.1} strokeWidth="0.5" />
      <polyline points="6,35 10,28 14,40 18,25 22,42 26,30 30,38 34,22 38,45 42,28 46,40 50,32 54,38 58,30 62,35"
        fill="none" stroke="#8888ff" strokeOpacity={0.6} strokeWidth="1.5" />
    </svg>
  );
}

function VoiceAssistantPreview() {
  return (
    <svg viewBox="0 0 71 71" fill="none" className="w-full h-full">
      <circle cx="35.5" cy="30" r="15" fill="#8888ff" opacity={0.08} stroke="#8888ff" strokeOpacity={0.2} />
      <circle cx="35.5" cy="30" r="8" fill="#8888ff" opacity={0.15} />
      <circle cx="35.5" cy="30" r="3" fill="#8888ff" opacity={0.4} />
      <text x="35.5" y="56" textAnchor="middle" fill="#8888ff" fontSize="6" fontFamily="monospace" opacity={0.5}>Listening...</text>
    </svg>
  );
}

function IntercomPreview() {
  return (
    <svg viewBox="0 0 71 71" fill="none" className="w-full h-full">
      <circle cx="35.5" cy="35.5" r="20" fill="none" stroke="#8888ff" strokeOpacity={0.2} strokeWidth="1.5" />
      <path d="M 30 32 L 30 38 L 35 42 L 35 28 L 30 32" fill="#8888ff" opacity={0.4} />
      <path d="M 38 30 Q 42 35.5 38 41" fill="none" stroke="#8888ff" strokeOpacity={0.3} strokeWidth="1" />
      <path d="M 41 28 Q 47 35.5 41 43" fill="none" stroke="#8888ff" strokeOpacity={0.2} strokeWidth="1" />
    </svg>
  );
}

function DeityOraclePreview() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <circle cx="60" cy="60" r="55" fill="none" stroke="#ff88dd" strokeOpacity={0.2} />
      <circle cx="60" cy="55" r="15" fill="none" stroke="#ff88dd" strokeOpacity={0.15} />
      {[48, 60, 72, 40, 80].map((x, i) => (
        <circle key={i} cx={x} cy={[38, 28, 38, 32, 32][i]} r="3" fill="#ff88dd" opacity={0.3 - i * 0.02} />
      ))}
      <text x="60" y="95" textAnchor="middle" fill="#ff88dd" fontSize="6" fontFamily="monospace" opacity={0.4}>ATHENA</text>
    </svg>
  );
}

function FormCheckPreview() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <circle cx="60" cy="60" r="55" fill="none" stroke="#ff88dd" strokeOpacity={0.15} />
      <circle cx="60" cy="30" r="6" fill="none" stroke="#00D4AA" strokeOpacity={0.4} />
      <line x1="60" y1="36" x2="60" y2="60" stroke="#00D4AA" strokeOpacity={0.3} />
      <line x1="60" y1="42" x2="42" y2="55" stroke="#00D4AA" strokeOpacity={0.3} />
      <line x1="60" y1="42" x2="78" y2="55" stroke="#00D4AA" strokeOpacity={0.3} />
      <line x1="60" y1="60" x2="48" y2="82" stroke="#00D4AA" strokeOpacity={0.3} />
      <line x1="60" y1="60" x2="72" y2="82" stroke="#00D4AA" strokeOpacity={0.3} />
      <text x="60" y="100" textAnchor="middle" fill="#00D4AA" fontSize="5" fontFamily="monospace" opacity={0.5}>REPS: 12 · FORM: 94%</text>
    </svg>
  );
}

function GlamFilterPreview() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <circle cx="60" cy="60" r="55" fill="none" stroke="#ff88dd" strokeOpacity={0.15} />
      <ellipse cx="60" cy="52" rx="18" ry="22" fill="none" stroke="#ff88dd" strokeOpacity={0.12} />
      <circle cx="52" cy="48" r="3" fill="#ff88dd" opacity={0.12} />
      <circle cx="68" cy="48" r="3" fill="#ff88dd" opacity={0.12} />
      <path d="M 54 58 Q 60 62 66 58" fill="none" stroke="#ff88dd" strokeOpacity={0.2} />
      <text x="60" y="98" textAnchor="middle" fill="#ff88dd" fontSize="5" fontFamily="monospace" opacity={0.4}>Soft Glow</text>
    </svg>
  );
}

function SacredFormsPreview() {
  return (
    <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
      <polygon points="70,30 105,50 105,90 70,110 35,90 35,50" fill="none" stroke="#cc44ff" strokeOpacity={0.3} />
      <polygon points="70,40 95,53 95,83 70,96 45,83 45,53" fill="none" stroke="#00D4AA" strokeOpacity={0.2} />
      <line x1="70" y1="30" x2="70" y2="110" stroke="#cc44ff" strokeOpacity={0.1} />
      <line x1="35" y1="50" x2="105" y2="90" stroke="#cc44ff" strokeOpacity={0.1} />
      <line x1="105" y1="50" x2="35" y2="90" stroke="#cc44ff" strokeOpacity={0.1} />
      <circle cx="50" cy="45" r="1.5" fill="#cc44ff" opacity={0.3} />
      <circle cx="90" cy="65" r="1.5" fill="#cc44ff" opacity={0.25} />
    </svg>
  );
}

function ModelViewerPreview() {
  return (
    <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
      <rect x="30" y="40" width="80" height="60" rx="2" fill="none" stroke="#cc44ff" strokeOpacity={0.15} />
      <polygon points="70,30 30,40 30,100 70,90" fill="none" stroke="#cc44ff" strokeOpacity={0.2} />
      <polygon points="70,30 110,40 110,100 70,90" fill="none" stroke="#cc44ff" strokeOpacity={0.2} />
      <text x="70" y="120" textAnchor="middle" fill="#cc44ff" fontSize="6" fontFamily="monospace" opacity={0.4}>model.glb</text>
    </svg>
  );
}

function AlertBeaconPreview() {
  return (
    <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
      <circle cx="70" cy="60" r="20" fill="#ff4466" opacity={0.08} />
      <circle cx="70" cy="60" r="12" fill="#ff4466" opacity={0.15} />
      <text x="70" y="64" textAnchor="middle" fill="#ff4466" fontSize="14" fontFamily="monospace" fontWeight="bold" opacity={0.6}>!</text>
      <circle cx="42" cy="40" r="1.5" fill="#ff4466" opacity={0.2} />
      <circle cx="98" cy="50" r="1.5" fill="#ff4466" opacity={0.2} />
      <circle cx="55" cy="85" r="1.5" fill="#ff4466" opacity={0.15} />
      <text x="70" y="105" textAnchor="middle" fill="#ff4466" fontSize="5" fontFamily="monospace" opacity={0.4}>3 new alerts</text>
    </svg>
  );
}

// ─── 24 Interface Apps ─────────────────────────────────────────
const INTERFACES: InterfaceApp[] = [
  { name: "Weather Station", creator: "studio.ambient", moduleId: "screen-s", downloads: 12400, rating: 4.8, apis: ["CSS2DRenderer", "ShaderMaterial", "CanvasTexture"], libs: ["Three.js", "OpenWeather API"], description: "Live weather with rain particle shader background. CSS2D temperature overlay.", previewBg: "linear-gradient(180deg, #0a2a3a 0%, #001a14 100%)", previewContent: <WeatherPreview /> },
  { name: "Now Playing", creator: "waveform.labs", moduleId: "screen-s", downloads: 8900, rating: 4.6, apis: ["CanvasTexture", "ShaderMaterial", "CSS2DObject"], libs: ["Three.js", "Spotify API", "GSAP"], description: "Album art with audio-reactive glow shader. Track info as CSS2D overlays.", previewBg: "linear-gradient(180deg, #1a0a2e 0%, #0a0a1a 100%)", previewContent: <NowPlayingPreview /> },
  { name: "Week View", creator: "calflow.io", moduleId: "screen-s", downloads: 6200, rating: 4.5, apis: ["CSS3DObject", "CSS2DRenderer", "TextGeometry"], libs: ["Three.js", "Google Calendar", "date-fns"], description: "3D calendar cards that flip when scrolling. CSS3D perspective transforms.", previewBg: "linear-gradient(180deg, #0a1a2e 0%, #0a0a14 100%)", previewContent: <WeekViewPreview /> },

  { name: "Circadian Flow", creator: "bio.rhythm", moduleId: "glow", downloads: 15600, rating: 4.9, apis: ["ShaderMaterial", "DataTexture", "Color", "Clock"], libs: ["Three.js", "sunrise-sunset API"], description: "16×16 LED gradient that follows the sun. Warm amber dawn, cool blue noon, deep red dusk.", previewBg: "linear-gradient(135deg, #2a1800 0%, #0a0a14 100%)", previewContent: <CircadianPreview /> },
  { name: "Notify Pulse", creator: "alert.studio", moduleId: "glow", downloads: 9800, rating: 4.7, apis: ["ShaderMaterial", "Color", "MathUtils"], libs: ["Three.js", "MQTT.js"], description: "Color-coded notification pulses. Blue = message, green = delivery, red = alert.", previewBg: "linear-gradient(135deg, #001a2e 0%, #0a0a14 100%)", previewContent: <NotifyPulsePreview /> },
  { name: "Breathe", creator: "zen.modules", moduleId: "glow", downloads: 7200, rating: 4.8, apis: ["ShaderMaterial", "DataTexture", "Clock", "MathUtils"], libs: ["Three.js"], description: "Guided breathing meditation. LEDs expand/contract with 4-7-8 breathing pattern.", previewBg: "linear-gradient(135deg, #1a0a00 0%, #0a0a14 100%)", previewContent: <BreathePreview /> },

  { name: "Spectrum VU", creator: "audio.viz", moduleId: "pixel", downloads: 18200, rating: 4.9, apis: ["InstancedMesh", "AudioAnalyser", "AudioListener", "Color"], libs: ["Three.js", "Web Audio API"], description: "Real-time FFT visualization. 64-band spectrum with green-yellow-red gradient.", previewBg: "linear-gradient(0deg, #0a0a0a 0%, #1a0a14 100%)", previewContent: <VUMeterPreview /> },
  { name: "Pixel Canvas", creator: "retro.studio", moduleId: "pixel", downloads: 11300, rating: 4.6, apis: ["InstancedMesh", "BufferAttribute", "Color", "Raycaster"], libs: ["Three.js", "Pixi.js"], description: "Draw pixel art from your phone. 64×32 canvas with 16-color palette.", previewBg: "linear-gradient(0deg, #0a0a14 0%, #0a0a1a 100%)", previewContent: <PixelCanvasPreview /> },
  { name: "Snake Classic", creator: "arcade.wall", moduleId: "pixel", downloads: 14500, rating: 4.7, apis: ["InstancedMesh", "Clock", "Color", "MathUtils"], libs: ["Three.js"], description: "Classic snake game on your wall. Control via phone or Controller module.", previewBg: "linear-gradient(0deg, #0a0a0a 0%, #001a0a 100%)", previewContent: <SnakePreview /> },

  { name: "Analog Lux", creator: "clockface.co", moduleId: "round", downloads: 21000, rating: 4.9, apis: ["RingGeometry", "TorusGeometry", "ShaderMaterial", "Clock"], libs: ["Three.js"], description: "Minimal analog clock with glowing teal hands. LED halo pulses on the hour.", previewBg: "radial-gradient(circle, #001a14 0%, #0a0a14 100%)", previewContent: <AnalogClockPreview /> },
  { name: "Compass Nav", creator: "wayfinder.ui", moduleId: "round", downloads: 5400, rating: 4.4, apis: ["RingGeometry", "ShaderMaterial", "MathUtils", "Sprite"], libs: ["Three.js", "Geolocation API"], description: "Digital compass. Rotates to true north via phone magnetometer relay.", previewBg: "radial-gradient(circle, #0a1a0a 0%, #0a0a14 100%)", previewContent: <CompassPreview /> },
  { name: "Pomodoro Ring", creator: "focus.flow", moduleId: "round", downloads: 8700, rating: 4.7, apis: ["RingGeometry", "ShaderMaterial", "Clock", "CSS2DObject"], libs: ["Three.js", "GSAP"], description: "Circular countdown timer. Glowing ring depletes. Break mode glows amber.", previewBg: "radial-gradient(circle, #1a0a00 0%, #0a0a14 100%)", previewContent: <PomodoroPreview /> },

  { name: "Net Topology", creator: "mesh.ops", moduleId: "hub", downloads: 4200, rating: 4.5, apis: ["CSS3DRenderer", "Raycaster", "CSS2DObject"], libs: ["Three.js", "D3.js", "Sigma.js"], description: "Live network graph of connected modules. Nodes pulse with activity.", previewBg: "linear-gradient(135deg, #001a14 0%, #0a0a14 100%)", previewContent: <NetTopologyPreview /> },
  { name: "System Monitor", creator: "ops.dashboard", moduleId: "hub", downloads: 6800, rating: 4.6, apis: ["CSS2DRenderer", "CSS3DObject", "CanvasTexture"], libs: ["Three.js", "Chart.js", "ECharts"], description: "CPU, RAM, temp, network stats. Sparkline graphs. Threshold alerts.", previewBg: "linear-gradient(135deg, #0a1a0a 0%, #0a0a14 100%)", previewContent: <SystemMonitorPreview /> },
  { name: "Scene Control", creator: "home.maestro", moduleId: "hub", downloads: 9100, rating: 4.8, apis: ["CSS3DRenderer", "Raycaster", "CSS2DObject", "CSS3DObject"], libs: ["Three.js", "Home Assistant", "MQTT.js"], description: "Visual scene switcher. Morning, Focus, Movie, Sleep — one tap.", previewBg: "linear-gradient(135deg, #0a0a2e 0%, #0a0a14 100%)", previewContent: <SceneControlPreview /> },

  { name: "Waveform Live", creator: "audio.viz", moduleId: "voice", downloads: 7600, rating: 4.5, apis: ["AudioAnalyser", "ShaderMaterial", "BufferGeometry"], libs: ["Three.js", "Web Audio API"], description: "Real-time voice waveform. Glowing oscilloscope responding to room audio.", previewBg: "linear-gradient(135deg, #0a0a2e 0%, #0a0a14 100%)", previewContent: <WaveformPreview /> },
  { name: "Voice Assistant", creator: "talk.wall", moduleId: "voice", downloads: 13200, rating: 4.7, apis: ["AudioAnalyser", "ShaderMaterial", "CSS2DRenderer"], libs: ["Three.js", "Whisper API", "ElevenLabs"], description: "Talk to your wall. Animated listening indicator with voice-reactive shader.", previewBg: "linear-gradient(135deg, #1a0a2e 0%, #0a0a14 100%)", previewContent: <VoiceAssistantPreview /> },
  { name: "Intercom", creator: "connect.io", moduleId: "voice", downloads: 4800, rating: 4.3, apis: ["AudioListener", "AudioAnalyser", "PositionalAudio"], libs: ["Three.js", "WebRTC"], description: "Room-to-room intercom via multiple Voice modules. Directional audio.", previewBg: "linear-gradient(135deg, #0a1a2e 0%, #0a0a14 100%)", previewContent: <IntercomPreview /> },

  { name: "Deity Oracle", creator: "sacred.circuits", moduleId: "mirror", downloads: 6700, rating: 4.8, apis: ["VideoTexture", "EffectComposer", "UnrealBloomPass", "BufferGeometry"], libs: ["Three.js", "MediaPipe", "TensorFlow.js"], description: "AR deity crown overlays. 21 deity filters. Sacred geometry halo with bloom.", previewBg: "radial-gradient(circle, #2a0a2e 0%, #0a0a14 100%)", previewContent: <DeityOraclePreview /> },
  { name: "Form Check", creator: "fit.mirror", moduleId: "mirror", downloads: 8900, rating: 4.6, apis: ["VideoTexture", "SkeletonHelper", "Bone", "CSS2DRenderer"], libs: ["Three.js", "MediaPipe Pose"], description: "Exercise form checker. Skeleton overlay with joint angle feedback.", previewBg: "radial-gradient(circle, #0a2a0a 0%, #0a0a14 100%)", previewContent: <FormCheckPreview /> },
  { name: "Glam Filter", creator: "beauty.lens", moduleId: "mirror", downloads: 5100, rating: 4.4, apis: ["VideoTexture", "ShaderMaterial", "EffectComposer", "GlitchPass"], libs: ["Three.js", "MediaPipe Face Mesh"], description: "Real-time beauty filters. Skin smoothing shader. Accurate color lighting.", previewBg: "radial-gradient(circle, #2a1a2e 0%, #0a0a14 100%)", previewContent: <GlamFilterPreview /> },

  { name: "Sacred Forms", creator: "sacred.circuits", moduleId: "holo", downloads: 11200, rating: 4.9, apis: ["Points", "EdgesGeometry", "IcosahedronGeometry", "ShaderMaterial"], libs: ["Three.js"], description: "Rotating sacred geometry — Metatron's Cube, Flower of Life. Particle clouds orbit wireframes.", previewBg: "linear-gradient(135deg, #1a0a2e 0%, #0a0a14 100%)", previewContent: <SacredFormsPreview /> },
  { name: "3D Viewer", creator: "model.hub", moduleId: "holo", downloads: 7800, rating: 4.5, apis: ["Points", "BufferGeometry", "MeshStandardMaterial", "OrbitControls"], libs: ["Three.js", "three-gltf-loader"], description: "Load any GLTF 3D model as holographic wireframe. Community model library.", previewBg: "linear-gradient(135deg, #0a1a2e 0%, #0a0a14 100%)", previewContent: <ModelViewerPreview /> },
  { name: "Alert Beacon", creator: "notify.3d", moduleId: "holo", downloads: 3900, rating: 4.3, apis: ["Points", "PointsMaterial", "ShaderMaterial", "Color"], libs: ["Three.js", "MQTT.js"], description: "Floating 3D notification beacon. Particle burst on new notification.", previewBg: "linear-gradient(135deg, #2a0a0a 0%, #0a0a14 100%)", previewContent: <AlertBeaconPreview /> },
];

const MODULE_TABS = [
  { id: "all", label: "All" },
  ...["screen-s", "glow", "pixel", "round", "hub", "voice", "mirror", "holo"].map((id) => ({
    id, label: MODULE_MAP[id]?.name ?? id,
  })),
];

function formatDownloads(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function InterfaceCard({ app }: { app: InterfaceApp }) {
  const mod = MODULE_MAP[app.moduleId];
  if (!mod) return null;
  const maxDim = 140;
  const scale = maxDim / Math.max(mod.width_mm, mod.height_mm);
  const pw = mod.width_mm * scale;
  const ph = mod.height_mm * scale;

  return (
    <div className="group rounded-2xl border border-border/50 bg-surface-raised/50 overflow-hidden transition-all duration-300 hover:bg-surface-raised hover:border-border">
      <div className="relative flex items-center justify-center p-4" style={{ background: app.previewBg, minHeight: 160 }}>
        <div style={{ width: pw, height: ph, borderRadius: mod.shape === "circle" ? "50%" : 8, border: `1.5px solid ${mod.color}30`, boxShadow: `0 0 30px ${mod.color}15`, overflow: "hidden" }}>
          {app.previewContent}
        </div>
        <div className="absolute top-3 left-3 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold backdrop-blur-md" style={{ color: mod.color, backgroundColor: `${mod.color}15`, border: `1px solid ${mod.color}25` }}>
          {mod.name}
        </div>
        <button className="absolute bottom-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-mono backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1" style={{ color: mod.color, backgroundColor: `${mod.color}15`, border: `1px solid ${mod.color}30` }}>
          <Eye className="h-3 w-3" />Preview
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="font-semibold text-sm">{app.name}</h4>
            <p className="text-[11px] text-muted-foreground font-mono">{app.creator}</p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-0.5"><Star className="h-3 w-3 text-amber" fill="currentColor" />{app.rating}</span>
            <span className="flex items-center gap-0.5"><Download className="h-3 w-3" />{formatDownloads(app.downloads)}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{app.description}</p>
        <div className="flex flex-wrap gap-1">
          {app.apis.slice(0, 3).map((api) => (
            <span key={api} className="rounded px-1.5 py-0.5 text-[9px] font-mono bg-teal/8 text-teal/70 border border-teal/15">{api}</span>
          ))}
          {app.libs.slice(0, 2).map((lib) => (
            <span key={lib} className="rounded px-1.5 py-0.5 text-[9px] font-mono bg-amber/8 text-amber/70 border border-amber/15">{lib}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

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

  const filtered = activeTab === "all" ? INTERFACES : INTERFACES.filter((a) => a.moduleId === activeTab);

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
            <br /><span className="text-foreground font-medium">Every module is a platform.</span>{" "}Every interface is open source.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {MODULE_TABS.map((tab) => {
            const mod = MODULE_MAP[tab.id];
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all"
                style={{ backgroundColor: isActive ? `${mod?.color ?? "#00D4AA"}15` : "transparent", border: `1px solid ${isActive ? (mod?.color ?? "#00D4AA") + "40" : "transparent"}`, color: isActive ? mod?.color ?? "#00D4AA" : "#8888aa" }}>
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease-out, transform 0.6s ease-out" }}>
          {filtered.map((app) => <InterfaceCard key={`${app.moduleId}-${app.name}`} app={app} />)}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
          {[["24", "Interfaces", "text-teal"], ["8", "Module Types", "text-amber"], ["220k+", "Downloads", "text-foreground"], ["Open", "Source", "text-purple-400"]].map(([val, label, cls]) => (
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
