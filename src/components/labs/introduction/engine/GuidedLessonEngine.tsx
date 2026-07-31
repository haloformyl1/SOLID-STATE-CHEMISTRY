import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { BilingualText } from '../../../BilingualText';
import { Play, Pause, SkipBack, SkipForward, RefreshCw, Eye, EyeOff, FastForward, CheckCircle, XCircle } from 'lucide-react';
import type { GuidedLessonSequence, GuidedLessonStep } from './GuidedLessonTypes';

interface EngineProps {
  sequence: GuidedLessonSequence;
  render3D: (step: GuidedLessonStep, isAnimationOn: boolean, progress: number) => React.ReactNode;
}

export const GuidedLessonEngine: React.FC<EngineProps> = ({ sequence, render3D }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimationOn, setIsAnimationOn] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [checkpointResponse, setCheckpointResponse] = useState<string>('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean, msgEn: string, msgBn: string } | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentStep = sequence.steps[stepIndex];
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const totalDuration = currentStep.durationMs / speed;

  useEffect(() => {
    if (!isAnimationOn) {
      setProgress(1);
      return;
    }

    if (isPlaying && progress < 1 && (!currentStep.checkpoint || feedback?.isCorrect)) {
      if (progress === 0) startTimeRef.current = performance.now();
      
      const animate = (time: number) => {
        const elapsed = time - startTimeRef.current;
        const newProgress = Math.min(elapsed / totalDuration, 1);
        setProgress(newProgress);

        if (newProgress < 1) {
          timerRef.current = requestAnimationFrame(animate);
        } else {
          // Finished this step
          setIsPlaying(false);
        }
      };
      
      timerRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [isPlaying, isAnimationOn, currentStep, speed, feedback]);

  const handleNext = () => {
    if (stepIndex < sequence.steps.length - 1) {
      setStepIndex(s => s + 1);
      setProgress(0);
      setFeedback(null);
      setCheckpointResponse('');
      setShowHint(false);
      setIsPlaying(isAnimationOn);
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex(s => s - 1);
      setProgress(0);
      setFeedback(null);
      setCheckpointResponse('');
      setShowHint(false);
      setIsPlaying(isAnimationOn);
    }
  };

  const handleReplay = () => {
    setProgress(0);
    setFeedback(null);
    setCheckpointResponse('');
    setShowHint(false);
    setIsPlaying(true);
  };

  const handleRestart = () => {
    setStepIndex(0);
    setProgress(0);
    setFeedback(null);
    setCheckpointResponse('');
    setShowHint(false);
    setIsPlaying(true);
  };

  const checkAnswer = () => {
    if (!currentStep.checkpoint) return;
    const isCorrect = checkpointResponse.toLowerCase().trim() === String(currentStep.checkpoint.expectedResponse).toLowerCase().trim();
    if (isCorrect) {
      setFeedback({ isCorrect: true, msgEn: 'Correct! Proceed to the next animation step.', msgBn: 'সঠিক! পরবর্তী অ্যানিমেশন ধাপে এগিয়ে যান।' });
      setIsPlaying(true);
    } else {
      setFeedback({ isCorrect: false, msgEn: 'Incorrect. Try again or check the hint.', msgBn: 'ভুল হয়েছে। আবার চেষ্টা করুন বা হিন্ট দেখুন।' });
    }
  };

  const fillAnswer = () => {
    if (currentStep.checkpoint) {
      setCheckpointResponse(String(currentStep.checkpoint.expectedResponse));
      setFeedback({ isCorrect: true, msgEn: 'Answer revealed.', msgBn: 'উত্তর প্রকাশ করা হয়েছে।' });
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl mt-8">
      {/* Header */}
      <div className="bg-slate-100 dark:bg-slate-800 p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
        <div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
            <BilingualText en={sequence.titleEn} bn={sequence.titleBn} />
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Step {stepIndex + 1} of {sequence.steps.length}: <BilingualText en={currentStep.titleEn} bn={currentStep.titleBn} />
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsAnimationOn(!isAnimationOn)} className="px-3 py-1 rounded-full text-sm font-medium bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center gap-1 transition-colors">
            {isAnimationOn ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="hidden sm:inline">Animation: {isAnimationOn ? 'On' : 'Off'}</span>
          </button>
          <button onClick={() => setShowSubtitles(!showSubtitles)} className="px-3 py-1 rounded-full text-sm font-medium bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            CC
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Main Canvas Area */}
        <div className="w-full lg:w-2/3 h-[450px] relative bg-black">
          <Canvas shadows camera={{ position: [0, 5, 10], fov: 45 }}>
            {render3D(currentStep, isAnimationOn, progress)}
          </Canvas>
          
          {/* Subtitles Overlay */}
          {showSubtitles && (
            <div className="absolute bottom-16 left-0 right-0 flex justify-center pointer-events-none px-4 z-10">
              <div className="bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-center max-w-2xl border border-white/10 shadow-lg">
                <p className="text-lg font-medium"><BilingualText en={currentStep.narrationEn} bn={currentStep.narrationBn} /></p>
              </div>
            </div>
          )}

          {/* Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur border-t border-slate-700 p-3 flex justify-center items-center gap-4 z-20">
            <button onClick={handleRestart} title="Restart" className="p-2 text-slate-400 hover:text-white transition-colors"><RefreshCw className="w-5 h-5" /></button>
            <button onClick={handlePrev} disabled={stepIndex === 0} className="p-2 text-slate-300 hover:text-white disabled:opacity-50 transition-colors"><SkipBack className="w-5 h-5" /></button>
            
            {isAnimationOn && (
              <button onClick={() => { if(progress>=1) {handleReplay()} else {setIsPlaying(!isPlaying)} }} className="p-3 bg-violet-600 hover:bg-violet-500 rounded-full text-white shadow-lg shadow-violet-900/50 transition-all transform hover:scale-105">
                {isPlaying ? <Pause className="w-6 h-6" /> : (progress >= 1 ? <RefreshCw className="w-6 h-6" /> : <Play className="w-6 h-6" />)}
              </button>
            )}

            <button onClick={handleNext} disabled={stepIndex === sequence.steps.length - 1} className="p-2 text-slate-300 hover:text-white disabled:opacity-50 transition-colors"><SkipForward className="w-5 h-5" /></button>
            
            <div className="flex items-center gap-2 ml-4">
              <FastForward className="w-4 h-4 text-slate-500" />
              <select value={speed} onChange={e => setSpeed(Number(e.target.value))} className="bg-transparent text-slate-300 text-sm outline-none cursor-pointer">
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>

          {/* Progress Bar */}
          {isAnimationOn && (
            <div className="absolute bottom-16 left-0 right-0 h-1 bg-slate-800 z-20">
              <div className="h-full bg-violet-500 transition-all duration-75" style={{ width: `${progress * 100}%` }}></div>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-1/3 bg-slate-50 dark:bg-slate-800 p-6 flex flex-col gap-6 overflow-y-auto max-h-[450px]">
          
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider text-[var(--acc-prim)]">
              <BilingualText en="What Just Happened?" bn="কী ঘটল?" />
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-white dark:bg-slate-700/50 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
              <BilingualText en={currentStep.whatHappenedEn} bn={currentStep.whatHappenedBn} />
            </p>
          </div>

          {currentStep.whyItHappenedEn && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider text-[var(--acc-sec)]">
                <BilingualText en="Why It Happened?" bn="কেন ঘটল?" />
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-white dark:bg-slate-700/50 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                <BilingualText en={currentStep.whyItHappenedEn} bn={currentStep.whyItHappenedBn} />
              </p>
            </div>
          )}

          {currentStep.observeEn && (
            <div className="space-y-2">
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm uppercase tracking-wider">
                <BilingualText en="Observe Closely" bn="মনোযোগ দিয়ে দেখুন" />
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-l-4 border-emerald-500 pl-3">
                <BilingualText en={currentStep.observeEn} bn={currentStep.observeBn} />
              </p>
            </div>
          )}

          {/* Checkpoint System */}
          {currentStep.checkpoint && (
            <div className="mt-auto bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
              <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
                <BilingualText en="Checkpoint" bn="যাচাইকরণ" />
              </h4>
              <p className="text-sm text-amber-900 dark:text-amber-200 mb-3">
                <BilingualText en={currentStep.checkpoint.promptEn} bn={currentStep.checkpoint.promptBn} />
              </p>
              
              <div className="flex gap-2 mb-2">
                <input 
                  type="text" 
                  value={checkpointResponse} 
                  onChange={e => setCheckpointResponse(e.target.value)} 
                  disabled={feedback?.isCorrect}
                  className="flex-1 p-2 text-sm rounded border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 disabled:opacity-50"
                  placeholder="Your answer..."
                />
                <button onClick={checkAnswer} disabled={feedback?.isCorrect} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded text-sm font-bold disabled:opacity-50">
                  Submit
                </button>
              </div>
              
              {feedback && (
                <div className={`text-sm font-bold flex items-center gap-1 mt-2 ${feedback.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {feedback.isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <BilingualText en={feedback.msgEn} bn={feedback.msgBn} />
                </div>
              )}
              
              <div className="flex gap-4 mt-3">
                {!feedback?.isCorrect && (
                  <button onClick={() => setShowHint(true)} className="text-xs text-amber-700 dark:text-amber-500 hover:underline">
                    <BilingualText en="Show Hint" bn="হিন্ট দেখাও" />
                  </button>
                )}
                {!feedback?.isCorrect && showHint && (
                  <button onClick={fillAnswer} className="text-xs text-amber-700 dark:text-amber-500 hover:underline">
                    <BilingualText en="Reveal Answer" bn="উত্তর বলে দাও" />
                  </button>
                )}
              </div>
              
              {showHint && !feedback?.isCorrect && (
                <div className="mt-2 p-2 bg-white dark:bg-slate-800 rounded text-xs text-slate-700 dark:text-slate-300 border border-amber-200 dark:border-amber-700">
                  <strong>Hint:</strong> <BilingualText en={currentStep.checkpoint.hintEn} bn={currentStep.checkpoint.hintBn} />
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
