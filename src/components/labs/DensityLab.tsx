import React, { useState } from 'react';
import { calculateDensity, getEffectiveAtoms, type UnitCellType } from '../../utils/chemistry';
import { BilingualText } from '../BilingualText';
import { Calculator } from 'lucide-react';

export const DensityLab: React.FC = () => {
  const [type, setType] = useState<UnitCellType>('FCC');
  const [molarMass, setMolarMass] = useState<string>('63.5');
  const [edgeLength, setEdgeLength] = useState<string>('361');
  const [unit, setUnit] = useState<'pm' | 'Å' | 'nm' | 'cm'>('pm');

  const z = getEffectiveAtoms(type);
  const m = parseFloat(molarMass);
  const a = parseFloat(edgeLength);

  let density: number | null = null;
  let error: string | null = null;

  try {
    if (!isNaN(m) && !isNaN(a) && m > 0 && a > 0) {
      density = calculateDensity(z, m, a, unit);
    } else if (molarMass !== '' && edgeLength !== '') {
      error = "Values must be positive numbers";
    }
  } catch (err: any) {
    error = err.message;
  }

  return (
    <section className="surface-panel mx-auto my-8 w-full max-w-5xl overflow-hidden" aria-labelledby="density-calculator-title">
      <header className="flex flex-col gap-5 border-b border-[var(--border-default)] bg-[var(--surface-secondary)] px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-9">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[var(--border-interactive)] bg-[var(--selected-state)] text-[var(--accent-primary)]" aria-hidden="true">
            <Calculator className="h-6 w-6" />
          </span>
          <div>
            <p className="eyebrow mb-1"><BilingualText en="Interactive calculation" bn="ইন্টারেক্টিভ গণনা" /></p>
            <h2 id="density-calculator-title" className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl">
              <BilingualText en="Density Calculator" bn="ঘনত্ব ক্যালকুলেটর" />
            </h2>
          </div>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-primary)] px-3 py-2 text-xs font-bold text-[var(--text-secondary)] shadow-[var(--shadow-low)]">
          <span className="h-2 w-2 rounded-full bg-[var(--success)]" aria-hidden="true" />
          <BilingualText en={`Live result · Z = ${z}`} bn={`লাইভ ফলাফল · Z = ${z}`} isInline />
        </div>
      </header>

      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:gap-8 lg:p-9">
        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 sm:p-6">
          <div className="mb-6">
            <p className="eyebrow"><BilingualText en="Crystal inputs" bn="ক্রিস্টাল ইনপুট" /></p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
              <BilingualText en="Enter the unit-cell data. The result updates automatically." bn="একক কোষের তথ্য দিন। ফলাফল স্বয়ংক্রিয়ভাবে আপডেট হবে।" />
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="density-cell-type" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                <BilingualText en="Unit Cell Type (Z)" bn="একক কোষের প্রকার (Z)" />
              </label>
              <select
                id="density-cell-type"
                value={type}
                onChange={(event) => setType(event.target.value as UnitCellType)}
                className="w-full border-[var(--border-strong)] bg-[var(--surface-interactive)] px-4 text-[var(--text-primary)]"
              >
                <option value="SC">Simple Cubic (SC, Z=1)</option>
                <option value="BCC">Body-Centred Cubic (BCC, Z=2)</option>
                <option value="FCC">Face-Centred Cubic (FCC, Z=4)</option>
              </select>
            </div>

            <div>
              <label htmlFor="density-molar-mass" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                <BilingualText en="Molar Mass (M)" bn="মোলার ভর (M)" />
              </label>
              <div className="relative">
                <input
                  id="density-molar-mass"
                  type="number"
                  min="0"
                  step="any"
                  value={molarMass}
                  onChange={(event) => setMolarMass(event.target.value)}
                  className="w-full border-[var(--border-strong)] bg-[var(--surface-interactive)] px-4 pr-20 text-[var(--text-primary)]"
                />
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-semibold text-[var(--text-muted)]">g/mol</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_120px]">
              <div>
                <label htmlFor="density-edge-length" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                  <BilingualText en="Edge Length (a)" bn="প্রান্তের দৈর্ঘ্য (a)" />
                </label>
                <input
                  id="density-edge-length"
                  type="number"
                  min="0"
                  step="any"
                  value={edgeLength}
                  onChange={(event) => setEdgeLength(event.target.value)}
                  className="w-full border-[var(--border-strong)] bg-[var(--surface-interactive)] px-4 text-[var(--text-primary)]"
                />
              </div>
              <div>
                <label htmlFor="density-edge-unit" className="mb-2 block text-sm font-bold text-[var(--text-primary)]">
                  <BilingualText en="Unit" bn="একক" />
                </label>
                <select
                  id="density-edge-unit"
                  value={unit}
                  onChange={(event) => setUnit(event.target.value as 'pm' | 'Å' | 'nm' | 'cm')}
                  className="w-full border-[var(--border-strong)] bg-[var(--surface-interactive)] px-4 text-[var(--text-primary)]"
                >
                  <option value="pm">pm</option>
                  <option value="Å">Å</option>
                  <option value="nm">nm</option>
                  <option value="cm">cm</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 sm:p-6" aria-labelledby="density-calculation-steps">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow mb-1"><BilingualText en="Scientific output" bn="বৈজ্ঞানিক আউটপুট" /></p>
              <h3 id="density-calculation-steps" className="text-xl font-extrabold text-[var(--text-primary)]">
                <BilingualText en="Calculation Steps" bn="গণনার ধাপসমূহ" />
              </h3>
            </div>
            <span className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)] px-2.5 py-1.5 text-xs font-black text-[var(--accent-primary)]">ρ</span>
          </div>

          <div className="space-y-6 text-[var(--text-secondary)]">
            <div>
              <h4 className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                <BilingualText en="Formula" bn="সূত্র" />
              </h4>
              <div className="type-formula overflow-x-auto rounded-xl border border-[var(--border-default)] bg-[var(--formula-background)] px-3 py-5 text-center text-[var(--text-primary)] shadow-[var(--shadow-low)]" aria-label="Density equals Z times molar mass divided by Avogadro constant times edge length cubed">
                <div className="flex min-w-max items-center justify-center gap-3 px-2 font-serif text-[clamp(1.25rem,3vw,1.9rem)]" aria-hidden="true">
                  <span className="italic">ρ</span>
                  <span>=</span>
                  <span className="inline-flex flex-col items-center italic leading-none">
                    <span className="border-b border-current px-3 pb-1.5">Z · M</span>
                    <span className="px-3 pt-1.5">N<sub className="text-[0.65em]">A</sub> · a<sup className="text-[0.65em]">3</sup></span>
                  </span>
                </div>
              </div>
            </div>

            {error ? (
              <div className="w-full rounded-xl border border-[color-mix(in_srgb,var(--error)_55%,var(--border-default))] bg-[color-mix(in_srgb,var(--error)_10%,var(--surface-primary))] p-4 text-center font-bold text-[var(--error)]" role="alert">
                {error}
              </div>
            ) : density !== null ? (
              <div>
                <h4 className="mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  <BilingualText en="Result" bn="ফলাফল" />
                </h4>
                <div className="flex min-h-24 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--success)_60%,var(--border-default))] bg-[color-mix(in_srgb,var(--success)_11%,var(--surface-primary))] px-4 py-5 text-center shadow-[var(--shadow-low)]" aria-live="polite">
                  <span className="text-3xl font-black tracking-tight text-[var(--success)]">
                    {density.toFixed(2)} <span className="whitespace-nowrap text-xl font-extrabold">g/cm³</span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-primary)] p-5 text-center text-sm text-[var(--text-muted)]">
                <BilingualText en="Enter valid positive values to calculate density." bn="ঘনত্ব গণনা করতে বৈধ ধনাত্মক মান লিখুন।" />
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};
