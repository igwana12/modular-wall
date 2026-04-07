"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const TEAL = "#00D4AA";
const AMBER = "#FFB347";

const MODULES = [
  { name: "Screen-S", w: 76, h: 116, type: "rect", widget: "clock", price: 79 },
  { name: "Screen-M", w: 144, h: 94, type: "rect", widget: "weather", price: 119 },
  { name: "Glow", w: 71, h: 71, type: "rect", widget: "glow", price: 49 },
  { name: "Pixel", w: 166, h: 86, type: "rect", widget: "pixel", price: 59 },
  { name: "Voice", w: 71, h: 71, type: "rect", widget: "speaker", price: 39 },
  { name: "Sense", w: 44, h: 44, type: "rect", widget: "sensor", price: 29 },
  { name: "Brick", w: 71, h: 71, type: "rect", widget: "brick", price: 9 },
  { name: "Hub", w: 91, h: 62, type: "rect", widget: "hub", price: 49 },
  { name: "Holo", w: 140, h: 140, type: "rect", widget: "holo", price: 99 },
  { name: "Round", w: 91, h: 91, type: "circle", widget: "gauge", price: 69 },
  { name: "Mirror", w: 120, h: 120, type: "circle", widget: "mirror", price: 129 },
  { name: "eInk", w: 180, h: 120, type: "rect", widget: "eink", price: 59 },
];

const CASINGS = [
  { name: "Minimal", color: "#1a1a2e", edge: TEAL, opacity: 0.7 },
  { name: "Rounded", color: "#e8e8e8", edge: "#aaaaaa", opacity: 1.0 },
  { name: "Baroque", color: "#1a1008", edge: AMBER, opacity: 1.0 },
  { name: "Wood", color: "#5c3a1e", edge: "#8b6914", opacity: 1.0 },
];

