import Link from "next/link";
import { EnglishBreadcrumbs } from "@/components/english-breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "What RTP means in slot games",
  description: "Understand return to player, why 96% RTP does not guarantee a session outcome, and how to check the setting of the game you are playing.",
  path: "/en/journal/understanding-rtp",
  openGraphType: "article",
});

export default function EnglishRtpGuide() {
  return (
    <>
      <EnglishBreadcrumbs items={[{ label: "Understanding RTP" }]} />
      <header className="article-heading">
        <span className="eyebrow accent">Explainer / RTP and volatility</span>
        <h1>96% RTP doesn't mean<br />you'll get 96% back</h1>
        <p className="deck">What this percentage describes, what it cannot predict, and why the game's actual rules and configuration matter.</p>
        <div className="article-meta"><span>Slotfolio editorial team</span><span>4-minute read</span></div>
      </header>
      <div className="article-layout">
        <nav className="article-toc" aria-label="On this page">
          <span className="eyebrow">On this page</span>
          <a href="#meaning">The long-run average</a>
          <a href="#session">Individual sessions</a>
          <a href="#version">Versions and settings</a>
        </nav>
        <article className="prose">
          <section id="meaning">
            <h2>A long-run theoretical average</h2>
            <p>Return to Player (RTP) describes the theoretical proportion of total stakes returned as prizes over a very large number of plays. It is a feature of the game's mathematical design, not a promise made to any individual player.</p>
            <p>Think of 96% RTP as a modelled return of 96 units for every 100 units wagered across a very large number of plays. It is measured against the total value of bets, including amounts staked again after earlier wins, not simply the money first deposited.</p>
          </section>
          <section id="session">
            <h2>Your session can be very different</h2>
            <p>Short-term outcomes can deviate substantially from the theoretical average. You may lose the entire amount set aside or finish ahead. The RTP percentage cannot tell you which outcome to expect next.</p>
            <blockquote>There is no such thing as a win being ‘due’ because earlier spins lost.</blockquote>
            <p>Volatility describes how widely outcomes can vary. Two games may have similar RTP but very different patterns of wins: one may pay smaller prizes more often, while another may be more uneven. Neither pattern tells you what the next spin will do.</p>
          </section>
          <section id="version">
            <h2>Check the actual game configuration</h2>
            <p>A single title can have multiple RTP settings. The RTP shown in a catalogue may not match the setting used by the casino where you play. Check the information for that specific version.</p>
            <div className="margin-note">
              <strong>Where to look</strong>
              <p>Open the game's help, paytable, or information menu. If the percentage is not stated, treat it as unknown rather than guessing.</p>
            </div>
            <p>RTP does not remove the risk of losing money.</p>
            <Link className="text-link" href="/en/responsible-gaming">Safer gambling guidance ↗</Link>
          </section>
        </article>
      </div>
    </>
  );
}
