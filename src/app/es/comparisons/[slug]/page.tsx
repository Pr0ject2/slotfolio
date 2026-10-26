import { notFound } from "next/navigation";
import { EditorialComparisonPage } from "@/components/editorial-comparison";
import { editorialComparisons } from "@/lib/editorial-comparisons";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return editorialComparisons.map(item => ({ slug: item.slug })); }
async function find(params: Promise<{ slug: string }>) { const { slug } = await params; const item = editorialComparisons.find(item => item.slug === slug); if (!item) notFound(); return item; }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const item = await find(params); return pageMetadata({ title: item.copy.es.title, description: item.copy.es.description, path: `/es/comparisons/${item.slug}`, openGraphType: "article", previewOnly: true }); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { return <EditorialComparisonPage comparison={await find(params)} locale="es" />; }
