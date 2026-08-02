import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';
import * as THREE from 'three';

export const VoidCrossSection: React.FC = () => {
  const [voidType, setVoidType] = useState<'tetrahedral' | 'octahedral'>('tetrahedral');
  
  const r = 1;

  // A layer: 3 spheres forming a triangle
  const layerA = [
    new THREE.Vector3(0, Math.sqrt(3)*r*2/3, 0),
    new THREE.Vector3(-r, -Math.sqrt(3)*r/3, 0),
    new THREE.Vector3(r, -Math.sqrt(3)*r/3, 0)
  ];

  // B layer for Tetrahedral: 1 sphere right in the middle
  const layerBTetra = [
    new THREE.Vector3(0, 0, Math.sqrt(8/3)*r)
  ];

  // B layer for Octahedral: 3 spheres forming an inverted triangle
  const layerBOcta = [
    new THREE.Vector3(0, -Math.sqrt(3)*r*2/3, Math.sqrt(8/3)*r),
    new THREE.Vector3(-r, Math.sqrt(3)*r/3, Math.sqrt(8/3)*r),
    new THREE.Vector3(r, Math.sqrt(3)*r/3, Math.sqrt(8/3)*r)
  ];

  const layerB = voidType === 'tetrahedral' ? layerBTetra : layerBOcta;
  
  // Void marker center
  const voidCenter = voidType === 'tetrahedral' 
    ? new THREE.Vector3(0, 0, Math.sqrt(8/3)*r / 4) // Center of tetrahedron
    : new THREE.Vector3(0, 0, Math.sqrt(8/3)*r / 2); // Center of octahedron

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-100 bg-[var(--surf-elev)] p-4 rounded-xl border border-[var(--border-sub)]">
        <div>
          <h4 className="font-bold text-[var(--text-str)]">
            <BilingualText en="Voids Between A and B Layers" bn="A এবং B স্তরের মধ্যে শূন্যস্থান" />
          </h4>
          <p className="text-sm text-[var(--text-mut)] mt-1">
            <BilingualText en="A translucent red sphere indicates the empty void space." bn="একটি স্বচ্ছ লাল গোলক ফাঁকা শূন্যস্থান নির্দেশ করে।" />
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[var(--bg-sec)] p-1.5 rounded-lg border border-[var(--border-sub)] shadow-sm mt-4 sm:mt-0">
          <button
            onClick={() => setVoidType('tetrahedral')}
            className={`px-4 py-1.5 rounded-md font-bold text-sm transition-all ${
              voidType === 'tetrahedral' 
                ? 'bg-purple-500 text-white shadow' 
                : 'text-[var(--text-mut)] hover:bg-slate-100 dark:hover:bg-[var(--bg-canvas,transparent)]'
            }`}
          >
            <BilingualText en="Tetrahedral (TV)" bn="চতুস্তলকীয় (TV)" />
          </button>
          <button
            onClick={() => setVoidType('octahedral')}
            className={`px-4 py-1.5 rounded-md font-bold text-sm transition-all ${
              voidType === 'octahedral' 
                ? 'bg-pink-500 text-white shadow' 
                : 'text-[var(--text-mut)] hover:bg-slate-100 dark:hover:bg-[var(--bg-canvas,transparent)]'
            }`}
          >
            <BilingualText en="Octahedral (OV)" bn="অষ্টতলকীয় (OV)" />
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-[var(--bg-canvas,transparent)] h-80 rounded-xl overflow-hidden relative border-2 border-[var(--border-sub)] shadow-inner">
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, -5, 5], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={0.8} />
            
            {/* A Layer */}
            {layerA.map((p, i) => (
              <Sphere key={`a-${i}`} position={p} args={[0.95, 16, 16]}>
                <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} roughness={0.2} metalness={0.1} />
              </Sphere>
            ))}

            {/* B Layer */}
            {layerB.map((p, i) => (
              <Sphere key={`b-${i}`} position={p} args={[0.95, 16, 16]}>
                <meshStandardMaterial color="#10b981" transparent opacity={0.6} roughness={0.2} metalness={0.1} />
              </Sphere>
            ))}

            {/* Void Marker */}
            <Sphere position={voidCenter} args={[voidType === 'tetrahedral' ? 0.3 : 0.4, 16, 16]}>
              <meshStandardMaterial color="#ef4444" transparent opacity={0.9} emissive="#ef4444" emissiveIntensity={0.5} />
            </Sphere>
            
            <OrbitControls makeDefault />
          </Canvas>

          <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
            <div className="flex items-center gap-2 bg-[var(--bg-canvas,transparent)]/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-600 text-xs text-white">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div> A Layer (Bottom)
            </div>
            <div className="flex items-center gap-2 bg-[var(--bg-canvas,transparent)]/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-600 text-xs text-white">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div> B Layer (Top)
            </div>
            <div className="flex items-center gap-2 bg-[var(--bg-canvas,transparent)]/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-600 text-xs text-white">
              <div className="w-3 h-3 rounded-full bg-red-500"></div> Void Space
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
