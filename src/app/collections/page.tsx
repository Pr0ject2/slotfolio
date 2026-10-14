import Link from "next/link";
import { getSlot } from "@/lib/data";
import { gameCollections } from "@/lib/collections";
import { Breadcrumbs, GameImage } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
import styles from "./collections.module.css";

export const metadata = pageMetadata({
  title: "Тематические подборки",
  description: "Сравните правила на примерах: выплаты без линий, кластерные функции, виды wild и три разных бонуса на поле 5 × 3.",
  path: "/collections",
});

export default function Page() {
  return <div className={styles.page}>
    <Breadcrumbs items={[{ label: "Подборки" }]} />
    <header className={styles.intro}>
      <span className="eyebrow accent">Тематические подборки</span>
      <h1>Разобраться в правилах на примерах</h1>
      <p>Выберите вопрос, который хотите прояснить. В каждой подборке — три игры, различия в их механиках и подсказки, что проверить в правилах.</p>
      <p className={styles.caption}>Нужна конкретная игра? <Link href="/slots">Откройте каталог</Link> или <Link href="/search">поиск по названию</Link>.</p>
    </header>
    <nav className={styles.topics} aria-label="Темы подборок">
      {gameCollections.map(collection => <Link key={collection.slug} href={`#${collection.slug}`}>{collection.title}</Link>)}
    </nav>
    {gameCollections.map((collection, index) => <article className={styles.card} id={collection.slug} key={collection.slug}>
      <div>
        <span className="eyebrow">{String(index + 1).padStart(2, "0")} / {collection.games.length} игры</span>
        <h2><Link href={`/collections/${collection.slug}`}>{collection.title}</Link></h2>
        <p className={styles.question}>{collection.question}</p>
        <p>{collection.introduction}</p>
        <p className={styles.caption}>{collection.games.map(game => getSlot(game.slug)!.name).join(" · ")}</p>
        <Link className="text-link" href={`/collections/${collection.slug}`}>Открыть подборку ↗</Link>
      </div>
      <Link href={`/collections/${collection.slug}`} className={styles.covers} aria-label={`Открыть подборку: ${collection.title}`}>
        {collection.games.slice(0, 2).map(game => <GameImage key={game.slug} slot={getSlot(game.slug)!} />)}
      </Link>
    </article>)}
    <p className={styles.note}>Подборки помогают сравнить правила. Они не ранжируют игры по доходности: знакомая механика или понятный бонус не предсказывают результат отдельного вращения.</p>
  </div>;
}
