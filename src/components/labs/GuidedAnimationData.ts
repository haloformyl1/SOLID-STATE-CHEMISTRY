export type PackingType = 'square2d' | 'hexagonal2d' | 'hcp3d' | 'ccp3d';
export type AnimationActionType = 'ADD_PARTICLE' | 'ADD_ROW' | 'ADD_LAYER' | 'SHOW_VOID' | 'SHOW_CONTACT';

export interface AnimationAction {
  type: AnimationActionType;
  targetIds: string[]; 
}

export interface GuidedAnimationStep {
  id: string;
  titleEn: string;
  titleBn: string;
  narrationEn: string;
  narrationBn: string;
  durationMs: number;
  pauseAfterMs: number;
  camera?: {
    position?: [number, number, number];
    target?: [number, number, number];
    transitionMs?: number;
  };
  actions: AnimationAction[];
  highlightParticleIds?: string[];
  dimOtherParticles?: boolean;
  showContactLines?: { from: string, to: string }[];
  checkpoint?: {
    promptEn: string;
    promptBn: string;
    expectedAnswer: string | number;
    hintEn: string;
    hintBn: string;
  };
}

export interface AnimationSequence {
  id: string;
  type: 'square2d' | 'hexagonal2d' | 'hcp3d' | 'ccp3d';
  steps: GuidedAnimationStep[];
}

// Helper to generate grid IDs for 2D Square
const getSquareRow = (y: number) => {
  const ids = [];
  for (let x = -2; x <= 2; x++) ids.push(`sq-${x}-${y}`);
  return ids;
};

