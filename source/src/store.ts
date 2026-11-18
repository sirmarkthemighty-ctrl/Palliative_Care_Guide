// Storage can throw (private window, blocked site data); the apps must work without it.
export const safeStore = (key: string, value?: string): string | null => {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch {}
  return null;
};
