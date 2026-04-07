export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient-bg grid-overlay scan-line-overlay noise-overlay">
      {/* Floating particles */}
      <div className="particles-container">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Decorative grid dots */}
      <div className="absolute inset-0 opacity-20 z-[2]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${i % 2 === 0 ? 'animate-float' : 'animate-float-reverse'}`}
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#00D4AA' : '#FFB347'}10 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 text-xs font-mono text-teal section-label">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
          mosAIc — LOCAL PROTOTYPE v0.1
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
          <span className="text-foreground">Your desktop.</span>
          <br />
          <span className="bg-gradient-to-r from-teal to-amber bg-clip-text text-transparent">
            On your wall.
          </span>
        </h1>

        {/* Subhead */}
        <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
          As software ate the world, AI is throwing it back up.
          <br className="hidden md:block" />
          Apps are escaping the phone. The wall is where they land.
        </p>

        {/* Product hero image with glow/bloom */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-teal/20 bg-surface-raised p-1"
          style={{
            boxShadow: '0 0 40px #00D4AA15, 0 0 80px #00D4AA08, 0 0 120px #00D4AA05',
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        >
          <div className="rounded-xl overflow-hidden relative">
            <img
              src="/hero-wall.jpg"
              alt="A modular wall computer with mixed screens, ambient lights, and holographic displays in a modern living room"
              className="w-full h-64 md:h-96 object-cover"
              style={{
                filter: 'brightness(1.05) contrast(1.05)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <span className="text-xs font-mono text-teal/70">12 modules. One wall. Zero wires.</span>
              <span className="text-xs font-mono text-muted-foreground/50">concept render</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#configurator"
            className="rounded-xl bg-teal px-8 py-3 text-base font-semibold text-[#0d0d1a] transition-all hover:bg-teal/80 hover:shadow-[0_0_30px_#00D4AA40] hover:scale-105"
          >
            Build Your Wall
          </a>
          <a
            href="#how-it-works"
            className="rounded-xl border border-border px-8 py-3 text-base font-semibold text-foreground transition-all hover:border-teal/40 hover:text-teal"
          >
            How It Works
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 flex items-center justify-center gap-8 md:gap-16 text-center">
          <div>
            <div className="text-2xl font-bold text-teal tabular-price">8</div>
            <div className="text-xs text-muted-foreground mt-1 section-label">Module Types</div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="text-2xl font-bold text-amber tabular-price">$9-99</div>
            <div className="text-xs text-muted-foreground mt-1 section-label">Per Module</div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="text-2xl font-bold text-foreground">&infin;</div>
            <div className="text-xs text-muted-foreground mt-1 section-label">Combinations</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40 z-10">
        <span className="text-xs font-mono">scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </div>
    </section>
  );
}
