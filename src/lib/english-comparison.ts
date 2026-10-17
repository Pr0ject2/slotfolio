import { createComparisonIndex, type ComparisonItem } from "./catalog-index";
import { englishCatalogFact } from "./english-catalog-facts";
import {
  englishFullDossiers,
  englishMetricLabel,
} from "./english-full-dossiers";
export function createEnglishComparisonIndex(): ComparisonItem[] {
  return createComparisonIndex().map((game) => {
    const copy = englishFullDossiers[game.slug];
    if (!copy) throw new Error(`Missing comparison translation: ${game.slug}`);
    return {
      ...game,
      mechanics: game.mechanics.map((item) => ({
        ...item,
        name: englishCatalogFact(item.name),
      })),
      tags: game.tags.map(englishCatalogFact),
      field: englishCatalogFact(game.field),
      rtp: englishCatalogFact(game.rtp),
      volatility: englishCatalogFact(game.volatility),
      feature: copy.feature,
      note: copy.note,
      metrics: game.metrics
        ? {
            maxWin:
              game.metrics.maxWin && englishCatalogFact(game.metrics.maxWin),
            maxWinLabel: englishMetricLabel(
              game.metrics.maxWinLabel,
              "Documented maximum",
            ),
            rtpVariants: game.metrics.rtpVariants?.map(englishCatalogFact),
            note: copy.metricsNote,
          }
        : undefined,
    };
  });
}
