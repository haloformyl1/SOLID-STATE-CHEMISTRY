import type { ModuleContent } from '../../types/content';

export const DensityModule: ModuleContent = {
  id: '02-density',
  order: 2,
  title: {
    en: 'Density of a Unit Cell',
    bn: 'একক কোষের ঘনত্ব'
  },
  learningObjectives: [
    { en: 'Understand the relationship between density, molar mass, and unit cell volume.', bn: 'ঘনত্ব, মোলার ভর এবং একক কোষের আয়তনের মধ্যে সম্পর্ক বোঝা।' },
    { en: 'Calculate the density of a crystal lattice.', bn: 'স্ফটিক জালকের ঘনত্ব গণনা করা।' },
    { en: 'Perform unit conversions necessary for density calculations.', bn: 'ঘনত্ব গণনার জন্য প্রয়োজনীয় একক রূপান্তর করা।' }
  ],
  prerequisiteConcepts: [{ en: 'Lattices and Unit Cells', bn: 'জালক এবং একক কোষ' }],
  sections: [
    {
      id: 's1',
      type: 'text',
      title: { en: 'Density Formula', bn: 'ঘনত্বের সূত্র' },
      content: {
        en: 'The density of a unit cell is the same as the density of the macroscopic crystal. It is calculated by dividing the mass of the unit cell by its volume.',
        bn: 'একটি একক কোষের ঘনত্ব ম্যাক্রোস্কোপিক স্ফটিকের ঘনত্বের সমান। এটি একক কোষের ভরকে তার আয়তন দিয়ে ভাগ করে গণনা করা হয়।'
      }
    },
    {
      id: 's2',
      type: 'formula',
      title: { en: 'Mathematical Expression', bn: 'গাণিতিক প্রকাশ' },
      content: {
        en: 'Where Z = effective number of atoms, M = molar mass, N_A = Avogadro constant, and a = edge length.',
        bn: 'যেখানে Z = পরমাণুর কার্যকর সংখ্যা, M = মোলার ভর, N_A = অ্যাভোগাড্রো ধ্রুবক, এবং a = প্রান্তের দৈর্ঘ্য।'
      },
      formulaTex: '\\rho = \\frac{Z \\cdot M}{N_A \\cdot a^3}'
    },
    {
      id: 's3',
      type: 'interactive_3d',
      title: { en: 'Density Laboratory', bn: 'ঘনত্ব ল্যাবরেটরি' },
      content: {
        en: 'Use the interactive calculator below to compute density step-by-step.',
        bn: 'ধাপে ধাপে ঘনত্ব গণনা করতে নিচের ইন্টারেক্টিভ ক্যালকুলেটরটি ব্যবহার করুন।'
      },
      modelConfig: { type: 'density-calculator' }
    }
  ],
  misconceptions: [
    {
      en: 'Misconception: You can use edge length in picometers (pm) directly in the formula to get density in g/cm³. Reality: You must convert the edge length to cm before calculating the volume.',
      bn: 'ভুল ধারণা: g/cm³ এককে ঘনত্ব পেতে আপনি সরাসরি সূত্রে পিকোমিটার (pm) এককে প্রান্তের দৈর্ঘ্য ব্যবহার করতে পারেন। বাস্তব: আয়তন গণনার আগে আপনাকে অবশ্যই প্রান্তের দৈর্ঘ্যকে cm এ রূপান্তর করতে হবে।'
    }
  ],
  summary: [
    { en: 'Density depends on the unit cell type (Z), molar mass, and edge length.', bn: 'ঘনত্ব একক কোষের প্রকার (Z), মোলার ভর এবং প্রান্তের দৈর্ঘ্যের উপর নির্ভর করে।' }
  ],
  practiceQuestionIds: ['q2_density_calc'],
  glossaryReferences: ['density', 'edgeLength']
};
