"use client";

import { useRef, useState, useEffect } from "react";

export function InteractiveDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="demo" className="relative py-16 md:py-24" ref={ref} aria-label="Interactive 3D Demo">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-2 text-sm font-mono text-teal mb-4">
            <div className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            Interactive 3D
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Experience mosAIc in 3D
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Click, drag, explore. Built with{" "}
            <a
              href="https://omma.build"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              Omma by Spline
            </a>
            .
          </p>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden border border-teal/20 bg-[#0D0D1A]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          {visible && (
            <iframe
              src="https://omma.build/q1tzwaftn3r"
              width="100%"
              height="600"
              style={{ border: "none", borderRadius: 12, display: "block" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              loading="lazy"
              title="mosAIc Interactive 3D Experience"
            />
          )}

          {/* Gradient fade at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0D0D1A] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
