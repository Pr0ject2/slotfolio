import Link from "next/link";
import { SlotCasinoLink } from "./slot-casino-link";
import type { Slot } from "@/lib/data";
import { mechanics, providerSlug, relatedSlots, slotMechanics } from "@/lib/data";
import { SectionTitle } from "./editorial";
import { SlotArtwork } from "./slot-artwork";
import { withBasePath } from "@/lib/base-path";
import { JsonLd } from "./json-ld";
import { absoluteMediaUrl, absoluteUrl } from "@/lib/seo";
import { formatRtp } from "@/lib/catalog-stats";
import { catalogRtpContext, getVerifiedSlotMetrics, volatilityContext } from "@/lib/dossier";
import { getVerifiedSlotPassport } from "@/lib/slot-passport";
import { spanishCatalogFact } from "@/lib/spanish-catalog-facts";
import {
  spanishFullDossiers, spanishDossierFeatureCards, spanishMechanicExplanations,
  spanishMetricLabel, spanishReleaseDate, spanishRtpContext, spanishVolatilityContext,
} from "@/lib/spanish-full-dossiers";
import styles from "./english-full-dossier.module.css";

export function SpanishFullDossier({ game }: { game: Slot }) {
  const copy = spanishFullDossiers[game.slug];
  if (!copy) throw new Error(`Incomplete Spanish dossier: ${game.slug}`);
  const verified = getVerifiedSlotMetrics(game.slug);
  if (verified?.note && !copy.metricsNote) throw new Error(`Missing metric caveat: ${game.slug}`);
  const passport = getVerifiedSlotPassport(game.slug);
  const mechanicList = slotMechanics(game);
  const primaryMechanic = mechanics.find(item => item.name === mechanicList[0]);
  const cards = spanishDossierFeatureCards(game);
  const related = relatedSlots(game, 3);
  const rtpContext = catalogRtpContext(game);
  const volatilitySummary = spanishVolatilityContext(volatilityContext(game));
  const maximumLabel = spanishMetricLabel(verified?.maxWinLabel, "Máximo documentado");
  const observedLabel = spanishMetricLabel(verified?.observedWinLabel, "Premio observado");
  const isGates = game.slug === "gates-of-olympus";
  const references = [
    { url: game.source, label: isGates ? "Información del juego del proveedor" : "Información del proveedor / referencia principal" },
    ...(passport && passport.source !== game.source ? [{ url: passport.source, label: copy.passportSourceLabel ?? "Referencia de fecha de lanzamiento y tipo de juego" }] : []),
    ...(verified && verified.source !== game.source ? [{ url: verified.source, label: "Cifras documentadas adicionales / referencia principal" }] : []),
    ...(verified?.additionalSources ?? []).map((source, index) => ({ url: source.url, label: copy.additionalSourceLabels?.[index] ?? `Referencia adicional del proveedor ${index + 1}` })),
  ];
  return <div className={styles.dossier} lang="es">
    <JsonLd data={{
      "@context":"https://schema.org", "@type":"Article",
      headline:isGates ? "Gates of Olympus: cómo funcionan las cascadas y los multiplicadores" : `${game.name}: reglas, funciones y RTP explicados`, description:copy.description,
      url:absoluteUrl(`/es/slots/${game.slug}`), mainEntityOfPage:absoluteUrl(`/es/slots/${game.slug}`),
      image:[absoluteMediaUrl(game.featureImage || game.image)], inLanguage:"es",
      publisher:{"@type":"Organization",name:"Slotfolio",url:absoluteUrl("/es")}, about:{"@type":"VideoGame",name:game.name},
    }} />
    <nav aria-label="Ruta de navegación" className="breadcrumbs"><Link href="/es">Inicio</Link> / <Link href="/es/slots">Catálogo</Link> / <span aria-current="page">{game.name}</span></nav>
    <div className="slot-heading"><div><span className="eyebrow accent">Guía del juego / {game.year}</span><h1>{game.name}</h1>
      <p>{game.provider}{copy.attributionNote ? " · atribución registrada" : ""}</p>
      <Link className="text-link" href={`/es/providers/${providerSlug(game.provider)}`}>Perfil del proveedor ↗</Link>
    </div></div>
    <div className="slot-intro">
      <figure className="slot-figure"><SlotArtwork className="game-image" src={withBasePath(game.featureImage || game.image)} alt={`Imagen de ${game.name}`} width={900} height={560} loading="eager" fetchPriority="high" /><figcaption>Imagen del juego · {game.provider} · {game.name}</figcaption></figure>
      <div className="slot-summary"><span className="eyebrow">De un vistazo</span><p className="slot-deck">{copy.description}</p>
        {copy.attributionNote && <p className="data-note">{copy.attributionNote}</p>}
        <SlotCasinoLink locale="es" />
        <dl className="facts">
          <div><dt>{copy.attributionNote ? "Atribución registrada del proveedor" : "Proveedor"}</dt><dd>{game.provider}</dd></div>
          <div><dt>Año de lanzamiento</dt><dd>{game.year}</dd></div>
          <div><dt>Tablero</dt><dd>{spanishCatalogFact(game.field)}</dd></div>
          {passport && <><div><dt>Fecha de lanzamiento</dt><dd>{copy.releaseDate ?? spanishReleaseDate(passport.releaseDate)}</dd></div><div><dt>Tipo de juego</dt><dd>{spanishCatalogFact(passport.gameType)}</dd></div></>}
          <div><dt>RTP (orientativo)</dt><dd>{spanishCatalogFact(game.rtp)}</dd></div><div><dt>Volatilidad</dt><dd>{spanishCatalogFact(game.volatility)}</dd></div>
          {verified?.maxWin && <div><dt>{maximumLabel}</dt><dd>{spanishCatalogFact(verified.maxWin)}</dd></div>}
          {verified?.observedWin && <div><dt>{observedLabel}</dt><dd>{spanishCatalogFact(verified.observedWin)}</dd></div>}
          <div className="facts-wide"><dt>Funciones principales</dt><dd className="slot-tag-list">{game.tags.map(tag => <Link key={tag} href={`/es/slots?feature=${encodeURIComponent(tag)}`}>{spanishCatalogFact(tag)}</Link>)}</dd></div>
        </dl>
        <p className="data-note">El RTP puede variar entre versiones del juego. {verified?.rtpVariants && verified.rtpVariants.length > 1 ? `Configuraciones conocidas: ${verified.rtpVariants.map(spanishCatalogFact).join(" · ")}.` : "Comprueba el valor en las reglas del juego."}</p>
      </div>
    </div>
    <div className="article-layout slot-body">
      <aside className="article-toc" aria-label="En esta página"><span className="eyebrow">Contenido</span>
        <a href="#rules">Cómo se forman los premios</a><a href="#feature">{isGates ? "Multiplicadores y giros gratis" : "Función principal"}</a>
        <a href="#math-profile">RTP y otras cifras</a><a href="#perspective">Perspectiva editorial</a><a href="#catalog-context">Comparación de juegos</a>
        <a href="#source">{isGates ? "Fuentes y limitaciones" : "Fuentes y riesgos"}</a><a href="#faq">Preguntas sobre el juego</a><a href="#related">Juegos relacionados</a>
        <Link href={`/es/compare?seed=${game.slug}`}>Abrir comparación ↗</Link>
      </aside>
      <article className="prose">
        <section id="rules"><h2>Cómo se forman los premios</h2><p>{copy.feature} Esta función determina qué conviene seguir durante la ronda.</p>
          {mechanicList.map(name => <p key={name}>{spanishMechanicExplanations[name]}</p>)}
          <p>Abre la tabla de pagos antes de jugar. Explica las funciones de Wild y Scatter, las condiciones de activación y los límites de pago máximo de la versión concreta.</p>
          {primaryMechanic && <Link className="text-link" href={`/es/mechanics/${primaryMechanic.slug}`}>Más sobre {spanishCatalogFact(primaryMechanic.name).toLowerCase()} ↗</Link>}
        </section>
        <section id="feature"><span className="eyebrow accent">Funciones y bonus</span><h2>{isGates ? "Multiplicadores y giros gratis" : "Función principal"}</h2>
          <div className="dossier-feature-grid">{cards.map((card,index) => <article className={`dossier-feature-card ${card.kind === "primary" ? "is-primary" : ""}`} key={`${card.title}-${index}`}><span>{String(index+1).padStart(2,"0")}</span><h3>{card.title}</h3><p>{card.text}</p></article>)}</div>
        </section>
        <section id="math-profile"><span className="eyebrow accent">Cifras del juego</span><h2>{isGates ? "Qué indican el RTP y la volatilidad" : "RTP y otras cifras"}</h2>
          <div className="dossier-metric-grid">
            <div><span>RTP</span><strong>{spanishCatalogFact(game.rtp)}</strong><small>Comprueba la configuración activa en las reglas del juego</small></div>
            {verified?.rtpVariants && verified.rtpVariants.length > 1 && <div><span>Configuraciones de RTP</span><strong>{verified.rtpVariants.length}</strong><small>{verified.rtpVariants.map(spanishCatalogFact).join(" · ")}</small></div>}
            {verified?.maxWin && <div><span>{maximumLabel}</span><strong>{spanishCatalogFact(verified.maxWin)}</strong><small>En unidades de la apuesta</small></div>}
            {verified?.observedWin && <div><span>{observedLabel}</span><strong>{spanishCatalogFact(verified.observedWin)}</strong><small>No es necesariamente el premio máximo posible</small></div>}
            <div><span>Volatilidad</span><strong>{spanishCatalogFact(game.volatility)}</strong><small>{volatilitySummary}</small></div>
            <div><span>Tablero</span><strong>{spanishCatalogFact(game.field)}</strong><small>{mechanicList.map(spanishCatalogFact).join(" · ")}</small></div>
          </div>{copy.metricsNote && <p className="metric-caveat">{copy.metricsNote}</p>}
        </section>
        <section id="perspective"><span className="eyebrow accent">Perspectiva editorial</span><h2>Perspectiva editorial</h2><blockquote>{copy.note}</blockquote>
          <p>Describimos cómo se diferencia este juego de otros: su ritmo, reglas y funciones. No es una recomendación de apostar ni una valoración de tus probabilidades de ganar.</p>
        </section>
        <section id="catalog-context"><span className="eyebrow accent">Juegos relacionados</span><h2>Comparación de juegos</h2>
          <div className="dossier-context-grid">
            <div><span>RTP frente al catálogo</span><strong>{spanishRtpContext(rtpContext.label)}</strong><small>Mediana del RTP de {rtpContext.count} juegos: {spanishCatalogFact(formatRtp(rtpContext.median))}</small></div>
            <div><span>Volatilidad</span><strong>{spanishCatalogFact(game.volatility)}</strong><small>{volatilitySummary}</small></div>
            <div><span>Juegos de estructura similar</span><strong>{related.map(item=>item.name).join(" · ")}</strong><small>Juegos con reglas y funciones parecidas</small></div>
          </div><Link className="text-link" href={`/es/compare?seed=${game.slug}`}>Abrir tabla comparativa ↗</Link>
        </section>
        <section id="source"><h2>{isGates ? "Fuentes y limitaciones" : "Fuentes y riesgos"}</h2>
          <p>El RTP describe un retorno teórico sobre un gran número de apuestas. No indica cuánto se devolverá durante una sesión. La volatilidad describe la dispersión de los resultados, pero no permite predecir la próxima ronda.</p>
          <div className="margin-note"><strong>Comprueba primero la versión</strong><p>Un juego puede tener varias configuraciones de RTP. Busca la cifra exacta en las reglas de la versión que vayas a utilizar.</p></div>
          <p className="source-note">A continuación se muestran las referencias registradas para este juego. {passport ? "La fecha de lanzamiento y el tipo de juego se comprobaron en los materiales enlazados del proveedor. " : ""}{verified ? "Las cifras documentadas adicionales utilizan sus referencias correspondientes. " : ""}Las precisiones de las fuentes y los posibles conflictos se conservan en las cifras y notas editoriales anteriores.</p>
          <ul className="source-list">{references.map((reference,index)=><li key={`${reference.url}-${index}`}><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.label} ↗</a></li>)}</ul>
          <p>Puedes perder el dinero que apuestas. <Link href="/es/responsible-gaming">Información sobre juego responsable</Link> · <Link href="/es/editorial-policy">Criterios editoriales</Link></p>
        </section>
        <aside className="affiliate"><span className="eyebrow">Condiciones del operador · 18+</span><h3>De las reglas del juego a las condiciones del operador</h3><p>Antes de seguir un enlace a un operador, comprueba la disponibilidad en tu país, la versión del juego, los límites y las reglas de retirada.</p></aside>
        <section id="faq"><h2>Preguntas sobre el juego</h2>
          <details><summary>¿Se puede predecir el próximo resultado?</summary><p>No. Los resultados anteriores no permiten calcular el siguiente. Una racha de pérdidas no hace que un premio esté pendiente.</p></details>
          <details><summary>¿Por qué otro sitio muestra un RTP diferente?</summary><p>Un juego puede tener varias configuraciones matemáticas. A veces las fuentes también confunden el original con sus secuelas. Comprueba el título y el menú de ayuda de la versión que has abierto.</p></details>
          <details><summary>¿Qué conviene comparar antes de elegir?</summary><p>Las mecánicas de pago, las dimensiones del tablero, las funciones del bonus y la claridad de la interfaz. La <Link href={`/es/compare?seed=${game.slug}`}>tabla comparativa</Link> ayuda a ver las diferencias.</p></details>
        </section>
      </article>
    </div>
    <section id="related"><SectionTitle title="Sigue explorando" href="/es/slots" label="Volver al catálogo" />
      {related.map(item=>{const copy=spanishFullDossiers[item.slug];if(!copy)throw new Error(`Missing complete Spanish related guide: ${item.slug}`);const href=`/es/slots/${item.slug}`;return <article className={styles.relatedRow} key={item.slug}><div><span className="eyebrow">{item.provider} / {item.year}</span><h3><Link href={href}>{item.name}</Link></h3><p>{copy.description}</p></div><Link href={href} aria-label={`Abrir ${item.name}`}>↗</Link></article>;})}
    </section>
  </div>;
}
