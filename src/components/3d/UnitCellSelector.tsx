import React, { useState } from 'react';
import { CrystalCanvas } from './CrystalCanvas';
import { UnitCell, type UnitCellType } from './UnitCell';
import { BilingualText } from '../BilingualText';
import { Layers, Maximize2 } from 'lucide-react';
import { ScientificPanel } from '../ui/ScientificPanel';

export const UnitCellSelector: React.FC = () => {
  const [type, setType] = useState<UnitCellType>('SC');
  const [exploded, setExploded] = useState(false);
  const [opacity, setOpacity] = useState(1);

  return (
    <div className="flex flex-col md:flex-row w-full h-[500px] border border-[var(--border-sub)] rounded-xl overflow-hidden glass-panel">
      
      {/* Viewport */}
      <div className="flex-1 relative bg-[#07131F]">
        {/* Subtle Spatial Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(41,70,91,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(41,70,91,0.2)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        <CrystalCanvas>
          <UnitCell type={type} opacity={opacity} exploded={exploded} />
        </CrystalCanvas>
        
        {/* View Controls overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center z-10 pointer-events-none">
          <div className="pointer-events-auto flex gap-2 glass-panel px-2 py-1 rounded-lg">
            <button
              onClick={() => setExploded(!exploded)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${exploded ? 'bg-[var(--acc-prim)] text-white' : 'text-[var(--text-norm)] hover:bg-[var(--bg-sec)] hover:text-[var(--text-str)]'}`}
            >
              <Maximize2 className="w-4 h-4" />
              <BilingualText en="Exploded View" bn="বিস্ফোরিত দৃশ্য" />
            </button>
            
            <button
              onClick={() => setOpacity(opacity === 1 ? 0.4 : 1)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${opacity < 1 ? 'bg-[var(--acc-prim)] text-white' : 'text-[var(--text-norm)] hover:bg-[var(--bg-sec)] hover:text-[var(--text-str)]'}`}
            >
              <Layers className="w-4 h-4" />
              <BilingualText en="Transparent" bn="স্বচ্ছ" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Control Panel */}
      <ScientificPanel title={<BilingualText en="Select Unit Cell" bn="একক কোষ নির্বাচন করুন" />}>
        <button
          onClick={() => setType('SC')}
          className={`text-left p-4 rounded-lg border-2 transition-all ${type === 'SC' ? 'border-[var(--acc-prim)] bg-[var(--acc-prim)]/10' : 'border-[var(--border-sub)] hover:border-[var(--acc-sec)]'}`}
        >
          <div className="font-bold text-[var(--text-str)]">SC</div>
          <div className="text-sm text-[var(--text-mut)]">
            <BilingualText en="Simple Cubic" bn="সরল ঘনকাকার" />
          </div>
        </button>
        
        <button
          onClick={() => setType('BCC')}
          className={`text-left p-4 rounded-lg border-2 transition-all ${type === 'BCC' ? 'border-[var(--acc-prim)] bg-[var(--acc-prim)]/10' : 'border-[var(--border-sub)] hover:border-[var(--acc-sec)]'}`}
        >
          <div className="font-bold text-[var(--text-str)]">BCC</div>
          <div className="text-sm text-[var(--text-mut)]">
            <BilingualText en="Body-Centred Cubic" bn="দেহ-কেন্দ্রিক ঘনকাকার" />
          </div>
        </button>
        
        <button
          onClick={() => setType('FCC')}
          className={`text-left p-4 rounded-lg border-2 transition-all ${type === 'FCC' ? 'border-[var(--acc-prim)] bg-[var(--acc-prim)]/10' : 'border-[var(--border-sub)] hover:border-[var(--acc-sec)]'}`}
        >
          <div className="font-bold text-[var(--text-str)]">FCC</div>
          <div className="text-sm text-[var(--text-mut)]">
            <BilingualText en="Face-Centred Cubic" bn="পৃষ্ঠ-কেন্দ্রিক ঘনকাকার" />
          </div>
        </button>
        
        <div className="mt-auto p-4 bg-[var(--bg-sec)] rounded-lg border border-[var(--border-sub)] text-xs text-[var(--text-mut)]">
          <BilingualText 
            en="Drag to rotate, scroll to zoom. Use buttons to toggle exploded and transparent views." 
            bn="ঘোরাতে ড্র্যাগ করুন, জুম করতে স্ক্রোল করুন। বিস্ফোরিত এবং স্বচ্ছ দৃশ্য টগল করতে বোতামগুলি ব্যবহার করুন।" 
          />
        </div>
      </ScientificPanel>
    </div>
  );
};
