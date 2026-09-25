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

const verifiedAt = "2026-09-25";

const details: Record<string, PlayngoPassportCloseout> = {
  "playn-go-annihilator": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://clashofslots.com/slots/playn-go/annihilator/",
    maxWinSource: "https://clashofslots.com/slots/playn-go/annihilator/",
    volatilitySource: "https://clashofslots.com/slots/playn-go/annihilator/",
    verifiedAt,
  },
  "playn-go-athena-ascending": {
    field: "5×3 · 20 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Athena-Ascending",
    rtpSource: "https://slotcatalog.com/en/slots/Athena-Ascending",
    maxWinSource: "https://slotcatalog.com/en/slots/Athena-Ascending",
    volatilitySource: "https://slotcatalog.com/en/slots/Athena-Ascending",
    verifiedAt,
  },
  "playn-go-aztec-idols": {
    rtp: "94,15%",
    maxWin: "22 725x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Aztec-Idols",
    maxWinSource: "https://slotcatalog.com/en/slots/Aztec-Idols",
    volatilitySource: "https://slotcatalog.com/en/slots/Aztec-Idols",
    verifiedAt,
  },
  "playn-go-aztec-warrior-princess": {
    rtp: "96,08%",
    maxWin: "1 000x",
    volatility: "Средняя",
    rtpSource: "https://www.aboutslots.com/casino-slots/aztec-warrior-princess",
    maxWinSource: "https://www.playngo.com/games/aztec-warrior-princess",
    volatilitySource: "https://www.aboutslots.com/casino-slots/aztec-warrior-princess",
    verifiedAt,
  },
  "playn-go-bakers-treat": {
    rtp: "96,04%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slototimes.com/slots/baker-s-treat/",
    maxWinSource: "https://slototimes.com/slots/baker-s-treat/",
    volatilitySource: "https://slototimes.com/slots/baker-s-treat/",
    verifiedAt,
  },
  "playn-go-banana-rock": {
    field: "5×3 · 10 линий",
    rtp: "96,60%",
    maxWin: "2 500x",
    volatility: "Высокая",
    fieldSource: "https://www.slotuk.org/free-slots/banana-rock/",
    rtpSource: "https://www.slotuk.org/free-slots/banana-rock/",
    maxWinSource: "https://www.slotuk.org/free-slots/banana-rock/",
    volatilitySource: "https://www.slotuk.org/free-slots/banana-rock/",
    verifiedAt,
  },
  "playn-go-banana-rush": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "3 000x",
    volatility: "Средняя",
    rtpSource: "https://demoslotkings.co.uk/casino-slots/playn-go/banana-rush/",
    maxWinSource: "https://demoslotkings.co.uk/casino-slots/playn-go/banana-rush/",
    volatilitySource: "https://demoslotkings.co.uk/casino-slots/playn-go/banana-rush/",
    verifiedAt,
  },
  "playn-go-bao-shi": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "15 000x",
    volatility: "Высокая",
    rtpSource: "https://www.bigwinboard.com/bao-shi-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/bao-shi-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/bao-shi-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-barn-busters": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "7 500x",
    volatility: "Средняя",
    rtpSource: "https://www.casinowizard.com/slots/barn-busters/",
    maxWinSource: "https://www.casinowizard.com/slots/barn-busters/",
    volatilitySource: "https://www.casinowizard.com/slots/barn-busters/",
    verifiedAt,
  },
  "playn-go-battle-royal": {
    rtp: "96,56%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotdatahub.com/slots/battle-royal/",
    maxWinSource: "https://slotdatahub.com/slots/battle-royal/",
    volatilitySource: "https://slotdatahub.com/slots/battle-royal/",
    verifiedAt,
  },
  "playn-go-beasts-of-fire": {
    rtp: "96,24%",
    maxWin: "25 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Beasts-of-Fire",
    maxWinSource: "https://slotcatalog.com/en/slots/Beasts-of-Fire",
    volatilitySource: "https://slotcatalog.com/en/slots/Beasts-of-Fire",
    verifiedAt,
  },
  "playn-go-big-win-777": {
    rtp: "96,50% / 94,50% / 91,50% / 87,50% / 84,50%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Big-Win-777",
    maxWinSource: "https://slotcatalog.com/en/slots/Big-Win-777",
    volatilitySource: "https://slotcatalog.com/en/slots/Big-Win-777",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout3(slug: string) {
  return details[slug];
}
