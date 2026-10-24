import Link from "next/link";
import { providerProfiles, slots } from "@/lib/data";
import { catalogStats } from "@/lib/catalog-stats";
import { spanishProvider } from "@/lib/spanish-entities";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({title:"Proveedores de tragamonedas y sus juegos",description:"Compara las reglas de pago, tableros y bonus de las guías seleccionadas de Slotfolio por proveedor.",path:"/es/providers",noIndex:true});
export default function Page(){return <>
  <SpanishBreadcrumbs items={[{label:"Catálogo",href:"/es/slots"},{label:"Proveedores"}]} />
  <div className="page-heading utility-heading provider-heading"><div><span className="eyebrow accent">Estudios y sus juegos</span><h1>¿Quién crea los juegos?</h1></div><p>Elige un estudio para explorar sus juegos<br />y comparar sus reglas.</p></div>
  <div className="provider-index-lead"><p className="big-serif">Los juegos de un mismo estudio pueden funcionar de forma muy distinta.</p><div><p>Abre el perfil de un estudio para ver sus mecánicas recurrentes y juegos destacados. El número de guías corresponde a los juegos incluidos en cada perfil.</p><Link href="/en/compare" lang="en" className="text-link">Comparar juegos de distintos estudios (en inglés) ↗</Link></div></div>
  <div className="provider-index" aria-label="Proveedores de la selección de guías">{providerProfiles.map((p,index)=>{const copy=spanishProvider(p.slug)!;const stats=catalogStats(slots.filter(game=>game.provider===p.name));return <Link key={p.slug} href={`/es/providers/${p.slug}`} className="provider-index-row"><span className="provider-index-number">{String(index+1).padStart(2,"0")}</span><div className="provider-index-name"><span className="eyebrow">Proveedor de juegos</span><h2>{p.name}</h2></div><p>{copy.catalogSummary}</p><div className="provider-index-stats"><span>{stats.count} {stats.count===1?"guía":"guías"}</span><span>{stats.mechanics.length} {stats.mechanics.length===1?"mecánica":"mecánicas"}</span></div><b aria-hidden="true">↗</b></Link>;})}</div>
</>;}
