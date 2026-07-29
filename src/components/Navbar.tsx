import React from 'react';
import { Link } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';
import { useStore } from '../store/useStore';
import { Moon, Sun, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, setTheme, logout } = useStore();

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b-0 transition-colors">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 mr-8 hover-glow rounded-md px-2 py-1 transition-all">
          <span className="text-xl font-bold bg-gradient-to-r from-[var(--acc-prim)] to-[var(--acc-viol)] bg-clip-text text-transparent">
            Chem3D Lab
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 mr-auto text-sm font-medium">
          <Link to="/learn" className="text-[var(--text-norm)] hover:text-[var(--acc-prim)] transition-colors">
            Learn
          </Link>
          <Link to="/practice" className="text-[var(--text-norm)] hover:text-[var(--acc-prim)] transition-colors">
            Practice
          </Link>
          <Link to="/revision" className="text-[var(--text-norm)] hover:text-[var(--acc-prim)] transition-colors">
            Revision
          </Link>
          <Link to="/progress" className="text-[var(--text-norm)] hover:text-[var(--acc-prim)] transition-colors">
            Progress
          </Link>
        </nav>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <LanguageSelector />
          
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-full hover:bg-[var(--bg-sec)] transition-colors text-[var(--text-mut)] hover:text-[var(--text-str)] border border-transparent hover:border-[var(--border-sub)]"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-[var(--acc-amb)]" />}
          </button>

          <button
            onClick={logout}
            className="p-2 rounded-full hover:bg-[var(--stat-err)]/10 transition-colors text-[var(--text-mut)] hover:text-[var(--stat-err)] border border-transparent hover:border-[var(--stat-err)]/30"
            aria-label="Sign out"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};
