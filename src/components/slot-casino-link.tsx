import styles from "./slot-casino-link.module.css";
import { PromoCodeCopy } from "./promo-code-copy";

const copy = {
  ru: {
    heading: "Где поиграть в этот слот?",
    description: "Проверьте наличие игры в вашем регионе и условия дополнительных бонусов по ссылке.",
    action: "Выбрать казино ↗",
  },
  en: {
    heading: "Where can you play this slot?",
    description: "Check game availability in your region and the terms of additional bonuses via the link.",
    action: "Choose a casino ↗",
  },
  es: {
    heading: "¿Dónde jugar a esta tragamonedas?",
    description: "Comprueba la disponibilidad del juego en tu región y las condiciones de los bonos adicionales en el enlace.",
    action: "Elegir casino ↗",
  },
} as const;

export function SlotCasinoLink({ locale = "ru" }: { locale?: "ru" | "en" | "es" }) {
  const text = copy[locale];
  return (
    <aside className={styles.block} data-slot-casino-link={locale} aria-label={text.heading}>
      <div className={styles.content}>
        <h2 className={styles.heading}>{text.heading}</h2>
        <p className={styles.description}>{text.description}</p>
      </div>
      <a className={styles.action} href="https://viazento.link/slotfolio" target="_blank" rel="sponsored nofollow noopener noreferrer">
        {text.action}
      </a>
      <PromoCodeCopy locale={locale} />
    </aside>
  );
}
