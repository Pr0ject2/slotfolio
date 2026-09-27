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
