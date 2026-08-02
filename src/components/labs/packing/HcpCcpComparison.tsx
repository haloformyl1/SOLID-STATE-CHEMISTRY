import React from 'react';
import { BilingualText } from '../../BilingualText';

export const HcpCcpComparison: React.FC = () => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse bg-[var(--surf-elev)] rounded-xl overflow-hidden shadow-sm border border-[var(--border-sub)]">
        <thead>
          <tr className="bg-[var(--bg-sec)]/50 border-b border-[var(--border-sub)]">
            <th className="p-4 text-left font-bold text-[var(--text-str)] w-1/3">
              <BilingualText en="Feature" bn="বৈশিষ্ট্য" />
            </th>
            <th className="p-4 text-left font-bold text-[var(--text-str)] w-1/3 border-l border-[var(--border-sub)]">
              <BilingualText en="HCP" bn="HCP" />
            </th>
            <th className="p-4 text-left font-bold text-[var(--text-str)] w-1/3 border-l border-[var(--border-sub)]">
              <BilingualText en="CCP" bn="CCP" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[var(--border-sub)]">
            <td className="p-4 font-medium text-[var(--text-norm)]">
              <BilingualText en="Layer Stacking" bn="স্তরবিন্যাস" />
            </td>
            <td className="p-4 text-indigo-600 dark:text-indigo-400 font-mono font-bold border-l border-[var(--border-sub)]">
              ABAB...
            </td>
            <td className="p-4 text-amber-600 dark:text-amber-400 font-mono font-bold border-l border-[var(--border-sub)]">
              ABCABC...
            </td>
          </tr>
          <tr className="border-b border-[var(--border-sub)] bg-slate-50/50 bg-[var(--surf-elev)]/50">
            <td className="p-4 font-medium text-[var(--text-norm)]">
              <BilingualText en="Conventional Unit Cell" bn="প্রচলিত একক কোষ" />
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              <BilingualText en="Hexagonal" bn="ষড়ভুজাকার" />
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              <BilingualText en="Face-Centred Cubic (FCC)" bn="তলকেন্দ্রিক ঘনকীয় (FCC)" />
            </td>
          </tr>
          <tr className="border-b border-[var(--border-sub)]">
            <td className="p-4 font-medium text-[var(--text-norm)]">
              <BilingualText en="Coordination Number" bn="সমন্বয় সংখ্যা" />
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              12
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              12
            </td>
          </tr>
          <tr className="bg-slate-50/50 bg-[var(--surf-elev)]/50 border-b border-[var(--border-sub)]">
            <td className="p-4 font-medium text-[var(--text-norm)]">
              <BilingualText en="Packing Efficiency" bn="সন্নিবেশ দক্ষতা" />
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              ~74%
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              ~74%
            </td>
          </tr>
          <tr>
            <td className="p-4 font-medium text-[var(--text-norm)]">
              <BilingualText en="Symmetry" bn="প্রতিসাম্য" />
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              <BilingualText en="Hexagonal" bn="ষড়ভুজাকার" />
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              <BilingualText en="Cubic" bn="ঘনকীয়" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