function useWidgetTexture(widgetType: string, w: number, h: number) {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  if (!canvasRef.current && typeof document !== "undefined") {
    canvasRef.current = document.createElement("canvas");
  }
  const textureRef = useRef<THREE.CanvasTexture>(null!);

  useMemo(() => {
    if (!canvasRef.current) return;
    const c = canvasRef.current;
    c.width = Math.max(128, Math.round(w * 2));
    c.height = Math.max(128, Math.round(h * 2));
    textureRef.current = new THREE.CanvasTexture(c);
    textureRef.current.minFilter = THREE.LinearFilter;
  }, [w, h]);

  const draw = useCallback((time: number) => {
    if (!canvasRef.current) return;
    const c = canvasRef.current;
    const ctx = c.getContext("2d")!;
    const cw = c.width, ch = c.height;
    ctx.fillStyle = "#060612";
    ctx.fillRect(0, 0, cw, ch);

    switch (widgetType) {
      case "clock": {
        const d = new Date();
        ctx.fillStyle = TEAL;
        ctx.font = `bold ${cw * 0.28}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}`, cw/2, ch*0.4);
        ctx.fillStyle = AMBER;
        ctx.font = `${cw * 0.12}px monospace`;
        ctx.fillText(d.getSeconds().toString().padStart(2,"0"), cw/2, ch*0.65);
        for (let i = 0; i < 6; i++) {
          const p = Math.sin(time*3 + i*0.8)*0.5+0.5;
          ctx.fillStyle = `rgba(0,212,170,${0.2+p*0.6})`;
          ctx.beginPath(); ctx.arc(cw*0.15+i*cw*0.14, ch*0.82, 3+p*3, 0, Math.PI*2); ctx.fill();
        }
        break;
      }
      case "glow": {
        const p = Math.sin(time*2)*0.5+0.5;
        const g = ctx.createRadialGradient(cw/2,ch/2,0,cw/2,ch/2,cw*0.45);
        g.addColorStop(0, `rgba(0,212,170,${0.4+p*0.6})`);
        g.addColorStop(0.5, `rgba(0,212,170,${0.1+p*0.2})`);
        g.addColorStop(1, "rgba(0,212,170,0)");
        ctx.fillStyle = g; ctx.fillRect(0,0,cw,ch);
        break;
      }
      case "pixel": {
        const cols=16, rows=8, pw=cw/cols, ph=ch/rows;
        for (let y=0;y<rows;y++) for (let x=0;x<cols;x++) {
          const wave = Math.sin(time*2+x*0.4+y*0.3)*0.5+0.5;
          ctx.fillStyle = `rgb(${Math.floor(wave*80)},${Math.floor(wave*212)},${Math.floor(wave*170)})`;
          ctx.fillRect(x*pw+1,y*ph+1,pw-2,ph-2);
        }
        break;
      }
      case "gauge": {
        const val = Math.sin(time*0.8)*0.5+0.5;
        const r = Math.min(cw,ch)*0.38;
        ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 12;
        ctx.beginPath(); ctx.arc(cw/2,ch/2,r,Math.PI*0.75,Math.PI*2.25); ctx.stroke();
        ctx.strokeStyle = TEAL; ctx.lineCap = "round";
        ctx.beginPath(); ctx.arc(cw/2,ch/2,r,Math.PI*0.75,Math.PI*0.75+val*Math.PI*1.5); ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.font = `bold ${cw*0.18}px monospace`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(`${Math.round(val*100)}%`, cw/2, ch/2);
        break;
      }
      case "weather": {
        ctx.fillStyle = TEAL; ctx.font = `bold ${cw*0.15}px sans-serif`; ctx.textAlign = "left";
        ctx.fillText("22°C", cw*0.08, ch*0.35);
        ctx.fillStyle = "#888"; ctx.font = `${cw*0.06}px sans-serif`;
        ctx.fillText("Partly Cloudy", cw*0.08, ch*0.5);
        for (let i=0;i<7;i++) {
          const bh = (Math.sin(time*0.5+i*0.9)*0.3+0.5)*ch*0.3;
          ctx.fillStyle = i<3?TEAL:AMBER; ctx.globalAlpha = 0.6+Math.sin(time+i)*0.2;
          ctx.fillRect(cw*0.08+i*cw*0.12, ch*0.9-bh, cw*0.08, bh);
        }
        ctx.globalAlpha = 1;
        break;
      }
      case "speaker": {
        ctx.strokeStyle = AMBER; ctx.lineWidth = 2; ctx.beginPath();
        for (let x=0;x<cw;x++) {
          const amp = Math.sin(time*3+x*0.05)*ch*0.15*(0.5+0.5*Math.sin(time*1.5+x*0.02));
          x===0 ? ctx.moveTo(x,ch/2+amp) : ctx.lineTo(x,ch/2+amp);
        }
        ctx.stroke();
        break;
      }
      case "sensor": {
        ctx.fillStyle = TEAL; ctx.font = `bold ${cw*0.25}px monospace`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText((Math.sin(time*0.5)*15+22).toFixed(1), cw/2, ch*0.4);
        ctx.fillStyle = "#666"; ctx.font = `${cw*0.1}px sans-serif`;
        ctx.fillText("°C", cw/2, ch*0.65);
        break;
      }
      case "hub": {
        for (let i=0;i<5;i++) {
          const a = (i/5)*Math.PI*2+time*0.3;
          const x = cw/2+Math.cos(a)*cw*0.25, y = ch/2+Math.sin(a)*ch*0.25;
          ctx.fillStyle = TEAL; ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fill();
          ctx.strokeStyle = "rgba(0,212,170,0.3)"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(cw/2,ch/2); ctx.lineTo(x,y); ctx.stroke();
        }
        ctx.fillStyle = AMBER; ctx.beginPath(); ctx.arc(cw/2,ch/2,6,0,Math.PI*2); ctx.fill();
        break;
      }
      case "holo": {
        ctx.strokeStyle = "rgba(0,212,170,0.2)"; ctx.lineWidth = 0.5;
        for (let x=0;x<cw;x+=20) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x+Math.sin(time+x*0.02)*5,ch); ctx.stroke(); }
        for (let y=0;y<ch;y+=20) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(cw,y+Math.cos(time+y*0.02)*5); ctx.stroke(); }
        break;
      }
      case "mirror": {
        for (let i=0;i<5;i++) {
          const angle = time*0.5+(i*Math.PI*2)/5;
          const x = cw/2+Math.cos(angle)*cw*0.25, y = ch/2+Math.sin(angle)*ch*0.25;
          const grad = ctx.createRadialGradient(x,y,0,x,y,cw*0.2);
          grad.addColorStop(0, `rgba(212,176,56,${0.1+Math.sin(time+i)*0.05})`);
          grad.addColorStop(1, "rgba(212,176,56,0)");
          ctx.fillStyle = grad; ctx.fillRect(0,0,cw,ch);
        }
        break;
      }
      case "brick": {
        ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 1;
        for (let x=cw*0.3;x<cw*0.7;x+=15) { ctx.beginPath(); ctx.moveTo(x,ch*0.2); ctx.lineTo(x,ch*0.8); ctx.stroke(); }
        break;
      }
      case "eink": {
        ctx.fillStyle = "#e8e0d0"; ctx.fillRect(cw*0.05,ch*0.05,cw*0.9,ch*0.9);
        ctx.fillStyle = "#333"; ctx.font = `${cw*0.05}px serif`; ctx.textAlign = "center";
        ctx.fillText('"The wall is where', cw/2, ch*0.35);
        ctx.fillText('apps land."', cw/2, ch*0.5);
        break;
      }
    }
    if (textureRef.current) textureRef.current.needsUpdate = true;
  }, [widgetType]);

  return { texture: textureRef.current, draw };
}

