import type { GuidedLessonSequence } from '../engine/GuidedLessonTypes';

export const whatIsASolidData: GuidedLessonSequence = {
  id: 'what-is-a-solid',
  titleEn: 'What is a Solid?',
  titleBn: 'কঠিন পদার্থ কী?',
  steps: [
    {
      id: 'step-1-gas',
      titleEn: 'Gas Phase',
      titleBn: 'গ্যাসীয় অবস্থা',
      narrationEn: 'In a gas, particles are far apart and move chaotically.',
      narrationBn: 'গ্যাসে কণাগুলি একে অপরের থেকে অনেক দূরে থাকে এবং বিশৃঙ্খলভাবে চলাচল করে।',
      whatHappenedEn: 'Particles are moving randomly in all directions at high speeds.',
      whatHappenedBn: 'কণাগুলি সমস্ত দিকে উচ্চ গতিতে এলোমেলোভাবে চলাচল করছে।',
      whyItHappenedEn: 'Thermal energy overcomes intermolecular forces, preventing particles from staying together.',
      whyItHappenedBn: 'তাপীয় শক্তি আন্তঃআণবিক আকর্ষণ বলকে অতিক্রম করে, যার ফলে কণাগুলি একসাথে থাকতে পারে না।',
      observeEn: 'Notice the large empty spaces and random collisions.',
      observeBn: 'বিশাল ফাঁকা স্থান এবং এলোমেলো সংঘর্ষগুলি লক্ষ্য করুন।',
      durationMs: 4000,
      pauseAfterMs: 0,
      actions: [{ type: 'PHASE_GAS' }],
      accessibilitySummaryEn: 'Animation shows gas particles moving randomly.',
      accessibilitySummaryBn: 'অ্যানিমেশনে গ্যাসীয় কণাগুলির এলোমেলো চলন দেখানো হয়েছে।'
    },
    {
      id: 'step-2-liquid',
      titleEn: 'Liquid Phase',
      titleBn: 'তরল অবস্থা',
      narrationEn: 'As temperature drops, particles come closer, forming a liquid.',
      narrationBn: 'তাপমাত্রা হ্রাসের সাথে কণাগুলি কাছাকাছি আসে এবং তরল গঠন করে।',
      whatHappenedEn: 'Particles are now packed closely but still slide past each other.',
      whatHappenedBn: 'কণাগুলি এখন কাছাকাছি অবস্থান করছে কিন্তু এখনও একে অপরের পাশ কাটিয়ে চলাচল করছে।',
      whyItHappenedEn: 'Intermolecular forces are strong enough to keep them together, but thermal energy still allows movement.',
      whyItHappenedBn: 'আন্তঃআণবিক বল তাদের একসাথে রাখার জন্য যথেষ্ট শক্তিশালী, তবে তাপীয় শক্তির কারণে চলাচল সম্ভব।',
      observeEn: 'Notice that they take the shape of the bottom of the container.',
      observeBn: 'লক্ষ্য করুন, তারা পাত্রের তলদেশের আকার ধারণ করেছে।',
      durationMs: 4000,
      pauseAfterMs: 0,
      actions: [{ type: 'PHASE_LIQUID' }],
      accessibilitySummaryEn: 'Animation shows liquid particles sliding past each other.',
      accessibilitySummaryBn: 'অ্যানিমেশনে তরল কণাগুলির একে অপরের পাশ কাটিয়ে চলা দেখানো হয়েছে।'
    },
    {
      id: 'step-3-solid',
      titleEn: 'Solid Phase',
      titleBn: 'কঠিন অবস্থা',
      narrationEn: 'Upon further cooling, particles lock into fixed positions.',
      narrationBn: 'আরও শীতল হলে কণাগুলি নির্দিষ্ট অবস্থানে আবদ্ধ হয়ে পড়ে।',
      whatHappenedEn: 'The particles stopped translating and arranged into a fixed pattern.',
      whatHappenedBn: 'কণাগুলির স্থানান্তর বন্ধ হয়ে গেছে এবং তারা একটি নির্দিষ্ট বিন্যাসে সজ্জিত হয়েছে।',
      whyItHappenedEn: 'Intermolecular attractive forces now dominate over thermal energy, fixing particles in space.',
      whyItHappenedBn: 'আন্তঃআণবিক আকর্ষণ বল এখন তাপীয় শক্তির চেয়ে বেশি শক্তিশালী, যার ফলে কণাগুলি স্থানিকভাবে স্থির হয়ে যায়।',
      observeEn: 'Observe that the shape and volume are now definite. The particles only vibrate.',
      observeBn: 'লক্ষ্য করুন যে এখন আকার ও আয়তন নির্দিষ্ট। কণাগুলি কেবল কম্পন করছে।',
      durationMs: 4000,
      pauseAfterMs: 0,
      actions: [{ type: 'PHASE_SOLID' }],
      checkpoint: {
        promptEn: 'What type of motion is primarily restricted in the solid state?',
        promptBn: 'কঠিন অবস্থায় প্রধানত কোন ধরনের চলন সীমাবদ্ধ থাকে?',
        expectedResponse: 'translation',
        hintEn: 'Think about whether particles can slide past each other (translate) or just vibrate.',
        hintBn: 'ভেবে দেখুন কণাগুলি কি একে অপরের পাশ কাটিয়ে চলাচল করতে পারে নাকি কেবল কম্পন করে।'
      },
      accessibilitySummaryEn: 'Animation shows particles locking into a rigid crystal lattice.',
      accessibilitySummaryBn: 'অ্যানিমেশনে কণাগুলির একটি দৃঢ় স্ফটিক জালকে আবদ্ধ হওয়া দেখানো হয়েছে।'
    }
  ]
};
