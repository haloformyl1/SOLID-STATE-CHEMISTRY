import React, { useState, useRef, useEffect } from 'react';
import { useStore, type LanguageMode } from '../store/useStore';
import { Globe, Check } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const options: { value: LanguageMode; label: string }[] = [
    { value: 'en', label: 'English' },
    { value: 'bn', label: 'বাংলা' },
    { value: 'bilingual', label: 'English + বাংলা' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-sub)] hover:bg-[var(--bg-sec)] transition-colors text-sm font-medium text-[var(--text-str)] shadow-sm"
        aria-label="Language / ভাষা"
      >
        <Globe className="w-4 h-4 text-[var(--acc-prim)]" />
        <span className="hidden sm:inline">Language / ভাষা</span>
        <span className="sm:hidden">{options.find(o => o.value === language)?.label.split(' ')[0]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 glass-panel rounded-xl shadow-lg z-50 overflow-hidden border border-[var(--border-sub)] animate-fade-in-up">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                setLanguage(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                language === opt.value 
                  ? 'bg-[var(--acc-prim)]/10 text-[var(--acc-prim)] font-bold' 
                  : 'text-[var(--text-norm)] hover:bg-[var(--bg-sec)] hover:text-[var(--text-str)]'
              }`}
            >
              {opt.label}
              {language === opt.value && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
