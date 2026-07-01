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
        <h2 className="text-base font-semibold font-heading text-text-primary">
          Technology Not Found
        </h2>
        <p className="text-xs text-text-secondary">
          No detection data available for this technology.
        </p>
        <button
          onClick={() => navigate('/technologies')}
          className="btn btn-ghost text-xs"
        >
          Back to Technologies
        </button>
      </div>
    );
  }

  return (
    <div className="page-container flex flex-col gap-3">
      <button
        onClick={() => navigate('/technologies')}
        className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors w-fit"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Technologies
      </button>

      {/* Header Card */}
      <div className="card">
        <div className="flex items-center gap-2.5 mb-2">
          <TechLogo techId={tech.id} techName={tech.name} size={28} className="rounded-lg" />
          <div>
            <h2 className="text-sm font-semibold font-heading text-text-primary">
              {tech.name}
            </h2>
            <div className="flex items-center gap-2">
              <span className="badge bg-surface-hover text-text-muted text-[10px]">
                {tech.category}
              </span>
              <span className="text-2xs text-text-muted flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-brand-accent" />
                {Math.round(tech.confidence)}% confidence
              </span>
            </div>
          </div>
        </div>

        {knowledge?.description && (
          <p className="text-xs text-text-secondary leading-relaxed mt-2">
            {knowledge.description}
          </p>
        )}
      </div>

      {/* Detection Evidence */}
      <div className="card">
        <h3 className="text-xs font-semibold text-text-primary mb-2 flex items-center gap-1.5">
          <CheckCircle2 size={12} className="text-brand-accent" />
          Detection Evidence
        </h3>
        <ul className="space-y-1.5">
          {tech.evidence.map((ev, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-2xs text-text-secondary"
            >
              <span className="w-4 h-4 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[8px] text-brand-accent">✓</span>
              </span>
              <span className="font-code">{ev}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Knowledge Base Sections */}
      {knowledgeLoading && (
        <div className="card text-center py-4">
          <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      )}
      {!knowledgeLoading && knowledge && (
        <>
          {/* Overview */}
          <div className="card">
            <h3 className="text-xs font-semibold text-text-primary mb-2.5 flex items-center gap-1.5">
              <Tag size={12} className="text-brand-secondary" />
              Overview
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-start gap-2">
                <Building2 size={12} className="text-text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-2xs text-text-muted">Developer</p>
                  <p className="text-xs text-text-primary">{knowledge.developer}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar size={12} className="text-text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-2xs text-text-muted">Release Year</p>
                  <p className="text-xs text-text-primary">{knowledge.releaseYear}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Package size={12} className="text-text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-2xs text-text-muted">Latest Version</p>
                  <p className="text-xs font-code text-text-primary">{knowledge.latestVersion}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Tag size={12} className="text-text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-2xs text-text-muted">Difficulty</p>
                  <span className={`badge text-[10px] ${
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

          {/* Advantages & Disadvantages */}
          <div className="grid grid-cols-2 gap-2">
            <div className="card">
              <h3 className="text-xs font-semibold text-text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-green-400" />
                Advantages
              </h3>
              <ul className="space-y-1">
                {knowledge.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-2xs text-text-secondary">
                    <span className="text-green-400 shrink-0 mt-0.5">•</span>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="text-xs font-semibold text-text-primary mb-2 flex items-center gap-1.5">
                <XCircle size={12} className="text-red-400" />
                Disadvantages
              </h3>
              <ul className="space-y-1">
                {knowledge.disadvantages.map((dis, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-2xs text-text-secondary">
                    <span className="text-red-400 shrink-0 mt-0.5">•</span>
                    {dis}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Alternatives */}
          {knowledge.alternatives.length > 0 && (
            <div className="card">
              <h3 className="text-xs font-semibold text-text-primary mb-2 flex items-center gap-1.5">
                <ArrowRight size={12} className="text-brand-secondary" />
                Alternatives
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {knowledge.alternatives.map((alt, i) => (
                  <span
                    key={i}
                    className="badge bg-brand-primary/5 text-text-secondary text-[10px]"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Learning Roadmap */}
          {knowledge.learningRoadmap && (
            <LearningRoadmap steps={knowledge.learningRoadmap} />
          )}

          {/* Common Use Cases */}
          {knowledge.commonUseCases.length > 0 && (
            <div className="card">
              <h3 className="text-xs font-semibold text-text-primary mb-2">Common Use Cases</h3>
              <div className="flex flex-wrap gap-1.5">
                {knowledge.commonUseCases.map((uc, i) => (
                  <span key={i} className="badge bg-surface-hover text-text-secondary text-[10px]">
                    {uc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="card">
            <h3 className="text-xs font-semibold text-text-primary mb-2 flex items-center gap-1.5">
              <ExternalLinkIcon size={12} className="text-brand-primary" />
              Resources
            </h3>
            <div className="space-y-1.5">
              <a
                href={knowledge.officialDocs}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-brand-primary hover:text-brand-primary/80 transition-colors"
              >
                <ExternalLink size={12} />
                Official Documentation
              </a>
              {knowledge.github && knowledge.github !== 'https://github.com/' && (
                <a
                  href={knowledge.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
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
        <div className="card text-center py-4">
          <p className="text-xs text-text-secondary">
            Knowledge base entry for {tech.name} coming soon.
          </p>
        </div>
      )}
    </div>
  );
}
