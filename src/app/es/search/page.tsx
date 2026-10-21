import { Suspense } from "react";
import { CatalogFromUrl } from "@/components/catalog";
import { createCatalogModel } from "@/lib/catalog-index";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Buscar un juego | Slotfolio",
  description: "Encuentra una tragamonedas por título, proveedor, mecánica o función entre los 1000 juegos del catálogo.",
  path: "/es/search",
  noIndex: true,
});

export default function SpanishSearch() {
  const model = createCatalogModel();
  return (
    <>
      <div className="page-heading utility-heading" lang="es">
        <div><span className="eyebrow accent">Encuentra un juego</span><h1>Buscar en el catálogo</h1></div>
        <p>Busca por título, proveedor, mecánica o función. Por ejemplo: «cascadas», «comodines» o «giros gratis».</p>
      </div>
      <Suspense fallback={<div className="catalog-loading">Cargando la búsqueda…</div>}>
        <CatalogFromUrl model={model} locale="es" />
      </Suspense>
    </>
  );
}
