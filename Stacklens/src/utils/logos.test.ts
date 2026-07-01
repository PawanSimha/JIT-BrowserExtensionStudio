import { describe, it, expect } from 'vitest';
import { getSlug, getBrandColor, getLogoFallback } from './logos';

describe('getSlug', () => {
  it('returns slug for known tech', () => {
    expect(getSlug('react')).toBe('react');
    expect(getSlug('angular')).toBe('angular');
    expect(getSlug('cloudflare')).toBe('cloudflare');
  });

  it('returns custom slug when mapping differs', () => {
    expect(getSlug('nextjs')).toBe('nextdotjs');
    expect(getSlug('nodejs')).toBe('nodedotjs');
    expect(getSlug('materialui')).toBe('mui');
  });

  it('returns null for empty slug', () => {
    expect(getSlug('hsts')).toBeNull();
    expect(getSlug('csp')).toBeNull();
  });

  it('returns null for unknown tech', () => {
    expect(getSlug('nonexistent-tech')).toBeNull();
  });
});

describe('getBrandColor', () => {
  it('returns correct color for known techs', () => {
    expect(getBrandColor('react')).toBe('#61DAFB');
    expect(getBrandColor('typescript')).toBe('#3178C6');
    expect(getBrandColor('python')).toBe('#3776AB');
  });

  it('returns fallback for unknown tech', () => {
    expect(getBrandColor('nonexistent')).toBe('#64748B');
  });
});

describe('getLogoFallback', () => {
  it('returns clearbit URL for brightcove', () => {
    expect(getLogoFallback('brightcove')).toBe('https://logo.clearbit.com/brightcove.com');
  });

  it('returns clearbit URL for akamai-mpulse', () => {
    expect(getLogoFallback('akamai-mpulse')).toBe('https://logo.clearbit.com/akamai.com');
  });

  it('returns null for techs without fallback', () => {
    expect(getLogoFallback('react')).toBeNull();
    expect(getLogoFallback('vue')).toBeNull();
  });
});
