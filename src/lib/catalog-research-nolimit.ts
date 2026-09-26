import type { CatalogResearch } from "./catalog-research";

const verifiedAtLatest = "2026-09-26";

export const catalogResearchNolimit: Record<string, CatalogResearch> = {
  "nolimit-city-ding-dong-death": {
    mechanics: ["Bonus Buy", "Action Spin"],
    source: "https://fan-dev.nolimitcity.com/affiliates-info",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Nolimit City affiliate technical feed marks Ding Dong Death with hasBonusBuy=true and hasActionSpin=true. The official game page separately documents its Death Meter, xNudge and extra-spin feature set.",
  },
  "nolimit-city-duck-hunters-2": {
    mechanics: ["Способы", "Bonus Buy", "Action Spin"],
    source: "https://fan-dev.nolimitcity.com/affiliates-info",
    verifiedAt: verifiedAtLatest,
    evidence: "Official Nolimit City affiliate technical feed marks Duck Hunters 2 with hasBonusBuy=true and hasActionSpin=true. The official game page separately documents Scatter Wins and its xWays/Infectious xWays feature set.",
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
