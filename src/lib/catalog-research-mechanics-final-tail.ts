import type { CatalogResearch } from "./catalog-research";
import { getCatalogResearchMechanicsFinalTail as getCatalogResearchMechanicsFinalTailLegacy } from "./catalog-research-mechanics-final-tail-legacy";
import { getCatalogResearch3OaksScore5ProviderPass } from "./catalog-research-3oaks-score5-provider-pass";
import { getCatalogResearch3OaksPublicApiPass } from "./catalog-research-3oaks-public-api-pass";
import { getCatalogResearchScore5SmallTail20260920 } from "./catalog-research-score5-small-tail-20260920";
import { getCatalogResearchPushMechanicsTail } from "./catalog-research-push-mechanics-tail";

function mergeResearch(
  earlier: CatalogResearch | undefined,
  later: CatalogResearch | undefined,
): CatalogResearch | undefined {
  if (!later) return earlier;
  if (!earlier) return later;

  return {
    ...earlier,
    ...later,
    mechanics: [...new Set([...earlier.mechanics, ...later.mechanics])],
    evidence: [earlier.evidence, later.evidence].filter(Boolean).join(" "),
  };
}

export function getCatalogResearchMechanicsFinalTail(slug: string): CatalogResearch | undefined {
  const legacy = getCatalogResearchMechanicsFinalTailLegacy(slug);
  const threeOaks = getCatalogResearch3OaksScore5ProviderPass(slug);
  const threeOaksPublicApi = getCatalogResearch3OaksPublicApiPass(slug);
  const smallTail = getCatalogResearchScore5SmallTail20260920(slug);
  const pushTail = getCatalogResearchPushMechanicsTail(slug);

  const fresh = mergeResearch(mergeResearch(mergeResearch(threeOaks, threeOaksPublicApi), smallTail), pushTail);
  return mergeResearch(legacy, fresh);
}
