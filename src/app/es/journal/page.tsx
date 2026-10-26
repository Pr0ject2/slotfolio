import { ComparisonLinks } from "@/components/editorial-comparison";
import Link from "next/link";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { spanishJournalGuides } from "@/lib/spanish-journal-guides";
import { pageMetadata } from "@/lib/seo";
import styles from "@/app/journal/guides.module.css";
export const metadata=pageMetadata({title:"Revista Slotfolio: reglas de juego y guías prácticas",description:"Explicaciones prácticas sobre tablas de pago, sistemas de premios y RTP, con ejemplos respaldados por fuentes y sin promesas de futuros premios.",path:"/es/journal",previewOnly: true});
export default function SpanishJournal(){return <>
  <SpanishBreadcrumbs items={[{label:"Revista y guías"}]} />
  <div className="page-heading"><div><span className="eyebrow accent">Mecánicas, tablas de pagos y RTP</span><h1>Revista y guías</h1></div><p>Entiende cómo funcionan las tragamonedas, qué puede y qué no puede decirte el RTP y qué reglas conviene comprobar.</p></div>
  <section className="feature-band" style={{marginTop:0}}><div className="feature-band-title"><span className="eyebrow">Explicación destacada</span><h2><Link href="/es/journal/how-cascades-work">Un giro.<br /><em>Varios eventos.</em></Link></h2><p>Qué ocurre cuando se retiran los símbolos iguales y una ronda pagada continúa mediante cascadas.</p><Link className="text-link" href="/es/journal/how-cascades-work">Leer la guía de cascadas ↗</Link></div><div className="cascade-art" aria-hidden="true">{[0,1,2].map(i=><div className="cascade-column" key={i}><span>◆</span><span className={i===1?"falling":""}>{i===1?"↓":"✦"}</span><span>◆</span></div>)}<small>DENTRO DE LAS REGLAS</small></div></section>
  <section className={styles.index} aria-labelledby="rules-guides"><h2 id="rules-guides">Comprende las reglas</h2><div className={styles.list}>{spanishJournalGuides.map(guide=><article className={styles.item} key={guide.slug}><span className="eyebrow accent">{guide.category}</span><h3><Link href={`/es/journal/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.description}</p><Link className="text-link" href={`/es/journal/${guide.slug}`}>Leer guía ↗</Link></article>)}</div></section>
  <div className="hub-list"><Link href="/es/journal/understanding-rtp"><span className="number">Guía</span><h2>Qué significa realmente el RTP</h2><p>Por qué un retorno teórico del 96% no significa recuperar el 96% de un depósito en una sesión.</p><b aria-hidden="true">↗</b></Link><Link href="/es/mechanics"><span className="number">Explora</span><h2>Mecánicas del juego</h2><p>Consulta las explicaciones de líneas de pago, grupos, cascadas y otras reglas documentadas.</p><b aria-hidden="true">↗</b></Link></div>
  <p className="data-note">Elige una pregunta concreta, consulta el ejemplo y contrástalo con las reglas de tu versión del juego. Las explicaciones no predicen resultados.</p>
<ComparisonLinks locale="es" /></>;}
