import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "playn-go-agent-destiny": {
    mechanics: ["Линии", "Трансформация символов"],
    source: "https://www.playngo.com/games/agent-destiny",
    verifiedAt,
    evidence: "Official game page says stacked matching symbols can merge into Mega Symbols during Linked Reels, while wins are formed on paylines.",
  },
  "playn-go-doom-of-egypt": {
    mechanics: ["Линии", "Расширяющиеся символы"],
    source: "https://www.playngo.com/games/doom-of-egypt",
    verifiedAt,
    evidence: "Official game page says the selected Free Spins symbol expands and awards payline wins even when matching symbols are not adjacent.",
  },
  "playn-go-fortune-teller": {
    mechanics: ["Pick-and-click", "Трансформация символов"],
    source: "https://www.playngo.com/games/fortune-teller",
    verifiedAt,
    evidence: "Official game page describes a pick-and-click card bonus and says the Black Cat Scatter becomes a Wild during Free Spins.",
  },
  "playn-go-golden-legend": {
    mechanics: ["Линии", "Множители"],
    source: "https://www.playngo.com/games/golden-legend",
    verifiedAt,
    evidence: "Official game page describes selectable active lines and an optional Gamble round that doubles or quadruples the prize.",
  },
  "playn-go-imperial-opera": {
    mechanics: ["Линии", "Трансформация символов"],
    source: "https://www.playngo.com/post/hit-the-high-notes-with-play-n-go-s-imperial-opera",
    verifiedAt,
    evidence: "Official release describes a 20-payline slot and the Crescendo feature converting every symbol on one or two reels into Wilds.",
  },
  "playn-go-irish-gold": {
    mechanics: ["Линии", "Множители"],
    source: "https://www.playngo.com/post/top-gold-games-at-play-n-go",
    verifiedAt,
    evidence: "Official Play’n GO editorial states that Pots of Gold can increase potential up to x25.",
  },
  "playn-go-jolly-roger": {
    mechanics: ["Линии", "Множители"],
    source: "https://www.playngo.com/games/jolly-roger",
    verifiedAt,
    evidence: "Official game page describes active-line bonus triggers and states that winning combinations containing a Wild pay double the normal prize.",
  },
  "playn-go-legacy-of-inca": {
    mechanics: ["Способы", "Бонусное колесо"],
    source: "https://www.playngo.com/post/legacy-of-inca",
    verifiedAt,
    evidence: "Official release describes multiple payways and the Wheel of the Gods, which determines the number of Free Spins and can return during Temple Spins.",
  },
  "playn-go-muerto-en-mictlan": {
    mechanics: ["Расширяющиеся символы"],
    source: "https://www.playngo.com/games/muerto-en-mictl%C3%A1n",
    verifiedAt,
    evidence: "Official game page describes level-specific Wild features and exposes the Expanding Wild among the game's official feature assets.",
  },
  "playn-go-pimped": {
    mechanics: ["Win Spins™", "Множители"],
    source: "https://www.playngo.com/games/pimped",
    verifiedAt,
    evidence: "Official game page describes Win Spins and an optional Gamble round that doubles a prize for a correct colour or quadruples it for a correct suit.",
  },
  "playn-go-rally-4-riches": {
    mechanics: ["Линии", "Множители", "Респины"],
    source: "https://www.playngo.com/games/rally-4-riches",
    verifiedAt,
    evidence: "Official game page describes winning lines, x2–x10 multipliers, and a Bonus Reel re-spin that can award a multiplier.",
  },
};

export function getCatalogResearchPlayngoFillMechanics7(slug: string) {
  return records[slug];
}
