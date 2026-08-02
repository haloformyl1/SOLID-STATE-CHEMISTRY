import React, { useState } from 'react';
import { BilingualText } from '../../../BilingualText';
import { GuidedLessonEngine } from '../engine/GuidedLessonEngine';
import type { LessonMode, AnimationStep } from '../engine/GuidedLessonTypes';
import { motion } from 'framer-motion';

const steps: AnimationStep[] = [
  {
    id: 'intro',
    narration: { en: 'Crystalline solids are classified based on their constituent particles and binding forces.', bn: 'স্ফটিকাকার কঠিন পদার্থগুলিকে তাদের গঠনকারী কণা এবং বন্ধন বলের উপর ভিত্তি করে শ্রেণিবদ্ধ করা হয়।' },
    explanation: { en: 'There are four main categories.', bn: 'এর চারটি প্রধান বিভাগ রয়েছে।' },
    observation: { en: 'Observe the main branches appearing.', bn: 'প্রধান শাখাগুলি উপস্থিত হচ্ছে তা লক্ষ্য করুন।' }
  },
  {
    id: 'ionic-metallic',
    narration: { en: 'Ionic and Metallic solids are two major classes.', bn: 'আয়নিক এবং ধাতব কঠিন পদার্থ হল দুটি প্রধান শ্রেণি।' },
    explanation: { en: 'Ionic solids contain ions. Metallic solids contain metal cores and delocalised electrons.', bn: 'আয়নিক কঠিনে আয়ন থাকে। ধাতব কঠিনে ধাতব কোর এবং স্থানান্তরযোগ্য ইলেকট্রন থাকে।' },
    observation: { en: 'Notice their separate branches.', bn: 'তাদের পৃথক শাখাগুলি লক্ষ্য করুন।' }
  },
  {
    id: 'covalent-molecular',
    narration: { en: 'The other two are Covalent (Network) and Molecular solids.', bn: 'অন্য দুটি হল সমযোজী (জালকীয়) এবং আণবিক কঠিন পদার্থ।' },
    explanation: { en: 'Network solids form huge extended structures. Molecular solids consist of discrete molecules.', bn: 'জালকীয় কঠিন বিশাল বিস্তৃত কাঠামো তৈরি করে। আণবিক কঠিন বিচ্ছিন্ন অণু নিয়ে গঠিত।' },
    observation: { en: 'Observe the final two main branches.', bn: 'শেষ দুটি প্রধান শাখা লক্ষ্য করুন।' }
  },
  {
    id: 'molecular-sub',
    narration: { en: 'Molecular solids are further divided into three types.', bn: 'আণবিক কঠিন পদার্থকে আরও তিনটি ভাগে ভাগ করা হয়েছে।' },
    explanation: { en: 'They are Non-polar, Polar, and Hydrogen-bonded.', bn: 'সেগুলি হল অধ্রুবীয়, ধ্রুবীয় এবং হাইড্রোজেন-বন্ধনযুক্ত।' },
    observation: { en: 'Notice the sub-branches under Molecular Solids.', bn: 'আণবিক কঠিন পদার্থের অধীনে উপ-শাখাগুলি লক্ষ্য করুন।' },
    checkpointQuestion: { en: 'Which class of solids is further subdivided based on polarity and hydrogen bonding?', bn: 'মেরুপ্রবণতা এবং হাইড্রোজেন বন্ধনের উপর ভিত্তি করে কোন শ্রেণির কঠিন পদার্থকে আরও উপবিভক্ত করা হয়?' },
    checkpointOptions: [
      { text: { en: 'Ionic Solids', bn: 'আয়নিক কঠিন' }, isCorrect: false },
      { text: { en: 'Molecular Solids', bn: 'আণবিক কঠিন' }, isCorrect: true }
    ],
    checkpointFeedback: { en: 'Correct! Molecular solids are subdivided into non-polar, polar, and hydrogen-bonded.', bn: 'সঠিক! আণবিক কঠিন পদার্থগুলিকে অধ্রুবীয়, ধ্রুবীয় এবং হাইড্রোজেন-বন্ধনযুক্ত ভাগে ভাগ করা হয়।' }
  }
];

