import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';

const getTetrahedralPoints = () => {
  const d = 1;
  return [
    [d, d, d],
    [d, -d, -d],
    [-d, d, -d],
    [-d, -d, d]
  ] as [number, number, number][];
};

const getOctahedralPoints = () => {
  const d = 1.414; // sqrt(2) approx, to make edges similar size
  return [
    [d, 0, 0],
    [-d, 0, 0],
    [0, d, 0],
    [0, -d, 0],
    [0, 0, d],
    [0, 0, -d]
  ] as [number, number, number][];
};

const VoidModel = ({ type, showLines }: { type: 'tetrahedral' | 'octahedral', showLines: boolean }) => {
  const points = type === 'tetrahedral' ? getTetrahedralPoints() : getOctahedralPoints();

  const getEdges = () => {
    if (type === 'tetrahedral') {
      return [
        [points[0], points[1]], [points[0], points[2]], [points[0], points[3]],
        [points[1], points[2]], [points[2], points[3]], [points[3], points[1]]
      ];
    } else {
      return [
        [points[0], points[2]], [points[0], points[3]], [points[0], points[4]], [points[0], points[5]],
        [points[1], points[2]], [points[1], points[3]], [points[1], points[4]], [points[1], points[5]],
        [points[2], points[4]], [points[4], points[3]], [points[3], points[5]], [points[5], points[2]]
      ];
    }
  };

  return (
    <group>
      {/* Particles forming the void */}
      {points.map((pt, i) => (
        <Sphere key={i} args={[0.6, 32, 32]} position={pt}>
          <meshStandardMaterial color="#3b82f6" roughness={0.3} transparent opacity={0.6} />
        </Sphere>
      ))}

      {/* The Void Center */}
      <Sphere args={[0.2, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ef4444" roughness={0.1} />
      </Sphere>

      {/* Connection Lines forming the shape */}
      {showLines && getEdges().map((edge, i) => (
        <Line key={i} points={edge as any} color="#94a3b8" lineWidth={2} />
      ))}
    </group>
  );
};

export const VoidExplorer: React.FC = () => {
  const [type, setType] = useState<'tetrahedral' | 'octahedral'>('tetrahedral');
  const [showLines, setShowLines] = useState(true);

  return (
    <div className="w-full bg-[var(--bg-sec)] rounded-xl p-4 md:p-6 border border-[var(--border-sub)]">
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-2/3 h-[450px] bg-[var(--surf-elev)] rounded-lg relative overflow-hidden border border-[var(--border-sub)]">
          <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <VoidModel type={type} showLines={showLines} />
            <OrbitControls enablePan={false} autoRotate autoRotateSpeed={1.5} />
          </Canvas>
          <div className="absolute top-4 right-4 bg-[var(--bg-sec)]/90 p-2 rounded shadow backdrop-blur">
            <span className="font-bold text-[var(--text-str)]">
              <BilingualText 
                en={type === 'tetrahedral' ? 'Tetrahedral Void' : 'Octahedral Void'} 
                bn={type === 'tetrahedral' ? 'চতুস্তলকীয় শূন্যস্থান' : 'অষ্টতলকীয় শূন্যস্থান'} 
              />
            </span>
          </div>
        </div>

        <div className="w-full xl:w-1/3 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2 text-[var(--text-str)]">
              <BilingualText en="Explore Interstitial Voids" bn="অন্তর্বর্তী শূন্যস্থান অন্বেষণ করুন" />
            </h3>
            <p className="text-[var(--text-mut)] text-sm mb-6">
              <BilingualText 
                en="Voids are the empty spaces left between closely packed spheres. The red sphere represents the void's center." 
                bn="শূন্যস্থান হলো নিবিড়ভাবে সন্নিবেশিত গোলকগুলির মধ্যবর্তী ফাঁকা স্থান। লাল গোলকটি শূন্যস্থানের কেন্দ্র নির্দেশ করে।" 
              />
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setType('tetrahedral')}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  type === 'tetrahedral' ? 'border-primary bg-primary/10' : 'border-[var(--border-sub)] hover:border-primary/50'
                }`}
              >
                <div className="font-bold text-[var(--text-str)] mb-1">
                  <BilingualText en="Tetrahedral Void (TV)" bn="চতুস্তলকীয় শূন্যস্থান (TV)" />
                </div>
                <div className="text-xs text-[var(--text-mut)]">
                  <BilingualText en="Formed by 4 spheres. Coordination number = 4." bn="৪টি গোলক দ্বারা গঠিত। সর্বাঙ্ক সংখ্যা = ৪।" />
                </div>
              </button>

              <button
                onClick={() => setType('octahedral')}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  type === 'octahedral' ? 'border-primary bg-primary/10' : 'border-[var(--border-sub)] hover:border-primary/50'
                }`}
              >
                <div className="font-bold text-[var(--text-str)] mb-1">
                  <BilingualText en="Octahedral Void (OV)" bn="অষ্টতলকীয় শূন্যস্থান (OV)" />
                </div>
                <div className="text-xs text-[var(--text-mut)]">
                  <BilingualText en="Formed by 6 spheres. Coordination number = 6." bn="৬টি গোলক দ্বারা গঠিত। সর্বাঙ্ক সংখ্যা = ৬।" />
                </div>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border-sub)]">
              <label className="flex items-center gap-2 cursor-pointer text-[var(--text-norm)] font-medium">
                <input 
                  type="checkbox" 
                  checked={showLines} 
                  onChange={(e) => setShowLines(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-5 h-5"
                />
                <BilingualText en="Show Geometric Geometry" bn="জ্যামিতিক আকৃতি দেখান" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
