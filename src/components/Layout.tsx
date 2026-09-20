import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const Layout: React.FC = () => (
  <div className="app-shell flex min-h-screen flex-col selection:bg-[var(--accent-primary)] selection:text-[var(--button-primary-text)]">
    <button type="button" onClick={() => document.getElementById('main-content')?.focus()} className="skip-link cursor-pointer">Skip to main content</button>
    <Navbar />
    <main id="main-content" className="flex w-full flex-1 flex-col" tabIndex={-1}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
