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
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-slate-700">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          <div className="h-[400px] bg-slate-50 dark:bg-slate-900 rounded-lg relative overflow-hidden border border-gray-200 dark:border-slate-800">
            <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              
              <group position={[-0.5, -0.5, -0.5]}>
                {renderLattice()}
              </group>

              <OrbitControls enablePan={true} minDistance={2} maxDistance={10} />
            </Canvas>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-gray-200 dark:border-slate-800">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-300"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <div className="px-4 py-1 font-mono font-medium text-slate-700 dark:text-slate-300">
              {step + 1} / {steps.length}
            </div>
            <button
              onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
              disabled={step === steps.length - 1}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-300"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              <BilingualText en="Building the Lattice" bn="জালক তৈরি করা" />
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              <BilingualText 
                en="Follow the steps to see how a single point extends into an infinite 3D periodic lattice, and how the unit cell is defined." 
                bn="ধাপগুলি অনুসরণ করে দেখুন কীভাবে একটি একক বিন্দু অসীম 3D পর্যায়বৃত্ত জালকে পরিণত হয় এবং কীভাবে একক কোষ সংজ্ঞায়িত করা হয়।" 
              />
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30 mb-6">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                <BilingualText en="Current Step" bn="বর্তমান ধাপ" />
              </h4>
              <p className="text-blue-800 dark:text-blue-200">
                <BilingualText en={steps[step].desc.en} bn={steps[step].desc.bn} />
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">
                <BilingualText en="View Mode" bn="দর্শন মোড" />
              </h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setMode('points')}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    mode === 'points' ? 'bg-primary/10 border-primary text-primary dark:text-primary-light' : 'bg-transparent border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Minimize className="w-5 h-5" />
                  <span className="font-medium"><BilingualText en="Lattice Points Only" bn="শুধুমাত্র জালক বিন্দু" /></span>
                </button>
                <button
                  onClick={() => setMode('particles')}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    mode === 'particles' ? 'bg-primary/10 border-primary text-primary dark:text-primary-light' : 'bg-transparent border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <BoxIcon className="w-5 h-5" />
                  <span className="font-medium"><BilingualText en="Particles (Basis) Only" bn="শুধুমাত্র কণা (ভিত্তি)" /></span>
                </button>
                <button
                  onClick={() => setMode('both')}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    mode === 'both' ? 'bg-primary/10 border-primary text-primary dark:text-primary-light' : 'bg-transparent border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Layers className="w-5 h-5" />
                  <span className="font-medium"><BilingualText en="Lattice + Basis" bn="জালক + ভিত্তি" /></span>
                </button>
              </div>
            </div>

            {mode === 'points' && (
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
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
