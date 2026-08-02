import React from 'react';

export const CreatorCreditBar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <aside className={`credit-bar ${className}`} aria-label="Creator credit">
    <div className="mx-auto flex min-h-9 max-w-[var(--page-max)] flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-4 py-1.5 text-xs font-semibold sm:text-[13px]">
      <span>Designed &amp; Prepared By- Arghyadeep Roy</span>
      <span className="hidden opacity-45 sm:inline" aria-hidden="true">•</span>
      <span>Contact- 9830507435</span>
    </div>
  </aside>
);
