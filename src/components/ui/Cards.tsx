import React from 'react';
import { BilingualText } from '../BilingualText';
import { Book, Lightbulb, AlertTriangle, Calculator, Eye, CheckCircle2 } from 'lucide-react';

// 20. EDUCATIONAL CARD SYSTEM

export const DefinitionCard: React.FC<{ term: { en: string; bn: string }; definition: { en: string; bn: string } }> = ({ term, definition }) => (
  <div className="bg-[var(--surface-secondary)] border-l-4 border-[var(--accent-primary)] p-5 rounded-r-lg shadow-sm my-4 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-2 text-[var(--accent-primary)]">
      <Book className="w-5 h-5" />
      <h4 className="font-bold text-lg"><BilingualText en={term.en} bn={term.bn} /></h4>
    </div>
    <p className="text-[var(--text-primary)] leading-relaxed"><BilingualText en={definition.en} bn={definition.bn} /></p>
  </div>
);

export const ConceptCard: React.FC<{ title: { en: string; bn: string }; explanation: { en: string; bn: string } }> = ({ title, explanation }) => (
  <div className="bg-[var(--surface-elevated)] border border-[var(--border-default)] p-5 rounded-xl shadow-sm my-4 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-3 text-[var(--text-primary)]">
      <Lightbulb className="w-5 h-5 text-[var(--accent-secondary)]" />
      <h4 className="font-bold text-lg"><BilingualText en={title.en} bn={title.bn} /></h4>
    </div>
    <p className="text-[var(--text-secondary)] leading-relaxed"><BilingualText en={explanation.en} bn={explanation.bn} /></p>
  </div>
);

export const MisconceptionCard: React.FC<{ incorrect: { en: string; bn: string }; correct: { en: string; bn: string }; explanation?: { en: string; bn: string } }> = ({ incorrect, correct, explanation }) => (
  <div className="bg-[var(--surface-secondary)] border border-[var(--accent-amber)]/30 p-5 rounded-xl shadow-sm my-6 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--accent-amber)]"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-2">
      <div>
        <div className="flex items-center gap-2 text-[var(--error)] font-bold mb-2">
          <AlertTriangle className="w-4 h-4" />
          <span><BilingualText en="Incorrect" bn="ভুল ধারণা" /></span>
        </div>
        <p className="text-[var(--text-secondary)] italic line-through decoration-[var(--error)]/50 decoration-2"><BilingualText en={incorrect.en} bn={incorrect.bn} /></p>
      </div>
      <div>
        <div className="flex items-center gap-2 text-[var(--success)] font-bold mb-2">
          <CheckCircle2 className="w-4 h-4" />
          <span><BilingualText en="Correct" bn="সঠিক ধারণা" /></span>
        </div>
        <p className="text-[var(--text-primary)] font-medium"><BilingualText en={correct.en} bn={correct.bn} /></p>
      </div>
    </div>
    {explanation && (
      <div className="mt-4 pt-4 border-t border-[var(--border-default)] pl-2 text-[var(--text-secondary)] text-sm">
        <BilingualText en={explanation.en} bn={explanation.bn} />
      </div>
    )}
  </div>
);

export const FormulaCard: React.FC<{ formula: React.ReactNode; interpretation: { en: string; bn: string } }> = ({ formula, interpretation }) => (
  <div className="bg-[var(--formula-background)] border border-[var(--accent-violet)]/40 p-6 rounded-xl shadow-sm my-6 text-center hover:shadow-md transition-shadow">
    <div className="flex items-center justify-center gap-2 text-[var(--accent-violet)] mb-4 font-bold">
      <Calculator className="w-5 h-5" />
      <span><BilingualText en="Formula" bn="সূত্র" /></span>
    </div>
    <div className="text-2xl mb-4 overflow-x-auto py-2">
      {formula}
    </div>
    <div className="text-[var(--text-secondary)] text-sm bg-[var(--surface-primary)] p-3 rounded-lg inline-block border border-[var(--border-default)]">
      <BilingualText en={interpretation.en} bn={interpretation.bn} />
    </div>
  </div>
);

export const ObservationCard: React.FC<{ observe: { en: string; bn: string } }> = ({ observe }) => (
  <div className="bg-[var(--surface-secondary)] border-l-4 border-[var(--accent-secondary)] p-4 rounded-r-lg shadow-sm my-3 flex items-start gap-4">
    <Eye className="w-6 h-6 text-[var(--accent-secondary)] shrink-0 mt-0.5" />
    <p className="text-[var(--text-primary)] font-medium"><BilingualText en={observe.en} bn={observe.bn} /></p>
  </div>
);

export const ResultCard: React.FC<{ value: string; reasoning: { en: string; bn: string } }> = ({ value, reasoning }) => (
  <div className="bg-[var(--success)]/5 border border-[var(--success)]/20 p-5 rounded-xl shadow-sm my-4 flex flex-col items-center text-center">
    <div className="text-3xl font-extrabold text-[var(--success)] mb-2">{value}</div>
    <p className="text-[var(--text-secondary)]"><BilingualText en={reasoning.en} bn={reasoning.bn} /></p>
  </div>
);
