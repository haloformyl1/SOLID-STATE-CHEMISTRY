import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getModuleById } from '../content';
import { BilingualText } from '../components/BilingualText';
import { useStore } from '../store/useStore';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { UnitCellSelector } from '../components/3d/UnitCellSelector';
import { AtomSharing } from '../components/3d/AtomSharing';
import { DensityLab } from '../components/labs/DensityLab';
import { DefectLab } from '../components/labs/DefectLab';
import { PackingLab } from '../components/labs/PackingLab';
import { LatticeBuilder } from '../components/labs/lattice/LatticeBuilder';
import { ConceptMap } from '../components/labs/lattice/ConceptMap';
import { UnitCellSharing } from '../components/labs/lattice/UnitCellSharing';
import { CrystalSystemExplorer } from '../components/labs/systems/CrystalSystemExplorer';
import { SystemComparisonTable } from '../components/labs/systems/SystemComparisonTable';
import { BravaisDistribution } from '../components/labs/systems/BravaisDistribution';
import { MorphingAnimation } from '../components/labs/systems/MorphingAnimation';
import { VoidExplorer } from '../components/labs/voids/VoidExplorer';
import { VoidComparisonTable } from '../components/labs/voids/VoidComparisonTable';
import { GuidedVoid } from '../components/labs/voids/GuidedVoid';
import { VoidCrossSection } from '../components/labs/voids/VoidCrossSection';
import { HcpAtomCounter } from '../components/3d/HcpAtomCounter';
import { FccAtomCounter } from '../components/3d/FccAtomCounter';
import { CcpFccTransformation } from '../components/3d/CcpFccTransformation';
import { MisconceptionCard } from '../components/ui/MisconceptionCard';
import { CoordinationExplorer } from '../components/labs/packing/CoordinationExplorer';
import { Packing1DBuilder } from '../components/labs/packing/Packing1DBuilder';
import { Packing2DBuilder } from '../components/labs/packing/Packing2DBuilder';
import { Packing2DComparison } from '../components/labs/packing/Packing2DComparison';
import { Packing3DSquare } from '../components/labs/packing/Packing3DSquare';
import { Packing3DHex } from '../components/labs/packing/Packing3DHex';
import { HcpCcpComparison } from '../components/labs/packing/HcpCcpComparison';
import { PackingPathwayExplorer } from '../components/labs/packing/PackingPathwayExplorer';
import { PackingLayerSimulator } from '../components/labs/packing/PackingLayerSimulator';
import { BlockMath } from 'react-katex';

