'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { SLEK_STATES, type SlekStateKey } from '@/lib/slek-states'
import { useSlekScene } from './slek-scene-context'

/* -------------------------------------------------------------------------- */
/*  Texture de lueur radiale (remplace le bloom, toujours rendue)              */
/* -------------------------------------------------------------------------- */

function makeGlowTexture() {
  const size = 256
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(255,255,255,0.55)')
  g.addColorStop(0.55, 'rgba(255,255,255,0.18)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/* -------------------------------------------------------------------------- */
/*  Halo lumineux en billboard (grosse lueur derrière le cœur)                 */
/* -------------------------------------------------------------------------- */

function GlowBillboard({ glowColor }: { glowColor: React.RefObject<THREE.Color> }) {
  const mesh = useRef<THREE.Mesh>(null)
  const mat = useRef<THREE.MeshBasicMaterial>(null)
  const tex = useMemo(() => makeGlowTexture(), [])
  const { camera } = useThree()

  useFrame(() => {
    if (mat.current) mat.current.color.copy(glowColor.current)
    if (mesh.current) mesh.current.quaternion.copy(camera.quaternion)
  })

  return (
    <mesh ref={mesh} position={[0, 0, -0.5]} scale={7}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        ref={mat}
        map={tex}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

/* -------------------------------------------------------------------------- */
/*  Cœur lumineux déformé + coquilles additives (fausse incandescence)         */
/* -------------------------------------------------------------------------- */

function Core({
  coreColor,
  glowColor,
  distort,
  speed,
}: {
  coreColor: React.RefObject<THREE.Color>
  glowColor: React.RefObject<THREE.Color>
  distort: React.RefObject<number>
  speed: React.RefObject<number>
}) {
  const mat = useRef<any>(null)
  const mesh = useRef<THREE.Mesh>(null)
  const shellA = useRef<THREE.MeshBasicMaterial>(null)
  const shellB = useRef<THREE.MeshBasicMaterial>(null)

  useFrame((_, dt) => {
    const k = Math.min(1, dt * 2)
    if (mat.current) {
      mat.current.color.copy(coreColor.current)
      mat.current.emissive.copy(coreColor.current)
      mat.current.distort = THREE.MathUtils.lerp(mat.current.distort, distort.current, k)
      mat.current.speed = THREE.MathUtils.lerp(mat.current.speed, speed.current, k)
    }
    if (shellA.current) shellA.current.color.copy(glowColor.current)
    if (shellB.current) shellB.current.color.copy(glowColor.current)
    if (mesh.current) {
      mesh.current.rotation.y += dt * 0.18
      const s = 1 + Math.sin(performance.now() * 0.0017) * 0.05
      mesh.current.scale.setScalar(s)
    }
  })

  return (
    <group>
      {/* cœur */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          ref={mat}
          distort={0.35}
          speed={1.4}
          roughness={0.1}
          metalness={0.1}
          emissiveIntensity={1.6}
        />
      </mesh>
      {/* coquilles de halo */}
      <mesh scale={1.25}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          ref={shellA}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh scale={1.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          ref={shellB}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Anneau « pétale » organique qui morphe — réagit à la souris                */
/* -------------------------------------------------------------------------- */

function PetalRing({
  radius,
  lobes,
  amp,
  tilt,
  spin,
  phase,
  glowColor,
}: {
  radius: number
  lobes: number
  amp: number
  tilt: [number, number, number]
  spin: number
  phase: number
  glowColor: React.RefObject<THREE.Color>
}) {
  const SEG = 200
  const { refs } = useSlekScene()
  const group = useRef<THREE.Group>(null)
  const geo = useRef<THREE.BufferGeometry>(null)
  const mat = useRef<THREE.LineBasicMaterial>(null)
  const positions = useMemo(() => new Float32Array((SEG + 1) * 3), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const arr = positions
    for (let i = 0; i <= SEG; i++) {
      const a = (i / SEG) * Math.PI * 2
      const r =
        radius +
        Math.sin(a * lobes + t * 1.3 + phase) * amp +
        Math.sin(a * (lobes + 2) - t * 0.9 + phase) * amp * 0.5
      const z = Math.sin(a * 3 + t * 0.8 + phase) * amp * 0.6
      arr[i * 3] = Math.cos(a) * r
      arr[i * 3 + 1] = Math.sin(a) * r
      arr[i * 3 + 2] = z
    }
    if (geo.current) {
      ;(geo.current.attributes.position as THREE.BufferAttribute).needsUpdate = true
    }
    if (group.current) {
      group.current.rotation.z += spin
      const p = refs.current.pointer
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, tilt[0] + p.y * 0.3, 0.05)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, tilt[1] + p.x * 0.3, 0.05)
    }
    if (mat.current) mat.current.color.copy(glowColor.current)
  })

  return (
    <group ref={group} rotation={tilt}>
      <lineLoop>
        <bufferGeometry ref={geo}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={SEG + 1} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={mat}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineLoop>
    </group>
  )
}

/* -------------------------------------------------------------------------- */
/*  Champ d'étoiles qu'on TRAVERSE — sensation de plongée dans le site         */
/* -------------------------------------------------------------------------- */

function Starfield({ glowColor }: { glowColor: React.RefObject<THREE.Color> }) {
  const COUNT = 1400
  const DEPTH = 60
  const SPREAD = 26
  const { refs } = useSlekScene()
  const points = useRef<THREE.Points>(null)
  const mat = useRef<THREE.PointsMaterial>(null)
  const tex = useMemo(() => makeGlowTexture(), [])

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * SPREAD
      arr[i * 3 + 1] = (Math.random() - 0.5) * SPREAD
      arr[i * 3 + 2] = -Math.random() * DEPTH
    }
    return arr
  }, [])

  useFrame((state, dt) => {
    const arr = positions
    // vitesse de défilement : base + boost selon le scroll → on « nage » plus vite en descendant
    const camZ = state.camera.position.z
    const v = (3 + Math.min(refs.current.scroll, 2) * 3) * dt
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 2] += v
      if (arr[i * 3 + 2] > camZ) {
        arr[i * 3 + 2] -= DEPTH
        arr[i * 3] = (Math.random() - 0.5) * SPREAD
        arr[i * 3 + 1] = (Math.random() - 0.5) * SPREAD
      }
    }
    if (points.current) {
      ;(points.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
      const p = refs.current.pointer
      points.current.rotation.z = THREE.MathUtils.lerp(points.current.rotation.z, p.x * 0.08, 0.04)
    }
    if (mat.current) mat.current.color.copy(glowColor.current)
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={COUNT} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        map={tex}
        size={0.22}
        sizeAttenuation
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* -------------------------------------------------------------------------- */
/*  Rig — caméra qui plonge au scroll + parallax souris                        */
/* -------------------------------------------------------------------------- */

function Rig({ children }: { children: React.ReactNode }) {
  const { refs } = useSlekScene()
  const group = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useFrame(() => {
    if (!group.current) return
    const { pointer, scroll } = refs.current
    // au scroll : l'orbe monte et recule → lueur de fond centrée, sans gêner le contenu
    const s = Math.min(scroll, 1)
    const targetX = 0
    const targetY = s * 2.1
    const targetZ = -s * 3.5
    const targetScale = THREE.MathUtils.clamp(1 - s * 0.35, 0.55, 1.1)
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.05)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.05)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05)
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.05))
    // parallax caméra
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.9, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.9, 0.04)
    camera.lookAt(0, 0, group.current.position.z)
  })

  return <group ref={group}>{children}</group>
}

