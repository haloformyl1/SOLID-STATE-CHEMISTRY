import React from 'react';
import { useStore } from '../store/useStore';

interface BilingualTextProps {
  en: string | React.ReactNode;
  bn: string | React.ReactNode;
  className?: string;
}

export const BilingualText: React.FC<BilingualTextProps> = ({ en, bn, className = '' }) => {
  const language = useStore((state) => state.language);

  if (language === 'en') {
    return <span className={className}>{en}</span>;
  }
  
  if (language === 'bn') {
    return <span className={className}>{bn}</span>;
  }

  // Bilingual mode: English and Bengali together
  return (
    <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 ${className}`}>
      <div className="flex-1">
        <span className="text-blue-700 dark:text-blue-300 font-medium block mb-1 text-xs uppercase tracking-wider">English</span>
        {en}
      </div>
      <div className="flex-1 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700 pt-2 sm:pt-0 sm:pl-4">
        <span className="text-emerald-700 dark:text-emerald-300 font-medium block mb-1 text-xs uppercase tracking-wider">বাংলা</span>
        {bn}
      </div>
    </div>
  );
};
