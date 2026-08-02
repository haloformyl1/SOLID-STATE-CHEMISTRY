import React, { useState } from 'react';
import { BilingualText } from '../../../BilingualText';
import { GuidedLessonEngine } from '../engine/GuidedLessonEngine';
import type { LessonMode, AnimationStep } from '../engine/GuidedLessonTypes';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Torus } from '@react-three/drei';
import { AnimatedGroup } from '../engine/AnimatedLessonPrimitives';

const steps: AnimationStep[] = [
  {
    id: 'ionic',
    narration: { en: 'Ionic solids are held together by strong electrostatic forces.', bn: 'আয়নিক কঠিন পদার্থ শক্তিশালী স্থিরতাড়িতিক বল দ্বারা আবদ্ধ থাকে।' },
    explanation: { en: 'Cations (positive) and anions (negative) attract each other strongly.', bn: 'ক্যাটায়ন (ধনাত্মক) এবং অ্যানায়ন (ঋণাত্মক) একে অপরকে তীব্রভাবে আকর্ষণ করে।' },
    observation: { en: 'Notice the alternating positive and negative ions.', bn: 'একান্তর ধনাত্মক এবং ঋণাত্মক আয়নগুলি লক্ষ্য করুন।' }
  },
  {
    id: 'metallic',
    narration: { en: 'Metallic solids have a "sea of electrons" around positive metal cores.', bn: 'ধাতব কঠিনে ধনাত্মক ধাতব কোরের চারপাশে "ইলেকট্রনের সমুদ্র" থাকে।' },
    explanation: { en: 'The metallic bond is the attraction between the cores and delocalised electrons.', bn: 'ধাতব বন্ধন হল কোর এবং স্থানান্তরযোগ্য ইলেকট্রনগুলির মধ্যে আকর্ষণ।' },
    observation: { en: 'Observe the small moving electrons holding the lattice together.', bn: 'জালকটিকে একত্রে ধরে রাখা ছোট চলমান ইলেকট্রনগুলি পর্যবেক্ষণ করুন।' }
  },
  {
    id: 'covalent',
    narration: { en: 'Covalent network solids share electrons between adjacent atoms.', bn: 'সমযোজী জালকীয় কঠিনে সংলগ্ন পরমাণুর মধ্যে ইলেকট্রন শেয়ার হয়।' },
    explanation: { en: 'Strong covalent bonds form a continuous network (e.g. Diamond, Quartz).', bn: 'শক্তিশালী সমযোজী বন্ধন একটি অবিচ্ছিন্ন জালক তৈরি করে (যেমন হীরা, কোয়ার্টজ)।' },
    observation: { en: 'Notice the distinct directional bonds connecting all atoms.', bn: 'সমস্ত পরমাণুকে সংযুক্তকারী নির্দিষ্ট নির্দেশক বন্ধনগুলি লক্ষ্য করুন।' },
    checkpointQuestion: { en: 'Why are covalent network solids extremely hard?', bn: 'কেন সমযোজী জালকীয় কঠিন পদার্থগুলি অত্যন্ত শক্ত হয়?' },
    checkpointOptions: [
      { text: { en: 'Due to weak intermolecular forces', bn: 'দুর্বল আন্তঃআণবিক বলের কারণে' }, isCorrect: false },
      { text: { en: 'Due to a continuous network of strong covalent bonds', bn: 'শক্তিশালী সমযোজী বন্ধনের অবিচ্ছিন্ন জালের কারণে' }, isCorrect: true }
    ],
    checkpointFeedback: { en: 'Correct! The entire crystal is essentially one giant molecule.', bn: 'সঠিক! পুরো স্ফটিকটি মূলত একটি বিশাল অণু।' }
  },
  {
    id: 'molecular-dispersion',
    narration: { en: 'Non-polar molecular solids rely on weak dispersion (London) forces.', bn: 'অধ্রুবীয় আণবিক কঠিন পদার্থ দুর্বল বিচ্ছুরণ (লন্ডন) বলের উপর নির্ভর করে।' },
    explanation: { en: 'Temporary dipoles induce dipoles in neighbours.', bn: 'অস্থায়ী মেরু প্রতিবেশীতে মেরু আবিষ্ট করে।' },
    observation: { en: 'Observe the very weak, fluctuating attractions.', bn: 'অত্যন্ত দুর্বল, ওঠানামা করা আকর্ষণগুলি লক্ষ্য করুন।' }
  }
];

