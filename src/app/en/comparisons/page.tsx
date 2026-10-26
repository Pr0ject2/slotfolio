import { ComparisonIndex, comparisonLabels } from "@/components/editorial-comparison";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: comparisonLabels.en.index, description: comparisonLabels.en.intro, path: "/en/comparisons", previewOnly: true });
export default function Page() { return <ComparisonIndex locale="en" />; }
