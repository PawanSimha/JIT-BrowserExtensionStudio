import { useScanStore } from '@/stores/scanStore';
import { buildLayers } from '@/utils/analysis';
import { GitBranch, Layers, Zap, Server, Globe, Shield, BarChart3, CreditCard, Cpu, Package, ShoppingCart, Mail, Activity, Monitor } from 'lucide-react';

const layerIcons: Record<string, typeof Layers> = {
  Frontend: Zap,
  'Build Tools': Package,
  Backend: Server,
  'Hosting & CDN': Globe,
  Security: Shield,
  Analytics: BarChart3,
  'RUM & Monitoring': Activity,
  Marketing: BarChart3,
  Advertising: BarChart3,
  'E-commerce': ShoppingCart,
  Payments: CreditCard,
  Email: Mail,
  'AI & SDKs': Cpu,
  'JavaScript Libraries': Package,
  PaaS: Globe,
  DevOps: Monitor,
  Fonts: Zap,
  'Video Players': Monitor,
};

export default function Architecture() {
  const { currentResult } = useScanStore();

  if (!currentResult) {
    return (
      <div className="page-container flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-surface-card flex items-center justify-center">
          <GitBranch size={20} className="text-text-muted" strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-semibold font-heading text-text-primary">Architecture</h2>
        <p className="text-xs text-text-secondary max-w-[220px]">
          Analyze a website first to see its architecture diagram.
        </p>
      </div>
    );
  }

  const layers = buildLayers(currentResult);

  if (layers.length === 0) {
    return (
      <div className="page-container flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-surface-card flex items-center justify-center">
          <GitBranch size={20} className="text-text-muted" strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-semibold font-heading text-text-primary">Architecture</h2>
        <p className="text-xs text-text-secondary max-w-[220px]">
          No architecture data available for this page.
        </p>
      </div>
    );
  }

  return (
    <div className="page-container flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <GitBranch size={14} className="text-brand-primary" strokeWidth={1.5} />
        <h2 className="text-sm font-semibold font-heading text-text-primary">
          {currentResult.hostname}
        </h2>
      </div>

      {layers.length === 1 && layers[0].technologies.length <= 3 ? (
        <div className="flex flex-col gap-3">
          {layers.map((layer, i) => {
            const Icon = layerIcons[layer.name] || Layers;
            return (
              <div key={i} className="card">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} className="text-text-secondary" strokeWidth={1.5} />
                  <h3 className="text-xs font-semibold text-text-primary">{layer.name}</h3>
                  <span className="text-2xs text-text-muted">({layer.technologies.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {layer.technologies.map((t, j) => (
                    <div key={j} className="flex items-center gap-1.5 bg-surface-card border border-surface-border rounded-lg px-2.5 py-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                      <span className="text-xs text-text-primary">{t.name}</span>
                      <span className="text-2xs text-text-muted font-code">{t.confidence}%</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {layers.map((layer, i) => {
            const Icon = layerIcons[layer.name] || Layers;
            return (
              <div key={i} className="relative">
                <div className="card p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={13} className="text-text-secondary" strokeWidth={1.5} />
                    <h3 className="text-xs font-semibold text-text-primary">{layer.name}</h3>
                    <span className="text-2xs text-text-muted font-code">({layer.technologies.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {layer.technologies.map((t, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-1.5 bg-surface-hover rounded-md px-2 py-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                        <span className="text-xs text-text-primary">{t.name}</span>
                        <span className="text-2xs text-text-muted font-code ml-0.5">{t.confidence}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                {i < layers.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="w-px h-3 bg-surface-border" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="card p-3">
        <h3 className="text-xs font-semibold text-text-primary mb-2 flex items-center gap-1.5">
          <Layers size={12} className="text-brand-accent" strokeWidth={1.5} />
          Stack Overview
        </h3>
        <div className="grid grid-cols-2 gap-2 text-2xs text-text-secondary">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/40" />
            <span>{layers.length} architecture layers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40" />
            <span>{currentResult.technologies.length} total technologies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
