import React, { useState } from 'react';
import { BilingualText } from '../../../BilingualText';
import { GuidedLessonEngine } from '../engine/GuidedLessonEngine';
import type { LessonMode, AnimationStep } from '../engine/GuidedLessonTypes';

import { OrbitControls, Sphere, Box } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { AnimatedGroup } from '../engine/AnimatedLessonPrimitives';
import { AppCanvas as Canvas } from '../../../ui/AppCanvas';

const steps: AnimationStep[] = [
  {
    id: 'intro',
    narration: { en: 'Let us build a solid by adding particles one by one.', bn: 'আসুন একের পর এক কণা যোগ করে একটি কঠিন পদার্থ তৈরি করি।' },
    explanation: { en: 'Solids have closely arranged particles with very small interparticle separation.', bn: 'কঠিন পদার্থের কণাগুলি কাছাকাছি বিন্যস্ত থাকে এবং এদের আন্তঃকণা দূরত্ব খুব কম হয়।' },
    observation: { en: 'In Guided mode, observe the rigid packed structure.', bn: 'নির্দেশিত মোডে, দৃঢ়ভাবে প্যাক করা কাঠামোটি লক্ষ্য করুন।' }
  },
  {
    id: 'vibration',
    narration: { en: 'Now we introduce thermal energy.', bn: 'এখন আমরা তাপীয় শক্তি প্রয়োগ করছি।' },
    explanation: { en: 'The particles occupy stable average positions but vibrate continuously.', bn: 'কণাগুলি স্থিতিশীল গড় অবস্থান দখল করে তবে ক্রমাগত কম্পন করে।' },
    observation: { en: 'Observe the vibration without particles drifting away.', bn: 'কণাগুলি দূরে সরে না গিয়ে কীভাবে কম্পন করে তা পর্যবেক্ষণ করুন।' }
  },
  {
    id: 'compressibility',
    narration: { en: 'What happens if we apply pressure?', bn: 'আমরা চাপ প্রয়োগ করলে কী হবে?' },
    explanation: { en: 'Because the particles are already closely packed, solids have low compressibility.', bn: 'যেহেতু কণাগুলি আগে থেকেই শক্তভাবে প্যাক করা থাকে, তাই কঠিন পদার্থের সংকোচনশীলতা কম।' },
    observation: { en: 'The volume barely changes despite the applied force.', bn: 'প্রযুক্ত বল সত্ত্বেও আয়তন প্রায় অপরিবর্তিত থাকে।' },
    checkpointQuestion: { en: 'Is the compressibility of a solid mathematically zero?', bn: 'কঠিন পদার্থের সংকোচনশীলতা কি গাণিতিকভাবে শূন্য?' },
    checkpointOptions: [
      { text: { en: 'Yes, they cannot be compressed at all.', bn: 'হ্যাঁ, এদের মোটেও সংকুচিত করা যায় না।' }, isCorrect: false },
      { text: { en: 'No, it is very low but not zero.', bn: 'না, এটি খুব কম কিন্তু শূন্য নয়।' }, isCorrect: true }
    ],
    checkpointFeedback: { en: 'Correct. Compressibility is extremely low, but not absolute zero.', bn: 'সঠিক। সংকোচনশীলতা অত্যন্ত কম, কিন্তু একেবারে শূন্য নয়।' }
  }
];

export const SolidBuilderLab: React.FC = () => {
  const [mode, setMode] = useState<LessonMode>('guided');
  const [stepIndex, setStepIndex] = useState(0);
  const [isAnimOn, setIsAnimOn] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [appliedForce, setAppliedForce] = useState(0);

  const pistonSpring = useSpring({
    position: [0, 2.5 - (appliedForce * 0.1), 0] as [number, number, number],
    config: { tension: 120 * speed, friction: 14 },
    immediate: !isAnimOn,
  });

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
      {mode === 'challenge' && (
        <div className="absolute right-3 top-16 z-10 flex w-[min(16rem,calc(100%-1.5rem))] flex-col gap-2 rounded-xl border border-[color-mix(in_srgb,var(--accent-amber)_38%,transparent)] bg-[color-mix(in_srgb,var(--canvas-surface)_92%,transparent)] p-4 text-sky-100 shadow-xl backdrop-blur-md sm:right-4 sm:top-4">
          <span className="mb-1 text-sm font-bold text-[var(--accent-amber)]"><BilingualText en="Challenge: Apply Pressure" bn="অনুশীলন: চাপ প্রয়োগ করুন" /></span>
          <label className="text-xs text-sky-100/75"><BilingualText en="Downward Force" bn="নিম্নমুখী বল" /></label>
          <input 
            type="range" 
            min="0" max="5" step="0.1" 
            value={appliedForce} 
            onChange={(e) => setAppliedForce(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
          <p className="mt-2 text-[11px] leading-relaxed text-sky-100/70">
            <BilingualText en="Observe that despite increasing the force, the volume reduction is negligible (low compressibility)." bn="লক্ষ্য করুন যে বল বাড়ানো সত্ত্বেও আয়তন হ্রাস নগণ্য (নিম্ন সংকোচনশীলতা)।" />
          </p>
        </div>
      )}

      <Canvas camera={{ position: [5.8, 4.7, 7.5], fov: 40 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[10, 10, 10]} intensity={1.25} />
        <OrbitControls target={[0, 0.35, 0]} enablePan={mode === 'explore'} enableZoom={mode === 'explore'} enableRotate={mode === 'explore'} />
        
        {/* Piston */}
        <a.group position={pistonSpring.position as any}>
          <Box args={[3.2, 0.2, 3.2]}>
            <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.2} transparent opacity={0.8} />
          </Box>
        </a.group>

        {/* Container Base */}
        <Box args={[3.4, 0.2, 3.4]} position={[0, -1.1, 0]}>
          <meshStandardMaterial color="#334155" />
        </Box>

        {/* Particles */}
        <group position={[-1, -0.6, -1]}>
          {[0, 1, 2].map(x => 
            [0, 1, 2].map(y => 
              [0, 1, 2].map(z => {
                const isVibrating = isAnimOn && (stepIndex >= 1 || mode === 'challenge' || mode === 'explore');
                const compressionOffset = y * (appliedForce * -0.015);
                
                return (
                  <AnimatedGroup
                    key={`${x}-${y}-${z}`}
                    basePosition={[x, y + compressionOffset, z]}
                    enabled={isVibrating}
                    speed={speed}
                    phase={x * 1.9 + y * 2.4 + z * 2.7}
                    amplitude={0.04}
                    motion="vibrate"
                  >
                    <Sphere args={[0.45, 16, 16]}>
                      <meshStandardMaterial color="#2589dc" roughness={0.3} metalness={0.1} />
                    </Sphere>
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
