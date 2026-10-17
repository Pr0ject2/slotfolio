import styles from "@/components/english-entity-profile.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { slots, mechanics, slotMechanics, getSlot } from "@/lib/data";
import { englishMechanicSlugs, englishMechanic } from "@/lib/english-entities";
import { englishFullDossiers } from "@/lib/english-full-dossiers";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { SectionTitle } from "@/components/editorial";
import { CompareButton } from "@/components/compare-button";
import {
  EnglishEntityJsonLd,
  EnglishEntityStats,
  EnglishGameImage,
  EnglishGameRow,
  EnglishMechanicLinks,
} from "@/components/english-entity-profile";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return englishMechanicSlugs.map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = englishMechanic(slug);
  return pageMetadata({
    title: m ? `${m.name}: rules and game examples` : "Mechanic not found",
    description: m?.contrast ?? "Slotfolio mechanics reference.",
    path: `/en/mechanics/${slug}`,
    noIndex: !m,
  });
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = englishMechanic(slug);
  const original = mechanics.find((item) => item.slug === slug);
  if (!m || !original) notFound();
  const games = slots.filter((game) =>
    slotMechanics(game).includes(original.name),
  );
  const example = getSlot(m.example);
  return (
    <div className={`entity-profile mechanic-dossier ${styles.profile}`}>
      <EnglishEntityJsonLd
        name={m.name}
        path={`/en/mechanics/${slug}`}
        parent="mechanics"
        games={games}
        description={m.contrast}
      />
      <EnglishBreadcrumbs
        items={[
          { label: "Mechanics", href: "/en/mechanics" },
          { label: m.name },
        ]}
      />
      <div className="simple-heading">
        <span className="eyebrow accent">Rules reference / Mechanic</span>
        <h1>{m.name}</h1>
        <p>
          {m.subtitle}. {m.text}
        </p>
      </div>
      <div className="article-layout">
        <aside className="article-toc" aria-label="Guide sections">
          <span className="eyebrow">Contents</span>
          <a href="#principle">How it works</a>
          <a href="#rhythm">Round structure</a>
          <a href="#watch">Read the rules</a>
          <a href="#example">Game example</a>
          <a href="#catalog-profile">Characteristics</a>
          <a href="#games">Game guides · {games.length}</a>
        </aside>
        <article className="prose">
          <section id="principle">
            <h2>How it works</h2>
            {m.principle.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <ol className="mechanic-sequence">
              {m.sequence.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ol>
          </section>
          <section id="rhythm">
            <h2>How the round differs</h2>
            <p>{m.contrast}</p>
            <h3>What you can follow</h3>
            <p>{m.appeal}</p>
            <h3>What can be misleading</h3>
            <p>{m.tradeoff}</p>
          </section>
          <section id="watch">
            <h2>Three questions for the rules</h2>
            <ul>
              {m.watch.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
            <div className="margin-note">
              <strong>The payout rule does not determine returns</strong>
              <p>
                Games using the same mechanic can have different RTP
                configurations, volatility and payout probabilities.
              </p>
            </div>
          </section>
        </article>
      </div>
      {example && (
        <section id="example" className="mechanic-example">
          <Link href={`/en/slots/${example.slug}`}>
            <EnglishGameImage game={example} />
          </Link>
          <div>
            <span className="eyebrow accent">Game example</span>
            <h2>
              <Link href={`/en/slots/${example.slug}`}>{example.name} ↗</Link>
            </h2>
            <p>{m.exampleNote}</p>
            <p>{englishFullDossiers[example.slug].feature}</p>
            <CompareButton
              slug={example.slug}
              name={example.name}
              locale="en"
            />
          </div>
        </section>
      )}
      <EnglishEntityStats
        games={games}
        filter={{ mechanic: original.name }}
        mechanicName={original.name}
      />
      <SectionTitle title="Compare payout principles" />
      <EnglishMechanicLinks names={m.related} />
      <section id="games">
        <SectionTitle
          title={`Game guides: ${m.name}`}
          href={`/en/slots?mechanic=${encodeURIComponent(original.name)}`}
          label="All catalogue records"
        />
        <div className="entity-games">
          {games.map((game, index) => (
            <EnglishGameRow key={game.slug} game={game} index={index} />
          ))}
        </div>
      </section>
      <div className="editorial-signoff">
        <p>
          Choose two games to compare their mechanics, features and documented
          figures.
        </p>
        <Link href="/en/compare">Open comparison ↗</Link>
      </div>
      <div className="entity-reading-links">
        <Link href="/journal/how-cascades-work">
          Detailed cascade guide (Russian) ↗
        </Link>
        <Link href="/collections/beyond-lines">
          Beyond paylines collection (Russian) ↗
        </Link>
      </div>
    </div>
  );
}
