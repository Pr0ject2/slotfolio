import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";
import { getVerifiedCatalogGameType3OaksFill as getVerifiedCatalogGameType3OaksFillLegacy } from "./catalog-verified-game-type-3oaks-fill-legacy";
import { getVerifiedCatalogGameType3OaksScore5 } from "./catalog-verified-game-type-3oaks-score5";

export function getVerifiedCatalogGameType3OaksFill(slug: string): CatalogVerifiedGameType | undefined {
  return getVerifiedCatalogGameType3OaksScore5(slug) ?? getVerifiedCatalogGameType3OaksFillLegacy(slug);
}
