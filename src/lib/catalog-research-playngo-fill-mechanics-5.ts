import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "playn-go-fates-fortune": {
    mechanics: ["Сбор символов", "Бонусное колесо", "Трансформация символов", "Расширяющиеся символы", "Блокировка символов"],
    source: "https://www.playngo.com/games/fate%27s-fortune",
    verifiedAt,
    evidence: "Official game page describes collecting Ulysses/Scatters, Poseidon's Wheel, arrows transforming symbols into Wilds or Expanding Wilds, and Sticky/Sticky Expanding Wild outcomes in bonus play.",
  },
  "playn-go-gnawn-gold": {
    mechanics: ["Сбор символов", "Множители"],
    source: "https://www.playngo.com/games/gnaw%27n-gold",
    verifiedAt,
    evidence: "Official game page describes persistent Collector progression and Beaver Spins levels that upgrade the Multiplier as more Collectors land.",
  },
  "playn-go-lab-of-madness-its-a-wild": {
    mechanics: ["Расширяющиеся символы", "Респины", "Множители"],
    source: "https://www.playngo.com/games/lab-of-madness-it%27s-a-wild%21",
    verifiedAt,
    evidence: "Official game page explicitly lists Expanding Wilds, Walking Wilds that trigger a re-spin with every move, and x2/x3/x5 Multiplier Wilds.",
  },
  "playn-go-monkey-battle-for-the-scrolls": {
    mechanics: ["Способы", "Сбор символов", "Pick-and-click", "Множители"],
    source: "https://www.playngo.com/games/monkey%3A-battle-for-the-scrolls",
    verifiedAt,
    evidence: "Official game/release material gives up to 7,776 Way Wins, collecting Scripture Scatters, choosing one of four characters for Free Spins, and multiplier values tied to the chosen/triggered features.",
  },
  "playn-go-mount-m": {
    mechanics: ["Расширяющиеся барабаны", "Трансформация символов", "Респины", "Сбор символов"],
    source: "https://www.playngo.com/games/mount-m",
    verifiedAt,
    evidence: "Official game page describes collecting Wild orbs to expand reel blocks, transforming high-paying symbols into Mammoths, and Wild-triggered re-spins that unlock more reel expansions.",
  },
  "playn-go-prissy-princess": {
    mechanics: ["Сбор символов", "Трансформация символов", "Pick-and-click", "Множители"],
    source: "https://www.playngo.com/games/prissy-princess",
    verifiedAt,
    evidence: "Official game page describes collected locks/Banner Scatters, Dragon's Breath converting symbols into Wilds, Tournament player choices, and treasure rewards expressed as bet/win multipliers.",
  },
  "playn-go-rage-to-riches": {
    mechanics: ["Сбор символов", "Респины", "Pick-and-click"],
    source: "https://www.playngo.com/games/rage-to-riches",
    verifiedAt,
    evidence: "Official game page describes collecting five bonus stars, selecting a monster/buildings in the bonus game, and a monster-triggered re-spin during Free Spins after three consecutive non-winning spins.",
  },
};

export function getCatalogResearchPlayngoFillMechanics5(slug: string) {
  return records[slug];
}
