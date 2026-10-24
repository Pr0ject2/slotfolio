import Link from "next/link";
import { spanishMechanicSlugs, spanishMechanic } from "@/lib/spanish-entities";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata=pageMetadata({title:"Mecánicas: líneas de pago, grupos, cascadas y recogida",description:"Cómo se forman los premios, cómo cambia el tablero y qué comprobar en las reglas. Ejemplos de las guías de juegos existentes.",path:"/es/mechanics",noIndex:true});
export default function Page(){return <>
  <SpanishBreadcrumbs items={[{label:"Mecánicas"}]} />
  <div className="page-heading"><div><span className="eyebrow accent">Guía de reglas</span><h1>Cómo funciona el juego</h1></div><p>Sigue cómo se forman los premios<br />y qué ocurre después.</p></div>
  <div className="hub-lead"><p className="big-serif">¿Qué ocurre después de pulsar <em>Girar?</em></p><div className="hub-lead-copy"><p>Juegos de aspecto distinto pueden utilizar la misma regla de pago. Rodillos parecidos pueden ocultar reglas diferentes.</p><p>Empieza por identificar cómo se forman las combinaciones, cómo cambian los símbolos y qué activa el bonus. Una mecánica, por sí sola, no indica el RTP ni la probabilidad de ganar.</p></div></div>
  <div className="hub-list">{spanishMechanicSlugs.map((slug,i)=>{const m=spanishMechanic(slug)!;return <Link key={slug} href={`/es/mechanics/${slug}`}><span className="number">{String(i+1).padStart(2,"0")}</span><h2>{m.name}</h2><p>{m.text}</p><b aria-hidden="true">↗</b></Link>;})}</div>
</>;}
