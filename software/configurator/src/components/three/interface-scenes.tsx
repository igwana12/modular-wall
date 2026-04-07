"use client";

/**
 * 27 Animated Interface Scenes for the mosAIc Interface Gallery.
 * Each scene is a React Three Fiber component rendered at real module dimensions.
 * Uses patterns from Sacred Circuits Knowledge Pack code recipes.
 */

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";

const TEAL = new THREE.Color("#00D4AA");
const AMBER = new THREE.Color("#FFB347");
const tmpColor = new THREE.Color();

// ═══════════════════════════════════════════════════════════════
// SCREEN-S Interfaces (76×116mm portrait)
// ═══════════════════════════════════════════════════════════════

// 1. Weather Station: rain particles + temperature + humidity arc
function WeatherScene() {
  const rainRef = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 2;
      arr[i * 3 + 1] = Math.random() * 3 - 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!rainRef.current) return;
    const pos = rainRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < 200; i++) {
      arr[i * 3 + 1] -= 0.03;
      if (arr[i * 3 + 1] < -1.5) arr[i * 3 + 1] = 1.5;
    }
    pos.needsUpdate = true;
  });

  return (
    <group>
      {/* Rain particles */}
      <points ref={rainRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#44aacc" transparent opacity={0.4} sizeAttenuation />
      </points>
      {/* Temperature display */}
      <mesh position={[0, 0.5, 0]}>
        <planeGeometry args={[1.2, 0.5]} />
        <meshBasicMaterial color="#00D4AA" transparent opacity={0.08} />
      </mesh>
      {/* Humidity arc */}
      <mesh position={[0, -0.2, 0]}>
        <torusGeometry args={[0.4, 0.03, 8, 32, Math.PI * 1.4]} />
        <meshBasicMaterial color="#00D4AA" transparent opacity={0.4} />
      </mesh>
      {/* Mini forecast bars */}
      {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
        <mesh key={i} position={[x, -0.8, 0]}>
          <boxGeometry args={[0.08, 0.1 + i * 0.06, 0.01]} />
          <meshBasicMaterial color={i < 3 ? "#00D4AA" : "#FFB347"} transparent opacity={0.3} />
        </mesh>
      ))}
      <ambientLight intensity={0.3} />
    </group>
  );
}

// 2. Now Playing: pulsing glow + waveform bars
function NowPlayingScene() {
  const barsRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const BARS = 16;

  useFrame(({ clock }) => {
    if (!barsRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < BARS; i++) {
      const h = 0.1 + Math.abs(Math.sin(i * 0.5 + t * 3)) * 0.3;
      dummy.position.set((i - BARS / 2 + 0.5) * 0.1, h / 2 - 0.6, 0);
      dummy.scale.set(0.06, h, 0.01);
      dummy.updateMatrix();
      barsRef.current.setMatrixAt(i, dummy.matrix);
      tmpColor.setHSL(0.5 + i / BARS * 0.15, 0.8, 0.5);
      barsRef.current.setColorAt(i, tmpColor);
    }
    barsRef.current.instanceMatrix.needsUpdate = true;
    if (barsRef.current.instanceColor) barsRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      {/* Album art glow */}
      <mesh position={[0, 0.3, 0]}>
        <planeGeometry args={[0.9, 0.9]} />
        <meshStandardMaterial color="#8888ff" emissive="#8888ff" emissiveIntensity={0.2} roughness={0.8} />
      </mesh>
      {/* Waveform bars */}
      <instancedMesh ref={barsRef} args={[undefined, undefined, BARS]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial toneMapped={false} />
      </instancedMesh>
      {/* Track info placeholder */}
      <mesh position={[0, -0.25, 0]}>
        <planeGeometry args={[0.8, 0.06]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 1]} color="#8888ff" intensity={0.5} />
    </group>
  );
}

// 3. Week View: animated calendar event blocks
function WeekViewScene() {
  const blocksRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!blocksRef.current) return;
    const t = clock.getElapsedTime();
    blocksRef.current.children.forEach((child, i) => {
      child.position.x = Math.sin(t * 0.5 + i) * 0.02;
      child.rotation.y = Math.sin(t * 0.3 + i * 0.5) * 0.03;
    });
  });

  const events = [
    { y: 0.6, w: 0.7, c: "#00D4AA" },
    { y: 0.25, w: 0.5, c: "#FFB347" },
    { y: -0.1, w: 0.85, c: "#8888ff" },
    { y: -0.45, w: 0.4, c: "#ff4466" },
  ];

  return (
    <group>
      {/* Header */}
      <mesh position={[0, 0.95, 0]}>
        <planeGeometry args={[1.2, 0.15]} />
        <meshBasicMaterial color="#00D4AA" transparent opacity={0.1} />
      </mesh>
      {/* Event blocks */}
      <group ref={blocksRef}>
        {events.map((ev, i) => (
          <mesh key={i} position={[0, ev.y, 0]}>
            <boxGeometry args={[ev.w, 0.22, 0.02]} />
            <meshStandardMaterial
              color={ev.c}
              transparent
              opacity={0.25}
              emissive={ev.c}
              emissiveIntensity={0.15}
            />
          </mesh>
        ))}
      </group>
      <ambientLight intensity={0.3} />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// GLOW Interfaces (71×71mm square)
// ═══════════════════════════════════════════════════════════════

// 1. Circadian: warm amber→cool blue gradient ShaderMaterial
function CircadianScene() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#FFB347") },
    uColor2: { value: new THREE.Color("#4488ff") },
  }), []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <group>
      <mesh>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
          fragmentShader={`
            uniform float uTime;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            varying vec2 vUv;
            void main() {
              float t = sin(uTime * 0.3) * 0.5 + 0.5;
              float pulse = sin(length(vUv - 0.5) * 6.0 - uTime) * 0.15 + 0.85;
              vec3 color = mix(uColor1, uColor2, t + (vUv.y - 0.5) * 0.5);
              gl_FragColor = vec4(color * pulse, 0.6);
            }
          `}
          transparent
        />
      </mesh>
      <ambientLight intensity={0.1} />
    </group>
  );
}

