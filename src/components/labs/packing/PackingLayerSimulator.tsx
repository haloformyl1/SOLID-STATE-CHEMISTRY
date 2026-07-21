import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';
import * as THREE from 'three';
import { Undo, Trash2 } from 'lucide-react';

type LayerLabel = 'A' | 'B' | 'C';

interface ParticleNode {
  id: number;
  layerIndex: number;
  layerType: number;
  position: THREE.Vector3;
}

export const PackingLayerSimulator: React.FC = () => {
  const [sequence, setSequence] = useState<LayerLabel[]>(['A']);
  
  const addLayer = (label: LayerLabel) => {
    if (sequence.length >= 6) return; // limit to 6 layers
    
    // Validate: cannot add the same layer twice in a row
    if (sequence[sequence.length - 1] === label) {
      alert("Cannot add the same layer directly on top of itself in close packing!");
      return;
    }
    
    setSequence([...sequence, label]);
  };
  
  const undo = () => {
    if (sequence.length > 1) {
      setSequence(sequence.slice(0, -1));
    }
  };
  
  const reset = () => {
    setSequence(['A']);
  };

  const particles = useMemo(() => {
    const arr: ParticleNode[] = [];
    let idx = 0;
    const r = 1;
    const d = 2 * r;
    const zOffsetDist = Math.sqrt(8/3) * r;
    const size = 3;

    sequence.forEach((label, z) => {
      let xShift = 0;
      let yShift = 0;
      let layerType = 0;
      
      if (label === 'A') layerType = 0;
      if (label === 'B') {
        layerType = 1;
        xShift = r;
        yShift = Math.sqrt(3) * r / 3;
      }
      if (label === 'C') {
        layerType = 2;
        xShift = r;
        yShift = -(Math.sqrt(3) * r / 3);
      }

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const xPos = x * d + (y % 2 !== 0 ? r : 0) + xShift;
          const yPos = y * Math.sqrt(3) * r + yShift;
          const zPos = z * zOffsetDist;

          arr.push({
            id: idx++,
            layerIndex: z,
            layerType,
            position: new THREE.Vector3(xPos, yPos, zPos),
          });
        }
      }
    });
    
    if (arr.length > 0) {
      const box = new THREE.Box3().setFromPoints(arr.map(p => p.position));
      const center = box.getCenter(new THREE.Vector3());
      arr.forEach(p => p.position.sub(center));
    }
    
    return arr;
  }, [sequence]);
  
  // Determine if it forms HCP or CCP
  let formationType = '';
  const seqStr = sequence.join('');
  if (seqStr.length >= 3) {
    if (seqStr.startsWith('ABA') || seqStr.startsWith('BAB')) {
      formationType = 'hcp';
    } else if (seqStr.startsWith('ABC') || seqStr.startsWith('BCA') || seqStr.startsWith('CAB') || seqStr.startsWith('ACB') || seqStr.startsWith('BAC') || seqStr.startsWith('CBA')) {
      formationType = 'ccp';
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
        <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 text-center">
          <BilingualText en="Build Your Crystal" bn="আপনার স্ফটিক তৈরি করুন" />
        </h4>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="flex gap-4">
            <button 
              onClick={() => addLayer('A')}
              disabled={sequence.length >= 6 || sequence[sequence.length-1] === 'A'}
              className="flex flex-col items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 shadow-inner"></div>
              <span className="font-bold text-blue-900 dark:text-blue-100">A</span>
            </button>
            <button 
              onClick={() => addLayer('B')}
              disabled={sequence.length >= 6 || sequence[sequence.length-1] === 'B'}
              className="flex flex-col items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-900/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 shadow-inner"></div>
              <span className="font-bold text-emerald-900 dark:text-emerald-100">B</span>
            </button>
            <button 
              onClick={() => addLayer('C')}
              disabled={sequence.length >= 6 || sequence[sequence.length-1] === 'C'}
              className="flex flex-col items-center gap-2 p-4 bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-200 dark:border-amber-800 rounded-xl hover:bg-amber-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500 shadow-inner"></div>
              <span className="font-bold text-amber-900 dark:text-amber-100">C</span>
            </button>
          </div>
          
          <div className="h-16 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
          
          <div className="flex gap-2">
            <button onClick={undo} disabled={sequence.length <= 1} className="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 hover:bg-slate-50 disabled:opacity-50">
              <Undo className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>
            <button onClick={reset} disabled={sequence.length <= 1} className="p-3 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 hover:bg-red-50 disabled:opacity-50">
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex gap-1">
            {sequence.map((seq, idx) => (
              <div key={idx} className={`w-8 h-8 flex items-center justify-center font-bold text-white rounded-lg shadow-sm
                ${seq === 'A' ? 'bg-blue-500' : seq === 'B' ? 'bg-emerald-500' : 'bg-amber-500'}
              `}>
                {seq}
              </div>
            ))}
          </div>
          
          <div className="h-6 mt-2">
            {formationType === 'hcp' && (
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-bold animate-fade-in-up">
                <BilingualText en="Forming HCP Structure" bn="HCP গঠন তৈরি হচ্ছে" />
              </span>
            )}
            {formationType === 'ccp' && (
              <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-800 rounded-full text-sm font-bold animate-fade-in-up">
                <BilingualText en="Forming CCP (FCC) Structure" bn="CCP (FCC) গঠন তৈরি হচ্ছে" />
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-slate-900 h-[28rem] rounded-xl overflow-hidden relative border-2 border-slate-700 shadow-inner">
          <Canvas camera={{ position: [12, 10, 12], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={0.8} />
            <directionalLight position={[-10, -10, -10]} intensity={0.3} color="#4338ca" />
            
            {particles.map((p) => {
              const color = p.layerType === 0 ? '#3b82f6' : p.layerType === 1 ? '#10b981' : '#f59e0b';
              return (
                <React.Fragment key={p.id}>
                  <Sphere position={p.position} args={[0.95, 32, 32]}>
                    <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
                  </Sphere>
                </React.Fragment>
              );
            })}
            
            <OrbitControls makeDefault />
          </Canvas>
        </div>
      </div>
    </div>
  );
};
