import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, MousePointer2, Sparkles } from 'lucide-react';
import { HeroCrystalAnimation } from '../components/3d/HeroCrystalAnimation';
import { BilingualText } from '../components/BilingualText';
import { CreatorCreditBar } from '../components/CreatorCreditBar';

export const Home: React.FC = () => (
  <div className="flex min-h-[calc(100dvh-var(--header-height-mobile))] w-full flex-col md:min-h-[calc(100dvh-var(--header-height-desktop))]">
    <CreatorCreditBar />

    <section className="page-shell grid flex-1 items-center gap-10 py-9 md:grid-cols-[minmax(0,0.88fr)_minmax(480px,1.12fr)] md:gap-12 md:py-12 xl:gap-20" aria-labelledby="home-title">
      <div className="relative z-10 max-w-[720px] animate-fade-in-up">
        <div className="eyebrow mb-5">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Crystal Learning Studio
        </div>

        <h1 id="home-title" className="type-display-large font-black text-[var(--text-primary)]">
          <BilingualText en="Interactive Solid-State Chemistry" bn="ইন্টারেক্টিভ কঠিন অবস্থার রসায়ন" />
        </h1>

        <div className="mt-6 max-w-[66ch] text-lg leading-[1.75] text-[var(--text-secondary)] sm:text-xl">
          <BilingualText
            en="Explore, visualize, and calculate 3D crystal structures, voids, packing efficiency, and point defects in a premium interactive laboratory."
            bn="প্রিমিয়াম ইন্টারেক্টিভ ল্যাবরেটরিতে 3D স্ফটিক গঠন, শূন্যস্থান, সন্নিবেশ দক্ষতা এবং বিন্দু ত্রুটিগুলি অন্বেষণ করুন এবং গণনা করুন।"
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/learn" className="btn btn-primary w-full px-6 py-3.5 sm:w-auto">
            <BilingualText en="Start Learning" bn="শেখা শুরু করুন" />
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link to="/lab" className="btn btn-secondary w-full px-6 py-3.5 sm:w-auto">
            <Box className="h-5 w-5 text-[var(--accent-secondary)]" aria-hidden="true" />
            <BilingualText en="Explore 3D Lab" bn="3D ল্যাব অন্বেষণ করুন" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--border-default)] pt-6 text-sm font-semibold text-[var(--text-muted)]">
          <span className="flex items-center gap-2"><span className="status-dot" aria-hidden="true" /><BilingualText en="Guided concepts" bn="নির্দেশিত ধারণা" /></span>
          <span className="flex items-center gap-2"><MousePointer2 className="h-4 w-4 text-[var(--accent-violet)]" aria-hidden="true" /><BilingualText en="Interactive models" bn="ইন্টারেক্টিভ মডেল" /></span>
        </div>
      </div>

      <div className="animate-fade-in-up md:min-w-0">
        <div className="lab-frame min-h-[420px] md:min-h-[560px]" aria-label="Animated crystal lattice preview">
          <div className="lab-frame-toolbar">
            <div className="lab-frame-toolbar-title flex min-w-0 items-center gap-3">
              <span className="status-dot" aria-hidden="true" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">PIECHEM Laboratory View</p>
                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-sky-200/70">Face-centred crystal study</p>
              </div>
            </div>
            <span className="hidden rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-sky-100 sm:inline">Drag to inspect</span>
          </div>
          <div className="crystal-grid relative min-h-0 flex-1 overflow-hidden">
            <HeroCrystalAnimation />
            <div className="pointer-events-none absolute inset-x-5 bottom-5 rounded-xl border border-white/10 bg-[#071923]/80 px-4 py-3 text-xs leading-relaxed text-sky-100/80 backdrop-blur-sm">
              <BilingualText en="A connected lattice reveals how repeating unit cells build a crystal." bn="সংযুক্ত ল্যাটিস দেখায় কীভাবে পুনরাবৃত্ত একক কোষ একটি স্ফটিক তৈরি করে।" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);