export const BindingForceLab: React.FC = () => {
  const [mode, setMode] = useState<LessonMode>('guided');
  const [stepIndex, setStepIndex] = useState(0);
  const [isAnimOn, setIsAnimOn] = useState(true);
  const [speed, setSpeed] = useState(1);

  // Determine which type to show
  const currentType = mode === 'explore' || mode === 'challenge' 
    ? 'ionic' // Default for challenge/explore, or we could add a selector
    : (stepIndex === 0 ? 'ionic' : stepIndex === 1 ? 'metallic' : stepIndex === 2 ? 'covalent' : 'molecular');

  const [selectedType, setSelectedType] = useState('ionic');
  const displayType = mode === 'guided' ? currentType : selectedType;

  return (
    <GuidedLessonEngine
      steps={steps}
      currentStepIndex={stepIndex}
      mode={mode}
      onModeChange={setMode}
      onStepChange={setStepIndex}
      onAnimationToggle={setIsAnimOn}
      onSpeedChange={setSpeed}
      isAnimationOn={isAnimOn}
      speed={speed}
    >
      {(mode === 'challenge' || mode === 'explore') && (
        <div className="absolute right-3 top-16 z-10 flex w-[min(16rem,calc(100%-1.5rem))] flex-col gap-2 rounded-xl border border-white/10 bg-[color-mix(in_srgb,var(--canvas-surface)_92%,transparent)] p-3 text-sky-100 shadow-xl backdrop-blur-md sm:right-4 sm:top-4">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--accent-secondary)]"><BilingualText en="Select Solid Type" bn="কঠিনের ধরন নির্বাচন করুন" /></span>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-lg border border-white/15 bg-[var(--canvas-background)] p-2 text-sm text-sky-100 outline-none transition-colors focus:border-[var(--accent-primary)]"
            aria-label="Solid binding type"
          >
            <option value="ionic">Ionic (আয়নিক)</option>
            <option value="metallic">Metallic (ধাতব)</option>
            <option value="covalent">Covalent Network (সমযোজী)</option>
            <option value="molecular">Molecular Non-polar (অধ্রুবীয়)</option>
          </select>
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 8.5], fov: 40 }} dpr={[1, 1.75]}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 5, 7]} intensity={1.2} />
        <OrbitControls enablePan={mode === 'explore'} enableZoom={mode === 'explore'} autoRotate={isAnimOn} autoRotateSpeed={speed} />
        
        {displayType === 'ionic' && (
          <group>
            {[-1, 1].map(x => 
              [-1, 1].map(y => 
                [-1, 1].map(z => {
                  const isPositive = (x+y+z) % 2 !== 0;
                  return (
                    <Sphere key={`i-${x}${y}${z}`} args={[isPositive ? 0.3 : 0.4, 32, 32]} position={[x, y, z]}>
                      <meshStandardMaterial color={isPositive ? "#ef4444" : "#10b981"} />
                    </Sphere>
                  );
                })
              )
            )}
          </group>
        )}

        {displayType === 'metallic' && (
          <group>
            {[-1.5, 0, 1.5].map(x => 
              [-1.5, 0, 1.5].map(y => (
                <Sphere key={`m-${x}${y}`} args={[0.4, 32, 32]} position={[x, y, 0]}>
                  <meshStandardMaterial color="#f59e0b" />
                </Sphere>
              ))
            )}
            {/* Sea of electrons */}
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              return (
                <AnimatedGroup
                  key={`e-${i}`}
                  basePosition={[Math.cos(angle) * 1.9, Math.sin(angle) * 1.9, ((i % 5) - 2) * 0.18]}
                  enabled={isAnimOn}
                  speed={speed}
                  phase={angle}
                  amplitude={0.42}
                  motion="orbit"
                >
                  <Sphere args={[0.08, 16, 16]}>
                    <meshBasicMaterial color="#38bdf8" />
                  </Sphere>
                </AnimatedGroup>
              );
            })}
          </group>
        )}

        {displayType === 'covalent' && (
          <group>
             {/* Simple diamond-like tetrahedron cluster */}
             <Sphere args={[0.3, 32, 32]} position={[0,0,0]}><meshStandardMaterial color="#334155" /></Sphere>
             <Sphere args={[0.3, 32, 32]} position={[1.5, 1.5, -1.5]}><meshStandardMaterial color="#334155" /></Sphere>
             <Sphere args={[0.3, 32, 32]} position={[-1.5, -1.5, -1.5]}><meshStandardMaterial color="#334155" /></Sphere>
             <Sphere args={[0.3, 32, 32]} position={[-1.5, 1.5, 1.5]}><meshStandardMaterial color="#334155" /></Sphere>
             <Sphere args={[0.3, 32, 32]} position={[1.5, -1.5, 1.5]}><meshStandardMaterial color="#334155" /></Sphere>
             
             {/* Bonds */}
             <Line points={[[0,0,0], [1.5, 1.5, -1.5]]} color="#94a3b8" lineWidth={8} />
             <Line points={[[0,0,0], [-1.5, -1.5, -1.5]]} color="#94a3b8" lineWidth={8} />
             <Line points={[[0,0,0], [-1.5, 1.5, 1.5]]} color="#94a3b8" lineWidth={8} />
             <Line points={[[0,0,0], [1.5, -1.5, 1.5]]} color="#94a3b8" lineWidth={8} />
          </group>
        )}

        {displayType === 'molecular' && (
          <group>
            {/* Non-polar molecules (e.g., I2 or H2) */}
            {[-1.5, 1.5].map(x => 
              [-1.5, 1.5].map(y => (
                <group key={`mol-${x}${y}`} position={[x, y, 0]}>
                  <Sphere args={[0.25, 32, 32]} position={[-0.2, 0, 0]}><meshStandardMaterial color="#8b5cf6" /></Sphere>
                  <Sphere args={[0.25, 32, 32]} position={[0.2, 0, 0]}><meshStandardMaterial color="#8b5cf6" /></Sphere>
                  {/* Fluctuation indicator */}
                  <Torus args={[0.6, 0.02, 16, 32]} rotation={[Math.PI/2, 0, 0]}>
                    <meshBasicMaterial color="#a78bfa" transparent opacity={isAnimOn ? 0.42 : 0.22} />
                  </Torus>
                </group>
              ))
            )}
          </group>
        )}

      </Canvas>
    </GuidedLessonEngine>
  );
};
