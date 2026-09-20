import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-20";

const records: Record<string, CatalogResearch> = {
  "playn-go-cat-wilde-and-the-lost-chapter": {
    mechanics: ["Random Symbol Selection"],
    source: "https://www.playngo.com/games/cat-wilde-and-the-lost-chapter",
    verifiedAt,
    evidence: "Official page says Pyramid Spins allocate a random symbol on every Free Spin, with the allocated symbol changing from spin to spin before Scatter-driven expanding symbols are applied.",
  },
  "playn-go-def-leppard-hysteria": {
    mechanics: ["Charge Meter"],
    source: "https://www.playngo.com/post/def-leppard-hysteria",
    verifiedAt,
    evidence: "Official Play’n GO release article explicitly describes the game’s triangular charge metre as part of the Hysteria design and feature presentation.",
  },
  "playn-go-mega-don": {
    mechanics: ["Symbol Upgrades"],
    source: "https://www.playngo.com/games/mega-don",
    verifiedAt,
    evidence: "Official game page says three Scatters unlock Free Spins and symbol upgrades, with further Scatters adding more spins and upgrades while retriggers continue the symbol-transformation progression.",
  },
};

export function getCatalogResearchPlayngoScore5ProviderPass6(slug: string) {
  return records[slug];
}
