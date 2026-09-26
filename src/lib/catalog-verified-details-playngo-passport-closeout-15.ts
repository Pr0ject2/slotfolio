import type { CatalogVerifiedDetails } from "./catalog-verified-details";
import { getCatalogVerifiedDetailsPlayngoPassportCloseout16 } from "./catalog-verified-details-playngo-passport-closeout-16";

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
  "playn-go-demon": {
    rtp: "94,51%",
    maxWin: "2 500x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Demon",
    maxWinSource: "https://slotcatalog.com/en/slots/Demon",
    volatilitySource: "https://slotcatalog.com/en/slots/Demon",
    verifiedAt,
  },
  "playn-go-holiday-spirits": {
    rtp: "94,22%",
    maxWin: "1 600x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Holiday-Spirits",
    maxWinSource: "https://slotcatalog.com/en/slots/Holiday-Spirits",
    volatilitySource: "https://slotcatalog.com/en/slots/Holiday-Spirits",
    verifiedAt,
  },
  "playn-go-highway-legends": {
    rtp: "96,25%",
    maxWin: "1 250x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Highway-Legends",
    maxWinSource: "https://slotcatalog.com/en/slots/Highway-Legends",
    volatilitySource: "https://slotcatalog.com/en/slots/Highway-Legends",
    verifiedAt,
  },
  "playn-go-holiday-season": {
    rtp: "94,51%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Holiday-season",
    maxWinSource: "https://slotcatalog.com/en/slots/Holiday-season",
    volatilitySource: "https://slotcatalog.com/en/slots/Holiday-season",
    verifiedAt,
  },
  "playn-go-hugo-carts": {
    rtp: "94,24%",
    maxWin: "25 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Hugo-Carts",
    maxWinSource: "https://slotcatalog.com/en/slots/Hugo-Carts",
    volatilitySource: "https://slotcatalog.com/en/slots/Hugo-Carts",
    verifiedAt,
  },
  "playn-go-honey-rush-black-and-yellow": {
    rtp: "96,25%",
    maxWin: "20 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/honey-rush-black-and-yellow",
    maxWinSource: "https://slotcatalog.com/en/slots/honey-rush-black-and-yellow",
    volatilitySource: "https://slotcatalog.com/en/slots/honey-rush-black-and-yellow",
    verifiedAt,
  },
  "playn-go-hooligan-hustle": {
    field: "5×3 · 243 способа",
    rtp: "94,27%",
    maxWin: "10 000x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Hooligan-Hustle",
    rtpSource: "https://slotcatalog.com/en/slots/Hooligan-Hustle",
    maxWinSource: "https://slotcatalog.com/en/slots/Hooligan-Hustle",
    volatilitySource: "https://slotcatalog.com/en/slots/Hooligan-Hustle",
    verifiedAt,
  },
  "playn-go-hope-unleashed-fortune-rises": {
    field: "5×4 · 20 линий",
    rtp: "96,20%",
    maxWin: "1 234x",
    volatility: "Средняя",
    fieldSource: "https://slotcatalog.com/en/slots/hope-unleashed-fortune-rises",
    rtpSource: "https://slotcatalog.com/en/slots/hope-unleashed-fortune-rises",
    maxWinSource: "https://slotcatalog.com/en/slots/hope-unleashed-fortune-rises",
    volatilitySource: "https://slotcatalog.com/en/slots/hope-unleashed-fortune-rises",
    verifiedAt,
  },
  "playn-go-hot-dog-heist": {
    rtp: "94,57%",
    maxWin: "2 500x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/hot-dog-heist",
    maxWinSource: "https://slotcatalog.com/en/slots/hot-dog-heist",
    volatilitySource: "https://slotcatalog.com/en/slots/hot-dog-heist",
    verifiedAt,
  },
  "playn-go-hugo": {
    rtp: "94,40%",
    maxWin: "10 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Hugo",
    maxWinSource: "https://slotcatalog.com/en/slots/Hugo",
    volatilitySource: "https://slotcatalog.com/en/slots/Hugo",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout15(slug: string) {
  return details[slug] ?? getCatalogVerifiedDetailsPlayngoPassportCloseout16(slug);
}
