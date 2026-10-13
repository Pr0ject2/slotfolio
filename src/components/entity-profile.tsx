import Link from "next/link";
import { type Slot, mechanics, providerSlug, ruPlural, slotMechanics } from "@/lib/data";
import { catalogStats, type Frequency, rtpRange } from "@/lib/catalog-stats";
import { GameImage, SectionTitle } from "./editorial";
import { CompareButton } from "./compare-button";
import { JsonLd } from "./json-ld";
import { absoluteUrl } from "@/lib/seo";

export function EntityJsonLd({ name, path, parent, games, description }: { name: string; path: string; parent: "providers" | "mechanics"; games: Slot[]; description: string }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [{ name: "Главная", path: "/" }, { name: parent === "providers" ? "Провайдеры" : "Механики", path: `/${parent}` }, { name, path }].map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: absoluteUrl(item.path) })) },
    { "@type": "CollectionPage", "@id": absoluteUrl(path), url: absoluteUrl(path), name, description, inLanguage: "ru", mainEntity: { "@type": "ItemList", numberOfItems: games.length, itemListElement: games.map((game, i) => ({ "@type": "ListItem", position: i + 1, name: game.name, url: absoluteUrl(`/slots/${game.slug}`) })) } },
  ] }} />;
}

function FrequencyList({ items, href }: { items: Frequency[]; href?: (name: string) => string }) {
  return <ul className="entity-frequency">{items.map(({ name, count }) => <li key={name}>
    {href ? <Link href={href(name)}>{name} <span aria-hidden="true">↗</span></Link> : <span>{name}</span>}
    <small>{count} {ruPlural(count, "игра", "игры", "игр")}</small>
  </li>)}</ul>;
}

export function EntityStats({ games, filter, mechanicName }: { games: Slot[]; filter: { provider?: string; mechanic?: string }; mechanicName?: string }) {
  const stats = catalogStats(games);
  function href(key: string, value: string) { return `/slots?${new URLSearchParams({ ...filter, [key]: value })}`; }
  return <section id="catalog-profile" className="entity-statistics">
    <SectionTitle title="Игры и их особенности" />
    <div className="entity-statistics-lead">
      <p>Посмотрите, что общего у {stats.count} {ruPlural(stats.count, "игры", "игр", "игр")} в этом разделе: способы выплат, бонусы и волатильность.</p>
      <dl className="entity-rtp"><div><dt>RTP у игр</dt><dd>{rtpRange(stats.rtp)}</dd></div><div><dt>RTP указан для</dt><dd>{stats.rtp.count} из {stats.count} игр</dd></div></dl>
    </div>
    <div className="entity-distributions">
      <section><h3>{mechanicName ? "Сочетается с механиками" : "Способы устройства игры"}</h3>
        {stats.mechanics.filter((item) => item.name !== mechanicName).length ? <FrequencyList items={stats.mechanics.filter((item) => item.name !== mechanicName)} href={(name) => mechanicName ? `/mechanics/${mechanics.find((m) => m.name === name)!.slug}` : href("mechanic", name)} /> : <p className="data-note">Для этих игр не указаны другие механики.</p>}
        <p className="data-note">Одна игра может сочетать несколько способов получения выигрыша.</p>
      </section>
      <section><h3>Волатильность</h3><FrequencyList items={stats.volatility} href={(name) => href("volatility", name)} /><p className="data-note">Волатильность помогает понять разброс результатов, но не предсказывает следующий выигрыш.</p></section>
      <section><h3>Особенности игр</h3><FrequencyList items={stats.features.slice(0, 6)} href={(name) => href("feature", name)} /><p className="data-note">Числа показывают количество игр с этой особенностью, а не частоту появления бонуса.</p></section>
      <section><h3>{mechanicName ? "Представленные студии" : "Геометрия поля"}</h3>{mechanicName ? <FrequencyList items={stats.providers} href={(name) => `/providers/${providerSlug(name)}`} /> : <FrequencyList items={stats.fields} />}<p className="data-note">{mechanicName ? "Открывайте профиль студии для сравнения её разных подходов." : "В некоторых играх размер поля меняется во время вращения."}</p></section>
    </div>
  </section>;
}

export function FeaturedGames({ games }: { games: Slot[] }) {
  return <div className="entity-featured">{games.map((game) => <article key={game.slug}>
    <Link href={`/slots/${game.slug}`} className="entity-featured-image"><GameImage slot={game} /></Link>
    <div><span className="eyebrow">{slotMechanics(game).join(" · ")}</span><h3><Link href={`/slots/${game.slug}`}>{game.name}</Link></h3><p>{game.feature}</p><div className="entity-game-actions"><Link className="text-link" href={`/slots/${game.slug}`}>Читать досье ↗</Link><CompareButton slug={game.slug} name={game.name} /></div></div>
  </article>)}</div>;
}

export function MechanicLinks({ names }: { names: string[] }) {
  return <nav className="entity-related" aria-label="Связанные механики">{names.map((name) => {
    const item = mechanics.find((m) => m.name === name || m.slug === name);
    return item ? <Link key={item.slug} href={`/mechanics/${item.slug}`}><span>{item.name} ↗</span><small>{item.text}</small></Link> : null;
  })}</nav>;
}
