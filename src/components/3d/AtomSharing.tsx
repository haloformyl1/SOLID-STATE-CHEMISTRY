import React, { useState, useRef, useEffect } from 'react';
import { CrystalCanvas } from './CrystalCanvas';
import { BilingualText } from '../BilingualText';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Eye, EyeOff, Minus, Plus, RotateCcw } from 'lucide-react';

type ShareType = 'corner' | 'face' | 'body' | 'edge';

type CellDef = {
  pos: [number, number, number];
  phiStart: number;
  phiLength: number;
  thetaStart: number;
  thetaLength: number;
  color: string;
};

const C_HEX = [
  "#0284C7", "#0D9488", "#6D4AFF", "#D97706",
  "#0EA5E9", "#9A7BFF", "#16845B", "#C23A47"
]; // fallback hex for 3D canvas materials

const DEFINITIONS: Record<ShareType, CellDef[]> = {
  corner: [
    { pos: [1, 1, 1], phiStart: 0, phiLength: Math.PI/2, thetaStart: 0, thetaLength: Math.PI/2, color: C_HEX[0] },
    { pos: [1, 1, -1], phiStart: Math.PI/2, phiLength: Math.PI/2, thetaStart: 0, thetaLength: Math.PI/2, color: C_HEX[1] },
    { pos: [-1, 1, -1], phiStart: Math.PI, phiLength: Math.PI/2, thetaStart: 0, thetaLength: Math.PI/2, color: C_HEX[2] },
    { pos: [-1, 1, 1], phiStart: 3*Math.PI/2, phiLength: Math.PI/2, thetaStart: 0, thetaLength: Math.PI/2, color: C_HEX[3] },
    { pos: [1, -1, 1], phiStart: 0, phiLength: Math.PI/2, thetaStart: Math.PI/2, thetaLength: Math.PI/2, color: C_HEX[4] },
    { pos: [1, -1, -1], phiStart: Math.PI/2, phiLength: Math.PI/2, thetaStart: Math.PI/2, thetaLength: Math.PI/2, color: C_HEX[5] },
    { pos: [-1, -1, -1], phiStart: Math.PI, phiLength: Math.PI/2, thetaStart: Math.PI/2, thetaLength: Math.PI/2, color: C_HEX[6] },
    { pos: [-1, -1, 1], phiStart: 3*Math.PI/2, phiLength: Math.PI/2, thetaStart: Math.PI/2, thetaLength: Math.PI/2, color: C_HEX[7] },
  ],
  face: [
    { pos: [0, 0, 1], phiStart: -Math.PI/2, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI, color: C_HEX[0] },
    { pos: [0, 0, -1], phiStart: Math.PI/2, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI, color: C_HEX[1] },
  ],
  edge: [
    { pos: [1, 1, 0], phiStart: 0, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI/2, color: C_HEX[0] },
    { pos: [-1, 1, 0], phiStart: Math.PI, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI/2, color: C_HEX[1] },
    { pos: [1, -1, 0], phiStart: 0, phiLength: Math.PI, thetaStart: Math.PI/2, thetaLength: Math.PI/2, color: C_HEX[2] },
    { pos: [-1, -1, 0], phiStart: Math.PI, phiLength: Math.PI, thetaStart: Math.PI/2, thetaLength: Math.PI/2, color: C_HEX[3] },
  ],
  body: [
    { pos: [0, 0, 0], phiStart: 0, phiLength: 2*Math.PI, thetaStart: 0, thetaLength: Math.PI, color: C_HEX[0] },
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
    { en: "The atom is located at the body center of the unit cell. It is fully enclosed (1) and not shared with any other cell.", bn: "পরমাণুটি একক কোষের দেহ-কেন্দ্রে অবস্থিত। এটি সম্পূর্ণ আবদ্ধ (১) এবং অন্য কোনো কোষের সাথে ভাগ করা হয় অমূহ।" },
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
        <Line key={i} points={[pts[i] as any, pts[i+1] as any]} color={def.color} lineWidth={1.5} transparent opacity={0.5} />
      ))}
    </group>
  );
};

