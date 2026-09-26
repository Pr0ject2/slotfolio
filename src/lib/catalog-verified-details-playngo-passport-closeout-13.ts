import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout14 } from "./catalog-verified-details-playngo-passport-closeout-14";

type PlayngoPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "field" | "rtp" | "maxWin" | "volatility">
> & {
  fieldSource?: string;
  rtpSource?: string;
  maxWinSource?: string;
  volatilitySource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-26";

const details: Record<string, PlayngoPassportCloseout> = {
  "playn-go-enchanted-crystals": {
    rtp: "94,75%",
    maxWin: "68 308x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Enchanted-Crystals-Playn-Go",
    maxWinSource: "https://slotcatalog.com/en/slots/Enchanted-Crystals-Playn-Go",
    volatilitySource: "https://slotcatalog.com/en/slots/Enchanted-Crystals-Playn-Go",
    verifiedAt,
  },
  "playn-go-energoonz": {
    rtp: "94,74%",
    maxWin: "1 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Energoonz",
    maxWinSource: "https://slotcatalog.com/en/slots/Energoonz",
    volatilitySource: "https://slotcatalog.com/en/slots/Energoonz",
    verifiedAt,
  },
  "playn-go-happy-halloween": {
    rtp: "94,59%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Happy-Halloween",
    maxWinSource: "https://slotcatalog.com/en/slots/Happy-Halloween",
    volatilitySource: "https://slotcatalog.com/en/slots/Happy-Halloween",
    verifiedAt,
  },
  "playn-go-grim-muerto": {
    rtp: "94,57%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Grim-Muerto",
    maxWinSource: "https://slotcatalog.com/en/slots/Grim-Muerto",
    volatilitySource: "https://slotcatalog.com/en/slots/Grim-Muerto",
    verifiedAt,
  },
  "playn-go-honey-rush": {
    rtp: "94,50%",
    maxWin: "9 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Honey-Rush",
    maxWinSource: "https://slotcatalog.com/en/slots/Honey-Rush",
    volatilitySource: "https://slotcatalog.com/en/slots/Honey-Rush",
    verifiedAt,
  },
  "playn-go-golden-ticket-2": {
    rtp: "96,50% / 94,50% / 91,50%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Golden-Ticket-2",
    maxWinSource: "https://slotcatalog.com/en/slots/Golden-Ticket-2",
    volatilitySource: "https://slotcatalog.com/en/slots/Golden-Ticket-2",
    verifiedAt,
  },
  "playn-go-house-of-doom": {
    rtp: "96,11%",
    maxWin: "2 500x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/House-of-Doom",
    maxWinSource: "https://slotcatalog.com/en/slots/House-of-Doom",
    volatilitySource: "https://slotcatalog.com/en/slots/House-of-Doom",
    verifiedAt,
  },
  "playn-go-house-of-doom-2-the-crypt": {
    rtp: "94,25%",
    maxWin: "6 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/House-of-Doom-2-The-Crypt",
    maxWinSource: "https://slotcatalog.com/en/slots/House-of-Doom-2-The-Crypt",
    volatilitySource: "https://slotcatalog.com/en/slots/House-of-Doom-2-The-Crypt",
    verifiedAt,
  },
  "playn-go-hugo-2": {
    rtp: "94,56%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Hugo-2",
    maxWinSource: "https://slotcatalog.com/en/slots/Hugo-2",
    volatilitySource: "https://slotcatalog.com/en/slots/Hugo-2",
    verifiedAt,
  },
  "playn-go-hotel-yeti-way": {
    rtp: "96,19%",
    volatility: "Высокая",
    rtpSource: "https://www.luckymobileslots.com/game-reviews/hotel-yeti-way/",
    volatilitySource: "https://www.luckymobileslots.com/game-reviews/hotel-yeti-way/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout13(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout14(slug);
}
