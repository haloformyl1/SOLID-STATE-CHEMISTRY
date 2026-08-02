import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, Text } from '@react-three/drei';
import { BilingualText } from '../../BilingualText';

type CrystalSystem = 'Cubic' | 'Tetragonal' | 'Orthorhombic' | 'Monoclinic' | 'Triclinic' | 'Hexagonal' | 'Rhombohedral';

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const drawUnitCell = (a: number, b: number, c: number, alpha: number, beta: number, gamma: number) => {
  const ar = degToRad(alpha);
  const br = degToRad(beta);
  const gr = degToRad(gamma);

  const va = [a, 0, 0];
  const vb = [b * Math.cos(gr), b * Math.sin(gr), 0];
  
  const cx = c * Math.cos(br);
  const cy = c * (Math.cos(ar) - Math.cos(br) * Math.cos(gr)) / Math.sin(gr);
  const cz = Math.sqrt(c * c - cx * cx - cy * cy);
  const vc = [cx, cy, cz];

  const points = [
    [0, 0, 0], va, vb, vc,
    [va[0]+vb[0], va[1]+vb[1], va[2]+vb[2]], // a+b
    [va[0]+vc[0], va[1]+vc[1], va[2]+vc[2]], // a+c
    [vb[0]+vc[0], vb[1]+vc[1], vb[2]+vc[2]], // b+c
    [va[0]+vb[0]+vc[0], va[1]+vb[1]+vc[1], va[2]+vb[2]+vc[2]] // a+b+c
  ];

  const edges = [
    [points[0], points[1]], // a
    [points[0], points[2]], // b
    [points[0], points[3]], // c
    
    [points[1], points[4]],
    [points[2], points[4]],
    
    [points[1], points[5]],
    [points[3], points[5]],
    
    [points[2], points[6]],
    [points[3], points[6]],
    
    [points[4], points[7]],
    [points[5], points[7]],
    [points[6], points[7]]
  ];

  return { points, edges, va, vb, vc };
};

