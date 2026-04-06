export function TheGuide() {
  return (
    <section id="the-guide" className="relative py-24 md:py-32 noise-overlay">
      <div className="mx-auto max-w-4xl px-6 relative z-[1]">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-amber tracking-widest uppercase section-label">
            THE GUIDE
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            &ldquo;Your wall&apos;s first voice.&rdquo;
          </h2>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <p className="text-lg md:text-xl text-foreground leading-relaxed">
            The first thing you install is an AI tutor with a face.
          </p>

          <div className="flex items-center justify-center gap-4 md:gap-6">
            {[
              { name: "Zeus", color: "#FFB347" },
              { name: "Athena", color: "#00D4AA" },
              { name: "Hermes", color: "#8888ff" },
            ].map((deity) => (
              <div
                key={deity.name}
                className="rounded-2xl border px-6 py-3 text-center transition-all hover:scale-105"
                style={{
                  borderColor: `${deity.color}30`,
                  backgroundColor: `${deity.color}08`,
                  boxShadow: `0 0 20px ${deity.color}08`,
                }}
              >
                <span
                  className="text-lg font-bold"
                  style={{ color: deity.color }}
                >
                  {deity.name}
                </span>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Pick your Guide. It teaches you to build, code, create, and expand.
            <br />
            Not just the wall. Everything.
          </p>

          <div className="pt-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber/20 bg-amber/5 px-5 py-2 text-sm font-mono text-amber section-label">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber animate-pulse" />
              COMING SOON
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
