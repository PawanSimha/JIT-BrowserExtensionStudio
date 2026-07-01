import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Blocks,
  GitBranch,
  Gauge,
  Shield,
  Clock,
  Palette,
  Menu,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { id: 'technologies', label: 'Technologies', path: '/technologies', icon: Blocks },
  { id: 'architecture', label: 'Architecture', path: '/architecture', icon: GitBranch },
  { id: 'performance', label: 'Performance', path: '/performance', icon: Gauge },
  { id: 'security', label: 'Security', path: '/security', icon: Shield },
  { id: 'uiux', label: 'UI/UX', path: '/ui-ux', icon: Palette },
  { id: 'history', label: 'History', path: '/history', icon: Clock },
] as const;

const COLLAPSED_WIDTH = 48;
const EXPANDED_WIDTH = 184;

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const isExpanded = hovered;
  const currentWidth = isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH;

  return (
    <nav
      className="shrink-0 border-r border-surface-border bg-surface-card/30 flex flex-col gap-0.5 p-2 relative overflow-hidden transition-all duration-200 ease-out"
      style={{ width: currentWidth }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-center h-8 mb-1">
        <Menu size={16} className="text-text-muted shrink-0" strokeWidth={1.5} />
      </div>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === 'dashboard'
          ? location.pathname === '/'
          : location.pathname.startsWith(item.path);

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-brand-primary/10 text-brand-primary'
                : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
            }`}
          >
            <Icon size={16} strokeWidth={1.5} className="shrink-0" />
            <span className="truncate text-xs transition-opacity duration-200" style={{ opacity: isExpanded ? 1 : 0 }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
