import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { BilingualText } from '../BilingualText';
import * as THREE from 'three';

export const HcpAtomCounter: React.FC = () => {
  const [step, setStep] = useState(0);

  // HCP Unit Cell
  // a = 2, c = 1.633 * a = 3.266
  const a = 2;
  const c = 3.266;
  const r = 0.5;

  // Corners: 12 (6 top, 6 bottom)
  const corners: THREE.Vector3[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    corners.push(new THREE.Vector3(a * Math.cos(angle), -c / 2, a * Math.sin(angle)));
    corners.push(new THREE.Vector3(a * Math.cos(angle), c / 2, a * Math.sin(angle)));
  }

  // Faces: 2 (top center, bottom center)
  const faces = [
    new THREE.Vector3(0, -c / 2, 0),
    new THREE.Vector3(0, c / 2, 0)
  ];

  // Body: 3
  const body = [
    new THREE.Vector3(a / Math.sqrt(3), 0, 0),
    new THREE.Vector3(-a / (2 * Math.sqrt(3)), 0, a / 2),
    new THREE.Vector3(-a / (2 * Math.sqrt(3)), 0, -a / 2)
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 gap-4">
        <div className="flex-1">
          <h4 className="font-bold text-slate-800 dark:text-slate-200">
            <BilingualText en="HCP Effective Atoms Calculation" bn="HCP কার্যকর পরমাণু গণনা" />
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {step === 0 && <BilingualText en="Start by highlighting the different positions." bn="ভিন্ন ভিন্ন অবস্থান হাইলাইট করে শুরু করুন।" />}
            {step === 1 && <BilingualText en="12 corners shared by 6 cells each. (12 × 1/6 = 2)" bn="১২টি কোণ প্রত্যেকে ৬টি কোষ দ্বারা ভাগ করা হয়। (১২ × ১/৬ = ২)" />}
            {step === 2 && <BilingualText en="2 face-centres shared by 2 cells each. (2 × 1/2 = 1)" bn="২টি পৃষ্ঠকেন্দ্র প্রত্যেকে ২টি কোষ দ্বারা ভাগ করা হয়। (২ × ১/২ = ১)" />}
            {step === 3 && <BilingualText en="3 body-centred atoms completely inside. (3 × 1 = 3)" bn="৩টি দেহকেন্দ্রিক পরমাণু সম্পূর্ণ ভিতরে থাকে। (৩ × ১ = ৩)" />}
            {step === 4 && <BilingualText en="Total Z = 2 + 1 + 3 = 6 effective atoms." bn="মোট Z = ২ + ১ + ৩ = ৬ কার্যকর পরমাণু।" />}
          </p>
        </div>

        <button 
          onClick={() => setStep(s => (s + 1) % 5)}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors whitespace-nowrap shadow-sm"
        >
          {step === 4 ? (
            <BilingualText en="Reset" bn="রিসেট" />
          ) : (
            <BilingualText en="Next Step" bn="পরবর্তী ধাপ" />
          )}
        </button>
      </div>

      <div className="h-80 bg-slate-900 rounded-xl overflow-hidden relative border-2 border-slate-700 shadow-inner">
        <Canvas camera={{ position: [8, 6, 8], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={0.8} />
          
          {/* Draw prism edges */}
          {corners.map((v, i) => (
            i % 2 === 0 && (
              <React.Fragment key={`edge-${i}`}>
                {/* Vertical edges */}
                <Line points={[v.toArray(), corners[i+1].toArray()]} color="#475569" lineWidth={1} />
                {/* Bottom hexagon */}
                <Line points={[v.toArray(), corners[(i+2)%12].toArray()]} color="#475569" lineWidth={1} />
                {/* Top hexagon */}
                <Line points={[corners[i+1].toArray(), corners[(i+3)%12].toArray()]} color="#475569" lineWidth={1} />
              </React.Fragment>
            )
          ))}

          {/* Corners */}
          {corners.map((p, i) => (
            <Sphere key={`c-${i}`} position={p} args={[r, 32, 32]}>
              <meshStandardMaterial 
                color={step === 1 || step === 4 ? "#ef4444" : "#94a3b8"} 
                transparent opacity={step === 0 || step === 1 || step === 4 ? 0.9 : 0.2} 
              />
            </Sphere>
          ))}

          {/* Faces */}
          {faces.map((p, i) => (
            <Sphere key={`f-${i}`} position={p} args={[r, 32, 32]}>
              <meshStandardMaterial 
                color={step === 2 || step === 4 ? "#3b82f6" : "#94a3b8"} 
                transparent opacity={step === 0 || step === 2 || step === 4 ? 0.9 : 0.2} 
              />
            </Sphere>
          ))}

          {/* Body */}
          {body.map((p, i) => (
            <Sphere key={`b-${i}`} position={p} args={[r, 32, 32]}>
              <meshStandardMaterial 
                color={step === 3 || step === 4 ? "#10b981" : "#94a3b8"} 
                transparent opacity={step === 0 || step === 3 || step === 4 ? 0.9 : 0.2} 
              />
            </Sphere>
          ))}

          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </div>
  );
};
