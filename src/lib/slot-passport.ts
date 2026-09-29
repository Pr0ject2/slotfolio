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
  "gates-of-olympus": {
    releaseDate: "24 февраля 2021",
    gameType: "Video Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-aims-for-the-heavens-in-gates-of-olympus/",
    sourceLabel: "официальный релиз Pragmatic Play от 24.02.2021",
  },
  "jammin-jars": {
    releaseDate: "18 сентября 2018",
    gameType: "Cascading Cluster Pays",
    source: "https://www.pushgaming.com/blog/push-gaming-get-groove-new-game-jammin-jars.html",
    sourceLabel: "официальный релиз Push Gaming от 18.09.2018",
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
  "rise-of-olympus": {
    releaseDate: "22 августа 2018",
    gameType: "Grid Slot",
    source: "https://www.playngo.com/games/rise-of-olympus",
    sourceLabel: "официальная страница Play’n GO",
  },
  "sweet-bonanza": {
    releaseDate: "25 июня 2019",
    gameType: "Video Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-launches-sweet-bonanza/",
    sourceLabel: "официальный релиз Pragmatic Play от 25.06.2019",
  },
};

export function getVerifiedSlotPassport(slug: string) {
  return verifiedSlotPassports[slug];
}
