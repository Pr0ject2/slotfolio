import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-13";

const details: Record<string, CatalogVerifiedDetails> = {
  "hacksaw-gaming-bash-bros": {
    field: "6 барабанов",
    source: "https://www.hacksawgaming.com/games/bash-bros",
    verifiedAt,
  },
  "hacksaw-gaming-booze-bash": {
    field: "6 барабанов",
    source: "https://www.hacksawgaming.com/games/booze-bash",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsQualityPass8(slug: string) {
  return details[slug];
}
