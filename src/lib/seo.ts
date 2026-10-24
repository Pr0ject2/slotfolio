import type { Metadata } from "next";
import { languageAlternates, siteLocale } from "./locales";

export const SITE_NAME = "Slotfolio";
export const SITE_DESCRIPTION =
  "Каталог и редакционные разборы слотов: механики, провайдеры, сравнение игр и понятные объяснения правил.";

const DEFAULT_SITE_URL = "http://localhost:3000";

export function siteUrl() {
  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be an HTTP(S) URL without credentials, query or fragment",
    );
  }
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");
  const pathname = url.pathname.replace(/\/+$/, "");
  url.pathname =
    base && pathname !== base && !pathname.endsWith(base)
      ? pathname + base
      : pathname;
  return url.toString().replace(/\/+$/, "");
}

export function absoluteUrl(path = "/") {
  const boundary = path.search(/[?#]/);
  const pathname = boundary < 0 ? path : path.slice(0, boundary);
  const suffix = boundary < 0 ? "" : path.slice(boundary);
  const normalized = "/" + pathname.replace(/^\/+/, "");
  const slash =
    (process.env.GITHUB_ACTIONS === "true" || process.env.SLOTFOLIO_STATIC_EXPORT === "true") &&
    !normalized.endsWith("/") &&
    !/\.[a-z0-9]+$/i.test(normalized)
      ? "/"
      : "";
  return siteUrl() + normalized + slash + suffix;
}

export function absoluteMediaUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return absoluteUrl(path);
}

export function indexingEnabled() {
  if (process.env.NEXT_PUBLIC_INDEXABLE !== "true") return false;
  const url = new URL(siteUrl());
  if (
    url.protocol !== "https:" ||
    !process.env.NEXT_PUBLIC_SITE_URL ||
    /^(localhost$|\d+\.\d+\.\d+\.\d+$|\[|.*\.(localhost|local|invalid|test|example)$)/i.test(
      url.hostname,
    ) ||
    !url.hostname.includes(".")
  ) {
    throw new Error(
      "Indexing requires an explicit public HTTPS NEXT_PUBLIC_SITE_URL",
    );
  }
  // Backup and deployment hostnames never become the searchable site.
  if (/(?:^|\.)(?:github\.io|pages\.dev)$/i.test(url.hostname)) return false;
  // A project-wide Cloudflare variable must not open feature-branch previews.
  if (process.env.CF_PAGES === "1" && process.env.CF_PAGES_BRANCH !== "main") return false;
  return true;
}

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/slots/gates-of-olympus-feature.webp",
  noIndex = false,
  previewOnly = false,
  openGraphType = "website",
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  previewOnly?: boolean;
  openGraphType?: "website" | "article";
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      ...(Object.keys(languageAlternates(path)).length > 1 ? {
        languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([locale, route]) => [locale, absoluteUrl(route!)])),
      } : {}),
    },
    ...(noIndex || (previewOnly && !indexingEnabled()) ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      locale: { ru: "ru_RU", en: "en_GB", es: "es_ES" }[siteLocale(path)],
      type: openGraphType,
      images: [{ url: absoluteMediaUrl(image), alt: `${SITE_NAME}: ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteMediaUrl(image)],
    },
  };
}
