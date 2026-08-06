import React, { useState, useEffect, useRef } from 'react';
import { BilingualText } from '../../../BilingualText';
import { GuidedLessonEngine } from '../engine/GuidedLessonEngine';
import type { LessonMode, AnimationStep, BilingualString } from '../engine/GuidedLessonTypes';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import { AppCanvas as Canvas } from '../../../ui/AppCanvas';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Minus, Plus } from 'lucide-react';

// --- Components ---

interface ThermalSphereProps {
  position: [number, number, number];
  color: string;
  visible: boolean;
  animated: boolean;
  speed: number;
  temperature: number;
  type: 'crystalline' | 'amorphous';
}

const ThermalSphere: React.FC<ThermalSphereProps> = ({ position, color, visible, animated, speed, temperature, type }) => {
  const spring = useSpring({
    scale: visible ? 1 : 0,
    config: { tension: 170 * speed, friction: 18 },
    immediate: !animated,
  });

  const meshRef = useRef<THREE.Group>(null);
  const targetPos = useRef(new THREE.Vector3(...position));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const [wasMelted, setWasMelted] = useState(false);

  useEffect(() => {
     velocity.current.set((Math.random()-0.5)*0.1, (Math.random()-0.5)*0.1, 0);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !animated) return;
    const time = state.clock.getElapsedTime();
    const t = temperature;

    if (type === 'crystalline') {
      const threshold = 74;
      if (t < threshold) {
         if (wasMelted) {
             targetPos.current.lerp(new THREE.Vector3(...position), 0.05);
             if (targetPos.current.distanceTo(new THREE.Vector3(...position)) < 0.01) {
                 setWasMelted(false);
             }
         }
         const amplitude = 0.01 + (t / 100) * 0.04;
         meshRef.current.position.set(
            targetPos.current.x + Math.sin(time * 15 * speed + position[0]) * amplitude,
            targetPos.current.y + Math.cos(time * 13 * speed + position[1]) * amplitude,
            0
         );
      } else {
         setWasMelted(true);
         velocity.current.y -= 0.005 * speed; // Gravity
         targetPos.current.add(velocity.current.clone().multiplyScalar(speed * 0.8));
         
         if (targetPos.current.y < -1.5) { targetPos.current.y = -1.5; velocity.current.y *= -0.4; }
         if (targetPos.current.y > 1.5) { targetPos.current.y = 1.5; velocity.current.y *= -1; }
         if (targetPos.current.x > 1.5) { targetPos.current.x = 1.5; velocity.current.x *= -1; }
         if (targetPos.current.x < -1.5) { targetPos.current.x = -1.5; velocity.current.x *= -1; }
         
         velocity.current.x += (Math.random() - 0.5) * 0.01;
         velocity.current.clampLength(0, 0.15);

         meshRef.current.position.copy(targetPos.current);
      }
    } else {
      const softenStart = 55;
      if (t < softenStart) {
         if (wasMelted) {
             targetPos.current.lerp(new THREE.Vector3(...position), 0.05);
             if (targetPos.current.distanceTo(new THREE.Vector3(...position)) < 0.01) {
                 setWasMelted(false);
             }
         }
         const amplitude = 0.01 + (t / 100) * 0.04;
         meshRef.current.position.set(
            targetPos.current.x + Math.sin(time * 12 * speed + position[0]) * amplitude,
            targetPos.current.y + Math.cos(time * 14 * speed + position[1]) * amplitude,
            0
         );
      } else {
         setWasMelted(true);
         const mobility = Math.min(1, (t - softenStart) / 25);
         const liquidFactor = Math.max(0, Math.min(1, (t - 75) / 25));
         
         if (liquidFactor > 0) {
            velocity.current.y -= 0.005 * speed * liquidFactor; // Gradual gravity
         }

         const speedMult = speed * (0.01 * mobility + 0.8 * liquidFactor);
         targetPos.current.add(velocity.current.clone().multiplyScalar(speedMult));
         
         const limitXMax = (position[0] + 1.2) * (1 - liquidFactor) + 1.5 * liquidFactor;
         const limitXMin = (position[0] - 1.2) * (1 - liquidFactor) + -1.5 * liquidFactor;
         const limitYMax = (position[1] + 1.2) * (1 - liquidFactor) + 1.5 * liquidFactor;
         const limitYMin = (position[1] - 1.2) * (1 - liquidFactor) + -1.5 * liquidFactor;
         
         if (targetPos.current.y < limitYMin) { targetPos.current.y = limitYMin; velocity.current.y *= -0.4; }
         if (targetPos.current.y > limitYMax) { targetPos.current.y = limitYMax; velocity.current.y *= -1; }
         if (targetPos.current.x > limitXMax) { targetPos.current.x = limitXMax; velocity.current.x *= -1; }
         if (targetPos.current.x < limitXMin) { targetPos.current.x = limitXMin; velocity.current.x *= -1; }
         
         velocity.current.x += (Math.random() - 0.5) * 0.01 * (mobility + liquidFactor);
         velocity.current.y += (Math.random() - 0.5) * 0.01 * mobility * (1 - liquidFactor);
         velocity.current.clampLength(0, 0.15);

         const amplitude = 0.01 + (t / 100) * 0.06;
         meshRef.current.position.set(
            targetPos.current.x + Math.sin(time * 12 * speed) * amplitude,
            targetPos.current.y + Math.cos(time * 14 * speed) * amplitude,
            0
         );
      }
    }
  });

  return (
    <a.group scale={spring.scale} ref={meshRef}>
      <Sphere args={[0.3, 16, 16]}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.08} />
      </Sphere>
    </a.group>
  );
};

