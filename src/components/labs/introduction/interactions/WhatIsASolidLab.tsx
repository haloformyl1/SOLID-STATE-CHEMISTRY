import React, { useState } from 'react';
import { BilingualText } from '../../../BilingualText';
import { GuidedLessonEngine } from '../engine/GuidedLessonEngine';
import type { LessonMode, AnimationStep } from '../engine/GuidedLessonTypes';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { AnimatedGroup } from '../engine/AnimatedLessonPrimitives';

const steps: AnimationStep[] = [
  {
    id: 'intro',
    narration: { en: 'A solid is a state of matter with closely associated particles.', bn: 'কঠিন পদার্থ হল পদার্থের এমন একটি অবস্থা যেখানে কণাগুলি পরস্পরের কাছাকাছি থাকে।' },
    explanation: { en: 'Particles are tightly packed and occupy stable average positions.', bn: 'কণাগুলি শক্তভাবে প্যাক করা থাকে এবং স্থিতিশীল গড় অবস্থান দখল করে।' },
    observation: { en: 'Observe how the particles form a rigid structure.', bn: 'লক্ষ্য করুন কীভাবে কণাগুলি একটি দৃঢ় কাঠামো গঠন করে।' }
  },
  {
    id: 'vibration',
    narration: { en: 'Particles in a solid are never completely motionless.', bn: 'কঠিন পদার্থের কণাগুলি কখনই সম্পূর্ণ গতিহীন হয় না।' },
    explanation: { en: 'They constantly vibrate around their equilibrium positions due to thermal energy.', bn: 'তাপীয় শক্তির কারণে তারা ক্রমাগত তাদের সাম্যাবস্থানের চারপাশে কম্পন করে।' },
    observation: { en: 'Notice the slight vibrating movement of each particle.', bn: 'প্রতিটি কণার সামান্য কম্পনশীল গতি লক্ষ্য করুন।' },
    checkpointQuestion: { en: 'Are particles in a solid completely motionless?', bn: 'কঠিন পদার্থের কণাগুলি কি সম্পূর্ণ গতিহীন?' },
    checkpointOptions: [
      { text: { en: 'Yes, they do not move at all.', bn: 'হ্যাঁ, তারা মোটেও নড়ে না।' }, isCorrect: false },
      { text: { en: 'No, they vibrate around average positions.', bn: 'না, তারা গড় অবস্থানের চারপাশে কম্পন করে।' }, isCorrect: true }
    ],
    checkpointFeedback: { en: 'Correct! Even in solids, particles vibrate due to thermal energy.', bn: 'সঠিক! কঠিন পদার্থেও তাপীয় শক্তির কারণে কণাগুলি কম্পন করে।' }
  }
];

export const WhatIsASolidLab: React.FC = () => {
  const [mode, setMode] = useState<LessonMode>('guided');
  const [stepIndex, setStepIndex] = useState(0);
  const [isAnimOn, setIsAnimOn] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [particleType, setParticleType] = useState<'atoms' | 'ions' | 'molecules'>('atoms');

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
      <div className="absolute right-3 top-16 z-10 flex w-48 flex-col gap-2 rounded-xl border border-white/10 bg-[color-mix(in_srgb,var(--canvas-surface)_92%,transparent)] p-3 text-sky-100 shadow-lg backdrop-blur-md sm:right-4 sm:top-4">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[var(--accent-secondary)]"><BilingualText en="Constituent Particles" bn="গঠনকারী কণা" /></span>
        <select 
          value={particleType}
          onChange={(event) => setParticleType(event.target.value as typeof particleType)}
          className="rounded-lg border border-white/15 bg-[var(--canvas-background)] p-2 text-sm text-sky-100 outline-none transition-colors focus:border-[var(--accent-primary)]"
          aria-label="Constituent particle type"
        >
          <option value="atoms">Atoms (পরমাণু)</option>
          <option value="ions">Ions (আয়ন)</option>
          <option value="molecules">Molecules (অণু)</option>
        </select>
      </div>

      <Canvas camera={{ position: [4.8, 3.8, 7.4], fov: 40 }} dpr={[1, 1.75]}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[8, 10, 8]} intensity={1.25} />
        <OrbitControls target={[0, 0, 0]} enablePan={mode === 'explore'} enableZoom={mode === 'explore'} autoRotate={isAnimOn && stepIndex === 1} autoRotateSpeed={speed * 1.4} />
        
        <group>
          {[0, 1, 2].map(x => 
            [0, 1, 2].map(y => 
              [0, 1, 2].map(z => {
                const isVibrating = isAnimOn && stepIndex >= 1;
                
                return (
                  <AnimatedGroup
                    key={`${x}-${y}-${z}`}
                    basePosition={[x - 1, y - 1, z - 1]}
                    enabled={isVibrating}
                    speed={speed}
                    phase={x * 1.7 + y * 2.3 + z * 2.9}
                    amplitude={0.045}
                    motion="vibrate"
                  >
                    {particleType === 'atoms' && (
                      <Sphere args={[0.4, 32, 32]}>
                        <meshStandardMaterial color="#2589dc" roughness={0.28} metalness={0.12} />
                      </Sphere>
                    )}
                    {particleType === 'ions' && (
                      <Sphere args={[(x+y+z)%2===0 ? 0.4 : 0.3, 32, 32]}>
                        <meshStandardMaterial color={(x+y+z)%2===0 ? "#ef4444" : "#10b981"} />
                      </Sphere>
                    )}
                    {particleType === 'molecules' && (
                      <group>
                        <Sphere args={[0.25, 32, 32]} position={[-0.15, 0, 0]}><meshStandardMaterial color="#8b5cf6" /></Sphere>
                        <Sphere args={[0.25, 32, 32]} position={[0.15, 0, 0]}><meshStandardMaterial color="#8b5cf6" /></Sphere>
                      </group>
                    )}
                  </AnimatedGroup>
                )
              })
            )
          )}
        </group>
      </Canvas>
    </GuidedLessonEngine>
  );
};
