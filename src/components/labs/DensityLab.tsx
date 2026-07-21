import React, { useState } from 'react';
import { calculateDensity, getEffectiveAtoms, type UnitCellType } from '../../utils/chemistry';
import { BilingualText } from '../BilingualText';
import { Calculator } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

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
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-200 dark:border-slate-700 p-6 md:p-8 w-full max-w-4xl mx-auto my-8">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-slate-700 pb-4">
        <Calculator className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          <BilingualText en="Density Calculator" bn="ঘনত্ব ক্যালকুলেটর" />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              <BilingualText en="Unit Cell Type (Z)" bn="একক কোষের প্রকার (Z)" />
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as UnitCellType)}
              className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-slate-800 dark:text-white"
            >
              <option value="SC">Simple Cubic (SC, Z=1)</option>
              <option value="BCC">Body-Centred Cubic (BCC, Z=2)</option>
              <option value="FCC">Face-Centred Cubic (FCC, Z=4)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              <BilingualText en="Molar Mass (M) in g/mol" bn="মোলার ভর (M) g/mol এককে" />
            </label>
            <input
              type="number"
              value={molarMass}
              onChange={(e) => setMolarMass(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-slate-800 dark:text-white"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                <BilingualText en="Edge Length (a)" bn="প্রান্তের দৈর্ঘ্য (a)" />
              </label>
              <input
                type="number"
                value={edgeLength}
                onChange={(e) => setEdgeLength(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-slate-800 dark:text-white"
              />
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-slate-800 dark:text-white"
              >
                <option value="pm">pm</option>
                <option value="Å">Å</option>
                <option value="nm">nm</option>
                <option value="cm">cm</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-slate-900 p-6 rounded-xl border border-blue-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
            <BilingualText en="Calculation Steps" bn="গণনার ধাপসমূহ" />
          </h3>
          
          <div className="text-slate-700 dark:text-slate-300 space-y-6 flex flex-col items-center">
            <div className="w-full">
              <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                <BilingualText en="Formula" bn="সূত্র" />
              </h4>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm overflow-x-auto">
                <BlockMath math="\\rho = \\frac{Z \\cdot M}{N_A \\cdot a^3}" />
              </div>
            </div>
            
            {error ? (
              <div className="text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800 w-full text-center">
                {error}
              </div>
            ) : density !== null ? (
              <div className="w-full">
                <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  <BilingualText en="Result" bn="ফলাফল" />
                </h4>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shadow-sm">
                  <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                    {density.toFixed(2)} g/cm³
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
