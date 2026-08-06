export type LessonMode = 'guided' | 'challenge' | 'explore';

export interface BilingualString {
  en: string;
  bn: string;
}

export interface AnimationStep {
  id: string;
  narration: BilingualString;
  explanation: BilingualString;
  observation: BilingualString;
  actionRequired?: boolean;
  actionHint?: BilingualString;
  actionSuccessMessage?: BilingualString;
  checkpointQuestion?: BilingualString;
  checkpointOptions?: { text: BilingualString; isCorrect: boolean }[];
  checkpointFeedback?: BilingualString;
  delayBeforeNext?: number;
}

export interface GuidedLessonEngineProps {
  steps: AnimationStep[];
  currentStepIndex: number;
  mode: LessonMode;
  onModeChange: (mode: LessonMode) => void;
  onStepChange: (index: number) => void;
  onAnimationToggle: (isOn: boolean) => void;
  onSpeedChange: (speed: number) => void;
  isAnimationOn: boolean;
  speed: number;
  children: React.ReactNode;
  onUserAction?: (actionId: string, payload: any) => boolean; // returns true if successful
  bottomControlsOverlay?: (timelineControls: React.ReactNode | null) => React.ReactNode;
}
