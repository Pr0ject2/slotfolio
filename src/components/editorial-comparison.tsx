import Link from "next/link";
import { getSlot } from "@/lib/data";
import type { SiteLocale } from "@/lib/locales";
import { editorialComparisons, type EditorialComparison } from "@/lib/editorial-comparisons";
import { Breadcrumbs } from "./editorial";
import { SlotArtwork } from "./slot-artwork";
import { withBasePath } from "@/lib/base-path";
import { EnglishBreadcrumbs } from "./english-breadcrumbs";
import { SpanishBreadcrumbs } from "./spanish-breadcrumbs";
import { ArticleJsonLd } from "./article-json-ld";
import styles from "./editorial-comparison.module.css";

export const comparisonLabels = {
  ru: { index: "Сравнения слотов", intro: "Сравнивайте конкретные правила: как образуется выплата, что сохраняется между каскадами и как действует бонус. У каждого сравнения есть ссылки на досье и первоисточники.", byline: "Редакция Slotfolio", rule: "Правило", check: "Как проверить различия", sources: "Источники и границы сравнения", limitation: "Сравнение относится к указанным играм. Конфигурацию RTP и доступность функций сверяйте в справке запущенной версии. Большее поле или множитель не гарантируют лучший результат.", read: "Открыть досье", guide: "Как сравнивать игры", more: "Другие сравнения" },
  en: { index: "Slot comparisons", intro: "Compare specific rules: how a payout forms, what survives a tumble and how the bonus works. Each comparison links to complete game guides and primary sources.", byline: "Slotfolio editorial team", rule: "Rule", check: "How to check the differences", sources: "Sources and scope", limitation: "This comparison covers the named games. Check RTP configuration and feature availability in the opened version's help menu. A larger grid or multiplier does not guarantee a better result.", read: "Read the game guide", guide: "How to compare games", more: "More comparisons" },
  es: { index: "Comparativas de tragamonedas", intro: "Compara reglas concretas: cómo se forma un premio, qué permanece entre cascadas y cómo funciona el bonus. Cada comparativa enlaza a guías completas y fuentes primarias.", byline: "Equipo editorial de Slotfolio", rule: "Regla", check: "Cómo comprobar las diferencias", sources: "Fuentes y alcance", limitation: "Se comparan los juegos indicados. Comprueba la configuración de RTP y la disponibilidad de funciones en la ayuda de la versión abierta. Un tablero o multiplicador mayor no garantiza un resultado mejor.", read: "Leer la guía del juego", guide: "Cómo comparar juegos", more: "Más comparativas" },
};
function Crumbs({ locale, title }: { locale: SiteLocale; title?: string }) {
  const prefix = locale === "ru" ? "" : `/${locale}`, labels = comparisonLabels[locale];
  const items = title ? [{ label: labels.index, href: `${prefix}/comparisons` }, { label: title }] : [{ label: labels.index }];
  return locale === "ru" ? <Breadcrumbs items={items} /> : locale === "en" ? <EnglishBreadcrumbs items={items} /> : <SpanishBreadcrumbs items={items} />;
}
export function ComparisonLinks({ locale, heading = true }: { locale: SiteLocale; heading?: boolean }) {
  const prefix = locale === "ru" ? "" : `/${locale}`;
  return <section className={styles.list} data-editorial-comparisons aria-label={comparisonLabels[locale].index}>{heading && <h2><Link href={`${prefix}/comparisons`}>{comparisonLabels[locale].index}</Link></h2>}
    {editorialComparisons.map(item => <article key={item.slug}><h3><Link href={`${prefix}/comparisons/${item.slug}`}>{item.copy[locale].title}</Link></h3><p>{item.copy[locale].description}</p></article>)}
  </section>;
}
export function ComparisonIndex({ locale }: { locale: SiteLocale }) {
  const copy = comparisonLabels[locale];
  return <div className={styles.page}><Crumbs locale={locale} /><header className={styles.heading}><h1>{copy.index}</h1><p>{copy.intro}</p></header><ComparisonLinks locale={locale} heading={false} /></div>;
}
export function EditorialComparisonPage({ comparison, locale }: { comparison: EditorialComparison; locale: SiteLocale }) {
  const copy = comparison.copy[locale], labels = comparisonLabels[locale], prefix = locale === "ru" ? "" : `/${locale}`;
  const games = comparison.games.map(slug => { const game = getSlot(slug); if (!game) throw Error(`Missing comparison game: ${slug}`); return game; });
  return <div className={styles.page} data-editorial-comparison={comparison.slug}>
    <ArticleJsonLd title={copy.title} description={copy.description} path={`${prefix}/comparisons/${comparison.slug}`} locale={locale} />
    <Crumbs locale={locale} title={copy.title} /><header className={styles.heading}><h1>{copy.title}</h1><p>{copy.description}</p><p className={styles.byline}><Link href={`${prefix}/about`}>{labels.byline}</Link></p></header>
    <div className={styles.games}>{games.map(game => <figure key={game.slug}><Link href={`${prefix}/slots/${game.slug}`}><SlotArtwork src={withBasePath(game.image)} alt={game.name} width={500} height={280} loading="lazy" decoding="async" /></Link><figcaption><Link href={`${prefix}/slots/${game.slug}`}>{game.name} — {labels.read} ↗</Link></figcaption></figure>)}</div>
    <article className={styles.body}><h2>{copy.question}</h2>
      <table className={styles.table} role="table"><caption>{copy.title}</caption><thead><tr><th scope="col">{labels.rule}</th>{games.map(game => <th scope="col" key={game.slug}>{game.name}</th>)}</tr></thead><tbody>{copy.rows.map(([label, first, second]) => <tr key={label}><th scope="row">{label}</th><td data-game={games[0].name}>{first}</td><td data-game={games[1].name}>{second}</td></tr>)}</tbody></table>
      <p>{copy.takeaway}</p><section><h2>{labels.check}</h2><ol>{copy.checks.map(check => <li key={check}>{check}</li>)}</ol><p><Link href={`${prefix}/journal/comparing-games`}>{labels.guide} ↗</Link></p></section>
      <section id="sources"><h2>{labels.sources}</h2><ul>{comparison.sources.map((source, index) => <li key={source}><a href={source} target="_blank" rel="noopener noreferrer">{games[index].provider}: {games[index].name} ↗</a></li>)}</ul><p>{labels.limitation}</p></section>
    </article><nav className={styles.more} aria-label={labels.more}><Link href={`${prefix}/comparisons`}>{labels.more} ↗</Link>{editorialComparisons.filter(item => item.slug !== comparison.slug).map(item => <Link key={item.slug} href={`${prefix}/comparisons/${item.slug}`}>{item.copy[locale].title}</Link>)}</nav>
  </div>;
}