const CrystallineState = ({ temperature }: { temperature: number }) => {
   let state = "Ordered solid";
   let bnState = "সুশৃঙ্খল কঠিন";
   if (temperature >= 72 && temperature < 76) {
       state = "Melting";
       bnState = "গলছে";
   } else if (temperature >= 76) {
       state = "Disordered mobile state";
       bnState = "বিশৃঙ্খল গতিশীল অবস্থা";
   } else if (temperature > 50) {
       state = "Approaching melting point";
       bnState = "গলনাঙ্কের কাছাকাছি";
   }

   return (
       <div className="flex flex-col gap-1 rounded-lg border border-sky-400/20 bg-sky-950/80 px-3 py-2 text-xs text-sky-100 shadow-lg backdrop-blur-sm sm:text-sm">
          <div className="font-bold text-sky-300"><BilingualText en="Crystalline Solid" bn="স্ফটিকাকার কঠিন" /></div>
          <div><BilingualText en={`State: ${state}`} bn={`অবস্থা: ${bnState}`} /></div>
       </div>
   );
};

const AmorphousState = ({ temperature }: { temperature: number }) => {
   let state = "Rigid amorphous solid";
   let bnState = "দৃঢ় অস্ফটিকাকার কঠিন";
   if (temperature >= 80) {
       state = "Highly mobile state";
       bnState = "উচ্চ গতিশীল অবস্থা";
   } else if (temperature >= 55) {
       state = "Softening range";
       bnState = "নরম হওয়ার সীমা";
   } else if (temperature > 35) {
       state = "Beginning to soften";
       bnState = "নরম হতে শুরু করেছে";
   }

   return (
       <div className="flex flex-col gap-1 rounded-lg border border-amber-400/20 bg-amber-950/80 px-3 py-2 text-xs text-amber-100 shadow-lg backdrop-blur-sm sm:text-sm">
          <div className="font-bold text-amber-300"><BilingualText en="Amorphous Solid" bn="অস্ফটিকাকার কঠিন" /></div>
          <div><BilingualText en={`State: ${state}`} bn={`অবস্থা: ${bnState}`} /></div>
       </div>
   );
};

