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
    <div className="mx-auto my-4 max-w-5xl">
      <div className="text-center mb-10 animate-fade-in-down">
        <h2 className="text-4xl font-extrabold text-[var(--text-primary)] mb-3 tracking-tight">
          <BilingualText en="Revision Flashcards" bn="রিভিশন ফ্ল্যাশকার্ড" />
        </h2>
        <p className="text-lg text-[var(--text-secondary)]">
          <BilingualText 
            en="Click on the card to flip and reveal the definition." 
            bn="সংজ্ঞাটি দেখতে কার্ডে ক্লিক করে উল্টে নিন।" 
          />
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 justify-center animate-fade-in-up">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous flashcard"
          className="hidden sm:flex p-4 rounded-full bg-[var(--surface-primary)] border border-[var(--border-default)] shadow-sm hover:bg-[var(--hover-state)] hover:text-[var(--accent-primary)] text-[var(--text-secondary)] transition-all focus:outline-none focus:ring-4 focus:ring-[var(--focus-ring)]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative w-full max-w-lg aspect-[4/3] perspective-1000">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setIsFlipped(!isFlipped);
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={isFlipped}
            aria-label={isFlipped ? 'Show flashcard term' : 'Show flashcard definition'}
            className={`w-full h-full cursor-pointer transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of card (Term) */}
            <div 
              className="absolute h-full w-full backface-hidden flex flex-col items-center justify-center rounded-[var(--radius-lg)] border-2 border-[var(--border-default)] bg-[var(--surface-primary)] p-8 text-center shadow-[var(--shadow-medium)] transition-colors hover:border-[var(--border-interactive)] sm:p-10"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-[var(--accent-primary)] mb-8 leading-tight">
                <BilingualText en={card.term.en} bn={card.term.bn} />
              </h3>
              <div className="flex items-center gap-2 text-[var(--text-muted)] font-medium bg-[var(--surface-secondary)] px-4 py-2 rounded-full border border-[var(--border-default)] mt-auto">
                <Rotate3D className="w-5 h-5" />
                <BilingualText en="Click to flip" bn="উল্টাতে ক্লিক করুন" />
              </div>
            </div>

            {/* Back of card (Definition) */}
            <div 
              className="absolute h-full w-full backface-hidden flex rotate-y-180 flex-col items-center justify-center rounded-[var(--radius-lg)] border border-[var(--accent-primary)] bg-[var(--canvas-surface)] p-8 text-center text-white shadow-[var(--shadow-medium)] sm:p-10"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/80 border-b border-white/20 pb-2 w-full text-center">
                <BilingualText en={card.term.en} bn={card.term.bn} />
              </h4>
              <p className="text-xl sm:text-2xl leading-relaxed font-medium">
                <BilingualText en={card.definition.en} bn={card.definition.bn} />
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next flashcard"
          className="hidden sm:flex p-4 rounded-full bg-[var(--surface-primary)] border border-[var(--border-default)] shadow-sm hover:bg-[var(--hover-state)] hover:text-[var(--accent-primary)] text-[var(--text-secondary)] transition-all focus:outline-none focus:ring-4 focus:ring-[var(--focus-ring)]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile controls */}
      <div className="flex sm:hidden items-center justify-center gap-8 mt-8">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous flashcard"
          className="p-4 rounded-full bg-[var(--surface-primary)] border border-[var(--border-default)] shadow-sm hover:bg-[var(--hover-state)] text-[var(--text-secondary)]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next flashcard"
          className="p-4 rounded-full bg-[var(--surface-primary)] border border-[var(--border-default)] shadow-sm hover:bg-[var(--hover-state)] text-[var(--text-secondary)]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center mt-8 font-bold text-[var(--text-muted)] tracking-wider">
        <span className="text-[var(--text-primary)]">{currentIndex + 1}</span> / {FLASHCARD_DECK.length}
      </div>
    </div>
  );
};
