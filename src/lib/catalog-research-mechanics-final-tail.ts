import type { CatalogResearch } from "./catalog-research";
import { getCatalogResearchMechanicsFinalTail as getCatalogResearchMechanicsFinalTailLegacy } from "./catalog-research-mechanics-final-tail-legacy";
import { getCatalogResearch3OaksScore5ProviderPass } from "./catalog-research-3oaks-score5-provider-pass";

export function getCatalogResearchMechanicsFinalTail(slug: string): CatalogResearch | undefined {
  const legacy = getCatalogResearchMechanicsFinalTailLegacy(slug);
  const fresh = getCatalogResearch3OaksScore5ProviderPass(slug);

  if (!fresh) return legacy;
  if (!legacy) return fresh;

  return {
    ...fresh,
    mechanics: [...new Set([...legacy.mechanics, ...fresh.mechanics])],
  };
}
