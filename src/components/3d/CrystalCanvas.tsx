import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Grid } from '@react-three/drei';

interface CrystalCanvasProps {
  children: React.ReactNode;
}

export const CrystalCanvas: React.FC<CrystalCanvasProps> = ({ children }) => {
  return (
    <div className="w-full h-full min-h-[400px] bg-slate-900 rounded-xl overflow-hidden relative shadow-inner">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          autoRotateSpeed={2}
          makeDefault
        />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <group position={[0, -1, 0]}>
            <Grid infiniteGrid fadeDistance={20} sectionColor="#475569" cellColor="#334155" />
            {children}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};
