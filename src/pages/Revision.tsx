import React from 'react';
import { FlashcardDeck } from '../components/practice/FlashcardDeck';
import { PageContainer } from '../components/ui/LayoutPrimitives';

export const Revision: React.FC = () => (
  <div className="w-full">
    <PageContainer><FlashcardDeck /></PageContainer>
  </div>
);
