import Link from "next/link";
import { ArticleJsonLd } from "@/components/article-json-ld";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { SectionTitle } from "@/components/editorial";
import { SlotArtwork } from "@/components/slot-artwork";
import { withBasePath } from "@/lib/base-path";
import { getSlot } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import styles from "./article.module.css";
import reading from "@/app/journal/reading.module.css";

const path = "/en/journal/how-cascades-work";
const title = "One spin, several events: how cascades work";
const description = "How cascading symbols can extend a single paid round, why clusters and cascades are different, and what a game's rules actually tell you.";

export const metadata = pageMetadata({
  title,
  description,
  path,
  openGraphType: "article",
  noIndex: true,
});

export default function EnglishCascadesArticle() {
  const sweet = getSlot("sweet-bonanza");
  const reactoonz = getSlot("reactoonz");

  return (
    <div className={`${styles.article} ${reading.reading}`}>
      <ArticleJsonLd
        title={title}
        description={description}
        path={path}
        datePublished="2026-09-07"
      />
      <EnglishBreadcrumbs
        items={[
          { label: "Journal and guides", href: "/en/journal" },
          { label: "How cascades work" },
        ]}
      />
      <header className="article-heading">
        <span className="eyebrow accent">Behind the mechanics / In-depth guide</span>
        <h1>One spin —<br />several events</h1>
        <p className="deck">
          Symbols disappear, new ones arrive and the round may still be in progress.
          Here is what happens inside a cascading slot.
        </p>
        <div className="article-meta">
          <span>Slotfolio editorial team</span>
          <span>7 September 2026</span>
          <span>9-minute read</span>
        </div>
      </header>
      <div className="article-hero">
        <p>
          A match.<br />
          A removal.<br />
          <em>Another check.</em>
        </p>
        <div className="cascade-art" aria-label="Illustration of symbols being replaced after a cascade">
          {[0, 1, 2].map(i => (
            <div className="cascade-column" key={i}>
              <span>◆</span>
              <span className={i === 1 ? "falling" : ""}>{i === 1 ? "↓" : "✦"}</span>
              <span>◆</span>
            </div>
          ))}
          <small>ONE PAID SPIN · SEVERAL GRID CHECKS</small>
        </div>
      </div>
      <div className="article-layout">
        <nav className="article-toc" aria-label="On this page">
          <span className="eyebrow">In this article</span>
          <a href="#one-spin">Where a spin ends</a>
          <a href="#sequence">One chain, step by step</a>
          <a href="#different">Cascades are not clusters</a>
          <a href="#multiplier">What multipliers change</a>
          <a href="#rhythm">Rhythm and perception</a>
          <a href="#rules">Reading the paytable</a>
          <a href="#conclusion">What stays random</a>
        </nav>
        <article className="prose">
          <section id="one-spin">
            <p className="lead-paragraph">
              A conventional spin seems straightforward: the reels move, stop and
              the game checks the result. Cascades add one more possibility:
              what if a paying combination is only the start of the round?
            </p>
            <h2>Where a spin ends</h2>
            <p>
              In a cascading game, a payout can start another event. The symbols
              that made the qualifying combination disappear. New symbols replace
              them and the game checks the updated grid again. As long as new
              eligible wins occur under that game's rules, the chain can continue.
            </p>
            <p>
              This remains one paid base-game spin. You do not normally place
              another base stake or press Spin again between its individual
              cascades. Special features, including bonus purchases where
              offered, have their own conditions and should be read separately.
            </p>
            <p>
              A spin is not the same as an animation. Several dramatic drops
              need not represent several separately charged rounds. Some
              interfaces reveal the accumulated award step by step, so the
              number displayed may change while the same round continues.
            </p>
          </section>

          <section id="sequence">
            <h2>One chain, step by step</h2>
            <p>
              Imagine a hypothetical grid. Enough matching symbols appear to
              meet the game's payout rule, so an award is calculated. Those
              winning symbols are removed, the remaining symbols fill the
              spaces and new ones arrive.
            </p>
            <p>
              If the updated grid qualifies for another payout, the game
              performs another cascade. If it does not, the paid round ends.
              The next spin is a new round with its own stake.
            </p>
            <p className={styles.tableHint}>Scroll right to read all three columns. Keyboard: focus the table and use the arrow keys.</p>
            <div className={`table-wrap ${styles.sequence}`} role="region" aria-label="Cascade sequence, scrolls horizontally" tabIndex={0}>
              <table>
                <caption className="sr-only">Typical sequence inside a cascading round</caption>
                <thead>
                  <tr><th>Stage</th><th>What happens</th><th>What to check</th></tr>
                </thead>
                <tbody>
                  <tr><td>Initial grid</td><td>The game evaluates the symbol positions</td><td>Its winning-combination rules</td></tr>
                  <tr><td>Match</td><td>An eligible combination pays</td><td>Individual or accumulated award</td></tr>
                  <tr><td>Refresh</td><td>Symbols are removed and positions refill</td><td>Any wild or multiplier carry-over</td></tr>
                  <tr><td>Recheck</td><td>The chain either continues or ends</td><td>Conditions that end the round</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              This table explains the principle, not every game's visual
              implementation. Some games replace symbols in place or move
              them differently rather than dropping them from above. The
              animation is secondary to the actual payout rules.
            </p>
          </section>

          <section id="different">
            <h2>Cascades are not the same as clusters</h2>
            <p>
              These terms often appear together, but answer different
              questions. A cascade explains what happens <em>after</em> a
              win; a cluster defines which symbols <em>form</em> a win.
            </p>
            <p>
              In <Link href="/en/slots/reactoonz">Reactoonz</Link>, neighbouring
              groups of matching creatures are important. In{" "}
              <Link href="/en/slots/sweet-bonanza">Sweet Bonanza</Link>,
              matching symbols can count across the grid without touching.
              Both games can nevertheless refresh their symbols repeatedly
              after eligible wins.
            </p>
            <blockquote>
              The rule for winning and the method for refreshing the grid
              are two separate layers of the same game.
            </blockquote>
            <p>
              A game may combine several payout, replacement and bonus rules.
              Calling it a 'cascading slot' does not explain everything about
              the combinations it pays. Its own paytable is the reference.
            </p>
            {sweet && (
              <figure className="article-figure">
                <SlotArtwork
                  className="game-image"
                  src={withBasePath(sweet.image)}
                  alt="Official Sweet Bonanza game artwork"
                  width={500}
                  height={280}
                  loading="lazy"
                />
                <figcaption>
                  Sweet Bonanza uses cascades and counts matches across the
                  grid. Official game artwork from Pragmatic Play.
                </figcaption>
              </figure>
            )}
          </section>

          <section id="multiplier">
            <h2>What a multiplier changes</h2>
            <p>
              A cascade does not have to increase an award by itself. A game
              needs a separate multiplier rule for that. A multiplier might
              grow during one paid round, apply only within a bonus or carry
              between free spins. Those are different mechanics.
            </p>
            <p>
              In <Link href="/en/slots/gates-of-olympus">Gates of Olympus</Link>,
              multipliers have an especially important role during free spins:
              their values can accumulate in the bonus. That changes which
              part of the chain matters, beyond the payout of one combination.
            </p>
            <div className="margin-note">
              <strong>Three questions about a multiplier</strong>
              <p>
                What does it apply to? When can its value change? What resets
                it? The answers are in that game's particular rules, not in
                the word 'cascade'.
              </p>
            </div>
            <p>
              Do not transfer a familiar multiplier rule from another game.
              Similar branding or the same grid size cannot establish that
              multipliers work identically.
            </p>
          </section>

          <section id="rhythm">
            <h2>Why cascades can feel different</h2>
            <p>
              A conventional spin has a clear pause between your action and
              its result. A cascading round delays that stopping point:
              each new grid leaves open the possibility of another qualifying
              event. The result is a distinct rhythm, a small sequence within
              one spin.
            </p>
            <p>
              Animation, sound and an increasing displayed award make the
              sequence easy to follow. They can also make a small payout feel
              more significant. The intensity of the presentation should
              not be confused with the net change in your balance.
            </p>
            <p>
              A long celebration for a payout does not establish that the
              amount exceeded the stake for the round. Compare the final
              numbers, not only the colour, sound or duration of the effects.
            </p>
          </section>

          <section id="rules">
            <h2>How to read the rules for a cascading game</h2>
            <p>
              Start by finding the minimum payout requirement: how many
              matching symbols are needed, and where must they appear? Then
              check which symbols disappear after a win. Wilds, scatters and
              special symbols may behave differently from ordinary ones.
            </p>
            <p>
              Next, look at the bonus trigger. Do scatters count only on the
              initial grid, or throughout the sequence? Can they remain in
              place between cascades? You cannot reliably reconstruct
              those details from the animation alone.
            </p>
            <p>
              Finally, read any maximum-win limitations and the RTP setting
              for the specific game version. Where an operator's summary
              and the in-game help disagree, confirm the configuration.
              Slotfolio's catalogue is a starting point, not a substitute
              for the official rules.
            </p>
          </section>

          <section id="conclusion">
            <h2>What stays random</h2>
            <p>
              Cascades make a paid round structurally more involved, but
              they cannot tell you the next result. A long chain in an
              earlier round does not promise another. A short chain does
              not leave a 'debt' for the game to repay.
            </p>
            <p>
              RTP is a theoretical long-run measure, not a promise about a
              particular session. See <Link href="/en/journal/understanding-rtp">our
              explanation of RTP</Link> and the{" "}
              <a
                href="https://www.gamblingcommission.gov.uk/public-and-players/guide/return-to-player-how-much-gaming-machines-payout"
                target="_blank"
                rel="noopener noreferrer"
              >Gambling Commission's guide</a>.
            </p>
            <p>
              Understanding the mechanics means being able to explain why
              an award appeared, how the grid changed and when the round
              finished. That can make a game easier to interpret, but
              cannot turn random results into a forecast.
            </p>
            <p className="source-note">
              Descriptions of individual features were cross-checked against
              the publishers' game pages for{" "}
              <a href="https://www.pragmaticplay.com/en/games/sweet-bonanza/" target="_blank" rel="noopener noreferrer">Sweet Bonanza</a>,{" "}
              <a href="https://www.pragmaticplay.com/en/games/gates-of-olympus/" target="_blank" rel="noopener noreferrer">Gates of Olympus</a> and{" "}
              <a href="https://www.playngo.com/games/reactoonz" target="_blank" rel="noopener noreferrer">Reactoonz</a>.
              Slotfolio editorial article.
            </p>
          </section>
        </article>
      </div>
      <SectionTitle
        title="Explore the differences"
        href="/en/collections/beyond-lines"
        label="View three game examples"
      />
      <div className="hub-list">
        {[sweet, reactoonz].flatMap(slot => slot ? [slot] : []).map(slot => (
          <Link href={`/en/slots/${slot.slug}`} key={slot.slug}>
            <span className="number">Game</span>
            <h2>{slot.name}</h2>
            <p>{slot.provider} · Read the English game guide and verified source references</p>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </div>
    </div>
  );
}
