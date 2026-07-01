import { useScanStore } from '@/stores/scanStore';
import { useNavigate } from 'react-router-dom';
import { getCategoryBreakdown } from '@/utils/analysis';
import TechLogo from '@/components/TechLogo';
import { ArrowRight, RotateCcw, Blocks, GitBranch, Gauge, Shield, Layers } from 'lucide-react';
import { useState } from 'react';

function ConfidenceRing({ value, size = 64 }: { value: number; size?: number }) {
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 75 ? '#14B8A6' : value >= 50 ? '#EAB308' : '#EF4444';

  return (
    <svg width={size} height={size} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgb(51 65 85)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all duration-700"
      />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central" fill="currentColor" className="text-xs font-bold font-heading" fontSize="11">
        {Math.round(value)}%
      </text>
    </svg>
  );
}

function CategoryBar({ data }: { data: { category: string; count: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  if (total === 0) return null;

  return (
    <div className="flex h-2 rounded-full overflow-hidden">
      {data.map((d) => (
        <div
          key={d.category}
          style={{ width: `${(d.count / total) * 100}%`, backgroundColor: d.color }}
          className="first:rounded-l-full last:rounded-r-full transition-all"
          title={`${d.category}: ${d.count}`}
        />
      ))}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentResult, isScanning, error, triggerScan } = useScanStore();
  const [faviconError, setFaviconError] = useState(false);

  if (isScanning) {
    return (
      <div className="page-container flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-surface-card flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <h2 className="text-base font-semibold font-heading text-text-primary">
          Analyzing Website
        </h2>
        <p className="text-xs text-text-secondary">
          Scanning page content, scripts, and headers...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
          <span className="text-lg text-red-400">!</span>
        </div>
        <h2 className="text-base font-semibold font-heading text-text-primary">
          Scan Failed
        </h2>
        <p className="text-xs text-text-secondary max-w-[260px]">{error}</p>
        <button onClick={triggerScan} className="btn btn-primary text-xs mt-1">
          <RotateCcw size={12} />
          Retry
        </button>
      </div>
    );
  }

  if (currentResult) {
    const categories = getCategoryBreakdown(currentResult);
    const totalCat = categories.length;

    return (
      <div className="page-container flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-accent" />
          <span className="text-2xs text-text-secondary font-medium uppercase tracking-wider">
            Analysis Complete
          </span>
        </div>

        <div className="card flex items-center gap-3">
          {!faviconError ? (
            <img
              src={currentResult.favicon || `https://www.google.com/s2/favicons?domain=${currentResult.hostname}&sz=32`}
              alt=""
              className="w-8 h-8 rounded-lg shrink-0"
              onError={() => setFaviconError(true)}
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold font-heading text-brand-primary">
                {currentResult.hostname.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-text-primary truncate">
              {currentResult.hostname}
            </p>
            <p className="text-2xs text-text-muted truncate">
              {currentResult.technologies.length} technologies in {totalCat} categories
            </p>
          </div>
          <ConfidenceRing value={currentResult.overallConfidence} size={56} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => navigate('/architecture')} className="card p-2.5 flex items-center gap-2 hover:bg-surface-hover transition-colors text-left cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
              <GitBranch size={12} className="text-brand-primary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-medium text-text-primary">Architecture</p>
              <p className="text-2xs text-text-muted">{totalCat} layers</p>
            </div>
          </button>
          <button onClick={() => navigate('/performance')} className="card p-2.5 flex items-center gap-2 hover:bg-surface-hover transition-colors text-left cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-brand-secondary/10 flex items-center justify-center shrink-0">
              <Gauge size={12} className="text-brand-secondary" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-medium text-text-primary">Performance</p>
              <p className="text-2xs text-text-muted">Score analysis</p>
            </div>
          </button>
          <button onClick={() => navigate('/security')} className="card p-2.5 flex items-center gap-2 hover:bg-surface-hover transition-colors text-left cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Shield size={12} className="text-emerald-400" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-medium text-text-primary">Security</p>
              <p className="text-2xs text-text-muted">Header analysis</p>
            </div>
          </button>
          <button onClick={() => navigate('/technologies')} className="card p-2.5 flex items-center gap-2 hover:bg-surface-hover transition-colors text-left cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <Blocks size={12} className="text-amber-400" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-medium text-text-primary">Technologies</p>
              <p className="text-2xs text-text-muted">{currentResult.technologies.length} detected</p>
            </div>
          </button>
        </div>

        {categories.length > 0 && (
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                <Layers size={12} className="text-brand-accent" strokeWidth={1.5} />
                Category Breakdown
              </h3>
              <span className="text-2xs text-text-muted">{currentResult.technologies.length} techs</span>
            </div>
            <CategoryBar data={categories} />
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
              {categories.slice(0, 6).map((c) => (
                <div key={c.category} className="flex items-center gap-1 text-2xs text-text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span>{c.category}</span>
                  <span className="text-text-muted">({c.count})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentResult.technologies.length > 0 && (
          <div className="card">
            <h3 className="text-xs font-semibold text-text-primary mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-1.5">
              {currentResult.technologies.slice(0, 8).map((tech) => (
                <span
                  key={tech.id}
                  className="inline-flex items-center gap-1.5 px-2 py-1 bg-surface-hover rounded-md text-[10px] text-text-secondary"
                >
                  <TechLogo techId={tech.id} techName={tech.name} size={14} />
                  {tech.name}
                </span>
              ))}
              {currentResult.technologies.length > 8 && (
                <span className="inline-flex items-center px-2 py-1 bg-surface-hover rounded-md text-[10px] text-text-muted">
                  +{currentResult.technologies.length - 8}
                </span>
              )}
            </div>
          </div>
        )}

        {currentResult.technologies.length === 0 && (
          <div className="card text-center py-4">
            <p className="text-xs text-text-secondary">
              No technologies were detected on this page.
            </p>
          </div>
        )}

        <div className="text-2xs text-text-muted text-center">
          Scanned in {(currentResult.scanTime / 1000).toFixed(1)}s ·
          {currentResult.pageTitle && (
            <span className="ml-1 text-text-muted/60">{currentResult.pageTitle.split('').length > 40 ? currentResult.pageTitle.slice(0, 40) + '...' : currentResult.pageTitle}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container flex flex-col items-center justify-center text-center gap-4">
      <img
        src="/icons/StackLens.png"
        alt="StackLens"
        className="w-14 h-14 rounded-2xl"
      />
      <div>
        <h2 className="text-base font-semibold font-heading text-text-primary">
          Analyze a Website
        </h2>
        <p className="text-xs text-text-secondary mt-1 max-w-[240px]">
          Navigate to any website and click the StackLens icon to detect its
          technology stack.
        </p>
      </div>
      <button onClick={triggerScan} className="btn btn-primary text-xs">
        <RotateCcw size={12} />
        Scan Now
      </button>
      <div className="flex flex-col gap-1.5 text-left w-full max-w-[220px] mt-1">
        {['Go to a website', 'Click the StackLens icon', 'View its tech stack'].map(
          (step, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
              <span className="w-5 h-5 rounded-full bg-surface-card flex items-center justify-center text-2xs font-medium text-text-muted shrink-0">
                {i + 1}
              </span>
              {step}
              {i < 2 && <ArrowRight size={10} className="text-text-muted shrink-0" />}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
