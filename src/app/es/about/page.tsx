import Link from "next/link";
import { SpanishBreadcrumbs } from "@/components/spanish-breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/information-page.module.css";

export const metadata = pageMetadata({
  title: "Cómo usar Slotfolio",
  description: "Encuentra un juego, compara sus mecánicas y aprende qué significan el RTP y las cifras del catálogo, con sus limitaciones.",
  path: "/es/about",
});

export default function SpanishAbout() {
  return (
    <div className={styles.page}>
      <SpanishBreadcrumbs items={[{ label: "Acerca de Slotfolio" }]} />
      <header className="simple-heading">
        <span className="eyebrow accent">Acerca de Slotfolio</span>
        <h1 className="about-statement">Cómo usar Slotfolio</h1>
        <p>Encuentra un juego, entiende sus reglas y compara sus características. Aquí explicamos por dónde empezar y qué pueden decirte las cifras disponibles.</p>
      </header>
      <div className="article-layout">
        <nav className="article-toc" aria-label="En esta página">
          <span className="eyebrow">En esta página</span>
          <a href="#find">Encontrar un juego</a>
          <a href="#compare">Comparar juegos</a>
          <a href="#verify">Comprobar las cifras</a>
          <a href="#limits">Conocer las limitaciones</a>
          <a href="#links">Visitar otros sitios</a>
        </nav>
        <article className="prose">
          <section id="find">
            <h2>Encontrar un juego</h2>
            <p>Slotfolio reúne 1000 juegos de tragamonedas. Busca por nombre o elige un desarrollador. Si no conoces el título, los filtros de mecánicas y funciones permiten acotar la búsqueda.</p>
            <p>Fíjate en cómo se forman los premios: en líneas de pago, en rodillos consecutivos o en grupos de símbolos. Después, comprueba cómo se activa el bono y qué cambia durante esa función.</p>
            <p><Link href="/es/slots">Abrir el catálogo</Link></p>
          </section>
          <section id="compare">
            <h2>Comparar juegos</h2>
            <p>Utiliza los botones de comparación para añadir dos juegos a la tabla. Los juegos que no tienen ese botón se pueden consultar por separado.</p>
            <p>Compara las reglas de pago, las funciones y las configuraciones de RTP. Los estudios pueden utilizar escalas distintas de volatilidad. Un premio máximo publicado tampoco indica con qué frecuencia se alcanza.</p>
            <p><Link href="/es/compare">Abrir la comparación</Link></p>
          </section>
          <section id="verify">
            <h2>Comprobar las cifras del juego</h2>
            <p>Consulta la ayuda o las reglas del propio juego para comprobar la versión que ofrece el operador. Un RTP publicado del 96 % no garantiza que todos los casinos utilicen esa configuración.</p>
            <p>Cuando falta información fiable, es preferible dejar un dato sin confirmar que adivinarlo.</p>
            <p><Link href="/es/journal/understanding-rtp">Qué significa el RTP</Link> · <Link href="/es/editorial-policy">Criterios editoriales</Link></p>
          </section>
          <section id="limits">
            <h2>Qué no puede decirte el catálogo</h2>
            <p>Los juegos no prometen premios. Las cifras del catálogo no predicen la siguiente tirada ni demuestran la fiabilidad de un casino, cuánto tardará una retirada o si un juego está disponible en tu país.</p>
            <p>Slotfolio no acepta apuestas ni administra cuentas de juego. Los problemas con pagos o cuentas deben tratarse con el operador.</p>
            <p><Link href="/es/responsible-gaming">Juego responsable y ayuda</Link></p>
          </section>
          <section id="links">
            <h2>Visitar otros sitios</h2>
            <p>Las reglas del proveedor sirven para verificar los datos, pero cada sitio tiene sus propias condiciones. Antes de abrir una cuenta, comprueba el dominio del operador, su licencia y las restricciones de tu país.</p>
            <p><Link href="/es/privacy">Privacidad y datos del navegador</Link></p>
          </section>
        </article>
      </div>
    </div>
  );
}
