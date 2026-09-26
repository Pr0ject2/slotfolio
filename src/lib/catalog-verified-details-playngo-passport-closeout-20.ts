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
  "playn-go-lady-of-fortune-destiny-spins": {
    rtp: "96,20%",
    maxWin: "1 950x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Lady-of-Fortune-Destiny-Spins",
    maxWinSource: "https://slotcatalog.com/en/slots/Lady-of-Fortune-Destiny-Spins",
    volatilitySource: "https://slotcatalog.com/en/slots/Lady-of-Fortune-Destiny-Spins",
    verifiedAt,
  },
  "playn-go-lady-of-fortune-remastered": {
    rtp: "96,20%",
    maxWin: "1 500x",
    volatility: "Низкая–средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Lady-of-Fortune-Remastered",
    maxWinSource: "https://slotcatalog.com/en/slots/Lady-of-Fortune-Remastered",
    volatilitySource: "https://slotcatalog.com/en/slots/Lady-of-Fortune-Remastered",
    verifiedAt,
  },
  "playn-go-lawn-n-disorder": {
    rtp: "96,20%",
    maxWin: "50 000x",
    volatility: "Высокая",
    rtpSource: "https://stake.com/casino/games/playngo-lawn-n-disorder",
    maxWinSource: "https://stake.com/casino/games/playngo-lawn-n-disorder",
    volatilitySource: "https://stake.com/casino/games/playngo-lawn-n-disorder",
    verifiedAt,
  },
  "playn-go-legacy-of-dynasties": {
    rtp: "96,28%",
    maxWin: "2 300x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Legacy-of-Dynasties",
    maxWinSource: "https://slotcatalog.com/en/slots/Legacy-of-Dynasties",
    volatilitySource: "https://slotcatalog.com/en/slots/Legacy-of-Dynasties",
    verifiedAt,
  },
  "playn-go-legacy-of-egypt": {
    rtp: "94,50%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Legacy-of-Egypt",
    maxWinSource: "https://slotcatalog.com/en/slots/Legacy-of-Egypt",
    volatilitySource: "https://slotcatalog.com/en/slots/Legacy-of-Egypt",
    verifiedAt,
  },
  "playn-go-legacy-of-inca": {
    field: "5×3 · 20 линий",
    rtp: "94,27%",
    maxWin: "6 500x",
    volatility: "Средняя",
    fieldSource: "https://slotcatalog.com/en/slots/Legacy-of-Inca",
    rtpSource: "https://slotcatalog.com/en/slots/Legacy-of-Inca",
    maxWinSource: "https://slotcatalog.com/en/slots/Legacy-of-Inca",
    volatilitySource: "https://slotcatalog.com/en/slots/Legacy-of-Inca",
    verifiedAt,
  },
  "playn-go-legacy-of-undead-dragon-abyssways": {
    rtp: "96,20%",
    maxWin: "20 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Legacy-of-Undead-Dragon-ABYSSWAYS",
    maxWinSource: "https://slotcatalog.com/en/slots/Legacy-of-Undead-Dragon-ABYSSWAYS",
    volatilitySource: "https://slotcatalog.com/en/slots/Legacy-of-Undead-Dragon-ABYSSWAYS",
    verifiedAt,
  },
  "playn-go-legend-of-the-ice-dragon": {
    rtp: "94,28%",
    maxWin: "6 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Legend-of-the-Ice-Dragon",
    maxWinSource: "https://slotcatalog.com/en/slots/Legend-of-the-Ice-Dragon",
    volatilitySource: "https://slotcatalog.com/en/slots/Legend-of-the-Ice-Dragon",
    verifiedAt,
  },
  "playn-go-legion-gold": {
    field: "5×3 · 25 линий",
    rtp: "94,23%",
    maxWin: "2 000x",
    volatility: "Низкая–средняя",
    fieldSource: "https://slotcatalog.com/en/slots/Legion-Gold",
    rtpSource: "https://slotcatalog.com/en/slots/Legion-Gold",
    maxWinSource: "https://slotcatalog.com/en/slots/Legion-Gold",
    volatilitySource: "https://slotcatalog.com/en/slots/Legion-Gold",
    verifiedAt,
  },
  "playn-go-legion-gold-and-the-sphinx-of-dead": {
    rtp: "94,25%",
    maxWin: "3 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Legion-Gold-and-the-Sphinx-of-Dead",
    maxWinSource: "https://slotcatalog.com/en/slots/Legion-Gold-and-the-Sphinx-of-Dead",
    volatilitySource: "https://slotcatalog.com/en/slots/Legion-Gold-and-the-Sphinx-of-Dead",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout20(slug: string) {
  return details[slug];
}
