import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawPassportCloseout8 = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "releaseDate">
> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  releaseDateSource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-24";

const details: Record<string, HacksawPassportCloseout8> = {
  "hacksaw-gaming-booze-bash": {
    rtp: "96,31% / 94,29% / 92,31% / 88,28%",
    maxWin: "12 500x",
    releaseDate: "2025-06-12",
    rtpSource: "https://bonkku.com/demos/booze-bash/",
    maxWinSource: "https://bonkku.com/demos/booze-bash/",
    releaseDateSource: "https://bonkku.com/demos/booze-bash/",
    verifiedAt,
  },
  "hacksaw-gaming-klowns": {
    rtp: "96,26% / 94,31% / 92,31% / 88,30%",
    releaseDate: "2025-01-02",
    rtpSource: "https://bonkku.com/demos/klowns-demo/",
    releaseDateSource: "https://bonkku.com/demos/klowns-demo/",
    verifiedAt,
  },
  "hacksaw-gaming-le-pharaoh": {
    field: "6×5 · 19 линий",
    rtp: "96,18% / 94,33% / 92,26% / 88,24%",
    releaseDate: "2024-09-26",
    fieldSource: "https://bonkku.com/demos/le-pharaoh/",
    rtpSource: "https://bonkku.com/demos/le-pharaoh/",
    releaseDateSource: "https://bonkku.com/demos/le-pharaoh/",
    verifiedAt,
  },
  "hacksaw-gaming-rise-of-fortuna": {
    field: "5×4 · 14 линий",
    rtp: "96,28% / 94,38% / 92,28% / 86,33%",
    maxWin: "10 000x",
    fieldSource: "https://bonkku.com/demos/rise-of-fortuna/",
    rtpSource: "https://bonkku.com/demos/rise-of-fortuna/",
    maxWinSource: "https://bonkku.com/demos/rise-of-fortuna/",
    verifiedAt,
  },
  "hacksaw-gaming-smoking-dragon": {
    field: "5×4 · 1 024 способа",
    rtp: "96,30% / 94,28% / 92,35% / 86,25%",
    maxWin: "10 000x",
    fieldSource: "https://bonkku.com/demos/smoking-dragon/",
    rtpSource: "https://bonkku.com/demos/smoking-dragon/",
    maxWinSource: "https://bonkku.com/demos/smoking-dragon/",
    verifiedAt,
  },
  "hacksaw-gaming-the-count": {
    field: "5×5 · 19 линий",
    rtp: "96,36% / 94,28% / 92,34% / 86,19%",
    maxWin: "12 500x",
    fieldSource: "https://bonkku.com/demos/the-count/",
    rtpSource: "https://bonkku.com/demos/the-count/",
    maxWinSource: "https://bonkku.com/demos/the-count/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawPassportCloseout8(slug: string) {
  return details[slug];
}