const TemperatureResponseGraph = ({ temperature }: { temperature: number }) => {
    const width = 200;
    const height = 80;
    const padding = 10;
    
    const getCrystY = (t: number) => {
        if (t <= 72) return 100;
        if (t < 76) return 100 - ((t - 72)/4) * 80;
        return 20 - ((t - 76)/24) * 10;
    };
    
    const getAmorphY = (t: number) => {
        if (t <= 45) return 100;
        if (t < 85) return 100 - ((t - 45)/40) * 80;
        return 20 - ((t - 85)/15) * 10;
    };

    const crystPoints = Array.from({length: 100}, (_, i) => `${(i/100)*(width-2*padding)+padding},${height - padding - (getCrystY(i)/100)*(height-2*padding)}`).join(' ');
    const amorphPoints = Array.from({length: 100}, (_, i) => `${(i/100)*(width-2*padding)+padding},${height - padding - (getAmorphY(i)/100)*(height-2*padding)}`).join(' ');

    const activeX = (temperature/100)*(width-2*padding)+padding;
    const activeCrystY = height - padding - (getCrystY(temperature)/100)*(height-2*padding);
    const activeAmorphY = height - padding - (getAmorphY(temperature)/100)*(height-2*padding);

    return (
        <div className="flex flex-col gap-1 rounded-xl bg-[var(--surface-secondary)]/90 p-2 text-xs shadow-lg backdrop-blur-md">
            <div className="text-center font-semibold text-[var(--text-secondary)]"><BilingualText en="Simplified conceptual comparison" bn="সরলীকৃত ধারণামূলক তুলনা" /></div>
            <svg width={width} height={height} className="overflow-visible">
                <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="var(--border-strong)" />
                <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="var(--border-strong)" />
                
                <polyline points={crystPoints} fill="none" stroke="#38bdf8" strokeWidth="2" />
                <polyline points={amorphPoints} fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 2" />

                <line x1={activeX} y1={padding} x2={activeX} y2={height-padding} stroke="var(--text-secondary)" strokeDasharray="2 2" opacity={0.5} />
                <circle cx={activeX} cy={activeCrystY} r={4} fill="#38bdf8" />
                <circle cx={activeX} cy={activeAmorphY} r={4} fill="#fbbf24" />
            </svg>
            <div className="flex justify-between px-2 text-[10px] text-[var(--text-secondary)]">
                <span><BilingualText en="Relative Temp" bn="আপেক্ষিক তাপমাত্রা" /></span>
                <div className="flex gap-2">
                    <span className="text-sky-400">Cryst.</span>
                    <span className="text-amber-400">Amorph.</span>
                </div>
            </div>
        </div>
    );
};

const TemperatureControlPanel = ({
  temperature,
  setTemperature,
  isAutoHeating,
  setIsAutoHeating,
  disabled // represents narrative mode where manual dragging is restricted
}: any) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/20 bg-[var(--surface-secondary)]/90 p-4 shadow-xl backdrop-blur-md">
       <div className="flex items-center justify-between">
         <span className="font-bold text-[var(--text-primary)]"><BilingualText en="Temperature Comparison" bn="তাপমাত্রা তুলনা" /></span>
         <span className="text-sm font-mono text-[var(--text-secondary)]">{temperature.toFixed(0)}</span>
       </div>
       <div className="flex items-center gap-3">
         <button type="button" disabled={disabled} onClick={() => { setIsAutoHeating(false); setTemperature(Math.max(0, temperature - 5)); }} className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-tertiary)] hover:bg-[var(--surface-tertiary-hover)] disabled:opacity-50"><Minus size={16} /></button>
         <input type="range" min="0" max="100" value={temperature} onChange={(e) => { setIsAutoHeating(false); setTemperature(Number(e.target.value)); }} disabled={disabled || isAutoHeating} className="w-full" aria-label="Relative Temperature" />
         <button type="button" disabled={disabled} onClick={() => { setIsAutoHeating(false); setTemperature(Math.min(100, temperature + 5)); }} className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-tertiary)] hover:bg-[var(--surface-tertiary-hover)] disabled:opacity-50"><Plus size={16} /></button>
       </div>
       <div className="flex gap-2">
         <button type="button" onClick={() => setIsAutoHeating(!isAutoHeating)} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-3 py-1.5 text-sm font-bold text-white hover:bg-[var(--accent-primary-hover)]">
            {isAutoHeating ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Heat</>}
         </button>
         <button type="button" disabled={disabled} onClick={() => { setIsAutoHeating(false); setTemperature(20); }} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--surface-tertiary)] px-3 py-1.5 text-sm font-bold hover:bg-[var(--surface-tertiary-hover)] disabled:opacity-50">
            <RotateCcw size={16} /> Cool Down
         </button>
       </div>
    </div>
  );
};

