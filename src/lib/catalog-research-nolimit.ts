import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-11";
const verifiedAtLatest = "2026-09-24";

export const catalogResearchNolimit: Record<string, CatalogResearch> = {
  "nolimit-city-duck-hunters-2": {
    mechanics: ["Способы"],
    source: "https://nolimitcity.com/games/duck-hunters-2",
    verifiedAt,
    evidence: "Official game page lists xWays and Infectious xWays and explicitly says these mechanics produce additional ways to win.",
  },
  "nolimit-city-gator-hunters-2": {
    mechanics: ["Bonus Buy", "Action Spin"],
    source: "https://fan-dev.nolimitcity.com/affiliates-info",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Nolimit City affiliate technical feed marks Gator Hunters 2 with hasBonusBuy=true and hasActionSpin=true. Public release timing remains sourced separately from the canonical game page.",
  },
};

export function getCatalogResearchNolimit(slug: string) {
  return catalogResearchNolimit[slug];
}
