import { useNavigate } from 'react-router-dom';
import { useScanStore } from '@/stores/scanStore';
import TechLogo from '@/components/TechLogo';
import { Blocks, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

const displayGroups: { key: string; label: string; categories: string[] }[] = [
  { key: 'js-frameworks', label: 'JavaScript frameworks', categories: ['Frontend', 'Static Site Generator'] },
  { key: 'js-libraries', label: 'JavaScript libraries', categories: ['JavaScript Libraries'] },
  { key: 'css-frameworks', label: 'UI frameworks', categories: ['CSS Framework', 'UI Frameworks'] },
  { key: 'programming-languages', label: 'Programming languages', categories: ['Programming Language'] },
  { key: 'backend', label: 'Backend', categories: ['Backend'] },
  { key: 'databases', label: 'Databases', categories: ['Database'] },
  { key: 'paas', label: 'PaaS', categories: ['PaaS'] },
  { key: 'cdn-caching', label: 'CDN & caching', categories: ['CDN', 'Caching'] },
  { key: 'reverse-proxies', label: 'Reverse proxies', categories: ['Reverse Proxies'] },
  { key: 'hosting', label: 'Hosting', categories: ['Hosting'] },
  { key: 'email', label: 'Email', categories: ['Email'] },
  { key: 'ecommerce', label: 'E-commerce', categories: ['E-commerce'] },
  { key: 'security', label: 'Security', categories: ['Security', 'Authentication'] },
  { key: 'advertising', label: 'Advertising', categories: ['Advertising'] },
  { key: 'analytics', label: 'Analytics', categories: ['Analytics', 'Tag Manager', 'Marketing Automation'] },
  { key: 'rum-monitoring', label: 'RUM & monitoring', categories: ['RUM', 'Monitoring'] },
  { key: 'devops', label: 'DevOps', categories: ['DevOps'] },
  { key: 'video', label: 'Video players', categories: ['Video Players'] },
  { key: 'misc', label: 'Miscellaneous', categories: ['Miscellaneous', 'Fonts', 'Font Script', 'Map', 'Payments', 'AI SDK', 'Build Tool', 'CMS'] },
  { key: 'other', label: 'Other', categories: [] },
];

export default function Technologies() {
  const { currentResult } = useScanStore();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const detectedTechs = currentResult?.technologies || [];

  const groups = useMemo(() => {
    const matchedIds = new Set<string>();
    const result = displayGroups.map((g) => {
      if (g.key === 'other') {
        const techs = detectedTechs.filter((t) => !matchedIds.has(t.id));
        techs.forEach((t) => matchedIds.add(t.id));
        return { ...g, techs };
      }
      let techs = detectedTechs.filter((t) => g.categories.includes(t.category));
      const unique = new Set<string>();
      techs = techs.filter((t) => {
        if (unique.has(t.id)) return false;
        unique.add(t.id);
        matchedIds.add(t.id);
        return true;
      });
      return { ...g, techs };
    }).filter((g) => g.techs.length > 0);
    return result;
  }, [detectedTechs]);

  if (detectedTechs.length === 0) {
    return (
      <div className="page-container flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-surface-card flex items-center justify-center">
          <Blocks size={20} className="text-text-muted" strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-heading text-text-primary">No Technologies Detected</h2>
        <p className="text-xs text-text-secondary max-w-[220px] font-body">
          Analyze a website first to see its technology stack here.
        </p>
      </div>
    );
  }

  return (
    <div className="page-container flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <Blocks size={14} style={{ color: 'var(--text-primary)' }} strokeWidth={1.5} />
        <h2 className="text-sm font-heading text-text-primary">Technology Stack</h2>
        <span className="badge text-[9px] ml-auto" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-primary)' }}>{detectedTechs.length} technologies</span>
      </div>

      <div className="flex-1 overflow-y-auto scrollable space-y-1">
        {groups.map((group) => {
          const isExpanded = expanded[group.key] !== false;
          return (
            <div key={group.key} className="border border-surface-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded((p) => ({ ...p, [group.key]: !isExpanded }))}
                className="w-full flex items-center gap-2 px-3 py-2 transition-colors text-left"
                  style={{ background: isExpanded ? 'var(--surface-card)' : 'var(--surface-hover)' }}
              >
                {isExpanded ? (
                  <ChevronDown size={12} className="text-text-muted shrink-0" />
                ) : (
                  <ChevronRight size={12} className="text-text-muted shrink-0" />
                )}
                <span className="text-xs font-body font-semibold text-text-primary">{group.label}</span>
                <span className="badge text-[9px] ml-auto" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-primary)' }}>{group.techs.length}</span>
              </button>
              {isExpanded && (
                <div className="px-3 py-2 space-y-1" style={{ borderLeft: '2px solid', borderColor: 'var(--text-primary)', marginLeft: '1px' }}>
                  {group.techs.map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => navigate(`/technologies/${tech.id}`)}
                      className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-surface-hover transition-colors text-left cursor-pointer"
                    >
                      <TechLogo techId={tech.id} techName={tech.name} size={20} />
                      <span className="text-xs font-body font-medium text-text-primary">{tech.name}</span>
                      <div className="ml-auto flex items-center gap-2">
                        <div className="conf-bar w-12">
                          <div className="conf-bar-fill" style={{ width: `${tech.confidence}%` }} />
                        </div>
                        <span className="text-2xs text-text-muted font-code w-8 text-right">{Math.round(tech.confidence)}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
