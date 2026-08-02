import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';
import { SkipForward, SkipBack } from 'lucide-react';
import * as THREE from 'three';

const TriangleLayer = ({ 
  position, 
  color, 
  rotation = 0 
}: { 
  position: [number, number, number], 
  color: string, 
  rotation?: number 
}) => {
  const d = 1;
  const points = [
    [0, d, 0],
    [d * 0.866, -d * 0.5, 0],
    [-d * 0.866, -d * 0.5, 0]
  ];

  return (
    <group position={position} rotation={[0, 0, rotation]}>
      {points.map((pt, i) => (
        <Sphere key={i} args={[0.5, 16, 16]} position={pt as any}>
          <meshStandardMaterial color={color} roughness={0.3} transparent opacity={0.7} />
        </Sphere>
      ))}
      <Line 
        points={[points[0], points[1], points[2], points[0]] as any} 
        color="#fff" 
        lineWidth={2} 
        transparent 
        opacity={0.5} 
      />
    </group>
  );
};

const AnimatedGroup = ({ step }: { step: number }) => {
  const [pos1, setPos1] = useState([0, 0, 1.5]);
  const [pos2, setPos2] = useState([0, 0, -1.5]);

  useFrame(() => {
    const target1 = step === 2 ? [0, 0, 0.4] : [0, 0, 1.5];
    const target2 = step === 2 ? [0, 0, -0.4] : [0, 0, -1.5];

    setPos1([
      THREE.MathUtils.lerp(pos1[0], target1[0], 0.1),
      THREE.MathUtils.lerp(pos1[1], target1[1], 0.1),
      THREE.MathUtils.lerp(pos1[2], target1[2], 0.1)
    ]);
    
    setPos2([
      THREE.MathUtils.lerp(pos2[0], target2[0], 0.1),
      THREE.MathUtils.lerp(pos2[1], target2[1], 0.1),
      THREE.MathUtils.lerp(pos2[2], target2[2], 0.1)
    ]);
  });

  return (
    <group rotation={[-Math.PI/2, 0, 0]}>
      <TriangleLayer position={pos1 as [number, number, number]} color="#3b82f6" />
      {(step >= 1) && (
        <TriangleLayer position={pos2 as [number, number, number]} color="#10b981" rotation={Math.PI} />
      )}
      
      {step === 2 && (
        <Sphere args={[0.2, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#ef4444" roughness={0.1} />
        </Sphere>
      )}
    </group>
  );
};

export const GuidedVoid: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { desc: { en: 'Layer 1: Three spheres forming a triangle.', bn: 'স্তর ১: তিনটি গোলক মিলে একটি ত্রিভুজ গঠন করে।' } },
    { desc: { en: 'Layer 2: Three more spheres forming an oppositely oriented triangle.', bn: 'স্তর ২: আরও তিনটি গোলক মিলে একটি বিপরীতমুখী ত্রিভুজ গঠন করে।' } },
    { desc: { en: 'Combined: They form an Octahedron with a void in the center.', bn: 'সম্মিলিত: এরা কেন্দ্রে একটি শূন্যস্থান-সহ একটি অষ্টতলক গঠন করে।' } }
  ];

  return (
    <div className="w-full bg-[var(--surf-elev)] rounded-xl p-4 md:p-6 border border-[var(--border-sub)] mt-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 h-[400px] bg-[var(--bg-sec)] rounded-lg relative border border-[var(--border-sub)] overflow-hidden">
          <Canvas dpr={[1, 1.5]} camera={{ position: [5, -4, 4], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <AnimatedGroup step={step} />
            <OrbitControls enablePan={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-center items-center gap-4 bg-[var(--bg-sec)]/90 py-2 px-4 rounded-full shadow-md w-max mx-auto">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-[var(--bg-canvas,transparent)] disabled:opacity-30 text-[var(--text-norm)] transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <span className="font-mono font-bold text-[var(--text-norm)]">
              {step + 1} / 3
            </span>
            <button
              onClick={() => setStep(Math.min(2, step + 1))}
              disabled={step === 2}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-[var(--bg-canvas,transparent)] disabled:opacity-30 text-[var(--text-norm)] transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col justify-center space-y-4">
          <h3 className="text-xl font-bold text-[var(--text-str)]">
            <BilingualText en="Building an Octahedral Void" bn="অষ্টতলকীয় শূন্যস্থান তৈরি" />
          </h3>
          <p className="text-[var(--text-mut)] text-sm">
            <BilingualText 
              en="Step through the animation to see how an octahedral void is formed by two layers of spheres." 
              bn="অ্যানিমেশনের ধাপগুলো অনুসরণ করে দেখুন কীভাবে দুটি স্তরের গোলক দ্বারা একটি অষ্টতলকীয় শূন্যস্থান গঠিত হয়।" 
            />
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30 shadow-inner mt-4">
            <p className="text-blue-900 dark:text-blue-100 font-medium">
              <BilingualText en={steps[step].desc.en} bn={steps[step].desc.bn} />
            </p>
          </div>
          
          {step === 2 && (
            <div className="animate-fade-in-up bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800/30">
              <p className="text-green-800 dark:text-green-200 text-sm">
                <BilingualText 
                  en="The center is enclosed by 6 spheres forming a regular octahedron. The void is the red sphere in the middle." 
                  bn="কেন্দ্রটি ৬টি গোলক দ্বারা বেষ্টিত যা একটি সুষম অষ্টতলক গঠন করে। মাঝখানের লাল গোলকটি হলো শূন্যস্থান।" 
                />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
