import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-11";
const verifiedAtLatest = "2026-09-26";

export const catalogResearchNolimit: Record<string, CatalogResearch> = {
  "nolimit-city-ding-dong-death": {
    mechanics: ["Bonus Buy", "Action Spin", "xNudge", "Avalanche"],
    source: "https://fan-dev.nolimitcity.com/affiliates-info",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Nolimit City affiliate technical feed marks Ding Dong Death with hasBonusBuy=true and hasActionSpin=true. The official game page documents xNudge Wild multipliers, Death Meter modes and avalanche progression.",
  },
  "nolimit-city-duck-hunters-2": {
    mechanics: ["Способы", "Bonus Buy", "Action Spin", "xWays", "Infectious xWays"],
    source: "https://fan-dev.nolimitcity.com/affiliates-info",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Nolimit City affiliate technical feed marks Duck Hunters 2 with hasBonusBuy=true and hasActionSpin=true. The official game page documents Scatter Wins, xWays/Infectious xWays and the expanding ways-to-win mechanics.",
  },
  "nolimit-city-gator-hunters-2": {
    mechanics: ["Bonus Buy", "Action Spin"],
    source: "https://fan-dev.nolimitcity.com/affiliates-info",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Nolimit City affiliate technical feed marks Gator Hunters 2 with hasBonusBuy=true and hasActionSpin=true. Public release timing remains sourced separately from the canonical game page.",
  },
  "nolimit-city-six-feet-under": {
    mechanics: ["Bonus Buy", "Action Spin"],
    source: "https://fan-dev.nolimitcity.com/affiliates-info",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Nolimit City affiliate technical feed already classifies Six Feet Under as a slot and marks both hasBonusBuy=true and hasActionSpin=true. Release timing remains sourced from the public game page.",
  },
};

export function getCatalogResearchNolimit(slug: string) {
  return catalogResearchNolimit[slug];
}
