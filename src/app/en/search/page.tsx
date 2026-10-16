import { Suspense } from "react";
import { CatalogFromUrl } from "@/components/catalog";
import { createCatalogModel } from "@/lib/catalog-index";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Find a slot game | Slotfolio",
  description: "Search 1,000 games by title, publisher and mechanics. Detailed game reviews are currently in Russian.",
  path: "/en/search",
  locale: "en",
  noIndex: true,
});

export default function EnglishSearchPage() {
  const model = createCatalogModel();
  return (
    <>
      <div className="page-heading utility-heading" lang="en">
        <div><span className="eyebrow accent">Find a game</span><h1>Search the catalogue</h1></div>
        <p>Search by game title, publisher or mechanic. Detailed reviews are currently in Russian.</p>
      </div>
      <Suspense fallback={<div className="catalog-loading">Loading search…</div>}>
        <CatalogFromUrl model={model} locale="en" />
      </Suspense>
    </>
  );
}
