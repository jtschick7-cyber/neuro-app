/**
 * Placeholder text left over from batch authoring, e.g. "see VTE prophylaxis entry (pending)" or
 * "see thunderclap-headache (batch D)". Cross-references belong in relatedIds, not in user-facing text.
 */
export const PLACEHOLDER_RE = /\bpending\)|\(batch\b/i;

/** Every string in `value` (walked recursively) that matches PLACEHOLDER_RE, with its JSON path. */
export function findPlaceholderText(value: unknown, path = ""): { path: string; text: string }[] {
  if (typeof value === "string") return PLACEHOLDER_RE.test(value) ? [{ path, text: value }] : [];
  if (Array.isArray(value)) return value.flatMap((v, i) => findPlaceholderText(v, `${path}[${i}]`));
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([k, v]) => findPlaceholderText(v, path ? `${path}.${k}` : k));
  return [];
}
