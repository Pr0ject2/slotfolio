import Link from "next/link";
import styles from "./shell.module.css";

export function SpanishFooter() {
  return (
    <footer className={`footer ${styles.englishFooter}`} lang="es">
      <div className="footer-main">
        <div>
          <Link href="/es" className="brand">slotfolio<span className="brand-dot">.</span></Link>
          <p>Conoce las reglas.<br />Entiende los riesgos.</p>
        </div>
        <div>
          <span className="eyebrow">Leer</span>
          <Link href="/es">Inicio</Link>
          <Link href="/es/journal/understanding-rtp">Qué significa el RTP</Link>
          <Link href="/es/slots">Catálogo de juegos</Link>
          <Link href="/es/search">Buscar juegos</Link>
        </div>
        <div>
          <span className="eyebrow">Acerca de Slotfolio</span>
          <Link href="/es/about">Cómo usar Slotfolio</Link>
          <Link href="/es/editorial-policy">Criterios editoriales</Link>
          <Link href="/es/privacy">Privacidad</Link>
          <Link href="/es/disclosure">Enlaces de afiliación</Link>
        </div>
        <div className="footer-responsibility">
          <span className="age">18+</span>
          <p>El juego implica el riesgo de perder dinero. No lo consideres una fuente de ingresos.</p>
          <Link href="/es/responsible-gaming">Juego responsable ↗</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Slotfolio</span>
        <Link href="/es/privacy">Privacidad</Link>
        <Link href="/es/disclosure">Afiliación</Link>
      </div>
    </footer>
  );
}
