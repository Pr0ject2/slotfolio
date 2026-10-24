import { notFound } from "next/navigation";
import { getSlot } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { englishFullDossiers } from "@/lib/english-full-dossiers";
import { EnglishFullDossier } from "@/components/english-full-dossier";

const slug = "gates-of-olympus";
const game = getSlot(slug);
export const metadata = pageMetadata({
  title:"Gates of Olympus: how the tumble and multiplier features work",
  description:englishFullDossiers[slug].description,
  path:`/en/slots/${slug}`, image:game?.featureImage || game?.image,
  openGraphType:"article", previewOnly: true,
});
export default function GatesOfOlympusEnglishDossier() {
  if (!game) notFound();
  return <EnglishFullDossier game={game} />;
}
