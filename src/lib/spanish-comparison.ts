import { createComparisonIndex, type ComparisonItem } from "./catalog-index";
import { spanishCatalogFact } from "./spanish-catalog-facts";
import { spanishFullDossiers, spanishMetricLabel } from "./spanish-full-dossiers";

export function createSpanishComparisonIndex(): ComparisonItem[]{
  return createComparisonIndex().map(game=>{
    const copy=spanishFullDossiers[game.slug];if(!copy)throw new Error(`Missing Spanish comparison translation: ${game.slug}`);
    return {...game,
      providerQualification:copy.attributionNote,
      mechanics:game.mechanics.map(item=>({...item,name:spanishCatalogFact(item.name)})),
      tags:game.tags.map(spanishCatalogFact),field:spanishCatalogFact(game.field),rtp:spanishCatalogFact(game.rtp),volatility:spanishCatalogFact(game.volatility),feature:copy.feature,note:copy.note,
      metrics:game.metrics?{maxWin:game.metrics.maxWin&&spanishCatalogFact(game.metrics.maxWin),maxWinLabel:spanishMetricLabel(game.metrics.maxWinLabel,"Máximo documentado"),rtpVariants:game.metrics.rtpVariants?.map(spanishCatalogFact),note:copy.metricsNote}:undefined,
    };
  });
}
