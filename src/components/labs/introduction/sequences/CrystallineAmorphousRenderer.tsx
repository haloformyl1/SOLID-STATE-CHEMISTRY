import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';
import type { GuidedLessonStep } from '../engine/GuidedLessonTypes';

const ParticleGrid = ({ isCrystalline, phase, progress, isAnimationOn }: { isCrystalline: boolean, phase: string, progress: number, isAnimationOn: boolean }) => {
  const particlesRef = useRef<THREE.Mesh[]>([]);
  
  const count = 36;
  const spacing = 0.8;
  
  const initialPositions = useMemo(() => {
    const pos = [];
    for(let i=0; i<count; i++) {
      const x = (i % 6) - 2.5;
      const y = Math.floor(i / 6) - 2.5;
      pos.push(new THREE.Vector3(x * spacing, y * spacing, 0));
    }
    return pos;
  }, []);

  const randomOffsets = useMemo(() => {
    return initialPositions.map(() => new THREE.Vector3((Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 0.7, 0));
  }, [initialPositions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    particlesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const base = initialPositions[i];
      const offset = randomOffsets[i];
      
      let targetPos = base.clone();

      if (phase === 'STATE_LIQUID') {
        targetPos.x += Math.sin(t * 2 + i) * 1.5;
        targetPos.y += Math.cos(t * 2.5 + i) * 1.5;
      } else if (phase === 'COOL_CRYSTALLINE' || phase === 'COOL_AMORPHOUS' || phase === 'SHOW_CLEAVAGE') {
        if (!isCrystalline && (phase === 'COOL_AMORPHOUS' || phase === 'SHOW_CLEAVAGE')) {
          targetPos.add(offset);
        }
        
        if (phase === 'SHOW_CLEAVAGE') {
          const fractureDist = progress * 2;
          if (isCrystalline) {
            if (base.y > 0) targetPos.y += fractureDist;
            else targetPos.y -= fractureDist;
          } else {
            // Irregular
            const isTop = (base.y + offset.y) > (Math.sin(base.x * 2) * 0.5);
            if (isTop) targetPos.y += fractureDist;
            else targetPos.y -= fractureDist;
          }
        } else if (isAnimationOn) {
          // just vibrate
          targetPos.x += Math.sin(t * 20 + i) * 0.05;
          targetPos.y += Math.cos(t * 20 + i) * 0.05;
        }
      } else if (phase === 'SHOW_MELTING') {
        if (!isCrystalline) {
          targetPos.add(offset);
        }
        
        const meltPoint = isCrystalline ? 0.7 : 0.3; // Amorphous melts earlier (lower progress)
        if (progress > meltPoint) {
          const disorder = (progress - meltPoint) * 3;
          targetPos.x += Math.sin(t * 10 + i) * disorder;
          targetPos.y += Math.cos(t * 12 + i) * disorder;
        } else if (isAnimationOn) {
          targetPos.x += Math.sin(t * 20 + i) * progress * 0.2;
          targetPos.y += Math.cos(t * 20 + i) * progress * 0.2;
        }
      }

      mesh.position.lerp(targetPos, 0.1);
    });
  });

  return (
    <group>
      {initialPositions.map((_, i) => (
        <Sphere key={i} args={[0.3, 16, 16]} ref={(el: THREE.Mesh | null) => { if(el) particlesRef.current[i] = el; }}>
          <meshStandardMaterial color={isCrystalline ? '#8b5cf6' : '#f59e0b'} roughness={0.2} metalness={0.1} />
        </Sphere>
      ))}
      
      {phase === 'SHOW_MELTING' && (
        <Box args={[6, 0.2, 1]} position={[0, -2.5, 0]}>
          <meshBasicMaterial color="#ef4444" transparent opacity={progress * 0.8} />
        </Box>
      )}
    </group>
  );
};

export const CrystallineAmorphousRenderer = ({ step, isAnimationOn, progress }: { step: GuidedLessonStep, isAnimationOn: boolean, progress: number }) => {
  const action = step.actions[0]?.type || 'STATE_LIQUID';

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />
      
      <group position={[-3, 0, 0]}>
        <ParticleGrid isCrystalline={true} phase={action} progress={progress} isAnimationOn={isAnimationOn} />
      </group>
      <group position={[3, 0, 0]}>
        <ParticleGrid isCrystalline={false} phase={action} progress={progress} isAnimationOn={isAnimationOn} />
      </group>
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};