export const ModuleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const moduleData = getModuleById(id || '');
  const { markModuleCompleted, completedModules } = useStore();

  if (!moduleData) {
    return <Navigate to="/learn" replace />;
  }

  const isCompleted = completedModules.includes(moduleData.id);

  const handleComplete = () => {
    markModuleCompleted(moduleData.id);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/learn" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-medium">
        <ArrowLeft className="w-4 h-4" />
        <BilingualText en="Back to Modules" bn="অধ্যায়সমূহে ফিরে যান" />
      </Link>

      <div className="glass-panel rounded-xl p-6 md:p-10 mb-8 max-w-prose mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-[var(--text-str)] border-b-4 border-[var(--acc-prim)] inline-block pb-2">
          <BilingualText en={moduleData.title.en} bn={moduleData.title.bn} />
        </h1>

        <div className="bg-[var(--bg-sec)] p-6 rounded-xl mb-10 border-l-4 border-[var(--acc-sec)]">
          <h2 className="text-xl font-bold mb-4 text-[var(--acc-sec)] flex items-center gap-2">
            <BilingualText en="Learning Objectives" bn="শিখন উদ্দেশ্য" />
          </h2>
          <ul className="space-y-3 text-[var(--text-norm)]">
            {moduleData.learningObjectives.map((obj, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-[var(--acc-prim)] mt-1">•</span>
                <BilingualText en={obj.en} bn={obj.bn} />
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-16">
          {moduleData.sections.map((section) => (
            <section key={section.id} className="border-b border-[var(--border-sub)] pb-12 last:border-0 relative">
              {section.title && (
                <h3 className="text-2xl font-bold mb-5 text-[var(--text-str)] flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-[var(--acc-viol)] rounded-full inline-block"></span>
                  <BilingualText en={section.title.en} bn={section.title.bn} />
                </h3>
              )}
              {section.content && (
                <p className="text-lg text-[var(--text-norm)] leading-relaxed mb-8">
                  <BilingualText en={section.content.en} bn={section.content.bn} />
                </p>
              )}
              
              {section.type === 'formula' && section.formulaTex && (
                <div className="my-8 p-6 bg-[var(--bg-sec)] border border-[var(--acc-viol)]/30 rounded-xl overflow-x-auto text-center shadow-[inset_0_0_20px_rgba(124,58,237,0.05)]">
                  <BlockMath math={section.formulaTex} />
                </div>
              )}

              {section.type === 'interactive_3d' && section.modelConfig?.type === 'unit-cell-selector' && (
                <UnitCellSelector />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'atom-sharing' && (
                <AtomSharing />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'density-calculator' && (
                <DensityLab />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'defect-lab' && (
                <DefectLab />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'packing-lab' && (
                <PackingLab />
              )}
              {section.type === 'concept_map' && (
                <ConceptMap />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'lattice-builder' && (
                <LatticeBuilder />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'unit-cell-sharing' && (
                <UnitCellSharing />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'crystal-systems-explorer' && (
                <CrystalSystemExplorer />
              )}
              {section.type === 'comparison_table' && section.modelConfig?.type === 'system-comparison' && (
                <SystemComparisonTable />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'bravais-distribution' && (
                <BravaisDistribution />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'morphing-animation' && (
                <MorphingAnimation />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'void-explorer' && (
                <VoidExplorer />
              )}
              {section.type === 'comparison_table' && section.modelConfig?.type === 'void-comparison' && (
                <VoidComparisonTable />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'guided-void' && (
                <GuidedVoid />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'void-cross-section' && (
                <VoidCrossSection />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'hcp-atom-counter' && (
                <HcpAtomCounter />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'fcc-atom-counter' && (
                <FccAtomCounter />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'ccp-fcc-transformation' && (
                <CcpFccTransformation />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'coordination-explorer' && (
                <CoordinationExplorer />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'packing-1d' && (
                <Packing1DBuilder />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'packing-2d-builder' && (
                <Packing2DBuilder packingType={section.modelConfig.packingType as 'square' | 'hexagonal'} />
              )}
              {section.type === 'comparison_table' && section.modelConfig?.type === 'packing-2d-comparison' && (
                <Packing2DComparison />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'packing-3d-square' && (
                <Packing3DSquare />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'packing-3d-hex' && (
                <Packing3DHex packingType={section.modelConfig.packingType as 'hcp' | 'ccp'} />
              )}
              {section.type === 'comparison_table' && section.modelConfig?.type === 'hcp-ccp-comparison' && (
                <HcpCcpComparison />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'packing-pathway-explorer' && (
                <PackingPathwayExplorer />
              )}
              {section.type === 'interactive_3d' && section.modelConfig?.type === 'packing-layer-simulator' && (
                <PackingLayerSimulator />
              )}
              {section.type === 'misconception' && (
                <MisconceptionCard 
                  incorrect={section.modelConfig?.incorrect || { en: '', bn: '' }} 
                  correct={section.modelConfig?.correct || { en: '', bn: '' }} 
                />
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-lg transition-all ${
              isCompleted 
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 cursor-default' 
                : 'bg-primary hover:bg-primary-dark text-white shadow-lg hover:-translate-y-0.5'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <BilingualText 
              en={isCompleted ? "Module Completed" : "Mark as Complete"} 
              bn={isCompleted ? "অধ্যায় সমাপ্ত" : "সমাপ্ত হিসেবে চিহ্নিত করুন"} 
            />
          </button>
        </div>
      </div>
    </div>
  );
};
