import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawPassportCloseout11 = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "releaseDate">
> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  releaseDateSource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-25";

const details: Record<string, HacksawPassportCloseout11> = {
  "hacksaw-gaming-danny-dollar": {
    rtp: "96,21%",
    releaseDate: "2025-05-08",
    rtpSource: "https://www.aboutslots.com/casino-slots/danny-dollar",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/danny-dollar",
    verifiedAt,
  },
  "hacksaw-gaming-dragons-domain": {
    field: "6×5 · Scatter Pays",
    rtp: "96,31% / 94,25% / 92,20% / 88,29%",
    releaseDate: "2024-08-01",
    fieldSource: "https://www.hacksawgaming.com/games/dragons-domain",
    rtpSource: "https://www.aboutslots.com/casino-slots/dragons-domain",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/dragons-domain",
    verifiedAt,
  },
  "hacksaw-gaming-fire-my-laser": {
    field: "7×6 · ReactWins",
    rtp: "96,31% / 94,16% / 92,23% / 88,27%",
    maxWin: "15 000x",
    releaseDate: "2024-12-19",
    fieldSource: "https://stake.com/casino/games/hacksaw-fire-my-laser",
    rtpSource: "https://www.aboutslots.com/casino-slots/fire-my-laser",
    maxWinSource: "https://www.aboutslots.com/casino-slots/fire-my-laser",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/fire-my-laser",
    verifiedAt,
  },
  "hacksaw-gaming-invictus": {
    field: "5×4 · 14 линий",
    rtp: "96,24% / 94,34% / 92,46% / 88,27%",
    maxWin: "10 000x",
    fieldSource: "https://www.aboutslots.com/casino-slots/invictus",
    rtpSource: "https://www.aboutslots.com/casino-slots/invictus",
    maxWinSource: "https://www.aboutslots.com/casino-slots/invictus",
    verifiedAt,
  },
  "hacksaw-gaming-octo-attack": {
    field: "6×5 · кластеры",
    rtp: "96,27%",
    maxWin: "10 000x",
    releaseDate: "2024-09-05",
    fieldSource: "https://stake.com/casino/games/hacksaw-octo-attack",
    rtpSource: "https://stake.com/casino/games/hacksaw-octo-attack",
    maxWinSource: "https://stake.com/casino/games/hacksaw-octo-attack",
    releaseDateSource: "https://stake.com/casino/games/hacksaw-octo-attack",
    verifiedAt,
  },
  "hacksaw-gaming-phoenix-duelreels": {
    field: "5×4 · 14 линий",
    rtp: "96,27%",
    maxWin: "10 000x",
    releaseDate: "2025-01-23",
    fieldSource: "https://www.aboutslots.com/casino-slots/phoenix-duel-reels",
    rtpSource: "https://www.aboutslots.com/casino-slots/phoenix-duel-reels",
    maxWinSource: "https://www.aboutslots.com/casino-slots/phoenix-duel-reels",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/phoenix-duel-reels",
    verifiedAt,
  },
  "hacksaw-gaming-rise-of-ymir": {
    rtp: "96,31% / 94,24% / 92,25% / 88,23%",
    releaseDate: "2024-10-24",
    rtpSource: "https://www.aboutslots.com/casino-slots/rise-of-ymir",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/rise-of-ymir",
    verifiedAt,
  },
  "hacksaw-gaming-shaolin-master": {
    field: "6×5 · кластеры",
    rtp: "96,31% / 94,24% / 92,31% / 88,25%",
    maxWin: "10 000x",
    releaseDate: "2024-12-05",
    fieldSource: "https://www.aboutslots.com/casino-slots/shaolin-master",
    rtpSource: "https://www.aboutslots.com/casino-slots/shaolin-master",
    maxWinSource: "https://www.aboutslots.com/casino-slots/shaolin-master",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/shaolin-master",
    verifiedAt,
  },
  "hacksaw-gaming-snow-slingers": {
    rtp: "96,29%",
    releaseDate: "2024-11-28",
    rtpSource: "https://www.aboutslots.com/casino-slots/snow-slingers",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/snow-slingers",
    verifiedAt,
  },
  "hacksaw-gaming-spinman": {
    field: "5×4 · 14 линий",
    rtp: "96,23%",
    maxWin: "10 000x",
    fieldSource: "https://www.aboutslots.com/casino-slots/spinman",
    rtpSource: "https://www.aboutslots.com/casino-slots/spinman",
    maxWinSource: "https://www.aboutslots.com/casino-slots/spinman",
    verifiedAt,
  },
  "hacksaw-gaming-strength-of-hercules": {
    field: "5×5 · 3 125 способов",
    rtp: "96,30%",
    maxWin: "10 000x",
    releaseDate: "2025-03-06",
    fieldSource: "https://www.casinomeerkat.com/demo-slots/strength-of-hercules",
    rtpSource: "https://www.casinomeerkat.com/demo-slots/strength-of-hercules",
    maxWinSource: "https://www.casinomeerkat.com/demo-slots/strength-of-hercules",
    releaseDateSource: "https://www.casinomeerkat.com/demo-slots/strength-of-hercules",
    verifiedAt,
  },
  "hacksaw-gaming-tai-the-toad": {
    rtp: "96,30% / 94,35% / 92,32% / 88,22%",
    releaseDate: "2024-07-04",
    rtpSource: "https://www.aboutslots.com/casino-slots/tai-the-toad",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/tai-the-toad",
    verifiedAt,
  },
  "hacksaw-gaming-twisted-lab": {
    rtp: "96,30%",
    releaseDate: "2024-06-27",
    rtpSource: "https://www.aboutslots.com/casino-slots/twisted-lab-rotogrid",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/twisted-lab-rotogrid",
    verifiedAt,
  },
  "hacksaw-gaming-ze-zeus": {
    rtp: "96,34%",
    releaseDate: "2024-06-20",
    rtpSource: "https://www.aboutslots.com/casino-slots/ze-zeus",
    releaseDateSource: "https://www.aboutslots.com/casino-slots/ze-zeus",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawPassportCloseout11(slug: string) {
  return details[slug];
}
