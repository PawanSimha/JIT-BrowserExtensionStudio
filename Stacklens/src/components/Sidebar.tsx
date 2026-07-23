import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Blocks,
  GitBranch,
  Gauge,
  Shield,
  Clock,
  Palette,
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

const SIDEBAR_WIDTH = 44;

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (itemId: string, itemPath: string) =>
    itemId === 'dashboard'
      ? location.pathname === '/'
      : location.pathname.startsWith(itemPath);

  return (
    <nav
      className="shrink-0 border-r border-surface-border bg-surface-card/30 flex flex-col items-center gap-0.5 py-2 relative overflow-hidden"
      style={{ width: SIDEBAR_WIDTH }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.id, item.path);

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className="accent-rail relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-150 cursor-pointer"
            title={item.label}
            aria-label={item.label}
          >
            <Icon
              size={16}
              strokeWidth={active ? 2 : 1.5}
              className={active ? 'text-text-primary' : 'text-text-muted'}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 rounded-r-full transition-opacity duration-150 ${
                active ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ background: 'var(--text-primary)' }}
            />
          </button>
        );
      })}
    </nav>
  );
}
