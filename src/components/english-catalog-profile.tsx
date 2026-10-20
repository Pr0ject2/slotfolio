import Link from "next/link";
import { SlotCasinoLink } from "./slot-casino-link";
import { SlotArtwork } from "./slot-artwork";
import { withBasePath } from "@/lib/base-path";
import { providerSlug } from "@/lib/data";
import { createCatalogModel } from "@/lib/catalog-index";
import { catalogSeeds, getCatalogSeed } from "@/lib/catalog-seeds";
import { getVerifiedCatalogResearch } from "@/lib/catalog-research-lookup";
import { getVerifiedCatalogDetails } from "@/lib/catalog-verified-details-lookup";
import { getVerifiedCatalogGameType } from "@/lib/catalog-verified-game-type";
import { englishCatalogFact } from "@/lib/english-catalog-facts";
import type { EnglishCatalogContent } from "@/lib/english-catalog-complete";
import type { CatalogItem } from "@/lib/catalog-query";
import recordStyles from "@/app/en/slots/catalog/record.module.css";
import styles from "./english-catalog-profile.module.css";

const model = createCatalogModel();
function parseRtp(value?: string) {
  const match = value?.replace(",", ".").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}
const rtps = catalogSeeds.map(seed => parseRtp(getVerifiedCatalogDetails(seed.slug)?.rtp))
  .filter((value): value is number => value !== null).sort((a, b) => a - b);
const median = rtps.length ? rtps.length % 2 ? rtps[Math.floor(rtps.length / 2)]
  : (rtps[rtps.length / 2 - 1] + rtps[rtps.length / 2]) / 2 : null;

function volatilityNote(value?: string) {
  const text = value?.toLowerCase() ?? "";
  if (text.includes("экстрем") || text.includes("очень высок")) return "A wide spread of outcomes: occasional strong rounds can alternate with long quiet stretches.";
  if (text.includes("высок")) return "An above-average spread: paying rounds are generally less evenly distributed than in medium-volatility games.";
  if (text.includes("низ")) return "A below-average spread: outcomes are generally distributed more evenly, although an individual round remains unpredictable.";
  if (text.includes("настра")) return "Several volatility profiles exist; the particular behaviour depends on the operator's chosen configuration.";
  return "This reference category describes the spread of outcomes over time, not the chance of winning the next round.";
}
function itemHref(item: CatalogItem) {
  return item.coverage === "dossier" ? `/en/slots/${item.slug}` : `/en/slots/catalog/${item.slug}`;
}
function RelatedRows({ items }: { items: CatalogItem[] }) {
  return <div>{items.map((item, index) => <Link className="game-row" href={itemHref(item)} key={item.slug}>
    <span className="row-index">{String(index + 1).padStart(2, "0")}</span>
    <div className="row-main"><h3>{item.name}</h3><p>{item.provider}</p></div>
    <span className="row-arrow" aria-hidden="true">↗</span>
  </Link>)}</div>;
}

