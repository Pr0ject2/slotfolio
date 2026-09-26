import type { CatalogVerifiedDetails } from "./catalog-verified-details";

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
  "playn-go-dragon-maiden": {
    rtp: "94,46%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Dragon-Maiden",
    maxWinSource: "https://slotcatalog.com/en/slots/Dragon-Maiden",
    volatilitySource: "https://slotcatalog.com/en/slots/Dragon-Maiden",
    verifiedAt,
  },
  "playn-go-golden-osiris": {
    field: "7×7",
    rtp: "96,27% / 94,25%",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Golden-Osiris",
    rtpSource: "https://slotcatalog.com/en/slots/Golden-Osiris",
    volatilitySource: "https://slotcatalog.com/en/slots/Golden-Osiris",
    verifiedAt,
  },
  "playn-go-golden-ticket": {
    rtp: "94,74%",
    maxWin: "20 578x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Golden-Ticket",
    maxWinSource: "https://slotcatalog.com/en/slots/Golden-Ticket",
    volatilitySource: "https://slotcatalog.com/en/slots/Golden-Ticket",
    verifiedAt,
  },
  "playn-go-hammerfall": {
    rtp: "94,20%",
    maxWin: "30 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Hammerfall",
    maxWinSource: "https://slotcatalog.com/en/slots/Hammerfall",
    volatilitySource: "https://slotcatalog.com/en/slots/Hammerfall",
    verifiedAt,
  },
  "playn-go-gemix-2": {
    rtp: "94,20%",
    maxWin: "7 500x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Gemix-2",
    maxWinSource: "https://slotcatalog.com/en/slots/Gemix-2",
    volatilitySource: "https://slotcatalog.com/en/slots/Gemix-2",
    verifiedAt,
  },
  "playn-go-gigantoonz": {
    rtp: "94,25%",
    maxWin: "4 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Gigantoonz",
    maxWinSource: "https://slotcatalog.com/en/slots/Gigantoonz",
    volatilitySource: "https://slotcatalog.com/en/slots/Gigantoonz",
    verifiedAt,
  },
  "playn-go-golden-caravan": {
    rtp: "94,18%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Golden-Caravan",
    maxWinSource: "https://slotcatalog.com/en/slots/Golden-Caravan",
    volatilitySource: "https://slotcatalog.com/en/slots/Golden-Caravan",
    verifiedAt,
  },
  "playn-go-gold-king": {
    rtp: "94,54%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Gold-King",
    maxWinSource: "https://slotcatalog.com/en/slots/Gold-King",
    volatilitySource: "https://slotcatalog.com/en/slots/Gold-King",
    verifiedAt,
  },
  "playn-go-golden-legend": {
    rtp: "94,59%",
    maxWin: "10 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Golden-Legend-Play-n-Go",
    maxWinSource: "https://slotcatalog.com/en/slots/Golden-Legend-Play-n-Go",
    volatilitySource: "https://slotcatalog.com/en/slots/Golden-Legend-Play-n-Go",
    verifiedAt,
  },
  "playn-go-ghost-of-dead": {
    rtp: "94,21%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Ghost-of-Dead",
    maxWinSource: "https://slotcatalog.com/en/slots/Ghost-of-Dead",
    volatilitySource: "https://slotcatalog.com/en/slots/Ghost-of-Dead",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout14(slug: string) {
  return details[slug];
}
