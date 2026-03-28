"use client";

import type { ReactNode } from "react";

interface DeityBackgroundProps {
  colorPalette: [string, string, string] | null;
  children: ReactNode;
}

export function DeityBackground({
  colorPalette,
  children,
}: DeityBackgroundProps) {
  if (!colorPalette) {
    return <>{children}</>;
  }

  return (
    <div
      className="min-h-screen"
      style={
        {
          "--deity-primary": colorPalette[0],
          "--deity-secondary": colorPalette[1],
          "--deity-tertiary": colorPalette[2],
          background: `linear-gradient(to bottom, ${colorPalette[1]}14, transparent 60%)`,
          transition: "background 1.5s ease",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
