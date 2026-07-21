import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';
import * as THREE from 'three';
import { Plus, Minus } from 'lucide-react';

interface Packing2DBuilderProps {
  packingType: 'square' | 'hexagonal';
}

export const Packing2DBuilder: React.FC<Packing2DBuilderProps> = ({ packingType }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const particles = useMemo(() => {
    const arr = [];
    let idx = 0;
    const r = 1;
    const d = 2 * r;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let xPos = x * d;
        let yPos = y * d;
        
        if (packingType === 'hexagonal') {
          // In hexagonal, every second row shifts by r
          xPos = x * d + (y % 2 !== 0 ? r : 0);
          yPos = y * Math.sqrt(3) * r;
        }

        // Center the whole block roughly
        const xOffset = ((cols - 1) * d + (packingType === 'hexagonal' ? r : 0)) / 2;
        const yOffset = ((rows - 1) * (packingType === 'hexagonal' ? Math.sqrt(3) * r : d)) / 2;

        arr.push({
          id: idx++,
          gridX: x,
          gridY: y,
          position: new THREE.Vector3(xPos - xOffset, yPos - yOffset, 0),
        });
      }
    }
    return arr;
  }, [rows, cols, packingType]);

  const getNeighbours = (idx: number) => {
    const p1 = particles[idx];
    if (!p1) return [];
    return particles.filter(p2 => {
      if (p1.id === p2.id) return false;
      const dist = p1.position.distanceTo(p2.position);
      return dist < 2.1; // radius 1, diameter 2
    });
  };

  const selectedNeighbours = selectedIdx !== null ? getNeighbours(selectedIdx) : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-6 items-center justify-center bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            <BilingualText en="Rows" bn="সারি" />
          </span>
          <div className="flex items-center gap-3">
            <button onClick={() => setRows(Math.max(1, rows - 1))} className="p-1.5 bg-white dark:bg-slate-700 rounded shadow hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
            <span className="font-bold text-lg w-6 text-center">{rows}</span>
            <button onClick={() => setRows(Math.min(8, rows + 1))} className="p-1.5 bg-white dark:bg-slate-700 rounded shadow hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            <BilingualText en="Columns" bn="কলাম" />
          </span>
          <div className="flex items-center gap-3">
            <button onClick={() => setCols(Math.max(1, cols - 1))} className="p-1.5 bg-white dark:bg-slate-700 rounded shadow hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
            <span className="font-bold text-lg w-6 text-center">{cols}</span>
            <button onClick={() => setCols(Math.min(8, cols + 1))} className="p-1.5 bg-white dark:bg-slate-700 rounded shadow hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
          </div>
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

      <div className="h-80 bg-slate-900 rounded-xl overflow-hidden relative border-2 border-slate-700 shadow-inner">
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
              <React.Fragment key={p.id}>
                <Sphere 
                  position={p.position} 
                  args={[0.95, 32, 32]}
                  onClick={(e) => { e.stopPropagation(); setSelectedIdx(p.id); }}
                  onPointerMissed={() => setSelectedIdx(null)}
                  onPointerOver={() => document.body.style.cursor = 'pointer'}
                  onPointerOut={() => document.body.style.cursor = 'auto'}
                >
                  <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.2} metalness={0.1} />
                </Sphere>
                {isSelected && isNeighbour && (
                  <Line points={[particles[selectedIdx].position.toArray(), p.position.toArray()]} color="white" lineWidth={3} />
                )}
              </React.Fragment>
            );
          })}
          
          <OrbitControls enableRotate={false} makeDefault />
        </Canvas>
        
        <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full border border-slate-600 pointer-events-none">
          <BilingualText en="Click on a sphere" bn="একটি গোলকে ক্লিক করুন" />
        </div>
      </div>
    </div>
  );
};
