import { useScanStore } from '@/stores/scanStore';
import { useNavigate } from 'react-router-dom';
import { getCategoryBreakdown } from '@/utils/analysis';
import TechLogo from '@/components/TechLogo';
import { ArrowRight, RotateCcw, Blocks, GitBranch, Gauge, Shield, Layers } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function ConfidenceRing({ value, size = 64 }: { value: number; size?: number }) {
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (value / 100) * circumference;
  const [offset, setOffset] = useState(circumference);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setOffset(targetOffset), 200);
    return () => clearTimeout(timer);
  }, [targetOffset]);

  const color = value >= 75 ? 'var(--text-primary)' : value >= 50 ? 'var(--text-secondary)' : 'var(--text-muted)';

  return (
    <svg width={size} height={size} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--surface-border)" strokeWidth={stroke} />
      <circle
        ref={ringRef}
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
        className="transition-all duration-1000 ease-out"
      />
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central" fill="currentColor" className="text-xs font-bold font-heading" fontSize="11" style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}>
        {Math.round(value)}%
      </text>
    </svg>
  );
}

function CategoryBar({ data }: { data: { category: string; count: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.count, 0);
  if (total === 0) return null;

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-2 rounded-full overflow-hidden bg-surface-border/30">
      {data.map((d, i) => (
        <div
          key={d.category}
          className="first:rounded-l-full last:rounded-r-full transition-all duration-700 ease-out"
          style={{
            width: visible ? `${(d.count / total) * 100}%` : '0%',
            backgroundColor: d.color,
            transitionDelay: `${i * 80}ms`,
          }}
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
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full scan-pulse" style={{ background: 'var(--accent)' }} />
          <div className="relative w-12 h-12 rounded-full bg-surface-card flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-text-primary border-t-transparent rounded-full animate-spin opacity-30" />
          </div>
        </div>
        <h2 className="text-base font-heading text-text-primary">Analyzing Website</h2>
        <p className="text-xs text-text-secondary font-body">Scanning page content, scripts, and headers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
          <span className="text-lg" style={{ color: '#EF4444' }}>!</span>
        </div>
        <h2 className="text-base font-heading text-text-primary">Scan Failed</h2>
        <p className="text-xs text-text-secondary max-w-[260px] font-body">{error}</p>
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
        <div className="flex items-center gap-2 stagger-1 animate-fade-in">
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--text-primary)' }} />
          <span className="text-2xs text-text-muted font-medium uppercase tracking-wider font-code">Analysis Complete</span>
        </div>

        <div className="card-primary flex items-center gap-3 stagger-2 animate-fade-in">
          {!faviconError ? (
            <img
              src={currentResult.favicon || `https://www.google.com/s2/favicons?domain=${currentResult.hostname}&sz=32`}
              alt=""
              className="w-8 h-8 rounded-lg shrink-0"
              onError={() => setFaviconError(true)}
            />
          ) : (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
              <span className="text-sm font-heading" style={{ color: 'var(--text-primary)' }}>
                {currentResult.hostname.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-body font-medium text-text-primary truncate">
              {currentResult.hostname}
            </p>
            <p className="text-2xs text-text-muted truncate font-code">
              {currentResult.technologies.length} technologies in {totalCat} categories
            </p>
          </div>
          <ConfidenceRing value={currentResult.overallConfidence} size={56} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Architecture', sub: `${totalCat} layers`, icon: GitBranch, path: '/architecture', color: 'var(--text-primary)' },
            { label: 'Performance', sub: 'Score analysis', icon: Gauge, path: '/performance', color: 'var(--text-secondary)' },
            { label: 'Security', sub: 'Header analysis', icon: Shield, path: '/security', color: 'var(--text-muted)' },
            { label: 'Technologies', sub: `${currentResult.technologies.length} detected`, icon: Blocks, path: '/technologies', color: 'var(--text-secondary)' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`card-subtle flex items-center gap-2 p-2.5 text-left cursor-pointer stagger-${i + 3} animate-slide-up hover:bg-surface-hover transition-colors`}
                style={{ borderColor: 'transparent' }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 card-icon-bounce"
                  style={{ background: `${item.color}15` }}
                >
                  <Icon size={12} style={{ color: item.color }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-body font-medium text-text-primary">{item.label}</p>
                  <p className="text-2xs text-text-muted font-code">{item.sub}</p>
                </div>
              </button>
            );
          })}
        </div>

        {categories.length > 0 && (
          <div className="card-primary stagger-6 animate-slide-up">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-heading text-text-primary flex items-center gap-1.5">
                <Layers size={12} style={{ color: 'var(--text-primary)' }} strokeWidth={1.5} />
                Category Breakdown
              </h3>
              <span className="text-2xs text-text-muted font-code">{currentResult.technologies.length} techs</span>
            </div>
            <CategoryBar data={categories} />
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
              {categories.slice(0, 6).map((c) => (
                <div key={c.category} className="flex items-center gap-1 text-2xs text-text-secondary font-code">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span>{c.category}</span>
                  <span className="text-text-muted">({c.count})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentResult.technologies.length > 0 && (
          <div className="card-primary stagger-7 animate-slide-up">
            <h3 className="text-xs font-heading text-text-primary mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-1.5">
              {currentResult.technologies.slice(0, 10).map((tech) => (
                <span
                  key={tech.id}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] text-text-secondary font-body transition-all duration-150"
                  style={{ background: 'var(--surface-hover)' }}
                >
                  <TechLogo techId={tech.id} techName={tech.name} size={14} />
                  {tech.name}
                </span>
              ))}
              {currentResult.technologies.length > 10 && (
                <button
                  onClick={() => navigate('/technologies')}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-body transition-all duration-150 cursor-pointer"
                  style={{ background: 'var(--surface-hover)', color: 'var(--text-primary)' }}
                >
                  +{currentResult.technologies.length - 10}
                </button>
              )}
            </div>
          </div>
        )}

        {currentResult.technologies.length === 0 && (
          <div className="card-secondary text-center py-4 stagger-7 animate-slide-up">
            <p className="text-xs text-text-secondary font-body">
              No technologies were detected on this page.
            </p>
          </div>
        )}

        <div className="text-2xs text-text-muted text-center font-code stagger-8 animate-fade-in">
          Scanned in {(currentResult.scanTime / 1000).toFixed(1)}s
          {currentResult.pageTitle && (
            <span className="ml-1 opacity-60">
              &middot; {currentResult.pageTitle.length > 40 ? currentResult.pageTitle.slice(0, 40) + '...' : currentResult.pageTitle}
            </span>
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
        className="w-14 h-14 rounded-2xl logo-breath"
      />
      <div>
        <h2 className="text-base font-heading text-text-primary">Analyze a Website</h2>
        <p className="text-xs text-text-secondary mt-1 max-w-[240px] font-body">
          Navigate to any website and click the StackLens icon to detect its technology stack.
        </p>
      </div>
      <button onClick={triggerScan} className="btn btn-primary text-xs">
        <RotateCcw size={12} />
        Scan Now
      </button>
      <div className="flex flex-col gap-1.5 text-left w-full max-w-[220px] mt-1">
        {['Go to a website', 'Click the StackLens icon', 'View its tech stack'].map(
          (step, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-text-secondary font-body">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-2xs font-medium text-text-muted shrink-0 font-code"
                style={{ background: 'var(--surface-card)' }}
              >
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
