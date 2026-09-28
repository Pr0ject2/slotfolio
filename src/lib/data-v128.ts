import {
  article,
  mechanics,
  providerProfiles as baseProviderProfiles,
  providerSlug,
  ruPlural,
  slotMatchesSearch,
  slotMechanics,
  slotRtpValue,
  slots as baseSlots,
  type OperatorAvailability,
  type ProviderProfile,
  type Slot,
} from "./data-base";
import { slotAdditions1 } from "./slot-additions-1";
import { slotAdditions2 } from "./slot-additions-2";
import { slotAdditions3 } from "./slot-additions-3";
import { slotAdditions4 } from "./slot-additions-4";
import { slotAdditions5 } from "./slot-additions-5";
import { slotAdditions6 } from "./slot-additions-6";
import { legacyOneWinAvailabilityBySlug } from "./legacy-1win-availability";
import { providerProfileOverrides } from "./provider-profile-overrides";
import { providerProfileAdditions5 } from "./provider-profile-additions-5";
import { providerProfileAdditions6 } from "./provider-profile-additions-6";

export { article, mechanics, providerSlug, ruPlural, slotMatchesSearch, slotMechanics, slotRtpValue };
export type { OperatorAvailability, ProviderProfile, Slot };

function uniqueBySlug<T extends { slug: string }>(items: T[]) {
  const bySlug = new Map<string, T>();
  for (const item of items) bySlug.set(item.slug, item);
  return Array.from(bySlug.values());
}

const mergedSlots: Slot[] = [
  ...baseSlots,
  ...slotAdditions1,
  ...slotAdditions2,
  ...slotAdditions3,
  ...slotAdditions4,
  ...slotAdditions5,
  ...slotAdditions6,
];

const sourceBackedTagRemovals: Record<string, string[]> = {
  "crown-coins": ["Pick-бонус"],
  "max-win-machine": ["FeatureSpins", "Множители", "Мгновенные призы"],
};

const sourceBackedFeatureCorrections: Record<string, string> = {
  "max-win-machine":
    "Один, два или три Lucky Seven слева направо дают фиксированные выплаты 1x, 10x и 10 000x соответственно. Текущая официальная страница Hacksaw Gaming не заявляет для игры дополнительных FeatureSpins или multiplier-функций.",
};

const sourceBackedVolatilityCorrections: Record<string, string> = {
  gemhalla: "Очень высокая",
  "max-win-machine": "Экстремальная",
  "hand-of-anubis": "Экстремальная",
  "power-of-ten": "Экстремальная",
  "clawbass-bonanza": "Очень высокая",
  "clawbass-bonanza-free-rush": "Очень высокая",
};

const sourceBackedNoteCorrections: Record<string, string> = {
  "snake-arena":
    "Официальный релиз Relax Gaming описывает Snake Arena как maximum volatility gaming experience, но ниже в том же материале называет её high volatility title. Slotfolio сохраняет категорию «Экстремальная» по более сильной формулировке и явно отмечает внутреннее расхождение источника.",
  "hand-of-anubis":
    "Текущий официальный каталог Hacksaw Gaming показывает для Hand of Anubis полный volatility meter 5/5, тогда как официальный релиз от 30.04.2022 называет игру high volatility. Slotfolio сохраняет текущую категорию «Экстремальная» и явно отмечает first-party конфликт.",
  "dork-unit":
    "Справочный RTP карточки составляет 96,28%. Официальный релиз Hacksaw Gaming подтверждает medium 3/5 volatility, 16 линий и максимум 10 000x, но RTP-конфигурации в этом релизе не опубликованы, поэтому более низкие варианты не заявляются как verified-метрика.",
  "power-of-ten":
    "Справочный RTP карточки составляет 96,23%. Текущая официальная страница Hacksaw Gaming подтверждает механику Power Wheels и максимум 10 000x, но не публикует RTP-конфигурации или отдельное текстовое поле volatility. Текущий официальный каталог Hacksaw Gaming показывает полный volatility meter 5/5, поэтому Slotfolio использует категорию «Экстремальная»; более низкие RTP-варианты не заявляются как verified-метрика.",
  "clawbass-bonanza":
    "Текущая официальная карточка Clawbuster публикует RTP 95% и Very High volatility. Float Multipliers достигают 100x, а общий результат может доходить до 6 000x original bet; Slotfolio хранит 6 000x как заявленный потенциал, а не как отдельно объявленный fixed max-win cap.",
  "clawbass-bonanza-free-rush":
    "Текущая официальная карточка Clawbuster публикует RTP 94,97% и Very High volatility. Treasure Multipliers достигают 100x, а общий результат может доходить до 6 000x original bet; Slotfolio хранит 6 000x как заявленный потенциал, а не как отдельно объявленный fixed max-win cap.",
};

