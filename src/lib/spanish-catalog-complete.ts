import batch01 from "./spanish-catalog-complete-batch01.json" with { type: "json" };
import batch02 from "./spanish-catalog-complete-batch02.json" with { type: "json" };
import batch03 from "./spanish-catalog-complete-batch03.json" with { type: "json" };
import batch04 from "./spanish-catalog-complete-batch04.json" with { type: "json" };
import batch05 from "./spanish-catalog-complete-batch05.json" with { type: "json" };
import batch06 from "./spanish-catalog-complete-batch06.json" with { type: "json" };
import batch07 from "./spanish-catalog-complete-batch07.json" with { type: "json" };
import batch08 from "./spanish-catalog-complete-batch08.json" with { type: "json" };
import batch09 from "./spanish-catalog-complete-batch09.json" with { type: "json" };
import type { EnglishCatalogContent } from "./english-catalog-complete";

export type SpanishCatalogContent = EnglishCatalogContent;

/** Complete existing content; empty characteristics remain empty. */
export const spanishCatalogComplete: Record<string, SpanishCatalogContent> = { ...batch01, ...batch02, ...batch03, ...batch04, ...batch05, ...batch06, ...batch07, ...batch08, ...batch09 };
