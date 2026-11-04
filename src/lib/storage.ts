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
