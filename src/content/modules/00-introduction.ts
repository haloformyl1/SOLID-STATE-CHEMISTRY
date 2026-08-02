import type { ModuleContent } from '../../types/content';

export const IntroductionModule: ModuleContent = {
  id: 'introduction-solid-state',
  title: {
    en: 'Introduction to the Solid State',
    bn: 'কঠিন অবস্থার ভূমিকা'
  },
  
  order: 0,
  learningObjectives: [
    { en: 'Understand the general characteristics of solid state matter.', bn: 'কঠিন অবস্থার পদার্থের সাধারণ বৈশিষ্ট্যগুলি বুঝতে পারা।' },
    { en: 'Differentiate between crystalline and amorphous solids.', bn: 'স্ফটিকাকার এবং অস্ফটিকাকার কঠিন পদার্থের মধ্যে পার্থক্য করতে পারা।' },
    { en: 'Classify crystalline solids based on binding forces.', bn: 'বন্ধন বলের উপর ভিত্তি করে স্ফটিকাকার কঠিন পদার্থগুলিকে শ্রেণিবদ্ধ করা।' }
  ],
  misconceptions: [],
  summary: [],
  practiceQuestionIds: [],
  glossaryReferences: [],
  sections: [
    // 1. What Is a Solid?
    {
      id: 'sec-what-is-solid',
      type: 'interactive_2d',
      title: { en: 'What Is a Solid?', bn: 'কঠিন পদার্থ কী?' },
      content: {
        en: 'A solid is a state of matter in which the constituent particles remain closely associated and normally occupy stable average positions, while continuing to vibrate around those positions. The constituent particles may be atoms, ions, or molecules.',
        bn: 'কঠিন পদার্থ হল পদার্থের এমন একটি অবস্থা যেখানে গঠনকারী কণাগুলি পরস্পরের কাছাকাছি থাকে এবং সাধারণত স্থিতিশীল গড় অবস্থান দখল করে, যদিও তারা ওই অবস্থানের চারপাশে কম্পন করে। গঠনকারী কণাগুলি পরমাণু, আয়ন বা অণু হতে পারে।'
      },
      modelConfig: { type: 'what-is-solid-lab' }
    },
    // 2. General Characteristics of Solids
    {
      id: 'sec-characteristics',
      type: 'interactive_3d',
      title: { en: 'General Characteristics of Solids', bn: 'কঠিন পদার্থের সাধারণ বৈশিষ্ট্য' },
      content: {
        en: 'Solids have closely arranged constituent particles, small interparticle separation, stable average positions, vibrational motion, definite shape, definite volume, significant attractive interactions, low compressibility, rigidity, and very slow diffusion compared with liquids and gases.',
        bn: 'কঠিন পদার্থের বৈশিষ্ট্যগুলি হল কাছাকাছি বিন্যস্ত গঠনকারী কণা, ক্ষুদ্র আন্তঃকণা দূরত্ব, স্থিতিশীল গড় অবস্থান, কম্পনশীল গতি, নির্দিষ্ট আকার, নির্দিষ্ট আয়তন, শক্তিশালী আকর্ষণী মিথস্ক্রিয়া, নিম্ন সংকোচনশীলতা, দৃঢ়তা এবং তরল ও গ্যাসের তুলনায় খুব ধীর ব্যাপন।'
      },
      modelConfig: { type: 'solid-builder-lab' }
    },
    // 3. Crystalline and Amorphous Solids
    {
      id: 'sec-cryst-amorph',
      type: 'interactive_3d',
      title: { en: 'Crystalline and Amorphous Solids', bn: 'স্ফটিকাকার এবং অস্ফটিকাকার কঠিন' },
      content: {
        en: 'Crystalline solids have a regular and repeating particle arrangement with three-dimensional long-range periodic order, generally a definite melting temperature, and preferred cleavage planes (e.g., NaCl, diamond). Amorphous solids lack long-range periodic order but may possess short-range local order, soften gradually over a temperature range, and show irregular fracture (e.g., glass, rubber). Note: Amorphous solids are best described as lacking long-range periodic order rather than merely being "slowly flowing liquids".',
        bn: 'স্ফটিকাকার কঠিন পদার্থে কণাগুলির একটি নিয়মিত এবং পুনরাবৃত্তিমূলক বিন্যাস থাকে যার ত্রিমাত্রিক দীর্ঘ-পাল্লার পর্যায়ক্রমিক শৃঙ্খলা থাকে, সাধারণত একটি নির্দিষ্ট গলনাঙ্ক থাকে এবং একটি নির্দিষ্ট তলে ভেঙে যায় (যেমন- NaCl, হীরা)। অস্ফটিকাকার কঠিন পদার্থে দীর্ঘ-পাল্লার পর্যায়ক্রমিক শৃঙ্খলার অভাব থাকে তবে স্বল্প-পাল্লার স্থানীয় শৃঙ্খলা থাকতে পারে, এটি নির্দিষ্ট তাপমাত্রা পরিসরে ধীরে ধীরে নরম হয় এবং অনিয়মিতভাবে ভেঙে যায় (যেমন- কাঁচ, রাবার)। দ্রষ্টব্য: অস্ফটিকাকার কঠিন পদার্থগুলিকে কেবল "ধীরে প্রবাহিত তরল" বলার চেয়ে দীর্ঘ-পাল্লার পর্যায়ক্রমিক শৃঙ্খলার অভাব হিসেবে বর্ণনা করা বেশি বিজ্ঞানসম্মত।'
      },
      modelConfig: { type: 'cryst-amorph-lab' }
    },
    // 4. Anisotropy and Isotropy
    {
      id: 'sec-anisotropy',
      type: 'interactive_2d',
      title: { en: 'Anisotropy and Isotropy', bn: 'অসমদিকতা এবং সমদিকতা' },
      content: {
        en: 'A material is anisotropic with respect to a property when that property has different measured values in different directions. A material is isotropic when the measured value is independent of direction. Crystalline solids are generally anisotropic, while amorphous solids are generally isotropic. Advanced Insight: Anisotropy is property-specific. Highly symmetric crystals may behave isotropically for certain physical properties.',
        bn: 'যখন কোনো পদার্থের একটি নির্দিষ্ট বৈশিষ্ট্যের মান বিভিন্ন দিকে বিভিন্ন হয়, তখন পদার্থটিকে ওই বৈশিষ্ট্যের সাপেক্ষে অসমদিক বা দিকনির্ভর বলা হয়। অন্যদিকে, যখন বৈশিষ্ট্যের মান দিকের উপর নির্ভর করে না, তখন তাকে সমদিক বা দিকনিরপেক্ষ বলা হয়। স্ফটিকাকার কঠিন পদার্থ সাধারণত অসমদিক হয়, অন্যদিকে অস্ফটিকাকার কঠিন পদার্থ সাধারণত সমদিক হয়। উন্নত অন্তর্দৃষ্টি: অসমদিকতা বৈশিষ্ট্য-নির্দিষ্ট। অত্যন্ত প্রতিসম স্ফটিক নির্দিষ্ট কিছু ভৌত বৈশিষ্ট্যের জন্য সমদিকের মতো আচরণ করতে পারে।'
      },
      modelConfig: { type: 'anisotropy-lab' }
    },
    // 5. Classification of Crystalline Solids
    {
      id: 'sec-classification-tree',
      type: 'interactive_2d',
      title: { en: 'Classification of Crystalline Solids', bn: 'স্ফটিকাকার কঠিন পদার্থের শ্রেণিবিন্যাস' },
      content: {
        en: 'Crystalline solids are classified based on the nature of their constituent particles and the binding forces operating between them. The main categories are Ionic, Metallic, Covalent (Network), and Molecular solids. Molecular solids further expand into Non-polar, Polar, and Hydrogen-bonded.',
        bn: 'স্ফটিকাকার কঠিন পদার্থগুলিকে তাদের গঠনকারী কণা এবং তাদের মধ্যে ক্রিয়াশীল বন্ধন বা আকর্ষণী বলের প্রকৃতির উপর ভিত্তি করে শ্রেণিবদ্ধ করা হয়। প্রধান বিভাগগুলি হল আয়নিক, ধাতব, সমযোজী (জালকীয়) এবং আণবিক কঠিন পদার্থ। আণবিক কঠিন পদার্থগুলি আরও তিনটি ভাগে বিভক্ত: অধ্রুবীয়, ধ্রুবীয় এবং হাইড্রোজেন-বন্ধনযুক্ত।'
      },
      modelConfig: { type: 'classification-tree-lab' }
    },
    {
      id: 'sec-binding-forces',
      type: 'interactive_3d',
      title: { en: 'Interactive Exploration: Binding Forces', bn: 'ইন্টারেক্টিভ অন্বেষণ: বন্ধন বল' },
      content: { en: 'Explore the different types of binding forces that hold crystalline solids together.', bn: 'স্ফটিকাকার কঠিন পদার্থগুলিকে একত্রে ধরে রাখা বিভিন্ন ধরণের বন্ধন বলগুলি অন্বেষণ করুন।' },
      modelConfig: { type: 'binding-force-lab' }
    },
    // 5.1 Ionic Solids
    {
      id: 'sec-ionic',
      type: 'text',
      title: { en: 'Ionic Solids', bn: 'আয়নিক কঠিন' },
      content: {
        en: 'Constituent particles are cations and anions held by strong electrostatic attraction. They are generally hard and brittle, have high melting points, and are poor electrical conductors in the solid state. However, they conduct electricity when molten or in aqueous solution because the ions become mobile. Examples: NaCl, KCl, MgO.',
        bn: 'গঠনকারী কণাগুলি হল ক্যাটায়ন এবং অ্যানায়ন যা শক্তিশালী স্থির-তড়িৎ আকর্ষণ বল দ্বারা যুক্ত থাকে। এগুলি সাধারণত শক্ত এবং ভঙ্গুর হয়, গলনাঙ্ক উচ্চ হয় এবং কঠিন অবস্থায় বিদ্যুৎ পরিবহনে অক্ষম। তবে গলিত বা জলীয় দ্রবণে এরা বিদ্যুৎ পরিবহন করে কারণ তখন আয়নগুলি সচল হয়। উদাহরণ: NaCl, KCl, MgO।'
      }
    },
    {
      id: 'sec-conductivity-lab',
      type: 'interactive_3d',
      title: { en: 'Interactive Exploration: Ionic Conductivity', bn: 'ইন্টারেক্টিভ অন্বেষণ: আয়নিক পরিবাহিতা' },
      content: { en: 'Understand why ionic solids conduct electricity only in the molten state.', bn: 'আয়নিক কঠিন পদার্থগুলি কেন কেবল গলিত অবস্থায় বিদ্যুৎ পরিবহন করে তা বুঝুন।' },
      modelConfig: { type: 'conductivity-lab' }
    },
    // 5.2 Metallic Solids
    {
      id: 'sec-metallic',
      type: 'text',
      title: { en: 'Metallic Solids', bn: 'ধাতব কঠিন' },
      content: {
        en: 'The microscopic model consists of positive metal cores associated with delocalised valence electrons, held together by metallic bonding. They are good electrical and thermal conductors, generally malleable and ductile, often lustrous, and have varying hardness and melting points. Examples: Fe, Cu, Zn, Ag, Au.',
        bn: 'এর আণুবীক্ষণিক মডেলে ধনাত্মক ধাতব কোর (core) এবং স্থানান্তরযোগ্য (delocalised) যোজ্যতা ইলেকট্রন থাকে, যা ধাতব বন্ধন দ্বারা একত্রে যুক্ত থাকে। এরা বিদ্যুৎ এবং তাপের সুপরিবাহী, সাধারণত নমনীয় এবং প্রসারণশীল, প্রায়শই উজ্জ্বল হয় এবং এদের কাঠিন্য ও গলনাঙ্ক পরিবর্তনশীল। উদাহরণ: Fe, Cu, Zn, Ag, Au।'
      }
    },
    // 5.3 Covalent or Network Solids
    {
      id: 'sec-covalent',
      type: 'text',
      title: { en: 'Covalent or Network Solids', bn: 'সমযোজী বা জালকীয় কঠিন' },
      content: {
        en: 'Constituent units are atoms connected through an extended network of strong, directional covalent bonds. They are generally very hard, have very high melting points, are difficult to deform, and are generally poor electrical conductors (e.g., diamond, silicon carbide). Graphite is an important exception: it has strong covalent bonds within sheets, but weaker attractions between sheets allowing them to slide, and delocalised electrons permit electrical conduction.',
        bn: 'গঠনকারী এককগুলি হল পরমাণু যা শক্তিশালী ও দিকনির্ভর সমযোজী বন্ধনে যুক্ত একটি বিস্তৃত জালক তৈরি করে। এরা সাধারণত খুব শক্ত হয়, খুব উচ্চ গলনাঙ্ক বিশিষ্ট হয়, এদের আকৃতি বিকৃত করা কঠিন এবং সাধারণত বিদ্যুৎ পরিবহনে অক্ষম (যেমন- হীরা, সিলিকন কার্বাইড)। গ্রাফাইট একটি গুরুত্বপূর্ণ ব্যতিক্রম: এর স্তরগুলির মধ্যে শক্তিশালী সমযোজী বন্ধন থাকে, কিন্তু স্তরগুলির মাঝে দুর্বল আকর্ষণ থাকে যার ফলে স্তরগুলি পিছলে যেতে পারে, এবং স্থানান্তরযোগ্য ইলেকট্রন বিদ্যুৎ পরিবহনে সাহায্য করে।'
      }
    },
    {
      id: 'sec-graphite-exception',
      type: 'interactive_3d',
      title: { en: 'Interactive Exploration: Graphite', bn: 'ইন্টারেক্টিভ অন্বেষণ: গ্রাফাইট' },
      content: { en: 'Graphite is a covalent solid but conducts electricity due to delocalised electrons between layers.', bn: 'গ্রাফাইট একটি সমযোজী কঠিন পদার্থ হওয়া সত্ত্বেও স্তরগুলির মধ্যে স্থানান্তরযোগ্য ইলেকট্রনের কারণে বিদ্যুৎ পরিবহন করে।' },
      modelConfig: { type: 'graphite-exception-lab' }
    },
    // 5.4.1 Non-polar Molecular Solids
    {
      id: 'sec-non-polar',
      type: 'text',
      title: { en: 'Non-polar Molecular Solids', bn: 'অধ্রুবীয় আণবিক কঠিন' },
      content: {
        en: 'Constituent particles are non-polar molecules (or noble gas atoms) held by weak London dispersion forces involving temporary and induced dipoles. They are generally soft, low melting, and insulating. Examples: Solid Ar, dry ice (CO₂), I₂.',
        bn: 'গঠনকারী কণাগুলি হল অধ্রুবীয় অণু (বা নিষ্ক্রিয় গ্যাসের পরমাণু) যা ক্ষণস্থায়ী এবং আবেশিত ডাইপোল যুক্ত দুর্বল লন্ডন বিচ্ছুরণ বল (dispersion force) দ্বারা আবদ্ধ থাকে। এরা সাধারণত নরম, নিম্ন গলনাঙ্ক বিশিষ্ট এবং অন্তরক হয়। উদাহরণ: কঠিন Ar, শুষ্ক বরফ (CO₂), I₂।'
      }
    },
    // 5.4.2 Polar Molecular Solids
    {
      id: 'sec-polar',
      type: 'text',
      title: { en: 'Polar Molecular Solids', bn: 'ধ্রুবীয় আণবিক কঠিন' },
      content: {
        en: 'Constituent particles are polar molecules with permanent dipole moments held by dipole-dipole interactions. Favourable orientations occur when δ+ aligns toward δ−. They are generally soft, have low-to-moderate melting points compared to ionic solids, and are insulating. Examples: Solid HCl, solid SO₂.',
        bn: 'গঠনকারী কণাগুলি হল স্থায়ী ডাইপোল মোমেন্ট যুক্ত ধ্রুবীয় অণু, যা ডাইপোল-ডাইপোল মিথস্ক্রিয়া দ্বারা আবদ্ধ থাকে। অণুগুলির অনুকূল বিন্যাস ঘটে যখন δ+ প্রান্ত δ− প্রান্তের দিকে মুখ করে থাকে। আয়নিক কঠিন পদার্থের তুলনায় এরা সাধারণত নরম, নিম্ন-থেকে-মাঝারি গলনাঙ্ক বিশিষ্ট এবং অন্তরক হয়। উদাহরণ: কঠিন HCl, কঠিন SO₂।'
      }
    },
    // 5.4.3 Hydrogen-Bonded Molecular Solids
    {
      id: 'sec-h-bonded',
      type: 'text',
      title: { en: 'Hydrogen-Bonded Molecular Solids', bn: 'হাইড্রোজেন-বন্ধনযুক্ত আণবিক কঠিন' },
      content: {
        en: 'Hydrogen bonding occurs when hydrogen covalently bonded to a strongly electronegative atom (N, O, F) interacts with another electronegative atom bearing a lone pair. They generally have higher melting points than comparable molecules without hydrogen bonding, are insulating, and remain molecular rather than network solids. Examples: Ice (H₂O).',
        bn: 'হাইড্রোজেন বন্ধন তখন গঠিত হয় যখন তীব্র তড়িৎ-ঋণাত্মক পরমাণুর (N, O, F) সাথে সমযোজী বন্ধনে যুক্ত হাইড্রোজেন অন্য একটি তড়িৎ-ঋণাত্মক পরমাণুর (যার নিঃসঙ্গ ইলেকট্রন জোড় আছে) সাথে মিথস্ক্রিয়া করে। সমতুল্য সাধারণ আণবিক কঠিন পদার্থের তুলনায় এদের গলনাঙ্ক সাধারণত বেশি হয়, এরা অন্তরক হয় এবং জালকীয় কঠিন না হয়ে আণবিক কঠিন হিসেবেই থাকে। উদাহরণ: বরফ (H₂O)।'
      }
    },
    // 6. Crystal Lattice and Space Lattice
    {
      id: 'sec-crystal-lattice',
      type: 'text',
      title: { en: 'Crystal Lattice and Space Lattice', bn: 'স্ফটিক জালক এবং স্থানিক জালক' },
      content: {
        en: 'A crystal lattice or space lattice is an ideal, regular and periodic three-dimensional arrangement of equivalent lattice points. It is a geometrical construction describing translational periodicity, consisting of equivalent positions. It does not by itself identify the physical particle. Associating a basis with each lattice point generates a crystal structure.',
        bn: 'স্ফটিক জালক বা স্থানিক জালক হল সমতুল্য জালক বিন্দুগুলির একটি আদর্শ, নিয়মিত এবং পর্যায়ক্রমিক ত্রিমাত্রিক বিন্যাস। এটি একটি জ্যামিতিক ধারণা যা সমতুল্য অবস্থানের পর্যায়ক্রমিক পুনরাবৃত্তিকে বর্ণনা করে। এটি নিজে কোনো ভৌত কণা নয়। প্রতিটি জালক বিন্দুর সাথে একটি ভিত্তিকে (basis) যুক্ত করলে একটি স্ফটিক কাঠামো তৈরি হয়।'
      }
    },
    // 7. Lattice Point and Basis
    {
      id: 'sec-lattice-point',
      type: 'text',
      title: { en: 'Lattice Point and Basis', bn: 'জালক বিন্দু এবং ভিত্তি' },
      content: {
        en: 'A lattice point is a geometrical position whose surroundings are equivalent to the surroundings of every other equivalent lattice point. It may represent the location of an atom, an ion, a molecule, or an identical group of particles. Remember: Lattice point = geometrical position; Basis = particle or group associated with that position; Crystal structure = lattice + basis.',
        bn: 'জালক বিন্দু হল একটি জ্যামিতিক অবস্থান যার চারপাশের পরিবেশ অন্য যেকোনো সমতুল্য জালক বিন্দুর চারপাশের পরিবেশের ঠিক সমতুল্য। এটি একটি পরমাণু, একটি আয়ন, একটি অণু, অথবা কণার একটি অভিন্ন গোষ্ঠীর অবস্থান নির্দেশ করতে পারে। মনে রাখবেন: জালক বিন্দু = জ্যামিতিক অবস্থান; ভিত্তি = ওই অবস্থানের সাথে যুক্ত কণা বা কণার গোষ্ঠী; স্ফটিক কাঠামো = জালক + ভিত্তি।'
      }
    },
    // 8. Unit Cell & Laboratory
    {
      id: 'sec-unit-cell',
      type: 'interactive_3d',
      title: { en: 'Unit Cell', bn: 'একক কোষ' },
      content: {
        en: 'A unit cell is a repeating three-dimensional region associated with the lattice. Translation of the cell reproduces the periodic structure. A primitive cell contains one lattice point, while a conventional unit cell may contain more than one. A drawn cell boundary is a geometrical construction, not a physical wall, and neighbouring cells join continuously.',
        bn: 'একক কোষ হল জালকের সাথে যুক্ত একটি পুনরাবৃত্তিমূলক ত্রিমাত্রিক অঞ্চল। এই কোষটির পর্যায়ক্রমিক স্থানান্তরের মাধ্যমেই সম্পূর্ণ পর্যায়ক্রমিক কাঠামোটি তৈরি হয়। একটি মৌলিক কোষে (primitive cell) একটি জালক বিন্দু থাকে, অন্যদিকে একটি সাধারণ একক কোষে (conventional unit cell) একাধিক জালক বিন্দু থাকতে পারে। একক কোষের সীমানা একটি জ্যামিতিক নির্মাণ, এটি কোনো ভৌত প্রাচীর নয়, এবং পার্শ্ববর্তী কোষগুলি একে অপরের সাথে নিরবচ্ছিন্নভাবে যুক্ত থাকে।'
      },
      modelConfig: { type: 'lattice-unit-cell-lab' }
    },
    // 9. Interactive Concept Map
    {
      id: 'sec-concept-map',
      type: 'interactive_2d',
      title: { en: 'Interactive Concept Map', bn: 'ইন্টার্যাক্টিভ ধারণা মানচিত্র' },
      modelConfig: { type: 'intro-concept-map' }
    },
    // 10. Interactive Practice Laboratory (Included across the labs)
    
    // 11. Module Summary (Four-Class Comparison Tool)
    {
      id: 'sec-summary',
      type: 'interactive_2d',
      title: { en: 'Module Summary & Comparison', bn: 'মডিউলের সারসংক্ষেপ ও তুলনা' },
      content: {
        en: 'Review the four main classes of crystalline solids below.',
        bn: 'নীচে স্ফটিকাকার কঠিন পদার্থের চারটি প্রধান বিভাগের পর্যালোচনা করুন।'
      },
      modelConfig: { type: 'solid-comparison-table' }
    },
    // 12. Sources and Scientific Verification
    {
      id: 'sec-sources',
      type: 'text',
      title: { en: 'Sources and Scientific Verification', bn: 'উৎস ও বৈজ্ঞানিক যাচাইকরণ' },
      content: {
        en: 'Scientific content verified against the IUPAC Gold Book, IUCr Online Dictionary of Crystallography, NCERT Chemistry textbooks, and university-level solid-state references. The materials respect the required Class 11 WBCHSE/CBSE curriculum scope while ensuring conceptual rigour.',
        bn: 'IUPAC গোল্ড বুক, IUCr অনলাইন ডিকশনারি অফ ক্রিস্টালোগ্রাফি, NCERT রসায়ন পাঠ্যপুস্তক এবং বিশ্ববিদ্যালয়-স্তরের সলিড-স্টেট রেফারেন্সগুলি থেকে বৈজ্ঞানিক বিষয়বস্তু যাচাই করা হয়েছে। এই উপকরণগুলি একাদশ শ্রেণির WBCHSE/CBSE পাঠ্যক্রমের সীমানা বজায় রাখার পাশাপাশি ধারণাগত কঠোরতা নিশ্চিত করে।'
      }
    },
    // 13. Continue to Lattice & Unit Cell
    {
      id: 'sec-continue',
      type: 'next_module_link' as any,
      content: { en: 'Continue to Lattice & Unit Cell', bn: 'জালক ও একক কোষ মডিউলে যাও' },
      modelConfig: { targetModuleId: '01-unit-cell' }
    }
  ]
};
