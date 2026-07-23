import { useState } from 'react';
import { getSlug, getBrandColor, getLogoFallback } from '@/utils/logos';

interface Props {
  techId: string;
  techName: string;
  size?: number;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.split(/[\s/.-]+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function safeColor(hex: string): string {
  if (!hex || hex === '#000000') return '#888888';
  return hex;
}

export default function TechLogo({ techId, techName, size = 20, className = '' }: Props) {
  const [imgError, setImgError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const slug = getSlug(techId);
  const fallbackUrl = getLogoFallback(techId);
  const brandColor = safeColor(getBrandColor(techId));

  const url = !useFallback && slug ? `https://cdn.simpleicons.org/${slug}` : fallbackUrl;

  if (url && !imgError) {
    return (
      <div className={`shrink-0 flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <img
          src={url}
          alt={techName}
          className="w-full h-full object-contain"
          onError={() => {
            if (!useFallback && fallbackUrl) {
              setUseFallback(true);
            } else {
              setImgError(true);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`shrink-0 flex items-center justify-center rounded-md ${className}`}
      style={{ width: size, height: size, backgroundColor: brandColor + '20' }}
    >
      <span
        className="font-heading font-bold leading-none select-none"
        style={{ color: brandColor, fontSize: size * 0.42 }}
      >
        {getInitials(techName)}
      </span>
    </div>
  );
}
