import type { CatalogResearch } from "./catalog-research";
import { getCatalogResearchPlayngoScore5ProviderPass as getCatalogResearchPlayngoScore5ProviderPassLegacy } from "./catalog-research-playngo-score5-provider-pass-legacy";
import { getCatalogResearchPlayngoScore5ProviderPass2 } from "./catalog-research-playngo-score5-provider-pass-2";
import { getCatalogResearchPlayngoScore5ProviderPass3 } from "./catalog-research-playngo-score5-provider-pass-3";
import { getCatalogResearchPlayngoScore5ProviderPass4 } from "./catalog-research-playngo-score5-provider-pass-4";

export function getCatalogResearchPlayngoScore5ProviderPass(slug: string): CatalogResearch | undefined {
  return (
    getCatalogResearchPlayngoScore5ProviderPass4(slug) ??
    getCatalogResearchPlayngoScore5ProviderPass3(slug) ??
    getCatalogResearchPlayngoScore5ProviderPass2(slug) ??
    getCatalogResearchPlayngoScore5ProviderPassLegacy(slug)
  );
}
