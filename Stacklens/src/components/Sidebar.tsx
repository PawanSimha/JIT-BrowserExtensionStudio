import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
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
  const navRef = useRef<HTMLDivElement>(null);
  const [railStyle, setRailStyle] = useState({ top: 0, height: 0 });

  const activeIdx = (() => {
    const idx = navItems.findIndex((item) =>
      item.id === 'dashboard'
        ? location.pathname === '/'
        : location.pathname.startsWith(item.path),
    );
    return idx >= 0 ? idx : 0;
  })();

  useEffect(() => {
    if (!navRef.current) return;
    const buttons = navRef.current.querySelectorAll<HTMLElement>('button');
    const btn = buttons[activeIdx];
    if (btn) {
      const nav = navRef.current;
      const nRect = nav.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      setRailStyle({ top: bRect.top - nRect.top, height: bRect.height });
    }
  }, [activeIdx]);

  return (
    <nav
      ref={navRef}
      className="shrink-0 border-r border-surface-border bg-surface-card/30 flex flex-col items-center gap-0.5 py-2 relative overflow-hidden"
      style={{ width: SIDEBAR_WIDTH }}
    >
      <div
        className="absolute left-0 w-[2px] rounded-r-full transition-all duration-200 ease-in-out"
        style={{
          top: railStyle.top,
          height: railStyle.height,
          background: 'var(--accent)',
        }}
      />
      {navItems.map((item, i) => {
        const Icon = item.icon;
        const active = i === activeIdx;

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className="group relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-150 cursor-pointer z-10"
            aria-label={item.label}
          >
            <Icon
              size={16}
              strokeWidth={active ? 2 : 1.5}
              style={{ color: active ? 'var(--accent)' : 'var(--text-muted)' }}
            />
            <span
              className="sidebar-tooltip absolute left-full ml-2 px-1.5 py-0.5 rounded text-[9px] font-code whitespace-nowrap z-20"
              style={{ background: 'var(--surface-card)', color: 'var(--text-primary)', border: '1px solid var(--surface-border)' }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
