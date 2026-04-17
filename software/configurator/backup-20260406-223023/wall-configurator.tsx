"use client";

import { useState, useCallback, useRef } from "react";
import { MODULES, GRID_ROWS, GRID_COLS, type ModuleType, type GridCell } from "@/lib/modules";

function createEmptyGrid(): GridCell[][] {
  return Array.from({ length: GRID_ROWS }, () =>
    Array.from({ length: GRID_COLS }, () => null)
  );
}

export function WallConfigurator() {
  const [grid, setGrid] = useState<GridCell[][]>(createEmptyGrid);
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
  const [isErasing, setIsErasing] = useState(false);
  const [flashCell, setFlashCell] = useState<string | null>(null);
  const flashTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      setGrid((prev) => {
        const next = prev.map((r) => [...r]);
        if (isErasing) {
          next[row][col] = null;
        } else if (selectedModule) {
          next[row][col] = selectedModule;
          // Flash effect
          const key = `${row}-${col}`;
          setFlashCell(key);
          if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
          flashTimeoutRef.current = setTimeout(() => setFlashCell(null), 400);
        }
        return next;
      });
    },
    [selectedModule, isErasing]
  );

  const clearGrid = useCallback(() => {
    setGrid(createEmptyGrid());
  }, []);

  // Calculate price
  const placedModules = grid.flat().filter(Boolean) as ModuleType[];
  const totalPrice = placedModules.reduce((sum, m) => sum + m.price, 0);
  const moduleCounts = placedModules.reduce<Record<string, number>>((acc, m) => {
    acc[m.id] = (acc[m.id] || 0) + 1;
    return acc;
  }, {});
  const hasHub = moduleCounts["hub"] > 0;

  return (
    <section id="configurator" className="relative py-24 md:py-32 noise-overlay">
      <div className="mx-auto max-w-6xl px-6 relative z-[1]">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-teal tracking-widest uppercase section-label">
            Interactive
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
            Build your wall
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Select a module below, then click cells on the grid to place it. Think of it as Tetris for your living room.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Grid */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl border border-border/50 bg-surface-raised/50 p-4 md:p-6 configurator-grid-bg">
              {/* Grid label */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground section-label">
                  WALL GRID ({GRID_COLS}x{GRID_ROWS})
                </span>
                <button
                  onClick={clearGrid}
                  className="text-xs font-mono text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* The grid */}
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                  gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
                }}
              >
                {grid.map((row, ri) =>
                  row.map((cell, ci) => {
                    const cellKey = `${ri}-${ci}`;
                    const isFlashing = flashCell === cellKey;
                    return (
                      <button
                        key={cellKey}
                        onClick={() => handleCellClick(ri, ci)}
                        className="relative aspect-square rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-1 text-xs font-mono cursor-pointer hover:scale-[1.03] active:scale-95"
                        style={
                          cell
                            ? {
                                backgroundColor: `${cell.color}20`,
                                borderColor: `${cell.color}60`,
                                borderStyle: "solid",
                                boxShadow: `0 4px 15px ${cell.color}20, 0 0 20px ${cell.color}10`,
                              }
                            : {
                                backgroundColor: "#1a1a2e40",
                                borderColor: selectedModule
                                  ? `${selectedModule.color}30`
                                  : "#2a2a4a",
                              }
                        }
                      >
                        {/* Flash overlay on place */}
                        {isFlashing && cell && (
                          <div
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{
                              backgroundColor: cell.color,
                              animation: 'module-place-flash 0.4s ease-out forwards',
                            }}
                          />
                        )}
                        {cell ? (
                          <>
                            <div
                              className="h-4 w-4 rounded-md"
                              style={{
                                backgroundColor: `${cell.color}40`,
                                border: `1px solid ${cell.color}60`,
                              }}
                            />
                            <span
                              className="text-[10px] font-bold truncate max-w-full px-1"
                              style={{ color: cell.color }}
                            >
                              {cell.name}
                            </span>
                          </>
                        ) : (
                          <span className="text-muted-foreground/30 text-[10px]">+</span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Wall dimensions hint */}
              <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground/40">
                <span>~60cm</span>
                <span>Each cell = ~10cm x 10cm module</span>
                <span>~40cm</span>
              </div>
            </div>
          </div>

          {/* Sidebar: module palette + price */}
          <div className="order-1 lg:order-2 space-y-4">
            {/* Module selector */}
            <div className="rounded-2xl border border-border/50 bg-surface-raised/50 p-4">
              <h3 className="text-sm font-semibold mb-3">Select Module</h3>

              <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
                {MODULES.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setIsErasing(false);
                      setSelectedModule(
                        selectedModule?.id === mod.id ? null : mod
                      );
                    }}
                    className="flex flex-col items-center gap-1 rounded-xl p-2.5 border-2 transition-all text-xs"
                    style={
                      selectedModule?.id === mod.id
                        ? {
                            borderColor: mod.color,
                            backgroundColor: `${mod.color}15`,
                            boxShadow: `0 0 15px ${mod.color}20`,
                          }
                        : {
                            borderColor: "transparent",
                            backgroundColor: "#1a1a2e60",
                          }
                    }
                  >
                    <div
                      className="h-6 w-6 rounded-md"
                      style={{
                        backgroundColor: `${mod.color}25`,
                        border: `1px solid ${mod.color}40`,
                      }}
                    />
                    <span
                      className="font-mono text-[10px] font-bold"
                      style={{
                        color:
                          selectedModule?.id === mod.id
                            ? mod.color
                            : "#8888aa",
                      }}
                    >
                      {mod.name}
                    </span>
                    <span className="text-[9px] text-muted-foreground tabular-price">
                      ${mod.price}
                    </span>
                  </button>
                ))}
              </div>

              {/* Eraser */}
              <button
                onClick={() => {
                  setIsErasing(!isErasing);
                  setSelectedModule(null);
                }}
                className={`mt-3 w-full rounded-xl border-2 p-2 text-xs font-mono transition-all ${
                  isErasing
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-transparent bg-surface-overlay text-muted-foreground hover:text-foreground"
                }`}
              >
                {isErasing ? "Erasing..." : "Eraser"}
              </button>
            </div>

            {/* Price summary */}
            <div className="rounded-2xl border border-border/50 bg-surface-raised/50 p-4">
              <h3 className="text-sm font-semibold mb-3">Your Wall</h3>

              {placedModules.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Click a module, then click the grid to start building.
                </p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(moduleCounts).map(([id, count]) => {
                    const mod = MODULES.find((m) => m.id === id)!;
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between text-xs"
                      >
                        <span style={{ color: mod.color }}>
                          {mod.name} x{count}
                        </span>
                        <span className="font-mono text-muted-foreground tabular-price">
                          ${mod.price * count}
                        </span>
                      </div>
                    );
                  })}

                  <div className="h-px bg-border my-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Total</span>
                    <span className="text-xl font-bold font-mono text-teal tabular-price">
                      ${totalPrice}
                    </span>
                  </div>

                  {!hasHub && placedModules.length > 0 && (
                    <p className="text-[10px] text-amber font-mono mt-2">
                      Don&apos;t forget a Hub module ($49) — required for every wall.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Instruction hint */}
            <div className="rounded-xl border border-teal/10 bg-teal/5 p-3 text-[10px] font-mono text-teal/70 leading-relaxed">
              TIP: Select a module and click grid cells to place. Use the eraser to remove. This is a prototype — production version will support drag-and-drop with rotation.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
