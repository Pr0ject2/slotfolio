import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsQualityPass6 } from "./catalog-verified-details-quality-pass-6";
import { getCatalogVerifiedDetailsQualityPass8 } from "./catalog-verified-details-quality-pass-8";
import { getCatalogVerifiedDetailsHacksawProviderWide3 } from "./catalog-verified-details-hacksaw-provider-wide-3";
import { getCatalogVerifiedDetailsHacksawProviderWide4 } from "./catalog-verified-details-hacksaw-provider-wide-4";

const verifiedAt = "2026-09-13";

const details: Record<string, CatalogVerifiedDetails> = {
  "hacksaw-gaming-tiger-legends": {
    field: "5×4",
    source: "https://www.hacksawgaming.com/games/tiger-legends",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawFinal(slug: string) {
  return (
    getCatalogVerifiedDetailsHacksawProviderWide4(slug) ??
    getCatalogVerifiedDetailsHacksawProviderWide3(slug) ??
    getCatalogVerifiedDetailsQualityPass8(slug) ??
    getCatalogVerifiedDetailsQualityPass6(slug) ??
    details[slug]
  );
}
