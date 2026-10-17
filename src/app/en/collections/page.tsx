import Link from "next/link";
import { getSlot } from "@/lib/data";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { GameImage } from "@/components/editorial";
import { englishGameCollections } from "@/lib/english-game-collections";
import { pageMetadata } from "@/lib/seo";
import styles from "@/app/collections/collections.module.css";

export const metadata = pageMetadata({
  title: "Explore slot mechanics through real game examples",
  description: "Four focused comparisons of paylines, clusters, wild symbols and free-spins bonuses using twelve source-backed game guides.",
  path: "/en/collections",
  noIndex: true,
});

export default function EnglishCollections() {
  return (
    <div className={styles.page}>
      <EnglishBreadcrumbs items={[{ label: "Collections" }]} />
      <header className={styles.intro}>
        <span className="eyebrow accent">Game collections</span>
        <h1>Understand the rules by comparing games</h1>
        <p>Start with a question. Each collection compares three games, points out the differences in their mechanics and suggests what to check in the paytable.</p>
        <p className={styles.caption}>Looking for a particular game? <Link href="/en/slots">Browse the catalogue</Link> or <Link href="/en/search">search by name</Link>.</p>
      </header>
      <nav className={styles.topics} aria-label="Collection topics">
        {englishGameCollections.map(collection =>
          <Link key={collection.slug} href={`#${collection.slug}`}>{collection.title}</Link>,
        )}
      </nav>
      {englishGameCollections.map((collection, index) =>
        <article className={styles.card} id={collection.slug} key={collection.slug}>
          <div>
            <span className="eyebrow">{String(index + 1).padStart(2, "0")} / {collection.games.length} games</span>
            <h2><Link href={`/en/collections/${collection.slug}`}>{collection.title}</Link></h2>
            <p className={styles.question}>{collection.question}</p>
            <p>{collection.introduction}</p>
            <p className={styles.caption}>{collection.games.map(game => getSlot(game.slug)!.name).join(" · ")}</p>
            <Link className="text-link" href={`/en/collections/${collection.slug}`}>Explore this collection ↗</Link>
          </div>
          <Link href={`/en/collections/${collection.slug}`} className={styles.covers} aria-label={`Explore collection: ${collection.title}`}>
            {collection.games.slice(0, 2).map(game => <GameImage key={game.slug} slot={getSlot(game.slug)!} />)}
          </Link>
        </article>,
      )}
      <p className={styles.note}>These collections explain how rules differ; they do not rank games by profitability. A familiar mechanic or an easy-to-follow bonus cannot predict the outcome of an individual spin.</p>
    </div>
  );
}
