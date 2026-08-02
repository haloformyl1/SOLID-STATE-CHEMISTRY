import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Atom, BookOpen, Box, Boxes, Calculator, CheckCircle2, CircleDot, Grid3X3, Layers } from 'lucide-react';
import { BilingualText } from '../components/BilingualText';
import { PageContainer, PageHeader } from '../components/ui/LayoutPrimitives';
import { modules } from '../content';
import { useStore } from '../store/useStore';

const moduleIcons = [Atom, Box, Calculator, AlertTriangle, Layers, Grid3X3, Boxes, CircleDot];

export const Learn: React.FC = () => {
  const completedModules = useStore((state) => state.completedModules);
  const percentage = Math.round((completedModules.length / modules.length) * 100);

  const progressSummary = (
    <div className="surface-panel flex min-w-[250px] items-center gap-4 p-4">
      <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(var(--accent-primary) ${percentage * 3.6}deg, var(--surface-elevated) 0deg)` }}>
        <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--surface-primary)] text-sm font-black text-[var(--text-primary)]">{percentage}%</div>
      </div>
      <div>
        <p className="eyebrow text-[10px]"><BilingualText en="Course progress" bn="কোর্সের অগ্রগতি" /></p>
        <p className="mt-1 font-bold text-[var(--text-primary)]">
          <BilingualText en={`${completedModules.length} of ${modules.length} completed`} bn={`${modules.length}টির মধ্যে ${completedModules.length}টি সম্পূর্ণ`} />
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100dvh-var(--header-height-desktop))] w-full">
      <PageContainer>
        <PageHeader
          eyebrow={<BilingualText en="Learning pathway" bn="শেখার পথ" />}
          icon={BookOpen}
          title={<BilingualText en="Modules" bn="অধ্যায়সমূহ" />}
          description={<BilingualText en="Select a topic below to explore its concepts and interactive laboratories." bn="এর ধারণাগুলি এবং ইন্টারেক্টিভ ল্যাবরেটরিগুলি অন্বেষণ করতে নীচের একটি বিষয় নির্বাচন করুন।" />}
          aside={progressSummary}
          className="animate-fade-in-up"
        />

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" aria-label="Solid-state chemistry modules">
          {modules.map((module, index) => {
            const completed = completedModules.includes(module.id);
            const inProgress = !completed && (index === 0 || completedModules.includes(modules[index - 1].id));
            const Icon = moduleIcons[index] ?? Atom;
            const stateLabel = completed
              ? <BilingualText en="Completed" bn="সম্পূর্ণ" />
              : inProgress
                ? <BilingualText en="Continue" bn="চালিয়ে যান" />
                : <BilingualText en="Not started" bn="শুরু হয়নি" />;

            return (
              <Link
                key={module.id}
                to={`/learn/${module.id}`}
                className={`group relative flex min-h-[290px] flex-col overflow-hidden rounded-[var(--radius-lg)] border bg-[var(--surface-primary)] p-6 shadow-[var(--shadow-low)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-interactive)] ${completed ? 'border-[color-mix(in_srgb,var(--success)_48%,var(--border-default))]' : inProgress ? 'border-[var(--border-interactive)]' : 'border-[var(--border-default)] hover:border-[var(--border-strong)]'}`}
                aria-label={`${module.title.en}. ${completed ? 'Completed' : inProgress ? 'Continue learning' : 'Not started'}`}
              >
                <span className={`absolute inset-x-0 top-0 h-1 ${completed ? 'bg-[var(--success)]' : inProgress ? 'bg-[var(--accent-primary)]' : 'bg-[var(--border-strong)]'}`} aria-hidden="true" />

                <div className="flex items-start justify-between gap-4 pt-1">
                  <div>
                    <p className="eyebrow text-[10px]"><BilingualText en={`Module ${index + 1}`} bn={`অধ্যায় ${index + 1}`} /></p>
                    <h2 className="mt-3 text-xl font-extrabold leading-snug text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)]">
                      <BilingualText en={module.title.en} bn={module.title.bn} />
                    </h2>
                  </div>
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${completed ? 'border-[color-mix(in_srgb,var(--success)_30%,transparent)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] text-[var(--success)]' : 'border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--accent-primary)]'}`}>
                    {completed ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : <Icon className="h-5 w-5" aria-hidden="true" />}
                  </span>
                </div>

                <div className="mt-5 line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  <BilingualText en={module.learningObjectives[0].en} bn={module.learningObjectives[0].bn} />
                </div>

                <div className="mt-auto pt-6">
                  <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-[var(--surface-elevated)]" aria-hidden="true">
                    <div className={`h-full rounded-full ${completed ? 'w-full bg-[var(--success)]' : inProgress ? 'w-1/3 bg-[var(--accent-primary)]' : 'w-0'}`} />
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--border-default)] pt-4">
                    <span className={`flex items-center gap-2 text-sm font-bold ${completed ? 'text-[var(--success)]' : inProgress ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'}`}>
                      {completed ? <CheckCircle2 className="h-4 w-4" /> : inProgress ? <ArrowRight className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                      {stateLabel}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--surface-elevated)] text-[var(--text-muted)] transition-all group-hover:bg-[var(--accent-primary)] group-hover:text-[var(--button-primary-text)]" aria-hidden="true">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </PageContainer>
    </div>
  );
};
