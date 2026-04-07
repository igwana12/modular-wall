"use client";

import dynamic from "next/dynamic";
import { useInView } from "@/hooks/use-in-view";

const OmmaDemoScene = dynamic(
  () => import("@/components/three/omma-demo-scene").then((m) => ({ default: m.OmmaDemoScene })),
  { ssr: false, loading: () => <div className="w-full flex items-center justify-center" style={{ height: 600, background: "#050510" }}><div className="text-teal/40 font-mono text-sm animate-pulse">Loading 3D scene...</div></div> }
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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Experience mosAIc in 3D
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Drag to orbit. Scroll to zoom. Click a casing style to switch.
          </p>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden border border-teal/20"
          style={{ height: 600, background: "#050510" }}
        >
          {visible && <OmmaDemoScene />}
        </div>

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
