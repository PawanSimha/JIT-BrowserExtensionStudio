import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useScanStore } from '@/stores/scanStore';
import { getTechData } from '@/knowledge';
import type { TechData } from '@/types';
import LearningRoadmap from '@/components/LearningRoadmap';
import TechLogo from '@/components/TechLogo';
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  Calendar,
  Tag,
  Building2,
  Package,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ExternalLink as ExternalLinkIcon,
} from 'lucide-react';

export default function TechnologyDetail() {
  const { techId } = useParams();
  const navigate = useNavigate();
  const { currentResult } = useScanStore();
  const [knowledge, setKnowledge] = useState<TechData | undefined>(undefined);
  const [knowledgeLoading, setKnowledgeLoading] = useState(true);

  useEffect(() => {
    if (!techId) { setKnowledgeLoading(false); return; }
    setKnowledgeLoading(true);
    getTechData(techId).then((data) => {
      setKnowledge(data);
      setKnowledgeLoading(false);
    });
  }, [techId]);

  const tech = currentResult?.technologies.find((t) => t.id === techId);

  if (!tech) {
    return (
      <div className="page-container flex flex-col items-center justify-center text-center gap-3">
        <h2 className="text-base font-heading text-text-primary">Technology Not Found</h2>
        <p className="text-xs text-text-secondary font-body">
          No detection data available for this technology.
        </p>
        <button onClick={() => navigate('/technologies')} className="btn btn-ghost text-xs">
          Back to Technologies
        </button>
      </div>
    );
  }

  return (
    <div className="page-container flex flex-col gap-3">
      <button
        onClick={() => navigate('/technologies')}
        className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors w-fit font-body"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Technologies
      </button>

      <div className="card-primary">
        <div className="flex items-center gap-2.5 mb-2">
          <TechLogo techId={tech.id} techName={tech.name} size={28} className="rounded-lg" />
          <div>
            <h2 className="text-sm font-heading text-text-primary">{tech.name}</h2>
            <div className="flex items-center gap-2">
              <span className="badge text-[10px]" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-primary)' }}>{tech.category}</span>
              <span className="text-2xs text-text-muted flex items-center gap-1 font-code">
                <span className="w-1 h-1 rounded-full" style={{ background: 'var(--text-primary)' }} />
                {Math.round(tech.confidence)}% confidence
              </span>
            </div>
          </div>
        </div>

        {knowledge?.description && (
          <p className="text-xs text-text-secondary leading-relaxed mt-2 font-body">
            {knowledge.description}
          </p>
        )}
      </div>

      <div className="card-secondary">
        <h3 className="text-xs font-heading text-text-primary mb-2 flex items-center gap-1.5">
          <CheckCircle2 size={12} style={{ color: 'var(--text-primary)' }} />
          Detection Evidence
        </h3>
        <ul className="space-y-1.5">
          {tech.evidence.map((ev, i) => (
            <li key={i} className="flex items-start gap-2 text-2xs text-text-secondary font-code stagger-fade" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
                <span className="text-[8px]" style={{ color: 'var(--text-primary)' }}>✓</span>
              </span>
              <span>{ev}</span>
            </li>
          ))}
        </ul>
      </div>

      {knowledgeLoading && (
        <div className="card-primary text-center py-4">
          <div className="w-5 h-5 border-2 border-text-primary border-t-transparent rounded-full animate-spin mx-auto opacity-30" />
        </div>
      )}
      {!knowledgeLoading && knowledge && (
        <>
          <div className="card-primary">
            <h3 className="text-xs font-heading text-text-primary mb-2.5 flex items-center gap-1.5">
              <Tag size={12} style={{ color: 'var(--text-secondary)' }} />
              Overview
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-start gap-2">
                <Building2 size={12} className="text-text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-2xs text-text-muted font-code">Developer</p>
                  <p className="text-xs text-text-primary font-body">{knowledge.developer}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar size={12} className="text-text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-2xs text-text-muted font-code">Release Year</p>
                  <p className="text-xs text-text-primary font-body">{knowledge.releaseYear}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Package size={12} className="text-text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-2xs text-text-muted font-code">Latest Version</p>
                  <p className="text-xs font-code text-text-primary">{knowledge.latestVersion}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Tag size={12} className="text-text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-2xs text-text-muted font-code">Difficulty</p>
                  <span className={`badge text-[10px] font-body ${
                    knowledge.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400' :
                    knowledge.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {knowledge.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="card-primary">
              <h3 className="text-xs font-heading text-text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-green-400" />
                Advantages
              </h3>
              <ul className="space-y-1">
                {knowledge.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-2xs text-text-secondary font-body">
                    <span className="text-green-400 shrink-0 mt-0.5">•</span>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-primary">
              <h3 className="text-xs font-heading text-text-primary mb-2 flex items-center gap-1.5">
                <XCircle size={12} className="text-red-400" />
                Disadvantages
              </h3>
              <ul className="space-y-1">
                {knowledge.disadvantages.map((dis, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-2xs text-text-secondary font-body">
                    <span className="text-red-400 shrink-0 mt-0.5">•</span>
                    {dis}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {knowledge.alternatives.length > 0 && (
            <div className="card-secondary">
              <h3 className="text-xs font-heading text-text-primary mb-2 flex items-center gap-1.5">
                <ArrowRight size={12} style={{ color: 'var(--text-secondary)' }} />
                Alternatives
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {knowledge.alternatives.map((alt, i) => (
                  <span key={i} className="badge text-[10px]" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-primary)' }}>{alt}</span>
                ))}
              </div>
            </div>
          )}

          {knowledge.learningRoadmap && (
            <LearningRoadmap steps={knowledge.learningRoadmap} />
          )}

          {knowledge.commonUseCases.length > 0 && (
            <div className="card-primary">
              <h3 className="text-xs font-heading text-text-primary mb-2">Common Use Cases</h3>
              <div className="flex flex-wrap gap-1.5">
                {knowledge.commonUseCases.map((uc, i) => (
                  <span key={i} className="badge text-[10px]" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-primary)' }}>{uc}</span>
                ))}
              </div>
            </div>
          )}

          <div className="card-primary">
            <h3 className="text-xs font-heading text-text-primary mb-2 flex items-center gap-1.5">
              <ExternalLinkIcon size={12} style={{ color: 'var(--text-primary)' }} />
              Resources
            </h3>
            <div className="space-y-1.5">
              <a
                href={knowledge.officialDocs}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-body transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                <ExternalLink size={12} />
                Official Documentation
              </a>
              {knowledge.github && knowledge.github !== 'https://github.com/' && (
                <a
                  href={knowledge.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors font-body"
                >
                  <GitBranch size={12} />
                  GitHub Repository
                </a>
              )}
            </div>
          </div>
        </>
      )}

      {!knowledgeLoading && !knowledge && (
        <div className="card-primary text-center py-4">
          <p className="text-xs text-text-secondary font-body">
            Knowledge base entry for {tech.name} coming soon.
          </p>
        </div>
      )}
    </div>
  );
}
