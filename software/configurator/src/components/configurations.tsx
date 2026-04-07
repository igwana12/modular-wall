"use client";

import { useEffect, useRef, useState } from "react";
import { MODULES, type ModuleType } from "@/lib/modules";

// Real layouts using mm positions on a mini 400x280mm canvas
interface LayoutModule {
  id: string;
  x: number;
  y: number;
}

const CONFIGS = [
  {
    name: "Starter",
    price: 206,
    description:
      "The essentials. A Hub, a screen, ambient light, and presence detection. Enough to prove the concept and fall in love.",
    color: "#00D4AA",
    modules: [
      { name: "Hub", count: 1 },
      { name: "Screen-S", count: 1 },
      { name: "Glow", count: 1 },
      { name: "Sense", count: 1 },
    ],
    layout: [
      { id: "hub", x: 44, y: 0 },
      { id: "screen-s", x: 157, y: 0 },
      { id: "glow", x: 0, y: 84 },
      { id: "sense", x: 93, y: 84 },
    ] as LayoutModule[],
    canvasW: 260,
    canvasH: 180,
  },
  {
    name: "Media Center",
    price: 453,
    description:
      "Entertainment-grade. Wide Pixel display, dual screens, voice control, ambient sync. Movie nights will never be the same.",
    color: "#FFB347",
    modules: [
      { name: "Hub", count: 1 },
      { name: "Screen-S", count: 2 },
      { name: "Glow", count: 2 },
      { name: "Pixel", count: 1 },
      { name: "Voice", count: 1 },
      { name: "Sense", count: 1 },
    ],
    layout: [
      { id: "pixel", x: 0, y: 0 },
      { id: "glow", x: 188, y: 0 },
      { id: "glow", x: 281, y: 0 },
      { id: "screen-s", x: 0, y: 108 },
      { id: "screen-s", x: 98, y: 108 },
      { id: "voice", x: 196, y: 93 },
      { id: "hub", x: 289, y: 93 },
      { id: "sense", x: 196, y: 186 },
    ] as LayoutModule[],
    canvasW: 400,
    canvasH: 260,
  },
  {
    name: "Premium",
    price: 701,
    description:
      "The full experience. Holographic display, circular AMOLED, smart mirror, e-ink. Your wall becomes a living entity.",
    color: "#cc44ff",
    modules: [
      { name: "Hub", count: 1 },
      { name: "Screen-S", count: 1 },
      { name: "Screen-M", count: 1 },
      { name: "Glow", count: 1 },
      { name: "Pixel", count: 1 },
      { name: "Voice", count: 1 },
      { name: "Sense", count: 1 },
      { name: "Holo", count: 1 },
      { name: "Round", count: 1 },
      { name: "Mirror", count: 1 },
      { name: "Brick", count: 1 },
    ],
    layout: [
      { id: "holo", x: 0, y: 0 },
      { id: "screen-m", x: 162, y: 0 },
      { id: "round", x: 328, y: 0 },
      { id: "mirror", x: 441, y: 0 },
      { id: "pixel", x: 0, y: 162 },
      { id: "glow", x: 188, y: 116 },
      { id: "voice", x: 281, y: 113 },
      { id: "hub", x: 374, y: 142 },
      { id: "sense", x: 487, y: 142 },
      { id: "screen-s", x: 188, y: 209 },
      { id: "brick", x: 286, y: 206 },
    ] as LayoutModule[],
    canvasW: 580,
    canvasH: 340,
  },
];

const MODULE_MAP = Object.fromEntries(MODULES.map((m) => [m.id, m]));

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function MiniLayout({
  layout,
  canvasW,
  canvasH,
}: {
  layout: LayoutModule[];
  canvasW: number;
  canvasH: number;
}) {
  // Scale the mm layout into a ~200px wide mini diagram
  const displayW = 220;
  const scale = displayW / canvasW;
  const displayH = canvasH * scale;

  return (
    <div
      className="relative mx-auto rounded-lg border border-white/5 bg-[#0d0d1a]/50 overflow-hidden"
      style={{ width: displayW, height: displayH }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,170,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.05) 1px, transparent 1px)",
          backgroundSize: `${22 * scale}px ${22 * scale}px`,
        }}
      />

      {layout.map((item, i) => {
        const mod = MODULE_MAP[item.id];
        if (!mod) return null;
        const w = mod.width_mm * scale;
        const h = mod.height_mm * scale;
        const x = item.x * scale;
        const y = item.y * scale;

        return (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              left: x,
              top: y,
              width: w,
              height: h,
              borderRadius: mod.shape === "circle" ? "50%" : 3,
              border: `1px solid ${mod.color}50`,
              backgroundColor: `${mod.color}15`,
            }}
          >
            <span
              className="font-mono font-bold leading-none"
              style={{
                fontSize: Math.max(6, Math.min(9, w / 6)),
                color: `${mod.color}cc`,
              }}
            >
              {mod.name.length <= 5 ? mod.name : mod.name.slice(0, 4)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Configurations() {
  const { ref, visible } = useInView(0.1);

  return (
    <section id="configurations" className="relative py-24 md:py-32 smoke-bg noise-overlay">
      <div className="mx-auto max-w-6xl px-6 relative z-[1]">
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-teal tracking-widest uppercase section-label">
            Presets
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Ready-made configurations
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Real dimensions, real layouts. See how modules fit together at actual scale.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {CONFIGS.map((config, index) => (
            <div
              key={config.name}
              className="group relative rounded-2xl border border-border/50 bg-surface-raised/50 p-6 transition-all duration-300 hover:bg-surface-raised"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s, border-color 0.3s, background-color 0.3s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${config.color}40`;
                e.currentTarget.style.boxShadow = `0 8px 30px ${config.color}12`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Name + price */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: config.color }}>
                  {config.name}
                </h3>
                <div
                  className="rounded-full px-3 py-1 text-sm font-mono font-bold tabular-price backdrop-blur-md"
                  style={{
                    color: config.color,
                    backgroundColor: `${config.color}12`,
                    border: `1px solid ${config.color}25`,
                  }}
                >
                  ${config.price}
                </div>
              </div>

              {/* Real-scale mini layout */}
              <div className="mb-5">
                <MiniLayout layout={config.layout} canvasW={config.canvasW} canvasH={config.canvasH} />
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {config.description}
              </p>

              {/* Module badges */}
              <div className="flex flex-wrap gap-1.5">
                {config.modules.map((mod) => {
                  const modData = MODULES.find(
                    (m) => m.name === mod.name
                  );
                  const color = modData?.color ?? "#888";
                  return (
                    <span
                      key={mod.name}
                      className="rounded-md px-2 py-0.5 text-[10px] font-mono font-medium"
                      style={{
                        backgroundColor: `${color}12`,
                        color: `${color}cc`,
                        border: `1px solid ${color}20`,
                      }}
                    >
                      {mod.name}
                      {mod.count > 1 ? ` ×${mod.count}` : ""}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#configurator"
            className="inline-flex items-center gap-2 rounded-xl border border-teal/30 px-6 py-2.5 text-sm font-medium text-teal transition-all hover:bg-teal/10 hover:border-teal/50 hover:shadow-[0_0_20px_#00D4AA15]"
          >
            Or build your own
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
