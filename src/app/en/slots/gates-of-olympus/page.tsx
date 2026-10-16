import Link from "next/link";
import { notFound } from "next/navigation";
import { getSlot } from "@/lib/data";
import { GameImage } from "@/components/editorial";
import { pageMetadata } from "@/lib/seo";
import { getVerifiedSlotMetrics } from "@/lib/dossier";

const slug = "gates-of-olympus";
export const metadata = pageMetadata({
  title: "Gates of Olympus: how the tumble and multiplier features work",
  description: "An English editorial guide to Gates of Olympus: pay-anywhere symbols, tumbling wins, free spins, multiplier rules, RTP and volatility.",
  path: "/en/slots/gates-of-olympus",
  openGraphType: "article",
  noIndex: true,
});

export default function GatesOfOlympusEnglishDossier() {
  const game = getSlot(slug);
  if (!game) notFound();
  const verified = getVerifiedSlotMetrics(slug);
  return (
    <>
      <nav aria-label="Breadcrumbs" className="breadcrumbs">
        <Link href="/en">Home</Link> / <Link href="/en/slots">Catalogue</Link> / <span aria-current="page">{game.name}</span>
      </nav>
      <div className="slot-heading">
        <div>
          <span className="eyebrow accent">Game guide / {game.year}</span>
          <h1>{game.name}</h1>
          <p>Pragmatic Play · The rules behind the spectacle</p>
        </div>
      </div>
      <div className="slot-intro">
        <figure className="slot-figure">
          <GameImage slot={game} priority />
          <figcaption>Game artwork · Pragmatic Play · Gates of Olympus</figcaption>
        </figure>
        <div className="slot-summary">
          <span className="eyebrow">At a glance</span>
          <p className="slot-deck">Gates of Olympus uses pay-anywhere combinations, tumbling symbols and random multipliers. What matters is how those features interact, not whether a spin looks promising.</p>
          <dl className="facts">
            <div><dt>Publisher</dt><dd>{game.provider}</dd></div>
            <div><dt>Release year</dt><dd>{game.year}</dd></div>
            <div><dt>Grid</dt><dd>{game.field}</dd></div>
            <div><dt>Published RTP in Slotfolio</dt><dd>{game.rtp}</dd></div>
            <div><dt>Volatility</dt><dd>High</dd></div>
            {verified?.maxWin && <div><dt>Documented maximum win</dt><dd>{verified.maxWin}</dd></div>}
          </dl>
          <p className="data-note">The RTP setting can differ between versions or operators. Always check the paytable and help menu of the version you are using. RTP is a theoretical long-run measure, not a prediction for your session.</p>
        </div>
      </div>
      <div className="article-layout slot-body">
        <aside className="article-toc" aria-label="On this page">
          <span className="eyebrow">Contents</span>
          <a href="#wins">How wins are formed</a>
          <a href="#multipliers">Multipliers and free spins</a>
          <a href="#figures">Understanding the figures</a>
          <a href="#perspective">Editorial perspective</a>
          <a href="#sources">Sources and limitations</a>
        </aside>
        <article className="prose">
          <section id="wins">
            <h2>How wins are formed</h2>
            <p>Instead of following conventional paylines, the game awards wins for groups of at least eight matching symbols anywhere on its six-reel grid. Winning symbols disappear and new ones fall into place. That tumble can create another combination during the same spin, but a cascade is not a promise of another win.</p>
            <p>The publisher calls this a pay-anywhere system. It is different from both traditional paylines and cluster pays, where touching symbols are the defining rule.</p>
          </section>
          <section id="multipliers">
            <h2>Multipliers and free spins</h2>
            <p>Random multiplier symbols can appear during ordinary play and free spins. Pragmatic Play describes multiplier values reaching 500× in the original game. The publisher states that four or more scatter symbols trigger a bonus round starting with 15 free spins.</p>
            <p>During free spins, qualifying multipliers build a running total applied to winning spins under the game's bonus rules. The presence of a multiplier does not independently guarantee a payout: the corresponding win conditions still matter.</p>
          </section>
          <section id="figures">
            <h2>What RTP and volatility tell you</h2>
            <p>Slotfolio lists an RTP of {game.rtp} and classifies this game as high volatility. RTP expresses a theoretical return over a very large number of bets; it does not mean that a player will receive that share of their stakes back. High volatility describes the distribution of potential results, not an odds forecast for the next spin.</p>
            <p>Check the actual configuration in the in-game rules. Do not assume that figures published for one version apply unchanged to every casino or variant.</p>
          </section>
          <section id="perspective">
            <h2>Editorial perspective</h2>
            <p>The game deliberately draws attention to Zeus, tumbling sequences and large multiplier symbols. Those dramatic moments are part of its presentation, not evidence that a rewarding spin is due. For comparing games, the important questions are how matching symbols pay, what the multiplier affects, and which RTP version is offered.</p>
            <p>Gambling carries a risk of losing money. A maximum win is an upper limit where documented, not an expected outcome or a reason to increase a stake. <Link href="/en/responsible-gaming">Read our safer gambling guide</Link>.</p>
          </section>
          <section id="sources">
            <h2>Sources and limitations</h2>
            <p>Mechanics and bonus conditions were checked against Pragmatic Play's official Gates of Olympus game description. Published promotional summaries may simplify rules or describe a different configuration. The in-game paytable is the relevant place to verify the version available to you.</p>
            <p><a href="https://www.pragmaticplay.com/en/games/gates-of-olympus/" rel="noopener noreferrer">Publisher's game information ↗</a></p>
            <p><Link href="/en/editorial-policy">How Slotfolio checks game information</Link> · <Link href="/en/disclosure">Affiliate disclosure</Link></p>
          </section>
        </article>
      </div>
    </>
  );
}
