import type { ScanResult } from '@/types';

const HISTORY_KEY = 'stacklens_history';
const MAX_ITEMS = 50;

export interface HistoryItem {
  id: string;
  url: string;
  hostname: string;
  techCount: number;
  categories: string[];
  overallConfidence: number;
  timestamp: number;
  isFavorite: boolean;
}

export async function loadHistory(): Promise<HistoryItem[]> {
  try {
    const data = await chrome.storage.local.get(HISTORY_KEY);
    return (data[HISTORY_KEY] as HistoryItem[]) || [];
  } catch {
    return [];
  }
}

export async function saveHistory(items: HistoryItem[]): Promise<void> {
  try {
    await chrome.storage.local.set({ [HISTORY_KEY]: items });
  } catch {
    /* storage full */
  }
}

export function scanResultToHistoryItem(result: ScanResult): HistoryItem {
  const categories = [...new Set(result.technologies.map((t) => t.category))];
  const url = result.url.split('?')[0];
  return {
    id: `${result.hostname}_${result.timestamp}`,
    url,
    hostname: result.hostname,
    techCount: result.technologies.length,
    categories,
    overallConfidence: result.overallConfidence,
    timestamp: result.timestamp,
    isFavorite: false,
  };
}

export async function addToHistory(result: ScanResult): Promise<void> {
  const items = await loadHistory();
  const exists = items.some(
    (i) => i.url === result.url && i.timestamp === result.timestamp,
  );
  if (exists) return;
  const newItem = scanResultToHistoryItem(result);
  const updated = [newItem, ...items].slice(0, MAX_ITEMS);
  await saveHistory(updated);
}
