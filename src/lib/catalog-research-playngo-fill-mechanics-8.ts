import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-18";

const records: Record<string, CatalogResearch> = {
  "playn-go-ras-reckoning": {
    mechanics: ["Кластеры", "Каскады", "Mega Drop"],
    source: "https://www.playngo.com/games/ra%27s-reckoning",
    verifiedAt,
    evidence: "Official game page describes Cascading Cluster Wins on a 6×5 grid and Mega Drop, which clears all matching regular symbols when a cluster lands.",
  },
};

export function getCatalogResearchPlayngoFillMechanics8(slug: string) {
  return records[slug];
}
