import batch01 from "./english-catalog-complete-batch01.json" with { type: "json" };

export type EnglishCatalogContent = {
  intro?: string[];
  editorial?: string;
  features: { title: string; description: string }[];
};

/** Full existing catalogue content, translated without changing coverage or facts. */
export const englishCatalogComplete: Record<string, EnglishCatalogContent> = { ...batch01 };
