import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "playn-go-manta-mayhem": {
    mechanics: ["Сбор символов", "Pick-and-click", "Множители", "Трансформация символов"],
    source: "https://www.playngo.com/games/manta-mayhem",
    verifiedAt,
    evidence: "Official game page describes Pearl Collection, picking a clam and pearls to reveal Free Spins/boosters, x2/x5/x10 multipliers, and a booster that transforms one HP symbol into a Wild.",
  },
  "playn-go-midnight-gold": {
    mechanics: ["Сбор символов", "Респины", "Множители", "Pick-and-click"],
    source: "https://www.playngo.com/games/midnight-gold",
    verifiedAt,
    evidence: "Official game page describes the Deliver symbol awarding all Cash symbols, a second-chance re-spin, Mystery/Wild multipliers, and a Free Spins Choice between two modes.",
  },
  "playn-go-nugget-n-nonsense": {
    mechanics: ["Сбор символов", "Респины", "Бонусное колесо", "Множители"],
    source: "https://www.playngo.com/games/nugget-n%E2%80%99-nonsense",
    verifiedAt,
    evidence: "Official game page says six Coins trigger Hold & Spin with three re-spins, collected Coin values are awarded, and Coins can trigger a bonus wheel that awards and upgrades multipliers.",
  },
  "playn-go-pearls-of-india": {
    mechanics: ["Множители", "Сбор символов", "Pick-and-click", "Бонусное колесо"],
    source: "https://www.playngo.com/games/pearls-of-india",
    verifiedAt,
    evidence: "Official game page describes increasing win multipliers, collecting Temples/Pearls, choosing one of three temple challenges including pearl/tile picks, and the Wheel of Brahma bonus challenge.",
  },
};

export function getCatalogResearchPlayngoFillMechanics2(slug: string) {
  return records[slug];
}