// Sequences
export const square2dSequence: AnimationSequence = {
  id: 'seq-square2d',
  type: 'square2d',
  steps: [
    {
      id: 'step-1',
      titleEn: '1D Packing',
      titleBn: '১ডি প্যাকিং',
      narrationEn: 'We begin by arranging atoms in a single straight line, touching each other.',
      narrationBn: 'আমরা পরমাণুগুলোকে একটি সোজা লাইনে সাজিয়ে শুরু করি, একে অপরকে স্পর্শ করে।',
      durationMs: 1000,
      pauseAfterMs: 500,
      camera: { position: [0, 0, 8] },
      actions: [{ type: 'ADD_ROW', targetIds: getSquareRow(0) }]
    },
    {
      id: 'step-2',
      titleEn: '2D Square Packing Formation',
      titleBn: '২ডি বর্গাকার প্যাকিং গঠন',
      narrationEn: 'Next, we place another row exactly below the first row. The atoms align perfectly vertically and horizontally.',
      narrationBn: 'এরপর, আমরা প্রথম সারির ঠিক নিচে আরেকটি সারি স্থাপন করি। পরমাণুগুলো লম্ব এবং আনুভূমিকভাবে নিখুঁতভাবে সারিবদ্ধ হয়।',
      durationMs: 1000,
      pauseAfterMs: 500,
      actions: [{ type: 'ADD_ROW', targetIds: getSquareRow(1) }]
    },
    {
      id: 'step-3',
      titleEn: 'Completing the 2D Grid',
      titleBn: '২ডি গ্রিড সম্পূর্ণ করা',
      narrationEn: 'We continue adding rows to form a 2D Square packed layer. This is called AAA... type packing.',
      narrationBn: 'আমরা সারি যোগ করতে থাকি একটি ২ডি বর্গাকার প্যাকিং স্তর গঠন করতে। একে AAA... ধরনের প্যাকিং বলা হয়।',
      durationMs: 1500,
      pauseAfterMs: 500,
      actions: [
        { type: 'ADD_ROW', targetIds: getSquareRow(-1) },
        { type: 'ADD_ROW', targetIds: getSquareRow(2) },
        { type: 'ADD_ROW', targetIds: getSquareRow(-2) }
      ]
    },
    {
      id: 'step-4',
      titleEn: 'Coordination Number',
      titleBn: 'সমন্বয় সংখ্যা',
      narrationEn: 'Let\'s look at a central atom. How many immediate neighbors does it have?',
      narrationBn: 'চলুন একটি কেন্দ্রীয় পরমাণুর দিকে তাকাই। এর কয়টি নিকটতম প্রতিবেশী আছে?',
      durationMs: 1000,
      pauseAfterMs: 0,
      camera: { position: [0, 0, 6] },
      actions: [],
      highlightParticleIds: ['sq-0-0'],
      dimOtherParticles: true,
      checkpoint: {
        promptEn: 'Enter the coordination number:',
        promptBn: 'সমন্বয় সংখ্যা লিখুন:',
        expectedAnswer: '4',
        hintEn: 'Count the atoms directly touching the central atom.',
        hintBn: 'কেন্দ্রীয় পরমাণুকে সরাসরি স্পর্শ করা পরমাণুগুলো গণনা করুন।'
      }
    },
    {
      id: 'step-5',
      titleEn: 'Coordination Number Revealed',
      titleBn: 'সমন্বয় সংখ্যা প্রকাশিত',
      narrationEn: 'Correct! It touches 4 neighbors. If we connect their centers, they form a square.',
      narrationBn: 'সঠিক! এটি ৪টি প্রতিবেশীকে স্পর্শ করে। যদি আমরা তাদের কেন্দ্রগুলিকে সংযুক্ত করি, তবে তারা একটি বর্গক্ষেত্র তৈরি করে।',
      durationMs: 1000,
      pauseAfterMs: 1000,
      actions: [],
      highlightParticleIds: ['sq-0-0', 'sq-1-0', 'sq--1-0', 'sq-0-1', 'sq-0--1'],
      dimOtherParticles: true,
      showContactLines: [
        { from: 'sq-1-0', to: 'sq-0-1' },
        { from: 'sq-0-1', to: 'sq--1-0' },
        { from: 'sq--1-0', to: 'sq-0--1' },
        { from: 'sq-0--1', to: 'sq-1-0' }
      ]
    },
    {
      id: 'step-6',
      titleEn: 'Square Voids',
      titleBn: 'বর্গাকার শূন্যস্থান',
      narrationEn: 'Notice the empty spaces between the atoms. These are called Square Voids.',
      narrationBn: 'পরমাণুগুলির মধ্যবর্তী খালি স্থানগুলি লক্ষ্য করুন। এদেরকে বর্গাকার শূন্যস্থান বলা হয়।',
      durationMs: 1000,
      pauseAfterMs: 1000,
      actions: [{ type: 'SHOW_VOID', targetIds: ['sqv-0-0', 'sqv-0-1', 'sqv-1-0', 'sqv-1-1'] }],
      highlightParticleIds: ['sq-0-0', 'sq-1-0', 'sq-0-1', 'sq-1-1', 'sqv-0-0'],
      dimOtherParticles: true
    }
  ]
};

const getHexRow = (y: number) => {
  const ids = [];
  for (let x = -2; x <= 2; x++) ids.push(`hex-${x}-${y}`);
  return ids;
};