const ChallengeOverlay = ({ temperature, challengeStep, setChallengeStep, challengeFeedback, setChallengeFeedback }: any) => {
    const handleCheck1 = () => {
        if (temperature >= 55 && temperature <= 80) {
            setChallengeFeedback({ en: 'Correct! The amorphous solid softens gradually.', bn: 'সঠিক! অস্ফটিকাকার কঠিন ধীরে ধীরে নরম হয়।' });
            setTimeout(() => { setChallengeStep(2); setChallengeFeedback(null); }, 2500);
        } else {
            setChallengeFeedback({ en: 'Incorrect. Increase the temperature until local particle rearrangement begins gradually in the amorphous model.', bn: 'ভুল। অস্ফটিকাকার মডেলে কণার স্থানীয় পুনর্বিন্যাস ধীরে ধীরে শুরু না হওয়া পর্যন্ত তাপমাত্রা বাড়ান।' });
        }
    };

    const handleCheck2 = () => {
        if (temperature >= 72 && temperature <= 76) {
            setChallengeFeedback({ en: 'Correct! Crystalline solids melt sharply over a narrow interval.', bn: 'সঠিক! স্ফটিকাকার কঠিন একটি সংকীর্ণ সীমার মধ্যে তীক্ষ্ণভাবে গলে।' });
            setTimeout(() => { setChallengeStep(3); setChallengeFeedback(null); }, 2500);
        } else {
            setChallengeFeedback({ en: 'Incorrect. Find the narrow temperature interval where long-range order is rapidly lost.', bn: 'ভুল। সেই সংকীর্ণ তাপমাত্রা সীমা খুঁজুন যেখানে দীর্ঘ-পাল্লার শৃঙ্খলা দ্রুত হারিয়ে যায়।' });
        }
    };

    const handleCheck3 = (answer: string) => {
        if (answer === 'sharp') {
            setChallengeFeedback({ en: 'Correct! Crystalline solids have a sharp melting transition.', bn: 'সঠিক! স্ফটিকাকার কঠিনে তীক্ষ্ণ গলন পরিবর্তন থাকে।' });
            setTimeout(() => { setChallengeStep(4); setChallengeFeedback(null); }, 2500);
        } else {
            setChallengeFeedback({ en: 'Incorrect. Look at the graph again.', bn: 'ভুল। আবার গ্রাফটি দেখুন।' });
        }
    };

    const handleCheck4 = (answer: string) => {
        if (answer === 'gradual') {
            setChallengeFeedback({ en: 'Correct! Amorphous solids soften over a gradual range.', bn: 'সঠিক! অস্ফটিকাকার কঠিন ধীরে ধীরে নরম হয়।' });
            setTimeout(() => { setChallengeStep(5); setChallengeFeedback(null); }, 2500);
        } else {
            setChallengeFeedback({ en: 'Incorrect. They do not have a sharp melting point.', bn: 'ভুল। তাদের তীক্ষ্ণ গলনাঙ্ক নেই।' });
        }
    };

    if (challengeStep === 5) {
        return (
            <div className="absolute right-4 top-24 z-30 w-64 rounded-xl bg-green-950/90 p-4 text-green-100 shadow-xl backdrop-blur-md">
                <div className="font-bold"><BilingualText en="Challenges Complete!" bn="অনুশীলন সম্পন্ন!" /></div>
            </div>
        );
    }

    return (
        <div className="absolute right-4 top-24 z-30 flex w-72 flex-col gap-3 rounded-xl border border-amber-500/30 bg-[var(--surface-secondary)] p-4 text-[var(--text-primary)] shadow-xl backdrop-blur-md">
            <div className="text-sm font-bold text-amber-500"><BilingualText en={`Challenge ${challengeStep} of 4`} bn={`অনুশীলন ৪ এর ${challengeStep}`} /></div>
            
            {challengeStep === 1 && (
                <>
                    <div className="text-sm"><BilingualText en="Set the temperature where the amorphous solid begins to soften." bn="যে তাপমাত্রায় অস্ফটিকাকার কঠিন নরম হতে শুরু করে সেটি সেট করুন।" /></div>
                    <button onClick={handleCheck1} className="rounded bg-amber-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-amber-500">Submit</button>
                </>
            )}
            
            {challengeStep === 2 && (
                <>
                    <div className="text-sm"><BilingualText en="Set the temperature near the crystalline melting threshold." bn="স্ফটিকাকার গলনাঙ্কের কাছাকাছি তাপমাত্রা সেট করুন।" /></div>
                    <button onClick={handleCheck2} className="rounded bg-amber-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-amber-500">Submit</button>
                </>
            )}

            {challengeStep === 3 && (
                <>
                    <div className="text-sm"><BilingualText en="Which curve on the graph represents the crystalline solid melting?" bn="গ্রাফের কোন বক্ররেখাটি স্ফটিকাকার কঠিনের গলন উপস্থাপন করে?" /></div>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => handleCheck3('sharp')} className="rounded bg-[var(--surface-tertiary)] px-3 py-1.5 text-sm hover:bg-[var(--surface-tertiary-hover)]"><BilingualText en="The sharp drop" bn="তীক্ষ্ণ পতন" /></button>
                        <button onClick={() => handleCheck3('gradual')} className="rounded bg-[var(--surface-tertiary)] px-3 py-1.5 text-sm hover:bg-[var(--surface-tertiary-hover)]"><BilingualText en="The gradual drop" bn="ধীর পতন" /></button>
                    </div>
                </>
            )}

            {challengeStep === 4 && (
                <>
                    <div className="text-sm"><BilingualText en="Complete the statement: Amorphous solids soften over a..." bn="বিবৃতিটি সম্পূর্ণ করুন: অস্ফটিকাকার কঠিন নরম হয় একটি..." /></div>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => handleCheck4('narrow')} className="rounded bg-[var(--surface-tertiary)] px-3 py-1.5 text-sm hover:bg-[var(--surface-tertiary-hover)]"><BilingualText en="narrow temperature interval" bn="সংকীর্ণ তাপমাত্রা সীমার মধ্যে" /></button>
                        <button onClick={() => handleCheck4('gradual')} className="rounded bg-[var(--surface-tertiary)] px-3 py-1.5 text-sm hover:bg-[var(--surface-tertiary-hover)]"><BilingualText en="gradual softening range" bn="নরম হওয়ার ধীরে ধীরে সীমার মধ্যে" /></button>
                    </div>
                </>
            )}

            {challengeFeedback && (
                <div className="mt-2 rounded bg-amber-950/50 p-2 text-xs text-amber-200">
                    <BilingualText en={challengeFeedback.en} bn={challengeFeedback.bn} />
                </div>
            )}
        </div>
    );
};