function Module({ module, position, casing, index }: { module: typeof MODULES[0]; position: [number,number,number]; casing: typeof CASINGS[0]; index: number }) {
  const meshRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const s = 0.01;
  const w = module.w * s, h = module.h * s, depth = 0.08;
  const widget = useWidgetTexture(module.widget, module.w, module.h);
  const edgeColor = useMemo(() => new THREE.Color(casing.edge), [casing.edge]);
  const bodyColor = useMemo(() => new THREE.Color(casing.color), [casing.color]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    widget.draw(t);
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t*0.3+index*0.5)*0.05;
      const target = hovered ? 1.08 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(target,target,target), 0.1);
    }
  });

  if (module.type === "circle") {
    const radius = w/2;
    return (
      <group position={position} ref={meshRef} onPointerEnter={()=>setHovered(true)} onPointerLeave={()=>setHovered(false)}>
        <mesh><cylinderGeometry args={[radius,radius,depth,32]} /><meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} transparent opacity={casing.opacity} /></mesh>
        <mesh position={[0,depth/2+0.001,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[radius*0.88,32]} /><meshBasicMaterial map={widget.texture} /></mesh>
        <mesh><torusGeometry args={[radius+0.005,0.005,8,32]} /><meshBasicMaterial color={edgeColor} transparent opacity={hovered?0.5:0.2} /></mesh>
        {[0,1,2,3].map(i => { const a=(i/4)*Math.PI*2; return <mesh key={i} position={[Math.cos(a)*radius*0.65,-depth/2-0.005,Math.sin(a)*radius*0.65]}><cylinderGeometry args={[0.012,0.012,0.005,8]} /><meshStandardMaterial color="#D4B038" metalness={0.9} roughness={0.1} /></mesh> })}
      </group>
    );
  }

  return (
    <group position={position} ref={meshRef} onPointerEnter={()=>setHovered(true)} onPointerLeave={()=>setHovered(false)}>
      <RoundedBox args={[w,h,depth]} radius={0.01} smoothness={2}><meshStandardMaterial color={bodyColor} metalness={0.6} roughness={0.3} transparent={casing.opacity<1} opacity={casing.opacity} /></RoundedBox>
      <mesh position={[0,0,depth/2+0.001]}><planeGeometry args={[w*0.9,h*0.9]} /><meshBasicMaterial map={widget.texture} /></mesh>
      <mesh><boxGeometry args={[w+0.01,h+0.01,depth+0.005]} /><meshBasicMaterial color={edgeColor} transparent opacity={hovered?0.3:0.1} wireframe /></mesh>
      {[[-1,-1],[-1,1],[1,-1],[1,1]].map(([dx,dy],i) => <mesh key={i} position={[dx*w*0.38,dy*h*0.38,-depth/2-0.005]}><cylinderGeometry args={[0.012,0.012,0.005,8]} /><meshStandardMaterial color="#D4B038" metalness={0.9} roughness={0.1} /></mesh>)}
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 200;
  const { positions, velocities } = useMemo(() => {
    const p = new Float32Array(count*3), v = new Float32Array(count*3);
    for (let i=0;i<count;i++) { p[i*3]=(Math.random()-0.5)*8; p[i*3+1]=(Math.random()-0.5)*6; p[i*3+2]=(Math.random()-0.5)*6; v[i*3]=(Math.random()-0.5)*0.002; v[i*3+1]=Math.random()*0.003+0.001; v[i*3+2]=(Math.random()-0.5)*0.002; }
    return { positions: p, velocities: v };
  }, []);
  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    for (let i=0;i<count;i++) { pos.array[i*3]+=velocities[i*3]; pos.array[i*3+1]+=velocities[i*3+1]; pos.array[i*3+2]+=velocities[i*3+2]; if(pos.array[i*3+1]>3.5){pos.array[i*3+1]=-3.5;pos.array[i*3]=(Math.random()-0.5)*8;} }
    (pos as THREE.BufferAttribute).needsUpdate = true;
  });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]} /></bufferGeometry><pointsMaterial color={TEAL} size={0.015} transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} /></points>;
}

