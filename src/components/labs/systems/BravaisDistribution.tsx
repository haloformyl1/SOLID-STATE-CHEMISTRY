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
    <div className="my-8 w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6 md:p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[var(--text-str)] mb-2">
          <BilingualText en="Fourteen Bravais Lattices" bn="চৌদ্দটি ব্রাভেই জালক" />
        </h3>
        <p className="text-xl font-mono font-bold text-[var(--text-norm)]">
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

      <div className="flex min-h-[150px] items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-6 text-center transition-all duration-300">
        {active ? (
          <div className="animate-fade-in-up">
            <h4 className="mb-4 text-xl font-bold text-[var(--text-primary)]">
              <BilingualText en={systems.find(s => s.id === active)!.name.en} bn={systems.find(s => s.id === active)!.name.bn} />
              {' '}- {systems.find(s => s.id === active)!.count} Bravais Lattices
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {systems.find(s => s.id === active)!.types.map(t => (
                <div key={t} className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface-primary)] px-4 py-2 font-bold text-[var(--text-secondary)] shadow-sm">
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
          <p className="font-medium text-[var(--text-muted)]">
            <BilingualText en="Select a crystal system above to view its Bravais lattices." bn="ব্রাভেই জালক দেখতে ওপরের একটি স্ফটিক তন্ত্র নির্বাচন করুন।" />
          </p>
        )}
      </div>

      <div className="mt-6 text-sm text-[var(--text-mut)] grid grid-cols-2 md:grid-cols-5 gap-2 text-center bg-[var(--surf-elev)] p-4 rounded-lg border border-[var(--border-sub)]">
        <div><strong>P</strong> = Primitive<br/>(আদিম)</div>
        <div><strong>I</strong> = Body-centred<br/>(দেহকেন্দ্রিক)</div>
        <div><strong>F</strong> = Face-centred<br/>(তলকেন্দ্রিক)</div>
        <div><strong>C</strong> = Base-centred<br/>(ভিত্তিকেন্দ্রিক)</div>
        <div><strong>R</strong> = Rhombohedral<br/>(রম্বোহেড্রাল)</div>
      </div>
    </div>
  );
};
