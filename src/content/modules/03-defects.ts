import type { ModuleContent } from '../../types/content';

export const DefectModule: ModuleContent = {
  id: '03-defects',
  order: 3,
  title: {
    en: 'Point Defects in Solids',
    bn: 'কঠিন পদার্থে বিন্দু ত্রুটি'
  },
  learningObjectives: [
    { en: 'Identify different types of point defects (Vacancy, Interstitial, Schottky, Frenkel).', bn: 'বিভিন্ন ধরনের বিন্দু ত্রুটি (শূন্যস্থান, আন্তঃস্থলীয়, শটকি, ফ্রেঙ্কেল) শনাক্ত করা।' },
    { en: 'Understand how these defects affect the density of the crystal.', bn: 'এই ত্রুটিগুলি কীভাবে স্ফটিকের ঘনত্বকে প্রভাবিত করে তা বোঝা।' }
  ],
  prerequisiteConcepts: [{ en: 'Lattices and Unit Cells', bn: 'জালক এবং একক কোষ' }, { en: 'Density of a Unit Cell', bn: 'একক কোষের ঘনত্ব' }],
  sections: [
    {
      id: 's1',
      type: 'text',
      title: { en: 'What are Point Defects?', bn: 'বিন্দু ত্রুটি কী?' },
      content: {
        en: 'Point defects are irregularities or deviations from ideal arrangement around a point or an atom in a crystalline substance.',
        bn: 'বিন্দু ত্রুটি হলো একটি স্ফটিকাকার পদার্থের একটি বিন্দু বা পরমাণুর চারপাশে আদর্শ বিন্যাস থেকে অনিয়ম বা বিচ্যুতি।'
      }
    },
    {
      id: 's2',
      type: 'interactive_3d',
      title: { en: 'Defect Laboratory', bn: 'ত্রুটি ল্যাবরেটরি' },
      content: {
        en: 'Explore various point defects. Observe how particles are displaced, missing, or substituted, and note the effect on density.',
        bn: 'বিভিন্ন বিন্দু ত্রুটি অন্বেষণ করুন। লক্ষ্য করুন কীভাবে কণাগুলি বাস্তুচ্যুত, নিখোঁজ বা প্রতিস্থাপিত হয় এবং ঘনত্বের উপর প্রভাবটি লক্ষ্য করুন।'
      },
      modelConfig: { type: 'defect-lab' }
    }
  ],
  misconceptions: [
    {
      en: 'Misconception: Frenkel defect changes the density of the solid. Reality: Since the ion merely moves from its lattice site to an interstitial site within the same crystal, the mass and volume remain constant, so density is unchanged.',
      bn: 'ভুল ধারণা: ফ্রেঙ্কেল ত্রুটি কঠিন পদার্থের ঘনত্ব পরিবর্তন করে। বাস্তব: যেহেতু আয়নটি কেবল তার জালক স্থান থেকে একই স্ফটিকের মধ্যে একটি আন্তঃস্থলীয় স্থানে চলে যায়, তাই ভর এবং আয়তন স্থির থাকে, তাই ঘনত্ব অপরিবর্তিত থাকে।'
    }
  ],
  summary: [
    { en: 'Schottky and Vacancy defects decrease density. Frenkel defect keeps it constant. Interstitial defect increases it.', bn: 'শটকি এবং শূন্যস্থান ত্রুটি ঘনত্ব হ্রাস করে। ফ্রেঙ্কেল ত্রুটি এটি ধ্রুবক রাখে। আন্তঃস্থলীয় ত্রুটি এটি বৃদ্ধি করে।' }
  ],
  practiceQuestionIds: ['q3_defects'],
  glossaryReferences: ['pointDefect', 'schottkyDefect', 'frenkelDefect', 'vacancyDefect']
};
