import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';
import * as THREE from 'three';
import { Layers } from 'lucide-react';

interface Packing3DHexProps {
  packingType: 'hcp' | 'ccp';
}

export const Packing3DHex: React.FC<Packing3DHexProps> = ({ packingType }) => {
  const [layers, setLayers] = useState(1);
  const [exploded, setExploded] = useState(false);
  const size = 3; 

  const particles = useMemo(() => {
    const arr = [];
    let idx = 0;
    const r = 1;
    const d = 2 * r;
    const zOffsetDist = Math.sqrt(8/3) * r; // distance between layers vertically

    for (let z = 0; z < layers; z++) {
      // Determine layer shift type: 
      // For HCP: A B A B -> 0 1 0 1
      // For CCP: A B C A B C -> 0 1 2 0 1 2
      const layerType = packingType === 'hcp' ? z % 2 : z % 3;
      
      let xShift = 0;
      let yShift = 0;
      
      if (layerType === 1) { // B layer
        xShift = r;
        yShift = Math.sqrt(3) * r / 3;
      } else if (layerType === 2) { // C layer
        xShift = r;
        yShift = -(Math.sqrt(3) * r / 3);
      }

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const xPos = x * d + (y % 2 !== 0 ? r : 0) + xShift;
          const yPos = y * Math.sqrt(3) * r + yShift;
          const zPos = z * zOffsetDist;

          const isCenter = x === 1 && y === 1 && z === 1;

          arr.push({
            id: idx++,
            layerIndex: z,
            layerType,
            position: new THREE.Vector3(xPos, yPos, zPos),
            isCenter
          });
        }
      }
    }
    
    // Center the whole cluster
    if (arr.length > 0) {
      const box = new THREE.Box3().setFromPoints(arr.map(p => p.position));
      const center = box.getCenter(new THREE.Vector3());
      arr.forEach(p => p.position.sub(center));
    }
    
    return arr;
  }, [layers, packingType]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full text-indigo-600 dark:text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200">
              {packingType === 'hcp' ? (
                <BilingualText en="HCP: ABAB... Stacking" bn="HCP: ABAB... স্তরবিন্যাস" />
              ) : (
                <BilingualText en="CCP: ABCABC... Stacking" bn="CCP: ABCABC... স্তরবিন্যাস" />
              )}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {packingType === 'hcp' ? (
                <BilingualText en="Third layer is directly above the first layer." bn="তৃতীয় স্তরটি প্রথম স্তরের ঠিক উপরে থাকে।" />
              ) : (
                <BilingualText en="Third layer is in a new position (C). Fourth is above first." bn="তৃতীয় স্তরটি নতুন অবস্থানে (C) থাকে। চতুর্থটি প্রথমটির উপরে থাকে।" />
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
            {[1, 2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => setLayers(num)}
                className={`px-3 py-1.5 rounded-md font-bold text-sm transition-all ${
                  layers === num 
                    ? 'bg-indigo-500 text-white shadow' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300">
            <input type="checkbox" checked={exploded} onChange={e => setExploded(e.target.checked)} className="rounded text-indigo-500" />
            <BilingualText en="Exploded View" bn="বিস্ফোরিত দৃশ্য" />
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-slate-900 h-[28rem] rounded-xl overflow-hidden relative border-2 border-slate-700 shadow-inner">
          <Canvas camera={{ position: [12, 12, 12], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={0.8} />
            <directionalLight position={[-10, -10, -10]} intensity={0.3} color="#4338ca" />
            
            {particles.map((p) => {
              // Colors based on layer type (A, B, C)
              const color = p.layerType === 0 ? '#3b82f6' : p.layerType === 1 ? '#10b981' : '#f59e0b';
              const opacity = 0.95;
              
              // Apply exploded view offset
              const displayPos = p.position.clone();
              if (exploded) {
                displayPos.z += (p.layerIndex - (layers-1)/2) * 2; // Separate layers along Z
              }

              return (
                <React.Fragment key={p.id}>
                  <Sphere position={displayPos} args={[0.95, 32, 32]}>
                    <meshStandardMaterial color={p.isCenter && !exploded ? '#ef4444' : color} transparent opacity={opacity} roughness={0.2} metalness={0.1} />
                  </Sphere>
                  
                  {/* Highlight CN=12 connections if layers=3 and not exploded */}
                  {layers === 3 && !exploded && p.isCenter === false && p.position.lengthSq() < 4.1 && (
                    <Line points={[[0,0,0], p.position.toArray()]} color="white" lineWidth={2} />
                  )}
                </React.Fragment>
              );
            })}
            
            <OrbitControls makeDefault />
          </Canvas>

          {layers === 3 && !exploded && (
            <div className="absolute bottom-4 left-4 right-4 bg-indigo-900/80 backdrop-blur border border-indigo-500/30 p-3 rounded-lg text-indigo-100 shadow-lg animate-fade-in-up">
              <h4 className="font-bold mb-1 flex items-center gap-2">
                <BilingualText en="Coordination Number = 12" bn="সমন্বয় সংখ্যা = ১২" />
              </h4>
              <p className="text-sm text-indigo-200">
                <BilingualText 
                  en="The central red atom is touched by 6 atoms in its plane, 3 above, and 3 below." 
                  bn="কেন্দ্রীয় লাল পরমাণুটি তার নিজস্ব তলে ৬টি, উপরে ৩টি এবং নিচে ৩টি পরমাণুর স্পর্শে থাকে।" 
                />
              </p>
            </div>
          )}

          <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-600 text-xs text-white">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div> A Layer
            </div>
            {layers >= 2 && (
              <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-600 text-xs text-white">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div> B Layer
              </div>
            )}
            {layers >= 3 && packingType === 'ccp' && (
              <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-600 text-xs text-white">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div> C Layer
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
