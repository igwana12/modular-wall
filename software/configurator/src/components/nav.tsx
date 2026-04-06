"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Modules", href: "#modules" },
  { label: "Configurations", href: "#configurations" },
  { label: "Configurator", href: "#configurator" },
  { label: "Scenes", href: "#scenes" },
  { label: "The Guide", href: "#the-guide" },
  { label: "Hub Tiers", href: "#hub-tiers" },
  { label: "Thesis", href: "#thesis" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Find active section
      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = `#${id}`;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(13, 13, 26, 0.9)' : 'rgba(13, 13, 26, 0.8)',
        borderBottom: scrolled
          ? '1px solid rgba(0, 212, 170, 0.15)'
          : '1px solid rgba(42, 42, 74, 0.5)',
        boxShadow: scrolled ? '0 1px 20px rgba(0, 212, 170, 0.05)' : 'none',
      }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2">
          <img src="/mosaic-logo.jpg" alt="mosAIc" className="h-7 w-auto rounded-sm" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm transition-colors duration-200"
              style={{
                color: activeSection === item.href ? '#00D4AA' : '#8888aa',
              }}
            >
              {item.label}
              {activeSection === item.href && (
                <span
                  className="absolute -bottom-[19px] left-0 right-0 h-[2px] rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #00D4AA, #00D4AA80)',
                    boxShadow: '0 0 8px #00D4AA40',
                  }}
                />
              )}
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
              className="block text-sm transition-colors"
              style={{
                color: activeSection === item.href ? '#00D4AA' : '#8888aa',
              }}
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