// 2. Notification Pulse: expanding teal rings
function NotifyPulseScene() {
  const rings = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const phase = (t * 0.6 + i * 0.7) % 3;
      ring.scale.setScalar(phase * 0.4 + 0.1);
      const mat = ring.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.6 - phase / 3);
    });
  });

  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} ref={(el) => { if (el) rings.current[i] = el; }}>
          <ringGeometry args={[0.5, 0.54, 64]} />
          <meshBasicMaterial color="#00D4AA" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Center dot */}
      <mesh>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color="#00D4AA" />
      </mesh>
      <ambientLight intensity={0.2} />
    </group>
  );
}

// 3. Meditation: slow purple aurora waves (noise-based shader)
function MeditationScene() {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <group>
      <mesh>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
          fragmentShader={`
            uniform float uTime;
            varying vec2 vUv;
            void main() {
              float wave1 = sin(vUv.x * 4.0 + uTime * 0.5) * sin(vUv.y * 3.0 + uTime * 0.3);
              float wave2 = sin(vUv.x * 2.0 - uTime * 0.4) * cos(vUv.y * 5.0 + uTime * 0.2);
              float combined = (wave1 + wave2) * 0.5 + 0.5;
              vec3 purple = vec3(0.4, 0.1, 0.6);
              vec3 teal = vec3(0.0, 0.5, 0.4);
              vec3 color = mix(purple, teal, combined);
              float breath = sin(uTime * 0.4) * 0.15 + 0.85;
              gl_FragColor = vec4(color * breath, 0.5);
            }
          `}
          transparent
        />
      </mesh>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// PIXEL Interfaces (166×86mm wide)
// ═══════════════════════════════════════════════════════════════

// 1. VU Meter: 32 animated columns with green→amber→red
function VUMeterScene() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const COLS = 32;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < COLS; i++) {
      const freq = Math.sin(i * 0.3 + t * 3) * 0.5 + 0.5;
      const h = Math.pow(freq, 1.2) * 1.2 + 0.1;
      dummy.position.set((i - COLS / 2 + 0.5) * 0.058, h / 2 - 0.5, 0);
      dummy.scale.set(0.04, h, 0.01);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      const hue = THREE.MathUtils.lerp(0.33, 0.0, Math.min(1, h / 1.2));
      tmpColor.setHSL(hue, 0.9, 0.5);
      meshRef.current.setColorAt(i, tmpColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, COLS]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <ambientLight intensity={0.2} />
    </group>
  );
}

