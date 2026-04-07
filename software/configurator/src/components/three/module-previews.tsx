"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Helper: create a THREE.Line as a primitive to avoid SVG <line> JSX collision
function ThreeLine({ points, color, opacity = 1 }: { points: Float32Array; color: string; opacity?: number }) {
  const line = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(points, 3));
    const mat = new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity });
    return new THREE.Line(geo, mat);
  }, [points, color, opacity]);

  useEffect(() => {
    return () => {
      line.geometry.dispose();
      (line.material as THREE.Material).dispose();
    };
  }, [line]);

  return <primitive object={line} />;
}

// Helper: animated line with ref — disposes on unmount
function AnimatedLine({ color, pointCount }: { color: string; pointCount: number }) {
  const lineRef = useRef<THREE.Line>(null!);
  const positions = useMemo(() => new Float32Array(pointCount * 3), [pointCount]);

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({ color });
    return new THREE.Line(geo, mat);
  }, [positions, color]);

  useEffect(() => {
    return () => {
      lineObj.geometry.dispose();
      (lineObj.material as THREE.Material).dispose();
    };
  }, [lineObj]);

  useFrame(({ clock }) => {
    const prim = lineRef.current;
    if (!prim) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < pointCount; i++) {
      const x = (i / pointCount - 0.5) * 2.0;
      const y =
        Math.sin(i * 0.15 + t * 4) * 0.2 +
        Math.sin(i * 0.3 + t * 6) * 0.1 +
        Math.sin(i * 0.05 + t * 2) * 0.15;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;
    }
    const attr = prim.geometry.getAttribute("position") as THREE.BufferAttribute;
    attr.needsUpdate = true;
  });

  return <primitive ref={lineRef} object={lineObj} />;
}

// ─── Shared Constants ───────────────────────────────────────────
const TEAL = new THREE.Color("#00D4AA");
const AMBER = new THREE.Color("#FFB347");

// ─── Screen-S: LCD with teal glow, PCB green, gold pogo pins ──
function ScreenSScene() {
  const lcdRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (glowRef.current) {
      glowRef.current.intensity = 1.5 + Math.sin(t * 2) * 0.3;
    }
    if (lcdRef.current) {
      lcdRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group>
      {/* PCB Board - green */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[1.4, 1.1, 0.06]} />
        <meshStandardMaterial color="#1a5c2a" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* LCD Screen */}
      <mesh ref={lcdRef} position={[0, 0.05, 0.02]}>
        <boxGeometry args={[1.1, 0.8, 0.04]} />
        <meshStandardMaterial
          color="#001a14"
          emissive={TEAL}
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* LCD Content - weather widget glow */}
      <mesh position={[0, 0.05, 0.045]}>
        <planeGeometry args={[1.0, 0.7]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.15} />
      </mesh>

      {/* Gold pogo pins - bottom row */}
      {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
        <mesh key={i} position={[x, -0.45, 0]}>
          <cylinderGeometry args={[0.02, 0.015, 0.12, 8]} />
          <meshStandardMaterial color="#DAA520" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Teal glow light */}
      <pointLight ref={glowRef} position={[0, 0, 0.5]} color="#00D4AA" intensity={1.5} distance={3} />
      <ambientLight intensity={0.3} />
    </group>
  );
}

