import React from 'react';
import { Link } from 'react-router-dom';
import { BilingualText } from '../components/BilingualText';
import { ArrowRight, Box } from 'lucide-react';
import { HeroCrystalAnimation } from '../components/3d/HeroCrystalAnimation';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between min-h-[calc(100vh-8rem)] w-full">
      {/* Top Banner */}
      <div className="w-full bg-[var(--bg-sec)] py-2 border-b border-[var(--border-sub)] text-center mb-4">
        <p className="text-sm font-medium text-[var(--text-str)] m-0">
          Designed & Prepared By- Arghyadeep Roy Contact- 9830507435.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between p-4 sm:p-8 gap-8 w-full max-w-7xl mx-auto">
      {/* Left Column: Text and Actions */}
      <div className="w-full md:w-1/2 space-y-8 animate-fade-in-up z-10">
        
        {/* Creator Credit removed from here and moved to top */}

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--text-str)] leading-tight">
          <BilingualText 
            en="Interactive Solid-State Chemistry" 
            bn="ইন্টারেক্টিভ কঠিন অবস্থার রসায়ন" 
          />
        </h1>
        
        <p className="text-lg sm:text-xl text-[var(--text-norm)] leading-relaxed max-w-lg">
          <BilingualText 
            en="Explore, visualize, and calculate 3D crystal structures, voids, packing efficiency, and point defects in an interactive laboratory." 
            bn="ইন্টারেক্টিভ ল্যাবরেটরিতে 3D স্ফটিক গঠন, শূন্যস্থান, সন্নিবেশ দক্ষতা এবং বিন্দু ত্রুটিগুলি অন্বেষণ করুন এবং গণনা করুন।" 
          />
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link 
            to="/learn" 
            className="w-full sm:w-auto px-8 py-4 bg-[var(--acc-prim)] hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <BilingualText en="Start Learning" bn="শেখা শুরু করুন" />
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link 
            to="/lab" 
            className="w-full sm:w-auto px-8 py-4 glass-panel text-[var(--text-str)] hover:border-[var(--acc-prim)] rounded-xl font-bold text-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            <Box className="w-5 h-5 text-[var(--acc-prim)]" />
            <BilingualText en="Explore 3D Lab" bn="3D ল্যাব অন্বেষণ করুন" />
          </Link>
        </div>
      </div>

      {/* Right Column: 3D Crystal Animation */}
      <div className="w-full md:w-1/2 animate-fade-in-down">
        <div className="relative">
          {/* Decorative backdrop glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--acc-prim)] to-[var(--acc-viol)] opacity-10 dark:opacity-20 blur-3xl rounded-full mix-blend-multiply dark:mix-blend-screen"></div>
          <HeroCrystalAnimation />
        </div>
      </div>

    </div>
    </div>
  );
};
