import type { CatalogResearch } from "./catalog-research";

const verifiedAt = "2026-09-15";

type SourcedCatalogResearch = CatalogResearch & {
  evidenceSource?: string;
};

const research: Record<string, SourcedCatalogResearch> = {
  "playn-go-diamonds-of-the-realm": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/diamonds-of-the-realm",
    verifiedAt,
    evidence: "Official Play'n GO release states that during Free Spins players collect Scatter Diamonds to earn more spins and increase the active multiplier.",
    evidenceSource: "https://www.playngo.com/posts/playngo-impress-with-their-latest-quest-to-camelot",
  },
  "playn-go-divina-commedia-i-nove-cerchi": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/divina-commedia-i-nove-cerchi",
    verifiedAt,
    evidence: "Official game page states that Lanterns are collected during Free Spins to upgrade modifiers and extend the feature.",
  },
  "playn-go-leprechauns-diamond-dig": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/leprechaun's-diamond-dig",
    verifiedAt,
    evidence: "Official game page states that Lucky Minecarts collect Diamond symbols and that collected Lucky Clovers advance the Mega Blast Multiplier Meter.",
  },
  "playn-go-midnight-gold": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/midnight-gold",
    verifiedAt,
    evidence: "Official game page describes the Deliver feature, where a Deliver symbol on reel five awards all Cash symbols currently in view.",
  },
  "playn-go-playn-go-mole-digger": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/play'n-go-mole-digger",
    verifiedAt,
    evidence: "Official game page states that coloured Gems fill feature pots, Mine Carts collect cash Gem values, and the Collect enhancement gathers all cash values in view.",
  },
  "playn-go-playn-go-wrappin-gold": {
    mechanics: ["Сбор символов"],
    source: "https://www.playngo.com/games/wrappin'-gold",
    verifiedAt,
    evidence: "Official game page explicitly says to collect Triggering Symbols during the base game to activate different features.",
  },
};

export function getCatalogResearchPlayngoProviderWide7(slug: string) {
  return research[slug];
}
