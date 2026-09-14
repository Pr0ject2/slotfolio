import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-14";

const research: Record<string, CatalogResearch> = {
  "3-oaks-gaming-crystal-scarabs": {
    mechanics: ["Сбор символов"],
    source: "https://3oaks.com/game/crystal_scarabs",
    verifiedAt,
    evidence: "Official page states that BONUS SYMBOL values are collected when they land together with the BOOST SYMBOL.",
  },
  "3-oaks-gaming-super-hotfire-diamonds": {
    mechanics: ["Сбор символов"],
    source: "https://3oaks.com/game/super_hotfire_diamonds",
    verifiedAt,
    evidence: "Official page identifies a COLLECT SYMBOL that gathers values from visible BONUS SYMBOLS.",
  },
  "3-oaks-gaming-thunder-tiger": {
    mechanics: ["Сбор символов"],
    source: "https://3oaks.com/game/thunder_tiger",
    verifiedAt,
    evidence: "Official page states that the COLLECT SYMBOL absorbs all visible values in the bonus game.",
  },
};

export function getCatalogResearch3OaksQualityPass17(slug: string) {
  return research[slug];
}
