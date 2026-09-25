import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type PlayngoPassportCloseout = Partial<
  Pick<CatalogVerifiedDetails, "rtp" | "maxWin" | "volatility">
> & {
  rtpSource?: string;
  maxWinSource?: string;
  volatilitySource?: string;
  verifiedAt: string;
};

const verifiedAt = "2026-09-25";

const details: Record<string, PlayngoPassportCloseout> = {
  "playn-go-13th-trial-hercules-abyssways": {
    rtp: "96,2% / 94,2% / 91,21% / 87,2% / 84,2%",
    maxWin: "60 000x",
    volatility: "Высокая",
    rtpSource: "https://ispinix.com/game/13th-trial-hercules-abyssways/",
    maxWinSource: "https://ispinix.com/game/13th-trial-hercules-abyssways/",
    volatilitySource: "https://ispinix.com/game/13th-trial-hercules-abyssways/",
    verifiedAt,
  },
  "playn-go-15-crystal-roses-a-tale-of-love": {
    rtp: "96,2%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/15-Crystal-Roses-A-Tale-of-Love",
    maxWinSource: "https://slotcatalog.com/en/slots/15-Crystal-Roses-A-Tale-of-Love",
    volatilitySource: "https://slotcatalog.com/en/slots/15-Crystal-Roses-A-Tale-of-Love",
    verifiedAt,
  },
  "playn-go-24k-dragon": {
    rtp: "96,2%",
    maxWin: "24 000x",
    volatility: "Высокая",
    rtpSource: "https://www.slotuk.org/free-slots/24k-dragon/",
    maxWinSource: "https://www.slotuk.org/free-slots/24k-dragon/",
    volatilitySource: "https://www.slotuk.org/free-slots/24k-dragon/",
    verifiedAt,
  },
  "playn-go-3-clown-monty": {
    rtp: "96,23%",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/3-Clown-Monty",
    volatilitySource: "https://slotcatalog.com/en/slots/3-Clown-Monty",
    verifiedAt,
  },
  "playn-go-3-clown-monty-ii": {
    rtp: "96,26% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "10 000x",
    volatility: "Высокая",
    rtpSource: "https://www.aboutslots.com/casino-slots/3-clown-monty-ii",
    maxWinSource: "https://www.aboutslots.com/casino-slots/3-clown-monty-ii",
    volatilitySource: "https://www.aboutslots.com/casino-slots/3-clown-monty-ii",
    verifiedAt,
  },
  "playn-go-7-sins": {
    rtp: "96,28%",
    maxWin: "1 580x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/7-Sins",
    maxWinSource: "https://slotcatalog.com/en/slots/7-Sins",
    volatilitySource: "https://slotcatalog.com/en/slots/7-Sins",
    verifiedAt,
  },
  "playn-go-alice-cooper-and-the-tome-of-madness": {
    rtp: "96,20%",
    maxWin: "3 000x",
    volatility: "Высокая",
    rtpSource: "https://slotcatalog.com/en/slots/Alice-Cooper-and-the-Tome-of-Madness",
    maxWinSource: "https://slotcatalog.com/en/slots/Alice-Cooper-and-the-Tome-of-Madness",
    volatilitySource: "https://slotcatalog.com/en/slots/Alice-Cooper-and-the-Tome-of-Madness",
    verifiedAt,
  },
  "playn-go-animal-madness": {
    rtp: "96,2% / 94,23% / 91,25% / 87,24% / 84,2%",
    volatility: "Средняя",
    rtpSource: "https://www.betsrank.com/en/slots/animal-madness",
    volatilitySource: "https://www.betsrank.com/en/slots/animal-madness",
    verifiedAt,
  },
  "playn-go-ankh-of-anubis": {
    rtp: "96,20% / 94,20% / 91,20% / 87,20% / 84,20%",
    maxWin: "15 000x",
    volatility: "Высокая",
    rtpSource: "https://clashofslots.com/slots/playn-go/ankh-of-anubis/",
    maxWinSource: "https://clashofslots.com/slots/playn-go/ankh-of-anubis/",
    volatilitySource: "https://clashofslots.com/slots/playn-go/ankh-of-anubis/",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsPlayngoPassportCloseout2(slug: string) {
  return details[slug];
}
