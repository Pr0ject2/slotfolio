import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-17";

const records: Record<string, CatalogResearch> = {
  "playn-go-fulong-88": {
    mechanics: ["Трансформация символов"],
    source: "https://www.playngo.com/games/fulong-88",
    verifiedAt,
    evidence: "Official Play’n GO page says activated high-paying symbols transform their matching reel symbols into Golden versions with upgraded payouts.",
  },
  "playn-go-gates-of-troy": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/gates-of-troy",
    verifiedAt,
    evidence: "Official Play’n GO page says Wilds landed during Free Spins are tracked and accumulated, then added back to the reels on the tenth spin.",
  },
  "playn-go-ghost-of-dead": {
    mechanics: ["Расширяющиеся символы"],
    source: "https://www.playngo.com/games/ghost-of-dead",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes a Special Expanding Symbol that expands to cover the reel when it creates a win.",
  },
  "playn-go-gold-of-fortune-god": {
    mechanics: ["Бонусное колесо"],
    source: "https://www.playngo.com/games/gold-of-fortune-god",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes the Dragon’s Fortune Multiplier Wheel and up to three wheel spins.",
  },
  "playn-go-golden-caravan": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/golden-caravan",
    verifiedAt,
    evidence: "Official Play’n GO page says all Free Spins wins are multiplied and the multiplier increases whenever three camel symbols land.",
  },
  "playn-go-golden-colts": {
    mechanics: ["Pick-and-click"],
    source: "https://www.playngo.com/games/golden-colts",
    verifiedAt,
    evidence: "Official Play’n GO page describes the Most Wanted feature where players select posters one by one to reveal hidden prizes and bonus features.",
  },
  "playn-go-grim-muerto": {
    mechanics: ["Pick-and-click"],
    source: "https://www.playngo.com/games/grim-muerto",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes a Second Chance pick-and-click feature where a Mariachi Band member is selected to reveal a prize.",
  },
  "playn-go-invading-vegas-las-christmas": {
    mechanics: ["Lock On Re-Spin"],
    source: "https://www.playngo.com/games/invading-vegas%3A-las-christmas",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes the Lock On Re-spin mode, which locks matching stacks and re-spins the third reel.",
  },
  "playn-go-kings-mask": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/king%27s-mask",
    verifiedAt,
    evidence: "Official Play’n GO page says each selectable Free Spins mode carries a different multiplier.",
  },
  "playn-go-kings-mask-eclipse-of-gods": {
    mechanics: ["Множители"],
    source: "https://www.playngo.com/games/king%27s-mask-eclipse-of-gods",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes Multiplier Wilds that multiply wins by up to x2.",
  },
};

export function getCatalogResearchPlayngoMechanicsFinal2(slug: string) {
  return records[slug];
}
