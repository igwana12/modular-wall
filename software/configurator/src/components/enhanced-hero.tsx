/**
 * Enhanced Hero Component - Redesigned for better performance and UX
 * - Optimized animations with reduced motion preference
 * - Improved accessibility with proper ARIA labels
 * - Better mobile responsiveness
 * - Enhanced visual hierarchy
 */

"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { ChevronDown, Play, Star, Zap } from "lucide-react";

const HeroParticles = lazy(() =>
  import("@/components/three/hero-particles").then((m) => ({ default: m.HeroParticles }))
);

export function EnhancedHero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-headline"
    >
      {/* Enhanced Background with Performance Optimization */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
        {/* Optimized Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 170, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 170, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Three.js Sacred Geometry Particles (only if motion not reduced) */}
        {!reducedMotion && (
          <Suspense fallback={null}>
            <HeroParticles />
          </Suspense>
        )}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        {/* Trust Indicators */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-teal" />
            <span>Open Source Hardware</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            <span>Live Prototype v0.1</span>
          </div>
        </div>

        {/* Enhanced Headline with Better Typography */}
        <h1 
          id="hero-headline"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-6"
        >
          <span className="text-foreground block">Your desktop.</span>
          <span className="bg-gradient-to-r from-teal via-teal to-amber bg-clip-text text-transparent block">
            On your wall.
          </span>
        </h1>

        {/* Improved Subtext with Better Readability */}
        <p className="mx-auto max-w-3xl text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
          As software ate the world, AI is throwing it back up.
          <br className="hidden sm:block" />
          <span className="text-foreground font-medium">Apps are escaping the phone.</span>{" "}
          The wall is where they land.
        </p>

        {/* Enhanced Product Showcase */}
        <div className="relative mx-auto max-w-5xl mb-12">
          <div className="group relative overflow-hidden rounded-3xl border border-teal/20 bg-surface-raised/80 backdrop-blur-sm p-2">
            {/* Enhanced Image with Overlay */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/hero-wall.jpg"
                alt="Modular wall computer with mixed screens, ambient lights, and holographic displays in a modern living room"
                className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              
              {/* Play Button — future: open demo video modal */}
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                aria-label="Watch demo video"
              >
                <div className="flex items-center gap-3 rounded-full bg-teal px-6 py-3 text-background font-semibold shadow-2xl">
                  <Play className="h-5 w-5" />
                  Watch Demo
                </div>
              </div>

              {/* Enhanced Stats Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="rounded-lg bg-background/90 backdrop-blur-sm px-4 py-2 border border-teal/20">
                  <div className="text-sm font-mono text-teal font-medium">12 modules. One wall. Zero wires.</div>
                </div>
                <div className="text-xs font-mono text-muted-foreground/70 bg-background/50 backdrop-blur-sm rounded px-2 py-1">
                  concept render
                </div>
              </div>

              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(0, 212, 170, 0.1), 0 0 40px rgba(0, 212, 170, 0.1)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#configurator"
            className="group relative inline-flex items-center gap-2 rounded-2xl bg-teal px-8 py-4 text-lg font-semibold text-background transition-all duration-300 hover:bg-teal/90 hover:shadow-[0_0_40px_rgba(0,212,170,0.4)] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal/30"
          >
            <Zap className="h-5 w-5" />
            Build Your Wall
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-teal/30 px-8 py-4 text-lg font-semibold text-teal transition-all duration-300 hover:border-teal hover:bg-teal/10 focus:outline-none focus:ring-4 focus:ring-teal/30"
          >
            How It Works
            <ChevronDown className="h-5 w-5" />
          </a>
        </div>

        {/* Enhanced Stats with Better Visual Hierarchy */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 max-w-2xl mx-auto">
          <div className="text-center group">
            <div className="text-4xl font-bold text-teal mb-2 tabular-nums transition-transform group-hover:scale-110">
              11
            </div>
            <div className="text-sm text-muted-foreground font-medium tracking-wide">
              Module Types
            </div>
          </div>
          
          <div className="text-center group">
            <div className="text-4xl font-bold text-amber mb-2 tabular-nums transition-transform group-hover:scale-110">
              $9-129
            </div>
            <div className="text-sm text-muted-foreground font-medium tracking-wide">
              Per Module
            </div>
          </div>
          
          <div className="text-center group">
            <div className="text-4xl font-bold text-foreground mb-2 transition-transform group-hover:scale-110">
              ∞
            </div>
            <div className="text-sm text-muted-foreground font-medium tracking-wide">
              Combinations
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 z-10">
        <span className="text-xs font-mono tracking-wide">explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-teal/40 to-transparent relative">
          <div className="absolute top-0 w-px h-4 bg-teal animate-pulse" />
        </div>
      </div>

      {/* No custom CSS needed — particles handled by Three.js */}
    </section>
  );
}