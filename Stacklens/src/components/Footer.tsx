import { useScanStore } from '@/stores/scanStore';

export default function Footer() {
  const result = useScanStore((s) => s.currentResult);
  const isScanning = useScanStore((s) => s.isScanning);

  const techCount = result?.technologies.length ?? 0;
  const scanTime = result ? (result.scanTime / 1000).toFixed(1) : null;
  const confidence = result?.overallConfidence ?? null;

  return (
    <footer className="shrink-0 border-t border-surface-border px-4 py-1.5 flex items-center justify-between bg-surface-card/30">
      <span className="text-2xs text-text-muted font-code">StackLens v2.0.0</span>
      {result ? (
        <div className="flex items-center gap-2 text-2xs text-text-muted font-code">
          <span>{techCount} techs</span>
          {scanTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-surface-border" />
              <span>{scanTime}s</span>
            </>
          )}
          <span className="w-1 h-1 rounded-full bg-surface-border" />
          <span style={{ color: 'var(--text-primary)' }}>{confidence}%</span>
        </div>
      ) : (
        <span className="flex items-center gap-1.5 text-2xs text-text-muted font-code">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: isScanning ? 'var(--accent)' : 'var(--surface-border)',
              animation: isScanning ? 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
            }}
          />
          {isScanning ? 'Scanning' : 'Idle'}
        </span>
      )}
    </footer>
  );
}
