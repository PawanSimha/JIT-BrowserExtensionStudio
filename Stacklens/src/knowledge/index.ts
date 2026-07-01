import type { TechData } from '@/types';

type RawModule = { default: TechData };

const lazyModules = import.meta.glob<RawModule>('./data/*.json');
const cache = new Map<string, TechData>();

export async function getTechData(id: string): Promise<TechData | undefined> {
  const cached = cache.get(id);
  if (cached) return cached;

  const path = `./data/${id}.json`;
  const loader = lazyModules[path];
  if (!loader) return undefined;

  try {
    const mod = await loader();
    if (mod?.default?.id) {
      cache.set(mod.default.id, mod.default);
      return mod.default;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

async function ensureAllLoaded(): Promise<void> {
  const paths = Object.keys(lazyModules);
  await Promise.all(
    paths.map(async (path) => {
      const id = path.replace('./data/', '').replace('.json', '');
      if (cache.has(id)) return;
      try {
        const mod = await lazyModules[path]();
        if (mod?.default?.id) {
          cache.set(mod.default.id, mod.default);
        }
      } catch {
        // skip invalid
      }
    }),
  );
}

export async function getAllTechData(): Promise<TechData[]> {
  await ensureAllLoaded();
  return [...cache.values()];
}

export async function searchTechData(query: string): Promise<TechData[]> {
  const q = query.toLowerCase();
  const all = await getAllTechData();
  return all.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.developer.toLowerCase().includes(q),
  );
}

export async function getTechByCategory(): Promise<Map<string, TechData[]>> {
  const map = new Map<string, TechData[]>();
  for (const tech of await getAllTechData()) {
    const cat = tech.category;
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(tech);
  }
  return map;
}
