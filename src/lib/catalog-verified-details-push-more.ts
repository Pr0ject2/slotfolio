import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type PushMoreDetails = CatalogVerifiedDetails & {
  releaseDateSource?: string;
};

const verifiedAt = "2026-09-11";
const verifiedAtScore4 = "2026-09-18";

const details: Record<string, PushMoreDetails> = {
  "push-gaming-10-cash-bisons": { field: "Push-Up: 5×4 / 5×5", rtp: "96,29% / 94,37%", maxWin: "5 168x", volatility: "Низкая–средняя", source: "https://www.pushgaming.com/games/10-cash-bisons.html", verifiedAt },
  "push-gaming-10-flaming-bisons": { field: "Push-Up: 5×4 / 5×5", rtp: "96,26% / 94,47%", maxWin: "5 602x", volatility: "Средняя", source: "https://www.pushgaming.com/games/10-flaming-bisons.html", verifiedAt },
  "push-gaming-10-pharaohs": { field: "Push-Up: 5×4 / 5×5", rtp: "96,26% / 94,47%", maxWin: "10 663,6x", volatility: "Средняя", source: "https://www.pushgaming.com/games/10-pharaohs.html", verifiedAt },
  "push-gaming-10-santas-reindeers": { rtp: "96,26% / 94,47%", maxWin: "5 602,2x", volatility: "Средняя", source: "https://www.pushgaming.com/games/10-santas-reindeers.html", verifiedAt },
  "push-gaming-10-swords": {
    field: "5×3 · 20 линий",
    rtp: "96,41% / 94,41%",
    maxWin: "5 000x",
    volatility: "Низкая–средняя",
    releaseDate: "2023-05-31",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-wields-instant-cash-prizes-10-swords.html",
    source: "https://www.pushgaming.com/games/10-swords.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-3-magic-pots": { field: "Бонус: до 6 рядов · 46 656 способов", rtp: "96,23% / 94,25%", maxWin: "5 992,10x", volatility: "Низкая–средняя", source: "https://www.pushgaming.com/games/3-magic-pots.html", verifiedAt },
  "push-gaming-bait-n-bank": { field: "3×3", rtp: "96,37% / 94,38%", maxWin: "8 118x", volatility: "Низкая", source: "https://www.pushgaming.com/games/bait-n-bank.html", verifiedAt },
  "push-gaming-bamboo-ways": {
    rtp: "96,30% / 94,42%",
    maxWin: "25 000x",
    volatility: "Высокая",
    releaseDate: "2025-09-03",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-launches-push-originals-category-bamboo-ways.html",
    source: "https://www.pushgaming.com/games/bamboo-ways.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-big-bam-book": { rtp: "96,31% / 94,42%", maxWin: "10 000x", volatility: "Высокая", source: "https://www.pushgaming.com/games/big-bam-book.html", verifiedAt },
  "push-gaming-big-bamboo": { rtp: "96,13% / 94,13%", maxWin: "50 000x", source: "https://www.pushgaming.com/games/big-bamboo.html", verifiedAt },
  "push-gaming-big-bamboo-2": {
    rtp: "96,36% / 94,47%",
    maxWin: "75 000x",
    volatility: "Высокая",
    releaseDate: "2026-03-25",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-celebrate-release-big-bamboo-2-launches-long-awaited-sequel-biggest-slot-title.html",
    source: "https://www.pushgaming.com/games/big-bamboo-2.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-big-bite": { field: "Бонус: 5×6", rtp: "96,33% / 94,24%", maxWin: "10 000x", volatility: "Низкая–средняя", source: "https://www.pushgaming.com/games/big-bite.html", verifiedAt },
  "push-gaming-big-bite-push-ways": { rtp: "96,27% / 94,37%", maxWin: "4 941x", volatility: "Низкая", source: "https://www.pushgaming.com/games/big-bite-push-ways.html", verifiedAt },
  "push-gaming-bison-battle": {
    rtp: "96,40% / 94,18%",
    maxWin: "50 000x",
    volatility: "Высокая",
    releaseDate: "2022-01-20",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-unleashes-stampede-bison-battle.html",
    source: "https://www.pushgaming.com/games/bison-battle.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-candy-blast": {
    field: "6×5",
    rtp: "96,34% / 94,30%",
    maxWin: "10 000x",
    volatility: "Высокая",
    releaseDate: "2025-03-26",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-multiplies-sweetness-candy-blast.html",
    source: "https://www.pushgaming.com/games/candy-blast.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-cats-of-olympuss": {
    field: "5×3 · 243 линии",
    rtp: "96,31% / 94,26%",
    maxWin: "13 194x",
    volatility: "Средняя",
    releaseDate: "2024-09-12",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-unleashes-divine-felines-cats-olympuss.html",
    source: "https://www.pushgaming.com/games/cats-olympuss.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-crystal-catcher": {
    field: "7×7",
    rtp: "96,30% / 94,30%",
    maxWin: "5 000x",
    volatility: "Средняя",
    source: "https://www.pushgaming.com/games/crystal-catcher.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-deadly-5": {
    field: "5×4 · 20 линий",
    rtp: "96,39% / 94,35%",
    maxWin: "5 000x",
    volatility: "Средняя",
    releaseDate: "2022-08-31",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-heads-old-west-deadly-5.html",
    source: "https://www.pushgaming.com/games/deadly-5.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-dj-cat": {
    rtp: "96,32% / 94,03%",
    maxWin: "10 000x",
    volatility: "Высокая",
    releaseDate: "2024-04-16",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gamings-dj-cat-spins-discs-and-reels.html",
    source: "https://www.pushgaming.com/games/dj-cat.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-dj-fox": { rtp: "96,28% / 94,31%", maxWin: "10 000x", volatility: "Высокая", source: "https://www.pushgaming.com/games/dj-fox.html", verifiedAt },
  "push-gaming-dragon-hopper": { rtp: "96,33% / 94,39%", maxWin: "10 000x", volatility: "Средняя–высокая", source: "https://www.pushgaming.com/games/dragon-hopper.html", verifiedAt },
  "push-gaming-fang-city": {
    rtp: "96,33% / 94,37%",
    maxWin: "10 000x",
    releaseDate: "2025-06-18",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-sinks-its-teeth-mystery-fang-city.html",
    source: "https://www.pushgaming.com/games/fang-city.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-fat-rabbit": { field: "5×5 · 50 линий", rtp: "96,45% / 94,15%", maxWin: "3 844x", volatility: "Высокая", source: "https://www.pushgaming.com/games/fat-rabbit.html", verifiedAt },
  "push-gaming-fat-santa": { field: "5×5 · 50 линий", rtp: "96,45% / 94,15%", maxWin: "3 844x", volatility: "Средняя–высокая", source: "https://www.pushgaming.com/games/fat-santa.html", verifiedAt },
  "push-gaming-fish-n-nudge": { rtp: "96,40% / 94,38%", maxWin: "10 000x", volatility: "Средняя", source: "https://www.pushgaming.com/games/fish-n-nudge.html", verifiedAt },
  "push-gaming-fish-n-nudge-big-catch": { rtp: "96,46% / 94,27%", maxWin: "3 094x", volatility: "Низкая", source: "https://www.pushgaming.com/games/fish-n-nudge-big-catch.html", verifiedAt },
};

export function getCatalogVerifiedDetailsPushMore(slug: string) {
  return details[slug];
}
