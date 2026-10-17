import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleJsonLd } from "@/components/article-json-ld";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { GameImage } from "@/components/editorial";
import { CompareButton } from "@/components/compare-button";
import { getSlot } from "@/lib/data";
import { englishGameCollections } from "@/lib/english-game-collections";
import { pageMetadata } from "@/lib/seo";
import styles from "@/app/collections/collections.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return englishGameCollections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = englishGameCollections.find(item => item.slug === slug);
  if (!collection) notFound();
  return pageMetadata({
    title: collection.title,
    description: collection.introduction,
    path: `/en/collections/${slug}`,
    openGraphType: "article",
    noIndex: true,
  });
}

export default async function EnglishCollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = englishGameCollections.find(item => item.slug === slug);
  if (!collection) notFound();
  return (
    <div className={styles.page}>
      <ArticleJsonLd title={collection.title} description={collection.introduction} path={`/en/collections/${slug}`} />
      <EnglishBreadcrumbs items={[
        { label: "Collections", href: "/en/collections" },
        { label: collection.title },
      ]} />
      <header className={`collection-heading ${styles.intro}`}>
        <span className="eyebrow accent">Collection / {collection.games.length} games</span>
        <h1>{collection.title}</h1>
        <p>{collection.introduction}</p>
      </header>
      <section aria-labelledby="selection-heading" className={styles.note}>
        <h2 id="selection-heading">Why these games?</h2>
        <p>{collection.selection}</p>
      </section>
      {collection.games.map((entry, index) => {
        const slot = getSlot(entry.slug);
        if (!slot) return null;
        return (
          <article className={`collection-entry${slot.slug === "sweet-bonanza" ? " collection-entry--sweet-bonanza" : ""}`} key={entry.slug}>
            <span className="number">{String(index + 1).padStart(2, "0")}</span>
            <Link href={`/en/slots/${slot.slug}`} aria-label={`Read the ${slot.name} game guide`}><GameImage slot={slot} /></Link>
            <div>
              <span className="eyebrow accent">{slot.provider}</span>
              <h2><Link href={`/en/slots/${slot.slug}`}>{slot.name}</Link></h2>
              <p>{entry.note}</p>
              <p><strong>What to check:</strong> {entry.check}</p>
              <Link className="text-link" href={`/en/slots/${slot.slug}`}>Read game guide ↗</Link>
              <CompareButton slug={slot.slug} name={slot.name} locale="en" />
            </div>
          </article>
        );
      })}
      <section className={styles.note} aria-labelledby="compare-heading">
        <h2 id="compare-heading">Questions worth comparing</h2>
        <ul className={styles.checklist}>
          {collection.checklist.map(item => <li key={item}>{item}</li>)}
        </ul>
        <p>Add two games using the Compare buttons, then open the <Link href="/en/compare">side-by-side table</Link>. For precise feature conditions, check each game's paytable and the source references in its guide.</p>
        <p>A game's grid size or bonus type does not establish your chance of winning. Available RTP settings may differ between operators.</p>
      </section>
      <nav className={styles.topics} aria-label="Other collections">
        {englishGameCollections.filter(item => item.slug !== collection.slug)
          .map(item => <Link href={`/en/collections/${item.slug}`} key={item.slug}>{item.title}</Link>)}
        <Link href="/en/collections">All collections</Link>
      </nav>
    </div>
  );
}
