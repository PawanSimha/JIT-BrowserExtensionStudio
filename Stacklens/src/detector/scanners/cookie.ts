export function scanCookies(): string[] {
  return document.cookie.split(';').map((c) => c.trim()).filter(Boolean);
}
