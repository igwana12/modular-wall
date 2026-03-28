import { Sparkles, Mic, Zap } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Physical Cards",
    description:
      "Premium printed cards featuring PANTHEON art. 21 Greek gods, each with a unique QR code that unlocks their oracle.",
  },
  {
    icon: Mic,
    title: "AI Oracle Readings",
    description:
      "Personalized deity voice readings powered by AI. Ask your question, hear the god speak, and receive wisdom tailored to you.",
  },
  {
    icon: Zap,
    title: "Sacred Circuits",
    description:
      "Where mythology meets technology. Ancient wisdom delivered through a modern creative pipeline built for the AI era.",
  },
] as const;

export function LandingFeatures() {
  return (
    <section className="w-full max-w-4xl px-4 py-16">
      <div className="grid gap-6 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-border"
          >
            <feature.icon className="mb-4 h-8 w-8 text-accent-gold" />
            <h3 className="mb-2 font-serif text-lg font-semibold">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
