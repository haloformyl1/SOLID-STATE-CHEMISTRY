import { BrandMark } from './BrandMark';

export const Footer: React.FC = () => (
  <footer className="mt-auto border-t border-[var(--border-default)] bg-[var(--surface-secondary)]">
    <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col items-center justify-between gap-5 px-5 py-7 text-center sm:flex-row sm:text-left lg:px-8">
      <div>
        <BrandMark compact />
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Crystal Learning Studio</p>
      </div>
      <p className="text-sm font-semibold leading-relaxed text-[var(--text-secondary)]">
        <span className="block">Designed &amp; Prepared By- Arghyadeep Roy</span>
        <span className="block text-[var(--text-muted)]">Contact- 9830507435</span>
      </p>
    </div>
  </footer>
);