// ─── Glow: 16x16 LED matrix with ambient animation ────────────
function GlowScene() {
  const pointsRef = useRef<THREE.Points>(null!);
  const colorsRef = useRef<Float32Array>(null!);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(16 * 16 * 3);
    const col = new Float32Array(16 * 16 * 3);
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const i = (y * 16 + x) * 3;
        pos[i] = (x - 7.5) * 0.09;
        pos[i + 1] = (y - 7.5) * 0.09;
        pos[i + 2] = 0;
        col[i] = 1.0;
        col[i + 1] = 0.7;
        col[i + 2] = 0.27;
      }
    }
    colorsRef.current = col;
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const cols = colorsRef.current;
    if (!cols) return;

    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const i = (y * 16 + x) * 3;
        const wave = Math.sin(x * 0.4 + t * 1.5) * Math.cos(y * 0.4 + t * 0.8);
        const hue = (wave + 1) * 0.15 + 0.08;
        tmpColor.setHSL(hue, 0.9, 0.55);
        cols[i] = tmpColor.r;
        cols[i + 1] = tmpColor.g;
        cols[i + 2] = tmpColor.b;
      }
    }
    const attr = pointsRef.current.geometry.getAttribute("color");
    if (attr) (attr as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <group>
      {/* Module housing */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[1.5, 1.5, 0.06]} />
        <meshStandardMaterial color="#1a1520" roughness={0.8} />
      </mesh>

      {/* LED Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.07} vertexColors sizeAttenuation transparent opacity={0.9} />
      </points>

      <ambientLight intensity={0.2} />
    </group>
  );
}

// ─── Pixel: HUB75 LED panel with audio-reactive viz ────────────
function PixelScene() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const COLS = 32;
  const ROWS = 16;
  const COUNT = COLS * ROWS;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const idx = y * COLS + x;
        dummy.position.set((x - COLS / 2 + 0.5) * 0.042, (y - ROWS / 2 + 0.5) * 0.042, 0);

        // Audio-reactive VU meter simulation
        const freq = Math.sin(x * 0.3 + t * 3) * 0.5 + 0.5;
        const level = Math.pow(freq, 1.5) * ROWS;
        const isLit = y < level;

        dummy.scale.setScalar(isLit ? 1.0 : 0.3);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);

        // Color: green bottom, yellow mid, red top
        const hue = isLit ? THREE.MathUtils.lerp(0.33, 0.0, y / ROWS) : 0;
        const sat = isLit ? 1.0 : 0.1;
        const lum = isLit ? 0.5 : 0.05;
        tmpColor.setHSL(hue, sat, lum);
        meshRef.current.setColorAt(idx, tmpColor);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <mesh position={[0, 0, -0.03]}>
        <boxGeometry args={[1.5, 0.78, 0.05]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
        <boxGeometry args={[0.035, 0.035, 0.01]} />
        <meshStandardMaterial toneMapped={false} />
      </instancedMesh>

      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 1]} color="#ff4466" intensity={0.5} />
    </group>
  );
}

// ─── Hub: Orange Pi board with network topology ────────────────
function HubScene() {
  const topoRef = useRef<THREE.Group>(null!);

  // Pre-compute connection line data to avoid per-render Float32Array allocation
  const connectionLines = useMemo(() =>
    [0, 1, 2, 3, 4, 5].map((i) => {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * 0.3;
      const y = Math.sin(angle) * 0.3;
      return { x, y, points: new Float32Array([0, 0, 0, x, y, 0]), isEven: i % 2 === 0 };
    }), []);

  useFrame(({ clock }) => {
    if (topoRef.current) {
      topoRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group>
      {/* PCB */}
      <mesh position={[0, 0, -0.03]}>
        <boxGeometry args={[1.3, 1.0, 0.05]} />
        <meshStandardMaterial color="#1a3a2a" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* SoC chip */}
      <mesh position={[0, 0.1, 0.01]}>
        <boxGeometry args={[0.3, 0.3, 0.04]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* USB-C port */}
      <mesh position={[-0.55, -0.2, 0]}>
        <boxGeometry args={[0.12, 0.06, 0.04]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Network topology visualization */}
      <group ref={topoRef} position={[0, 0, 0.15]}>
        {/* Central hub node */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial emissive={TEAL} emissiveIntensity={1} color="#003322" />
        </mesh>
        {/* Connected nodes */}
        {connectionLines.map((conn, i) => (
          <group key={i}>
            <mesh position={[conn.x, conn.y, 0]}>
              <sphereGeometry args={[0.03, 12, 12]} />
              <meshStandardMaterial
                emissive={conn.isEven ? TEAL : AMBER}
                emissiveIntensity={0.8}
                color="#001111"
              />
            </mesh>
            <ThreeLine points={conn.points} color="#00D4AA" opacity={0.4} />
          </group>
        ))}
      </group>

      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 1]} color="#00D4AA" intensity={1} />
    </group>
  );
}

// ─── Round: Circular AMOLED with clock and LED halo ────────────
function RoundScene() {
  const handRef = useRef<THREE.Mesh>(null!);
  const haloRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (handRef.current) {
      handRef.current.rotation.z = -t * 0.5;
    }
    if (haloRef.current) {
      const mat = haloRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <group>
      {/* LED halo ring */}
      <mesh ref={haloRef}>
        <torusGeometry args={[0.65, 0.04, 16, 64]} />
        <meshStandardMaterial color="#003322" emissive={TEAL} emissiveIntensity={0.5} />
      </mesh>

      {/* AMOLED display */}
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[0.55, 64]} />
        <meshStandardMaterial color="#000000" roughness={0.05} metalness={0.9} />
      </mesh>

      {/* Clock face ticks */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.42, Math.sin(angle) * 0.42, 0.02]}>
            <boxGeometry args={[0.02, 0.06, 0.005]} />
            <meshBasicMaterial color="#00D4AA" />
          </mesh>
        );
      })}

      {/* Second hand */}
      <mesh ref={handRef} position={[0, 0, 0.025]}>
        <boxGeometry args={[0.015, 0.38, 0.003]} />
        <meshBasicMaterial color="#00D4AA" />
      </mesh>

      {/* Center dot */}
      <mesh position={[0, 0, 0.03]}>
        <circleGeometry args={[0.03, 16]} />
        <meshBasicMaterial color="#00ffcc" />
      </mesh>

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 1]} color="#00ffcc" intensity={1.2} />
    </group>
  );
}

