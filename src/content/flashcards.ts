export type Flashcard = {
  id: string;
  term: { en: string; bn: string };
  definition: { en: string; bn: string };
};

export const FLASHCARD_DECK: Flashcard[] = [
  {
    id: "f1",
    term: { en: "Crystal Lattice", bn: "স্ফটিক জালক" },
    definition: {
      en: "A regular, repeating 3D arrangement of points (atoms, ions, or molecules) in space.",
      bn: "শূন্যস্থানে বিন্দুগুলির (পরমাণু, আয়ন বা অণু) একটি নিয়মিত, পুনরাবৃত্তিমূলক ত্রিমাত্রিক বিন্যাস।"
    }
  },
  {
    id: "f2",
    term: { en: "Unit Cell", bn: "একক কোষ" },
    definition: {
      en: "The smallest repeating portion of a crystal lattice which, when repeated in different directions, generates the entire lattice.",
      bn: "স্ফটিক জালকের ক্ষুদ্রতম পুনরাবৃত্তিমূলক অংশ যা বিভিন্ন দিকে পুনরাবৃত্ত হলে সম্পূর্ণ জালক তৈরি করে।"
    }
  },
  {
    id: "f3",
    term: { en: "Coordination Number", bn: "কোঅর্ডিনেশন সংখ্যা" },
    definition: {
      en: "The number of nearest neighbours surrounding a particular atom or ion in a crystal lattice.",
      bn: "একটি স্ফটিক জালকে একটি নির্দিষ্ট পরমাণু বা আয়নের চারপাশের নিকটতম প্রতিবেশীর সংখ্যা।"
    }
  },
  {
    id: "f4",
    term: { en: "Packing Efficiency", bn: "প্যাকিং দক্ষতা" },
    definition: {
      en: "The percentage of total space filled by the constituent particles in a unit cell.",
      bn: "একটি একক কোষে গঠনকারী কণা দ্বারা পূর্ণ মোট স্থানের শতাংশ।"
    }
  },
  {
    id: "f5",
    term: { en: "Tetrahedral Void", bn: "চতুস্তলকীয় শূন্যস্থান" },
    definition: {
      en: "An empty space surrounded by four spheres forming a tetrahedron.",
      bn: "চারটি গোলক দ্বারা বেষ্টিত একটি ফাঁকা স্থান যা একটি চতুস্তলক গঠন করে।"
    }
  },
  {
    id: "f6",
    term: { en: "Octahedral Void", bn: "অষ্টতলকীয় শূন্যস্থান" },
    definition: {
      en: "An empty space surrounded by six spheres forming an octahedron.",
      bn: "ছয়টি গোলক দ্বারা বেষ্টিত একটি ফাঁকা স্থান যা একটি অষ্টতলক গঠন করে।"
    }
  },
  {
    id: "f7",
    term: { en: "Schottky Defect", bn: "শটকি ত্রুটি" },
    definition: {
      en: "A vacancy defect in ionic solids where an equal number of cations and anions are missing. Decreases density.",
      bn: "আয়নিক কঠিন পদার্থের একটি শূন্যস্থান ত্রুটি যেখানে সমান সংখ্যক ক্যাটায়ন এবং অ্যানায়ন অনুপস্থিত থাকে। এটি ঘনত্ব হ্রাস করে।"
    }
  },
  {
    id: "f8",
    term: { en: "Frenkel Defect", bn: "ফ্রেঙ্কেল ত্রুটি" },
    definition: {
      en: "A dislocation defect where a smaller ion is displaced from its normal site to an interstitial site. Does not change density.",
      bn: "একটি স্থানচ্যুতি ত্রুটি যেখানে একটি ছোট আয়ন তার স্বাভাবিক স্থান থেকে একটি ইন্টারস্টিশিয়াল স্থানে স্থানচ্যুত হয়। এটি ঘনত্ব পরিবর্তন করে না।"
    }
  },
  {
    id: "f9",
    term: { en: "F-Center", bn: "এফ-সেন্টার" },
    definition: {
      en: "An anionic vacancy occupied by an unpaired electron, responsible for imparting colour to the crystal.",
      bn: "একটি বিজোড় ইলেকট্রন দ্বারা দখলকৃত একটি অ্যানায়নিক শূন্যস্থান, যা স্ফটিককে রঙ প্রদানের জন্য দায়ী।"
    }
  },
  {
    id: "f10",
    term: { en: "Bragg's Law", bn: "ব্র্যাগের সূত্র" },
    definition: {
      en: "nλ = 2d sin(θ), a fundamental equation used in X-ray crystallography to determine crystal structure.",
      bn: "nλ = 2d sin(θ), এক্স-রে ক্রিস্টালোগ্রাফিতে স্ফটিক কাঠামো নির্ধারণের জন্য ব্যবহৃত একটি মৌলিক সমীকরণ।"
    }
  },
  {
    id: "f11",
    term: { en: "Close Packing", bn: "ঘন সন্নিবেশ" },
    definition: {
      en: "The most efficient arrangement of spheres in a given space, leaving minimal empty space.",
      bn: "প্রদত্ত স্থানে গোলকগুলির সবচেয়ে কার্যকরী বিন্যাস, যা ন্যূনতম খালি জায়গা রাখে।"
    }
  },
  {
    id: "f12",
    term: { en: "Hexagonal Close Packing (HCP)", bn: "ষড়ভুজীয় ঘন সন্নিবেশ" },
    definition: {
      en: "A 3D close-packed structure formed by ABABAB... layer stacking.",
      bn: "ABABAB... স্তরবিন্যাস দ্বারা গঠিত একটি ৩ডি ঘন সন্নিবিষ্ট গঠন।"
    }
  },
  {
    id: "f13",
    term: { en: "Cubic Close Packing (CCP)", bn: "ঘনকীয় ঘন সন্নিবেশ" },
    definition: {
      en: "A 3D close-packed structure formed by ABCABC... layer stacking, equivalent to FCC.",
      bn: "ABCABC... স্তরবিন্যাস দ্বারা গঠিত একটি ৩ডি ঘন সন্নিবিষ্ট গঠন, যা FCC এর সমতুল্য।"
    }
  },
  {
    id: "f14",
    term: { en: "Primitive Cell", bn: "আদিম কোষ" },
    definition: {
      en: "A unit cell containing exactly one lattice point (effective atom count = 1).",
      bn: "একটি একক কোষ যাতে ঠিক একটি জালক বিন্দু থাকে (কার্যকর পরমাণুর সংখ্যা = ১)।"
    }
  }
];
