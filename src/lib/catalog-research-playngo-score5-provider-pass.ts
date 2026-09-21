import type { CatalogResearch } from "./catalog-research";
import { getCatalogResearchPlayngoScore5ProviderPass as getCatalogResearchPlayngoScore5ProviderPassLegacy } from "./catalog-research-playngo-score5-provider-pass-legacy";
import { getCatalogResearchPlayngoScore5ProviderPass2 } from "./catalog-research-playngo-score5-provider-pass-2";
import { getCatalogResearchPlayngoScore5ProviderPass3 } from "./catalog-research-playngo-score5-provider-pass-3";
import { getCatalogResearchPlayngoScore5ProviderPass4 } from "./catalog-research-playngo-score5-provider-pass-4";
import { getCatalogResearchPlayngoScore5ProviderPass5 } from "./catalog-research-playngo-score5-provider-pass-5";
import { getCatalogResearchPlayngoScore5ProviderPass6 } from "./catalog-research-playngo-score5-provider-pass-6";
import { getCatalogResearchPlayngoScore6Wave } from "./catalog-research-playngo-score6-wave";
import { getCatalogResearchPlayngoScore6Wave2 } from "./catalog-research-playngo-score6-wave2";

export function getCatalogResearchPlayngoScore5ProviderPass(slug: string): CatalogResearch | undefined {
  const score5 =
    getCatalogResearchPlayngoScore5ProviderPass6(slug) ??
    getCatalogResearchPlayngoScore5ProviderPass5(slug) ??
    getCatalogResearchPlayngoScore5ProviderPass4(slug) ??
    getCatalogResearchPlayngoScore5ProviderPass3(slug) ??
    getCatalogResearchPlayngoScore5ProviderPass2(slug) ??
    getCatalogResearchPlayngoScore5ProviderPassLegacy(slug);
  const score6Base = getCatalogResearchPlayngoScore6Wave(slug);
  const score6Wave2 = getCatalogResearchPlayngoScore6Wave2(slug);
  const score6 =
    score6Base && score6Wave2
      ? {
          ...score6Base,
          ...score6Wave2,
          mechanics: [...new Set([...score6Base.mechanics, ...score6Wave2.mechanics])],
          evidence: [score6Base.evidence, score6Wave2.evidence].filter(Boolean).join(" "),
        }
      : score6Wave2 ?? score6Base;

  if (!score6) return score5;
  if (!score5) return score6;

  return {
    ...score5,
    ...score6,
    mechanics: [...new Set([...score5.mechanics, ...score6.mechanics])],
    evidence: [score5.evidence, score6.evidence].filter(Boolean).join(" "),
  };
}
