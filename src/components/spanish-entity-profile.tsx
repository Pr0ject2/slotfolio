import Link from "next/link";
import { type Slot, mechanics, providerSlug, slotMechanics } from "@/lib/data";
import { catalogStats, type Frequency } from "@/lib/catalog-stats";
import { spanishCatalogFact } from "@/lib/spanish-catalog-facts";
import { spanishMechanic } from "@/lib/spanish-entities";
import { spanishFullDossiers } from "@/lib/spanish-full-dossiers";
import { absoluteUrl } from "@/lib/seo";
import { withBasePath } from "@/lib/base-path";
import { SectionTitle } from "./editorial";
import { SlotArtwork } from "./slot-artwork";
import { CompareButton } from "./compare-button";
import { JsonLd } from "./json-ld";

export function SpanishGameImage({ game }: { game: Slot }) {
  return <SlotArtwork className="game-image" src={withBasePath(game.image)} alt={`Imagen de ${game.name}`} width={500} height={280} loading="lazy" decoding="async" />;
}
export function SpanishEntityJsonLd({name,path,parent,games,description}: {name:string;path:string;parent:"providers"|"mechanics";games:Slot[];description:string}) {
  return <JsonLd data={{"@context":"https://schema.org","@graph":[
    {"@type":"BreadcrumbList",itemListElement:[{name:"Inicio",path:"/es"},{name:parent==="providers"?"Proveedores":"Mecánicas",path:`/es/${parent}`},{name,path}].map((item,i)=>({"@type":"ListItem",position:i+1,name:item.name,item:absoluteUrl(item.path)}))},
    {"@type":"CollectionPage","@id":absoluteUrl(path),url:absoluteUrl(path),name,description,inLanguage:"es",mainEntity:{"@type":"ItemList",numberOfItems:games.length,itemListElement:games.map((game,i)=>({"@type":"ListItem",position:i+1,name:game.name,url:absoluteUrl(`/es/slots/${game.slug}`)}))}},
  ]}} />;
}
export function SpanishGameRow({game,index}: {game:Slot;index:number}) {
  return <article className="game-row game-row-comparable">
    <span className="row-index">{String(index+1).padStart(2,"0")}</span>
    <Link className="row-image" href={`/es/slots/${game.slug}`}><SpanishGameImage game={game} /></Link>
    <div className="row-main"><Link className="eyebrow" href={`/es/providers/${providerSlug(game.provider)}`}>{game.provider}</Link><h3><Link href={`/es/slots/${game.slug}`}>{game.name}</Link></h3><p>{slotMechanics(game).map(spanishCatalogFact).join(" · ")} <span>·</span> {game.year}</p></div>
    <span className="row-rtp"><small>RTP</small>{spanishCatalogFact(game.rtp)}</span>
    <CompareButton slug={game.slug} name={game.name} locale="es" />
    <Link className="row-arrow" href={`/es/slots/${game.slug}`} aria-label={`Abrir ${game.name}`}>↗</Link>
  </article>;
}
export function SpanishMechanicLinks({names}: {names:string[]}) {
  return <nav className="entity-related" aria-label="Mecánicas relacionadas">{names.map(name=>{
    const m=mechanics.find(item=>item.name===name||item.slug===name);const copy=m&&spanishMechanic(m.slug);
    return copy?<Link key={copy.slug} href={`/es/mechanics/${copy.slug}`}><span>{copy.name} ↗</span><small>{copy.text}</small></Link>:null;
  })}</nav>;
}
export function SpanishFeaturedGames({games}:{games:Slot[]}){
  return <div className="entity-featured">{games.map(game=><article key={game.slug}>
    <Link className="entity-featured-image" href={`/es/slots/${game.slug}`}><SpanishGameImage game={game} /></Link>
    <div><span className="eyebrow">{slotMechanics(game).map(spanishCatalogFact).join(" · ")}</span><h3><Link href={`/es/slots/${game.slug}`}>{game.name}</Link></h3><p>{spanishFullDossiers[game.slug].feature}</p><div className="entity-game-actions"><Link className="text-link" href={`/es/slots/${game.slug}`}>Leer guía del juego ↗</Link><CompareButton slug={game.slug} name={game.name} locale="es" /></div></div>
  </article>)}</div>;
}
function FrequencyList({items,href,english=false}: {items:Frequency[];href?:(name:string)=>string;english?:boolean}) {
  return <ul className="entity-frequency">{items.map(({name,count})=><li key={name}>{href?<Link href={href(name)} lang={english?"en":undefined}>{spanishCatalogFact(name)}{english?" (en inglés)":""} <span aria-hidden="true">↗</span></Link>:<span>{spanishCatalogFact(name)}</span>}<small>{count} {count===1?"juego":"juegos"}</small></li>)}</ul>;
}
export function SpanishEntityStats({games,filter,mechanicName}: {games:Slot[];filter:{provider?:string;mechanic?:string};mechanicName?:string}) {
  const stats=catalogStats(games);
  const format=(value:number|null)=>value===null?"Sin dato confirmado":`${value.toFixed(2).replace(".",",")}%`;
  const range=stats.rtp.min===stats.rtp.max?format(stats.rtp.min):`${format(stats.rtp.min)}–${format(stats.rtp.max)}`;
  const href=(key:string,value:string)=>`/es/slots?${new URLSearchParams({...filter,[key]:value})}`;
  const others=stats.mechanics.filter(item=>item.name!==mechanicName);
  return <section id="catalog-profile" className="entity-statistics">
    <SectionTitle title="Juegos y características" />
    <div className="entity-statistics-lead"><p>Estas cifras describen las guías completas seleccionadas, no todos los títulos del catálogo ampliado ni toda la producción del proveedor.</p><dl className="entity-rtp"><div><dt>Intervalo del RTP orientativo</dt><dd>{range}</dd></div><div><dt>Juegos con RTP registrado</dt><dd>{stats.rtp.count} de {stats.count} {stats.count===1?"juego":"juegos"}</dd></div></dl></div>
    <div className="entity-distributions">
      <section><h3>{mechanicName?"Se combina con":"Mecánicas de pago y tablero"}</h3>{others.length?<FrequencyList items={others} href={name=>mechanicName?`/es/mechanics/${mechanics.find(m=>m.name===name)!.slug}`:href("mechanic",name)} />:<p className="data-note">No hay otras mecánicas registradas para estos juegos.</p>}<p className="data-note">Un juego puede combinar varias mecánicas.</p></section>
      <section><h3>Volatilidad</h3><FrequencyList items={stats.volatility} href={name=>href("volatility",name)} /><p className="data-note">La volatilidad describe la dispersión de los resultados; no predice el siguiente premio.</p></section>
      <section><h3>Funciones</h3><FrequencyList items={stats.features.slice(0,6)} href={name=>href("feature",name)} /><p className="data-note">Las cifras cuentan los juegos con una función, no la frecuencia con la que aparece el bonus.</p></section>
      <section><h3>{mechanicName?"Proveedores representados":"Geometría del tablero"}</h3>{mechanicName?<FrequencyList items={stats.providers} href={name=>`/es/providers/${providerSlug(name)}`} />:<FrequencyList items={stats.fields} />}<p className="data-note">{mechanicName?"Abre el perfil de un proveedor para comparar sus distintos enfoques.":"Algunos tableros cambian de tamaño durante la ronda."}</p></section>
    </div>
  </section>;
}