/* -------------------------------------------------------------------------- */
/*  Scène                                                                      */
/* -------------------------------------------------------------------------- */

function Scene({ stateKey }: { stateKey: SlekStateKey }) {
  const s = SLEK_STATES[stateKey]
  const coreColor = useRef(new THREE.Color(SLEK_STATES.ready.core))
  const glowColor = useRef(new THREE.Color(SLEK_STATES.ready.glow))
  const targetCore = useMemo(() => new THREE.Color(), [])
  const targetGlow = useMemo(() => new THREE.Color(), [])
  const distort = useRef(s.distort)
  const speed = useRef(s.speed)

  useFrame((_, dt) => {
    targetCore.set(s.core)
    targetGlow.set(s.glow)
    const k = Math.min(1, dt * 2.2)
    coreColor.current.lerp(targetCore, k)
    glowColor.current.lerp(targetGlow, k)
    distort.current = s.distort
    speed.current = s.speed
  })

  const rings = useMemo(
    () => [
      { radius: 1.55, lobes: 3, amp: 0.34, tilt: [0.4, 0.2, 0] as [number, number, number], spin: 0.0018, phase: 0 },
      { radius: 1.75, lobes: 4, amp: 0.3, tilt: [1.1, 0.6, 0.3] as [number, number, number], spin: -0.0022, phase: 1.5 },
      { radius: 1.95, lobes: 5, amp: 0.26, tilt: [0.2, 1.2, 0.8] as [number, number, number], spin: 0.0015, phase: 3.1 },
      { radius: 2.15, lobes: 3, amp: 0.32, tilt: [1.4, 0.1, 1.1] as [number, number, number], spin: -0.0012, phase: 4.6 },
    ],
    [],
  )

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 4]} intensity={1.4} />
      <Starfield glowColor={glowColor} />
      <Rig>
        <GlowBillboard glowColor={glowColor} />
        <Core coreColor={coreColor} glowColor={glowColor} distort={distort} speed={speed} />
        {rings.map((r, i) => (
          <PetalRing key={i} {...r} glowColor={glowColor} />
        ))}
      </Rig>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Fond de scène fixe, plein écran, derrière tout le site                     */
/* -------------------------------------------------------------------------- */

export function SceneBackground() {
  const { stateKey, reducedMotion } = useSlekScene()

  if (reducedMotion) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 38%, rgba(34,211,238,0.18), transparent 60%)',
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene stateKey={stateKey} />
      </Canvas>
    </div>
  )
}

export default SceneBackground
