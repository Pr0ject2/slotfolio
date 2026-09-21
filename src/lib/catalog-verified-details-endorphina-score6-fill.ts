import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type EndorphinaScore6Overlay = Pick<CatalogVerifiedDetails, "maxWin" | "source" | "verifiedAt">;

const verifiedAt = "2026-09-21";

const details: Record<string, EndorphinaScore6Overlay> = {
  "endorphina-burning-coins-100": {
    maxWin: "200 000x",
    source: "https://endorphina.com/games/burning-coins-100/play",
    verifiedAt,
  },
  "endorphina-druids-fortune": {
    maxWin: "10 000x",
    source: "https://endorphina.com/games/druids-fortune/play",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsEndorphinaScore6Fill(slug: string) {
  return details[slug];
}
