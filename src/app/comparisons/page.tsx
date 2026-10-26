import { ComparisonIndex, comparisonLabels } from "@/components/editorial-comparison";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: comparisonLabels.ru.index, description: comparisonLabels.ru.intro, path: "/comparisons", previewOnly: true });
export default function Page() { return <ComparisonIndex locale="ru" />; }
