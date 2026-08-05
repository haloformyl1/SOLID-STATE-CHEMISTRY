import React, { useState } from 'react';
import { BilingualText } from '../../../BilingualText';
import { GuidedLessonEngine } from '../engine/GuidedLessonEngine';
import type { LessonMode, AnimationStep } from '../engine/GuidedLessonTypes';

import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { AnimatedGroup } from '../engine/AnimatedLessonPrimitives';
import { AppCanvas as Canvas } from '../../../ui/AppCanvas';

const steps: AnimationStep[] = [
  {
    id: 'intro',
    narration: { en: 'Graphite is a unique exception among covalent network solids.', bn: 'গ্র্যাফাইট সমযোজী জালকীয় কঠিন পদার্থগুলির মধ্যে একটি অনন্য ব্যতিক্রম।' },
    explanation: { en: 'Most covalent solids, like diamond, are extremely hard and non-conducting.', bn: 'হীরার মতো বেশিরভাগ সমযোজী কঠিন পদার্থ অত্যন্ত শক্ত এবং বিদ্যুৎ অপরিবাহী।' },
    observation: { en: 'Observe the layered structure of graphite.', bn: 'গ্র্যাফাইটের স্তরযুক্ত কাঠামোটি পর্যবেক্ষণ করুন।' }
  },
  {
    id: 'layers',
    narration: { en: 'Carbon atoms form strong covalent bonds within flat 2D layers.', bn: 'কার্বন পরমাণুগুলি সমতল 2D স্তরের মধ্যে শক্তিশালী সমযোজী বন্ধন গঠন করে।' },
    explanation: { en: 'These are hexagonal sheets.', bn: 'এগুলি ষড়ভুজাকার চাদরের মতো।' },
    observation: { en: 'Notice the strong bonds within the blue layer.', bn: 'নীল স্তরের মধ্যে শক্তিশালী বন্ধনগুলি লক্ষ্য করুন।' }
  },
  {
    id: 'vdw',
    narration: { en: 'Between these layers, there are only weak van der Waals forces.', bn: 'এই স্তরগুলির মধ্যে কেবল দুর্বল ভ্যান ডার ওয়ালস বল থাকে।' },
    explanation: { en: 'This allows the layers to slide past one another.', bn: 'এর ফলে স্তরগুলি একে অপরের উপর দিয়ে পিছলে যেতে পারে।' },
    observation: { en: 'Observe the top layer sliding over the bottom layer.', bn: 'লক্ষ্য করুন কীভাবে উপরের স্তরটি নিচের স্তরের উপর দিয়ে পিছলে যাচ্ছে।' },
    checkpointQuestion: { en: 'Why is graphite soft and used as a lubricant?', bn: 'কেন গ্র্যাফাইট নরম এবং লুব্রিকেন্ট হিসেবে ব্যবহৃত হয়?' },
    checkpointOptions: [
      { text: { en: 'Because covalent bonds easily break', bn: 'কারণ সমযোজী বন্ধন সহজেই ভেঙে যায়' }, isCorrect: false },
      { text: { en: 'Because weak van der Waals forces allow layers to slide', bn: 'কারণ দুর্বল ভ্যান ডার ওয়ালস বলের কারণে স্তরগুলি পিছলে যেতে পারে' }, isCorrect: true }
    ],
    checkpointFeedback: { en: 'Correct! The layers can slide, making it soft.', bn: 'সঠিক! স্তরগুলি পিছলে যেতে পারে, যার ফলে এটি নরম হয়।' }
  },
  {
    id: 'conduction',
    narration: { en: 'Graphite is also a good electrical conductor.', bn: 'গ্র্যাফাইট একটি ভালো বিদ্যুৎ পরিবাহীও।' },
    explanation: { en: 'Each carbon atom bonds to three others, leaving one delocalised electron free to move within the layer.', bn: 'প্রতিটি কার্বন পরমাণু অন্য তিনটির সাথে বন্ধন গঠন করে, যার ফলে একটি স্থানান্তরযোগ্য ইলেকট্রন স্তরের মধ্যে মুক্তভাবে চলতে পারে।' },
    observation: { en: 'Notice the fast-moving electrons between the layers.', bn: 'স্তরগুলির মধ্যে দ্রুত চলমান ইলেকট্রনগুলি লক্ষ্য করুন।' }
  }
];

