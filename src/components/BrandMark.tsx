import React from 'react';

interface BrandMarkProps {
  compact?: boolean;
  inverse?: boolean;
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ compact = false, inverse = false, className = '' }) => (
  <span className={`inline-flex min-w-0 items-center gap-3 ${className}`} aria-label="PIECHEM">
    <span
      aria-hidden="true"
      className={`relative grid shrink-0 place-items-center overflow-hidden border border-current bg-[var(--selected-state)] text-[var(--accent-primary)] shadow-sm ${compact ? 'h-8 w-8 rounded-lg' : 'h-10 w-10 rounded-[11px]'}`}
    >
      <span className="absolute h-[55%] w-[55%] rotate-45 border-[1.5px] border-current" />
      <span className="absolute h-1.5 w-1.5 rounded-full bg-current shadow-[10px_0_0_current,-10px_0_0_current,0_10px_0_current,0_-10px_0_current]" />
      <span className="relative z-10 translate-x-[1px] text-[10px] font-black leading-none">P</span>
    </span>
    <span className={`${compact ? 'text-lg' : 'text-xl'} font-black tracking-[0.08em] ${inverse ? 'text-white' : 'text-[var(--text-primary)]'}`}>
      PIECHEM
    </span>
  </span>
);
