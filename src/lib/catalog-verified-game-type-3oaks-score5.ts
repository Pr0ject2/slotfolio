import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const records: Record<string, CatalogVerifiedGameType> = {
  "3-oaks-gaming-dj-tiger-x1000": {
    gameType: "Slots",
    source: "https://3oaks.com/game/dj_tiger_x1000",
    verifiedAt: "2026-09-20",
  },
};

export function getVerifiedCatalogGameType3OaksScore5(slug: string) {
  return records[slug];
}
