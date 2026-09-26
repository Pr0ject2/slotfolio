import {
  getVerifiedSlotMetrics as getBaseVerifiedSlotMetrics,
  type VerifiedSlotMetrics,
} from "./dossier-base";

export * from "./dossier-base";

const verifiedMetricOverlays: Record<string, VerifiedSlotMetrics> = {
  "money-train-2": {
    maxWin: "50 000x",
    maxWinLabel: "Максимальная выплата",
    source: "https://www.relax-gaming.com/products/casino/moneytrain2",
    sourceLabel: "официальная страница Relax Gaming",
  },
};

export function getVerifiedSlotMetrics(slug: string) {
  return verifiedMetricOverlays[slug] ?? getBaseVerifiedSlotMetrics(slug);
}
