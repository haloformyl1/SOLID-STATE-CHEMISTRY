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
    <div className="flex h-full min-h-[520px] flex-col gap-4">
      <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 sm:flex-row sm:items-center">
        <div>
          <h4 className="font-bold text-[var(--text-primary)]">
            <BilingualText en="CCP to FCC Relationship" bn="CCP থেকে FCC সম্পর্ক" />
          </h4>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            <BilingualText en="The A, B, and C close-packed layers are the {111} planes of the FCC unit cell." bn="A, B এবং C ঘন সন্নিবিষ্ট স্তরগুলি হলো FCC একক কোষের {111} তল।" />
          </p>
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)] px-4 py-2 shadow-sm">
          <input type="checkbox" checked={showBox} onChange={e => setShowBox(e.target.checked)} className="rounded accent-[var(--accent-primary)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            <BilingualText en="Show FCC Unit Cell Box" bn="FCC একক কোষ বাক্স দেখান" />
          </span>
        </label>
      </div>

      <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--canvas-background)] shadow-inner">
        <Canvas camera={{ position: [5.1, 4.4, 5.1], fov: 42 }}>
          <ambientLight intensity={1.1} />
          <directionalLight position={[8, 10, 7]} intensity={1.25} />
          
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

          <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={4} maxDistance={13} />
        </Canvas>

        <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
          <div className="flex items-center gap-2 rounded-lg border border-slate-600 bg-[#071923e8] px-3 py-1.5 text-xs text-white backdrop-blur">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div> A Layer (Corners)
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-600 bg-[#071923e8] px-3 py-1.5 text-xs text-white backdrop-blur">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div> B Layer
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-600 bg-[#071923e8] px-3 py-1.5 text-xs text-white backdrop-blur">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div> C Layer
          </div>
        </div>
      </div>
    </div>
  );
};