// --- Steps Data ---

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
    observation: { en: 'Observe the highlighted local cluster that does not repeat everywhere.', bn: 'আলোকিত স্থানীয় ক্লাস্টারটি লক্ষ্য করুন যা সব জায়গায় পুনরাবৃত্তি করে পুনরাবৃত্তি করে না।' },
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
    id: 'melting-predict',
    narration: { en: 'Which solid will show a sharper transition during heating?', bn: 'কোন কঠিন পদার্থ উত্তপ্ত করলে অধিক তীক্ষ্ণ পরিবর্তন দেখাবে?' },
    explanation: { en: 'Make a prediction before we begin the temperature laboratory.', bn: 'তাপমাত্রা পরীক্ষাগার শুরু করার আগে একটি পূর্বাভাস দিন।' },
    observation: { en: 'Think about the internal order we just observed.', bn: 'আমরা একটু আগে যে অভ্যন্তরীণ শৃঙ্খলা দেখেছি তা নিয়ে ভাবুন।' },
    checkpointQuestion: { en: 'Which solid will show a sharper transition during heating?', bn: 'কোন কঠিন পদার্থ উত্তপ্ত করলে অধিক তীক্ষ্ণ পরিবর্তন দেখাবে?' },
    checkpointOptions: [
      { text: { en: 'Crystalline solid', bn: 'স্ফটিকাকার কঠিন' }, isCorrect: true },
      { text: { en: 'Amorphous solid', bn: 'অস্ফটিকাকার কঠিন' }, isCorrect: false },
      { text: { en: 'Both behave identically', bn: 'উভয়েই একইভাবে কাজ করবে' }, isCorrect: false }
    ],
    checkpointFeedback: { en: 'Good prediction! Let us observe.', bn: 'ভালো পূর্বাভাস! আসুন পর্যবেক্ষণ করি।' }
  },
  {
    id: 'melting-low',
    narration: { en: 'Let us begin heating from a low temperature.', bn: 'আসুন নিম্ন তাপমাত্রা থেকে উত্তপ্ত করা শুরু করি।' },
    explanation: { en: 'Both materials remain solid, but only the crystalline model possesses long-range periodic order.', bn: 'উভয় পদার্থই কঠিন থাকে, তবে কেবল স্ফটিকাকার মডেলেই দীর্ঘ-পাল্লার পর্যায়ক্রমিক শৃঙ্খলা থাকে।' },
    observation: { en: 'Notice the temperature control panel is now active.', bn: 'লক্ষ্য করুন তাপমাত্রা নিয়ন্ত্রণ প্যানেলটি এখন সক্রিয়।' }
  },
  {
    id: 'melting-heating',
    narration: { en: 'We gradually increase the temperature.', bn: 'আমরা ধীরে ধীরে তাপমাত্রা বৃদ্ধি করছি।' },
    explanation: { en: 'As temperature rises, particle vibration amplitude increases in both solids.', bn: 'তাপমাত্রা বৃদ্ধির সাথে সাথে, উভয় কঠিনে কণার কম্পনের মাত্রা বৃদ্ধি পায়।' },
    observation: { en: 'Watch the particles vibrate more vigorously.', bn: 'লক্ষ্য করুন কণাগুলি আরও প্রবলভাবে কাঁপছে।' }
  },
  {
    id: 'melting-soften',
    narration: { en: 'The amorphous solid enters its softening range.', bn: 'অস্ফটিকাকার কঠিন তার নরম হওয়ার সীমার মধ্যে প্রবেশ করে।' },
    explanation: { en: 'The amorphous solid does not undergo one sharp structural transition; different regions gain mobility gradually.', bn: 'অস্ফটিকাকার কঠিনে কোনো একটি তীক্ষ্ণ কাঠামোগত পরিবর্তন ঘটে না; বিভিন্ন অঞ্চল ধীরে ধীরে গতিশীলতা লাভ করে।' },
    observation: { en: 'Notice the local rearrangement in the amorphous model.', bn: 'অস্ফটিকাকার মডেলে স্থানীয় পুনর্বিন্যাস লক্ষ্য করুন।' }
  },
  {
    id: 'melting-melt',
    narration: { en: 'The crystalline solid reaches its narrow melting interval.', bn: 'স্ফটিকাকার কঠিন তার সংকীর্ণ গলন ব্যবধানে পৌঁছায়।' },
    explanation: { en: 'Pure crystalline substances generally melt over a narrow temperature interval and are commonly described as having a sharp melting point.', bn: 'বিশুদ্ধ স্ফটিকাকার পদার্থ সাধারণত অতি সংকীর্ণ তাপমাত্রা সীমার মধ্যে গলে এবং পাঠ্যস্তরে এদের তীক্ষ্ণ গলনাঙ্ক আছে বলা হয়।' },
    observation: { en: 'The crystalline arrangement rapidly loses long-range order.', bn: 'স্ফটিকাকার বিন্যাস দ্রুত দীর্ঘ-পাল্লার শৃঙ্খলা হারায়।' }
  },
  {
    id: 'melting-compare',
    narration: { en: 'Let us compare their transitions on the graph.', bn: 'আসুন গ্রাফে তাদের পরিবর্তন তুলনা করি।' },
    explanation: { en: 'Amorphous solids generally soften gradually over a range of temperatures rather than melting sharply at one temperature.', bn: 'অস্ফটিকাকার কঠিন সাধারণত একটি নির্দিষ্ট তাপমাত্রায় তীক্ষ্ণভাবে না গলে তাপমাত্রার একটি সীমার মধ্যে ধীরে ধীরে নরম হয়।' },
    observation: { en: 'The graph shows a gradual drop for amorphous, and a sharp drop for crystalline.', bn: 'গ্রাফটি অস্ফটিকাকারের জন্য ধীরে ধীরে পতন এবং স্ফটিকাকারের জন্য তীক্ষ্ণ পতন দেখায়।' }
  },
  {
    id: 'melting-replay',
    narration: { en: 'Now it is your turn to experiment.', bn: 'এখন আপনার পরীক্ষা করার পালা।' },
    explanation: { en: 'Use the slider to reproduce both transitions manually. Cooling and crystallization kinetics are simplified in this introductory visualization.', bn: 'স্লাইডার ব্যবহার করে উভয় পরিবর্তন ম্যানুয়ালি পুনরুৎপাদন করুন। এই প্রাথমিক দৃশ্যায়নে শীতলীকরণ ও স্ফটিকায়নের গতিবিদ্যা সরলীকৃতভাবে দেখানো হয়েছে।' },
    observation: { en: 'You have full control over the temperature.', bn: 'তাপমাত্রার উপর আপনার সম্পূর্ণ নিয়ন্ত্রণ আছে।' }
  }
];

