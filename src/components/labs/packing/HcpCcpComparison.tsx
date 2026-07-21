import React from 'react';
import { BilingualText } from '../../BilingualText';

export const HcpCcpComparison: React.FC = () => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <th className="p-4 text-left font-bold text-slate-800 dark:text-slate-200 w-1/3">
              <BilingualText en="Feature" bn="বৈশিষ্ট্য" />
            </th>
            <th className="p-4 text-left font-bold text-slate-800 dark:text-slate-200 w-1/3 border-l border-slate-200 dark:border-slate-700">
              <BilingualText en="HCP" bn="HCP" />
            </th>
            <th className="p-4 text-left font-bold text-slate-800 dark:text-slate-200 w-1/3 border-l border-slate-200 dark:border-slate-700">
              <BilingualText en="CCP" bn="CCP" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
              <BilingualText en="Layer Stacking" bn="স্তরবিন্যাস" />
            </td>
            <td className="p-4 text-indigo-600 dark:text-indigo-400 font-mono font-bold border-l border-slate-200 dark:border-slate-700">
              ABAB...
            </td>
            <td className="p-4 text-amber-600 dark:text-amber-400 font-mono font-bold border-l border-slate-200 dark:border-slate-700">
              ABCABC...
            </td>
          </tr>
          <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
              <BilingualText en="Conventional Unit Cell" bn="প্রচলিত একক কোষ" />
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              <BilingualText en="Hexagonal" bn="ষড়ভুজাকার" />
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              <BilingualText en="Face-Centred Cubic (FCC)" bn="তলকেন্দ্রিক ঘনকীয় (FCC)" />
            </td>
          </tr>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
              <BilingualText en="Coordination Number" bn="সমন্বয় সংখ্যা" />
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              12
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              12
            </td>
          </tr>
          <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
            <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
              <BilingualText en="Packing Efficiency" bn="সন্নিবেশ দক্ষতা" />
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              ~74%
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              ~74%
            </td>
          </tr>
          <tr>
            <td className="p-4 font-medium text-slate-700 dark:text-slate-300">
              <BilingualText en="Symmetry" bn="প্রতিসাম্য" />
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              <BilingualText en="Hexagonal" bn="ষড়ভুজাকার" />
            </td>
            <td className="p-4 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700">
              <BilingualText en="Cubic" bn="ঘনকীয়" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
