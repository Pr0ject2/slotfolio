import { notFound } from "next/navigation";
import { GameCollectionPage } from "@/components/game-collection";
import { gameCollections } from "@/lib/collections";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return gameCollections.filter(item => item.slug !== "beyond-lines").map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = gameCollections.find(item => item.slug === slug);
  if (!collection) notFound();
  return pageMetadata({ title: collection.title, description: collection.introduction, path: `/collections/${slug}`, openGraphType: "article" });
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = gameCollections.find(item => item.slug === slug);
  if (!collection) notFound();
  return <GameCollectionPage collection={collection} />;
}