export const CrystalSystemExplorer: React.FC = () => {
  const [system, setSystem] = useState<CrystalSystem>('Cubic');
  const [a, setA] = useState(2);
  const [b, setB] = useState(2);
  const [c, setC] = useState(2);
  const [alpha, setAlpha] = useState(90);
  const [beta, setBeta] = useState(90);
  const [gamma, setGamma] = useState(90);
  const [showLabels, setShowLabels] = useState(true);

  const handleSystemChange = (sys: CrystalSystem) => {
    setSystem(sys);
    if (sys === 'Cubic') {
      setA(2); setB(2); setC(2);
      setAlpha(90); setBeta(90); setGamma(90);
    } else if (sys === 'Tetragonal') {
      setA(2); setB(2); setC(3);
      setAlpha(90); setBeta(90); setGamma(90);
    } else if (sys === 'Orthorhombic') {
      setA(2); setB(2.5); setC(3);
      setAlpha(90); setBeta(90); setGamma(90);
    } else if (sys === 'Monoclinic') {
      setA(2); setB(2.5); setC(3);
      setAlpha(90); setBeta(110); setGamma(90);
    } else if (sys === 'Triclinic') {
      setA(2); setB(2.5); setC(3);
      setAlpha(80); setBeta(110); setGamma(100);
    } else if (sys === 'Hexagonal') {
      setA(2); setB(2); setC(3);
      setAlpha(90); setBeta(90); setGamma(120);
    } else if (sys === 'Rhombohedral') {
      setA(2); setB(2); setC(2);
      setAlpha(75); setBeta(75); setGamma(75);
    }
  };

  const handleSliderChange = (param: string, val: number) => {
    if (system === 'Cubic') {
      if (param === 'a' || param === 'b' || param === 'c') { setA(val); setB(val); setC(val); }
    } else if (system === 'Tetragonal') {
      if (param === 'a' || param === 'b') { setA(val); setB(val); }
      if (param === 'c') setC(val);
    } else if (system === 'Orthorhombic') {
      if (param === 'a') setA(val);
      if (param === 'b') setB(val);
      if (param === 'c') setC(val);
    } else if (system === 'Monoclinic') {
      if (param === 'a') setA(val);
      if (param === 'b') setB(val);
      if (param === 'c') setC(val);
      if (param === 'beta') setBeta(val);
    } else if (system === 'Triclinic') {
      if (param === 'a') setA(val);
      if (param === 'b') setB(val);
      if (param === 'c') setC(val);
      if (param === 'alpha') setAlpha(val);
      if (param === 'beta') setBeta(val);
      if (param === 'gamma') setGamma(val);
    } else if (system === 'Hexagonal') {
      if (param === 'a' || param === 'b') { setA(val); setB(val); }
      if (param === 'c') setC(val);
    } else if (system === 'Rhombohedral') {
      if (param === 'a' || param === 'b' || param === 'c') { setA(val); setB(val); setC(val); }
      if (param === 'alpha' || param === 'beta' || param === 'gamma') { setAlpha(val); setBeta(val); setGamma(val); }
    }
  };

  const { points, edges, va, vb, vc } = useMemo(() => drawUnitCell(a, b, c, alpha, beta, gamma), [a, b, c, alpha, beta, gamma]);

  return (
    <div className="flex h-full min-h-[560px] w-full flex-col rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 md:p-6">
      <div className="flex flex-1 flex-col gap-6 xl:flex-row">
        <div className="relative min-h-[420px] w-full overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--canvas-background)] xl:w-2/3">
          <Canvas dpr={[1, 1.5]} camera={{ position: [5, 4, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            
            <group position={[-a/2, -b/2, -c/2]}>
              {edges.map((edge, i) => (
                <Line 
                  key={i} 
                  points={edge as any} 
                  color={i === 0 ? '#ef4444' : i === 1 ? '#22c55e' : i === 2 ? '#3b82f6' : '#94a3b8'} 
                  lineWidth={i < 3 ? 4 : 2} 
                />
              ))}
              {points.map((pt, i) => (
                <Sphere key={i} args={[0.1, 16, 16]} position={pt as any}>
                  <meshStandardMaterial color="#334155" />
                </Sphere>
              ))}

              {showLabels && (
                <>
                  <Text position={[va[0]/2, -0.2, 0]} color="#ef4444" fontSize={0.3}>a</Text>
                  <Text position={[vb[0]/2, vb[1]/2, vb[2]/2 + 0.2]} color="#22c55e" fontSize={0.3}>b</Text>
                  <Text position={[vc[0]/2 - 0.2, vc[1]/2, vc[2]/2]} color="#3b82f6" fontSize={0.3}>c</Text>
                </>
              )}
            </group>

            <OrbitControls enablePan={true} />
          </Canvas>

          <div className="absolute right-4 top-4 rounded-lg border border-slate-600 bg-[#071923e8] p-3 text-sm text-white shadow backdrop-blur">
            <div className="font-mono">
              a={a.toFixed(1)} b={b.toFixed(1)} c={c.toFixed(1)}<br/>
              α={alpha}° β={beta}° γ={gamma}°
            </div>
          </div>
        </div>

        <div className="w-full xl:w-1/3 flex flex-col space-y-4">
          <h3 className="text-xl font-bold text-[var(--text-str)]">
            <BilingualText en="Crystal System Explorer" bn="স্ফটিক তন্ত্র অন্বেষক" />
          </h3>

          <select 
            value={system} 
            onChange={(e) => handleSystemChange(e.target.value as CrystalSystem)}
            className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-primary)] p-3 font-medium text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]"
          >
            {['Cubic', 'Tetragonal', 'Orthorhombic', 'Monoclinic', 'Triclinic', 'Hexagonal', 'Rhombohedral'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <div className="space-y-4 rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)] p-4">
            <div>
              <h4 className="font-semibold text-[var(--text-norm)] mb-2">Edge Lengths (a, b, c)</h4>
              {['a', 'b', 'c'].map(param => (
                <div key={param} className="flex items-center gap-3 mb-2">
                  <label className="w-4 font-mono font-bold text-[var(--text-mut)]">{param}</label>
                  <input 
                    type="range" min="1" max="4" step="0.1"
                    value={param === 'a' ? a : param === 'b' ? b : c}
                    onChange={(e) => handleSliderChange(param, parseFloat(e.target.value))}
                    disabled={
                      (system === 'Cubic' && param !== 'a') || 
                      (system === 'Tetragonal' && param === 'b') ||
                      (system === 'Hexagonal' && param === 'b') ||
                      (system === 'Rhombohedral' && param !== 'a')
                    }
                    className="flex-1 accent-primary"
                  />
                  <span className="w-8 text-right font-mono text-sm text-[var(--text-norm)]">
                    {param === 'a' ? a : param === 'b' ? b : c}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-semibold text-[var(--text-norm)] mb-2">Angles (α, β, γ)</h4>
              {['alpha', 'beta', 'gamma'].map(param => (
                <div key={param} className="flex items-center gap-3 mb-2">
                  <label className="w-6 font-mono font-bold text-[var(--text-mut)]">
                    {param === 'alpha' ? 'α' : param === 'beta' ? 'β' : 'γ'}
                  </label>
                  <input 
                    type="range" min="60" max="120" step="1"
                    value={param === 'alpha' ? alpha : param === 'beta' ? beta : gamma}
                    onChange={(e) => handleSliderChange(param, parseFloat(e.target.value))}
                    disabled={
                      system === 'Cubic' || system === 'Tetragonal' || system === 'Orthorhombic' || 
                      (system === 'Hexagonal') ||
                      (system === 'Monoclinic' && param !== 'beta') ||
                      (system === 'Rhombohedral' && param !== 'alpha')
                    }
                    className="flex-1 accent-secondary"
                  />
                  <span className="w-10 text-right font-mono text-sm text-[var(--text-norm)]">
                    {param === 'alpha' ? alpha : param === 'beta' ? beta : gamma}°
                  </span>
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-[var(--text-norm)]">
            <input 
              type="checkbox" 
              checked={showLabels} 
              onChange={(e) => setShowLabels(e.target.checked)}
              className="h-4 w-4 rounded accent-[var(--accent-primary)]"
            />
            <BilingualText en="Show a, b, c labels" bn="a, b, c লেবেল দেখান" />
          </label>
        </div>
      </div>
    </div>
  );
};
