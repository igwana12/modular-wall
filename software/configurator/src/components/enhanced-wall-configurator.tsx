/**
 * Freeform Wall Configurator — Real Module Dimensions
 * Modules render at correct relative scale on a 600x400mm canvas.
 * Click canvas to place, click module to remove. Snap-to-grid alignment.
 */

"use client";

import { useState, useCallback, useRef, useMemo, lazy, Suspense } from "react";
import {
  MODULES,
  CANVAS_WIDTH_MM,
  CANVAS_HEIGHT_MM,
  SNAP_GRID_MM,
  type ModuleType,
  type PlacedModule,
} from "@/lib/modules";
import {
  Trash2,
  RotateCcw,
  Download,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Move,
} from "lucide-react";

const ModulePreview3D = lazy(() =>
  import("@/components/three/module-previews").then((m) => ({
    default: m.ModulePreview3D,
  }))
);

// ─── Scale helpers ─────────────────────────────────────────────
// The canvas DOM element maps CANVAS_WIDTH_MM x CANVAS_HEIGHT_MM
// to its actual pixel width. We compute scale dynamically.
function mmToPx(mm: number, canvasWidthPx: number): number {
  return (mm / CANVAS_WIDTH_MM) * canvasWidthPx;
}

function pxToMm(px: number, canvasWidthPx: number): number {
  return (px / canvasWidthPx) * CANVAS_WIDTH_MM;
}

function snapToGrid(mm: number): number {
  return Math.round(mm / SNAP_GRID_MM) * SNAP_GRID_MM;
}

