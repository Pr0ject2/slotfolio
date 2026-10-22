import styles from "@/components/english-entity-profile.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { slots, providerSlug } from "@/lib/data";
import { catalogStats, representativeGames } from "@/lib/catalog-stats";
import { spanishProvider, spanishProviderSlugs } from "@/lib/spanish-entities";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { SectionTitle } from "@/components/editorial";
import { SpanishEntityJsonLd, SpanishEntityStats, SpanishFeaturedGames, SpanishGameRow, SpanishMechanicLinks } from "@/components/spanish-entity-profile";
import { spanishCatalogFact } from "@/lib/spanish-catalog-facts";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams=false;
export function generateStaticParams(){return spanishProviderSlugs.map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=spanishProvider(slug);return pageMetadata({title:p?`${p.name}: juegos y mecánicas`:"Proveedor no encontrado",description:p?.catalogSummary??"Perfiles de proveedores de Slotfolio.",path:`/es/providers/${slug}`,noIndex:true});}
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const p=spanishProvider(slug);if(!p)notFound();const games=slots.filter(game=>providerSlug(game.provider)===slug);const stats=catalogStats(games);
  return <div className={`entity-profile provider-dossier ${styles.profile}`}>
    <SpanishEntityJsonLd name={p.name} path={`/es/providers/${slug}`} parent="providers" games={games} description={p.catalogSummary} />
    <SpanishBreadcrumbs items={[{label:"Proveedores",href:"/es/providers"},{label:p.name}]} />
    <div className="page-heading provider-profile-heading"><div><span className="eyebrow accent">Perfil del proveedor</span><h1>{p.name}</h1></div><p>{stats.count} {stats.count===1?"guía de juego seleccionada":"guías de juegos seleccionadas"}<br />{stats.mechanics.map(m=>spanishCatalogFact(m.name)).join(" · ")}</p></div>
    <nav className="entity-jump" aria-label="Secciones del perfil"><a href="#approach">Diseño del juego</a><a href="#catalog-profile">Características</a><a href="#games">Guías de juegos · {stats.count}</a><Link href={`/es/slots?provider=${slug}`}>Ver en el catálogo ↗</Link></nav>
    <section id="approach" className="entity-intro"><p className="big-serif">{p.profileIntro}</p><div><p>{p.profileBody}</p><p className="entity-editorial-note">{p.signoff}</p></div></section>
    {games.length?<><SectionTitle title={games.length===1?"Un ejemplo de juego":"Dos ejemplos para comparar"} />
      <p className="entity-section-note">{games.length===1?"Abre la guía para comprobar las reglas de pago, funciones y notas de las fuentes.":"Usa estos juegos para identificar diferencias en las reglas de pago y los bonus."}</p>
      <SpanishFeaturedGames games={representativeGames(games)} /></>:<p className="entity-section-note">Esta selección no incluye actualmente guías completas de este proveedor. Consulta el catálogo y comprueba el título y el proveedor en las fuentes de cada juego.</p>}
    {p.reading&&<section className="entity-reading"><span className="eyebrow accent">En qué fijarte</span><div><h2>{p.reading.title}</h2><p>{p.reading.text}</p><div className="entity-reading-links">{p.reading.compare.map(id=>{const game=games.find(g=>g.slug===id);return game&&<Link key={id} href={`/es/slots/${id}`}>{game.name} ↗</Link>;})}<Link href="/en/compare" lang="en">Abrir comparación (en inglés) ↗</Link></div></div></section>}
    <SpanishEntityStats games={games} filter={{provider:slug}} />
    <SectionTitle title="Mecánicas relacionadas" /><SpanishMechanicLinks names={stats.mechanics.map(m=>m.name)} />
    <section id="games"><SectionTitle title="Guías de juegos seleccionadas" href={`/es/slots?provider=${slug}`} label="Todos los juegos del catálogo" /><div className="entity-games">{games.map((game,index)=><SpanishGameRow key={game.slug} game={game} index={index} />)}</div></section>
    <div className="editorial-signoff provider-signoff"><p>Abre una guía para consultar las reglas del juego, las cifras documentadas y las notas de las fuentes.</p><Link href="/en/compare" lang="en">Comparar dos juegos (en inglés) ↗</Link></div>
  </div>;
}
