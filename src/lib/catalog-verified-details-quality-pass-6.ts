import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-13";

const details: Record<string, CatalogVerifiedDetails> = {
  "hacksaw-gaming-epic-ze-zeus": { rtp: "96,22% / 94,16% / 92,35%", maxWin: "50 000x", volatility: "5/5", releaseDate: "2026-08-18", source: "https://www.hacksawgaming.com/games/epic-ze-zeus", verifiedAt },
  "hacksaw-gaming-great-game-rockies": { rtp: "96,33% / 94,33% / 92,29% / 86,25%", maxWin: "5 000x", volatility: "3/5", releaseDate: "2026-06-11", source: "https://www.hacksawgaming.com/games/great-game-rockies", verifiedAt },
  "hacksaw-gaming-grug-make-fire": { rtp: "96,19% / 94,28% / 92,27% / 86,22%", maxWin: "10 000x", volatility: "4/5", source: "https://www.hacksawgaming.com/games/grug-make-fire", verifiedAt },
  "hacksaw-gaming-le-hooligan": { rtp: "96,34% / 94,23% / 92,17%", maxWin: "10 000x", volatility: "3/5", releaseDate: "2026-06-08", source: "https://www.hacksawgaming.com/games/le-hooligan", verifiedAt },
  "hacksaw-gaming-le-sortudo": { rtp: "96,27% / 94,29% / 92,23% / 86,28%", maxWin: "2 500x", volatility: "3/5", releaseDate: "2026-08-04", source: "https://www.hacksawgaming.com/games/le-sortudo", verifiedAt },
  "hacksaw-gaming-supreme-zeus": { rtp: "96,39% / 94,30% / 92,31% / 86,32%", maxWin: "12 500x", volatility: "4/5", releaseDate: "2026-07-30", source: "https://www.hacksawgaming.com/games/supreme-zeus", verifiedAt },
};

export function getCatalogVerifiedDetailsQualityPass6(slug: string) {
  return details[slug];
}
