import type { CatalogResearch } from "./catalog-research";
import { getCatalogResearchMechanicsFinalTail as getCatalogResearchMechanicsFinalTailLegacy } from "./catalog-research-mechanics-final-tail-legacy";
import { getCatalogResearch3OaksScore5ProviderPass } from "./catalog-research-3oaks-score5-provider-pass";
import { getCatalogResearchScore5SmallTail20260920 } from "./catalog-research-score5-small-tail-20260920";
import { getCatalogResearchPushMechanicsTail } from "./catalog-research-push-mechanics-tail";

export function getCatalogResearchMechanicsFinalTail(slug: string): CatalogResearch | undefined {
  const legacy = getCatalogResearchMechanicsFinalTailLegacy(slug);
  const threeOaks = getCatalogResearch3OaksScore5ProviderPass(slug);
  const smallTail = getCatalogResearchScore5SmallTail20260920(slug);
  const pushTail = getCatalogResearchPushMechanicsTail(slug);

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

  const combinedFresh = !pushTail
    ? fresh
    : !fresh
      ? pushTail
      : {
          ...fresh,
          ...pushTail,
          mechanics: [...new Set([...fresh.mechanics, ...pushTail.mechanics])],
          evidence: `${fresh.evidence} ${pushTail.evidence}`,
        };

  if (!combinedFresh) return legacy;
  if (!legacy) return combinedFresh;

  return {
    ...combinedFresh,
    mechanics: [...new Set([...legacy.mechanics, ...combinedFresh.mechanics])],
    evidence: `${legacy.evidence} ${combinedFresh.evidence}`,
  };
}
