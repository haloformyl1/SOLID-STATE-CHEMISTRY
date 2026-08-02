import type { ModuleContent } from '../../types/content';


export const UnitCellModule: ModuleContent = {
  id: '01-unit-cell',
  order: 1,
  title: {
    en: 'Lattices and Unit Cells',
    bn: 'জালক এবং একক কোষ'
  },
  learningObjectives: [
    { en: 'Understand the difference between a lattice and a lattice point.', bn: 'জালক এবং জালক বিন্দুর মধ্যে পার্থক্য বোঝা।' },
    { en: 'Define a unit cell and understand its role in a crystal lattice.', bn: 'একক কোষের সংজ্ঞা দেওয়া এবং স্ফটিক জালকে এর ভূমিকা বোঝা।' },
    { en: 'Identify Simple Cubic (SC), Body-Centred Cubic (BCC), and Face-Centred Cubic (FCC) unit cells.', bn: 'সরল ঘনকাকার (SC), দেহ-কেন্দ্রিক ঘনকাকার (BCC) এবং পৃষ্ঠ-কেন্দ্রিক ঘনকাকার (FCC) একক কোষ শনাক্ত করা।' }
  ],
  prerequisiteConcepts: [],
  sections: [
    {
      id: 's1',
      type: 'text',
      title: { en: 'What is a Crystal Lattice?', bn: 'স্ফটিক জালক কী?' },
      content: {
        en: 'A crystal lattice is a regular, repeating three-dimensional arrangement of points in space. Each point, called a lattice point, represents the position of a constituent particle (atom, ion, or molecule).',
        bn: 'স্ফটিক জালক হলো ত্রিমাত্রিক স্থানে বিন্দুগুলির একটি নিয়মিত, পুনরাবৃত্তিমূলক বিন্যাস। প্রতিটি বিন্দু, যাকে জালক বিন্দু বলা হয়, একটি গঠনকারী কণার (পরমাণু, আয়ন বা অণু) অবস্থান নির্দেশ করে।'
      },
      modelConfig: { type: 'lattice-builder' }
    },
    {
      id: 's2',
      type: 'text',
      title: { en: 'What is a Unit Cell?', bn: 'একক কোষ কী?' },
      content: {
        en: 'A unit cell is the smallest repeating portion of a crystal lattice. When repeated in different directions, it generates the entire crystal lattice, much like a single brick is repeated to build a wall.',
        bn: 'একক কোষ হলো স্ফটিক জালকের ক্ষুদ্রতম পুনরাবৃত্তিমূলক অংশ। এটি বিভিন্ন দিকে পুনরাবৃত্ত হলে সম্পূর্ণ স্ফটিক জালক তৈরি করে, ঠিক যেমন একটি ইট বারবার ব্যবহার করে একটি দেওয়াল তৈরি হয়।'
      },
      modelConfig: { type: 'unit-cell-sharing' }
    },
    {
      id: 's3',
      type: 'interactive_3d',
      title: { en: 'Types of Cubic Unit Cells', bn: 'ঘনকাকার একক কোষের প্রকারভেদ' },
      content: {
        en: 'There are three main types of cubic unit cells studied in this syllabus: Simple Cubic (SC), Body-Centred Cubic (BCC), and Face-Centred Cubic (FCC). Explore them below.',
        bn: 'এই সিলেবাসে তিনটি প্রধান প্রকারের ঘনকাকার একক কোষ অধ্যয়ন করা হয়: সরল ঘনকাকার (SC), দেহ-কেন্দ্রিক ঘনকাকার (BCC) এবং পৃষ্ঠ-কেন্দ্রিক ঘনকাকার (FCC)। নিচে সেগুলি অন্বেষণ করুন।'
      },
      modelConfig: { type: 'unit-cell-selector' }
    },
    {
      id: 's4',
      type: 'interactive_3d',
      title: { en: 'Atom Sharing in a Lattice', bn: 'জালকে পরমাণু ভাগাভাগি' },
      content: {
        en: 'A constituent particle located at the corner, edge, or face of a unit cell is shared by neighbouring unit cells. Only a fraction of that particle actually belongs to a single unit cell.',
        bn: 'একটি একক কোষের কোণে, প্রান্তে বা পৃষ্ঠে অবস্থিত একটি গঠনকারী কণা পার্শ্ববর্তী একক কোষগুলি দ্বারা ভাগ করা হয়। সেই কণার কেবল একটি ভগ্নাংশই একটি নির্দিষ্ট একক কোষের অন্তর্গত।'
      },
      modelConfig: { type: 'atom-sharing' }
    },
    {
      id: 's5',
      type: 'text',
      title: { en: 'Relationship Between CCP and FCC', bn: 'CCP এবং FCC এর মধ্যে সম্পর্ক' },
      content: {
        en: 'Cubic close packing is the ABCABC layer-stacking description of the same structure whose conventional cubic unit cell is face-centred cubic (FCC). CCP describes the stacking arrangement, while FCC describes the conventional cubic unit cell.',
        bn: 'ঘনকীয় ঘন সন্নিবেশ হলো একই গঠনের ABCABC স্তরবিন্যাসের বর্ণনা, যার প্রচলিত ঘনকীয় একক কোষ তলকেন্দ্রিক ঘনকীয় (FCC)। CCP স্তরবিন্যাস বর্ণনা করে, অন্যদিকে FCC প্রচলিত ঘনকীয় একক কোষ বর্ণনা করে।'
      }
    },
    {
      id: 's5_misconception',
      type: 'misconception',
      modelConfig: {
        incorrect: { en: 'CCP and FCC are two unrelated structures.', bn: 'CCP এবং FCC দুটি সম্পর্কহীন গঠন।' },
        correct: { en: 'CCP describes ABCABC stacking, while FCC describes the conventional cubic unit cell of the same structure.', bn: 'CCP ABCABC স্তরবিন্যাস বর্ণনা করে, অন্যদিকে FCC একই গঠনের প্রচলিত ঘনকীয় একক কোষ বর্ণনা করে।' }
      }
    },
    {
      id: 's6',
      type: 'interactive_3d',
      modelConfig: { type: 'ccp-fcc-transformation' }
    },
    {
      id: 's7',
      type: 'text',
      title: { en: 'Counting Atoms in the Conventional HCP Unit Cell', bn: 'প্রচলিত HCP একক কোষে পরমাণু গণনা' },
      content: {
        en: 'The conventional HCP unit cell is a hexagonal prism containing 12 corner particles, 2 face-centred particles, and 3 internal particles. Total effective atoms (Z) = (12 × 1/6) + (2 × 1/2) + 3 = 6.',
        bn: 'প্রচলিত HCP একক কোষ হলো একটি ষড়ভুজাকার প্রিজম যার ১২টি কোণের কণা, ২টি পৃষ্ঠকেন্দ্রিক কণা এবং ৩টি অভ্যন্তরীণ কণা রয়েছে। মোট কার্যকর পরমাণু (Z) = (১২ × ১/৬) + (২ × ১/২) + ৩ = ৬।'
      }
    },
    {
      id: 's7_misconception',
      type: 'misconception',
      modelConfig: {
        incorrect: { en: 'The conventional HCP unit cell contains two atoms.', bn: 'প্রচলিত HCP একক কোষে দুটি পরমাণু থাকে।' },
        correct: { en: 'The commonly drawn conventional HCP unit cell contains 6 atoms. Its primitive cell contains 2 atoms.', bn: 'প্রচলিতভাবে অঙ্কিত HCP একক কোষে 6টি পরমাণু থাকে। এর আদিম কোষে 2টি পরমাণু থাকে।' }
      }
    },
    {
      id: 's8',
      type: 'interactive_3d',
      modelConfig: { type: 'hcp-atom-counter' }
    },
    {
      id: 's9',
      type: 'text',
      title: { en: 'Counting Atoms in the Conventional FCC Unit Cell', bn: 'প্রচলিত FCC একক কোষে পরমাণু গণনা' },
      content: {
        en: 'The conventional FCC unit cell contains 8 corner particles and 6 face-centred particles. Total effective atoms (Z) = (8 × 1/8) + (6 × 1/2) = 4.',
        bn: 'প্রচলিত FCC একক কোষে ৮টি কোণের কণা এবং ৬টি পৃষ্ঠকেন্দ্রিক কণা রয়েছে। মোট কার্যকর পরমাণু (Z) = (৮ × ১/৮) + (৬ × ১/২) = ৪।'
      }
    },
    {
      id: 's10',
      type: 'interactive_3d',
      modelConfig: { type: 'fcc-atom-counter' }
    }
  ],
  misconceptions: [
    {
      en: 'Misconception: A lattice point is the same as an atom. Reality: A lattice point is just a geometric position in space; an atom or molecule is the actual particle placed at that position.',
      bn: 'ভুল ধারণা: জালক বিন্দু এবং পরমাণু একই। বাস্তব: জালক বিন্দু হলো কেবল স্থানের একটি জ্যামিতিক অবস্থান; পরমাণু বা অণু হলো সেই অবস্থানে রাখা প্রকৃত কণা।'
    }
  ],
  summary: [
    { en: 'A lattice is an arrangement of points; a unit cell is the repeating block.', bn: 'জালক হলো বিন্দুগুলির বিন্যাস; একক কোষ হলো পুনরাবৃত্তিমূলক ব্লক।' }
  ],
  practiceQuestionIds: ['q1_sc_bcc'],
  glossaryReferences: ['unitCell', 'lattice', 'latticePoint', 'crystalLattice']
};
