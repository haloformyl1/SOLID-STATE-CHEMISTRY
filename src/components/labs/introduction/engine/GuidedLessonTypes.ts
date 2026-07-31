export interface AnimationAction {
  type: string;
  targetIds?: string[];
  payload?: any;
}

export interface GuidedLessonStep {
  id: string;

  titleEn: string;
  titleBn: string;

  narrationEn: string;
  narrationBn: string;

  whatHappenedEn: string;
  whatHappenedBn: string;

  whyItHappenedEn: string;
  whyItHappenedBn: string;

  observeEn: string;
  observeBn: string;

  durationMs: number;
  pauseAfterMs: number;

  actions: AnimationAction[];

  camera?: {
    position: [number, number, number];
    target: [number, number, number];
    transitionMs: number;
  };

  highlightedIds?: string[];
  dimUnrelated?: boolean;

  checkpoint?: {
    promptEn: string;
    promptBn: string;
    expectedResponse: unknown;
    hintEn: string;
    hintBn: string;
  };

  accessibilitySummaryEn: string;
  accessibilitySummaryBn: string;
}

export interface GuidedLessonSequence {
  id: string;
  titleEn: string;
  titleBn: string;
  steps: GuidedLessonStep[];
}
