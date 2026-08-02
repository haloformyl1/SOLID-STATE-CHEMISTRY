import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CrystalCanvas } from '../3d/CrystalCanvas';
import { BilingualText } from '../BilingualText';
import { Sphere, Box, Tetrahedron, Octahedron, Line, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Play, Pause, SkipForward, SkipBack, CheckCircle2, View, Layers3 } from 'lucide-react';
import { allSequences, type PackingType } from './GuidedAnimationData';

const packingModes: { id: PackingType; en: string; bn: string }[] = [
  { id: 'square2d', en: '2D Square', bn: '২ডি বর্গাকার' },
  { id: 'hexagonal2d', en: '2D Hexagonal', bn: '২ডি ষড়ভুজাকার' },
  { id: 'hcp3d', en: '3D HCP', bn: '৩ডি HCP' },
  { id: 'ccp3d', en: '3D CCP', bn: '৩ডি CCP' },
];

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
      args={[0.5, 16, 16]} 
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
  }, [currentStep.checkpoint, currentStepIndex, sequence]);

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
    <section className="flex min-h-full flex-1 flex-col bg-[var(--surface-primary)] p-4 sm:p-6 lg:p-7" aria-labelledby="packing-laboratory-title">
      <header className="mb-5 flex flex-col gap-5 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 shadow-[var(--shadow-low)] xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--border-interactive)] bg-[var(--selected-state)] text-[var(--accent-primary)]" aria-hidden="true">
            <Layers3 className="h-5 w-5" />
          </span>
          <div>
            <p className="eyebrow mb-1"><BilingualText en="Guided animation" bn="নির্দেশিত অ্যানিমেশন" /></p>
            <h3 id="packing-laboratory-title" className="text-xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-2xl">
              <BilingualText en="Packing & Voids" bn="প্যাকিং এবং শূন্যস্থান" />
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" role="group" aria-label="Packing model">
          {packingModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => handleModeChange(mode.id)}
              aria-pressed={packing === mode.id}
              className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-bold transition-[color,background-color,border-color,box-shadow] sm:px-4 ${packing === mode.id
                ? 'border-[var(--border-interactive)] bg-[var(--accent-primary)] text-[var(--button-primary-text)] shadow-[var(--shadow-low)]'
                : 'border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:bg-[var(--hover-state)] hover:text-[var(--text-primary)]'
              }`}
            >
              <BilingualText en={mode.en} bn={mode.bn} />
            </button>
          ))}
        </div>
      </header>

      <div className="grid flex-1 gap-5 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.45fr)]">
        <aside className="flex flex-col rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 shadow-[var(--shadow-low)] sm:p-6" aria-live="polite">
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-sm font-extrabold text-[var(--accent-primary)]">
                <BilingualText key={`progress-${packing}-${currentStepIndex}`} en={`Step ${currentStepIndex + 1} of ${sequence.steps.length}`} bn={`ধাপ ${currentStepIndex + 1} / ${sequence.steps.length}`} isInline />
              </span>
              <span className="text-xs font-bold text-[var(--text-muted)]">{Math.round(((currentStepIndex + 1) / sequence.steps.length) * 100)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--disabled-state)]" role="progressbar" aria-label="Animation progress" aria-valuemin={1} aria-valuemax={sequence.steps.length} aria-valuenow={currentStepIndex + 1}>
              <div className="h-full rounded-full bg-[var(--accent-primary)] transition-[width]" style={{ width: `${((currentStepIndex + 1) / sequence.steps.length) * 100}%` }} />
            </div>
          </div>

          <h4 className="mb-4 text-lg font-extrabold text-[var(--text-primary)]">
            <BilingualText key={`${packing}-${currentStepIndex}-title`} en={currentStep.titleEn} bn={currentStep.titleBn} />
          </h4>

          <div className="flex min-h-[132px] items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--narration-background)] p-5 text-center shadow-[var(--shadow-low)]">
            <p className="font-medium leading-relaxed text-[var(--text-secondary)]">
              <BilingualText key={`${packing}-${currentStepIndex}-narration`} en={currentStep.narrationEn} bn={currentStep.narrationBn} />
            </p>
          </div>

          {currentStep.checkpoint && !checkpointPassed && (
              <div className="mt-4 rounded-xl border border-[color-mix(in_srgb,var(--warning)_50%,var(--border-default))] bg-[color-mix(in_srgb,var(--warning)_11%,var(--surface-primary))] p-4">
                <p className="mb-3 font-bold text-[var(--warning)]">
                  <BilingualText key={`${packing}-${currentStepIndex}-checkpoint`} en={currentStep.checkpoint.promptEn} bn={currentStep.checkpoint.promptBn} />
                </p>
                <form onSubmit={handleCheckpointSubmit} className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={checkpointAnswer}
                    onChange={e => setCheckpointAnswer(e.target.value)}
                    className="min-w-0 flex-1 border-[color-mix(in_srgb,var(--warning)_55%,var(--border-default))] bg-[var(--surface-interactive)] px-3 py-2 text-[var(--text-primary)]"
                    placeholder="Enter answer..."
                    aria-label="Checkpoint answer"
                  />
                  <button type="submit" className="rounded-lg bg-[var(--warning)] px-4 py-2 font-bold text-[var(--text-inverse)] transition-opacity hover:opacity-90">
                    Check
                  </button>
                </form>
              </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-[var(--border-default)] pt-5 sm:mt-6">
              <button 
                type="button"
                onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
                disabled={currentStepIndex === 0}
                className="icon-button h-11 w-11 text-[var(--text-secondary)] disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Previous animation step"
              >
                <SkipBack className="h-5 w-5" />
              </button>

              <button 
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={!!currentStep.checkpoint && !checkpointPassed}
                className="grid h-14 w-14 place-items-center rounded-full bg-[var(--accent-primary)] text-[var(--button-primary-text)] shadow-[var(--shadow-interactive)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-[var(--disabled-state)] disabled:text-[var(--text-muted)] disabled:shadow-none"
                aria-label={isPlaying ? 'Pause guided animation' : 'Play guided animation'}
              >
                {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="ml-0.5 h-7 w-7" />}
              </button>

              <button 
                type="button"
                onClick={() => {
                  if (currentStep.checkpoint && !checkpointPassed) {
                     setCheckpointAnswer(String(currentStep.checkpoint.expectedAnswer));
                     setCheckpointPassed(true);
                  } else {
                     setCurrentStepIndex(Math.min(sequence.steps.length - 1, currentStepIndex + 1));
                  }
                }}
                disabled={currentStepIndex === sequence.steps.length - 1}
                className="icon-button h-11 w-11 text-[var(--text-secondary)] disabled:cursor-not-allowed disabled:opacity-35"
                aria-label={currentStep.checkpoint && !checkpointPassed ? 'Reveal checkpoint answer' : 'Next animation step'}
              >
                {currentStep.checkpoint && !checkpointPassed ? <CheckCircle2 className="h-5 w-5 text-[var(--warning)]" /> : <SkipForward className="h-5 w-5" />}
              </button>
          </div>
        </aside>

        <div className="flex min-h-[500px] flex-col overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--canvas-background)] shadow-[var(--shadow-interactive)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--border-strong)_65%,transparent)] bg-[var(--canvas-surface)] px-4 py-3 text-sky-50">
            <div className="flex items-center gap-2 text-sm font-extrabold">
              <Layers3 className="h-4 w-4 text-sky-300" aria-hidden="true" />
              <BilingualText en="Packing model" bn="প্যাকিং মডেল" />
            </div>
            <button 
              type="button"
              onClick={() => setIsFreeCamera(!isFreeCamera)}
              aria-pressed={isFreeCamera}
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors sm:text-sm ${
                isFreeCamera 
                  ? 'border-sky-300 bg-sky-400 text-slate-950 shadow-md'
                  : 'border-sky-100/20 bg-white/10 text-sky-100/75 hover:border-sky-300/60 hover:bg-white/15 hover:text-white'
              }`}
            >
              <View className="h-4 w-4" aria-hidden="true" />
              <BilingualText key={`camera-${isFreeCamera}`} en={isFreeCamera ? 'Free Camera: ON' : 'Free Camera: OFF'} bn={isFreeCamera ? 'ফ্রি ক্যামেরা: চালু' : 'ফ্রি ক্যামেরা: বন্ধ'} />
            </button>
          </div>

          <div className="min-h-[440px] flex-1">
            <CrystalCanvas ariaLabel={`${packingModes.find((mode) => mode.id === packing)?.en} packing animation, step ${currentStepIndex + 1} of ${sequence.steps.length}`}>
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
    </section>
  );
};
