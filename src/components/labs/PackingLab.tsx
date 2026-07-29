import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CrystalCanvas } from '../3d/CrystalCanvas';
import { BilingualText } from '../BilingualText';
import { Sphere, Box, Tetrahedron, Octahedron, Line, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Play, Pause, SkipForward, SkipBack, CheckCircle2, View } from 'lucide-react';
import { allSequences, type PackingType } from './GuidedAnimationData';

const AnimatedAtom: React.FC<any> = ({ targetPosition, isVisible, isHighlighted, isDimmed }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      if (isVisible) {
        meshRef.current.position.lerp(targetPosition, 0.1);
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), 0.2);
        // Move up when hidden to drop down when shown
        meshRef.current.position.lerp(new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z + 5), 0.2);
      }
    }
  });

  const opacity = isDimmed ? 0.2 : 1;
  const color = isHighlighted ? '#ef4444' : '#3b82f6';

  return (
    <Sphere 
      ref={meshRef} 
      position={[targetPosition.x, targetPosition.y, targetPosition.z + 5]} 
      args={[0.5, 32, 32]} 
      scale={[0,0,0]}
    >
      <meshStandardMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.1} 
        transparent 
        opacity={opacity} 
      />
    </Sphere>
  );
};

const AnimatedVoid: React.FC<any> = ({ targetPosition, type, isVisible, isDimmed }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      if (isVisible) {
        meshRef.current.position.lerp(targetPosition, 0.1);
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), 0.2);
        meshRef.current.position.lerp(new THREE.Vector3(targetPosition.x, targetPosition.y, targetPosition.z + 5), 0.2);
      }
    }
  });

  const posArray = [targetPosition.x, targetPosition.y, targetPosition.z] as [number, number, number];
  const opacity = isDimmed ? 0.1 : 0.8;

  if (type === 'square') {
    return (
      <Box ref={meshRef} position={posArray} args={[0.3, 0.3, 0.3]} scale={[0,0,0]}>
        <meshStandardMaterial color="#ef4444" transparent opacity={opacity} />
      </Box>
    );
  } else if (type === 'o-void') {
    return (
      <Octahedron ref={meshRef} position={posArray} args={[0.25]} scale={[0,0,0]}>
        <meshStandardMaterial color="#ef4444" transparent opacity={opacity} />
      </Octahedron>
    );
  } else if (type === 't-void') {
    return (
      <Tetrahedron ref={meshRef} position={posArray} args={[0.2]} scale={[0,0,0]}>
        <meshStandardMaterial color="#f97316" transparent opacity={opacity} />
      </Tetrahedron>
    );
  }

  return (
    <Sphere ref={meshRef} position={posArray} args={[0.15, 16, 16]} scale={[0,0,0]}>
      <meshStandardMaterial color="#f97316" transparent opacity={opacity} />
    </Sphere>
  );
};

const CameraRig: React.FC<{ position: [number, number, number], active: boolean }> = ({ position, active }) => {
  useFrame((state) => {
    if (active) {
      state.camera.position.lerp(new THREE.Vector3(...position), 0.05);
      state.camera.lookAt(0, 0, 0);
    }
  });
  return null;
};

