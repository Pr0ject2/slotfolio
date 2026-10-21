import Link from "next/link";
import { SlotCasinoLink } from "./slot-casino-link";
import { SlotArtwork } from "./slot-artwork";
import { withBasePath } from "@/lib/base-path";
import { providerSlug } from "@/lib/data";
import { createCatalogModel } from "@/lib/catalog-index";
import { catalogSeeds, getCatalogSeed } from "@/lib/catalog-seeds";
import { getVerifiedCatalogResearch } from "@/lib/catalog-research-lookup";
import { getVerifiedCatalogDetails } from "@/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "@/lib/catalog-verified-game-type";
import { spanishCatalogFact } from "@/lib/spanish-catalog-facts";
import type { SpanishCatalogContent } from "@/lib/spanish-catalog-complete";
import { hasSpanishCatalogRecord } from "@/lib/spanish-catalog-record-routes";
import type { CatalogItem } from "@/lib/catalog-query";
import recordStyles from "@/app/en/slots/catalog/record.module.css";
import styles from "./english-catalog-profile.module.css";

const model = createCatalogModel();
function parseRtp(value?: string) {
  const match = value?.replace(",", ".").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}
const rtps = catalogSeeds.map(seed => parseRtp(getVerifiedCatalogDetails(seed.slug)?.rtp))
  .filter((value): value is number => value !== null).sort((a, b) => a - b);
const median = rtps.length ? rtps.length % 2 ? rtps[Math.floor(rtps.length / 2)]
  : (rtps[rtps.length / 2 - 1] + rtps[rtps.length / 2]) / 2 : null;

function volatilityNote(value?: string) {
  const text = value?.toLowerCase() ?? "";
  if (text.includes("экстрем") || text.includes("очень высок")) return "Una gran dispersión de los resultados: rondas de premios elevados pueden alternarse con largos periodos sin premios destacados.";
  if (text.includes("высок")) return "Una dispersión superior a la media: las rondas con premio suelen distribuirse de forma menos uniforme que en juegos de volatilidad media.";
  if (text.includes("низ")) return "Una dispersión inferior a la media: los resultados suelen distribuirse de forma más uniforme, aunque cada ronda sigue siendo impredecible.";
  if (text.includes("настра")) return "Existen varios perfiles de volatilidad; el comportamiento concreto depende de la configuración elegida por el operador.";
  return "Esta categoría orientativa describe la dispersión de los resultados a lo largo del tiempo, no la probabilidad de ganar en la próxima ronda.";
}
function itemHref(item: CatalogItem) {
  return item.coverage === "catalog" && hasSpanishCatalogRecord(item.slug) ? `/es/slots/catalog/${item.slug}` : item.coverage === "dossier" ? `/en/slots/${item.slug}` : `/en/slots/catalog/${item.slug}`;
}
function RelatedRows({ items }: { items: CatalogItem[] }) {
  return <div>{items.map((item, index) => <Link className="game-row" href={itemHref(item)} key={item.slug} aria-label={`${item.name}${hasSpanishCatalogRecord(item.slug) ? "" : " (en inglés)"}`}>
    <span className="row-index">{String(index + 1).padStart(2, "0")}</span>
    <div className="row-main"><h3>{item.name}</h3><p>{item.provider}{hasSpanishCatalogRecord(item.slug) ? "" : " · Ficha en inglés"}</p></div>
    <span className="row-arrow" aria-hidden="true">↗</span>
  </Link>)}</div>;
}

