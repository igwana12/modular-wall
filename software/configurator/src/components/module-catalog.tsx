import { MODULES } from "@/lib/modules";

export function ModuleCatalog() {
  return (
    <section id="modules" className="relative py-24 md:py-32 smoke-bg">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-amber tracking-widest uppercase">Modules</span>
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
              className="group relative rounded-2xl border border-border/50 bg-surface-raised/50 p-6 transition-all hover:border-white/10 hover:bg-surface-raised cursor-default"
            >
              {/* Price badge */}
              <div className="absolute top-4 right-4 rounded-full bg-surface-overlay px-2.5 py-0.5 text-xs font-mono font-bold" style={{ color: mod.color }}>
                ${mod.price}
              </div>

              {/* Module image */}
              <div
                className="mb-5 h-36 rounded-xl border border-white/5 overflow-hidden transition-all group-hover:scale-[1.02]"
                style={{ borderColor: `${mod.color}15` }}
              >
                <img
                  src={mod.image}
                  alt={`${mod.name} — ${mod.shortDesc}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold mb-1" style={{ color: mod.color }}>
                {mod.name}
              </h3>
              <p className="text-xs text-muted-foreground/60 font-mono mb-3">{mod.shortDesc}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mod.description}
              </p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 40px ${mod.color}08, 0 0 20px ${mod.color}05`,
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