// ─── Voice: Oscilloscope waveform ──────────────────────────────
function VoiceScene() {
  return (
    <group>
      {/* Speaker grille */}
      <mesh position={[0, 0, -0.03]}>
        <cylinderGeometry args={[0.6, 0.6, 0.08, 32]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </mesh>

      {/* Speaker cone */}
      <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.04, 32]} />
        <meshStandardMaterial color="#222244" roughness={0.6} />
      </mesh>

      {/* Animated waveform */}
      <AnimatedLine color="#8888ff" pointCount={128} />

      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 1]} color="#8888ff" intensity={0.8} />
    </group>
  );
}

// ─── Mirror: Reflective display with AR overlay concept ────────
function MirrorScene() {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(clock.getElapsedTime() * 1.5) * 0.2;
    }
  });

  return (
    <group>
      {/* Circular display body */}
      <mesh position={[0, 0, -0.02]}>
        <cylinderGeometry args={[0.7, 0.7, 0.06, 32]} />
        <meshStandardMaterial color="#1a1020" roughness={0.7} />
      </mesh>

      {/* Mirror surface */}
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[0.6, 64]} />
        <meshStandardMaterial
          color="#332244"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={1}
        />
      </mesh>

      {/* AR overlay: deity crown silhouette */}
      {[...Array(7)].map((_, i) => {
        const angle = (i / 7) * Math.PI + Math.PI / 2;
        const r = 0.35;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r + 0.15, 0.03]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial
              emissive="#ff88dd"
              emissiveIntensity={0.8}
              color="#330022"
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}

      {/* Ring light */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.65, 0.025, 16, 48]} />
        <meshStandardMaterial color="#ffffff" emissive="#ff88dd" emissiveIntensity={0.3} />
      </mesh>

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 1.5]} color="#ff88dd" intensity={0.6} />
    </group>
  );
}

// ─── Holo: Wireframe sacred geometry + particles ───────────────
function HoloScene() {
  const geoRef = useRef<THREE.Group>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const icoGeo = useMemo(() => new THREE.IcosahedronGeometry(0.4, 1), []);
  const octGeo = useMemo(() => new THREE.OctahedronGeometry(0.28), []);

  const particlePositions = useMemo(() => {
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 0.4 + Math.random() * 0.3;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (geoRef.current) {
      geoRef.current.rotation.x = t * 0.3;
      geoRef.current.rotation.y = t * 0.5;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <group>
      {/* Sacred geometry wireframe — geometries memoized to avoid per-render allocation */}
      <group ref={geoRef}>
        <lineSegments>
          <edgesGeometry args={[icoGeo]} />
          <lineBasicMaterial color="#cc44ff" transparent opacity={0.8} />
        </lineSegments>

        <lineSegments>
          <edgesGeometry args={[octGeo]} />
          <lineBasicMaterial color="#00D4AA" transparent opacity={0.5} />
        </lineSegments>
      </group>

      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.015} color="#cc44ff" transparent opacity={0.6} sizeAttenuation />
      </points>

      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 1]} color="#cc44ff" intensity={0.8} />
    </group>
  );
}

// ─── Sense: mmWave radar pulse ─────────────────────────────────
function SenseScene() {
  const rings = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    rings.current.forEach((ring, i) => {
      if (ring) {
        const phase = (t * 0.8 + i * 0.5) % 2;
        const scale = phase;
        ring.scale.set(scale, scale, 1);
        const mat = ring.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 1 - phase / 2);
      }
    });
  });

  return (
    <group>
      {/* Sensor body */}
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[1.0, 1.0, 0.05]} />
        <meshStandardMaterial color="#0a1520" roughness={0.8} />
      </mesh>

      {/* mmWave chip */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[0.15, 0.15, 0.02]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Radar rings */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) rings.current[i] = el; }}
          position={[0, 0, 0.03]}
        >
          <torusGeometry args={[0.3, 0.008, 8, 64]} />
          <meshBasicMaterial color="#44ddff" transparent opacity={0.6} />
        </mesh>
      ))}

      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 1]} color="#44ddff" intensity={0.6} />
    </group>
  );
}

