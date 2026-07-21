import React, { useMemo } from 'react';
import { Sphere, Line } from '@react-three/drei';

export type UnitCellType = 'SC' | 'BCC' | 'FCC';

interface UnitCellProps {
  type: UnitCellType;
  edgeLength?: number;
  showBox?: boolean;
  opacity?: number;
  color?: string;
  exploded?: boolean;
}

export const UnitCell: React.FC<UnitCellProps> = ({
  type,
  edgeLength = 4,
  showBox = true,
  opacity = 1,
  color = '#3b82f6', // blue-500
  exploded = false
}) => {
  const a = edgeLength;
  const halfA = a / 2;
  
  // Calculate physically accurate radius for hard-sphere model
  const r = useMemo(() => {
    switch (type) {
      case 'SC': return a / 2;
      case 'BCC': return (Math.sqrt(3) * a) / 4;
      case 'FCC': return (Math.sqrt(2) * a) / 4;
      default: return a / 2;
    }
  }, [type, a]);

  // Explode factor
  const ef = exploded ? 1.5 : 1.0;

  // Atom positions
  const positions: [number, number, number][] = useMemo(() => {
    const corners: [number, number, number][] = [
      [-halfA, -halfA, -halfA],
      [halfA, -halfA, -halfA],
      [-halfA, halfA, -halfA],
      [halfA, halfA, -halfA],
      [-halfA, -halfA, halfA],
      [halfA, -halfA, halfA],
      [-halfA, halfA, halfA],
      [halfA, halfA, halfA],
    ];

    if (type === 'SC') return corners;

    if (type === 'BCC') {
      return [...corners, [0, 0, 0]]; // Body center
    }

    if (type === 'FCC') {
      const faces: [number, number, number][] = [
        [0, 0, halfA], [0, 0, -halfA], // Front/Back
        [0, halfA, 0], [0, -halfA, 0], // Top/Bottom
        [halfA, 0, 0], [-halfA, 0, 0]  // Right/Left
      ];
      return [...corners, ...faces];
    }

    return corners;
  }, [type, halfA]);

  return (
    <group position={[0, halfA, 0]}>
      {/* Box */}
      {showBox && (
        <group>
          {/* Top/Bottom/Sides edges - simplifying using Line segments */}
          {[
            [[-halfA,-halfA,-halfA], [halfA,-halfA,-halfA]],
            [[halfA,-halfA,-halfA], [halfA,halfA,-halfA]],
            [[halfA,halfA,-halfA], [-halfA,halfA,-halfA]],
            [[-halfA,halfA,-halfA], [-halfA,-halfA,-halfA]],

            [[-halfA,-halfA,halfA], [halfA,-halfA,halfA]],
            [[halfA,-halfA,halfA], [halfA,halfA,halfA]],
            [[halfA,halfA,halfA], [-halfA,halfA,halfA]],
            [[-halfA,halfA,halfA], [-halfA,-halfA,halfA]],

            [[-halfA,-halfA,-halfA], [-halfA,-halfA,halfA]],
            [[halfA,-halfA,-halfA], [halfA,-halfA,halfA]],
            [[halfA,halfA,-halfA], [halfA,halfA,halfA]],
            [[-halfA,halfA,-halfA], [-halfA,halfA,halfA]],
          ].map((pts, i) => (
             <Line key={i} points={pts as [number,number,number][]} color="#94a3b8" lineWidth={2} />
          ))}
        </group>
      )}

      {/* Atoms */}
      {positions.map((pos, i) => (
        <Sphere 
          key={i} 
          position={[pos[0] * ef, pos[1] * ef, pos[2] * ef]} 
          args={[r, 32, 32]}
        >
          <meshStandardMaterial 
            color={color} 
            transparent={opacity < 1} 
            opacity={opacity} 
            metalness={0.2} 
            roughness={0.3} 
          />
        </Sphere>
      ))}
    </group>
  );
};
