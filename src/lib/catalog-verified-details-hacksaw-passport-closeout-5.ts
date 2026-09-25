import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawPassportCloseout5 = Partial<Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin">> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-24";

const details: Record<string, HacksawPassportCloseout5> = {
  "hacksaw-gaming-chaos-crew-3": {
    field: "5×5 · 19 линий",
    rtp: "96,18% / 94,17% / 92,27% / 86,19%",
    maxWin: "30 000x",
    fieldSource: "https://bonkku.com/demos/chaos-crew-3/",
    rtpSource: "https://bonkku.com/demos/chaos-crew-3/",
    maxWinSource: "https://bonkku.com/demos/chaos-crew-3/",
    verifiedAt,
  },
  "hacksaw-gaming-circle-of-life": {
    field: "5×4 · 14 линий",
    rtp: "96,33% / 94,19% / 92,33% / 86,17%",
    maxWin: "15 000x",
    fieldSource: "https://bonkku.com/demos/circle-of-life/",
    rtpSource: "https://bonkku.com/demos/circle-of-life/",
    maxWinSource: "https://bonkku.com/demos/circle-of-life/",
    verifiedAt,
  },
  "hacksaw-gaming-epic-bullets-and-bounty": {
    field: "5×5 · 19 линий",
    rtp: "96,24% / 94,28% / 92,25%",
    maxWin: "20 000x",
    fieldSource: "https://bonkku.com/demos/epic-bullets-and-bounty/",
    rtpSource: "https://bonkku.com/demos/epic-bullets-and-bounty/",
    maxWinSource: "https://bonkku.com/demos/epic-bullets-and-bounty/",
    verifiedAt,
  },
  "hacksaw-gaming-le-digger": {
    field: "6×5 · кластеры",
    rtp: "96,26% / 94,29% / 92,32% / 86,21%",
    maxWin: "15 000x",
    fieldSource: "https://bonkku.com/demos/le-digger/",
    rtpSource: "https://bonkku.com/demos/le-digger/",
    maxWinSource: "https://bonkku.com/demos/le-digger/",
    verifiedAt,
  },
  "hacksaw-gaming-le-fisherman": {
    field: "6×5 · кластеры",
    rtp: "96,33% / 94,33% / 92,34% / 86,25%",
    maxWin: "15 000x",
    fieldSource: "https://bonkku.com/demos/le-fisherman/",
    rtpSource: "https://bonkku.com/demos/le-fisherman/",
    maxWinSource: "https://bonkku.com/demos/le-fisherman/",
    verifiedAt,
  },
  "hacksaw-gaming-le-zeus": {
    field: "6×5 · 19 линий",
    rtp: "96,26% / 94,18% / 92,37% / 86,27%",
    maxWin: "20 000x",
    fieldSource: "https://www.aboutslots.com/casino-slots/le-zeus",
    rtpSource: "https://www.aboutslots.com/casino-slots/le-zeus",
    maxWinSource: "https://www.aboutslots.com/casino-slots/le-zeus",
    verifiedAt,
  },
  "hacksaw-gaming-miami-mayhem": {
    field: "5×4 · 14 линий",
    rtp: "96,35% / 94,34% / 92,17% / 86,23%",
    maxWin: "15 000x",
    fieldSource: "https://bonkku.com/demos/miami-mayhem/",
    rtpSource: "https://bonkku.com/demos/miami-mayhem/",
    maxWinSource: "https://bonkku.com/demos/miami-mayhem/",
    verifiedAt,
  },
  "hacksaw-gaming-munchy-milo": {
    field: "7×7 · кластеры",
    rtp: "96,30% / 94,26% / 92,36% / 86,25%",
    maxWin: "10 000x",
    fieldSource: "https://bonkku.com/demos/munchy-milo/",
    rtpSource: "https://bonkku.com/demos/munchy-milo/",
    maxWinSource: "https://bonkku.com/demos/munchy-milo/",
    verifiedAt,
  },
  "hacksaw-gaming-pray-for-six": {
    field: "6×5 · Scatter Pays",
    rtp: "96,35% / 94,29% / 92,27% / 86,21%",
    maxWin: "20 000x",
    fieldSource: "https://bonkku.com/demos/pray-for-six/",
    rtpSource: "https://bonkku.com/demos/pray-for-six/",
    maxWinSource: "https://bonkku.com/demos/pray-for-six/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawPassportCloseout5(slug: string) {
  return details[slug];
}
