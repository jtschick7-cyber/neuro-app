import raw from '../data/mg-contraindications.json';

export type MgTier = 'ABSOLUTE_AVOID_BLACK_BOX' | 'HIGH_RISK_RELATIVE' | 'CAUTIONARY_TRAP';

export interface MgEntry {
  id: string;
  class: string;
  generics: string[];
  brands: string[];
  tier: MgTier;
  badgeLabel: string;
  mechanism: string;
  clinicalPearl: string;
  safeInpatientAlternatives: string[];
}

export interface MgRegistry {
  title: string;
  version: string;
  lastUpdated: string;
  entries: MgEntry[];
}

// Compile-time check: JSON must conform to the interface.
export const mgRegistry: MgRegistry = raw as MgRegistry;

export function searchMgEntries(entries: MgEntry[], query: string): MgEntry[] {
  const q = query.trim().toLowerCase();
  if (q === '') return entries;
  return entries.filter((e) =>
    [e.class, e.mechanism, e.clinicalPearl, e.badgeLabel, ...e.generics, ...e.brands, ...e.safeInpatientAlternatives]
      .join(' ')
      .toLowerCase()
      .includes(q),
  );
}
