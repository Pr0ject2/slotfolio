import { JsonLd } from "./json-ld";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import type { SiteLocale } from "@/lib/locales";

export function ArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  locale = "ru",
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  locale?: SiteLocale;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: absoluteUrl(path),
        mainEntityOfPage: absoluteUrl(path),
        inLanguage: locale,
        author: {
          "@type": "Organization",
          name: locale === "es" ? "Equipo editorial de Slotfolio" : locale === "en" ? "Slotfolio editorial team" : "Редакция Slotfolio",
          url: absoluteUrl(`${locale === "ru" ? "" : `/${locale}`}/about`),
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: absoluteUrl(locale === "ru" ? "/" : `/${locale}`),
        },
        ...(datePublished ? { datePublished } : {}),
      }}
    />
  );
}
