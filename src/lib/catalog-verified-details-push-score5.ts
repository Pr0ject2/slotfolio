import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPushScore6 } from "./catalog-verified-details-push-score6";

type PushScore5Details = Pick<CatalogVerifiedDetails, "source" | "verifiedAt"> &
  Partial<Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "volatility" | "releaseDate">> & {
    releaseDateSource?: string;
  };

const verifiedAt = "2026-09-19";

const details: Record<string, PushScore5Details> = {
  "push-gaming-10-pharaohs": {
    releaseDate: "2025-04-09",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-expands-reelset-and-win-potential-10-pharaohs.html",
    source: "https://www.pushgaming.com/games/10-pharaohs.html",
    verifiedAt,
  },
  "push-gaming-3-magic-pots": {
    releaseDate: "2025-04-30",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-cooks-spellbinding-prizes-3-magic-pots.html",
    source: "https://www.pushgaming.com/games/3-magic-pots.html",
    verifiedAt,
  },
  "push-gaming-bait-n-bank": {
    releaseDate: "2026-01",
    releaseDateSource: "https://www.pushgaming.com/blog/reel-hot-games-continues-2026-momentum-release-diamonds-4-win.html",
    source: "https://www.pushgaming.com/games/bait-n-bank.html",
    verifiedAt,
  },
  "push-gaming-big-bite": {
    releaseDate: "2024-02-22",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gamings-big-bite-takes-slot-fun-ice-floes.html",
    source: "https://www.pushgaming.com/games/big-bite.html",
    verifiedAt,
  },
  "push-gaming-big-bite-push-ways": {
    releaseDate: "2025-03-13",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-reimagines-reels-big-bite-push-ways.html",
    source: "https://www.pushgaming.com/games/big-bite-push-ways.html",
    verifiedAt,
  },
  "push-gaming-boss-bear": {
    releaseDate: "2023-11-22",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-delves-world-anthropomorphic-mobsters-boss-bear.html",
    source: "https://www.pushgaming.com/games/boss-bear.html",
    verifiedAt,
  },
  "push-gaming-crystal-catcher": {
    releaseDate: "2023-06-20",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-mines-precious-gems-network-launch-crystal-catcher.html",
    source: "https://www.pushgaming.com/games/crystal-catcher.html",
    verifiedAt,
  },
  "push-gaming-diamonds-4-the-win": {
    releaseDate: "2026-04-29",
    releaseDateSource: "https://www.pushgaming.com/blog/reel-hot-games-continues-2026-momentum-release-diamonds-4-win.html",
    source: "https://www.pushgaming.com/games/diamonds-4-win.html",
    verifiedAt,
  },
  "push-gaming-dino-p-d": {
    releaseDate: "2023-04-26",
    releaseDateSource: "https://www.pushgaming.com/blog/raptors-return-push-gamings-latest-release-dino-pd.html",
    source: "https://www.pushgaming.com/games/dino-pd.html",
    verifiedAt,
  },
  "push-gaming-dragon-hopper": {
    releaseDate: "2025-01-16",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-blends-legacy-success-good-fortune-dragon-hopper.html",
    source: "https://www.pushgaming.com/games/dragon-hopper.html",
    verifiedAt,
  },
  "push-gaming-fat-drac": {
    releaseDate: "2021-10-14",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-sinks-its-teeth-latest-slot-fat-drac.html",
    source: "https://www.pushgaming.com/games/fat-drac.html",
    verifiedAt,
  },
  "push-gaming-fat-santa": {
    releaseDate: "2018-11-27",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gamings-christmas-release-fat-santa-has-arrived.html",
    source: "https://www.pushgaming.com/games/fat-santa.html",
    verifiedAt,
  },
  "push-gaming-fish-n-nudge": {
    releaseDate: "2023-10-10",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-reels-another-hit-fish-n-nudge.html",
    source: "https://www.pushgaming.com/games/fish-n-nudge.html",
    verifiedAt,
  },
  "push-gaming-fish-n-nudge-big-catch": {
    releaseDate: "2025-07-09",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-reels-fish-n-nudge-big-catch.html",
    source: "https://www.pushgaming.com/games/fish-n-nudge-big-catch.html",
    verifiedAt,
  },
  "push-gaming-jammin-jars-2": {
    releaseDate: "2021-06-02",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-heads-back-dance-floor-jammin-jars-2.html",
    source: "https://www.pushgaming.com/games/jammin-jars-2.html",
    verifiedAt,
  },
  "push-gaming-joker-troupe": {
    volatility: "Высокая",
    releaseDate: "2020-02-17",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-turn-heat-joker-troupe.html",
    source: "https://www.pushgaming.com/games/joker-troupe.html",
    verifiedAt,
  },
  "push-gaming-masked-mayhem": {
    releaseDate: "2025-10-01",
    releaseDateSource: "https://www.pushgaming.com/blog/q-head-studio-ihor-lozinskiy-speaks-demo-slot.html",
    source: "https://www.pushgaming.com/games/masked-mayhem.html",
    verifiedAt,
  },
  "push-gaming-mystery-museum": {
    releaseDate: "2020-08-27",
    releaseDateSource: "https://www.pushgaming.com/blog/mystery-museum-now-live.html",
    source: "https://www.pushgaming.com/games/mystery-museum.html",
    verifiedAt,
  },
  "push-gaming-razor-returns": {
    releaseDate: "2023-07-04",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gamings-major-sequel-razor-returns-hits-casinos.html",
    source: "https://www.pushgaming.com/games/razor-returns.html",
    verifiedAt,
  },
  "push-gaming-retroverse": {
    releaseDate: "2026-04-15",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-starts-q2-bang-launches-retroverse-online-slot-global-markets.html",
    source: "https://www.pushgaming.com/games/retroverse.html",
    verifiedAt,
  },
  "push-gaming-samurais-katana": {
    releaseDate: "2024-03-20",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gamings-samurais-katana-adds-cyberpunk-edge-classic-features.html",
    source: "https://www.pushgaming.com/games/samurais-katana.html",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPushScore5(slug: string) {
  const score5 = details[slug];
  const score6 = getCatalogVerifiedDetailsPushScore6(slug);

  if (!score6) return score5;
  if (!score5) return score6;
  return { ...score5, ...score6 };
}
