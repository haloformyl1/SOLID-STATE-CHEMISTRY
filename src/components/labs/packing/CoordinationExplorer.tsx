import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';
import * as THREE from 'three';
import { ScientificPanel } from '../../ui/ScientificPanel';

type StructureType = '1d' | '2d-square' | '2d-hex' | '3d-sc' | '3d-bcc' | '3d-hcp' | '3d-ccp';

export const CoordinationExplorer: React.FC = () => {
  const [structure, setStructure] = useState<StructureType>('1d');
  const [showLines, setShowLines] = useState(false);
  const [fadeNonNeighbours, setFadeNonNeighbours] = useState(false);
  const [countStep, setCountStep] = useState(0);

  const particles = useMemo(() => {
    const points: [number, number, number][] = [];
    const r = 1;
    const d = 2 * r;
    
    points.push([0, 0, 0]);

    if (structure === '1d') {
      points.push([-d, 0, 0], [d, 0, 0]);
      points.push([-2*d, 0, 0], [2*d, 0, 0]);
    } else if (structure === '2d-square') {
      for(let x=-2; x<=2; x++) {
        for(let y=-2; y<=2; y++) {
          if (x===0 && y===0) continue;
          points.push([x*d, y*d, 0]);
        }
      }
    } else if (structure === '2d-hex') {
      for(let x=-2; x<=2; x++) {
        for(let y=-2; y<=2; y++) {
          if (x===0 && y===0) continue;
          const xPos = x * d + (y % 2 !== 0 ? r : 0);
          const yPos = y * Math.sqrt(3) * r;
          points.push([xPos, yPos, 0]);
        }
      }
    } else if (structure === '3d-sc') {
      for(let x=-1; x<=1; x++) {
        for(let y=-1; y<=1; y++) {
          for(let z=-1; z<=1; z++) {
            if(x===0 && y===0 && z===0) continue;
            points.push([x*d, y*d, z*d]);
          }
        }
      }
    } else if (structure === '3d-bcc') {
      const offset = d / Math.sqrt(3);
      for (const x of [-offset, offset]) {
        for (const y of [-offset, offset]) {
          for (const z of [-offset, offset]) points.push([x, y, z]);
        }
      }
    } else if (structure === '3d-hcp' || structure === '3d-ccp') {
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        points.push([d * Math.cos(angle), d * Math.sin(angle), 0]);
      }
      const layerRadius = d / Math.sqrt(3);
      const layerHeight = d * Math.sqrt(2 / 3);
      for (let i = 0; i < 3; i++) {
        const aboveAngle = Math.PI / 6 + (i * 2 * Math.PI) / 3;
        const belowAngle = structure === '3d-hcp' ? aboveAngle : aboveAngle + Math.PI / 3;
        points.push([layerRadius * Math.cos(aboveAngle), layerRadius * Math.sin(aboveAngle), layerHeight]);
        points.push([layerRadius * Math.cos(belowAngle), layerRadius * Math.sin(belowAngle), -layerHeight]);
      }
    }
    
    return points.map((pos, idx) => ({
      id: idx,
      position: new THREE.Vector3(...pos),
      isCenter: idx === 0,
      isNeighbour: pos[0]*pos[0] + pos[1]*pos[1] + pos[2]*pos[2] <= (d*d + 0.1) && idx !== 0
    }));
  }, [structure]);

  const neighbours = particles.filter(p => p.isNeighbour);
  const currentCount = Math.min(countStep, neighbours.length);

  return (
    <div className="glass-panel my-0 flex h-full min-h-[520px] w-full flex-col overflow-hidden rounded-xl border border-[var(--border-strong)] md:flex-row">
      
      {/* Viewport */}
      <div className="relative min-h-[360px] flex-1 bg-[var(--canvas-background)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(41,70,91,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(41,70,91,0.2)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        <Canvas camera={{ position: [0, 1.5, 11], fov: 45 }} dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={0.8} />
          
          {particles.map((p) => {
            const isCountedNeighbour = p.isNeighbour && neighbours.indexOf(p) < currentCount;
            const opacity = fadeNonNeighbours && !p.isCenter && !isCountedNeighbour ? 0.1 : 1.0;
            // Colors: Center = Amber, Counted = Success Green, Default = Cobalt Blue
            const color = p.isCenter ? '#D97706' : isCountedNeighbour ? '#15803D' : '#2563EB';
            
            return (
              <React.Fragment key={p.id}>
                <Sphere position={p.position} args={[0.95, 16, 16]}>
                  <meshPhysicalMaterial 
                    color={color} 
                    transparent 
                    opacity={opacity} 
                    roughness={0.2} 
                    metalness={0.2}
                    clearcoat={0.5} 
                  />
                </Sphere>
                {showLines && p.isNeighbour && (
                  <Line points={[[0,0,0], p.position.toArray()]} color="#D97706" lineWidth={2} transparent opacity={opacity} />
                )}
              </React.Fragment>
            );
          })}
          
          <OrbitControls makeDefault />
        </Canvas>

        {/* HUD Counter */}
        <div className="absolute top-4 left-4 glass-panel px-4 py-2 rounded-lg text-[var(--acc-amb)] font-bold text-xl border border-[var(--acc-amb)]/30 shadow-[0_0_15px_rgba(217,119,6,0.2)]">
          CN: {currentCount} / {neighbours.length}
        </div>
      </div>
      
      {/* Scientific Control Panel */}
      <ScientificPanel title={<BilingualText en="Coordination Number Explorer" bn="সমন্বয় সংখ্যা অন্বেষণকারী" />}>
        
        <div className="grid grid-cols-2 gap-2">
          {(['1d', '2d-square', '2d-hex', '3d-sc', '3d-bcc', '3d-hcp', '3d-ccp'] as StructureType[]).map(s => (
            <button 
              key={s}
              onClick={() => { setStructure(s); setCountStep(0); }}
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-all border-2 ${structure === s ? 'border-[var(--acc-prim)] bg-[var(--acc-prim)]/10 text-[var(--text-str)]' : 'border-[var(--border-sub)] hover:border-[var(--acc-sec)] text-[var(--text-norm)]'}`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-[var(--border-sub)]">
          <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-[var(--bg-sec)] rounded-lg transition-colors">
            <input type="checkbox" checked={showLines} onChange={e => setShowLines(e.target.checked)} className="w-5 h-5 accent-[var(--acc-prim)] rounded" />
            <span className="text-sm font-semibold text-[var(--text-str)]"><BilingualText en="Show Contact Lines" bn="যোগাযোগ রেখা দেখান" /></span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-[var(--bg-sec)] rounded-lg transition-colors">
            <input type="checkbox" checked={fadeNonNeighbours} onChange={e => setFadeNonNeighbours(e.target.checked)} className="w-5 h-5 accent-[var(--acc-prim)] rounded" />
            <span className="text-sm font-semibold text-[var(--text-str)]"><BilingualText en="Fade Non-Neighbours" bn="অন্যান্য কণা অস্পষ্ট করুন" /></span>
          </label>
        </div>

        <button 
          onClick={() => setCountStep(s => s < neighbours.length ? s + 1 : 0)} 
          className="mt-4 px-4 py-3 bg-[var(--acc-amb)] hover:bg-amber-600 text-white rounded-lg font-bold w-full transition-colors shadow-sm"
        >
          <BilingualText en="Count Next Neighbour" bn="পরবর্তী প্রতিবেশী গণনা করুন" />
        </button>

      </ScientificPanel>
    </div>
  );
};