export const hexagonal2dSequence: AnimationSequence = {
  id: 'seq-hex2d',
  type: 'hexagonal2d',
  steps: [
    {
      id: 'step-1',
      titleEn: 'First Row (A Layer)',
      titleBn: 'প্রথম সারি (A স্তর)',
      narrationEn: 'We start with a single row of touching atoms, just like before.',
      narrationBn: 'আগের মতোই আমরা একে অপরকে স্পর্শ করা পরমাণুর একক সারি দিয়ে শুরু করি।',
      durationMs: 1000,
      pauseAfterMs: 500,
      camera: { position: [0, 0, 8] },
      actions: [{ type: 'ADD_ROW', targetIds: getHexRow(0) }]
    },
    {
      id: 'step-2',
      titleEn: 'Second Row (B Layer)',
      titleBn: 'দ্বিতীয় সারি (B স্তর)',
      narrationEn: 'Instead of aligning exactly below, the second row fits into the depressions of the first row for tighter packing.',
      narrationBn: 'ঠিক নিচে সারিবদ্ধ হওয়ার পরিবর্তে, দ্বিতীয় সারিটি প্রথম সারির গর্তে বসে আরও আঁটসাঁট প্যাকিংয়ের জন্য।',
      durationMs: 1500,
      pauseAfterMs: 500,
      actions: [{ type: 'ADD_ROW', targetIds: getHexRow(1) }]
    },
    {
      id: 'step-3',
      titleEn: 'Third Row (A Layer again)',
      titleBn: 'তৃতীয় সারি (আবার A স্তর)',
      narrationEn: 'The third row fits into the depressions of the second row, aligning perfectly with the first row. This is ABAB... packing.',
      narrationBn: 'তৃতীয় সারিটি দ্বিতীয় সারির গর্তে বসে, প্রথম সারির সাথে নিখুঁতভাবে সারিবদ্ধ হয়। এটি ABAB... প্যাকিং।',
      durationMs: 1500,
      pauseAfterMs: 500,
      actions: [{ type: 'ADD_ROW', targetIds: getHexRow(2) }]
    },
    {
      id: 'step-4',
      titleEn: 'Completing 2D Hexagonal',
      titleBn: '২ডি ষড়ভুজাকার সম্পূর্ণ করা',
      narrationEn: 'Adding more rows creates a highly efficient 2D hexagonal packed layer.',
      narrationBn: 'আরও সারি যোগ করলে একটি অত্যন্ত দক্ষ ২ডি ষড়ভুজাকার প্যাকিং স্তর তৈরি হয়।',
      durationMs: 1500,
      pauseAfterMs: 500,
      actions: [
        { type: 'ADD_ROW', targetIds: getHexRow(-1) },
        { type: 'ADD_ROW', targetIds: getHexRow(-2) }
      ]
    },
    {
      id: 'step-5',
      titleEn: 'Coordination Number',
      titleBn: 'সমন্বয় সংখ্যা',
      narrationEn: 'How many atoms surround the central atom in this hexagonal arrangement?',
      narrationBn: 'এই ষড়ভুজাকার বিন্যাসে কয়টি পরমাণু কেন্দ্রীয় পরমাণুকে ঘিরে থাকে?',
      durationMs: 1000,
      pauseAfterMs: 0,
      camera: { position: [0, 0, 6] },
      actions: [],
      highlightParticleIds: ['hex-0-0'],
      dimOtherParticles: true,
      checkpoint: {
        promptEn: 'Enter the coordination number:',
        promptBn: 'সমন্বয় সংখ্যা লিখুন:',
        expectedAnswer: '6',
        hintEn: 'Count the atoms forming a ring around the center.',
        hintBn: 'কেন্দ্রের চারপাশে একটি বলয় গঠনকারী পরমাণুগুলি গণনা করুন।'
      }
    },
    {
      id: 'step-6',
      titleEn: 'Coordination Number Revealed',
      titleBn: 'সমন্বয় সংখ্যা প্রকাশিত',
      narrationEn: 'Correct! It touches 6 neighbors, forming a regular hexagon.',
      narrationBn: 'সঠিক! এটি ৬টি প্রতিবেশীকে স্পর্শ করে, একটি নিয়মিত ষড়ভুজ তৈরি করে।',
      durationMs: 1000,
      pauseAfterMs: 1500,
      actions: [],
      highlightParticleIds: ['hex-0-0', 'hex-1-0', 'hex--1-0', 'hex-0-1', 'hex-0--1', 'hex--1-1', 'hex--1--1'],
      dimOtherParticles: true,
      showContactLines: [
        { from: 'hex-0-1', to: 'hex--1-1' },
        { from: 'hex--1-1', to: 'hex--1-0' },
        { from: 'hex--1-0', to: 'hex--1--1' },
        { from: 'hex--1--1', to: 'hex-0--1' },
        { from: 'hex-0--1', to: 'hex-1-0' },
        { from: 'hex-1-0', to: 'hex-0-1' }
      ]
    }
  ]
};

// Generate an array of all atom IDs in a layer
const getLayer = (z: number) => {
  const ids = [];
  for (let y = -2; y <= 2; y++) {
    for (let x = -2; x <= 2; x++) {
      ids.push(`atom-${x}-${y}-${z}`);
    }
  }
  return ids;
};

