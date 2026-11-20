"use client";

import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { MutableRefObject, useMemo, useRef } from "react";
import * as THREE from "three";

export type HeroMotionState = { progress: number; pointerX: number; pointerY: number; hovering: boolean };

const particleVertex = `
attribute float aSize;
uniform float uTime;
uniform float uProgress;
uniform vec2 uPointer;
varying float vAlpha;
void main(){
  vec3 p=position;
  float drift=uTime*(.18+aSize*.07);
  p.x+=sin(drift+p.y*2.1)*.075;
  p.y+=cos(drift*.77+p.x*2.3)*.075;
  vec2 cursor=uPointer*vec2(2.7,1.7);
  vec2 away=p.xy-cursor;
  float proximity=1.0-smoothstep(.0,1.1,length(away));
  p.xy+=normalize(away+vec2(.0001))*proximity*.48;
  p*=1.0+uProgress*1.85;
  p.z+=sin(uProgress*3.14159+p.x*.5)*uProgress*.6;
  vec4 view=modelViewMatrix*vec4(p,1.0);
  gl_Position=projectionMatrix*view;
  gl_PointSize=min(10.0, aSize*(42.0/-view.z));
  vAlpha=(.37+aSize*.16)*(1.0-smoothstep(5.5,9.0,-view.z));
}`;
const particleFragment = `
precision mediump float;
varying float vAlpha;
void main(){
  float d=length(gl_PointCoord-.5);
  float halo=exp(-d*9.0)*.55;
  float core=1.0-smoothstep(.07,.2,d);
  float alpha=(halo+core)*vAlpha;
  if(alpha<.01)discard;
  gl_FragColor=vec4(mix(vec3(.15,.53,.68),vec3(.72,.96,1.0),core),alpha);
}`;

