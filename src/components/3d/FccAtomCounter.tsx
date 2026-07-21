import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { BilingualText } from '../BilingualText';
import * as THREE from 'three';

export const FccAtomCounter: React.FC = () => {
  const [step, setStep] = useState(0);

  const a = 2;
  const r = 0.5;
  const halfA = a / 2;

  // Corners: 8
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

  // Faces: 6
  const faces = [
    new THREE.Vector3(0, 0, halfA),
    new THREE.Vector3(0, 0, -halfA),
    new THREE.Vector3(halfA, 0, 0),
    new THREE.Vector3(-halfA, 0, 0),
    new THREE.Vector3(0, halfA, 0),
    new THREE.Vector3(0, -halfA, 0)
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 gap-4">
        <div className="flex-1">
          <h4 className="font-bold text-slate-800 dark:text-slate-200">
            <BilingualText en="FCC Effective Atoms Calculation" bn="FCC কার্যকর পরমাণু গণনা" />
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {step === 0 && <BilingualText en="Start by highlighting the different positions." bn="ভিন্ন ভিন্ন অবস্থান হাইলাইট করে শুরু করুন।" />}
            {step === 1 && <BilingualText en="8 corners shared by 8 cells each. (8 × 1/8 = 1)" bn="৮টি কোণ প্রত্যেকে ৮টি কোষ দ্বারা ভাগ করা হয়। (৮ × ১/৮ = ১)" />}
            {step === 2 && <BilingualText en="6 face-centres shared by 2 cells each. (6 × 1/2 = 3)" bn="৬টি পৃষ্ঠকেন্দ্র প্রত্যেকে ২টি কোষ দ্বারা ভাগ করা হয়। (৬ × ১/২ = ৩)" />}
            {step === 3 && <BilingualText en="Total Z = 1 + 3 = 4 effective atoms." bn="মোট Z = ১ + ৩ = ৪ কার্যকর পরমাণু।" />}
          </p>
        </div>

        <button 
          onClick={() => setStep(s => (s + 1) % 4)}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors whitespace-nowrap shadow-sm"
        >
          {step === 3 ? (
            <BilingualText en="Reset" bn="রিসেট" />
          ) : (
            <BilingualText en="Next Step" bn="পরবর্তী ধাপ" />
          )}
        </button>
      </div>

      <div className="h-80 bg-slate-900 rounded-xl overflow-hidden relative border-2 border-slate-700 shadow-inner">
        <Canvas camera={{ position: [5, 4, 5], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={0.8} />
          
          <group>
            <lineSegments>
              <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(a, a, a)]} />
              <lineBasicMaterial attach="material" color="#475569" linewidth={2} />
            </lineSegments>
          </group>

          {/* Corners */}
          {corners.map((p, i) => (
            <Sphere key={`c-${i}`} position={p} args={[r, 32, 32]}>
              <meshStandardMaterial 
                color={step === 1 || step === 3 ? "#ef4444" : "#94a3b8"} 
                transparent opacity={step === 0 || step === 1 || step === 3 ? 0.9 : 0.2} 
              />
            </Sphere>
          ))}

          {/* Faces */}
          {faces.map((p, i) => (
            <Sphere key={`f-${i}`} position={p} args={[r, 32, 32]}>
              <meshStandardMaterial 
                color={step === 2 || step === 3 ? "#3b82f6" : "#94a3b8"} 
                transparent opacity={step === 0 || step === 2 || step === 3 ? 0.9 : 0.2} 
              />
            </Sphere>
          ))}

          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </div>
  );
};
