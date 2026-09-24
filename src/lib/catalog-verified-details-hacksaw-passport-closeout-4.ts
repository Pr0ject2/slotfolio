import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawPassportCloseout4 = Partial<Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin">> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-24";

const details: Record<string, HacksawPassportCloseout4> = {
  "hacksaw-gaming-deal-with-death": {
    field: "5×4 · 14 линий",
    rtp: "96,25% / 94,30% / 92,25% / 86,22%",
    maxWin: "20 000x",
    fieldSource: "https://www.aboutslots.com/casino-slots/deal-with-death",
    rtpSource: "https://www.aboutslots.com/casino-slots/deal-with-death",
    maxWinSource: "https://www.aboutslots.com/casino-slots/deal-with-death",
    verifiedAt,
  },
  "hacksaw-gaming-eternal-duel": {
    field: "5×5 · 19 линий",
    rtp: "96,42% / 94,24% / 92,39% / 86,31%",
    maxWin: "15 000x",
    fieldSource: "https://www.aboutslots.com/casino-slots/eternal-duel",
    rtpSource: "https://www.aboutslots.com/casino-slots/eternal-duel",
    maxWinSource: "https://www.aboutslots.com/casino-slots/eternal-duel",
    verifiedAt,
  },
  "hacksaw-gaming-jaws-of-justice": {
    field: "5×4 · 14 линий",
    rtp: "96,20%",
    maxWin: "10 000x",
    fieldSource: "https://jawsofjustices.com/",
    rtpSource: "https://jawsofjustices.com/",
    maxWinSource: "https://jawsofjustices.com/",
    verifiedAt,
  },
  "hacksaw-gaming-le-king": {
    field: "6×5 · кластеры",
    rtp: "96,14% / 94,18% / 92,25%",
    maxWin: "20 000x",
    fieldSource: "https://www.olbg.com/slots/games/le-king",
    rtpSource: "https://www.olbg.com/slots/games/le-king",
    maxWinSource: "https://www.olbg.com/slots/games/le-king",
    verifiedAt,
  },
  "hacksaw-gaming-le-santa": {
    field: "6×5 · кластеры",
    rtp: "96,14%",
    maxWin: "20 000x",
    fieldSource: "https://www.olbg.com/slots/games/le-santa",
    rtpSource: "https://www.olbg.com/slots/games/le-santa",
    maxWinSource: "https://www.olbg.com/slots/games/le-santa",
    verifiedAt,
  },
  "hacksaw-gaming-pray-for-three": {
    field: "5×5 · 3 125 способов",
    rtp: "96,33%",
    maxWin: "13 333x",
    fieldSource: "https://prayforthree.com/",
    rtpSource: "https://prayforthree.com/",
    maxWinSource: "https://prayforthree.com/",
    verifiedAt,
  },
  "hacksaw-gaming-spear-of-athena": {
    field: "6×5 · 19 линий",
    rtp: "96,20%",
    maxWin: "15 000x",
    fieldSource: "https://spear-of-athena.com/",
    rtpSource: "https://spear-of-athena.com/",
    maxWinSource: "https://spear-of-athena.com/",
    verifiedAt,
  },
  "hacksaw-gaming-sun-princess": {
    field: "7×7 · кластеры",
    rtp: "96,29% / 94,25% / 92,35% / 86,25%",
    maxWin: "10 000x",
    fieldSource: "https://bonkku.com/demos/sun-princess/",
    rtpSource: "https://bonkku.com/demos/sun-princess/",
    maxWinSource: "https://bonkku.com/demos/sun-princess/",
    verifiedAt,
  },
  "hacksaw-gaming-superstar-sevens": {
    field: "6×5 · кластеры",
    rtp: "96,37% / 94,27% / 92,38% / 86,21%",
    maxWin: "10 000x",
    fieldSource: "https://bonkku.com/demos/superstar-sevens/",
    rtpSource: "https://bonkku.com/demos/superstar-sevens/",
    maxWinSource: "https://bonkku.com/demos/superstar-sevens/",
    verifiedAt,
  },
  "hacksaw-gaming-zeus-ze-zecond": {
    field: "6×5 · 19 линий",
    rtp: "96,26% / 94,18% / 92,37% / 86,27%",
    maxWin: "20 000x",
    fieldSource: "https://www.aboutslots.com/casino-slots/zeus-ze-zecond",
    rtpSource: "https://www.aboutslots.com/casino-slots/zeus-ze-zecond",
    maxWinSource: "https://www.aboutslots.com/casino-slots/zeus-ze-zecond",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawPassportCloseout4(slug: string) {
  return details[slug];
}