const sourceBackedSourceCorrections: Record<string, string> = {
  "snake-arena":
    "https://www.relax-gaming.com/news/2020/01/relax-gaming-launches-actionpacked-new-slot-snake-arena-across-network",
  "hand-of-anubis":
    "https://www.hacksawgaming.com/news/new-game-release-april-summary",
};

function withSourceBackedCorrections(slot: Slot): Slot {
  const removals = sourceBackedTagRemovals[slot.slug] ?? [];
  const feature = sourceBackedFeatureCorrections[slot.slug] ?? slot.feature;
  const volatility = sourceBackedVolatilityCorrections[slot.slug] ?? slot.volatility;
  const note = sourceBackedNoteCorrections[slot.slug] ?? slot.note;
  const source = sourceBackedSourceCorrections[slot.slug] ?? slot.source;
  const tags = removals.length
    ? slot.tags.filter((tag) => !removals.includes(tag))
    : slot.tags;
  const tagsChanged = tags.length !== slot.tags.length;
  const featureChanged = feature !== slot.feature;
  const volatilityChanged = volatility !== slot.volatility;
  const noteChanged = note !== slot.note;
  const sourceChanged = source !== slot.source;
  return tagsChanged || featureChanged || volatilityChanged || noteChanged || sourceChanged
    ? { ...slot, tags, feature, volatility, note, source }
    : slot;
}

function withLegacyOneWinAvailability(slot: Slot): Slot {
  const evidence = legacyOneWinAvailabilityBySlug[slot.slug];
  if (!evidence || slot.availability?.some((item) => item.operator === "1win")) return slot;
  return { ...slot, availability: [...(slot.availability ?? []), evidence] };
}

// Keep the latest record for a slug, but never expose duplicate public routes/cards.
// Source-backed corrections remove claims that no longer match the provider evidence.
// Legacy operator evidence is additive and never replaces a newer per-slot availability record.
export const slots: Slot[] = uniqueBySlug(mergedSlots)
  .map(withSourceBackedCorrections)
  .map(withLegacyOneWinAvailability);
export const getSlot = (slug: string) => slots.find((slot) => slot.slug === slug);

export const slotFeatureOptions = Array.from(
  slots.reduce((counts, slot) => {
    for (const tag of new Set(slot.tags)) counts.set(tag, (counts.get(tag) || 0) + 1);
    return counts;
  }, new Map<string, number>()),
)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ru"))
  .map(([name, count]) => ({ name, count }));

function titleTokens(value: string) {
  const ignored = new Set([
    "the",
    "of",
    "and",
    "win",
    "slot",
    "super",
    "deluxe",
    "hold",
    "free",
  ]);
  return value
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, " ")
    .split(" ")
    .filter((token) => token.length > 2 && !ignored.has(token));
}

function relatedScore(slot: Slot, candidate: Slot) {
  const sharedMechanics = candidate.mechanics.filter((name) => slot.mechanics.includes(name)).length;
  const sharedTags = candidate.tags.filter((tag) => slot.tags.includes(tag)).length;
  const sameProvider = candidate.provider === slot.provider ? 1 : 0;
  const sameVolatility = candidate.volatility === slot.volatility ? 1 : 0;
  const candidateTitleTokens = new Set(titleTokens(candidate.name));
  const sharedTitleTokens = titleTokens(slot.name).filter((token) => candidateTitleTokens.has(token)).length;
  const rtpDistance = Math.abs(slotRtpValue(candidate) - slotRtpValue(slot));

  return (
    sharedMechanics * 6 +
    sharedTags * 2 +
    sameProvider * 3 +
    sameVolatility +
    sharedTitleTokens * 4 -
    (Number.isFinite(rtpDistance) ? Math.min(rtpDistance, 2) * 0.25 : 0)
  );
}

export function relatedSlots(slot: Slot, limit = 2) {
  const ranked = slots
    .filter((candidate) => candidate.slug !== slot.slug)
    .map((candidate, index) => ({ candidate, index, score: relatedScore(slot, candidate) }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const selected: typeof ranked = [];
  while (selected.length < limit && ranked.length) {
    const best = ranked[0];
    const diversified = ranked.find(
      (entry) =>
        entry.score >= best.score - 3 &&
        selected.every((picked) => picked.candidate.provider !== entry.candidate.provider),
    );
    const pick = diversified ?? best;
    selected.push(pick);
    ranked.splice(ranked.indexOf(pick), 1);
  }

  return selected.map(({ candidate }) => candidate);
}

const overrides = new Map(providerProfileOverrides.map((profile) => [profile.slug, profile]));
export const providerProfiles: ProviderProfile[] = uniqueBySlug([
  ...baseProviderProfiles.map((profile) => overrides.get(profile.slug) ?? profile),
  ...providerProfileOverrides.filter((profile) => !baseProviderProfiles.some((base) => base.slug === profile.slug)),
  ...providerProfileAdditions5,
  ...providerProfileAdditions6,
]);