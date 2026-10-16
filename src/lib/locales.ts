export type SiteLocale = "ru" | "en";

// Include only pages that have complete reviewed English copy.
// Adding a route here exposes it in the language switcher and hreflang.
export const englishReadyPaths = [
  "/",
  "/about",
  "/editorial-policy",
  "/privacy",
  "/disclosure",
  "/responsible-gaming",
  "/journal/understanding-rtp",
] as const;

const ready = new Set<string>(englishReadyPaths);

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
  return ready.has(normalized)
    ? normalized === "/" ? "/en" : `/en${normalized}`
    : "/en";
}

export function translatedCounterpart(path: string): string | undefined {
  const normalized = russianPath(path).replace(/\/$/, "") || "/";
  if (!ready.has(normalized)) return undefined;
  return isEnglishPath(path)
    ? normalized
    : normalized === "/" ? "/en" : `/en${normalized}`;
}
