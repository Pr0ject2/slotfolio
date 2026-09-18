import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-18";

const gameTypes: Record<string, CatalogVerifiedGameType> = {
  "endorphina-burning-coins-100": { gameType: "Slots", source: "https://endorphina.com/games/burning-coins-100/play", verifiedAt },
  "endorphina-burning-coins-20-dice": { gameType: "Slots", source: "https://endorphina.com/games/burning-coins-20-dice/play", verifiedAt },
  "endorphina-chance-machine-90s": { gameType: "Slots", source: "https://endorphina.com/games/chance-machine-90s/play", verifiedAt },
  "endorphina-druids-fortune": { gameType: "Slots", source: "https://endorphina.com/games/druids-fortune/play", verifiedAt },
  "endorphina-fortune-bankers": { gameType: "Slots", source: "https://endorphina.com/games/fortune-bankers/play", verifiedAt },
  "endorphina-fortune-chests-dice": { gameType: "Slots", source: "https://endorphina.com/games/fortune-chests-dice/play", verifiedAt },
  "endorphina-gift-of-midas": { gameType: "Slots", source: "https://endorphina.com/games/gift-of-midas/play", verifiedAt },
  "endorphina-groovin-tiger": { gameType: "Slots", source: "https://endorphina.com/games/groovin-tiger/play", verifiedAt },
  "endorphina-hell-hot-1000": { gameType: "Slots", source: "https://endorphina.com/games/hell-hot-1000/play", verifiedAt },
  "endorphina-moofo": { gameType: "Slots", source: "https://endorphina.com/games/moofo/play", verifiedAt },
  "endorphina-zalatar": { gameType: "Slots", source: "https://endorphina.com/games/zalatar/play", verifiedAt },
};

export function getVerifiedCatalogGameTypeEndorphinaFill(slug: string) {
  return gameTypes[slug];
}
