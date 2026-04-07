"use client";

import { lazy, Suspense } from "react";
import { useInView } from "@/hooks/use-in-view";
import { ExternalLink, Play } from "lucide-react";

const HeroParticles = lazy(() =>
  import("@/components/three/hero-particles").then((m) => ({ default: m.HeroParticles }))
);

export function InteractiveDemo() {
  const { ref, visible } = useInView(0.05);

  return (
    <section id="demo" className="relative py-16 md:py-24" ref={ref} aria-label="Interactive 3D Demo">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-2 text-sm font-mono text-teal mb-4">
            <div className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            Interactive 3D
          </div>
          <h2 className="tracking-tight mb-4">
            Experience mosAIc in 3D
          </h2>
          <p className="text-lg text-muted-foreground/70 max-w-xl mx-auto">
            Explore the modular wall system. Click below for the full interactive experience.
          </p>
        </div>

        {/* 3D Background + Launch Card */}
        <div
          className="relative rounded-2xl overflow-hidden border border-teal/20 bg-[#050510]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            height: 480,
          }}
        >
          {/* Live Three.js particle background */}
          {visible && (
            <div className="absolute inset-0">
              <Suspense fallback={null}>
                <HeroParticles />
              </Suspense>
            </div>
          )}

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              {/* Preview card linking to Omma */}
              <a
                href="https://omma.build/q1tzwaftn3r"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-col items-center gap-6"
              >
                {/* Play button */}
                <div className="relative">
                  <div className="h-20 w-20 rounded-full border-2 border-teal/40 bg-teal/10 flex items-center justify-center transition-all duration-300 group-hover:bg-teal/20 group-hover:border-teal/60 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(0,212,170,0.3)]">
                    <Play className="h-8 w-8 text-teal ml-1" fill="currentColor" />
                  </div>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full border border-teal/20 animate-ping" style={{ animationDuration: "2s" }} />
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 rounded-xl bg-teal/10 border border-teal/30 px-6 py-3 text-sm font-semibold text-teal transition-all duration-300 group-hover:bg-teal/20 group-hover:border-teal/50 group-hover:shadow-[0_0_30px_rgba(0,212,170,0.2)]">
                    Launch Interactive Demo
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground/40 font-mono">
                    Built with{" "}
                    <span className="text-teal/60">Omma by Spline</span>
                    {" "}— opens in new tab
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Edge gradients */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050510] to-transparent pointer-events-none z-[5]" />
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#050510] to-transparent pointer-events-none z-[5]" />
        </div>
      </div>
    </section>
  );
}
