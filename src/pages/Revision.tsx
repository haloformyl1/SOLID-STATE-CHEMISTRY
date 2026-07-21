import React from 'react';
import { FlashcardDeck } from '../components/practice/FlashcardDeck';

export const Revision: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <FlashcardDeck />
    </div>
  );
};
