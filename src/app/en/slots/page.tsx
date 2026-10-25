import { Suspense } from "react";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { CatalogFromUrl } from "@/components/catalog";
import { createCatalogModel } from "@/lib/catalog-index";
import { pageMetadata } from "@/lib/seo";
import { englishCatalogueCopy as en } from "@/lib/english-catalogue-copy";

export const metadata = pageMetadata({
  title: "Slot game catalogue | Slotfolio",
  description: "Browse 1,000 slot games by publisher and mechanic. Open reviewed English guides and source-linked catalogue facts, with Russian originals clearly marked.",
  path: "/en/slots",
  previewOnly: true,
});

export default function EnglishCataloguePage() {
  const model = createCatalogModel();
  return (
    <>
      <EnglishBreadcrumbs items={[{ label: "Catalogue" }]} />
      <div className="page-heading utility-heading" lang="en">
        <div><span className="eyebrow accent">Games, rules and mechanics</span>
          <h1>{en.heading}</h1>
        </div>
        <p>{en.intro}</p>
      </div>
      <Suspense fallback={<div className="catalog-loading">Loading the catalogue…</div>}>
        <CatalogFromUrl model={model} locale="en" />
      </Suspense>
    </>
  );
}
