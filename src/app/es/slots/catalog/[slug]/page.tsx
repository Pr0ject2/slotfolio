import { notFound } from "next/navigation";
import { SpanishCatalogProfile } from "@/components/spanish-catalog-profile";
import { createCatalogModel } from "@/lib/catalog-index";
import { spanishCatalogComplete } from "@/lib/spanish-catalog-complete";
import { spanishCatalogRecordSlugs, hasSpanishCatalogRecord } from "@/lib/spanish-catalog-record-routes";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
const published = new Map(createCatalogModel().items.filter(item => item.coverage === "catalog").map(item => [item.slug, item]));

export function generateStaticParams() {
  return spanishCatalogRecordSlugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = hasSpanishCatalogRecord(slug) ? published.get(slug) : undefined;
  return pageMetadata({
    title: item ? `${item.name}: reglas, funciones y características | Slotfolio` : "Juego no disponible",
    description: item ? `${item.name}, de ${item.provider}: cómo funciona, bonos, parámetros documentados y fuentes originales.` : "La ficha de este juego no está disponible.",
    path: `/es/slots/catalog/${slug}`,
    noIndex: true,
    image: item?.image,
  });
}

export default async function SpanishCatalogRecord({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = hasSpanishCatalogRecord(slug) ? published.get(slug) : undefined;
  const copy = spanishCatalogComplete[slug];
  if (!item || !copy) notFound();
  return <SpanishCatalogProfile item={item} copy={copy} />;
}
