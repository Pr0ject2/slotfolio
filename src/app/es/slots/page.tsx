import { Suspense } from "react";
import { CatalogFromUrl } from "@/components/catalog";
import { createCatalogModel } from "@/lib/catalog-index";
import { pageMetadata } from "@/lib/seo";
import { spanishCatalogueCopy as copy } from "@/lib/spanish-catalogue-copy";

export const metadata = pageMetadata({
  title: "Catálogo de tragamonedas | Slotfolio",
  description: "Busca entre 1000 juegos por nombre, proveedor y mecánica. Consulta los datos verificados y abre las reglas de cada título.",
  path: "/es/slots",
  previewOnly: true,
});

export default function SpanishCatalogue() {
  const model = createCatalogModel();
  return (
    <>
      <div className="page-heading utility-heading" lang="es">
        <div><span className="eyebrow accent">{copy.eyebrow}</span><h1>{copy.heading}<span className="title-count">{model.facets.total}</span></h1></div>
        <p>{copy.intro}</p>
      </div>
      <Suspense fallback={<div className="catalog-loading">Cargando el catálogo…</div>}>
        <CatalogFromUrl model={model} locale="es" />
      </Suspense>
    </>
  );
}
