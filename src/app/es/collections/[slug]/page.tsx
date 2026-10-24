import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleJsonLd } from "@/components/article-json-ld";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { GameImage } from "@/components/editorial-client";
import { CompareButton } from "@/components/compare-button";
import { getSlot } from "@/lib/data";
import { spanishGameCollections } from "@/lib/spanish-game-collections";
import { pageMetadata } from "@/lib/seo";
import styles from "@/app/collections/collections.module.css";
export const dynamicParams=false;
export function generateStaticParams(){return spanishGameCollections.map(({slug})=>({slug}));}
async function findCollection(params:Promise<{slug:string}>){const {slug}=await params;const collection=spanishGameCollections.find(item=>item.slug===slug);if(!collection)notFound();return collection;}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const collection=await findCollection(params);return pageMetadata({title:collection.title,description:collection.introduction,path:`/es/collections/${collection.slug}`,openGraphType:"article",noIndex:true});}
export default async function SpanishCollectionPage({params}:{params:Promise<{slug:string}>}){const collection=await findCollection(params);return <div className={styles.page}>
  <ArticleJsonLd title={collection.title} description={collection.introduction} path={`/es/collections/${collection.slug}`} locale="es" />
  <SpanishBreadcrumbs items={[{label:"Selecciones",href:"/es/collections"},{label:collection.title}]} />
  <header className={`collection-heading ${styles.intro}`}><span className="eyebrow accent">Selección / {collection.games.length} juegos</span><h1>{collection.title}</h1><p>{collection.introduction}</p></header>
  <section aria-labelledby="selection-heading" className={styles.note}><h2 id="selection-heading">¿Por qué estos juegos?</h2><p>{collection.selection}</p></section>
  {collection.games.map((entry,index)=>{const slot=getSlot(entry.slug);if(!slot)throw new Error(`Missing published collection game: ${entry.slug}`);return <article className={`collection-entry${slot.slug==="sweet-bonanza"?" collection-entry--sweet-bonanza":""}`} key={entry.slug}><span className="number">{String(index+1).padStart(2,"0")}</span><Link href={`/es/slots/${slot.slug}`} aria-label={`Leer la guía de ${slot.name}`}><GameImage slot={slot} locale="es" /></Link><div><span className="eyebrow accent">{slot.provider}</span><h2><Link href={`/es/slots/${slot.slug}`}>{slot.name}</Link></h2><p>{entry.note}</p><p><strong>Qué comprobar:</strong> {entry.check}</p><Link className="text-link" href={`/es/slots/${slot.slug}`}>Leer guía del juego ↗</Link><CompareButton slug={slot.slug} name={slot.name} locale="es" /></div></article>;})}
  <section className={styles.note} aria-labelledby="compare-heading"><h2 id="compare-heading">Preguntas que merece la pena comparar</h2><ul className={styles.checklist}>{collection.checklist.map(item=><li key={item}>{item}</li>)}</ul><p>Añade dos juegos con los botones Comparar y abre la <Link href="/es/compare">tabla comparativa</Link>. Para conocer las condiciones precisas de cada función, consulta la tabla de pagos y las referencias de su guía.</p><p>El tamaño del tablero o el tipo de bonus no determinan la probabilidad de ganar. Los ajustes de RTP disponibles pueden variar entre operadores.</p></section>
  <nav className={styles.topics} aria-label="Otras selecciones">{spanishGameCollections.filter(item=>item.slug!==collection.slug).map(item=><Link href={`/es/collections/${item.slug}`} key={item.slug}>{item.title}</Link>)}<Link href="/es/collections">Todas las selecciones</Link></nav>
</div>;}
