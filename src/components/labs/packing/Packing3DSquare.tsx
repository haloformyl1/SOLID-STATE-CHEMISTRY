import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';
import * as THREE from 'three';
import { Layers } from 'lucide-react';

export const Packing3DSquare: React.FC = () => {
  const [layers, setLayers] = useState(1);
  const size = 3; // 3x3 grid per layer

  const particles = useMemo(() => {
    const arr = [];
    let idx = 0;
    const d = 2; // diameter = 2, r = 1

    for (let z = 0; z < layers; z++) {
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const xOffset = ((size - 1) * d) / 2;
          const yOffset = ((size - 1) * d) / 2;
          // layers stack along Z axis
          arr.push({
            id: idx++,
            layerIndex: z,
            position: new THREE.Vector3(x * d - xOffset, y * d - yOffset, z * d),
            isCenter: x === 1 && y === 1 && z === 1,
            isCorner: (x === 0 || x === 2) && (y === 0 || y === 2) && (z === 0 || z === 2)
          });
        }
      }
    }
    
    // Adjust overall Z center
    const zOffset = ((layers - 1) * d) / 2;
    arr.forEach(p => p.position.z -= zOffset);
    
    return arr;
  }, [layers]);

  return (
    <div className="flex h-full min-h-[540px] flex-col gap-4">
      <div className="flex flex-col items-center justify-between rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 sm:flex-row">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-600 dark:text-blue-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-[var(--text-str)]">
              <BilingualText en="AAA Stacking (Simple Cubic)" bn="AAA স্তরবিন্যাস (সরল ঘনকাকার)" />
            </h4>
            <p className="text-sm text-[var(--text-mut)]">
              <BilingualText en="Layers exactly aligned" bn="স্তরগুলি ঠিক সারিবদ্ধ" />
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[var(--bg-sec)] p-1.5 rounded-lg border border-[var(--border-sub)] shadow-sm">
          {[1, 2, 3].map(num => (
            <button
              key={num}
              onClick={() => setLayers(num)}
              className={`px-4 py-1.5 rounded-md font-bold text-sm transition-all ${
                layers === num 
                  ? 'bg-blue-500 text-white shadow' 
                  : 'text-[var(--text-mut)] hover:bg-slate-100 dark:hover:bg-[var(--bg-canvas,transparent)]'
              }`}
            >
              <BilingualText en={`${num} Layer${num > 1 ? 's' : ''}`} bn={`${num}টি স্তর`} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative min-h-[380px] flex-1 overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--canvas-background)] shadow-inner">
          <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={0.8} />
            
            {particles.map((p) => {
              // Highlight central atom and its bonds if layers >= 3
              let color = '#3b82f6';
              let opacity = 0.9;
              
              if (layers === 3) {
                if (p.isCenter) color = '#ef4444'; // Center atom
                else if (p.position.lengthSq() < 4.1) color = '#22c55e'; // Distance 2 = neighbour
                else opacity = 0.15; // Fade others
              } else {
                // Just alternate slightly by layer for visual clarity
                color = p.layerIndex === 0 ? '#3b82f6' : p.layerIndex === 1 ? '#60a5fa' : '#93c5fd';
              }
              
              return (
                <React.Fragment key={p.id}>
                  <Sphere position={p.position} args={[0.95, 32, 32]}>
                    <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.2} metalness={0.1} />
                  </Sphere>
                  {layers === 3 && p.position.lengthSq() < 4.1 && !p.isCenter && (
                    <Line points={[[0,0,0], p.position.toArray()]} color="white" lineWidth={3} />
                  )}
                </React.Fragment>
              );
            })}
            
            {/* Draw cubic unit cell outline if layers === 2 for a basic cube */}
            {layers >= 2 && (
              <group position={[0, 0, layers === 2 ? 0 : -2]}>
                <lineSegments>
                  <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(4, 4, 4)]} />
                  <lineBasicMaterial attach="material" color="#cbd5e1" linewidth={2} transparent opacity={0.3} />
                </lineSegments>
              </group>
            )}

            <OrbitControls makeDefault />
          </Canvas>

          {layers === 3 && (
            <div className="absolute bottom-4 left-4 right-4 bg-emerald-900/80 backdrop-blur border border-emerald-500/30 p-3 rounded-lg text-emerald-100 shadow-lg animate-fade-in-up">
              <h4 className="font-bold mb-1 flex items-center gap-2">
                <BilingualText en="Coordination Number = 6" bn="সমন্বয় সংখ্যা = ৬" />
              </h4>
              <p className="text-sm text-emerald-200">
                <BilingualText 
                  en="The central red atom is touched by 4 atoms in its own plane, 1 above, and 1 below." 
                  bn="কেন্দ্রীয় লাল পরমাণুটি তার নিজস্ব তলে ৪টি, উপরে ১টি এবং নিচে ১টি পরমাণুর স্পর্শে থাকে।" 
                />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
