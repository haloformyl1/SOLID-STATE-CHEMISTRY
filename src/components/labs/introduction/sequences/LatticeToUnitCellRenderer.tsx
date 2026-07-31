import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import type { GuidedLessonStep } from '../engine/GuidedLessonTypes';

const CrystalLattice = ({ phase, progress, isAnimationOn }: { phase: string, progress: number, isAnimationOn: boolean }) => {
  const particlesRef = useRef<THREE.Mesh[]>([]);
  
  const gridSize = 4;
  const spacing = 1.2;
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

  const latticeLines = useMemo(() => {
    const lines = [];
    // draw grid lines connecting adjacent points
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const d = positions[i].distanceTo(positions[j]);
        if (Math.abs(d - spacing) < 0.01) {
          lines.push([positions[i], positions[j]]);
        }
      }
    }
    return lines;
  }, [positions]);

  const unitCellIndices = useMemo(() => {
    const indices = [];
    for (let i = 0; i < count; i++) {
      const p = positions[i];
      // Pick a small 2x2x2 block at bottom-left-front as the unit cell
      if (p.x <= -spacing/2 && p.y <= -spacing/2 && p.z >= spacing/2) {
        indices.push(i);
      }
    }
    return indices; // Should be 8 points
  }, [positions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    particlesRef.current.forEach((mesh, i) => {
      if (!mesh) return;

      const isUnitCell = unitCellIndices.includes(i);
      
      let scale = 1;
      let opacity = 1;
      let transparent = false;

      if (phase === 'SHOW_ATOMS') {
        scale = 0.55; // large atoms touching
      } else if (phase === 'SHRINK_TO_POINTS') {
        scale = 0.55 - (progress * 0.45); // shrinks to 0.1
      } else if (phase === 'SHOW_LATTICE_LINES') {
        scale = 0.1;
      } else if (phase === 'HIGHLIGHT_UNIT_CELL') {
        scale = 0.1;
        if (!isUnitCell) {
          transparent = true;
          opacity = 1 - (progress * 0.8); // fade out rest
        } else {
          scale = 0.1 + (Math.sin(t * 5) * 0.02 * (isAnimationOn ? 1 : 0)); // pulse unit cell
        }
      } else if (phase === 'REBUILD_LATTICE') {
        scale = 0.1;
        if (!isUnitCell) {
          transparent = true;
          opacity = 0.2 + (progress * 0.8); // fade back in
        }
      }

      mesh.scale.set(scale, scale, scale);
      
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.transparent = transparent;
      material.opacity = opacity;
      if (isUnitCell && phase === 'HIGHLIGHT_UNIT_CELL') {
        material.color.setHex(0xfde047); // yellow highlight
      } else {
        material.color.setHex(0x3b82f6); // blue
      }
    });
  });

  return (
    <group>
      {positions.map((pos, i) => (
        <Sphere key={i} args={[1, 32, 32]} position={pos} ref={(el: THREE.Mesh | null) => { if(el) particlesRef.current[i] = el; }}>
          <meshStandardMaterial color="#3b82f6" roughness={0.3} />
        </Sphere>
      ))}

      {(phase === 'SHOW_LATTICE_LINES' || phase === 'HIGHLIGHT_UNIT_CELL' || phase === 'REBUILD_LATTICE') && (
        <group>
          {latticeLines.map((line, i) => {
            const isUnitCellLine = unitCellIndices.includes(positions.indexOf(line[0])) && unitCellIndices.includes(positions.indexOf(line[1]));
            let lineOpacity = 0;
            
            if (phase === 'SHOW_LATTICE_LINES') lineOpacity = progress;
            else if (phase === 'HIGHLIGHT_UNIT_CELL') lineOpacity = isUnitCellLine ? 1 : (1 - progress * 0.8);
            else if (phase === 'REBUILD_LATTICE') lineOpacity = isUnitCellLine ? 1 : (0.2 + progress * 0.8);

            return (
              <Line key={i} points={line} color={isUnitCellLine && phase === 'HIGHLIGHT_UNIT_CELL' ? '#fde047' : '#94a3b8'} lineWidth={isUnitCellLine && phase === 'HIGHLIGHT_UNIT_CELL' ? 3 : 1} transparent opacity={lineOpacity} />
            );
          })}
        </group>
      )}
    </group>
  );
};

export const LatticeToUnitCellRenderer = ({ step, isAnimationOn, progress }: { step: GuidedLessonStep, isAnimationOn: boolean, progress: number }) => {
  const action = step.actions[0]?.type || 'SHOW_ATOMS';

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <CrystalLattice phase={action} progress={progress} isAnimationOn={isAnimationOn} />
      <OrbitControls autoRotate={isAnimationOn && action !== 'HIGHLIGHT_UNIT_CELL'} autoRotateSpeed={0.5} enablePan={false} />
    </>
  );
};
