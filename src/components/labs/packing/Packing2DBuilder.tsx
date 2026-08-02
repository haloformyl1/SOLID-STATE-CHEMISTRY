import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Box, Cone } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';
import * as THREE from 'three';
import { Plus, Minus } from 'lucide-react';

const AnimatedSphere: React.FC<any> = ({ targetPosition, color, opacity, onClick, onPointerMissed, onPointerOver, onPointerOut }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15);
      meshRef.current.position.lerp(targetPosition, 0.15);
    }
  });

  return (
    <Sphere 
      ref={meshRef}
      position={[targetPosition.x, targetPosition.y, targetPosition.z - 5]}
      args={[0.95, 32, 32]}
      scale={[0, 0, 0]}
      onClick={onClick}
      onPointerMissed={onPointerMissed}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.2} metalness={0.1} />
    </Sphere>
  );
};

const AnimatedVoid: React.FC<any> = ({ targetPosition, type }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  if (type === 'square') {
    return (
      <Box ref={meshRef} position={targetPosition} args={[0.5, 0.5, 0.5]} scale={[0,0,0]}>
        <meshStandardMaterial color="#ef4444" transparent opacity={0.6} />
      </Box>
    );
  }
  
  const rotZ = type === 'tri-up' ? 0 : Math.PI;
  return (
    <Cone ref={meshRef} position={targetPosition} rotation={[Math.PI / 2, 0, rotZ]} args={[0.4, 0.6, 3]} scale={[0,0,0]}>
      <meshStandardMaterial color={type === 'tri-up' ? '#f97316' : '#eab308'} transparent opacity={0.8} />
    </Cone>
  );
};

interface Packing2DBuilderProps {
  packingType: 'square' | 'hexagonal';
}

