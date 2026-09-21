import type { CatalogResearch } from "./catalog-research";
import { getCatalogResearchPushMechanicsTail as getLegacyPushMechanicsTail } from "./catalog-research-push-mechanics-tail-legacy";
import { getCatalogResearchPushScore5_20260919 } from "./catalog-research-push-score5-20260919";
import { getCatalogResearchPushScore6Final } from "./catalog-research-push-score6-final";

export function getCatalogResearchPushMechanicsTail(slug: string): CatalogResearch | undefined {
  const legacy = getLegacyPushMechanicsTail(slug);
  const score5 = getCatalogResearchPushScore5_20260919(slug);
  const score6 = getCatalogResearchPushScore6Final(slug);

  const combined = !score5
    ? legacy
    : !legacy
      ? score5
      : {
          ...legacy,
          ...score5,
          mechanics: [...new Set([...legacy.mechanics, ...score5.mechanics])],
          evidence: [legacy.evidence, score5.evidence].filter(Boolean).join(" "),
        };

  if (!score6) return combined;
  if (!combined) return score6;

  return {
    ...combined,
    ...score6,
    mechanics: [...new Set([...combined.mechanics, ...score6.mechanics])],
    evidence: [combined.evidence, score6.evidence].filter(Boolean).join(" "),
  };
}
