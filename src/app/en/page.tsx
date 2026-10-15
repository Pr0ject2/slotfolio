import Link from "next/link";
import { slots } from "@/lib/data";
import { SlotArtwork } from "@/components/slot-artwork";
import { withBasePath } from "@/lib/base-path";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Slotfolio | Slot game rules, RTP and independent guides",
  description: "Explore slot game mechanics, RTP, and bonus rules. Clear editorial explanations and safer gambling information without promises of winning.",
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
        <span>Games, mechanics, and facts</span>
        <span>18+ · Know the risks</span>
      </div>
      <section className="front-lead">
        <article className="cover-story">
          <Link href={`/slots/${featured.slug}`} className="cover-art" aria-label="Gates of Olympus game dossier, Russian language">
            <SlotArtwork
              className="game-image"
              src={withBasePath(featured.featureImage || featured.image)}
              alt="Gates of Olympus game artwork"
              width={500} height={280} loading="eager" decoding="async"
            />
            <span className="image-caption">GAME DOSSIER (RU) ↗</span>
          </Link>
          <div className="cover-copy">
            <span className="eyebrow accent">Game rules / Pragmatic Play</span>
            <h1><Link href={`/slots/${featured.slug}`}>Gates of Olympus <span className="eyebrow">(RU)</span></Link></h1>
            <p>Learn what cascades and multipliers do, how bonus features work, and which rules deserve a closer look. A high volatility label cannot predict the next result.</p>
            <Link className="text-link" href={`/slots/${featured.slug}`}>Read dossier (Russian) ↗</Link>
          </div>
        </article>
        <aside className="front-aside">
          <article className="side-story">
            <Link href={`/slots/${secondary.slug}`} aria-label="Reactoonz game dossier, Russian language">
              <SlotArtwork className="game-image" src={withBasePath(secondary.image)}
                alt="Reactoonz game artwork" width={500} height={280} loading="lazy" decoding="async" />
            </Link>
            <span className="eyebrow accent">A different kind of win</span>
            <h2><Link href={`/slots/${secondary.slug}`}>Reactoonz: beyond paylines (RU)</Link></h2>
            <p>What changes when winning groups form across the game grid rather than on fixed lines?</p>
            <Link className="text-link" href={`/slots/${secondary.slug}`}>Original dossier (Russian) ↗</Link>
          </article>
          <div className="reading-note">
            <span className="eyebrow">Before you play</span>
            <h3><Link href="/en/journal/understanding-rtp">96% RTP is not a promise to return 96% of your money</Link></h3>
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
              <p>A theoretical long-run return is not a prediction for an individual player or session.</p>
            </section>
            <section>
              <h2><Link href="/en/editorial-policy">How we verify information</Link></h2>
              <p>We distinguish documented rules from interpretation and do not fill missing numbers with guesses.</p>
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
        <p>The English edition is being translated in stages.
          <br /><span>The 1,000-game catalogue and detailed game dossiers currently remain available in Russian.</span>
        </p>
        <Link href="/slots">Open Russian catalogue ↗</Link>
      </div>
    </>
  );
}
