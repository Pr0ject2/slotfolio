import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-20";
const source = "https://www.hacksawgaming.com/games/slots";

const slugs = [
  "hacksaw-gaming-2-wild-2-die",
  "hacksaw-gaming-cash-crew",
  "hacksaw-gaming-dark-summoning",
  "hacksaw-gaming-ronin-stackways",
  "hacksaw-gaming-vending-machine",
] as const;

const gameTypes = Object.fromEntries(
  slugs.map((slug) => [slug, { gameType: "Slots", source, verifiedAt }]),
) as Record<string, CatalogVerifiedGameType>;

export function getVerifiedCatalogGameTypeHacksawScore6(slug: string) {
  return gameTypes[slug];
}
