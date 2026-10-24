import { notFound } from "next/navigation";
import { getSlot } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { spanishFullDossiers } from "@/lib/spanish-full-dossiers";
import { spanishDossierSlugs } from "@/lib/spanish-dossier-routes";
import { SpanishFullDossier } from "@/components/spanish-full-dossier";

export const dynamicParams = false;
export function generateStaticParams() { return spanishDossierSlugs.map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getSlot(slug), copy = spanishFullDossiers[slug];
  return pageMetadata({
    title: game && copy ? `${game.name}: reglas, funciones y RTP explicados` : "Juego no disponible",
    description: copy?.description ?? "No hay una guía en español disponible para este juego.",
    path:`/es/slots/${slug}`, image:game?.featureImage || game?.image, openGraphType:"article", previewOnly: true,
  });
}
export default async function SpanishGameDossier({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getSlot(slug);
  if (!game || !spanishFullDossiers[slug]) notFound();
  return <SpanishFullDossier game={game} />;
}
