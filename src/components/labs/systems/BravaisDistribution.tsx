import React, { useState } from 'react';
import { BilingualText } from '../../BilingualText';

const systems = [
  { id: 'cubic', name: { en: 'Cubic', bn: 'ঘনকীয়' }, count: 3, types: ['P', 'I', 'F'], color: 'bg-red-500' },
  { id: 'tetragonal', name: { en: 'Tetragonal', bn: 'চতুষ্কোণীয়' }, count: 2, types: ['P', 'I'], color: 'bg-orange-500' },
  { id: 'orthorhombic', name: { en: 'Orthorhombic', bn: 'অর্থোরম্বিক' }, count: 4, types: ['P', 'C', 'I', 'F'], color: 'bg-amber-500' },
  { id: 'monoclinic', name: { en: 'Monoclinic', bn: 'মনোক্লিনিক' }, count: 2, types: ['P', 'C'], color: 'bg-green-500' },
  { id: 'triclinic', name: { en: 'Triclinic', bn: 'ট্রাইক্লিনিক' }, count: 1, types: ['P'], color: 'bg-emerald-500' },
  { id: 'hexagonal', name: { en: 'Hexagonal', bn: 'ষড়ভুজীয়' }, count: 1, types: ['P'], color: 'bg-cyan-500' },
  { id: 'rhombohedral', name: { en: 'Rhombohedral', bn: 'রম্বোহেড্রাল' }, count: 1, types: ['R'], color: 'bg-blue-500' }
];

export const BravaisDistribution: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-slate-800 my-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold dark:text-white mb-2">
          <BilingualText en="Fourteen Bravais Lattices" bn="চৌদ্দটি ব্রাভেই জালক" />
        </h3>
        <p className="text-xl font-mono font-bold text-slate-700 dark:text-slate-300">
          3 + 2 + 4 + 2 + 1 + 1 + 1 = 14
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {systems.map((sys) => (
          <button
            key={sys.id}
            onClick={() => setActive(sys.id)}
            className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${
              active === sys.id ? 'scale-110 shadow-lg ring-2 ring-primary z-10' : 'hover:scale-105 opacity-90'
            } ${sys.color} text-white`}
          >
            <span className="text-3xl font-bold mb-1">{sys.count}</span>
            <span className="text-xs font-medium uppercase tracking-wider text-center">
              <BilingualText en={sys.name.en} bn={sys.name.bn} />
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 min-h-[150px] flex items-center justify-center text-center transition-all duration-300">
        {active ? (
          <div className="animate-fade-in-up">
            <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              <BilingualText en={systems.find(s => s.id === active)!.name.en} bn={systems.find(s => s.id === active)!.name.bn} />
              {' '}- {systems.find(s => s.id === active)!.count} Bravais Lattices
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {systems.find(s => s.id === active)!.types.map(t => (
                <div key={t} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg font-bold text-slate-700 dark:text-slate-200 shadow-sm border border-gray-200 dark:border-slate-600">
                  {t === 'P' && 'Primitive (P)'}
                  {t === 'I' && 'Body-centred (I)'}
                  {t === 'F' && 'Face-centred (F)'}
                  {t === 'C' && 'Base-centred (C)'}
                  {t === 'R' && 'Rhombohedral (R)'}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            <BilingualText en="Select a crystal system above to view its Bravais lattices." bn="ব্রাভেই জালক দেখতে ওপরের একটি স্ফটিক তন্ত্র নির্বাচন করুন।" />
          </p>
        )}
      </div>

      <div className="mt-6 text-sm text-slate-600 dark:text-slate-400 grid grid-cols-2 md:grid-cols-5 gap-2 text-center bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
        <div><strong>P</strong> = Primitive<br/>(আদিম)</div>
        <div><strong>I</strong> = Body-centred<br/>(দেহকেন্দ্রিক)</div>
        <div><strong>F</strong> = Face-centred<br/>(তলকেন্দ্রিক)</div>
        <div><strong>C</strong> = Base-centred<br/>(ভিত্তিকেন্দ্রিক)</div>
        <div><strong>R</strong> = Rhombohedral<br/>(রম্বোহেড্রাল)</div>
      </div>
    </div>
  );
};
