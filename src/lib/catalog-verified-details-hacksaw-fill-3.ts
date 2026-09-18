import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawFill3Overlay = Partial<Pick<CatalogVerifiedDetails, "maxWin" | "volatility">> & {
  verifiedAt: string;
};

const details: Record<string, HacksawFill3Overlay> = {
  "hacksaw-gaming-orb-of-destiny": {
    maxWin: "10 000x",
    volatility: "3/5",
    verifiedAt: "2026-09-18",
  },
};

export function getCatalogVerifiedDetailsHacksawFill3(slug: string) {
  return details[slug];
}
