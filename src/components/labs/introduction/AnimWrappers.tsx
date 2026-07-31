import { GuidedLessonEngine } from './engine/GuidedLessonEngine';

import { whatIsASolidData } from './sequences/WhatIsASolidData';
import { WhatIsASolidRenderer } from './sequences/WhatIsASolidRenderer';

import { generalCharacteristicsData } from './sequences/GeneralCharacteristicsData';
import { GeneralCharacteristicsRenderer } from './sequences/GeneralCharacteristicsRenderer';

import { crystallineAmorphousData } from './sequences/CrystallineAmorphousData';
import { CrystallineAmorphousRenderer } from './sequences/CrystallineAmorphousRenderer';

import { anisotropyData } from './sequences/AnisotropyData';
import { AnisotropyRenderer } from './sequences/AnisotropyRenderer';

import { latticeToUnitCellData } from './sequences/LatticeToUnitCellData';
import { LatticeToUnitCellRenderer } from './sequences/LatticeToUnitCellRenderer';

export const WhatIsSolidAnim = () => (
  <GuidedLessonEngine 
    sequence={whatIsASolidData} 
    render3D={(step, on, p) => <WhatIsASolidRenderer step={step} isAnimationOn={on} progress={p} />} 
  />
);

export const GeneralCharacteristicsAnim = () => (
  <GuidedLessonEngine 
    sequence={generalCharacteristicsData} 
    render3D={(step, on, p) => <GeneralCharacteristicsRenderer step={step} isAnimationOn={on} progress={p} />} 
  />
);

export const CrystallineAmorphousAnim = () => (
  <GuidedLessonEngine 
    sequence={crystallineAmorphousData} 
    render3D={(step, on, p) => <CrystallineAmorphousRenderer step={step} isAnimationOn={on} progress={p} />} 
  />
);

export const AnisotropyAnim = () => (
  <GuidedLessonEngine 
    sequence={anisotropyData} 
    render3D={(step, on, p) => <AnisotropyRenderer step={step} isAnimationOn={on} progress={p} />} 
  />
);

export const LatticeToUnitCellAnim = () => (
  <GuidedLessonEngine 
    sequence={latticeToUnitCellData} 
    render3D={(step, on, p) => <LatticeToUnitCellRenderer step={step} isAnimationOn={on} progress={p} />} 
  />
);
