import { useState, useEffect, useCallback } from 'react';
import { useScanStore } from '@/stores/scanStore';
import { Clock, Trash2, Star, RotateCcw, Search, CheckSquare, Square as SquareIcon } from 'lucide-react';

const HISTORY_KEY = 'stacklens_history';

interface HistoryItem {
  id: string;
  url: string;
  hostname: string;
  techCount: number;
  categories: string[];
  overallConfidence: number;
  timestamp: number;
  isFavorite: boolean;
}

function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveHistory(items: HistoryItem[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
  } catch {
    /* storage full */
  }
}

export default function History() {
  const { currentResult, triggerScan } = useScanStore();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    setItems(loadHistory());
  }, []);

  const persist = useCallback((updated: HistoryItem[]) => {
    setItems(updated);
    saveHistory(updated);
  }, []);

  useEffect(() => {
    if (currentResult && !items.some((i) => i.url === currentResult.url && i.timestamp === currentResult.timestamp)) {
      const cats = [...new Set(currentResult.technologies.map((t) => t.category))];
      const url = currentResult.url.split('?')[0];
      const newItem: HistoryItem = {
        id: `${currentResult.hostname}_${currentResult.timestamp}`,
        url,
        hostname: currentResult.hostname,
        techCount: currentResult.technologies.length,
        categories: cats,
        overallConfidence: currentResult.overallConfidence,
        timestamp: currentResult.timestamp,
        isFavorite: false,
      };
      const updated = [newItem, ...items].slice(0, 50);
      persist(updated);
    }
  }, [currentResult]);

  const clearAll = () => {
    if (window.confirm('Clear all scan history?')) {
      persist([]);
      setSelected(new Set());
    }
  };

  const removeItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    persist(updated);
    setSelected((prev) => { const next = new Set(prev); next.delete(id); return next; });
  };

  const deleteSelected = () => {
    const updated = items.filter((i) => !selected.has(i.id));
    persist(updated);
    setSelected(new Set());
  };

  const toggleFav = (id: string) => {
    persist(items.map((i) => (i.id === id ? { ...i, isFavorite: !i.isFavorite } : i)));
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === sorted.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(sorted.map((i) => i.id)));
    }
  };

  const openScan = async (item: HistoryItem) => {
    try {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const tab = tabs[0];
      if (tab?.id && tab.url) {
        await chrome.tabs.update(tab.id, { url: item.url });
        setTimeout(() => triggerScan(), 500);
      }
    } catch {
      /* ignore */
    }
  };

  const filtered = search
    ? items.filter(
        (i) =>
          i.hostname.toLowerCase().includes(search.toLowerCase()) ||
          i.url.toLowerCase().includes(search.toLowerCase()),
      )
    : items;

  const sorted = [...filtered].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return b.timestamp - a.timestamp;
  });

  if (items.length === 0) {
    return (
      <div className="page-container flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-surface-card flex items-center justify-center">
          <Clock size={20} className="text-text-muted" strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-heading text-text-primary">No History Yet</h2>
        <p className="text-xs text-text-secondary max-w-[220px] font-body">
          Scan results will appear here automatically after each analysis.
        </p>
        <button onClick={triggerScan} className="btn btn-primary text-xs">
          <RotateCcw size={12} />
          Scan Now
        </button>
      </div>
    );
  }

  const hasSelected = selected.size > 0;

  return (
    <div className="page-container flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={14} style={{ color: 'var(--text-primary)' }} strokeWidth={1.5} />
          <h2 className="text-sm font-heading text-text-primary">History</h2>
          <span className="text-2xs text-text-muted font-code">({items.length})</span>
        </div>
        <div className="flex items-center gap-2">
          {hasSelected && (
            <button
              onClick={deleteSelected}
              className="flex items-center gap-1 text-2xs font-code transition-colors"
              style={{ color: '#EF4444' }}
            >
              <Trash2 size={10} />
              Delete ({selected.size})
            </button>
          )}
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-2xs text-text-muted hover:opacity-70 transition-opacity font-code"
          >
            <Trash2 size={10} />
            Clear
          </button>
        </div>
      </div>

      <div className="relative">
        <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={1.5} />
        <input
          type="text"
          placeholder="Search history..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg pl-7 pr-2.5 py-1.5 text-xs text-text-primary placeholder:text-text-muted outline-none transition-all font-body"
          style={{ background: 'var(--surface-card)', borderColor: 'var(--surface-border)' }}
        />
      </div>

      <div className="flex items-center gap-2 text-2xs text-text-muted font-code px-1">
        <button
          onClick={toggleSelectAll}
          className="flex items-center gap-1 hover:text-text-secondary transition-colors"
        >
          {selected.size === sorted.length && sorted.length > 0 ? (
            <CheckSquare size={10} style={{ color: 'var(--text-primary)' }} />
          ) : (
            <SquareIcon size={10} />
          )}
          Select all
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 scrollable">
        {sorted.length === 0 && (
          <div className="card-primary text-center py-4">
            <p className="text-xs text-text-secondary font-body">No matching results.</p>
          </div>
        )}
        {sorted.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border p-2.5 transition-colors cursor-pointer"
            style={{ background: selected.has(item.id) ? 'rgba(255, 255, 255, 0.04)' : 'var(--surface-card)', borderColor: selected.has(item.id) ? 'rgba(255, 255, 255, 0.15)' : 'var(--surface-border)' }}
          >
            <div className="flex items-start gap-2.5">
              <button
                onClick={(e) => { e.stopPropagation(); toggleSelect(item.id); }}
                className="shrink-0 mt-1"
              >
                {selected.has(item.id) ? (
                  <CheckSquare size={12} style={{ color: 'var(--text-primary)' }} />
                ) : (
                  <SquareIcon size={12} className="text-text-muted" />
                )}
              </button>
              <div
                className="min-w-0 flex-1"
                onClick={() => openScan(item)}
              >
                <p className="text-xs font-body font-medium text-text-primary truncate">{item.hostname}</p>
                <p className="text-2xs text-text-muted truncate font-code">{item.url}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xs text-text-secondary font-code">{item.techCount} techs</span>
                  <span className="text-2xs text-text-muted">·</span>
                  <span className="text-2xs font-code" style={{ color: 'var(--text-primary)' }}>{Math.round(item.overallConfidence)}%</span>
                  <span className="text-2xs text-text-muted">·</span>
                  <span className="text-2xs text-text-muted font-code">
                    {new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {item.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.categories.slice(0, 3).map((cat) => (
                      <span key={cat} className="badge text-[8px] px-1" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-primary)' }}>{cat}</span>
                    ))}
                    {item.categories.length > 3 && (
                      <span className="badge text-[8px] px-1" style={{ background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-primary)' }}>+{item.categories.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFav(item.id); }}
                  className={`p-1 rounded transition-colors ${item.isFavorite ? 'text-yellow-400' : 'text-text-muted hover:text-yellow-400'}`}
                  title={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Star size={10} fill={item.isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                  className="p-1 rounded text-text-muted hover:opacity-70 transition-opacity"
                  title="Remove from history"
                >
                  <Trash2 size={10} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