// 2. Pixel Art: animated sprite cycling
function PixelArtScene() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const W = 16, H = 8;
  const COUNT = W * H;

  // Simple heart sprite frames
  const frames = useMemo(() => {
    const f1 = new Uint8Array(COUNT); // heart small
    const f2 = new Uint8Array(COUNT); // heart big
    const heart = [
      [0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1],
      [0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
      [0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
      [0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0],
      [0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0],
      [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      f1[y * W + x] = heart[y]?.[x] ?? 0;
      f2[y * W + x] = heart[y]?.[x] ?? 0;
    }
    return [f1, f2];
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const frame = frames[Math.floor(t * 2) % frames.length];
    const scale = 1 + Math.sin(t * 3) * 0.1;

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = y * W + x;
        const lit = frame[idx];
        dummy.position.set((x - W / 2 + 0.5) * 0.1, (H / 2 - y - 0.5) * 0.1, 0);
        dummy.scale.setScalar(lit ? 0.08 * scale : 0.02);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);
        tmpColor.set(lit ? "#ff4466" : "#111122");
        meshRef.current.setColorAt(idx, tmpColor);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
        <boxGeometry args={[1, 1, 0.5]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <ambientLight intensity={0.15} />
    </group>
  );
}

// 3. Retro Game: snake-like block animation
function RetroGameScene() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const SNAKE_LEN = 8;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < SNAKE_LEN; i++) {
      const offset = i * 0.12;
      const x = Math.sin((t - offset) * 1.5) * 0.6;
      const y = Math.cos((t - offset) * 0.8) * 0.3;
      dummy.position.set(x, y, 0);
      dummy.scale.setScalar(0.08);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      tmpColor.set("#00D4AA");
      tmpColor.multiplyScalar(1 - i * 0.08);
      meshRef.current.setColorAt(i, tmpColor);
    }
    // Food pellet
    dummy.position.set(Math.sin(t * 0.3) * 0.5, Math.cos(t * 0.4) * 0.3, 0);
    dummy.scale.setScalar(0.06);
    dummy.updateMatrix();
    meshRef.current.setMatrixAt(SNAKE_LEN, dummy.matrix);
    tmpColor.set("#ff4466");
    meshRef.current.setColorAt(SNAKE_LEN, tmpColor);

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      {/* Border */}
      <mesh>
        <planeGeometry args={[1.8, 0.9]} />
        <meshBasicMaterial color="#00D4AA" transparent opacity={0.03} />
      </mesh>
      <instancedMesh ref={meshRef} args={[undefined, undefined, SNAKE_LEN + 1]}>
        <boxGeometry args={[1, 1, 0.5]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <ambientLight intensity={0.2} />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// ROUND Interfaces (91mm circle)
// ═══════════════════════════════════════════════════════════════

// 1. Analog Clock: rotating hands + ticking second hand
function AnalogClockScene() {
  const secRef = useRef<THREE.Mesh>(null!);
  const minRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (secRef.current) secRef.current.rotation.z = -t * (Math.PI / 30);
    if (minRef.current) minRef.current.rotation.z = -t * (Math.PI / 1800);
  });

  return (
    <group>
      {/* Clock face */}
      <mesh>
        <circleGeometry args={[0.9, 64]} />
        <meshBasicMaterial color="#050510" />
      </mesh>
      {/* Hour markers */}
      {[...Array(12)].map((_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.72, Math.sin(a) * 0.72, 0.01]}>
            <boxGeometry args={[0.03, 0.08, 0.005]} />
            <meshBasicMaterial color="#00D4AA" transparent opacity={0.6} />
          </mesh>
        );
      })}
      {/* Minute hand */}
      <mesh ref={minRef} position={[0, 0, 0.02]}>
        <boxGeometry args={[0.025, 0.55, 0.003]} />
        <meshBasicMaterial color="#00D4AA" transparent opacity={0.8} />
      </mesh>
      {/* Second hand */}
      <mesh ref={secRef} position={[0, 0, 0.03]}>
        <boxGeometry args={[0.012, 0.65, 0.002]} />
        <meshBasicMaterial color="#FFB347" />
      </mesh>
      {/* Center dot */}
      <mesh position={[0, 0, 0.04]}>
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial color="#00ffcc" />
      </mesh>
      <ambientLight intensity={0.2} />
    </group>
  );
}

