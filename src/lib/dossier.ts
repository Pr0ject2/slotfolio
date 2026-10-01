import {
  getVerifiedSlotMetrics as getBaseVerifiedSlotMetrics,
  type VerifiedSlotMetrics,
} from "./dossier-base";

export * from "./dossier-base";

export type VerifiedMetricSource = {
  label: string;
  url: string;
};

export type EnrichedVerifiedSlotMetrics = VerifiedSlotMetrics & {
  observedWin?: string;
  observedWinLabel?: string;
  additionalSources?: VerifiedMetricSource[];
};

type VerifiedMetricOverlay = Partial<VerifiedSlotMetrics> & {
  observedWin?: string;
  observedWinLabel?: string;
  clearMaxWin?: boolean;
  clearRtpVariants?: boolean;
  additionalSources?: VerifiedMetricSource[];
};

const verifiedMetricOverlays: Record<string, VerifiedMetricOverlay> = {
  "money-train-2": {
    maxWin: "50 000x",
    maxWinLabel: "Максимальная выплата",
    source: "https://www.relax-gaming.com/products/casino/moneytrain2",
    sourceLabel: "официальная страница Relax Gaming",
    note:
      "Текущая официальная страница Relax Gaming подтверждает максимум 50 000x и отдельно публикует German RTP 90%. Справочное значение досье 96,40% сохраняется как reference RTP, но текущая страница не публикует его как отдельную подтверждённую конфигурацию, поэтому Slotfolio не формирует из этих значений verified RTP-лестницу.",
  },
  "dead-or-alive-2": {
    maxWin: "100 000x",
    maxWinLabel: "Максимальная выплата",
    source: "https://games.evolution.com/slots/dead-or-alive-2/",
    sourceLabel: "официальная страница Evolution / NetEnt",
    note:
      "Официальная страница Evolution для NetEnt несколько раз указывает потенциал до 100 000x original bet. На отдельной карточке netent.com одновременно присутствует противоречащее metadata-поле Max payout 1 600x; Slotfolio сохраняет этот конфликт в provenance и не смешивает две цифры.",
    additionalSources: [
      {
        label: "карточка NetEnt с конфликтующим metadata-полем",
        url: "https://netent.com/games/dead-or-alive-2",
      },
    ],
  },
  "gonzos-quest": {
    maxWin: "2 200x",
    maxWinLabel: "Максимальная выплата",
    rtpVariants: ["95,97%"],
    source: "https://netent.com/games/gonzos-quest",
    sourceLabel: "текущая официальная страница NetEnt",
    note:
      "Текущая canonical NetEnt page публикует Max payout 2 200x bet и RTP 95,97%. Текущая страница Evolution для той же оригинальной Gonzo’s Quest одновременно указывает maximum win 2 500x original bet при том же RTP 95,97%; Slotfolio сохраняет 2 200x как primary provider value и явно показывает first-party конфликт.",
    additionalSources: [
      {
        label: "страница Evolution / NetEnt с конфликтующим максимумом 2 500x",
        url: "https://games.evolution.com/slots/gonzos-quest/",
      },
    ],
  },
  starburst: {
    maxWin: "800x",
    maxWinLabel: "Максимальная выплата",
    rtpVariants: ["96,08%"],
    source: "https://netent.com/games/starburst",
    sourceLabel: "текущая официальная страница NetEnt",
    note:
      "Текущая canonical NetEnt page публикует RTP 96,08%, Max payout 800x bet, поле 5 × 3 и 10 линий. Текущая страница Evolution для той же оригинальной Starburst одновременно публикует RTP 96,09%; Slotfolio сохраняет 96,08% как primary provider value и явно показывает first-party конфликт.",
    additionalSources: [
      {
        label: "страница Evolution / NetEnt с конфликтующим RTP 96,09%",
        url: "https://games.evolution.com/slots/starburst/",
      },
    ],
  },
  "snake-arena": {
    maxWin: "2 758,8x",
    maxWinLabel: "Максимальная выплата",
    rtpVariants: ["96,25%", "90,00%"],
    source: "https://www.relax-gaming.com/products/casino/snakearena",
    sourceLabel: "текущая официальная страница Relax Gaming",
    note:
      "Текущая официальная страница Relax Gaming публикует основной RTP 96,25%, отдельный German RTP 90% и выигрыши до 2 758,8x ставки. Slotfolio сохраняет 90,00% как отдельный verified RTP variant, не заменяя основной справочный RTP 96,25%.",
  },
  "hand-of-anubis": {
    clearRtpVariants: true,
    note:
      "Текущий официальный каталог Hacksaw Gaming показывает Hand of Anubis с полностью заполненным volatility meter 5/5, поэтому публичная категория Slotfolio остаётся «Экстремальная». Официальный релиз от 30.04.2022 одновременно описывает игру как high volatility и подтверждает поле 5 × 6 и максимум 10 000x; конфликт сохранён явно. RTP-конфигурации в релизе не опубликованы, поэтому сохранённый ранее список не показывается как verified-метрика.",
    additionalSources: [
      {
        label: "текущий каталог Hacksaw Gaming с volatility meter 5/5",
        url: "https://www.hacksawgaming.com/games/slots",
      },
    ],
  },
  "wanted-dead-or-a-wild": {
    note:
      "Текущая детальная страница Hacksaw Gaming публикует Volatility: 4 / 5, поэтому публичная категория Slotfolio остаётся «Высокая». Общий текущий каталог Hacksaw Gaming одновременно показывает Wanted Dead Or a Wild с пятью заполненными делениями volatility meter 5/5; конфликт двух first-party поверхностей сохранён явно без повышения публичной категории.",
    additionalSources: [
      {
        label: "текущий каталог Hacksaw Gaming с конфликтующим volatility meter 5/5",
        url: "https://www.hacksawgaming.com/games/slots",
      },
    ],
  },
  "2025-hit-slot": {
    maxWin: "2 025x",
    maxWinLabel: "Максимальная выплата",
    rtpVariants: ["96,05%"],
    source: "https://endorphina.com/games/2025-hit-slot",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальные материалы Endorphina подтверждают RTP 96,05%, среднюю volatility, поле 5×4 и 100 фиксированных линий. Максимальная выплата игры заявлена как 2 025x от общей ставки.",
  },
  "3-coin-towers": {
    maxWin: "1 000x",
    maxWinLabel: "Максимальный ULTRA Jackpot",
    rtpVariants: ["96,08%"],
    source: "https://endorphina.com/games/3-coin-towers",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,08%, высокую volatility, поле 5×3 и 30 фиксированных линий. 1 000x относится именно к ULTRA Jackpot в Coin Hold Bonus при сборе всех 15 символов; это не заявленный общий max win игры.",
  },
  "burning-coins-40": {
    maxWin: "2 000x",
    maxWinLabel: "Заявленный потенциал бонуса",
    rtpVariants: ["96,12%"],
    source: "https://endorphina.com/games/burning-coins-40",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,12%, высокую volatility, поле 5×4 и 40 фиксированных линий. Джекпоты расширенных вариантов Hot Hold Bonus достигают 2 000x от общей ставки; это бонусный потенциал, а не общий фиксированный max win.",
  },
  "81-burning-ways": {
    rtpVariants: ["96,05%"],
    source: "https://endorphina.com/games/81-burning-ways",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,05%, высокую volatility, поле 4 × 3 и 81 фиксированный способ выплаты. Wild превращается в 2x multiplier; несколько Wild перемножаются, но это механика отдельных комбинаций, а не общий max win. Провайдер общего cap не публикует.",
  },
  "crown-coins": {
    maxWin: "1 000x",
    maxWinLabel: "Заявленный потенциал бонуса",
    rtpVariants: ["96,06%"],
    source: "https://endorphina.com/games/crown-coins",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,06%, Medium-High volatility, поле 3 × 3 и пять фиксированных линий. Royal Treasury Bonus содержит четыре jackpot-приза до 1 000x total bet. Это потенциал бонуса, а не отдельно опубликованный общий fixed max win.",
  },
  "ultra-fresh": {
    rtpVariants: ["96,01%"],
    source: "https://endorphina.com/games/ultra-fresh",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,01%, низкую volatility, поле 3 × 3 и пять линий. Полный экран одинаковых символов умножает выигрыш на 2x, но это не общий max win. Провайдер общего cap не публикует.",
  },
  "hell-hot-40": {
    rtpVariants: ["96,04%"],
    source: "https://endorphina.com/games/hell-hot-40",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,04%, низкую volatility, поле 5 × 4 и 40 фиксированных линий. Stacked Wild и Scatter не меняют базовую линейную механику, а Risk Game относится к отдельной выплате. Общий max win провайдер не публикует.",
  },
  "lucky-streak-1": {
    rtpVariants: ["96,09%"],
    source: "https://endorphina.com/games/lucky-streak-1",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,09%, среднюю volatility, поле 5 × 4 и 40 линий. Wild может появляться stacked, а Risk Game отделена от базовой игры. Общий max win провайдер не публикует.",
  },
  "lucky-streak-3": {
    rtpVariants: ["96,01%"],
    source: "https://endorphina.com/games/lucky-streak-3",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,01%, низкую volatility, поле 3 × 3 и пять линий. При полном экране одинаковых символов выигрыш умножается на 2x, но это не объявленный общий max win. Общий cap провайдер не публикует.",
  },
  "hell-hot-100": {
    rtpVariants: ["96,07%"],
    source: "https://endorphina.com/games/hell-hot-100",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,07%, низкую volatility, поле 5 × 4 и 100 фиксированных линий. Wild может появляться stacked, а Risk Game позволяет увеличить отдельную выплату до 10 раз. Общий max win провайдер не публикует, поэтому Slotfolio не выводит частную 500x scatter-выплату как максимум игры.",
  },
  "joker-stoker": {
    rtpVariants: ["96,07%"],
    source: "https://endorphina.com/games/joker-stoker",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,07%, Medium-Low volatility, поле 5 × 4 и 40 фиксированных линий. Три, четыре или пять Scatter дают 10, 20 или 30 Free Games; Bonus Pop зависит от доступности у оператора. Общий max win провайдер не публикует.",
  },
  "lucky-streak-1000": {
    maxWin: "1 000x",
    maxWinLabel: "Заявленный потенциал бонуса",
    rtpVariants: ["96,07%"],
    source: "https://endorphina.com/games/lucky-streak-1000",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,07%, Medium-High volatility, поле 3 × 3 и пять линий. Diamond Mystery Bonus выплачивает jackpot до 1 000x total bet. Это заявленный потенциал конкретного бонуса, а не отдельно опубликованный общий fixed max win.",
  },
  "burning-coins-20": {
    maxWin: "1 000x",
    maxWinLabel: "Заявленный потенциал бонуса",
    rtpVariants: ["96,01%"],
    source: "https://endorphina.com/games/burning-coins-20",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,01%, среднюю volatility, поле 5 × 3 и 20 фиксированных линий. В Fiery Fortune шесть и более Burning Coins запускают отдельную бонусную сетку; её выплаты могут достигать 1 000x total bet. Эта цифра сохранена как заявленный потенциал бонуса, а не как неподтверждённый общий fixed max win.",
  },
  "chance-machine-20": {
    rtpVariants: ["96,01%"],
    source: "https://endorphina.com/games/chance-machine-20",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,01%, низкую volatility, поле 5 × 3 и 20 фиксированных линий. Wild расширяется на барабанах 2, 3 и 4, а два вида Scatter оплачиваются вне обычных линий. Общий max win провайдер на этой странице не публикует, поэтому Slotfolio не подменяет его отдельными выплатами символов.",
  },
  "dia-de-los-muertos-2": {
    rtpVariants: ["96,05%"],
    source: "https://endorphina.com/games/dia-de-los-muertos-2",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Официальная карточка Endorphina подтверждает RTP 96,05%, высокую volatility, поле 6 × 5 и scatter payouts. Восемь и более одинаковых символов в любых позициях запускают каскады; 4+ Bonus дают 15 Free Games с накоплением множителей до 500x. Множитель не объявлен общим max win, поэтому Slotfolio не выводит его как таковой.",
  },
  "2026-hit-slot": {
    source: "https://endorphina.com/games/2026-hit-slot",
    sourceLabel: "текущая официальная карточка Endorphina",
    note:
      "Текущая официальная карточка Endorphina указывает Volatility: High, поэтому Slotfolio сохраняет категорию «Высокая». В официальном релизе от 03.03.2026 та же игра одновременно названа Ultra-High volatility; это расхождение источников сохранено явно, а не сведено к одной неподтверждённой трактовке.",
    additionalSources: [
      {
        label: "релиз Endorphina от 03.03.2026 с формулировкой Ultra-High volatility",
        url: "https://endorphina.com/news/endorphinas-2026-hit-slot-show-is-here-and-youve-got-a-backstage-pass",
      },
    ],
  },
  "max-win-machine": {
    maxWin: "10 000x",
    maxWinLabel: "Максимальная выплата",
    rtpVariants: ["96,22%", "94,28%", "92,20%"],
    source: "https://www.hacksawgaming.com/games/max-win-machine",
    sourceLabel: "официальная страница Hacksaw Gaming",
    note:
      "Текущая страница Hacksaw Gaming описывает только Lucky Seven: один, два или три символа слева направо дают 1x, 10x и 10 000x. FeatureSpins и отдельная multiplier-механика на этой странице не заявлены.",
  },
  "power-of-ten": {
    maxWin: "10 000x",
    maxWinLabel: "Максимальная выплата",
    source: "https://www.hacksawgaming.com/games/power-of-ten",
    sourceLabel: "официальная страница Hacksaw Gaming",
    note:
      "Текущая dedicated page Hacksaw Gaming подтверждает Power Wheels и максимальный выигрыш 10 000x, но не публикует RTP-конфигурации или отдельное текстовое поле volatility. Текущий официальный каталог Hacksaw Gaming показывает для Power of Ten полный volatility meter 5/5, поэтому публичная категория Slotfolio — «Экстремальная». RTP-варианты не добавляются как verified-метрика.",
    additionalSources: [
      {
        label: "текущий каталог Hacksaw Gaming с volatility meter 5/5",
        url: "https://www.hacksawgaming.com/games/slots",
      },
    ],
  },
  "fury-of-anubis": {
    maxWin: "10 000x",
    maxWinLabel: "Заявленный потенциал",
    rtpVariants: ["96,52%"],
    source: "https://www.pragmaticplay.com/en/campaign/fury-of-anubis/",
    sourceLabel: "структурированная страница Pragmatic Play",
    note:
      "Структурированная campaign page Pragmatic Play публикует Reels x Rows 6 x 5, RTP 96,52% и Max Multiplier 10 000x; официальный релиз также описывает игру как 6 × 5 и win potential up to 10 000x. Обычная текущая game page одновременно пишет 5×6, поэтому Slotfolio сохраняет этот first-party конфликт явно и использует 6 × 5 как поле по двум согласующимся источникам.",
    additionalSources: [
      {
        label: "текущая game page Pragmatic Play с конфликтующим 5×6",
        url: "https://www.pragmaticplay.com/en/games/fury-of-anubis/",
      },
      {
        label: "официальный релиз Pragmatic Play с 6×5 и потенциалом 10 000x",
        url: "https://www.pragmaticplay.com/en/news/pragmatic-play-unleashes-the-power-of-ancient-egypt-in-fury-of-anubis/",
      },
    ],
  },
  "nitro-nights": {
    maxWin: "15 000x",
    maxWinLabel: "Максимальная выплата",
    rtpVariants: ["96,31%", "94,34%", "92,22%", "86,26%"],
    source: "https://www.hacksawgaming.com/games/nitro-nights",
    sourceLabel: "официальная страница Hacksaw Gaming",
    note:
      "Текущая страница Hacksaw Gaming публикует volatility 4/5, max win 15 000x и четыре RTP-конфигурации. Верхнее значение 96,31% совпадает со справочным RTP досье.",
  },
  "dork-unit": {
    maxWin: "10 000x",
    maxWinLabel: "Максимальная выплата",
    source: "https://www.hacksawgaming.com/news/new-game-release-july-summary",
    sourceLabel: "официальный релиз Hacksaw Gaming",
    note:
      "Официальный релиз Hacksaw Gaming от 31.07.2022 описывает Dork Unit как игру medium 3/5 volatility с 16 линиями и max win 10 000x. RTP-конфигурации в этом релизе не опубликованы, поэтому verified-профиль их не добавляет.",
  },
  gemhalla: {
    maxWin: "5 000x",
    maxWinLabel: "Максимальная выплата",
    source: "https://bgaming.com/games/gemhalla",
    sourceLabel: "текущая официальная страница BGaming",
    note:
      "Текущая официальная страница BGaming и официальный обзор июньских релизов публикуют volatility Very-high, поэтому Slotfolio использует текущую категорию «Очень высокая». Отдельная официальная страница BGaming Players Hub для той же игры одновременно использует High; конфликт сохранён в provenance и не сглаживается до более низкой категории.",
    additionalSources: [
      {
        label: "официальный обзор BGaming с формулировкой very high volatility",
        url: "https://bgaming.com/news/bgaming-introduces-a-wave-of-fresh-june-game-releases",
      },
      {
        label: "BGaming Players Hub с конфликтующей формулировкой Volatility: High",
        url: "https://hub.bgaming.com/players-hub/games/gemhalla",
      },
    ],
  },
  "mighty-hot-amazonia": {
    maxWin: "1 500x",
    maxWinLabel: "Максимальная выплата",
    rtpVariants: ["96,22%"],
    source: "https://wazdan.com/games/mighty-hot-amazonia",
    sourceLabel: "текущая официальная карточка Wazdan",
    note:
      "Текущая карточка Wazdan публикует max win 1 500x, RTP 96,22% и базовый профиль Volatility: Low-Medium. Та же игра использует Volatility Levels™, а Wazdan описывает эту функцию как выбор уровня волатильности игроком. Поэтому Slotfolio сохраняет опубликованный базовый профиль в provenance, но публичную категорию показывает как «Настраиваемая».",
    additionalSources: [
      {
        label: "официальная страница Mighty Hot Amazonia с описанием выбора волатильности",
        url: "https://wazdan.com/mighty-hot-amazonia",
      },
      {
        label: "официальное описание Wazdan Volatility Levels™",
        url: "https://wazdan.com/news/new-releases-updates/wazdans-new-jersey-entry-bolstered-with-the-introduction-of-volatility-levels-feature",
      },
    ],
  },
  "mummyland-treasures": {
    maxWin: "25 000x",
    maxWinLabel: "Максимальная выплата",
    rtpVariants: ["96,37%"],
    source: "https://belatragames.com/en/games/game/mummyland-treasures",
    sourceLabel: "официальная страница Belatra Games",
    note:
      "Текущая карточка Belatra Games публикует RTP 96,37%, max win 25 000x и volatility High. Значения совпадают со справочным профилем полного досье.",
  },
  "troy-superways": {
    maxWin: "35 336x",
    maxWinLabel: "Максимальная выплата",
    rtpVariants: ["96,00%", "94,00%", "90,50%"],
    source: "https://yggdrasilgaming.com/games/troy-superways",
    sourceLabel: "официальная страница Yggdrasil Gaming",
    note:
      "Текущая страница Yggdrasil Gaming публикует max multiplier 35 336x, volatility High и три RTP-конфигурации: 96%, 94% и 90,5%. Верхнее значение совпадает со справочным RTP досье.",
  },
  "wolf-hunt-claw-and-win": {
    maxWin: "6 992x",
    maxWinLabel: "Максимальная выплата",
    rtpVariants: ["95,00%"],
    source: "https://clawbuster.com/games/wolf-hunt-claw-and-win.html",
    sourceLabel: "официальная страница Clawbuster",
    note:
      "Текущая страница Clawbuster прямо публикует Max Win Potential 6 992x, RTP 95% и volatility Low. Значения совпадают со справочным профилем полного досье.",
  },
  "claw-bonanza-gold-rush": {
    maxWin: "10 000x",
    maxWinLabel: "Максимальная выплата",
    rtpVariants: ["95,00%"],
    source: "https://clawbuster.com/games/claw-bonanza-gold-rush.html",
    sourceLabel: "официальная страница Clawbuster",
    note:
      "Текущая страница Clawbuster прямо называет Max Win 10 000x и Max Multiplier x10 000, одновременно публикуя RTP 95% и volatility High.",
  },
  "clawbass-bonanza": {
    maxWin: "6 000x",
    maxWinLabel: "Заявленный потенциал",
    rtpVariants: ["95,00%"],
    source: "https://clawbuster.com/games/clawbass-bonanza.html",
    sourceLabel: "официальная страница Clawbuster",
    note:
      "Clawbuster публикует RTP 95% и volatility Very High; в описании Float Multipliers провайдер отдельно указывает, что итог может достигать 6 000x original bet. Slotfolio хранит эту цифру как заявленный потенциал, а не как отдельно объявленный fixed max-win cap.",
  },
  "clawbass-bonanza-free-rush": {
    maxWin: "6 000x",
    maxWinLabel: "Заявленный потенциал",
    rtpVariants: ["94,97%"],
    source: "https://clawbuster.com/games/clawbass-bonanza-free-rush.html",
    sourceLabel: "официальная страница Clawbuster",
    note:
      "Clawbuster публикует RTP 94,97% и volatility Very High, а в описании Treasure Multipliers указывает, что суммарный выигрыш может достигать 6 000x original bet. Slotfolio хранит 6 000x как заявленный потенциал, а не как отдельно заявленный fixed cap.",
  },
  "panda-claw-jackpot": {
    maxWin: "5 000x",
    maxWinLabel: "Заявленный максимум",
    source: "https://panda-claw-jackpot-iframe-dev.clawbuster.com/",
    sourceLabel: "официальный игровой iframe Clawbuster",
    note:
      "Официальный игровой iframe Clawbuster прямо показывает Win up to 5 000x. Основная карточка Panda Claw Jackpot отдельно публикует RTP 95%, volatility Medium и Extreme Jackpot 2 500x; jackpot-значение не смешивается с общим заявленным максимумом игры.",
    additionalSources: [
      {
        label: "основная карточка Clawbuster с Extreme Jackpot 2 500x",
        url: "https://clawbuster.com/games/panda-claw-jackpot.html",
      },
    ],
  },
  "777-coins": {
    maxWin: "6 000x",
    maxWinLabel: "Заявленный потенциал",
    source: "https://3oaks.com/game/777_coins",
    sourceLabel: "официальная страница 3 Oaks Gaming",
    note:
      "3 Oaks Gaming указывает GRAND JACKPOT x2 000 и отдельно пишет, что сочетание трёх COLLECT SYMBOLS с GRAND JACKPOT SYMBOL потенциально утраивает Grand Prize до x6 000. Slotfolio хранит 6 000x как заявленный потенциал бонусного приза, а не как независимо опубликованный fixed max-win cap всей игры.",
  },
  "jammin-jars": {
    maxWin: "20 000x",
    maxWinLabel: "Максимальная выплата",
    observedWin: "19 998,5x",
    observedWinLabel: "Наблюдавшийся максимум",
    note:
      "Push Gaming указывает для оригинального Jammin’ Jars фиксированный максимум 20 000x; текущая карточка игры отдельно показывает Highest Observed Win 19 998,5x.",
    additionalSources: [
      {
        label: "интервью Push Gaming о Jammin’ Jars 2",
        url: "https://www.pushgaming.com/blog/interview-game-producer-amit-samji-speaks-newslotgames-our-latest-release-jammin-jars-2.html",
      },
    ],
  },
  "razor-shark": {
    observedWin: "85 475,4x",
    observedWinLabel: "Задокументированный выигрыш",
    note:
      "У оригинального Razor Shark нет фиксированного max-win cap: Push Gaming подтверждает реальный выигрыш 85 475,4x и объясняет, что для игр без cap публикуется наблюдавшийся ориентир, а не искусственный потолок.",
    additionalSources: [
      {
        label: "Q&A Push Gaming о Razor Shark",
        url: "https://www.pushgaming.com/blog/q-marketing-director-darren-stephenson-speaks-kongebonus.html",
      },
    ],
  },
  "fat-rabbit": {
    clearMaxWin: true,
    observedWin: "3 844x",
    observedWinLabel: "Наблюдавшийся максимум",
    note:
      "Push Gaming публикует 3 844x как Highest Observed Win. Это наблюдавшийся результат, а не подтверждённый фиксированный max-win cap.",
  },
  "retro-tapes": {
    clearMaxWin: true,
    observedWin: "10 000x",
    observedWinLabel: "Наблюдавшийся максимум",
    sourceLabel: "текущая официальная страница Push Gaming",
    note:
      "Текущая карточка Push Gaming публикует RTP 96,47% и Highest Observed Win 10 000x. Официальный материал Push Gaming от 04.04.2023 отдельно подтверждает диапазон RTP 94,46%–96,47%, поэтому Slotfolio сохраняет обе verified RTP-конфигурации и не трактует наблюдавшийся выигрыш как фиксированный max-win cap.",
    additionalSources: [
      {
        label: "официальный материал Push Gaming с RTP 94,46%–96,47%",
        url: "https://www.pushgaming.com/blog/push-gaming-wins-most-watched-most-streamed-slot-award-february-tier-2-category.html",
      },
    ],
  },
};

export function getVerifiedSlotMetrics(slug: string): EnrichedVerifiedSlotMetrics | undefined {
  const base = getBaseVerifiedSlotMetrics(slug);
  const overlay = verifiedMetricOverlays[slug];
  if (!overlay) return base;

  const { clearMaxWin, clearRtpVariants, ...values } = overlay;
  if (!base) {
    if (!values.source) return undefined;
    return values as EnrichedVerifiedSlotMetrics;
  }

  const merged = { ...base, ...values } as EnrichedVerifiedSlotMetrics;
  if (clearMaxWin) {
    delete merged.maxWin;
    delete merged.maxWinLabel;
  }
  if (clearRtpVariants) delete merged.rtpVariants;
  return merged;
}