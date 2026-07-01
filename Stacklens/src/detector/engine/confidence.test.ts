import { describe, it, expect } from 'vitest';
import { calculateConfidence } from './confidence';

describe('calculateConfidence', () => {
  it('returns 0 for empty detector types', () => {
    expect(calculateConfidence([], 0, 0)).toBe(0);
  });

  it('returns high confidence for multiple high-weight detectors', () => {
    const result = calculateConfidence(['global-var', 'dom-attr', 'header'], 3, 3);
    expect(result).toBeGreaterThanOrEqual(90);
  });

  it('returns moderate confidence for a single script-url detector', () => {
    const result = calculateConfidence(['script-url'], 1, 3);
    expect(result).toBeGreaterThanOrEqual(60);
    expect(result).toBeLessThanOrEqual(82);
  });

  it('returns low confidence for a single css-class detector', () => {
    const result = calculateConfidence(['css-class'], 1, 1);
    expect(result).toBeLessThanOrEqual(72);
  });

  it('applies count bonus for multiple matches', () => {
    const single = calculateConfidence(['global-var'], 1, 5);
    const multi = calculateConfidence(['global-var'], 3, 5);
    expect(multi).toBeGreaterThanOrEqual(single);
  });

  it('applies variety bonus for different detector types', () => {
    const sameType = calculateConfidence(['global-var', 'global-var'], 2, 2);
    const diffType = calculateConfidence(['global-var', 'header'], 2, 2);
    expect(diffType).toBeGreaterThanOrEqual(sameType);
  });
});
