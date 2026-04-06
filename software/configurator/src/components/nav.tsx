"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Modules", href: "#modules" },
  { label: "Configurator", href: "#configurator" },
  { label: "Scenes", href: "#scenes" },
  { label: "Thesis", href: "#thesis" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-[#0d0d1a]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider">
          <span className="inline-block h-3 w-3 rounded-sm bg-teal" />
          <span className="text-foreground">[MODULAR]</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-teal"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#configurator"
            className="rounded-lg bg-teal px-4 py-1.5 text-sm font-semibold text-[#0d0d1a] transition-all hover:bg-teal/80 hover:shadow-[0_0_20px_#00D4AA40]"
          >
            Build Your Wall
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/50 bg-[#0d0d1a]/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-sm text-muted-foreground hover:text-teal"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
