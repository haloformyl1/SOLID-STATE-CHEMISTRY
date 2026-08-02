import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Sphere } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';
import { SkipForward, SkipBack, Layers, Box as BoxIcon, Minimize } from 'lucide-react';

const ParticleOrPoint = ({ 
  position, 
  mode 
}: { 
  position: [number, number, number], 
  mode: 'points' | 'particles' | 'both' 
}) => {
  return (
    <group position={position}>
      {(mode === 'points' || mode === 'both') && (
        <Sphere args={[0.08, 16, 16]}>
          <meshBasicMaterial color="#ef4444" />
        </Sphere>
      )}
      {(mode === 'particles' || mode === 'both') && (
        <Sphere args={[0.4, 32, 32]}>
          <meshStandardMaterial 
            color="#3b82f6" 
            roughness={0.4} 
            metalness={0.1} 
            transparent={mode === 'both'} 
            opacity={mode === 'both' ? 0.6 : 1}
          />
        </Sphere>
      )}
    </group>
  );
};

export const LatticeBuilder: React.FC = () => {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<'points' | 'particles' | 'both'>('points');

  const steps = [
    { id: '1-point', desc: { en: 'A single lattice point', bn: 'একটি একক জালক বিন্দু' } },
    { id: '1d-row', desc: { en: '1D Row of points', bn: 'বিন্দুগুলির একমাত্রিক সারি' } },
    { id: '2d-layer', desc: { en: '2D Layer of points', bn: 'বিন্দুগুলির দ্বিমাত্রিক স্তর' } },
    { id: '3d-lattice', desc: { en: '3D Crystal Lattice', bn: 'ত্রিমাত্রিক স্ফটিক জালক' } },
    { id: 'unit-cell', desc: { en: 'Extracting the Unit Cell', bn: 'একক কোষ নিষ্কাশন' } }
  ];

  const renderLattice = () => {
    const points: [number, number, number][] = [];
    
    let xRange = [0];
    let yRange = [0];
    let zRange = [0];

    if (step >= 1) xRange = [-1, 0, 1, 2];
    if (step >= 2) yRange = [-1, 0, 1, 2];
    if (step >= 3) zRange = [-1, 0, 1, 2];

    for (let x of xRange) {
      for (let y of yRange) {
        for (let z of zRange) {
          points.push([x, y, z]);
        }
      }
    }

    return (
      <group>
        {points.map((pos, i) => (
          <ParticleOrPoint 
            key={i} 
            position={pos} 
            mode={mode} 
          />
        ))}
        {step === 4 && (
          <group position={[0.5, 0.5, 0.5]}>
            <Box args={[1, 1, 1]}>
              <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
            </Box>
            <Box args={[1, 1, 1]}>
              <meshBasicMaterial color="#10b981" wireframe />
            </Box>
          </group>
        )}
      </group>
    );
  };

  return (
    <div className="flex h-full min-h-[520px] w-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 shadow-sm md:p-6">
      <div className="flex flex-1 flex-col gap-6 lg:flex-row">
        <div className="flex min-h-[380px] w-full flex-col gap-4 lg:w-2/3">
          <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--canvas-background)]">
            <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              
              <group position={[-0.5, -0.5, -0.5]}>
                {renderLattice()}
              </group>

              <OrbitControls enablePan={true} minDistance={2} maxDistance={10} />
            </Canvas>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 rounded-lg border border-[var(--border-default)] bg-[var(--surface-secondary)] p-3">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="icon-button disabled:opacity-50"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <div className="px-4 py-1 font-mono font-medium text-[var(--text-norm)]">
              {step + 1} / {steps.length}
            </div>
            <button
              onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
              disabled={step === steps.length - 1}
              className="icon-button disabled:opacity-50"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2 text-[var(--text-str)]">
              <BilingualText en="Building the Lattice" bn="জালক তৈরি করা" />
            </h3>
            <p className="text-[var(--text-mut)] text-sm leading-relaxed mb-6">
              <BilingualText 
                en="Follow the steps to see how a single point extends into an infinite 3D periodic lattice, and how the unit cell is defined." 
                bn="ধাপগুলি অনুসরণ করে দেখুন কীভাবে একটি একক বিন্দু অসীম 3D পর্যায়বৃত্ত জালকে পরিণত হয় এবং কীভাবে একক কোষ সংজ্ঞায়িত করা হয়।" 
              />
            </p>

            <div className="mb-6 rounded-lg border border-[color-mix(in_srgb,var(--accent-primary)_28%,var(--border-default))] bg-[color-mix(in_srgb,var(--accent-primary)_9%,var(--surface-primary))] p-4">
              <h4 className="mb-2 font-semibold text-[var(--text-primary)]">
                <BilingualText en="Current Step" bn="বর্তমান ধাপ" />
              </h4>
              <p className="text-[var(--text-secondary)]">
                <BilingualText en={steps[step].desc.en} bn={steps[step].desc.bn} />
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-[var(--text-norm)] text-sm uppercase tracking-wider">
                <BilingualText en="View Mode" bn="দর্শন মোড" />
              </h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setMode('points')}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    mode === 'points' ? 'border-[var(--border-interactive)] bg-[var(--selected-state)] text-[var(--accent-primary)]' : 'border-[var(--border-default)] bg-transparent text-[var(--text-secondary)] hover:bg-[var(--hover-state)]'
                  }`}
                >
                  <Minimize className="w-5 h-5" />
                  <span className="font-medium"><BilingualText en="Lattice Points Only" bn="শুধুমাত্র জালক বিন্দু" /></span>
                </button>
                <button
                  onClick={() => setMode('particles')}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    mode === 'particles' ? 'border-[var(--border-interactive)] bg-[var(--selected-state)] text-[var(--accent-primary)]' : 'border-[var(--border-default)] bg-transparent text-[var(--text-secondary)] hover:bg-[var(--hover-state)]'
                  }`}
                >
                  <BoxIcon className="w-5 h-5" />
                  <span className="font-medium"><BilingualText en="Particles (Basis) Only" bn="শুধুমাত্র কণা (ভিত্তি)" /></span>
                </button>
                <button
                  onClick={() => setMode('both')}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    mode === 'both' ? 'border-[var(--border-interactive)] bg-[var(--selected-state)] text-[var(--accent-primary)]' : 'border-[var(--border-default)] bg-transparent text-[var(--text-secondary)] hover:bg-[var(--hover-state)]'
                  }`}
                >
                  <Layers className="w-5 h-5" />
                  <span className="font-medium"><BilingualText en="Lattice + Basis" bn="জালক + ভিত্তি" /></span>
                </button>
              </div>
            </div>

            {mode === 'points' && (
              <div className="mt-4 rounded-lg border border-[color-mix(in_srgb,var(--warning)_35%,var(--border-default))] bg-[color-mix(in_srgb,var(--warning)_10%,var(--surface-primary))] p-3">
                <p className="text-center text-sm text-[var(--text-secondary)]">
                  <BilingualText 
                    en="A lattice point is a geometrical position; the particle or group attached to it is the basis." 
                    bn="জালক বিন্দু একটি জ্যামিতিক অবস্থান; এর সঙ্গে যুক্ত কণা বা কণাগুচ্ছ হল ভিত্তি।" 
                  />
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