export const ClassificationTreeLab: React.FC = () => {
  const [mode, setMode] = useState<LessonMode>('guided');
  const [stepIndex, setStepIndex] = useState(0);
  const [isAnimOn, setIsAnimOn] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [placedNodes, setPlacedNodes] = useState<Record<string, string>>({});
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [classificationFeedback, setClassificationFeedback] = useState('');

  const draggables = [
    { id: 'ionic', en: 'Ionic', bn: 'আয়নিক' },
    { id: 'metallic', en: 'Metallic', bn: 'ধাতব' },
    { id: 'network', en: 'Covalent (Network)', bn: 'সমযোজী (জালকীয়)' },
    { id: 'molecular', en: 'Molecular', bn: 'আণবিক' },
    { id: 'nonpolar', en: 'Non-polar', bn: 'অধ্রুবীয়' },
    { id: 'polar', en: 'Polar', bn: 'ধ্রুবীয়' },
    { id: 'hbonded', en: 'Hydrogen-bonded', bn: 'হাইড্রোজেন-বন্ধনযুক্ত' }
  ];

  const placeSelectedNode = (targetId: string, expectedId: string) => {
    if (!selectedNode) {
      setClassificationFeedback('Select a label first.');
      return;
    }

    if (selectedNode !== expectedId) {
      setClassificationFeedback('That label belongs on a different branch. Try another target.');
      return;
    }

    setPlacedNodes((placed) => ({ ...placed, [targetId]: selectedNode }));
    setSelectedNode(null);
    setClassificationFeedback('Correct placement.');
  };

  return (
    <GuidedLessonEngine
      steps={steps}
      currentStepIndex={stepIndex}
      mode={mode}
      onModeChange={setMode}
      onStepChange={setStepIndex}
      onAnimationToggle={setIsAnimOn}
      onSpeedChange={setSpeed}
      isAnimationOn={isAnimOn}
      speed={speed}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-start overflow-auto bg-[var(--canvas-background)] p-4 text-sky-100 sm:p-8">
        
        {mode === 'challenge' && (
          <div className="absolute inset-x-3 top-16 z-10 flex flex-wrap justify-center gap-2 rounded-xl border border-white/10 bg-[color-mix(in_srgb,var(--canvas-surface)_94%,transparent)] p-3 shadow-xl backdrop-blur-md sm:inset-x-6">
            {draggables.map(d => {
              const isPlacedCorrectly = Object.values(placedNodes).includes(d.id);
              if (isPlacedCorrectly) return null;

              return (
                <motion.button
                  type="button"
                  key={d.id}
                  onClick={() => {
                    setSelectedNode(d.id);
                    setClassificationFeedback(`${d.en} selected. Choose its branch.`);
                  }}
                  whileTap={isAnimOn ? { scale: 0.96 } : undefined}
                  className={`z-50 rounded-lg border px-3 py-2 text-sm font-bold shadow-md transition-colors ${selectedNode === d.id ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--button-primary-text)]' : 'border-white/15 bg-[var(--canvas-background)] text-sky-100 hover:border-sky-300/60 hover:bg-white/5'}`}
                  aria-pressed={selectedNode === d.id}
                >
                  <BilingualText en={d.en} bn={d.bn} />
                </motion.button>
              );
            })}
            <div className="w-full text-center text-xs font-medium text-sky-100/70" aria-live="polite">{classificationFeedback || 'Select a label, then choose its matching branch.'}</div>
          </div>
        )}

        <div className={`flex w-full max-w-3xl flex-col items-center ${mode === 'challenge' ? 'mt-44 sm:mt-36' : 'mt-12'}`}>
          {/* Root */}
          <div className="bg-primary text-white font-bold py-3 px-6 rounded-xl shadow-lg z-10 text-center">
            <BilingualText en="Crystalline Solids" bn="স্ফটিকাকার কঠিন" />
          </div>

          <div className="w-full h-8 border-l-2 border-primary/30 mt-0"></div>
          <div className="w-3/4 h-0 border-t-2 border-primary/30"></div>
          
          {/* Level 1 */}
          <div className="flex justify-between w-full mt-4">
            {['Ionic', 'Metallic', 'Covalent (Network)', 'Molecular'].map((name, i) => {
              const visible = mode !== 'guided' || stepIndex >= 1 + Math.floor(i / 2);
              const isMolecular = i === 3;
              
              return (
                <div key={i} className="flex flex-col items-center w-1/4">
                  <div className="w-0 h-4 border-l-2 border-primary/30 -mt-4"></div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
                    transition={{ duration: isAnimOn ? 0.28 / speed : 0 }}
                    className="flex min-h-[48px] w-11/12 items-center justify-center rounded-lg border border-sky-400/25 bg-sky-400/10 px-3 py-2 text-center text-sm font-bold text-sky-200 shadow-sm"
                  >
                    {mode === 'challenge' ? (
                      <button
                        type="button"
                        onClick={() => placeSelectedNode(`main-${i}`, ['ionic', 'metallic', 'network', 'molecular'][i])}
                        className="flex h-full w-full items-center justify-center rounded border border-dashed border-sky-300/55 p-2 text-xs text-sky-100/75 hover:bg-sky-300/10 hover:text-white"
                      >
                        {placedNodes[`main-${i}`] ? <BilingualText en={name} bn={i===0 ? 'আয়নিক' : i===1 ? 'ধাতব' : i===2 ? 'সমযোজী (জালকীয়)' : 'আণবিক'} /> : 'Place label'}
                      </button>
                    ) : (
                      <BilingualText 
                        en={name} 
                        bn={i===0 ? 'আয়নিক' : i===1 ? 'ধাতব' : i===2 ? 'সমযোজী (জালকীয়)' : 'আণবিক'} 
                      />
                    )}
                  </motion.div>
                  
                  {/* Level 2 (Sub-branches for Molecular) */}
                  {isMolecular && (
                    <>
                      <motion.div animate={{ opacity: visible && (mode !== 'guided' || stepIndex >= 3) ? 1 : 0 }} transition={{ duration: isAnimOn ? 0.28 / speed : 0 }} className="w-0 h-6 border-l-2 border-primary/30 mt-0"></motion.div>
                      <motion.div animate={{ opacity: visible && (mode !== 'guided' || stepIndex >= 3) ? 1 : 0 }} transition={{ duration: isAnimOn ? 0.28 / speed : 0 }} className="w-full h-0 border-t-2 border-primary/30"></motion.div>
                      <div className="flex justify-between w-[250%] -ml-[75%] mt-4">
                        {['Non-polar', 'Polar', 'Hydrogen-bonded'].map((sub, j) => (
                          <div key={j} className="flex flex-col items-center w-1/3">
                            <div className="w-0 h-4 border-l-2 border-primary/30 -mt-4"></div>
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: visible && (mode !== 'guided' || stepIndex >= 3) ? 1 : 0 }}
                              transition={{ duration: isAnimOn ? 0.28 / speed : 0 }}
                              className="flex min-h-[48px] w-11/12 items-center justify-center rounded-lg border border-emerald-300/25 bg-emerald-400/10 px-2 py-2 text-center text-xs font-bold text-emerald-200 shadow-sm"
                            >
                              {mode === 'challenge' ? (
                                <button
                                  type="button"
                                  onClick={() => placeSelectedNode(`sub-${j}`, ['nonpolar', 'polar', 'hbonded'][j])}
                                  className="flex h-full w-full items-center justify-center rounded border border-dashed border-emerald-300/55 p-1 text-[10px] text-emerald-100/80 hover:bg-emerald-300/10 hover:text-white"
                                >
                                  {placedNodes[`sub-${j}`] ? <BilingualText en={sub} bn={j===0 ? 'অধ্রুবীয়' : j===1 ? 'ধ্রুবীয়' : 'হাইড্রোজেন-বন্ধনযুক্ত'} /> : 'Place label'}
                                </button>
                              ) : (
                                <BilingualText 
                                  en={sub} 
                                  bn={j===0 ? 'অধ্রুবীয়' : j===1 ? 'ধ্রুবীয়' : 'হাইড্রোজেন-বন্ধনযুক্ত'} 
                                />
                              )}
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </GuidedLessonEngine>
  );
};
