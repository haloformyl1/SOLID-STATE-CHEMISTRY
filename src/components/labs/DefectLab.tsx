import React, { useState, useMemo } from 'react';
import { CrystalCanvas } from '../3d/CrystalCanvas';
import { BilingualText } from '../BilingualText';
import { Sphere } from '@react-three/drei';
import { Atom, CircleDotDashed } from 'lucide-react';

type DefectType = 'normal' | 'vacancy' | 'interstitial' | 'schottky' | 'frenkel' | 'impurity';

const defectOptions: { id: DefectType; en: string; bn: string }[] = [
  { id: 'normal', en: 'Normal', bn: 'সাধারণ' },
  { id: 'vacancy', en: 'Vacancy', bn: 'শূন্যস্থান' },
  { id: 'interstitial', en: 'Interstitial', bn: 'আন্তঃস্থলীয়' },
  { id: 'schottky', en: 'Schottky', bn: 'শটকি' },
  { id: 'frenkel', en: 'Frenkel', bn: 'ফ্রেঙ্কেল' },
  { id: 'impurity', en: 'Impurity', bn: 'অশুদ্ধি' },
];

export const DefectLab: React.FC = () => {
  const [defect, setDefect] = useState<DefectType>('normal');

  // Base 2D/3D lattice for defect demonstration (e.g., a 3x3x1 or 4x4x1 grid)
  const latticeSize = 4;
  const spacing = 1.2;
  
  const particles = useMemo(() => {
    let pts: { pos: [number, number, number], type: 'A' | 'B' | 'impurity' | 'interstitial', id: string }[] = [];
    
    for (let x = 0; x < latticeSize; x++) {
      for (let y = 0; y < latticeSize; y++) {
        const isA = (x + y) % 2 === 0;
        pts.push({
          pos: [(x - latticeSize/2 + 0.5) * spacing, (y - latticeSize/2 + 0.5) * spacing, 0],
          type: isA ? 'A' : 'B',
          id: `${x}-${y}`
        });
      }
    }

    if (defect === 'vacancy') {
      // Remove one particle
      pts = pts.filter(p => p.id !== '2-2');
    } else if (defect === 'schottky') {
      // Remove one pair of A and B to maintain neutrality
      pts = pts.filter(p => p.id !== '1-1' && p.id !== '2-2');
    } else if (defect === 'frenkel') {
      // Move a smaller ion (A) to interstitial site
      const target = pts.find(p => p.id === '2-2');
      if (target) {
        target.pos = [(2.5 - latticeSize/2 + 0.5) * spacing, (1.5 - latticeSize/2 + 0.5) * spacing, 0.4];
      }
    } else if (defect === 'impurity') {
      // Substitute an ion with different valency
      const target = pts.find(p => p.id === '1-2');
      if (target) {
        target.type = 'impurity';
      }
      // Often accompanied by vacancy
      pts = pts.filter(p => p.id !== '2-3');
    } else if (defect === 'interstitial') {
      // Add extra atom in empty space
      pts.push({
        pos: [(1.5 - latticeSize/2 + 0.5) * spacing, (2.5 - latticeSize/2 + 0.5) * spacing, 0.2],
        type: 'interstitial',
        id: 'interstitial-1'
      });
    }

    return pts;
  }, [defect]);

  const explanations: Record<DefectType, { en: string; bn: string }> = {
    normal: { en: 'Perfect Crystal Lattice', bn: 'নিখুঁত স্ফটিক জালক' },
    vacancy: { en: 'Atom is missing from its regular lattice site. Density decreases.', bn: 'পরমাণু তার নিয়মিত জালক স্থান থেকে অনুপস্থিত। ঘনত্ব হ্রাস পায়।' },
    interstitial: { en: 'Extra atom occupies an interstitial void. Density increases.', bn: 'অতিরিক্ত পরমাণু আন্তঃস্থলীয় শূন্যস্থান দখল করে। ঘনত্ব বৃদ্ধি পায়।' },
    schottky: { en: 'Equal number of cations and anions are missing (maintains electrical neutrality). Density decreases.', bn: 'সমান সংখ্যক ক্যাটায়ন এবং অ্যানায়ন অনুপস্থিত (বৈদ্যুতিক নিরপেক্ষতা বজায় রাখে)। ঘনত্ব হ্রাস পায়।' },
    frenkel: { en: 'An ion (usually smaller cation) leaves its site and occupies an interstitial position. Density remains unchanged.', bn: 'একটি আয়ন (সাধারণত ছোট ক্যাটায়ন) তার স্থান ছেড়ে আন্তঃস্থলীয় অবস্থান দখল করে। ঘনত্ব অপরিবর্তিত থাকে।' },
    impurity: { en: 'A foreign ion replaces a host ion. Example: Sr2+ in NaCl creates a vacancy.', bn: 'একটি বিদেশী আয়ন হোস্ট আয়নকে প্রতিস্থাপন করে। উদাহরণ: NaCl-এ Sr2+ একটি শূন্যস্থান তৈরি করে।' },
  };

  const densityImpact: Record<DefectType, { en: string; bn: string }> = {
    normal: { en: 'Reference state', bn: 'আদর্শ অবস্থা' },
    vacancy: { en: 'Density decreases', bn: 'ঘনত্ব হ্রাস পায়' },
    interstitial: { en: 'Density increases', bn: 'ঘনত্ব বৃদ্ধি পায়' },
    schottky: { en: 'Density decreases', bn: 'ঘনত্ব হ্রাস পায়' },
    frenkel: { en: 'Density unchanged', bn: 'ঘনত্ব অপরিবর্তিত' },
    impurity: { en: 'Composition changes', bn: 'সংযুতি পরিবর্তিত হয়' },
  };

  return (
    <section className="flex min-h-full flex-1 flex-col bg-[var(--surface-primary)] p-4 sm:p-6 lg:p-7" aria-labelledby="defect-laboratory-title">
      <div className="grid flex-1 gap-5 lg:grid-cols-[minmax(280px,0.78fr)_minmax(0,1.55fr)]">
        <div className="flex flex-col rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 shadow-[var(--shadow-low)] sm:p-6">
          <div className="mb-5 flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--border-interactive)] bg-[var(--selected-state)] text-[var(--accent-primary)]" aria-hidden="true">
              <CircleDotDashed className="h-5 w-5" />
            </span>
            <div>
              <p className="eyebrow mb-1"><BilingualText en="Point-defect explorer" bn="বিন্দু-ত্রুটি অনুসন্ধান" /></p>
              <h3 id="defect-laboratory-title" className="text-xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-2xl">
                <BilingualText en="Defect Laboratory" bn="ত্রুটি ল্যাবরেটরি" />
              </h3>
            </div>
          </div>

          <p className="mb-5 text-sm leading-relaxed text-[var(--text-muted)]">
            <BilingualText en="Select a defect to compare its atomic arrangement and effect on the crystal." bn="পরমাণুর বিন্যাস এবং স্ফটিকের উপর প্রভাব তুলনা করতে একটি ত্রুটি নির্বাচন করুন।" />
          </p>

          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Crystal defect type">
          {defectOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setDefect(option.id)}
              aria-pressed={defect === option.id}
              className={`min-h-12 rounded-xl border px-3 py-2.5 text-sm font-bold transition-[color,background-color,border-color,box-shadow] ${defect === option.id
                ? 'border-[var(--border-interactive)] bg-[var(--selected-state)] text-[var(--accent-primary)] shadow-[var(--shadow-low)]'
                : 'border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--hover-state)] hover:text-[var(--text-primary)]'
              }`}
            >
              <BilingualText en={option.en} bn={option.bn} />
            </button>
          ))}
          </div>

          <div className="mt-5 rounded-xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-4 shadow-[var(--shadow-low)]" aria-live="polite">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                <BilingualText en="Current structure" bn="বর্তমান গঠন" />
              </span>
              <span className="rounded-full border border-[color-mix(in_srgb,var(--accent-secondary)_45%,var(--border-default))] bg-[color-mix(in_srgb,var(--accent-secondary)_10%,var(--surface-primary))] px-2.5 py-1 text-xs font-bold text-[var(--accent-secondary)]">
                <BilingualText key={`impact-${defect}`} en={densityImpact[defect].en} bn={densityImpact[defect].bn} isInline />
              </span>
            </div>
            <p className="font-semibold leading-relaxed text-[var(--text-secondary)]">
              <BilingualText key={`explanation-${defect}`} en={explanations[defect].en} bn={explanations[defect].bn} />
            </p>
          </div>
        </div>

        <div className="flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--canvas-background)] shadow-[var(--shadow-interactive)]">
          <div className="flex flex-col gap-3 border-b border-[color-mix(in_srgb,var(--border-strong)_65%,transparent)] bg-[var(--canvas-surface)] px-4 py-3 text-sky-50 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-extrabold">
              <Atom className="h-4 w-4 text-sky-300" aria-hidden="true" />
              <BilingualText en="3D lattice preview" bn="ত্রিমাত্রিক জালক দৃশ্য" />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-bold text-sky-100/75" aria-label="Particle colour legend">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" aria-hidden="true" /><BilingualText en="Cation" bn="ক্যাটায়ন" isInline /></span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-500" aria-hidden="true" /><BilingualText en="Anion" bn="অ্যানায়ন" isInline /></span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" /><BilingualText en="Impurity" bn="অশুদ্ধি" isInline /></span>
            </div>
          </div>

          <div className="min-h-[380px] flex-1">
            <CrystalCanvas ariaLabel={`${defectOptions.find((option) => option.id === defect)?.en} crystal defect model`}>
              {particles.map(p => (
                <Sphere key={p.id} position={p.pos} args={[p.type === 'B' ? 0.45 : p.type === 'impurity' ? 0.5 : 0.3, 32, 32]}>
                  <meshStandardMaterial
                    color={
                      p.type === 'A' ? '#3b82f6' :
                      p.type === 'B' ? '#ef4444' :
                      p.type === 'impurity' ? '#10b981' :
                      '#8b5cf6'
                    }
                    roughness={0.3} metalness={0.2}
                  />
                </Sphere>
              ))}
            </CrystalCanvas>
          </div>
        </div>
      </div>
    </section>
  );
};
