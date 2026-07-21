import React from 'react';

interface ScientificPanelProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  position?: 'bottom' | 'side';
  className?: string;
}

export const ScientificPanel: React.FC<ScientificPanelProps> = ({ 
  children, 
  title, 
  position = 'side',
  className = '' 
}) => {
  const baseClasses = "glass-panel p-4 flex flex-col gap-4 overflow-y-auto";
  const positionClasses = position === 'side' 
    ? "md:w-72 md:border-l md:h-full border-t md:border-t-0" 
    : "w-full border-t";

  return (
    <div className={`${baseClasses} ${positionClasses} ${className}`}>
      {title && (
        <div className="font-bold text-sm uppercase tracking-wider text-[var(--text-mut)] border-b border-[var(--border-sub)] pb-2 mb-2">
          {title}
        </div>
      )}
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </div>
  );
};
