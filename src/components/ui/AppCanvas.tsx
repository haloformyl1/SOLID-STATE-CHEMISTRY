import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Canvas, type CanvasProps } from '@react-three/fiber';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import * as THREE from 'three';

interface AppCanvasProps extends CanvasProps {
  showCameraControls?: boolean;
}

export const AppCanvas = forwardRef<HTMLCanvasElement, AppCanvasProps>(({ children, onCreated, showCameraControls = true, frameloop = 'always', ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [camera, setCamera] = useState<THREE.Camera | null>(null);
  const [initialPos, setInitialPos] = useState<THREE.Vector3 | null>(null);
  const [initialZoom, setInitialZoom] = useState<number>(1);
  const [controls, setControls] = useState<any>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true);
      setHasBeenVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsNearViewport(entry.isIntersecting);
      if (entry.isIntersecting) setHasBeenVisible(true);
    }, { rootMargin: '120px 0px' });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

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
    <div ref={containerRef} className="relative w-full h-full flex-1 min-h-0">
      {hasBeenVisible && (
        <Canvas
          ref={ref}
          onCreated={handleCreated}
          frameloop={isNearViewport && isDocumentVisible ? frameloop : 'never'}
          {...props}
        >
          {children}
        </Canvas>
      )}
      {showCameraControls && <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 flex flex-col gap-2 z-10">
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
      </div>}
    </div>
  );
});

AppCanvas.displayName = 'AppCanvas';
