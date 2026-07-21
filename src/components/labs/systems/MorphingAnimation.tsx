import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';
import { Play, Pause, RotateCcw } from 'lucide-react';
import * as THREE from 'three';

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const drawUnitCell = (a: number, b: number, c: number, alpha: number, beta: number, gamma: number) => {
  const ar = degToRad(alpha);
  const br = degToRad(beta);
  const gr = degToRad(gamma);

  const va = [a, 0, 0];
  const vb = [b * Math.cos(gr), b * Math.sin(gr), 0];
  
  const cx = c * Math.cos(br);
  const cy = c * (Math.cos(ar) - Math.cos(br) * Math.cos(gr)) / Math.sin(gr);
  const cz = Math.sqrt(Math.max(0, c * c - cx * cx - cy * cy));
  const vc = [cx, cy, cz];

  const points = [
    [0, 0, 0], va, vb, vc,
    [va[0]+vb[0], va[1]+vb[1], va[2]+vb[2]],
    [va[0]+vc[0], va[1]+vc[1], va[2]+vc[2]],
    [vb[0]+vc[0], vb[1]+vc[1], vb[2]+vc[2]],
    [va[0]+vb[0]+vc[0], va[1]+vb[1]+vc[1], va[2]+vb[2]+vc[2]]
  ];

  const edges = [
    [points[0], points[1]], [points[0], points[2]], [points[0], points[3]],
    [points[1], points[4]], [points[2], points[4]],
    [points[1], points[5]], [points[3], points[5]],
    [points[2], points[6]], [points[3], points[6]],
    [points[4], points[7]], [points[5], points[7]], [points[6], points[7]]
  ];

  return { points, edges };
};

const AnimatedCell = ({ targetParams, animating }: { targetParams: any, animating: boolean }) => {
  const [current, setCurrent] = useState({ ...targetParams });
  
  useFrame(() => {
    if (animating) {
      setCurrent((prev: any) => ({
        a: THREE.MathUtils.lerp(prev.a, targetParams.a, 0.05),
        b: THREE.MathUtils.lerp(prev.b, targetParams.b, 0.05),
        c: THREE.MathUtils.lerp(prev.c, targetParams.c, 0.05),
        alpha: THREE.MathUtils.lerp(prev.alpha, targetParams.alpha, 0.05),
        beta: THREE.MathUtils.lerp(prev.beta, targetParams.beta, 0.05),
        gamma: THREE.MathUtils.lerp(prev.gamma, targetParams.gamma, 0.05),
      }));
    } else {
      setCurrent({ ...targetParams });
    }
  });

  const { points, edges } = drawUnitCell(current.a, current.b, current.c, current.alpha, current.beta, current.gamma);

  return (
    <group position={[-current.a/2, -current.b/2, -current.c/2]}>
      {edges.map((edge, i) => (
        <Line key={i} points={edge as any} color="#3b82f6" lineWidth={3} />
      ))}
      {points.map((pt, i) => (
        <Sphere key={i} args={[0.1, 16, 16]} position={pt as any}>
          <meshStandardMaterial color="#ef4444" />
        </Sphere>
      ))}
    </group>
  );
};

export const MorphingAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const sequence = [
    { name: { en: 'Cubic', bn: 'ঘনকীয়' }, params: { a: 2, b: 2, c: 2, alpha: 90, beta: 90, gamma: 90 }, desc: { en: 'All edges equal, all angles 90°.', bn: 'সব প্রান্ত সমান, সব কোণ 90°।' } },
    { name: { en: 'Tetragonal', bn: 'চতুষ্কোণীয়' }, params: { a: 2, b: 2, c: 3.5, alpha: 90, beta: 90, gamma: 90 }, desc: { en: 'Elongating c axis (a = b ≠ c).', bn: 'c অক্ষ দীর্ঘায়িত করা হচ্ছে (a = b ≠ c)।' } },
    { name: { en: 'Orthorhombic', bn: 'অর্থোরম্বিক' }, params: { a: 2, b: 2.8, c: 3.5, alpha: 90, beta: 90, gamma: 90 }, desc: { en: 'Changing b axis (a ≠ b ≠ c).', bn: 'b অক্ষ পরিবর্তন করা হচ্ছে (a ≠ b ≠ c)।' } },
    { name: { en: 'Monoclinic', bn: 'মনোক্লিনিক' }, params: { a: 2, b: 2.8, c: 3.5, alpha: 90, beta: 110, gamma: 90 }, desc: { en: 'Tilting beta angle (β ≠ 90°).', bn: 'বিটা কোণ হেলানো হচ্ছে (β ≠ 90°)।' } },
    { name: { en: 'Triclinic', bn: 'ট্রাইক্লিনিক' }, params: { a: 2, b: 2.8, c: 3.5, alpha: 75, beta: 110, gamma: 105 }, desc: { en: 'Tilting all angles (α ≠ β ≠ γ).', bn: 'সব কোণ হেলানো হচ্ছে (α ≠ β ≠ γ)।' } }
  ];

  useEffect(() => {
    let timer: any;
    if (playing) {
      timer = setInterval(() => {
        setStep(s => {
          if (s >= sequence.length - 1) {
            setPlaying(false);
            return s;
          }
          return s + 1;
        });
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [playing]);

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-slate-700">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 h-[400px] bg-slate-50 dark:bg-slate-900 rounded-lg relative overflow-hidden">
          <Canvas camera={{ position: [5, 4, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <AnimatedCell targetParams={sequence[step].params} animating={true} />
            <OrbitControls enablePan={false} autoRotate={playing} autoRotateSpeed={1} />
          </Canvas>
          <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 p-2 rounded shadow text-sm font-bold text-slate-800 dark:text-slate-200">
            <BilingualText en={sequence[step].name.en} bn={sequence[step].name.bn} />
          </div>
        </div>
        <div className="w-full md:w-1/3 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              <BilingualText en="Morphing Animation" bn="রূপান্তর অ্যানিমেশন" />
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
              <BilingualText 
                en="Watch how changing edge lengths and angles transforms one cell geometry into another." 
                bn="দেখুন কীভাবে প্রান্তের দৈর্ঘ্য এবং কোণ পরিবর্তন করে একটি কোষের জ্যামিতি অন্যটিতে রূপান্তরিত হয়।" 
              />
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/30 text-xs text-amber-800 dark:text-amber-200 font-medium mb-6">
              <BilingualText 
                en="Note: This is a geometric learning animation; it is not a physical phase-transition simulation." 
                bn="সতর্কতা: এটি জ্যামিতিক পার্থক্য বোঝানোর অ্যানিমেশন; এটি কোনো বাস্তব দশা পরিবর্তনের অনুকরণ নয়।" 
              />
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
              <p className="text-blue-900 dark:text-blue-100 font-medium">
                <BilingualText en={sequence[step].desc.en} bn={sequence[step].desc.bn} />
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setPlaying(!playing)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <BilingualText en={playing ? "Pause" : "Play"} bn={playing ? "থামান" : "চালান"} />
            </button>
            <button
              onClick={() => { setStep(0); setPlaying(false); }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <BilingualText en="Reset" bn="রিসেট" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
