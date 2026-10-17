import { Suspense } from "react";
import { Comparison } from "@/components/comparison";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { createEnglishComparisonIndex } from "@/lib/english-comparison";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({
  title: "Compare game rules, features and RTP",
  description:
    "Compare two of the 100 full game guides: payout rules, grid, RTP configurations, documented figures and source qualifications.",
  path: "/en/compare",
  noIndex: true,
});
export default function Page() {
  return (
    <>
      <EnglishBreadcrumbs
        items={[
          { label: "Catalogue", href: "/en/slots" },
          { label: "Comparison" },
        ]}
      />
      <div className="page-heading utility-heading comparison-heading">
        <div>
          <span className="eyebrow accent">Side by side</span>
          <h1>Compare games</h1>
        </div>
        <p>
          Two games in one table.
          <br />
          Your selection stays in this browser.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="comparison-loading">Preparing the table…</div>
        }
      >
        <Comparison items={createEnglishComparisonIndex()} locale="en" />
      </Suspense>
    </>
  );
}
