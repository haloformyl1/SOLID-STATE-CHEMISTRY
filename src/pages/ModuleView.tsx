import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getModuleById } from '../content';
import { BilingualText } from '../components/BilingualText';
import { useStore } from '../store/useStore';
import { ArrowLeft, CheckCircle, Target } from 'lucide-react';
import { NextModuleLink } from '../components/ui/NextModuleLink';
import { FullscreenInteractiveFrame } from '../components/ui/FullscreenInteractiveFrame';
import { MisconceptionCard } from '../components/ui/Cards';

const lazyNamed = <T extends React.ComponentType<Record<string, unknown>>>(
  loader: () => Promise<Record<string, unknown>>,
  exportName: string,
) => React.lazy(async () => {
  const module = await loader();
  return { default: module[exportName] as T };
});

const UnitCellSelector = lazyNamed(() => import('../components/3d/UnitCellSelector'), 'UnitCellSelector');
const AtomSharing = lazyNamed(() => import('../components/3d/AtomSharing'), 'AtomSharing');
const HcpAtomCounter = lazyNamed(() => import('../components/3d/HcpAtomCounter'), 'HcpAtomCounter');
const FccAtomCounter = lazyNamed(() => import('../components/3d/FccAtomCounter'), 'FccAtomCounter');
const CcpFccTransformation = lazyNamed(() => import('../components/3d/CcpFccTransformation'), 'CcpFccTransformation');
const DensityLab = lazyNamed(() => import('../components/labs/DensityLab'), 'DensityLab');
const DefectLab = lazyNamed(() => import('../components/labs/DefectLab'), 'DefectLab');
const PackingLab = lazyNamed(() => import('../components/labs/PackingLab'), 'PackingLab');
const LatticeBuilder = lazyNamed(() => import('../components/labs/lattice/LatticeBuilder'), 'LatticeBuilder');
const ConceptMap = lazyNamed(() => import('../components/labs/lattice/ConceptMap'), 'ConceptMap');
const UnitCellSharing = lazyNamed(() => import('../components/labs/lattice/UnitCellSharing'), 'UnitCellSharing');
const WhatIsASolidLab = lazyNamed(() => import('../components/labs/introduction/interactions/WhatIsASolidLab'), 'WhatIsASolidLab');
const SolidBuilderLab = lazyNamed(() => import('../components/labs/introduction/interactions/SolidBuilderLab'), 'SolidBuilderLab');
const CrystallineAmorphousComparison = lazyNamed(() => import('../components/labs/introduction/interactions/CrystallineAmorphousComparison'), 'CrystallineAmorphousComparison');
const AnisotropyLab = lazyNamed(() => import('../components/labs/introduction/interactions/AnisotropyLab'), 'AnisotropyLab');
const ClassificationTreeLab = lazyNamed(() => import('../components/labs/introduction/interactions/ClassificationTreeLab'), 'ClassificationTreeLab');
const BindingForceLab = lazyNamed(() => import('../components/labs/introduction/interactions/BindingForceLab'), 'BindingForceLab');
const ConductivityLab = lazyNamed(() => import('../components/labs/introduction/interactions/ConductivityLab'), 'ConductivityLab');
const GraphiteExceptionLab = lazyNamed(() => import('../components/labs/introduction/interactions/GraphiteExceptionLab'), 'GraphiteExceptionLab');
const CrystalSystemExplorer = lazyNamed(() => import('../components/labs/systems/CrystalSystemExplorer'), 'CrystalSystemExplorer');
const SystemComparisonTable = lazyNamed(() => import('../components/labs/systems/SystemComparisonTable'), 'SystemComparisonTable');
const BravaisDistribution = lazyNamed(() => import('../components/labs/systems/BravaisDistribution'), 'BravaisDistribution');
const MorphingAnimation = lazyNamed(() => import('../components/labs/systems/MorphingAnimation'), 'MorphingAnimation');
const VoidExplorer = lazyNamed(() => import('../components/labs/voids/VoidExplorer'), 'VoidExplorer');
const VoidComparisonTable = lazyNamed(() => import('../components/labs/voids/VoidComparisonTable'), 'VoidComparisonTable');
const GuidedVoid = lazyNamed(() => import('../components/labs/voids/GuidedVoid'), 'GuidedVoid');
const VoidCrossSection = lazyNamed(() => import('../components/labs/voids/VoidCrossSection'), 'VoidCrossSection');
const CoordinationExplorer = lazyNamed(() => import('../components/labs/packing/CoordinationExplorer'), 'CoordinationExplorer');
const Packing1DBuilder = lazyNamed(() => import('../components/labs/packing/Packing1DBuilder'), 'Packing1DBuilder');
const Packing2DBuilder = lazyNamed(() => import('../components/labs/packing/Packing2DBuilder'), 'Packing2DBuilder');
const Packing2DComparison = lazyNamed(() => import('../components/labs/packing/Packing2DComparison'), 'Packing2DComparison');
const Packing3DSquare = lazyNamed(() => import('../components/labs/packing/Packing3DSquare'), 'Packing3DSquare');
const Packing3DHex = lazyNamed(() => import('../components/labs/packing/Packing3DHex'), 'Packing3DHex');
const HcpCcpComparison = lazyNamed(() => import('../components/labs/packing/HcpCcpComparison'), 'HcpCcpComparison');
const PackingPathwayExplorer = lazyNamed(() => import('../components/labs/packing/PackingPathwayExplorer'), 'PackingPathwayExplorer');
const PackingLayerSimulator = lazyNamed(() => import('../components/labs/packing/PackingLayerSimulator'), 'PackingLayerSimulator');

