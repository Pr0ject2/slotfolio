import Link from "next/link";
import { ArticleJsonLd } from "@/components/article-json-ld";
import { Breadcrumbs, GameImage, Affiliate } from "@/components/editorial";
import { CompareButton } from "@/components/compare-button";
import { getSlot, slotMechanics } from "@/lib/data";
import { gameCollections, type GameCollection } from "@/lib/collections";
import styles from "@/app/collections/collections.module.css";

export function GameCollectionPage({ collection }: { collection: GameCollection }) {
  return <div className={styles.page}>
    <ArticleJsonLd title={collection.title} description={collection.introduction} path={`/collections/${collection.slug}`} />
    <Breadcrumbs items={[{ label: "Подборки", href: "/collections" }, { label: collection.title }]} />
    <header className={`collection-heading ${styles.intro}`}>
      <span className="eyebrow accent">Подборка / {collection.games.length} игры</span>
      <h1>{collection.title}</h1>
      <p>{collection.introduction}</p>
    </header>
    <section aria-labelledby="selection-heading" className={styles.note}>
      <h2 id="selection-heading">Почему эти игры</h2>
      <p>{collection.selection}</p>
    </section>
    {collection.games.map((entry, index) => {
      const slot = getSlot(entry.slug)!;
      return <article className={`collection-entry${slot.slug === "sweet-bonanza" ? " collection-entry--sweet-bonanza" : ""}`} key={entry.slug}>
        <span className="number">{String(index + 1).padStart(2, "0")}</span>
        <Link href={`/slots/${slot.slug}`}><GameImage slot={slot} /></Link>
        <div>
          <span className="eyebrow accent">{slotMechanics(slot).join(" · ")} / {slot.provider}</span>
          <h2><Link href={`/slots/${slot.slug}`}>{slot.name}</Link></h2>
          <p>{entry.note}</p>
          <p><strong>Что проверить:</strong> {entry.check}</p>
          <Link className="text-link" href={`/slots/${slot.slug}`}>Досье игры ↗</Link>
          <CompareButton slug={slot.slug} name={slot.name} />
        </div>
      </article>;
    })}
    <section className={styles.note} aria-labelledby="compare-heading">
      <h2 id="compare-heading">Что полезно сравнить</h2>
      <ul className={styles.checklist}>{collection.checklist.map(item => <li key={item}>{item}</li>)}</ul>
      <p>Добавьте две игры кнопками «Сравнить» и откройте <Link href="/compare">таблицу характеристик</Link>. Подробные условия функций сверяйте со справкой игры; ссылки на источники находятся в досье.</p>
      <p>Размер поля и тип бонуса не показывают вероятность выигрыша. Конфигурация RTP может отличаться у разных операторов.</p>
      <Affiliate context="collection" />
    </section>
    <nav className={styles.topics} aria-label="Другие подборки">
      {gameCollections.filter(item => item.slug !== collection.slug).map(item => <Link href={`/collections/${item.slug}`} key={item.slug}>{item.title}</Link>)}
      <Link href="/journal/how-cascades-work">Как работают каскады</Link>
    </nav>
  </div>;
}

