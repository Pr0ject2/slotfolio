import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-20";

const records: Record<string, CatalogResearch> = {
  "playn-go-beasts-of-fire-maximum": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/beasts-of-fire-maximum",
    verifiedAt,
    evidence: "Official Play’n GO page says three Scatters trigger Maximum Free Spins after the reels expand to their maximum height.",
  },
  "playn-go-bullion-xpress": {
    mechanics: ["Fortune Frenzy", "Bonus Blitz"],
    source: "https://www.playngo.com/games/bullion-xpress",
    verifiedAt,
    evidence: "Official Play’n GO page describes Fortune Frenzy collecting values from four reward carriages and Bonus Blitz transforming play into an 8-column two-row bonus display with carriage rewards.",
  },
  "playn-go-gigantoonz": {
    mechanics: ["Mega Symbols"],
    source: "https://www.playngo.com/games/gigantoonz",
    verifiedAt,
    evidence: "Official Play’n GO page says Gigantoonz uses Mega Symbols whose cluster value is higher and which split into single symbols when they cannot fit the available space.",
  },
  "playn-go-lordi-reel-monsters": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/lordi-reel-monsters",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly describes a Free Spins feature in which the player picks one of two Lordi songs before the feature plays out on the grid.",
  },
  "playn-go-love-is-in-the-fair": {
    mechanics: ["Wilds", "Множители", "Stacked Scatters", "Free Spins"],
    source: "https://www.playngo.com/games/love-is-in-the-fair",
    verifiedAt,
    evidence: "Official Play’n GO page describes Multiplier Wilds up to x100, stacked Romantic Pics Scatters and a Free Spins feature whose multiplier increases as more Romantic Pics are collected.",
  },
};

export function getCatalogResearchPlayngoScore5ProviderPass4(slug: string) {
  return records[slug];
}
