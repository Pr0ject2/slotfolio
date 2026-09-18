import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ProviderWideDetails = CatalogVerifiedDetails & {
  releaseDateSource?: string;
};

const verifiedAt = "2026-09-16";
const verifiedAtLatest = "2026-09-17";
const verifiedAtScore4 = "2026-09-18";

const details: Record<string, ProviderWideDetails> = {
  "push-gaming-big-bamboo": {
    rtp: "96,13% / 94,13%",
    maxWin: "50 000x",
    volatility: "Высокая",
    source: "https://www.pushgaming.com/games/big-bamboo.html",
    verifiedAt,
  },
  "push-gaming-blaze-of-ra": {
    field: "5×4 · 40 линий",
    rtp: "96,40% / 94,18%",
    maxWin: "2049x",
    volatility: "Средняя–высокая",
    source: "https://www.pushgaming.com/games/blaze-ra.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-diamond-supernova-100": {
    field: "100 линий",
    rtp: "96,33% / 94,29%",
    source: "https://www.pushgaming.com/games/diamond-supernova-100.html",
    verifiedAt,
  },
  "push-gaming-diamond-supernova-20": {
    field: "20 линий",
    rtp: "96,33% / 94,22%",
    source: "https://www.pushgaming.com/games/diamond-supernova-20.html",
    verifiedAt,
  },
  "push-gaming-diamond-supernova-40": {
    field: "40 линий",
    rtp: "96,32% / 94,23%",
    source: "https://www.pushgaming.com/games/diamond-supernova-40.html",
    verifiedAt,
  },
  "push-gaming-diamond-supernova-5": {
    field: "5 линий",
    rtp: "96,34% / 94,27%",
    source: "https://www.pushgaming.com/games/diamond-supernova-5.html",
    verifiedAt,
  },
  "push-gaming-diamonds-4-the-win": {
    field: "3 барабана · 5 линий",
    rtp: "96,38% / 94,39%",
    source: "https://www.pushgaming.com/games/diamonds-4-win.html",
    verifiedAt,
  },
  "push-gaming-fang-city": {
    rtp: "96,33% / 94,37%",
    maxWin: "10 000x",
    volatility: "Средняя",
    releaseDate: "2025-06-18",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-sinks-its-teeth-mystery-fang-city.html",
    source: "https://www.pushgaming.com/games/fang-city.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-fire-pig-push-ways": {
    field: "6 барабанов",
    rtp: "96,27% / 94,37%",
    maxWin: "4 941x",
    volatility: "Средняя",
    releaseDate: "2025-08-13",
    releaseDateSource: "https://www.pushgaming.com/blog/push-gaming-expands-push-ways-portfolio-fire-pig-release.html",
    source: "https://www.pushgaming.com/games/fire-pig-push-ways.html",
    verifiedAt: verifiedAtLatest,
  },
  "push-gaming-iron-phoenix": {
    rtp: "96,24% / 94,01%",
    maxWin: "12242.10x",
    volatility: "Низкая–средняя",
    source: "https://www.pushgaming.com/games/iron-phoenix.html",
    verifiedAt,
  },
  "push-gaming-mystery-mission-to-the-moon": {
    field: "6×4 · 20 линий",
    rtp: "96,25% / 94,25%",
    maxWin: "10000x",
    volatility: "Высокая",
    source: "https://www.pushgaming.com/games/mystery-mission-moon.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-neon-cash-city": {
    field: "8×8",
    rtp: "96,35% / 94,37%",
    maxWin: "9395.5x",
    volatility: "Средняя–высокая",
    source: "https://www.pushgaming.com/games/neon-cash-city.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-power-paws": {
    rtp: "96,25% / 94,32%",
    maxWin: "6 500x",
    volatility: "Средняя–высокая",
    source: "https://www.pushgaming.com/games/power-paws.html",
    verifiedAt: verifiedAtLatest,
  },
  "push-gaming-razor-shark-jackpots": {
    rtp: "96,38% / 94,30%",
    maxWin: "11007.70x",
    volatility: "Средняя",
    releaseDate: "2026-06-03",
    source: "https://www.pushgaming.com/games/razor-shark-jackpots.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-razor-ways": {
    field: "до 46 656 способов",
    rtp: "96,36%",
    maxWin: "25 000x",
    volatility: "Средняя–высокая",
    source: "https://www.pushgaming.com/games/razor-ways.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-red-hot-multipliers": {
    rtp: "96,22% / 94,23%",
    maxWin: "2500x",
    volatility: "Низкая",
    releaseDate: "2026-02",
    source: "https://www.pushgaming.com/games/red-hot-multipliers.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-retroverse": {
    field: "6×9",
    rtp: "96,24% / 94,37%",
    source: "https://www.pushgaming.com/games/retroverse.html",
    verifiedAt,
  },
  "push-gaming-sea-of-spirits": {
    rtp: "96,36% / 94,28%",
    maxWin: "25 000x",
    volatility: "Высокая",
    source: "https://www.pushgaming.com/games/sea-spirits.html",
    verifiedAt: verifiedAtLatest,
  },
  "push-gaming-tarot-treasures": {
    rtp: "96,39% / 94,33%",
    maxWin: "10 000x",
    volatility: "Средняя",
    releaseDate: "2025-10-15",
    releaseDateSource: "https://www.pushgaming.com/blog/q-head-studio-ihor-lozinskiy-speaks-demo-slot.html",
    source: "https://www.pushgaming.com/games/tarot-treasures.html",
    verifiedAt: verifiedAtLatest,
  },
  "push-gaming-tiki-tumble": {
    field: "5×4 · 20 линий",
    rtp: "96,49%",
    maxWin: "18 278x",
    volatility: "Высокая",
    source: "https://www.pushgaming.com/games/tiki-tumble.html",
    verifiedAt: verifiedAtScore4,
  },
  "push-gaming-tricky-treats": {
    rtp: "96,32% / 94,38%",
    maxWin: "10 000x",
    volatility: "Высокая",
    source: "https://www.pushgaming.com/games/tricky-treats.html",
    verifiedAt: verifiedAtLatest,
  },
  "push-gaming-vegas-vault": {
    field: "3 барабана · 1 линия",
    rtp: "96,36% / 94,33%",
    maxWin: "8 976x",
    volatility: "Низкая–средняя",
    releaseDate: "2026-05-20",
    releaseDateSource: "https://www.pushgaming.com/blog/reel-hot-games-continues-redefine-classic-slots-gameplay-release-vegas-vault-global-markets.html",
    source: "https://www.pushgaming.com/games/vegas-vault.html",
    verifiedAt: verifiedAtLatest,
  },
};

export function getCatalogVerifiedDetailsPushProviderWide(slug: string) {
  return details[slug];
}
