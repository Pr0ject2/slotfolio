import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-20";

const sources: Record<string, string> = {
  "push-gaming-10-flaming-bisons": "https://www.pushgaming.com/blog/push-gaming-x-machine-slot-online-10-flaming-bisons-q.html",
  "push-gaming-10-santas-reindeers": "https://www.pushgaming.com/games/10-santas-reindeers.html",
  "push-gaming-10-swords": "https://www.pushgaming.com/blog/push-gaming-wields-instant-cash-prizes-10-swords.html",
  "push-gaming-3-liberty-eagles": "https://www.pushgaming.com/games/3-liberty-eagles.html",
  "push-gaming-bait-n-bank": "https://www.pushgaming.com/games/bait-n-bank.html",
  "push-gaming-boss-bear": "https://www.pushgaming.com/blog/q-game-producer-craig-turner-speaks-online-slot.html",
  "push-gaming-candy-blast": "https://www.pushgaming.com/blog/push-gaming-multiplies-sweetness-candy-blast.html",
  "push-gaming-cats-of-olympuss": "https://www.pushgaming.com/blog/push-gaming-unleashes-divine-felines-cats-olympuss.html",
  "push-gaming-deadly-5": "https://www.pushgaming.com/blog/push-gaming-heads-old-west-deadly-5.html",
  "push-gaming-diamond-supernova-100": "https://www.pushgaming.com/games/diamond-supernova-100.html",
  "push-gaming-diamond-supernova-20": "https://www.pushgaming.com/games/diamond-supernova-20.html",
  "push-gaming-diamond-supernova-40": "https://www.pushgaming.com/games/diamond-supernova-40.html",
  "push-gaming-diamond-supernova-5": "https://www.pushgaming.com/games/diamond-supernova-5.html",
  "push-gaming-dino-p-d": "https://www.pushgaming.com/games/dino-pd.html",
  "push-gaming-dj-fox": "https://www.pushgaming.com/blog/q-game-producer-craig-turner-speaks-online-slot.html",
  "push-gaming-fat-banker": "https://www.pushgaming.com/games/fat-banker.html",
  "push-gaming-fire-hopper": "https://www.pushgaming.com/blog/push-gaming-sets-reels-ablaze-fire-hopper.html",
  "push-gaming-fish-n-nudge-big-catch": "https://www.pushgaming.com/games/fish-n-nudge-big-catch.html",
  "push-gaming-generous-jack": "https://www.pushgaming.com/blog/push-gaming-introduces-another-highly-engaging-mechanic-generous-jack.html",
  "push-gaming-giga-jar": "https://www.pushgaming.com/blog/push-gamings-giga-jar-back-solo-slot-outing.html",
  "push-gaming-goat-getter": "https://www.pushgaming.com/blog/push-gaming-scales-slot-summit-quest-elusive-mountain-goats-its-latest-pay-anywhere-title-goat-getter.html",
  "push-gaming-hearts-highway": "https://www.pushgaming.com/blog/push-gaming-reimagines-classic-slot-machines-hearts-highway.html",
  "push-gaming-jiggys-pot-o-gold": "https://www.pushgaming.com/games/jiggys-pot-o-gold.html",
  "push-gaming-mad-cars": "https://www.pushgaming.com/blog/q-game-producer-ihor-lozinskiy-speaks-fruity-slots.html",
  "push-gaming-masked-mayhem": "https://www.pushgaming.com/games/masked-mayhem.html",
  "push-gaming-mystery-mission-to-the-moon": "https://www.pushgaming.com/blog/push-gaming-blast-space-themed-sequel-mystery-mission-moon.html",
  "push-gaming-power-vault": "https://www.pushgaming.com/blog/push-gaming-cracks-code-power-vault.html",
  "push-gaming-rat-king": "https://www.pushgaming.com/blog/push-gaming-blends-retro-themes-innovative-gameplay-rat-king.html",
  "push-gaming-retro-sweets": "https://www.pushgaming.com/blog/push-gaming-releases-sugary-sequel-retro-sweets.html",
  "push-gaming-santa-hopper": "https://www.pushgaming.com/games/santa-hopper.html",
  "push-gaming-shamrock-saints": "https://www.pushgaming.com/blog/push-gaming-explores-rarely-seen-side-leprechauns-shamrock-saints.html",
  "push-gaming-tarot-treasures": "https://www.pushgaming.com/games/tarot-treasures.html",
  "push-gaming-wild-swarm": "https://www.pushgaming.com/blog/push-gaming-set-create-further-buzz-wild-swarm-release.html",
  "push-gaming-wild-swarm-2": "https://www.pushgaming.com/blog/push-gaming-creates-buzz-sequel-wild-swarm-2.html",
  "push-gaming-wild-swarm-3-chocolate-eggs": "https://www.pushgaming.com/blog/push-gaming-brings-sting-spring-release-wild-swarm-3-chocolate-eggs.html",
  "push-gaming-wild-swarm-triple-hive": "https://www.pushgaming.com/blog/q-head-studio-ihor-lozinskiy-speaks-askgamblers.html",
};

const gameTypes = Object.fromEntries(
  Object.entries(sources).map(([slug, source]) => [slug, { gameType: "Slots", source, verifiedAt }]),
) as Record<string, CatalogVerifiedGameType>;

export function getVerifiedCatalogGameTypePushScore6(slug: string) {
  return gameTypes[slug];
}
