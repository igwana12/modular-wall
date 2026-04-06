export function Thesis() {
  return (
    <section id="thesis" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-teal tracking-widest uppercase">Thesis</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            The First Wave
          </h2>
        </div>

        {/* Essay */}
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p className="text-lg md:text-xl text-foreground font-medium">
            For thirty years, software ate the world by pulling everything into screens. Every object became an app. Every surface became glass. We stared down at phones and called it progress.
          </p>

          <p>
            AI changes the direction. Instead of pulling reality into software, AI pushes software back out into reality. The app doesn&apos;t need a screen anymore — it needs a <em className="text-teal not-italic font-medium">surface</em>. A wall. A desk. A room.
          </p>

          <p>
            The first wave isn&apos;t a product. It&apos;s a phase transition. The same way websites escaped the desktop browser and became mobile apps, mobile apps are now escaping the phone and becoming ambient experiences. The question isn&apos;t <em>if</em> — it&apos;s <em>where they land first</em>.
          </p>

          <div className="my-10 rounded-2xl border border-teal/20 bg-teal/5 p-8">
            <blockquote className="text-lg md:text-xl font-medium text-foreground italic">
              &ldquo;The best interface is one you don&apos;t think about. The wall doesn&apos;t demand attention — it provides context. It&apos;s the difference between a notification and an atmosphere.&rdquo;
            </blockquote>
          </div>

          <p>
            We believe the wall is the first surface to flip. It&apos;s already there. It&apos;s already big. It&apos;s already in your peripheral vision. All it needs is a nervous system — modular, upgradeable, AI-native. Not a TV. Not a smart display. A <em className="text-amber not-italic font-medium">living surface</em> that adapts to you.
          </p>

          <p>
            [MODULAR] is that nervous system. Each module is a neuron. The mesh is the synapse. The AI is the cortex. And you — you&apos;re not a user. You&apos;re the context that makes it all meaningful.
          </p>

          <p className="text-foreground font-medium">
            This is the first wave. We&apos;re building the surfboard.
          </p>
        </div>

        {/* Principles */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Local-first",
              desc: "Your data stays in your house. On-device AI inference. No cloud required for core functionality.",
              color: "#00D4AA",
            },
            {
              title: "Open hardware",
              desc: "STL files, schematics, firmware — all open source. Build your own modules. Fork the design. We dare you.",
              color: "#FFB347",
            },
            {
              title: "Ambient, not demanding",
              desc: "No home screen. No app grid. No login. The wall is there when you need it and invisible when you don't.",
              color: "#8888ff",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border/50 bg-surface-raised/50 p-6"
            >
              <div
                className="mb-3 h-1 w-8 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <h3 className="text-base font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
