import React, { useState } from 'react';
import { FLASHCARD_DECK } from '../../content/flashcards';
import { BilingualText } from '../BilingualText';
import { ChevronLeft, ChevronRight, Rotate3D } from 'lucide-react';

export const FlashcardDeck: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const card = FLASHCARD_DECK[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % FLASHCARD_DECK.length);
    }, 150); // slight delay to flip back before changing content
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + FLASHCARD_DECK.length) % FLASHCARD_DECK.length);
    }, 150);
  };

  return (
    <div className="max-w-2xl mx-auto my-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          <BilingualText en="Revision Flashcards" bn="রিভিশন ফ্ল্যাশকার্ড" />
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          <BilingualText 
            en="Click on the card to flip and reveal the definition." 
            bn="সংজ্ঞাটি দেখতে কার্ডে ক্লিক করে উল্টে নিন।" 
          />
        </p>
      </div>

      <div className="flex items-center gap-6 justify-center">
        <button 
          onClick={handlePrev}
          className="p-3 rounded-full glass-panel border border-[var(--border-sub)] shadow-sm hover:bg-[var(--bg-sec)] transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </button>

        <div className="relative w-full max-w-md aspect-[4/3] perspective-1000">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full h-full cursor-pointer transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of card (Term) */}
            <div 
              className="absolute w-full h-full backface-hidden glass-panel rounded-2xl shadow-xl border border-[var(--border-sub)] p-8 flex flex-col items-center justify-center text-center"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h3 className="text-3xl font-bold text-primary mb-6">
                <BilingualText en={card.term.en} bn={card.term.bn} />
              </h3>
              <div className="flex items-center gap-2 text-slate-400 font-medium">
                <Rotate3D className="w-5 h-5" />
                <BilingualText en="Click to flip" bn="উল্টাতে ক্লিক করুন" />
              </div>
            </div>

            {/* Back of card (Definition) */}
            <div 
              className="absolute w-full h-full backface-hidden bg-[var(--acc-prim)] rounded-2xl shadow-xl border border-[var(--acc-sec)] p-8 flex flex-col items-center justify-center text-center rotate-y-180 text-white"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-80">
                <BilingualText en={card.term.en} bn={card.term.bn} />
              </h4>
              <p className="text-xl leading-relaxed">
                <BilingualText en={card.definition.en} bn={card.definition.bn} />
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={handleNext}
          className="p-3 rounded-full glass-panel border border-[var(--border-sub)] shadow-sm hover:bg-[var(--bg-sec)] transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </button>
      </div>

      <div className="text-center mt-6 font-medium text-slate-500 dark:text-slate-400">
        {currentIndex + 1} / {FLASHCARD_DECK.length}
      </div>
    </div>
  );
};
