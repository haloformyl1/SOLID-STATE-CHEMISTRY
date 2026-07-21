import type { ModuleContent } from '../../types/content';

export const CrystalLatticeModule: ModuleContent = {
  id: '05-crystal-lattice',
  order: 5,
  title: {
    en: 'Crystal Lattice and Unit Cell',
    bn: 'স্ফটিক জালক ও একক কোষ'
  },
  learningObjectives: [
    {
      en: 'Differentiate between crystal lattice, lattice point, and unit cell.',
      bn: 'স্ফটিক জালক, জালক বিন্দু এবং একক কোষের মধ্যে পার্থক্য বোঝা।'
    },
    {
      en: 'Understand that a unit cell reproduces the lattice through translation.',
      bn: 'কীভাবে একক কোষকে স্থানান্তর করে সম্পূর্ণ জালক তৈরি করা যায় তা বোঝা।'
    },
    {
      en: 'Calculate the contribution of a corner particle in a cubic unit cell.',
      bn: 'ঘনকীয় একক কোষে কোণস্থিত কণার অবদান গণনা করা।'
    }
  ],
  sections: [
    {
      id: 'sec-1',
      type: 'text',
      title: { en: 'Crystal Lattice or Space Lattice', bn: 'স্ফটিক জালক বা স্থানিক জালক' },
      content: {
        en: 'A crystal lattice or space lattice is an infinite regular three-dimensional periodic arrangement of lattice points in space. The lattice is a geometrical pattern. It does not by itself specify the identity of the atom, ion or molecule placed at each lattice point.',
        bn: 'স্ফটিক জালক বা স্থানিক জালক হল ত্রিমাত্রিক স্থানে জালক বিন্দুগুলির একটি অসীম, নিয়মিত ও পর্যায়বৃত্ত বিন্যাস। জালক মূলত একটি জ্যামিতিক বিন্যাস। প্রতিটি জালক বিন্দুতে কোন পরমাণু, আয়ন বা অণু অবস্থান করছে, তা শুধু জালক দ্বারা নির্ধারিত হয় না।'
      }
    },
    {
      id: 'sec-1-advanced',
      type: 'advanced_insight',
      content: {
        en: 'Crystal structure = Lattice + Basis or Motif',
        bn: 'স্ফটিক গঠন = জালক + ভিত্তি বা মোটিফ'
      }
    },
    {
      id: 'sec-2',
      type: 'text',
      title: { en: 'Lattice Point', bn: 'জালক বিন্দু' },
      content: {
        en: 'A lattice point is a geometrical point in a crystal lattice whose surroundings are identical to those of every equivalent lattice point. It represents the position of a constituent particle or an identical group of particles in the crystal pattern.',
        bn: 'জালক বিন্দু হল স্ফটিক জালকের একটি জ্যামিতিক বিন্দু, যার চারপাশের পরিবেশ প্রতিটি সমতুল্য জালক বিন্দুর চারপাশের পরিবেশের সঙ্গে অভিন্ন। এটি স্ফটিকের পুনরাবৃত্ত বিন্যাসে একটি গঠনকারী কণা বা একই ধরনের কণাগুচ্ছের অবস্থান নির্দেশ করে।'
      }
    },
    {
      id: 'sec-3',
      type: 'warning',
      content: {
        en: 'A lattice point is a geometrical position; the particle or group attached to it is the basis. A lattice point is not automatically the same thing as a physical atom.',
        bn: 'জালক বিন্দু একটি জ্যামিতিক অবস্থান; এর সঙ্গে যুক্ত কণা বা কণাগুচ্ছ হল ভিত্তি। জালক বিন্দু মানেই বাস্তব পরমাণু নয়।'
      }
    },
    {
      id: 'sec-4',
      type: 'text',
      title: { en: 'Unit Cell', bn: 'একক কোষ' },
      content: {
        en: 'A unit cell is the smallest repeating three-dimensional portion of a crystal lattice which, when translated repeatedly in space, reproduces the complete lattice. It is the building block of a crystal lattice and contains the essential translational pattern of the lattice. Translation of the unit cell along the lattice directions generates the extended crystal lattice. A unit cell is not an isolated physical container with rigid walls. The drawn cell boundary is a geometrical convention.',
        bn: 'একক কোষ হল স্ফটিক জালকের ক্ষুদ্রতম পুনরাবৃত্ত ত্রিমাত্রিক অংশ, যাকে স্থানান্তর করে বারবার সাজালে সম্পূর্ণ জালক গঠিত হয়। এটি স্ফটিক জালকের গঠনমূলক একক এবং এর মধ্যে জালকের পুনরাবৃত্ত বিন্যাসের প্রয়োজনীয় তথ্য থাকে। জালকের বিভিন্ন দিকে একক কোষকে স্থানান্তর করলে বিস্তৃত স্ফটিক জালক গঠিত হয়। একক কোষ কোনো বাস্তব কঠিন দেয়ালবিশিষ্ট বাক্স নয়। অঙ্কিত সীমানা একটি জ্যামিতিক ধারণা।'
      }
    },
    {
      id: 'sec-5',
      type: 'concept_map',
      modelConfig: { type: 'concept-map' }
    },
    {
      id: 'sec-6',
      type: 'interactive_3d',
      modelConfig: { type: 'lattice-builder' }
    },
    {
      id: 'sec-7',
      type: 'interactive_3d',
      modelConfig: { type: 'unit-cell-sharing' }
    }
  ],
  misconceptions: [
    {
      en: 'A lattice point is always a physical atom.',
      bn: 'জালক বিন্দু সর্বদা একটি বাস্তব পরমাণু।'
    },
    {
      en: 'The unit-cell boundary acts as a real rigid wall.',
      bn: 'একক কোষের সীমানা একটি বাস্তব কঠিন দেয়াল হিসেবে কাজ করে।'
    },
    {
      en: 'An atom is physically cut into fractions (like 1/8) at the corners.',
      bn: 'কোনায় পরমাণুটি বাস্তবে ভগ্নাংশে (যেমন ১/৮) কাটা হয়।'
    }
  ],
  summary: [
    {
      en: 'Crystal Lattice is the geometric arrangement of points.',
      bn: 'স্ফটিক জালক হল বিন্দুগুলির জ্যামিতিক বিন্যাস।'
    },
    {
      en: 'Unit Cell is the smallest repeating unit that builds the whole crystal.',
      bn: 'একক কোষ হল ক্ষুদ্রতম পুনরাবৃত্ত একক যা সম্পূর্ণ স্ফটিক তৈরি করে।'
    }
  ],
  practiceQuestionIds: ['q_lattice_1', 'q_lattice_2'],
  glossaryReferences: ['crystal_lattice', 'lattice_point', 'unit_cell', 'basis']
};