// 2. Compass: rotating needle + cardinal markers
function CompassScene() {
  const needleRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (needleRef.current) {
      needleRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.4;
    }
  });

  return (
    <group>
      <mesh>
        <circleGeometry args={[0.9, 64]} />
        <meshBasicMaterial color="#050510" />
      </mesh>
      {/* Cardinal directions */}
      {[
        { label: "N", angle: Math.PI / 2, color: "#ff4466" },
        { label: "E", angle: 0, color: "#00ffcc" },
        { label: "S", angle: -Math.PI / 2, color: "#00ffcc" },
        { label: "W", angle: Math.PI, color: "#00ffcc" },
      ].map(({ angle, color }, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.7, Math.sin(angle) * 0.7, 0.01]}>
          <circleGeometry args={[0.04, 12]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      ))}
      {/* Needle */}
      <group ref={needleRef} position={[0, 0, 0.02]}>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.04, 0.5, 0.003]} />
          <meshBasicMaterial color="#ff4466" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.04, 0.4, 0.003]} />
          <meshBasicMaterial color="#00D4AA" transparent opacity={0.4} />
        </mesh>
      </group>
      <ambientLight intensity={0.2} />
    </group>
  );
}

// 3. Timer: depleting arc ring + pulse when near zero
function TimerScene() {
  const arcRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!arcRef.current) return;
    const t = clock.getElapsedTime();
    const progress = ((t * 0.15) % 1);
    const remaining = 1 - progress;
    const geo = arcRef.current.geometry as THREE.RingGeometry;
    arcRef.current.geometry.dispose();
    arcRef.current.geometry = new THREE.RingGeometry(0.6, 0.68, 64, 1, 0, remaining * Math.PI * 2);
    const mat = arcRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = remaining < 0.2 ? (Math.sin(t * 10) * 0.3 + 0.5) : 0.7;
    mat.color.set(remaining < 0.2 ? "#ff4466" : "#00D4AA");
  });

  return (
    <group>
      <mesh>
        <circleGeometry args={[0.9, 64]} />
        <meshBasicMaterial color="#050510" />
      </mesh>
      {/* Background ring */}
      <mesh>
        <ringGeometry args={[0.6, 0.68, 64]} />
        <meshBasicMaterial color="#222233" side={THREE.DoubleSide} />
      </mesh>
      {/* Active arc */}
      <mesh ref={arcRef} rotation={[0, 0, Math.PI / 2]}>
        <ringGeometry args={[0.6, 0.68, 64]} />
        <meshBasicMaterial color="#00D4AA" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      <ambientLight intensity={0.2} />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// HUB Interfaces (91×62mm)
// ═══════════════════════════════════════════════════════════════

// 1. Network Topology: animated data pulses along connections
function NetworkTopologyScene() {
  const pulseRef = useRef<THREE.Mesh[]>([]);
  const nodes = useMemo(() => [
    [0, 0], [-0.5, 0.3], [0.5, 0.3], [-0.4, -0.3], [0.4, -0.3], [0, 0.5],
  ] as [number, number][], []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    pulseRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (t * 0.8 + i * 0.5) % 1;
      const node = nodes[i + 1] || nodes[1];
      mesh.position.x = node[0] * phase;
      mesh.position.y = node[1] * phase;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 1 - phase;
    });
  });

  return (
    <group>
      {/* Center hub */}
      <mesh>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial color="#00D4AA" />
      </mesh>
      {/* Nodes + connection lines */}
      {nodes.slice(1).map(([x, y], i) => (
        <group key={i}>
          <mesh position={[x, y, 0]}>
            <circleGeometry args={[0.035, 12]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#00D4AA" : "#FFB347"} transparent opacity={0.5} />
          </mesh>
          {/* Pulse dot traveling along line */}
          <mesh ref={(el) => { if (el) pulseRef.current[i] = el; }} position={[0, 0, 0.01]}>
            <circleGeometry args={[0.02, 8]} />
            <meshBasicMaterial color="#00D4AA" transparent opacity={0.8} />
          </mesh>
        </group>
      ))}
      <ambientLight intensity={0.2} />
    </group>
  );
}

