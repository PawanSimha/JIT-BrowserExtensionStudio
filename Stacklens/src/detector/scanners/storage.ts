export function scanStorageKeys(): string[] {
  const keys: string[] = [];

  try {
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i) || '');
    }
  } catch {
    // localStorage access denied
  }

  try {
    for (let i = 0; i < sessionStorage.length; i++) {
      keys.push(sessionStorage.key(i) || '');
    }
  } catch {
    // sessionStorage access denied
  }

  return keys;
}
