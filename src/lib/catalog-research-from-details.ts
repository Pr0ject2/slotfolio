import type { CatalogResearch } from "./catalog-research";
import { getVerifiedCatalogDetails } from "./catalog-verified-details-lookup";

function mechanicsFromField(field: string) {
  if (/линия|линии|линий|paylines?|lines?/i.test(field)) return ["Линии"];
  if (/способ(?:а|ов)?|ways?/i.test(field)) return ["Способы"];
  return [];
}

export function getCatalogResearchFromVerifiedField(slug: string): CatalogResearch | undefined {
  const details = getVerifiedCatalogDetails(slug);
  const field = details?.field?.trim() ?? "";
  const mechanics = mechanicsFromField(field);
  if (!details || mechanics.length === 0) return undefined;

  return {
    mechanics,
    source: details.source,
    verifiedAt: details.verifiedAt,
    evidence: `Official verified field explicitly states the payout structure: ${field}.`,
  };
}
