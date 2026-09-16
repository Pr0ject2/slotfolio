import type { CatalogVerifiedDetails } from "./catalog-verified-details";

const verifiedAt = "2026-09-16";

const details: Record<string, CatalogVerifiedDetails> = {
  "hacksaw-gaming-aiko-and-the-wind-spirit": {
    releaseDate: "2025-07-24",
    source: "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries",
    verifiedAt,
  },
  "hacksaw-gaming-army-of-ares": {
    releaseDate: "2025-12-04",
    source: "https://www.hacksawgaming.com/news/november-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-chaos-crew-3": {
    releaseDate: "2025-09-25",
    source: "https://www.hacksawgaming.com/news/august-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-dark-spiral": {
    releaseDate: "2026-03-05",
    source: "https://www.hacksawgaming.com/news/february-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-eternal-duel": {
    releaseDate: "2026-03-12",
    source: "https://www.hacksawgaming.com/news/february-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-hot-ross": {
    releaseDate: "2026-02-26",
    source: "https://www.hacksawgaming.com/news/january-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-invictus": {
    releaseDate: "2025-07-03",
    source: "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries",
    verifiedAt,
  },
  "hacksaw-gaming-jaws-of-justice": {
    releaseDate: "2025-12-11",
    source: "https://www.hacksawgaming.com/news/november-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-le-bunny": {
    releaseDate: "2026-03-26",
    source: "https://www.hacksawgaming.com/news/february-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-le-digger": {
    releaseDate: "2026-05-07",
    source: "https://www.hacksawgaming.com/news/april-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-le-fisherman": {
    releaseDate: "2026-02-05",
    source: "https://www.hacksawgaming.com/news/january-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-le-santa": {
    releaseDate: "2025-11-27",
    source: "https://www.hacksawgaming.com/news/october-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-miami-mayhem": {
    releaseDate: "2025-08-28",
    source: "https://www.hacksawgaming.com/news/july-round-up-hot-highlights",
    verifiedAt,
  },
  "hacksaw-gaming-spear-of-athena": {
    releaseDate: "2025-11-20",
    source: "https://www.hacksawgaming.com/news/october-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-stormborn": {
    releaseDate: "2025-09-18",
    source: "https://www.hacksawgaming.com/news/august-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-sun-princess": {
    releaseDate: "2025-10-23",
    source: "https://www.hacksawgaming.com/news/september-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-superstar-sevens": {
    releaseDate: "2026-02-19",
    source: "https://www.hacksawgaming.com/news/january-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-the-count": {
    releaseDate: "2025-10-14",
    source: "https://www.hacksawgaming.com/news/september-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-the-luxe": {
    releaseDate: "2025-07-17",
    source: "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries",
    verifiedAt,
  },
  "hacksaw-gaming-the-wildwood-curse": {
    releaseDate: "2025-10-02",
    source: "https://www.hacksawgaming.com/news/september-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-toshi-ways-club": {
    releaseDate: "2025-12-23",
    source: "https://www.hacksawgaming.com/news/november-round-up",
    verifiedAt,
  },
  "hacksaw-gaming-zeus-ze-zecond": {
    releaseDate: "2026-02-12",
    source: "https://www.hacksawgaming.com/news/january-round-up",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawProviderWide3(slug: string) {
  return details[slug];
}