export const Packing2DBuilder: React.FC<Packing2DBuilderProps> = ({ packingType }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showVoids, setShowVoids] = useState(false);

  const { particles, voids } = useMemo(() => {
    const arr = [];
    const vArr = [];
    let idx = 0;
    let vIdx = 0;
    const r = 1;
    const d = 2 * r;

    const xOffset = ((cols - 1) * d + (packingType === 'hexagonal' ? r : 0)) / 2;
    const yOffset = ((rows - 1) * (packingType === 'hexagonal' ? Math.sqrt(3) * r : d)) / 2;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let xPos = x * d;
        let yPos = y * d;
        
        if (packingType === 'hexagonal') {
          xPos = x * d + (y % 2 !== 0 ? r : 0);
          yPos = y * Math.sqrt(3) * r;
        }

        arr.push({
          id: idx++,
          gridX: x,
          gridY: y,
          position: new THREE.Vector3(xPos - xOffset, yPos - yOffset, 0),
        });
      }
    }

    // Generate voids
    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols - 1; x++) {
        if (packingType === 'square') {
          const xPos = x * d + r - xOffset;
          const yPos = y * d + r - yOffset;
          vArr.push({ id: vIdx++, position: new THREE.Vector3(xPos, yPos, 0.3), type: 'square' });
        } else {
          // In hexagonal packing, every rhombic unit has 2 triangular voids
          const yPosBase = y * Math.sqrt(3) * r - yOffset;
          const xPosBase = x * d + (y % 2 !== 0 ? r : 0) - xOffset;
          
          // Triangular void pointing up
          vArr.push({ 
            id: vIdx++, 
            position: new THREE.Vector3(xPosBase + r, yPosBase + (Math.sqrt(3) * r / 3), 0.3), 
            type: 'tri-up' 
          });

          // Triangular void pointing down
          vArr.push({ 
            id: vIdx++, 
            position: new THREE.Vector3(xPosBase + d, yPosBase + (2 * Math.sqrt(3) * r / 3), 0.3), 
            type: 'tri-down' 
          });
        }
      }
    }

    return { particles: arr, voids: vArr };
  }, [rows, cols, packingType]);

  const getNeighbours = (idx: number) => {
    const p1 = particles[idx];
    if (!p1) return [];
    return particles.filter(p2 => {
      if (p1.id === p2.id) return false;
      const dist = p1.position.distanceTo(p2.position);
      return dist < 2.1;
    });
  };

  const selectedNeighbours = selectedIdx !== null ? getNeighbours(selectedIdx) : [];

  return (
    <div className="flex h-full min-h-[580px] flex-col gap-4">
      <div className="flex flex-wrap items-center justify-center gap-6 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-semibold text-slate-500 text-[var(--text-mut)]">
            <BilingualText en="Rows" bn="সারি" />
          </span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setRows(Math.max(1, rows - 1))} className="icon-button h-8 w-8 shadow"><Minus className="w-4 h-4" /></button>
            <span className="font-bold text-lg w-6 text-center">{rows}</span>
            <button type="button" onClick={() => setRows(Math.min(8, rows + 1))} className="icon-button h-8 w-8 shadow"><Plus className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-semibold text-slate-500 text-[var(--text-mut)]">
            <BilingualText en="Columns" bn="কলাম" />
          </span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setCols(Math.max(1, cols - 1))} className="icon-button h-8 w-8 shadow"><Minus className="w-4 h-4" /></button>
            <span className="font-bold text-lg w-6 text-center">{cols}</span>
            <button type="button" onClick={() => setCols(Math.min(8, cols + 1))} className="icon-button h-8 w-8 shadow"><Plus className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 ml-4 pl-6 border-l border-slate-300 border-[var(--border-str)]">
          <label className="flex items-center gap-2 cursor-pointer bg-[var(--bg-sec)] px-3 py-2 rounded-lg border border-[var(--border-sub)] shadow-sm text-sm font-medium text-[var(--text-norm)]">
            <input type="checkbox" checked={showVoids} onChange={e => setShowVoids(e.target.checked)} className="rounded accent-[var(--accent-primary)]" />
            <BilingualText en="Show Voids" bn="শূন্যস্থান দেখান" />
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
          <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
            <BilingualText en="Layer Stacking Sequence" bn="স্তরবিন্যাসের ক্রম" />
          </h4>
          <div className="flex gap-1 flex-wrap">
            {Array.from({ length: rows }).map((_, i) => (
              <span key={i} className={`px-2 py-1 text-sm font-bold rounded ${packingType === 'square' ? 'bg-blue-200 text-blue-800' : (i % 2 === 0 ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800')}`}>
                {packingType === 'square' ? 'A' : (i % 2 === 0 ? 'A' : 'B')}
              </span>
            ))}
            <span className="px-2 py-1 text-sm font-bold text-slate-400">...</span>
          </div>
        </div>

        {selectedIdx !== null && (
          <div className="flex-1 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2">
              <BilingualText en="Coordination Number" bn="সমন্বয় সংখ্যা" />
            </h4>
            <p className="text-emerald-800 dark:text-emerald-200">
              <BilingualText 
                en={`Selected particle has ${selectedNeighbours.length} nearest neighbour${selectedNeighbours.length !== 1 ? 's' : ''}.`} 
                bn={`নির্বাচিত কণাটির ${selectedNeighbours.length}টি নিকটতম প্রতিবেশী রয়েছে।`} 
              />
            </p>
          </div>
        )}
      </div>

      <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--canvas-background)] shadow-inner">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={0.8} />
          
          {particles.map((p) => {
            const isSelected = selectedIdx === p.id;
            const isNeighbour = selectedNeighbours.some(n => n.id === p.id);
            
            let color = packingType === 'square' ? '#3b82f6' : (p.gridY % 2 === 0 ? '#10b981' : '#f59e0b');
            let opacity = 1.0;

            if (selectedIdx !== null) {
              if (isSelected) color = '#ef4444';
              else if (isNeighbour) color = '#22c55e';
              else opacity = 0.3;
            }
            
            return (
              <React.Fragment key={`p-${p.id}`}>
                <AnimatedSphere 
                  targetPosition={p.position}
                  color={color}
                  opacity={opacity}
                  onClick={(e: any) => { e.stopPropagation(); setSelectedIdx(p.id); }}
                  onPointerMissed={() => setSelectedIdx(null)}
                  onPointerOver={() => document.body.style.cursor = 'pointer'}
                  onPointerOut={() => document.body.style.cursor = 'auto'}
                />
                {isSelected && isNeighbour && (
                  <Line points={[particles[selectedIdx].position.toArray(), p.position.toArray()]} color="white" lineWidth={3} />
                )}
              </React.Fragment>
            );
          })}

          {showVoids && voids.map(v => (
            <AnimatedVoid key={`v-${v.id}`} targetPosition={v.position} type={v.type} />
          ))}
          
          <OrbitControls enableRotate={false} makeDefault />
        </Canvas>
        
        <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-slate-600 bg-[#071923e8] px-3 py-1.5 text-xs text-white backdrop-blur">
          <BilingualText en="Click on a sphere" bn="একটি গোলকে ক্লিক করুন" />
        </div>
      </div>
    </div>
  );
};
