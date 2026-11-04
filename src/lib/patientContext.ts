import { useCallback, useEffect, useState } from 'react';
import { loadJson, saveJson } from './storage';

export type Sex = 'M' | 'F' | '';

/** Raw string fields so partially-typed input is preserved. */
export interface PatientContext {
  weightKg: string;
  age: string;
  sex: Sex;
  creatinine: string;
}

export const EMPTY_CONTEXT: PatientContext = { weightKg: '', age: '', sex: '', creatinine: '' };
export const CONTEXT_STORAGE_KEY = 'neurohosp.patientContext.v1';

/** Parse a numeric string; returns null if empty or not a positive finite number. */
export function parsePositive(value: string): number | null {
  if (value.trim() === '') return null;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function usePatientContext(): {
  context: PatientContext;
  update: (patch: Partial<PatientContext>) => void;
  clear: () => void;
} {
  const [context, setContext] = useState<PatientContext>(() => ({
    ...EMPTY_CONTEXT,
    ...loadJson<Partial<PatientContext>>(CONTEXT_STORAGE_KEY, {}),
  }));

  useEffect(() => {
    saveJson(CONTEXT_STORAGE_KEY, context);
  }, [context]);

  const update = useCallback((patch: Partial<PatientContext>) => {
    setContext((prev) => ({ ...prev, ...patch }));
  }, []);
  const clear = useCallback(() => setContext(EMPTY_CONTEXT), []);

  return { context, update, clear };
}