// 2. System Monitor: animated CPU/RAM bars
function SystemMonitorScene() {
  const cpuRef = useRef<THREE.Mesh>(null!);
  const ramRef = useRef<THREE.Mesh>(null!);
  const tempRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (cpuRef.current) cpuRef.current.scale.x = 0.3 + Math.sin(t * 1.5) * 0.15 + Math.sin(t * 3.7) * 0.1;
    if (ramRef.current) ramRef.current.scale.x = 0.5 + Math.sin(t * 0.8) * 0.1;
    if (tempRef.current) {
      const temp = 0.3 + Math.sin(t * 0.5) * 0.15;
      tempRef.current.scale.x = temp;
      const mat = tempRef.current.material as THREE.MeshBasicMaterial;
      mat.color.set(temp > 0.4 ? "#FFB347" : "#00D4AA");
    }
  });

  return (
    <group>
      {/* CPU bar */}
      <mesh ref={cpuRef} position={[-0.15, 0.25, 0]}>
        <planeGeometry args={[1, 0.12]} />
        <meshBasicMaterial color="#00D4AA" transparent opacity={0.4} />
      </mesh>
      {/* RAM bar */}
      <mesh ref={ramRef} position={[-0.15, 0.05, 0]}>
        <planeGeometry args={[1, 0.12]} />
        <meshBasicMaterial color="#8888ff" transparent opacity={0.4} />
      </mesh>
      {/* Temp bar */}
      <mesh ref={tempRef} position={[-0.15, -0.15, 0]}>
        <planeGeometry args={[1, 0.12]} />
        <meshBasicMaterial color="#00D4AA" transparent opacity={0.4} />
      </mesh>
      <ambientLight intensity={0.3} />
    </group>
  );
}

// 3. Scene Controller: grid of module squares with active pulse
function SceneControllerScene() {
  const activeRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (activeRef.current) {
      const mat = activeRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.2 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
    }
  });

  const scenes = [
    { y: 0.25, c: "#FFB347", label: "Morning" },
    { y: 0.0, c: "#00D4AA", label: "Focus" },
    { y: -0.25, c: "#8888ff", label: "Movie" },
  ];

  return (
    <group>
      {scenes.map((s, i) => (
        <mesh key={i} ref={i === 1 ? activeRef : undefined} position={[0, s.y, 0]}>
          <planeGeometry args={[1.2, 0.18]} />
          <meshBasicMaterial color={s.c} transparent opacity={i === 1 ? 0.3 : 0.12} />
        </mesh>
      ))}
      <ambientLight intensity={0.3} />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// VOICE Interfaces (71×71mm square)
// ═══════════════════════════════════════════════════════════════

// 1. Waveform: animated oscilloscope
function WaveformScene() {
  const lineObj = useMemo(() => {
    const pts = new Float32Array(128 * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
    const mat = new THREE.LineBasicMaterial({ color: "#8888ff" });
    return new THREE.Line(geo, mat);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const attr = lineObj.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < 128; i++) {
      arr[i * 3] = (i / 128 - 0.5) * 2;
      arr[i * 3 + 1] = Math.sin(i * 0.15 + t * 4) * 0.3 + Math.sin(i * 0.3 + t * 6) * 0.15;
      arr[i * 3 + 2] = 0;
    }
    attr.needsUpdate = true;
  });

  useEffect(() => {
    return () => {
      lineObj.geometry.dispose();
      (lineObj.material as THREE.Material).dispose();
    };
  }, [lineObj]);

  return (
    <group>
      <primitive object={lineObj} />
      <ambientLight intensity={0.2} />
    </group>
  );
}

// 2. Voice Assistant: concentric pulsing rings
function VoiceAssistantScene() {
  const rings = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const s = 0.2 + i * 0.15 + Math.sin(t * 2 + i) * 0.05;
      ring.scale.setScalar(s);
      const mat = ring.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.3 - i * 0.05 + Math.sin(t * 3 + i * 0.5) * 0.1;
    });
  });

  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} ref={(el) => { if (el) rings.current[i] = el; }}>
          <ringGeometry args={[0.8, 0.88, 64]} />
          <meshBasicMaterial color="#8888ff" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <mesh>
        <circleGeometry args={[0.1, 32]} />
        <meshBasicMaterial color="#8888ff" transparent opacity={0.5} />
      </mesh>
      <ambientLight intensity={0.2} />
    </group>
  );
}

