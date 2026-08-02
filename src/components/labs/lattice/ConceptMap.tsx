import React, { useState } from 'react';
import { BilingualText } from '../../BilingualText';
import { ArrowDown } from 'lucide-react';

type ConceptNode = {
  id: string;
  title: { en: string; bn: string };
  desc: { en: string; bn: string };
};

const nodes: ConceptNode[] = [
  {
    id: 'lattice',
    title: { en: 'Crystal Lattice', bn: 'স্ফটিক জালক' },
    desc: { 
      en: 'An infinite regular 3D periodic arrangement of lattice points in space.', 
      bn: 'ত্রিমাত্রিক স্থানে জালক বিন্দুগুলির একটি অসীম, নিয়মিত ও পর্যায়বৃত্ত বিন্যাস।' 
    }
  },
  {
    id: 'points',
    title: { en: 'Lattice Points', bn: 'জালক বিন্দু' },
    desc: { 
      en: 'A geometrical point whose surroundings are identical to those of every equivalent point.', 
      bn: 'একটি জ্যামিতিক বিন্দু, যার চারপাশের পরিবেশ প্রতিটি সমতুল্য বিন্দুর চারপাশের পরিবেশের সঙ্গে অভিন্ন।' 
    }
  },
  {
    id: 'basis',
    title: { en: 'Basis (Motif)', bn: 'ভিত্তি বা মোটিফ' },
    desc: { 
      en: 'The constituent particle (atom, ion, or molecule) attached to each lattice point.', 
      bn: 'প্রতিটি জালক বিন্দুর সঙ্গে যুক্ত গঠনকারী কণা (পরমাণু, আয়ন বা অণু)।' 
    }
  },
  {
    id: 'structure',
    title: { en: 'Crystal Structure', bn: 'স্ফটিক গঠন' },
    desc: { 
      en: 'Crystal Structure = Lattice + Basis.', 
      bn: 'স্ফটিক গঠন = জালক + ভিত্তি।' 
    }
  },
  {
    id: 'unitcell',
    title: { en: 'Unit Cell', bn: 'একক কোষ' },
    desc: { 
      en: 'The smallest repeating 3D portion which reproduces the complete lattice upon translation.', 
      bn: 'ক্ষুদ্রতম পুনরাবৃত্ত ত্রিমাত্রিক অংশ, যাকে স্থানান্তর করে বারবার সাজালে সম্পূর্ণ জালক গঠিত হয়।' 
    }
  }
];

export const ConceptMap: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-6 md:p-10">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <button
              type="button"
              aria-expanded={activeNode === node.id}
              className={`w-full max-w-sm cursor-pointer rounded-xl border-2 p-4 text-center transition-all duration-300 ${
                activeNode === node.id 
                  ? 'scale-105 border-[var(--border-interactive)] bg-[var(--selected-state)] shadow-md' 
                  : 'border-[var(--border-default)] bg-[var(--surface-elevated)] hover:border-[var(--border-interactive)]'
              }`}
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
            >
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                <BilingualText en={node.title.en} bn={node.title.bn} />
              </h3>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeNode === node.id ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                <p className="text-sm text-[var(--text-mut)]">
                  <BilingualText en={node.desc.en} bn={node.desc.bn} />
                </p>
              </div>
            </button>
            
            {index < nodes.length - 1 && (
              <div className="py-2 text-[var(--text-muted)]">
                <ArrowDown className="w-6 h-6 animate-pulse" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