export const hcp3dSequence: AnimationSequence = {
  id: 'seq-hcp3d',
  type: 'hcp3d',
  steps: [
    {
      id: 'step-1',
      titleEn: 'First Layer (A)',
      titleBn: 'প্রথম স্তর (A)',
      narrationEn: 'We start with a 2D Hexagonal packed layer (Layer A).',
      narrationBn: 'আমরা একটি ২ডি ষড়ভুজাকার প্যাকিং স্তর (স্তর A) দিয়ে শুরু করি।',
      durationMs: 1000,
      pauseAfterMs: 500,
      camera: { position: [0, -8, 8], transitionMs: 1000 },
      actions: [{ type: 'ADD_LAYER', targetIds: getLayer(0) }]
    },
    {
      id: 'step-2',
      titleEn: 'Adding Second Layer (B)',
      titleBn: 'দ্বিতীয় স্তর (B) যোগ করা',
      narrationEn: 'We place the second layer (B) directly over the depressions (voids) of the first layer.',
      narrationBn: 'আমরা দ্বিতীয় স্তরটি (B) সরাসরি প্রথম স্তরের গর্তগুলির (শূন্যস্থান) উপরে স্থাপন করি।',
      durationMs: 2000,
      pauseAfterMs: 1000,
      camera: { position: [6, -6, 6] },
      actions: [{ type: 'ADD_LAYER', targetIds: getLayer(1) }]
    },
    {
      id: 'step-3',
      titleEn: 'Tetrahedral Voids Covered',
      titleBn: 'টেট্রাহেড্রাল শূন্যস্থান আবৃত',
      narrationEn: 'Notice how the atoms in Layer B cover half of the triangular voids in Layer A, forming Tetrahedral Voids.',
      narrationBn: 'লক্ষ্য করুন কিভাবে B স্তরের পরমাণুগুলি A স্তরের অর্ধেক ত্রিভুজাকার শূন্যস্থান আবৃত করে, টেট্রাহেড্রাল শূন্যস্থান তৈরি করে।',
      durationMs: 1500,
      pauseAfterMs: 1000,
      actions: [{ type: 'SHOW_VOID', targetIds: ['tv1-0-0-0', 'tv2-0-0-0'] }],
      highlightParticleIds: ['atom-0-0-0', 'atom-0-1-0', 'atom-1-0-0', 'atom-0-0-1'], // A base + B apex
      dimOtherParticles: true
    },
    {
      id: 'step-4',
      titleEn: 'Third Layer (A)',
      titleBn: 'তৃতীয় স্তর (A)',
      narrationEn: 'In HCP, the third layer is placed directly over the atoms of the first layer, repeating the A pattern (ABAB).',
      narrationBn: 'HCP তে, তৃতীয় স্তরটি সরাসরি প্রথম স্তরের পরমাণুর উপরে স্থাপন করা হয়, A প্যাটার্ন (ABAB) পুনরাবৃত্তি করে।',
      durationMs: 2000,
      pauseAfterMs: 1000,
      camera: { position: [8, 0, 4] },
      actions: [{ type: 'ADD_LAYER', targetIds: getLayer(2) }],
      dimOtherParticles: false,
      highlightParticleIds: undefined
    },
    {
      id: 'step-5',
      titleEn: 'Coordination: Own Layer',
      titleBn: 'সমন্বয়: নিজস্ব স্তর',
      narrationEn: 'Let\'s find the coordination number. A central atom touches 6 other atoms in its own layer (Layer B).',
      narrationBn: 'চলুন সমন্বয় সংখ্যা বের করি। একটি কেন্দ্রীয় পরমাণু তার নিজস্ব স্তরে (স্তর B) অন্য ৬টি পরমাণুকে স্পর্শ করে।',
      durationMs: 2000,
      pauseAfterMs: 1000,
      camera: { position: [0, 0, 10] },
      actions: [],
      highlightParticleIds: ['atom-0-0-1', 'atom--1-0-1', 'atom-1-0-1', 'atom-0-1-1', 'atom--1-1-1', 'atom-0--1-1', 'atom--1--1-1'],
      dimOtherParticles: true,
      showContactLines: [
        { from: 'atom-0-0-1', to: 'atom--1-0-1' },
        { from: 'atom-0-0-1', to: 'atom-1-0-1' },
        { from: 'atom-0-0-1', to: 'atom-0-1-1' },
        { from: 'atom-0-0-1', to: 'atom--1-1-1' },
        { from: 'atom-0-0-1', to: 'atom-0--1-1' },
        { from: 'atom-0-0-1', to: 'atom--1--1-1' }
      ]
    },
    {
      id: 'step-6',
      titleEn: 'Coordination: Bottom Layer',
      titleBn: 'সমন্বয়: নিচের স্তর',
      narrationEn: 'It also sits in the depression of the bottom layer (Layer A), touching 3 atoms below it.',
      narrationBn: 'এটি নিচের স্তরের (স্তর A) গর্তে বসে, এর নিচের ৩টি পরমাণুকে স্পর্শ করে।',
      durationMs: 2000,
      pauseAfterMs: 1000,
      camera: { position: [4, -8, 6] },
      actions: [],
      highlightParticleIds: ['atom-0-0-1', 'atom-0-0-0', 'atom-1-0-0', 'atom-0-1-0'],
      dimOtherParticles: true,
      showContactLines: [
        { from: 'atom-0-0-1', to: 'atom-0-0-0' },
        { from: 'atom-0-0-1', to: 'atom-1-0-0' },
        { from: 'atom-0-0-1', to: 'atom-0-1-0' }
      ]
    },
    {
      id: 'step-7',
      titleEn: 'Coordination: Top Layer',
      titleBn: 'সমন্বয়: উপরের স্তর',
      narrationEn: 'Finally, the top layer (Layer A) is placed exactly like the bottom layer, adding 3 more touching atoms above.',
      narrationBn: 'অবশেষে, উপরের স্তরটি (স্তর A) ঠিক নিচের স্তরের মতো স্থাপন করা হয়, উপরে আরও ৩টি স্পর্শকারী পরমাণু যোগ করে।',
      durationMs: 2000,
      pauseAfterMs: 1000,
      camera: { position: [4, 8, 6] },
      actions: [],
      highlightParticleIds: ['atom-0-0-1', 'atom-0-0-2', 'atom-1-0-2', 'atom-0-1-2'],
      dimOtherParticles: true,
      showContactLines: [
        { from: 'atom-0-0-1', to: 'atom-0-0-2' },
        { from: 'atom-0-0-1', to: 'atom-1-0-2' },
        { from: 'atom-0-0-1', to: 'atom-0-1-2' }
      ]
    },
    {
      id: 'step-8',
      titleEn: 'Total HCP Coordination',
      titleBn: 'মোট HCP সমন্বয়',
      narrationEn: 'So we have 6 in the middle, 3 below, and 3 above.',
      narrationBn: 'সুতরাং আমাদের মাঝে ৬টি, নিচে ৩টি এবং উপরে ৩টি আছে।',
      durationMs: 1000,
      pauseAfterMs: 0,
      camera: { position: [8, 0, 4] },
      actions: [],
      highlightParticleIds: [
         'atom-0-0-1', 
         'atom--1-0-1', 'atom-1-0-1', 'atom-0-1-1', 'atom--1-1-1', 'atom-0--1-1', 'atom--1--1-1',
         'atom-0-0-0', 'atom-1-0-0', 'atom-0-1-0',
         'atom-0-0-2', 'atom-1-0-2', 'atom-0-1-2'
      ],
      dimOtherParticles: true,
      checkpoint: {
        promptEn: 'What is the total coordination number for HCP?',
        promptBn: 'HCP এর মোট সমন্বয় সংখ্যা কত?',
        expectedAnswer: '12',
        hintEn: '6 + 3 + 3',
        hintBn: '৬ + ৩ + ৩'
      }
    },
    {
      id: 'step-9',
      titleEn: 'Finished',
      titleBn: 'সমাপ্ত',
      narrationEn: 'This completes the Hexagonal Close Packed (HCP) structure!',
      narrationBn: 'এটি হেক্সাগোনাল ক্লোজ প্যাকড (HCP) গঠন সম্পন্ন করে!',
      durationMs: 1000,
      pauseAfterMs: 1000,
      actions: [],
      dimOtherParticles: false
    }
  ]
};

