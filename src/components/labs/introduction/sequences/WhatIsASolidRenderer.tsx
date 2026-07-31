import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import type { GuidedLessonStep } from '../engine/GuidedLessonTypes';

const ParticleSystem = ({ phase, isAnimationOn }: { phase: string, isAnimationOn: boolean }) => {
  const particlesRef = useRef<THREE.Mesh[]>([]);
  const count = 64;

  const initialPositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      pos.push(new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8));
    }
    return pos;
  }, []);

  const solidPositions = useMemo(() => {
    const pos = [];
    let idx = 0;
    for (let x = -1.5; x <= 1.5; x += 1) {
      for (let y = -1.5; y <= 1.5; y += 1) {
        for (let z = -1.5; z <= 1.5; z += 1) {
          if (idx < count) {
            pos.push(new THREE.Vector3(x * 0.8, y * 0.8 - 2, z * 0.8));
            idx++;
          }
        }
      }
    }
    return pos;
  }, []);

  const randomOffsets = useMemo(() => {
    return initialPositions.map(() => new THREE.Vector3(Math.random() * 10, Math.random() * 10, Math.random() * 10));
  }, [initialPositions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    particlesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      
      let targetPos = mesh.position.clone();

      if (phase === 'PHASE_GAS') {
        targetPos.x = Math.sin(t * 2 + randomOffsets[i].x) * 4;
        targetPos.y = Math.cos(t * 2.5 + randomOffsets[i].y) * 4;
        targetPos.z = Math.sin(t * 3 + randomOffsets[i].z) * 4;
      } else if (phase === 'PHASE_LIQUID') {
        // Fall to bottom and slide
        const boundY = -2.5 + (i % 3) * 0.5;
        targetPos.x = Math.sin(t + randomOffsets[i].x) * 2;
        targetPos.y = boundY + Math.sin(t * 3 + i) * 0.1;
        targetPos.z = Math.cos(t + randomOffsets[i].z) * 2;
      } else if (phase === 'PHASE_SOLID') {
        targetPos.copy(solidPositions[i]);
        if (isAnimationOn) {
          targetPos.x += Math.sin(t * 15 + i) * 0.05;
          targetPos.y += Math.cos(t * 15 + i) * 0.05;
        }
      }

      mesh.position.lerp(targetPos, 0.05);
    });
  });

  return (
    <group>
      {initialPositions.map((pos, i) => (
        <Sphere key={i} args={[0.2, 16, 16]} position={pos} ref={(el: THREE.Mesh | null) => { if(el) particlesRef.current[i] = el; }}>
          <meshStandardMaterial color="#3b82f6" roughness={0.2} />
        </Sphere>
      ))}
    </group>
  );
};

export const WhatIsASolidRenderer = ({ step, isAnimationOn }: { step: GuidedLessonStep, isAnimationOn: boolean, progress: number }) => {
  const action = step.actions[0]?.type || 'PHASE_GAS';

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <ParticleSystem phase={action} isAnimationOn={isAnimationOn} />
      <OrbitControls enableZoom={false} />
      
      {/* Container visual */}
      <mesh position={[0, -3, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 10]} />
        <meshStandardMaterial color="#334155" transparent opacity={0.5} />
      </mesh>
    </>
  );
};
