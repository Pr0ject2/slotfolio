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
  "chaos-crew-2": {
    releaseDate: "28 сентября 2023",
    gameType: "Slot",
    source: "https://www.hacksawgaming.com/news/september-game-release-round-up",
    sourceLabel: "официальный сентябрьский round-up Hacksaw Gaming от 04.10.2023",
  },
  deadwood: {
    releaseDate: "6 мая 2020",
    gameType: "Slot",
    source: "https://nolimitcity.com/games/deadwood",
    sourceLabel: "официальная страница Nolimit City",
  },
  "dork-unit": {
    releaseDate: "26 июля 2022",
    gameType: "Slot",
    source: "https://www.hacksawgaming.com/news/new-game-release-july-summary",
    sourceLabel: "официальный релиз Hacksaw Gaming от 26.07.2022",
  },
  "fat-rabbit": {
    releaseDate: "27 марта 2018",
    gameType: "Slot",
    source: "https://www.pushgaming.com/blog/push-gaming-brings-further-entertainment-mobile-new-game-fat-rabbit.html",
    sourceLabel: "официальный релиз Push Gaming от 27.03.2018",
  },
  "fire-in-the-hole": {
    releaseDate: "2 марта 2021",
    gameType: "Slot",
    source: "https://nolimitcity.com/games/fire-in-the-hole",
    sourceLabel: "официальная страница Nolimit City",
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
  "hand-of-anubis": {
    releaseDate: "21 апреля 2022",
    gameType: "Cascading Cluster-based Slot",
    source: "https://www.hacksawgaming.com/news/new-game-release-april-summary",
    sourceLabel: "официальный релиз Hacksaw Gaming от 21.04.2022",
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
  mental: {
    releaseDate: "31 августа 2021",
    gameType: "Slot",
    source: "https://nolimitcity.com/games/mental",
    sourceLabel: "официальная страница Nolimit City",
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
  "retro-tapes": {
    releaseDate: "23 ноября 2022",
    gameType: "Cluster Paying Slot",
    source: "https://www.pushgaming.com/blog/push-gaming-rewinds-classic-gameplay-retro-tapes.html",
    sourceLabel: "официальный релиз Push Gaming от 23.11.2022",
  },
  "rise-of-olympus": {
    releaseDate: "22 августа 2018",
    gameType: "Grid Slot",
    source: "https://www.playngo.com/games/rise-of-olympus",
    sourceLabel: "официальная страница Play’n GO",
  },
  "san-quentin-xways": {
    releaseDate: "12 января 2021",
    gameType: "Slot",
    source: "https://nolimitcity.com/games/san-quentin",
    sourceLabel: "официальная страница Nolimit City",
  },
  starburst: {
    releaseDate: "23 января 2012",
    gameType: "Video Slot",
    source: "https://netent.com/games/starburst",
    sourceLabel: "каноническая официальная страница NetEnt",
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
