import React, { useState } from 'react';
import { BilingualText } from '../../../BilingualText';
import { GuidedLessonEngine } from '../engine/GuidedLessonEngine';
import type { LessonMode, AnimationStep } from '../engine/GuidedLessonTypes';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

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

  const bulbColor = isMolten && isAnimOn ? "#fef08a" : "#475569";
  const bulbGlow = isMolten && isAnimOn ? 1.5 : 0;

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
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-[var(--bg-sec)]/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-amber-500/20 w-64">
          <span className="text-sm font-bold text-amber-600 dark:text-amber-500 mb-2"><BilingualText en="Challenge: Heat the Solid" bn="অনুশীলন: কঠিনকে উত্তপ্ত করুন" /></span>
          <label className="text-xs text-[var(--text-norm)]">Temperature (°C): {temperature}</label>
          <input 
            type="range" 
            min="25" max="1000" step="5" 
            value={temperature} 
            onChange={(e) => setTemperature(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
          <p className="text-[11px] text-[var(--text-norm)] opacity-70 mt-2">
            <BilingualText en="Heat above melting point (~800°C) to observe conductivity." bn="পরিবাহিতা পর্যবেক্ষণ করতে গলনাঙ্কের উপরে (~800°C) উত্তপ্ত করুন।" />
          </p>
        </div>
      )}

      {/* 2D Overlay for Bulb (easier than full 3D bulb modeling) */}
      <div className="absolute top-8 left-8 z-10 flex flex-col items-center">
        <div 
          className="w-12 h-12 rounded-full border-2 border-slate-600 transition-all duration-500"
          style={{ 
            backgroundColor: bulbColor, 
            boxShadow: isMolten && isAnimOn ? `0 0 20px 5px rgba(254, 240, 138, 0.6)` : 'none' 
          }}
        ></div>
        <div className="w-6 h-6 bg-slate-700 rounded-b-md"></div>
      </div>

      <Canvas camera={{ position: [0, 2, 7], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
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
                
                // If molten, they move. Positive towards negative electrode (left), Negative towards positive electrode (right)
                const time = Date.now() * 0.002 * speed;
                let px = x, py = y, pz = z;
                
                if (isMolten && isAnimOn) {
                  // Random drift + directional flow
                  const driftX = isPositive ? -1 * (time % 2) : 1 * (time % 2);
                  const noise = Math.sin(time * 5 + x + y) * 0.5;
                  px = x * 1.5 + driftX + noise;
                  py = y * 1.5 + Math.cos(time * 4 + z) * 0.5;
                  pz = z * 1.5 + Math.sin(time * 3 + x) * 0.5;
                }

                return (
                  <Sphere key={`${x}${y}${z}`} args={[0.3, 32, 32]} position={[px, py, pz]}>
                    <meshStandardMaterial color={isPositive ? "#ef4444" : "#10b981"} />
                  </Sphere>
                );
              })
            )
          )}
        </group>
      </Canvas>
    </GuidedLessonEngine>
  );
};
