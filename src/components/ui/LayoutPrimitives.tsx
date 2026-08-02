import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  as?: 'div' | 'section' | 'article';
}

export const PageContainer: React.FC<ContainerProps> = ({ children, className = '', compact = false, as: Tag = 'div' }) => (
  <Tag className={`${compact ? 'page-shell-compact' : 'page-shell'} ${className}`}>{children}</Tag>
);

export const ReadingContainer: React.FC<Omit<ContainerProps, 'compact'>> = ({ children, className = '', as: Tag = 'div' }) => (
  <Tag className={`reading-column ${className}`}>{children}</Tag>
);

interface PageHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  aside?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, description, aside, icon: Icon, className = '' }) => (
  <header className={`flex flex-col gap-6 border-b border-[var(--border-default)] pb-8 lg:flex-row lg:items-end lg:justify-between ${className}`}>
    <div className="reading-column">
      {eyebrow && <div className="eyebrow mb-3">{Icon && <Icon className="h-4 w-4" aria-hidden="true" />}{eyebrow}</div>}
      <h1 className="type-page-title font-black text-[var(--text-primary)]">{title}</h1>
      {description && <div className="mt-4 max-w-[72ch] text-lg leading-relaxed text-[var(--text-secondary)]">{description}</div>}
    </div>
    {aside && <div className="shrink-0">{aside}</div>}
  </header>
);

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: LucideIcon;
  accent?: 'blue' | 'teal' | 'violet' | 'amber' | 'success';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon: Icon, accent = 'blue', className = '' }) => (
  <header className={`section-heading ${className}`} data-accent={accent}>
    <div>
      <div className="flex items-center gap-2.5">
        {Icon && <Icon className="h-5 w-5 text-[var(--section-accent,var(--accent-primary))]" aria-hidden="true" />}
        <h2 className="type-section-title font-extrabold text-[var(--text-primary)]">{title}</h2>
      </div>
      {subtitle && <div className="mt-2 max-w-[72ch] text-[var(--text-secondary)]">{subtitle}</div>}
    </div>
  </header>
);
