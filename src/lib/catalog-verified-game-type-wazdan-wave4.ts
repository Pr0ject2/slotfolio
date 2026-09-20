import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";
import { getVerifiedCatalogGameTypeWazdanQualityPass4 } from "./catalog-verified-game-type-wazdan-quality-pass-4";

const verifiedAt = "2026-09-12";
const verifiedAtScore5 = "2026-09-19";

const sources: Record<string, string> = {
  "wazdan-space-gem": "https://wazdan.com/games/space-gem",
  "wazdan-space-spins": "https://wazdan.com/games/space-spins",
  "wazdan-spectrum": "https://wazdan.com/games/spectrum",
  "wazdan-sun-of-fortune": "https://wazdan.com/games/sun-of-fortune",
  "wazdan-super-hot": "https://wazdan.com/games/super-hot",
  "wazdan-throne-of-elements-platinum": "https://wazdan.com/games/throne-of-elements-platinum",
  "wazdan-mighty-wild-panther-grand-diamond-edition": "https://wazdan.com/games/mighty-wild-panther-grand-diamond-edition",
  "wazdan-triple-star": "https://wazdan.com/games/triple-star",
  "wazdan-unicorn-reels": "https://wazdan.com/games/unicorn-reels",
  "wazdan-valhalla": "https://wazdan.com/games/valhalla",
  "wazdan-vegas-hot": "https://wazdan.com/games/vegas-hot",
  "wazdan-vegas-reels-ii": "https://wazdan.com/games/vegas-reels-ii",
  "wazdan-welcome-to-hell-81": "https://wazdan.com/games/welcome-to-hell-81",
  "wazdan-wild-girls": "https://wazdan.com/games/wild-girls",
  "wazdan-wild-guns": "https://wazdan.com/games/wild-guns",
  "wazdan-wild-jack": "https://wazdan.com/games/wild-jack",
  "wazdan-wild-jack-81": "https://wazdan.com/games/wild-jack-81",
};

const score5Sources: Record<string, string> = {
  "wazdan-arcade": "https://wazdan.com/games/arcade",
  "wazdan-back-to-the-70s": "https://wazdan.com/games/back-to-the-70s",
  "wazdan-black-hawk": "https://wazdan.com/games/black-hawk",
  "wazdan-black-horse-cash-out-edition": "https://wazdan.com/games/black-horse-cash-out-edition",
  "wazdan-fenix-play-27": "https://wazdan.com/games/fenix-play-27",
  "wazdan-hot-777": "https://wazdan.com/games/hot-777",
  "wazdan-relic-hunters-and-the-book-of-faith": "https://wazdan.com/games/relic-hunters-and-the-book-of-faith",
  "wazdan-turbo-play": "https://wazdan.com/games/turbo-play",
};

const gameTypes = Object.fromEntries(
  Object.entries(sources).map(([slug, source]) => [slug, { gameType: "Slots", source, verifiedAt }]),
) as Record<string, CatalogVerifiedGameType>;

const score5GameTypes = Object.fromEntries(
  Object.entries(score5Sources).map(([slug, source]) => [
    slug,
    { gameType: "Slots", source, verifiedAt: verifiedAtScore5 },
  ]),
) as Record<string, CatalogVerifiedGameType>;

export function getVerifiedCatalogGameTypeWazdanWave4(slug: string) {
  return getVerifiedCatalogGameTypeWazdanQualityPass4(slug) ?? gameTypes[slug] ?? score5GameTypes[slug];
}
