import type { CatalogResearch } from "./catalog-research";

const records: Record<string, CatalogResearch> = {
  "playn-go-invading-vegas": {
    mechanics: ["Lock On Re-Spin", "Респины", "Walking Wilds", "Расширяющиеся символы"],
    source: "https://www.playngo.com/games/invading-vegas",
    verifiedAt: "2026-09-18",
    evidence: "Official Play’n GO page explicitly lists Re-Spins, Walking Wilds and Expanding Wilds, alongside the Lock On Re-Spin feature.",
  },
};

export function getCatalogResearchPlayngoScore3Fill(slug: string) {
  return records[slug];
}
