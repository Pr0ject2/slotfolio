export type VerifiedSlotPassport = {
  releaseDate: string;
  gameType: string;
  source: string;
  sourceLabel: string;
};

const verifiedSlotPassports: Record<string, VerifiedSlotPassport> = {
  "big-bass-bonanza": {
    releaseDate: "14 декабря 2020",
    gameType: "Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-turns-fishing-to-spins-in-big-bass-bonanza/",
    sourceLabel: "официальный релиз Pragmatic Play от 14.12.2020",
  },
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
  "fruit-party": {
    releaseDate: "27 мая 2020",
    gameType: "Video Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-gets-summer-started-with-fruit-party/",
    sourceLabel: "официальный релиз Pragmatic Play от 27.05.2020",
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
  "razor-shark": {
    releaseDate: "3 сентября 2019",
    gameType: "Slot",
    source: "https://www.pushgaming.com/blog/push-gaming-release-deep-sea-themed-slot-razor-shark.html",
    sourceLabel: "официальный релиз Push Gaming от 03.09.2019",
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
  "starlight-princess": {
    releaseDate: "23 сентября 2021",
    gameType: "Video Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-delivers-regal-adventure-in-starlight-princess/",
    sourceLabel: "официальный релиз Pragmatic Play от 23.09.2021",
  },
  "sugar-rush": {
    releaseDate: "30 июня 2022",
    gameType: "Slot",
    source: "https://www.pragmaticplay.com/ru/news/pragmatic-play-%D0%B4%D0%B0%D1%80%D0%B8%D1%82-%D0%B8%D1%81%D1%82%D0%B8%D0%BD%D0%BD%D0%BE%D0%B5-%D1%83%D0%B4%D0%BE%D0%B2%D0%BE%D0%BB%D1%8C%D1%81%D1%82%D0%B2%D0%B8%D0%B5-%D0%B2-sugar-rush/",
    sourceLabel: "официальный релиз Pragmatic Play от 30.06.2022",
  },
  "sweet-bonanza": {
    releaseDate: "25 июня 2019",
    gameType: "Video Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-launches-sweet-bonanza/",
    sourceLabel: "официальный релиз Pragmatic Play от 25.06.2019",
  },
  "the-dog-house": {
    releaseDate: "9 мая 2019",
    gameType: "Video Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-launches-the-dog-house/",
    sourceLabel: "официальный релиз Pragmatic Play от 09.05.2019",
  },
};

export function getVerifiedSlotPassport(slug: string) {
  return verifiedSlotPassports[slug];
}
