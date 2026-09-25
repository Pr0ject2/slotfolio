import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawPassportCloseout2 = Partial<Pick<CatalogVerifiedDetails, "rtp" | "releaseDate">> & {
  rtpSource?: string;
  releaseDateSource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-24";

const details: Record<string, HacksawPassportCloseout2> = {
  "hacksaw-gaming-bullets-and-bounty": {
    rtp: "96,27% / 94,14% / 92,18% / 86,11%",
    releaseDate: "2025-08-11",
    rtpSource: "https://www.gamblingzone.com/uk/slots/bullets-and-bounty/",
    releaseDateSource: "https://www.gamblingzone.com/uk/slots/bullets-and-bounty/",
    verifiedAt,
  },
  "hacksaw-gaming-evil-eyes": {
    rtp: "96,24%",
    releaseDate: "2024-09-04",
    rtpSource: "https://slotcatalog.com/en/slots/evil-eyes",
    releaseDateSource: "https://slotcatalog.com/en/slots/evil-eyes",
    verifiedAt,
  },
  "hacksaw-gaming-marlin-masters-the-big-haul": {
    rtp: "96,28%",
    releaseDate: "2025-08-04",
    rtpSource: "https://slotcatalog.com/en/slots/marlin-masters-the-big-haul",
    releaseDateSource: "https://slotcatalog.com/en/slots/marlin-masters-the-big-haul",
    verifiedAt,
  },
  "hacksaw-gaming-mayan-stackways": {
    rtp: "96,23%",
    releaseDate: "2023-04-20",
    rtpSource: "https://slotcatalog.com/en/slots/Mayan-Stackways",
    releaseDateSource: "https://slotcatalog.com/en/slots/Mayan-Stackways",
    verifiedAt,
  },
  "hacksaw-gaming-steamrunners": {
    rtp: "96,32% / 94,30% / 92,24% / 86,26%",
    releaseDate: "2025-11-13",
    rtpSource: "https://dyutam.com/slot/steamrunners-slot-review-hacksaw/",
    releaseDateSource: "https://www.onlinecasinos.net/hacksaw-gaming-slots-rtp/",
    verifiedAt,
  },
  "hacksaw-gaming-wishbringer": {
    rtp: "96,33% / 94,22% / 92,27% / 88,21%",
    releaseDate: "2025-04-03",
    rtpSource: "https://www.onlinecasinos.net/hacksaw-gaming-slots-rtp/",
    releaseDateSource: "https://www.onlinecasinos.net/hacksaw-gaming-slots-rtp/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawPassportCloseout2(slug: string) {
  return details[slug];
}
