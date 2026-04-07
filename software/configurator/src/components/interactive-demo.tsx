"use client";

import { lazy, Suspense } from "react";
import { useInView } from "@/hooks/use-in-view";

const OmmaDemoScene = lazy(() =>
  import("@/components/three/omma-demo-scene").then((m) => ({ default: m.OmmaDemoScene }))
);

export function InteractiveDemo() {
  const { ref, visible } = useInView(0.05);

  return (
    <section id="demo" className="relative py-12 md:py-16" ref={ref} aria-label="Interactive 3D Demo">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-2 text-sm font-mono text-teal mb-4">
            <div className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            Interactive 3D
          </div>
          <h2 className="tracking-tight mb-3">
            Experience mosAIc in 3D
          </h2>
          <p className="text-base text-muted-foreground/60 max-w-lg mx-auto">
            Drag to rotate. Scroll to zoom. Click a casing style to switch.
          </p>
        </div>

        {/* Full 3D Scene */}
        <div
          className="relative rounded-2xl overflow-hidden border border-teal/15 bg-[#050510]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            aspectRatio: "16 / 9",
            minHeight: 600,
          }}
        >
          {visible && (
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-8 w-8 border-2 border-teal/30 border-t-teal rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-xs font-mono text-muted-foreground/40">Loading 3D scene...</p>
                  </div>
                </div>
              }
            >
              <OmmaDemoScene />
            </Suspense>
          )}
        </div>

        {/* Omma attribution */}
        <div className="mt-4 text-center">
          <a
            href="https://omma.build/q1tzwaftn3r"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground/30 hover:text-teal/60 transition-colors"
          >
            Also available on Omma →
          </a>
        </div>
      </div>
    </section>
  );
}
