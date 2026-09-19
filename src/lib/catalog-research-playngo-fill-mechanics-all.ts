import { getCatalogResearchPlayngoFillMechanics } from "./catalog-research-playngo-fill-mechanics";
import { getCatalogResearchPlayngoFillMechanics2 } from "./catalog-research-playngo-fill-mechanics-2";
import { getCatalogResearchPlayngoFillMechanics3 } from "./catalog-research-playngo-fill-mechanics-3";
import { getCatalogResearchPlayngoFillMechanics4 } from "./catalog-research-playngo-fill-mechanics-4";
import { getCatalogResearchPlayngoFillMechanics5 } from "./catalog-research-playngo-fill-mechanics-5";
import { getCatalogResearchPlayngoFillMechanics6 } from "./catalog-research-playngo-fill-mechanics-6";
import { getCatalogResearchPlayngoFillMechanics7 } from "./catalog-research-playngo-fill-mechanics-7";
import { getCatalogResearchPlayngoFillMechanics8 } from "./catalog-research-playngo-fill-mechanics-8";
import { getCatalogResearchPlayngoFillMechanics9 } from "./catalog-research-playngo-fill-mechanics-9";
import { getCatalogResearchPlayngoFillMechanics10 } from "./catalog-research-playngo-fill-mechanics-10";
import { getCatalogResearchPlayngoFillMechanics11 } from "./catalog-research-playngo-fill-mechanics-11";
import { getCatalogResearchPlayngoFillMechanics12 } from "./catalog-research-playngo-fill-mechanics-12";

export function getCatalogResearchPlayngoFillMechanicsAll(slug: string) {
  return (
    getCatalogResearchPlayngoFillMechanics12(slug) ??
    getCatalogResearchPlayngoFillMechanics11(slug) ??
    getCatalogResearchPlayngoFillMechanics10(slug) ??
    getCatalogResearchPlayngoFillMechanics9(slug) ??
    getCatalogResearchPlayngoFillMechanics8(slug) ??
    getCatalogResearchPlayngoFillMechanics7(slug) ??
    getCatalogResearchPlayngoFillMechanics6(slug) ??
    getCatalogResearchPlayngoFillMechanics5(slug) ??
    getCatalogResearchPlayngoFillMechanics4(slug) ??
    getCatalogResearchPlayngoFillMechanics3(slug) ??
    getCatalogResearchPlayngoFillMechanics2(slug) ??
    getCatalogResearchPlayngoFillMechanics(slug)
  );
}
