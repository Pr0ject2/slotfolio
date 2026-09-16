import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type ReleaseSourcedDetails = CatalogVerifiedDetails & {
  releaseDateSource: string;
};

const verifiedAt = "2026-09-16";

const releases: Record<string, Pick<ReleaseSourcedDetails, "releaseDate" | "releaseDateSource">> = {
  "hacksaw-gaming-circle-of-life": {
    releaseDate: "2026-01",
    releaseDateSource: "https://www.hacksawgaming.com/news/january-round-up",
  },
  "hacksaw-gaming-deal-with-death": {
    releaseDate: "2026-01",
    releaseDateSource: "https://www.hacksawgaming.com/news/january-round-up",
  },
  "hacksaw-gaming-pray-for-six": {
    releaseDate: "2026-01",
    releaseDateSource: "https://www.hacksawgaming.com/news/january-round-up",
  },
  "hacksaw-gaming-smoking-dragon": {
    releaseDate: "2026-01",
    releaseDateSource: "https://www.hacksawgaming.com/news/january-round-up",
  },
  "hacksaw-gaming-epic-bullets-and-bounty": {
    releaseDate: "2026-04",
    releaseDateSource: "https://www.hacksawgaming.com/news/april-round-up",
  },
  "hacksaw-gaming-munchy-milo": {
    releaseDate: "2026-04",
    releaseDateSource: "https://www.hacksawgaming.com/news/april-round-up",
  },
  "hacksaw-gaming-marlin-masters-atlantis": {
    releaseDate: "2026-04",
    releaseDateSource: "https://www.hacksawgaming.com/news/april-round-up",
  },
  "hacksaw-gaming-dynasty-of-death": {
    releaseDate: "2026-04",
    releaseDateSource: "https://www.hacksawgaming.com/news/april-round-up",
  },
  "hacksaw-gaming-dandy-diamonds": {
    releaseDate: "2026-06",
    releaseDateSource: "https://www.hacksawgaming.com/news/june-round-up",
  },
  "hacksaw-gaming-rise-of-fortuna": {
    releaseDate: "2026-06",
    releaseDateSource: "https://www.hacksawgaming.com/news/june-round-up",
  },
  "hacksaw-gaming-pray-for-three": {
    releaseDate: "2025-05",
    releaseDateSource: "https://www.hacksawgaming.com/news/may-game-round-up",
  },
  "hacksaw-gaming-spinman": {
    releaseDate: "2025-05",
    releaseDateSource: "https://www.hacksawgaming.com/news/may-game-round-up",
  },
  "hacksaw-gaming-ultimate-slot-of-america": {
    releaseDate: "2025-06",
    releaseDateSource: "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries",
  },
  "hacksaw-gaming-freds-food-truck": {
    releaseDate: "2025-06",
    releaseDateSource: "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries",
  },
  "hacksaw-gaming-le-king": {
    releaseDate: "2025-06",
    releaseDateSource: "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries",
  },
  "hacksaw-gaming-le-zeus": {
    releaseDate: "2025-09-11",
    releaseDateSource: "https://www.hacksawgaming.com/news/august-round-up",
  },
  "hacksaw-gaming-sixsixsix": {
    releaseDate: "2024-07",
    releaseDateSource: "https://www.hacksawgaming.com/news/july-2024-monthly-round-up",
  },
};

export function getCatalogVerifiedDetailsHacksawProviderWide4(slug: string): ReleaseSourcedDetails | undefined {
  const release = releases[slug];
  if (!release) return undefined;

  return {
    ...release,
    source: `https://www.hacksawgaming.com/games/${slug.replace("hacksaw-gaming-", "")}`,
    verifiedAt,
  };
}
