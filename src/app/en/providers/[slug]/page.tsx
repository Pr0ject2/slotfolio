import styles from "@/components/english-entity-profile.module.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { slots, providerSlug } from "@/lib/data";
import { catalogStats, representativeGames } from "@/lib/catalog-stats";
import { englishProvider, englishProviderSlugs } from "@/lib/english-entities";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { SectionTitle } from "@/components/editorial";
import {
  EnglishEntityJsonLd,
  EnglishEntityStats,
  EnglishFeaturedGames,
  EnglishGameRow,
  EnglishMechanicLinks,
} from "@/components/english-entity-profile";
import { englishCatalogFact } from "@/lib/english-catalog-facts";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return englishProviderSlugs.map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = englishProvider(slug);
  return pageMetadata({
    title: p ? `${p.name}: games and mechanics` : "Publisher not found",
    description: p?.catalogSummary ?? "Slotfolio publisher profiles.",
    path: `/en/providers/${slug}`,
    noIndex: !p,
  });
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = englishProvider(slug);
  if (!p) notFound();
  const games = slots.filter((game) => providerSlug(game.provider) === slug);
  const stats = catalogStats(games);
  return (
    <div className={`entity-profile provider-dossier ${styles.profile}`}>
      <EnglishEntityJsonLd
        name={p.name}
        path={`/en/providers/${slug}`}
        parent="providers"
        games={games}
        description={p.catalogSummary}
      />
      <EnglishBreadcrumbs
        items={[
          { label: "Publishers", href: "/en/providers" },
          { label: p.name },
        ]}
      />
      <div className="page-heading provider-profile-heading">
        <div>
          <span className="eyebrow accent">Publisher profile</span>
          <h1>{p.name}</h1>
        </div>
        <p>
          {stats.count} selected game {stats.count === 1 ? "guide" : "guides"}
          <br />
          {stats.mechanics.map((m) => englishCatalogFact(m.name)).join(" · ")}
        </p>
      </div>
      <nav className="entity-jump" aria-label="Profile sections">
        <a href="#approach">Game design</a>
        <a href="#catalog-profile">Characteristics</a>
        <a href="#games">Game guides · {stats.count}</a>
        <Link href={`/en/slots?provider=${slug}`}>View in catalogue ↗</Link>
      </nav>
      <section id="approach" className="entity-intro">
        <p className="big-serif">{p.profileIntro}</p>
        <div>
          <p>{p.profileBody}</p>
          <p className="entity-editorial-note">{p.signoff}</p>
        </div>
      </section>
      <SectionTitle title={games.length === 1 ? "A game example" : "Two examples to compare"} />
      <p className="entity-section-note">
        {games.length === 1 ? "Open the guide to check payout rules, features and source qualifications." : "Use these games to identify differences in payout rules and bonuses."}
      </p>
      <EnglishFeaturedGames games={representativeGames(games)} />
      {p.reading && (
        <section className="entity-reading">
          <span className="eyebrow accent">What to look for</span>
          <div>
            <h2>{p.reading.title}</h2>
            <p>{p.reading.text}</p>
            <div className="entity-reading-links">
              {p.reading.compare.map((id) => {
                const game = games.find((g) => g.slug === id);
                return (
                  game && (
                    <Link key={id} href={`/en/slots/${id}`}>
                      {game.name} ↗
                    </Link>
                  )
                );
              })}
              <Link href="/en/compare">Open comparison ↗</Link>
            </div>
          </div>
        </section>
      )}
      <EnglishEntityStats games={games} filter={{ provider: slug }} />
      <SectionTitle title="Related mechanics" />
      <EnglishMechanicLinks names={stats.mechanics.map((m) => m.name)} />
      <section id="games">
        <SectionTitle
          title="Selected game guides"
          href={`/en/slots?provider=${slug}`}
          label="All catalogue records"
        />
        <div className="entity-games">
          {games.map((game, index) => (
            <EnglishGameRow key={game.slug} game={game} index={index} />
          ))}
        </div>
      </section>
      <div className="editorial-signoff provider-signoff">
        <p>
          Open a guide for the game's rules, documented figures and source
          qualifications.
        </p>
        <Link href="/en/compare">Compare two games ↗</Link>
      </div>
    </div>
  );
}
