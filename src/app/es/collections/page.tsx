import Link from "next/link";
import { getSlot } from "@/lib/data";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { GameImage } from "@/components/editorial-client";
import { spanishGameCollections } from "@/lib/spanish-game-collections";
import { pageMetadata } from "@/lib/seo";
import styles from "@/app/collections/collections.module.css";
export const metadata=pageMetadata({title:"Explora las mecánicas con ejemplos de juegos",description:"Compara líneas de pago, grupos, comodines y bonus de giros gratis mediante ejemplos de las guías y sus fuentes verificadas.",path:"/es/collections",previewOnly: true});
export default function SpanishCollections(){return <div className={styles.page}>
  <SpanishBreadcrumbs items={[{label:"Selecciones"}]} />
  <header className={styles.intro}><span className="eyebrow accent">Selecciones de juegos</span><h1>Entiende las reglas comparando juegos</h1><p>Empieza por una pregunta. Cada selección compara tres juegos, señala las diferencias entre sus mecánicas y propone qué comprobar en la tabla de pagos.</p><p className={styles.caption}>¿Buscas un juego concreto? <Link href="/es/slots">Consulta el catálogo</Link> o <Link href="/es/search">búscalo por nombre</Link>.</p></header>
  <nav className={styles.topics} aria-label="Temas de las selecciones">{spanishGameCollections.map(collection=><Link key={collection.slug} href={`#${collection.slug}`}>{collection.title}</Link>)}</nav>
  {spanishGameCollections.map((collection,index)=><article className={styles.card} id={collection.slug} key={collection.slug}><div><span className="eyebrow">{String(index+1).padStart(2,"0")} / {collection.games.length} juegos</span><h2><Link href={`/es/collections/${collection.slug}`}>{collection.title}</Link></h2><p className={styles.question}>{collection.question}</p><p>{collection.introduction}</p><p className={styles.caption}>{collection.games.map(game=>getSlot(game.slug)!.name).join(" · ")}</p><Link className="text-link" href={`/es/collections/${collection.slug}`}>Explorar esta selección ↗</Link></div><Link href={`/es/collections/${collection.slug}`} className={styles.covers} aria-label={`Explorar selección: ${collection.title}`}>{collection.games.slice(0,2).map(game=><GameImage key={game.slug} slot={getSlot(game.slug)!} locale="es" />)}</Link></article>)}
  <p className={styles.note}>Estas selecciones explican las diferencias entre reglas; no clasifican los juegos por rentabilidad. Una mecánica conocida o un bonus fácil de seguir no predicen el resultado de un giro.</p>
</div>;}
