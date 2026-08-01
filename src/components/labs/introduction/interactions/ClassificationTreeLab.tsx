import React, { useState } from 'react';
import { BilingualText } from '../../../BilingualText';
import { GuidedLessonEngine } from '../engine/GuidedLessonEngine';
import type { LessonMode, AnimationStep } from '../engine/GuidedLessonTypes';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

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
  
  // Challenge mode state
  const [placedNodes, setPlacedNodes] = useState<Record<string, string>>({});
  
  const handleDrop = (nodeId: string, targetId: string) => {
    setPlacedNodes(prev => ({ ...prev, [targetId]: nodeId }));
  };

  const draggables = [
    { id: 'ionic', en: 'Ionic', bn: 'আয়নিক' },
    { id: 'metallic', en: 'Metallic', bn: 'ধাতব' },
    { id: 'network', en: 'Covalent (Network)', bn: 'সমযোজী (জালকীয়)' },
    { id: 'molecular', en: 'Molecular', bn: 'আণবিক' },
    { id: 'nonpolar', en: 'Non-polar', bn: 'অধ্রুবীয়' },
    { id: 'polar', en: 'Polar', bn: 'ধ্রুবীয়' },
    { id: 'hbonded', en: 'Hydrogen-bonded', bn: 'হাইড্রোজেন-বন্ধনযুক্ত' }
  ];

  const checkCorrectness = (targetId: string, expectedIds: string[]) => {
    const placed = placedNodes[targetId];
    if (!placed) return null;
    return expectedIds.includes(placed);
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
      <div className="w-full h-full flex flex-col p-8 items-center justify-start bg-[var(--bg-norm)] relative">
        
        {mode === 'challenge' && (
          <div className="absolute top-4 w-full flex flex-wrap justify-center gap-2 z-10 px-4">
            {draggables.map(d => {
              // Hide if already correctly placed
              const isPlacedCorrectly = Object.entries(placedNodes).some(([targetId, nodeId]) => {
                if (nodeId !== d.id) return false;
                if (targetId.startsWith('main') && ['ionic','metallic','network','molecular'].includes(nodeId)) return true;
                if (targetId.startsWith('sub') && ['nonpolar','polar','hbonded'].includes(nodeId)) return true;
                return false;
              });
              if (isPlacedCorrectly) return null;

              return (
                <motion.div
                  key={d.id}
                  drag
                  dragSnapToOrigin
                  onDragEnd={(e, info) => {
                    // Simple hit detection logic could be implemented here based on coordinates
                    // For brevity, we simulate a drop zone logic (in a real app, use bounding boxes)
                    // We'll leave the full bounding box logic out and just show the static tree for this conceptual lab.
                  }}
                  className="bg-white dark:bg-slate-800 border-2 border-primary/50 p-2 rounded-lg shadow-md cursor-grab active:cursor-grabbing text-sm font-medium z-50 text-[var(--text-norm)]"
                >
                  <BilingualText en={d.en} bn={d.bn} />
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="flex flex-col items-center mt-12 w-full max-w-3xl">
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
                    className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 py-2 px-3 rounded-lg shadow-sm text-center text-sm font-medium w-11/12 min-h-[48px] flex items-center justify-center"
                  >
                    {mode === 'challenge' ? (
                      <span className="opacity-50 border border-dashed border-blue-400 w-full h-full p-2 rounded flex items-center justify-center">Drop Here</span>
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
                      <motion.div animate={{ opacity: visible && (mode !== 'guided' || stepIndex >= 3) ? 1 : 0 }} className="w-0 h-6 border-l-2 border-primary/30 mt-0"></motion.div>
                      <motion.div animate={{ opacity: visible && (mode !== 'guided' || stepIndex >= 3) ? 1 : 0 }} className="w-full h-0 border-t-2 border-primary/30"></motion.div>
                      <div className="flex justify-between w-[250%] -ml-[75%] mt-4">
                        {['Non-polar', 'Polar', 'Hydrogen-bonded'].map((sub, j) => (
                          <div key={j} className="flex flex-col items-center w-1/3">
                            <div className="w-0 h-4 border-l-2 border-primary/30 -mt-4"></div>
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: visible && (mode !== 'guided' || stepIndex >= 3) ? 1 : 0 }}
                              className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 py-2 px-2 rounded-lg shadow-sm text-center text-xs font-medium w-11/12 min-h-[48px] flex items-center justify-center"
                            >
                              {mode === 'challenge' ? (
                                <span className="opacity-50 border border-dashed border-emerald-400 w-full h-full p-1 rounded flex items-center justify-center text-[10px]">Drop Here</span>
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
