import { ComparisonIndex, comparisonLabels } from "@/components/editorial-comparison";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: comparisonLabels.es.index, description: comparisonLabels.es.intro, path: "/es/comparisons", previewOnly: true });
export default function Page() { return <ComparisonIndex locale="es" />; }
