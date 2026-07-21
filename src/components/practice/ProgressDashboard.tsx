import React from 'react';
import { useStore } from '../../store/useStore';
import { modules } from '../../content';
import { BilingualText } from '../BilingualText';
import { CheckCircle, Circle, Trophy } from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const completedModules = useStore((state) => state.completedModules);

  const total = modules.length;
  const completed = completedModules.length;
  const percentage = Math.round((completed / total) * 100) || 0;

  return (
    <div className="max-w-4xl mx-auto my-12">
      <div className="glass-panel rounded-2xl shadow-xl overflow-hidden border border-[var(--border-sub)]">
        
        <div className="bg-gradient-to-r from-primary to-primary-dark p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  className="text-white/20"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                />
                <circle
                  className="text-amber-400 drop-shadow-md transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={351.8}
                  strokeDashoffset={351.8 - (351.8 * percentage) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="56"
                  cx="64"
                  cy="64"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                {percentage}%
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">
                <BilingualText en="Your Learning Progress" bn="আপনার শেখার অগ্রগতি" />
              </h1>
              <p className="text-blue-100 text-lg">
                <BilingualText 
                  en={`You have completed ${completed} out of ${total} modules.`} 
                  bn={`আপনি ${total} টির মধ্যে ${completed} টি মডিউল সম্পন্ন করেছেন।`} 
                />
              </p>
              
              {percentage === 100 && (
                <div className="mt-4 flex items-center gap-2 bg-amber-400 text-amber-900 px-4 py-2 rounded-lg font-bold w-max mx-auto md:mx-0 shadow-lg">
                  <Trophy className="w-5 h-5" />
                  <BilingualText en="Course Completed!" bn="কোর্স সম্পন্ন হয়েছে!" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
            <BilingualText en="Module Checklist" bn="মডিউল চেকলিস্ট" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((mod: any, idx: number) => {
              const isCompleted = completedModules.includes(mod.id);
              
              return (
                <div 
                  key={mod.id}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-colors ${
                    isCompleted 
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 dark:border-emerald-800' 
                      : 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50'
                  }`}
                >
                  <div className="mt-1">
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-400 dark:text-slate-500 mb-1">
                      <BilingualText en={`Module ${idx + 1}`} bn={`মডিউল ${idx + 1}`} />
                    </div>
                    <h3 className={`font-bold text-lg ${isCompleted ? 'text-emerald-900 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      <BilingualText en={mod.title.en} bn={mod.title.bn} />
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
};
