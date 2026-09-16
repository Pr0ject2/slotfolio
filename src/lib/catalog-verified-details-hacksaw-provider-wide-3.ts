import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ReleaseSourcedDetails = CatalogVerifiedDetails & {
  releaseDateSource: string;
};

const verifiedAt = "2026-09-16";

const releases: Record<string, Pick<ReleaseSourcedDetails, "releaseDate" | "releaseDateSource">> = {
  "hacksaw-gaming-aiko-and-the-wind-spirit": {
    releaseDate: "2025-07-24",
    releaseDateSource: "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries",
  },
  "hacksaw-gaming-army-of-ares": {
    releaseDate: "2025-12-04",
    releaseDateSource: "https://www.hacksawgaming.com/news/november-round-up",
  },
  "hacksaw-gaming-chaos-crew-3": {
    releaseDate: "2025-09-25",
    releaseDateSource: "https://www.hacksawgaming.com/news/august-round-up",
  },
  "hacksaw-gaming-dark-spiral": {
    releaseDate: "2026-03-05",
    releaseDateSource: "https://www.hacksawgaming.com/news/february-round-up",
  },
  "hacksaw-gaming-eternal-duel": {
    releaseDate: "2026-03-12",
    releaseDateSource: "https://www.hacksawgaming.com/news/february-round-up",
  },
  "hacksaw-gaming-hot-ross": {
    releaseDate: "2026-02-26",
    releaseDateSource: "https://www.hacksawgaming.com/news/january-round-up",
  },
  "hacksaw-gaming-invictus": {
    releaseDate: "2025-07-03",
    releaseDateSource: "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries",
  },
  "hacksaw-gaming-jaws-of-justice": {
    releaseDate: "2025-12-11",
    releaseDateSource: "https://www.hacksawgaming.com/news/november-round-up",
  },
  "hacksaw-gaming-le-bunny": {
    releaseDate: "2026-03-26",
    releaseDateSource: "https://www.hacksawgaming.com/news/february-round-up",
  },
  "hacksaw-gaming-le-digger": {
    releaseDate: "2026-05-07",
    releaseDateSource: "https://www.hacksawgaming.com/news/april-round-up",
  },
  "hacksaw-gaming-le-fisherman": {
    releaseDate: "2026-02-05",
    releaseDateSource: "https://www.hacksawgaming.com/news/january-round-up",
  },
  "hacksaw-gaming-le-santa": {
    releaseDate: "2025-11-27",
    releaseDateSource: "https://www.hacksawgaming.com/news/october-round-up",
  },
  "hacksaw-gaming-miami-mayhem": {
    releaseDate: "2025-08-28",
    releaseDateSource: "https://www.hacksawgaming.com/news/july-round-up-hot-highlights",
  },
  "hacksaw-gaming-spear-of-athena": {
    releaseDate: "2025-11-20",
    releaseDateSource: "https://www.hacksawgaming.com/news/october-round-up",
  },
  "hacksaw-gaming-stormborn": {
    releaseDate: "2025-09-18",
    releaseDateSource: "https://www.hacksawgaming.com/news/august-round-up",
  },
  "hacksaw-gaming-sun-princess": {
    releaseDate: "2025-10-23",
    releaseDateSource: "https://www.hacksawgaming.com/news/september-round-up",
  },
  "hacksaw-gaming-superstar-sevens": {
    releaseDate: "2026-02-19",
    releaseDateSource: "https://www.hacksawgaming.com/news/january-round-up",
  },
  "hacksaw-gaming-the-count": {
    releaseDate: "2025-10-14",
    releaseDateSource: "https://www.hacksawgaming.com/news/september-round-up",
  },
  "hacksaw-gaming-the-luxe": {
    releaseDate: "2025-07-17",
    releaseDateSource: "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries",
  },
  "hacksaw-gaming-the-wildwood-curse": {
    releaseDate: "2025-10-02",
    releaseDateSource: "https://www.hacksawgaming.com/news/september-round-up",
  },
  "hacksaw-gaming-toshi-ways-club": {
    releaseDate: "2025-12-23",
    releaseDateSource: "https://www.hacksawgaming.com/news/november-round-up",
  },
  "hacksaw-gaming-zeus-ze-zecond": {
    releaseDate: "2026-02-12",
    releaseDateSource: "https://www.hacksawgaming.com/news/january-round-up",
  },
};

export function getCatalogVerifiedDetailsHacksawProviderWide3(slug: string): ReleaseSourcedDetails | undefined {
  const release = releases[slug];
  if (!release) return undefined;

  return {
    ...release,
    source: `https://www.hacksawgaming.com/games/${slug.replace("hacksaw-gaming-", "")}`,
    verifiedAt,
  };
}
