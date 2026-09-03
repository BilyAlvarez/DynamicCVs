import type { CVData, CVSettings, PersistedState } from '../types';
import { emptyCV, DEFAULT_SETTINGS } from '../data';

const KEY = 'dynamiccvs_state';

export function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (!parsed || !parsed.data || !parsed.settings) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveState(data: CVData, settings: CVSettings): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ data, settings }));
  } catch {
    // Ignoramos fallos de cuota/storage
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

export function makeInitialState(): PersistedState {
  const saved = loadState();
  if (saved) return saved;
  return { data: emptyCV, settings: DEFAULT_SETTINGS };
}