export function EnglishCatalogProfile({ item, copy }: { item: CatalogItem; copy: EnglishCatalogContent }) {
  const seed = getCatalogSeed(item.slug)!;
  const details = getVerifiedCatalogDetails(item.slug);
  const research = getVerifiedCatalogResearch(item.slug);
  const gameType = getVerifiedCatalogGameType(item.slug);
  const mechanics = research?.mechanics ?? [];
  const providerItems = model.items.filter(other => other.slug !== item.slug && other.provider === item.provider)
    .sort((a, b) => b.mechanics.length - a.mechanics.length || a.name.localeCompare(b.name, "ru")).slice(0, 6);
  const providerSlugs = new Set(providerItems.map(other => other.slug));
  const mechanicItems = mechanics.length ? model.items
    .filter(other => other.slug !== item.slug && !providerSlugs.has(other.slug) && other.mechanics.some(mechanic => mechanics.includes(mechanic)))
    .sort((a, b) => b.mechanics.filter(mechanic => mechanics.includes(mechanic)).length - a.mechanics.filter(mechanic => mechanics.includes(mechanic)).length || a.name.localeCompare(b.name, "ru"))
    .slice(0, 6) : [];
  const closest = [...mechanicItems, ...providerItems].filter((other, index, all) => all.findIndex(candidate => candidate.slug === other.slug) === index).slice(0, 3);
  const facts = [
    ["Publisher", item.provider], ["Game type", item.gameType], ["Grid", englishCatalogFact(item.field)],
    ["RTP", englishCatalogFact(item.verifiedRtp)], ["Maximum win", englishCatalogFact(item.maxWin)],
    ["Volatility", englishCatalogFact(item.verifiedVolatility)], ["Release date", item.releaseDate],
  ].filter(([, value]) => Boolean(value));
  const sources = new Map<string, string[]>();
  for (const [label, url] of [
    ["Original catalogue entry", seed.source], ["Mechanics and features", research?.source],
    ["Numerical parameters", details?.source],
    ["Release date", details?.releaseDateSource ?? (details?.releaseDate ? details.source : undefined)],
    ["Game type", gameType?.source],
    ["Volatility", details?.volatilitySource ?? (details?.volatility ? details.source : undefined)],
  ]) if (url && label) sources.set(url, [...(sources.get(url) ?? []), label]);
  const rtp = parseRtp(details?.rtp);
  const relativeRtp = rtp !== null && median !== null ? rtp - median > 0.1 ? "Above the median" : rtp - median < -0.1 ? "Below the median" : "Around the median" : null;
  const verified = [details?.field ? `grid ${englishCatalogFact(details.field)}` : null,
    details?.rtp ? `RTP ${englishCatalogFact(details.rtp)}` : null,
    details?.volatility ? `volatility ${englishCatalogFact(details.volatility)}` : null,
    details?.maxWin ? `maximum win ${englishCatalogFact(details.maxWin)}` : null,
    details?.releaseDate ? `release date ${details.releaseDate.split("-").reverse().join(".")}` : null,
  ].filter(Boolean);

  return <div className={`${recordStyles.record} ${styles.extended}`}>
    <nav aria-label="Breadcrumbs" className="breadcrumbs"><Link href="/en">Home</Link> / <Link href="/en/slots">Catalogue</Link> / <span aria-current="page">{item.name}</span></nav>
    <div className="slot-heading"><div><span className="eyebrow accent">Catalogue game profile{details?.releaseDate ? ` / ${details.releaseDate.slice(0, 4)}` : ""}</span>
      <h1>{item.name}</h1><Link className="provider-link" href={`/en/slots?provider=${providerSlug(item.provider)}`}>{item.provider} ↗</Link></div>
      <Link className="compare-button" href="#catalog-comparison">Compare similar games</Link>
    </div>
    <div className="slot-intro">
      <figure className="slot-figure"><SlotArtwork src={withBasePath(item.image)} alt={`${item.name} game artwork`} width={600} height={420} loading="lazy" /><figcaption>Game artwork · {item.provider} · {item.name}</figcaption></figure>
      <div className="slot-summary"><span className="eyebrow">Documented details only</span><p className="slot-deck">{copy.intro?.[0] ?? copy.editorial ?? copy.features[0]?.description}</p>
        <h2 className="catalog-facts-heading">Game characteristics</h2>
        <SlotCasinoLink locale="en" />
        <dl className="facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          {mechanics.length > 0 && <div className="facts-wide"><dt>Documented mechanics</dt><dd className="slot-tag-list">{mechanics.map(mechanic => <Link key={mechanic} href={`/en/slots?mechanic=${encodeURIComponent(mechanic)}`}>{englishCatalogFact(mechanic)}</Link>)}</dd></div>}
        </dl>
        <p className="data-note">Only documented parameters are shown. If the publisher does not disclose a value or characteristic, Slotfolio does not infer it from another game.</p>
      </div>
    </div>
    <div className="article-layout slot-body">
      <nav className="article-toc" aria-label="On this page"><span className="eyebrow">Contents</span>
        <a href="#how-it-works">How the game works</a><a href="#functions">Features and bonuses</a>
        {details && <a href="#math-profile">Main parameters</a>}<a href="#editorial">Editorial perspective</a>
        <a href="#catalog-comparison">Context and comparison</a><a href="#facts">Facts and sources</a><a href="#faq">Game questions</a>
        {(providerItems.length > 0 || mechanicItems.length > 0) && <a href="#related">Explore related games</a>}
        <Link href="/en/slots">Full catalogue ↗</Link>
      </nav>
      <article className="prose">
        <section id="how-it-works"><h2>How the game works</h2>{(copy.intro ?? copy.features.slice(0, 2).map(feature => feature.description)).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>
        <section id="functions"><span className="eyebrow accent">Features and bonuses</span><h2>Main features</h2>
          <div className={`dossier-feature-grid ${styles.features}`}>{copy.features.map((feature, index) => <article className={`dossier-feature-card ${index === 0 ? "is-primary" : ""}`} key={index}><span>{String(index + 1).padStart(2, "0")}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
        </section>
        {details && <section id="math-profile"><span className="eyebrow accent">Figures without false precision</span><h2>Main parameters</h2><div className={`dossier-metric-grid ${styles.metrics}`}>
          {details.rtp && <div><span>RTP in the catalogue</span><strong>{englishCatalogFact(details.rtp)}</strong><small>Documented reference configuration</small></div>}
          {details.maxWin && <div><span>Maximum win</span><strong>{englishCatalogFact(details.maxWin)}</strong><small>Shown only when stated by the publisher</small></div>}
          {details.volatility && <div><span>Volatility</span><strong>{englishCatalogFact(details.volatility)}</strong><small>{volatilityNote(details.volatility)}</small></div>}
          {details.field && <div><span>Grid</span><strong>{englishCatalogFact(details.field)}</strong><small>{mechanics.map(englishCatalogFact).join(" · ") || "Grid format confirmed by the source"}</small></div>}
        </div><p className="data-note">Values are not estimated or borrowed from similar games. An absent figure means the first-party source used here does not confirm it.</p></section>}
        <section id="editorial"><span className="eyebrow accent">Editorial perspective</span><h2>{item.name}: what matters during a round</h2><blockquote>{copy.editorial ?? copy.features[0]?.description}</blockquote>
          {(copy.intro?.[1] ?? copy.features[1]?.description) && <p>{copy.intro?.[1] ?? copy.features[1]?.description}</p>}
        </section>
        <section id="catalog-comparison"><span className="eyebrow accent">Catalogue context</span><h2>Comparing with other games</h2><div className={`dossier-context-grid ${styles.context}`}>
          {relativeRtp && <div><span>RTP compared with researched games</span><strong>{relativeRtp}</strong><small>Median across {rtps.length} records: approximately {median!.toFixed(1)}%</small></div>}
          {details?.volatility && <div><span>Volatility</span><strong>{englishCatalogFact(details.volatility)}</strong><small>{volatilityNote(details.volatility)}</small></div>}
          {closest.length > 0 && <div><span>Closest in structure</span><strong>{closest.map(other => other.name).join(" · ")}</strong><small>Selected using documented mechanics and publisher</small></div>}
          <div><span>Publisher</span><strong>{item.provider}</strong><small>Compare neighbouring games to distinguish the studio's recurring techniques from features specific to this version.</small></div>
        </div>{mechanics[0] ? <Link className="text-link" href={`/en/slots?mechanic=${encodeURIComponent(mechanics[0])}`}>Games with {englishCatalogFact(mechanics[0])} ↗</Link> : <Link className="text-link" href={`/en/slots?provider=${providerSlug(item.provider)}`}>All {item.provider} games ↗</Link>}</section>
        <section id="facts"><h2>Facts and sources</h2><p>RTP describes the theoretical proportion of stakes returned over the long run. Volatility describes the spread of outcomes, but cannot predict the next round.</p>{[...sources].map(([url, labels]) => <p className="source-note" key={url}>{labels.join(" · ")}: <a href={url} target="_blank" rel="noopener noreferrer">{url === item.source ? "Open the recorded publisher source ↗" : `Open ${new URL(url).hostname.replace(/^www\./, "")} reference ↗`}</a>.</p>)}
          <p><Link href={`/slots/catalog/${item.slug}`} hrefLang="ru">Read the extended original record (Russian) ↗</Link></p>
          <p className="data-note">RTP and other figures can vary by game configuration and operator. Check the in-game paytable. Published figures cannot predict a playing session.</p>
          <p><Link href="/en/editorial-policy">Editorial policy</Link> · <Link href="/en/responsible-gaming">Safer gambling</Link></p>
        </section>
        <section id="faq"><span className="eyebrow accent">Common questions</span><h2>Questions about the game</h2>
          <details><summary>What is central to {item.name}'s mechanics?</summary><p>{copy.features[0]?.description ?? copy.intro?.[0]}</p></details>
          <details><summary>Which {item.name} parameters are documented?</summary><p>{verified.length ? `The record documents: ${verified.join(", ")}. Unlisted figures are not inferred from other games.` : "The current first-party material does not provide a complete numerical profile, so unverified values are not published."}</p></details>
          <details><summary>Why can the operator's RTP differ?</summary><p>A game can have different mathematical configurations. Before playing, check the RTP and rules of the particular version opened by your operator.</p></details>
        </section>
      </article>
    </div>
    {(providerItems.length > 0 || mechanicItems.length > 0) && <section id="related">
      {providerItems.length > 0 && <><div className="section-title"><h2>More from {item.provider}</h2><Link className="text-link" href={`/en/slots?provider=${providerSlug(item.provider)}`}>All {item.provider} games ↗</Link></div><RelatedRows items={providerItems} /></>}
      {mechanicItems.length > 0 && <><div className="section-title"><h2>Similar mechanics</h2><Link className="text-link" href={`/en/slots?mechanic=${encodeURIComponent(mechanics[0])}`}>Open the filter ↗</Link></div><RelatedRows items={mechanicItems} /></>}
    </section>}
  </div>;
}
