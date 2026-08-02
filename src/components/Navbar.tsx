import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Accessibility, Check, LogOut, Maximize2, Menu, Minimize2, Moon, Sun, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { BrandMark } from './BrandMark';
import { LanguageSelector } from './LanguageSelector';

const navLinks = [
  { path: '/learn', label: 'Learn' },
  { path: '/practice', label: 'Practice' },
  { path: '/revision', label: 'Revision' },
  { path: '/progress', label: 'Progress' },
];

export const Navbar: React.FC = () => {
  const { theme, setTheme, reducedMotion, setReducedMotion, logout } = useStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appFullscreen, setAppFullscreen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setAccessibilityOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onFullscreenChange = () => setAppFullscreen(document.fullscreenElement === document.documentElement);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const toggleAppFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (error) {
      console.warn('Application fullscreen is unavailable in this browser.', error);
    }
  };

  return (
    <>
      <header className="glass-panel sticky top-0 z-50 flex h-[var(--header-height-mobile)] items-center border-x-0 border-t-0 md:h-[var(--header-height-desktop)]">
        <div className="mx-auto flex w-full max-w-[var(--page-max)] items-center justify-between gap-3 px-3 sm:px-5 lg:px-8">
          <Link to="/" className="rounded-xl focus-visible:outline-none" aria-label="PIECHEM home">
            <BrandMark compact className="sm:[&>span:first-child]:h-9 sm:[&>span:first-child]:w-9" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded-lg px-4 py-2 text-sm font-bold transition-colors ${active ? 'bg-[var(--selected-state)] text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--hover-state)] hover:text-[var(--text-primary)]'}`}
                >
                  {link.label}
                  {active && <span className="absolute inset-x-4 -bottom-[9px] h-0.5 rounded-full bg-[var(--accent-primary)]" aria-hidden="true" />}
                </Link>
              );
            })}
          </nav>

          <div className="relative flex items-center gap-1.5 sm:gap-2">
            <LanguageSelector compact />

            <button
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="icon-button border-transparent bg-transparent shadow-none"
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              aria-pressed={theme === 'dark'}
              title={theme === 'light' ? 'Dark theme' : 'Light theme'}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-[var(--accent-amber)]" />}
            </button>

            <button
              type="button"
              onClick={() => setAccessibilityOpen((open) => !open)}
              className="icon-button hidden border-transparent bg-transparent shadow-none md:inline-flex"
              aria-label="Accessibility options"
              aria-expanded={accessibilityOpen}
              title="Accessibility"
            >
              <Accessibility className="h-5 w-5" />
            </button>

            {accessibilityOpen && (
              <div className="surface-panel absolute right-0 top-[calc(100%+10px)] z-[100] w-64 p-3 shadow-[var(--shadow-modal)]">
                <p className="px-2 pb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--text-muted)]">Accessibility</p>
                <button type="button" onClick={() => setReducedMotion(!reducedMotion)} className="flex min-h-12 w-full items-center justify-between rounded-lg px-3 text-left font-bold text-[var(--text-primary)] hover:bg-[var(--hover-state)]" aria-pressed={reducedMotion}>
                  <span><span className="block text-sm">Reduce motion</span><span className="block text-xs font-medium text-[var(--text-muted)]">Pause decorative animation</span></span>
                  <span className={`grid h-6 w-6 place-items-center rounded-md border ${reducedMotion ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--button-primary-text)]' : 'border-[var(--border-strong)]'}`}>{reducedMotion && <Check className="h-4 w-4" />}</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={toggleAppFullscreen}
              className="icon-button hidden border-transparent bg-transparent shadow-none md:inline-flex"
              aria-label={appFullscreen ? 'Exit application fullscreen' : 'Enter application fullscreen'}
              title={appFullscreen ? 'Exit fullscreen' : 'Fullscreen app'}
            >
              {appFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={logout}
              className="icon-button hidden border-transparent bg-transparent text-[var(--text-muted)] shadow-none hover:!border-[var(--error)] hover:!bg-[color-mix(in_srgb,var(--error)_10%,transparent)] hover:!text-[var(--error)] xl:inline-flex"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="icon-button border-transparent bg-transparent shadow-none lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button className="absolute inset-0 bg-[var(--scrim)]" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation menu" />
          <aside id="mobile-navigation" className="surface-panel absolute inset-y-0 right-0 flex w-[min(88vw,360px)] flex-col rounded-none border-y-0 border-r-0 shadow-[var(--shadow-modal)] animate-fade-in-up">
            <div className="flex min-h-16 items-center justify-between border-b border-[var(--border-default)] px-5">
              <BrandMark compact />
              <button type="button" className="icon-button" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-5" aria-label="Mobile navigation">
              <p className="eyebrow mb-2">Learning studio</p>
              {navLinks.map((link) => {
                const active = location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-12 items-center justify-between rounded-xl border px-4 py-3 font-bold ${active ? 'border-[var(--border-interactive)] bg-[var(--selected-state)] text-[var(--accent-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:border-[var(--border-default)] hover:bg-[var(--hover-state)] hover:text-[var(--text-primary)]'}`}
                  >
                    {link.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-4 border-t border-[var(--border-default)] p-5">
              <LanguageSelector />
              <button type="button" onClick={() => setReducedMotion(!reducedMotion)} className="btn btn-secondary w-full justify-between" aria-pressed={reducedMotion}>
                <span className="flex items-center gap-2"><Accessibility className="h-4 w-4" />Reduce motion</span>
                <span className={`grid h-5 w-5 place-items-center rounded border ${reducedMotion ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--button-primary-text)]' : 'border-[var(--border-strong)]'}`}>{reducedMotion && <Check className="h-3.5 w-3.5" />}</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" className="btn btn-secondary px-3" onClick={toggleAppFullscreen}>
                  {appFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  Fullscreen
                </button>
                <button type="button" className="btn btn-ghost px-3 text-[var(--error)]" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
