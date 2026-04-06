"use client";

import { useState } from "react";
import { SCENES, MODULES } from "@/lib/modules";

export function Scenes() {
  const [active, setActive] = useState(SCENES[0].id);
  const activeScene = SCENES.find((s) => s.id === active)!;

  return (
    <section id="scenes" className="relative py-24 md:py-32 smoke-bg">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-amber tracking-widest uppercase">Scenes</span>
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
              onClick={() => setActive(scene.id)}
              className="rounded-xl px-4 py-2 text-sm font-medium transition-all"
              style={
                active === scene.id
                  ? {
                      backgroundColor: `${scene.color}20`,
                      color: scene.color,
                      border: `1px solid ${scene.color}40`,
                      boxShadow: `0 0 20px ${scene.color}15`,
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
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Scene visual */}
          <div
            className="rounded-2xl border border-white/5 p-8 h-64 md:h-80 flex flex-col items-center justify-center transition-all duration-500"
            style={{
              backgroundColor: `${activeScene.color}08`,
              borderColor: `${activeScene.color}20`,
              boxShadow: `inset 0 0 60px ${activeScene.color}08`,
            }}
          >
            {/* Simulated wall state */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {activeScene.modules.map((modId, i) => {
                const mod = MODULES.find((m) => m.id === modId)!;
                return (
                  <div
                    key={`${modId}-${i}`}
                    className="h-14 w-14 rounded-xl flex items-center justify-center transition-all duration-700"
                    style={{
                      backgroundColor: `${mod.color}20`,
                      border: `1px solid ${mod.color}40`,
                      boxShadow: `0 0 15px ${mod.color}20`,
                      animationDelay: `${i * 200}ms`,
                    }}
                  >
                    <div
                      className="h-3 w-3 rounded-full animate-pulse"
                      style={{ backgroundColor: mod.color }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="text-xs font-mono text-muted-foreground/50">
              [ scene visualization ]
            </div>
          </div>

          {/* Scene info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: activeScene.color }}
              />
              <span className="text-xs font-mono text-muted-foreground">
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
              <span className="text-xs font-mono text-muted-foreground mb-2 block">
                ACTIVE MODULES
              </span>
              <div className="flex flex-wrap gap-2">
                {activeScene.modules.map((modId) => {
                  const mod = MODULES.find((m) => m.id === modId)!;
                  return (
                    <span
                      key={modId}
                      className="rounded-lg px-3 py-1 text-xs font-mono font-medium"
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
