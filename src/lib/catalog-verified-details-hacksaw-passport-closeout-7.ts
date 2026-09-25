import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawPassportCloseout7 = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "releaseDate">
> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  releaseDateSource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-24";

const details: Record<string, HacksawPassportCloseout7> = {
  "hacksaw-gaming-cloud-princess": {
    field: "6×5 · Scatter Pays",
    rtp: "96,24% / 94,21% / 92,26% / 88,29%",
    maxWin: "10 000x",
    releaseDate: "2024-10-03",
    fieldSource: "https://bonkku.com/demos/cloud-princess/",
    rtpSource: "https://bonkku.com/demos/cloud-princess/",
    maxWinSource: "https://bonkku.com/demos/cloud-princess/",
    releaseDateSource: "https://bonkku.com/demos/cloud-princess/",
    verifiedAt,
  },
  "hacksaw-gaming-donny-dough": {
    rtp: "96,23% / 94,36% / 92,34% / 88,31%",
    maxWin: "10 000x",
    releaseDate: "2024-08-14",
    rtpSource: "https://bonkku.com/demos/donny-dough/",
    maxWinSource: "https://bonkku.com/demos/donny-dough/",
    releaseDateSource: "https://bonkku.com/demos/donny-dough/",
    verifiedAt,
  },
  "hacksaw-gaming-frkn-bananas": {
    field: "6×5 · 19 линий",
    rtp: "96,31% / 94,29% / 92,27% / 88,25%",
    maxWin: "10 000x",
    releaseDate: "2025-02-13",
    fieldSource: "https://bonkku.com/demos/frkn-bananas-demo/",
    rtpSource: "https://bonkku.com/demos/frkn-bananas-demo/",
    maxWinSource: "https://bonkku.com/demos/frkn-bananas-demo/",
    releaseDateSource: "https://bonkku.com/demos/frkn-bananas-demo/",
    verifiedAt,
  },
  "hacksaw-gaming-rainbow-princess": {
    field: "6×5 · кластеры",
    rtp: "96,36% / 94,35% / 92,30% / 86,38%",
    maxWin: "10 000x",
    releaseDate: "2025-08-07",
    fieldSource: "https://bonkku.com/demos/rainbow-princess/",
    rtpSource: "https://bonkku.com/demos/rainbow-princess/",
    maxWinSource: "https://bonkku.com/demos/rainbow-princess/",
    releaseDateSource: "https://bonkku.com/demos/rainbow-princess/",
    verifiedAt,
  },
  "hacksaw-gaming-reign-of-rome": {
    field: "5×5 · 19 линий",
    rtp: "96,27% / 94,22% / 92,33% / 88,27%",
    maxWin: "15 000x",
    releaseDate: "2025-04-24",
    fieldSource: "https://bonkku.com/demos/reign-of-rome/",
    rtpSource: "https://bonkku.com/demos/reign-of-rome/",
    maxWinSource: "https://bonkku.com/demos/reign-of-rome/",
    releaseDateSource: "https://bonkku.com/demos/reign-of-rome/",
    verifiedAt,
  },
  "hacksaw-gaming-wings-of-horus": {
    field: "5×6 · 7 776 способов",
    rtp: "96,33% / 94,27% / 92,25% / 88,19%",
    maxWin: "15 000x",
    releaseDate: "2024-11-07",
    fieldSource: "https://bonkku.com/demos/wings-of-horus/",
    rtpSource: "https://bonkku.com/demos/wings-of-horus/",
    maxWinSource: "https://bonkku.com/demos/wings-of-horus/",
    releaseDateSource: "https://bonkku.com/demos/wings-of-horus/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawPassportCloseout7(slug: string) {
  return details[slug];
}
