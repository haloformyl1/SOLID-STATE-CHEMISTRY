import React from 'react';
import { BilingualText } from '../../BilingualText';

export const VoidComparisonTable: React.FC = () => {
  const data = [
    { 
      prop: { en: 'Coordination Number', bn: 'সর্বাঙ্ক সংখ্যা' }, 
      tv: '4', 
      ov: '6' 
    },
    { 
      prop: { en: 'Formed by', bn: 'কী দ্বারা গঠিত' }, 
      tv: { en: '4 spheres (tetrahedron)', bn: '৪টি গোলক (চতুস্তলক)' }, 
      ov: { en: '6 spheres (octahedron)', bn: '৬টি গোলক (অষ্টতলক)' } 
    },
    { 
      prop: { en: 'No. of voids for N atoms', bn: 'N টি পরমাণুর জন্য শূন্যস্থানের সংখ্যা' }, 
      tv: '2N', 
      ov: 'N' 
    },
    { 
      prop: { en: 'Position in FCC unit cell', bn: 'FCC একক কোষে অবস্থান' }, 
      tv: { en: 'Body diagonals (2 per diagonal)', bn: 'দেহ কর্ণ (প্রতি কর্ণে ২টি)' }, 
      ov: { en: 'Body center + Edge centers', bn: 'দেহকেন্দ্র + প্রান্তকেন্দ্র' } 
    },
    { 
      prop: { en: 'Size (Radius ratio r/R)', bn: 'আকার (ব্যাসার্ধ অনুপাত r/R)' }, 
      tv: '0.225', 
      ov: '0.414' 
    }
  ];

  return (
    <div className="overflow-x-auto my-8 border border-[var(--border-sub)] rounded-xl shadow-sm">
      <table className="w-full text-left text-sm text-[var(--text-norm)]">
        <thead className="bg-primary text-white uppercase font-semibold">
          <tr>
            <th className="px-4 py-4 w-1/3"><BilingualText en="Property" bn="বৈশিষ্ট্য" /></th>
            <th className="px-4 py-4 border-l border-primary-light/30"><BilingualText en="Tetrahedral Void (TV)" bn="চতুস্তলকীয় শূন্যস্থান (TV)" /></th>
            <th className="px-4 py-4 border-l border-primary-light/30"><BilingualText en="Octahedral Void (OV)" bn="অষ্টতলকীয় শূন্যস্থান (OV)" /></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-sub)] bg-[var(--bg-sec)]">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-[var(--bg-sec)] dark:hover:bg-[var(--bg-canvas,transparent)]/50 transition-colors">
              <td className="px-4 py-4 font-semibold text-[var(--text-str)]">
                <BilingualText en={row.prop.en} bn={row.prop.bn} />
              </td>
              <td className="px-4 py-4 border-l border-[var(--border-sub)] font-medium">
                {typeof row.tv === 'string' ? row.tv : <BilingualText en={row.tv.en} bn={row.tv.bn} />}
              </td>
              <td className="px-4 py-4 border-l border-[var(--border-sub)] font-medium">
                {typeof row.ov === 'string' ? row.ov : <BilingualText en={row.ov.en} bn={row.ov.bn} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
