import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";
import { getVerifiedCatalogGameTypeHacksawProviderWide2 } from "./catalog-verified-game-type-hacksaw-provider-wide-2";
import { getVerifiedCatalogGameTypeHacksawQualityPass6 } from "./catalog-verified-game-type-hacksaw-quality-pass-6";
import { getVerifiedCatalogGameTypeHacksawScore6 } from "./catalog-verified-game-type-hacksaw-score6";

const verifiedAt = "2026-09-13";
const verifiedAtCurrent = "2026-09-24";

const sources: Record<string, string> = {
  "hacksaw-gaming-pray-for-three": "https://www.hacksawgaming.com/games/pray-for-three",
  "hacksaw-gaming-rise-of-fortuna": "https://www.hacksawgaming.com/games/rise-of-fortuna",
  "hacksaw-gaming-sixsixsix": "https://www.hacksawgaming.com/games/sixsixsix",
  "hacksaw-gaming-spear-of-athena": "https://www.hacksawgaming.com/games/spear-of-athena",
  "hacksaw-gaming-spinman": "https://www.hacksawgaming.com/games/spinman",
  "hacksaw-gaming-stormborn": "https://www.hacksawgaming.com/games/stormborn",
  "hacksaw-gaming-strength-of-hercules": "https://www.hacksawgaming.com/games/strength-of-hercules",
  "hacksaw-gaming-the-count": "https://www.hacksawgaming.com/games/the-count",
  "hacksaw-gaming-the-wildwood-curse": "https://www.hacksawgaming.com/games/the-wildwood-curse",
  "hacksaw-gaming-tiger-legends": "https://www.hacksawgaming.com/games/tiger-legends",
  "hacksaw-gaming-toshi-ways-club": "https://www.hacksawgaming.com/games/toshi-ways-club",
  "hacksaw-gaming-ultimate-slot-of-america": "https://www.hacksawgaming.com/games/ultimate-slot-of-america",
  "hacksaw-gaming-wings-of-horus": "https://www.hacksawgaming.com/games/wings-of-horus",
  "hacksaw-gaming-zeus-ze-zecond": "https://www.hacksawgaming.com/games/zeus-ze-zecond",
};

const gameTypes = Object.fromEntries(
  Object.entries(sources).map(([slug, source]) => [slug, { gameType: "Slots", source, verifiedAt }]),
) as Record<string, CatalogVerifiedGameType>;

const currentGameTypes: Record<string, CatalogVerifiedGameType> = {
  "hacksaw-gaming-3-cursed-chests-hold-and-win": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/3-cursed-chests%3A-hold-%26-win", verifiedAt: verifiedAtCurrent },
  "hacksaw-gaming-arizona-james-and-the-lost-relics": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/arizona-james-and-the-lost-relics", verifiedAt: verifiedAtCurrent },
  "hacksaw-gaming-beast-below": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/beast-below", verifiedAt: verifiedAtCurrent },
  "hacksaw-gaming-benny-the-beer": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/benny-the-beer", verifiedAt: verifiedAtCurrent },
  "hacksaw-gaming-cursed-crypt": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/cursed-crypt", verifiedAt: verifiedAtCurrent },
  "hacksaw-gaming-red-rascal": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/red-rascal", verifiedAt: verifiedAtCurrent },
  "hacksaw-gaming-sand-and-ashes": { gameType: "Slots", source: "https://www.hacksawgaming.com/games/sand-and-ashes", verifiedAt: verifiedAtCurrent },
};

export function getVerifiedCatalogGameTypeHacksawFinal(slug: string) {
  return getVerifiedCatalogGameTypeHacksawScore6(slug) ?? getVerifiedCatalogGameTypeHacksawProviderWide2(slug) ?? getVerifiedCatalogGameTypeHacksawQualityPass6(slug) ?? currentGameTypes[slug] ?? gameTypes[slug];
}
