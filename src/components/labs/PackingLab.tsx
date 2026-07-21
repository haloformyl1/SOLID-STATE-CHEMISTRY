import React, { useState, useMemo } from 'react';
import { CrystalCanvas } from '../3d/CrystalCanvas';
import { BilingualText } from '../BilingualText';
import { Sphere } from '@react-three/drei';

type PackingType = 'square2d' | 'hexagonal2d' | 'hcp3d' | 'ccp3d';

export const PackingLab: React.FC = () => {
  const [packing, setPacking] = useState<PackingType>('square2d');
  const [showVoids, setShowVoids] = useState(false);

  const particles = useMemo(() => {
    const pts: { pos: [number, number, number], type: 'atom' | 't-void' | 'o-void', id: string }[] = [];
    const r = 0.5;

    if (packing === 'square2d') {
      for (let x = -2; x <= 2; x++) {
        for (let y = -2; y <= 2; y++) {
          pts.push({ pos: [x * 2 * r, y * 2 * r, 0], type: 'atom', id: `sq-${x}-${y}` });
        }
      }
    } else if (packing === 'hexagonal2d') {
      for (let y = -2; y <= 2; y++) {
        for (let x = -2; x <= 2; x++) {
          const offsetX = Math.abs(y % 2) === 1 ? r : 0;
          pts.push({ pos: [x * 2 * r + offsetX, y * Math.sqrt(3) * r, 0], type: 'atom', id: `hex-${x}-${y}` });
        }
      }
      if (showVoids) {
        // Triangular voids
        pts.push({ pos: [r, r / Math.sqrt(3), 0], type: 't-void', id: 'tv-1' });
        pts.push({ pos: [0, r * Math.sqrt(3) - r / Math.sqrt(3), 0], type: 't-void', id: 'tv-2' });
      }
    } else if (packing === 'hcp3d' || packing === 'ccp3d') {
      // Layer A
      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          const offsetX = Math.abs(y % 2) === 1 ? r : 0;
          pts.push({ pos: [x * 2 * r + offsetX, y * Math.sqrt(3) * r, -r * 2 * Math.sqrt(2/3)], type: 'atom', id: `l1-${x}-${y}` });
        }
      }
      // Layer B (sits in triangular voids of A)
      for (let y = -1; y <= 0; y++) {
        for (let x = -1; x <= 0; x++) {
          const offsetX = Math.abs(y % 2) === 1 ? r : 0;
          pts.push({ pos: [x * 2 * r + offsetX + r, y * Math.sqrt(3) * r + r/Math.sqrt(3), 0], type: 'atom', id: `l2-${x}-${y}` });
        }
      }
      // Layer A or C
      const zC = r * 2 * Math.sqrt(2/3);
      if (packing === 'hcp3d') {
        // Layer A again (ABAB)
        for (let y = -1; y <= 1; y++) {
          for (let x = -1; x <= 1; x++) {
            const offsetX = Math.abs(y % 2) === 1 ? r : 0;
            pts.push({ pos: [x * 2 * r + offsetX, y * Math.sqrt(3) * r, zC], type: 'atom', id: `l3-${x}-${y}` });
          }
        }
      } else {
        // Layer C (ABCABC) - sits in octahedral voids of A-B
        for (let y = -1; y <= 0; y++) {
          for (let x = -1; x <= 0; x++) {
            const offsetX = Math.abs(y % 2) === 1 ? r : 0;
            pts.push({ pos: [x * 2 * r + offsetX + r, y * Math.sqrt(3) * r - r/Math.sqrt(3), zC], type: 'atom', id: `l3-${x}-${y}` });
          }
        }
      }

      if (showVoids) {
        pts.push({ pos: [0, 0, 0], type: 'o-void', id: 'ov-1' }); // illustrative position
      }
    }
    return pts;
  }, [packing, showVoids]);

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full mt-12 border-t border-gray-200 dark:border-slate-700 pt-8">
      <div className="w-full md:w-1/3 flex flex-col gap-3">
        <h3 className="font-semibold text-xl text-slate-800 dark:text-slate-200 mb-2">
          <BilingualText en="Packing & Voids Simulator" bn="প্যাকিং এবং শূন্যস্থান সিমুলেটর" />
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button onClick={() => setPacking('square2d')} className={`p-2 rounded-lg border-2 ${packing === 'square2d' ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary' : 'border-gray-200 dark:border-slate-700'}`}>
            <BilingualText en="2D Square" bn="২ডি বর্গাকার" />
          </button>
          <button onClick={() => setPacking('hexagonal2d')} className={`p-2 rounded-lg border-2 ${packing === 'hexagonal2d' ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary' : 'border-gray-200 dark:border-slate-700'}`}>
            <BilingualText en="2D Hexagonal" bn="২ডি ষড়ভুজাকার" />
          </button>
          <button onClick={() => setPacking('hcp3d')} className={`p-2 rounded-lg border-2 ${packing === 'hcp3d' ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary' : 'border-gray-200 dark:border-slate-700'}`}>
            <BilingualText en="3D HCP (ABAB)" bn="৩ডি HCP (ABAB)" />
          </button>
          <button onClick={() => setPacking('ccp3d')} className={`p-2 rounded-lg border-2 ${packing === 'ccp3d' ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary' : 'border-gray-200 dark:border-slate-700'}`}>
            <BilingualText en="3D CCP (ABCABC)" bn="৩ডি CCP (ABCABC)" />
          </button>
        </div>

        <button onClick={() => setShowVoids(!showVoids)} className="mt-4 p-3 bg-gray-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 font-medium">
          <BilingualText en={showVoids ? "Hide Voids" : "Show Void Positions"} bn={showVoids ? "শূন্যস্থান লুকান" : "শূন্যস্থানের অবস্থান দেখান"} />
        </button>

        <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          <BilingualText en="Transparent markers indicate the approximate position of voids." bn="স্বচ্ছ নির্দেশকগুলি শূন্যস্থানের আনুমানিক অবস্থান নির্দেশ করে।" />
        </div>
      </div>

      <div className="w-full md:w-2/3 h-[400px] relative rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700">
        <CrystalCanvas>
          <group rotation={[-Math.PI / 4, 0, 0]}>
            {particles.map((p) => {
              if (p.type === 'atom') {
                return (
                  <Sphere key={p.id} position={p.pos} args={[0.5, 32, 32]}>
                    <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.1} transparent={showVoids} opacity={showVoids ? 0.4 : 1} />
                  </Sphere>
                );
              }
              return (
                <Sphere key={p.id} position={p.pos} args={[0.2, 16, 16]}>
                  <meshStandardMaterial color={p.type === 't-void' ? '#f59e0b' : '#ef4444'} emissive={p.type === 't-void' ? '#f59e0b' : '#ef4444'} emissiveIntensity={0.5} transparent opacity={0.8} />
                </Sphere>
              );
            })}
          </group>
        </CrystalCanvas>
      </div>
    </div>
  );
};