export const GraphiteExceptionLab: React.FC = () => {
  const [mode, setMode] = useState<LessonMode>('guided');
  const [stepIndex, setStepIndex] = useState(0);
  const [isAnimOn, setIsAnimOn] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [slideAmount, setSlideAmount] = useState(0);

  const shouldSlide = mode === 'guided' ? (stepIndex === 2 && isAnimOn) : false;
  
  // Create a single hexagonal layer
  const createLayer = (yOffset: number, color: string) => {
    const points = [
      [0, yOffset, 1],
      [0.866, yOffset, 0.5],
      [0.866, yOffset, -0.5],
      [0, yOffset, -1],
      [-0.866, yOffset, -0.5],
      [-0.866, yOffset, 0.5]
    ];
    
    return (
      <group>
        {points.map((p, i) => (
          <Sphere key={i} args={[0.2, 16, 16]} position={p as any}>
            <meshStandardMaterial color={color} />
          </Sphere>
        ))}
        <Sphere args={[0.2, 16, 16]} position={[0, yOffset, 0]}>
          <meshStandardMaterial color={color} />
        </Sphere>
        {/* Radial bonds */}
        {points.map((p, i) => (
          <Line key={`r${i}`} points={[[0, yOffset, 0], p as any]} color="#64748b" lineWidth={3} />
        ))}
        {/* Perimeter bonds */}
        {points.map((p, i) => {
          const next = points[(i + 1) % points.length];
          return <Line key={`p${i}`} points={[p as any, next as any]} color="#64748b" lineWidth={3} />;
        })}
      </group>
    );
  };

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
          <span className="mb-1 text-sm font-bold text-[var(--accent-amber)]"><BilingualText en="Challenge: Slide Layers" bn="অনুশীলন: স্তরগুলিকে পিছলে দিন" /></span>
          <label className="text-xs text-sky-100/75"><BilingualText en="Shear Force" bn="শিয়ার বল" /></label>
          <input 
            type="range" 
            min="-2" max="2" step="0.1" 
            value={slideAmount} 
            onChange={(e) => setSlideAmount(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
          <p className="mt-2 text-[11px] leading-relaxed text-sky-100/70">
            <BilingualText en="Apply force to slide the top layer. This illustrates why graphite is soft (lubricant)." bn="উপরের স্তরটি পিছলে দিতে বল প্রয়োগ করুন। এটি ব্যাখ্যা করে কেন গ্র্যাফাইট নরম (লুব্রিকেন্ট)।" />
          </p>
        </div>
      )}

      <Canvas camera={{ position: [5, 4, 7], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} />
        <OrbitControls enablePan={mode === 'explore'} enableZoom={mode === 'explore'} />
        
        {/* Bottom Layer */}
        {createLayer(-1, "#334155")}

        {/* Weak van der Waals forces (dashed vertical lines) */}
        {(stepIndex >= 2 || mode !== 'guided') && (
          <group>
            {[
              [0, 1], [0.866, 0.5], [0.866, -0.5], [0, -1], [-0.866, -0.5], [-0.866, 0.5], [0, 0]
            ].map((p, i) => {
              const topX = mode === 'guided' ? 0 : slideAmount;
              return (
                <Line 
                  key={`vdw${i}`} 
                  points={[[p[0], -1, p[1]], [p[0] + topX, 1, p[1]]]} 
                  color="#94a3b8" 
                  lineWidth={1} 
                  dashed 
                  dashSize={0.2} 
                  gapSize={0.2} 
                />
              );
            })}
          </group>
        )}

        {/* Top Layer */}
        <AnimatedGroup
          basePosition={[mode === 'guided' ? 0 : slideAmount, 0, 0]}
          enabled={shouldSlide}
          speed={speed}
          amplitude={0.8}
          motion="slide"
        >
          {createLayer(1, "#3b82f6")}
          
          {/* Delocalised electrons */}
          {(stepIndex === 3 || mode !== 'guided') && Array.from({ length: 5 }).map((_, i) => {
            const angle = (i / 5) * Math.PI * 2;
            return (
              <AnimatedGroup
                key={`e-${i}`}
                basePosition={[Math.cos(angle) * 1.25, 0.78, Math.sin(angle) * 1.25]}
                enabled={isAnimOn}
                speed={speed * 1.35}
                phase={angle}
                amplitude={0.38}
                motion="orbit"
              >
                <Sphere args={[0.08, 16, 16]}>
                  <meshBasicMaterial color="#fef08a" />
                </Sphere>
              </AnimatedGroup>
            );
          })}
        </AnimatedGroup>

      </Canvas>
    </GuidedLessonEngine>
  );
};
