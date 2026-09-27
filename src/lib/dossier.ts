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
  "hand-of-anubis": {
    clearRtpVariants: true,
    note:
      "Официальный релиз Hacksaw Gaming подтверждает максимальную выплату 10 000x, высокую волатильность и поле 5 × 6, но не публикует сохранённый ранее список RTP-конфигураций. Неподтверждённые варианты не показываются как verified-метрика; справочный RTP досье остаётся отдельным базовым параметром.",
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
      "Официальная страница Hacksaw Gaming прямо указывает для High-Roller FeatureSpins максимальный выигрыш 10 000x. RTP-варианты не добавляются как verified-метрика, потому что текущая публичная страница не публикует их в доступном описании.",
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
      "Текущая официальная страница BGaming публикует RTP 97,17%, max multiplier 5 000x и volatility Very-high. Slotfolio сохраняет публичную укрупнённую категорию «Высокая»; отдельная официальная страница BGaming Players Hub для той же игры одновременно использует High, поэтому расхождение формулировок волатильности сохранено в provenance.",
    additionalSources: [
      {
        label: "BGaming Players Hub с формулировкой Volatility: High",
        url: "https://hub.bgaming.com/players-hub/games/gemhalla",
      },
    ],
  },
  "mighty-hot-amazonia": {
    maxWin: "1 500x",
    maxWinLabel: "Максимальная выплата",
    rtpVariants: ["96,22%"],
    source: "https://wazdan.com/mighty-hot-amazonia",
    sourceLabel: "официальная страница Wazdan",
    note:
      "Текущая страница Wazdan прямо публикует max win 1 500x и RTP 96,22%. Игра использует Volatility Levels™, поэтому verified-профиль не превращает настраиваемый риск в одну дополнительную фиксированную категорию.",
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
    note:
      "Push Gaming публикует 10 000x как Highest Observed Win. Slotfolio не трактует это значение как фиксированный max-win cap.",
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
