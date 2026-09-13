import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-13";

const sources: Record<string, string> = {
  "hacksaw-gaming-cloud-princess": "https://www.hacksawgaming.com/games/cloud-princess",
  "hacksaw-gaming-dark-spiral": "https://www.hacksawgaming.com/games/dark-spiral",
  "hacksaw-gaming-deal-with-death": "https://www.hacksawgaming.com/games/deal-with-death",
  "hacksaw-gaming-donny-and-danny": "https://www.hacksawgaming.com/games/donny-and-danny",
  "hacksaw-gaming-donut-division": "https://www.hacksawgaming.com/games/donut-division",
  "hacksaw-gaming-dragons-domain": "https://www.hacksawgaming.com/games/dragons-domain",
  "hacksaw-gaming-epic-ze-zeus": "https://www.hacksawgaming.com/games/epic-ze-zeus",
  "hacksaw-gaming-fire-my-laser": "https://www.hacksawgaming.com/games/fire-my-laser",
  "hacksaw-gaming-frkn-bananas": "https://www.hacksawgaming.com/games/frkn-bananas",
  "hacksaw-gaming-great-game-rockies": "https://www.hacksawgaming.com/games/great-game-rockies",
  "hacksaw-gaming-grug-make-fire": "https://www.hacksawgaming.com/games/grug-make-fire",
  "hacksaw-gaming-invictus": "https://www.hacksawgaming.com/games/invictus",
  "hacksaw-gaming-le-bunny": "https://www.hacksawgaming.com/games/le-bunny",
  "hacksaw-gaming-le-hooligan": "https://www.hacksawgaming.com/games/le-hooligan",
  "hacksaw-gaming-le-sortudo": "https://www.hacksawgaming.com/games/le-sortudo",
  "hacksaw-gaming-pray-for-six": "https://www.hacksawgaming.com/games/pray-for-six",
  "hacksaw-gaming-reign-of-rome": "https://www.hacksawgaming.com/games/reign-of-rome",
  "hacksaw-gaming-smoking-dragon": "https://www.hacksawgaming.com/games/smoking-dragon",
  "hacksaw-gaming-sun-princess": "https://www.hacksawgaming.com/games/sun-princess",
  "hacksaw-gaming-superstar-sevens": "https://www.hacksawgaming.com/games/superstar-sevens",
  "hacksaw-gaming-supreme-zeus": "https://www.hacksawgaming.com/games/supreme-zeus",
  "hacksaw-gaming-the-luxe": "https://www.hacksawgaming.com/games/the-luxe",
};

const gameTypes = Object.fromEntries(
  Object.entries(sources).map(([slug, source]) => [slug, { gameType: "Slots", source, verifiedAt }]),
) as Record<string, CatalogVerifiedGameType>;

export function getVerifiedCatalogGameTypeHacksawQualityPass6(slug: string) {
  return gameTypes[slug];
}
