import React from 'react';
import { BilingualText } from '../../BilingualText';

export const SystemComparisonTable: React.FC = () => {
  const data = [
    { en: 'Cubic', bn: 'ঘনকীয়', edge: 'a = b = c', angle: 'α = β = γ = 90°', bl: 3 },
    { en: 'Tetragonal', bn: 'চতুষ্কোণীয়', edge: 'a = b ≠ c', angle: 'α = β = γ = 90°', bl: 2 },
    { en: 'Orthorhombic', bn: 'অর্থোরম্বিক', edge: 'a ≠ b ≠ c', angle: 'α = β = γ = 90°', bl: 4 },
    { en: 'Monoclinic', bn: 'মনোক্লিনিক', edge: 'a ≠ b ≠ c', angle: 'α = γ = 90°, β ≠ 90°', bl: 2 },
    { en: 'Triclinic', bn: 'ট্রাইক্লিনিক', edge: 'a ≠ b ≠ c', angle: 'α ≠ β ≠ γ', bl: 1 },
    { en: 'Hexagonal', bn: 'ষড়ভুজীয়', edge: 'a = b ≠ c', angle: 'α = β = 90°, γ = 120°', bl: 1 },
    { en: 'Rhombohedral', bn: 'রম্বোহেড্রাল', edge: 'a = b = c', angle: 'α = β = γ ≠ 90°', bl: 1 },
  ];

  return (
    <div className="overflow-x-auto my-8 border border-gray-200 dark:border-slate-700 rounded-xl">
      <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 uppercase font-semibold">
          <tr>
            <th className="px-4 py-3"><BilingualText en="System" bn="তন্ত্র" /></th>
            <th className="px-4 py-3"><BilingualText en="Edge Lengths" bn="প্রান্তের দৈর্ঘ্য" /></th>
            <th className="px-4 py-3"><BilingualText en="Angles" bn="কোণ" /></th>
            <th className="px-4 py-3"><BilingualText en="Bravais Lattices" bn="ব্রাভেই জালক" /></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-4 py-3 font-medium">
                <BilingualText en={row.en} bn={row.bn} />
              </td>
              <td className="px-4 py-3 font-mono">{row.edge}</td>
              <td className="px-4 py-3 font-mono">{row.angle}</td>
              <td className="px-4 py-3 font-mono text-center font-bold text-primary">{row.bl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
