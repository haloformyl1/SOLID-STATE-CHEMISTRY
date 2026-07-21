import type { ModuleContent } from '../../types/content';

export const VoidsModule: ModuleContent = {
  id: '07-voids',
  order: 7,
  title: {
    en: 'Types of Voids',
    bn: 'শূন্যস্থানের প্রকারভেদ'
  },
  learningObjectives: [
    {
      en: 'Differentiate between Tetrahedral and Octahedral voids.',
      bn: 'চতুস্তলকীয় এবং অষ্টতলকীয় শূন্যস্থানের মধ্যে পার্থক্য করা।'
    },
    {
      en: 'Determine the coordination number and number of voids per atom.',
      bn: 'সর্বাঙ্ক সংখ্যা এবং প্রতি পরমাণুতে শূন্যস্থানের সংখ্যা নির্ধারণ করা।'
    },
    {
      en: 'Understand how an octahedral void is formed from two triangular layers.',
      bn: 'কীভাবে দুটি ত্রিভুজাকার স্তর থেকে একটি অষ্টতলকীয় শূন্যস্থান গঠিত হয় তা বোঝা।'
    }
  ],
  sections: [
    {
      id: 'sec-1',
      type: 'text',
      title: { en: 'Interstitial Voids', bn: 'অন্তর্বর্তী শূন্যস্থান' },
      content: {
        en: 'In close-packed structures (like CCP and HCP), the spheres leave some empty space between them. These empty spaces are called interstitial voids or holes.',
        bn: 'নিবিড় সন্নিবেশিত গঠনে (যেমন CCP এবং HCP), গোলকগুলির মাঝে কিছু ফাঁকা স্থান থেকে যায়। এই ফাঁকা স্থানগুলোকে অন্তর্বর্তী শূন্যস্থান বা গর্ত বলা হয়।'
      }
    },
    {
      id: 'sec-2',
      type: 'interactive_3d',
      modelConfig: { type: 'void-explorer' }
    },
    {
      id: 'sec-3',
      type: 'comparison_table',
      modelConfig: { type: 'void-comparison' }
    },
    {
      id: 'sec-4',
      type: 'interactive_3d',
      modelConfig: { type: 'guided-void' }
    },
    {
      id: 'sec-5',
      type: 'text',
      title: { en: 'Voids Between A and B Layers', bn: 'A এবং B স্তরের মধ্যে শূন্যস্থান' },
      content: {
        en: 'Where a B-layer particle lies above a triangular depression of the A-layer, a tetrahedral void is formed. Where an unoccupied depression in the A-layer aligns with one in the B-layer, an octahedral void is formed.',
        bn: 'যেখানে B-স্তরের কণা A-স্তরের ত্রিভুজাকার খাঁজের উপরে থাকে, সেখানে একটি চতুস্তলকীয় শূন্যস্থান তৈরি হয়। যেখানে A-স্তরের একটি খালি খাঁজ B-স্তরের খাঁজের সাথে সারিবদ্ধ হয়, সেখানে একটি অষ্টতলকীয় শূন্যস্থান তৈরি হয়।'
      }
    },
    {
      id: 'sec-5_misconception',
      type: 'misconception',
      modelConfig: {
        incorrect: { en: 'A transparent void marker represents a real particle.', bn: 'একটি স্বচ্ছ শূন্যস্থান নির্দেশক একটি বাস্তব কণা বোঝায়।' },
        correct: { en: 'The marker only indicates the position of empty space.', bn: 'নির্দেশকটি কেবল ফাঁকা স্থানের অবস্থান নির্দেশ করে।' }
      }
    },
    {
      id: 'sec-6',
      type: 'interactive_3d',
      modelConfig: { type: 'void-cross-section' }
    }
  ],
  misconceptions: [
    {
      en: 'Confusing tetrahedral geometry (4 atoms) with octahedral geometry (6 atoms).',
      bn: 'চতুস্তলকীয় জ্যামিতি (৪টি পরমাণু) এবং অষ্টতলকীয় জ্যামিতির (৬টি পরমাণু) মধ্যে বিভ্রান্ত হওয়া।'
    },
    {
      en: 'Assuming there are fewer tetrahedral voids than octahedral voids (TVs are 2x OVs).',
      bn: 'মনে করা যে অষ্টতলকীয় শূন্যস্থানের চেয়ে চতুস্তলকীয় শূন্যস্থান কম থাকে (প্রকৃতপক্ষে TV এর সংখ্যা OV এর দ্বিগুণ)।'
    }
  ],
  summary: [
    {
      en: 'A tetrahedral void is surrounded by 4 spheres. There are 2N tetrahedral voids for N atoms.',
      bn: 'একটি চতুস্তলকীয় শূন্যস্থান ৪টি গোলক দ্বারা বেষ্টিত থাকে। N টি পরমাণুর জন্য 2N টি চতুস্তলকীয় শূন্যস্থান থাকে।'
    },
    {
      en: 'An octahedral void is surrounded by 6 spheres. There are N octahedral voids for N atoms.',
      bn: 'একটি অষ্টতলকীয় শূন্যস্থান ৬টি গোলক দ্বারা বেষ্টিত থাকে। N টি পরমাণুর জন্য N টি অষ্টতলকীয় শূন্যস্থান থাকে।'
    }
  ],
  practiceQuestionIds: ['q_void_1', 'q_void_2'],
  glossaryReferences: ['void', 'tetrahedral_void', 'octahedral_void', 'coordination_number']
};
