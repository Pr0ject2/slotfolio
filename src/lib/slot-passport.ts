export type VerifiedSlotPassport = {
  releaseDate: string;
  gameType: string;
  source: string;
  sourceLabel: string;
};

const verifiedSlotPassports: Record<string, VerifiedSlotPassport> = {
  "book-of-dead": {
    releaseDate: "14 января 2016",
    gameType: "Video Slot",
    source: "https://www.playngo.com/games/rich-wilde-and-the-book-of-dead",
    sourceLabel: "официальная страница Play’n GO",
  },
  "fire-joker": {
    releaseDate: "13 июня 2016",
    gameType: "Video Slot",
    source: "https://www.playngo.com/games/fire-joker",
    sourceLabel: "официальная страница Play’n GO",
  },
  "legacy-of-dead": {
    releaseDate: "2 января 2020",
    gameType: "Video Slot",
    source: "https://www.playngo.com/games/legacy-of-dead",
    sourceLabel: "официальная страница Play’n GO",
  },
  reactoonz: {
    releaseDate: "23 октября 2017",
    gameType: "Grid Slot",
    source: "https://www.playngo.com/games/reactoonz",
    sourceLabel: "официальная страница Play’n GO",
  },
};

export function getVerifiedSlotPassport(slug: string) {
  return verifiedSlotPassports[slug];
}
