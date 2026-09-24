import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawPassportCloseout3 = Partial<Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin">> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-24";

const details: Record<string, HacksawPassportCloseout3> = {
  "hacksaw-gaming-aiko-and-the-wind-spirit": {
    field: "5×4 · 14 линий",
    rtp: "96,29% / 94,31% / 92,36% / 88,25%",
    maxWin: "10 000x",
    fieldSource: "https://www.slotuk.org/free-slots/aiko-and-the-wind-spirit/",
    rtpSource: "https://www.slotuk.org/free-slots/aiko-and-the-wind-spirit/",
    maxWinSource: "https://www.hacksawgaming.com/games/aiko-and-the-wind-spirit",
    verifiedAt,
  },
  "hacksaw-gaming-army-of-ares": {
    field: "5×4 · 14 линий",
    rtp: "96,26%",
    maxWin: "15 000x",
    fieldSource: "https://army-of-ares.com/",
    rtpSource: "https://army-of-ares.com/",
    maxWinSource: "https://army-of-ares.com/",
    verifiedAt,
  },
  "hacksaw-gaming-dandy-diamonds": {
    field: "5×5 · 19 линий",
    rtp: "96,33%",
    maxWin: "5 000x",
    fieldSource: "https://chips.gg/play/hacksawgaming-dandy-diamonds",
    rtpSource: "https://chips.gg/play/hacksawgaming-dandy-diamonds",
    maxWinSource: "https://chips.gg/play/hacksawgaming-dandy-diamonds",
    verifiedAt,
  },
  "hacksaw-gaming-dark-spiral": {
    field: "6×4 · 4096 → 331 776 способов",
    rtp: "96,22%",
    maxWin: "10 000x",
    fieldSource: "https://www.allgamblingsites.com/reviews/slots/hacksawgaming/dark-spiral",
    rtpSource: "https://www.allgamblingsites.com/reviews/slots/hacksawgaming/dark-spiral",
    maxWinSource: "https://www.allgamblingsites.com/reviews/slots/hacksawgaming/dark-spiral",
    verifiedAt,
  },
  "hacksaw-gaming-dynasty-of-death": {
    field: "5×4 · 14 линий",
    rtp: "96,27%",
    maxWin: "12 500x",
    fieldSource: "https://www.flush.com/blog/post/dynasty-of-death-slot-review",
    rtpSource: "https://www.flush.com/blog/post/dynasty-of-death-slot-review",
    maxWinSource: "https://www.flush.com/blog/post/dynasty-of-death-slot-review",
    verifiedAt,
  },
  "hacksaw-gaming-hot-ross": {
    field: "5×5 · 19 линий",
    rtp: "96,32% / 94,23% / 92,23% / 86,16%",
    maxWin: "15 000x",
    fieldSource: "https://hotross.com/",
    rtpSource: "https://hotross.com/",
    maxWinSource: "https://www.hacksawgaming.com/games/hot-ross",
    verifiedAt,
  },
  "hacksaw-gaming-le-bunny": {
    field: "6×5 · кластеры",
    rtp: "96,14% / 94,18% / 92,25% / 88,25%",
    maxWin: "20 000x",
    fieldSource: "https://playlebunny.com/",
    rtpSource: "https://playlebunny.com/",
    maxWinSource: "https://playlebunny.com/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawPassportCloseout3(slug: string) {
  return details[slug];
}
