"use client";

import { useEffect, useRef, useState } from "react";

const CONFIGS = [
  {
    name: "Starter",
    price: 185,
    description: "The essentials. A Hub, a screen, ambient light, and presence detection. Enough to prove the concept and fall in love.",
    color: "#00D4AA",
    modules: [
      { name: "Hub", color: "#00D4AA", count: 1 },
      { name: "Screen-S", color: "#00D4AA", count: 1 },
      { name: "Glow", color: "#FFB347", count: 1 },
      { name: "Sense", color: "#44ddff", count: 1 },
      { name: "Brick", color: "#555577", count: 2 },
    ],
    grid: [
      [null, "Brick", "Glow", null],
      [null, "Screen-S", "Sense", null],
      [null, "Hub", "Brick", null],
    ],
  },
  {
    name: "Media Center",
    price: 454,
    description: "Entertainment-grade. Dual screens, pixel art, voice control, ambient sync. Movie nights will never be the same.",
    color: "#FFB347",
    modules: [
      { name: "Hub", color: "#00D4AA", count: 1 },
      { name: "Screen-S", color: "#00D4AA", count: 2 },
      { name: "Glow", color: "#FFB347", count: 2 },
      { name: "Pixel", color: "#ff4466", count: 1 },
      { name: "Voice", color: "#8888ff", count: 1 },
      { name: "Sense", color: "#44ddff", count: 1 },
      { name: "Brick", color: "#555577", count: 2 },
    ],
    grid: [
      ["Glow", "Screen-S", "Screen-S", "Glow"],
      ["Brick", "Pixel", "Voice", "Brick"],
      [null, "Hub", "Sense", null],
    ],
  },
  {
    name: "Premium",
    price: 616,
    description: "The full experience. Holographic display, circular AMOLED, smart mirror, wearable ring. Your wall becomes a living entity.",
    color: "#cc44ff",
    modules: [
      { name: "Hub", color: "#00D4AA", count: 1 },
      { name: "Screen-S", color: "#00D4AA", count: 1 },
      { name: "Glow", color: "#FFB347", count: 2 },
      { name: "Pixel", color: "#ff4466", count: 1 },
      { name: "Voice", color: "#8888ff", count: 1 },
      { name: "Sense", color: "#44ddff", count: 1 },
      { name: "Holo", color: "#cc44ff", count: 1 },
      { name: "Round", color: "#00ffcc", count: 1 },
      { name: "Brick", color: "#555577", count: 1 },
    ],
    grid: [
      ["Glow", "Holo", "Round", "Glow"],
      ["Pixel", "Screen-S", "Voice", "Sense"],
      [null, "Hub", "Brick", null],
    ],
  },
];

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

const MODULE_COLORS: Record<string, string> = {
  Hub: "#00D4AA",
  "Screen-S": "#00D4AA",
  Glow: "#FFB347",
  Pixel: "#ff4466",
  Voice: "#8888ff",
  Sense: "#44ddff",
  Brick: "#555577",
  Holo: "#cc44ff",
  Round: "#00ffcc",
};

export function Configurations() {
  const { ref, visible } = useInView(0.1);

  return (
    <section id="configurations" className="relative py-24 md:py-32 smoke-bg noise-overlay">
      <div className="mx-auto max-w-6xl px-6 relative z-[1]">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-teal tracking-widest uppercase section-label">Presets</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Ready-made configurations
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Not sure where to start? Pick a preset, or use these as inspiration for your own layout.
          </p>
        </div>

        {/* Config cards */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {CONFIGS.map((config, index) => (
            <div
              key={config.name}
              className="group relative rounded-2xl border border-border/50 bg-surface-raised/50 p-6 transition-all duration-300 hover:bg-surface-raised"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s, border-color 0.3s, background-color 0.3s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${config.color}40`;
                e.currentTarget.style.boxShadow = `0 8px 30px ${config.color}12`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Config name + price */}
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

              {/* Mini grid diagram */}
              <div className="mb-5 rounded-xl border border-white/5 bg-[#0d0d1a]/50 p-3">
                <div className="grid grid-cols-4 gap-1.5">
                  {config.grid.flat().map((cell, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-md flex items-center justify-center text-[8px] font-mono font-bold transition-transform duration-300 group-hover:scale-[1.02]"
                      style={
                        cell
                          ? {
                              backgroundColor: `${MODULE_COLORS[cell]}18`,
                              border: `1px solid ${MODULE_COLORS[cell]}35`,
                              color: `${MODULE_COLORS[cell]}cc`,
                            }
                          : {
                              backgroundColor: '#1a1a2e30',
                              border: '1px dashed #2a2a4a40',
                            }
                      }
                    >
                      {cell && cell.length <= 5 ? cell : cell ? cell.slice(0, 3) : ''}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {config.description}
              </p>

              {/* Module badges */}
              <div className="flex flex-wrap gap-1.5">
                {config.modules.map((mod) => (
                  <span
                    key={mod.name}
                    className="rounded-md px-2 py-0.5 text-[10px] font-mono font-medium"
                    style={{
                      backgroundColor: `${mod.color}12`,
                      color: `${mod.color}cc`,
                      border: `1px solid ${mod.color}20`,
                    }}
                  >
                    {mod.name}{mod.count > 1 ? ` x${mod.count}` : ''}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href="#configurator"
            className="inline-flex items-center gap-2 rounded-xl border border-teal/30 px-6 py-2.5 text-sm font-medium text-teal transition-all hover:bg-teal/10 hover:border-teal/50 hover:shadow-[0_0_20px_#00D4AA15]"
          >
            Or build your own
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
