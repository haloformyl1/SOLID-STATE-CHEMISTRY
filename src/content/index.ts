import { IntroductionModule } from './modules/00-introduction';
import { UnitCellModule } from './modules/01-unit-cell';
import { DensityModule } from './modules/02-density';
import { DefectModule } from './modules/03-defects';
import { PackingModule } from './modules/04-packing';
import { CrystalLatticeModule } from './modules/05-crystal-lattice';
import { CrystalSystemsModule } from './modules/06-crystal-systems';
import { VoidsModule } from './modules/07-voids';
import type { ModuleContent } from '../types/content';

export const modules: ModuleContent[] = [
  IntroductionModule,
  UnitCellModule,
  DensityModule,
  DefectModule,
  PackingModule,
  CrystalLatticeModule,
  CrystalSystemsModule,
  VoidsModule
];

export const getModuleById = (id: string): ModuleContent | undefined => {
  return modules.find(m => m.id === id);
};
