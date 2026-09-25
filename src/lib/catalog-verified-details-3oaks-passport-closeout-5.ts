import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ThreeOaksPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "rtp" | "maxWin" | "volatility">
> & {
  rtpSource?: string;
  maxWinSource?: string;
  volatilitySource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-25";

const details: Record<string, ThreeOaksPassportCloseout> = {
  "3-oaks-gaming-3-super-hot-chillies": {
    rtp: "95,74%",
    maxWin: "1 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/3-super-hot-chillies",
    maxWinSource: "https://slotcatalog.com/en/slots/3-super-hot-chillies",
    volatilitySource: "https://slotcatalog.com/en/slots/3-super-hot-chillies",
    verifiedAt,
  },
  "3-oaks-gaming-buddha-megaways": {
    rtp: "95,58%",
    volatility: "Высокая",
    rtpSource: "https://www.slotstemple.com/free-slots/buddha-megaways/",
    volatilitySource: "https://www.slotstemple.com/free-slots/buddha-megaways/",
    verifiedAt,
  },
  "3-oaks-gaming-black-wolf-2": {
    rtp: "95,54%",
    maxWin: "2 000x",
    volatility: "Высокая",
    rtpSource: "https://slotuk.org/free-slots/black-wolf-2/",
    maxWinSource: "https://slotuk.org/free-slots/black-wolf-2/",
    volatilitySource: "https://slotuk.org/free-slots/black-wolf-2/",
    verifiedAt,
  },
  "3-oaks-gaming-4-pots-of-egypt": {
    rtp: "95,56–96,12% (зависит от версии)",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://spincompass.com/en-uk/slots/4-pots-of-egypt/",
    maxWinSource: "https://spincompass.com/en-uk/slots/4-pots-of-egypt/",
    volatilitySource: "https://spincompass.com/en-uk/slots/4-pots-of-egypt/",
    verifiedAt,
  },
  "3-oaks-gaming-4-wolf-drums": {
    rtp: "96%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://demoslots.at/slots/4-wolf-drums",
    maxWinSource: "https://demoslots.at/slots/4-wolf-drums",
    volatilitySource: "https://demoslots.at/slots/4-wolf-drums",
    verifiedAt,
  },
  "3-oaks-gaming-coin-volcano": {
    rtp: "95,66%",
    maxWin: "2 551x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Coin-Volcano",
    maxWinSource: "https://slotcatalog.com/en/slots/Coin-Volcano",
    volatilitySource: "https://slotcatalog.com/en/slots/Coin-Volcano",
    verifiedAt,
  },
  "3-oaks-gaming-dragon-pearls": {
    rtp: "95%",
    volatility: "Средняя",
    rtpSource: "https://chips.gg/ru/catalog/3oaks-dragon-pearls",
    volatilitySource: "https://chips.gg/ru/catalog/3oaks-dragon-pearls",
    verifiedAt,
  },
  "3-oaks-gaming-egypt-power-x1000": {
    rtp: "95,73%",
    rtpSource: "https://www.ultimateslots.com/free-demo/egypt-power-x1000/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetails3OaksPassportCloseout5(slug: string) {
  return details[slug];
}
