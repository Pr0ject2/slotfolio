import { Suspense } from "react";
import { Comparison } from "@/components/comparison";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { createSpanishComparisonIndex } from "@/lib/spanish-comparison";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({title:"Compara reglas, funciones y RTP de los juegos",description:"Compara dos juegos: reglas de pago, tablero, configuraciones de RTP, cifras documentadas y notas de las fuentes.",path:"/es/compare",noIndex:true});
export default function Page(){return <>
  <SpanishBreadcrumbs items={[{label:"Catálogo",href:"/es/slots"},{label:"Comparación"}]} />
  <div className="page-heading utility-heading comparison-heading"><div><span className="eyebrow accent">Lado a lado</span><h1>Comparar juegos</h1></div><p>Dos juegos en una tabla.<br />Tu selección se conserva en este navegador.</p></div>
  <Suspense fallback={<div className="comparison-loading">Preparando la tabla…</div>}><Comparison items={createSpanishComparisonIndex()} locale="es" /></Suspense>
</>;}
