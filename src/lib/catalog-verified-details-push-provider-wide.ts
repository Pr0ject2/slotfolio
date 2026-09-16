import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-16";

const details: Record<string, CatalogVerifiedDetails> = {
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
    source: "https://www.pushgaming.com/games/blaze-ra.html",
    verifiedAt,
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
    source: "https://www.pushgaming.com/games/fang-city.html",
    verifiedAt,
  },
  "push-gaming-fire-pig-push-ways": {
    rtp: "96,27% / 94,37%",
    source: "https://www.pushgaming.com/games/fire-pig-push-ways.html",
    verifiedAt,
  },
  "push-gaming-iron-phoenix": {
    rtp: "96,24% / 94,01%",
    maxWin: "12242.10x",
    volatility: "Низкая–средняя",
    source: "https://www.pushgaming.com/games/iron-phoenix.html",
    verifiedAt,
  },
  "push-gaming-power-paws": {
    rtp: "96,25% / 94,32%",
    source: "https://www.pushgaming.com/games/power-paws.html",
    verifiedAt,
  },
  "push-gaming-retroverse": {
    field: "6×9",
    rtp: "96,24% / 94,37%",
    source: "https://www.pushgaming.com/games/retroverse.html",
    verifiedAt,
  },
  "push-gaming-sea-of-spirits": {
    rtp: "96,36% / 94,28%",
    source: "https://www.pushgaming.com/games/sea-spirits.html",
    verifiedAt,
  },
  "push-gaming-tarot-treasures": {
    rtp: "96,39% / 94,33%",
    source: "https://www.pushgaming.com/games/tarot-treasures.html",
    verifiedAt,
  },
  "push-gaming-tiki-tumble": {
    field: "5×4 · 20 линий",
    rtp: "96,49%",
    source: "https://www.pushgaming.com/games/tiki-tumble.html",
    verifiedAt,
  },
  "push-gaming-tricky-treats": {
    rtp: "96,32% / 94,38%",
    source: "https://www.pushgaming.com/games/tricky-treats.html",
    verifiedAt,
  },
  "push-gaming-vegas-vault": {
    rtp: "96,36% / 94,33%",
    source: "https://www.pushgaming.com/games/vegas-vault.html",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPushProviderWide(slug: string) {
  return details[slug];
}
