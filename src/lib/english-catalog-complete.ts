import batch01 from "./english-catalog-complete-batch01.json" with { type: "json" };
import batch02 from "./english-catalog-complete-batch02.json" with { type: "json" };
import batch03 from "./english-catalog-complete-batch03.json" with { type: "json" };
import batch04 from "./english-catalog-complete-batch04.json" with { type: "json" };
import batch05 from "./english-catalog-complete-batch05.json" with { type: "json" };
import batch06 from "./english-catalog-complete-batch06.json" with { type: "json" };
import batch07 from "./english-catalog-complete-batch07.json" with { type: "json" };
import batch08 from "./english-catalog-complete-batch08.json" with { type: "json" };
import batch09 from "./english-catalog-complete-batch09.json" with { type: "json" };

export type EnglishCatalogContent = {
  intro?: string[];
  editorial?: string;
  features: { title: string; description: string }[];
};

/** Full existing catalogue content, translated without changing coverage or facts. */
export const englishCatalogComplete: Record<string, EnglishCatalogContent> = { ...batch01, ...batch02, ...batch03, ...batch04, ...batch05, ...batch06, ...batch07, ...batch08, ...batch09 };
