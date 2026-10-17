import Link from "next/link";
import { type Slot, mechanics, providerSlug, slotMechanics } from "@/lib/data";
import { catalogStats, type Frequency } from "@/lib/catalog-stats";
import { englishFullDossiers } from "@/lib/english-full-dossiers";
import { englishCatalogFact } from "@/lib/english-catalog-facts";
import { englishMechanic } from "@/lib/english-entities";
import { absoluteUrl } from "@/lib/seo";
import { withBasePath } from "@/lib/base-path";
import { SectionTitle } from "./editorial";
import { SlotArtwork } from "./slot-artwork";
import { CompareButton } from "./compare-button";
import { JsonLd } from "./json-ld";

export function EnglishGameImage({ game }: { game: Slot }) {
  return (
    <SlotArtwork
      className="game-image"
      src={withBasePath(game.image)}
      alt={`${game.name} artwork`}
      width={500}
      height={280}
      loading="lazy"
      decoding="async"
    />
  );
}
export function EnglishEntityJsonLd({
  name,
  path,
  parent,
  games,
  description,
}: {
  name: string;
  path: string;
  parent: "providers" | "mechanics";
  games: Slot[];
  description: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { name: "Home", path: "/en" },
              {
                name: parent === "providers" ? "Publishers" : "Mechanics",
                path: `/en/${parent}`,
              },
              { name, path },
            ].map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.name,
              item: absoluteUrl(item.path),
            })),
          },
          {
            "@type": "CollectionPage",
            "@id": absoluteUrl(path),
            url: absoluteUrl(path),
            name,
            description,
            inLanguage: "en",
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: games.length,
              itemListElement: games.map((game, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: game.name,
                url: absoluteUrl(`/en/slots/${game.slug}`),
              })),
            },
          },
        ],
      }}
    />
  );
}
export function EnglishGameRow({ game, index }: { game: Slot; index: number }) {
  return (
    <article className="game-row game-row-comparable">
      <span className="row-index">{String(index + 1).padStart(2, "0")}</span>
      <Link className="row-image" href={`/en/slots/${game.slug}`}>
        <EnglishGameImage game={game} />
      </Link>
      <div className="row-main">
        <Link
          className="eyebrow"
          href={`/en/providers/${providerSlug(game.provider)}`}
        >
          {game.provider}
        </Link>
        <h3>
          <Link href={`/en/slots/${game.slug}`}>{game.name}</Link>
        </h3>
        <p>
          {slotMechanics(game).map(englishCatalogFact).join(" · ")}{" "}
          <span>·</span> {game.year}
        </p>
      </div>
      <span className="row-rtp">
        <small>RTP</small>
        {englishCatalogFact(game.rtp)}
      </span>
      <CompareButton slug={game.slug} name={game.name} locale="en" />
      <Link
        className="row-arrow"
        href={`/en/slots/${game.slug}`}
        aria-label={`Open ${game.name}`}
      >
        ↗
      </Link>
    </article>
  );
}
export function EnglishFeaturedGames({ games }: { games: Slot[] }) {
  return (
    <div className="entity-featured">
      {games.map((game) => (
        <article key={game.slug}>
          <Link
            className="entity-featured-image"
            href={`/en/slots/${game.slug}`}
          >
            <EnglishGameImage game={game} />
          </Link>
          <div>
            <span className="eyebrow">
              {slotMechanics(game).map(englishCatalogFact).join(" · ")}
            </span>
            <h3>
              <Link href={`/en/slots/${game.slug}`}>{game.name}</Link>
            </h3>
            <p>{englishFullDossiers[game.slug].feature}</p>
            <div className="entity-game-actions">
              <Link className="text-link" href={`/en/slots/${game.slug}`}>
                Read game guide ↗
              </Link>
              <CompareButton slug={game.slug} name={game.name} locale="en" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
export function EnglishMechanicLinks({ names }: { names: string[] }) {
  return (
    <nav className="entity-related" aria-label="Related mechanics">
      {names.map((name) => {
        const m = mechanics.find(
          (item) => item.name === name || item.slug === name,
        );
        const copy = m && englishMechanic(m.slug);
        return copy ? (
          <Link key={copy.slug} href={`/en/mechanics/${copy.slug}`}>
            <span>{copy.name} ↗</span>
            <small>{copy.text}</small>
          </Link>
        ) : null;
      })}
    </nav>
  );
}
function FrequencyList({
  items,
  href,
}: {
  items: Frequency[];
  href?: (name: string) => string;
}) {
  return (
    <ul className="entity-frequency">
      {items.map(({ name, count }) => (
        <li key={name}>
          {href ? (
            <Link href={href(name)}>
              {englishCatalogFact(name)} <span aria-hidden="true">↗</span>
            </Link>
          ) : (
            <span>{englishCatalogFact(name)}</span>
          )}
          <small>
            {count} {count === 1 ? "game" : "games"}
          </small>
        </li>
      ))}
    </ul>
  );
}
export function EnglishEntityStats({
  games,
  filter,
  mechanicName,
}: {
  games: Slot[];
  filter: { provider?: string; mechanic?: string };
  mechanicName?: string;
}) {
  const stats = catalogStats(games);
  const format = (value: number | null) =>
    value === null ? "Not recorded" : `${value.toFixed(2)}%`;
  const range =
    stats.rtp.min === stats.rtp.max
      ? format(stats.rtp.min)
      : `${format(stats.rtp.min)}–${format(stats.rtp.max)}`;
  const href = (key: string, value: string) =>
    `/en/slots?${new URLSearchParams({ ...filter, [key]: value })}`;
  const others = stats.mechanics.filter((item) => item.name !== mechanicName);
  return (
    <section id="catalog-profile" className="entity-statistics">
      <SectionTitle title="Games and characteristics" />
      <div className="entity-statistics-lead">
        <p>
          These figures describe the selected full game guides, not every title
          in the wider catalogue or the publisher's entire output.
        </p>
        <dl className="entity-rtp">
          <div>
            <dt>Reference RTP range</dt>
            <dd>{range}</dd>
          </div>
          <div>
            <dt>RTP recorded for</dt>
            <dd>
              {stats.rtp.count} of {stats.count} games
            </dd>
          </div>
        </dl>
      </div>
      <div className="entity-distributions">
        <section>
          <h3>
            {mechanicName ? "Combined with" : "Payout and grid mechanics"}
          </h3>
          {others.length ? (
            <FrequencyList
              items={others}
              href={(name) =>
                mechanicName
                  ? `/en/mechanics/${mechanics.find((m) => m.name === name)!.slug}`
                  : href("mechanic", name)
              }
            />
          ) : (
            <p className="data-note">
              No other mechanics are recorded for these games.
            </p>
          )}
          <p className="data-note">One game can combine several mechanics.</p>
        </section>
        <section>
          <h3>Volatility</h3>
          <FrequencyList
            items={stats.volatility}
            href={(name) => href("volatility", name)}
          />
          <p className="data-note">
            Volatility describes the spread of results; it does not predict the
            next win.
          </p>
        </section>
        <section>
          <h3>Features</h3>
          <FrequencyList
            items={stats.features.slice(0, 6)}
            href={(name) => href("feature", name)}
          />
          <p className="data-note">
            Counts show games with a feature, not how often the bonus occurs.
          </p>
        </section>
        <section>
          <h3>{mechanicName ? "Publishers represented" : "Grid geometry"}</h3>
          {mechanicName ? (
            <FrequencyList
              items={stats.providers}
              href={(name) => `/en/providers/${providerSlug(name)}`}
            />
          ) : (
            <FrequencyList items={stats.fields} />
          )}
          <p className="data-note">
            {mechanicName
              ? "Open a publisher profile to compare its different approaches."
              : "Some grids change size during a round."}
          </p>
        </section>
      </div>
    </section>
  );
}
