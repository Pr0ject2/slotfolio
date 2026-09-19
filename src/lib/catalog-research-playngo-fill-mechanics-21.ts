import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-19";

const records: Record<string, CatalogResearch> = {
  "playn-go-def-leppard-hysteria": {
    mechanics: ["Кластеры", "Каскады", "Pour Some Sugar on Me"],
    source: "https://www.playngo.com/games/def-leppard:-hysteria",
    verifiedAt,
    evidence: "Official game page explicitly names the Pour Some Sugar on Me feature: players unlock sugar hidden behind the grid while symbols drop to the bottom of the grid as if sugar were being poured.",
  },
  "playn-go-fortune-teller": {
    mechanics: ["Pick-and-click", "Трансформация символов", "Free Spins"],
    source: "https://www.playngo.com/games/fortune-teller",
    verifiedAt,
    evidence: "Official page says the Black Cat Scatter awards 14, 20 or 25 Free Spins depending on whether three, four or five Cats land; the Cat then becomes a Wild during the feature.",
  },
  "playn-go-irish-gold": {
    mechanics: ["Линии", "Множители", "Wilds"],
    source: "https://www.playngo.com/games/irish-gold",
    verifiedAt,
    evidence: "Official page says the pots of gold serve as Wilds and substitute for any other reel symbol on a payline except the Scatter; one or two pots also multiply a winning combination by 5x or 25x.",
  },
};

export function getCatalogResearchPlayngoFillMechanics21(slug: string) {
  return records[slug];
}
