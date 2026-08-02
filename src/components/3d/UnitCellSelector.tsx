import React, { useState } from 'react';
import { Eye, Layers, RotateCcw } from 'lucide-react';
import { BilingualText } from '../BilingualText';
import { CrystalCanvas } from './CrystalCanvas';
import { UnitCell, type UnitCellType } from './UnitCell';

const cellTypes: { type: UnitCellType; label: { en: string; bn: string } }[] = [
  { type: 'SC', label: { en: 'Simple Cubic', bn: 'সরল ঘনকাকার' } },
  { type: 'BCC', label: { en: 'Body-Centred Cubic', bn: 'দেহ-কেন্দ্রিক ঘনকাকার' } },
  { type: 'FCC', label: { en: 'Face-Centred Cubic', bn: 'পৃষ্ঠ-কেন্দ্রিক ঘনকাকার' } },
];

export const UnitCellSelector: React.FC = () => {
  const [type, setType] = useState<UnitCellType>('SC');
  const [exploded, setExploded] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[var(--surface-primary)] lg:flex-row">
      <aside className="z-10 flex w-full shrink-0 flex-col border-b border-[var(--border-default)] bg-[var(--surface-secondary)] p-4 sm:p-5 lg:w-[340px] lg:border-b-0 lg:border-r lg:p-6" aria-label="Unit cell controls">
        <div>
          <p className="eyebrow mb-2 text-[10px]"><BilingualText en="Structure" bn="গঠন" /></p>
          <h3 className="text-xl font-extrabold text-[var(--text-primary)]"><BilingualText en="Types of Cubic Unit Cells" bn="ঘনকাকার একক কোষের ধরন" /></h3>
          <div className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]"><BilingualText en="Select a unit cell type to explore its atomic arrangement in 3D." bn="এর 3D পারমাণবিক বিন্যাস অন্বেষণ করতে একটি একক কোষ নির্বাচন করুন।" /></div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 lg:grid-cols-1" role="group" aria-label="Unit cell type">
          {cellTypes.map((cell) => {
            const selected = type === cell.type;
            return (
              <button
                type="button"
                key={cell.type}
                onClick={() => setType(cell.type)}
                aria-pressed={selected}
                className={`min-h-16 rounded-xl border p-3 text-left transition-all lg:min-h-[72px] lg:p-4 ${selected ? 'border-[var(--border-interactive)] bg-[var(--selected-state)] shadow-[var(--shadow-low)]' : 'border-[var(--border-default)] bg-[var(--surface-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--hover-state)]'}`}
              >
                <span className={`block text-base font-black lg:text-lg ${selected ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'}`}>{cell.type}</span>
                <span className="mt-1 hidden text-xs leading-snug text-[var(--text-secondary)] sm:block"><BilingualText en={cell.label.en} bn={cell.label.bn} /></span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 lg:mt-auto lg:pt-6">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]"><BilingualText en="View" bn="দৃশ্য" /></p>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setExploded((value) => !value)} aria-pressed={exploded} className={`btn px-3 ${exploded ? 'btn-primary' : 'btn-secondary'}`}>
              <Eye className="h-4 w-4" />
              <BilingualText en="Exploded" bn="বিস্ফোরিত" />
            </button>
            <button type="button" onClick={() => setOpacity((value) => value === 1 ? 0.38 : 1)} aria-pressed={opacity < 1} className={`btn px-3 ${opacity < 1 ? 'btn-primary' : 'btn-secondary'}`}>
              <Layers className="h-4 w-4" />
              <BilingualText en="Transparent" bn="স্বচ্ছ" />
            </button>
          </div>
          <button type="button" onClick={() => setResetKey((key) => key + 1)} className="btn btn-ghost mt-2 w-full">
            <RotateCcw className="h-4 w-4" />
            <BilingualText en="Restore teaching camera" bn="শিক্ষণ ক্যামেরা পুনরুদ্ধার করুন" />
          </button>
          <div className="mt-3 rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)] px-3 py-2 text-center text-xs font-semibold text-[var(--text-muted)]">
            <BilingualText en="Drag to rotate · Scroll to zoom" bn="ঘোরাতে ড্র্যাগ করুন · জুম করতে স্ক্রোল করুন" />
          </div>
        </div>
      </aside>

      <div className="relative min-h-[420px] flex-1 bg-[var(--canvas-background)] lg:min-h-[600px]">
        <CrystalCanvas resetKey={resetKey} cameraPosition={[7.8, 6.7, 7.8]} cameraTarget={[0, 1.1, 0]} ariaLabel={`${type} unit cell interactive model`}>
          <UnitCell type={type} opacity={opacity} exploded={exploded} />
        </CrystalCanvas>
        <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-white/10 bg-[#071923]/78 px-3 py-2 text-xs font-bold text-sky-100 backdrop-blur-sm">
          <span className="mr-2 text-sky-300">{type}</span>
          <BilingualText en="Live structure" bn="লাইভ গঠন" />
        </div>
      </div>
    </div>
  );
};
