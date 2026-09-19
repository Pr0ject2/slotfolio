import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawTailValues = Partial<Pick<CatalogVerifiedDetails, "field" | "rtp" | "volatility" | "releaseDate">>;

const verifiedAt = "2026-09-19";

const values: Record<string, HacksawTailValues> = {
  "hacksaw-gaming-cursed-crypt": {
    releaseDate: "2024-06",
  },
  "hacksaw-gaming-death-becomes-you": {
    rtp: "96,34% / 94,36% / 92,23% / 86,28%",
    volatility: "4/5",
  },
  "hacksaw-gaming-dusk-princess": {
    field: "6×5",
  },
  "hacksaw-gaming-le-football-fan": {
    rtp: "96,41% / 94,29% / 92,30%",
    volatility: "2/5",
  },
  "hacksaw-gaming-tiger-legends": {
    releaseDate: "2025-09-04",
  },
  "hacksaw-gaming-ze-zeus": {
    field: "6×5",
  },
};

export function getCatalogVerifiedDetailsHacksawScore4Tail(slug: string) {
  const value = values[slug];
  return value ? { ...value, verifiedAt } : undefined;
}
