import React from 'react';
import { BilingualText } from '../components/BilingualText';
import { UnitCellSelector } from '../components/3d/UnitCellSelector';
import { AtomSharing } from '../components/3d/AtomSharing';
import { PackingLab } from '../components/labs/PackingLab';
import { DensityLab } from '../components/labs/DensityLab';
import { DefectLab } from '../components/labs/DefectLab';
import { FlaskConical } from 'lucide-react';

export const Lab: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 md:p-10 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <FlaskConical className="w-8 h-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            <BilingualText en="Interactive 3D Laboratory" bn="ইন্টারেক্টিভ 3D ল্যাবরেটরি" />
          </h1>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
          <BilingualText 
            en="Explore all solid-state chemistry interactive tools in one place. Experiment with unit cells, atom sharing, packing, density, and defects." 
            bn="একক স্থানে সমস্ত কঠিন অবস্থার রসায়নের ইন্টারেক্টিভ টুলস অন্বেষণ করুন। একক কোষ, পরমাণু ভাগাভাগি, প্যাকিং, ঘনত্ব এবং ত্রুটিগুলি নিয়ে পরীক্ষা করুন।" 
          />
        </p>

        <div className="space-y-16">
          <section className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-gray-100 dark:border-slate-700 pb-4">
              <BilingualText en="1. Unit Cell Visualizer" bn="১. একক কোষ ভিজ্যুয়ালাইজার" />
            </h2>
            <UnitCellSelector />
          </section>

          <section className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-gray-100 dark:border-slate-700 pb-4">
              <BilingualText en="2. Atom Sharing" bn="২. পরমাণু ভাগাভাগি" />
            </h2>
            <AtomSharing />
          </section>

          <section className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-gray-100 dark:border-slate-700 pb-4">
              <BilingualText en="3. Packing & Voids" bn="৩. প্যাকিং এবং শূন্যস্থান" />
            </h2>
            <PackingLab />
          </section>
          
          <section className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-gray-100 dark:border-slate-700 pb-4">
              <BilingualText en="4. Density Calculator" bn="৪. ঘনত্ব ক্যালকুলেটর" />
            </h2>
            <DensityLab />
          </section>
          
          <section className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b border-gray-100 dark:border-slate-700 pb-4">
              <BilingualText en="5. Crystal Defects" bn="৫. স্ফটিকের ত্রুটি" />
            </h2>
            <DefectLab />
          </section>
        </div>
      </div>
    </div>
  );
};
