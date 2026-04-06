const STEPS = [
  {
    number: "01",
    title: "Choose your modules",
    description: "Pick from screens, lights, sensors, speakers, and more. Each module is a single magnetic tile — same size, same connector, infinite arrangements.",
    color: "#00D4AA",
    detail: "Start with a Hub. Add what you need. Ignore what you don't.",
  },
  {
    number: "02",
    title: "Snap together",
    description: "Magnetic pogo-pin connectors. No wiring. No tools. No electrician. Click them onto any flat surface. The wall figures out the topology.",
    color: "#FFB347",
    detail: "Power cascades from Hub through contacts. Data rides BLE mesh.",
  },
  {
    number: "03",
    title: "AI orchestrates",
    description: "A local-first AI agent learns your patterns. It doesn't just follow rules — it anticipates. Your wall becomes context-aware, ambient, alive.",
    color: "#8888ff",
    detail: "On-device inference. Your data stays in your house.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-teal tracking-widest uppercase">Process</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Three steps. Zero complexity.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            The hard part is choosing which modules you want. Everything after that is magnets.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border border-border/50 bg-surface-raised/50 p-8 transition-all hover:border-teal/30 hover:bg-surface-raised"
            >
              {/* Step number */}
              <div
                className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold font-mono"
                style={{
                  backgroundColor: `${step.color}15`,
                  color: step.color,
                  border: `1px solid ${step.color}30`,
                }}
              >
                {step.number}
              </div>

              {/* Visual placeholder */}
              <div
                className="mb-6 h-32 rounded-xl border border-white/5 flex items-center justify-center"
                style={{ backgroundColor: `${step.color}08` }}
              >
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-md transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${step.color}${20 + i * 15}`,
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {step.description}
              </p>
              <p className="text-xs font-mono" style={{ color: step.color }}>
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Connector line (desktop only) */}
        <div className="hidden md:block relative h-px mt-8">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-teal/0 via-teal/30 to-teal/0" />
        </div>
      </div>
    </section>
  );
}
