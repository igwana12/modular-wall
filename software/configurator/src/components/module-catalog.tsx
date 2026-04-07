"use client";

import { useState } from "react";
import { MODULES } from "@/lib/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ModuleCard({ mod }: { mod: (typeof MODULES)[number] }) {
  const [imgIdx, setImgIdx] = useState(0);
  const hasRenders = mod.renders.length > 0;
  const images = hasRenders ? mod.renders : [mod.image];
  const currentImage = images[imgIdx];

  return (
    <div
      className="group relative rounded-2xl border border-border/50 bg-surface-raised/50 p-6 transition-all duration-300 hover:bg-surface-raised cursor-default"
      style={{ transitionProperty: "transform, box-shadow, border-color, background-color" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = `0 8px 30px ${mod.color}20, 0 0 20px ${mod.color}10`;
        el.style.borderColor = `${mod.color}40`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        el.style.borderColor = "";
      }}
    >
      {/* Price badge */}
      <div
        className="absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-xs font-mono font-bold tabular-price backdrop-blur-md z-10"
        style={{
          color: mod.color,
          backgroundColor: `${mod.color}12`,
          border: `1px solid ${mod.color}25`,
          boxShadow: `0 2px 8px ${mod.color}10`,
        }}
      >
        ${mod.price}
      </div>

      {/* Image carousel */}
      <div
        className="relative mb-5 h-36 rounded-xl border border-white/5 overflow-hidden bg-[#0D0D1A]"
        style={{ borderColor: `${mod.color}15` }}
      >
        <img
          src={currentImage}
          alt={`${mod.name} — ${mod.shortDesc}`}
          className="w-full h-full object-contain transition-opacity duration-300"
        />

        {/* Carousel arrows */}
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + images.length) % images.length); }}
              className="rounded-full p-1 backdrop-blur-md"
              style={{ backgroundColor: `${mod.color}30`, color: mod.color }}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % images.length); }}
              className="rounded-full p-1 backdrop-blur-md"
              style={{ backgroundColor: `${mod.color}30`, color: mod.color }}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                className="rounded-full transition-all"
                style={{
                  width: i === imgIdx ? 12 : 5,
                  height: 5,
                  backgroundColor: i === imgIdx ? mod.color : `${mod.color}40`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info + shape outline */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1" style={{ color: mod.color }}>
            {mod.name}
          </h3>
          <p className="text-xs text-muted-foreground/60 font-mono section-label">{mod.shortDesc}</p>
        </div>
        {(() => {
          const maxDim = Math.max(mod.width_mm, mod.height_mm);
          const scale = 32 / maxDim;
          return (
            <div
              className="flex-shrink-0 border-2 flex items-center justify-center"
              style={{
                width: mod.width_mm * scale,
                height: mod.height_mm * scale,
                borderRadius: mod.shape === "circle" ? "50%" : 3,
                borderColor: `${mod.color}50`,
                backgroundColor: `${mod.color}10`,
              }}
              title={`${mod.width_mm}×${mod.height_mm}mm ${mod.shape}`}
            >
              <span className="text-[7px] font-mono opacity-60" style={{ color: mod.color }}>
                {mod.width_mm}×{mod.height_mm}
              </span>
            </div>
          );
        })()}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 60px ${mod.color}08, 0 0 30px ${mod.color}08`,
          background: `radial-gradient(ellipse at 50% 0%, ${mod.color}06, transparent 70%)`,
        }}
      />
    </div>
  );
}

export function ModuleCatalog() {
  return (
    <section id="modules" className="relative py-24 md:py-32 smoke-bg noise-overlay">
      <div className="mx-auto max-w-6xl px-6 relative z-[1]">
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-amber tracking-widest uppercase section-label">Modules</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            The building blocks
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Different sizes, same magnetic connector. From tiny Sense (44mm) to wide Pixel (166mm).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((mod) => (
            <ModuleCard key={mod.id} mod={mod} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Every wall needs one <span className="text-teal">Hub</span> module. Everything else is optional.
          </p>
        </div>
      </div>
    </section>
  );
}
