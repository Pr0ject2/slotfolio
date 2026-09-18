import { getCatalogResearchPlayngoFillMechanics } from "./catalog-research-playngo-fill-mechanics";
import { getCatalogResearchPlayngoFillMechanics2 } from "./catalog-research-playngo-fill-mechanics-2";
import { getCatalogResearchPlayngoFillMechanics3 } from "./catalog-research-playngo-fill-mechanics-3";
import { getCatalogResearchPlayngoFillMechanics4 } from "./catalog-research-playngo-fill-mechanics-4";

export function getCatalogResearchPlayngoFillMechanicsAll(slug: string) {
  return (
    getCatalogResearchPlayngoFillMechanics4(slug) ??
    getCatalogResearchPlayngoFillMechanics3(slug) ??
    getCatalogResearchPlayngoFillMechanics2(slug) ??
    getCatalogResearchPlayngoFillMechanics(slug)
  );
}
