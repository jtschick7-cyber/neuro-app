import { useCallback, useEffect, useState } from 'react';

export type Sex = 'M' | 'F' | '';

/** Raw string fields so partially-typed input is preserved. */
export interface PatientContext {
  weightKg: string;
  age: string;
  sex: Sex;
  creatinine: string;
}

export const EMPTY_CONTEXT: PatientContext = { weightKg: '', age: '', sex: '', creatinine: '' };

/** Key used by earlier builds that persisted the context; purged on load. */
const LEGACY_STORAGE_KEY = 'neurohosp.patientContext.v1';

/** Parse a numeric string; returns null if empty or not a positive finite number. */
export function parsePositive(value: string): number | null {
  if (value.trim() === '') return null;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/**
 * Patient context lives in memory only: it clears when the app is closed or reloaded,
 * so a previous patient's weight or creatinine can never pre-fill the next patient's doses.
 */
export function usePatientContext(): {
  context: PatientContext;
  update: (patch: Partial<PatientContext>) => void;
  clear: () => void;
} {
  const [context, setContext] = useState<PatientContext>(EMPTY_CONTEXT);

  useEffect(() => {
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // storage unavailable — nothing to purge
    }
  }, []);

  const update = useCallback((patch: Partial<PatientContext>) => {
    setContext((prev) => ({ ...prev, ...patch }));
  }, []);
  const clear = useCallback(() => setContext(EMPTY_CONTEXT), []);

  return { context, update, clear };
}