// ─── Module shape outline component ────────────────────────────
function ModuleOutline({
  mod,
  x,
  y,
  canvasWidth,
  isGhost,
  isSelected,
  onClick,
}: {
  mod: ModuleType;
  x: number;
  y: number;
  canvasWidth: number;
  isGhost?: boolean;
  isSelected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  const w = mmToPx(mod.width_mm, canvasWidth);
  const h = mmToPx(mod.height_mm, canvasWidth);
  const left = mmToPx(x, canvasWidth);
  const top = mmToPx(y, canvasWidth) * (CANVAS_WIDTH_MM / CANVAS_HEIGHT_MM);

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    left,
    top: mmToPx(y, canvasWidth),
    width: w,
    height: h,
    borderRadius: mod.shape === "circle" ? "50%" : 6,
    border: `2px solid ${mod.color}${isGhost ? "40" : isSelected ? "cc" : "80"}`,
    backgroundColor: `${mod.color}${isGhost ? "08" : "18"}`,
    boxShadow: isSelected
      ? `0 0 20px ${mod.color}30, inset 0 0 15px ${mod.color}10`
      : isGhost
        ? "none"
        : `0 4px 12px ${mod.color}10`,
    transition: isGhost ? "none" : "box-shadow 0.2s, border-color 0.2s",
    cursor: isGhost ? "default" : "pointer",
    pointerEvents: isGhost ? "none" : "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  const fontSize = Math.max(8, Math.min(12, w / 8));

  return (
    <div style={baseStyle} onClick={onClick} title={`${mod.name} (${mod.width_mm}×${mod.height_mm}mm)`}>
      {!isGhost && (
        <>
          <span
            className="font-mono font-bold leading-none"
            style={{ fontSize, color: mod.color }}
          >
            {mod.name}
          </span>
          <span
            className="font-mono opacity-60 leading-none mt-0.5"
            style={{ fontSize: Math.max(7, fontSize - 2), color: mod.color }}
          >
            {mod.width_mm}×{mod.height_mm}
          </span>
        </>
      )}
    </div>
  );
}

// ─── Preset layouts with real mm positions ─────────────────────
const PRESETS: Record<string, { label: string; price: string; color: string; modules: PlacedModule[] }> = {
  starter: {
    label: "Starter",
    price: "$206",
    color: "#00D4AA",
    modules: [
      { id: "p1", module: MODULES.find((m) => m.id === "hub")!, x: 44, y: 0 },
      { id: "p2", module: MODULES.find((m) => m.id === "screen-s")!, x: 157, y: 0 },
      { id: "p3", module: MODULES.find((m) => m.id === "glow")!, x: 0, y: 84 },
      { id: "p4", module: MODULES.find((m) => m.id === "sense")!, x: 93, y: 84 },
      { id: "p5", module: MODULES.find((m) => m.id === "brick")!, x: 159, y: 128 },
    ],
  },
  media: {
    label: "Media Center",
    price: "$453",
    color: "#FFB347",
    modules: [
      { id: "m1", module: MODULES.find((m) => m.id === "pixel")!, x: 0, y: 0 },
      { id: "m2", module: MODULES.find((m) => m.id === "glow")!, x: 188, y: 0 },
      { id: "m3", module: MODULES.find((m) => m.id === "glow")!, x: 281, y: 0 },
      { id: "m4", module: MODULES.find((m) => m.id === "screen-s")!, x: 0, y: 108 },
      { id: "m5", module: MODULES.find((m) => m.id === "screen-s")!, x: 98, y: 108 },
      { id: "m6", module: MODULES.find((m) => m.id === "voice")!, x: 196, y: 93 },
      { id: "m7", module: MODULES.find((m) => m.id === "hub")!, x: 289, y: 93 },
      { id: "m8", module: MODULES.find((m) => m.id === "sense")!, x: 196, y: 186 },
    ],
  },
  premium: {
    label: "Premium",
    price: "$701",
    color: "#cc44ff",
    modules: [
      { id: "x1", module: MODULES.find((m) => m.id === "holo")!, x: 0, y: 0 },
      { id: "x2", module: MODULES.find((m) => m.id === "screen-m")!, x: 162, y: 0 },
      { id: "x3", module: MODULES.find((m) => m.id === "round")!, x: 328, y: 0 },
      { id: "x4", module: MODULES.find((m) => m.id === "mirror")!, x: 441, y: 0 },
      { id: "x5", module: MODULES.find((m) => m.id === "pixel")!, x: 0, y: 162 },
      { id: "x6", module: MODULES.find((m) => m.id === "glow")!, x: 188, y: 116 },
      { id: "x7", module: MODULES.find((m) => m.id === "voice")!, x: 281, y: 113 },
      { id: "x8", module: MODULES.find((m) => m.id === "hub")!, x: 374, y: 142 },
      { id: "x9", module: MODULES.find((m) => m.id === "sense")!, x: 487, y: 142 },
      { id: "x10", module: MODULES.find((m) => m.id === "screen-s")!, x: 188, y: 209 },
      { id: "x11", module: MODULES.find((m) => m.id === "brick")!, x: 286, y: 206 },
    ],
  },
};

// ─── Main Component ────────────────────────────────────────────
let nextId = 1;

export function EnhancedWallConfigurator() {
  const [placed, setPlaced] = useState<PlacedModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
  const [selectedPlacedId, setSelectedPlacedId] = useState<string | null>(null);
  const [isErasing, setIsErasing] = useState(false);
  const [ghostPos, setGhostPos] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Memoized calculations
  const { totalPrice, moduleCounts, recommendations } = useMemo(() => {
    const counts = placed.reduce<Record<string, number>>((acc, p) => {
      acc[p.module.id] = (acc[p.module.id] || 0) + 1;
      return acc;
    }, {});
    const total = placed.reduce((sum, p) => sum + p.module.price, 0);
    const hasHub = counts["hub"] > 0;

    const recs: { type: string; text: string }[] = [];
    if (!hasHub && placed.length > 0) {
      recs.push({ type: "error", text: "Hub module required for every wall ($49)" });
    }
    if (!counts["screen-s"] && !counts["screen-m"] && placed.length > 2) {
      recs.push({ type: "suggestion", text: "Consider adding a Screen module for display" });
    }
    if (placed.length >= 6) {
      recs.push({ type: "success", text: "Great wall size for room impact!" });
    }
    return { totalPrice: total, moduleCounts: counts, recommendations: recs };
  }, [placed]);

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!selectedModule || isErasing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const canvasW = rect.width;
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Convert to mm, center the module on click point, snap
      const mmX = snapToGrid(pxToMm(clickX, canvasW) - selectedModule.width_mm / 2);
      const mmY = snapToGrid(pxToMm(clickY, canvasW) - selectedModule.height_mm / 2);

      // Clamp within canvas bounds
      const x = Math.max(0, Math.min(CANVAS_WIDTH_MM - selectedModule.width_mm, mmX));
      const y = Math.max(0, Math.min(CANVAS_HEIGHT_MM - selectedModule.height_mm, mmY));

      setPlaced((prev) => [
        ...prev,
        { id: `mod-${nextId++}`, module: selectedModule, x, y },
      ]);
    },
    [selectedModule, isErasing]
  );

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!selectedModule || isErasing) {
        setGhostPos(null);
        return;
      }
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const canvasW = rect.width;
      const mmX = snapToGrid(pxToMm(e.clientX - rect.left, canvasW) - selectedModule.width_mm / 2);
      const mmY = snapToGrid(pxToMm(e.clientY - rect.top, canvasW) - selectedModule.height_mm / 2);
      setGhostPos({
        x: Math.max(0, Math.min(CANVAS_WIDTH_MM - selectedModule.width_mm, mmX)),
        y: Math.max(0, Math.min(CANVAS_HEIGHT_MM - selectedModule.height_mm, mmY)),
      });
    },
    [selectedModule, isErasing]
  );

  const removePlaced = useCallback((id: string) => {
    setPlaced((prev) => prev.filter((p) => p.id !== id));
    setSelectedPlacedId(null);
  }, []);

  const clearAll = useCallback(() => {
    setPlaced([]);
    setSelectedModule(null);
    setIsErasing(false);
    setSelectedPlacedId(null);
  }, []);

  const loadPreset = useCallback((key: string) => {
    const preset = PRESETS[key];
    if (preset) setPlaced(preset.modules.map((m) => ({ ...m, id: `pre-${nextId++}` })));
  }, []);

  const exportConfiguration = useCallback(() => {
    const config = {
      placed: placed.map((p) => ({
        module: p.module.id,
        x: p.x,
        y: p.y,
        width_mm: p.module.width_mm,
        height_mm: p.module.height_mm,
      })),
      moduleCounts,
      totalPrice,
      canvas: { width_mm: CANVAS_WIDTH_MM, height_mm: CANVAS_HEIGHT_MM },
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mosaic-wall-config-${Date.now()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [placed, moduleCounts, totalPrice]);

  // Canvas aspect ratio
  const aspectRatio = CANVAS_HEIGHT_MM / CANVAS_WIDTH_MM;

  return (
    <section id="configurator" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-2 text-sm font-mono text-teal mb-4">
            <div className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            Interactive Configurator
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Build your wall
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Real module dimensions, real scale. Select a module and click the
            canvas to place it. Click a placed module to remove.
          </p>

          {/* Presets */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.entries(PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => loadPreset(key)}
                className="px-4 py-2 rounded-lg border transition-colors"
                style={{
                  borderColor: `${preset.color}40`,
                  color: preset.color,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${preset.color}15`)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {preset.label} ({preset.price})
              </button>
            ))}
          </div>
        </div>

        <div className="grid xl:grid-cols-[1fr_380px] gap-8">
          {/* Canvas Section */}
          <div className="order-2 xl:order-1">
            <div className="rounded-3xl border border-border/50 bg-gradient-to-br from-surface-raised/50 to-surface/30 backdrop-blur-sm p-6">
              {/* Canvas Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Wall Canvas</h3>
                  <p className="text-sm text-muted-foreground">
                    {CANVAS_WIDTH_MM}×{CANVAS_HEIGHT_MM}mm — real scale, {SNAP_GRID_MM}mm snap grid
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportConfiguration}
                    disabled={placed.length === 0}
                    className="p-2 rounded-lg border border-border hover:bg-surface-raised transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Export configuration"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={clearAll}
                    className="p-2 rounded-lg border border-border hover:bg-surface-raised hover:border-destructive/50 hover:text-destructive transition-colors"
                    title="Clear all"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Freeform Canvas */}
              <div
                ref={canvasRef}
                className="relative w-full rounded-2xl border-2 border-dashed border-border/50 overflow-hidden cursor-crosshair"
                style={{
                  paddingBottom: `${aspectRatio * 100}%`,
                  background: `
                    linear-gradient(rgba(0, 212, 170, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 212, 170, 0.03) 1px, transparent 1px),
                    #0a0a14
                  `,
                  backgroundSize: `${(SNAP_GRID_MM / CANVAS_WIDTH_MM) * 100}% ${(SNAP_GRID_MM / CANVAS_HEIGHT_MM) * 100}%`,
                }}
                onClick={handleCanvasClick}
                onMouseMove={handleCanvasMouseMove}
                onMouseLeave={() => setGhostPos(null)}
              >
                {/* Absolute positioned inner container */}
                <div className="absolute inset-0">
                  {/* Ghost preview */}
                  {ghostPos && selectedModule && (
                    <ModuleOutline
                      mod={selectedModule}
                      x={ghostPos.x}
                      y={ghostPos.y}
                      canvasWidth={canvasRef.current?.getBoundingClientRect().width ?? 600}
                      isGhost
                    />
                  )}

                  {/* Placed modules */}
                  {placed.map((p) => (
                    <ModuleOutline
                      key={p.id}
                      mod={p.module}
                      x={p.x}
                      y={p.y}
                      canvasWidth={canvasRef.current?.getBoundingClientRect().width ?? 600}
                      isSelected={selectedPlacedId === p.id}
                      onClick={(e) => {
                        e?.stopPropagation?.();
                        if (isErasing) {
                          removePlaced(p.id);
                        } else {
                          setSelectedPlacedId(selectedPlacedId === p.id ? null : p.id);
                        }
                      }}
                    />
                  ))}

                  {/* Empty state */}
                  {placed.length === 0 && !ghostPos && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center text-muted-foreground/40">
                        <Move className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm font-mono">Select a module and click to place</p>
                        <p className="text-xs mt-1">Or try a preset above</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Scale reference */}
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground/60 border-t border-border/30 pt-4 mt-4">
                <span>0mm</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-px bg-teal/30" />
                  <span>~100mm</span>
                </div>
                <span>{CANVAS_WIDTH_MM}mm</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="order-1 xl:order-2 space-y-6">
            {/* Module Selector */}
            <div className="rounded-3xl border border-border/50 bg-gradient-to-br from-surface-raised/50 to-surface/30 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Select Module</h3>
                {selectedModule && (
                  <span className="text-xs font-mono text-muted-foreground">
                    {selectedModule.width_mm}×{selectedModule.height_mm}mm · ${selectedModule.price}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {MODULES.filter((m) => m.wallMount).map((mod) => {
                  const isSelected = selectedModule?.id === mod.id;
                  // Show shape outline proportionally
                  const maxDim = Math.max(mod.width_mm, mod.height_mm);
                  const scale = 36 / maxDim;
                  const shapeW = mod.width_mm * scale;
                  const shapeH = mod.height_mm * scale;

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
                          : { borderColor: "transparent", backgroundColor: "#1a1a2e40" }
                      }
                      aria-pressed={isSelected}
                    >
                      {/* Shape silhouette at correct aspect ratio */}
                      <div
                        className="border-2 flex items-center justify-center"
                        style={{
                          width: shapeW,
                          height: shapeH,
                          borderRadius: mod.shape === "circle" ? "50%" : 3,
                          borderColor: isSelected ? mod.color : `${mod.color}50`,
                          backgroundColor: `${mod.color}${isSelected ? "20" : "10"}`,
                        }}
                      />
                      <span
                        className="font-mono text-[10px] font-bold text-center leading-tight"
                        style={{ color: isSelected ? mod.color : "#8888aa" }}
                      >
                        {mod.name}
                      </span>
                      <span className="text-[9px] text-muted-foreground tabular-nums leading-none">
                        {mod.width_mm}×{mod.height_mm}mm · ${mod.price}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Eraser */}
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
                {isErasing ? "Click modules to remove" : "Eraser Tool"}
              </button>
            </div>

            {/* Selected Module Detail with 3D */}
            {selectedModule && (
              <div className="rounded-3xl border border-border/50 bg-gradient-to-br from-surface-raised/50 to-surface/30 backdrop-blur-sm p-6">
                <h3 className="text-lg font-semibold mb-3" style={{ color: selectedModule.color }}>
                  {selectedModule.name}
                </h3>
                <Suspense
                  fallback={
                    <div className="h-32 rounded-xl bg-surface/50 animate-pulse" />
                  }
                >
                  <ModulePreview3D
                    moduleId={selectedModule.id}
                    size={160}
                    isActive
                    className="rounded-xl overflow-hidden mx-auto mb-3"
                  />
                </Suspense>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedModule.description}
                </p>
                <div className="mt-2 text-xs font-mono text-muted-foreground/60">
                  {selectedModule.width_mm}×{selectedModule.height_mm}×{selectedModule.depth_mm}mm ·{" "}
                  {selectedModule.shape}
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="rounded-3xl border border-border/50 bg-gradient-to-br from-surface-raised/50 to-surface/30 backdrop-blur-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Configuration Summary</h3>

              {placed.length === 0 ? (
                <div className="text-center py-8">
                  <Lightbulb className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Select a module and click the canvas to start building.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
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
                              className="h-4 w-4 border"
                              style={{
                                backgroundColor: `${mod.color}30`,
                                borderColor: `${mod.color}60`,
                                borderRadius: mod.shape === "circle" ? "50%" : 3,
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

                  <div className="flex items-center justify-between py-2">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold font-mono text-teal tabular-nums">
                      ${totalPrice}
                    </span>
                  </div>

                  {recommendations.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
                            rec.type === "error"
                              ? "bg-destructive/10 border border-destructive/20 text-destructive"
                              : rec.type === "success"
                                ? "bg-teal/10 border border-teal/20 text-teal"
                                : "bg-amber/10 border border-amber/20 text-amber"
                          }`}
                        >
                          {rec.type === "error" && <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          {rec.type === "success" && <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          {rec.type === "suggestion" && <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          <span>{rec.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Tip */}
            <div className="rounded-xl border border-teal/20 bg-teal/5 p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-teal flex-shrink-0 mt-0.5" />
                <div className="text-sm text-teal/80 leading-relaxed">
                  <strong>Real scale:</strong> Modules show their actual proportions.
                  Sense is tiny (44mm), Pixel is wide (166mm), Screen-S is tall (116mm).
                  The grid snaps to {SNAP_GRID_MM}mm increments.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
