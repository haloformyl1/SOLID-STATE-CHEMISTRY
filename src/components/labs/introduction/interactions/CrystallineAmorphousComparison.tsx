import React, { useState } from 'react';
import { BilingualText } from '../../../BilingualText';
import { GuidedLessonEngine } from '../engine/GuidedLessonEngine';
import type { LessonMode, AnimationStep } from '../engine/GuidedLessonTypes';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';

interface RevealedSphereProps {
  position: [number, number, number];
  color: string;
  visible: boolean;
  animated: boolean;
  speed: number;
}

const RevealedSphere: React.FC<RevealedSphereProps> = ({ position, color, visible, animated, speed }) => {
  const spring = useSpring({
    scale: visible ? 1 : 0,
    config: { tension: 170 * speed, friction: 18 },
    immediate: !animated,
  });

  return (
    <a.group position={position} scale={spring.scale}>
      <Sphere args={[0.3, 32, 32]}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.08} />
      </Sphere>
    </a.group>
  );
};

const steps: AnimationStep[] = [
  {
    id: 'empty',
    narration: { en: 'Let us compare two different solids by building them step by step.', bn: 'আসুন ধাপে ধাপে দুটি ভিন্ন কঠিন পদার্থ তৈরি করে তাদের তুলনা করি।' },
    explanation: { en: 'We start with two empty regions of space.', bn: 'আমরা স্থানের দুটি খালি অঞ্চল দিয়ে শুরু করছি।' },
    observation: { en: 'Observe the left panel (Crystalline) and right panel (Amorphous).', bn: 'বাম প্যানেল (স্ফটিকাকার) এবং ডান প্যানেল (অস্ফটিকাকার) লক্ষ্য করুন।' }
  },
  {
    id: 'row1-cryst',
    narration: { en: 'First, we add an ordered row of particles in the crystalline solid.', bn: 'প্রথমে, আমরা স্ফটিকাকার কঠিনে কণার একটি সুশৃঙ্খল সারি যোগ করি।' },
    explanation: { en: 'Particles are arranged at regular intervals.', bn: 'কণাগুলি নিয়মিত ব্যবধানে সাজানো থাকে।' },
    observation: { en: 'Notice the perfectly straight line of particles.', bn: 'কণাগুলির নিখুঁত সরলরেখাটি লক্ষ্য করুন।' }
  },
  {
    id: 'rows-cryst',
    narration: { en: 'Additional rows are added following the same periodic pattern.', bn: 'একই পর্যায়ক্রমিক ধরন অনুসরণ করে অতিরিক্ত সারি যোগ করা হয়।' },
    explanation: { en: 'This creates long-range periodic order in three dimensions.', bn: 'এটি ত্রিমাত্রিক দীর্ঘ-পাল্লার পর্যায়ক্রমিক শৃঙ্খলা তৈরি করে।' },
    observation: { en: 'The entire arrangement is highly symmetrical and repetitive.', bn: 'পুরো বিন্যাসটি অত্যন্ত প্রতিসম এবং পুনরাবৃত্তিমূলক।' }
  },
  {
    id: 'amorph-build',
    narration: { en: 'Now let us build the amorphous solid.', bn: 'এখন অস্ফটিকাকার কঠিনটি তৈরি করা যাক।' },
    explanation: { en: 'Particles are fixed non-periodically, without a long-range repeating pattern.', bn: 'দীর্ঘ-পাল্লার পুনরাবৃত্তিমূলক ধরন ছাড়াই কণাগুলি অপর্যায়ক্রমিকভাবে স্থির থাকে।' },
    observation: { en: 'The arrangement appears irregular and lacks a global pattern.', bn: 'বিন্যাসটি অনিয়মিত দেখায় এবং এর কোনো সার্বিক ধরন নেই।' }
  },
  {
    id: 'amorph-short',
    narration: { en: 'However, amorphous solids may possess short-range local order.', bn: 'তবে, অস্ফটিকাকার কঠিনে স্বল্প-পাল্লার স্থানীয় শৃঙ্খলা থাকতে পারে।' },
    explanation: { en: 'Immediate neighbours might form small, ordered clusters.', bn: 'নিকটবর্তী কণাগুলি ছোট, সুশৃঙ্খল ক্লাস্টার গঠন করতে পারে।' },
    observation: { en: 'Observe the highlighted local cluster that does not repeat everywhere.', bn: 'আলোকিত স্থানীয় ক্লাস্টারটি লক্ষ্য করুন যা সব জায়গায় পুনরাবৃত্তি করে না।' },
    checkpointQuestion: { en: 'Do amorphous solids completely lack any form of order?', bn: 'অস্ফটিকাকার কঠিনে কি কোনো ধরনের শৃঙ্খলাই থাকে না?' },
    checkpointOptions: [
      { text: { en: 'Yes, they are completely chaotic.', bn: 'হ্যাঁ, তারা সম্পূর্ণ বিশৃঙ্খল।' }, isCorrect: false },
      { text: { en: 'No, they may have short-range order.', bn: 'না, তাদের স্বল্প-পাল্লার শৃঙ্খলা থাকতে পারে।' }, isCorrect: true }
    ],
    checkpointFeedback: { en: 'Correct! They lack long-range order but often have short-range order.', bn: 'সঠিক! তাদের দীর্ঘ-পাল্লার শৃঙ্খলা থাকে না কিন্তু প্রায়শই স্বল্প-পাল্লার শৃঙ্খলা থাকে।' }
  },
  {
    id: 'scanner-cryst',
    narration: { en: 'Let us scan the crystalline solid for long-range order.', bn: 'আসুন দীর্ঘ-পাল্লার শৃঙ্খলার জন্য স্ফটিকাকার কঠিনটি স্ক্যান করি।' },
    explanation: { en: 'The scanner detects identical patterns extending over large distances.', bn: 'স্ক্যানারটি বিশাল দূরত্ব জুড়ে বিস্তৃত অভিন্ন ধরন শনাক্ত করে।' },
    observation: { en: 'The pattern repeats perfectly across the entire sample.', bn: 'পুরো নমুনা জুড়ে ধরনটি নিখুঁতভাবে পুনরাবৃত্তি করে।' }
  },
  {
    id: 'scanner-amorph',
    narration: { en: 'Now we scan the amorphous solid.', bn: 'এখন আমরা অস্ফটিকাকার কঠিনটি স্ক্যান করি।' },
    explanation: { en: 'The scanner cannot find the same periodic pattern repeated over long distances.', bn: 'স্ক্যানারটি দীর্ঘ দূরত্ব জুড়ে পুনরাবৃত্ত একই পর্যায়ক্রমিক ধরন খুঁজে পায় না।' },
    observation: { en: 'The local order breaks down quickly.', bn: 'স্থানীয় শৃঙ্খলা দ্রুত ভেঙে যায়।' }
  },
  {
    id: 'melting',
    narration: { en: 'Because of regular packing, pure crystalline solids melt sharply.', bn: 'নিয়মিত প্যাকিংয়ের কারণে, বিশুদ্ধ স্ফটিকাকার কঠিন পদার্থ নির্দিষ্ট তাপমাত্রায় গলে যায়।' },
    explanation: { en: 'Amorphous solids soften gradually over a temperature range because different regions have different bonding strengths.', bn: 'অস্ফটিকাকার কঠিন পদার্থ নির্দিষ্ট তাপমাত্রা পরিসরে ধীরে ধীরে নরম হয় কারণ বিভিন্ন অঞ্চলের বন্ধন শক্তি আলাদা হয়।' },
    observation: { en: 'Crystalline melts at exactly one temperature; amorphous softens gradually.', bn: 'স্ফটিকাকার ঠিক একটি তাপমাত্রায় গলে যায়; অস্ফটিকাকার ধীরে ধীরে নরম হয়।' }
  }
];

