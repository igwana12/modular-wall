"use client";

import { useRef, useState, useEffect } from "react";

const STYLES = [
  {
    name: "Minimal",
    subtitle: "Cyberpunk",
    image: "/renders/screen-s-style-minimal.png",
    color: "#00D4AA",
    description: "Smoke acrylic, dark matte housing. Electronics visible through translucent panels. Stealth glow — black when off, alive when on.",
  },
  {
    name: "Rounded",
    subtitle: "Apple",
    image: "/renders/screen-s-style-rounded.png",
    color: "#ffffff",
    description: "Smooth corners, white/silver accent. Premium consumer feel. The module that looks at home next to your HomePod.",
  },
  {
    name: "Baroque",
    subtitle: "Classical",
    image: "/renders/screen-s-style-baroque.png",
    color: "#DAA520",
    description: "Decorative corner flourishes, brass accents. Classical ornamentation meets digital intelligence. For walls with character.",
  },
  {
    name: "Wood",
    subtitle: "Warm",
    image: "/renders/screen-s-style-wood.png",
    color: "#FFB347",
    description: "Wood veneer, brass hardware. Warm amber glow. The fireplace aesthetic — technology that feels like furniture.",
  },
];

export function Customization() {
  const [activeStyle, setActiveStyle] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const current = STYLES[activeStyle];

  return (
    <section id="customization" className="relative py-24 md:py-32 smoke-bg noise-overlay" ref={ref} aria-label="Customization Styles">
      <div className="mx-auto max-w-6xl px-6 relative z-[1]">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-amber tracking-widest uppercase section-label">
            Customization
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Four styles. One wall.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Choose your aesthetic. Every module ships in your chosen casing style.
            Mix and match — or keep it uniform.
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 gap-8 items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          {/* Preview image */}
          <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-[#0D0D1A]">
            <img
              src={current.image}
              alt={`Screen-S module in ${current.name} style`}
              className="w-full h-auto object-contain transition-opacity duration-500"
              style={{ minHeight: 300 }}
            />
            {/* Style badge */}
            <div
              className="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-mono font-bold backdrop-blur-md"
              style={{
                color: current.color,
                backgroundColor: `${current.color}15`,
                border: `1px solid ${current.color}30`,
              }}
            >
              {current.name} — {current.subtitle}
            </div>
          </div>

          {/* Style selector */}
          <div className="space-y-3">
            {STYLES.map((style, i) => (
              <button
                key={style.name}
                onClick={() => setActiveStyle(i)}
                className="w-full text-left rounded-xl border p-4 transition-all duration-300"
                style={{
                  borderColor: i === activeStyle ? `${style.color}60` : "transparent",
                  backgroundColor: i === activeStyle ? `${style.color}08` : "#1a1a2e30",
                  boxShadow: i === activeStyle ? `0 0 20px ${style.color}15` : "none",
                }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: style.color }}
                  />
                  <span
                    className="font-semibold text-sm"
                    style={{ color: i === activeStyle ? style.color : "#8888aa" }}
                  >
                    {style.name}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {style.subtitle}
                  </span>
                </div>
                {i === activeStyle && (
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2 ml-6">
                    {style.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 4-up comparison strip */}
        <div className="mt-12 grid grid-cols-4 gap-3">
          {STYLES.map((style, i) => (
            <button
              key={style.name}
              onClick={() => setActiveStyle(i)}
              className="rounded-xl overflow-hidden border transition-all duration-300 group"
              style={{
                borderColor: i === activeStyle ? `${style.color}60` : "transparent",
                boxShadow: i === activeStyle ? `0 0 15px ${style.color}15` : "none",
              }}
            >
              <div className="relative bg-[#0D0D1A] aspect-video">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-2 text-center bg-surface-raised/30">
                <span
                  className="text-[10px] font-mono font-bold"
                  style={{ color: i === activeStyle ? style.color : "#8888aa" }}
                >
                  {style.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
