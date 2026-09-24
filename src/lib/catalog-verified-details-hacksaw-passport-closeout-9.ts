import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawPassportCloseout9 = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "releaseDate">
> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  releaseDateSource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-24";

const details: Record<string, HacksawPassportCloseout9> = {
  "hacksaw-gaming-bash-bros": {
    rtp: "96,26% / 94,25% / 92,41% / 86,13%",
    maxWin: "10 000x",
    rtpSource: "https://bonkku.com/demos/bash-bros/",
    maxWinSource: "https://bonkku.com/demos/bash-bros/",
    verifiedAt,
  },
  "hacksaw-gaming-cursed-crypt": {
    rtp: "96,22% / 94,29% / 92,30% / 88,38%",
    rtpSource: "https://bonkku.com/demos/cursed-crypt/",
    verifiedAt,
  },
  "hacksaw-gaming-donut-division": {
    field: "6×5 · 19 линий",
    rtp: "96,30% / 94,29% / 92,26% / 88,24%",
    maxWin: "12 500x",
    releaseDate: "2024-11-12",
    fieldSource: "https://bonkku.com/demos/donut-division-demo/",
    rtpSource: "https://bonkku.com/demos/donut-division-demo/",
    maxWinSource: "https://bonkku.com/demos/donut-division-demo/",
    releaseDateSource: "https://bonkku.com/demos/donut-division-demo/",
    verifiedAt,
  },
  "hacksaw-gaming-freds-food-truck": {
    field: "5×5 · 15 линий",
    rtp: "96,33% / 94,15% / 92,27% / 88,37%",
    maxWin: "10 000x",
    fieldSource: "https://slotcatalog.com/en/slots/Fred-s-Food-Truck",
    rtpSource: "https://slotcatalog.com/en/slots/Fred-s-Food-Truck",
    maxWinSource: "https://slotcatalog.com/en/slots/Fred-s-Food-Truck",
    verifiedAt,
  },
  "hacksaw-gaming-marlin-masters": {
    field: "5×4 · 14 линий",
    rtp: "96,24% / 94,39% / 92,35% / 88,35%",
    maxWin: "7 500x",
    releaseDate: "2025-02-06",
    fieldSource: "https://bonkku.com/demos/marlin-masters-demo/",
    rtpSource: "https://bonkku.com/demos/marlin-masters-demo/",
    maxWinSource: "https://bonkku.com/demos/marlin-masters-demo/",
    releaseDateSource: "https://bonkku.com/demos/marlin-masters-demo/",
    verifiedAt,
  },
  "hacksaw-gaming-marlin-masters-atlantis": {
    field: "5×4 · 26 линий",
    rtp: "96,27% / 94,26% / 92,27% / 86,23%",
    maxWin: "10 000x",
    fieldSource: "https://bonkku.com/demos/marlin-masters-atlantis/",
    rtpSource: "https://bonkku.com/demos/marlin-masters-atlantis/",
    maxWinSource: "https://bonkku.com/demos/marlin-masters-atlantis/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawPassportCloseout9(slug: string) {
  return details[slug];
}
