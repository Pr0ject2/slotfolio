import {
  mechanics,
  providerSlug,
  slots,
  slotMechanics,
  slotRtpValue,
} from "./data-v128";
import { catalogSeeds } from "./catalog-seeds";
import { getVerifiedCatalogResearch } from "./catalog-research-lookup";
import { getVerifiedCatalogDetails } from "./catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "./catalog-verified-game-type";
import { getVerifiedSlotMetrics } from "./dossier";
import {
  buildCatalogSearchText,
  type CatalogItem,
  type CatalogModel,
} from "./catalog-query";

function frequency(values: string[]) {
  const counts = new Map<string, number>();
  for (const value of values.filter(Boolean)) counts.set(value, (counts.get(value) || 0) + 1);
  return Array.from(counts, ([name, count]) => ({ name, count })).sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name, "ru"),
  );
}

function exactRtpValue(value?: string) {
  const match = value?.trim().match(/^(\d+(?:[.,]\d+)?)%$/);
  if (!match) return null;
  const parsed = Number.parseFloat(match[1].replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function releaseYear(value?: string) {
  if (!value || !/^\d{4}/.test(value)) return null;
  const year = Number(value.slice(0, 4));
  return Number.isFinite(year) ? year : null;
}

export function createCatalogModel(): CatalogModel {
  const dossierItems: CatalogItem[] = slots.map((slot) => {
    const mechanicNames = slotMechanics(slot);
    const value = slotRtpValue(slot);
    const verified = getVerifiedSlotMetrics(slot.slug);
    const releaseDate = String(slot.year);
    return {
      slug: slot.slug,
      name: slot.name,
      provider: slot.provider,
      providerSlug: providerSlug(slot.provider),
      year: slot.year,
      mechanics: mechanicNames,
      tags: [...new Set(slot.tags)],
      field: slot.field,
      rtp: slot.rtp,
      rtpValue: Number.isFinite(value) ? value : null,
      volatility: slot.volatility,
      image: slot.image,
      description: slot.description,
      coverage: "dossier",
      source: slot.source,
      gameType: "",
      maxWin: verified?.maxWin ?? "",
      releaseDate,
      verifiedFacts: [
        mechanicNames.length ? "mechanics" : "",
        slot.field,
        slot.rtp,
        slot.volatility,
        releaseDate,
        verified?.maxWin ?? "",
      ].filter(Boolean).length,
      searchText: buildCatalogSearchText({
        name: slot.name,
        provider: slot.provider,
        year: slot.year,
        field: slot.field,
        rtp: slot.rtp,
        volatility: slot.volatility,
        mechanics: mechanicNames,
        tags: slot.tags,
        description: slot.description,
        feature: slot.feature,
        maxWin: verified?.maxWin,
        releaseDate,
      }),
    };
  });

  const catalogItems: CatalogItem[] = catalogSeeds.map((seed) => {
    const research = getVerifiedCatalogResearch(seed.slug);
    const details = getVerifiedCatalogDetails(seed.slug);
    const gameType = getVerifiedCatalogGameType(seed.slug);
    const mechanicNames = research?.mechanics ?? [];
    const releaseDate = details?.releaseDate ?? "";
    const year = releaseYear(releaseDate);
    const verifiedFacts = [
      mechanicNames.length ? "mechanics" : "",
      gameType?.gameType ?? "",
      details?.field ?? "",
      details?.rtp ?? "",
      details?.maxWin ?? "",
      details?.volatility ?? "",
      releaseDate,
    ].filter(Boolean).length;
    const description = verifiedFacts
      ? `${seed.name} от ${seed.provider}. В карточке уже подтверждено технических параметров: ${verifiedFacts}; неизвестные характеристики остаются пустыми до проверки.`
      : `${seed.name} от ${seed.provider}. Название подтверждено в официальном каталоге провайдера; подробные характеристики проходят редакционную проверку.`;
    return {
      slug: seed.slug,
      name: seed.name,
      provider: seed.provider,
      providerSlug: providerSlug(seed.provider),
      year,
      mechanics: mechanicNames,
      tags: [],
      field: details?.field ?? "",
      rtp: details?.rtp ?? "",
      rtpValue: exactRtpValue(details?.rtp),
      volatility: details?.volatility ?? "",
      image: "/images/unavailable.svg",
      description,
      coverage: "catalog",
      source: seed.source,
      gameType: gameType?.gameType ?? "",
      maxWin: details?.maxWin ?? "",
      releaseDate,
      verifiedFacts,
      searchText: buildCatalogSearchText({
        name: seed.name,
        provider: seed.provider,
        year,
        mechanics: mechanicNames,
        field: details?.field,
        rtp: details?.rtp,
        volatility: details?.volatility,
        gameType: gameType?.gameType,
        maxWin: details?.maxWin,
        releaseDate,
        description,
      }),
    };
  });

  const items = [...dossierItems, ...catalogItems];
  const providerCounts = frequency(items.map((item) => item.provider));
  const providerCountMap = new Map(providerCounts.map((item) => [item.name, item.count]));
  const mechanicCounts = frequency(items.flatMap((item) => [...new Set(item.mechanics)]));
  const mechanicCountMap = new Map(mechanicCounts.map((item) => [item.name, item.count]));

  const facets = {
    total: items.length,
    mechanicsKnown: items.filter((item) => item.mechanics.length > 0).length,
    providers: Array.from(new Set(items.map((item) => item.provider)))
      .map((name) => ({ name, slug: providerSlug(name), count: providerCountMap.get(name) || 0 }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ru")),
    mechanics: mechanics.map((item) => ({
      name: item.name,
      slug: item.slug,
      count: mechanicCountMap.get(item.name) || 0,
    })),
    volatility: frequency(items.map((item) => item.volatility)),
    features: frequency(items.flatMap((item) => [...new Set(item.tags)])),
  } satisfies CatalogModel["facets"];

  return { items, facets };
}

export type ComparisonItem = {
  slug: string;
  name: string;
  provider: string;
  providerSlug: string;
  year: number;
  mechanics: { name: string; slug: string }[];
  tags: string[];
  field: string;
  rtp: string;
  rtpValue: number | null;
  volatility: string;
  image: string;
  feature: string;
  note: string;
  metrics?: {
    maxWin?: string;
    maxWinLabel?: string;
    rtpVariants?: string[];
  };
};

export function createComparisonIndex(): ComparisonItem[] {
  return slots.map((slot) => {
    const value = slotRtpValue(slot);
    const verified = getVerifiedSlotMetrics(slot.slug);
    return {
      slug: slot.slug,
      name: slot.name,
      provider: slot.provider,
      providerSlug: providerSlug(slot.provider),
      year: slot.year,
      mechanics: slotMechanics(slot).map((name) => ({
        name,
        slug: mechanics.find((item) => item.name === name)?.slug || "",
      })),
      tags: [...new Set(slot.tags)],
      field: slot.field,
      rtp: slot.rtp,
      rtpValue: Number.isFinite(value) ? value : null,
      volatility: slot.volatility,
      image: slot.image,
      feature: slot.feature,
      note: slot.note,
      ...(verified
        ? {
            metrics: {
              maxWin: verified.maxWin,
              maxWinLabel: verified.maxWinLabel,
              rtpVariants: verified.rtpVariants,
            },
          }
        : {}),
    };
  });
}
