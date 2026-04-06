export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden smoke-bg grid-overlay">
      {/* Decorative grid dots */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#00D4AA' : '#FFB347'}08 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 text-xs font-mono text-teal">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
          LOCAL PROTOTYPE v0.1
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

        {/* Product hero placeholder */}
        <div className="mx-auto mt-12 max-w-3xl animate-pulse-glow rounded-2xl border border-teal/20 bg-surface-raised p-1">
          <div className="flex items-center justify-center rounded-xl bg-surface h-64 md:h-80 relative overflow-hidden">
            {/* Fake module grid preview */}
            <div className="grid grid-cols-4 gap-2 p-4">
              {["#00D4AA", "#FFB347", "#ff4466", "#8888ff", "#555577", "#00D4AA", "#cc44ff", "#44ddff"].map((color, i) => (
                <div
                  key={i}
                  className="h-14 w-14 md:h-16 md:w-16 rounded-lg border border-white/5 flex items-center justify-center text-xs font-mono opacity-60"
                  style={{ backgroundColor: `${color}15`, borderColor: `${color}30` }}
                >
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground/50">
              [ product render placeholder ]
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
            <div className="text-2xl font-bold text-teal">8</div>
            <div className="text-xs text-muted-foreground mt-1">Module Types</div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="text-2xl font-bold text-amber">$9-99</div>
            <div className="text-xs text-muted-foreground mt-1">Per Module</div>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <div className="text-2xl font-bold text-foreground">&infin;</div>
            <div className="text-xs text-muted-foreground mt-1">Combinations</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40">
        <span className="text-xs font-mono">scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </div>
    </section>
  );
}
