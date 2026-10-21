import batch01 from "./spanish-catalog-complete-batch01.json" with { type: "json" };
import type { EnglishCatalogContent } from "./english-catalog-complete";

export type SpanishCatalogContent = EnglishCatalogContent;

/** Complete existing content; empty characteristics remain empty. */
export const spanishCatalogComplete: Record<string, SpanishCatalogContent> = { ...batch01 };
