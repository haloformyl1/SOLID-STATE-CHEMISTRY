import React, { useState } from 'react';
import { BilingualText } from '../../../BilingualText';
import { GuidedLessonEngine } from '../engine/GuidedLessonEngine';
import type { LessonMode, AnimationStep } from '../engine/GuidedLessonTypes';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

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
    config: { tension: 120, friction: 14 }
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
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-[var(--bg-sec)]/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-amber-500/20 w-64">
          <span className="text-sm font-bold text-amber-600 dark:text-amber-500 mb-2"><BilingualText en="Challenge: Apply Pressure" bn="অনুশীলন: চাপ প্রয়োগ করুন" /></span>
          <label className="text-xs text-[var(--text-norm)]"><BilingualText en="Downward Force" bn="নিম্নমুখী বল" /></label>
          <input 
            type="range" 
            min="0" max="5" step="0.1" 
            value={appliedForce} 
            onChange={(e) => setAppliedForce(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
          <p className="text-[11px] text-[var(--text-norm)] opacity-70 mt-2">
            <BilingualText en="Observe that despite increasing the force, the volume reduction is negligible (low compressibility)." bn="লক্ষ্য করুন যে বল বাড়ানো সত্ত্বেও আয়তন হ্রাস নগণ্য (নিম্ন সংকোচনশীলতা)।" />
          </p>
        </div>
      )}

      <Canvas camera={{ position: [5, 4, 5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls enablePan={mode === 'explore'} enableZoom={mode === 'explore'} />
        
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
                // Extremely minor compression offset based on applied force
                const compressionOffset = y * (appliedForce * -0.015);
                const vibrationOffset = isVibrating ? Math.sin(Date.now() * 0.02 * speed + x + y + z) * 0.04 : 0;
                
                return (
                  <group key={`${x}-${y}-${z}`} position={[x + vibrationOffset, y + compressionOffset + vibrationOffset, z + vibrationOffset]}>
                    <Sphere args={[0.45, 32, 32]}>
                      <meshStandardMaterial color="#3b82f6" />
                    </Sphere>
                  </group>
                )
              })
            )
          )}
        </group>
      </Canvas>
    </GuidedLessonEngine>
  );
};