export const ccp3dSequence: AnimationSequence = {
  id: 'seq-ccp3d',
  type: 'ccp3d',
  steps: [
    {
      id: 'step-1',
      titleEn: 'First Layer (A)',
      titleBn: 'প্রথম স্তর (A)',
      narrationEn: 'Like HCP, we start with a 2D Hexagonal packed layer (Layer A).',
      narrationBn: 'HCP এর মতো, আমরা একটি ২ডি ষড়ভুজাকার প্যাকিং স্তর (স্তর A) দিয়ে শুরু করি।',
      durationMs: 1000,
      pauseAfterMs: 500,
      camera: { position: [0, -8, 8], transitionMs: 1000 },
      actions: [{ type: 'ADD_LAYER', targetIds: getLayer(0) }]
    },
    {
      id: 'step-2',
      titleEn: 'Second Layer (B)',
      titleBn: 'দ্বিতীয় স্তর (B)',
      narrationEn: 'The second layer (B) goes over the tetrahedral voids, exactly like HCP.',
      narrationBn: 'দ্বিতীয় স্তরটি (B) টেট্রাহেড্রাল শূন্যস্থানের উপর দিয়ে যায়, ঠিক HCP এর মতো।',
      durationMs: 2000,
      pauseAfterMs: 1000,
      camera: { position: [6, -6, 6] },
      actions: [{ type: 'ADD_LAYER', targetIds: getLayer(1) }]
    },
    {
      id: 'step-3',
      titleEn: 'The Remaining Octahedral Voids',
      titleBn: 'অবশিষ্ট অক্টাহেড্রাল শূন্যস্থান',
      narrationEn: 'However, half of the voids from Layer A are still uncovered. These form Octahedral Voids (red) between the two layers.',
      narrationBn: 'যাইহোক, A স্তরের অর্ধেক শূন্যস্থান এখনও অনাবৃত। এগুলো দুটি স্তরের মধ্যে অক্টাহেড্রাল শূন্যস্থান (লাল) তৈরি করে।',
      durationMs: 1500,
      pauseAfterMs: 1500,
      actions: [{ type: 'SHOW_VOID', targetIds: ['ov-0-0-0'] }],
      highlightParticleIds: ['atom-0-0-0', 'atom-0-1-0', 'atom-1-0-0', 'atom-0-0-1', 'atom-0-1-1', 'atom-1-0-1'], 
      dimOtherParticles: true
    },
    {
      id: 'step-4',
      titleEn: 'Third Layer (C)',
      titleBn: 'তৃতীয় স্তর (C)',
      narrationEn: 'In CCP, the third layer covers these Octahedral voids. This is a brand new position, called Layer C (ABCABC).',
      narrationBn: 'CCP তে, তৃতীয় স্তরটি এই অক্টাহেড্রাল শূন্যস্থানগুলিকে আবৃত করে। এটি একটি সম্পূর্ণ নতুন অবস্থান, যাকে C স্তর বলা হয় (ABCABC)।',
      durationMs: 2500,
      pauseAfterMs: 1000,
      camera: { position: [8, 0, 4] },
      actions: [{ type: 'ADD_LAYER', targetIds: getLayer(2) }],
      dimOtherParticles: false,
      highlightParticleIds: undefined
    },
    {
      id: 'step-5',
      titleEn: 'Coordination: Own Layer',
      titleBn: 'সমন্বয়: নিজস্ব স্তর',
      narrationEn: 'For CCP, we also start by looking at a central atom in Layer B, touching 6 neighbors in its own plane.',
      narrationBn: 'CCP এর জন্য, আমরা স্তর B এর একটি কেন্দ্রীয় পরমাণুর দিকে তাকিয়ে শুরু করি, যা তার নিজস্ব সমতলে ৬টি প্রতিবেশীকে স্পর্শ করে।',
      durationMs: 2000,
      pauseAfterMs: 1000,
      camera: { position: [0, 0, 10] },
      actions: [],
      highlightParticleIds: ['atom-0-0-1', 'atom--1-0-1', 'atom-1-0-1', 'atom-0-1-1', 'atom--1-1-1', 'atom-0--1-1', 'atom--1--1-1'],
      dimOtherParticles: true,
      showContactLines: [
        { from: 'atom-0-0-1', to: 'atom--1-0-1' },
        { from: 'atom-0-0-1', to: 'atom-1-0-1' },
        { from: 'atom-0-0-1', to: 'atom-0-1-1' },
        { from: 'atom-0-0-1', to: 'atom--1-1-1' },
        { from: 'atom-0-0-1', to: 'atom-0--1-1' },
        { from: 'atom-0-0-1', to: 'atom--1--1-1' }
      ]
    },
    {
      id: 'step-6',
      titleEn: 'Coordination: Bottom Layer',
      titleBn: 'সমন্বয়: নিচের স্তর',
      narrationEn: 'It touches 3 atoms in the bottom Layer A.',
      narrationBn: 'এটি নিচের স্তর A তে ৩টি পরমাণুকে স্পর্শ করে।',
      durationMs: 2000,
      pauseAfterMs: 1000,
      camera: { position: [4, -8, 6] },
      actions: [],
      highlightParticleIds: ['atom-0-0-1', 'atom-0-0-0', 'atom-1-0-0', 'atom-0-1-0'],
      dimOtherParticles: true,
      showContactLines: [
        { from: 'atom-0-0-1', to: 'atom-0-0-0' },
        { from: 'atom-0-0-1', to: 'atom-1-0-0' },
        { from: 'atom-0-0-1', to: 'atom-0-1-0' }
      ]
    },
    {
      id: 'step-7',
      titleEn: 'Coordination: Top Layer',
      titleBn: 'সমন্বয়: উপরের স্তর',
      narrationEn: 'Unlike HCP, the top layer is Layer C! But because of the offset, it STILL exactly touches 3 atoms above.',
      narrationBn: 'HCP এর মত নয়, উপরের স্তরটি হল স্তর C! কিন্তু অফসেটের কারণে, এটি এখনও ঠিক ৩টি পরমাণুকে স্পর্শ করে।',
      durationMs: 2000,
      pauseAfterMs: 1000,
      camera: { position: [4, 8, 6] },
      actions: [],
      highlightParticleIds: ['atom-0-0-1', 'atom-0-0-2', 'atom-0-1-2', 'atom--1-1-2'],
      dimOtherParticles: true,
      showContactLines: [
        { from: 'atom-0-0-1', to: 'atom-0-0-2' },
        { from: 'atom-0-0-1', to: 'atom-0-1-2' },
        { from: 'atom-0-0-1', to: 'atom--1-1-2' }
      ]
    },
    {
      id: 'step-8',
      titleEn: 'Total CCP Coordination',
      titleBn: 'মোট CCP সমন্বয়',
      narrationEn: 'Even though the stacking is different, each atom is still incredibly densely packed.',
      narrationBn: 'যদিও স্তূপীকরণ ভিন্ন, তবুও প্রতিটি পরমাণু অবিশ্বাস্যভাবে ঘনভাবে প্যাক করা হয়।',
      durationMs: 1000,
      pauseAfterMs: 0,
      camera: { position: [8, 0, 4] },
      actions: [],
      highlightParticleIds: [
         'atom-0-0-1', 
         'atom--1-0-1', 'atom-1-0-1', 'atom-0-1-1', 'atom--1-1-1', 'atom-0--1-1', 'atom--1--1-1',
         'atom-0-0-0', 'atom-1-0-0', 'atom-0-1-0',
         'atom-0-0-2', 'atom-0-1-2', 'atom--1-1-2'
      ],
      dimOtherParticles: true,
      checkpoint: {
        promptEn: 'What is the coordination number for CCP/FCC?',
        promptBn: 'CCP/FCC এর সমন্বয় সংখ্যা কত?',
        expectedAnswer: '12',
        hintEn: 'It is identical to HCP. 6 + 3 + 3',
        hintBn: 'এটি HCP এর মতোই। ৬ + ৩ + ৩'
      }
    }
  ]
};

export const allSequences: Record<PackingType, AnimationSequence> = {
  square2d: square2dSequence,
  hexagonal2d: hexagonal2dSequence,
  hcp3d: hcp3dSequence,
  ccp3d: ccp3dSequence
};
