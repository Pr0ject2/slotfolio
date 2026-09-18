import { getCatalogResearchPlayngoFillMechanics } from "./catalog-research-playngo-fill-mechanics";
import { getCatalogResearchPlayngoFillMechanics2 } from "./catalog-research-playngo-fill-mechanics-2";
import { getCatalogResearchPlayngoFillMechanics3 } from "./catalog-research-playngo-fill-mechanics-3";
import { getCatalogResearchPlayngoFillMechanics4 } from "./catalog-research-playngo-fill-mechanics-4";
import { getCatalogResearchPlayngoFillMechanics5 } from "./catalog-research-playngo-fill-mechanics-5";

export function getCatalogResearchPlayngoFillMechanicsAll(slug: string) {
  return (
    getCatalogResearchPlayngoFillMechanics5(slug) ??
    getCatalogResearchPlayngoFillMechanics4(slug) ??
    getCatalogResearchPlayngoFillMechanics3(slug) ??
    getCatalogResearchPlayngoFillMechanics2(slug) ??
    getCatalogResearchPlayngoFillMechanics(slug)
  );
}
