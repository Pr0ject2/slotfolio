import Link from "next/link";
import { getSlot } from "@/lib/data";
import { SlotArtwork } from "@/components/slot-artwork";
import { withBasePath } from "@/lib/base-path";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Slotfolio | Reglas, mecánicas y RTP de las tragamonedas",
  description: "Entiende cómo funcionan las tragamonedas: reglas de pago, bonos, RTP y volatilidad, con explicaciones claras y pautas de juego responsable.",
  path: "/es",
  absoluteTitle: true,
});

export default function SpanishHome() {
  const featured = getSlot("gates-of-olympus")!;
  const secondary = getSlot("reactoonz")!;
  return (
    <>
      <div className="edition-line">
        <span><i /> EN PORTADA</span><span>Reglas, funciones y contexto</span><span>18+ · Conoce los riesgos</span>
      </div>
      <section className="front-lead">
        <article className="cover-story">
          <Link href={`/en/slots/${featured.slug}`} hrefLang="en" className="cover-art" aria-label="Guía de Gates of Olympus (en inglés)">
            <SlotArtwork className="game-image" src={withBasePath(featured.featureImage || featured.image)} alt="Imagen del juego Gates of Olympus" width={500} height={280} loading="eager" decoding="async" />
            <span className="image-caption">GUÍA DEL JUEGO (EN INGLÉS) ↗</span>
          </Link>
          <div className="cover-copy">
            <span className="eyebrow accent">Reglas del juego / Pragmatic Play</span>
            <h1><Link href={`/en/slots/${featured.slug}`} hrefLang="en" aria-label="Gates of Olympus (en inglés)">Gates of Olympus</Link></h1>
            <p>Las cascadas y los multiplicadores pueden convertir una sola tirada en una secuencia de eventos. Explicamos sus reglas, sin pretender predecir el resultado de la próxima tirada.</p>
            <Link className="text-link" href={`/en/slots/${featured.slug}`} hrefLang="en">Leer la guía (en inglés) ↗</Link>
          </div>
        </article>
        <aside className="front-aside">
          <article className="side-story">
            <Link href={`/en/slots/${secondary.slug}`} hrefLang="en" aria-label="Guía de Reactoonz (en inglés)">
              <SlotArtwork className="game-image" src={withBasePath(secondary.image)} alt="Imagen del juego Reactoonz" width={500} height={280} loading="lazy" decoding="async" />
            </Link>
            <span className="eyebrow accent">Otra forma de formar premios</span>
            <h2><Link href={`/en/slots/${secondary.slug}`} hrefLang="en" aria-label="Reactoonz: más allá de las líneas (en inglés)">Reactoonz: más allá de las líneas</Link></h2>
            <p>Reactoonz paga por grupos de símbolos vecinos, en lugar de combinaciones sobre líneas de pago tradicionales. Esta diferencia cambia la forma de leer el tablero.</p>
            <Link className="text-link" href={`/en/slots/${secondary.slug}`} hrefLang="en">Leer la guía (en inglés) ↗</Link>
          </article>
          <div className="reading-note">
            <span className="eyebrow">Antes de jugar</span>
            <h3><Link href="/es/journal/understanding-rtp">Un RTP del 96 % no significa que recuperarás el 96 % de tu dinero</Link></h3>
            <Link className="text-link" href="/es/journal/understanding-rtp">Entender el RTP ↗</Link>
          </div>
        </aside>
      </section>
      <section className="catalog-preview">
        <div className="section-title"><h2>Empieza por las reglas</h2><Link href="/es/about" className="text-link">Acerca de Slotfolio ↗</Link></div>
        <div className="catalog-preview-layout">
          <div className="catalog-intro">
            <span className="eyebrow accent">Cómo interpretar un juego</span>
            <p className="serif">Cada juego tiene<br />sus propias reglas.<br /><em>Conócelas primero.</em></p>
            <p>Explora las mecánicas, compara los datos verificados y descubre qué no dicen las cifras sobre una sesión concreta.</p>
          </div>
          <div className="prose">
            <section><h2><Link href="/es/journal/understanding-rtp">¿Qué significa el RTP?</Link></h2><p>Es un promedio teórico calculado sobre muchas apuestas. No permite saber qué ocurrirá en tu sesión.</p></section>
            <section><h2><Link href="/es/editorial-policy">Cómo verificamos la información</Link></h2><p>Distinguimos las reglas comprobadas de nuestras explicaciones. Si una cifra no se puede verificar, la dejamos sin confirmar.</p></section>
            <section><h2><Link href="/es/responsible-gaming">Juego responsable</Link></h2><p>El juego puede causar pérdidas y problemas económicos. Conoce los límites y las opciones de apoyo.</p></section>
          </div>
        </div>
      </section>
      <div className="editorial-signoff">
        <span className="brand-small">s.</span><p>Consulta las reglas antes de jugar.<br /><span>Busca por título, proveedor o mecánica.</span></p>
        <Link href="/en/slots" hrefLang="en">Ver el catálogo (en inglés) ↗</Link>
      </div>
    </>
  );
}
