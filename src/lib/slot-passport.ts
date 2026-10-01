export type VerifiedSlotPassport = {
  releaseDate: string;
  gameType: string;
  source: string;
  sourceLabel: string;
};

const verifiedSlotPassports: Record<string, VerifiedSlotPassport> = {
  "prestige-crown": {
    releaseDate: "17 июля 2025",
    gameType: "Cascading Slot",
    source: "https://endorphina.com/news/prestige-crown-brings-legendary-riches-to-life",
    sourceLabel: "официальный релиз Endorphina от 17.07.2025",
  },
  "2021-hit-slot": {
    releaseDate: "11 мая 2021",
    gameType: "Classic Slot Game",
    source: "https://endorphina.com/news/mesmerize-yourself-in-2021-hit-slot",
    sourceLabel: "официальный релиз Endorphina от 11.05.2021",
  },
  "2025-hit-slot": {
    releaseDate: "10 апреля 2025",
    gameType: "Fruit Slot",
    source: "https://endorphina.com/news/set-the-reels-on-fire-with-endorphinas-2025-hit-slot",
    sourceLabel: "официальный релиз Endorphina от 10.04.2025",
  },
  "3-coin-towers": {
    releaseDate: "17 февраля 2026",
    gameType: "Oriental Slot",
    source: "https://endorphina.com/news/endorphina-releases-3-coin-towers-a-festival-of-fortune-with-three-bonus-games",
    sourceLabel: "официальный релиз Endorphina от 17.02.2026",
  },
  "burning-coins-40": {
    releaseDate: "9 декабря 2025",
    gameType: "Fruit Game",
    source: "https://endorphina.com/news/burning-coins-40-a-fiery-new-world-of-multiple-bonus-variations",
    sourceLabel: "официальный релиз Endorphina от 09.12.2025",
  },
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
  "book-of-99": {
    releaseDate: "4 мая 2021",
    gameType: "Video Slot",
    source: "https://www.relax-gaming.com/news/2021/05/relax-gaming-rewrites-the-genre-with-book-of-99",
    sourceLabel: "официальный релиз Relax Gaming от 04.05.2021",
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
  "dead-or-alive-2": {
    releaseDate: "23 апреля 2019",
    gameType: "Slot",
    source: "https://netent.com/games/dead-or-alive-2",
    sourceLabel: "каноническая официальная страница NetEnt",
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
  "fury-of-anubis": {
    releaseDate: "25 июня 2026",
    gameType: "Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-unleashes-the-power-of-ancient-egypt-in-fury-of-anubis/",
    sourceLabel: "официальный релиз Pragmatic Play от 25.06.2026",
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
  "gates-of-olympus-1000": {
    releaseDate: "14 декабря 2023",
    gameType: "Slot",
    source: "https://www.pragmaticplay.com/en/news/zeus-strikes-mighty-multipliers-in-pragmatic-plays-latest-release-gates-of-olympus-1000/",
    sourceLabel: "официальный релиз Pragmatic Play от 14.12.2023",
  },
  "gates-of-olympus-super-scatter": {
    releaseDate: "28 апреля 2025",
    gameType: "Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-amps-up-win-potential-with-gates-of-olympus-super-scatter/",
    sourceLabel: "официальный релиз Pragmatic Play от 28.04.2025",
  },
  "gonzos-quest": {
    releaseDate: "15 марта 2010",
    gameType: "Video Slot",
    source: "https://netent.com/games/gonzos-quest",
    sourceLabel: "каноническая официальная страница NetEnt",
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
  "mahjong-wins-super-scatter": {
    releaseDate: "29 мая 2025",
    gameType: "Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-expands-super-scatter-series-with-mahjong-wins-super-scatter/",
    sourceLabel: "официальный релиз Pragmatic Play от 29.05.2025",
  },
  mental: {
    releaseDate: "31 августа 2021",
    gameType: "Slot",
    source: "https://nolimitcity.com/games/mental",
    sourceLabel: "официальная страница Nolimit City",
  },
  "money-train-2": {
    releaseDate: "2 сентября 2020",
    gameType: "Slot",
    source: "https://www.relax-gaming.com/news/2020/08/relax-gaming-to-roll-out-biggest-release-of-the-year-with-money-train-2",
    sourceLabel: "официальный анонс Relax Gaming с датой запуска 02.09.2020",
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
  "sugar-rush-1000": {
    releaseDate: "18 марта 2024",
    gameType: "Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-adds-to-sweet-sensation-in-sugar-rush-1000/",
    sourceLabel: "официальный релиз Pragmatic Play от 18.03.2024",
  },
  "sweet-bonanza": {
    releaseDate: "25 июня 2019",
    gameType: "Video Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-launches-sweet-bonanza/",
    sourceLabel: "официальный релиз Pragmatic Play от 25.06.2019",
  },
  "sweet-bonanza-super-scatter": {
    releaseDate: "31 июля 2025",
    gameType: "Slot",
    source: "https://www.pragmaticplay.com/en/news/pragmatic-play-sweetens-an-all-time-classic-in-sweet-bonanza-super-scatter/",
    sourceLabel: "официальный релиз Pragmatic Play от 31.07.2025",
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

export function getVerifiedSlotPassports() {
  return Object.entries(verifiedSlotPassports);
}
