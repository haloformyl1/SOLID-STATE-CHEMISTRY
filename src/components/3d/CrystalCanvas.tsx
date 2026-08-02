import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { ErrorState } from '../ui/States';

interface CrystalCanvasProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  resetKey?: number;
  ariaLabel?: string;
}

export const CrystalCanvas: React.FC<CrystalCanvasProps> = ({
  children,
  cameraPosition = [5.5, 4.8, 5.5],
  cameraTarget = [0, 0, 0],
  resetKey = 0,
  ariaLabel = 'Interactive three-dimensional crystal model',
}) => {
  const webGLAvailable = useMemo(() => {
    if (typeof document === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      return false;
    }
  }, []);

  if (!webGLAvailable) {
    return <ErrorState title="WebGL is unavailable" message="Use a browser with hardware-accelerated WebGL to view this interactive model. The surrounding explanation remains available." />;
  }

  return (
    <div className="relative h-full min-h-[380px] w-full overflow-hidden bg-[var(--canvas-background)]" role="img" aria-label={ariaLabel}>
      <Canvas dpr={[1, 1.75]} shadows gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <color attach="background" args={['#06131d']} />
        <PerspectiveCamera key={`camera-${resetKey}`} makeDefault position={cameraPosition} fov={46} near={0.1} far={100} />
        <OrbitControls
          key={`controls-${resetKey}`}
          enableDamping
          dampingFactor={0.08}
          enablePan
          enableRotate
          enableZoom
          target={cameraTarget}
          maxDistance={13}
          minDistance={3.2}
          makeDefault
        />

        <ambientLight intensity={0.65} />
        <directionalLight position={[9, 10, 7]} intensity={1.55} castShadow />
        <directionalLight position={[-8, -5, -6]} intensity={0.45} color="#7dd3fc" />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <group position={[0, -0.9, 0]}>
            <Grid infiniteGrid fadeDistance={18} fadeStrength={2.5} sectionColor="#2d718f" cellColor="#173d4f" sectionSize={2} />
            {children}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};