// 3. Intercom: pulse dot with connecting lines
function IntercomScene() {
  const dotRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (dotRef.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.3;
      dotRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Center speaker */}
      <mesh ref={dotRef}>
        <circleGeometry args={[0.12, 32]} />
        <meshBasicMaterial color="#8888ff" transparent opacity={0.4} />
      </mesh>
      {/* Sound waves */}
      {[0.3, 0.5, 0.7].map((r, i) => (
        <mesh key={i}>
          <ringGeometry args={[r, r + 0.015, 32, 1, -0.5, 1]} />
          <meshBasicMaterial color="#8888ff" transparent opacity={0.15 - i * 0.03} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <ambientLight intensity={0.2} />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// MIRROR Interfaces (120mm circle)
// ═══════════════════════════════════════════════════════════════

// 1. AR Overlay / Deity Oracle: rotating face wireframe + crown orbs
function DeityOracleScene() {
  const crownRef = useRef<THREE.Group>(null!);
  const faceRef = useRef<THREE.LineSegments>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (crownRef.current) crownRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    if (faceRef.current) faceRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
  });

  return (
    <group>
      {/* Face wireframe */}
      <lineSegments ref={faceRef}>
        <edgesGeometry args={[new THREE.SphereGeometry(0.3, 8, 6)]} />
        <lineBasicMaterial color="#ff88dd" transparent opacity={0.3} />
      </lineSegments>
      {/* Crown orbs */}
      <group ref={crownRef}>
        {[...Array(7)].map((_, i) => {
          const a = (i / 7) * Math.PI + Math.PI / 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.45, Math.sin(a) * 0.3 + 0.2, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial emissive="#ff88dd" emissiveIntensity={0.8} color="#330022" transparent opacity={0.7} />
            </mesh>
          );
        })}
      </group>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 1]} color="#ff88dd" intensity={0.5} />
    </group>
  );
}

// 2. Exercise Form: animated stick figure
function ExerciseFormScene() {
  const figRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!figRef.current) return;
    const t = clock.getElapsedTime();
    const kids = figRef.current.children;
    // Slight squat animation
    if (kids[1]) kids[1].position.y = -0.15 + Math.sin(t * 2) * 0.05; // torso
    if (kids[3]) kids[3].rotation.z = Math.sin(t * 2) * 0.2; // left arm
    if (kids[4]) kids[4].rotation.z = -Math.sin(t * 2) * 0.2; // right arm
  });

  return (
    <group>
      <group ref={figRef}>
        {/* Head */}
        <mesh position={[0, 0.45, 0]}>
          <circleGeometry args={[0.07, 16]} />
          <meshBasicMaterial color="#00D4AA" transparent opacity={0.4} />
        </mesh>
        {/* Torso */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.02, 0.35, 0.01]} />
          <meshBasicMaterial color="#00D4AA" transparent opacity={0.4} />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.08, -0.2, 0]} rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.02, 0.35, 0.01]} />
          <meshBasicMaterial color="#00D4AA" transparent opacity={0.3} />
        </mesh>
        {/* Left arm */}
        <mesh position={[-0.15, 0.25, 0]}>
          <boxGeometry args={[0.02, 0.25, 0.01]} />
          <meshBasicMaterial color="#00D4AA" transparent opacity={0.3} />
        </mesh>
        {/* Right arm */}
        <mesh position={[0.15, 0.25, 0]}>
          <boxGeometry args={[0.02, 0.25, 0.01]} />
          <meshBasicMaterial color="#00D4AA" transparent opacity={0.3} />
        </mesh>
        <mesh position={[0.08, -0.2, 0]} rotation={[0, 0, -0.15]}>
          <boxGeometry args={[0.02, 0.35, 0.01]} />
          <meshBasicMaterial color="#00D4AA" transparent opacity={0.3} />
        </mesh>
      </group>
      <ambientLight intensity={0.2} />
    </group>
  );
}

