"use client";

import { useState } from "react";
import { useInView } from "@/hooks/use-in-view";

const STYLES = [
  {
    name: "Minimal",
    subtitle: "Cyberpunk",
    image: "/renders/screen-s-style-minimal.png",
    color: "#00D4AA",
    texture: "texture-minimal",
    description: "Smoke acrylic with visible green PCB underneath. Teal LED glow bleeds through the translucent panel. Dark matte housing — stealth when off, alive when on.",
  },
  {
    name: "Rounded",
    subtitle: "Apple",
    image: "/renders/screen-s-style-rounded.png",
    color: "#ffffff",
    texture: "texture-rounded",
    description: "Smooth white matte plastic with rounded edges. Subtle highlight reflections. Premium consumer feel — the module that looks at home next to your HomePod.",
  },
  {
    name: "Baroque",
    subtitle: "Classical",
    image: "/renders/screen-s-style-baroque.png",
    color: "#D4B038",
    texture: "texture-baroque",
    description: "Dark housing with gold filigree trim and ornamental corner flourishes. Classical ornamentation meets digital intelligence. For walls with character.",
  },
  {
    name: "Wood",
    subtitle: "Warm",
    image: "/renders/screen-s-style-wood.png",
    color: "#B8860B",
    texture: "texture-wood",
    description: "Walnut veneer grain texture with brass hardware accents. Warm amber glow. The fireplace aesthetic — technology that feels like furniture.",
  },
];

const HOUSING_COLORS = [
  { name: "Matte Black", hex: "#0A0A0D" },
  { name: "Midnight Navy", hex: "#0D1B2A" },
  { name: "Forest Green", hex: "#1B2D1B" },
  { name: "Burgundy", hex: "#2D1B1B" },
  { name: "Pearl White", hex: "#E8E8E8" },
];

export function Customization() {
  const [activeStyle, setActiveStyle] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const { ref, visible } = useInView(0.05);

  const current = STYLES[activeStyle];
  const currentColor = HOUSING_COLORS[activeColor];

  return (
    <section id="customization" className="relative py-28 md:py-40 section-alt" ref={ref} aria-label="Customization Styles">
      <div className="section-divider mb-28" />
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          className="text-center mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          }}
        >
          <span className="font-mono text-xs text-amber tracking-widest uppercase section-label">
            Customization
          </span>
          <h2 className="mt-4 tracking-tight">
            Four styles. One wall.
          </h2>
          <p className="mt-5 text-muted-foreground/70 max-w-xl mx-auto text-lg">
            Choose your aesthetic. Every module ships in your chosen casing style.
          </p>
        </div>

        {/* Style selector + preview */}
        <div
          className="grid md:grid-cols-2 gap-10 items-start mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s",
          }}
        >
          {/* Preview with material texture overlay */}
          <div className={`relative rounded-2xl overflow-hidden border border-border/30 bg-[#050510] ${current.texture}`}>
            <img
              src={current.image}
              alt={`Screen-S in ${current.name} style`}
              className="w-full h-auto object-contain relative z-[1]"
              style={{ minHeight: 320 }}
            />
            <div
              className="absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-mono font-bold backdrop-blur-xl"
              style={{
                color: current.color,
                backgroundColor: `${current.color}15`,
                border: `1px solid ${current.color}30`,
              }}
            >
              {current.name} — {current.subtitle}
            </div>
          </div>

          {/* Style buttons */}
          <div className="space-y-3">
            {STYLES.map((style, i) => (
              <button
                key={style.name}
                onClick={() => setActiveStyle(i)}
                className={`w-full text-left rounded-xl border p-5 transition-all duration-300 ${style.texture}`}
                style={{
                  borderColor: i === activeStyle ? `${style.color}50` : "transparent",
                  backgroundColor: i === activeStyle ? `${style.color}06` : "rgba(20,20,35,0.5)",
                  boxShadow: i === activeStyle ? `0 0 25px ${style.color}10` : "none",
                }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="h-4 w-4 rounded-full border-2"
                    style={{
                      backgroundColor: i === activeStyle ? style.color : "transparent",
                      borderColor: style.color,
                    }}
                  />
                  <span
                    className="font-bold text-sm"
                    style={{ color: i === activeStyle ? style.color : "#8888aa" }}
                  >
                    {style.name}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground/50">
                    {style.subtitle}
                  </span>
                </div>
                {i === activeStyle && (
                  <p className="text-xs text-muted-foreground/60 leading-relaxed mt-2 ml-7">
                    {style.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 4-up comparison strip */}
        <div className="grid grid-cols-4 gap-3 mb-20">
          {STYLES.map((style, i) => (
            <button
              key={style.name}
              onClick={() => setActiveStyle(i)}
              className={`rounded-xl overflow-hidden border transition-all duration-300 group ${style.texture}`}
              style={{
                borderColor: i === activeStyle ? `${style.color}50` : "transparent",
              }}
            >
              <div className="relative bg-[#050510] aspect-video">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-2 text-center">
                <span
                  className="text-[10px] font-mono font-bold"
                  style={{ color: i === activeStyle ? style.color : "#666" }}
                >
                  {style.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Housing Color Picker */}
        <div
          className="max-w-2xl mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease-out 0.3s, transform 0.7s ease-out 0.3s",
          }}
        >
          <h3 className="text-center text-lg font-bold mb-6 tracking-tight">Housing Colors</h3>
          <div className="flex justify-center gap-4 mb-6">
            {HOUSING_COLORS.map((color, i) => (
              <button
                key={color.name}
                onClick={() => setActiveColor(i)}
                className="group flex flex-col items-center gap-2"
                title={color.name}
              >
                <div
                  className="h-12 w-12 rounded-full border-2 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: color.hex,
                    borderColor: i === activeColor ? "#00D4AA" : color.hex === "#E8E8E8" ? "#666" : "transparent",
                    boxShadow: i === activeColor ? "0 0 15px rgba(0,212,170,0.3)" : "none",
                  }}
                />
                <span className={`text-[9px] font-mono transition-colors ${i === activeColor ? "text-teal" : "text-muted-foreground/40"}`}>
                  {color.name}
                </span>
              </button>
            ))}
          </div>

          {/* Color preview module */}
          <div className="flex justify-center">
            <div
              className="rounded-xl p-6 border transition-all duration-500"
              style={{
                backgroundColor: currentColor.hex,
                borderColor: currentColor.hex === "#E8E8E8" ? "#ccc" : `${currentColor.hex}80`,
                boxShadow: `0 0 40px ${currentColor.hex}20`,
                width: 200,
                height: 120,
              }}
            >
              <div className="w-full h-full rounded-lg border flex items-center justify-center"
                style={{
                  borderColor: currentColor.hex === "#E8E8E8" ? "#aaa" : "rgba(255,255,255,0.08)",
                  background: currentColor.hex === "#E8E8E8"
                    ? "linear-gradient(135deg, rgba(0,0,0,0.02), rgba(0,0,0,0.06))"
                    : "linear-gradient(135deg, rgba(0,212,170,0.05), rgba(255,179,71,0.03))",
                }}
              >
                <span
                  className="text-xs font-mono"
                  style={{ color: currentColor.hex === "#E8E8E8" ? "#333" : "#00D4AA" }}
                >
                  {currentColor.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
