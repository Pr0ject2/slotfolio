import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsQualityPass6 } from "./catalog-verified-details-quality-pass-6";

const verifiedAt = "2026-09-13";

const details: Record<string, CatalogVerifiedDetails> = {
  "hacksaw-gaming-tiger-legends": {
    field: "5×4",
    source: "https://www.hacksawgaming.com/games/tiger-legends",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawFinal(slug: string) {
  return getCatalogVerifiedDetailsQualityPass6(slug) ?? details[slug];
}
