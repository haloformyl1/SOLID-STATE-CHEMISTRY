import React, { useState, useMemo } from 'react';
import { CrystalCanvas } from '../3d/CrystalCanvas';
import { BilingualText } from '../BilingualText';
import { Sphere } from '@react-three/drei';

type DefectType = 'normal' | 'vacancy' | 'interstitial' | 'schottky' | 'frenkel' | 'impurity';

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

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full mt-12 border-t border-gray-200 dark:border-slate-700 pt-8">
      <div className="w-full md:w-1/3 flex flex-col gap-3">
        <h3 className="font-semibold text-xl text-slate-800 dark:text-slate-200 mb-2">
          <BilingualText en="Defect Laboratory" bn="ত্রুটি ল্যাবরেটরি" />
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {(['normal', 'vacancy', 'interstitial', 'schottky', 'frenkel', 'impurity'] as DefectType[]).map((d) => (
            <button
              key={d}
              onClick={() => setDefect(d)}
              className={`p-3 rounded-lg border-2 transition-all font-medium capitalize text-sm ${defect === d ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary-dark' : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'}`}
            >
              <BilingualText en={d} bn={d === 'normal' ? 'সাধারণ' : d === 'vacancy' ? 'শূন্যস্থান' : d === 'interstitial' ? 'আন্তঃস্থলীয়' : d === 'schottky' ? 'শটকি' : d === 'frenkel' ? 'ফ্রেঙ্কেল' : 'অশুদ্ধি'} />
            </button>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg">
          <p className="text-slate-700 dark:text-slate-300 font-medium">
            <BilingualText en={explanations[defect].en} bn={explanations[defect].bn} />
          </p>
        </div>
      </div>

      <div className="w-full md:w-2/3 h-[400px] relative rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700">
        <CrystalCanvas>
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
  );
};
