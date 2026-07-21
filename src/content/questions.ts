export type Question = {
  id: string;
  moduleId: string;
  text: { en: string; bn: string };
  options: { id: string; text: { en: string; bn: string } }[];
  correctOptionId: string;
  explanation: { en: string; bn: string };
};

export const QUESTION_BANK: Question[] = [
  // Lattices & Unit Cells
  {
    id: "q1",
    moduleId: "01-unit-cell",
    text: { 
      en: "What is the total number of atoms per unit cell in a Face-Centred Cubic (FCC) lattice?",
      bn: "পৃষ্ঠ-কেন্দ্রিক ঘনকাকার (FCC) জালকের প্রতি একক কোষে মোট পরমাণুর সংখ্যা কত?"
    },
    options: [
      { id: "a", text: { en: "1", bn: "১" } },
      { id: "b", text: { en: "2", bn: "২" } },
      { id: "c", text: { en: "4", bn: "৪" } },
      { id: "d", text: { en: "8", bn: "৮" } }
    ],
    correctOptionId: "c",
    explanation: {
      en: "An FCC cell has 8 corner atoms (8 * 1/8 = 1) and 6 face atoms (6 * 1/2 = 3). Total = 1 + 3 = 4 atoms.",
      bn: "একটি FCC কোষে ৮টি কোণে পরমাণু (৮ * ১/৮ = ১) এবং ৬টি পৃষ্ঠে পরমাণু (৬ * ১/২ = ৩) থাকে। মোট = ১ + ৩ = ৪টি পরমাণু।"
    }
  },
  {
    id: "q2",
    moduleId: "01-unit-cell",
    text: { 
      en: "What fraction of a corner atom actually belongs to a single cubic unit cell?",
      bn: "একটি কোণের পরমাণুর কত অংশ প্রকৃতপক্ষে একটি একক ঘনকাকার কোষের অন্তর্গত?"
    },
    options: [
      { id: "a", text: { en: "1/2", bn: "১/২" } },
      { id: "b", text: { en: "1/4", bn: "১/৪" } },
      { id: "c", text: { en: "1/8", bn: "১/৮" } },
      { id: "d", text: { en: "1", bn: "১" } }
    ],
    correctOptionId: "c",
    explanation: {
      en: "A corner atom is shared equally by 8 adjacent unit cells. Therefore, only 1/8th belongs to one unit cell.",
      bn: "একটি কোণের পরমাণু ৮টি সংলগ্ন একক কোষ দ্বারা সমানভাবে ভাগ করা হয়। তাই এর মাত্র ১/৮ অংশ একটি একক কোষের অন্তর্গত।"
    }
  },
  {
    id: "q3",
    moduleId: "01-unit-cell",
    text: { 
      en: "In a Body-Centred Cubic (BCC) structure, where are the lattice points located?",
      bn: "দেহ-কেন্দ্রিক ঘনকাকার (BCC) কাঠামোতে জালক বিন্দুগুলি কোথায় অবস্থিত?"
    },
    options: [
      { id: "a", text: { en: "Only at the corners", bn: "শুধুমাত্র কোণে" } },
      { id: "b", text: { en: "At the corners and face centers", bn: "কোণে এবং পৃষ্ঠের কেন্দ্রে" } },
      { id: "c", text: { en: "At the corners and one at the body center", bn: "কোণে এবং একটি দেহের কেন্দ্রে" } },
      { id: "d", text: { en: "Only at the face centers", bn: "শুধুমাত্র পৃষ্ঠের কেন্দ্রে" } }
    ],
    correctOptionId: "c",
    explanation: {
      en: "BCC consists of atoms at all 8 corners and exactly 1 atom at the very center of the unit cell body.",
      bn: "BCC কাঠামোতে ৮টি কোণে পরমাণু থাকে এবং ঠিক ১টি পরমাণু একক কোষের দেহের কেন্দ্রে থাকে।"
    }
  },

  // Packing
  {
    id: "q4",
    moduleId: "04-packing",
    text: {
      en: "What is the packing efficiency of a Face-Centred Cubic (FCC) lattice?",
      bn: "পৃষ্ঠ-কেন্দ্রিক ঘনকাকার (FCC) জালকের প্যাকিং দক্ষতা কত?"
    },
    options: [
      { id: "a", text: { en: "52.4%", bn: "৫২.৪%" } },
      { id: "b", text: { en: "68%", bn: "৬৮%" } },
      { id: "c", text: { en: "74%", bn: "৭৪%" } },
      { id: "d", text: { en: "78%", bn: "৭৮%" } }
    ],
    correctOptionId: "c",
    explanation: {
      en: "FCC (and hcp) have the highest possible packing efficiency for spheres of the same size, which is exactly 74%.",
      bn: "FCC (এবং hcp) এর একই আকারের গোলকের জন্য সর্বোচ্চ সম্ভাব্য প্যাকিং দক্ষতা রয়েছে, যা ঠিক ৭৪%।"
    }
  },
  {
    id: "q5",
    moduleId: "04-packing",
    text: {
      en: "How many tetrahedral voids are present per atom in a close-packed structure?",
      bn: "একটি ঘন সন্নিবিষ্ট কাঠামোতে প্রতি পরমাণুতে কয়টি চতুস্তলকীয় শূন্যস্থান উপস্থিত থাকে?"
    },
    options: [
      { id: "a", text: { en: "1", bn: "১" } },
      { id: "b", text: { en: "2", bn: "২" } },
      { id: "c", text: { en: "4", bn: "৪" } },
      { id: "d", text: { en: "8", bn: "৮" } }
    ],
    correctOptionId: "b",
    explanation: {
      en: "If there are N atoms in a close-packed lattice, there are 2N tetrahedral voids and N octahedral voids.",
      bn: "যদি একটি ঘন সন্নিবিষ্ট জালকে N টি পরমাণু থাকে, তবে সেখানে 2N টি চতুস্তলকীয় শূন্যস্থান এবং N টি অষ্টতলকীয় শূন্যস্থান থাকে।"
    }
  },
  {
    id: "q6",
    moduleId: "04-packing",
    text: {
      en: "In a Simple Cubic (SC) lattice, the relationship between edge length (a) and atomic radius (r) is:",
      bn: "সরল ঘনকাকার (SC) জালকে প্রান্তের দৈর্ঘ্য (a) এবং পারমাণবিক ব্যাসার্ধ (r) এর মধ্যে সম্পর্ক হলো:"
    },
    options: [
      { id: "a", text: { en: "a = 2r", bn: "a = 2r" } },
      { id: "b", text: { en: "a = 2√2 r", bn: "a = 2√2 r" } },
      { id: "c", text: { en: "a = 4r / √3", bn: "a = 4r / √3" } },
      { id: "d", text: { en: "a = r", bn: "a = r" } }
    ],
    correctOptionId: "a",
    explanation: {
      en: "In an SC lattice, atoms touch each other along the edges, so the edge length 'a' is simply twice the radius 'r' (a = 2r).",
      bn: "একটি SC জালকে পরমাণুগুলি প্রান্ত বরাবর একে অপরকে স্পর্শ করে, তাই প্রান্তের দৈর্ঘ্য 'a' হলো ব্যাসার্ধ 'r' এর দ্বিগুণ (a = 2r)।"
    }
  },
  {
    id: "q5_packing_cn",
    moduleId: "04-packing",
    text: {
      en: "What is the coordination number of an internal particle in a two-dimensional hexagonal packing?",
      bn: "দ্বিমাত্রিক ষড়ভুজীয় সন্নিবেশে একটি অভ্যন্তরীণ কণার সমন্বয় সংখ্যা কত?"
    },
    options: [
      { id: "a", text: { en: "2", bn: "২" } },
      { id: "b", text: { en: "4", bn: "৪" } },
      { id: "c", text: { en: "6", bn: "৬" } },
      { id: "d", text: { en: "12", bn: "১২" } }
    ],
    correctOptionId: "c",
    explanation: {
      en: "In 2D hexagonal packing, each sphere is in contact with six other spheres, hence the coordination number is 6.",
      bn: "২D ষড়ভুজীয় সন্নিবেশে, প্রতিটি গোলক অন্য ছয়টি গোলকের সংস্পর্শে থাকে, তাই সমন্বয় সংখ্যা হলো ৬।"
    }
  },
  {
    id: "q6_packing_hcp",
    moduleId: "04-packing",
    text: {
      en: "Which layer sequence correctly describes Hexagonal Close Packing (HCP)?",
      bn: "কোন স্তরবিন্যাসটি সঠিকভাবে ষড়ভুজীয় ঘন সন্নিবেশ (HCP) বর্ণনা করে?"
    },
    options: [
      { id: "a", text: { en: "AAAA...", bn: "AAAA..." } },
      { id: "b", text: { en: "ABAB...", bn: "ABAB..." } },
      { id: "c", text: { en: "ABCABC...", bn: "ABCABC..." } },
      { id: "d", text: { en: "ABBA...", bn: "ABBA..." } }
    ],
    correctOptionId: "b",
    explanation: {
      en: "HCP is formed when the third layer is directly above the first layer, resulting in an ABAB alternating sequence.",
      bn: "HCP গঠিত হয় যখন তৃতীয় স্তরটি সরাসরি প্রথম স্তরের উপরে থাকে, যার ফলে একটি ABAB বিকল্প ক্রম তৈরি হয়।"
    }
  },
  {
    id: "q7_packing_sequence",
    moduleId: "04-packing",
    text: {
      en: "Which of the following structures is generated by the AAA stacking of square-packed layers?",
      bn: "বর্গাকার স্তরের AAA সন্নিবেশের মাধ্যমে নিচের কোন গঠনটি তৈরি হয়?"
    },
    options: [
      { id: "a", text: { en: "Simple Cubic", bn: "সরল ঘনকাকার" } },
      { id: "b", text: { en: "Body-Centred Cubic (BCC)", bn: "দেহ-কেন্দ্রিক ঘনকাকার (BCC)" } },
      { id: "c", text: { en: "Face-Centred Cubic (FCC)", bn: "তলকেন্দ্রিক ঘনকাকার (FCC)" } },
      { id: "d", text: { en: "Hexagonal Close Packing (HCP)", bn: "ষড়ভুজীয় ঘন সন্নিবেশ (HCP)" } }
    ],
    correctOptionId: "a",
    explanation: {
      en: "Placing identical square layers directly on top of each other aligns all spheres vertically, forming a simple cubic structure with CN=6.",
      bn: "অভিন্ন বর্গাকার স্তরগুলিকে সরাসরি একে অপরের উপরে রাখলে সমস্ত গোলক উলম্বভাবে সারিবদ্ধ হয়, যা CN=৬ সহ একটি সরল ঘনকাকার গঠন তৈরি করে।"
    }
  },

  // Density
  {
    id: "q7",
    moduleId: "02-density",
    text: {
      en: "Which of the following formulas correctly calculates the density of a unit cell?",
      bn: "নিচের কোন সূত্রটি একক কোষের ঘনত্ব সঠিকভাবে গণনা করে?"
    },
    options: [
      { id: "a", text: { en: "ρ = (Z * M) / (a^3)", bn: "ρ = (Z * M) / (a^3)" } },
      { id: "b", text: { en: "ρ = (Z * M) / (N_A * a^3)", bn: "ρ = (Z * M) / (N_A * a^3)" } },
      { id: "c", text: { en: "ρ = (N_A * a^3) / (Z * M)", bn: "ρ = (N_A * a^3) / (Z * M)" } },
      { id: "d", text: { en: "ρ = (Z * a^3) / (N_A * M)", bn: "ρ = (Z * a^3) / (N_A * M)" } }
    ],
    correctOptionId: "b",
    explanation: {
      en: "Density is Mass / Volume. Mass of the unit cell is (Z * M)/N_A, and the volume is a^3.",
      bn: "ঘনত্ব হলো ভর / আয়তন। একক কোষের ভর হলো (Z * M)/N_A, এবং আয়তন হলো a^3।"
    }
  },

  // Defects
  {
    id: "q8",
    moduleId: "03-defects",
    text: {
      en: "What type of stoichiometric defect occurs when equal numbers of cations and anions are missing from the lattice?",
      bn: "জালক থেকে সমান সংখ্যক ক্যাটায়ন এবং অ্যানায়ন অনুপস্থিত থাকলে কোন ধরনের স্টয়কিওমেট্রিক ত্রুটি ঘটে?"
    },
    options: [
      { id: "a", text: { en: "Frenkel Defect", bn: "ফ্রেঙ্কেল ত্রুটি" } },
      { id: "b", text: { en: "Schottky Defect", bn: "শটকি ত্রুটি" } },
      { id: "c", text: { en: "Metal Excess Defect", bn: "ধাতু আধিক্য ত্রুটি" } },
      { id: "d", text: { en: "Interstitial Defect", bn: "ইন্টারস্টিশিয়াল ত্রুটি" } }
    ],
    correctOptionId: "b",
    explanation: {
      en: "Schottky defect is a vacancy defect in ionic solids where pairs of ions (cation and anion) are missing, decreasing the overall density.",
      bn: "শটকি ত্রুটি হলো আয়নিক কঠিন পদার্থের একটি শূন্যস্থান ত্রুটি যেখানে আয়নের জোড়া (ক্যাটায়ন এবং অ্যানায়ন) অনুপস্থিত থাকে, যা সামগ্রিক ঘনত্ব হ্রাস করে।"
    }
  },
  {
    id: "q9",
    moduleId: "03-defects",
    text: {
      en: "Frenkel defect is generally shown by ionic compounds having:",
      bn: "ফ্রেঙ্কেল ত্রুটি সাধারণত কোন আয়নিক যৌগগুলি প্রদর্শন করে?"
    },
    options: [
      { id: "a", text: { en: "Large difference in the size of cations and anions", bn: "ক্যাটায়ন এবং অ্যানায়নের আকারের মধ্যে বড় পার্থক্য" } },
      { id: "b", text: { en: "Similar size of cations and anions", bn: "ক্যাটায়ন এবং অ্যানায়নের অনুরূপ আকার" } },
      { id: "c", text: { en: "High coordination number", bn: "উচ্চ কোঅর্ডিনেশন সংখ্যা" } },
      { id: "d", text: { en: "Very high lattice enthalpy", bn: "খুব উচ্চ জালক এনথালপি" } }
    ],
    correctOptionId: "a",
    explanation: {
      en: "Frenkel defect involves a smaller ion (usually cation) dislocating to an interstitial site. It requires a large size difference to fit.",
      bn: "ফ্রেঙ্কেল ত্রুটিতে একটি ছোট আয়ন (সাধারণত ক্যাটায়ন) একটি ইন্টারস্টিশিয়াল স্থানে স্থানচ্যুত হয়। এটি ফিট করার জন্য আকারের বড় পার্থক্য প্রয়োজন।"
    }
  },
  {
    id: "q10",
    moduleId: "03-defects",
    text: {
      en: "Which defect causes the crystal density to decrease?",
      bn: "কোন ত্রুটির কারণে স্ফটিকের ঘনত্ব হ্রাস পায়?"
    },
    options: [
      { id: "a", text: { en: "Frenkel Defect", bn: "ফ্রেঙ্কেল ত্রুটি" } },
      { id: "b", text: { en: "Schottky Defect", bn: "শটকি ত্রুটি" } },
      { id: "c", text: { en: "Metal Deficiency Defect", bn: "ধাতব ঘাটতি ত্রুটি" } },
      { id: "d", text: { en: "F-Center Defect", bn: "এফ-সেন্টার ত্রুটি" } }
    ],
    correctOptionId: "b",
    explanation: {
      en: "Because equal numbers of cations and anions physically leave the crystal lattice in a Schottky defect, the mass decreases while volume stays constant, lowering density.",
      bn: "যেহেতু শটকি ত্রুটিতে সমান সংখ্যক ক্যাটায়ন এবং অ্যানায়ন শারীরিকভাবে স্ফটিক জালক ছেড়ে যায়, তাই আয়তন ধ্রুবক থাকার সময় ভর হ্রাস পায়, যার ফলে ঘনত্ব কমে যায়।"
    }
  }
];
