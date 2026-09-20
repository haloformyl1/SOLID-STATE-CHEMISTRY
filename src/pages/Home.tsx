import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Box, MousePointer2, Sparkles } from 'lucide-react';
import { HeroCrystalAnimation } from '../components/3d/HeroCrystalAnimation';
import { BilingualText } from '../components/BilingualText';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
  <div className="flex min-h-[calc(100dvh-var(--header-height-mobile))] w-full flex-col md:min-h-[calc(100dvh-var(--header-height-desktop))]">
    <section className="page-shell grid flex-1 items-center gap-8 py-8 sm:gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 md:py-12 xl:gap-20" aria-labelledby="home-title">
      <div className="relative z-10 w-full max-w-[720px] animate-fade-in-up">
        <div className="eyebrow mb-5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 inline-flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-400" aria-hidden="true" />
          Crystal Learning Studio
        </div>

        <h1 id="home-title" className="type-display-large font-black text-[#46e3ff] tracking-tight drop-shadow-[0_0_40px_rgba(70,227,255,0.45)]">
          <BilingualText en="Interactive Solid-State Chemistry" bn="ইন্টারেক্টিভ সলিড স্টেট কেমিস্ট্রি" />
        </h1>

        <div className="mt-6 max-w-[66ch] text-lg leading-[1.75] text-[#a9bfd2] sm:text-xl font-normal">
          <BilingualText
            en="Explore, visualize, and calculate 3D crystal structures, voids, packing efficiency, and point defects in a premium interactive laboratory."
            bn="একটি প্রিমিয়াম ইন্টারেক্টিভ ল্যাবরেটরিতে 3D স্ফটিক কাঠামো, শূন্যস্থান, প্যাকিং দক্ষতা এবং ত্রুটিগুলি অন্বেষণ করুন, কল্পনা করুন এবং গণনা করুন।"
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => navigate('/learn')} className="btn btn-primary w-full px-7 py-3.5 sm:w-auto shadow-[0_10px_30px_rgba(70,227,255,0.35)] cursor-pointer">
            <BilingualText en="Start Learning" bn="শেখা শুরু করুন" />
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => navigate('/lab')} className="btn btn-secondary w-full px-7 py-3.5 sm:w-auto cursor-pointer">
            <Box className="h-5 w-5 text-[#aa7bff]" aria-hidden="true" />
            <BilingualText en="Explore 3D Lab" bn="3D ল্যাব অন্বেষণ করুন" />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-[rgba(165,214,255,0.16)] pt-6 text-sm font-semibold text-[#a9bfd2]">
          <span className="flex items-center gap-2"><span className="status-dot" aria-hidden="true" /><BilingualText en="Guided concepts" bn="নির্দেশিত ধারণা" /></span>
          <span className="flex items-center gap-2"><MousePointer2 className="h-4 w-4 text-[#aa7bff]" aria-hidden="true" /><BilingualText en="Interactive models" bn="ইন্টারেক্টিভ মডেল" /></span>
        </div>
      </div>

      <div className="animate-fade-in-up md:min-w-0">
        <div className="lab-frame min-h-[420px] md:min-h-[560px] rounded-3xl border border-[rgba(165,214,255,0.18)] bg-[#0a182c]/85 shadow-[0_24px_64px_rgba(0,0,0,0.38)] backdrop-blur-xl" aria-label="Animated crystal lattice preview">
          <div className="lab-frame-toolbar border-b border-[rgba(165,214,255,0.14)] bg-[#0c2038]/80">
            <div className="lab-frame-toolbar-title flex min-w-0 items-center gap-3">
              <span className="status-dot" aria-hidden="true" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#edf8ff]">PIECHEM Laboratory View</p>
                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-cyan-300/80">Face-centred crystal study</p>
              </div>
            </div>
            <span className="hidden rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold text-cyan-200 sm:inline">Drag to inspect</span>
          </div>
          <div className="crystal-grid relative min-h-0 flex-1 overflow-hidden">
            <HeroCrystalAnimation />
            <div className="pointer-events-none absolute inset-x-5 bottom-5 rounded-xl border border-[rgba(165,214,255,0.16)] bg-[#07192b]/85 px-4 py-3 text-xs leading-relaxed text-[#c5d8e4] backdrop-blur-md shadow-lg">
              <BilingualText en="A connected lattice reveals how repeating unit cells build a crystal." bn="একটি সংযুক্ত ল্যাটিস প্রকাশ করে যে কীভাবে পুনরাবৃত্তিকারী একক কোষগুলি একটি স্ফটিক তৈরি করে।" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);
};
