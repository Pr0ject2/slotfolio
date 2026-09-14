import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-14";

type SourcedCatalogResearch = CatalogResearch & {
  evidenceSource?: string;
};

const research: Record<string, SourcedCatalogResearch> = {
  "playn-go-infernal-trinity-go-guaranteed": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/infernal-trinity-go-guaranteed",
    verifiedAt,
    evidence: "Official game page states that Phoenix Tear Scatter symbols are collected by colour until a phoenix wakes and triggers its feature.",
  },
  "playn-go-jolly-roger": {
    mechanics: ["Линии"],
    source: "https://www.playngo.com/games/jolly-roger",
    verifiedAt,
    evidence: "Official game page states that three or more chest or map symbols on an active line trigger the corresponding bonus round.",
  },
  "playn-go-jolly-roger-wild-kraken": {
    mechanics: ["Каскады"],
    source: "https://www.playngo.com/games/jolly-roger-wild-kraken",
    evidenceSource: "https://www.playngo.com/post/jolly-roger-wild-kraken",
    verifiedAt,
    evidence: "Official release states that players navigate a five-reel grid with cascading symbols and explicitly describes cascading reels.",
  },
};

export function getCatalogResearchPlayngoQualityPass22(slug: string) {
  return research[slug];
}
