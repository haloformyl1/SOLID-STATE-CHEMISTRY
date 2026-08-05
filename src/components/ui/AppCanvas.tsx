import React, { useState, forwardRef } from 'react';
import { Canvas, type CanvasProps } from '@react-three/fiber';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import * as THREE from 'three';

export const AppCanvas = forwardRef<HTMLCanvasElement, CanvasProps>(({ children, onCreated, ...props }, ref) => {
  const [camera, setCamera] = useState<THREE.Camera | null>(null);
  const [initialPos, setInitialPos] = useState<THREE.Vector3 | null>(null);
  const [initialZoom, setInitialZoom] = useState<number>(1);
  const [controls, setControls] = useState<any>(null);

  const handleCreated = (state: any) => {
    setCamera(state.camera);
    setInitialPos(state.camera.position.clone());
    setInitialZoom(state.camera.zoom);
    if (state.controls) {
      setControls(state.controls);
    }
    if (onCreated) {
      onCreated(state);
    }
  };

  const handleZoom = (factor: number) => {
    if (camera) {
      if (camera instanceof THREE.PerspectiveCamera || camera instanceof THREE.OrthographicCamera) {
        camera.zoom = Math.max(0.1, Math.min(20, camera.zoom * factor));
        camera.updateProjectionMatrix();
      }
    }
  };

  const handleReset = () => {
    if (camera && initialPos) {
      camera.position.copy(initialPos);
      if (camera instanceof THREE.PerspectiveCamera || camera instanceof THREE.OrthographicCamera) {
        camera.zoom = initialZoom;
        camera.updateProjectionMatrix();
      }
      if (controls && controls.target) {
        controls.target.set(0, 0, 0);
        controls.update();
      }
    }
  };

  return (
    <div className="relative w-full h-full flex-1 min-h-0">
      <Canvas ref={ref} onCreated={handleCreated} {...props}>
        {children}
      </Canvas>
      <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 flex flex-col gap-2 z-10">
        <button
          type="button"
          onClick={() => handleZoom(1.2)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Zoom In"
          title="Zoom In"
        >
          <ZoomIn className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => handleZoom(1 / 1.2)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Zoom Out"
          title="Zoom Out"
        >
          <ZoomOut className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Reset View"
          title="Reset View"
        >
          <RotateCcw className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

AppCanvas.displayName = 'AppCanvas';
