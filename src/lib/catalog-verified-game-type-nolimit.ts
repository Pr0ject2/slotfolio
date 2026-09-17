import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-17";

const gameTypes: Record<string, CatalogVerifiedGameType> = {
  "nolimit-city-bowel-of-beelzebub": {
    gameType: "Slots",
    source: "https://nolimitcity.com/games/bowel-of-beelzebub",
    verifiedAt,
  },
  "nolimit-city-ding-dong-death": {
    gameType: "Slots",
    source: "https://nolimitcity.com/games/ding-dong-death",
    verifiedAt,
  },
  "nolimit-city-duck-hunters-2": {
    gameType: "Slots",
    source: "https://nolimitcity.com/games/duck-hunters-2",
    verifiedAt,
  },
  "nolimit-city-fire-in-the-hole-4": {
    gameType: "Slots",
    source: "https://nolimitcity.com/games/game-1",
    verifiedAt,
  },
  "nolimit-city-gator-hunters-2": {
    gameType: "Slots",
    source: "https://nolimitcity.com/games/gator-hunters-2",
    verifiedAt,
  },
  "nolimit-city-six-feet-under": {
    gameType: "Slots",
    source: "https://nolimitcity.com/games/six-feet-under",
    verifiedAt,
  },
};

export function getVerifiedCatalogGameTypeNolimit(slug: string) {
  return gameTypes[slug];
}