export function SpanishCatalogProfile({ item, copy }: { item: CatalogItem; copy: SpanishCatalogContent }) {
  const seed = getCatalogSeed(item.slug)!;
  const details = getVerifiedCatalogDetails(item.slug);
  const research = getVerifiedCatalogResearch(item.slug);
  const gameType = getVerifiedCatalogGameType(item.slug);
  const mechanics = research?.mechanics ?? [];
  const providerItems = model.items.filter(other => other.slug !== item.slug && other.provider === item.provider)
    .sort((a, b) => b.mechanics.length - a.mechanics.length || a.name.localeCompare(b.name, "ru")).slice(0, 6);
  const providerSlugs = new Set(providerItems.map(other => other.slug));
  const mechanicItems = mechanics.length ? model.items
    .filter(other => other.slug !== item.slug && !providerSlugs.has(other.slug) && other.mechanics.some(mechanic => mechanics.includes(mechanic)))
    .sort((a, b) => b.mechanics.filter(mechanic => mechanics.includes(mechanic)).length - a.mechanics.filter(mechanic => mechanics.includes(mechanic)).length || a.name.localeCompare(b.name, "ru"))
    .slice(0, 6) : [];
  const closest = [...mechanicItems, ...providerItems].filter((other, index, all) => all.findIndex(candidate => candidate.slug === other.slug) === index).slice(0, 3);
  const facts = [
    ["Proveedor", item.provider], ["Tipo de juego", spanishCatalogFact(item.gameType)], ["Tablero", spanishCatalogFact(item.field)],
    ["RTP", spanishCatalogFact(item.verifiedRtp)], ["Premio máximo", spanishCatalogFact(item.maxWin)],
    ["Volatilidad", spanishCatalogFact(item.verifiedVolatility)], ["Fecha de lanzamiento", item.releaseDate],
  ].filter(([, value]) => Boolean(value));
  const sources = new Map<string, string[]>();
  for (const [label, url] of [
    ["Entrada original del catálogo", seed.source], ["Mecánicas y funciones", research?.source],
    ["Parámetros numéricos", details?.source],
    ["Fecha de lanzamiento", details?.releaseDateSource ?? (details?.releaseDate ? details.source : undefined)],
    ["Tipo de juego", gameType?.source],
    ["Volatilidad", details?.volatilitySource ?? (details?.volatility ? details.source : undefined)],
  ]) if (url && label) sources.set(url, [...(sources.get(url) ?? []), label]);
  const rtp = parseRtp(details?.rtp);
  const relativeRtp = rtp !== null && median !== null ? rtp - median > 0.1 ? "Por encima de la mediana" : rtp - median < -0.1 ? "Por debajo de la mediana" : "En torno a la mediana" : null;
  const verified = [details?.field ? `tablero ${spanishCatalogFact(details.field)}` : null,
    details?.rtp ? `RTP ${spanishCatalogFact(details.rtp)}` : null,
    details?.volatility ? `volatilidad ${spanishCatalogFact(details.volatility)}` : null,
    details?.maxWin ? `premio máximo ${spanishCatalogFact(details.maxWin)}` : null,
    details?.releaseDate ? `fecha de lanzamiento ${details.releaseDate.split("-").reverse().join(".")}` : null,
  ].filter(Boolean);

  return <div className={`${recordStyles.record} ${styles.extended}`} lang="es">
    <nav aria-label="Ruta de navegación" className="breadcrumbs"><Link href="/es">Inicio</Link> / <Link href="/es/slots">Catálogo</Link> / <span aria-current="page">{item.name}</span></nav>
    <div className="slot-heading"><div><span className="eyebrow accent">Ficha del juego{details?.releaseDate ? ` / ${details.releaseDate.slice(0, 4)}` : ""}</span>
      <h1>{item.name}</h1><Link className="provider-link" href={`/es/slots?provider=${providerSlug(item.provider)}`}>{item.provider} ↗</Link></div>
      <Link className="compare-button" href="#catalog-comparison">Comparar juegos similares</Link>
    </div>
    <div className="slot-intro">
      <figure className="slot-figure"><SlotArtwork src={withBasePath(item.image)} alt={`Imagen de ${item.name}`} width={600} height={420} loading="lazy" /><figcaption>Imagen del juego · {item.provider} · {item.name}</figcaption></figure>
      <div className="slot-summary"><span className="eyebrow">Información del juego</span><p className="slot-deck">{copy.intro?.[0] ?? copy.editorial ?? copy.features[0]?.description}</p>
        <h2 className="catalog-facts-heading">Características del juego</h2>
        <SlotCasinoLink locale="es" />
        <dl className="facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          {mechanics.length > 0 && <div className="facts-wide"><dt>Mecánicas documentadas</dt><dd className="slot-tag-list">{mechanics.map(mechanic => <Link key={mechanic} href={`/es/slots?mechanic=${encodeURIComponent(mechanic)}`}>{spanishCatalogFact(mechanic)}</Link>)}</dd></div>}
        </dl>
        <p className="data-note">Solo se muestran parámetros documentados. Si el proveedor no publica un valor o una característica, Slotfolio no los deduce de otro juego.</p>
      </div>
    </div>
    <div className="article-layout slot-body">
      <nav className="article-toc" aria-label="En esta página"><span className="eyebrow">Contenido</span>
        <a href="#how-it-works">Cómo funciona el juego</a><a href="#functions">Funciones y bonos</a>
        {details && <a href="#math-profile">Parámetros principales</a>}<a href="#editorial">Claves del juego</a>
        <a href="#catalog-comparison">Contexto y comparación</a><a href="#facts">Datos y fuentes</a><a href="#faq">Preguntas sobre el juego</a>
        {(providerItems.length > 0 || mechanicItems.length > 0) && <a href="#related">Explorar juegos relacionados</a>}
        <Link href="/es/slots">Catálogo completo ↗</Link>
      </nav>
      <article className="prose">
        <section id="how-it-works"><h2>Cómo funciona el juego</h2>{(copy.intro ?? copy.features.slice(0, 2).map(feature => feature.description)).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>
        <section id="functions"><span className="eyebrow accent">Funciones y bonos</span><h2>Funciones principales</h2>
          <div className={`dossier-feature-grid ${styles.features}`}>{copy.features.map((feature, index) => <article className={`dossier-feature-card ${index === 0 ? "is-primary" : ""}`} key={index}><span>{String(index + 1).padStart(2, "0")}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
        </section>
        {details && <section id="math-profile"><span className="eyebrow accent">Parámetros documentados</span><h2>Parámetros principales</h2><div className={`dossier-metric-grid ${styles.metrics}`}>
          {details.rtp && <div><span>RTP del catálogo</span><strong>{spanishCatalogFact(details.rtp)}</strong><small>Configuración de referencia documentada</small></div>}
          {details.maxWin && <div><span>Premio máximo</span><strong>{spanishCatalogFact(details.maxWin)}</strong><small>Se muestra solo si el proveedor lo indica</small></div>}
          {details.volatility && <div><span>Volatilidad</span><strong>{spanishCatalogFact(details.volatility)}</strong><small>{volatilityNote(details.volatility)}</small></div>}
          {details.field && <div><span>Tablero</span><strong>{spanishCatalogFact(details.field)}</strong><small>{mechanics.map(spanishCatalogFact).join(" · ") || "Formato del tablero confirmado por la fuente"}</small></div>}
        </div><p className="data-note">Los valores no se estiman ni se toman de juegos similares. Si una cifra no aparece, la fuente primaria utilizada no la confirma.</p></section>}
        <section id="editorial"><span className="eyebrow accent">Claves del juego</span><h2>{item.name}: qué importa durante una ronda</h2><blockquote>{copy.editorial ?? copy.features[0]?.description}</blockquote>
          {(copy.intro?.[1] ?? copy.features[1]?.description) && <p>{copy.intro?.[1] ?? copy.features[1]?.description}</p>}
        </section>
        <section id="catalog-comparison"><span className="eyebrow accent">Contexto del catálogo</span><h2>Comparación con otros juegos</h2><div className={`dossier-context-grid ${styles.context}`}>
          {relativeRtp && <div><span>RTP frente a los juegos documentados</span><strong>{relativeRtp}</strong><small>Mediana de {rtps.length} juegos: aproximadamente {median!.toFixed(1).replace(".", ",")}%</small></div>}
          {details?.volatility && <div><span>Volatilidad</span><strong>{spanishCatalogFact(details.volatility)}</strong><small>{volatilityNote(details.volatility)}</small></div>}
          {closest.length > 0 && <div><span>Juegos de estructura similar</span><strong>{closest.map(other => other.name).join(" · ")}</strong><small>Seleccionados según las mecánicas documentadas y el proveedor</small></div>}
          <div><span>Proveedor</span><strong>{item.provider}</strong><small>Compara otros juegos del estudio para distinguir sus recursos habituales de las funciones propias de esta versión.</small></div>
        </div>{mechanics[0] ? <Link className="text-link" href={`/es/slots?mechanic=${encodeURIComponent(mechanics[0])}`}>Juegos con {spanishCatalogFact(mechanics[0])} ↗</Link> : <Link className="text-link" href={`/es/slots?provider=${providerSlug(item.provider)}`}>Todos los juegos de {item.provider} ↗</Link>}</section>
        <section id="facts"><h2>Datos y fuentes</h2><p>El RTP describe la proporción teórica de las apuestas que se devuelve a largo plazo. La volatilidad describe la dispersión de los resultados, pero no permite predecir la próxima ronda.</p>{[...sources].map(([url, labels]) => <p className="source-note" key={url}>{labels.join(" · ")}: <a href={url} target="_blank" rel="noopener noreferrer">{url === item.source ? "Abrir la fuente del proveedor registrada ↗" : `Abrir la referencia de ${new URL(url).hostname.replace(/^www\./, "")} ↗`}</a>.</p>)}
          <p><Link href={`/slots/catalog/${item.slug}`} hrefLang="ru">Leer la ficha original completa (en ruso) ↗</Link></p>
          <p className="data-note">El RTP y otros valores pueden variar según la configuración del juego y el operador. Consulta la tabla de pagos dentro del juego. Las cifras publicadas no permiten predecir una sesión.</p>
          <p><Link href="/es/editorial-policy">Criterios editoriales</Link> · <Link href="/es/responsible-gaming">Juego responsable</Link></p>
        </section>
        <section id="faq"><span className="eyebrow accent">Preguntas frecuentes</span><h2>Preguntas sobre el juego</h2>
          <details><summary>¿Cuál es la mecánica principal de {item.name}?</summary><p>{copy.features[0]?.description ?? copy.intro?.[0]}</p></details>
          <details><summary>¿Qué parámetros de {item.name} están documentados?</summary><p>{verified.length ? `La ficha documenta: ${verified.join(", ")}. Los valores ausentes no se deducen de otros juegos.` : "El material primario disponible no ofrece un perfil numérico completo, por lo que no se publican valores sin confirmar."}</p></details>
          <details><summary>¿Por qué puede ser distinto el RTP del operador?</summary><p>Un juego puede tener distintas configuraciones matemáticas. Antes de jugar, comprueba el RTP y las reglas de la versión concreta que ofrece el operador.</p></details>
        </section>
      </article>
    </div>
    {(providerItems.length > 0 || mechanicItems.length > 0) && <section id="related">
      {providerItems.length > 0 && <><div className="section-title"><h2>Más juegos de {item.provider}</h2><Link className="text-link" href={`/es/slots?provider=${providerSlug(item.provider)}`}>Todos los juegos de {item.provider} ↗</Link></div><RelatedRows items={providerItems} /></>}
      {mechanicItems.length > 0 && <><div className="section-title"><h2>Mecánicas similares</h2><Link className="text-link" href={`/es/slots?mechanic=${encodeURIComponent(mechanics[0])}`}>Abrir el filtro ↗</Link></div><RelatedRows items={mechanicItems} /></>}
    </section>}
  </div>;
}
