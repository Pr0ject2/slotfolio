import styles from "@/components/english-entity-profile.module.css";
import spanishStyles from "@/components/spanish-entity-profile.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { slots, mechanics, slotMechanics, getSlot } from "@/lib/data";
import { spanishMechanicSlugs, spanishMechanic } from "@/lib/spanish-entities";
import { spanishFullDossiers } from "@/lib/spanish-full-dossiers";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { SectionTitle } from "@/components/editorial";
import { CompareButton } from "@/components/compare-button";
import { SpanishEntityJsonLd, SpanishEntityStats, SpanishGameImage, SpanishGameRow, SpanishMechanicLinks } from "@/components/spanish-entity-profile";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams=false;
export function generateStaticParams(){return spanishMechanicSlugs.map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const m=spanishMechanic(slug);return pageMetadata({title:m?`${m.name}: reglas y ejemplos de juegos`:"Mecánica no encontrada",description:m?.contrast??"Guía de mecánicas de Slotfolio.",path:`/es/mechanics/${slug}`,noIndex:true});}
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const m=spanishMechanic(slug);const original=mechanics.find(item=>item.slug===slug);if(!m||!original)notFound();
  const games=slots.filter(game=>slotMechanics(game).includes(original.name));const example=getSlot(m.example);
  return <div className={`entity-profile mechanic-dossier ${styles.profile} ${spanishStyles.profile}`}>
    <SpanishEntityJsonLd name={m.name} path={`/es/mechanics/${slug}`} parent="mechanics" games={games} description={m.contrast} />
    <SpanishBreadcrumbs items={[{label:"Mecánicas",href:"/es/mechanics"},{label:m.name}]} />
    <div className="simple-heading"><span className="eyebrow accent">Guía de reglas / Mecánica</span><h1>{m.name}</h1><p>{m.subtitle}. {m.text}</p></div>
    <div className="article-layout">
      <aside className="article-toc" aria-label="Secciones de la guía"><span className="eyebrow">Contenido</span><a href="#principle">Cómo funciona</a><a href="#rhythm">Estructura de la ronda</a><a href="#watch">Lee las reglas</a><a href="#example">Ejemplo de juego</a><a href="#catalog-profile">Características</a><a href="#games">Guías de juegos · {games.length}</a></aside>
      <article className="prose">
        <section id="principle"><h2>Cómo funciona</h2>{m.principle.map(text=><p key={text}>{text}</p>)}<ol className="mechanic-sequence">{m.sequence.map(text=><li key={text}>{text}</li>)}</ol></section>
        <section id="rhythm"><h2>En qué se diferencia la ronda</h2><p>{m.contrast}</p><h3>Qué puedes seguir</h3><p>{m.appeal}</p><h3>Qué puede confundir</h3><p>{m.tradeoff}</p></section>
        <section id="watch"><h2>Tres preguntas para las reglas</h2><ul>{m.watch.map(text=><li key={text}>{text}</li>)}</ul><div className="margin-note"><strong>La regla de pago no determina el retorno</strong><p>Los juegos con una misma mecánica pueden tener configuraciones de RTP, volatilidad y probabilidades de premio diferentes.</p></div></section>
      </article>
    </div>
    {example&&<section id="example" className="mechanic-example"><Link href={`/es/slots/${example.slug}`}><SpanishGameImage game={example} /></Link><div><span className="eyebrow accent">Ejemplo de juego</span><h2><Link href={`/es/slots/${example.slug}`}>{example.name} ↗</Link></h2><p>{m.exampleNote}</p><p>{spanishFullDossiers[example.slug].feature}</p><CompareButton slug={example.slug} name={example.name} locale="es" /></div></section>}
    <SpanishEntityStats games={games} filter={{mechanic:original.name}} mechanicName={original.name} />
    <SectionTitle title="Compara los principios de pago" /><SpanishMechanicLinks names={m.related} />
    <section id="games"><SectionTitle title={`Guías de juegos: ${m.name}`} href={`/es/slots?mechanic=${encodeURIComponent(original.name)}`} label="Todos los juegos del catálogo" /><div className="entity-games">{games.map((game,index)=><SpanishGameRow key={game.slug} game={game} index={index} />)}</div></section>
    <div className="editorial-signoff"><p>Elige dos juegos para comparar sus mecánicas, funciones y cifras documentadas.</p><Link href="/es/compare">Abrir comparación ↗</Link></div>
    <div className="entity-reading-links"><Link href="/es/journal/how-cascades-work">Guía detallada de cascadas ↗</Link><Link href="/en/collections/beyond-lines" lang="en">Selección más allá de las líneas de pago (en inglés) ↗</Link></div>
  </div>;
}
