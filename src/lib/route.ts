// Hash routing. Routes carry ids only — never patient data or calculator inputs.
//   #/                         home
//   #/<registry>               a registry list      (e.g. #/mg-contraindications)
//   #/<registry>/<entry-id>    one registry entry   (e.g. #/mg-contraindications/magnesium)
//   #/about                    About, versions, sources, legends
//   #/calc                     all calculators
//   #/calc/<calculator-id>     calculators, scrolled to and highlighting that one

import { getRegistry, SECTIONS, type RegistryId, type SectionId } from './nav';

export type Route =
  | { kind: 'home' }
  | { kind: 'registry'; registry: RegistryId; entryId?: string }
  | { kind: 'calc'; calcId?: string }
  | { kind: 'about' };

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function decode(segment: string | undefined): string | undefined {
  if (segment === undefined) return undefined;
  try {
    const s = decodeURIComponent(segment);
    return KEBAB.test(s) ? s : undefined;
  } catch {
    return undefined;
  }
}

/** Parses `location.hash`. Anything unrecognized falls back to home. */
export function parseHash(hash: string): Route {
  const path = (hash.replace(/^#\/?/, '').split('?')[0] ?? '').split('/').filter((s) => s !== '');
  const [first, second] = path;
  if (first === 'about') return { kind: 'about' };
  if (first === 'calc') return { kind: 'calc', calcId: decode(second) };
  const info = first === undefined ? undefined : getRegistry(first);
  if (info) {
    const entryId = decode(second);
    return entryId ? { kind: 'registry', registry: info.id, entryId } : { kind: 'registry', registry: info.id };
  }
  return { kind: 'home' };
}

export function toHash(route: Route): string {
  switch (route.kind) {
    case 'home':
      return '#/';
    case 'about':
      return '#/about';
    case 'calc':
      return route.calcId ? `#/calc/${route.calcId}` : '#/calc';
    case 'registry':
      return route.entryId ? `#/${route.registry}/${route.entryId}` : `#/${route.registry}`;
  }
}

export function sectionOf(route: Route): SectionId {
  if (route.kind === 'home' || route.kind === 'about') return 'home';
  if (route.kind === 'calc') return 'calc';
  return getRegistry(route.registry)?.section ?? 'home';
}

export function sectionLabel(id: SectionId): string {
  return SECTIONS.find((s) => s.id === id)?.label ?? '';
}
