import Link from "next/link";
import type { Slot } from "@/lib/data";
import type { SiteLocale } from "@/lib/locales";
import { gameReadingNotes } from "@/lib/game-reading-notes";
import { editorialComparisons } from "@/lib/editorial-comparisons";
import styles from "./slot-reading-note.module.css";

export function SlotReadingNote({ game, locale }: { game: Slot; locale: SiteLocale }) {
  const note = gameReadingNotes[game.slug];
  const comparisons = editorialComparisons.filter(item => item.games.includes(game.slug));
  if (!note && !comparisons.length) return null;
  const prefix = locale === "ru" ? "" : `/${locale}`;
  const labels = {
    ru: { check: "Проверьте в справке", guide: "Как читать это правило", source: "Источники досье", comparisons: "Сравнить правила" },
    en: { check: "Check the help menu", guide: "How to read this rule", source: "Guide sources", comparisons: "Compare the rules" },
    es: { check: "Comprueba la ayuda", guide: "Cómo leer esta regla", source: "Fuentes de la guía", comparisons: "Compara las reglas" },
  }[locale];
  const copy = note?.copy[locale];
  return <section id="reading-note" className={styles.note} data-reading-note={game.slug}>
    {copy && <><h2>{copy.question}</h2><p>{copy.answer}</p><p className={styles.check}><strong>{labels.check}.</strong> {copy.check}</p>
      <p className={styles.links}><Link href={`${prefix}/journal/${note.guide}`}>{labels.guide} ↗</Link><a href="#source">{labels.source}</a></p></>}
    {comparisons.length > 0 && <div className={styles.comparisons}><h3>{labels.comparisons}</h3><ul>{comparisons.map(item => <li key={item.slug}><Link href={`${prefix}/comparisons/${item.slug}`}>{item.copy[locale].title} ↗</Link></li>)}</ul></div>}
  </section>;
}
