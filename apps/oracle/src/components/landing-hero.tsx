"use client";

import { motion } from "motion/react";

export function LandingHero() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,130,68,0.08)_0%,transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex max-w-2xl flex-col items-center gap-6"
      >
        <h1 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Oracle Cards
        </h1>

        <p className="text-lg text-muted-foreground sm:text-xl">
          AI-powered readings from the Greek Pantheon.
        </p>

        <p className="max-w-md text-sm leading-relaxed text-muted-foreground/80">
          21 Greek gods. Personalized AI readings. Physical cards with digital
          magic. Each card unlocks a unique oracle experience powered by
          mythology and modern AI.
        </p>
      </motion.div>
    </section>
  );
}
