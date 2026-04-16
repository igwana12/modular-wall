"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 3000;

function SacredGeometryParticles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const icoRef = useRef<THREE.LineSegments>(null!);
  const octRef = useRef<THREE.LineSegments>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = (i / PARTICLE_COUNT) * Math.PI * 2;
      const p = 2, q = 3;
      const r = 2 + Math.cos(q * t);
      arr[i * 3] = r * Math.cos(p * t) + (Math.random() - 0.5) * 0.8;
      arr[i * 3 + 1] = r * Math.sin(p * t) + (Math.random() - 0.5) * 0.8;
      arr[i * 3 + 2] = -Math.sin(q * t) + (Math.random() - 0.5) * 0.8;
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    const teal = new THREE.Color("#00D4AA");
    const amber = new THREE.Color("#FFB347");
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const c = new THREE.Color().lerpColors(teal, amber, Math.random());
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.05;
      pointsRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
    }
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.1;
      icoRef.current.rotation.y = t * 0.15;
    }
    if (octRef.current) {
      octRef.current.rotation.x = -t * 0.08;
      octRef.current.rotation.z = t * 0.12;
    }
  });

  return (
    <group>
      {/* Trefoil knot particle cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Sacred geometry wireframes */}
      <lineSegments ref={icoRef}>
        <edgesGeometry args={[new THREE.IcosahedronGeometry(1.5, 1)]} />
        <lineBasicMaterial color="#00D4AA" transparent opacity={0.12} />
      </lineSegments>

      <lineSegments ref={octRef}>
        <edgesGeometry args={[new THREE.OctahedronGeometry(1.0)]} />
        <lineBasicMaterial color="#FFB347" transparent opacity={0.08} />
      </lineSegments>
    </group>
  );
}

export function HeroParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SacredGeometryParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
