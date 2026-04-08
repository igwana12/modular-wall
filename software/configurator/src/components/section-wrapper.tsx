"use client";

import { useInView } from "@/hooks/use-in-view";

export function AnimatedSection({ children, divider = false }: { children: React.ReactNode; divider?: boolean }) {
  const { ref, visible } = useInView(0.05);

  return (
    <div ref={ref}>
      {divider && <div className="section-divider" />}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function SectionDivider() {
  return <div className="section-divider" />;
}
