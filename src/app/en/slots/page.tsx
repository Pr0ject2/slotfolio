import { Suspense } from "react";
import { CatalogFromUrl } from "@/components/catalog";
import { createCatalogModel } from "@/lib/catalog-index";
import { pageMetadata } from "@/lib/seo";
import { englishCatalogueCopy as en } from "@/lib/english-catalogue-copy";

export const metadata = pageMetadata({
  title: "Slot game catalogue | Slotfolio",
  description: "Browse 1,000 slot games by publisher, mechanic, volatility and RTP. Game reviews are currently in Russian.",
  path: "/en/slots",
  locale: "en",
  noIndex: true,
});

export default function EnglishCataloguePage() {
  const model = createCatalogModel();
  return (
    <>
      <div className="page-heading utility-heading" lang="en">
        <div><span className="eyebrow accent">{en.eyebrow}</span>
          <h1>{en.heading}<span className="title-count">{model.facets.total}</span></h1>
        </div>
        <p>{en.intro}</p>
      </div>
      <Suspense fallback={<div className="catalog-loading">Loading the catalogue…</div>}>
        <CatalogFromUrl model={model} locale="en" />
      </Suspense>
    </>
  );
}
