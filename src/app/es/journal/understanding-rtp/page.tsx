import Link from "next/link";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import reading from "@/app/journal/reading.module.css";

export const metadata = pageMetadata({
  title: "Qué significa el RTP en las tragamonedas",
  description: "Qué mide el retorno al jugador, por qué un RTP del 96 % no garantiza el resultado de una sesión y dónde comprobar la configuración de tu juego.",
  path: "/es/journal/understanding-rtp",
  openGraphType: "article",
});

export default function SpanishRtpGuide() {
  return (
    <div className={reading.reading}>
      <SpanishBreadcrumbs items={[{ label: "Qué significa el RTP" }]} />
      <header className="article-heading">
        <span className="eyebrow accent">Explicación / RTP y volatilidad</span>
        <h1>Un RTP del 96 % no garantiza<br />recuperar el 96 %</h1>
        <p className="deck">Qué describe este porcentaje, qué no puede predecir y por qué importan las reglas y la configuración de la versión que estás jugando.</p>
        <div className="article-meta"><span>Redacción de Slotfolio</span><span>4 minutos de lectura</span></div>
      </header>
      <div className="article-layout">
        <nav className="article-toc" aria-label="En esta página">
          <span className="eyebrow">En esta página</span>
          <a href="#meaning">El promedio a largo plazo</a>
          <a href="#session">Una sesión concreta</a>
          <a href="#version">Versiones y configuraciones</a>
        </nav>
        <article className="prose">
          <section id="meaning">
            <h2>Un promedio teórico a largo plazo</h2>
            <p>El retorno al jugador, o RTP, describe la proporción teórica del total apostado que vuelve en forma de premios tras una cantidad muy grande de jugadas. Es una propiedad del modelo matemático del juego, no una promesa para una persona concreta.</p>
            <p>Un RTP del 96 % representa, en el modelo, un retorno de 96 unidades por cada 100 unidades apostadas a lo largo de muchísimas jugadas. Se calcula sobre el valor total de las apuestas, incluidas las cantidades que se vuelven a apostar después de ganar, y no solo sobre el dinero ingresado al principio.</p>
          </section>
          <section id="session">
            <h2>Tu sesión puede ser muy distinta</h2>
            <p>Los resultados a corto plazo pueden alejarse mucho de ese promedio. Puedes perder todo el presupuesto reservado o terminar con una ganancia. El porcentaje de RTP no permite saber cuál será el próximo resultado.</p>
            <blockquote>Las pérdidas anteriores no hacen que el juego te deba un premio.</blockquote>
            <p>La volatilidad describe cuánto pueden variar los resultados. Dos juegos con un RTP parecido pueden repartir premios de forma muy distinta: uno puede ofrecer premios pequeños con mayor frecuencia y otro tener un reparto más irregular. Ninguno de esos patrones predice la siguiente tirada.</p>
          </section>
          <section id="version">
            <h2>Comprueba la configuración que estás jugando</h2>
            <p>Un mismo título puede tener varias configuraciones de RTP. El porcentaje mostrado en un catálogo puede no coincidir con la versión que utiliza el casino. Consulta la información de esa versión concreta.</p>
            <div className="margin-note">
              <strong>Dónde buscar</strong>
              <p>Abre la ayuda, la tabla de pagos o el menú de información del juego. Si no aparece el porcentaje, considéralo desconocido en lugar de adivinarlo.</p>
            </div>
            <p>El RTP no elimina el riesgo de perder dinero.</p>
            <Link className="text-link" href="/es/responsible-gaming">Juego responsable y ayuda ↗</Link>
          </section>
        </article>
      </div>
    </div>
  );
}
