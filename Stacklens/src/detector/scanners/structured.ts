export function scanStructuredData(): Record<string, string> {
  const data: Record<string, string> = {};

  const jsonld = document.querySelector('script[type="application/ld+json"]');
  if (jsonld?.textContent) {
    data['json-ld'] = jsonld.textContent.slice(0, 500);
    try {
      const parsed = JSON.parse(jsonld.textContent);
      if (parsed['@type']) {
        data['json-ld-type'] = parsed['@type'];
      }
      if (parsed['@context']) {
        data['json-ld-context'] = parsed['@context'];
      }
    } catch {
      // invalid JSON
    }
  }

  const rss = document.querySelector('link[type="application/rss+xml"]');
  if (rss) {
    data['rss'] = rss.getAttribute('href') || 'present';
  }

  const atom = document.querySelector('link[type="application/atom+xml"]');
  if (atom) {
    data['atom'] = atom.getAttribute('href') || 'present';
  }

  const manifest = document.querySelector('link[rel="manifest"]');
  if (manifest) {
    data['manifest'] = manifest.getAttribute('href') || 'present';
  }

  const generator = document.querySelector('meta[name="generator"]');
  if (generator) {
    const content = generator.getAttribute('content');
    if (content) {
      data['generator'] = content;
    }
  }

  const applicationName = document.querySelector('meta[name="application-name"]');
  if (applicationName) {
    const content = applicationName.getAttribute('content');
    if (content) {
      data['application-name'] = content;
    }
  }

  const author = document.querySelector('meta[name="author"]');
  if (author) {
    const content = author.getAttribute('content');
    if (content) {
      data['author'] = content;
    }
  }

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    const content = themeColor.getAttribute('content');
    if (content) {
      data['theme-color'] = content;
    }
  }

  const robots = document.querySelector('meta[name="robots"]');
  if (robots) {
    const content = robots.getAttribute('content');
    if (content) {
      data['robots'] = content;
    }
  }

  return data;
}
