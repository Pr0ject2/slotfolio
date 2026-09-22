import type { CatalogResearch } from "./catalog-research";
import { getCatalogResearchPlayngoScore5ProviderPass as getCatalogResearchPlayngoScore5ProviderPassLegacy } from "./catalog-research-playngo-score5-provider-pass-legacy";
import { getCatalogResearchPlayngoScore5ProviderPass2 } from "./catalog-research-playngo-score5-provider-pass-2";
import { getCatalogResearchPlayngoScore5ProviderPass3 } from "./catalog-research-playngo-score5-provider-pass-3";
import { getCatalogResearchPlayngoScore5ProviderPass4 } from "./catalog-research-playngo-score5-provider-pass-4";
import { getCatalogResearchPlayngoScore5ProviderPass5 } from "./catalog-research-playngo-score5-provider-pass-5";
import { getCatalogResearchPlayngoScore5ProviderPass6 } from "./catalog-research-playngo-score5-provider-pass-6";
import { getCatalogResearchPlayngoScore6Wave } from "./catalog-research-playngo-score6-wave";
import { getCatalogResearchPlayngoScore6Wave2 } from "./catalog-research-playngo-score6-wave2";
import { getCatalogResearchPlayngoScore6Wave3 } from "./catalog-research-playngo-score6-wave3";

function mergeResearch(base: CatalogResearch | undefined, extra: CatalogResearch | undefined) {
  if (!base) return extra;
  if (!extra) return base;

  return {
    ...base,
    ...extra,
    mechanics: [...new Set([...base.mechanics, ...extra.mechanics])],
    evidence: [base.evidence, extra.evidence].filter(Boolean).join(" "),
  };
}

export function getCatalogResearchPlayngoScore5ProviderPass(slug: string): CatalogResearch | undefined {
  const score5 =
    getCatalogResearchPlayngoScore5ProviderPass6(slug) ??
    getCatalogResearchPlayngoScore5ProviderPass5(slug) ??
    getCatalogResearchPlayngoScore5ProviderPass4(slug) ??
    getCatalogResearchPlayngoScore5ProviderPass3(slug) ??
    getCatalogResearchPlayngoScore5ProviderPass2(slug) ??
    getCatalogResearchPlayngoScore5ProviderPassLegacy(slug);
  const score6 = mergeResearch(
    mergeResearch(getCatalogResearchPlayngoScore6Wave(slug), getCatalogResearchPlayngoScore6Wave2(slug)),
    getCatalogResearchPlayngoScore6Wave3(slug),
  );

  return mergeResearch(score5, score6);
}
