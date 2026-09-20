import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Accessibility, Check, LogOut, Maximize2, Menu, Minimize2, X } from 'lucide-react';
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
  const { reducedMotion, setReducedMotion, logout } = useStore();
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
      <header className="sticky top-0 z-50 flex h-auto min-h-[var(--header-height-mobile)] items-center border-b border-[rgba(70,227,255,0.18)] bg-[rgba(8,19,30,0.92)] py-1.5 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] md:min-h-[var(--header-height-desktop)]">
        <div className="mx-auto flex w-full max-w-[var(--page-max)] items-center justify-between gap-2 px-3 sm:gap-3 sm:px-5 lg:px-8">
          <div className="flex shrink-0 flex-col items-start gap-1">
            <Link to="/" className="rounded-xl focus-visible:outline-none" aria-label="PIECHEM home">
              <BrandMark compact />
            </Link>

            {/* Designed by Arghyadeep Roy badge matching Image 1 */}
            <div className="hidden sm:flex px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-[11px] text-slate-300 font-semibold tracking-wide items-center space-x-1.5 mt-0.5">
              <span className="text-slate-400">Designed by</span>
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                Arghyadeep Roy
              </span>
              <span className="text-cyan-500/60">•</span>
              <a
                href="tel:9830507435"
                className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 hover:text-white hover:bg-cyan-600/80 border border-cyan-500/50 transition-all font-mono shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                title="Call Arghyadeep Roy"
              >
                <svg className="w-2.5 h-2.5 mr-0.5 text-cyan-400 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>9830507435</span>
              </a>
            </div>
          </div>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={active ? 'page' : undefined}
                  className={`relative rounded-xl px-4 py-2 text-sm font-bold transition-all ${active ? 'bg-cyan-500/15 border border-cyan-400/35 text-[#46e3ff] shadow-[0_0_15px_rgba(70,227,255,0.22)]' : 'text-[#a9bfd2] hover:bg-white/5 hover:text-[#edf8ff]'}`}
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
