import React, { useState } from 'react';

import { OrbitControls, Box, Sphere, Line } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';
import { AppCanvas as Canvas } from '../../ui/AppCanvas';

const CellOutline: React.FC<{ position: [number, number, number], visible: boolean }> = ({ position, visible }) => {
  if (!visible) return null;
  const size = 2;
  const edges = [
    // Bottom square
    [[-size/2, -size/2, -size/2], [size/2, -size/2, -size/2]],
    [[size/2, -size/2, -size/2], [size/2, -size/2, size/2]],
    [[size/2, -size/2, size/2], [-size/2, -size/2, size/2]],
    [[-size/2, -size/2, size/2], [-size/2, -size/2, -size/2]],
    // Top square
    [[-size/2, size/2, -size/2], [size/2, size/2, -size/2]],
    [[size/2, size/2, -size/2], [size/2, size/2, size/2]],
    [[size/2, size/2, size/2], [-size/2, size/2, size/2]],
    [[-size/2, size/2, size/2], [-size/2, size/2, -size/2]],
    // Vertical lines
    [[-size/2, -size/2, -size/2], [-size/2, size/2, -size/2]],
    [[size/2, -size/2, -size/2], [size/2, size/2, -size/2]],
    [[size/2, -size/2, size/2], [size/2, size/2, size/2]],
    [[-size/2, -size/2, size/2], [-size/2, size/2, size/2]]
  ];

  return (
    <group position={position}>
      <Box args={[size, size, size]} visible={false}>
        <meshBasicMaterial transparent opacity={0} />
      </Box>
      {edges.map((pts, i) => (
        <Line key={i} points={pts as any} color="#475569" lineWidth={1.5} opacity={0.5} transparent />
      ))}
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

export const UnitCellSharing: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { count: 1, label: { en: '1 Unit Cell', bn: '১টি একক কোষ' } },
    { count: 2, label: { en: '2 Unit Cells', bn: '২টি একক কোষ' } },
    { count: 4, label: { en: '4 Unit Cells', bn: '৪টি একক কোষ' } },
    { count: 8, label: { en: '8 Unit Cells', bn: '৮টি একক কোষ' } }
  ];

  const positions: [number, number, number][] = [
    [1, 1, 1],
    [-1, 1, 1],
    [1, 1, -1],
    [-1, 1, -1],
    [1, -1, 1],
    [-1, -1, 1],
    [1, -1, -1],
    [-1, -1, -1]
  ];

  return (
    <div className="flex h-full min-h-[520px] w-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 md:p-6">
      <div className="flex flex-1 flex-col gap-6 md:flex-row">
        <div className="relative min-h-[360px] w-full overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--canvas-background)] shadow-inner md:w-2/3">
          <Canvas dpr={[1, 1.5]} camera={{ position: [5, 4, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            
            {/* The Central Corner Particle */}
            <Sphere args={[0.5, 16, 16]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.2} />
            </Sphere>

            {/* Render up to the current step's number of cells */}
            {positions.map((pos, i) => (
              <CellOutline key={i} position={pos} visible={i < steps[step].count} />
            ))}

            <OrbitControls enablePan={false} minDistance={3} maxDistance={12} />
          </Canvas>
          
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="inline-block rounded-full border border-slate-600 bg-[#071923e8] px-4 py-2 text-sm font-medium text-white shadow backdrop-blur">
              <BilingualText en={steps[step].label.en} bn={steps[step].label.bn} />
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2 text-[var(--text-str)]">
              <BilingualText en="Corner Sharing" bn="কোনা ভাগাভাগি" />
            </h3>
            <p className="text-[var(--text-mut)] text-sm leading-relaxed mb-4">
              <BilingualText 
                en="Observe how a single particle located at the corner is shared among neighboring unit cells." 
                bn="লক্ষ্য করুন কীভাবে কোনায় অবস্থিত একটি কণা পার্শ্ববর্তী একক কোষগুলির মধ্যে ভাগ করা হয়।" 
              />
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    step === i 
                      ? 'bg-[var(--accent-primary)] text-[var(--text-inverse)]' 
                      : 'border border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--hover-state)]'
                  }`}
                >
                  Step {i + 1}
                </button>
              ))}
            </div>
          </div>
          
          <div className={`rounded-lg border border-[color-mix(in_srgb,var(--warning)_35%,var(--border-default))] bg-[color-mix(in_srgb,var(--warning)_10%,var(--surface-primary))] p-4 transition-opacity duration-500 ${step === 3 ? 'opacity-100' : 'hidden opacity-0'}`}>
            <div className="mb-2 text-lg font-bold text-[var(--text-primary)]">
              <BilingualText en="Corner contribution = 1/8" bn="কোণস্থিত কণার অবদান = ১/৮" />
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              <BilingualText 
                en="The atom is not physically divided into eight pieces. Its centre lies at a point shared by eight neighbouring unit cells." 
                bn="পরমাণুটি বাস্তবে আটটি খণ্ডে বিভক্ত নয়। তার কেন্দ্র এমন একটি বিন্দুতে থাকে যা আটটি পার্শ্ববর্তী একক কোষ দ্বারা ভাগ করা হয়।" 
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
