import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-24";

const records: Record<string, CatalogResearch> = {
  "playn-go-5x-magic": {
    mechanics: ["5x Wild Multiplier", "Scatter Wins"],
    source: "https://www.playngo.com/games/5x-magic",
    verifiedAt,
    evidence: "Official game page states that the 5x symbol is Wild, multiplies wins by x5 or x25 depending on count, and two or more Scatter symbols anywhere on the reels constitute a win.",
  },
  "playn-go-cat-wilde-and-the-lost-chapter": {
    mechanics: ["Pyramid Spins", "Expanding Symbols"],
    source: "https://www.playngo.com/games/cat-wilde-and-the-lost-chapter",
    verifiedAt,
    evidence: "Official game page names Pyramid Spins and states that two or more Scatter symbols during the feature unlock Expanding Symbols.",
  },
  "playn-go-dansband-pa-turne": {
    mechanics: ["Full Reel Wilds", "Spin Multipliers", "Progressive Free Spins"],
    source: "https://www.playngo.com/games/dansband-p%C3%A5-turn%C3%A9",
    verifiedAt,
    evidence: "Official game page names Full Reel Wilds, randomised Spin Multipliers and Progressive Free Spins whose multiplier carries over and increases during the feature.",
  },
  "playn-go-doom-of-egypt": {
    mechanics: ["Special Expanding Symbol", "Retriggers"],
    source: "https://www.playngo.com/games/doom-of-egypt",
    verifiedAt,
    evidence: "Official game page states that Free Spins select a Special Expanding symbol and that landing three Scarabs during Free Spins retriggers the feature.",
  },
  "playn-go-fortune-teller": {
    mechanics: ["Pick-and-click Bonus"],
    source: "https://www.playngo.com/games/fortune-teller",
    verifiedAt,
    evidence: "Official game page describes the Bonus Feature as a pick-and-click game where the player turns over hidden cards and matches them.",
  },
  "playn-go-free-reelin-joker-1000": {
    mechanics: ["Expanding Reels", "Free Re-Spins"],
    source: "https://www.playngo.com/games/free-reelin%27-joker-1000",
    verifiedAt,
    evidence: "Official game page explicitly names Expanding Reels and Free Re-Spins, including the Joker reel expansion and a free re-spin for landing three zeros.",
  },
  "playn-go-irish-gold": {
    mechanics: ["Pots of Gold"],
    source: "https://www.playngo.com/post/top-gold-games-at-play-n-go",
    verifiedAt,
    evidence: "Official Play'n GO editorial for Irish Gold states that landing Pots of Gold can increase potential up to x25.",
  },
  "playn-go-kings-mask": {
    mechanics: ["Free Spins Choice", "Множители"],
    source: "https://www.playngo.com/games/king%27s-mask",
    verifiedAt,
    evidence: "Official game page states that players choose between three Free Spins features with 15, 10 or 5 spins and different multipliers.",
  },
  "playn-go-lucky-diamonds": {
    mechanics: ["Diamond Wild Multipliers"],
    source: "https://www.playngo.com/games/lucky-diamonds",
    verifiedAt,
    evidence: "Official game page states that Diamond is Wild, one Diamond doubles a normal prize and two Diamonds quadruple it except for a three-Diamond combination.",
  },
  "playn-go-muerto-en-mictlan": {
    mechanics: ["Wild Feature Choice", "Expanding Wild", "Sticky Wild", "Walking Wild"],
    source: "https://www.playngo.com/games/muerto-en-mictl%C3%A1n",
    verifiedAt,
    evidence: "Official game page states that each level has a unique Wild feature and players choose the Wild-feature path; official game assets identify Expanding, Sticky and Walking Wild variants.",
  },
  "playn-go-pimped": {
    mechanics: ["Win Spins™", "Retriggers", "Gamble"],
    source: "https://www.playngo.com/games/pimped",
    verifiedAt,
    evidence: "Official game page names Win Spins™, states the feature can be retriggered up to 20 spins, and documents an optional Gamble round that doubles or quadruples prizes for correct guesses.",
  },
};

export function getCatalogResearchPlayngoFillMechanics27(slug: string) {
  return records[slug];
}
