"use client";

import { useState } from "react";
import { MODULES } from "@/lib/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox } from "@/components/lightbox";

function ModuleCard({ mod }: { mod: (typeof MODULES)[number] }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const hasRenders = mod.renders.length > 0;
  const images = hasRenders ? mod.renders : [mod.image];
  const currentImage = images[imgIdx];

  const maxDim = Math.max(mod.width_mm, mod.height_mm);
  const scale = 36 / maxDim;

  return (
    <>
      <div
        className="group relative rounded-2xl border border-border/30 bg-[#0a0a14] overflow-hidden transition-all duration-500 hover:border-border/60"
        style={{ transitionProperty: "transform, box-shadow, border-color" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = `0 30px 60px rgba(0,0,0,0.5), 0 0 40px ${mod.color}08`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Image area — 60% of card height, dark bg for renders */}
        <div
          className="relative overflow-hidden cursor-zoom-in"
          style={{ height: 280, background: "#050510" }}
          onClick={() => setLightboxSrc(currentImage)}
        >
          <img
            src={currentImage}
            alt={`${mod.name} — ${mod.shortDesc}`}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />

          {/* Price badge — top right */}
          <div
            className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-mono font-bold backdrop-blur-xl z-10"
            style={{
              color: mod.color,
              backgroundColor: `${mod.color}12`,
              border: `1px solid ${mod.color}25`,
            }}
          >
            ${mod.price}
          </div>

          {/* Dimensions badge — top left */}
          <div className="absolute top-4 left-4 rounded-full px-2.5 py-1 text-[10px] font-mono backdrop-blur-xl z-10 text-muted-foreground/70 bg-black/40 border border-white/5">
            {mod.width_mm}×{mod.height_mm}mm
          </div>

          {/* Carousel arrows */}
          {images.length > 1 && (
            <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + images.length) % images.length); }}
                className="rounded-full p-1.5 backdrop-blur-xl transition-transform hover:scale-110"
                style={{ backgroundColor: `${mod.color}25`, color: mod.color, border: `1px solid ${mod.color}30` }}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % images.length); }}
                className="rounded-full p-1.5 backdrop-blur-xl transition-transform hover:scale-110"
                style={{ backgroundColor: `${mod.color}25`, color: mod.color, border: `1px solid ${mod.color}30` }}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                  className="rounded-full transition-all"
                  style={{
                    width: i === imgIdx ? 16 : 6,
                    height: 6,
                    backgroundColor: i === imgIdx ? mod.color : `${mod.color}40`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a14] to-transparent pointer-events-none" />
        </div>

        {/* Info section */}
        <div className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1" style={{ color: mod.color }}>
                {mod.name}
              </h3>
              <p className="text-xs text-muted-foreground/50 font-mono">{mod.shortDesc}</p>
            </div>
            {/* Shape silhouette */}
            <div
              className="flex-shrink-0 border-2 flex items-center justify-center"
              style={{
                width: mod.width_mm * scale,
                height: mod.height_mm * scale,
                borderRadius: mod.shape === "circle" ? "50%" : 3,
                borderColor: `${mod.color}40`,
                backgroundColor: `${mod.color}08`,
              }}
              title={`${mod.width_mm}×${mod.height_mm}mm ${mod.shape}`}
            >
              <span className="text-[6px] font-mono" style={{ color: `${mod.color}60` }}>
                {mod.width_mm}×{mod.height_mm}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground/70 leading-relaxed">{mod.description}</p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt={`${mod.name} — ${mod.shortDesc}`}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </>
  );
}

export function ModuleCatalog() {
  return (
    <section id="modules" className="relative py-28 md:py-40 section-dark">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <span className="font-mono text-xs text-amber tracking-widest uppercase section-label">Modules</span>
          <h2 className="mt-4 tracking-tight">
            The building blocks
          </h2>
          <p className="mt-5 text-muted-foreground/70 max-w-xl mx-auto text-lg">
            Different sizes, same magnetic connector. From tiny Sense (44mm) to wide Pixel (166mm).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((mod) => (
            <ModuleCard key={mod.id} mod={mod} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground/40 font-mono">
            Every wall needs one <span className="text-teal">Hub</span> module. Everything else is optional.
          </p>
        </div>
      </div>
    </section>
  );
}
