export const AVOGADRO_CONSTANT = 6.022e23; // mol^-1

export type UnitCellType = 'SC' | 'BCC' | 'FCC';

export const getEffectiveAtoms = (type: UnitCellType): number => {
  switch (type) {
    case 'SC': return 1;
    case 'BCC': return 2;
    case 'FCC': return 4;
  }
};

export const getCoordinationNumber = (type: UnitCellType): number => {
  switch (type) {
    case 'SC': return 6;
    case 'BCC': return 8;
    case 'FCC': return 12;
  }
};

// Returns radius given edge length a
export const getRadius = (type: UnitCellType, a: number): number => {
  switch (type) {
    case 'SC': return a / 2;
    case 'BCC': return (Math.sqrt(3) * a) / 4;
    case 'FCC': return (Math.sqrt(2) * a) / 4;
  }
};

// Returns edge length given radius r
export const getEdgeLength = (type: UnitCellType, r: number): number => {
  switch (type) {
    case 'SC': return 2 * r;
    case 'BCC': return (4 * r) / Math.sqrt(3);
    case 'FCC': return (4 * r) / Math.sqrt(2);
  }
};

// Returns packing efficiency as a percentage
export const getPackingEfficiency = (type: UnitCellType): number => {
  switch (type) {
    case 'SC': return (Math.PI / 6) * 100; // ~52.4%
    case 'BCC': return ((Math.sqrt(3) * Math.PI) / 8) * 100; // ~68.0%
    case 'FCC': return ((Math.sqrt(2) * Math.PI) / 6) * 100; // ~74.0%
  }
};

export const getEmptySpace = (type: UnitCellType): number => {
  return 100 - getPackingEfficiency(type);
};

export const getOctahedralVoids = (nPackedParticles: number): number => {
  return nPackedParticles;
};

export const getTetrahedralVoids = (nPackedParticles: number): number => {
  return 2 * nPackedParticles;
};

// Unit conversions to cm
export const convertToCm = (value: number, unit: 'pm' | 'Å' | 'nm' | 'cm' | 'm'): number => {
  switch (unit) {
    case 'pm': return value * 1e-10;
    case 'Å': return value * 1e-8;
    case 'nm': return value * 1e-7;
    case 'm': return value * 100;
    case 'cm': return value;
  }
};

/**
 * Calculate density in g/cm³
 * @param z Effective number of atoms
 * @param m Molar mass in g/mol
 * @param a Edge length in chosen unit
 * @param unit Unit of edge length
 * @returns Density in g/cm³
 */
export const calculateDensity = (z: number, m: number, a: number, unit: 'pm' | 'Å' | 'nm' | 'cm' | 'm'): number => {
  if (z <= 0 || m <= 0 || a <= 0) {
    throw new Error('Values must be positive');
  }
  const aInCm = convertToCm(a, unit);
  const volumeInCm3 = Math.pow(aInCm, 3);
  return (z * m) / (volumeInCm3 * AVOGADRO_CONSTANT);
};
