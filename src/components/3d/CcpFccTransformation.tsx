import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { BilingualText } from '../BilingualText';
import * as THREE from 'three';

export const CcpFccTransformation: React.FC = () => {
  const [showBox, setShowBox] = useState(false);
  
  // This is a simplified conceptual animation of CCP layers fitting into an FCC box
  // We'll show an FCC unit cell and highlight the {111} planes (A, B, C layers)
  
  const a = 3;
  const halfA = a / 2;
  const r = 0.5;

  const corners = [
    new THREE.Vector3(-halfA, -halfA, -halfA),
    new THREE.Vector3(halfA, -halfA, -halfA),
    new THREE.Vector3(-halfA, halfA, -halfA),
    new THREE.Vector3(halfA, halfA, -halfA),
    new THREE.Vector3(-halfA, -halfA, halfA),
    new THREE.Vector3(halfA, -halfA, halfA),
    new THREE.Vector3(-halfA, halfA, halfA),
    new THREE.Vector3(halfA, halfA, halfA)
  ];

  const faces = [
    new THREE.Vector3(0, 0, halfA),
    new THREE.Vector3(0, 0, -halfA),
    new THREE.Vector3(halfA, 0, 0),
    new THREE.Vector3(-halfA, 0, 0),
    new THREE.Vector3(0, halfA, 0),
    new THREE.Vector3(0, -halfA, 0)
  ];

  const allAtoms = [...corners, ...faces];

  // Group atoms by their projection on the (1,1,1) diagonal to show A, B, C layers
  const layerA: THREE.Vector3[] = [];
  const layerB: THREE.Vector3[] = [];
  const layerC: THREE.Vector3[] = [];
  const layerD: THREE.Vector3[] = []; // Top corner

  allAtoms.forEach(p => {
    // Normal vector to (111) plane is (1,1,1)
    // Distance = (x+y+z) / sqrt(3)
    const dist = (p.x + p.y + p.z) / Math.sqrt(3);
    
    if (dist < -1) layerA.push(p); // Bottom corner
    else if (dist < 0) layerB.push(p);
    else if (dist < 1) layerC.push(p);
    else layerD.push(p); // Top corner
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700">
        <div>
          <h4 className="font-bold text-slate-800 dark:text-slate-200">
            <BilingualText en="CCP to FCC Relationship" bn="CCP থেকে FCC সম্পর্ক" />
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            <BilingualText en="The A, B, and C close-packed layers are the {111} planes of the FCC unit cell." bn="A, B এবং C ঘন সন্নিবিষ্ট স্তরগুলি হলো FCC একক কোষের {111} তল।" />
          </p>
        </div>

        <label className="flex items-center gap-2 cursor-pointer bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm mt-4 sm:mt-0">
          <input type="checkbox" checked={showBox} onChange={e => setShowBox(e.target.checked)} className="rounded text-indigo-500" />
          <span className="font-medium text-sm text-slate-700 dark:text-slate-300">
            <BilingualText en="Show FCC Unit Cell Box" bn="FCC একক কোষ বাক্স দেখান" />
          </span>
        </label>
      </div>

      <div className="h-80 bg-slate-900 rounded-xl overflow-hidden relative border-2 border-slate-700 shadow-inner">
        <Canvas camera={{ position: [6, 6, 6], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={0.8} />
          
          {showBox && (
            <group>
              <lineSegments>
                <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(a, a, a)]} />
                <lineBasicMaterial attach="material" color="#94a3b8" linewidth={2} />
              </lineSegments>
            </group>
          )}

          {/* Layer A (Corner) */}
          {layerA.map((p, i) => (
            <Sphere key={`a-${i}`} position={p} args={[r, 32, 32]}>
              <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.1} />
            </Sphere>
          ))}

          {/* Layer B */}
          {layerB.map((p, i) => (
            <Sphere key={`b-${i}`} position={p} args={[r, 32, 32]}>
              <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.1} />
            </Sphere>
          ))}

          {/* Layer C */}
          {layerC.map((p, i) => (
            <Sphere key={`c-${i}`} position={p} args={[r, 32, 32]}>
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.1} />
            </Sphere>
          ))}
          
          {/* Layer D (Top Corner - actually Layer A repeating) */}
          {layerD.map((p, i) => (
            <Sphere key={`d-${i}`} position={p} args={[r, 32, 32]}>
              <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.1} />
            </Sphere>
          ))}

          <OrbitControls makeDefault />
        </Canvas>

        <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
          <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-600 text-xs text-white">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div> A Layer (Corners)
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-600 text-xs text-white">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div> B Layer
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-600 text-xs text-white">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div> C Layer
          </div>
        </div>
      </div>
    </div>
  );
};
