import { JsonLd } from "./json-ld";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

export function ArticleJsonLd({
  title,
  description,
  path,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
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
        inLanguage: "ru",
        author: {
          "@type": "Organization",
          name: "Редакция Slotfolio",
          url: absoluteUrl("/about"),
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: absoluteUrl("/"),
        },
        ...(datePublished ? { datePublished } : {}),
      }}
    />
  );
}
