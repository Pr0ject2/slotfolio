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
  "playn-go-miner-donkey-trouble": {
    rtp: "96,27%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://www.online-slot.co.uk/online-slots/reviews/miner-donkey-trouble/",
    maxWinSource: "https://www.online-slot.co.uk/online-slots/reviews/miner-donkey-trouble/",
    volatilitySource: "https://www.online-slot.co.uk/online-slots/reviews/miner-donkey-trouble/",
    verifiedAt,
  },
  "playn-go-mirror-joker": {
    rtp: "96,20%",
    maxWin: "1 400x",
    volatility: "Средняя",
    rtpSource: "https://mirrorjoker.com/demo/",
    maxWinSource: "https://mirrorjoker.com/demo/",
    volatilitySource: "https://mirrorjoker.com/demo/",
    verifiedAt,
  },
  "playn-go-mission-cash": {
    rtp: "96,65% / 94,49% / 91,48% / 87,51% / 84,62%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotsgames-in.net/mission-cash/",
    maxWinSource: "https://slotsgames-in.net/mission-cash/",
    volatilitySource: "https://slotsgames-in.net/mission-cash/",
    verifiedAt,
  },
  "playn-go-monkey-battle-for-the-scrolls": {
    rtp: "96,21% / 94,22% / 91,25% / 87,25% / 84,27%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://www.aboutslots.com/casino-slots/monkey-battle-for-the-scrolls",
    maxWinSource: "https://www.aboutslots.com/casino-slots/monkey-battle-for-the-scrolls",
    volatilitySource: "https://www.aboutslots.com/casino-slots/monkey-battle-for-the-scrolls",
    verifiedAt,
  },
  "playn-go-moon-princess": {
    rtp: "96,50%",
    maxWin: "5 000x",
    volatility: "Высокая",
    rtpSource: "https://slotzkilla.com/providers/playn-go/moon-princess/",
    maxWinSource: "https://slotzkilla.com/providers/playn-go/moon-princess/",
    volatilitySource: "https://slotzkilla.com/providers/playn-go/moon-princess/",
    verifiedAt,
  },
  "playn-go-moon-princess-100": {
    rtp: "96,20%",
    maxWin: "15 000x",
    volatility: "Высокая",
    rtpSource: "https://www.luckymobileslots.com/game-reviews/moon-princess-100/",
    maxWinSource: "https://www.luckymobileslots.com/game-reviews/moon-princess-100/",
    volatilitySource: "https://www.luckymobileslots.com/game-reviews/moon-princess-100/",
    verifiedAt,
  },
  "playn-go-moon-princess-extreme": {
    rtp: "96,20%",
    maxWin: "50 000x",
    volatility: "Очень высокая",
    rtpSource: "https://www.oranjepalace.nl/nl/blog/moon-princess-extreme",
    maxWinSource: "https://www.oranjepalace.nl/nl/blog/moon-princess-extreme",
    volatilitySource: "https://www.oranjepalace.nl/nl/blog/moon-princess-extreme",
    verifiedAt,
  },
  "playn-go-moon-princess-origins": {
    rtp: "96,29%",
    volatility: "Высокая",
    rtpSource: "https://www.luckymobileslots.com/game-reviews/moon-princess-origins/",
    volatilitySource: "https://www.luckymobileslots.com/game-reviews/moon-princess-origins/",
    verifiedAt,
  },
  "playn-go-moon-princess-power-of-love": {
    rtp: "96,20%",
    maxWin: "15 000x",
    volatility: "Высокая",
    rtpSource: "https://time2play.com/casinos/games/slots/moon-princess-power-of-love/",
    maxWinSource: "https://time2play.com/casinos/games/slots/moon-princess-power-of-love/",
    volatilitySource: "https://time2play.com/casinos/games/slots/moon-princess-power-of-love/",
    verifiedAt,
  },
  "playn-go-moon-princess-stargazing": {
    rtp: "96,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://www.gambling.com/uk/online-casinos/slots/games/moon-princess-stargazing",
    maxWinSource: "https://www.gambling.com/uk/online-casinos/slots/games/moon-princess-stargazing",
    volatilitySource: "https://www.gambling.com/uk/online-casinos/slots/games/moon-princess-stargazing",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout25(slug: string) {
  return details[slug];
}
