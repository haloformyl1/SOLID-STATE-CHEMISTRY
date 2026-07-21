import React, { useState, useRef, useEffect } from 'react';
import { CrystalCanvas } from './CrystalCanvas';
import { BilingualText } from '../BilingualText';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type ShareType = 'corner' | 'face' | 'body' | 'edge';

type CellDef = {
  pos: [number, number, number];
  phiStart: number;
  phiLength: number;
  thetaStart: number;
  thetaLength: number;
  color: string;
};

const COLORS = [
  "#ef4444", // red
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#f97316", // orange
];

const DEFINITIONS: Record<ShareType, CellDef[]> = {
  corner: [
    { pos: [1, 1, 1], phiStart: 0, phiLength: Math.PI/2, thetaStart: 0, thetaLength: Math.PI/2, color: COLORS[0] },
    { pos: [1, 1, -1], phiStart: Math.PI/2, phiLength: Math.PI/2, thetaStart: 0, thetaLength: Math.PI/2, color: COLORS[1] },
    { pos: [-1, 1, -1], phiStart: Math.PI, phiLength: Math.PI/2, thetaStart: 0, thetaLength: Math.PI/2, color: COLORS[2] },
    { pos: [-1, 1, 1], phiStart: 3*Math.PI/2, phiLength: Math.PI/2, thetaStart: 0, thetaLength: Math.PI/2, color: COLORS[3] },
    { pos: [1, -1, 1], phiStart: 0, phiLength: Math.PI/2, thetaStart: Math.PI/2, thetaLength: Math.PI/2, color: COLORS[4] },
    { pos: [1, -1, -1], phiStart: Math.PI/2, phiLength: Math.PI/2, thetaStart: Math.PI/2, thetaLength: Math.PI/2, color: COLORS[5] },
    { pos: [-1, -1, -1], phiStart: Math.PI, phiLength: Math.PI/2, thetaStart: Math.PI/2, thetaLength: Math.PI/2, color: COLORS[6] },
    { pos: [-1, -1, 1], phiStart: 3*Math.PI/2, phiLength: Math.PI/2, thetaStart: Math.PI/2, thetaLength: Math.PI/2, color: COLORS[7] },
  ],
  face: [
    { pos: [0, 0, 1], phiStart: -Math.PI/2, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI, color: COLORS[0] },
    { pos: [0, 0, -1], phiStart: Math.PI/2, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI, color: COLORS[1] },
  ],
  edge: [
    { pos: [1, 1, 0], phiStart: 0, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI/2, color: COLORS[0] },
    { pos: [-1, 1, 0], phiStart: Math.PI, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI/2, color: COLORS[1] },
    { pos: [1, -1, 0], phiStart: 0, phiLength: Math.PI, thetaStart: Math.PI/2, thetaLength: Math.PI/2, color: COLORS[2] },
    { pos: [-1, -1, 0], phiStart: Math.PI, phiLength: Math.PI, thetaStart: Math.PI/2, thetaLength: Math.PI/2, color: COLORS[3] },
  ],
  body: [
    { pos: [0, 0, 0], phiStart: 0, phiLength: 2*Math.PI, thetaStart: 0, thetaLength: Math.PI, color: COLORS[0] },
  ]
};

