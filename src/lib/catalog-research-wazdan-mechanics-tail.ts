import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-17";

const holdTheJackpotGames = [
  "12-coins",
  "12-coins-grand-diamond-edition",
  "12-coins-grand-gold-edition",
  "12-coins-grand-platinum-edition",
  "15-coins",
  "15-coins-grand-diamond-edition",
  "15-coins-grand-gold-edition",
  "15-coins-grand-platinum-edition",
  "16-coins",
  "16-coins-grand-gold-edition",
  "16-coins-grand-platinum-edition",
  "16-coins-x5000",
  "20-coins",
  "20-coins-grand-gold-edition",
  "24-coins",
  "25-coins",
  "25-coins-grand-gold-edition",
  "25-coins-x3000",
  "30-coins",
  "30-coins-grand-gold-edition",
  "36-coins",
  "36-coins-grand-gold-edition",
  "9-balls",
  "9-bells",
  "9-burning-dragons",
  "9-burning-stars",
  "9-coins",
  "9-coins-1000-edition",
  "9-coins-extremely-light",
  "9-coins-grand-diamond-edition",
  "9-coins-grand-gold-edition",
  "9-coins-grand-platinum-edition",
  "9-lions-hold-the-jackpot",
  "bumba-meu-boi-coin",
  "burning-sun",
  "burning-sun-extremely-light",
  "cash-grotto",
  "dwarfs-fortune",
  "easter-coins",
  "haunted-coins-x1000",
  "hot-slot-magic-pearls",
  "magic-fruit-cherries",
  "magic-fruit-oranges",
  "mighty-symbols-jokers",
  "mighty-wild-gorilla",
  "mighty-wild-jaguar",
  "mighty-wild-panther-grand-diamond-edition",
  "mighty-wild-panther-grand-gold-edition",
  "mighty-wild-panther-grand-platinum-edition",
  "moon-of-fortune",
  "one-coin",
  "power-of-gods-valhalla",
  "power-of-gods-valhalla-extremely-light",
  "prosperity-pearls",
  "sizzling-moon",
  "sun-of-fortune",
  "throne-of-elements-platinum",
] as const;

const explicitCollectGames: Record<string, string> = {
  "9-lions": "Official page identifies Lions Bonus as a Hold & Collect feature.",
  "beauty-fruity": "Official page says the bonus goal is to collect as many locked girl symbols as possible.",
  "burning-stars-3": "Official page says Bonus symbols stay locked and the goal is to collect as many as possible.",
  "butterfly-lovers": "Official page says the slot is based on collecting token sets that unlock its bonus features.",
  "larry-the-leprechaun": "Official page describes collecting coin and sack symbols in bonus-matrix counters to trigger features.",
  "mighty-fish-blue-marlin": "Official page lists Collect to Infinity as a core feature.",
  "valentines-coins": "Official page says collected symbols remain locked during the respin-based Love the Jackpot bonus.",
};

const records: Record<string, CatalogResearch> = {};

for (const game of holdTheJackpotGames) {
  records[`wazdan-${game}`] = {
    mechanics: ["Сбор символов"],
    source: `https://wazdan.com/games/${game}`,
    verifiedAt,
    evidence:
      "Official game page lists Hold the Jackpot; Wazdan describes this bonus family as respins where new Bonus symbols are held/accumulated toward the round result.",
  };
}

for (const [game, evidence] of Object.entries(explicitCollectGames)) {
  records[`wazdan-${game}`] = {
    mechanics: ["Сбор символов"],
    source: `https://wazdan.com/games/${game}`,
    verifiedAt,
    evidence,
  };
}

export function getCatalogResearchWazdanMechanicsTail(slug: string) {
  return records[slug];
}
