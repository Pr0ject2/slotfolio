import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawCloseoutDetails = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "releaseDate">
> & {
  verifiedAt: string;
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  releaseDateSource?: string;
};

const verifiedAt = "2026-09-24";

const details: Record<string, HacksawCloseoutDetails> = {
  "hacksaw-gaming-beast-below": {
    releaseDate: "2023-06-22",
    releaseDateSource: "https://slotcatalog.com/en/slots/Beast-Below",
    verifiedAt,
  },
  "hacksaw-gaming-feel-the-beat": {
    rtp: "96,20%",
    releaseDate: "2024-01-25",
    rtpSource: "https://fruityslots.com/slots/reviews/feel-the-beat/",
    releaseDateSource: "https://fruityslots.com/slots/reviews/feel-the-beat/",
    verifiedAt,
  },
  "hacksaw-gaming-freds-food-truck": {
    field: "5×5 · 15 линий",
    rtp: "96,33%",
    maxWin: "10000x",
    fieldSource: "https://www.gameshub.com/free-games/slots/freds-food-truck/",
    rtpSource: "https://www.gameshub.com/free-games/slots/freds-food-truck/",
    maxWinSource: "https://www.gameshub.com/free-games/slots/freds-food-truck/",
    verifiedAt,
  },
  "hacksaw-gaming-keepem": {
    rtp: "96,37%",
    releaseDate: "2024-05-02",
    rtpSource: "https://www.gameshub.com/free-games/slots/keep-em/",
    releaseDateSource: "https://www.gameshub.com/free-games/slots/keep-em/",
    verifiedAt,
  },
  "hacksaw-gaming-rusty-and-curly": {
    rtp: "96,29%",
    releaseDate: "2024-03-28",
    rtpSource: "https://www.casinowizard.com/slots/rusty-curly/",
    releaseDateSource: "https://www.casinowizard.com/slots/rusty-curly/",
    verifiedAt,
  },
  "hacksaw-gaming-twisted-lab": {
    rtp: "96,30%",
    releaseDate: "2024-06-27",
    rtpSource: "https://fruityslots.com/slots/reviews/twisted-lab/",
    releaseDateSource: "https://fruityslots.com/slots/reviews/twisted-lab/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawCloseout3_20260924(slug: string) {
  return details[slug];
}