const EXPLANATIONS: Record<ShareType, { en: string; bn: string }[]> = {
  corner: [
    { en: "The atom is located at the corner of the unit cell. Only 1/8th of its volume is inside this cell.", bn: "পরমাণুটি একক কোষের কোণে অবস্থিত। এর আয়তনের মাত্র ১/৮ অংশ এই কোষের ভিতরে থাকে।" },
    { en: "A second unit cell is placed next to it. They now share 1/4th (2/8) of the atom.", bn: "এর পাশে দ্বিতীয় একটি একক কোষ রাখা হয়েছে। তারা এখন পরমাণুটির ১/৪ (২/৮) অংশ ভাগ করে নিচ্ছে।" },
    { en: "A third unit cell is added behind them. 3/8th of the atom is now enclosed.", bn: "তাদের পিছনে তৃতীয় একটি একক কোষ যোগ করা হয়েছে। পরমাণুটির ৩/৮ অংশ এখন আবদ্ধ।" },
    { en: "A fourth unit cell completes the bottom layer. Exactly half (1/2) of the atom is now enclosed.", bn: "চতুর্থ একক কোষটি নীচের স্তরটি সম্পূর্ণ করে। পরমাণুটির ঠিক অর্ধেক (১/২) অংশ এখন আবদ্ধ।" },
    { en: "A fifth unit cell is placed on top of the first one. 5/8th of the atom is enclosed.", bn: "প্রথমটির উপরে পঞ্চম একটি একক কোষ রাখা হয়েছে। পরমাণুটির ৫/৮ অংশ আবদ্ধ।" },
    { en: "A sixth unit cell is placed next to it on the top layer. 3/4th (6/8) is enclosed.", bn: "উপরের স্তরে এর পাশে ষষ্ঠ একক কোষ রাখা হয়েছে। ৩/৪ (৬/৮) অংশ আবদ্ধ।" },
    { en: "A seventh unit cell is added behind it on the top layer. 7/8th is enclosed.", bn: "উপরের স্তরে এর পিছনে সপ্তম একক কোষ যোগ করা হয়েছে। ৭/৮ অংশ আবদ্ধ।" },
    { en: "The eighth unit cell completes the cube. The corner atom is now fully enclosed by the 8 unit cells.", bn: "অষ্টম একক কোষটি ঘনকটি সম্পূর্ণ করে। কোণের পরমাণুটি এখন ৮টি একক কোষ দ্বারা সম্পূর্ণ আবদ্ধ।" },
  ],
  face: [
    { en: "The atom is located at the center of the face. Exactly half (1/2) of its volume is inside this cell.", bn: "পরমাণুটি পৃষ্ঠের কেন্দ্রে অবস্থিত। এর আয়তনের ঠিক অর্ধেক (১/২) অংশ এই কোষের ভিতরে থাকে।" },
    { en: "A second unit cell is placed adjacent to the face. The atom is now fully enclosed by these 2 unit cells.", bn: "পৃষ্ঠের সংলগ্ন দ্বিতীয় একটি একক কোষ রাখা হয়েছে। পরমাণুটি এখন এই ২টি একক কোষ দ্বারা সম্পূর্ণ আবদ্ধ।" },
  ],
  edge: [
    { en: "The atom is located on the edge of the unit cell. Only 1/4th of its volume is inside this cell.", bn: "পরমাণুটি একক কোষের প্রান্তে অবস্থিত। এর আয়তনের মাত্র ১/৪ অংশ এই কোষের ভিতরে থাকে।" },
    { en: "A second unit cell is placed next to it. They now share half (1/2) of the atom.", bn: "এর পাশে দ্বিতীয় একটি একক কোষ রাখা হয়েছে। তারা এখন পরমাণুটির অর্ধেক (১/২) অংশ ভাগ করে নিচ্ছে।" },
    { en: "A third unit cell is placed above them. 3/4th of the atom is enclosed.", bn: "তাদের উপরে তৃতীয় একটি একক কোষ রাখা হয়েছে। পরমাণুটির ৩/৪ অংশ আবদ্ধ।" },
    { en: "The fourth unit cell completes the arrangement. The edge atom is now fully enclosed by the 4 unit cells.", bn: "চতুর্থ একক কোষটি বিন্যাস সম্পূর্ণ করে। প্রান্তের পরমাণুটি এখন ৪টি একক কোষ দ্বারা সম্পূর্ণ আবদ্ধ।" },
  ],
  body: [
    { en: "The atom is located at the body center of the unit cell. It is fully enclosed (1) and not shared with any other cell.", bn: "পরমাণুটি একক কোষের দেহ-কেন্দ্রে অবস্থিত। এটি সম্পূর্ণ আবদ্ধ (১) এবং অন্য কোনো কোষের সাথে ভাগ করা হয় না।" },
  ]
};

const FractionSlice = ({ def, visible }: { def: CellDef, visible: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentScale = useRef(visible ? 1 : 0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = visible ? 1 : 0;
    if (Math.abs(currentScale.current - targetScale) > 0.001) {
      currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 8, delta);
    } else {
      currentScale.current = targetScale;
    }
    const s = Math.max(0.0001, currentScale.current);
    meshRef.current.scale.setScalar(s);
    meshRef.current.visible = s > 0.001;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32, def.phiStart, def.phiLength, def.thetaStart, def.thetaLength]} />
      <meshStandardMaterial color={def.color} roughness={0.3} metalness={0.2} side={THREE.DoubleSide} />
    </mesh>
  );
};

