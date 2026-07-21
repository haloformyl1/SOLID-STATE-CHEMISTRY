import React from 'react';
import { BilingualText } from '../../BilingualText';

export const Packing2DComparison: React.FC = () => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <th className="p-4 text-left font-bold text-slate-800 dark:text-slate-200 w-1/3">
              <BilingualText en="Feature" bn="বৈশিষ্ট্য" />
            </th>
            <th className="p-4 text-left font-bold text-slate-800 dark:text-slate-200 w-1/3 border-l border-slate-200 dark:border-slate-700">
              <BilingualText en="Square Packing" bn="বর্গাকার সন্নিবেশ" />
            </th>
            <th className="p-4 text-left font-bold text-slate-800 dark:text-slate-200 w-1/3 border-l border-slate-200 dark:border-slate-700">
              <BilingualText en="Hexagonal Packing" bn="ষড়ভুজীয় সন্নিবেশ" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
              <BilingualText en="Alignment" bn="সারিবদ্ধকরণ" />
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              <BilingualText en="Directly above preceding row" bn="পূর্ববর্তী সারির ঠিক উপরে" />
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              <BilingualText en="In depressions of preceding row" bn="পূর্ববর্তী সারির খাঁজে" />
            </td>
          </tr>
          <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
              <BilingualText en="Layer Sequence" bn="স্তরের ক্রম" />
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 font-mono font-bold text-blue-600 dark:text-blue-400">
              AAAA...
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600 dark:text-emerald-400">
              ABAB...
            </td>
          </tr>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
              <BilingualText en="Coordination Number" bn="সমন্বয় সংখ্যা" />
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              <span className="font-bold text-lg bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1 rounded">4</span>
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              <span className="font-bold text-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded">6</span>
            </td>
          </tr>
          <tr className="bg-slate-50/50 dark:bg-slate-800/50">
            <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
              <BilingualText en="Packing Efficiency" bn="সন্নিবেশ দক্ষতা" />
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              <BilingualText en="52.4% (Less efficient)" bn="৫২.৪% (কম দক্ষ)" />
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              <BilingualText en="60.4% (More efficient)" bn="৬০.৪% (বেশি দক্ষ)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
