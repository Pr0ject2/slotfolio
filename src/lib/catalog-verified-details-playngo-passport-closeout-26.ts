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
  "playn-go-moon-princess-trinity": {
    field: "5×5 · кластеры",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "4 000x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Moon-Princess-Trinity",
    rtpSource: "https://slotcatalog.com/en/slots/Moon-Princess-Trinity",
    maxWinSource: "https://slotcatalog.com/en/slots/Moon-Princess-Trinity",
    volatilitySource: "https://slotcatalog.com/en/slots/Moon-Princess-Trinity",
    verifiedAt,
  },
  "playn-go-moon-princess-christmas-kingdom": {
    field: "5×5 · кластеры",
    rtp: "96,20%",
    maxWin: "15 000x",
    volatility: "Высокая",
    fieldSource: "https://slotsia.com/uk/games/slots/moon-princess-christmas-kingdom",
    rtpSource: "https://slotsia.com/uk/games/slots/moon-princess-christmas-kingdom",
    maxWinSource: "https://slotsia.com/uk/games/slots/moon-princess-christmas-kingdom",
    volatilitySource: "https://slotsia.com/uk/games/slots/moon-princess-christmas-kingdom",
    verifiedAt,
  },
  "playn-go-motley-crue": {
    field: "5×4 · 20 линий",
    rtp: "94,20%",
    maxWin: "5 000x",
    volatility: "Средняя",
    fieldSource: "https://slotcatalog.com/en/slots/Motley-Crue",
    rtpSource: "https://slotcatalog.com/en/slots/Motley-Crue",
    maxWinSource: "https://slotcatalog.com/en/slots/Motley-Crue",
    volatilitySource: "https://slotcatalog.com/en/slots/Motley-Crue",
    verifiedAt,
  },
  "playn-go-mount-m": {
    field: "5×4 · 1 024 способа",
    rtp: "94,20%",
    maxWin: "13 000x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Mount-M",
    rtpSource: "https://slotcatalog.com/en/slots/Mount-M",
    maxWinSource: "https://slotcatalog.com/en/slots/Mount-M",
    volatilitySource: "https://slotcatalog.com/en/slots/Mount-M",
    verifiedAt,
  },
  "playn-go-muerto-en-mictlan": {
    field: "5×3 · 10 линий",
    rtp: "96,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Muerto-En-Mictlan",
    rtpSource: "https://slotcatalog.com/en/slots/Muerto-En-Mictlan",
    maxWinSource: "https://slotcatalog.com/en/slots/Muerto-En-Mictlan",
    volatilitySource: "https://slotcatalog.com/en/slots/Muerto-En-Mictlan",
    verifiedAt,
  },
  "playn-go-mystery-egg-surprise": {
    field: "3×3 · 5 линий",
    rtp: "96,98%",
    maxWin: "6 480x",
    volatility: "Средняя",
    fieldSource: "https://demoslotkings.co.uk/casino-slots/playn-go/mystery-egg-surprise/",
    rtpSource: "https://slotdatahub.com/slots/mystery-egg-surprise/",
    maxWinSource: "https://slotdatahub.com/slots/mystery-egg-surprise/",
    volatilitySource: "https://slotdatahub.com/slots/mystery-egg-surprise/",
    verifiedAt,
  },
  "playn-go-mystery-genie-fortunes-of-the-lamp": {
    field: "5×4 · 20 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "6 000x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Mystery-Genie-Fortunes",
    rtpSource: "https://slotcatalog.com/en/slots/Mystery-Genie-Fortunes",
    maxWinSource: "https://slotcatalog.com/en/slots/Mystery-Genie-Fortunes",
    volatilitySource: "https://slotcatalog.com/en/slots/Mystery-Genie-Fortunes",
    verifiedAt,
  },
  "playn-go-mystery-joker": {
    field: "3×3 · 5 линий",
    rtp: "93,99%",
    maxWin: "6 020x",
    volatility: "Средняя",
    fieldSource: "https://slotcatalog.com/en/slots/Mystery-Joker",
    rtpSource: "https://slotcatalog.com/en/slots/Mystery-Joker",
    maxWinSource: "https://slotcatalog.com/en/slots/Mystery-Joker",
    volatilitySource: "https://slotcatalog.com/en/slots/Mystery-Joker",
    verifiedAt,
  },
  "playn-go-myth-of-dead": {
    field: "5×3 · 10 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "3 000x",
    volatility: "Средняя",
    fieldSource: "https://www.casinowizard.com/slots/myth-of-dead/",
    rtpSource: "https://www.casinowizard.com/slots/myth-of-dead/",
    maxWinSource: "https://www.casinowizard.com/slots/myth-of-dead/",
    volatilitySource: "https://www.casinowizard.com/slots/myth-of-dead/",
    verifiedAt,
  },
  "playn-go-naughty-nicks-book": {
    field: "5×3 · 10 линий",
    rtp: "96,28%",
    maxWin: "7 500x",
    volatility: "Высокая",
    fieldSource: "https://www.gmblrs.com/game-provider/play-n-go/naughty-nicks-book",
    rtpSource: "https://www.gmblrs.com/game-provider/play-n-go/naughty-nicks-book",
    maxWinSource: "https://www.gmblrs.com/game-provider/play-n-go/naughty-nicks-book",
    volatilitySource: "https://www.gmblrs.com/game-provider/play-n-go/naughty-nicks-book",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout26(slug: string) {
  return details[slug];
}
