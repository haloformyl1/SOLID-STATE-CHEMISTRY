import type { ModuleContent } from '../../types/content';

export const PackingModule: ModuleContent = {
  id: '04-packing',
  order: 4,
  title: {
    en: 'Packing of Particles in Solids',
    bn: 'কঠিন পদার্থে কণার সন্নিবেশ'
  },
  learningObjectives: [
    { en: 'Understand the concept of coordination number in different dimensional packing.', bn: 'বিভিন্ন মাত্রিক সন্নিবেশে সমন্বয় সংখ্যার ধারণা বোঝা।' },
    { en: 'Differentiate between 2D square packing and 2D hexagonal packing.', bn: 'দ্বিমাত্রিক বর্গাকার সন্নিবেশ এবং ষড়ভুজীয় সন্নিবেশের মধ্যে পার্থক্য করা।' },
    { en: 'Analyze the formation of 3D structures (Simple Cubic, HCP, CCP) from 2D layers.', bn: 'দ্বিমাত্রিক স্তর থেকে ত্রিমাত্রিক গঠনের (সরল ঘনকাকার, HCP, CCP) সৃষ্টি বিশ্লেষণ করা।' },
    { en: 'Identify the layer stacking sequences (AAA, ABAB, ABCABC).', bn: 'স্তরবিন্যাসের ক্রমগুলি (AAA, ABAB, ABCABC) শনাক্ত করা।' }
  ],
  prerequisiteConcepts: [{ en: 'Lattices and Unit Cells', bn: 'জালক এবং একক কোষ' }],
  sections: [
    {
      id: 's1',
      type: 'text',
      title: { en: 'Coordination Number — সমন্বয় সংখ্যা', bn: 'Coordination Number — সমন্বয় সংখ্যা' },
      content: {
        en: 'The coordination number of a particle in a structure is the number of its nearest neighbouring particles.',
        bn: 'কোনো গঠনে একটি কণার নিকটতম প্রতিবেশী কণার সংখ্যাকে ওই কণার সমন্বয় সংখ্যা বলে।'
      }
    },
    {
      id: 's1_misconception',
      type: 'misconception',
      modelConfig: {
        incorrect: {
          en: 'Coordination number is the total number of particles in a unit cell.',
          bn: 'সমন্বয় সংখ্যা একক কোষে মোট কণার সংখ্যা।'
        },
        correct: {
          en: 'Coordination number is not the total number of particles in a unit cell. It is the number of nearest neighbours of one selected particle.',
          bn: 'সমন্বয় সংখ্যা একক কোষে মোট কণার সংখ্যা নয়। এটি একটি নির্বাচিত কণার নিকটতম প্রতিবেশীর সংখ্যা।'
        }
      }
    },
    {
      id: 's2',
      type: 'interactive_3d',
      title: { en: 'Interactive Coordination-Number Explorer', bn: 'সমন্বয় সংখ্যা অন্বেষণকারী' },
      content: {
        en: 'Explore coordination numbers in different packing arrangements. Select a central particle to highlight its nearest neighbours.',
        bn: 'বিভিন্ন সন্নিবেশ বিন্যাসে সমন্বয় সংখ্যা অন্বেষণ করুন। নিকটতম প্রতিবেশীদের হাইলাইট করতে একটি কেন্দ্রীয় কণা নির্বাচন করুন।'
      },
      modelConfig: { type: 'coordination-explorer' }
    },
    {
      id: 's3',
      type: 'text',
      title: { en: 'One-Dimensional Packing — একমাত্রিক সন্নিবেশ', bn: 'One-Dimensional Packing — একমাত্রিক সন্নিবেশ' },
      content: {
        en: 'In one-dimensional packing, identical spheres are arranged in a straight row so that each sphere touches the adjacent sphere on either side. For an internal particle, Coordination number = 2.',
        bn: 'একমাত্রিক সন্নিবেশে সমান আকারের কণাগুলি একটি সরলরেখায় পাশাপাশি সাজানো থাকে। শৃঙ্খলের অভ্যন্তরে থাকা প্রতিটি কণা তার দুই পাশের দুটি কণার সংস্পর্শে থাকে। সমন্বয় সংখ্যা = ২।'
      }
    },
    {
      id: 's4',
      type: 'interactive_3d',
      modelConfig: { type: 'packing-1d' }
    },
    {
      id: 's4_warning',
      type: 'warning',
      content: {
        en: 'The end particle of a finite chain has one neighbour, but an internal particle in the repeating one-dimensional arrangement has two.',
        bn: 'সসীম শৃঙ্খলের প্রান্তীয় কণার একটি প্রতিবেশী থাকে, কিন্তু পুনরাবৃত্ত একমাত্রিক বিন্যাসের অভ্যন্তরীণ কণার দুটি প্রতিবেশী থাকে।'
      }
    },
    {
      id: 's5',
      type: 'text',
      title: { en: 'Two-Dimensional Packing — দ্বিমাত্রিক সন্নিবেশ', bn: 'Two-Dimensional Packing — দ্বিমাত্রিক সন্নিবেশ' },
      content: {
        en: 'A second row of particles can be placed relative to the first row in two principal ways: Square packing and Hexagonal packing.',
        bn: 'দ্বিতীয় সারির কণাগুলি প্রথম সারির সাপেক্ষে দুটি প্রধান উপায়ে স্থাপন করা যেতে পারে: বর্গাকার সন্নিবেশ এবং ষড়ভুজীয় সন্নিবেশ।'
      }
    },
    {
      id: 's6',
      type: 'text',
      title: { en: 'Square Packing — বর্গাকার সন্নিবেশ', bn: 'Square Packing — বর্গাকার সন্নিবেশ' },
      content: {
        en: 'In square packing, each row is placed directly above the preceding row. The sequence is AAAA. Coordination number = 4.',
        bn: 'বর্গাকার সন্নিবেশে, প্রতিটি সারি সরাসরি আগের সারির উপরে স্থাপন করা হয়। ক্রমটি হলো AAAA। সমন্বয় সংখ্যা = ৪।'
      }
    },
    {
      id: 's7',
      type: 'interactive_3d',
      modelConfig: { type: 'packing-2d-builder', packingType: 'square' }
    },
    {
      id: 's8',
      type: 'text',
      title: { en: 'Hexagonal Packing in Two Dimensions — দ্বিমাত্রিক ষড়ভুজীয় সন্নিবেশ', bn: 'Hexagonal Packing in Two Dimensions — দ্বিমাত্রিক ষড়ভুজীয় সন্নিবেশ' },
      content: {
        en: 'In hexagonal packing, the second row lies in the depressions of the first row. The sequence is ABAB. Coordination number = 6.',
        bn: 'ষড়ভুজীয় সন্নিবেশে, দ্বিতীয় সারিটি প্রথম সারির খাঁজে বসে। ক্রমটি হলো ABAB। সমন্বয় সংখ্যা = ৬।'
      }
    },
    {
      id: 's9',
      type: 'interactive_3d',
      modelConfig: { type: 'packing-2d-builder', packingType: 'hexagonal' }
    },
    {
      id: 's10',
      type: 'comparison_table',
      title: { en: 'Two-Dimensional Comparison', bn: 'দ্বিমাত্রিক তুলনা' },
      modelConfig: { type: 'packing-2d-comparison' }
    },
    {
      id: 's11',
      type: 'text',
      title: { en: 'Three-Dimensional Packing from Square Layers', bn: 'বর্গাকার স্তর থেকে ত্রিমাত্রিক সন্নিবেশ' },
      content: {
        en: 'Placing every new square-packed layer directly above the preceding layer (AAAA...) produces the simple-cubic structure. Coordination number = 6.',
        bn: 'প্রতিটি নতুন বর্গাকার স্তর পূর্ববর্তী স্তরের ঠিক উপরে (AAAA...) স্থাপন করলে সরল ঘনকাকার গঠন তৈরি হয়। সমন্বয় সংখ্যা = ৬।'
      }
    },
    {
      id: 's12',
      type: 'interactive_3d',
      modelConfig: { type: 'packing-3d-square' }
    },
    {
      id: 's13',
      type: 'text',
      title: { en: 'Three-Dimensional Packing from Hexagonal Layers', bn: 'ষড়ভুজীয় স্তর থেকে ত্রিমাত্রিক সন্নিবেশ' },
      content: {
        en: 'When the third layer lies directly above the first layer (ABABAB...), it forms Hexagonal Close Packing (HCP). When the third layer is placed in new positions (ABCABC...), it forms Cubic Close Packing (CCP).',
        bn: 'যখন তৃতীয় স্তরটি সরাসরি প্রথম স্তরের উপরে থাকে (ABABAB...), তখন এটি ষড়ভুজীয় ঘন সন্নিবেশ (HCP) গঠন করে। যখন তৃতীয় স্তরটি নতুন অবস্থানে (ABCABC...) রাখা হয়, তখন এটি ঘনকীয় ঘন সন্নিবেশ (CCP) গঠন করে।'
      }
    },
    {
      id: 's14_misconception',
      type: 'misconception',
      modelConfig: {
        incorrect: {
          en: 'A, B and C are three different types of particles.',
          bn: 'A, B এবং C তিনটি ভিন্ন ধরনের কণা।'
        },
        correct: {
          en: 'A, B and C are position labels for equivalent close-packed layers. They do not represent different elements, atoms or ions.',
          bn: 'A, B এবং C সমতুল্য স্তরের ভিন্ন অবস্থান নির্দেশ করে। এগুলি ভিন্ন মৌল, পরমাণু বা আয়ন নির্দেশ করে না।'
        }
      }
    },
    {
      id: 's15',
      type: 'interactive_3d',
      title: { en: 'Hexagonal Close Packing (HCP)', bn: 'ষড়ভুজীয় ঘন সন্নিবেশ (HCP)' },
      modelConfig: { type: 'packing-3d-hex', packingType: 'hcp' }
    },
    {
      id: 's16',
      type: 'interactive_3d',
      title: { en: 'Cubic Close Packing (CCP)', bn: 'ঘনকীয় ঘন সন্নিবেশ (CCP)' },
      modelConfig: { type: 'packing-3d-hex', packingType: 'ccp' }
    },
    {
      id: 's17',
      type: 'comparison_table',
      title: { en: 'HCP vs CCP Comparison', bn: 'HCP বনাম CCP তুলনা' },
      modelConfig: { type: 'hcp-ccp-comparison' }
    },
    {
      id: 's18',
      type: 'interactive_3d',
      title: { en: 'Complete Packing Pathway Explorer', bn: 'সম্পূর্ণ সন্নিবেশ পথ অন্বেষণকারী' },
      content: {
        en: 'Explore the complete pathway from a single 1D row all the way up to complex 3D CCP and HCP structures.',
        bn: 'একটি একমাত্রিক সারি থেকে জটিল ত্রিমাত্রিক CCP এবং HCP গঠন পর্যন্ত সম্পূর্ণ পথটি অন্বেষণ করুন।'
      },
      modelConfig: { type: 'packing-pathway-explorer' }
    },
    {
      id: 's19',
      type: 'interactive_3d',
      title: { en: 'Layer-Stacking Simulator', bn: 'স্তর-সাজানো সিমুলেটর' },
      content: {
        en: 'Build your own 3D crystals by dragging and dropping 2D layers into valid A, B, and C positions.',
        bn: '২ডি স্তরগুলি টেনে এনে সঠিক A, B এবং C অবস্থানে বসিয়ে নিজের ৩ডি স্ফটিক তৈরি করুন।'
      },
      modelConfig: { type: 'packing-layer-simulator' }
    }
  ],
  misconceptions: [
    {
      en: 'Misconception: Square and hexagonal two-dimensional packing have the same coordination number. Reality: Square packing has coordination number 4, while hexagonal packing has coordination number 6.',
      bn: 'ভুল ধারণা: বর্গাকার এবং ষড়ভুজীয় দ্বিমাত্রিক সন্নিবেশে একই সমন্বয় সংখ্যা রয়েছে। বাস্তব: বর্গাকার সন্নিবেশে সমন্বয় সংখ্যা ৪, যেখানে ষড়ভুজীয় সন্নিবেশে সমন্বয় সংখ্যা ৬।'
    },
    {
      en: 'Misconception: HCP has greater packing efficiency than CCP. Reality: Ideal HCP and CCP both have packing efficiency approximately 74%.',
      bn: 'ভুল ধারণা: HCP এর সন্নিবেশ দক্ষতা CCP এর চেয়ে বেশি। বাস্তব: আদর্শ HCP এবং CCP উভয়েরই সন্নিবেশ দক্ষতা প্রায় ৭৪%।'
    }
  ],
  summary: [
    { en: 'Coordination number depends on the arrangement and dimensionality of the particles.', bn: 'সমন্বয় সংখ্যা কণার বিন্যাস এবং মাত্রার উপর নির্ভর করে।' },
    { en: '1D packing has CN=2, 2D square has CN=4, 2D hexagonal has CN=6.', bn: '১ডি সন্নিবেশে CN=২, ২ডি বর্গাকারে CN=৪, ২ডি ষড়ভুজীয়ে CN=৬।' },
    { en: 'AAA stacking forms simple cubic (CN=6), ABAB stacking forms HCP (CN=12), and ABCABC stacking forms CCP (CN=12).', bn: 'AAA স্তরবিন্যাস সরল ঘনকাকার (CN=৬) তৈরি করে, ABAB স্তরবিন্যাস HCP (CN=১২) তৈরি করে এবং ABCABC স্তরবিন্যাস CCP (CN=১২) তৈরি করে।' }
  ],
  practiceQuestionIds: ['q4_packing', 'q5_packing_cn', 'q6_packing_hcp', 'q7_packing_sequence'],
  glossaryReferences: ['packing', 'closePacking', 'coordinationNumber', 'squarePacking', 'hexagonalPacking', 'hcp', 'ccp']
};
