import React from 'react';
import { useStore } from '../../store/useStore';
import { modules } from '../../content';
import { BilingualText } from '../BilingualText';
import { CheckCircle, Circle, Trophy, Activity } from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const completedModules = useStore((state) => state.completedModules);

  const total = modules.length;
  const completed = completedModules.length;
  const percentage = Math.round((completed / total) * 100) || 0;

  return (
    <div className="mx-auto my-4 max-w-[1400px]">
      <div className="surface-panel overflow-hidden">
        
        {/* Crystal Growth Header Banner */}
        <div className="relative bg-gradient-to-br from-[var(--surface-secondary)] to-[var(--surface-elevated)] p-10 md:p-14 border-b border-[var(--border-default)] overflow-hidden">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-30 pointer-events-none"
               style={{
                 backgroundImage: `radial-gradient(circle at center, var(--accent-primary) 0, transparent 2px)`,
                 backgroundSize: '30px 30px'
               }}
          ></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">

            {/* Progress Ring */}
            <div className="relative flex-shrink-0">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  className="text-[var(--border-default)]"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="70"
                  cx="80"
                  cy="80"
                />
                <circle
                  className="text-[var(--accent-primary)] drop-shadow-[0_0_12px_rgba(2,132,199,0.5)] dark:drop-shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={439.8}
                  strokeDashoffset={439.8 - (439.8 * percentage) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="70"
                  cx="80"
                  cy="80"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-[var(--text-primary)]">
                  {percentage}%
                </span>
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full text-sm font-bold tracking-widest uppercase mb-4 border border-[var(--accent-primary)]/20">
                <Activity className="w-4 h-4" />
                <span><BilingualText en="Crystal Growth" bn="স্ফটিক বৃদ্ধি" /></span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[var(--text-primary)] tracking-tight">
                <BilingualText en="Your Learning Progress" bn="আপনার শেখার অগ্রগতি" />
              </h1>
              <p className="text-[var(--text-secondary)] text-xl mb-6 max-w-lg leading-relaxed">
                <BilingualText 
                  en={`You have successfully mapped ${completed} out of ${total} structure points in the PIECHEM learning lattice.`}
                  bn={`আপনি PIECHEM লার্নিং ল্যাটিসে ${total} টির মধ্যে ${completed} টি গঠন বিন্দু সফলভাবে ম্যাপ করেছেন।`}
                />
              </p>
              
              {percentage === 100 && (
                <div className="mt-2 inline-flex items-center gap-3 bg-gradient-to-r from-[var(--accent-amber)] to-[#f59e0b] text-white px-6 py-3 rounded-[var(--radius-full)] font-bold shadow-lg shadow-[var(--accent-amber)]/20">
                  <Trophy className="w-6 h-6" />
                  <BilingualText en="Full Lattice Crystallized! Course Completed!" bn="পূর্ণ ল্যাটিস স্ফটিকীকৃত! কোর্স সম্পন্ন হয়েছে!" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Module Checklist */}
        <div className="p-10 md:p-14 bg-[var(--page-background)]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
              <span className="w-2 h-8 bg-[var(--accent-primary)] rounded-full inline-block"></span>
              <BilingualText en="Lattice Mapping Status" bn="ল্যাটিস ম্যাপিং স্ট্যাটাস" />
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((mod: any, idx: number) => {
              const isCompleted = completedModules.includes(mod.id);
              
              return (
                <div 
                  key={mod.id}
                  className={`group flex items-start gap-5 p-6 rounded-[var(--radius-lg)] border-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'border-[var(--success)] bg-[var(--success)]/5 shadow-sm hover:shadow-md'
                      : 'border-[var(--border-default)] bg-[var(--surface-primary)] hover:border-[var(--border-interactive)]'
                  }`}
                >
                  <div className="mt-1 flex-shrink-0 relative">
                    {isCompleted ? (
                      <>
                        <div className="absolute inset-0 bg-[var(--success)] blur-md opacity-40 rounded-full"></div>
                        <CheckCircle className="relative w-8 h-8 text-[var(--success)]" />
                      </>
                    ) : (
                      <Circle className="w-8 h-8 text-[var(--border-strong)]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-bold tracking-widest uppercase mb-1.5 ${isCompleted ? 'text-[var(--success)]' : 'text-[var(--text-muted)]'}`}>
                      <BilingualText en={`Point ${idx + 1}`} bn={`বিন্দু ${idx + 1}`} />
                    </div>
                    <h3 className={`font-bold text-xl leading-snug ${isCompleted ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors'}`}>
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
