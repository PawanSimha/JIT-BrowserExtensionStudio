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

const statusColors = {
  pass: 'text-green-400',
  warn: 'text-yellow-400',
  fail: 'text-red-400',
  info: 'text-text-muted',
};

const statusBg = {
  pass: 'bg-green-500/10 border-green-500/20',
  warn: 'bg-yellow-500/10 border-yellow-500/20',
  fail: 'bg-red-500/10 border-red-500/20',
  info: 'bg-surface-hover border-surface-border',
};

export default function Security() {
  const { currentResult } = useScanStore();

  if (!currentResult) {
    return (
      <div className="page-container flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-surface-card flex items-center justify-center">
          <Shield size={20} className="text-text-muted" strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-semibold font-heading text-text-primary">Security Overview</h2>
        <p className="text-xs text-text-secondary max-w-[220px]">
          Analyze a website first to see its security report.
        </p>
      </div>
    );
  }

  const report = analyzeSecurity(currentResult);

  return (
    <div className="page-container flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Shield size={14} className="text-brand-primary" strokeWidth={1.5} />
        <h2 className="text-sm font-semibold font-heading text-text-primary">
          {currentResult.hostname}
        </h2>
      </div>

      <div className="card flex items-center gap-4">
        <GradeBadge grade={report.grade} />
        <div>
          <p className="text-xs font-semibold text-text-primary">Security Score</p>
          <p className="text-2xs text-text-secondary mt-0.5">{report.score}/100</p>
          <div className="w-28 h-1.5 bg-surface-hover rounded-full mt-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                report.score >= 75 ? 'bg-green-400' : report.score >= 50 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${report.score}%` }}
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
              className={`card p-2.5 border ${statusBg[check.status]}`}
            >
              <div className="flex items-start gap-2">
                <Icon size={14} className={`shrink-0 mt-0.5 ${statusColors[check.status]}`} strokeWidth={1.5} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-text-primary">{check.name}</span>
                    <span className={`badge text-[9px] capitalize ${statusBg[check.status]}`}>
                      {check.status}
                    </span>
                  </div>
                  <p className="text-2xs text-text-secondary mt-0.5">{check.description}</p>
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