export const PackingLab: React.FC = () => {
  const [packing, setPacking] = useState<PackingType>('square2d');
  
  // Engine State
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFreeCamera, setIsFreeCamera] = useState(false);
  const [visibleParticleIds, setVisibleParticleIds] = useState<Set<string>>(new Set());
  const [visibleVoidIds, setVisibleVoidIds] = useState<Set<string>>(new Set());
  const [checkpointAnswer, setCheckpointAnswer] = useState('');
  const [checkpointPassed, setCheckpointPassed] = useState(false);

  const sequence = allSequences[packing];
  const currentStep = sequence.steps[currentStepIndex];

  // Pre-generate all coordinates for the current packing type
  const { particles, voids } = useMemo(() => {
    const pts: { pos: THREE.Vector3, id: string }[] = [];
    const vds: { pos: THREE.Vector3, type: string, id: string }[] = [];
    const r = 0.5;

    if (packing === 'square2d') {
      for (let y = -2; y <= 2; y++) {
        for (let x = -2; x <= 2; x++) {
          pts.push({ pos: new THREE.Vector3(x * 2 * r, y * 2 * r, 0), id: `sq-${x}-${y}` });
          if (x < 2 && y < 2) {
            vds.push({ pos: new THREE.Vector3(x * 2 * r + r, y * 2 * r + r, 0), type: 'square', id: `sqv-${x}-${y}` });
          }
        }
      }
    } else if (packing === 'hexagonal2d') {
      for (let y = -2; y <= 2; y++) {
        for (let x = -2; x <= 2; x++) {
          const offsetX = Math.abs(y % 2) === 1 ? r : 0;
          pts.push({ pos: new THREE.Vector3(x * 2 * r + offsetX, y * Math.sqrt(3) * r, 0), id: `hex-${x}-${y}` });
          
          if (y < 2) {
            if (x < 2) {
              const nx = x * 2 * r + offsetX + r;
              const ny = y * Math.sqrt(3) * r + r / Math.sqrt(3);
              vds.push({ pos: new THREE.Vector3(nx, ny, 0), type: 't-void', id: `tv-up-${x}-${y}` });
            }
            if (x > -2 || Math.abs(y % 2) === 1) {
               const nx = x * 2 * r + offsetX + (Math.abs(y % 2) === 1 ? -r : r);
               const ny = y * Math.sqrt(3) * r + r * Math.sqrt(3) - r / Math.sqrt(3);
               vds.push({ pos: new THREE.Vector3(nx, ny, 0), type: 't-void', id: `tv-down-${x}-${y}` });
            }
          }
        }
      }
    } else if (packing === 'hcp3d' || packing === 'ccp3d') {
      const zOffsetDist = 2 * r * Math.sqrt(2/3);
      const layers = 3;
      
      for (let z = 0; z < layers; z++) {
        const layerType = packing === 'hcp3d' ? z % 2 : z % 3;
        let offsetX = 0;
        let offsetY = 0;
        
        if (layerType === 1) { 
          offsetX = r;
          offsetY = Math.sqrt(3) * r / 3;
        } else if (layerType === 2) { 
          offsetX = r;
          offsetY = -(Math.sqrt(3) * r / 3);
        }

        for (let y = -2; y <= 2; y++) {
          for (let x = -2; x <= 2; x++) {
            const px = x * 2 * r + (Math.abs(y % 2) === 1 ? r : 0) + offsetX;
            const py = y * Math.sqrt(3) * r + offsetY;
            const pz = (z - 1) * zOffsetDist;
            if (Math.sqrt(px*px + py*py + pz*pz) < 2.5) {
              pts.push({ pos: new THREE.Vector3(px, py, pz), id: `atom-${x}-${y}-${z}` });
            }
          }
        }
      }

      for (let z = 0; z < layers - 1; z++) {
        let layerType1 = packing === 'hcp3d' ? z % 2 : z % 3;
        let layerType2 = packing === 'hcp3d' ? (z+1) % 2 : (z+1) % 3;
        const midZ = (z - 1) * zOffsetDist + zOffsetDist / 2;
        
        let missingType = 3 - (layerType1 + layerType2); 
        if (layerType1 === layerType2) missingType = layerType1 === 0 ? 1 : 0; 
        
        let octXShift = 0;
        let octYShift = 0;
        if (missingType === 1) {
          octXShift = r;
          octYShift = Math.sqrt(3) * r / 3;
        } else if (missingType === 2) {
          octXShift = r;
          octYShift = -(Math.sqrt(3) * r / 3);
        }

        for (let y = -2; y <= 2; y++) {
          for (let x = -2; x <= 2; x++) {
            const ox = x * 2 * r + (Math.abs(y % 2) === 1 ? r : 0) + octXShift;
            const oy = y * Math.sqrt(3) * r + octYShift;
            if (Math.sqrt(ox*ox + oy*oy + midZ*midZ) < 2.2) {
              vds.push({ pos: new THREE.Vector3(ox, oy, midZ), type: 'o-void', id: `ov-${x}-${y}-${z}` });
            }
            
            let t1x = x * 2 * r + (Math.abs(y % 2) === 1 ? r : 0) + (layerType1 === 1 ? r : layerType1 === 2 ? r : 0);
            let t1y = y * Math.sqrt(3) * r + (layerType1 === 1 ? Math.sqrt(3)*r/3 : layerType1 === 2 ? -Math.sqrt(3)*r/3 : 0);
            if (Math.sqrt(t1x*t1x + t1y*t1y + midZ*midZ) < 2.2) {
              vds.push({ pos: new THREE.Vector3(t1x, t1y, midZ), type: 't-void', id: `tv1-${x}-${y}-${z}` });
            }

            let t2x = x * 2 * r + (Math.abs(y % 2) === 1 ? r : 0) + (layerType2 === 1 ? r : layerType2 === 2 ? r : 0);
            let t2y = y * Math.sqrt(3) * r + (layerType2 === 1 ? Math.sqrt(3)*r/3 : layerType2 === 2 ? -Math.sqrt(3)*r/3 : 0);
            if (Math.sqrt(t2x*t2x + t2y*t2y + midZ*midZ) < 2.2) {
              vds.push({ pos: new THREE.Vector3(t2x, t2y, midZ), type: 't-void', id: `tv2-${x}-${y}-${z}` });
            }
          }
        }
      }
    }
    return { particles: pts, voids: vds };
  }, [packing]);

  // Reset engine when switching mode
  const handleModeChange = (type: PackingType) => {
    setPacking(type);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setIsFreeCamera(false);
    setVisibleParticleIds(new Set());
    setVisibleVoidIds(new Set());
    setCheckpointAnswer('');
    setCheckpointPassed(false);
  };

  // Re-calculate visibility from step 0 to current step
  useEffect(() => {
    const newParticles = new Set<string>();
    const newVoids = new Set<string>();
    
    for (let i = 0; i <= currentStepIndex; i++) {
      const step = sequence.steps[i];
      step.actions.forEach(action => {
        if (['ADD_PARTICLE', 'ADD_ROW', 'ADD_LAYER'].includes(action.type)) {
          action.targetIds.forEach(id => newParticles.add(id));
        } else if (action.type === 'SHOW_VOID') {
          action.targetIds.forEach(id => newVoids.add(id));
        }
      });
    }
    
    setVisibleParticleIds(newParticles);
    setVisibleVoidIds(newVoids);
    
    if (currentStep.checkpoint) {
      setCheckpointPassed(false);
      setIsPlaying(false); // Auto pause for checkpoint
    } else {
      setCheckpointPassed(true);
    }
  }, [currentStepIndex, sequence]);

  // Playback Loop
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isPlaying && checkpointPassed) {
      timeout = setTimeout(() => {
        if (currentStepIndex < sequence.steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, currentStep.durationMs + currentStep.pauseAfterMs);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, currentStepIndex, sequence, checkpointPassed]);

  const handleCheckpointSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkpointAnswer.trim() === currentStep.checkpoint?.expectedAnswer) {
      setCheckpointPassed(true);
      setIsPlaying(true);
    } else {
      alert(currentStep.checkpoint?.hintEn); // Basic feedback, could be translated
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full mt-12 border-t border-gray-200 dark:border-slate-700 pt-8">
      
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-100 dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700">
        <h3 className="font-semibold text-xl text-slate-800 dark:text-slate-200">
          <BilingualText en="Guided Animations: Packing & Voids" bn="নির্দেশিত অ্যানিমেশন: প্যাকিং এবং শূন্যস্থান" />
        </h3>
        
        <div className="flex flex-wrap gap-2">
          <button onClick={() => handleModeChange('square2d')} className={`px-4 py-2 rounded-lg border-2 text-sm font-bold transition-all ${packing === 'square2d' ? 'border-primary bg-blue-500 text-white shadow' : 'border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
            <BilingualText en="2D Square" bn="২ডি বর্গাকার" />
          </button>
          <button onClick={() => handleModeChange('hexagonal2d')} className={`px-4 py-2 rounded-lg border-2 text-sm font-bold transition-all ${packing === 'hexagonal2d' ? 'border-primary bg-blue-500 text-white shadow' : 'border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
            <BilingualText en="2D Hexagonal" bn="২ডি ষড়ভুজাকার" />
          </button>
          <button onClick={() => handleModeChange('hcp3d')} className={`px-4 py-2 rounded-lg border-2 text-sm font-bold transition-all ${packing === 'hcp3d' ? 'border-primary bg-blue-500 text-white shadow' : 'border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
            <BilingualText en="3D HCP" bn="৩ডি HCP" />
          </button>
          <button onClick={() => handleModeChange('ccp3d')} className={`px-4 py-2 rounded-lg border-2 text-sm font-bold transition-all ${packing === 'ccp3d' ? 'border-primary bg-blue-500 text-white shadow' : 'border-gray-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
            <BilingualText en="3D CCP" bn="৩ডি CCP" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left Column: Player Controls & Narration */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-lg text-primary mb-1">
              Step {currentStepIndex + 1} of {sequence.steps.length}
            </h4>
            <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-4">
              <BilingualText en={currentStep.titleEn} bn={currentStep.titleBn} />
            </h5>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-100 dark:border-slate-700 min-h-[120px] flex items-center justify-center text-center">
              <p className="text-slate-700 dark:text-slate-300">
                <BilingualText en={currentStep.narrationEn} bn={currentStep.narrationBn} />
              </p>
            </div>

            {currentStep.checkpoint && !checkpointPassed && (
              <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <p className="font-bold text-orange-800 dark:text-orange-300 mb-2">
                  <BilingualText en={currentStep.checkpoint.promptEn} bn={currentStep.checkpoint.promptBn} />
                </p>
                <form onSubmit={handleCheckpointSubmit} className="flex gap-2">
                  <input 
                    type="text" 
                    value={checkpointAnswer} 
                    onChange={e => setCheckpointAnswer(e.target.value)} 
                    className="flex-1 px-3 py-2 border border-orange-300 dark:border-orange-700 rounded-md bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter answer..."
                  />
                  <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-bold transition-colors">
                    Check
                  </button>
                </form>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-gray-100 dark:border-slate-800 pt-4">
              <button 
                onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
                disabled={currentStepIndex === 0}
                className="p-2 text-slate-500 hover:text-primary disabled:opacity-30 transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={!!currentStep.checkpoint && !checkpointPassed}
                className="p-4 bg-primary text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              
              <button 
                onClick={() => {
                  if (currentStep.checkpoint && !checkpointPassed) {
                     setCheckpointAnswer(String(currentStep.checkpoint.expectedAnswer));
                     setCheckpointPassed(true);
                  } else {
                     setCurrentStepIndex(Math.min(sequence.steps.length - 1, currentStepIndex + 1));
                  }
                }}
                disabled={currentStepIndex === sequence.steps.length - 1}
                className="p-2 text-slate-500 hover:text-primary disabled:opacity-30 transition-colors flex items-center gap-1"
              >
                {currentStep.checkpoint && !checkpointPassed ? <CheckCircle2 className="w-6 h-6 text-orange-500" /> : <SkipForward className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Visualization */}
        <div className="w-full md:w-2/3 h-[500px] relative rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700 bg-slate-900">
          
          {/* Free Camera Toggle */}
          <div className="absolute top-4 right-4 z-10">
            <button 
              onClick={() => setIsFreeCamera(!isFreeCamera)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
                isFreeCamera 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20 backdrop-blur-md'
              }`}
            >
              <View className="w-4 h-4" />
              <BilingualText en={isFreeCamera ? 'Free Camera: ON' : 'Free Camera: OFF'} bn={isFreeCamera ? 'ফ্রি ক্যামেরা: চালু' : 'ফ্রি ক্যামেরা: বন্ধ'} />
            </button>
          </div>

          <CrystalCanvas>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={0.8} />
            <directionalLight position={[-10, -10, -10]} intensity={0.3} color="#4338ca" />
            
            {isFreeCamera && <OrbitControls makeDefault />}
            <CameraRig active={!isFreeCamera} position={currentStep.camera?.position as [number, number, number] || [8, 8, 8]} />
            
            <group rotation={[-Math.PI / 4, 0, 0]}>
              {particles.map((p) => {
                const isVisible = visibleParticleIds.has(p.id);
                const isHighlighted = currentStep.highlightParticleIds?.includes(p.id) ?? false;
                const isDimmed = currentStep.dimOtherParticles && !isHighlighted;
                
                return (
                  <AnimatedAtom 
                    key={p.id} 
                    targetPosition={p.pos} 
                    isVisible={isVisible} 
                    isHighlighted={isHighlighted} 
                    isDimmed={isDimmed} 
                  />
                );
              })}
              
              {voids.map((v) => {
                const isVisible = visibleVoidIds.has(v.id);
                const isHighlighted = currentStep.highlightParticleIds?.includes(v.id) ?? false;
                const isDimmed = currentStep.dimOtherParticles && !isHighlighted;

                return (
                  <AnimatedVoid 
                    key={v.id} 
                    targetPosition={v.pos} 
                    type={v.type} 
                    isVisible={isVisible}
                    isDimmed={isDimmed}
                  />
                );
              })}

              {currentStep.showContactLines?.map((line, idx) => {
                const p1 = particles.find(p => p.id === line.from)?.pos;
                const p2 = particles.find(p => p.id === line.to)?.pos;
                if (p1 && p2) {
                   return <Line key={idx} points={[p1.toArray(), p2.toArray()]} color="white" lineWidth={3} />;
                }
                return null;
              })}
            </group>
          </CrystalCanvas>
        </div>
      </div>
    </div>
  );
};
