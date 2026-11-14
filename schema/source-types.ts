import { z } from "zod";
import { IsoDate, SemVer, Source } from "./common";

/** P2-2: kind of each cited source. Only GUIDELINE and LABEL feed the old-sources banner. */
export const SourceType = z.enum(["GUIDELINE", "LABEL", "TRIAL", "REVIEW", "OTHER"]);

/** data/source-types.json: one tag per unique citation string used anywhere in data/ (exact text match). */
export const SourceTypes = z
  .object({
    title: z.string(),
    version: SemVer,
    lastUpdated: IsoDate,
    types: z.record(Source, SourceType),
  })
  .strict();
