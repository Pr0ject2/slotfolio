import styles from "./slot-casino-link.module.css";

const copy = {
  ru: {
    heading: "Где поиграть в этот слот?",
    description: "Посмотрите список казино и проверьте наличие игры в вашем регионе.",
    action: "Выбрать казино ↗",
    disclosure: "Партнёрская ссылка · 18+",
  },
  en: {
    heading: "Where can you play this slot?",
    description: "Browse the casino list and check whether the game is available in your region.",
    action: "Choose a casino ↗",
    disclosure: "Affiliate link · 18+",
  },
} as const;

export function SlotCasinoLink({ locale = "ru" }: { locale?: "ru" | "en" }) {
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
      <p className={styles.disclosure}>{text.disclosure}</p>
    </aside>
  );
}
