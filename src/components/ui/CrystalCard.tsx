import React from 'react';
import type { LucideIcon } from 'lucide-react';

export type CrystalCardVariant = 'default' | 'definition' | 'formula' | 'insight' | 'practice';

interface CrystalCardProps {
  children: React.ReactNode;
  variant?: CrystalCardVariant;
  title?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  collapsible?: boolean;
}

export const CrystalCard: React.FC<CrystalCardProps> = ({
  children,
  variant = 'default',
  title,
  icon: Icon,
  className = '',
  collapsible = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(!collapsible);

  const getVariantStyles = () => {
    switch (variant) {
      case 'definition':
        return 'border-l-4 border-l-[var(--acc-prim)]';
      case 'formula':
        return 'border-t-4 border-t-[var(--acc-viol)] bg-[var(--bg-sec)]';
      case 'insight':
        return 'border border-[var(--acc-viol)] shadow-[0_0_15px_rgba(124,58,237,0.1)]';
      case 'practice':
        return 'border-2 border-[var(--acc-sec)] hover:shadow-lg transition-shadow';
      default:
        return 'border border-[var(--border-sub)]';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'definition': return 'text-[var(--acc-prim)]';
      case 'formula': return 'text-[var(--acc-viol)]';
      case 'insight': return 'text-[var(--acc-viol)]';
      case 'practice': return 'text-[var(--acc-sec)]';
      default: return 'text-[var(--text-str)]';
    }
  };

  return (
    <div className={`glass-panel rounded-xl overflow-hidden my-6 ${getVariantStyles()} ${className}`}>
      {title && (
        <div 
          className={`px-6 py-4 flex items-center justify-between border-b border-[var(--border-sub)] ${collapsible ? 'cursor-pointer hover:bg-[var(--bg-sec)] transition-colors' : ''}`}
          onClick={() => collapsible && setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon className={`w-5 h-5 ${getIconColor()}`} />}
            <h4 className="font-bold text-lg text-[var(--text-str)] m-0">{title}</h4>
          </div>
          {collapsible && (
            <button className="text-[var(--text-mut)] p-1 rounded hover:bg-[var(--border-sub)]">
              {isOpen ? '−' : '+'}
            </button>
          )}
        </div>
      )}
      
      {isOpen && (
        <div className={`px-6 py-5 text-[var(--text-norm)] ${variant === 'formula' ? 'flex flex-col items-center justify-center text-xl overflow-x-auto' : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
};
