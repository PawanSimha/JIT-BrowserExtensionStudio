import { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import type { LearningStep } from '@/types';

interface Props {
  steps: LearningStep[];
}

export default function LearningRoadmap({ steps }: Props) {
  const [openStep, setOpenStep] = useState<number>(0);

  if (!steps || steps.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-heading text-text-primary mb-2.5 flex items-center gap-1.5">
        <BookOpen size={12} style={{ color: 'var(--text-primary)' }} />
        Learning Roadmap
      </h3>
      <div className="space-y-1.5">
        {steps.map((step, i) => {
          const isOpen = openStep === i;
          return (
            <div key={i} className="card-primary p-2.5">
              <button
                onClick={() => setOpenStep(isOpen ? -1 : i)}
                className="w-full flex items-center gap-2 text-left"
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
                  <span className="text-[10px] font-bold font-heading" style={{ color: 'var(--text-primary)' }}>
                    {i + 1}
                  </span>
                </span>
                <span className="text-xs font-body font-medium text-text-primary flex-1">
                  {step.step}
                </span>
                {isOpen ? (
                  <ChevronDown size={12} className="text-text-muted shrink-0" />
                ) : (
                  <ChevronRight size={12} className="text-text-muted shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="mt-2 pl-7 flex flex-wrap gap-1.5">
                  {step.topics.map((topic, j) => (
                    <span key={j} className="badge text-[10px]" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-primary)' }}>{topic}</span>
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