const InteractiveLoadingState = () => (
  <div className="surface-panel flex min-h-40 items-center justify-center p-6 text-center text-sm font-semibold text-[var(--text-secondary)]" role="status">
    Preparing interactive laboratory&hellip;
  </div>
);

const DensityFormula = () => (
  <div
    className="flex min-w-max items-center justify-center gap-3 font-serif text-3xl italic text-[var(--text-primary)] md:text-4xl"
    role="math"
    aria-label="Density equals Z times molar mass divided by Avogadro constant times edge length cubed"
  >
    <span>&rho; =</span>
    <span className="inline-grid min-w-44 grid-rows-2 text-center leading-tight not-italic">
      <span className="border-b-2 border-[var(--text-primary)] px-4 pb-1 italic">Z &middot; M</span>
      <span className="px-4 pt-1 italic">N<sub className="text-[0.58em] not-italic">A</sub> &middot; a<sup className="text-[0.58em] not-italic">3</sup></span>
    </span>
  </div>
);

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
    <div className="min-h-screen w-full pb-20">
      {/* Module Header Area */}
      <div className="sticky top-[var(--header-height-mobile)] z-40 border-b border-[var(--border-default)] bg-[var(--header-background)] shadow-[var(--shadow-low)] backdrop-blur-xl md:top-[var(--header-height-desktop)]">
        <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col justify-between gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center lg:px-10">
          <div>
            <Link to="/learn" className="mb-2 inline-flex min-h-9 items-center gap-2 rounded-md px-1 text-sm font-bold text-[var(--accent-primary)] hover:underline">
              <ArrowLeft className="w-4 h-4" />
              <BilingualText en="Back to Modules" bn="অধ্যায়সমূহে ফিরে যান" />
            </Link>
            <h1 className="text-2xl font-black text-[var(--text-primary)] md:text-3xl">
              <BilingualText en={moduleData.title.en} bn={moduleData.title.bn} />
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-bold ${isCompleted ? 'border-[color-mix(in_srgb,var(--success)_35%,transparent)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] text-[var(--success)]' : 'border-[var(--border-default)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]'}`}>
              {isCompleted ? <CheckCircle className="h-5 w-5" /> : <span className="status-dot" aria-hidden="true" />}
              <BilingualText en={isCompleted ? 'Completed' : 'In study'} bn={isCompleted ? 'সম্পূর্ণ' : 'অধ্যয়নরত'} />
            </div>
          </div>
        </div>
        <div className="h-1 bg-[var(--surface-elevated)]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={isCompleted ? 100 : 0} aria-label="Module completion">
          <div className={`h-full bg-[var(--success)] transition-[width] ${isCompleted ? 'w-full' : 'w-0'}`} />
        </div>
      </div>

      <div className="page-shell animate-fade-in-up pt-8">

        {/* Learning Objectives Panel */}
        <div className="reading-column mb-14">
          <div className="surface-panel border-l-4 border-l-[var(--accent-secondary)] bg-[var(--surface-secondary)] p-6 md:p-8">
            <h2 className="mb-5 flex items-center gap-3 text-xl font-bold text-[var(--accent-secondary)]">
              <Target className="w-6 h-6" />
              <BilingualText en="Learning Objectives" bn="শিখন উদ্দেশ্য" />
            </h2>
            <ul className="space-y-4 text-[var(--text-secondary)]">
              {moduleData.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-4 shadow-[var(--shadow-low)]">
                  <div className="w-6 h-6 rounded-full bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] flex items-center justify-center shrink-0 font-bold text-sm mt-0.5">
                    {i + 1}
                  </div>
                  <div className="leading-relaxed font-medium">
                    <BilingualText en={obj.en} bn={obj.bn} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Lesson Sections */}
        <div className="space-y-14 lg:space-y-20">
          {moduleData.sections.map((section) => (
            <section key={section.id} className="relative w-full border-b border-[var(--border-default)] pb-14 last:border-0 last:pb-0">
              
              <div className="reading-column">
                {section.title && (
                  <h3 className="section-heading mt-8 mb-6 text-2xl font-extrabold text-[var(--text-primary)]">
                    <BilingualText en={section.title.en} bn={section.title.bn} />
                  </h3>
                )}

                {section.content && (
                  <div className="type-body-large mb-8 text-[var(--text-secondary)]">
                    <BilingualText en={section.content.en} bn={section.content.bn} />
                  </div>
                )}

                {section.type === 'formula' && section.formulaTex && (
                  <div className="type-formula my-8 overflow-x-auto rounded-xl border border-[color-mix(in_srgb,var(--accent-violet)_35%,var(--border-default))] bg-[var(--formula-background)] p-6 text-center shadow-[var(--shadow-low)] md:p-8">
                    <DensityFormula />
                  </div>
                )}

                {section.type === 'misconception' && (
                  <MisconceptionCard
                    incorrect={section.modelConfig?.incorrect || { en: '', bn: '' }}
                    correct={section.modelConfig?.correct || { en: '', bn: '' }}
                  />
                )}
              </div>

              {/* Interactive Laboratories - Full Width visually but contained safely */}
              <div className="mb-6 mt-10 w-full">
                <div className="laboratory-container">
                  <React.Suspense fallback={<InteractiveLoadingState />}>
                  {section.modelConfig?.type === 'what-is-solid-lab' && (
                    <FullscreenInteractiveFrame title={<BilingualText en="What Is a Solid?" bn="কঠিন পদার্থ কী?" />}>
                      <WhatIsASolidLab />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'solid-builder-lab' && (
                    <FullscreenInteractiveFrame title={<BilingualText en="Solid Properties Laboratory" bn="কঠিনের ধর্ম পরীক্ষাগার" />}>
                      <SolidBuilderLab />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'cryst-amorph-lab' && (
                    <FullscreenInteractiveFrame title={<BilingualText en="Crystalline vs Amorphous" bn="স্ফটিকাকার বনাম অস্ফটিকাকার" />}>
                      <CrystallineAmorphousComparison />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'anisotropy-lab' && (
                    <FullscreenInteractiveFrame title={<BilingualText en="Anisotropy Laboratory" bn="অসমদিকতা পরীক্ষাগার" />}>
                      <AnisotropyLab />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'classification-tree-lab' && (
                    <FullscreenInteractiveFrame title={<BilingualText en="Solid Classification" bn="কঠিন পদার্থের শ্রেণিবিভাগ" />}>
                      <ClassificationTreeLab />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'binding-force-lab' && (
                    <FullscreenInteractiveFrame title={<BilingualText en="Binding Forces" bn="বন্ধন বল" />}>
                      <BindingForceLab />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'conductivity-lab' && (
                    <FullscreenInteractiveFrame title={<BilingualText en="Ionic Conductivity" bn="আয়নিক পরিবাহিতা" />}>
                      <ConductivityLab />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'graphite-exception-lab' && (
                    <FullscreenInteractiveFrame title={<BilingualText en="Graphite Exception" bn="গ্রাফাইটের ব্যতিক্রম" />}>
                      <GraphiteExceptionLab />
                    </FullscreenInteractiveFrame>
                  )}

                  {section.modelConfig?.type === 'unit-cell-selector' && (
                    <FullscreenInteractiveFrame>
                      <UnitCellSelector />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'atom-sharing' && (
                    <FullscreenInteractiveFrame>
                      <AtomSharing />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'density-calculator' && (
                    <FullscreenInteractiveFrame>
                      <DensityLab />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'defect-lab' && (
                    <FullscreenInteractiveFrame>
                      <DefectLab />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'packing-lab' && (
                    <FullscreenInteractiveFrame>
                      <PackingLab />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.type === 'concept_map' && (
                    <div className="surface-panel overflow-hidden p-4 md:p-6"><ConceptMap /></div>
                  )}
                  {section.modelConfig?.type === 'lattice-builder' && (
                    <FullscreenInteractiveFrame>
                      <LatticeBuilder />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'unit-cell-sharing' && (
                    <FullscreenInteractiveFrame>
                      <UnitCellSharing />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'crystal-systems-explorer' && (
                    <FullscreenInteractiveFrame>
                      <CrystalSystemExplorer />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'system-comparison' && (
                    <div className="surface-panel overflow-x-auto p-4 md:p-6"><SystemComparisonTable /></div>
                  )}
                  {section.modelConfig?.type === 'bravais-distribution' && (
                    <FullscreenInteractiveFrame>
                      <BravaisDistribution />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'morphing-animation' && (
                    <FullscreenInteractiveFrame>
                      <MorphingAnimation />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'void-explorer' && (
                    <FullscreenInteractiveFrame>
                      <VoidExplorer />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'void-comparison' && (
                    <div className="surface-panel overflow-x-auto p-4 md:p-6"><VoidComparisonTable /></div>
                  )}
                  {section.modelConfig?.type === 'guided-void' && (
                    <FullscreenInteractiveFrame>
                      <GuidedVoid />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'void-cross-section' && (
                    <FullscreenInteractiveFrame>
                      <VoidCrossSection />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'hcp-atom-counter' && (
                    <FullscreenInteractiveFrame>
                      <HcpAtomCounter />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'fcc-atom-counter' && (
                    <FullscreenInteractiveFrame>
                      <FccAtomCounter />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'ccp-fcc-transformation' && (
                    <FullscreenInteractiveFrame>
                      <CcpFccTransformation />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'coordination-explorer' && (
                    <FullscreenInteractiveFrame>
                      <CoordinationExplorer />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'packing-1d' && (
                    <FullscreenInteractiveFrame>
                      <Packing1DBuilder />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'packing-2d-builder' && (
                    <FullscreenInteractiveFrame>
                      <Packing2DBuilder packingType={section.modelConfig.packingType as 'square' | 'hexagonal'} />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'packing-2d-comparison' && (
                    <div className="surface-panel overflow-x-auto p-4 md:p-6"><Packing2DComparison /></div>
                  )}
                  {section.modelConfig?.type === 'packing-3d-square' && (
                    <FullscreenInteractiveFrame>
                      <Packing3DSquare />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'packing-3d-hex' && (
                    <FullscreenInteractiveFrame>
                      <Packing3DHex packingType={section.modelConfig.packingType as 'hcp' | 'ccp'} />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'hcp-ccp-comparison' && (
                    <div className="surface-panel overflow-x-auto p-4 md:p-6"><HcpCcpComparison /></div>
                  )}
                  {section.modelConfig?.type === 'packing-pathway-explorer' && (
                    <FullscreenInteractiveFrame>
                      <PackingPathwayExplorer />
                    </FullscreenInteractiveFrame>
                  )}
                  {section.modelConfig?.type === 'packing-layer-simulator' && (
                    <FullscreenInteractiveFrame>
                      <PackingLayerSimulator />
                    </FullscreenInteractiveFrame>
                  )}
                  </React.Suspense>
                </div>
              </div>

              {section.type === 'next_module_link' && section.modelConfig?.targetModuleId && (
                <div className="reading-column mt-12">
                  <NextModuleLink targetModuleId={section.modelConfig.targetModuleId} text={section.content as {en: string, bn: string}} />
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-20 flex justify-start border-t border-[var(--border-default)] pb-12 pt-12">
          <button
            onClick={handleComplete}
            disabled={isCompleted}
            className={`btn px-8 py-4 text-lg ${
              isCompleted 
                ? 'border-[color-mix(in_srgb,var(--success)_30%,transparent)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] text-[var(--success)]'
                : 'btn-primary'
            }`}
          >
            <CheckCircle className={isCompleted ? "w-6 h-6" : "w-6 h-6"} />
            <BilingualText 
              en={isCompleted ? "Module Completed" : "Mark Module as Complete"}
              bn={isCompleted ? "অধ্যায় সমাপ্ত" : "অধ্যায়টি সমাপ্ত হিসেবে চিহ্নিত করুন"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
