import type { CatalogVerifiedGameType } from "./catalog-verified-game-type";

const verifiedAt = "2026-09-19";

const sources: Record<string, string> = {
  "push-gaming-10-cash-bisons": "https://www.pushgaming.com/blog/q-head-studio-ihor-lozinskiy-speaks-demo-slot.html",
  "push-gaming-10-pharaohs": "https://www.pushgaming.com/blog/push-gaming-expands-reelset-and-win-potential-10-pharaohs.html",
  "push-gaming-3-magic-pots": "https://www.pushgaming.com/blog/push-gaming-cooks-spellbinding-prizes-3-magic-pots.html",
  "push-gaming-big-bamboo-2": "https://www.pushgaming.com/blog/push-gaming-celebrate-release-big-bamboo-2-launches-long-awaited-sequel-biggest-slot-title.html",
  "push-gaming-big-bite": "https://www.pushgaming.com/blog/push-gamings-big-bite-takes-slot-fun-ice-floes.html",
  "push-gaming-big-bite-push-ways": "https://www.pushgaming.com/blog/push-gaming-reimagines-reels-big-bite-push-ways.html",
  "push-gaming-bison-battle": "https://www.pushgaming.com/blog/push-gaming-unleashes-stampede-bison-battle.html",
  "push-gaming-blaze-of-ra": "https://www.pushgaming.com/blog/push-gaming-light-sky-new-title-blaze-ra.html",
  "push-gaming-crystal-catcher": "https://www.pushgaming.com/blog/push-gaming-mines-precious-gems-network-launch-crystal-catcher.html",
  "push-gaming-diamonds-4-the-win": "https://www.pushgaming.com/blog/reel-hot-games-continues-2026-momentum-release-diamonds-4-win.html",
  "push-gaming-dragon-hopper": "https://www.pushgaming.com/blog/push-gaming-blends-legacy-success-good-fortune-dragon-hopper.html",
  "push-gaming-fang-city": "https://www.pushgaming.com/blog/push-gaming-sinks-its-teeth-mystery-fang-city.html",
  "push-gaming-fat-drac": "https://www.pushgaming.com/blog/push-gaming-sinks-its-teeth-latest-slot-fat-drac.html",
  "push-gaming-fat-santa": "https://www.pushgaming.com/games/fat-santa.html",
  "push-gaming-fish-n-nudge": "https://www.pushgaming.com/blog/push-gaming-reels-another-hit-fish-n-nudge.html",
  "push-gaming-happy-bamboo": "https://www.pushgaming.com/blog/q-game-producer-jack-marshall-speaks-askgamblers.html",
  "push-gaming-henry-the-ape": "https://www.pushgaming.com/blog/push-gaming-drops-mic-bold-new-release-henry-ape.html",
  "push-gaming-jammin-jars-2": "https://www.pushgaming.com/games/jammin-jars-2.html",
  "push-gaming-joker-troupe": "https://www.pushgaming.com/games/joker-troupe.html",
  "push-gaming-mad-blast": "https://www.pushgaming.com/blog/push-gaming-lights-fuse-explosive-multiplier-play-mad-blast.html",
  "push-gaming-mystery-museum": "https://www.pushgaming.com/blog/mystery-museum-now-live.html",
  "push-gaming-olympus-unleashed": "https://www.pushgaming.com/blog/push-gaming-ascends-new-heights-mythic-new-release-olympus-unleashed.html",
  "push-gaming-razor-returns": "https://www.pushgaming.com/blog/q-game-producer-ihor-lozinskiy-speaks-slot-gods.html",
  "push-gaming-razor-shark-jackpots": "https://www.pushgaming.com/blog/push-gaming-redefines-staple-slot-series-release-razor-shark-jackpots.html",
  "push-gaming-regal-knights": "https://www.pushgaming.com/blog/push-gaming-embarks-chivalrous-quest-regal-knights.html",
  "push-gaming-retroverse": "https://www.pushgaming.com/blog/push-gaming-starts-q2-bang-launches-retroverse-online-slot-global-markets.html",
  "push-gaming-samurais-katana": "https://www.pushgaming.com/blog/push-gamings-samurais-katana-adds-cyberpunk-edge-classic-features.html",
  "push-gaming-the-grand-show": "https://www.pushgaming.com/blog/push-gaming-packs-features-galore-big-top-grand-show.html",
  "push-gaming-the-great-banker": "https://www.pushgaming.com/games/great-banker.html"
};

const gameTypes = Object.fromEntries(
  Object.entries(sources).map(([slug, source]) => [slug, { gameType: "Slots", source, verifiedAt }]),
) as Record<string, CatalogVerifiedGameType>;

export function getVerifiedCatalogGameTypePushScore5(slug: string) {
  return gameTypes[slug];
}
