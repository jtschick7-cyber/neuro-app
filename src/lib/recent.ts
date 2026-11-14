/** Recently opened entries ("registry:id"), newest first. Memory only — never persisted (lost on reload). */
const MAX_RECENT = 5;
let recent: string[] = [];

export function recordRecent(id: string): void {
  recent = [id, ...recent.filter((r) => r !== id)].slice(0, MAX_RECENT);
}

export function getRecent(): string[] {
  return recent;
}
