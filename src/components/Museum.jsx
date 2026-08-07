import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles } from '@react-three/drei'
import Section from './Section.jsx'
import { useContent } from '../hooks/useContent.js'

function Exhibit({ position, color, children }) {
  return (
    <group position={position}>
      <mesh position={[0, -1.15, 0]}>
        <cylinderGeometry args={[0.42, 0.58, 1.15, 32]} />
        <meshStandardMaterial color="#2a3a3a" metalness={0.55} roughness={0.45} />
      </mesh>
      <mesh position={[0, -0.54, 0]} rotation-x={-Math.PI / 2}>
        <torusGeometry args={[0.42, 0.035, 16, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
      </mesh>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.4}>
        <mesh>
          {children}
          <meshStandardMaterial
            color={color}
            metalness={0.75}
            roughness={0.22}
            emissive={color}
            emissiveIntensity={0.28}
          />
        </mesh>
      </Float>
    </group>
  )
}

function MuseumScene() {
  return (
    <>
      <color attach="background" args={['#0a1417']} />
      <fog attach="fog" args={['#0a1417', 9, 20]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 7, 5]} intensity={1.3} decay={0} color="#3fe6b3" />
      <pointLight position={[-5, 5, -5]} intensity={1.1} decay={0} color="#c8763a" />
      <directionalLight position={[0, 8, 0]} intensity={0.5} />
      <Sparkles count={90} scale={[14, 6, 14]} size={2} speed={0.35} color="#7dffd9" opacity={0.5} />
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.75, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#101d22" metalness={0.3} roughness={0.85} />
      </mesh>
      <gridHelper args={[18, 36, '#2b4745', '#15262a']} position={[0, -1.74, 0]} />
      <Exhibit position={[0, 0, 0]} color="#3fe6b3">
        <dodecahedronGeometry args={[0.58, 0]} />
      </Exhibit>
      <Exhibit position={[2.7, 0, 1.7]} color="#c8763a">
        <torusKnotGeometry args={[0.4, 0.14, 96, 16]} />
      </Exhibit>
      <Exhibit position={[-2.7, 0, 1.7]} color="#d8a94f">
        <sphereGeometry args={[0.52, 48, 48]} />
      </Exhibit>
      <Exhibit position={[2.7, 0, -1.7]} color="#8effdd">
        <octahedronGeometry args={[0.55, 0]} />
      </Exhibit>
      <Exhibit position={[-2.7, 0, -1.7]} color="#ffb84d">
        <torusGeometry args={[0.4, 0.17, 24, 64]} />
      </Exhibit>
      <OrbitControls
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        minDistance={4}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2.15}
      />
    </>
  )
}

export default function Museum() {
  const { t } = useContent()
  const stageRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = stageRef.current
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Section id="museum" kicker={t.ui.museum.kicker} title={t.ui.museum.title}>
      <div ref={stageRef} className="museum-stage">
        <Canvas
          frameloop={inView ? 'always' : 'never'}
          dpr={[1, 1.6]}
          camera={{ position: [0, 3.4, 8.6], fov: 50 }}
        >
          <MuseumScene />
        </Canvas>
        <div className="museum-hint">{t.ui.museum.hint}</div>
      </div>
    </Section>
  )
}
