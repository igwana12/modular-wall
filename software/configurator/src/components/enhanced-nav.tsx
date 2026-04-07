/**
 * Enhanced Navigation Component
 * Improvements:
 * - Better mobile navigation with hamburger menu
 * - Smooth scroll progress indicator
 * - Enhanced accessibility
 * - Sticky navigation with background blur
 * - Active section highlighting
 */

"use client";

import { useState, useEffect } from "react";
import { Menu, X, ExternalLink, Zap } from "lucide-react";

const navigationItems = [
  { id: "how-it-works", label: "How It Works" },
  { id: "modules", label: "Modules" },
  { id: "configurations", label: "Configurations" },
  { id: "interfaces", label: "Interfaces" },
  { id: "configurator", label: "Configurator" },
  { id: "customization", label: "Styles" },
  { id: "scenes", label: "Scenes" },
  { id: "thesis", label: "Thesis" },
];

export function EnhancedNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      // Throttle via rAF — runs at most once per frame (~16ms)
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress((scrollTop / docHeight) * 100);
        setIsScrolled(scrollTop > 20);

        const sections = navigationItems.map(item => document.getElementById(item.id));
        const currentSection = sections.find(section => {
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        });
        if (currentSection) {
          setActiveSection(currentSection.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}>
        {/* Scroll Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal to-amber transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-3 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative">
                <img
                  src="/mosaic-logo.jpg"
                  alt="mosAIc"
                  className="h-8 w-8 rounded-lg object-cover"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-teal/20 to-amber/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                mosAIc
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-200 hover:text-teal relative ${
                    activeSection === item.id
                      ? 'text-teal'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://github.com/igwana12/modular-wall"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-raised transition-all"
                aria-label="View on GitHub"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
              <button
                onClick={() => scrollToSection('configurator')}
                className="inline-flex items-center gap-2 rounded-xl bg-teal px-4 py-2 text-sm font-semibold text-background transition-all hover:bg-teal/90 hover:shadow-[0_0_20px_rgba(0,212,170,0.3)]"
              >
                <Zap className="h-4 w-4" />
                Build Wall
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-raised transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="relative mt-16 mx-6 bg-surface-raised/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6">
              {/* Navigation Items */}
              <div className="space-y-1 mb-6">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      activeSection === item.id
                        ? 'text-teal bg-teal/10 border border-teal/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="space-y-3 pt-6 border-t border-border/30">
                <button
                  onClick={() => scrollToSection('configurator')}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-4 py-3 text-base font-semibold text-background transition-all"
                >
                  <Zap className="h-5 w-5" />
                  Build Your Wall
                </button>
                
                <a
                  href="https://github.com/igwana12/modular-wall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground transition-all"
                >
                  <ExternalLink className="h-5 w-5" />
                  View on GitHub
                </a>
              </div>

              {/* Status Badge */}
              <div className="mt-6 pt-6 border-t border-border/30">
                <div className="inline-flex items-center gap-2 rounded-lg bg-teal/10 border border-teal/20 px-3 py-2 text-sm text-teal">
                  <div className="h-2 w-2 rounded-full bg-teal animate-pulse" />
                  Local Prototype v0.1
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-teal text-background shadow-lg hover:shadow-xl hover:scale-110 transition-all"
          aria-label="Scroll to top"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
}