import { z } from "zod";
import { KebabId, Text } from "./common";

/** One selectable syndrome in the Antibodies tab filter. */
export const SyndromeTerm = z
  .object({
    id: KebabId,
    label: Text,
    definition: Text,
  })
  .strict();

/** Links one antibody (neural-antibodies entry id) to one syndrome; typical=false means "reported, less common". */
export const SyndromeMapping = z
  .object({
    antibodyId: KebabId,
    syndromeTerm: KebabId,
    typical: z.boolean(),
  })
  .strict();

export const SyndromeVocabulary = z
  .object({
    vocabulary: z.array(SyndromeTerm).min(1),
    mapping: z.array(SyndromeMapping).min(1),
  })
  .strict();

export type SyndromeVocabularyData = z.infer<typeof SyndromeVocabulary>;

/**
 * Cross-file integrity rules (not expressible in JSON Schema). Returns one message per violation:
 *  - duplicate vocabulary id
 *  - mapping antibodyId not in neural-antibodies
 *  - mapping syndromeTerm not in the vocabulary
 *  - duplicate (antibodyId, syndromeTerm) pair
 *  - antibody with no typical=true mapping
 *  - vocabulary term used by no mapping
 */
export function checkSyndromeIntegrity(data: SyndromeVocabularyData, antibodyIds: ReadonlySet<string>): string[] {
  const problems: string[] = [];

  const terms = new Set<string>();
  for (const t of data.vocabulary) {
    if (terms.has(t.id)) problems.push(`duplicate vocabulary term "${t.id}"`);
    terms.add(t.id);
  }

  const pairs = new Set<string>();
  const typicalFor = new Set<string>();
  const usedTerms = new Set<string>();
  for (const m of data.mapping) {
    if (!antibodyIds.has(m.antibodyId)) problems.push(`mapping antibodyId "${m.antibodyId}" does not exist in neural-antibodies`);
    if (!terms.has(m.syndromeTerm)) problems.push(`mapping syndromeTerm "${m.syndromeTerm}" (antibody "${m.antibodyId}") is not in the vocabulary`);
    const key = `${m.antibodyId}|${m.syndromeTerm}`;
    if (pairs.has(key)) problems.push(`duplicate mapping (${m.antibodyId}, ${m.syndromeTerm})`);
    pairs.add(key);
    usedTerms.add(m.syndromeTerm);
    if (m.typical) typicalFor.add(m.antibodyId);
  }

  for (const id of antibodyIds) if (!typicalFor.has(id)) problems.push(`antibody "${id}" has no typical=true syndrome mapping`);
  for (const t of terms) if (!usedTerms.has(t)) problems.push(`vocabulary term "${t}" is not used by any mapping`);

  return problems;
}
