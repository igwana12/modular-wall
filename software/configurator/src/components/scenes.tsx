"use client";

import { useState, useCallback } from "react";
import { SCENES, MODULES } from "@/lib/modules";

export function Scenes() {
  const [active, setActive] = useState(SCENES[0].id);
  const [animating, setAnimating] = useState(false);
  const activeScene = SCENES.find((s) => s.id === active)!;

  const handleSceneChange = useCallback((id: string) => {
    if (id === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(id);
      setAnimating(false);
    }, 200);
  }, [active]);

  return (
    <section id="scenes" className="relative py-24 md:py-32 smoke-bg noise-overlay">
      <div className="mx-auto max-w-6xl px-6 relative z-[1]">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-amber tracking-widest uppercase section-label">Scenes</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            One wall. Many moods.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Scenes orchestrate every module simultaneously. The wall shifts to match the moment — automatically, or on command.
          </p>
        </div>

        {/* Scene selector tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => handleSceneChange(scene.id)}
              className="rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300"
              style={
                active === scene.id
                  ? {
                      backgroundColor: `${scene.color}20`,
                      color: scene.color,
                      border: `1px solid ${scene.color}40`,
                      boxShadow: `0 0 20px ${scene.color}15, 0 0 40px ${scene.color}08`,
                      animation: 'pulse-glow 3s ease-in-out infinite',
                    }
                  : {
                      backgroundColor: "transparent",
                      color: "#8888aa",
                      border: "1px solid transparent",
                    }
              }
            >
              {scene.name}
            </button>
          ))}
        </div>

        {/* Active scene detail */}
        <div
          className="grid md:grid-cols-2 gap-8 items-center transition-all duration-300"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(10px)' : 'translateY(0)',
          }}
        >
          {/* Scene visual */}
          <div
            className="rounded-2xl border border-white/5 overflow-hidden h-64 md:h-80 relative transition-all duration-500"
            style={{
              borderColor: `${activeScene.color}20`,
              boxShadow: `0 0 40px ${activeScene.color}10, 0 0 80px ${activeScene.color}05`,
            }}
          >
            <img
              src="/hero-wall.jpg"
              alt={`Wall in ${activeScene.name} mode`}
              className="w-full h-full object-cover transition-all duration-700"
              style={{ filter: `hue-rotate(${activeScene.id === 'morning' ? '30deg' : activeScene.id === 'focus' ? '160deg' : activeScene.id === 'movie' ? '220deg' : '320deg'}) brightness(${activeScene.id === 'sleep' ? '0.3' : '0.8'})` }}
            />
            <div className="absolute inset-0 transition-colors duration-700" style={{ backgroundColor: `${activeScene.color}15` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-transparent to-transparent" />
            {/* Active module indicators */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {activeScene.modules.map((modId) => {
                const mod = MODULES.find((m) => m.id === modId)!;
                return (
                  <div
                    key={modId}
                    className="h-8 w-8 rounded-lg flex items-center justify-center backdrop-blur-sm"
                    style={{
                      backgroundColor: `${mod.color}30`,
                      border: `1px solid ${mod.color}50`,
                    }}
                  >
                    <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: mod.color }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scene info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{
                  backgroundColor: activeScene.color,
                  boxShadow: `0 0 10px ${activeScene.color}60, 0 0 20px ${activeScene.color}30`,
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}
              />
              <span className="text-xs font-mono text-muted-foreground section-label">
                {activeScene.time}
              </span>
            </div>

            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: activeScene.color }}
            >
              {activeScene.name}
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-6">
              {activeScene.description}
            </p>

            {/* Active modules */}
            <div>
              <span className="text-xs font-mono text-muted-foreground mb-2 block section-label">
                ACTIVE MODULES
              </span>
              <div className="flex flex-wrap gap-2">
                {activeScene.modules.map((modId) => {
                  const mod = MODULES.find((m) => m.id === modId)!;
                  return (
                    <span
                      key={modId}
                      className="rounded-lg px-3 py-1 text-xs font-mono font-medium transition-all duration-300"
                      style={{
                        backgroundColor: `${mod.color}15`,
                        color: mod.color,
                        border: `1px solid ${mod.color}25`,
                      }}
                    >
                      {mod.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