const CellBox = ({ def, visible }: { def: CellDef, visible: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const currentScale = useRef(visible ? 1 : 0);
  const halfA = 1;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = visible ? 1 : 0;
    if (Math.abs(currentScale.current - targetScale) > 0.001) {
      currentScale.current = THREE.MathUtils.damp(currentScale.current, targetScale, 8, delta);
    } else {
      currentScale.current = targetScale;
    }
    const s = Math.max(0.0001, currentScale.current);
    groupRef.current.scale.setScalar(s);
    groupRef.current.visible = s > 0.001;
  });

  const [x, y, z] = def.pos;
  const pts = [
    [x-halfA, y-halfA, z-halfA], [x+halfA, y-halfA, z-halfA],
    [x+halfA, y-halfA, z-halfA], [x+halfA, y+halfA, z-halfA],
    [x+halfA, y+halfA, z-halfA], [x-halfA, y+halfA, z-halfA],
    [x-halfA, y+halfA, z-halfA], [x-halfA, y-halfA, z-halfA],

    [x-halfA, y-halfA, z+halfA], [x+halfA, y-halfA, z+halfA],
    [x+halfA, y-halfA, z+halfA], [x+halfA, y+halfA, z+halfA],
    [x+halfA, y+halfA, z+halfA], [x-halfA, y+halfA, z+halfA],
    [x-halfA, y+halfA, z+halfA], [x-halfA, y-halfA, z+halfA],

    [x-halfA, y-halfA, z-halfA], [x-halfA, y-halfA, z+halfA],
    [x+halfA, y-halfA, z-halfA], [x+halfA, y-halfA, z+halfA],
    [x+halfA, y+halfA, z-halfA], [x+halfA, y+halfA, z+halfA],
    [x-halfA, y+halfA, z-halfA], [x-halfA, y+halfA, z+halfA],
  ];

  return (
    <group ref={groupRef}>
      {pts.map((_, i) => i % 2 === 0 && (
        <Line key={i} points={[pts[i] as any, pts[i+1] as any]} color={def.color} lineWidth={1.5} transparent opacity={0.6} />
      ))}
    </group>
  );
};

export const AtomSharing: React.FC = () => {
  const [type, setType] = useState<ShareType>('corner');
  const defs = DEFINITIONS[type];
  const explanations = EXPLANATIONS[type];
  const [step, setStep] = useState(1);
  const maxSteps = defs.length;

  useEffect(() => {
    setStep(1);
  }, [type]);

  const formatFraction = (n: number, d: number) => {
    if (n === 0) return '0';
    if (n === d) return '1';
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(n, d);
    return `${n / divisor}/${d / divisor}`;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full mt-12 border-t border-gray-200 dark:border-slate-700 pt-8">
      <div className="w-full md:w-1/3 flex flex-col gap-3">
        <h3 className="font-semibold text-xl text-slate-800 dark:text-slate-200 mb-2">
          <BilingualText en="Atom Sharing Visualizer" bn="পরমাণু ভাগাভাগি ভিজ্যুয়ালাইজার" />
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          <BilingualText 
            en="Select a position and use the step controls to assemble the crystal and see the atom's contribution." 
            bn="একটি অবস্থান নির্বাচন করুন এবং স্ফটিক একত্রিত করতে এবং পরমাণুর অবদান দেখতে ধাপ নিয়ন্ত্রণগুলি ব্যবহার করুন।" 
          />
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {(['corner', 'face', 'edge', 'body'] as ShareType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`p-3 rounded-lg border-2 transition-all font-medium capitalize ${type === t ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary-dark' : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'}`}
            >
              <BilingualText en={t} bn={t === 'corner' ? 'কোণ' : t === 'face' ? 'পৃষ্ঠ' : t === 'edge' ? 'প্রান্ত' : 'কেন্দ্র'} />
            </button>
          ))}
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <button 
              disabled={step === 1} 
              onClick={() => setStep(s => Math.max(1, s - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors font-bold text-xl text-slate-700 dark:text-slate-200"
            >
              -
            </button>
            <div className="text-center">
              <div className="font-bold text-slate-800 dark:text-slate-200">
                {step} / {maxSteps}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                <BilingualText en="Cells" bn="কোষ" />
              </div>
            </div>
            <button 
              disabled={step === maxSteps} 
              onClick={() => setStep(s => Math.min(maxSteps, s + 1))}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors font-bold text-xl text-slate-700 dark:text-slate-200"
            >
              +
            </button>
          </div>

          <div className="flex flex-col items-center justify-center bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
            <span className="text-sm font-medium text-emerald-800 dark:text-emerald-400 mb-1">
              <BilingualText en="Current Contribution:" bn="বর্তমান অবদান:" />
            </span>
            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">
              {formatFraction(step, maxSteps)}
            </span>
          </div>

          <div className="mt-4 p-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-inner">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic transition-all">
              <BilingualText 
                en={explanations[step - 1].en} 
                bn={explanations[step - 1].bn} 
              />
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 h-[400px] relative rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700">
        <CrystalCanvas>
          {defs.map((def, index) => {
            const isVisible = index < step;
            return (
              <group key={index}>
                <FractionSlice def={def} visible={isVisible} />
                <CellBox def={def} visible={isVisible} />
              </group>
            );
          })}
        </CrystalCanvas>
      </div>
    </div>
  );
};
