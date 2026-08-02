import React from 'react';
import { BilingualText } from '../../BilingualText';

export const Packing2DComparison: React.FC = () => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse bg-[var(--surf-elev)] rounded-xl overflow-hidden shadow-sm border border-[var(--border-sub)]">
        <thead>
          <tr className="bg-[var(--bg-sec)]/50 border-b border-[var(--border-sub)]">
            <th className="p-4 text-left font-bold text-[var(--text-str)] w-1/3">
              <BilingualText en="Feature" bn="বৈশিষ্ট্য" />
            </th>
            <th className="p-4 text-left font-bold text-[var(--text-str)] w-1/3 border-l border-[var(--border-sub)]">
              <BilingualText en="Square Packing" bn="বর্গাকার সন্নিবেশ" />
            </th>
            <th className="p-4 text-left font-bold text-[var(--text-str)] w-1/3 border-l border-[var(--border-sub)]">
              <BilingualText en="Hexagonal Packing" bn="ষড়ভুজীয় সন্নিবেশ" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[var(--border-sub)]">
            <td className="p-4 font-medium text-[var(--text-norm)]">
              <BilingualText en="Alignment" bn="সারিবদ্ধকরণ" />
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              <BilingualText en="Directly above preceding row" bn="পূর্ববর্তী সারির ঠিক উপরে" />
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              <BilingualText en="In depressions of preceding row" bn="পূর্ববর্তী সারির খাঁজে" />
            </td>
          </tr>
          <tr className="border-b border-[var(--border-sub)] bg-slate-50/50 bg-[var(--surf-elev)]/50">
            <td className="p-4 font-medium text-[var(--text-norm)]">
              <BilingualText en="Layer Sequence" bn="স্তরের ক্রম" />
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)] font-mono font-bold text-blue-600 dark:text-blue-400">
              AAAA...
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)] font-mono font-bold text-emerald-600 dark:text-emerald-400">
              ABAB...
            </td>
          </tr>
          <tr className="border-b border-[var(--border-sub)]">
            <td className="p-4 font-medium text-[var(--text-norm)]">
              <BilingualText en="Coordination Number" bn="সমন্বয় সংখ্যা" />
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              <span className="font-bold text-lg bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1 rounded">4</span>
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              <span className="font-bold text-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded">6</span>
            </td>
          </tr>
          <tr className="bg-slate-50/50 bg-[var(--surf-elev)]/50">
            <td className="p-4 font-medium text-[var(--text-norm)]">
              <BilingualText en="Packing Efficiency" bn="সন্নিবেশ দক্ষতা" />
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              <BilingualText en="52.4% (Less efficient)" bn="৫২.৪% (কম দক্ষ)" />
            </td>
            <td className="p-4 text-[var(--text-mut)] border-l border-[var(--border-sub)]">
              <BilingualText en="60.4% (More efficient)" bn="৬০.৪% (বেশি দক্ষ)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
