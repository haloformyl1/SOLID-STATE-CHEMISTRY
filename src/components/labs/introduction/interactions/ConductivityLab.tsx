import React, { useState } from 'react';
import { BilingualText } from '../../../BilingualText';
import { GuidedLessonEngine } from '../engine/GuidedLessonEngine';
import type { LessonMode, AnimationStep } from '../engine/GuidedLessonTypes';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { AnimatedGroup } from '../engine/AnimatedLessonPrimitives';

const steps: AnimationStep[] = [
  {
    id: 'solid-state',
    narration: { en: 'In the solid state, ionic compounds do not conduct electricity.', bn: 'কঠিন অবস্থায় আয়নিক যৌগ বিদ্যুৎ পরিবহন করে না।' },
    explanation: { en: 'The ions are fixed in their lattice positions and cannot move to carry charge.', bn: 'আয়নগুলি তাদের জালক অবস্থানে স্থির থাকে এবং আধান বহনের জন্য স্থানচ্যুত হতে পারে না।' },
    observation: { en: 'Observe that when voltage is applied, no current flows (bulb is off).', bn: 'লক্ষ্য করুন যে ভোল্টেজ প্রয়োগ করা হলেও কোনো কারেন্ট প্রবাহিত হয় না (বাল্ব বন্ধ)।' }
  },
  {
    id: 'molten-state',
    narration: { en: 'When heated to a molten state, the lattice breaks down.', bn: 'গলিত অবস্থায় উত্তপ্ত হলে জালকটি ভেঙে যায়।' },
    explanation: { en: 'The ions are now free to move and carry electrical charge.', bn: 'আয়নগুলি এখন মুক্তভাবে চলাফেরা করতে পারে এবং বৈদ্যুতিক আধান বহন করতে পারে।' },
    observation: { en: 'Observe the ions moving towards the electrodes, completing the circuit (bulb turns on).', bn: 'ইলেকট্রোডগুলির দিকে আয়নগুলির গতিবিধি লক্ষ্য করুন, যা সার্কিট সম্পূর্ণ করে (বাল্ব জ্বলে ওঠে)।' },
    checkpointQuestion: { en: 'Why do ionic compounds conduct electricity in the molten state?', bn: 'আয়নিক যৌগগুলি কেন গলিত অবস্থায় বিদ্যুৎ পরিবহন করে?' },
    checkpointOptions: [
      { text: { en: 'Because free electrons are released', bn: 'কারণ মুক্ত ইলেকট্রন নির্গত হয়' }, isCorrect: false },
      { text: { en: 'Because the ions become free to move', bn: 'কারণ আয়নগুলি চলাফেরা করার জন্য মুক্ত হয়ে যায়' }, isCorrect: true }
    ],
    checkpointFeedback: { en: 'Correct! Conductivity in ionic melts is due to mobile ions, not free electrons.', bn: 'সঠিক! গলিত আয়নিক পদার্থে পরিবাহিতা সচল আয়নের কারণে হয়, মুক্ত ইলেকট্রনের কারণে নয়।' }
  }
];

export const ConductivityLab: React.FC = () => {
  const [mode, setMode] = useState<LessonMode>('guided');
  const [stepIndex, setStepIndex] = useState(0);
  const [isAnimOn, setIsAnimOn] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [temperature, setTemperature] = useState(25); // Challenge mode

  const isMolten = mode === 'guided' ? stepIndex === 1 : temperature > 800;

  const bulbColor = isMolten ? '#fef08a' : '#475569';


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
        <div className="absolute right-3 top-16 z-10 flex w-[min(16rem,calc(100%-1.5rem))] flex-col gap-2 rounded-xl border border-[color-mix(in_srgb,var(--accent-amber)_38%,transparent)] bg-[color-mix(in_srgb,var(--canvas-surface)_92%,transparent)] p-4 text-sky-100 shadow-xl backdrop-blur-md sm:right-4 sm:top-4">
          <span className="mb-1 text-sm font-bold text-[var(--accent-amber)]"><BilingualText en="Challenge: Heat the Solid" bn="অনুশীলন: কঠিনকে উত্তপ্ত করুন" /></span>
          <label className="text-xs text-sky-100/75">Temperature (°C): {temperature}</label>
          <input 
            type="range" 
            min="25" max="1000" step="5" 
            value={temperature} 
            onChange={(e) => setTemperature(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
          <p className="mt-2 text-[11px] leading-relaxed text-sky-100/70">
            <BilingualText en="Heat above melting point (~800°C) to observe conductivity." bn="পরিবাহিতা পর্যবেক্ষণ করতে গলনাঙ্কের উপরে (~800°C) উত্তপ্ত করুন।" />
          </p>
        </div>
      )}

      {/* 2D Overlay for Bulb (easier than full 3D bulb modeling) */}
      <div className="absolute bottom-20 left-5 z-10 flex flex-col items-center rounded-xl border border-white/10 bg-[color-mix(in_srgb,var(--canvas-surface)_86%,transparent)] p-3 shadow-lg backdrop-blur-sm sm:bottom-auto sm:left-8 sm:top-24">
        <div 
          className="h-12 w-12 rounded-full border-2 border-slate-500 transition-all duration-500"
          style={{ 
            backgroundColor: bulbColor, 
            boxShadow: isMolten ? '0 0 20px 5px rgba(254, 240, 138, 0.6)' : 'none',
          }}
          aria-label={isMolten ? 'Circuit bulb on' : 'Circuit bulb off'}
        />
        <div className="h-6 w-6 rounded-b-md bg-slate-600" />
      </div>

      <Canvas camera={{ position: [0, 2, 10], fov: 42 }} dpr={[1, 1.75]}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[0, 5, 7]} intensity={1.2} />
        <OrbitControls enablePan={mode === 'explore'} enableZoom={mode === 'explore'} />
        
        {/* Electrodes */}
        <mesh position={[-2.5, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 4, 32]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        <mesh position={[2.5, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 4, 32]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        {/* Circuit lines */}
        <Line points={[[-2.5, 2, 0], [-2.5, 3, 0], [2.5, 3, 0], [2.5, 2, 0]]} color="#64748b" lineWidth={3} />

        {/* Ionic Lattice / Melt */}
        <group position={[0, -1, 0]}>
          {[-1, 0, 1].map(x => 
            [-1, 0, 1].map(y => 
              [-1, 0, 1].map(z => {
                const isPositive = (x+y+z) % 2 !== 0;

                return (
                  <AnimatedGroup
                    key={`${x}${y}${z}`}
                    basePosition={[x * 1.35, y * 1.25, z * 1.25]}
                    enabled={isMolten && isAnimOn}
                    speed={speed}
                    phase={(x + 2) * 0.17 + (y + 2) * 0.31 + (z + 2) * 0.47}
                    amplitude={1.15}
                    direction={isPositive ? -1 : 1}
                    motion="flow"
                  >
                    <Sphere args={[0.3, 32, 32]}>
                      <meshStandardMaterial color={isPositive ? '#ef4444' : '#10b981'} roughness={0.3} metalness={0.08} />
                    </Sphere>
                  </AnimatedGroup>
                );
              })
            )
          )}
        </group>
      </Canvas>
    </GuidedLessonEngine>
  );
};
