import React, { useEffect, useState } from 'react';
import {
  Compass,
  Eye,
  MonitorPlay,
  MousePointerClick,
  Pause,
  Play,
  RotateCcw,
  Settings2,
  SkipBack,
  SkipForward,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BilingualText } from '../../../BilingualText';
import type { GuidedLessonEngineProps, LessonMode } from './GuidedLessonTypes';

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25] as const;

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
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeCheckpoint, setActiveCheckpoint] = useState<number | null>(null);
  const [checkpointAnswer, setCheckpointAnswer] = useState<number | null>(null);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<Set<number>>(() => new Set());
  const prefersReducedMotion = useReducedMotion();
  const currentStep = steps[currentStepIndex];
  const checkpointIsCorrect = checkpointAnswer !== null
    && Boolean(currentStep.checkpointOptions?.[checkpointAnswer]?.isCorrect);

  useEffect(() => {
    if (!isPlaying || !isAnimationOn || mode !== 'guided') return;

    const checkpointPending = Boolean(
      currentStep.checkpointQuestion && !completedCheckpoints.has(currentStepIndex),
    );

    if (checkpointPending) {
      setIsPlaying(false);
      setActiveCheckpoint(currentStepIndex);
      return;
    }

    const delay = currentStep.delayBeforeNext ?? 3000;
    const timer = window.setTimeout(() => {
      if (currentStepIndex < steps.length - 1 && !currentStep.actionRequired) {
        setActiveCheckpoint(null);
        setCheckpointAnswer(null);
        onStepChange(currentStepIndex + 1);
      } else {
        setIsPlaying(false);
      }
    }, delay / speed);

    return () => window.clearTimeout(timer);
  }, [
    completedCheckpoints,
    currentStep,
    currentStepIndex,
    isAnimationOn,
    isPlaying,
    mode,
    onStepChange,
    speed,
    steps.length,
  ]);

  const moveToStep = (index: number) => {
    setActiveCheckpoint(null);
    setCheckpointAnswer(null);
    onStepChange(index);
  };

  const handleModeChange = (nextMode: LessonMode) => {
    setIsPlaying(false);
    setShowSettings(false);
    setActiveCheckpoint(null);
    setCheckpointAnswer(null);
    onModeChange(nextMode);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setShowSettings(false);
    setActiveCheckpoint(null);
    setCheckpointAnswer(null);
    setCompletedCheckpoints(new Set());
    onStepChange(0);
  };

  const handleAnimationChange = (enabled: boolean) => {
    if (!enabled) setIsPlaying(false);
    onAnimationToggle(enabled);
  };

  const continueFromCheckpoint = () => {
    setCompletedCheckpoints((completed) => new Set(completed).add(currentStepIndex));
    setActiveCheckpoint(null);
    setCheckpointAnswer(null);

    if (currentStepIndex < steps.length - 1) {
      onStepChange(currentStepIndex + 1);
      setIsPlaying(isAnimationOn);
    } else {
      setIsPlaying(false);
    }
  };

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: Math.max(0.16, 0.28 / speed) };

  return (
    <div className="guided-lesson-engine grid min-h-[620px] w-full flex-1 grid-cols-1 gap-4 overflow-y-auto bg-[var(--surface-secondary)] p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)] lg:overflow-hidden">
      <div className="guided-model-stage relative flex min-h-[430px] min-w-0 flex-col overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--border-strong)_55%,transparent)] bg-[var(--canvas-background)]">
        <div className="absolute left-3 top-3 z-20 flex max-w-[calc(100%-24px)] gap-1 rounded-xl border border-white/10 bg-[color-mix(in_srgb,var(--canvas-surface)_92%,transparent)] p-1.5 shadow-lg backdrop-blur-md sm:left-4 sm:top-4 sm:gap-1.5">
          <button
            type="button"
            onClick={() => handleModeChange('guided')}
            className={`flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-bold transition-colors sm:px-3 ${mode === 'guided' ? 'bg-[var(--accent-primary)] text-[var(--button-primary-text)] shadow-sm' : 'text-sky-100/80 hover:bg-white/10 hover:text-white'}`}
            aria-pressed={mode === 'guided'}
          >
            <MonitorPlay className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Guided</span>
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('challenge')}
            className={`flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-bold transition-colors sm:px-3 ${mode === 'challenge' ? 'bg-[var(--accent-amber)] text-[#071923] shadow-sm' : 'text-sky-100/80 hover:bg-white/10 hover:text-white'}`}
            aria-pressed={mode === 'challenge'}
          >
            <MousePointerClick className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Challenge</span>
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('explore')}
            className={`flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-bold transition-colors sm:px-3 ${mode === 'explore' ? 'bg-[var(--accent-secondary)] text-[#04131d] shadow-sm' : 'text-sky-100/80 hover:bg-white/10 hover:text-white'}`}
            aria-pressed={mode === 'explore'}
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Explore</span>
          </button>
        </div>

        {mode === 'guided' && (
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-white/10 bg-[color-mix(in_srgb,var(--canvas-surface)_94%,transparent)] p-1.5 text-sky-100 shadow-xl backdrop-blur-md sm:bottom-4 sm:gap-1.5 sm:p-2">
            <button
              type="button"
              onClick={() => moveToStep(currentStepIndex - 1)}
              disabled={currentStepIndex === 0}
              className="grid h-10 w-10 place-items-center rounded-lg transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous step"
            >
              <SkipBack className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying((playing) => !playing)}
              disabled={!isAnimationOn}
              className="grid h-12 w-12 place-items-center rounded-full bg-[var(--accent-primary)] text-[var(--button-primary-text)] shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:scale-100"
              aria-label={isPlaying ? 'Pause guided animation' : 'Play guided animation'}
              aria-pressed={isPlaying}
              title={isAnimationOn ? undefined : 'Turn animation on in settings to use autoplay'}
            >
              {isPlaying ? <Pause className="h-6 w-6" aria-hidden="true" /> : <Play className="ml-0.5 h-6 w-6" aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => moveToStep(currentStepIndex + 1)}
              disabled={currentStepIndex === steps.length - 1}
              className="grid h-10 w-10 place-items-center rounded-lg transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next step"
            >
              <SkipForward className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="mx-1 h-6 w-px bg-white/15" aria-hidden="true" />
            <button type="button" onClick={handleRestart} className="grid h-10 w-10 place-items-center rounded-lg transition-colors hover:bg-white/10" aria-label="Restart lesson">
              <RotateCcw className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSettings((open) => !open)}
                className="grid h-10 w-10 place-items-center rounded-lg transition-colors hover:bg-white/10"
                aria-label="Animation settings"
                aria-expanded={showSettings}
              >
                <Settings2 className="h-5 w-5" aria-hidden="true" />
              </button>
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={transition}
                    className="absolute bottom-full right-0 mb-2 w-52 rounded-xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-3 text-[var(--text-secondary)] shadow-[var(--shadow-modal)]"
                  >
                    <button type="button" onClick={() => setShowSettings(false)} className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-md text-[var(--text-muted)] hover:bg-[var(--hover-state)] hover:text-[var(--text-primary)]" aria-label="Close animation settings">
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <div>
                      <span className="mb-2 block pr-8 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">Animation</span>
                      <div className="grid grid-cols-2 gap-1 rounded-lg bg-[var(--surface-elevated)] p-1">
                        {[true, false].map((enabled) => (
                          <button
                            type="button"
                            key={String(enabled)}
                            onClick={() => handleAnimationChange(enabled)}
                            className={`rounded-md py-1.5 text-xs font-bold ${isAnimationOn === enabled ? 'bg-[var(--accent-primary)] text-[var(--button-primary-text)] shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[var(--hover-state)]'}`}
                            aria-pressed={isAnimationOn === enabled}
                          >
                            {enabled ? 'On' : 'Off'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">Speed</span>
                      <div className="grid grid-cols-4 gap-1 rounded-lg bg-[var(--surface-elevated)] p-1">
                        {SPEED_OPTIONS.map((option) => (
                          <button
                            type="button"
                            key={option}
                            onClick={() => onSpeedChange(option)}
                            className={`rounded-md py-1.5 text-[11px] font-bold ${speed === option ? 'bg-[var(--accent-primary)] text-[var(--button-primary-text)] shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[var(--hover-state)]'}`}
                            aria-pressed={speed === option}
                          >
                            {option}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        <div className="relative flex min-h-[430px] flex-1 items-center justify-center">
          {children}
        </div>
      </div>

      <aside className="guided-narration-panel flex min-h-0 w-full flex-col gap-4 overflow-y-auto pr-1" aria-label="Lesson narration">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3 py-2 text-xs font-bold text-[var(--text-muted)]">
          <span>Step {currentStepIndex + 1} of {steps.length}</span>
          <span className="truncate text-[var(--text-primary)]">{currentStep.id.replaceAll('-', ' ')}</span>
        </div>

        {mode === 'explore' ? (
          <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 text-center text-[var(--text-secondary)] shadow-[var(--shadow-low)]">
            <Compass className="mb-4 h-12 w-12 text-[var(--accent-secondary)]" aria-hidden="true" />
            <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)]"><BilingualText en="Explore Mode" bn="অন্বেষণ মোড" /></h3>
            <p className="text-sm leading-relaxed"><BilingualText en="Freely rotate, zoom, and interact with the model. Switch to Guided mode for a step-by-step explanation." bn="মডেলটি স্বাধীনভাবে ঘোরান, জুম করুন এবং ব্যবহার করুন। ধাপে ধাপে ব্যাখ্যার জন্য নির্দেশিত মোডে যান।" /></p>
          </div>
        ) : mode === 'challenge' ? (
          <div className="rounded-xl border border-[color-mix(in_srgb,var(--accent-amber)_38%,var(--border-default))] bg-[color-mix(in_srgb,var(--accent-amber)_8%,var(--surface-primary))] p-6 shadow-[var(--shadow-low)]">
            <div className="mb-4 flex items-center gap-2 border-b border-[color-mix(in_srgb,var(--accent-amber)_28%,transparent)] pb-3 font-bold text-[var(--accent-amber)]">
              <MousePointerClick className="h-5 w-5" aria-hidden="true" />
              <BilingualText en="Interactive Challenge" bn="ইন্টার্যাক্টিভ অনুশীলন" />
            </div>
            <div className="text-sm leading-relaxed text-[var(--text-secondary)]">
              <BilingualText en="Use the controls on the model to test the idea for yourself. Your model state stays intact when you enter fullscreen." bn="ধারণাটি নিজে যাচাই করতে মডেলের নিয়ন্ত্রণগুলি ব্যবহার করুন। ফুলস্ক্রিনে গেলেও মডেলের বর্তমান অবস্থা অক্ষুণ্ণ থাকে।" />
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -16 }}
              transition={transition}
              className="flex flex-col gap-4"
            >
              <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-5 shadow-[var(--shadow-low)]">
                <div className="absolute inset-y-0 left-0 w-1 bg-[var(--accent-primary)]" aria-hidden="true" />
                <h4 className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--accent-primary)]"><BilingualText en="What happened?" bn="কী ঘটল?" /></h4>
                <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]"><BilingualText key={`${currentStep.id}-narration`} en={currentStep.narration.en} bn={currentStep.narration.bn} /></p>
              </div>

              {currentStep.explanation.en && (
                <div className="relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-5 shadow-[var(--shadow-low)]">
                  <div className="absolute inset-y-0 left-0 w-1 bg-[var(--accent-secondary)]" aria-hidden="true" />
                  <h4 className="mb-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--accent-secondary)]"><BilingualText en="Why did it happen?" bn="কেন ঘটল?" /></h4>
                  <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]"><BilingualText key={`${currentStep.id}-explanation`} en={currentStep.explanation.en} bn={currentStep.explanation.bn} /></p>
                </div>
              )}

              {currentStep.observation.en && (
                <div className="rounded-xl border border-[color-mix(in_srgb,var(--accent-primary)_28%,var(--border-default))] bg-[var(--narration-background)] p-5 shadow-[var(--shadow-low)]">
                  <h4 className="mb-2 flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--accent-primary)]">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    <BilingualText en="Observation" bn="পর্যবেক্ষণ" />
                  </h4>
                  <p className="text-[15px] font-medium leading-relaxed text-[var(--text-secondary)]"><BilingualText key={`${currentStep.id}-observation`} en={currentStep.observation.en} bn={currentStep.observation.bn} /></p>
                </div>
              )}

              {currentStep.checkpointQuestion && activeCheckpoint === currentStepIndex && (
                <div className="mt-1 rounded-xl border border-[color-mix(in_srgb,var(--accent-amber)_42%,var(--border-default))] bg-[color-mix(in_srgb,var(--accent-amber)_8%,var(--surface-primary))] p-5 shadow-[var(--shadow-low)]">
                  <h4 className="mb-3 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--accent-amber)]"><BilingualText en="Prediction Checkpoint" bn="পূর্বাভাস চেকপয়েন্ট" /></h4>
                  <p className="mb-4 text-[15px] font-bold text-[var(--text-primary)]"><BilingualText key={`${currentStep.id}-question`} en={currentStep.checkpointQuestion.en} bn={currentStep.checkpointQuestion.bn} /></p>
                  <div className="flex flex-col gap-2">
                    {currentStep.checkpointOptions?.map((option, index) => {
                      const selected = checkpointAnswer === index;
                      const answered = checkpointAnswer !== null;
                      const answerStyle = !answered
                        ? 'border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:border-[var(--border-interactive)] hover:bg-[var(--hover-state)]'
                        : option.isCorrect
                          ? 'border-[var(--success)] bg-[color-mix(in_srgb,var(--success)_10%,var(--surface-primary))] font-bold text-[var(--success)]'
                          : selected
                            ? 'border-[var(--error)] bg-[color-mix(in_srgb,var(--error)_9%,var(--surface-primary))] text-[var(--error)]'
                            : 'border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-muted)] opacity-55';

                      return (
                        <button
                          type="button"
                          key={index}
                          onClick={() => checkpointAnswer === null && setCheckpointAnswer(index)}
                          disabled={answered}
                          className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${answerStyle}`}
                        >
                          <BilingualText en={option.text.en} bn={option.text.bn} />
                        </button>
                      );
                    })}
                  </div>

                  {checkpointAnswer !== null && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition} className="mt-4 rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)] p-3 text-sm text-[var(--text-secondary)]">
                      {checkpointIsCorrect ? (
                        <BilingualText key={`${currentStep.id}-feedback`} en={currentStep.checkpointFeedback?.en ?? 'Correct.'} bn={currentStep.checkpointFeedback?.bn ?? 'সঠিক।'} />
                      ) : (
                        <BilingualText en="Not quite. Review the highlighted correct answer, then try again." bn="পুরোপুরি সঠিক নয়। চিহ্নিত সঠিক উত্তরটি দেখে আবার চেষ্টা করুন।" />
                      )}
                      <button
                        type="button"
                        onClick={checkpointIsCorrect ? continueFromCheckpoint : () => setCheckpointAnswer(null)}
                        className="mt-3 block font-bold text-[var(--accent-primary)] hover:underline"
                      >
                        {checkpointIsCorrect
                          ? <BilingualText en="Continue lesson" bn="পাঠ চালিয়ে যান" />
                          : <BilingualText en="Try again" bn="আবার চেষ্টা করুন" />}
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </aside>
    </div>
  );
};