// ─── Brick: Structural filler ──────────────────────────────────
function BrickScene() {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.2, 1.2, 0.15]} />
        <meshStandardMaterial color="#333355" roughness={0.9} metalness={0.4} />
      </mesh>

      {/* Magnetic mount points */}
      {[[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.08]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial color="#666688" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      <ambientLight intensity={0.3} />
      <directionalLight position={[1, 1, 1]} intensity={0.5} />
    </group>
  );
}

// ─── Ring: Wearable gesture controller ─────────────────────────
function RingScene() {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.3 + 0.5;
      ringRef.current.rotation.y = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group ref={ringRef}>
      {/* Ring body */}
      <mesh>
        <torusGeometry args={[0.35, 0.08, 32, 64]} />
        <meshStandardMaterial color="#1a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Sensor strip */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.35, 0.03, 8, 64, Math.PI * 0.4]} />
        <meshStandardMaterial emissive={TEAL} emissiveIntensity={0.6} color="#003322" />
      </mesh>

      <ambientLight intensity={0.3} />
      <pointLight position={[1, 1, 2]} color="#00D4AA" intensity={0.8} />
    </group>
  );
}

// ─── Screen-M: Larger LCD dashboard ────────────────────────────
function ScreenMScene() {
  const glowRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.intensity = 1.2 + Math.sin(clock.getElapsedTime() * 1.5) * 0.3;
    }
  });

  return (
    <group>
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[1.6, 1.0, 0.06]} />
        <meshStandardMaterial color="#1a5c2a" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[1.4, 0.85, 0.04]} />
        <meshStandardMaterial color="#001a14" emissive={TEAL} emissiveIntensity={0.35} roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Dashboard grid lines */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.045]}>
          <boxGeometry args={[0.005, 0.7, 0.001]} />
          <meshBasicMaterial color="#00D4AA" transparent opacity={0.15} />
        </mesh>
      ))}
      <pointLight ref={glowRef} position={[0, 0, 0.5]} color="#00D4AA" intensity={1.2} distance={3} />
      <ambientLight intensity={0.3} />
    </group>
  );
}

// ─── eInk: E-paper with dithered pattern ───────────────────────
function EInkScene() {
  return (
    <group>
      <mesh position={[0, 0, -0.02]}>
        <boxGeometry args={[1.6, 1.1, 0.04]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>
      {/* E-paper surface — warm white */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1.45, 0.95]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.95} metalness={0} />
      </mesh>
      {/* Dithered text lines */}
      {[-0.25, -0.1, 0.05, 0.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0.015]}>
          <boxGeometry args={[i % 2 === 0 ? 1.1 : 0.8, 0.03, 0.001]} />
          <meshBasicMaterial color="#333333" transparent opacity={0.4} />
        </mesh>
      ))}
      <ambientLight intensity={0.6} />
      <directionalLight position={[1, 1, 1]} intensity={0.4} />
    </group>
  );
}

// ─── Scene Registry ────────────────────────────────────────────
const MODULE_SCENES: Record<string, React.FC> = {
  "screen-s": ScreenSScene,
  "screen-m": ScreenMScene,
  glow: GlowScene,
  pixel: PixelScene,
  hub: HubScene,
  round: RoundScene,
  voice: VoiceScene,
  mirror: MirrorScene,
  holo: HoloScene,
  sense: SenseScene,
  brick: BrickScene,
  ring: RingScene,
  eink: EInkScene,
};

// ─── Main Preview Component ────────────────────────────────────
interface ModulePreview3DProps {
  moduleId: string;
  size?: number;
  className?: string;
  isActive?: boolean;
}

export function ModulePreview3D({
  moduleId,
  size = 80,
  className = "",
  isActive = false,
}: ModulePreview3DProps) {
  const SceneComponent = MODULE_SCENES[moduleId];

  if (!SceneComponent) {
    return (
      <div
        className={className}
        style={{ width: size, height: size, background: "#1a1a2e" }}
      />
    );
  }

  return (
    <div className={className} style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={isActive ? "always" : "demand"}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneComponent />
        </Suspense>
      </Canvas>
    </div>
  );
}

// ─── Mini Preview (for grid cells) ─────────────────────────────
export function ModulePreviewMini({
  moduleId,
  isActive = false,
}: {
  moduleId: string;
  isActive?: boolean;
}) {
  return (
    <ModulePreview3D
      moduleId={moduleId}
      size={60}
      isActive={isActive}
      className="rounded-lg overflow-hidden"
    />
  );
}
