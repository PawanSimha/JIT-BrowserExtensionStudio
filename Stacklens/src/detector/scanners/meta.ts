export function scanMetaTags(): Record<string, string> {
  const tags: Record<string, string> = {};
  const metas = document.querySelectorAll('meta');

  for (const meta of metas) {
    const name = meta.getAttribute('name') || meta.getAttribute('property') || meta.getAttribute('http-equiv');
    const content = meta.getAttribute('content');
    if (name && content) {
      tags[name.toLowerCase()] = content;
    }
  }

  return tags;
}
