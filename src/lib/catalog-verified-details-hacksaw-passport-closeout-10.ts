import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawPassportCloseout10 = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "releaseDate">
> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  releaseDateSource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-24";

const details: Record<string, HacksawPassportCloseout10> = {
  "hacksaw-gaming-eye-of-medusa": {
    field: "5×5 · 3 125 способов",
    rtp: "96,20% / 94,24% / 92,33% / 88,32%",
    fieldSource: "https://eyeof-medusa.com/",
    rtpSource: "https://eyeof-medusa.com/",
    verifiedAt,
  },
  "hacksaw-gaming-le-viking": {
    field: "6×5 · 15 625 способов",
    rtp: "96,32%",
    maxWin: "10 000x",
    releaseDate: "2025-01-16",
    fieldSource: "https://le-viking.nl/",
    rtpSource: "https://le-viking.nl/",
    maxWinSource: "https://le-viking.nl/",
    releaseDateSource: "https://le-viking.nl/",
    verifiedAt,
  },
  "hacksaw-gaming-sixsixsix": {
    field: "5×4 · 14 линий",
    rtp: "96,15% / 94,19% / 92,17% / 88,27%",
    maxWin: "16 666x",
    fieldSource: "https://sixsix-six.com/",
    rtpSource: "https://sixsix-six.com/",
    maxWinSource: "https://sixsix-six.com/",
    verifiedAt,
  },
  "hacksaw-gaming-stormborn": {
    field: "5×4 · 14 линий",
    rtp: "96,27%",
    maxWin: "15 000x",
    fieldSource: "https://stake.com/casino/games/hacksaw-stormborn",
    rtpSource: "https://stake.com/casino/games/hacksaw-stormborn",
    maxWinSource: "https://stake.com/casino/games/hacksaw-stormborn",
    verifiedAt,
  },
  "hacksaw-gaming-the-luxe": {
    field: "5×4 · 14 линий",
    rtp: "96,33%",
    fieldSource: "https://www.aboutslots.com/casino-slots/the-luxe",
    rtpSource: "https://www.aboutslots.com/casino-slots/the-luxe",
    verifiedAt,
  },
  "hacksaw-gaming-the-wildwood-curse": {
    field: "6×5 · 19 линий",
    rtp: "96,30%",
    maxWin: "10 000x",
    fieldSource: "https://stake.com/casino/games/hacksaw-the-wildwood-curse",
    rtpSource: "https://stake.com/casino/games/hacksaw-the-wildwood-curse",
    maxWinSource: "https://stake.com/casino/games/hacksaw-the-wildwood-curse",
    verifiedAt,
  },
  "hacksaw-gaming-toshi-ways-club": {
    field: "6×2–10 · до 1 000 000 способов",
    rtp: "96,09%",
    maxWin: "10 000x",
    fieldSource: "https://stake.com/casino/games/hacksaw-toshi-ways-club",
    rtpSource: "https://stake.com/casino/games/hacksaw-toshi-ways-club",
    maxWinSource: "https://stake.com/casino/games/hacksaw-toshi-ways-club",
    verifiedAt,
  },
  "hacksaw-gaming-ultimate-slot-of-america": {
    field: "5×5 · 19 линий",
    rtp: "96,35%",
    maxWin: "10 000x",
    fieldSource: "https://stake.com/casino/games/hacksaw-ultimate-slot-of-america",
    rtpSource: "https://stake.com/casino/games/hacksaw-ultimate-slot-of-america",
    maxWinSource: "https://stake.com/casino/games/hacksaw-ultimate-slot-of-america",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawPassportCloseout10(slug: string) {
  return details[slug];
}
