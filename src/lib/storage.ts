/** Safe localStorage helpers (Safari private mode / quota errors must never crash the app). */

export function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function saveJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore: persistence is best-effort.
  }
}

const NOTE_PREFIX = 'neurohosp.note.v1.';

export function loadNote(noteId: string): string {
  return loadJson<string>(NOTE_PREFIX + noteId, '');
}

/** Saves a note; an empty note removes the key so storage doesn't fill with blanks. */
export function saveNote(noteId: string, text: string): void {
  try {
    if (text.trim() === '') localStorage.removeItem(NOTE_PREFIX + noteId);
    else saveJson(NOTE_PREFIX + noteId, text);
  } catch {
    // best-effort
  }
}

// Pinned favorites (task 4.4, approved by Jason): entry ids only ("registry:id"), never patient data or free text.
const PINS_KEY = 'neurohosp.pins.v1';
const PIN_ID = /^[a-z0-9]+(-[a-z0-9]+)*:[a-z0-9]+(-[a-z0-9]+)*$/;
const MAX_PINS = 50;

/** Pinned entry ids, most recent first. Anything that isn't a "registry:id" string is dropped. */
export function loadPins(): string[] {
  const raw = loadJson<unknown>(PINS_KEY, []);
  return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === 'string' && PIN_ID.test(x)).slice(0, MAX_PINS) : [];
}

/** Pins or unpins one entry; returns the new list. */
export function togglePin(id: string): string[] {
  if (!PIN_ID.test(id)) return loadPins();
  const pins = loadPins();
  const next = pins.includes(id) ? pins.filter((p) => p !== id) : [id, ...pins].slice(0, MAX_PINS);
  saveJson(PINS_KEY, next);
  return next;
}
