import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-23";

const records: Record<string, CatalogResearch> = {
  "playn-go-demon": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/demon",
    verifiedAt,
    evidence: "Official Play’n GO page states that the One Helluva Night feature awards Free Spins and can lead into nested Free Spins.",
  },
  "playn-go-invading-vegas-revenge-on-mars": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/invading-vegas-revenge-on-mars",
    verifiedAt,
    evidence: "Official Play’n GO release states that three Space Car Scatters award twelve retriggerable Free Spins.",
  },
  "playn-go-jolly-roger": {
    mechanics: ["Wilds"],
    source: "https://www.playngo.com/games/jolly-roger",
    verifiedAt,
    evidence: "Official Play’n GO page explicitly states that winning combinations containing a Wild pay double the normal prize.",
  },
  "playn-go-rage-to-riches": {
    mechanics: ["Free Spins"],
    source: "https://www.playngo.com/games/rage-to-riches",
    verifiedAt,
    evidence: "Official Play’n GO page states that three Girl symbols trigger the Free Spins feature, with additional spins available during the round.",
  },
  "playn-go-infernal-trinity-go-guaranteed": {
    mechanics: ["GO Guaranteed"],
    source: "https://www.playngo.com/games/infernal-trinity-go-guaranteed",
    verifiedAt,
    evidence: "Official Play’n GO page identifies GO Guaranteed as a separate ladder mechanic that advances through guaranteed-win stages when all three Tear Scatter colours land together.",
  },
  "playn-go-playn-go-mole-digger": {
    mechanics: ["Mine Cart Cash Collect"],
    source: "https://www.playngo.com/games/play%27n-go-mole-digger",
    verifiedAt,
    evidence: "Official Play’n GO page describes Mine Cart Cash Collect as a separate random base-game feature that gathers visible cash Gem values.",
  },
};

export function getCatalogResearchPlayngoFillMechanics26(slug: string) {
  return records[slug];
}
