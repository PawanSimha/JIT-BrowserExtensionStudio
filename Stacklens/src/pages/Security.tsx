import { useScanStore } from '@/stores/scanStore';
import { analyzeSecurity } from '@/utils/analysis';
import GradeBadge from '@/components/GradeBadge';
import { Shield, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const statusIcons = {
  pass: CheckCircle,
  warn: AlertTriangle,
  fail: XCircle,
  info: Info,
};

const statusColors: Record<string, string> = {
  pass: '#22C55E',
  warn: '#FBBF24',
  fail: '#EF4444',
  info: 'var(--text-muted)',
};

const statusBg: Record<string, string> = {
  pass: 'rgba(34, 197, 94, 0.08)',
  warn: 'rgba(251, 191, 36, 0.08)',
  fail: 'rgba(239, 68, 68, 0.08)',
  info: 'transparent',
};

const statusBorder: Record<string, string> = {
  pass: 'rgba(34, 197, 94, 0.2)',
  warn: 'rgba(251, 191, 36, 0.2)',
  fail: 'rgba(239, 68, 68, 0.2)',
  info: 'var(--surface-border)',
};

export default function Security() {
  const { currentResult } = useScanStore();

  if (!currentResult) {
    return (
      <div className="page-container flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-surface-card flex items-center justify-center">
          <Shield size={20} className="text-text-muted" strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-heading text-text-primary">Security Overview</h2>
        <p className="text-xs text-text-secondary max-w-[220px] font-body">
          Analyze a website first to see its security report.
        </p>
      </div>
    );
  }

  const report = analyzeSecurity(currentResult);

  return (
    <div className="page-container flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Shield size={14} style={{ color: 'var(--text-primary)' }} strokeWidth={1.5} />
        <h2 className="text-sm font-heading text-text-primary">{currentResult.hostname}</h2>
      </div>

      <div className="card-primary flex items-center gap-4">
        <GradeBadge grade={report.grade} />
        <div>
          <p className="text-xs font-heading text-text-primary">Security Score</p>
          <p className="text-2xs text-text-secondary font-code mt-0.5">{report.score}/100</p>
          <div className="w-28 h-1.5 rounded-full mt-1.5 overflow-hidden" style={{ background: 'var(--surface-border)' }}>
            <div
              className="h-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                width: `${report.score}%`,
                background: report.score >= 75 ? 'var(--text-primary)' : report.score >= 50 ? 'var(--text-secondary)' : '#EF4444',
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 scrollable">
        {report.checks.map((check, i) => {
          const Icon = statusIcons[check.status];
          return (
            <div
              key={i}
              className="rounded-lg border p-2.5 transition-all duration-150"
              style={{ background: statusBg[check.status], borderColor: statusBorder[check.status] }}
            >
              <div className="flex items-start gap-2">
                <Icon size={14} className="shrink-0 mt-0.5" style={{ color: statusColors[check.status] }} strokeWidth={1.5} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-body font-medium text-text-primary">{check.name}</span>
                    <span
                      className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-code font-medium capitalize"
                      style={{ background: statusBg[check.status], color: statusColors[check.status], border: `1px solid ${statusBorder[check.status]}` }}
                    >
                      {check.status}
                    </span>
                  </div>
                  <p className="text-2xs text-text-secondary mt-0.5 font-body">{check.description}</p>
                  {check.detail && (
                    <p className="text-2xs text-text-muted mt-0.5 font-code truncate">{check.detail}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
