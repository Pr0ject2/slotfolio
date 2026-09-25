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
  "playn-go-ankh-of-anubis-awakening": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "15 000x",
    volatility: "Средняя",
    rtpSource: "https://clashofslots.com/slots/playn-go/ankh-of-anubis-awakening/",
    maxWinSource: "https://clashofslots.com/slots/playn-go/ankh-of-anubis-awakening/",
    volatilitySource: "https://clashofslots.com/slots/playn-go/ankh-of-anubis-awakening/",
    verifiedAt,
  },
  "playn-go-annihilator": {
    rtp: "96,20%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://www.aboutslots.com/casino-slots/annihilator-slot-review",
    maxWinSource: "https://www.aboutslots.com/casino-slots/annihilator-slot-review",
    volatilitySource: "https://www.aboutslots.com/casino-slots/annihilator-slot-review",
    verifiedAt,
  },
  "playn-go-athena-ascending": {
    field: "5×3 · 20 линий",
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    fieldSource: "https://www.bigwinboard.com/athena-ascending-playn-go-slot-review/",
    rtpSource: "https://www.bigwinboard.com/athena-ascending-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/athena-ascending-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/athena-ascending-playn-go-slot-review/",
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
  "playn-go-bakers-treat": {
    rtp: "96,04% / 94,03%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://www.betsrank.com/en/slots/bakers-treat",
    maxWinSource: "https://www.betsrank.com/en/slots/bakers-treat",
    volatilitySource: "https://www.betsrank.com/en/slots/bakers-treat",
    verifiedAt,
  },
  "playn-go-banana-rock": {
    field: "5×3 · 10 линий",
    rtp: "94,58%",
    maxWin: "2 500x",
    volatility: "Высокая",
    fieldSource: "https://slotcatalog.com/en/slots/Banana-Rock",
    rtpSource: "https://slotcatalog.com/en/slots/Banana-Rock",
    maxWinSource: "https://slotcatalog.com/en/slots/Banana-Rock",
    volatilitySource: "https://slotcatalog.com/en/slots/Banana-Rock",
    verifiedAt,
  },
  "playn-go-banana-rush": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "3 000x",
    volatility: "Средняя",
    rtpSource: "https://www.aboutslots.com/casino-slots/banana-rush",
    maxWinSource: "https://www.aboutslots.com/casino-slots/banana-rush",
    volatilitySource: "https://www.aboutslots.com/casino-slots/banana-rush",
    verifiedAt,
  },
  "playn-go-banquet-of-dead": {
    rtp: "96%",
    maxWin: "35 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Banquet-of-Dead",
    maxWinSource: "https://slotcatalog.com/en/slots/Banquet-of-Dead",
    volatilitySource: "https://slotcatalog.com/en/slots/Banquet-of-Dead",
    verifiedAt,
  },
  "playn-go-barn-busters": {
    rtp: "96,20%",
    maxWin: "7 500x",
    volatility: "Высокая",
    rtpSource: "https://barn-busters.com/",
    maxWinSource: "https://barn-busters.com/",
    volatilitySource: "https://barn-busters.com/",
    verifiedAt,
  },
  "playn-go-baron-lord-of-saturday": {
    rtp: "94,20%",
    maxWin: "3 500x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/baron-lord-of-saturday",
    maxWinSource: "https://slotcatalog.com/en/slots/baron-lord-of-saturday",
    volatilitySource: "https://slotcatalog.com/en/slots/baron-lord-of-saturday",
    verifiedAt,
  },
  "playn-go-battle-royal": {
    rtp: "96,56%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://www.luckymobileslots.com/game-reviews/battle-royal/",
    maxWinSource: "https://www.luckymobileslots.com/game-reviews/battle-royal/",
    volatilitySource: "https://www.luckymobileslots.com/game-reviews/battle-royal/",
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
  "playn-go-beasts-of-fire-maximum": {
    rtp: "96,25% / 94,23% / 91,23% / 87,23% / 84,23%",
    maxWin: "50 000x",
    volatility: "Высокая",
    rtpSource: "https://www.casinowizard.com/slots/beasts-of-fire-maximum/",
    maxWinSource: "https://www.casinowizard.com/slots/beasts-of-fire-maximum/",
    volatilitySource: "https://www.casinowizard.com/slots/beasts-of-fire-maximum/",
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
