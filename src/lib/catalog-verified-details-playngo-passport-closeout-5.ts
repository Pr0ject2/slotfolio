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
  "playn-go-book-of-dead-go-collect": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://www.slot-streamers.com/game-reviews/book-of-dead-go-collect",
    maxWinSource: "https://www.slot-streamers.com/game-reviews/book-of-dead-go-collect",
    volatilitySource: "https://www.slot-streamers.com/game-reviews/book-of-dead-go-collect",
    verifiedAt,
  },
  "playn-go-bubblin-riches": {
    rtp: "96,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://casinogamesonnet.com/?game=bubblin-riches&id=7682",
    maxWinSource: "https://casinogamesonnet.com/?game=bubblin-riches&id=7682",
    volatilitySource: "https://casinogamesonnet.com/?game=bubblin-riches&id=7682",
    verifiedAt,
  },
  "playn-go-buildin-more-bucks": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "7 500x",
    volatility: "Средняя",
    rtpSource: "https://www.slot-streamers.com/game-reviews/buildin-more-bucks",
    maxWinSource: "https://www.slot-streamers.com/game-reviews/buildin-more-bucks",
    volatilitySource: "https://www.slot-streamers.com/game-reviews/buildin-more-bucks",
    verifiedAt,
  },
  "playn-go-bull-in-a-china-shop": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "5 800x",
    volatility: "Средняя",
    rtpSource: "https://www.aboutslots.com/casino-slots/bull-in-a-china-shop",
    maxWinSource: "https://www.aboutslots.com/casino-slots/bull-in-a-china-shop",
    volatilitySource: "https://www.aboutslots.com/casino-slots/bull-in-a-china-shop",
    verifiedAt,
  },
  "playn-go-bull-in-a-rodeo": {
    rtp: "96,20%",
    maxWin: "2 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://slotgods.co.uk/online-slots/bull-in-a-rodeo",
    maxWinSource: "https://slotgods.co.uk/online-slots/bull-in-a-rodeo",
    volatilitySource: "https://slotgods.co.uk/online-slots/bull-in-a-rodeo",
    verifiedAt,
  },
  "playn-go-bullion-xpress": {
    rtp: "96,29% / 94,29% / 91,28% / 87,30% / 84,30%",
    maxWin: "6 000x",
    volatility: "Средняя–высокая",
    rtpSource: "https://www.bigwinboard.com/bullion-xpress-playn-go-slot-review/",
    maxWinSource: "https://www.bigwinboard.com/bullion-xpress-playn-go-slot-review/",
    volatilitySource: "https://www.bigwinboard.com/bullion-xpress-playn-go-slot-review/",
    verifiedAt,
  },
  "playn-go-candy-island-princess": {
    rtp: "96,20%",
    maxWin: "2 200x",
    volatility: "Средняя",
    rtpSource: "https://www.aboutslots.com/casino-slots/candy-island-princess",
    maxWinSource: "https://www.aboutslots.com/casino-slots/candy-island-princess",
    volatilitySource: "https://www.aboutslots.com/casino-slots/candy-island-princess",
    verifiedAt,
  },
  "playn-go-canine-carnage": {
    field: "5×3 · 243 способа",
    rtp: "96,20%",
    maxWin: "3 000x",
    volatility: "Средняя–высокая",
    fieldSource: "https://www.gambling.com/games/free-slots/canine-carnage",
    rtpSource: "https://www.gambling.com/games/free-slots/canine-carnage",
    maxWinSource: "https://www.gambling.com/games/free-slots/canine-carnage",
    volatilitySource: "https://www.gambling.com/games/free-slots/canine-carnage",
    verifiedAt,
  },
  "playn-go-captain-glum-pirate-hunter": {
    field: "5×3–5 · 243 способа",
    rtp: "96,20%",
    maxWin: "9 000x",
    volatility: "Высокая",
    fieldSource: "https://www.aboutslots.com/casino-slots/captain-glum-pirate-hunter",
    rtpSource: "https://www.aboutslots.com/casino-slots/captain-glum-pirate-hunter",
    maxWinSource: "https://www.aboutslots.com/casino-slots/captain-glum-pirate-hunter",
    volatilitySource: "https://www.aboutslots.com/casino-slots/captain-glum-pirate-hunter",
    verifiedAt,
  },
  "playn-go-captain-xenos-earth-adventure": {
    rtp: "96,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://clashofslots.com/slots/playn-go/captain-xenos-earth-adventure/",
    maxWinSource: "https://clashofslots.com/slots/playn-go/captain-xenos-earth-adventure/",
    volatilitySource: "https://clashofslots.com/slots/playn-go/captain-xenos-earth-adventure/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout5(slug: string) {
  return details[slug];
}
