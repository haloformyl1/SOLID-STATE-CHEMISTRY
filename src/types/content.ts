export interface BilingualString {
  en: string;
  bn: string;
}

export interface Hint {
  id: string;
  order: number;
  content: BilingualString;
}

export interface Question {
  id: string;
  topic: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  skillType: 'conceptual' | 'numerical' | 'visual' | 'application';
  type: 'mcq' | 'true_false' | 'assertion_reason' | 'short_answer' | 'calculation' | 'identification';
  question: BilingualString;
  options?: BilingualString[]; // For MCQs
  correctAnswer: string | number | boolean;
  explanation: BilingualString;
  commonWrongAnswerExplanation?: BilingualString;
  hints: Hint[];
}

export interface SectionContent {
  id: string;
  type: 'text' | 'formula' | 'example' | 'interactive_3d' | 'interactive_2d' | 'image' | 'warning' | 'advanced_insight' | 'concept_map' | 'comparison_table' | 'misconception';
  title?: BilingualString;
  content?: BilingualString;
  formulaTex?: string;
  modelConfig?: any; // Will be typed based on 3D models
}

export interface ModuleContent {
  id: string;
  order: number;
  title: BilingualString;
  learningObjectives: BilingualString[];
  sections: SectionContent[];
  misconceptions: BilingualString[];
  summary: BilingualString[];
  practiceQuestionIds: string[];
  glossaryReferences: string[];
  isAdvanced?: boolean;
  prerequisiteConcepts?: BilingualString[];
}

// Ensure the max MCQ constraint is respected globally in the question bank logic.