export const CrystallineAmorphousComparison: React.FC = () => {
  const [mode, setMode] = useState<LessonMode>('guided');
  const [stepIndex, setStepIndex] = useState(0);
  const [isAnimOn, setIsAnimOn] = useState(true);
  const [speed, setSpeed] = useState(1);

  // Generate Crystalline Positions
  const crystPositions = [];
  for (let x = -1.5; x <= 1.5; x += 1) {
    for (let y = -1.5; y <= 1.5; y += 1) {
      crystPositions.push([x, y, 0]);
    }
  }

  // Generate Amorphous Positions
  const amorphPositions = [
    [-1.2, -1.5, 0], [-0.2, -1.4, 0], [1.1, -1.6, 0], [1.5, -0.8, 0],
    [-1.6, -0.5, 0], [-0.5, -0.6, 0], [0.3, -0.4, 0], [1.2, 0.2, 0],
    [-1.4, 0.6, 0], [-0.2, 0.5, 0], [0.8, 0.9, 0], [1.6, 1.2, 0],
    [-1.0, 1.5, 0], [0.2, 1.6, 0], [1.0, 1.7, 0]
  ];

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
      <div className="pointer-events-none absolute inset-x-3 top-16 z-10 flex gap-3 sm:inset-x-8 sm:top-4 sm:gap-8">
        <div className="flex-1 rounded-lg border border-sky-400/20 bg-[color-mix(in_srgb,var(--canvas-surface)_88%,transparent)] px-2 py-2 text-center text-sm font-bold text-sky-300 shadow-lg backdrop-blur-sm sm:text-base">
          <BilingualText en="Crystalline Solid" bn="স্ফটিকাকার কঠিন" />
        </div>
        <div className="flex-1 rounded-lg border border-amber-400/20 bg-[color-mix(in_srgb,var(--canvas-surface)_88%,transparent)] px-2 py-2 text-center text-sm font-bold text-amber-300 shadow-lg backdrop-blur-sm sm:text-base">
          <BilingualText en="Amorphous Solid" bn="অস্ফটিকাকার কঠিন" />
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 11.5], fov: 42 }} dpr={[1, 1.75]}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[0, 2, 10]} intensity={1.2} />
        <OrbitControls enablePan={mode === 'explore'} enableZoom={mode === 'explore'} enableRotate={mode === 'explore'} />
        
        {/* Crystalline Group - Left Side */}
        <group position={[-2.5, 0, 0]}>
          {crystPositions.map((pos, idx) => {
            const isRow1 = pos[1] === -1.5;
            const visible = stepIndex >= 2 || (stepIndex >= 1 && isRow1) || mode !== 'guided';
            
            return (
              <RevealedSphere
                key={`c-${idx}`}
                position={pos as [number, number, number]}
                color={stepIndex === 5 ? '#10b981' : '#2589dc'}
                visible={visible}
                animated={isAnimOn}
                speed={speed}
              />
            );
          })}
          
          {/* Scanner Line Crystalline */}
          {stepIndex === 5 && (
            <Line points={[[-2, -1.8, 0], [2, -1.8, 0]]} color="#10b981" lineWidth={3} />
          )}
        </group>

        {/* Divider */}
        <Line points={[[0, -3, 0], [0, 3, 0]]} color="#64748b" lineWidth={1} dashed />

        {/* Amorphous Group - Right Side */}
        <group position={[2.5, 0, 0]}>
          {amorphPositions.map((pos, idx) => {
            const visible = stepIndex >= 3 || mode !== 'guided';
            // Highlight a small local cluster for short range order
            const isCluster = idx === 5 || idx === 6 || idx === 9;
            const color = (stepIndex === 4 && isCluster) ? "#ef4444" : "#f59e0b";
            
            return (
              <RevealedSphere
                key={`a-${idx}`}
                position={pos as [number, number, number]}
                color={color}
                visible={visible}
                animated={isAnimOn}
                speed={speed}
              />
            );
          })}
          
           {/* Scanner Line Amorphous */}
           {stepIndex === 6 && (
            <Line points={[[-2, -1.8, 0], [-1, -1.8, 0]]} color="#ef4444" lineWidth={3} />
          )}
        </group>
      </Canvas>
    </GuidedLessonEngine>
  );
};
