import { z } from "zod";

/** Stable kebab-case id: lowercase letters/digits separated by single hyphens. */
export const KebabId = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "id must be kebab-case (a-z, 0-9, single hyphens)");

/** ISO calendar date YYYY-MM-DD. */
export const IsoDate = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, "must be ISO date YYYY-MM-DD");

/** Set to an ISO date at clinician sign-off; "UNREVIEWED" until then. --release rejects UNREVIEWED. */
export const ReviewDate = z.union([IsoDate, z.literal("UNREVIEWED")]);

export const SemVer = z.string().regex(/^\d+\.\d+\.\d+$/, "must be semver MAJOR.MINOR.PATCH");

/** Cross-reference "registry:id", e.g. "mg-contraindications:magnesium" or "calc:fosphenytoin-load". */
export const RelatedId = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*:[a-z0-9]+(-[a-z0-9]+)*$/, 'relatedId must be "registry:id"');

/** Non-empty trimmed string (no blank bullets). */
export const Text = z.string().trim().min(1, "empty string not allowed");

/** Citation string: "Org/1st author. Title. Journal Year;vol:pages. doi". Must contain a 4-digit year. */
export const Source = Text.refine((s) => /\b(19|20)\d{2}\b/.test(s), "source must include a publication year");

export function registryEnvelope<T extends z.ZodTypeAny>(entry: T) {
  return z
    .object({
      title: Text,
      version: SemVer,
      schemaVersion: SemVer,
      lastUpdated: IsoDate,
      entries: z.array(entry).min(1),
    })
    .strict();
}