export const AtomSharing: React.FC = () => {
  const [type, setType] = useState<ShareType>('corner');
  const defs = DEFINITIONS[type];
  const explanations = EXPLANATIONS[type];
  const [step, setStep] = useState(1);
  const [showCells, setShowCells] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const maxSteps = defs.length;

  useEffect(() => {
    setStep(1);
  }, [type]);

  const getNumerator = (n: number, d: number) => {
    if (n === 0) return 0;
    if (n === d) return 1;
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    return n / gcd(n, d);
  };

  const getDenominator = (n: number, d: number) => {
    if (n === 0 || n === d) return 1;
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    return d / gcd(n, d);
  };

  const num = getNumerator(step, maxSteps);
  const den = getDenominator(step, maxSteps);

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[var(--surface-primary)] lg:flex-row">
      <aside className="z-10 flex w-full shrink-0 flex-col border-b border-[var(--border-default)] bg-[var(--surface-secondary)] p-4 sm:p-5 lg:w-[370px] lg:border-b-0 lg:border-r lg:p-6" aria-label="Atom sharing controls">
        <div>
          <p className="eyebrow mb-2 text-[10px]"><BilingualText en="Guided visualizer" bn="নির্দেশিত ভিজ্যুয়ালাইজার" /></p>
          <h3 className="text-xl font-extrabold text-[var(--text-primary)]"><BilingualText en="Atom Sharing" bn="পরমাণু ভাগাভাগি" /></h3>
          <div className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]"><BilingualText en="Assemble the crystal to see the atom's volume contribution." bn="পরমাণুর আয়তনের অবদান দেখতে স্ফটিকটি একত্রিত করুন।" /></div>
        </div>

        <fieldset className="mt-5">
          <legend className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]"><BilingualText en="Atom position" bn="পরমাণুর অবস্থান" /></legend>
          <div className="grid grid-cols-4 gap-2 lg:grid-cols-2">
            {(['corner', 'face', 'edge', 'body'] as ShareType[]).map((position) => {
              const selected = type === position;
              return (
                <button
                  type="button"
                  key={position}
                  onClick={() => setType(position)}
                  aria-pressed={selected}
                  className={`min-h-12 rounded-lg border px-2 py-2 text-sm font-bold capitalize transition-all ${selected ? 'border-[var(--border-interactive)] bg-[var(--selected-state)] text-[var(--accent-primary)] shadow-[var(--shadow-low)]' : 'border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--hover-state)]'}`}
                >
                  <BilingualText en={position} bn={position === 'corner' ? 'কোণ' : position === 'face' ? 'পৃষ্ঠ' : position === 'edge' ? 'প্রান্ত' : 'কেন্দ্র'} />
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="surface-panel mt-5 flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <button type="button" disabled={step === 1} onClick={() => setStep((value) => Math.max(1, value - 1))} className="icon-button" aria-label="Remove one sharing cell">
              <Minus className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className="text-xl font-black tabular-nums text-[var(--text-primary)]">{step} / {maxSteps}</div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]"><BilingualText en="Unit cells" bn="একক কোষ" /></div>
            </div>
            <button type="button" disabled={step === maxSteps} onClick={() => setStep((value) => Math.min(maxSteps, value + 1))} className="icon-button" aria-label="Add one sharing cell">
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex gap-1" role="progressbar" aria-label="Sharing cell assembly" aria-valuemin={1} aria-valuemax={maxSteps} aria-valuenow={step}>
            {defs.map((_, index) => <span key={index} className={`h-1.5 flex-1 rounded-full ${index < step ? 'bg-[var(--accent-primary)]' : 'bg-[var(--surface-elevated)]'}`} />)}
          </div>

          <div className="mt-5 flex items-center justify-between gap-5 rounded-xl border border-[color-mix(in_srgb,var(--success)_28%,var(--border-default))] bg-[color-mix(in_srgb,var(--success)_9%,transparent)] px-4 py-4">
            <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--success)]"><BilingualText en="Enclosed volume" bn="আবদ্ধ আয়তন" /></span>
            {den === 1 ? (
              <span className="text-4xl font-black tabular-nums text-[var(--success)]">{num}</span>
            ) : (
              <span className="flex flex-col items-center text-2xl font-black leading-none text-[var(--success)]" aria-label={`${num} over ${den}`}>
                <span className="border-b-2 border-current px-3 pb-1">{num}</span>
                <span className="px-3 pt-1">{den}</span>
              </span>
            )}
          </div>

          <div className="mt-5 border-t border-[var(--border-default)] pt-4">
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--accent-secondary)]"><BilingualText en="Observe" bn="পর্যবেক্ষণ করুন" /></p>
            <div className="text-sm font-medium leading-relaxed text-[var(--text-secondary)]"><BilingualText en={explanations[step - 1].en} bn={explanations[step - 1].bn} /></div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => setShowCells((value) => !value)} aria-pressed={showCells} className={`btn px-3 ${showCells ? 'btn-outline' : 'btn-ghost'}`}>
            {showCells ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            <BilingualText en="Sharing cells" bn="ভাগকারী কোষ" />
          </button>
          <button type="button" onClick={() => setResetKey((key) => key + 1)} className="btn btn-ghost px-3">
            <RotateCcw className="h-4 w-4" />
            <BilingualText en="Reset view" bn="দৃশ্য রিসেট" />
          </button>
        </div>
      </aside>

      <div className="relative min-h-[440px] flex-1 bg-[var(--canvas-background)] lg:min-h-[650px]">
        <CrystalCanvas resetKey={resetKey} cameraPosition={[6.4, 5.4, 6.4]} ariaLabel={`${type} atom sharing model at step ${step} of ${maxSteps}`}>
          {defs.map((definition, index) => {
            const visible = index < step;
            return (
              <group key={index}>
                <FractionSlice def={definition} visible={visible} />
                <CellBox def={definition} visible={visible && showCells} />
              </group>
            );
          })}
        </CrystalCanvas>
        <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-white/10 bg-[#071923]/78 px-3 py-2 text-xs font-bold text-sky-100 backdrop-blur-sm">
          <span className="mr-2 capitalize text-sky-300">{type}</span>
          <BilingualText en="contribution" bn="অবদান" />
        </div>
      </div>
    </div>
  );
};
