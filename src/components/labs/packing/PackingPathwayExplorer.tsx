import React, { useState } from 'react';
import { BilingualText } from '../../BilingualText';
import { ArrowRight } from 'lucide-react';
import { Packing1DBuilder } from './Packing1DBuilder';
import { Packing2DBuilder } from './Packing2DBuilder';
import { Packing3DHex } from './Packing3DHex';
import { Packing3DSquare } from './Packing3DSquare';

type PathwayStage = '1d' | '2d-square' | '2d-hex' | '3d-sc' | '3d-hcp' | '3d-ccp';

export const PackingPathwayExplorer: React.FC = () => {
  const [stage, setStage] = useState<PathwayStage>('1d');

  return (
    <div className="flex h-full min-h-[620px] flex-col gap-6">
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4">
        <h4 className="font-bold text-[var(--text-str)] mb-4 text-center">
          <BilingualText en="Evolution of Close Packing" bn="ঘন সন্নিবেশের বিবর্তন" />
        </h4>
        
        {/* Pathway visualization */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 overflow-x-auto pb-4">
          <button 
            onClick={() => setStage('1d')}
            className={`rounded-lg px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${stage === '1d' ? 'bg-indigo-500 text-white shadow-md' : 'border border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--hover-state)]'}`}
          >
            <BilingualText en="1D Row" bn="১ডি সারি" />
          </button>
          
          <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0" />
          
          <div className="flex flex-row md:flex-col gap-2">
            <button 
              onClick={() => setStage('2d-square')}
              className={`rounded-lg px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${stage === '2d-square' ? 'bg-blue-500 text-white shadow-md' : 'border border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--hover-state)]'}`}
            >
              <BilingualText en="2D Square" bn="২ডি বর্গাকার" />
            </button>
            <button 
              onClick={() => setStage('2d-hex')}
              className={`rounded-lg px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${stage === '2d-hex' ? 'bg-emerald-500 text-white shadow-md' : 'border border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--hover-state)]'}`}
            >
              <BilingualText en="2D Hexagonal" bn="২ডি ষড়ভুজীয়" />
            </button>
          </div>
          
          <div className="flex flex-row md:flex-col gap-2">
            <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0" />
            <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0 hidden md:block" />
          </div>
          
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setStage('3d-sc')}
              className={`rounded-lg px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${stage === '3d-sc' ? 'bg-blue-600 text-white shadow-md' : 'border border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--hover-state)]'}`}
            >
              <BilingualText en="3D Simple Cubic" bn="৩ডি সরল ঘনকাকার" />
            </button>
            <button 
              onClick={() => setStage('3d-hcp')}
              className={`rounded-lg px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${stage === '3d-hcp' ? 'bg-emerald-600 text-white shadow-md' : 'border border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--hover-state)]'}`}
            >
              <BilingualText en="3D HCP" bn="৩ডি HCP" />
            </button>
            <button 
              onClick={() => setStage('3d-ccp')}
              className={`rounded-lg px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${stage === '3d-ccp' ? 'bg-amber-600 text-white shadow-md' : 'border border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:bg-[var(--hover-state)]'}`}
            >
              <BilingualText en="3D CCP" bn="৩ডি CCP" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 min-h-0 flex-1">
        {stage === '1d' && <Packing1DBuilder />}
        {stage === '2d-square' && <Packing2DBuilder packingType="square" />}
        {stage === '2d-hex' && <Packing2DBuilder packingType="hexagonal" />}
        {stage === '3d-sc' && <Packing3DSquare />}
        {stage === '3d-hcp' && <Packing3DHex packingType="hcp" />}
        {stage === '3d-ccp' && <Packing3DHex packingType="ccp" />}
      </div>
    </div>
  );
};