// 3. Glam Filter: swirling particle vortex
function GlamFilterScene() {
  const pointsRef = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      const a = (i / 100) * Math.PI * 2;
      const r = 0.2 + Math.random() * 0.4;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.sin(a) * r;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) pointsRef.current.rotation.z = clock.getElapsedTime() * 0.3;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#ff88dd" transparent opacity={0.5} sizeAttenuation />
      </points>
      {/* Center eye */}
      <mesh>
        <circleGeometry args={[0.06, 32]} />
        <meshBasicMaterial color="#FFB347" transparent opacity={0.4} />
      </mesh>
      <ambientLight intensity={0.2} />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOLO Interfaces (140×140mm square)
// ═══════════════════════════════════════════════════════════════

// 1. Sacred Forms: wireframe icosahedron + octahedron + particles
function SacredFormsScene() {
  const geoRef = useRef<THREE.Group>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  const icoGeo = useMemo(() => new THREE.IcosahedronGeometry(0.4, 1), []);
  const octGeo = useMemo(() => new THREE.OctahedronGeometry(0.28), []);

  const particlePos = useMemo(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 0.3 + Math.random() * 0.3;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (geoRef.current) { geoRef.current.rotation.x = t * 0.3; geoRef.current.rotation.y = t * 0.5; }
    if (particlesRef.current) particlesRef.current.rotation.y = -t * 0.2;
  });

  return (
    <group>
      <group ref={geoRef}>
        <lineSegments>
          <edgesGeometry args={[icoGeo]} />
          <lineBasicMaterial color="#cc44ff" transparent opacity={0.6} />
        </lineSegments>
        <lineSegments>
          <edgesGeometry args={[octGeo]} />
          <lineBasicMaterial color="#00D4AA" transparent opacity={0.35} />
        </lineSegments>
      </group>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.015} color="#cc44ff" transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <ambientLight intensity={0.15} />
    </group>
  );
}

// 2. 3D Model Viewer: rotating wireframe cube with glow
function ModelViewerScene() {
  const cubeRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      cubeRef.current.rotation.y = clock.getElapsedTime() * 0.7;
    }
  });

  return (
    <group>
      <mesh ref={cubeRef}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="#cc44ff" wireframe transparent opacity={0.5} />
      </mesh>
      {/* Ground plane */}
      <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#cc44ff" transparent opacity={0.05} />
      </mesh>
      <ambientLight intensity={0.2} />
      <pointLight position={[1, 1, 1]} color="#cc44ff" intensity={0.5} />
    </group>
  );
}

// 3. Alert Beacon: expanding sphere pulses
function AlertBeaconScene() {
  const pulses = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    pulses.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = (t * 0.6 + i * 0.8) % 2.5;
      mesh.scale.setScalar(phase * 0.3 + 0.05);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.4 - phase / 2.5);
    });
  });

  return (
    <group>
      {/* Center alert */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial emissive="#ff4466" emissiveIntensity={1} color="#330000" />
      </mesh>
      {/* Expanding pulses */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(el) => { if (el) pulses.current[i] = el; }}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#ff4466" transparent opacity={0.3} wireframe />
        </mesh>
      ))}
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 1]} color="#ff4466" intensity={0.5} />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// eINK Interfaces (180×120mm rectangle) — minimal/static
// ═══════════════════════════════════════════════════════════════

// 1. Daily Quote: static text layout, paper texture
function DailyQuoteScene() {
  return (
    <group>
      <mesh>
        <planeGeometry args={[2, 1.3]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.95} />
      </mesh>
      {/* Text lines */}
      {[-0.2, -0.05, 0.1, 0.25].map((y, i) => (
        <mesh key={i} position={[0, y, 0.01]}>
          <boxGeometry args={[[1.4, 1.0, 1.3, 0.8][i], 0.04, 0.001]} />
          <meshBasicMaterial color="#333333" transparent opacity={i === 0 ? 0.5 : 0.25} />
        </mesh>
      ))}
      <ambientLight intensity={0.7} />
      <directionalLight position={[1, 1, 1]} intensity={0.3} />
    </group>
  );
}

