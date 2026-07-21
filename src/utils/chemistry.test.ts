import { describe, it, expect } from 'vitest';
import {
  getEffectiveAtoms,
  getCoordinationNumber,
  getRadius,
  getEdgeLength,
  getPackingEfficiency,
  getEmptySpace,
  getOctahedralVoids,
  getTetrahedralVoids,
  convertToCm,
  calculateDensity
} from './chemistry';

describe('Solid-State Chemistry Utilities', () => {
  it('should return correct effective atoms (Z)', () => {
    expect(getEffectiveAtoms('SC')).toBe(1);
    expect(getEffectiveAtoms('BCC')).toBe(2);
    expect(getEffectiveAtoms('FCC')).toBe(4);
  });

  it('should return correct coordination numbers', () => {
    expect(getCoordinationNumber('SC')).toBe(6);
    expect(getCoordinationNumber('BCC')).toBe(8);
    expect(getCoordinationNumber('FCC')).toBe(12);
  });

  it('should calculate radius-edge relations correctly', () => {
    // a = 2, calculate r
    expect(getRadius('SC', 2)).toBeCloseTo(1);
    expect(getRadius('BCC', 2)).toBeCloseTo((Math.sqrt(3) * 2) / 4);
    expect(getRadius('FCC', 2)).toBeCloseTo((Math.sqrt(2) * 2) / 4);

    // r = 1, calculate a
    expect(getEdgeLength('SC', 1)).toBeCloseTo(2);
    expect(getEdgeLength('BCC', 1)).toBeCloseTo(4 / Math.sqrt(3));
    expect(getEdgeLength('FCC', 1)).toBeCloseTo(4 / Math.sqrt(2));
  });

  it('should calculate packing efficiency correctly', () => {
    expect(getPackingEfficiency('SC')).toBeCloseTo(52.36, 1);
    expect(getPackingEfficiency('BCC')).toBeCloseTo(68.02, 1);
    expect(getPackingEfficiency('FCC')).toBeCloseTo(74.05, 1);
  });

  it('should calculate empty space correctly', () => {
    expect(getEmptySpace('SC')).toBeCloseTo(47.64, 1);
    expect(getEmptySpace('BCC')).toBeCloseTo(31.98, 1);
    expect(getEmptySpace('FCC')).toBeCloseTo(25.95, 1);
  });

  it('should calculate void numbers correctly', () => {
    const N = 100;
    expect(getOctahedralVoids(N)).toBe(100);
    expect(getTetrahedralVoids(N)).toBe(200);
  });

  it('should perform unit conversions correctly', () => {
    expect(convertToCm(100, 'pm')).toBeCloseTo(1e-8);
    expect(convertToCm(1, 'Å')).toBeCloseTo(1e-8);
    expect(convertToCm(1, 'nm')).toBeCloseTo(1e-7);
    expect(convertToCm(1, 'm')).toBeCloseTo(100);
    expect(convertToCm(1, 'cm')).toBe(1);
  });

  it('should calculate density correctly', () => {
    // Example: Copper is FCC (Z=4), M=63.5 g/mol, a=3.61 * 10^-8 cm
    // d = (4 * 63.5) / ((3.61e-8)^3 * 6.022e23) ~ 8.96 g/cm3
    const density = calculateDensity(4, 63.5, 3.61, 'Å');
    expect(density).toBeCloseTo(8.96, 1);
  });

  it('should reject invalid density inputs', () => {
    expect(() => calculateDensity(0, 10, 10, 'cm')).toThrow();
    expect(() => calculateDensity(4, -10, 10, 'cm')).toThrow();
    expect(() => calculateDensity(4, 10, 0, 'cm')).toThrow();
  });
});