const backdropVertex = `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const backdropFragment = `
precision mediump float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uPointer;
void main(){
  vec2 p=vUv-.5;
  float wave=sin(p.x*13.0+uTime*.18)*sin(p.y*9.0-uTime*.14);
  float glow=exp(-length(p-vec2(.12+uPointer.x*.06,.04+uPointer.y*.05))*3.7);
  float scan=sin((p.y+wave*.018)*120.0+uTime*.5)*.5+.5;
  vec3 color=mix(vec3(.015,.07,.11),vec3(.10,.36,.44),glow);
  gl_FragColor=vec4(color,(.10+glow*.11+scan*.012));
}`;

function BackgroundField({ motion }: { motion: MutableRefObject<HeroMotionState> }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  useFrame(({ clock }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = clock.elapsedTime;
    material.current.uniforms.uPointer.value.set(motion.current.pointerX, motion.current.pointerY);
  });
  return <mesh position={[0, 0, -7]}><planeGeometry args={[28, 16]} /><shaderMaterial ref={material} vertexShader={backdropVertex} fragmentShader={backdropFragment} transparent depthWrite={false} uniforms={{ uTime: { value: 0 }, uPointer: { value: new THREE.Vector2() } }} /></mesh>;
}

function ParticleField({ motion, count }: { motion: MutableRefObject<HeroMotionState>; count: number }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const a = i * 2.399963229728653;
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const distance = 1.7 + ((i * 47) % 127) / 127 * 2.3;
      positions[i * 3] = Math.cos(a) * radius * distance;
      positions[i * 3 + 1] = y * distance;
      positions[i * 3 + 2] = Math.sin(a) * radius * distance;
      sizes[i] = .55 + ((i * 37) % 101) / 101 * 1.6;
    }
    const output = new THREE.BufferGeometry();
    output.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    output.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return output;
  }, [count]);
  useFrame(({ clock }) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = clock.elapsedTime;
    material.current.uniforms.uProgress.value = motion.current.progress;
    material.current.uniforms.uPointer.value.set(motion.current.pointerX, motion.current.pointerY);
  });
  return <points geometry={geometry} frustumCulled={false}>
    <shaderMaterial ref={material} vertexShader={particleVertex} fragmentShader={particleFragment} transparent depthWrite={false} blending={THREE.AdditiveBlending} uniforms={{ uTime: { value: 0 }, uProgress: { value: 0 }, uPointer: { value: new THREE.Vector2() } }} />
  </points>;
}

function Sculpture({ motion, detail }: { motion: MutableRefObject<HeroMotionState>; detail: number }) {
  const assembly = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const orbit = useRef<THREE.Group>(null);
  const satellite = useRef<THREE.Group>(null);
  useFrame(({ camera, clock }, delta) => {
    const group = assembly.current, mesh = core.current, rings = orbit.current, small = satellite.current;
    if (!group || !mesh || !rings || !small) return;
    const { progress, pointerX, pointerY, hovering } = motion.current;
    const t = clock.elapsedTime;
    group.rotation.y += delta * (.24 + (hovering ? .12 : 0));
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, pointerY * .22 + Math.sin(t * .31) * .1, 3, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, -pointerX * .16, 3, delta);
    group.scale.setScalar(THREE.MathUtils.damp(group.scale.x, 1 + progress * .8 + (hovering ? .07 : 0), 2.3, delta));
    mesh.scale.y = 1 + Math.sin(t * 1.1) * .025 + pointerY * .025;
    const material = mesh.material as THREE.Material;
    material.opacity = Math.max(.07, 1 - progress * 1.24);
    rings.rotation.x += delta * .12;
    rings.rotation.z -= delta * .07;
    rings.scale.setScalar(1 + progress * 1.35);
    small.rotation.y -= delta * .35;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointerX * .4, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointerY * .25, 2.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 5.9 - progress * 1.5, 2, delta);
    camera.lookAt(0, 0, 0);
  });
  return <group ref={assembly} position={[.6, 0, 0]}>
    <mesh ref={core}>
      <icosahedronGeometry args={[1.22, detail]} />
      <MeshDistortMaterial color="#a9cbd2" metalness={.84} roughness={.17} clearcoat={1} clearcoatRoughness={.12} distort={.22} speed={1.25} transparent />
    </mesh>
    <mesh scale={1.1}>
      <icosahedronGeometry args={[1.28, 2]} />
      <meshBasicMaterial color="#9be5ef" transparent opacity={.12} wireframe depthWrite={false} />
    </mesh>
    <group ref={orbit}>
      <mesh rotation={[.38, .2, .1]}><torusGeometry args={[1.65, .021, 8, 180]} /><meshStandardMaterial color="#b8f0f3" metalness={.8} roughness={.14} emissive="#215869" emissiveIntensity={.24} /></mesh>
      <mesh rotation={[1.4, .45, .2]}><torusGeometry args={[1.93, .013, 8, 180]} /><meshBasicMaterial color="#73bdce" transparent opacity={.52} /></mesh>
      <mesh rotation={[.1, 1.1, .5]}><torusGeometry args={[2.1, .008, 8, 180]} /><meshBasicMaterial color="#d5ffff" transparent opacity={.32} /></mesh>
    </group>
    <group ref={satellite}>
      <Float speed={1.6} rotationIntensity={.35} floatIntensity={.35}>
        <mesh position={[2.15, .9, -.4]}><octahedronGeometry args={[.15, 0]} /><meshStandardMaterial color="#caeff0" metalness={.65} roughness={.15} emissive="#205b6d" emissiveIntensity={.3}/></mesh>
      </Float>
      <mesh position={[-2.2, -.85, .35]}><icosahedronGeometry args={[.075, 1]} /><meshBasicMaterial color="#6ce2ed" /></mesh>
    </group>
  </group>;
}

// Glass objects orbit the sculpture on springs; the cursor pushes them away and they drift back.
type PebbleShape = "sphere" | "capsule" | "torus" | "gem";
const PEBBLES: { shape: PebbleShape; size: number; home: [number, number, number] }[] = [
  { shape: "sphere", size: .34, home: [1.75, 1.05, .4] },
  { shape: "capsule", size: .27, home: [2.1, -.6, -.2] },
  { shape: "torus", size: .24, home: [.75, -1.6, .6] },
  { shape: "gem", size: .22, home: [-.9, 1.55, .2] },
  { shape: "sphere", size: .3, home: [-.45, -1.75, -.4] },
  { shape: "sphere", size: .17, home: [1.45, .1, 1.15] },
  { shape: "capsule", size: .19, home: [-1.6, -1.05, .9] },
  { shape: "sphere", size: .4, home: [2.65, .55, -.9] },
  { shape: "torus", size: .26, home: [.6, 1.8, -.6] },
];

function PebbleGeometry({ shape, size }: { shape: PebbleShape; size: number }) {
  if (shape === "capsule") return <capsuleGeometry args={[size * .55, size * 1.3, 10, 28]} />;
  if (shape === "torus") return <torusGeometry args={[size * .78, size * .32, 28, 72]} />;
  if (shape === "gem") return <icosahedronGeometry args={[size, 0]} />;
  return <sphereGeometry args={[size, 48, 48]} />;
}

function GlassPebbles({ motion, high }: { motion: MutableRefObject<HeroMotionState>; high: boolean }) {
  const list = useMemo(() => PEBBLES.slice(0, high ? PEBBLES.length : 5), [high]);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const bodies = useMemo(() => list.map((pebble, index) => ({ home: new THREE.Vector3(...pebble.home), pos: new THREE.Vector3(...pebble.home), vel: new THREE.Vector3(), spin: new THREE.Vector3(.2 + index * .05, .3 - index * .03, .1) })), [list]);
  const target = useMemo(() => new THREE.Vector3(), []);
  const cursor = useMemo(() => new THREE.Vector3(), []);
  const push = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 1 / 30), t = clock.elapsedTime;
    const { pointerX, pointerY, progress, hovering } = motion.current;
    cursor.set(pointerX * 2.7 - .6, pointerY * 1.7, .4);
    bodies.forEach((body, index) => {
      const mesh = meshes.current[index];
      if (!mesh) return;
      const angle = t * .12 + index;
      target.copy(body.home).applyAxisAngle(THREE.Object3D.DEFAULT_UP, Math.sin(angle) * .18).multiplyScalar(1 + progress * 1.7);
      target.y += Math.sin(t * .8 + index * 1.7) * .08;
      const force = target.sub(body.pos).multiplyScalar(14);
      if (hovering) {
        push.copy(body.pos).sub(cursor);
        const distance = push.length();
        if (distance < 1.35) force.add(push.normalize().multiplyScalar((1.35 - distance) * 70));
      }
      body.vel.addScaledVector(force, dt).multiplyScalar(Math.exp(-5 * dt));
      body.pos.addScaledVector(body.vel, dt);
      mesh.position.copy(body.pos);
      mesh.rotation.x += (body.spin.x + body.vel.y * .6) * dt;
      mesh.rotation.y += (body.spin.y + body.vel.x * .6) * dt;
      mesh.rotation.z += body.spin.z * dt;
    });
  });
  return <group position={[.6, 0, 0]}>
    {list.map((pebble, index) => <mesh key={index} ref={node => { meshes.current[index] = node; }} position={pebble.home}>
      <PebbleGeometry shape={pebble.shape} size={pebble.size} />
      {high
        ? <meshPhysicalMaterial color="#e6fbfd" transmission={1} thickness={.9} roughness={.06} ior={1.45} iridescence={1} iridescenceIOR={1.35} iridescenceThicknessRange={[120, 520]} clearcoat={1} clearcoatRoughness={.05} attenuationColor="#8fdbe6" attenuationDistance={2.4} envMapIntensity={1.4} />
        : <meshStandardMaterial color="#cdeff3" metalness={.92} roughness={.14} envMapIntensity={1.3} />}
    </mesh>)}
  </group>;
}

function Scene({ motion, count }: { motion: MutableRefObject<HeroMotionState>; count: number }) {
  return <>
    <BackgroundField motion={motion} />
    <ambientLight intensity={.42} />
    <directionalLight position={[3, 4, 4]} intensity={2.3} color="#e4ffff" />
    <pointLight position={[-3, -1, 2]} intensity={38} distance={8} color="#4bc2e5" />
    <pointLight position={[2, 2, -3]} intensity={24} distance={8} color="#889dff" />
    <Environment frames={1} resolution={128}>
      <Lightformer form="rect" color="#ffffff" intensity={4} scale={[5, 2]} position={[0, 4, 4]} target={[0, 0, 0]} />
      <Lightformer form="rect" color="#8de6f3" intensity={3} scale={[2, 6]} position={[-4, 1, 2]} target={[0, 0, 0]} />
      <Lightformer form="ring" color="#b1c6ff" intensity={2} scale={[4, 4]} position={[2, -2, -2]} target={[0, 0, 0]} />
    </Environment>
    <ParticleField motion={motion} count={count} />
    <Sculpture motion={motion} detail={count > 1000 ? 5 : 4} />
    <GlassPebbles motion={motion} high={count > 1000} />
  </>;
}

export default function HeroScene({ motion, count, active }: { motion: MutableRefObject<HeroMotionState>; count: number; active: boolean }) {
  return <Canvas camera={{ position: [0, 0, 5.9], fov: 43, near: .1, far: 50 }} dpr={[1, 1.6]} frameloop={active ? "always" : "demand"} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }} fallback={<div className="canvas-fallback" />}>
    <Scene motion={motion} count={count} />
  </Canvas>;
}
