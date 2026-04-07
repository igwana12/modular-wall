/**
 * Enhanced Wall Configurator Component
 * Improvements:
 * - Better mobile responsiveness
 * - Enhanced accessibility
 * - Improved visual feedback
 * - Performance optimizations
 * - Better user guidance
 */

"use client";

import { useState, useCallback, useRef, useMemo, lazy, Suspense } from "react";
import { MODULES, GRID_ROWS, GRID_COLS, type ModuleType, type GridCell } from "@/lib/modules";
import {
  Trash2,
  RotateCcw,
  Download,
  AlertTriangle,
  CheckCircle2,
  Lightbulb
} from "lucide-react";

const ModulePreview3D = lazy(() =>
  import("@/components/three/module-previews").then((m) => ({ default: m.ModulePreview3D }))
);

function createEmptyGrid(): GridCell[][] {
  return Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLS }, () => null)
  );
}

export function EnhancedWallConfigurator() {
  const [grid, setGrid] = useState<GridCell[][]>(createEmptyGrid);
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
  const [isErasing, setIsErasing] = useState(false);
  const [flashCell, setFlashCell] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoized calculations for performance
  const placedModules = useMemo(() => 
    grid.flat().filter(Boolean) as ModuleType[], [grid]
  );

  const { totalPrice, moduleCounts, hasHub, recommendations } = useMemo(() => {
    const counts = placedModules.reduce<Record<string, number>>((acc, m) => {
      acc[m.id] = (acc[m.id] || 0) + 1;
      return acc;
    }, {});

    const total = placedModules.reduce((sum, m) => sum + m.price, 0);
    const hasHubModule = counts["hub"] > 0;
    
    // Smart recommendations
    const recs = [];
    if (!hasHubModule && placedModules.length > 0) {
      recs.push({ type: 'error', text: 'Hub module required for every wall ($49)' });
    }
    if (!counts["screen-s"] && placedModules.length > 2) {
      recs.push({ type: 'suggestion', text: 'Consider adding a Screen module for display' });
    }
    if (!counts["glow"] && placedModules.length > 3) {
      recs.push({ type: 'suggestion', text: 'Glow modules add ambient lighting' });
    }
    if (placedModules.length >= 6) {
      recs.push({ type: 'success', text: 'Great wall size for room impact!' });
    }

    return {
      totalPrice: total,
      moduleCounts: counts,
      hasHub: hasHubModule,
      recommendations: recs
    };
  }, [placedModules]);

  const handleCellClick = useCallback((row: number, col: number) => {
    setGrid((prev) => {
      const next = prev.map((r) => [...r]);
      if (isErasing) {
        next[row][col] = null;
      } else if (selectedModule) {
        next[row][col] = selectedModule;
        // Enhanced flash effect
        const key = `${row}-${col}`;
        setFlashCell(key);
        if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
        flashTimeoutRef.current = setTimeout(() => setFlashCell(null), 500);
      }
      return next;
    });
  }, [selectedModule, isErasing]);

  const clearGrid = useCallback(() => {
    setGrid(createEmptyGrid());
    setSelectedModule(null);
    setIsErasing(false);
  }, []);

  const loadPreset = useCallback((preset: "starter" | "media" | "premium") => {
    const presets = {
      starter: [
        { row: 0, col: 2, module: "hub" },
        { row: 0, col: 3, module: "screen-s" },
        { row: 1, col: 1, module: "glow" },
        { row: 1, col: 4, module: "sense" },
      ],
      media: [
        { row: 0, col: 1, module: "glow" },
        { row: 0, col: 2, module: "screen-s" },
        { row: 0, col: 3, module: "screen-s" },
        { row: 0, col: 4, module: "glow" },
        { row: 1, col: 2, module: "hub" },
        { row: 1, col: 3, module: "pixel" },
        { row: 2, col: 2, module: "voice" },
        { row: 2, col: 3, module: "sense" },
      ],
      premium: [
        { row: 0, col: 1, module: "glow" },
        { row: 0, col: 2, module: "holo" },
        { row: 0, col: 3, module: "round" },
        { row: 0, col: 4, module: "glow" },
        { row: 1, col: 1, module: "pixel" },
        { row: 1, col: 2, module: "screen-s" },
        { row: 1, col: 3, module: "voice" },
        { row: 1, col: 4, module: "sense" },
        { row: 2, col: 2, module: "hub" },
      ],
    };

    const newGrid = createEmptyGrid();
    presets[preset].forEach(({ row, col, module }) => {
      const moduleData = MODULES.find(m => m.id === module);
      if (moduleData) {
        newGrid[row][col] = moduleData;
      }
    });
    setGrid(newGrid);
  }, []);

  const exportConfiguration = useCallback(() => {
    const config = {
      grid,
      modules: moduleCounts,
      totalPrice,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mosaic-wall-config-${Date.now()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [grid, moduleCounts, totalPrice]);

  return (
    <section id="configurator" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-2 text-sm font-mono text-teal mb-4">
            <div className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            Interactive Configurator
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Build your wall
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Design your perfect modular wall setup. Select modules and place them on the grid - 
            think of it as Tetris for your living room.
          </p>
          
          {/* Quick Start Presets */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => loadPreset("starter")}
              className="px-4 py-2 rounded-lg border border-teal/30 text-teal hover:bg-teal/10 transition-colors"
            >
              Starter ($185)
            </button>
            <button
              onClick={() => loadPreset("media")}
              className="px-4 py-2 rounded-lg border border-amber/30 text-amber hover:bg-amber/10 transition-colors"
            >
              Media Center ($454)
            </button>
            <button
              onClick={() => loadPreset("premium")}
              className="px-4 py-2 rounded-lg border border-purple-400/30 text-purple-400 hover:bg-purple-400/10 transition-colors"
            >
              Premium ($616)
            </button>
          </div>
        </div>

        <div className="grid xl:grid-cols-[1fr_380px] gap-8">
          {/* Enhanced Grid Section */}
          <div className="order-2 xl:order-1">
            <div className="rounded-3xl border border-border/50 bg-gradient-to-br from-surface-raised/50 to-surface/30 backdrop-blur-sm p-6">
              {/* Grid Header with Actions */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Wall Grid</h3>
                  <p className="text-sm text-muted-foreground">
                    {GRID_COLS} × {GRID_ROWS} modules (~60cm × 40cm)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportConfiguration}
                    disabled={placedModules.length === 0}
                    className="p-2 rounded-lg border border-border hover:bg-surface-raised transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Export configuration"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={clearGrid}
                    className="p-2 rounded-lg border border-border hover:bg-surface-raised hover:border-destructive/50 hover:text-destructive transition-colors"
                    title="Clear all modules"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Enhanced Grid */}
              <div
                className="grid gap-3 mb-4"
                style={{
                  gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                  gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
                }}
              >
                {grid.map((row, ri) =>
                  row.map((cell, ci) => {
                    const cellKey = `${ri}-${ci}`;
                    const isFlashing = flashCell === cellKey;
                    const isHovered = hoveredCell === cellKey;
                    
                    return (
                      <button
                        key={cellKey}
                        onClick={() => handleCellClick(ri, ci)}
                        onMouseEnter={() => setHoveredCell(cellKey)}
                        onMouseLeave={() => setHoveredCell(null)}
                        className="relative aspect-square rounded-2xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-1 text-xs font-mono cursor-pointer hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal/30"
                        style={
                          cell
                            ? {
                                backgroundColor: `${cell.color}15`,
                                borderColor: `${cell.color}60`,
                                borderStyle: "solid",
                                boxShadow: `0 8px 25px ${cell.color}15, 0 0 0 ${isHovered ? '2px' : '1px'} ${cell.color}${isHovered ? '80' : '40'}`,
                              }
                            : {
                                backgroundColor: isHovered ? "#1a1a2e60" : "#1a1a2e30",
                                borderColor: selectedModule
                                  ? `${selectedModule.color}40`
                                  : "#2a2a4a",
                                borderStyle: "dashed",
                              }
                        }
                        aria-label={cell ? `${cell.name} module` : `Empty cell ${ri + 1}, ${ci + 1}`}
                      >
                        {/* Enhanced Flash Effect */}
                        {isFlashing && cell && (
                          <div
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{
                              background: `radial-gradient(circle, ${cell.color}60 0%, ${cell.color}20 50%, transparent 100%)`,
                              animation: 'flash-pulse 0.5s ease-out forwards',
                            }}
                          />
                        )}
                        
                        {cell ? (
                          <>
                            <div
                              className="h-7 w-7 rounded-lg border-2 shadow-sm"
                              style={{
                                backgroundColor: `${cell.color}30`,
                                borderColor: `${cell.color}70`,
                                boxShadow: isHovered ? `0 0 12px ${cell.color}40` : undefined,
                              }}
                            />
                            <span
                              className="text-[10px] font-bold truncate max-w-full px-1"
                              style={{ color: cell.color }}
                            >
                              {cell.name}
                            </span>
                            <span className="text-[9px] text-muted-foreground">
                              ${cell.price}
                            </span>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <div className="h-6 w-6 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                              <span className="text-muted-foreground/40 text-lg">+</span>
                            </div>
                            {selectedModule && isHovered && (
                              <span className="text-[10px] text-teal">
                                Place {selectedModule.name}
                              </span>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Dimensions Guide */}
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground/60 border-t border-border/30 pt-4">
                <span>~60cm wide</span>
                <span>Each cell ≈ 10cm × 10cm module</span>
                <span>~40cm tall</span>
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="order-1 xl:order-2 space-y-6">
            {/* Module Selector */}
            <div className="rounded-3xl border border-border/50 bg-gradient-to-br from-surface-raised/50 to-surface/30 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Select Module</h3>
                {selectedModule && (
                  <span className="text-sm text-muted-foreground">
                    ${selectedModule.price} each
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {MODULES.map((mod) => {
                  const isSelected = selectedModule?.id === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setIsErasing(false);
                        setSelectedModule(isSelected ? null : mod);
                      }}
                      className="flex flex-col items-center gap-1.5 rounded-xl p-2 border-2 transition-all text-xs hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-teal/30"
                      style={
                        isSelected
                          ? {
                              borderColor: mod.color,
                              backgroundColor: `${mod.color}10`,
                              boxShadow: `0 0 20px ${mod.color}20`,
                            }
                          : {
                              borderColor: "transparent",
                              backgroundColor: "#1a1a2e40",
                            }
                      }
                      aria-pressed={isSelected}
                    >
                      <Suspense
                        fallback={
                          <div
                            className="h-12 w-12 rounded-lg border-2"
                            style={{
                              backgroundColor: `${mod.color}20`,
                              borderColor: `${mod.color}50`,
                            }}
                          />
                        }
                      >
                        <ModulePreview3D
                          moduleId={mod.id}
                          size={56}
                          isActive={isSelected}
                          className="rounded-lg overflow-hidden"
                        />
                      </Suspense>
                      <span
                        className="font-mono text-[11px] font-bold text-center"
                        style={{
                          color: isSelected ? mod.color : "#8888aa",
                        }}
                      >
                        {mod.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground tabular-nums">
                        ${mod.price}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Enhanced Eraser */}
              <button
                onClick={() => {
                  setIsErasing(!isErasing);
                  setSelectedModule(null);
                }}
                className={`w-full rounded-xl border-2 p-3 text-sm font-mono transition-all flex items-center justify-center gap-2 ${
                  isErasing
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border bg-surface-overlay text-muted-foreground hover:text-foreground hover:bg-surface-raised"
                }`}
                aria-pressed={isErasing}
              >
                <Trash2 className="h-4 w-4" />
                {isErasing ? "Erasing Mode" : "Eraser Tool"}
              </button>
            </div>

            {/* Enhanced Price Summary */}
            <div className="rounded-3xl border border-border/50 bg-gradient-to-br from-surface-raised/50 to-surface/30 backdrop-blur-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Configuration Summary</h3>

              {placedModules.length === 0 ? (
                <div className="text-center py-8">
                  <Lightbulb className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Select a module above and click the grid to start building your wall.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Module List */}
                  <div className="space-y-2">
                    {Object.entries(moduleCounts).map(([id, count]) => {
                      const mod = MODULES.find((m) => m.id === id)!;
                      return (
                        <div
                          key={id}
                          className="flex items-center justify-between py-2 px-3 rounded-lg bg-surface/50"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="h-4 w-4 rounded-md border"
                              style={{
                                backgroundColor: `${mod.color}30`,
                                borderColor: `${mod.color}60`,
                              }}
                            />
                            <span className="text-sm" style={{ color: mod.color }}>
                              {mod.name} ×{count}
                            </span>
                          </div>
                          <span className="text-sm font-mono text-muted-foreground tabular-nums">
                            ${mod.price * count}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="h-px bg-border" />

                  {/* Total */}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold font-mono text-teal tabular-nums">
                      ${totalPrice}
                    </span>
                  </div>

                  {/* Recommendations */}
                  {recommendations.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
                            rec.type === 'error' 
                              ? 'bg-destructive/10 border border-destructive/20 text-destructive'
                              : rec.type === 'success'
                              ? 'bg-teal/10 border border-teal/20 text-teal'
                              : 'bg-amber/10 border border-amber/20 text-amber'
                          }`}
                        >
                          {rec.type === 'error' && <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          {rec.type === 'success' && <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          {rec.type === 'suggestion' && <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          <span>{rec.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Usage Tip */}
            <div className="rounded-xl border border-teal/20 bg-teal/5 p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" />
                <div className="text-sm text-teal/80 leading-relaxed">
                  <strong>Pro tip:</strong> Try the preset configurations above for inspiration, 
                  then customize to your needs. The production version will support drag-and-drop 
                  with module rotation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes flash-pulse {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}