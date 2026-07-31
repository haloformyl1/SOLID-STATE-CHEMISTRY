import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { GuidedLessonStep } from '../engine/GuidedLessonTypes';

const AnisotropyGrid = ({ phase, progress, isAnimationOn }: { phase: string, progress: number, isAnimationOn: boolean }) => {
  const particlesRef = useRef<THREE.Mesh[]>([]);
  const gridSize = 6;
  const spacing = 1.0;
  
  const initialPositions = useMemo(() => {
    const pos = [];
    const offset = (gridSize - 1) * spacing / 2;
    for(let x = 0; x < gridSize; x++) {
      for(let y = 0; y < gridSize; y++) {
        pos.push(new THREE.Vector3(x * spacing - offset, y * spacing - offset, 0));
      }
    }
    return pos;
  }, []);

  const types = useMemo(() => {
    return initialPositions.map((_, i) => {
      const x = i % gridSize;
      const y = Math.floor(i / gridSize);
      return (x + y) % 2 === 0 ? 'A' : 'B'; // A=Red, B=Blue
    });
  }, [initialPositions]);

  const randomOffsets = useMemo(() => {
    return initialPositions.map(() => new THREE.Vector3((Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 1.2, 0));
  }, [initialPositions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    particlesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const base = initialPositions[i];
      let targetPos = base.clone();

      if (phase === 'SHOW_ISOTROPY') {
        targetPos.add(randomOffsets[i]);
        if (isAnimationOn) {
          targetPos.x += Math.sin(t * 2 + i) * 0.1;
          targetPos.y += Math.cos(t * 2.5 + i) * 0.1;
        }
      } else if (isAnimationOn) {
        targetPos.x += Math.sin(t * 10 + i) * 0.02;
        targetPos.y += Math.cos(t * 10 + i) * 0.02;
      }

      mesh.position.lerp(targetPos, 0.1);
    });
  });

  const abLineStart = new THREE.Vector3(-3.5, 0, 0.2);
  const abLineEnd = new THREE.Vector3(3.5, 0, 0.2);
  
  const cdLineStart = new THREE.Vector3(-3.5, -3.5, 0.2);
  const cdLineEnd = new THREE.Vector3(3.5, 3.5, 0.2);

  const renderProgressLine = (start: THREE.Vector3, end: THREE.Vector3, prog: number, color: string) => {
    const currentEnd = new THREE.Vector3().lerpVectors(start, end, prog);
    return (
      <group>
        <Line points={[start, currentEnd]} color={color} lineWidth={4} />
        <Sphere args={[0.1]} position={currentEnd}>
          <meshBasicMaterial color={color} />
        </Sphere>
      </group>
    );
  };

  return (
    <group>
      {initialPositions.map((_, i) => (
        <Sphere key={i} args={[0.3, 16, 16]} ref={(el: THREE.Mesh | null) => { if(el) particlesRef.current[i] = el; }}>
          <meshStandardMaterial color={types[i] === 'A' ? '#ef4444' : '#3b82f6'} roughness={0.2} metalness={0.1} />
        </Sphere>
      ))}

      {phase === 'PROBE_AB' && renderProgressLine(abLineStart, abLineEnd, progress, '#ffffff')}
      {phase === 'PROBE_CD' && renderProgressLine(cdLineStart, cdLineEnd, progress, '#fde047')}
      
      {phase === 'COMPARE_BOTH' && (
        <group>
          <Line points={[abLineStart, abLineEnd]} color="#ffffff" lineWidth={4} />
          <Line points={[cdLineStart, cdLineEnd]} color="#fde047" lineWidth={4} />
        </group>
      )}

      {phase === 'SHOW_ISOTROPY' && (
        <group>
          {renderProgressLine(abLineStart, abLineEnd, progress, '#ffffff')}
          {renderProgressLine(new THREE.Vector3(-2, 3, 0.2), new THREE.Vector3(2, -3, 0.2), progress, '#fde047')}
        </group>
      )}
    </group>
  );
};

export const AnisotropyRenderer = ({ step, isAnimationOn, progress }: { step: GuidedLessonStep, isAnimationOn: boolean, progress: number }) => {
  const action = step.actions[0]?.type || 'SHOW_CRYSTAL';

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />
      <AnisotropyGrid phase={action} progress={progress} isAnimationOn={isAnimationOn} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
};
