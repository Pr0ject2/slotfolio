import Link from "next/link";
import { slots } from "@/lib/data";
import { SlotArtwork } from "@/components/slot-artwork";
import { withBasePath } from "@/lib/base-path";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Slotfolio | Understand slot rules, features and RTP",
  description: "Understand how slot games work: pay rules, bonus features, RTP and volatility explained clearly, alongside safer gambling advice.",
  path: "/en",
  absoluteTitle: true,
});

export default function EnglishHome() {
  const featured = slots[0];
  const secondary = slots[3];
  return (
    <>
      <div className="edition-line">
        <span><i /> IN FOCUS</span>
        <span>Rules, features and context</span>
        <span>18+ · Know the risks</span>
      </div>
      <section className="front-lead">
        <article className="cover-story">
          <Link href={`/en/slots/${featured.slug}`} className="cover-art" aria-label="Gates of Olympus English game guide">
            <SlotArtwork
              className="game-image"
              src={withBasePath(featured.featureImage || featured.image)}
              alt="Gates of Olympus game artwork"
              width={500} height={280} loading="eager" decoding="async"
            />
            <span className="image-caption">GAME GUIDE (EN) ↗</span>
          </Link>
          <div className="cover-copy">
            <span className="eyebrow accent">Game rules / Pragmatic Play</span>
            <h1><Link href={`/en/slots/${featured.slug}`}>Gates of Olympus</Link></h1>
            <p>Cascading wins and multipliers can make a single spin more involved than it first appears. We explain the rules behind those features, not what your next spin will pay.</p>
            <Link className="text-link" href={`/en/slots/${featured.slug}`}>Read English game guide ↗</Link>
          </div>
        </article>
        <aside className="front-aside">
          <article className="side-story">
            <Link href={`/en/slots/${secondary.slug}`} aria-label="Reactoonz English game guide">
              <SlotArtwork className="game-image" src={withBasePath(secondary.image)}
                alt="Reactoonz game artwork" width={500} height={280} loading="lazy" decoding="async" />
            </Link>
            <span className="eyebrow accent">Different rules for forming wins</span>
            <h2><Link href={`/en/slots/${secondary.slug}`}>Reactoonz: beyond paylines</Link></h2>
            <p>Reactoonz rewards groups of adjacent symbols rather than combinations along traditional paylines. Learn why that distinction matters.</p>
            <Link className="text-link" href={`/en/slots/${secondary.slug}`}>Read English game guide ↗</Link>
          </article>
          <div className="reading-note">
            <span className="eyebrow">Before you play</span>
            <h3><Link href="/en/journal/understanding-rtp">96% RTP doesn't mean you'll get 96% of your money back</Link></h3>
            <Link className="text-link" href="/en/journal/understanding-rtp">Understand RTP ↗</Link>
          </div>
        </aside>
      </section>
      <section className="catalog-preview">
        <div className="section-title">
          <h2>Start with the rules</h2>
          <Link href="/en/about" className="text-link">About Slotfolio ↗</Link>
        </div>
        <div className="catalog-preview-layout">
          <div className="catalog-intro">
            <span className="eyebrow accent">A clearer way to read slot games</span>
            <p className="serif">Every game has<br />its own rules.<br /><em>Understand them first.</em></p>
            <p>Explore mechanics, compare verified details, and learn what the technical figures do not tell you about a single session.</p>
          </div>
          <div className="prose">
            <section>
              <h2><Link href="/en/journal/understanding-rtp">What does RTP mean?</Link></h2>
              <p>RTP is a theoretical average over many bets. It cannot tell you what will happen in your session.</p>
            </section>
            <section>
              <h2><Link href="/en/editorial-policy">How we verify information</Link></h2>
              <p>We separate verified game rules from our own explanations. If a figure cannot be checked, we leave it unconfirmed.</p>
            </section>
            <section>
              <h2><Link href="/en/responsible-gaming">Safer gambling</Link></h2>
              <p>Gambling can cause financial harm. Know the limits and where to find support.</p>
            </section>
          </div>
        </div>
      </section>
      <div className="editorial-signoff">
        <span className="brand-small">s.</span>
        <p>Look up the rules before you play.
          <br /><span>Search by title, publisher or mechanic.</span>
        </p>
        <Link href="/en/slots">Browse the catalogue ↗</Link>
      </div>
    </>
  );
}
