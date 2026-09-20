import type { CatalogVerifiedDetails } from "./catalog-verified-details";

type HacksawScore6Details = Pick<CatalogVerifiedDetails, "source" | "verifiedAt" | "releaseDate"> & {
  releaseDateSource: string;
};

const verifiedAt = "2026-09-20";

const details: Record<string, HacksawScore6Details> = {
  "hacksaw-gaming-bash-bros": {
    releaseDate: "2025-10-09",
    releaseDateSource: "https://www.hacksawgaming.com/news/september-round-up",
    source: "https://www.hacksawgaming.com/games/bash-bros",
    verifiedAt,
  },
  "hacksaw-gaming-bouncy-bombs": {
    releaseDate: "2024-03",
    releaseDateSource: "https://www.hacksawgaming.com/news/march-monthly-round-up",
    source: "https://www.hacksawgaming.com/games/bouncy-bombs",
    verifiedAt,
  },
  "hacksaw-gaming-dark-summoning": {
    releaseDate: "2023-12",
    releaseDateSource: "https://www.hacksawgaming.com/news/end-of-year-game-release-roundup",
    source: "https://www.hacksawgaming.com/games/dark-summoning",
    verifiedAt,
  },
  "hacksaw-gaming-densho": {
    releaseDate: "2023-09-07",
    releaseDateSource: "https://www.hacksawgaming.com/news/september-game-release-round-up",
    source: "https://www.hacksawgaming.com/games/densho",
    verifiedAt,
  },
  "hacksaw-gaming-dropem": {
    releaseDate: "2023-07-27",
    releaseDateSource: "https://www.hacksawgaming.com/news/july-monthly-round-up",
    source: "https://www.hacksawgaming.com/games/drop-em",
    verifiedAt,
  },
  "hacksaw-gaming-eye-of-medusa": {
    releaseDate: "2025-07-10",
    releaseDateSource: "https://www.hacksawgaming.com/news/june-round-up-awards-and-anniversaries",
    source: "https://www.hacksawgaming.com/games/eye-of-medusa",
    verifiedAt,
  },
  "hacksaw-gaming-immortal-desire": {
    releaseDate: "2023-11",
    releaseDateSource: "https://www.hacksawgaming.com/news/end-of-year-game-release-roundup",
    source: "https://www.hacksawgaming.com/games/immortal-desire",
    verifiedAt,
  },
  "hacksaw-gaming-mighty-masks": {
    releaseDate: "2023-06",
    releaseDateSource: "https://www.hacksawgaming.com/news/june-monthly-round-up-at-hacksaw",
    source: "https://www.hacksawgaming.com/games/mighty-masks",
    verifiedAt,
  },
  "hacksaw-gaming-ronin-stackways": {
    releaseDate: "2023-08-10",
    releaseDateSource: "https://www.hacksawgaming.com/news/august-2023-game-release-wrap",
    source: "https://www.hacksawgaming.com/games/ronin-stackways",
    verifiedAt,
  },
  "hacksaw-gaming-temple-of-torment": {
    releaseDate: "2023-05-25",
    releaseDateSource: "https://www.hacksawgaming.com/news/may-news-round-up-at-hacksaw",
    source: "https://www.hacksawgaming.com/games/temple-of-torment",
    verifiedAt,
  },
  "hacksaw-gaming-vending-machine": {
    releaseDate: "2023-07-13",
    releaseDateSource: "https://www.hacksawgaming.com/news/july-monthly-round-up",
    source: "https://www.hacksawgaming.com/games/vending-machine",
    verifiedAt,
  },
  "hacksaw-gaming-xmas-drop": {
    releaseDate: "2023-11",
    releaseDateSource: "https://www.hacksawgaming.com/news/end-of-year-game-release-roundup",
    source: "https://www.hacksawgaming.com/games/xmas-drop",
    verifiedAt,
  },
};

export function getCatalogVerifiedDetailsHacksawScore6(slug: string) {
  return details[slug];
}