// 2. Art Display: dithered dot pattern
function ArtDisplayScene() {
  const dotsRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const W = 24, H = 16;
  const COUNT = W * H;

  useMemo(() => {
    // No animation needed — set once
  }, []);

  useFrame(() => {
    if (!dotsRef.current || dotsRef.current.userData.initialized) return;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = y * W + x;
        dummy.position.set((x - W / 2 + 0.5) * 0.07, (H / 2 - y - 0.5) * 0.07, 0);
        // Floyd-Steinberg-like dithered pattern
        const val = Math.sin(x * 0.5) * Math.cos(y * 0.7) * 0.5 + 0.5;
        const dither = val > 0.5 ? 0.04 : 0.015;
        dummy.scale.setScalar(dither);
        dummy.updateMatrix();
        dotsRef.current.setMatrixAt(idx, dummy.matrix);
        tmpColor.set(val > 0.5 ? "#333333" : "#666666");
        dotsRef.current.setColorAt(idx, tmpColor);
      }
    }
    dotsRef.current.instanceMatrix.needsUpdate = true;
    if (dotsRef.current.instanceColor) dotsRef.current.instanceColor.needsUpdate = true;
    dotsRef.current.userData.initialized = true;
  });

  return (
    <group>
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[2, 1.3]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.95} />
      </mesh>
      <instancedMesh ref={dotsRef} args={[undefined, undefined, COUNT]}>
        <circleGeometry args={[1, 8]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <ambientLight intensity={0.7} />
    </group>
  );
}

// 3. Schedule: lined text blocks
function ScheduleScene() {
  return (
    <group>
      <mesh>
        <planeGeometry args={[2, 1.3]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.95} />
      </mesh>
      {/* Time column + event blocks */}
      {[0.35, 0.15, -0.05, -0.25, -0.45].map((y, i) => (
        <group key={i}>
          <mesh position={[-0.7, y, 0.01]}>
            <boxGeometry args={[0.2, 0.04, 0.001]} />
            <meshBasicMaterial color="#555" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0.15, y, 0.01]}>
            <boxGeometry args={[1.1, 0.12, 0.001]} />
            <meshBasicMaterial color={["#00D4AA", "#FFB347", "#8888ff", "#555", "#ff4466"][i]} transparent opacity={0.1} />
          </mesh>
        </group>
      ))}
      <ambientLight intensity={0.7} />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// Scene Registry + Canvas Wrapper
// ═══════════════════════════════════════════════════════════════

export const INTERFACE_SCENES: Record<string, React.FC> = {
  // Screen-S
  "weather-station": WeatherScene,
  "now-playing": NowPlayingScene,
  "week-view": WeekViewScene,
  // Glow
  "circadian-flow": CircadianScene,
  "notify-pulse": NotifyPulseScene,
  "breathe": MeditationScene,
  // Pixel
  "spectrum-vu": VUMeterScene,
  "pixel-canvas": PixelArtScene,
  "snake-classic": RetroGameScene,
  // Round
  "analog-lux": AnalogClockScene,
  "compass-nav": CompassScene,
  "pomodoro-ring": TimerScene,
  // Hub
  "net-topology": NetworkTopologyScene,
  "system-monitor": SystemMonitorScene,
  "scene-control": SceneControllerScene,
  // Voice
  "waveform-live": WaveformScene,
  "voice-assistant": VoiceAssistantScene,
  "intercom": IntercomScene,
  // Mirror
  "deity-oracle": DeityOracleScene,
  "form-check": ExerciseFormScene,
  "glam-filter": GlamFilterScene,
  // Holo
  "sacred-forms": SacredFormsScene,
  "3d-viewer": ModelViewerScene,
  "alert-beacon": AlertBeaconScene,
  // eInk
  "daily-quote": DailyQuoteScene,
  "art-display": ArtDisplayScene,
  "schedule": ScheduleScene,
};

interface InterfaceSceneCanvasProps {
  sceneId: string;
  width: number;
  height: number;
  isCircle?: boolean;
  isStatic?: boolean;
}

export function InterfaceSceneCanvas({
  sceneId,
  width,
  height,
  isCircle = false,
  isStatic = false,
}: InterfaceSceneCanvasProps) {
  const SceneComponent = INTERFACE_SCENES[sceneId];
  if (!SceneComponent) return null;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: isCircle ? "50%" : 8,
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 2], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={isStatic ? "demand" : "always"}
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
