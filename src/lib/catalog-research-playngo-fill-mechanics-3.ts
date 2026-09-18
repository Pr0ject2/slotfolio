import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "playn-go-golden-osiris": {
    mechanics: ["Каскады", "Множители", "Сбор символов", "Трансформация символов"],
    source: "https://www.playngo.com/games/golden-osiris",
    verifiedAt,
    evidence: "Official game page describes cascades, multiplier Wilds and an expanding Pyramid multiplier, charging the Pyramid with winning symbols, and converting adjacent symbols into the chosen symbol.",
  },
  "playn-go-cats-and-cash": {
    mechanics: ["Множители", "Бонусное колесо", "Pick-and-click"],
    source: "https://www.playngo.com/games/cats-and-cash",
    verifiedAt,
    evidence: "Official game page says Wild wins pay double, three Wheel symbols trigger the Wheel of Fortune bonus, and three Box symbols trigger a Pick A Box bonus round.",
  },
  "playn-go-idol-of-fortune": {
    mechanics: ["Mystery Symbols", "Pick-and-click"],
    source: "https://www.playngo.com/games/idol-of-fortune",
    verifiedAt,
    evidence: "Official game page describes a Wild Prize mini-game where players match symbols from a selection and a Free Spins choice with Mystery Reels/Mystery Symbols.",
  },
};

export function getCatalogResearchPlayngoFillMechanics3(slug: string) {
  return records[slug];
}
