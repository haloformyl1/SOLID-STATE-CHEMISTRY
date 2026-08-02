import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Globe2 } from 'lucide-react';
import { useStore, type LanguageMode } from '../store/useStore';

interface LanguageSelectorProps { compact?: boolean; }

const options: { value: LanguageMode; label: string; shortLabel: string; lang?: string }[] = [
  { value: 'en', label: 'English', shortLabel: 'EN' },
  { value: 'bn', label: 'বাংলা', shortLabel: 'বাংলা', lang: 'bn' },
  { value: 'bilingual', label: 'English + বাংলা', shortLabel: 'EN+বাংলা' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ compact = false }) => {
  const { language, setLanguage } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const activeOption = options.find((option) => option.value === language) ?? options[0];

  useEffect(() => {
    const closeFromOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    const closeFromKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', closeFromOutside);
    document.addEventListener('keydown', closeFromKeyboard);
    return () => {
      document.removeEventListener('mousedown', closeFromOutside);
      document.removeEventListener('keydown', closeFromKeyboard);
    };
  }, []);

  return (
    <div className={`relative ${compact ? '' : 'w-full'}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex min-h-11 items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)] px-2.5 text-sm font-bold text-[var(--text-primary)] shadow-sm transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--hover-state)] ${compact ? '' : 'w-full justify-between px-3'}`}
        aria-label="Language / ভাষা"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Globe2 className="h-4 w-4 shrink-0 text-[var(--accent-primary)]" aria-hidden="true" />
          <span className={compact ? 'hidden 2xl:inline' : ''}>Language / <span lang="bn">ভাষা</span></span>
          <span className={`${compact ? 'hidden sm:inline 2xl:hidden' : 'hidden'} max-w-[74px] truncate text-[11px] text-[var(--accent-primary)]`}>{activeOption.shortLabel}</span>
        </span>
        <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-[var(--text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div id={menuId} role="menu" className={`glass-panel absolute top-full z-[100] mt-2 overflow-hidden rounded-xl p-1.5 shadow-[var(--shadow-modal)] ${compact ? 'right-0 w-56' : 'inset-x-0 w-full'}`}>
          <div className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">Choose language</div>
          {options.map((option) => {
            const selected = language === option.value;
            return (
              <button
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                key={option.value}
                lang={option.lang}
                onClick={() => { setLanguage(option.value); setIsOpen(false); }}
                className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-left text-sm transition-colors ${selected ? 'bg-[var(--selected-state)] font-bold text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--hover-state)] hover:text-[var(--text-primary)]'}`}
              >
                {option.label}
                {selected && <Check className="h-4 w-4" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
