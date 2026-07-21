import type { ModuleContent } from '../../types/content';

export const CrystalSystemsModule: ModuleContent = {
  id: '06-crystal-systems',
  order: 6,
  title: {
    en: 'Seven Crystal Systems and Fourteen Bravais Lattices',
    bn: 'সাতটি স্ফটিক তন্ত্র এবং চৌদ্দটি ব্রাভেই জালক'
  },
  learningObjectives: [
    {
      en: 'Identify the six unit-cell parameters (a, b, c, α, β, γ).',
      bn: 'ছয়টি একক কোষ পরামিতি (a, b, c, α, β, γ) শনাক্ত করা।'
    },
    {
      en: 'Understand the edge and angle relationships for the 7 crystal systems.',
      bn: '৭টি স্ফটিক তন্ত্রের প্রান্ত এবং কোণের সম্পর্ক বোঝা।'
    },
    {
      en: 'Recognize the 14 Bravais lattices and their distribution.',
      bn: '১৪টি ব্রাভেই জালক এবং তাদের বন্টন শনাক্ত করা।'
    }
  ],
  sections: [
    {
      id: 'sec-1',
      type: 'text',
      title: { en: 'Unit-Cell Parameters', bn: 'একক কোষ পরামিতি' },
      content: {
        en: 'A unit cell is characterized by six parameters: three edge lengths (a, b, c) and three interaxial angles (α between b and c, β between a and c, γ between a and b).',
        bn: 'একটি একক কোষ ছয়টি পরামিতি দ্বারা চিহ্নিত করা হয়: তিনটি প্রান্তের দৈর্ঘ্য (a, b, c) এবং তিনটি আন্তঃঅক্ষীয় কোণ (b ও c এর মধ্যে α, a ও c এর মধ্যে β, a ও b এর মধ্যে γ)।'
      }
    },
    {
      id: 'sec-2',
      type: 'comparison_table',
      modelConfig: { type: 'system-comparison' }
    },
    {
      id: 'sec-3',
      type: 'interactive_3d',
      modelConfig: { type: 'crystal-systems-explorer' }
    },
    {
      id: 'sec-4',
      type: 'interactive_3d',
      modelConfig: { type: 'morphing-animation' }
    },
    {
      id: 'sec-5',
      type: 'text',
      title: { en: 'Fourteen Bravais Lattices', bn: 'চৌদ্দটি ব্রাভেই জালক' },
      content: {
        en: 'There are exactly 14 possible three-dimensional space lattices, known as Bravais Lattices, distributed among the 7 crystal systems.',
        bn: 'ত্রিমাত্রিক স্থানে ঠিক ১৪টি সম্ভাব্য স্থানিক জালক রয়েছে, যা ব্রাভেই জালক নামে পরিচিত এবং ৭টি স্ফটিক তন্ত্রের মধ্যে বণ্টিত।'
      }
    },
    {
      id: 'sec-6',
      type: 'interactive_3d',
      modelConfig: { type: 'bravais-distribution' }
    }
  ],
  misconceptions: [
    {
      en: 'Thinking that α ≠ β ≠ γ automatically means no angles can be 90° in Triclinic (they just aren\'t necessarily 90°).',
      bn: 'ভাবা যে ট্রাইক্লিনিকে α ≠ β ≠ γ মানে কোনো কোণই 90° হতে পারবে না (তারা কেবল আবশ্যিকভাবে 90° নয়)।'
    },
    {
      en: 'Assuming all non-cubic systems have γ = 120°.',
      bn: 'মনে করা যে সমস্ত অ-ঘনকীয় তন্ত্রে γ = 120° থাকে।'
    },
    {
      en: 'Believing the morphing animation represents a real physical phase transition.',
      bn: 'রূপান্তর অ্যানিমেশনটিকে একটি বাস্তব দশা পরিবর্তন বলে মনে করা।'
    }
  ],
  summary: [
    {
      en: 'The 7 crystal systems are defined by symmetries in their edge lengths and angles.',
      bn: '৭টি স্ফটিক তন্ত্র তাদের প্রান্তের দৈর্ঘ্য এবং কোণের প্রতিসাম্য দ্বারা সংজ্ঞায়িত করা হয়।'
    },
    {
      en: 'These 7 systems yield exactly 14 Bravais lattices.',
      bn: 'এই ৭টি তন্ত্র থেকে ঠিক ১৪টি ব্রাভেই জালক পাওয়া যায়।'
    }
  ],
  practiceQuestionIds: ['q_sys_1', 'q_sys_2'],
  glossaryReferences: ['crystal_system', 'bravais_lattice']
};
