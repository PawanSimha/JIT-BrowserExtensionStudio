const CONFIDENCE_WEIGHTS: Record<string, number> = {
  'global-var': 0.95,
  'dom-attr': 0.85,
  'script-url': 0.75,
  'dom-marker': 0.85,
  meta: 0.7,
  cookie: 0.65,
  header: 0.9,
  'css-class': 0.6,
  'script-content': 0.85,
  'storage-key': 0.7,
  'platform-api': 0.9,
  'structured-data': 0.75,
  'html-comment': 0.55,
};

export function calculateConfidence(
  detectorTypes: string[],
  matchedCount: number,
  _totalDetectors: number,
  perPatternConfidence?: number,
): number {
  if (detectorTypes.length === 0) return 0;

  if (perPatternConfidence !== undefined && perPatternConfidence >= 0) {
    if (perPatternConfidence >= 100) return 98;
    if (perPatternConfidence >= 90) return 95;
    if (perPatternConfidence >= 80) return 90;
    if (perPatternConfidence >= 70) return 82;
    if (perPatternConfidence >= 60) return 72;
    if (perPatternConfidence >= 50) return 60;
    if (perPatternConfidence >= 40) return 45;
    if (perPatternConfidence >= 30) return 30;
    return 15;
  }

  const avgWeight =
    detectorTypes.reduce((sum, t) => sum + (CONFIDENCE_WEIGHTS[t] || 0.5), 0) /
    detectorTypes.length;

  const uniqueTypes = new Set(detectorTypes).size;
  const countBonus = Math.min(0.15, (matchedCount - 1) * 0.04);
  const varietyBonus = Math.min(0.06, (uniqueTypes - 1) * 0.02);

  const raw = avgWeight + countBonus + varietyBonus;

  if (raw >= 1.0) return 98;
  if (raw >= 0.9) return 95;
  if (raw >= 0.8) return 90;
  if (raw >= 0.7) return 82;
  if (raw >= 0.6) return 72;
  if (raw >= 0.5) return 60;
  if (raw >= 0.4) return 45;
  if (raw >= 0.3) return 30;
  return 15;
}
