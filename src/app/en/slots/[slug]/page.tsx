import { notFound } from "next/navigation";
import { getSlot } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { englishFullDossiers } from "@/lib/english-full-dossiers";
import { EnglishFullDossier } from "@/components/english-full-dossier";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(englishFullDossiers).filter(slug => slug !== "gates-of-olympus").map(slug => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getSlot(slug);
  const copy = englishFullDossiers[slug];
  return pageMetadata({
    title: game && copy ? `${game.name}: rules, features and RTP explained` : "Game unavailable",
    description: copy?.description ?? "No English guide is available for this game.",
    path: `/en/slots/${slug}`, image:game?.featureImage || game?.image,
    openGraphType:"article", noIndex:true,
  });
}
export default async function EnglishGameDossier({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getSlot(slug);
  if (!game || !englishFullDossiers[slug]) notFound();
  return <EnglishFullDossier game={game} />;
}
