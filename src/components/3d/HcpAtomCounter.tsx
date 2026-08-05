import React, { useState } from 'react';

import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { BilingualText } from '../BilingualText';
import * as THREE from 'three';
import { AppCanvas as Canvas } from '../ui/AppCanvas';

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
    <div className="flex h-full min-h-[520px] flex-col gap-4">
      <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <h4 className="font-bold text-[var(--text-primary)]">
            <BilingualText en="HCP Effective Atoms Calculation" bn="HCP কার্যকর পরমাণু গণনা" />
          </h4>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {step === 0 && <BilingualText en="Start by highlighting the different positions." bn="ভিন্ন ভিন্ন অবস্থান হাইলাইট করে শুরু করুন।" />}
            {step === 1 && <BilingualText en="12 corners shared by 6 cells each. (12 × 1/6 = 2)" bn="১২টি কোণ প্রত্যেকে ৬টি কোষ দ্বারা ভাগ করা হয়। (১২ × ১/৬ = ২)" />}
            {step === 2 && <BilingualText en="2 face-centres shared by 2 cells each. (2 × 1/2 = 1)" bn="২টি পৃষ্ঠকেন্দ্র প্রত্যেকে ২টি কোষ দ্বারা ভাগ করা হয়। (২ × ১/২ = ১)" />}
            {step === 3 && <BilingualText en="3 body-centred atoms completely inside. (3 × 1 = 3)" bn="৩টি দেহকেন্দ্রিক পরমাণু সম্পূর্ণ ভিতরে থাকে। (৩ × ১ = ৩)" />}
            {step === 4 && <BilingualText en="Total Z = 2 + 1 + 3 = 6 effective atoms." bn="মোট Z = ২ + ১ + ৩ = ৬ কার্যকর পরমাণু।" />}
          </p>
        </div>

        <button 
          onClick={() => setStep(s => (s + 1) % 5)}
          type="button"
          className="btn btn-primary whitespace-nowrap px-6 py-2 font-bold"
        >
          {step === 4 ? (
            <BilingualText en="Reset" bn="রিসেট" />
          ) : (
            <BilingualText en="Next Step" bn="পরবর্তী ধাপ" />
          )}
        </button>
      </div>

      <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--canvas-background)] shadow-inner">
        <Canvas dpr={[1, 1.5]} camera={{ position: [4.8, 3.4, 4.8], fov: 38 }}>
          <ambientLight intensity={1.1} />
          <directionalLight position={[8, 10, 7]} intensity={1.25} />
          
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
            <Sphere key={`c-${i}`} position={p} args={[r, 16, 16]}>
              <meshStandardMaterial 
                color={step === 1 || step === 4 ? "#ef4444" : "#94a3b8"} 
                transparent opacity={step === 0 || step === 1 || step === 4 ? 0.96 : 0.16} 
              />
            </Sphere>
          ))}

          {/* Faces */}
          {faces.map((p, i) => (
            <Sphere key={`f-${i}`} position={p} args={[r, 16, 16]}>
              <meshStandardMaterial 
                color={step === 2 || step === 4 ? "#3b82f6" : "#94a3b8"} 
                transparent opacity={step === 0 || step === 2 || step === 4 ? 0.96 : 0.16} 
              />
            </Sphere>
          ))}

          {/* Body */}
          {body.map((p, i) => (
            <Sphere key={`b-${i}`} position={p} args={[r, 16, 16]}>
              <meshStandardMaterial 
                color={step === 3 || step === 4 ? "#10b981" : "#94a3b8"} 
                transparent opacity={step === 0 || step === 3 || step === 4 ? 0.96 : 0.16} 
              />
            </Sphere>
          ))}

          <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={3.2} maxDistance={12} />
        </Canvas>
      </div>
    </div>
  );
};
