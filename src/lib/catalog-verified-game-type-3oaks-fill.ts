import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";
import { getVerifiedCatalogGameType3OaksFill as getVerifiedCatalogGameType3OaksFillLegacy } from "./catalog-verified-game-type-3oaks-fill-legacy";
import { getVerifiedCatalogGameType3OaksScore5 } from "./catalog-verified-game-type-3oaks-score5";
import { getVerifiedCatalogGameType3OaksScore6 } from "./catalog-verified-game-type-3oaks-score6";
import { getVerifiedCatalogGameType3OaksCurrent } from "./catalog-verified-game-type-3oaks-current";
import { getVerifiedCatalogGameType3OaksCloseout } from "./catalog-verified-game-type-3oaks-closeout";

export function getVerifiedCatalogGameType3OaksFill(slug: string): CatalogVerifiedGameType | undefined {
  return getVerifiedCatalogGameType3OaksCloseout(slug) ?? getVerifiedCatalogGameType3OaksCurrent(slug) ?? getVerifiedCatalogGameType3OaksScore6(slug) ?? getVerifiedCatalogGameType3OaksScore5(slug) ?? getVerifiedCatalogGameType3OaksFillLegacy(slug);
}
