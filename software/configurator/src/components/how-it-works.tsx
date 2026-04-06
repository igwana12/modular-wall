const STEPS = [
  {
    number: "01",
    title: "Choose your modules",
    description: "Pick from screens, lights, sensors, speakers, and more. Each module is a single magnetic tile — same size, same connector, infinite arrangements.",
    color: "#00D4AA",
    detail: "Start with a Hub. Add what you need. Ignore what you don't.",
    image: "/hero-unbox.jpg",
  },
  {
    number: "02",
    title: "Snap together",
    description: "Magnetic pogo-pin connectors. No wiring. No tools. No electrician. Click them onto any flat surface. The wall figures out the topology.",
    color: "#FFB347",
    detail: "Power cascades from Hub through contacts. Data rides BLE mesh.",
    image: "/hero-snap.jpg",
  },
  {
    number: "03",
    title: "AI orchestrates",
    description: "A local-first AI agent learns your patterns. It doesn't just follow rules — it anticipates. Your wall becomes context-aware, ambient, alive.",
    color: "#8888ff",
    detail: "On-device inference. Your data stays in your house.",
    image: "/hero-wall.jpg",
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

              {/* Step image */}
              <div className="mb-6 h-36 rounded-xl overflow-hidden border border-white/5">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
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

        {/* Scale reference */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="max-w-sm rounded-2xl overflow-hidden border border-border/50">
            <img
              src="/hero-scale.jpg"
              alt="Hand holding a module showing palm-sized scale"
              className="w-full h-48 object-cover"
            />
          </div>
          <p className="text-xs font-mono text-muted-foreground text-center">
            Each module fits in your palm. 85mm x 65mm — smaller than a phone.
          </p>
        </div>

        {/* Connector line (desktop only) */}
        <div className="hidden md:block relative h-px mt-8">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-teal/0 via-teal/30 to-teal/0" />
        </div>
      </div>
    </section>
  );
}
