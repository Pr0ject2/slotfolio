import Link from "next/link";
import { SlotCasinoLink } from "./slot-casino-link";
import type { Slot } from "@/lib/data";
import { mechanics, providerSlug, relatedSlots, slotMechanics } from "@/lib/data";
import { GameImage, SectionTitle } from "./editorial";
import { JsonLd } from "./json-ld";
import { absoluteMediaUrl, absoluteUrl } from "@/lib/seo";
import { formatRtp } from "@/lib/catalog-stats";
import { catalogRtpContext, getVerifiedSlotMetrics, volatilityContext } from "@/lib/dossier";
import { getVerifiedSlotPassport } from "@/lib/slot-passport";
import { englishCatalogFact } from "@/lib/english-catalog-facts";
import {
  englishFullDossiers, englishDossierFeatureCards, englishMechanicExplanations,
  englishMetricLabel, englishReleaseDate, englishRtpContext, englishVolatilityContext,
} from "@/lib/english-full-dossiers";
import styles from "./english-full-dossier.module.css";

export function EnglishFullDossier({ game }: { game: Slot }) {
  const copy = englishFullDossiers[game.slug];
  if (!copy) throw new Error(`Incomplete English dossier: ${game.slug}`);
  const verified = getVerifiedSlotMetrics(game.slug);
  if (verified?.note && !copy.metricsNote) throw new Error(`Missing metric caveat: ${game.slug}`);
  const passport = getVerifiedSlotPassport(game.slug);
  const mechanicList = slotMechanics(game);
  const primaryMechanic = mechanics.find(item => item.name === mechanicList[0]);
  const cards = englishDossierFeatureCards(game);
  const related = relatedSlots(game, 3);
  const rtpContext = catalogRtpContext(game);
  const volatilitySummary = englishVolatilityContext(volatilityContext(game));
  const maximumLabel = englishMetricLabel(verified?.maxWinLabel, "Documented maximum");
  const observedLabel = englishMetricLabel(verified?.observedWinLabel, "Observed win");
  const isGates = game.slug === "gates-of-olympus";
  const primaryLabel = isGates ? "Publisher's game information" : "Publisher information / primary reference";
  const references = [
    { url: game.source, label: primaryLabel },
    ...(passport && passport.source !== game.source ? [{ url: passport.source, label: copy.passportSourceLabel ?? "Release date and game type reference" }] : []),
    ...(verified && verified.source !== game.source ? [{ url: verified.source, label: "Additional documented figures / primary reference" }] : []),
    ...(verified?.additionalSources ?? []).map((source, index) => ({ url: source.url, label: copy.additionalSourceLabels?.[index] ?? `Additional publisher reference ${index + 1}` })),
  ];

  return <div className={styles.dossier}>
    <JsonLd data={{
      "@context":"https://schema.org", "@type":"Article",
      headline:isGates ? "Gates of Olympus: how the tumble and multiplier features work" : `${game.name}: rules, features and RTP explained`, description:copy.description,
      url:absoluteUrl(`/en/slots/${game.slug}`), mainEntityOfPage:absoluteUrl(`/en/slots/${game.slug}`),
      image:[absoluteMediaUrl(game.featureImage || game.image)], inLanguage:"en",
      publisher:{"@type":"Organization",name:"Slotfolio",url:absoluteUrl("/en")},
      about:{"@type":"VideoGame",name:game.name},
    }} />
    <nav aria-label="Breadcrumbs" className="breadcrumbs">
      <Link href="/en">Home</Link> / <Link href="/en/slots">Catalogue</Link> / <span aria-current="page">{game.name}</span>
    </nav>
    <div className="slot-heading"><div>
      <span className="eyebrow accent">Game guide / {game.year}</span>
      <h1>{game.name}</h1>
      <p>{game.provider}{copy.attributionNote ? " · recorded attribution" : ""}</p>
      <Link className="text-link" href={`/en/providers/${providerSlug(game.provider)}`}>Publisher profile ↗</Link>
    </div></div>
    <div className="slot-intro">
      <figure className="slot-figure"><GameImage slot={game} priority /><figcaption>Game artwork · {game.provider} · {game.name}</figcaption></figure>
      <div className="slot-summary">
        <span className="eyebrow">At a glance</span><p className="slot-deck">{copy.description}</p>
        {copy.attributionNote && <p className="data-note">{copy.attributionNote}</p>}
        <SlotCasinoLink locale="en" />
        <dl className="facts">
          <div><dt>{copy.attributionNote ? "Recorded publisher attribution" : "Publisher"}</dt><dd>{game.provider}</dd></div>
          <div><dt>Release year</dt><dd>{game.year}</dd></div>
          <div><dt>Grid</dt><dd>{englishCatalogFact(game.field)}</dd></div>
          {passport && <><div><dt>Release date</dt><dd>{copy.releaseDate ?? englishReleaseDate(passport.releaseDate)}</dd></div><div><dt>Game type</dt><dd>{passport.gameType}</dd></div></>}
          <div><dt>RTP (reference)</dt><dd>{englishCatalogFact(game.rtp)}</dd></div>
          <div><dt>Volatility</dt><dd>{englishCatalogFact(game.volatility)}</dd></div>
          {verified?.maxWin && <div><dt>{maximumLabel}</dt><dd>{englishCatalogFact(verified.maxWin)}</dd></div>}
          {verified?.observedWin && <div><dt>{observedLabel}</dt><dd>{englishCatalogFact(verified.observedWin)}</dd></div>}
          <div className="facts-wide"><dt>Key features</dt><dd className="slot-tag-list">{game.tags.map(tag => <Link key={tag} href={`/en/slots?feature=${encodeURIComponent(tag)}`}>{englishCatalogFact(tag)}</Link>)}</dd></div>
        </dl>
        <p className="data-note">RTP can differ between game versions. {verified?.rtpVariants && verified.rtpVariants.length > 1 ? `Known configurations: ${verified.rtpVariants.map(englishCatalogFact).join(" · ")}.` : "Check the value in the game's rules."}</p>
      </div>
    </div>
    <div className="article-layout slot-body">
      <aside className="article-toc" aria-label="On this page">
        <span className="eyebrow">Contents</span>
        <a href="#rules">{isGates ? "How wins are formed" : "How wins work"}</a>
        <a href="#feature">{isGates ? "Multipliers and free spins" : "Key feature"}</a>
        <a href="#math-profile">RTP and other figures</a><a href="#perspective">Editorial perspective</a>
        <a href="#catalog-context">Comparing games</a><a href="#source">{isGates ? "Sources and limitations" : "Sources and risks"}</a>
        <a href="#faq">Game questions</a><a href="#related">Related games</a>
        <Link href={`/en/compare?seed=${game.slug}`}>Open comparison ↗</Link>
      </aside>
      <article className="prose">
        <section id="rules"><h2>{isGates ? "How wins are formed" : "How wins work"}</h2>
          <p>{copy.feature} This feature determines what to follow during the round.</p>
          {mechanicList.map(name => <p key={name}>{englishMechanicExplanations[name]}</p>)}
          <p>Open the paytable before playing. It explains Wild and Scatter roles, feature triggers and the maximum-payout limits for the particular version.</p>
          {primaryMechanic && <Link className="text-link" href={`/en/mechanics/${primaryMechanic.slug}`}>Read about {englishCatalogFact(primaryMechanic.name).toLowerCase()} ↗</Link>}
        </section>
        <section id="feature"><span className="eyebrow accent">Features and bonuses</span><h2>{isGates ? "Multipliers and free spins" : "Key feature"}</h2>
          <div className="dossier-feature-grid">{cards.map((card,index) => <article className={`dossier-feature-card ${card.kind === "primary" ? "is-primary" : ""}`} key={`${card.title}-${index}`}><span>{String(index+1).padStart(2,"0")}</span><h3>{card.title}</h3><p>{card.text}</p></article>)}</div>
        </section>
        <section id="math-profile"><span className="eyebrow accent">Game figures</span><h2>{isGates ? "What RTP and volatility tell you" : "RTP and other figures"}</h2>
          <div className="dossier-metric-grid">
            <div><span>RTP</span><strong>{englishCatalogFact(game.rtp)}</strong><small>Check the game's rules for the active configuration</small></div>
            {verified?.rtpVariants && verified.rtpVariants.length > 1 && <div><span>RTP configurations</span><strong>{verified.rtpVariants.length}</strong><small>{verified.rtpVariants.map(englishCatalogFact).join(" · ")}</small></div>}
            {verified?.maxWin && <div><span>{maximumLabel}</span><strong>{englishCatalogFact(verified.maxWin)}</strong><small>In units of the stake</small></div>}
            {verified?.observedWin && <div><span>{observedLabel}</span><strong>{englishCatalogFact(verified.observedWin)}</strong><small>This is not necessarily the maximum possible win</small></div>}
            <div><span>Volatility</span><strong>{englishCatalogFact(game.volatility)}</strong><small>{volatilitySummary}</small></div>
            <div><span>Grid</span><strong>{englishCatalogFact(game.field)}</strong><small>{mechanicList.map(englishCatalogFact).join(" · ")}</small></div>
          </div>
          {copy.metricsNote && <p className="metric-caveat">{copy.metricsNote}</p>}
        </section>
        <section id="perspective"><span className="eyebrow accent">Editorial perspective</span><h2>Editorial perspective</h2><blockquote>{copy.note}</blockquote>
          <p>We describe how this game differs from others: its pace, rules and features. This is not a recommendation to gamble or an assessment of your chances of winning.</p>
        </section>
        <section id="catalog-context"><span className="eyebrow accent">Related games</span><h2>Comparing games</h2>
          <div className="dossier-context-grid">
            <div><span>RTP compared with the catalogue</span><strong>{englishRtpContext(rtpContext.label)}</strong><small>Median RTP across {rtpContext.count} games: {englishCatalogFact(formatRtp(rtpContext.median))}</small></div>
            <div><span>Volatility</span><strong>{englishCatalogFact(game.volatility)}</strong><small>{volatilitySummary}</small></div>
            <div><span>Closest in structure</span><strong>{related.map(item=>item.name).join(" · ")}</strong><small>Games with similar rules and features</small></div>
          </div>
          <Link className="text-link" href={`/en/compare?seed=${game.slug}`}>Open comparison table ↗</Link>
        </section>
        <section id="source"><h2>{isGates ? "Sources and limitations" : "Sources and risks"}</h2>
          <p>RTP describes a theoretical return over a large number of bets. It does not show how much will return during one session. Volatility describes the spread of results, but cannot predict the next round.</p>
          <div className="margin-note"><strong>Check the version first</strong><p>A game can have several RTP configurations. Look for the exact figure in the rules of the version you intend to use.</p></div>
          <p className="source-note">References recorded for this game are listed below. {passport ? "Release date and game type were checked against the linked publisher material. " : ""}{verified ? "Additional documented figures use the corresponding references. " : ""}The source qualifications and any conflicts are retained in the game figures and editorial notes above.</p>
          <ul className="source-list">{references.map((reference,index)=><li key={`${reference.url}-${index}`}><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.label} ↗</a></li>)}</ul>
          <p>You can lose the money you stake. <Link href="/en/responsible-gaming">Safer gambling information</Link> · <Link href="/en/editorial-policy">Editorial policy</Link></p>
        </section>
        <aside className="affiliate"><span className="eyebrow">Operator conditions · 18+</span><h3>From game rules to operator conditions</h3><p>Before following an operator link, check availability in your country, the game version, limits and withdrawal rules.</p></aside>
        <section id="faq"><h2>Game questions</h2>
          <details><summary>Can the next result be predicted?</summary><p>No. Earlier results do not provide a way to calculate the next outcome. A losing sequence does not make a win due.</p></details>
          <details><summary>Why does another site show a different RTP?</summary><p>A game can have several mathematical configurations. Sources also sometimes mix up the original game and its sequels. Check the title and help menu of the version you have opened.</p></details>
          <details><summary>What should I compare before choosing?</summary><p>Payout mechanics, grid dimensions, bonus features and how understandable the interface is. The <Link href={`/en/compare?seed=${game.slug}`}>comparison table</Link> helps show the differences.</p></details>
        </section>
      </article>
    </div>
    <section id="related"><SectionTitle title="Continue exploring" href="/en/slots" label="Back to the catalogue" />
      {related.map(item=><article className={styles.relatedRow} key={item.slug}><div><span className="eyebrow">{item.provider} / {item.year}</span><h3><Link href={`/en/slots/${item.slug}`}>{item.name}</Link></h3><p>{englishFullDossiers[item.slug].description}</p></div><Link href={`/en/slots/${item.slug}`} aria-label={`Open ${item.name}`}>↗</Link></article>)}
    </section>
  </div>;
}
