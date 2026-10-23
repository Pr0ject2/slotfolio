import Link from "next/link";
import { ArticleJsonLd } from "@/components/article-json-ld";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { SectionTitle } from "@/components/editorial";
import { SlotArtwork } from "@/components/slot-artwork";
import { withBasePath } from "@/lib/base-path";
import { getSlot } from "@/lib/data";
import styles from "@/app/en/journal/how-cascades-work/article.module.css";
import reading from "@/app/journal/reading.module.css";
import { pageMetadata } from "@/lib/seo";
const path="/es/journal/how-cascades-work";
const title="Un giro, varios eventos: cómo funcionan las cascadas";
const description="Cómo los símbolos en cascada pueden prolongar una sola ronda pagada, por qué grupos y cascadas son distintos y qué dicen realmente las reglas del juego.";
export const metadata=pageMetadata({title,description,path,openGraphType:"article",noIndex:true});
export default function SpanishCascadesArticle(){const sweet=getSlot("sweet-bonanza"),reactoonz=getSlot("reactoonz");return <div className={`${styles.article} ${reading.reading}`}>
  <ArticleJsonLd title={title} description={description} path={path} datePublished="2026-09-07" locale="es" />
  <SpanishBreadcrumbs items={[{label:"Revista y guías",href:"/es/journal"},{label:"Cómo funcionan las cascadas"}]} />
  <header className="article-heading"><span className="eyebrow accent">Dentro de las mecánicas / Guía detallada</span><h1>Un giro —<br />varios eventos</h1><p className="deck">Los símbolos desaparecen, llegan otros y la ronda puede seguir en marcha. Esto es lo que ocurre dentro de una tragamonedas con cascadas.</p><div className="article-meta"><span>Equipo editorial de Slotfolio</span><span>7 de septiembre de 2026</span><span>9 minutos de lectura</span></div></header>
  <div className="article-hero"><p>Una combinación.<br />Una retirada.<br /><em>Otra comprobación.</em></p><div className="cascade-art" aria-label="Ilustración de la sustitución de símbolos después de una cascada">{[0,1,2].map(i=><div className="cascade-column" key={i}><span>◆</span><span className={i===1?"falling":""}>{i===1?"↓":"✦"}</span><span>◆</span></div>)}<small>UN GIRO PAGADO · VARIAS COMPROBACIONES</small></div></div>
  <div className="article-layout"><nav className="article-toc" aria-label="En esta página"><span className="eyebrow">En este artículo</span><a href="#one-spin">Dónde termina un giro</a><a href="#sequence">Una cadena paso a paso</a><a href="#different">Cascadas y grupos son distintos</a><a href="#multiplier">Qué cambia un multiplicador</a><a href="#rhythm">Ritmo y percepción</a><a href="#rules">Lee la tabla de pagos</a><a href="#conclusion">Qué sigue siendo aleatorio</a></nav>
    <article className="prose">
      <section id="one-spin"><p className="lead-paragraph">Un giro convencional parece sencillo: los rodillos se mueven, se detienen y el juego comprueba el resultado. Las cascadas añaden otra posibilidad: ¿y si una combinación premiada es solo el comienzo de la ronda?</p><h2>Dónde termina un giro</h2>
        <p>En un juego con cascadas, un premio puede iniciar otro evento. Los símbolos que formaron la combinación válida desaparecen. Otros los sustituyen y el juego vuelve a comprobar el tablero actualizado. Mientras aparezcan nuevos premios válidos según las reglas de ese juego, la cadena puede continuar.</p>
        <p>Sigue siendo un solo giro pagado de la base. Normalmente no vuelves a colocar una apuesta base ni a pulsar Girar entre sus cascadas individuales. Las funciones especiales, incluidas las compras de bonus cuando se ofrecen, tienen condiciones propias que deben leerse por separado.</p>
        <p>Un giro no es lo mismo que una animación. Varias caídas espectaculares no tienen por qué representar varias rondas cobradas por separado. Algunas interfaces muestran el premio acumulado paso a paso, por lo que la cifra puede cambiar mientras continúa la misma ronda.</p>
      </section>
      <section id="sequence"><h2>Una cadena paso a paso</h2>
        <p>Imagina un tablero hipotético. Aparecen suficientes símbolos iguales para cumplir la regla de pago y se calcula un premio. Se retiran esos símbolos ganadores, los restantes ocupan los huecos y llegan otros nuevos.</p>
        <p>Si el tablero actualizado cumple los requisitos de otro premio, el juego realiza otra cascada. Si no, termina la ronda pagada. El siguiente giro es una nueva ronda con su propia apuesta.</p>
        <p className={styles.tableHint}>Desplaza a la derecha para leer las tres columnas. Con el teclado: enfoca la tabla y utiliza las flechas.</p>
        <div className={`table-wrap ${styles.sequence}`} role="region" aria-label="Secuencia de cascadas con desplazamiento horizontal" tabIndex={0}><table><caption className="sr-only">Secuencia habitual dentro de una ronda con cascadas</caption><thead><tr><th>Etapa</th><th>Qué ocurre</th><th>Qué comprobar</th></tr></thead><tbody>
          <tr><td>Tablero inicial</td><td>El juego evalúa las posiciones de los símbolos</td><td>Sus reglas de combinaciones ganadoras</td></tr>
          <tr><td>Combinación</td><td>Una combinación válida paga</td><td>Premio individual o acumulado</td></tr>
          <tr><td>Renovación</td><td>Se retiran símbolos y se rellenan las posiciones</td><td>Si se conservan comodines o multiplicadores</td></tr>
          <tr><td>Nueva comprobación</td><td>La cadena continúa o termina</td><td>Condiciones que terminan la ronda</td></tr>
        </tbody></table></div>
        <p>La tabla explica el principio, no la implementación visual de todos los juegos. Algunos sustituyen los símbolos en su sitio o los mueven de otra manera, en vez de hacerlos caer desde arriba. La animación es secundaria frente a las reglas de pago reales.</p>
      </section>
      <section id="different"><h2>Las cascadas no son lo mismo que los grupos</h2>
        <p>Estos términos suelen aparecer juntos, pero responden a preguntas distintas. Una cascada explica qué ocurre <em>después</em> de un premio; un grupo define qué símbolos <em>forman</em> un premio.</p>
        <p>En <Link href="/es/slots/reactoonz">Reactoonz</Link> importan los grupos vecinos de criaturas iguales. En <Link href="/es/slots/sweet-bonanza">Sweet Bonanza</Link>, los símbolos iguales pueden contar en todo el tablero sin tocarse. Aun así, ambos juegos pueden renovar repetidamente sus símbolos después de premios válidos.</p>
        <blockquote>La regla para ganar y el método para renovar el tablero son dos capas separadas de un mismo juego.</blockquote>
        <p>Un juego puede combinar varias reglas de pago, sustitución y bonus. Llamarlo tragamonedas con cascadas no explica todo sobre las combinaciones que paga. La referencia es su propia tabla de pagos.</p>
        {sweet&&<figure className="article-figure"><SlotArtwork className="game-image" src={withBasePath(sweet.image)} alt="Imagen oficial del juego Sweet Bonanza" width={500} height={280} loading="lazy" /><figcaption>Sweet Bonanza utiliza cascadas y cuenta coincidencias en todo el tablero. Imagen oficial del juego de Pragmatic Play.</figcaption></figure>}
      </section>
      <section id="multiplier"><h2>Qué cambia un multiplicador</h2>
        <p>Una cascada no tiene por qué aumentar por sí sola un premio. Para eso, el juego necesita una regla de multiplicador independiente. Un multiplicador puede crecer durante una ronda pagada, aplicarse solo dentro de un bonus o conservarse entre giros gratis. Son mecánicas distintas.</p>
        <p>En <Link href="/es/slots/gates-of-olympus">Gates of Olympus</Link>, los multiplicadores tienen un papel especialmente importante durante los giros gratis: sus valores pueden acumularse en el bonus. Eso cambia qué parte de la cadena importa, más allá del premio de una sola combinación.</p>
        <div className="margin-note"><strong>Tres preguntas sobre un multiplicador</strong><p>¿A qué se aplica? ¿Cuándo puede cambiar su valor? ¿Qué lo reinicia? Las respuestas están en las reglas concretas de ese juego, no en la palabra cascada.</p></div>
        <p>No traslades una regla de multiplicadores conocida desde otro juego. Una marca parecida o el mismo tamaño de tablero no demuestran que los multiplicadores funcionen igual.</p>
      </section>
      <section id="rhythm"><h2>Por qué las cascadas pueden sentirse diferentes</h2>
        <p>Un giro convencional tiene una pausa clara entre tu acción y su resultado. Una ronda con cascadas retrasa ese punto de cierre: cada tablero nuevo deja abierta la posibilidad de otro evento válido. El resultado es un ritmo distinto, una pequeña secuencia dentro de un giro.</p>
        <p>La animación, el sonido y el aumento del premio mostrado facilitan seguir la secuencia. También pueden hacer que un premio pequeño parezca más importante. La intensidad de la presentación no debe confundirse con el cambio neto de tu saldo.</p>
        <p>Una celebración larga de un premio no demuestra que el importe haya superado la apuesta de la ronda. Compara las cifras finales, no solo el color, el sonido o la duración de los efectos.</p>
      </section>
      <section id="rules"><h2>Cómo leer las reglas de un juego con cascadas</h2>
        <p>Empieza por encontrar el requisito mínimo de pago: ¿cuántos símbolos iguales hacen falta y dónde deben aparecer? Comprueba después qué símbolos desaparecen al ganar. Los comodines, scatters y símbolos especiales pueden comportarse de forma distinta a los normales.</p>
        <p>Revisa después el activador del bonus. ¿Los scatters cuentan solo en el tablero inicial o durante toda la secuencia? ¿Pueden permanecer entre cascadas? No es posible reconstruir con fiabilidad esos detalles solo a partir de la animación.</p>
        <p>Por último, lee los límites de premio máximo y el ajuste de RTP de la versión concreta del juego. Si el resumen del operador y la ayuda interna discrepan, confirma la configuración. El catálogo de Slotfolio es un punto de partida, no un sustituto de las reglas oficiales.</p>
      </section>
      <section id="conclusion"><h2>Qué sigue siendo aleatorio</h2>
        <p>Las cascadas añaden complejidad a la estructura de una ronda pagada, pero no revelan el siguiente resultado. Una cadena larga en una ronda anterior no promete otra. Una cadena corta no deja una deuda que el juego deba devolver.</p>
        <p>El RTP es una medida teórica a largo plazo, no una promesa sobre una sesión concreta. Consulta <Link href="/es/journal/understanding-rtp">nuestra explicación del RTP</Link> y la <a href="https://www.gamblingcommission.gov.uk/public-and-players/guide/return-to-player-how-much-gaming-machines-payout" target="_blank" rel="noopener noreferrer">guía de la Gambling Commission</a>.</p>
        <p>Entender las mecánicas significa poder explicar por qué apareció un premio, cómo cambió el tablero y cuándo terminó la ronda. Eso puede facilitar la interpretación de un juego, pero no convierte resultados aleatorios en un pronóstico.</p>
        <p className="source-note">Las descripciones de las funciones se contrastaron con las páginas de los proveedores de <a href="https://www.pragmaticplay.com/en/games/sweet-bonanza/" target="_blank" rel="noopener noreferrer">Sweet Bonanza</a>, <a href="https://www.pragmaticplay.com/en/games/gates-of-olympus/" target="_blank" rel="noopener noreferrer">Gates of Olympus</a> y <a href="https://www.playngo.com/games/reactoonz" target="_blank" rel="noopener noreferrer">Reactoonz</a>. Artículo editorial de Slotfolio.</p>
      </section>
    </article>
  </div>
  <SectionTitle title="Explora las diferencias" href="/en/collections/beyond-lines" label="Ver tres ejemplos de juegos (en inglés)" />
  <div className="hub-list">{[sweet,reactoonz].flatMap(slot=>slot?[slot]:[]).map(slot=><Link href={`/es/slots/${slot.slug}`} key={slot.slug}><span className="number">Juego</span><h2>{slot.name}</h2><p>{slot.provider} · Lee la guía del juego y las referencias verificadas</p><b aria-hidden="true">↗</b></Link>)}</div>
</div>;}
