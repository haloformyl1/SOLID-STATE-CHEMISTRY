import React, { useState } from 'react';
import { BilingualText } from '../../../BilingualText';
import { GuidedLessonEngine } from '../engine/GuidedLessonEngine';
import type { LessonMode, AnimationStep } from '../engine/GuidedLessonTypes';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

const steps: AnimationStep[] = [
  {
    id: 'intro',
    narration: { en: 'Let us measure a property of this crystalline solid in different directions.', bn: 'আসুন বিভিন্ন দিকে এই স্ফটিকাকার কঠিনটির একটি ধর্ম পরিমাপ করি।' },
    explanation: { en: 'A measurement probe is placed along Direction A.', bn: 'দিক A বরাবর একটি পরিমাপক প্রোব স্থাপন করা হয়েছে।' },
    observation: { en: 'Observe the particles encountered along this path.', bn: 'এই পথ বরাবর যে কণাগুলি পাওয়া যাচ্ছে তা লক্ষ্য করুন।' }
  },
  {
    id: 'measure-b',
    narration: { en: 'Now we rotate the probe to Direction B.', bn: 'এখন আমরা প্রোবটিকে দিক B-এর দিকে ঘোরাব।' },
    explanation: { en: 'Notice that the sequence and distance between particles have changed.', bn: 'লক্ষ্য করুন যে কণাগুলির ক্রম এবং তাদের মধ্যবর্তী দূরত্ব পরিবর্তিত হয়েছে।' },
    observation: { en: 'The measurement value will be different because the internal environment is different.', bn: 'পরিমাপের মান ভিন্ন হবে কারণ অভ্যন্তরীণ পরিবেশ ভিন্ন।' }
  },
  {
    id: 'measure-c',
    narration: { en: 'Finally, we measure along Direction C.', bn: 'সবশেষে, আমরা দিক C বরাবর পরিমাপ করব।' },
    explanation: { en: 'Because values change depending on the direction, the solid is anisotropic.', bn: 'যেহেতু দিকের উপর নির্ভর করে মান পরিবর্তিত হয়, তাই কঠিনটি অসমদিক।' },
    observation: { en: 'Crystalline solids are generally anisotropic.', bn: 'স্ফটিকাকার কঠিন পদার্থ সাধারণত অসমদিক হয়।' },
    checkpointQuestion: { en: 'If the property was identical in all directions, what would we call it?', bn: 'যদি সব দিকে বৈশিষ্ট্যটি অভিন্ন হত, তবে আমরা একে কী বলতাম?' },
    checkpointOptions: [
      { text: { en: 'Isotropic', bn: 'সমদিক বা দিকনিরপেক্ষ' }, isCorrect: true },
      { text: { en: 'Anisotropic', bn: 'অসমদিক বা দিকনির্ভর' }, isCorrect: false }
    ],
    checkpointFeedback: { en: 'Correct! Isotropic means the property is independent of direction.', bn: 'সঠিক! সমদিক মানে বৈশিষ্ট্যটি দিকের উপর নির্ভর করে না।' }
  }
];

export const AnisotropyLab: React.FC = () => {
  const [mode, setMode] = useState<LessonMode>('guided');
  const [stepIndex, setStepIndex] = useState(0);
  const [isAnimOn, setIsAnimOn] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [probeAngle, setProbeAngle] = useState(0); // For challenge mode

  const currentAngle = mode === 'guided' 
    ? (stepIndex === 0 ? 0 : stepIndex === 1 ? Math.PI / 4 : Math.PI / 2) 
    : probeAngle;

  const probeSpring = useSpring({
    rotation: [0, 0, currentAngle] as [number, number, number],
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
          <span className="mb-1 text-sm font-bold text-[var(--accent-amber)]"><BilingualText en="Challenge: Measure Anisotropy" bn="অনুশীলন: অসমদিকতা পরিমাপ করুন" /></span>
          <label className="text-xs text-sky-100/75"><BilingualText en="Probe Angle" bn="প্রোবের কোণ" /></label>
          <input 
            type="range" 
            min="0" max={Math.PI} step="0.1" 
            value={probeAngle} 
            onChange={(e) => setProbeAngle(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
          <div className="mt-2 rounded border border-white/10 bg-[var(--canvas-background)] p-2 font-mono text-xs text-sky-100">
            Value: {Math.abs(Math.sin(probeAngle * 2)).toFixed(2)} Ω/m
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 8.4], fov: 40 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[0, 0, 10]} intensity={1.2} />
        <OrbitControls enablePan={mode === 'explore'} enableZoom={mode === 'explore'} enableRotate={mode === 'explore'} />
        
        {/* Ordered Array (Crystalline) */}
        <group>
          {[-2, -1, 0, 1, 2].map(x => 
            [-2, -1, 0, 1, 2].map(y => {
              const isAlternate = (Math.abs(x) + Math.abs(y)) % 2 === 0;
              return (
                <Sphere key={`${x}-${y}`} args={[0.3, 16, 16]} position={[x, y, 0]}>
                  <meshStandardMaterial color={isAlternate ? "#3b82f6" : "#8b5cf6"} />
                </Sphere>
              )
            })
          )}
        </group>
        
        {/* Measurement Probe */}
        <a.group rotation={probeSpring.rotation as any}>
          <Line points={[[-3, 0, 0.5], [3, 0, 0.5]]} color="#ef4444" lineWidth={5} />
          <mesh position={[0, 0, 0.5]}>
            <ringGeometry args={[0.4, 0.5, 32]} />
            <meshBasicMaterial color="#ef4444" side={2} />
          </mesh>
        </a.group>

      </Canvas>
    </GuidedLessonEngine>
  );
};
