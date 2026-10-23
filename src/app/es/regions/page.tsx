import Link from "next/link";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata({title:"Disponibilidad de los juegos y normas de cada país",description:"Que un juego figure en un catálogo no demuestra que esté disponible en tu país. Comprueba las licencias del operador, las condiciones de acceso y los registros oficiales.",path:"/es/regions",noIndex:true});
export default function SpanishRegions(){return <>
  <SpanishBreadcrumbs items={[{label:"Países y disponibilidad"}]} />
  <div className="simple-heading"><span className="eyebrow accent">Las normas varían según el país</span><h1>El mismo juego.<br />Distintas reglas de acceso.</h1><p>Que un juego aparezca en Slotfolio no significa que se ofrezca legalmente donde vives. Consulta al regulador correspondiente, la licencia del operador y sus condiciones antes de tomar una decisión.</p></div>
  <div className="hub-list" style={{marginTop:40}}><Link href="/es/regions/great-britain"><span className="number">GB</span><h2>Gran Bretaña</h2><p>Inglaterra, Escocia y Gales: cómo buscar una empresa de juego en el registro público de la Gambling Commission.</p><b aria-hidden="true">↗</b></Link></div>
  <p className="data-note">Las licencias, las restricciones locales y la protección del consumidor varían según el territorio. Consulta los registros oficiales actuales en lugar de suponer que una web accesible está autorizada a prestarte servicio.</p>
</>;}
