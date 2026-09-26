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
  "playn-go-ras-reckoning": {
    rtp: "96,20%",
    maxWin: "50 000x",
    volatility: "Очень высокая",
    rtpSource: "https://slotyeti.com/en/slots/ras-reckoning/",
    maxWinSource: "https://slotyeti.com/en/slots/ras-reckoning/",
    volatilitySource: "https://slotyeti.com/en/slots/ras-reckoning/",
    verifiedAt,
  },
  "playn-go-rage-to-riches": {
    field: "5×3 · 20 линий",
    rtp: "97,00%",
    maxWin: "1 000x",
    volatility: "Низкая",
    fieldSource: "https://casinosincanada.com/slots/rage-to-riches/",
    rtpSource: "https://casinosincanada.com/slots/rage-to-riches/",
    maxWinSource: "https://casinosincanada.com/slots/rage-to-riches/",
    volatilitySource: "https://slotcatalog.com/en/slots/Rage-to-Riches",
    verifiedAt,
  },
  "playn-go-raging-rex-3": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "30 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Raging-Rex-3",
    maxWinSource: "https://slotcatalog.com/en/slots/Raging-Rex-3",
    volatilitySource: "https://slotcatalog.com/en/slots/Raging-Rex-3",
    verifiedAt,
  },
  "playn-go-rainforest-magic": {
    rtp: "96,54% / 94,50% / 91,49% / 87,54% / 84,56%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotsgames-in.net/rainforest-magic/",
    maxWinSource: "https://slotsgames-in.net/rainforest-magic/",
    volatilitySource: "https://slotsgames-in.net/rainforest-magic/",
    verifiedAt,
  },
  "playn-go-rally-4-riches": {
    rtp: "96,25%",
    maxWin: "5 000x",
    volatility: "Средняя",
    rtpSource: "https://slotcatalog.com/en/slots/Rally-4-Riches",
    maxWinSource: "https://slotcatalog.com/en/slots/Rally-4-Riches",
    volatilitySource: "https://slotcatalog.com/en/slots/Rally-4-Riches",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout31(slug: string) {
  return details[slug];
}
