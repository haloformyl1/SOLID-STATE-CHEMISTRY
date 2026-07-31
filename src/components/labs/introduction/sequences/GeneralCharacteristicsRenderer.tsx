import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { GuidedLessonStep } from '../engine/GuidedLessonTypes';

const SolidBlock = ({ phase, progress, isAnimationOn }: { phase: string, progress: number, isAnimationOn: boolean }) => {
  const particlesRef = useRef<THREE.Mesh[]>([]);
  
  const gridSize = 3;
  const spacing = 0.8;
  const count = gridSize * gridSize * gridSize;

  const positions = useMemo(() => {
    const pos = [];
    const offset = (gridSize - 1) * spacing / 2;
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          pos.push(new THREE.Vector3(x * spacing - offset, y * spacing - offset, z * spacing - offset));
        }
      }
    }
    return pos;
  }, []);

  const forceLines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (positions[i].distanceTo(positions[j]) <= spacing * 1.1) {
          lines.push([positions[i], positions[j]]);
        }
      }
    }
    return lines;
  }, [positions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const isVibrating = phase === 'SHOW_VIBRATION' && isAnimationOn;

    particlesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      let targetPos = positions[i].clone();

      if (isVibrating) {
        targetPos.x += Math.sin(t * 20 + i) * 0.05;
        targetPos.y += Math.cos(t * 20 + i) * 0.05;
        targetPos.z += Math.sin(t * 22 + i) * 0.05;
      }
      
      mesh.position.lerp(targetPos, 0.1);
    });
  });

  return (
    <group>
      {/* Particles */}
      <group position={phase === 'SHOW_SHAPE' ? [Math.sin(progress * Math.PI) * 2, Math.abs(Math.cos(progress * Math.PI)) * 2, 0] : [0,0,0]}>
        {positions.map((pos, i) => (
          <Sphere key={i} args={[0.25, 16, 16]} position={pos} ref={(el: THREE.Mesh | null) => { if(el) particlesRef.current[i] = el; }}>
            <meshStandardMaterial color="#ef4444" roughness={0.2} />
          </Sphere>
        ))}

        {/* Forces */}
        {phase === 'SHOW_FORCES' && forceLines.map((line, i) => (
          <Line key={i} points={line} color="#fca5a5" lineWidth={2} transparent opacity={Math.min(progress * 2, 1)} />
        ))}
      </group>

      {/* Containers for SHOW_SHAPE */}
      {phase === 'SHOW_SHAPE' && (
        <group>
          <Box args={[3, 1, 3]} position={[-2, -1, 0]}>
            <meshStandardMaterial color="#94a3b8" transparent opacity={0.3} />
          </Box>
          <Box args={[2, 3, 2]} position={[2, -1, 0]}>
            <meshStandardMaterial color="#94a3b8" transparent opacity={0.3} />
          </Box>
        </group>
      )}

      {/* Piston for SHOW_INCOMPRESSIBLE */}
      {phase === 'SHOW_INCOMPRESSIBLE' && (
        <group position={[0, 1.5 - Math.sin(progress * Math.PI) * 0.2, 0]}>
          <Box args={[3, 0.2, 3]}>
            <meshStandardMaterial color="#64748b" />
          </Box>
          <Box args={[0.2, 2, 0.2]} position={[0, 1, 0]}>
            <meshStandardMaterial color="#64748b" />
          </Box>
        </group>
      )}
    </group>
  );
};

export const GeneralCharacteristicsRenderer = ({ step, isAnimationOn, progress }: { step: GuidedLessonStep, isAnimationOn: boolean, progress: number }) => {
  const action = step.actions[0]?.type || 'SHOW_SHAPE';

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <SolidBlock phase={action} progress={progress} isAnimationOn={isAnimationOn} />
      <OrbitControls enableZoom={action === 'SHOW_DISTANCE' || action === 'SHOW_FORCES'} />
    </>
  );
};
