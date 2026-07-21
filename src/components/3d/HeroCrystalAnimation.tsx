import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const CrystalLattice = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.2;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  // Generate a simple 2x2x2 FCC-like structure for the hero animation
  const atoms: [number, number, number][] = [];
  const spacing = 2;
  const offset = spacing / 2;

  for (let x = 0; x < 2; x++) {
    for (let y = 0; y < 2; y++) {
      for (let z = 0; z < 2; z++) {
        atoms.push([
          (x * spacing) - offset,
          (y * spacing) - offset,
          (z * spacing) - offset
        ]);
        
        // Face centers
        if (x === 0) atoms.push([(x * spacing) - offset + spacing/2, (y * spacing) - offset + spacing/2, (z * spacing) - offset]);
        if (y === 0) atoms.push([(x * spacing) - offset + spacing/2, (y * spacing) - offset, (z * spacing) - offset + spacing/2]);
        if (z === 0) atoms.push([(x * spacing) - offset, (y * spacing) - offset + spacing/2, (z * spacing) - offset + spacing/2]);
      }
    }
  }

  // Define connections for the wireframe (simplified)
  const connections: [THREE.Vector3, THREE.Vector3][] = [];
  atoms.forEach((pos1, i) => {
    atoms.forEach((pos2, j) => {
      if (i < j) {
        const d = new THREE.Vector3(...pos1).distanceTo(new THREE.Vector3(...pos2));
        if (d > 0 && d <= spacing * 0.75) { // Connect nearest neighbors
          connections.push([new THREE.Vector3(...pos1), new THREE.Vector3(...pos2)]);
        }
      }
    });
  });

  return (
    <group ref={group}>
      {atoms.map((pos, i) => (
        <Sphere key={`atom-${i}`} args={[0.3, 32, 32]} position={pos}>
          <meshPhysicalMaterial 
            color="#2563EB"
            metalness={0.2}
            roughness={0.1}
            transmission={0.9}
            thickness={1}
            ior={1.5}
            clearcoat={1}
          />
        </Sphere>
      ))}
      {connections.map(([p1, p2], i) => (
        <Line 
          key={`line-${i}`}
          points={[p1, p2]} 
          color="#0D9488" 
          lineWidth={2}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
};

export const HeroCrystalAnimation: React.FC = () => {
  return (
    <div className="w-full h-[400px] md:h-[600px] relative">
      <Canvas camera={{ position: [5, 4, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7C3AED" />
        <Environment preset="city" />
        <CrystalLattice />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};
