import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-14";

type SourcedCatalogResearch = CatalogResearch & {
  evidenceSource?: string;
};

const research: Record<string, SourcedCatalogResearch> = {
  "3-oaks-gaming-3-jewel-crowns": {
    mechanics: ["Сбор символов"],
    source: "https://3oaks.com/game/3_jewel_crowns",
    verifiedAt,
    evidence: "Official page states that matching Crown symbols fill three Crown Metres, which trigger Free Spins and their linked features.",
  },
  "3-oaks-gaming-sky-pearls": {
    mechanics: ["Сбор символов"],
    source: "https://3oaks.com/game/sky_pearls",
    evidenceSource: "https://3oaks.com/news/new-release-sky-pearls",
    verifiedAt,
    evidence: "Official release states that the Pearl of Wisdom accumulates Pearl Symbols, while the bonus round collects sticky Pearls and rewards collecting all 16 Bonus Symbols.",
  },
};

export function getCatalogResearch3OaksQualityPass18(slug: string) {
  return research[slug];
}
