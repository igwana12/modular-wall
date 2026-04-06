"use client";

import { MODULES } from "@/lib/modules";

export function ModuleCatalog() {
  return (
    <section id="modules" className="relative py-24 md:py-32 smoke-bg noise-overlay">
      <div className="mx-auto max-w-6xl px-6 relative z-[1]">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-amber tracking-widest uppercase section-label">Modules</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            The building blocks
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Every module is the same physical size. Same magnetic connector. Different superpower.
          </p>
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULES.map((mod) => (
            <div
              key={mod.id}
              className="group relative rounded-2xl border border-border/50 bg-surface-raised/50 p-6 transition-all duration-300 hover:bg-surface-raised cursor-default"
              style={{
                transitionProperty: 'transform, box-shadow, border-color, background-color',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-6px)';
                el.style.boxShadow = `0 8px 30px ${mod.color}20, 0 0 20px ${mod.color}10`;
                el.style.borderColor = `${mod.color}40`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
                el.style.borderColor = '';
              }}
            >
              {/* Price badge with backdrop-blur */}
              <div
                className="absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-xs font-mono font-bold tabular-price backdrop-blur-md"
                style={{
                  color: mod.color,
                  backgroundColor: `${mod.color}12`,
                  border: `1px solid ${mod.color}25`,
                  boxShadow: `0 2px 8px ${mod.color}10`,
                }}
              >
                ${mod.price}
              </div>

              {/* Module image with zoom on hover */}
              <div
                className="mb-5 h-36 rounded-xl border border-white/5 overflow-hidden"
                style={{ borderColor: `${mod.color}15` }}
              >
                <img
                  src={mod.image}
                  alt={`${mod.name} — ${mod.shortDesc}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold mb-1" style={{ color: mod.color }}>
                {mod.name}
              </h3>
              <p className="text-xs text-muted-foreground/60 font-mono mb-3 section-label">{mod.shortDesc}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mod.description}
              </p>

              {/* Hover glow (enhanced) */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 60px ${mod.color}08, 0 0 30px ${mod.color}08`,
                  background: `radial-gradient(ellipse at 50% 0%, ${mod.color}06, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Required note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Every wall needs one <span className="text-teal">Hub</span> module. Everything else is optional.
          </p>
        </div>
      </div>
    </section>
  );
}
