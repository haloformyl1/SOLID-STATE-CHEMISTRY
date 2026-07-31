import type { ModuleContent } from '../../types/content';

export const IntroductionModule: ModuleContent = {
  id: 'introduction-solid-state',
  order: 0,
  title: {
    en: 'Introduction to the Solid State',
    bn: 'কঠিন অবস্থার ভূমিকা'
  },
  learningObjectives: [
    { en: 'Understand the general characteristics and nature of solid state matter.', bn: 'কঠিন অবস্থার পদার্থের সাধারণ বৈশিষ্ট্য এবং প্রকৃতি বোঝা।' },
    { en: 'Distinguish clearly between crystalline and amorphous solids with examples.', bn: 'উদাহরণসহ স্ফটিকাকার এবং অস্ফটিকাকার কঠিনের মধ্যে স্পষ্টভাবে পার্থক্য করা।' },
    { en: 'Define and explain anisotropy and isotropy in relation to particle arrangement.', bn: 'কণা বিন্যাসের সাপেক্ষে অসমদিকতা এবং সমদিকতার সংজ্ঞা ও ব্যাখ্যা দেওয়া।' },
    { en: 'Classify crystalline solids based on intermolecular forces (Ionic, Metallic, Covalent, Molecular).', bn: 'আন্তঃআণবিক বলের উপর ভিত্তি করে স্ফটিকাকার কঠিনের শ্রেণিবিভাগ করা (আয়নিক, ধাতব, সমযোজী, আণবিক)।' },
    { en: 'Introduce the fundamental concepts of crystal lattice, lattice point, and unit cell.', bn: 'স্ফটিক জালক, জালক বিন্দু এবং একক কোষের মৌলিক ধারণাগুলি উপস্থাপন করা।' }
  ],
  prerequisiteConcepts: [],
  misconceptions: [],
  summary: [],
  practiceQuestionIds: [],
  glossaryReferences: [],
  sections: [
    {
      id: 'intro-1-what-is-solid',
      type: 'text',
      title: { en: '1. What Is a Solid?', bn: '১. কঠিন পদার্থ কী?' },
      content: {
        en: 'At the microscopic level, the physical state of matter depends on the balance between two opposing factors: thermal energy (which tends to keep particles moving and apart) and intermolecular forces (which tend to keep them together). When the temperature is low enough, thermal energy becomes weaker than the intermolecular attractive forces. The constituent particles (atoms, ions, or molecules) are pulled closely together and lose their ability to translate (move past one another). They can only vibrate about their mean positions. This rigid, closely-packed state of matter is called a solid.',
        bn: 'মাইক্রোস্কোপিক স্তরে, পদার্থের ভৌত অবস্থা দুটি বিপরীতমুখী কারকের ভারসাম্যের উপর নির্ভর করে: তাপীয় শক্তি (যা কণাগুলিকে গতিশীল এবং দূরে রাখতে চায়) এবং আন্তঃআণবিক আকর্ষণ বল (যা তাদের একত্রে রাখতে চায়)। যখন তাপমাত্রা যথেষ্ট কম থাকে, তখন তাপীয় শক্তি আন্তঃআণবিক আকর্ষণ বলের চেয়ে দুর্বল হয়ে পড়ে। গঠনকারী কণাগুলি (পরমাণু, আয়ন বা অণু) একে অপরের কাছাকাছি চলে আসে এবং তাদের স্থানান্তরিত হওয়ার (একে অপরের পাশ দিয়ে চলে যাওয়ার) ক্ষমতা হারিয়ে ফেলে। তারা কেবল তাদের সাম্যাবস্থানের চারপাশে কম্পন করতে পারে। পদার্থের এই দৃঢ়, ঘন সন্নিবিষ্ট অবস্থাকে কঠিন পদার্থ বলা হয়।'
      }
    },
    {
      id: 'intro-1-what-is-solid-anim',
      type: 'interactive_3d',
      modelConfig: { type: 'what-is-solid-anim' }
    },
    {
      id: 'intro-2-general-char',
      type: 'text',
      title: { en: '2. General Characteristics of Solids', bn: '২. কঠিন পদার্থের সাধারণ বৈশিষ্ট্য' },
      content: {
        en: 'Due to the strong intermolecular forces and lack of translational kinetic energy, solids exhibit distinct macroscopic and microscopic characteristics:\n\n1. They have a definite mass, volume, and shape.\n2. Intermolecular distances are short.\n3. Intermolecular forces are strong.\n4. Their constituent particles have fixed positions and can only oscillate about their mean positions.\n5. They are incompressible and structurally rigid.',
        bn: 'শক্তিশালী আন্তঃআণবিক বল এবং স্থানান্তর গতিশক্তির অভাবের কারণে, কঠিন পদার্থগুলির স্বতন্ত্র ম্যাক্রোস্কোপিক এবং মাইক্রোস্কোপিক বৈশিষ্ট্য দেখা যায়:\n\n১. এদের একটি নির্দিষ্ট ভর, আয়তন এবং আকার থাকে।\n২. আন্তঃআণবিক দূরত্ব ক্ষুদ্র হয়।\n৩. আন্তঃআণবিক বল অত্যন্ত শক্তিশালী হয়।\n৪. এদের গঠনকারী কণাগুলির অবস্থান নির্দিষ্ট এবং তারা কেবল তাদের সাম্যাবস্থানের চারপাশে কম্পন করতে পারে।\n৫. এরা অসংকোচনশীল এবং কাঠামোগতভাবে অনমনীয় হয়।'
      }
    },
    {
      id: 'intro-2-general-char-anim',
      type: 'interactive_3d',
      modelConfig: { type: 'general-characteristics-anim' }
    },
    {
      id: 'intro-3-crystalline-amorphous',
      type: 'text',
      title: { en: '3. Crystalline and Amorphous Solids', bn: '৩. স্ফটিকাকার ও অস্ফটিকাকার কঠিন' },
      content: {
        en: 'Solids can be broadly classified into two categories based on the nature of order present in the arrangement of their constituent particles:\n\n**Crystalline Solids:** Particles are arranged in a regular, repeating, 3D pattern. They possess long-range order, meaning the periodic pattern extends throughout the entire crystal. They have sharp melting points and characteristic geometric shapes (e.g., NaCl, Quartz, Diamond).\n\n**Amorphous Solids:** Particles are arranged randomly and lack a regular repeating pattern. They possess only short-range order. They soften over a range of temperatures and do not have a sharp melting point. Historically, they are sometimes termed pseudo-solids or supercooled liquids (e.g., Glass, Rubber, Plastics).',
        bn: 'গঠনকারী কণাগুলির বিন্যাসের শৃঙ্খলার প্রকৃতির উপর ভিত্তি করে কঠিন পদার্থগুলিকে বিস্তৃতভাবে দুটি শ্রেণিতে ভাগ করা যায়:\n\n**স্ফটিকাকার কঠিন:** কণাগুলি একটি নিয়মিত, পুনরাবৃত্ত, ত্রিমাত্রিক বিন্যাসে সাজানো থাকে। এদের দীর্ঘ-পাল্লার শৃঙ্খলা থাকে, যার অর্থ পর্যায়বৃত্ত বিন্যাসটি সম্পূর্ণ স্ফটিক জুড়ে বিস্তৃত থাকে। এদের একটি সুনির্দিষ্ট গলনাঙ্ক এবং বৈশিষ্ট্যযুক্ত জ্যামিতিক আকার থাকে (যেমন: NaCl, কোয়ার্টজ, হীরা)।\n\n**অস্ফটিকাকার কঠিন:** কণাগুলি এলোমেলোভাবে সাজানো থাকে এবং কোনো নিয়মিত পুনরাবৃত্ত বিন্যাস থাকে না। এদের কেবল স্বল্প-পাল্লার শৃঙ্খলা থাকে। এরা নির্দিষ্ট তাপমাত্রার পরিসরে নরম হয় এবং এদের কোনো সুনির্দিষ্ট গলনাঙ্ক থাকে না। ঐতিহাসিকভাবে এদেরকে কখনও কখনও ছদ্ম-কঠিন বা অতিশীতল তরল বলা হয় (যেমন: কাঁচ, রাবার, প্লাস্টিক)।'
      }
    },
    {
      id: 'intro-3-crystalline-amorphous-anim',
      type: 'interactive_3d',
      modelConfig: { type: 'crystalline-amorphous-anim' }
    },
    {
      id: 'intro-4-anisotropy',
      type: 'text',
      title: { en: '4. Anisotropy and Isotropy', bn: '৪. অসমদিকতা ও সমদিকতা' },
      content: {
        en: 'A key distinction between crystalline and amorphous solids lies in their physical properties measured in different directions.\n\n**Anisotropy:** In crystalline solids, due to the highly ordered arrangement, the sequence of particles encountered along different directions is different. Therefore, physical properties like electrical resistance or refractive index show different values when measured along different directions in the same crystal. This directional dependence is called anisotropy.\n\n**Isotropy:** In amorphous solids, the random arrangement of particles is statistically identical in all directions. Thus, physical properties have the same value in any direction. This directional independence is called isotropy.',
        bn: 'বিভিন্ন দিকে পরিমাপ করা ভৌত ধর্মের ক্ষেত্রে স্ফটিকাকার এবং অস্ফটিকাকার কঠিনের মধ্যে একটি মূল পার্থক্য রয়েছে।\n\n**অসমদিকতা:** স্ফটিকাকার কঠিনে, অত্যন্ত সুশৃঙ্খল বিন্যাসের কারণে, বিভিন্ন দিক বরাবর কণাগুলির যে ক্রম পাওয়া যায় তা ভিন্ন হয়। তাই একই স্ফটিকে বিভিন্ন দিকে পরিমাপ করলে বৈদ্যুতিক রোধ বা প্রতিসরাঙ্কের মতো ভৌত ধর্মের ভিন্ন ভিন্ন মান পাওয়া যায়। এই দিকনির্ভরতাকে অসমদিকতা বলে।\n\n**সমদিকতা:** অস্ফটিকাকার কঠিনে কণাগুলির এলোমেলো বিন্যাস সমস্ত দিকে পরিসংখ্যানগতভাবে অভিন্ন হয়। ফলে, যেকোনো দিকে ভৌত ধর্মের মান একই থাকে। এই দিকনিরপেক্ষতাকে সমদিকতা বলে।'
      }
    },
    {
      id: 'intro-4-anisotropy-anim',
      type: 'interactive_3d',
      modelConfig: { type: 'anisotropy-isotropy-anim' }
    },
    {
      id: 'intro-5-classification',
      type: 'text',
      title: { en: '5. Classification of Crystalline Solids', bn: '৫. স্ফটিকাকার কঠিনের শ্রেণিবিভাগ' },
      content: {
        en: 'Most solid substances are crystalline in nature. For educational purposes, crystalline solids are classified into four distinct categories based on the nature of the intermolecular forces operating in them:',
        bn: 'অধিকাংশ কঠিন পদার্থই প্রকৃতিতে স্ফটিকাকার। গঠনকারী কণাগুলির মধ্যে ক্রিয়াশীল আন্তঃআণবিক বলের প্রকৃতির উপর ভিত্তি করে শিক্ষামূলক উদ্দেশ্যে স্ফটিকাকার কঠিন পদার্থগুলিকে চারটি স্বতন্ত্র শ্রেণিতে ভাগ করা হয়:'
      }
    },
    {
      id: 'intro-5-class-tree',
      type: 'interactive_2d',
      modelConfig: { type: 'classification-tree' }
    },
    {
      id: 'intro-5-1-ionic',
      type: 'text',
      title: { en: '5.1 Ionic Solids', bn: '৫.১ আয়নিক কঠিন' },
      content: {
        en: 'The constituent particles are positive and negative ions (cations and anions). They are held together by strong Coulombic (electrostatic) forces. Because these forces are strong, ionic solids have high melting and boiling points. They are hard but brittle. In the solid state, the ions are not free to move, so they are electrical insulators. However, in the molten state or when dissolved in water, the ions become free to move, making them conductors of electricity. Examples: NaCl, MgO, ZnS, CaF₂.',
        bn: 'গঠনকারী কণাগুলি হল ধনাত্মক ও ঋণাত্মক আয়ন (ক্যাটায়ন ও অ্যানায়ন)। এরা শক্তিশালী কুলম্বীয় (স্থির-তড়িৎ) বল দ্বারা একত্রে আবদ্ধ থাকে। এই বলগুলি শক্তিশালী হওয়ার কারণে আয়নিক কঠিনের গলনাঙ্ক এবং স্ফুটনাঙ্ক উচ্চ হয়। এরা কঠিন কিন্তু ভঙ্গুর প্রকৃতির। কঠিন অবস্থায় আয়নগুলি মুক্তভাবে চলাচল করতে পারে না, তাই এরা তড়িৎ অন্তরক। তবে গলিত অবস্থায় বা জলে দ্রবীভূত হলে আয়নগুলি মুক্তভাবে চলাচল করতে পারে, ফলে এরা তড়িৎ পরিবাহী হয়। উদাহরণ: NaCl, MgO, ZnS, CaF₂।'
      }
    },
    {
      id: 'intro-5-2-metallic',
      type: 'text',
      title: { en: '5.2 Metallic Solids', bn: '৫.২ ধাতব কঠিন' },
      content: {
        en: 'Metals are orderly collections of positive ions (kernels) immersed in a "sea" of delocalized mobile electrons. The strong attractive force between the positive ions and the electron sea is the metallic bond. These mobile electrons are responsible for high electrical and thermal conductivity. When an electric field is applied, these electrons flow through the network. Metals are highly malleable (can be beaten into thin sheets) and ductile (can be drawn into wires). Examples: Copper, Iron, Silver, Magnesium.',
        bn: 'ধাতুগুলি হলো ডিলোকালাইজড বা স্থানচ্যুত মুক্ত ইলেকট্রনের একটি "সমুদ্রে" নিমজ্জিত ধনাত্মক আয়নের (কার্নেল) একটি সুশৃঙ্খল সংগ্রহ। ধনাত্মক আয়ন এবং ইলেকট্রন সমুদ্রের মধ্যে শক্তিশালী আকর্ষণ বলকেই ধাতব বন্ধন বলে। এই মুক্ত ইলেকট্রনগুলি উচ্চ তড়িৎ ও তাপ পরিবাহিতার জন্য দায়ী। তড়িৎ ক্ষেত্র প্রয়োগ করলে এই ইলেকট্রনগুলি নেটওয়ার্কের মধ্য দিয়ে প্রবাহিত হয়। ধাতুগুলি অত্যন্ত নমনীয় (পিটিয়ে পাতলা পাতে পরিণত করা যায়) এবং প্রসারণশীল (টেনে তারে পরিণত করা যায়)। উদাহরণ: তামা, লোহা, রূপা, ম্যাগনেসিয়াম।'
      }
    },
    {
      id: 'intro-5-3-covalent',
      type: 'text',
      title: { en: '5.3 Covalent or Network Solids', bn: '৫.৩ সমযোজী বা জালকীয় কঠিন' },
      content: {
        en: 'A wide variety of non-metal crystalline solids are formed by an extensive, continuous network of covalent bonds between adjacent atoms throughout the entire crystal. They are also called giant molecules. Because covalent bonds are strong and highly directional, the atoms are held very tightly in their positions. Such solids are extremely hard and have very high melting points (they may even decompose before melting). They are typically insulators. Example: Diamond (C), Silicon carbide (SiC), Quartz (SiO₂). Graphite is an exception; it is soft and conducts electricity due to its layered structure and free electrons.',
        bn: 'অনেক অধাতব স্ফটিকাকার কঠিন পদার্থ সম্পূর্ণ স্ফটিক জুড়ে সন্নিহিত পরমাণুগুলির মধ্যে সমযোজী বন্ধনের একটি বিস্তৃত ও অবিচ্ছিন্ন নেটওয়ার্ক দ্বারা গঠিত হয়। এদেরকে দৈত্যাকার অণুও বলা হয়। যেহেতু সমযোজী বন্ধন শক্তিশালী এবং অত্যন্ত দিকনির্ভর, তাই পরমাণুগুলি তাদের অবস্থানে খুব শক্তভাবে আবদ্ধ থাকে। এই জাতীয় কঠিন পদার্থগুলি অত্যন্ত শক্ত হয় এবং এদের গলনাঙ্ক খুব বেশি (গলে যাওয়ার আগেই এরা বিযোজিত হতে পারে)। এরা সাধারণত অন্তরক হয়। উদাহরণ: হীরা (C), সিলিকন কার্বাইড (SiC), কোয়ার্টজ (SiO₂)। গ্রাফাইট একটি ব্যতিক্রম; এর স্তরযুক্ত গঠন এবং মুক্ত ইলেকট্রনের কারণে এটি নরম এবং তড়িৎ পরিবহন করে।'
      }
    },
    {
      id: 'intro-5-4-molecular',
      type: 'text',
      title: { en: '5.4 Molecular Solids', bn: '৫.৪ আণবিক কঠিন' },
      content: {
        en: 'The constituent particles are discrete molecules. Based on the nature of the molecules and the weak intermolecular forces holding them, molecular solids are further subdivided into three categories: Non-polar, Polar, and Hydrogen-Bonded.',
        bn: 'এদের গঠনকারী কণাগুলি হলো পৃথক অণু। অণুর প্রকৃতি এবং তাদের ধরে রাখা দুর্বল আন্তঃআণবিক বলের উপর ভিত্তি করে, আণবিক কঠিনকে আরও তিনটি উপশ্রেণিতে ভাগ করা হয়: অধ্রুবীয়, ধ্রুবীয় এবং হাইড্রোজেন-বন্ধনযুক্ত।'
      }
    },
    {
      id: 'intro-5-4-1-nonpolar',
      type: 'text',
      title: { en: '5.4.1 Non-polar Molecular Solids', bn: '৫.৪.১ অধ্রুবীয় আণবিক কঠিন' },
      content: {
        en: 'These consist of either individual atoms (like Argon, Helium) or molecules formed by non-polar covalent bonds (like H₂, Cl₂, I₂, solid CO₂). The atoms or molecules are held together by very weak dispersion forces or London forces. They are soft, non-conductors of electricity, and have very low melting points. Many are liquids or gases at room temperature.',
        bn: 'এগুলি হয় পৃথক পরমাণু (যেমন আর্গন, হিলিয়াম) অথবা অধ্রুবীয় সমযোজী বন্ধন দ্বারা গঠিত অণু (যেমন H₂, Cl₂, I₂, কঠিন CO₂) দ্বারা গঠিত। পরমাণু বা অণুগুলি অত্যন্ত দুর্বল বিস্তারণ বল (Dispersion forces) বা লন্ডন বল দ্বারা একত্রে আবদ্ধ থাকে। এরা নরম, বিদ্যুতের অপরিবাহী এবং এদের গলনাঙ্ক খুব কম হয়। এদের অনেকেই ঘরের তাপমাত্রায় তরল বা গ্যাসীয় থাকে।'
      }
    },
    {
      id: 'intro-5-4-2-polar',
      type: 'text',
      title: { en: '5.4.2 Polar Molecular Solids', bn: '৫.৪.২ ধ্রুবীয় আণবিক কঠিন' },
      content: {
        en: 'The molecules of substances like HCl, SO₂ are formed by polar covalent bonds. The molecules are held together by stronger dipole-dipole interactions. These solids are soft and non-conductors of electricity. Their melting points are higher than those of non-polar molecular solids, yet most are gases or liquids under room temperature and pressure.',
        bn: 'HCl, SO₂ এর মতো পদার্থের অণুগুলি ধ্রুবীয় সমযোজী বন্ধন দ্বারা গঠিত। অণুগুলি শক্তিশালী দ্বিমেরু-দ্বিমেরু আকর্ষণ বল দ্বারা একত্রে আবদ্ধ থাকে। এই কঠিন পদার্থগুলি নরম এবং বিদ্যুতের অপরিবাহী। এদের গলনাঙ্ক অধ্রুবীয় আণবিক কঠিনের তুলনায় বেশি, তবুও ঘরের তাপমাত্রা ও চাপে এদের বেশিরভাগই গ্যাসীয় বা তরল।'
      }
    },
    {
      id: 'intro-5-4-3-hbonded',
      type: 'text',
      title: { en: '5.4.3 Hydrogen-Bonded Molecular Solids', bn: '৫.৪.৩ হাইড্রোজেন-বন্ধনযুক্ত আণবিক কঠিন' },
      content: {
        en: 'These molecules contain hydrogen atoms covalently bonded to highly electronegative atoms like Fluorine, Oxygen, or Nitrogen (F, O, N). Strong hydrogen bonding intermolecular forces bind these molecules together (e.g., Ice/H₂O). They are non-conductors of electricity and exist generally as volatile liquids or soft solids under room temperature.',
        bn: 'এই অণুগুলিতে ফ্লোরিন, অক্সিজেন বা নাইট্রোজেনের (F, O, N) মতো উচ্চ তড়িৎ-ঋণাত্মক পরমাণুর সাথে সমযোজী বন্ধনে আবদ্ধ হাইড্রোজেন পরমাণু থাকে। শক্তিশালী হাইড্রোজেন বন্ধন আন্তঃআণবিক বল এই অণুগুলিকে একত্রে আবদ্ধ রাখে (যেমন: বরফ/H₂O)। এরা বিদ্যুতের অপরিবাহী এবং সাধারণত ঘরের তাপমাত্রায় উদ্বায়ী তরল বা নরম কঠিন পদার্থ হিসাবে বিদ্যমান থাকে।'
      }
    },
    {
      id: 'intro-6-lattice',
      type: 'text',
      title: { en: '6. Crystal Lattice, Lattice Point, and Unit Cell', bn: '৬. স্ফটিক জালক, জালক বিন্দু এবং একক কোষ' },
      content: {
        en: 'The main characteristic of a crystalline solid is a regular and repeating pattern of constituent particles. \n\n**Crystal Lattice (Space Lattice):** If the three-dimensional arrangement of constituent particles in a crystal is represented diagrammatically by geometric points, this regular 3D arrangement of points in space is called a crystal lattice. There are only 14 possible 3D lattices, known as Bravais Lattices.\n\n**Lattice Point:** Each point in a lattice is called a lattice point or lattice site. Each point represents one constituent particle (an atom, a molecule, or an ion).',
        bn: 'স্ফটিকাকার কঠিনের প্রধান বৈশিষ্ট্য হলো গঠনকারী কণাগুলির একটি নিয়মিত এবং পুনরাবৃত্ত বিন্যাস।\n\n**স্ফটিক জালক (স্থানিক জালক):** একটি স্ফটিকে গঠনকারী কণাগুলির ত্রিমাত্রিক বিন্যাসকে যদি জ্যামিতিক বিন্দু দ্বারা চিত্রমূলকভাবে উপস্থাপন করা হয়, তবে স্থানে বিন্দুগুলির এই নিয়মিত ত্রিমাত্রিক বিন্যাসকে স্ফটিক জালক বলা হয়। শুধুমাত্র ১৪টি সম্ভাব্য ত্রিমাত্রিক জালক রয়েছে, যা ব্রাভেস জালক নামে পরিচিত।\n\n**জালক বিন্দু:** জালকের প্রতিটি বিন্দুকে জালক বিন্দু বা ল্যাটিস সাইট বলা হয়। প্রতিটি বিন্দু একটি গঠনকারী কণাকে (পরমাণু, অণু বা আয়ন) নির্দেশ করে।'
      }
    },
    {
      id: 'intro-7-unit-cell',
      type: 'text',
      title: { en: '7. The Unit Cell', bn: '৭. একক কোষ' },
      content: {
        en: 'A **Unit Cell** is the smallest portion of a crystal lattice which, when repeated in different directions, generates the entire lattice. It is the fundamental building block of the crystal. A unit cell is characterized by:\n1. Its dimensions along the three edges (a, b, c), which may or may not be mutually perpendicular.\n2. Angles between the edges: α (between b and c), β (between a and c), and γ (between a and b). Thus, a unit cell is defined by six parameters: a, b, c, α, β, γ.',
        bn: '**একক কোষ** হলো স্ফটিক জালকের ক্ষুদ্রতম অংশ, যা বিভিন্ন দিকে পুনরাবৃত্তি করলে সম্পূর্ণ জালক তৈরি হয়। এটি স্ফটিকের মৌলিক কাঠামোগত একক। একটি একক কোষকে নিম্নলিখিত প্যারামিটার দ্বারা চিহ্নিত করা হয়:\n১. তিনটি প্রান্ত বরাবর এর মাত্রা (a, b, c), যা পরস্পর লম্ব হতেও পারে আবার নাও হতে পারে।\n২. প্রান্তগুলির মধ্যবর্তী কোণ: α (b ও c এর মধ্যে), β (a ও c এর মধ্যে), এবং γ (a ও b এর মধ্যে)। সুতরাং, একটি একক কোষ ছয়টি প্যারামিটার দ্বারা সংজ্ঞায়িত হয়: a, b, c, α, β, γ।'
      }
    },
    {
      id: 'intro-7-unit-cell-anim',
      type: 'interactive_3d',
      modelConfig: { type: 'lattice-to-unit-cell-anim' }
    },
    {
      id: 'intro-8-concept-map',
      type: 'interactive_2d',
      modelConfig: { type: 'concept-map' }
    },
    {
      id: 'intro-9-challenge',
      type: 'interactive_2d',
      modelConfig: { type: 'classification-challenge' }
    },
    {
      id: 'intro-10-summary',
      type: 'text',
      title: { en: 'Summary', bn: 'সারসংক্ষেপ' },
      content: {
        en: 'Solids possess definite mass, volume, and shape due to short intermolecular distances and strong forces. Crystalline solids are highly ordered, anisotropic, and have sharp melting points, while amorphous solids are disordered and isotropic. Crystalline solids are classified into Molecular, Ionic, Metallic, and Covalent based on bonding forces. The fundamental periodic structure is conceptualized as a Space Lattice of Lattice Points, built by repeating the smallest fundamental block: the Unit Cell.',
        bn: 'ক্ষুদ্র আন্তঃআণবিক দূরত্ব এবং শক্তিশালী বলের কারণে কঠিন পদার্থের ভর, আয়তন এবং আকার নির্দিষ্ট থাকে। স্ফটিকাকার কঠিনগুলি অত্যন্ত সুশৃঙ্খল, অসমদিকধর্মী এবং এদের নির্দিষ্ট গলনাঙ্ক থাকে, অন্যদিকে অস্ফটিকাকার কঠিন বিশৃঙ্খল এবং সমদিকধর্মী। বন্ধন বলের ওপর ভিত্তি করে স্ফটিকাকার কঠিনকে আণবিক, আয়নিক, ধাতব এবং সমযোজীতে ভাগ করা হয়। মৌলিক পর্যায়বৃত্ত গঠনটিকে জালক বিন্দুর স্থানিক জালক হিসাবে ধারণা করা হয়, যা ক্ষুদ্রতম মৌলিক ব্লক বা একক কোষের পুনরাবৃত্তির মাধ্যমে তৈরি হয়।'
      }
    },
    {
      id: 'intro-11-verification',
      type: 'advanced_insight',
      title: { en: 'Sources and Verification', bn: 'উৎস ও বৈজ্ঞানিক যাচাইকরণ' },
      content: {
        en: 'The content in this module adheres strictly to NCERT Class 11/12 Chemistry guidelines and IUPAC terminology for solid state definitions, ensuring scientific accuracy regarding lattice abstraction, macroscopic physical properties, and exact classification of crystalline substances.',
        bn: 'এই মডিউলের বিষয়বস্তু কঠোরভাবে NCERT দ্বাদশ শ্রেণির রসায়ন নির্দেশিকা এবং কঠিন অবস্থার সংজ্ঞার জন্য IUPAC পরিভাষা অনুসরণ করে। এটি জালক বিমূর্তকরণ, ম্যাক্রোস্কোপিক ভৌত ধর্ম এবং স্ফটিকাকার পদার্থের সঠিক শ্রেণিবিভাগের বৈজ্ঞানিক নির্ভুলতা নিশ্চিত করে।'
      }
    }
  ]
};