function CyberGrid() {
  const ref = useRef<THREE.Mesh>(null!);
  const shader = useMemo(() => ({
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(TEAL) } },
    vertexShader: "varying vec3 vPos;void main(){vPos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
    fragmentShader: "uniform float uTime;uniform vec3 uColor;varying vec3 vPos;void main(){vec2 g=abs(fract(vPos.xz*2.0-0.5)-0.5)/fwidth(vPos.xz*2.0);float l=min(g.x,g.y);float gm=1.0-min(l,1.0);float d=length(vPos.xz);float f=1.0-smoothstep(1.5,4.0,d);float p=0.5+0.5*sin(uTime*0.5-d*0.8);gl_FragColor=vec4(uColor,gm*f*0.2*(0.7+p*0.3));}",
  }), []);
  useFrame((state) => { if(ref.current)(ref.current.material as THREE.ShaderMaterial).uniforms.uTime.value=state.clock.getElapsedTime(); });
  return <mesh ref={ref} rotation={[-Math.PI/2,0,0]} position={[0,-1.8,0]}><planeGeometry args={[10,10]} /><shaderMaterial {...shader} transparent depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>;
}

function Scene({ activeCasing }: { activeCasing: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const positions = useMemo(() => {
    const cols = 4;
    return MODULES.map((_,i) => [(i%cols-1.5)*0.55, (1-Math.floor(i/cols))*0.52, 0] as [number,number,number]);
  }, []);
  useFrame((state) => { if(groupRef.current) groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime()*0.08)*0.06; });

  return (
    <>
      <color attach="background" args={["#050510"]} />
      <fog attach="fog" args={["#050510", 4, 12]} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[3,5,2]} intensity={0.6} />
      <pointLight position={[-2,2,1]} intensity={0.8} color={TEAL} distance={6} />
      <pointLight position={[2,-1,2]} intensity={0.4} color={AMBER} distance={5} />
      <group ref={groupRef}>
        <group position={[0,0.3,0]}>
          {MODULES.map((mod,i) => <Module key={mod.name} module={mod} position={positions[i]} casing={CASINGS[activeCasing]} index={i} />)}
        </group>
      </group>
      <Particles />
      <CyberGrid />
      <OrbitControls enableDamping dampingFactor={0.06} minDistance={2} maxDistance={7} maxPolarAngle={Math.PI*0.75} minPolarAngle={Math.PI*0.15} autoRotate autoRotateSpeed={0.3} enablePan={false} />
    </>
  );
}

export function OmmaDemoScene() {
  const [activeCasing, setActiveCasing] = useState(0);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0,0.5,3.8], fov: 50 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }} dpr={[1,1.5]} style={{ width: "100%", height: "100%" }}>
        <Scene activeCasing={activeCasing} />
      </Canvas>
      {/* HTML overlay for casing selector — no drei Text needed */}
      <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8, zIndex: 10 }}>
        {CASINGS.map((c, i) => (
          <button key={c.name} onClick={() => setActiveCasing(i)} style={{
            padding: "8px 16px", borderRadius: 8, fontSize: 12, fontFamily: "monospace", cursor: "pointer", transition: "all 0.2s",
            background: i === activeCasing ? `${c.edge}20` : "rgba(10,10,20,0.8)",
            border: `1px solid ${i === activeCasing ? c.edge : "rgba(255,255,255,0.1)"}`,
            color: i === activeCasing ? c.edge : "#666",
          }}>{c.name}</button>
        ))}
      </div>
      {/* Title overlay */}
      <div style={{ position: "absolute", top: 20, left: 0, right: 0, textAlign: "center", pointerEvents: "none", zIndex: 10 }}>
        <div style={{ color: TEAL, fontSize: 28, fontWeight: 700, letterSpacing: 6, fontFamily: "monospace" }}>mosAIc</div>
        <div style={{ color: AMBER, fontSize: 11, letterSpacing: 4, marginTop: 4, fontFamily: "monospace" }}>YOUR DESKTOP. ON YOUR WALL.</div>
        <div style={{ color: "#444", fontSize: 9, letterSpacing: 2, marginTop: 4, fontFamily: "monospace" }}>12 MODULES · 4 STYLES · REAL DIMENSIONS · DRAG TO ORBIT</div>
      </div>
      {/* HUD */}
      <div style={{ position: "absolute", bottom: 16, left: 16, color: TEAL, fontFamily: "monospace", fontSize: 10, opacity: 0.4, pointerEvents: "none", zIndex: 10 }}>
        <div>SYS://mosAIc.v1</div>
        <div style={{ color: AMBER }}>▸ 12 MODULES LOADED</div>
        <div>▸ STYLE: {CASINGS[activeCasing].name.toUpperCase()}</div>
      </div>
    </div>
  );
}
