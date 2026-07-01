interface GradeBadgeProps {
  grade: string;
}

const gradeColors: Record<string, string> = {
  A: 'bg-green-500/10 text-green-400 border-green-500/20',
  B: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  C: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  D: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  F: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function GradeBadge({ grade }: GradeBadgeProps) {
  return (
    <span className={`text-2xl font-bold font-heading px-3 py-1 rounded-xl border ${gradeColors[grade] || gradeColors.F}`}>
      {grade}
    </span>
  );
}
