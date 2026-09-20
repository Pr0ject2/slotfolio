import type { CatalogResearch } from "./catalog-research";
import { getCatalogResearchMechanicsFinalTail as getCatalogResearchMechanicsFinalTailLegacy } from "./catalog-research-mechanics-final-tail-legacy";
import { getCatalogResearch3OaksScore5ProviderPass } from "./catalog-research-3oaks-score5-provider-pass";
import { getCatalogResearchScore5SmallTail20260920 } from "./catalog-research-score5-small-tail-20260920";

export function getCatalogResearchMechanicsFinalTail(slug: string): CatalogResearch | undefined {
  const legacy = getCatalogResearchMechanicsFinalTailLegacy(slug);
  const threeOaks = getCatalogResearch3OaksScore5ProviderPass(slug);
  const smallTail = getCatalogResearchScore5SmallTail20260920(slug);

  const fresh = !smallTail
    ? threeOaks
    : !threeOaks
      ? smallTail
      : {
          ...threeOaks,
          ...smallTail,
          mechanics: [...new Set([...threeOaks.mechanics, ...smallTail.mechanics])],
          evidence: `${threeOaks.evidence} ${smallTail.evidence}`,
        };

  if (!fresh) return legacy;
  if (!legacy) return fresh;

  return {
    ...fresh,
    mechanics: [...new Set([...legacy.mechanics, ...fresh.mechanics])],
    evidence: `${legacy.evidence} ${fresh.evidence}`,
  };
}
