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
    <div className="overflow-x-auto my-8 border border-[var(--border-sub)] rounded-xl">
      <table className="w-full text-left text-sm text-[var(--text-norm)]">
        <thead className="bg-[var(--surface-elevated)] font-semibold uppercase text-[var(--text-primary)]">
          <tr>
            <th className="px-4 py-3"><BilingualText en="System" bn="তন্ত্র" /></th>
            <th className="px-4 py-3"><BilingualText en="Edge Lengths" bn="প্রান্তের দৈর্ঘ্য" /></th>
            <th className="px-4 py-3"><BilingualText en="Angles" bn="কোণ" /></th>
            <th className="px-4 py-3"><BilingualText en="Bravais Lattices" bn="ব্রাভেই জালক" /></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-sub)] bg-[var(--bg-sec)]">
          {data.map((row, i) => (
            <tr key={i} className="transition-colors hover:bg-[var(--hover-state)]">
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
