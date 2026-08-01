import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, MonitorPlay, MousePointerClick, Compass, Settings2 } from 'lucide-react';
import { BilingualText } from '../../../BilingualText';
import type { GuidedLessonEngineProps } from './GuidedLessonTypes';
import { motion, AnimatePresence } from 'framer-motion';

export const GuidedLessonEngine: React.FC<GuidedLessonEngineProps> = ({
  steps,
  currentStepIndex,
  mode,
  onModeChange,
  onStepChange,
  onAnimationToggle,
  onSpeedChange,
  isAnimationOn,
  speed,
  children
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeCheckpoint, setActiveCheckpoint] = useState<number | null>(null);
  const [checkpointAnswer, setCheckpointAnswer] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (isPlaying && isAnimationOn && mode === 'guided') {
      if (currentStep.checkpointQuestion && activeCheckpoint !== currentStepIndex) {
        setIsPlaying(false);
        setActiveCheckpoint(currentStepIndex);
        return;
      }
      
      const delay = currentStep.delayBeforeNext || 3000;
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < steps.length - 1 && !currentStep.actionRequired) {
          onStepChange(currentStepIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, delay / speed);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStepIndex, mode, isAnimationOn, speed, currentStep, activeCheckpoint, steps.length, onStepChange]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) onStepChange(currentStepIndex + 1);
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) onStepChange(currentStepIndex - 1);
  };

  const handleCheckpointSubmit = (idx: number) => {
    setCheckpointAnswer(idx);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto min-h-[600px] bg-[var(--bg-norm)] p-4 rounded-2xl shadow-sm border border-[var(--acc-sec)]/20">
      {/* 3D/2D Canvas Area */}
      <div className="flex-1 relative rounded-xl overflow-hidden bg-black/5 dark:bg-black/20 flex flex-col">
        {/* Mode Selector */}
        <div className="absolute top-4 left-4 z-10 flex gap-2 bg-[var(--bg-sec)]/80 backdrop-blur-md p-1.5 rounded-lg shadow-sm border border-[var(--acc-sec)]/10">
          <button 
            onClick={() => onModeChange('guided')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm font-medium transition-colors ${mode === 'guided' ? 'bg-primary text-white shadow-sm' : 'hover:bg-[var(--acc-sec)]/10 text-[var(--text-norm)]'}`}
          >
            <MonitorPlay className="w-4 h-4" />
            <span className="hidden sm:inline">Guided</span>
          </button>
          <button 
            onClick={() => onModeChange('challenge')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm font-medium transition-colors ${mode === 'challenge' ? 'bg-amber-500 text-white shadow-sm' : 'hover:bg-[var(--acc-sec)]/10 text-[var(--text-norm)]'}`}
          >
            <MousePointerClick className="w-4 h-4" />
            <span className="hidden sm:inline">Challenge</span>
          </button>
          <button 
            onClick={() => onModeChange('explore')}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm font-medium transition-colors ${mode === 'explore' ? 'bg-emerald-500 text-white shadow-sm' : 'hover:bg-[var(--acc-sec)]/10 text-[var(--text-norm)]'}`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Explore</span>
          </button>
        </div>

        {/* Playback Controls (Guided mode only) */}
        {mode === 'guided' && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-[var(--bg-sec)]/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-[var(--acc-sec)]/10">
            <button onClick={handlePrev} disabled={currentStepIndex === 0} className="p-2 hover:bg-[var(--acc-sec)]/10 rounded-lg disabled:opacity-30 text-[var(--text-norm)]">
              <SkipBack className="w-5 h-5" />
            </button>
            <button onClick={() => setIsPlaying(!isPlaying)} className="p-3 bg-primary hover:bg-primary-dark text-white rounded-full shadow-sm transition-transform hover:scale-105">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <button onClick={handleNext} disabled={currentStepIndex === steps.length - 1} className="p-2 hover:bg-[var(--acc-sec)]/10 rounded-lg disabled:opacity-30 text-[var(--text-norm)]">
              <SkipForward className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-[var(--acc-sec)]/20 mx-1"></div>
            <button onClick={() => onStepChange(0)} className="p-2 hover:bg-[var(--acc-sec)]/10 rounded-lg text-[var(--text-norm)]" title="Restart">
              <RotateCcw className="w-5 h-5" />
            </button>
            <div className="relative">
              <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-[var(--acc-sec)]/10 rounded-lg text-[var(--text-norm)]" title="Settings">
                <Settings2 className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {showSettings && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full right-0 mb-2 w-48 bg-[var(--bg-sec)] rounded-xl shadow-xl border border-[var(--acc-sec)]/20 p-3 flex flex-col gap-3"
                  >
                    <div>
                      <span className="text-xs font-semibold text-[var(--acc-sec)] uppercase tracking-wider block mb-2">Animation</span>
                      <div className="flex gap-2 bg-[var(--bg-norm)] p-1 rounded-lg">
                        <button onClick={() => onAnimationToggle(true)} className={`flex-1 text-xs py-1.5 rounded-md font-medium ${isAnimationOn ? 'bg-primary text-white' : 'text-[var(--text-norm)] hover:bg-[var(--acc-sec)]/10'}`}>On</button>
                        <button onClick={() => onAnimationToggle(false)} className={`flex-1 text-xs py-1.5 rounded-md font-medium ${!isAnimationOn ? 'bg-primary text-white' : 'text-[var(--text-norm)] hover:bg-[var(--acc-sec)]/10'}`}>Off</button>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[var(--acc-sec)] uppercase tracking-wider block mb-2">Speed</span>
                      <div className="flex gap-1 bg-[var(--bg-norm)] p-1 rounded-lg">
                        {[0.5, 0.75, 1, 1.25].map(s => (
                          <button key={s} onClick={() => onSpeedChange(s)} className={`flex-1 text-xs py-1.5 rounded-md font-medium ${speed === s ? 'bg-primary text-white' : 'text-[var(--text-norm)] hover:bg-[var(--acc-sec)]/10'}`}>{s}x</button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Render actual 3D/2D content */}
        <div className="w-full flex-1 relative flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* Narration and Feedback Panel */}
      <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
        {mode === 'explore' ? (
          <div className="bg-[var(--bg-sec)] p-6 rounded-xl border border-[var(--acc-sec)]/10 flex flex-col items-center justify-center text-center h-full text-[var(--text-norm)]">
            <Compass className="w-12 h-12 text-emerald-500 mb-4 opacity-50" />
            <h3 className="font-semibold text-lg mb-2"><BilingualText en="Explore Mode" bn="অন্বেষণ মোড" /></h3>
            <p className="text-sm opacity-80 leading-relaxed"><BilingualText en="Freely rotate, zoom, and interact with the model without forced narration. Switch to Guided mode for a step-by-step explanation." bn="কোনো নির্দেশিত ধারাভাষ্য ছাড়াই মডেলটি স্বাধীনভাবে ঘোরান, জুম করুন এবং ব্যবহার করুন। ধাপে ধাপে ব্যাখ্যার জন্য নির্দেশিত মোডে যান।" /></p>
          </div>
        ) : mode === 'challenge' ? (
          <div className="bg-[var(--bg-sec)] p-6 rounded-xl border border-amber-500/20 shadow-sm">
             <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-semibold mb-4 border-b border-amber-500/20 pb-3">
               <MousePointerClick className="w-5 h-5" />
               <BilingualText en="Interactive Challenge" bn="ইন্টার্যাক্টিভ অনুশীলন" />
             </div>
             <div className="text-[var(--text-norm)] text-sm leading-relaxed mb-6">
                <BilingualText en="Follow the instructions to interact with the system. Your progress will be tracked." bn="সিস্টেমের সাথে মিথস্ক্রিয়া করতে নির্দেশাবলী অনুসরণ করুন। আপনার অগ্রগতি ট্র্যাক করা হবে।" />
             </div>
             {/* Challenge specific feedback gets injected here by parent components */}
          </div>
        ) : (
          <>
            {/* Guided Narration */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-4"
              >
                {/* What happened? */}
                <div className="bg-[var(--bg-sec)] p-5 rounded-xl border border-[var(--acc-sec)]/10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-2">
                    <BilingualText en="What happened?" bn="কী ঘটল?" />
                  </h4>
                  <p className="text-[var(--text-norm)] text-[15px] leading-relaxed">
                    <BilingualText en={currentStep.narration.en} bn={currentStep.narration.bn} />
                  </p>
                </div>

                {/* Why did it happen? */}
                {currentStep.explanation.en && (
                  <div className="bg-[var(--bg-sec)] p-5 rounded-xl border border-[var(--acc-sec)]/10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">
                      <BilingualText en="Why did it happen?" bn="কেন ঘটল?" />
                    </h4>
                    <p className="text-[var(--text-norm)] text-[15px] leading-relaxed">
                      <BilingualText en={currentStep.explanation.en} bn={currentStep.explanation.bn} />
                    </p>
                  </div>
                )}

                {/* What should you observe? */}
                {currentStep.observation.en && (
                  <div className="bg-primary/5 p-5 rounded-xl border border-primary/20 shadow-sm">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                      <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      <BilingualText en="Observation" bn="পর্যবেক্ষণ" />
                    </h4>
                    <p className="text-[var(--text-norm)] text-[15px] leading-relaxed font-medium">
                      <BilingualText en={currentStep.observation.en} bn={currentStep.observation.bn} />
                    </p>
                  </div>
                )}

                {/* Prediction Checkpoint */}
                {currentStep.checkpointQuestion && activeCheckpoint === currentStepIndex && (
                  <div className="bg-amber-500/10 p-5 rounded-xl border border-amber-500/30 shadow-sm mt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 mb-3 flex items-center gap-1.5">
                      <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <BilingualText en="Prediction Checkpoint" bn="পূর্বাভাস চেকপয়েন্ট" />
                    </h4>
                    <p className="text-[var(--text-norm)] text-[15px] font-medium mb-4">
                      <BilingualText en={currentStep.checkpointQuestion.en} bn={currentStep.checkpointQuestion.bn} />
                    </p>
                    <div className="flex flex-col gap-2">
                      {currentStep.checkpointOptions?.map((opt, idx) => {
                        const isSelected = checkpointAnswer === idx;
                        const showResult = checkpointAnswer !== null;
                        let btnClass = "text-left px-4 py-3 rounded-lg text-sm transition-all border ";
                        
                        if (!showResult) {
                          btnClass += "border-[var(--acc-sec)]/30 hover:border-primary hover:bg-primary/5 text-[var(--text-norm)]";
                        } else {
                          if (opt.isCorrect) {
                            btnClass += "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium";
                          } else if (isSelected) {
                            btnClass += "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
                          } else {
                            btnClass += "border-[var(--acc-sec)]/10 opacity-50";
                          }
                        }

                        return (
                          <button 
                            key={idx} 
                            onClick={() => !showResult && handleCheckpointSubmit(idx)}
                            disabled={showResult}
                            className={btnClass}
                          >
                            <BilingualText en={opt.text.en} bn={opt.text.bn} />
                          </button>
                        );
                      })}
                    </div>
                    {checkpointAnswer !== null && currentStep.checkpointFeedback && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-3 bg-[var(--bg-norm)] rounded-lg text-sm text-[var(--text-norm)] border border-[var(--acc-sec)]/10">
                        <BilingualText en={currentStep.checkpointFeedback.en} bn={currentStep.checkpointFeedback.bn} />
                        <button 
                          onClick={() => {
                            setActiveCheckpoint(null);
                            setCheckpointAnswer(null);
                            setIsPlaying(true);
                          }}
                          className="mt-3 text-xs font-semibold text-primary hover:underline block"
                        >
                          <BilingualText en="Continue Animation" bn="অ্যানিমেশন চালিয়ে যান" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};
