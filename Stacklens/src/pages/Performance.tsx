import { useScanStore } from '@/stores/scanStore';
import { analyzePerformance } from '@/utils/analysis';
import GradeBadge from '@/components/GradeBadge';
import { Gauge, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const metricIcons = {
  good: CheckCircle,
  average: AlertTriangle,
  poor: AlertTriangle,
  info: Info,
};

const metricColors = {
  good: 'text-green-400',
  average: 'text-yellow-400',
  poor: 'text-red-400',
  info: 'text-text-muted',
};

const metricBg = {
  good: 'bg-green-500/10 border-green-500/20',
  average: 'bg-yellow-500/10 border-yellow-500/20',
  poor: 'bg-red-500/10 border-red-500/20',
  info: 'bg-surface-hover border-surface-border',
};

export default function Performance() {
  const { currentResult } = useScanStore();

  if (!currentResult) {
    return (
      <div className="page-container flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-surface-card flex items-center justify-center">
          <Gauge size={20} className="text-text-muted" strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-semibold font-heading text-text-primary">Performance Analysis</h2>
        <p className="text-xs text-text-secondary max-w-[220px]">
          Analyze a website first to see its performance report.
        </p>
      </div>
    );
  }

  const report = analyzePerformance(currentResult);

  return (
    <div className="page-container flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Gauge size={14} className="text-brand-primary" strokeWidth={1.5} />
        <h2 className="text-sm font-semibold font-heading text-text-primary">
          {currentResult.hostname}
        </h2>
      </div>

      <div className="card flex items-center gap-4">
        <GradeBadge grade={report.grade} />
        <div>
          <p className="text-xs font-semibold text-text-primary">Performance Score</p>
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
        {report.metrics.map((metric, i) => {
          const Icon = metricIcons[metric.status];
          return (
            <div
              key={i}
              className={`card p-2.5 border ${metricBg[metric.status]}`}
            >
              <div className="flex items-start gap-2">
                <Icon size={14} className={`shrink-0 mt-0.5 ${metricColors[metric.status]}`} strokeWidth={1.5} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-text-primary">{metric.name}</span>
                    <span className={`badge text-[9px] capitalize ${metricBg[metric.status]}`}>
                      {metric.status}
                    </span>
                  </div>
                  <p className="text-2xs text-text-secondary mt-0.5">{metric.description}</p>
                  {metric.detail && (
                    <p className="text-2xs text-text-muted mt-0.5 font-code">{metric.detail}</p>
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
