import { hasEnglishDossier } from "./english-dossier-routes";
import { englishGameCollections } from "./english-game-collections";
import { englishJournalGuides } from "./english-journal-guides";
import { hasEnglishCatalogRecord } from "./english-catalog-record-routes";
import { retiredSlotLinks } from "./retired-slot-links";
import { spanishReadyPaths } from "./spanish-routes";
import { hasSpanishCatalogRecord } from "./spanish-catalog-record-routes";
import { hasSpanishDossier } from "./spanish-dossier-routes";
import { hasSpanishProvider } from "./spanish-provider-routes";
export type SiteLocale = "ru" | "en" | "es";

// Include only pages that have complete reviewed English copy.
// Adding a route here exposes it in the language switcher and hreflang.
export const englishReadyPaths = [
  "/",
  "/about",
  "/slots",
  "/search",
  "/providers",
  "/mechanics",
  "/compare",
  "/collections",
  "/bonuses",
  "/journal",
  "/journal/how-cascades-work",
  "/editorial-policy",
  "/privacy",
  "/responsible-gaming",
  "/journal/understanding-rtp",
] as const;

const ready = new Set<string>(englishReadyPaths);
function isReviewedRoute(path: string): boolean {
  if (ready.has(path)) return true;
  if (path.startsWith("/journal/")) return englishJournalGuides.some(item => item.slug === path.slice("/journal/".length));
  if (path.startsWith("/collections/")) return englishGameCollections.some(item => item.slug === path.slice("/collections/".length));
  if (path.startsWith("/mechanics/")) return ["cascades", "clusters", "lines", "collect", "ways"].includes(path.slice(11));
  if (path.startsWith("/providers/")) return ["pragmatic-play", "play-n-go", "push-gaming", "hacksaw-gaming", "nolimit-city", "netent", "relax-gaming", "endorphina", "bgaming", "3-oaks-gaming", "wazdan", "belatra-games", "yggdrasil-gaming", "shady-lady", "big-time-gaming", "clawbuster", "onlyplay", "mancala-gaming"].includes(path.slice(11));
  if (path.startsWith("/slots/catalog/")) return hasEnglishCatalogRecord(path.slice("/slots/catalog/".length));
  return path.startsWith("/slots/") && (
    hasEnglishDossier(path.slice("/slots/".length)) ||
    Object.prototype.hasOwnProperty.call(retiredSlotLinks, path.slice("/slots/".length))
  );
}

export function isEnglishPath(path: string): boolean {
  return path === "/en" || path.startsWith("/en/");
}

export function russianPath(path: string): string {
  return path.replace(/^\/(?:en|es)(?=\/|$)/, "") || "/";
}

export function siteLocale(path: string): SiteLocale {
  return /^\/es(?:\/|$)/.test(path) ? "es" : isEnglishPath(path) ? "en" : "ru";
}

export function hasTranslation(path: string, locale: SiteLocale): boolean {
  const normalized = russianPath(path).replace(/\/$/, "") || "/";
  if (locale === "ru") return true;
  return locale === "en" ? isReviewedRoute(normalized) : (
    (spanishReadyPaths as readonly string[]).includes(normalized) ||
    (normalized.startsWith("/providers/") && hasSpanishProvider(normalized.slice("/providers/".length))) ||
    (normalized.startsWith("/slots/catalog/") && hasSpanishCatalogRecord(normalized.slice("/slots/catalog/".length))) ||
    (normalized.startsWith("/slots/") && hasSpanishDossier(normalized.slice("/slots/".length)))
  );
}

export function languageAlternates(path: string): Partial<Record<SiteLocale, string>> {
  return Object.fromEntries((["ru", "en", "es"] as const)
    .filter(locale => hasTranslation(path, locale))
    .map(locale => [locale, languageHref(path, locale)]));
}

export function languageHref(path: string, target: SiteLocale): string {
  const normalized = russianPath(path).replace(/\/$/, "") || "/";
  if (target === "ru") return normalized;
  return hasTranslation(normalized, target)
    ? normalized === "/" ? `/${target}` : `/${target}${normalized}`
    : `/${target}`;
}

// Legacy RU/EN pair; new multilingual callers should use languageAlternates.
export function translatedCounterpart(path: string): string | undefined {
  const normalized = russianPath(path).replace(/\/$/, "") || "/";
  if (!isReviewedRoute(normalized)) return undefined;
  return isEnglishPath(path)
    ? normalized
    : normalized === "/" ? "/en" : `/en${normalized}`;
}
