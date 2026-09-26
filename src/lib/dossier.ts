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
  additionalSources?: VerifiedMetricSource[];
};

type VerifiedMetricOverlay = Partial<VerifiedSlotMetrics> & {
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
  "jammin-jars": {
    maxWin: "20 000x",
    maxWinLabel: "Максимальная выплата",
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
    note:
      "У оригинального Razor Shark нет фиксированного max-win cap: Push Gaming описывает верхний ориентир как наблюдавшийся выигрыш и отдельно подтверждает реальный выигрыш 85 475,4x, превысивший результаты тестовых симуляций.",
    additionalSources: [
      {
        label: "Q&A Push Gaming о Razor Shark",
        url: "https://www.pushgaming.com/blog/q-marketing-director-darren-stephenson-speaks-kongebonus.html",
      },
    ],
  },
};

export function getVerifiedSlotMetrics(slug: string): EnrichedVerifiedSlotMetrics | undefined {
  const base = getBaseVerifiedSlotMetrics(slug);
  const overlay = verifiedMetricOverlays[slug];
  if (!overlay) return base;
  if (!base) {
    if (!overlay.source) return undefined;
    return overlay as EnrichedVerifiedSlotMetrics;
  }
  return { ...base, ...overlay };
}
