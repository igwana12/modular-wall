@AGENTS.md

## Three.js / React Three Fiber Conventions

- **Stack**: Three.js r170+ via `@react-three/fiber` v9 + `@react-three/drei`
- **Component location**: `src/components/three/` — all 3D components live here
- **Module previews**: `module-previews.tsx` contains per-module 3D scenes registered in `MODULE_SCENES` map
- **Hero particles**: `hero-particles.tsx` — sacred geometry trefoil knot particle cloud
- **SVG `<line>` collision**: R3F's `<line>` conflicts with SVG. Use `ThreeLine` or `AnimatedLine` helper components (both in module-previews.tsx) which wrap `<primitive object={new THREE.Line(...)}>`.
- **BufferAttribute pattern**: Use `args={[array, itemSize]}` not separate `array`/`count`/`itemSize` props
- **Performance rules**:
  - Cap `dpr` at `[1, 1.5]` — no retina burn
  - Use `frameloop="demand"` for idle previews, `"always"` only when active/hovered
  - Lazy-load all Three.js components with `React.lazy()` + `<Suspense>`
  - Memoize geometry/material creation with `useMemo`
- **Brand colors in 3D**: Teal `#00D4AA`, Amber `#FFB347`, dark backgrounds `#0a0a1a`
- **Knowledge pack**: See `assets/knowledge-pack/sacred-circuits-knowledge-pack/` for scored API entries and code recipes
