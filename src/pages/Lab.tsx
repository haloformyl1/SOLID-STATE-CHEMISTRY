import React from 'react';
import { AlertTriangle, Atom, Box, Calculator, FlaskConical, Layers3 } from 'lucide-react';
import { AtomSharing } from '../components/3d/AtomSharing';
import { UnitCellSelector } from '../components/3d/UnitCellSelector';
import { BilingualText } from '../components/BilingualText';
import { DefectLab } from '../components/labs/DefectLab';
import { DensityLab } from '../components/labs/DensityLab';
import { PackingLab } from '../components/labs/PackingLab';
import { FullscreenInteractiveFrame } from '../components/ui/FullscreenInteractiveFrame';
import { PageContainer, PageHeader, SectionHeader } from '../components/ui/LayoutPrimitives';

const labSections = [
  {
    id: 'unit-cell',
    title: <BilingualText en="Unit Cell Visualizer" bn="একক কোষ ভিজ্যুয়ালাইজার" />,
    subtitle: <BilingualText en="Compare simple, body-centred, and face-centred cubic structures." bn="সরল, দেহ-কেন্দ্রিক এবং পৃষ্ঠ-কেন্দ্রিক ঘনকাকার গঠন তুলনা করুন।" />,
    icon: Box,
    content: <UnitCellSelector />,
    summary: <BilingualText en="Select SC, BCC, or FCC, then rotate and zoom the model. Exploded and transparent views reveal atomic placement without changing the structure." bn="SC, BCC বা FCC নির্বাচন করুন, তারপর মডেলটি ঘোরান এবং জুম করুন। বিস্ফোরিত ও স্বচ্ছ দৃশ্য গঠন পরিবর্তন না করে পরমাণুর অবস্থান দেখায়।" />,
  },
  {
    id: 'atom-sharing',
    title: <BilingualText en="Atom Sharing Visualizer" bn="পরমাণু ভাগাভাগি ভিজ্যুয়ালাইজার" />,
    subtitle: <BilingualText en="Build neighbouring cells step by step and observe atomic volume contribution." bn="ধাপে ধাপে প্রতিবেশী কোষ তৈরি করুন এবং পারমাণবিক আয়তনের অবদান পর্যবেক্ষণ করুন।" />,
    icon: Atom,
    content: <AtomSharing />,
    summary: <BilingualText en="Choose an atom position and add or remove neighbouring cells. The fraction panel reports the enclosed contribution at every step." bn="পরমাণুর অবস্থান নির্বাচন করুন এবং প্রতিবেশী কোষ যোগ বা সরান। ভগ্নাংশ প্যানেল প্রতিটি ধাপে আবদ্ধ অবদান দেখায়।" />,
  },
  {
    id: 'packing',
    title: <BilingualText en="Packing & Voids" bn="প্যাকিং এবং শূন্যস্থান" />,
    subtitle: <BilingualText en="Investigate particle packing, coordination, and empty spaces." bn="কণার প্যাকিং, সমন্বয় এবং ফাঁকা স্থান অনুসন্ধান করুন।" />,
    icon: Layers3,
    content: <PackingLab />,
  },
  {
    id: 'density',
    title: <BilingualText en="Density Calculator" bn="ঘনত্ব ক্যালকুলেটর" />,
    subtitle: <BilingualText en="Connect unit-cell dimensions and molar mass to crystal density." bn="একক কোষের মাত্রা ও মোলার ভরকে স্ফটিক ঘনত্বের সঙ্গে যুক্ত করুন।" />,
    icon: Calculator,
    content: <DensityLab />,
  },
  {
    id: 'defects',
    title: <BilingualText en="Crystal Defects" bn="স্ফটিকের ত্রুটি" />,
    subtitle: <BilingualText en="Explore point defects and their structural consequences." bn="বিন্দু ত্রুটি এবং তাদের গঠনগত প্রভাব অনুসন্ধান করুন।" />,
    icon: AlertTriangle,
    content: <DefectLab />,
  },
];

export const Lab: React.FC = () => (
  <div className="w-full">
    <PageContainer>
      <PageHeader
        eyebrow={<BilingualText en="Scientific workspace" bn="বৈজ্ঞানিক ওয়ার্কস্পেস" />}
        icon={FlaskConical}
        title={<BilingualText en="Interactive PIECHEM Laboratory" bn="ইন্টারেক্টিভ PIECHEM ল্যাবরেটরি" />}
        description={<BilingualText en="Explore all solid-state chemistry interactive tools in one place. Experiment with unit cells, atom sharing, packing, density, and defects." bn="একক স্থানে সমস্ত কঠিন অবস্থার রসায়নের ইন্টারেক্টিভ টুলস অন্বেষণ করুন। একক কোষ, পরমাণু ভাগাভাগি, প্যাকিং, ঘনত্ব এবং ত্রুটিগুলি নিয়ে পরীক্ষা করুন।" />}
      />

      <div className="mt-12 space-y-20">
        {labSections.map((lab, index) => (
          <section key={lab.id} id={lab.id} className="scroll-mt-32" aria-labelledby={`${lab.id}-title`}>
            <SectionHeader
              title={<span id={`${lab.id}-title`}><span className="mr-2 text-[var(--text-muted)]">{String(index + 1).padStart(2, '0')}</span>{lab.title}</span>}
              subtitle={lab.subtitle}
              icon={lab.icon}
              accent={index === 1 ? 'violet' : index === 2 ? 'teal' : index === 4 ? 'amber' : 'blue'}
              className="mb-6"
            />
            <FullscreenInteractiveFrame title={lab.title} accessibleSummary={lab.summary}>
              {lab.content}
            </FullscreenInteractiveFrame>
          </section>
        ))}
      </div>
    </PageContainer>
  </div>
);
