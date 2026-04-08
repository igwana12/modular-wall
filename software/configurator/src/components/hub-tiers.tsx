export function HubTiers() {
  const tiers = [
    {
      name: "Hub Basic",
      price: 49,
      color: "#00D4AA",
      features: "Displays + ambient",
      modules: "15 modules",
      description:
        "Screen widgets, ambient glow, basic scheduling. The foundation.",
    },
    {
      name: "Hub Pro",
      price: 109,
      color: "#FFB347",
      features: "Voice + AI + learning",
      modules: "30 modules",
      description:
        "Voice control, on-device AI inference, pattern learning. The wall thinks.",
      featured: true,
    },
    {
      name: "Hub Ultra",
      price: 249,
      color: "#cc44ff",
      features: "Vision + AR + full AI",
      modules: "50+ modules",
      description:
        "Computer vision, AR overlays, multi-room mesh, full AI orchestration. The wall sees.",
    },
  ];

  return (
    <section id="hub-tiers" className="relative py-24 md:py-32 smoke-bg noise-overlay">
      <div className="mx-auto max-w-6xl px-6 relative z-[1]">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-teal tracking-widest uppercase section-label">
            HUB TIERS
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            One brain. Three levels.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Every wall starts with a Hub. Pick the intelligence tier that fits your ambition.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="group relative rounded-2xl border bg-surface-raised/50 p-6 transition-all duration-300 hover:bg-surface-raised"
              style={{
                borderColor: tier.featured ? `${tier.color}40` : 'rgba(42, 42, 74, 0.5)',
                boxShadow: tier.featured
                  ? `0 0 30px ${tier.color}12, 0 0 60px ${tier.color}06`
                  : 'none',
              }}
            >
              {tier.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[10px] font-mono font-bold uppercase section-label"
                  style={{
                    backgroundColor: tier.color,
                    color: '#0d0d1a',
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Tier name */}
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: tier.color }}
              >
                {tier.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-4">
                <span
                  className="text-3xl font-bold font-mono tabular-price"
                  style={{ color: tier.color }}
                >
                  ${tier.price}
                </span>
              </div>

              {/* Features line */}
              <p className="text-xs font-mono text-muted-foreground mb-1 section-label uppercase">
                {tier.features}
              </p>
              <p className="text-xs font-mono text-muted-foreground/60 mb-4">
                Up to {tier.modules}
              </p>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tier.description}
              </p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 60px ${tier.color}06`,
                  background: `radial-gradient(ellipse at 50% 0%, ${tier.color}06, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground font-mono italic">
            You can upgrade anytime. Your modules stay.
          </p>
        </div>
      </div>
    </section>
  );
}
