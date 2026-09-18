import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawFillOverlay = Partial<
  Pick<CatalogVerifiedDetails, "maxWin" | "volatility">
> & { verifiedAt: string };

const verifiedAt = "2026-09-18";

const details: Record<string, HacksawFillOverlay> = {
  "hacksaw-gaming-bullets-and-bounty": {
    maxWin: "20 000x",
    verifiedAt,
  },
  "hacksaw-gaming-divine-drop": {
    maxWin: "10 000x",
    volatility: "3/5",
    verifiedAt,
  },
  "hacksaw-gaming-fighter-pit": {
    maxWin: "10 000x",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawFill2(slug: string) {
  return details[slug];
}
