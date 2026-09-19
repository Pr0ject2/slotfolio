import type { CatalogResearch } from "./catalog-research";
import { getCatalogResearchPushMechanicsTail as getLegacyPushMechanicsTail } from "./catalog-research-push-mechanics-tail-legacy";
import { getCatalogResearchPushScore5_20260919 } from "./catalog-research-push-score5-20260919";

export function getCatalogResearchPushMechanicsTail(slug: string): CatalogResearch | undefined {
  const legacy = getLegacyPushMechanicsTail(slug);
  const score5 = getCatalogResearchPushScore5_20260919(slug);

  if (!score5) return legacy;
  if (!legacy) return score5;

  return {
    ...legacy,
    ...score5,
    mechanics: [...new Set([...legacy.mechanics, ...score5.mechanics])],
    evidence: [legacy.evidence, score5.evidence].filter(Boolean).join(" "),
  };
}
