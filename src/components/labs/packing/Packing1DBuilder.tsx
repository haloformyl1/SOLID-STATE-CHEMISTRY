import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';
import * as THREE from 'three';
import { Plus, Minus, Info } from 'lucide-react';

const AnimatedSphere: React.FC<any> = ({ targetPosition, color, onClick, onPointerOver, onPointerOut }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15);
      meshRef.current.position.lerp(targetPosition, 0.15);
    }
  });

  return (
    <Sphere 
      ref={meshRef}
      position={[targetPosition.x, targetPosition.y, targetPosition.z - 5]}
      args={[0.95, 32, 32]}
      scale={[0, 0, 0]}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
    </Sphere>
  );
};

export const Packing1DBuilder: React.FC = () => {
  const [count, setCount] = useState(3);
  const [selected, setSelected] = useState<number | null>(null);
  
  const particles = Array.from({ length: count }).map((_, i) => {
    return {
      id: i,
      position: new THREE.Vector3((i - (count-1)/2) * 2, 0, 0),
      isEnd: i === 0 || i === count - 1
    };
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center justify-center bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700">
        <button 
          onClick={() => { setCount(Math.max(1, count - 1)); setSelected(null); }}
          className="p-2 bg-white dark:bg-slate-700 rounded-full shadow hover:bg-gray-50 transition-colors"
          disabled={count <= 1}
        >
          <Minus className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </button>
        <span className="font-bold text-lg text-slate-800 dark:text-slate-200 w-24 text-center">
          <BilingualText en={`${count} spheres`} bn={`${count}টি গোলক`} />
        </span>
        <button 
          onClick={() => setCount(Math.min(10, count + 1))}
          className="p-2 bg-white dark:bg-slate-700 rounded-full shadow hover:bg-gray-50 transition-colors"
        >
          <Plus className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        </button>
      </div>

      {selected !== null && (
        <div className={`p-4 rounded-lg flex gap-3 items-start ${particles[selected].isEnd ? 'bg-amber-50 dark:bg-amber-900/30 border border-amber-200' : 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200'}`}>
          <Info className={`w-5 h-5 flex-shrink-0 mt-0.5 ${particles[selected].isEnd ? 'text-amber-600' : 'text-emerald-600'}`} />
          <div>
            <h4 className={`font-bold ${particles[selected].isEnd ? 'text-amber-800 dark:text-amber-300' : 'text-emerald-800 dark:text-emerald-300'}`}>
              <BilingualText 
                en={particles[selected].isEnd ? "End Particle Selected" : "Internal Particle Selected"} 
                bn={particles[selected].isEnd ? "প্রান্তীয় কণা নির্বাচিত" : "অভ্যন্তরীণ কণা নির্বাচিত"} 
              />
            </h4>
            <p className={`text-sm mt-1 ${particles[selected].isEnd ? 'text-amber-700 dark:text-amber-200' : 'text-emerald-700 dark:text-emerald-200'}`}>
              <BilingualText 
                en={`This particle has ${particles[selected].isEnd ? '1' : '2'} nearest neighbour${particles[selected].isEnd ? '' : 's'}. Coordination Number = ${particles[selected].isEnd ? '1' : '2'}.`} 
                bn={`এই কণাটির ${particles[selected].isEnd ? '১টি' : '২টি'} নিকটতম প্রতিবেশী রয়েছে। সমন্বয় সংখ্যা = ${particles[selected].isEnd ? '১' : '২'}।`} 
              />
            </p>
          </div>
        </div>
      )}

      <div className="h-64 bg-slate-900 rounded-xl overflow-hidden relative border-2 border-slate-700 shadow-inner">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={0.8} />
          
          {particles.map((p, i) => {
            const isSelected = selected === i;
            const isNeighbour = selected !== null && Math.abs(selected - i) === 1;
            
            let color = '#3b82f6';
            if (isSelected) color = '#ef4444';
            else if (isNeighbour) color = '#22c55e';
            
            return (
              <React.Fragment key={p.id}>
                <AnimatedSphere 
                  targetPosition={p.position} 
                  color={color}
                  onClick={(e: any) => { e.stopPropagation(); setSelected(i); }}
                  onPointerOver={() => document.body.style.cursor = 'pointer'}
                  onPointerOut={() => document.body.style.cursor = 'auto'}
                />
                {isSelected && isNeighbour && (
                  <Line points={[particles[selected].position.toArray(), p.position.toArray()]} color="white" lineWidth={3} />
                )}
              </React.Fragment>
            );
          })}
          
          <OrbitControls enableRotate={false} makeDefault />
        </Canvas>
        
        <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full border border-slate-600">
          <BilingualText en="Click on a sphere to measure" bn="পরিমাপ করতে একটি গোলকে ক্লিক করুন" />
        </div>
      </div>
    </div>
  );
};
