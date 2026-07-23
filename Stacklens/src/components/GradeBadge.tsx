interface GradeBadgeProps {
  grade: string;
}

const gradeScores: Record<string, number> = {
  A: 90,
  B: 70,
  C: 50,
  D: 30,
  F: 10,
};

const gradeColors: Record<string, { text: string; bg: string; ring: string }> = {
  A: { text: '#F5F5F5', bg: 'rgba(255, 255, 255, 0.08)', ring: '#F5F5F5' },
  B: { text: '#B0B0B0', bg: 'rgba(176, 176, 176, 0.08)', ring: '#B0B0B0' },
  C: { text: '#888888', bg: 'rgba(136, 136, 136, 0.08)', ring: '#888888' },
  D: { text: '#F97316', bg: 'rgba(249, 115, 22, 0.1)', ring: '#F97316' },
  F: { text: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', ring: '#EF4444' },
};

export default function GradeBadge({ grade }: GradeBadgeProps) {
  const score = gradeScores[grade] || 10;
  const colors = gradeColors[grade] || gradeColors.F;
  const stroke = 3;
  const size = 52;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="shrink-0 relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--surface-border)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.ring}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-all duration-700"
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill={colors.text}
          fontSize="18"
          fontFamily="'Poppins', system-ui, sans-serif"
          fontWeight="bold"
          className="grade-pop"
        >
          {grade}
        </text>
      </svg>
    </div>
  );
}