// --- Main Component ---

export const CrystallineAmorphousComparison: React.FC = () => {
  const [mode, setMode] = useState<LessonMode>('guided');
  const [stepIndex, setStepIndex] = useState(0);
  const [isAnimOn, setIsAnimOn] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [temperature, setTemperature] = useState(20);
  const [isAutoHeating, setIsAutoHeating] = useState(false);
  const [challengeStep, setChallengeStep] = useState(1);
  const [challengeFeedback, setChallengeFeedback] = useState<BilingualString | null>(null);

  useEffect(() => {
    if (mode !== 'guided') return;
    const currentStep = steps[stepIndex];
    if (currentStep.id === 'melting-low') {
      setTemperature(20);
      setIsAutoHeating(false);
    } else if (currentStep.id === 'melting-heating') {
      setIsAutoHeating(true);
    } else if (currentStep.id === 'melting-soften') {
      setIsAutoHeating(false);
      setTemperature(65);
    } else if (currentStep.id === 'melting-melt') {
      setIsAutoHeating(true);
    } else if (currentStep.id === 'melting-compare') {
      setIsAutoHeating(false);
      setTemperature(80);
    } else if (currentStep.id === 'melting-replay') {
      setIsAutoHeating(false);
    }
  }, [stepIndex, mode]);

  useEffect(() => {
    if (!isAutoHeating) return;
    let timer: number;
    timer = window.setInterval(() => {
      setTemperature(t => {
         const next = t + 0.3 * speed;
         if (mode === 'guided') {
            if (steps[stepIndex]?.id === 'melting-heating' && next >= 65) {
               setStepIndex(idx => idx + 1);
               setIsAutoHeating(false);
               return 65;
            }
            if (steps[stepIndex]?.id === 'melting-melt' && next >= 78) {
               setStepIndex(idx => idx + 1);
               setIsAutoHeating(false);
               return 78;
            }
         }
         if (next >= 100) {
            setIsAutoHeating(false);
            return 100;
         }
         return next;
      });
    }, 50);
    return () => window.clearInterval(timer);
  }, [isAutoHeating, speed, stepIndex, mode]);

  const crystPositions = [];
  for (let x = -1.5; x <= 1.5; x += 1) {
    for (let y = -1.5; y <= 1.5; y += 1) {
      crystPositions.push([x, y, 0]);
    }
  }

  const amorphPositions = [
    [-1.2, -1.5, 0], [-0.2, -1.4, 0], [1.1, -1.6, 0], [1.5, -0.8, 0],
    [-1.6, -0.5, 0], [-0.5, -0.6, 0], [0.3, -0.4, 0], [1.2, 0.2, 0],
    [-1.4, 0.6, 0], [-0.2, 0.5, 0], [0.8, 0.9, 0], [1.6, 1.2, 0],
    [-1.0, 1.5, 0], [0.2, 1.6, 0], [1.0, 1.7, 0]
  ];

  const showTempControls = stepIndex >= 8 || mode !== 'guided';
  const isNarrativeGuided = mode === 'guided' && stepIndex < 13;

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
      bottomControlsOverlay={(timelineControls) => (
        showTempControls ? (
          <div className="pointer-events-none absolute inset-x-3 bottom-3 z-20 sm:inset-x-4 sm:bottom-4">
            <div className="pointer-events-auto grid w-full items-end gap-4" style={{ gridTemplateColumns: 'minmax(280px, 0.9fr) minmax(260px, 0.75fr) minmax(320px, 1fr)' }}>
              <TemperatureControlPanel 
                temperature={temperature} 
                setTemperature={setTemperature}
                isAutoHeating={isAutoHeating}
                setIsAutoHeating={setIsAutoHeating}
                disabled={isNarrativeGuided}
              />
              <TemperatureResponseGraph temperature={temperature} />
              <div className="flex items-center justify-center sm:justify-end">
                {timelineControls}
              </div>
            </div>
          </div>
        ) : timelineControls ? (
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 sm:bottom-4">
            {timelineControls}
          </div>
        ) : null
      )}
    >
      <div className="pointer-events-none absolute inset-x-3 top-16 z-10 flex gap-3 sm:inset-x-8 sm:top-4 sm:gap-8">
         {showTempControls ? (
             <>
                 <div className="flex-1 pointer-events-auto"><CrystallineState temperature={temperature} /></div>
                 <div className="flex-1 pointer-events-auto"><AmorphousState temperature={temperature} /></div>
             </>
         ) : (
             <>
                <div className="flex-1 rounded-lg border border-sky-400/20 bg-[color-mix(in_srgb,var(--canvas-surface)_88%,transparent)] px-2 py-2 text-center text-sm font-bold text-sky-300 shadow-lg backdrop-blur-sm sm:text-base">
                  <BilingualText en="Crystalline Solid" bn="স্ফটিকাকার কঠিন" />
                </div>
                <div className="flex-1 rounded-lg border border-amber-400/20 bg-[color-mix(in_srgb,var(--canvas-surface)_88%,transparent)] px-2 py-2 text-center text-sm font-bold text-amber-300 shadow-lg backdrop-blur-sm sm:text-base">
                  <BilingualText en="Amorphous Solid" bn="অস্ফটিকাকার কঠিন" />
                </div>
             </>
         )}
      </div>

      {mode === 'challenge' && (
          <ChallengeOverlay  
              temperature={temperature}
              challengeStep={challengeStep}
              setChallengeStep={setChallengeStep}
              setChallengeFeedback={setChallengeFeedback}
              challengeFeedback={challengeFeedback}
          />
      )}

      <Canvas camera={{ position: [0, 0, 11.5], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[0, 2, 10]} intensity={1.2} />
        <OrbitControls enablePan={mode === 'explore'} enableZoom={mode === 'explore'} enableRotate={mode === 'explore'} />
        
        <group position={[-2.5, 0, 0]}>
          {crystPositions.map((pos, idx) => {
            const isRow1 = pos[1] === -1.5;
            const visible = stepIndex >= 2 || (stepIndex >= 1 && isRow1) || mode !== 'guided';
            
            return (
              <ThermalSphere
                key={`c-${idx}`}
                position={pos as [number, number, number]}
                color={stepIndex === 5 ? '#10b981' : '#2589dc'}
                visible={visible}
                animated={isAnimOn}
                speed={speed}
                temperature={temperature}
                type="crystalline"
              />
            );
          })}
          
          {stepIndex === 5 && (
            <Line points={[[-2, -1.8, 0], [2, -1.8, 0]]} color="#10b981" lineWidth={3} />
          )}
        </group>

        <Line points={[[0, -3, 0], [0, 3, 0]]} color="#64748b" lineWidth={1} dashed />

        <group position={[2.5, 0, 0]}>
          {amorphPositions.map((pos, idx) => {
            const visible = stepIndex >= 3 || mode !== 'guided';
            const isCluster = idx === 5 || idx === 6 || idx === 9;
            const color = (stepIndex === 4 && isCluster) ? "#ef4444" : "#f59e0b";
            
            return (
              <ThermalSphere
                key={`a-${idx}`}
                position={pos as [number, number, number]}
                color={color}
                visible={visible}
                animated={isAnimOn}
                speed={speed}
                temperature={temperature}
                type="amorphous"
              />
            );
          })}
          
           {stepIndex === 6 && (
            <Line points={[[-2, -1.8, 0], [-1, -1.8, 0]]} color="#ef4444" lineWidth={3} />
          )}
        </group>
      </Canvas>
    </GuidedLessonEngine>
  );
};
