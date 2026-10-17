import { hasEnglishDossier } from "./english-dossier-routes";
import { hasEnglishCatalogRecord } from "./english-catalog-record-routes";
export type SiteLocale = "ru" | "en";

// Include only pages that have complete reviewed English copy.
// Adding a route here exposes it in the language switcher and hreflang.
export const englishReadyPaths = [
  "/",
  "/about",
  "/slots",
  "/search",
  "/editorial-policy",
  "/privacy",
  "/disclosure",
  "/responsible-gaming",
  "/journal/understanding-rtp",
] as const;

const ready = new Set<string>(englishReadyPaths);
function isReviewedRoute(path: string): boolean {
  if (ready.has(path)) return true;
  if (path.startsWith("/slots/catalog/")) return hasEnglishCatalogRecord(path.slice("/slots/catalog/".length));
  return path.startsWith("/slots/") && hasEnglishDossier(path.slice("/slots/".length));
}

export function isEnglishPath(path: string): boolean {
  return path === "/en" || path.startsWith("/en/");
}

export function russianPath(path: string): string {
  if (!isEnglishPath(path)) return path;
  return path.replace(/^\/en(?=\/|$)/, "") || "/";
}

export function languageHref(path: string, target: SiteLocale): string {
  const normalized = russianPath(path).replace(/\/$/, "") || "/";
  if (target === "ru") return normalized;
  return isReviewedRoute(normalized)
    ? normalized === "/" ? "/en" : `/en${normalized}`
    : "/en";
}

export function translatedCounterpart(path: string): string | undefined {
  const normalized = russianPath(path).replace(/\/$/, "") || "/";
  if (!isReviewedRoute(normalized)) return undefined;
  return isEnglishPath(path)
    ? normalized
    : normalized === "/" ? "/en" : `/en${normalized}`;
}
