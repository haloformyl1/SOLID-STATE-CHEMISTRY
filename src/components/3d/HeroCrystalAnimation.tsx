import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

const CrystalLattice = ({ animated }: { animated: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const { size } = useThree();
  const compact = size.width < 480 || size.width / Math.max(size.height, 1) < 0.95;
  
  useFrame((state) => {
    if (group.current && animated) {
      group.current.rotation.y = state.clock.elapsedTime * 0.2;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  // Generate a simple 2x2x2 FCC-like structure for the hero animation
  const { atoms, connections } = useMemo(() => {
    const nextAtoms: [number, number, number][] = [];
    const spacing = 2;
    const offset = spacing / 2;

    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 2; y++) {
        for (let z = 0; z < 2; z++) {
          nextAtoms.push([(x * spacing) - offset, (y * spacing) - offset, (z * spacing) - offset]);
          if (x === 0) nextAtoms.push([(x * spacing) - offset + spacing / 2, (y * spacing) - offset + spacing / 2, (z * spacing) - offset]);
          if (y === 0) nextAtoms.push([(x * spacing) - offset + spacing / 2, (y * spacing) - offset, (z * spacing) - offset + spacing / 2]);
          if (z === 0) nextAtoms.push([(x * spacing) - offset, (y * spacing) - offset + spacing / 2, (z * spacing) - offset + spacing / 2]);
        }
      }
    }

    const nextConnections: [THREE.Vector3, THREE.Vector3][] = [];
    nextAtoms.forEach((pos1, i) => {
      nextAtoms.forEach((pos2, j) => {
        if (i < j) {
          const distance = new THREE.Vector3(...pos1).distanceTo(new THREE.Vector3(...pos2));
          if (distance > 0 && distance <= spacing * 0.75) nextConnections.push([new THREE.Vector3(...pos1), new THREE.Vector3(...pos2)]);
        }
      });
    });
    return { atoms: nextAtoms, connections: nextConnections };
  }, []);

  return (
    <group ref={group} position={[0, compact ? 0.18 : 0.35, 0]} scale={compact ? 1.55 : 1}>
      <group position={[-0.5, -0.5, -0.5]}>
        {atoms.map((pos, i) => (
          <Sphere key={`atom-${i}`} args={compact ? [0.3, 16, 16] : [0.3, 32, 32]} position={pos}>
            {compact ? (
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#075985"
                emissiveIntensity={0.24}
                metalness={0.16}
                roughness={0.22}
              />
            ) : (
              <meshPhysicalMaterial
                color="#38bdf8"
                emissive="#075985"
                emissiveIntensity={0.24}
                metalness={0.16}
                roughness={0.22}
                transmission={0.2}
                thickness={0.75}
                ior={1.45}
                clearcoat={0.9}
              />
            )}
          </Sphere>
        ))}
        {connections.map(([p1, p2], i) => (
          <Line
            key={`line-${i}`}
            points={[p1, p2]}
            color="#2dd4bf"
            lineWidth={2}
            transparent
            opacity={0.58}
          />
        ))}
      </group>
    </group>
  );
};

const ResponsiveHeroCamera: React.FC = () => {
  const { camera, size, invalidate } = useThree();

  useEffect(() => {
    const compact = size.width < 480 || size.width / Math.max(size.height, 1) < 0.95;
    const position: [number, number, number] = compact ? [5.8, 4.8, 6.8] : [11.6, 9.5, 13.5];

    camera.position.set(...position);
    camera.lookAt(0, 0, 0);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = compact ? 40 : 38;
      camera.updateProjectionMatrix();
    }
    invalidate();
  }, [camera, invalidate, size.height, size.width]);

  return null;
};

export const HeroCrystalAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useStore((state) => state.reducedMotion);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '120px' });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const animated = inView && !reducedMotion;

  return (
    <div ref={containerRef} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(14,165,233,0.12),transparent_48%)]" role="img" aria-label="Animated face-centred crystal lattice">
      <Canvas camera={{ position: [11.6, 9.5, 13.5], fov: 38 }} dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 1.6]} frameloop={animated ? 'always' : 'demand'}>
        <ResponsiveHeroCamera />
        <ambientLight intensity={0.78} />
        <pointLight position={[10, 10, 10]} intensity={1.35} color="#e0f2fe" />
        <pointLight position={[-10, -8, -10]} intensity={0.65} color="#2dd4bf" />
        <CrystalLattice animated={animated} />
        <OrbitControls target={[0, 0, 0]} enableZoom={false} enablePan={false} enableDamping />
      </Canvas>
    </div>
  );
};
